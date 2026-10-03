import React, { useState, useMemo } from 'react';
import { fabric } from 'fabric';
import { Search, Sparkles, Grid } from 'lucide-react';
import { ICON_DICTIONARY, IconItem } from '../../../constants/lucideIconDictionary';
import { addLucideIconToCanvas } from '../../../utils/fabricHelpers';

interface IconifyPanelProps {
  canvas: fabric.Canvas | null;
}

const PRESET_CATEGORIES = [
  { name: 'Popular', query: '' },
  { name: 'Interface', query: 'Interface' },
  { name: 'Brands', query: 'Brands' },
  { name: 'Arrows', query: 'Arrows' },
  { name: 'Media', query: 'Media' },
  { name: 'Users', query: 'Users' },
  { name: 'Objects', query: 'Objects' },
  { name: 'Communication', query: 'Communication' },
];

export const IconifyPanel: React.FC<IconifyPanelProps> = ({ canvas }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [selectedColor, setSelectedColor] = useState('#000000');

  // Filter icons locally instantly without network errors
  const filteredIcons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return ICON_DICTIONARY.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Popular' ||
        selectedCategory === '' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!q) return matchesCategory;

      const matchesQuery =
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (catName: string, query: string) => {
    setSelectedCategory(catName);
    if (catName === 'Popular') {
      setSearchQuery('');
    }
  };

  const handleDragStart = (e: React.DragEvent, item: IconItem) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type: 'lucide-icon',
        id: item.id,
        name: item.name,
        color: selectedColor,
      })
    );
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none font-sans">
      {/* Header & Controls */}
      <div className="p-4 border-b border-canva-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Grid className="w-4 h-4 text-canva-teal" />
            <h2 className="font-bold text-sm text-white">Icon Library</h2>
          </div>
          <span className="text-[10px] font-medium bg-canva-teal/20 text-canva-teal px-2 py-0.5 rounded-full">
            {ICON_DICTIONARY.length} Icons
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search icons (user, arrow, brand, device)..."
            className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-canva-border">
          {PRESET_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name, cat.query)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-canva-teal text-black font-semibold'
                  : 'bg-canva-sidebar text-gray-400 hover:text-white hover:bg-canva-hover border border-canva-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Color Picker */}
        <div className="flex items-center justify-between bg-canva-sidebar p-2.5 rounded-xl border border-canva-border">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-canva-teal" /> Icon Color:
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
      </div>

      {/* Icon Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredIcons.length === 0 ? (
          <div className="text-center py-10 text-xs text-gray-400">
            No icons found matching "{searchQuery}". Try a different search term.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {filteredIcons.map((item) => {
              const IconComp = item.icon;
              const displayColor = selectedColor === '#000000' ? 'var(--color-text)' : selectedColor;

              return (
                <button
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => addLucideIconToCanvas(canvas!, IconComp, selectedColor)}
                  className="flex flex-col items-center justify-center p-2 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl hover:border-canva-teal transition-all group cursor-pointer aspect-square"
                  title={`${item.name} (${item.category}) - Click to add to canvas`}
                >
                  <IconComp className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color: displayColor }} />
                  <span className="text-[9px] text-canva-text font-medium text-center truncate w-full mt-1">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
