import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Type, Sparkles, Search, BookOpen, Layers } from 'lucide-react';
import { 
  addHeadingText, 
  addSubheadingText, 
  addBodyText 
} from '../../../utils/fabricHelpers';
import { GOOGLE_FONTS, loadGoogleFont } from '../../../constants/fonts';
import { FontOption } from '../../../types/canvas';

interface TextPanelProps {
  canvas: fabric.Canvas | null;
}

export const TextPanel: React.FC<TextPanelProps> = ({ canvas }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!canvas) return null;

  const categories = ['All', 'sans-serif', 'serif', 'display', 'handwriting', 'monospace'] as const;

  const filteredFonts = GOOGLE_FONTS.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || f.name.toLowerCase().includes(q) || f.family.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleApplyFont = (font: FontOption) => {
    loadGoogleFont(font.family);
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type === 'i-text') {
      (activeObj as fabric.IText).set('fontFamily', font.family);
      canvas.requestRenderAll();
    } else {
      const center = canvas.getCenter();
      const newText = new fabric.IText(`Sample ${font.name}`, {
        left: center.left - 120,
        top: center.top - 20,
        fontSize: 36,
        fontFamily: font.family,
        fill: '#ffffff',
      });
      canvas.add(newText);
      canvas.setActiveObject(newText);
      canvas.requestRenderAll();
    }
  };

  const addLaTeXTitle = () => {
    const center = canvas.getCenter();
    const latexTitle = new fabric.IText('IEEE / ACM Research Title', {
      left: center.left - 200,
      top: center.top - 30,
      fontSize: 38,
      fontFamily: 'Playfair Display',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fill: '#ffffff',
    });
    canvas.add(latexTitle);
    canvas.setActiveObject(latexTitle);
    canvas.requestRenderAll();
  };

  const addStylizedPreset = (type: 'neon' | 'cyber' | 'elegant' | 'vintage' | 'academic' | 'synthwave' | 'gold' | 'code') => {
    const center = canvas.getCenter();
    switch (type) {
      case 'neon': {
        loadGoogleFont('Pacifico');
        const text = new fabric.IText('NEON NIGHTS', {
          left: center.left - 180,
          top: center.top - 30,
          fontSize: 58,
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
        loadGoogleFont('Anton');
        const text = new fabric.IText('CYBERPUNK 2026', {
          left: center.left - 200,
          top: center.top - 30,
          fontSize: 54,
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
        loadGoogleFont('Playfair Display');
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
        loadGoogleFont('Oswald');
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
      case 'academic': {
        loadGoogleFont('Cinzel');
        const text = new fabric.IText('SYSTEM ARCHITECTURE', {
          left: center.left - 220,
          top: center.top - 30,
          fontSize: 42,
          fontFamily: 'Cinzel',
          fontWeight: 'bold',
          charSpacing: 100,
          fill: '#38bdf8',
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
      case 'synthwave': {
        loadGoogleFont('Monoton');
        const text = new fabric.IText('RETRO SYNTH', {
          left: center.left - 180,
          top: center.top - 30,
          fontSize: 48,
          fontFamily: 'Monoton',
          fill: '#ec4899',
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
      case 'gold': {
        loadGoogleFont('Abril Fatface');
        const text = new fabric.IText('LUXURY GOLD', {
          left: center.left - 170,
          top: center.top - 30,
          fontSize: 46,
          fontFamily: 'Abril Fatface',
          fill: '#fbbf24',
          shadow: new fabric.Shadow({
            color: '#d97706',
            blur: 10,
            offsetX: 2,
            offsetY: 2,
          }),
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        break;
      }
      case 'code': {
        loadGoogleFont('Fira Code');
        const text = new fabric.IText('const result = await fn();', {
          left: center.left - 190,
          top: center.top - 30,
          fontSize: 28,
          fontFamily: 'Fira Code',
          fill: '#a7f3d0',
          textBackgroundColor: '#0f172a',
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
      {/* Header Studio Title */}
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Canva Text Studio</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Add headers, stylized typography presets, or choose Google Fonts.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-canva-border">
        {/* Standard Hierarchy Quick Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => addHeadingText(canvas)}
            className="w-full text-left p-3.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl text-white transition-all transform hover:scale-[1.01] flex items-center justify-between group"
          >
            <span className="font-sans font-extrabold text-2xl group-hover:text-canva-teal transition-colors">Add a heading</span>
            <span className="text-[10px] text-canva-teal bg-canva-purple/20 px-2 py-0.5 rounded font-mono">
              54px
            </span>
          </button>

          <button
            onClick={() => addSubheadingText(canvas)}
            className="w-full text-left p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl text-gray-200 transition-all transform hover:scale-[1.01] flex items-center justify-between group"
          >
            <span className="font-sans font-semibold text-base group-hover:text-white transition-colors">Add a subheading</span>
            <span className="text-[10px] text-gray-400 bg-canva-panel px-2 py-0.5 rounded font-mono">
              32px
            </span>
          </button>

          <button
            onClick={() => addBodyText(canvas)}
            className="w-full text-left p-2.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl text-gray-400 transition-all transform hover:scale-[1.01] flex items-center justify-between group"
          >
            <span className="font-sans text-xs group-hover:text-gray-200 transition-colors">Add a little bit of body text</span>
            <span className="text-[10px] text-gray-400 bg-canva-panel px-2 py-0.5 rounded font-mono">
              22px
            </span>
          </button>

          <button
            onClick={addLaTeXTitle}
            className="w-full text-left p-2.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl text-gray-300 transition-all flex items-center justify-between group"
          >
            <span className="font-serif italic font-bold text-sm text-cyan-300">LaTeX / ACM Paper Title</span>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded font-mono">
              38px
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
              className="p-3 bg-gray-950 border border-cyan-500/30 rounded-xl hover:border-cyan-400 text-center transition-all group"
            >
              <span className="font-serif text-cyan-400 font-bold text-xs tracking-wide group-hover:scale-105 inline-block transition-transform">
                NEON GLOW
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('cyber')}
              className="p-3 bg-yellow-950/40 border border-yellow-500/30 rounded-xl hover:border-yellow-400 text-center transition-all group"
            >
              <span className="font-mono text-yellow-300 font-extrabold text-[11px] tracking-wider group-hover:scale-105 inline-block transition-transform">
                CYBERPUNK
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('elegant')}
              className="p-3 bg-slate-900 border border-slate-700 rounded-xl hover:border-slate-500 text-center transition-all group"
            >
              <span className="font-serif italic text-white text-xs group-hover:scale-105 inline-block transition-transform">
                Haute Couture
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('vintage')}
              className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl hover:border-amber-400 text-center transition-all group"
            >
              <span className="font-sans font-bold text-amber-400 text-[11px] tracking-widest group-hover:scale-105 inline-block transition-transform">
                VINTAGE 1994
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('academic')}
              className="p-3 bg-sky-950/40 border border-sky-500/30 rounded-xl hover:border-sky-400 text-center transition-all group"
            >
              <span className="font-serif font-bold text-sky-300 text-[11px] tracking-widest group-hover:scale-105 inline-block transition-transform">
                ACADEMIC
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('synthwave')}
              className="p-3 bg-pink-950/40 border border-pink-500/30 rounded-xl hover:border-pink-400 text-center transition-all group"
            >
              <span className="font-mono font-bold text-pink-400 text-[11px] tracking-wider group-hover:scale-105 inline-block transition-transform">
                SYNTHWAVE
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('gold')}
              className="p-3 bg-amber-950/50 border border-yellow-500/40 rounded-xl hover:border-yellow-300 text-center transition-all group"
            >
              <span className="font-serif font-bold text-yellow-300 text-[11px] tracking-wider group-hover:scale-105 inline-block transition-transform">
                GOLD GLAM
              </span>
            </button>

            <button
              onClick={() => addStylizedPreset('code')}
              className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl hover:border-emerald-400 text-center transition-all group"
            >
              <span className="font-mono text-emerald-300 font-medium text-[10px] group-hover:scale-105 inline-block transition-transform">
                CODE BLOCK
              </span>
            </button>
          </div>
        </div>

        {/* Google Font Library Browser */}
        <div className="space-y-3 pt-2 border-t border-canva-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-canva-teal" />
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Google Font Catalog
              </h3>
            </div>
            <span className="text-[10px] text-canva-teal bg-canva-teal/10 px-2 py-0.5 rounded-full font-mono">
              {filteredFonts.length} Fonts
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fonts (Inter, Playfair, Code)..."
              className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 text-[10px] font-medium rounded-lg capitalize whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-canva-teal text-black font-semibold'
                    : 'bg-canva-sidebar text-gray-400 hover:text-white border border-canva-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Font Items List */}
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-canva-border">
            {filteredFonts.map((font) => (
              <button
                key={font.family}
                onClick={() => handleApplyFont(font)}
                onMouseEnter={() => loadGoogleFont(font.family)}
                className="w-full text-left p-2.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl transition-all flex items-center justify-between group"
              >
                <div>
                  <span
                    className="text-sm text-gray-200 group-hover:text-canva-teal transition-colors block"
                    style={{ fontFamily: font.family }}
                  >
                    {font.name}
                  </span>
                  <span className="text-[10px] text-gray-500 capitalize">{font.category}</span>
                </div>
                <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-canva-panel px-2 py-0.5 rounded">
                  Apply
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
