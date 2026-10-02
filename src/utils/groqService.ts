/**
 * Groq AI Service for generating vector line diagrams from text prompts OR uploaded photos
 * using Groq's ultra-fast API endpoints.
 */

import { convertImageToLineDiagram } from './imageToLineDiagram';

export interface GroqGenerationOptions {
  apiKey?: string;
  prompt?: string;
  imageDataUrl?: string; // Base64 data URL of uploaded photo
  model?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface GroqGenerationResult {
  svgPath: string;
  rawSvg?: string;
  prompt: string;
  usedVision?: boolean;
}

export const DEFAULT_GROQ_TEXT_MODEL = 'qwen/qwen3.8-27b';
export const DEFAULT_GROQ_VISION_MODEL = 'qwen/qwen3.8-27b';

export const DEFAULT_GROQ_VISION_PROMPT =
  'Analyze the main object in this uploaded photo (e.g., lamp, pen, device, flask) and extract a clean, minimalist SVG vector line diagram outline of it.';

/**
 * System prompt instructing Groq LLM to act as an expert SVG vector line diagram generator.
 */
const GROQ_SYSTEM_PROMPT = `You are an expert SVG Vector Line Diagram Generator.
Your task is to take an image or user prompt (e.g., "microscope", "drone", "lamp", "satellite", "flask", "robot arm") and return ONLY valid SVG vector path data for a clean, minimalist line diagram.

STRICT OUTPUT RULES:
1. Return ONLY the SVG <path d="..."> element or <svg> element. Do NOT include markdown code blocks (\`\`\`xml or \`\`\`svg), no conversational text, no explanations.
2. The SVG path should be an outline/line diagram with fill="none", stroke="currentColor", stroke-width="2", stroke-linecap="round", stroke-linejoin="round".
3. Use a 24x24 or 100x100 viewBox coordinate system so it scales nicely.
4. Ensure the path "d" string contains clean, connected M, L, C, Q, Z commands.
5. Example format:
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

/**
 * Gets the active Groq API Key from explicit arg, localStorage, or env variable.
 */
export const getGroqApiKey = (providedKey?: string): string => {
  if (providedKey && providedKey.trim()) return providedKey.trim();
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('groq_api_key');
    if (localKey && localKey.trim()) return localKey.trim();
  }
  return process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
};

/**
 * Saves Groq API Key to localStorage.
 */
export const setGroqApiKey = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('groq_api_key', key.trim());
  }
};

/**
 * Sends text prompt OR uploaded photo to Groq API and parses SVG vector line art response.
 */
export const generateLineDiagramWithGroq = async (
  options: GroqGenerationOptions
): Promise<GroqGenerationResult> => {
  const apiKey = getGroqApiKey(options.apiKey);
  const isVision = !!(options.imageDataUrl && options.imageDataUrl.trim());
  const effectivePrompt = options.prompt && options.prompt.trim()
    ? options.prompt.trim()
    : (isVision ? DEFAULT_GROQ_VISION_PROMPT : 'microscope laboratory diagram');

  if (!apiKey) {
    // If no API key is provided and user uploaded an image, fall back to high-quality client-side edge detector
    if (isVision && typeof window !== 'undefined') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = options.imageDataUrl!;
      await new Promise((res) => { img.onload = res; img.onerror = res; });
      const lineRes = convertImageToLineDiagram(img, {
        sensitivity: 55,
        noiseSuppression: 2,
        detailLevel: 'detailed',
        strokeColor: options.strokeColor || '#00c4cc',
        strokeWidth: options.strokeWidth || 2,
      });
      return {
        svgPath: lineRes.svgPath,
        prompt: effectivePrompt,
        usedVision: true,
      };
    }
    throw new Error('Groq API Key is missing. Please enter your Groq API key.');
  }

  const model = options.model || (isVision ? DEFAULT_GROQ_VISION_MODEL : DEFAULT_GROQ_TEXT_MODEL);

  let userContent: any;
  if (isVision) {
    userContent = [
      {
        type: 'text',
        text: `${effectivePrompt}. Output ONLY the SVG <path d="..."> or <svg> element code.`,
      },
      {
        type: 'image_url',
        image_url: {
          url: options.imageDataUrl,
        },
      },
    ];
  } else {
    userContent = `Generate a clean, minimalist vector line diagram of: ${effectivePrompt}. Output ONLY the SVG path tag or SVG element code.`;
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: GROQ_SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        temperature: 0.2,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errText = errorData.error?.message || `Groq API request failed with status ${response.status}`;

      // If Vision model is decommissioned or fails, fall back gracefully to client-side edge detector or text model
      if (isVision && typeof window !== 'undefined') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = options.imageDataUrl!;
        await new Promise((res) => { img.onload = res; img.onerror = res; });
        const lineRes = convertImageToLineDiagram(img, {
          sensitivity: 55,
          noiseSuppression: 2,
          detailLevel: 'detailed',
          strokeColor: options.strokeColor || '#00c4cc',
          strokeWidth: options.strokeWidth || 2,
        });
        return {
          svgPath: lineRes.svgPath,
          prompt: effectivePrompt,
          usedVision: true,
        };
      }

      throw new Error(errText);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';

    // Clean markdown backticks if present
    let cleaned = rawContent.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '').trim();

    // Extract path 'd' string
    let extractedPath = '';
    const dMatch = cleaned.match(/d=["']([^"']+)["']/i);

    if (dMatch && dMatch[1]) {
      extractedPath = dMatch[1];
    } else if (cleaned.includes('M') || cleaned.includes('m')) {
      extractedPath = cleaned;
    } else {
      extractedPath = 'M 10 10 L 90 10 L 90 90 L 10 90 Z M 30 30 L 70 30 L 70 70 L 30 70 Z';
    }

    return {
      svgPath: extractedPath,
      rawSvg: cleaned,
      prompt: effectivePrompt,
      usedVision: isVision,
    };
  } catch (err: any) {
    if (isVision && typeof window !== 'undefined') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = options.imageDataUrl!;
      await new Promise((res) => { img.onload = res; img.onerror = res; });
      const lineRes = convertImageToLineDiagram(img, {
        sensitivity: 55,
        noiseSuppression: 2,
        detailLevel: 'detailed',
        strokeColor: options.strokeColor || '#00c4cc',
        strokeWidth: options.strokeWidth || 2,
      });
      return {
        svgPath: lineRes.svgPath,
        prompt: effectivePrompt,
        usedVision: true,
      };
    }
    throw err;
  }
};
