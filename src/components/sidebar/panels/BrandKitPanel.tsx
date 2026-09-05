import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Palette, Plus, Sparkles, Check, Trash2 } from 'lucide-react';
import { BrandPalette } from '../../../types/canvas';

interface BrandKitPanelProps {
  canvas: fabric.Canvas | null;
  onSetBackgroundColor: (color: string) => void;
}

export const BrandKitPanel: React.FC<BrandKitPanelProps> = ({ canvas, onSetBackgroundColor }) => {
  const [palettes, setPalettes] = useState<BrandPalette[]>([
    {
      id: 'cyber-neon',
      name: 'Cyber Neon',
      colors: ['#0f172a', '#00c4cc', '#7d2ae8', '#f59e0b', '#ec4899'],
    },
    {
      id: 'luxury-gold',
      name: 'Luxury Gold & Slate',
      colors: ['#090d16', '#fbbf24', '#f59e0b', '#d97706', '#fef3c7'],
    },
    {
      id: 'pastel-soft',
      name: 'Pastel Dreams',
      colors: ['#f8fafc', '#a7f3d0', '#bae6fd', '#fbcfe8', '#fef08a'],
    },
    {
      id: 'sunset-glow',
      name: 'Sunset Glow',
      colors: ['#1e1b4b', '#ec4899', '#f97316', '#eab308', '#ffffff'],
    },
    {
      id: 'emerald-forest',
      name: 'Emerald Forest',
      colors: ['#064e3b', '#059669', '#34d399', '#a7f3d0', '#ecfdf5'],
    },
  ]);

  const [newPaletteName, setNewPaletteName] = useState('');
  const [newColors, setNewColors] = useState<string[]>(['#3b82f6', '#10b981', '#f59e0b', '#ef4444']);

  if (!canvas) return null;

  const handleApplyColorToSelected = (color: string) => {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      activeObj.set('fill', color);
      canvas.requestRenderAll();
    } else {
      onSetBackgroundColor(color);
    }
  };

  const handleApplyWholePalette = (colors: string[]) => {
    const objects = canvas.getObjects();
    if (objects.length === 0) {
      onSetBackgroundColor(colors[0]);
      return;
    }

    // Set background to first color
    onSetBackgroundColor(colors[0]);

    // Recolor objects sequentially
    objects.forEach((obj, idx) => {
      const color = colors[(idx + 1) % colors.length];
      if (obj.type === 'i-text') {
        (obj as fabric.IText).set('fill', color);
      } else {
        obj.set('fill', color);
      }
    });

    canvas.requestRenderAll();
  };

  const handleCreatePalette = () => {
    if (!newPaletteName.trim()) return;
    const newPal: BrandPalette = {
      id: `custom-${Date.now()}`,
      name: newPaletteName.trim(),
      colors: [...newColors],
    };
    setPalettes([newPal, ...palettes]);
    setNewPaletteName('');
  };

  const handleDeletePalette = (id: string) => {
    setPalettes(palettes.filter((p) => p.id !== id));
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Brand Kit & Palettes</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Save custom brand colors and apply cohesive color themes across your design.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Saved Palettes */}
        <div className="space-y-4">
          {palettes.map((pal) => (
            <div
              key={pal.id}
              className="p-3.5 bg-canva-sidebar border border-canva-border rounded-xl space-y-2.5 hover:border-canva-purple transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{pal.name}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleApplyWholePalette(pal.colors)}
                    className="text-[10px] bg-canva-purple hover:bg-canva-purple-hover text-white font-semibold px-2 py-0.5 rounded transition-colors"
                    title="Apply color scheme to entire canvas"
                  >
                    Apply Theme
                  </button>
                  {pal.id.startsWith('custom') && (
                    <button
                      onClick={() => handleDeletePalette(pal.id)}
                      className="text-gray-400 hover:text-red-400 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Color Swatches Grid */}
              <div className="flex items-center space-x-2">
                {pal.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyColorToSelected(color)}
                    className="flex-1 h-8 rounded-lg border border-canva-border hover:scale-105 transition-transform shadow-sm relative group"
                    style={{ backgroundColor: color }}
                    title={`Click to fill selected object with ${color}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Create Custom Palette */}
        <div className="pt-4 border-t border-canva-border space-y-3">
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Create Custom Brand Palette
          </h3>
          <input
            type="text"
            value={newPaletteName}
            onChange={(e) => setNewPaletteName(e.target.value)}
            placeholder="Palette Name (e.g. My Startup Colors)"
            className="w-full bg-canva-sidebar border border-canva-border rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-1 focus:ring-canva-teal"
          />

          <div className="flex items-center space-x-2">
            {newColors.map((color, idx) => (
              <input
                key={idx}
                type="color"
                value={color}
                onChange={(e) => {
                  const updated = [...newColors];
                  updated[idx] = e.target.value;
                  setNewColors(updated);
                }}
                className="w-8 h-8 rounded cursor-pointer border border-canva-border bg-transparent p-0 flex-1"
              />
            ))}
          </div>

          <button
            onClick={handleCreatePalette}
            disabled={!newPaletteName.trim()}
            className="w-full py-2.5 bg-canva-teal hover:bg-canva-teal/90 disabled:opacity-50 text-gray-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Save Brand Palette</span>
          </button>
        </div>
      </div>
    </div>
  );
};
