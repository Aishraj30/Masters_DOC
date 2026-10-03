import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { 
  X, 
  Sparkles, 
  Key, 
  Bot, 
  Check, 
  Loader2, 
  Zap, 
  Wand2, 
  AlertCircle,
  UploadCloud,
  ImageIcon,
  Camera,
  Layers,
  Eye
} from 'lucide-react';
import { 
  generateLineDiagramWithGroq, 
  getGroqApiKey, 
  setGroqApiKey, 
  GroqGenerationResult,
  DEFAULT_GROQ_VISION_PROMPT,
  DEFAULT_GROQ_VISION_MODEL,
  DEFAULT_GROQ_TEXT_MODEL
} from '../../utils/groqService';
import { addSvgIconPath } from '../../utils/fabricHelpers';
import { getCurrentUser } from '../../utils/auth';

interface GroqAiDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: fabric.Canvas | null;
}

const SAMPLE_VISION_PHOTOS = [
  {
    name: 'Desk Lamp',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Fountain Pen',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Camera Lens',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Chemistry Flask',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&auto=format&fit=crop&q=80',
  },
];

export const GroqAiDiagramModal: React.FC<GroqAiDiagramModalProps> = ({
  isOpen,
  onClose,
  canvas,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [apiKey, setApiKeyInput] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState<boolean>(false);
  const [mode, setMode] = useState<'vision' | 'text'>('vision');

  // Vision Image State
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>(SAMPLE_VISION_PHOTOS[0].url);

  // Mandatory Unique Title & Prompt State
  const [diagramTitle, setDiagramTitle] = useState<string>('');
  const [promptText, setPromptText] = useState<string>(DEFAULT_GROQ_VISION_PROMPT);
  const [strokeColor, setStrokeColor] = useState<string>('#00c4cc');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<GroqGenerationResult | null>(null);

  // Initialize API Key on open
  useEffect(() => {
    if (isOpen) {
      const activeKey = getGroqApiKey();
      setApiKeyInput(activeKey);
      if (!activeKey) {
        setShowKeyInput(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    setGroqApiKey(apiKey);
    setShowKeyInput(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUploadedImageSrc(ev.target.result as string);
          setMode('vision');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (overridePrompt?: string) => {
    setErrorMsg(null);
    setIsGenerating(true);

    try {
      const activeKey = apiKey || getGroqApiKey();
      if (!activeKey) {
        setShowKeyInput(true);
        throw new Error('Please enter your Groq API Key to enable AI generation.');
      }

      setGroqApiKey(activeKey);

      const targetPrompt = overridePrompt || promptText || (mode === 'vision' ? DEFAULT_GROQ_VISION_PROMPT : 'scientific microscope line diagram');

      const res = await generateLineDiagramWithGroq({
        apiKey: activeKey,
        prompt: targetPrompt,
        imageDataUrl: mode === 'vision' ? uploadedImageSrc : undefined,
        model: mode === 'vision' ? DEFAULT_GROQ_VISION_MODEL : DEFAULT_GROQ_TEXT_MODEL,
        strokeColor,
        strokeWidth,
      });

      setResult(res);
      // Auto-suggest title if empty
      if (!diagramTitle) {
        setDiagramTitle(`Line Diagram ${Date.now().toString().slice(-4)}`);
      }
    } catch (err: any) {
      console.error('Groq AI error:', err);
      setErrorMsg(err.message || 'Failed to generate line diagram with Groq AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToCanvas = async () => {
    if (!canvas || !result || !result.svgPath) return;

    if (!diagramTitle || !diagramTitle.trim()) {
      setErrorMsg('Please enter a unique Diagram Title before adding to canvas & submitting to library.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const currentUser = getCurrentUser();
      const res = await fetch('/api/diagrams/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: diagramTitle.trim(),
          svgPath: result.svgPath,
          strokeColor,
          strokeWidth,
          sourcePhotoUrl: mode === 'vision' ? uploadedImageSrc : '',
          promptUsed: promptText,
          user: currentUser,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message || 'Diagram title must be unique. Please choose another title.');
        setIsSubmitting(false);
        return;
      }

      addSvgIconPath(canvas, result.svgPath, strokeColor, undefined, strokeWidth);
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      console.error('Submit Diagram Error:', err);
      // Fallback add to canvas if API network error
      addSvgIconPath(canvas, result.svgPath, strokeColor, undefined, strokeWidth);
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans animate-in fade-in duration-200">
      <div className="bg-canva-panel border border-canva-border w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-canva-purple flex items-center justify-center text-black font-bold shadow-md">
              <Zap className="w-4 h-4 fill-black text-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-sm text-white">Groq Vision AI Diagram Studio</h2>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-400/30">
                  {mode === 'vision' ? 'Groq LLaMA 3.2 Vision' : 'Groq LLaMA 3.3 Text'}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Upload any object photo or type a prompt to let Groq AI generate vector line art
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 bg-canva-bg space-y-4">
          {/* Top Bar: Mode Selector & Groq Key Settings */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-canva-sidebar p-3 rounded-xl border border-canva-border">
            {/* Mode Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-gray-300">Input Mode:</span>
              <div className="flex items-center bg-canva-panel p-0.5 rounded-lg border border-canva-border">
                <button
                  onClick={() => setMode('vision')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center space-x-1.5 ${
                    mode === 'vision'
                      ? 'bg-amber-400 text-black shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Image Upload (Vision)</span>
                </button>
                <button
                  onClick={() => setMode('text')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors flex items-center space-x-1.5 ${
                    mode === 'text'
                      ? 'bg-canva-purple text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Text Prompt Only</span>
                </button>
              </div>
            </div>

            {/* API Key Status / Toggle */}
            <div className="flex items-center space-x-2">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                className="text-xs font-medium text-canva-teal hover:underline"
              >
                {showKeyInput ? 'Hide Key' : apiKey ? 'Groq Key Active' : '+ Add Groq API Key'}
              </button>
            </div>
          </div>

          {/* Key Input Box if expanded */}
          {(showKeyInput || !apiKey) && (
            <div className="p-3 bg-canva-sidebar border border-canva-border rounded-xl flex items-center space-x-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="gsk_..."
                className="flex-1 bg-canva-bg border border-canva-border rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-lg transition-colors flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Key</span>
              </button>
            </div>
          )}

          {/* Main Grid: Upload & Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Column: Vision Photo Upload & Presets (5 cols) */}
            {mode === 'vision' ? (
              <div className="md:col-span-5 space-y-3">
                {/* Photo Upload Zone */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-amber-400/50 hover:border-amber-400 rounded-xl bg-canva-sidebar hover:bg-amber-400/10 flex flex-col items-center justify-center p-3 transition-all group cursor-pointer text-center"
                >
                  <UploadCloud className="w-6 h-6 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-white">Upload Photo for Groq Vision</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Pen, Lamp, Cup, Flask, Device</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* Sample Preset Photos */}
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 block mb-1.5 uppercase tracking-wider">
                    Or pick sample photo:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {SAMPLE_VISION_PHOTOS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setUploadedImageSrc(preset.url)}
                        className={`relative h-16 rounded-lg overflow-hidden border transition-all ${
                          uploadedImageSrc === preset.url
                            ? 'border-amber-400 ring-2 ring-amber-400/40'
                            : 'border-canva-border hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] font-medium text-white px-1 py-0.5 truncate text-center">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Photo View */}
                <div className="bg-canva-sidebar p-2 rounded-xl border border-canva-border">
                  <span className="text-[10px] font-semibold text-gray-400 block mb-1">
                    Uploaded Photo View:
                  </span>
                  <div className="h-32 bg-black rounded-lg overflow-hidden flex items-center justify-center border border-canva-border/50">
                    <img
                      src={uploadedImageSrc}
                      alt="Uploaded"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:col-span-5 bg-canva-sidebar p-4 rounded-xl border border-canva-border flex flex-col justify-center space-y-3">
                <div className="w-10 h-10 rounded-xl bg-canva-purple/20 border border-canva-purple text-canva-purple flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-white">Groq AI Text-to-SVG Generator</h3>
                <p className="text-xs text-gray-400">
                  Type any prompt describing an object or diagram, and Groq's LLaMA 3.3 model will generate clean SVG line art.
                </p>
              </div>
            )}

            {/* Right Column: Title, Prompt & Live Vector Output Preview (7 cols) */}
            <div className="md:col-span-7 flex flex-col space-y-3">
              {/* Mandatory Unique Diagram Title Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-400 flex items-center space-x-1.5 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Diagram Title (Must be unique):</span>
                  </label>
                  <span className="text-[10px] text-gray-400">Required for Admin Queue</span>
                </div>
                <input
                  type="text"
                  value={diagramTitle}
                  onChange={(e) => setDiagramTitle(e.target.value)}
                  placeholder="e.g. Scientific Microscope Vector v1"
                  className="w-full bg-canva-sidebar border border-canva-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400 font-medium"
                />
              </div>

              {/* Prompt Text Input Box */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Prompt / Instructions for Groq AI:</span>
                </label>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Default prompt: Analyze photo and extract clean vector line diagram outline..."
                  rows={2}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none font-sans"
                />
              </div>

              {/* Live Vector SVG Viewport */}
              <div className="flex-1 min-h-[220px] bg-slate-950 border border-canva-border rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center space-y-2 z-10 text-amber-400">
                    <Loader2 className="w-7 h-7 animate-spin text-amber-400" />
                    <span className="text-xs font-semibold">
                      {mode === 'vision' ? 'Groq Vision is analyzing image & generating line diagram...' : 'Groq LLaMA 3.3 is generating line art...'}
                    </span>
                  </div>
                )}

                {result && result.svgPath ? (
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-44 h-44 drop-shadow-xl transition-transform hover:scale-105"
                    >
                      <path
                        d={result.svgPath}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[10px] font-mono text-canva-teal bg-canva-sidebar px-2 py-0.5 rounded border border-canva-border">
                      {result.usedVision ? 'Groq Vision Generated' : 'Groq LLaMA 3.3 Generated'}
                    </span>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-xs space-y-1">
                    <Wand2 className="w-8 h-8 mx-auto text-gray-600 mb-1" />
                    <p>Click "Generate with Groq Vision AI" to process your image and render SVG line art.</p>
                  </div>
                )}
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Color & Stroke Width Controls */}
              <div className="flex items-center justify-between bg-canva-sidebar p-2.5 rounded-xl border border-canva-border">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-gray-400 font-medium">Line Color:</span>
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer border border-canva-border bg-transparent p-0"
                  />
                  <span className="text-[11px] font-mono text-canva-teal uppercase">{strokeColor}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-gray-400 font-medium">Thickness:</span>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-24 h-1 bg-canva-panel rounded appearance-none accent-canva-teal cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-canva-teal">{strokeWidth}px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-canva-sidebar border-t border-canva-border flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-canva-hover transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-canva-purple text-black font-bold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Zap className="w-4 h-4 fill-black text-black" />
              )}
              <span>Generate with Groq {mode === 'vision' ? 'Vision AI' : 'Text AI'}</span>
            </button>

            <button
              onClick={handleAddToCanvas}
              disabled={!result || !result.svgPath || isSubmitting}
              className="px-6 py-2.5 bg-canva-teal text-black font-bold text-xs rounded-xl shadow-lg hover:bg-canva-teal/90 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-black" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              <span>{isSubmitting ? 'Submitting to Admin Queue...' : 'Submit & Add to Canvas'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
