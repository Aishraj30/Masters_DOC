import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Search, Shapes, Sparkles } from 'lucide-react';
import { addSvgIconPath } from '../../../utils/fabricHelpers';

interface IconsPanelProps {
  canvas: fabric.Canvas | null;
}

export const IconsPanel: React.FC<IconsPanelProps> = ({ canvas }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('#00c4cc');

  // Vector SVG Paths catalog
  const vectorIcons = [
    {
      name: 'Heart / Like',
      category: 'Social',
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    },
    {
      name: 'Star / Bookmark',
      category: 'Social',
      path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
    },
    {
      name: 'Sparkle / Magic',
      category: 'UI',
      path: 'M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61z'
    },
    {
      name: 'Shield / Security',
      category: 'Security',
      path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z'
    },
    {
      name: 'Lightning / Energy',
      category: 'Badges',
      path: 'M7 2v11h3v9l7-12h-4l4-8z'
    },
    {
      name: 'Shopping Bag / E-Commerce',
      category: 'Business',
      path: 'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z'
    },
    {
      name: 'Rocket / Growth',
      category: 'Business',
      path: 'M12 2.5s-4.5 4.5-4.5 9.5c0 1.5.5 2.9 1.3 4.1L5 19.9l3.8-3.8c1.2.8 2.6 1.3 4.1 1.3 5 0 9.5-4.5 9.5-4.5S17 2.5 12 2.5z'
    },
    {
      name: 'Check Circle / Verified',
      category: 'UI',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    },
    {
      name: 'Globe / World',
      category: 'Communication',
      path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
    },
    {
      name: 'Camera / Media',
      category: 'Media',
      path: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'
    },
    {
      name: 'Trophy / Winner',
      category: 'Badges',
      path: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z'
    },
    {
      name: 'Lock / Security',
      category: 'Security',
      path: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z'
    }
  ];

  if (!canvas) return null;

  const filteredIcons = vectorIcons.filter((icon) =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    icon.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border space-y-3">
        <div className="flex items-center space-x-2">
          <Shapes className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Vector Icon Library</h2>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search icons (heart, star, rocket)..."
            className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal"
          />
        </div>

        {/* Icon Color Picker */}
        <div className="flex items-center justify-between bg-canva-sidebar p-2 rounded-xl border border-canva-border">
          <span className="text-[11px] text-gray-400 font-medium">Default Icon Color:</span>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-canva-border bg-transparent p-0"
            />
            <span className="text-[11px] font-mono text-canva-teal">{selectedColor}</span>
          </div>
        </div>
      </div>

      {/* Icons Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-3">
          {filteredIcons.map((icon, idx) => (
            <button
              key={idx}
              onClick={() => addSvgIconPath(canvas, icon.path, selectedColor)}
              className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl hover:border-canva-teal transition-all group"
            >
              <svg className="w-7 h-7 fill-canva-teal group-hover:scale-110 transition-transform mb-1.5" viewBox="0 0 24 24">
                <path d={icon.path} />
              </svg>
              <span className="text-[10px] text-gray-300 font-medium text-center truncate w-full">
                {icon.name.split('/')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
