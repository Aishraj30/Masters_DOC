import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Search, Shapes, Sparkles, Sliders } from 'lucide-react';
import { SCIENTIFIC_ICONS, ScientificIconCategories, ScientificIcon } from '../../../constants/scientificIcons';
import { addSvgIconPath } from '../../../utils/fabricHelpers';

interface IconsPanelProps {
  canvas: fabric.Canvas | null;
}

export const IconsPanel: React.FC<IconsPanelProps> = ({ canvas }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(2); // Default 2px stroke width

  if (!canvas) return null;

  const filteredIcons = SCIENTIFIC_ICONS.filter((icon) => {
    const matchesCategory = selectedCategory === 'All' || icon.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      icon.name.toLowerCase().includes(q) ||
      icon.category.toLowerCase().includes(q) ||
      icon.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  const handleDragStart = (e: React.DragEvent, icon: ScientificIcon) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type: 'icon',
        svgPath: icon.svgPath,
        name: icon.name,
        color: selectedColor,
        strokeWidth: strokeWidth
      })
    );
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      {/* Header & Controls */}
      <div className="p-4 border-b border-canva-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shapes className="w-4 h-4 text-canva-teal" />
            <h2 className="font-bold text-sm text-white">Scientific Icon Library</h2>
          </div>
          <span className="text-[10px] font-medium bg-canva-teal/20 text-canva-teal px-2 py-0.5 rounded-full">
            {SCIENTIFIC_ICONS.length} Icons
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search (cloud, 5g, gnn, sensor)..."
            className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-canva-border">
          {ScientificIconCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-canva-teal text-black font-semibold'
                  : 'bg-canva-sidebar text-gray-400 hover:text-white hover:bg-canva-hover border border-canva-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stroke Color & Stroke Width Controls */}
        <div className="space-y-2 bg-canva-sidebar p-2.5 rounded-xl border border-canva-border">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-canva-teal" /> Stroke Color:
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer border border-canva-border bg-transparent p-0"
              />
              <span className="text-[11px] font-mono text-canva-teal uppercase">{selectedColor}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-canva-border/50">
            <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-canva-purple" /> Line Width:
            </span>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-20 h-1 bg-canva-border rounded appearance-none cursor-pointer accent-canva-purple"
              />
              <span className="text-[11px] font-mono text-canva-purple font-bold">{strokeWidth}px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pure Stroke-Only Icons Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredIcons.length === 0 ? (
          <div className="text-center py-10 text-xs text-gray-400">
            No icons found matching "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {filteredIcons.map((icon) => (
              <button
                key={icon.id}
                draggable
                onDragStart={(e) => handleDragStart(e, icon)}
                onClick={() => addSvgIconPath(canvas, icon.svgPath, selectedColor, undefined, strokeWidth)}
                className="flex flex-col items-center justify-center p-2.5 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl hover:border-canva-teal transition-all group cursor-grab active:cursor-grabbing relative"
                title={`${icon.name} (${icon.category}) - Pure stroke icon (${strokeWidth}px)`}
              >
                <svg
                  className="w-7 h-7 transition-transform group-hover:scale-110 mb-1.5"
                  style={{ color: selectedColor === '#000000' ? '#e2e8f0' : selectedColor }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icon.svgPath} />
                </svg>
                <span className="text-[10px] text-gray-300 font-medium text-center truncate w-full group-hover:text-white">
                  {icon.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
