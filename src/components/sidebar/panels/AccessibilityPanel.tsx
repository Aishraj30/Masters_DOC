import React from 'react';
import { fabric } from 'fabric';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { getContrastRatio } from '../../../utils/colorContrast';

interface AccessibilityPanelProps {
  canvas: fabric.Canvas | null;
  backgroundColor: string;
}

export const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ canvas, backgroundColor }) => {
  if (!canvas) return null;

  const activeObj = canvas.getActiveObject();
  const textColor = activeObj && typeof activeObj.fill === 'string' && activeObj.fill.startsWith('#')
    ? activeObj.fill
    : '#ffffff';

  const canvasBg = backgroundColor.startsWith('#') ? backgroundColor : '#0f172a';
  const ratio = getContrastRatio(textColor, canvasBg);
  const ratioFormatted = ratio.toFixed(2);

  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7.0;

  const handleFixContrast = (targetColor: string) => {
    if (activeObj) {
      activeObj.set('fill', targetColor);
      canvas.requestRenderAll();
    }
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">WCAG Accessibility Checker</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Real-time color contrast audit to ensure text readability for all users.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Contrast Score Box */}
        <div className="bg-canva-sidebar border border-canva-border rounded-xl p-4 text-center space-y-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Contrast Ratio</span>
          <div className="text-3xl font-extrabold font-mono text-canva-teal">
            {ratioFormatted} : 1
          </div>
          <p className="text-[11px] text-gray-400">
            Text Color <span className="font-mono text-white" style={{ color: textColor }}>{textColor}</span> vs Canvas Background <span className="font-mono text-white">{canvasBg}</span>
          </p>
        </div>

        {/* WCAG Compliance Badges */}
        <div className="space-y-2.5">
          <div className={`p-3 rounded-xl border flex items-center justify-between ${passesAA ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-red-950/30 border-red-500/40 text-red-300'}`}>
            <div className="flex items-center space-x-2.5">
              {passesAA ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
              <div>
                <span className="font-bold text-xs block">{"WCAG AA Standard (>= 4.5:1)"}</span>
                <span className="text-[10px] opacity-80">Required for readable body text</span>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${passesAA ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
              {passesAA ? 'PASS' : 'FAIL'}
            </span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${passesAAA ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-amber-950/30 border-amber-500/40 text-amber-300'}`}>
            <div className="flex items-center space-x-2.5">
              {passesAAA ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
              <div>
                <span className="font-bold text-xs block">{"WCAG AAA High (>= 7.0:1)"}</span>
                <span className="text-[10px] opacity-80">Enhanced contrast readability</span>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${passesAAA ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {passesAAA ? 'PASS' : 'WARNING'}
            </span>
          </div>
        </div>

        {/* 1-Click Fix Contrast Suggestions */}
        <div className="pt-3 border-t border-canva-border space-y-2.5">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-canva-teal" />
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              1-Click Compliant Fixes
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleFixContrast('#ffffff')}
              className="p-2.5 bg-gray-900 border border-gray-700 hover:border-white rounded-xl text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <div className="w-3 h-3 rounded-full bg-white border border-gray-400" />
              <span>Pure White</span>
            </button>

            <button
              onClick={() => handleFixContrast('#0f172a')}
              className="p-2.5 bg-slate-900 border border-slate-700 hover:border-slate-400 rounded-xl text-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
              <span>Deep Slate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
