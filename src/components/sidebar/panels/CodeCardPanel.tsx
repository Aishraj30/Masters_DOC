import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Code2, Plus, Sparkles } from 'lucide-react';

interface CodeCardPanelProps {
  canvas: fabric.Canvas | null;
}

export const CodeCardPanel: React.FC<CodeCardPanelProps> = ({ canvas }) => {
  const [codeSnippet, setCodeSnippet] = useState<string>(
`// DocMaster Code Snippet
function calculateTotal(price, qty) {
  const tax = 0.18;
  return (price * qty) * (1 + tax);
}`
  );
  const [language, setLanguage] = useState('JavaScript');

  if (!canvas) return null;

  const handleInsertCodeCard = () => {
    const center = canvas.getCenter();

    // 1. Dark IDE Card Background Rect
    const bgRect = new fabric.Rect({
      left: center.left - 220,
      top: center.top - 120,
      width: 440,
      height: 240,
      fill: '#0f172a',
      stroke: '#334155',
      strokeWidth: 2,
      rx: 16,
      ry: 16,
    });

    // 2. Window Header Bar
    const headerRect = new fabric.Rect({
      left: center.left - 220,
      top: center.top - 120,
      width: 440,
      height: 38,
      fill: '#1e293b',
      rx: 16,
      ry: 16,
    });

    // 3. macOS Window Dots
    const dotRed = new fabric.Circle({ left: center.left - 200, top: center.top - 108, radius: 5, fill: '#ef4444' });
    const dotYellow = new fabric.Circle({ left: center.left - 185, top: center.top - 108, radius: 5, fill: '#f59e0b' });
    const dotGreen = new fabric.Circle({ left: center.left - 170, top: center.top - 108, radius: 5, fill: '#10b981' });

    // 4. File Tab Text
    const tabText = new fabric.IText(`app.${language.toLowerCase()}`, {
      left: center.left - 140,
      top: center.top - 110,
      fontSize: 12,
      fontFamily: 'Space Grotesk',
      fill: '#94a3b8',
    });

    // 5. Code Content Text
    const codeText = new fabric.IText(codeSnippet, {
      left: center.left - 200,
      top: center.top - 65,
      fontSize: 15,
      fontFamily: 'Space Grotesk',
      fill: '#38bdf8',
      lineHeight: 1.3,
    });

    // Group into single interactive Code Card element
    const group = new fabric.Group([bgRect, headerRect, dotRed, dotYellow, dotGreen, tabText, codeText], {
      left: center.left - 220,
      top: center.top - 120,
    });

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.requestRenderAll();
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Code & Math Card Generator</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Render stylized macOS IDE code cards for tech presentations and tutorials.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
            Language / Format
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-canva-sidebar border border-canva-border rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-canva-teal"
          >
            <option value="JavaScript">JavaScript / TypeScript</option>
            <option value="Python">Python</option>
            <option value="JSON">JSON Data</option>
            <option value="HTML">HTML / CSS</option>
            <option value="Math">Math Formula (LaTeX)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
            Code / Equation Content
          </label>
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            rows={7}
            className="w-full bg-canva-sidebar border border-canva-border rounded-xl p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-canva-teal resize-none"
          />
        </div>

        <button
          onClick={handleInsertCodeCard}
          disabled={!codeSnippet.trim()}
          className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/20 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Insert Code Card to Canvas</span>
        </button>
      </div>
    </div>
  );
};
