import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Search, Shapes, Zap, Bot } from 'lucide-react';
import { SCIENTIFIC_ICONS, ScientificIconCategories, ScientificIcon } from '../../../constants/scientificIcons';
import { addSvgIconPath } from '../../../utils/fabricHelpers';
import { PhotoToLineDiagramModal } from '../../modals/PhotoToLineDiagramModal';
import { GroqAiDiagramModal } from '../../modals/GroqAiDiagramModal';

interface IconsPanelProps {
  canvas: fabric.Canvas | null;
  title?: string;
}

export const IconsPanel: React.FC<IconsPanelProps> = ({ canvas, title = 'Line Diagram Library' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isGroqModalOpen, setIsGroqModalOpen] = useState(false);
  const selectedColor = '#000000';
  const strokeWidth = 2; // Default 2px stroke width

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
            <h2 className="font-bold text-sm text-white">{title}</h2>
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

        {/* Feature Action Buttons: Photo to Line Diagram & Groq AI Generator */}
        <div className="space-y-2">
          <button
            onClick={() => setIsPhotoModalOpen(true)}
            className="w-full py-2 px-3 bg-gradient-to-r from-canva-purple to-canva-teal hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center space-x-2 group cursor-pointer border border-canva-teal/40"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform fill-amber-300" />
            <span>Convert Photo to Line Diagram</span>
          </button>

          <button
            onClick={() => setIsGroqModalOpen(true)}
            className="w-full py-2 px-3 bg-gradient-to-r from-amber-400 to-canva-purple hover:opacity-95 text-black font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-2 group cursor-pointer border border-amber-400/40"
          >
            <Bot className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
            <span>Generate with Groq AI</span>
          </button>
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

      <PhotoToLineDiagramModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        canvas={canvas}
      />

      <GroqAiDiagramModal
        isOpen={isGroqModalOpen}
        onClose={() => setIsGroqModalOpen(false)}
        canvas={canvas}
      />
    </div>
  );
};
