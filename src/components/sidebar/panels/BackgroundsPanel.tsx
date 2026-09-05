import React from 'react';
import { fabric } from 'fabric';
import { Palette } from 'lucide-react';

interface BackgroundsPanelProps {
  canvas: fabric.Canvas | null;
  backgroundColor: string;
  onSetBackgroundColor: (color: string) => void;
}

export const BackgroundsPanel: React.FC<BackgroundsPanelProps> = ({
  canvas,
  backgroundColor,
  onSetBackgroundColor,
}) => {
  const solidColors = [
    '#ffffff', '#0f172a', '#0e1318', '#7d2ae8', '#00c4cc', '#f59e0b',
    '#ec4899', '#10b981', '#3b82f6', '#ef4444', '#1e293b', '#475569'
  ];

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Canvas Background</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Set stage background colors or transparent workspace background.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Custom Color Input */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Custom Background Color
          </h3>
          <div className="flex items-center space-x-3 bg-canva-sidebar border border-canva-border p-3 rounded-xl">
            <input
              type="color"
              value={backgroundColor.startsWith('#') ? backgroundColor : '#ffffff'}
              onChange={(e) => onSetBackgroundColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border border-canva-border bg-transparent p-0"
            />
            <div>
              <span className="text-xs font-medium text-white block">Solid Color</span>
              <span className="text-[11px] font-mono text-canva-teal">{backgroundColor}</span>
            </div>
          </div>
        </div>

        {/* Solid Color Palette Grid */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Color Presets
          </h3>
          <div className="grid grid-cols-4 gap-2.5">
            {solidColors.map((color) => (
              <button
                key={color}
                onClick={() => onSetBackgroundColor(color)}
                className={`h-12 rounded-xl border-2 transition-transform shadow ${
                  backgroundColor === color ? 'scale-110 border-canva-teal' : 'border-canva-border hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                title={`Set ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
