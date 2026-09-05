import React from 'react';
import { fabric } from 'fabric';
import { Type, Sparkles } from 'lucide-react';
import { 
  addHeadingText, 
  addSubheadingText, 
  addBodyText 
} from '../../../utils/fabricHelpers';

interface TextPanelProps {
  canvas: fabric.Canvas | null;
}

export const TextPanel: React.FC<TextPanelProps> = ({ canvas }) => {
  if (!canvas) return null;

  const addStylizedPreset = (type: 'neon' | 'cyber' | 'elegant' | 'vintage') => {
    const center = canvas.getCenter();
    switch (type) {
      case 'neon': {
        const text = new fabric.IText('NEON NIGHTS', {
          left: center.left - 180,
          top: center.top - 30,
          fontSize: 60,
          fontFamily: 'Pacifico',
          fill: '#00f0ff',
          shadow: new fabric.Shadow({
            color: '#00f0ff',
            blur: 25,
            offsetX: 0,
            offsetY: 0,
          }),
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
      case 'cyber': {
        const text = new fabric.IText('CYBERPUNK 2026', {
          left: center.left - 200,
          top: center.top - 30,
          fontSize: 56,
          fontFamily: 'Anton',
          fill: '#fde047',
          stroke: '#000000',
          strokeWidth: 3,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
      case 'elegant': {
        const text = new fabric.IText('Haute Couture', {
          left: center.left - 150,
          top: center.top - 30,
          fontSize: 52,
          fontFamily: 'Playfair Display',
          fontStyle: 'italic',
          fill: '#ffffff',
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
      case 'vintage': {
        const text = new fabric.IText('ESTABLISHED 1994', {
          left: center.left - 160,
          top: center.top - 30,
          fontSize: 36,
          fontFamily: 'Oswald',
          fontWeight: 'bold',
          fill: '#f59e0b',
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
    }
    canvas.requestRenderAll();
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Text Studio</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Add customizable headers, body text, or stylized font combinations.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Standard Text Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => addHeadingText(canvas)}
            className="w-full text-left p-3.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl font-bold text-xl text-white transition-all transform hover:scale-[1.01] flex items-center justify-between"
          >
            <span className="font-sans font-extrabold text-2xl">Add a heading</span>
            <span className="text-[10px] text-canva-teal bg-canva-purple/20 px-2 py-0.5 rounded">
              54px
            </span>
          </button>

          <button
            onClick={() => addSubheadingText(canvas)}
            className="w-full text-left p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl font-semibold text-base text-gray-200 transition-all transform hover:scale-[1.01] flex items-center justify-between"
          >
            <span className="font-sans font-semibold text-base">Add a subheading</span>
            <span className="text-[10px] text-gray-400 bg-canva-panel px-2 py-0.5 rounded">
              32px
            </span>
          </button>

          <button
            onClick={() => addBodyText(canvas)}
            className="w-full text-left p-2.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl text-xs text-gray-400 transition-all transform hover:scale-[1.01] flex items-center justify-between"
          >
            <span className="font-sans text-xs">Add a little bit of body text</span>
            <span className="text-[10px] text-gray-400 bg-canva-panel px-2 py-0.5 rounded">
              22px
            </span>
          </button>
        </div>

        {/* Stylized Typography Combinations */}
        <div>
          <div className="flex items-center space-x-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-canva-teal" />
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Font Effects & Combinations
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => addStylizedPreset('neon')}
              className="p-4 bg-gray-950 border border-cyan-500/30 rounded-xl hover:border-cyan-400 text-center transition-all group"
            >
              <span className="font-serif text-cyan-400 font-bold text-sm tracking-wide group-hover:scale-105 inline-block transition-transform">
                NEON GLOW
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('cyber')}
              className="p-4 bg-yellow-950/40 border border-yellow-500/30 rounded-xl hover:border-yellow-400 text-center transition-all group"
            >
              <span className="font-mono text-yellow-300 font-extrabold text-xs tracking-wider group-hover:scale-105 inline-block transition-transform">
                CYBERPUNK
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('elegant')}
              className="p-4 bg-slate-900 border border-slate-700 rounded-xl hover:border-slate-500 text-center transition-all group"
            >
              <span className="font-serif italic text-white text-sm group-hover:scale-105 inline-block transition-transform">
                Haute Couture
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('vintage')}
              className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl hover:border-amber-400 text-center transition-all group"
            >
              <span className="font-sans font-bold text-amber-400 text-xs tracking-widest group-hover:scale-105 inline-block transition-transform">
                VINTAGE 1994
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
