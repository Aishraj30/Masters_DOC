import React from 'react';
import { Plus, Copy, Trash2, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { CanvasPage } from '../../types/canvas';

interface PageManagerProps {
  pages: CanvasPage[];
  currentPageId: string;
  onSelectPage: (id: string) => void;
  onOpenAddPageModal: () => void;
  onDuplicatePage: (id: string) => void;
  onDeletePage: (id: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onZoomFit: () => void;
}

export const PageManager: React.FC<PageManagerProps> = ({
  pages,
  currentPageId,
  onSelectPage,
  onOpenAddPageModal,
  onDuplicatePage,
  onDeletePage,
  zoom,
  setZoom,
  onZoomFit,
}) => {
  const currentPageIndex = pages.findIndex((p) => p.id === currentPageId);
  const currentPage = pages[currentPageIndex] || pages[0];

  return (
    <div className="h-12 bg-canva-panel border-t border-canva-border px-4 flex items-center justify-between z-20 text-xs text-gray-300 select-none">
      {/* Page Navigation & Ratio Info */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-canva-sidebar px-2.5 py-1 rounded-md border border-canva-border">
          <span className="font-medium text-gray-200">
            Page {currentPageIndex + 1} of {pages.length}
          </span>
          {currentPage?.aspectRatio && (
            <span className="text-[10px] font-mono bg-canva-purple text-white px-1.5 py-0.5 rounded font-bold">
              {currentPage.aspectRatio}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1 border-r border-canva-border pr-3">
          <button
            onClick={onOpenAddPageModal}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-canva-hover hover:bg-canva-purple text-white transition-colors"
            title="Add New Page with Custom Ratio"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Page</span>
          </button>

          <button
            onClick={() => onDuplicatePage(currentPageId)}
            className="p-1.5 rounded-md hover:bg-canva-hover text-gray-300 hover:text-white transition-colors"
            title="Duplicate Current Page"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          {pages.length > 1 && (
            <button
              onClick={() => onDeletePage(currentPageId)}
              className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
              title="Delete Current Page"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Page Switcher Tabs with Ratio Badges */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-md scrollbar-none">
          {pages.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => onSelectPage(page.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all flex items-center space-x-1.5 ${
                page.id === currentPageId
                  ? 'bg-canva-purple text-white font-semibold shadow'
                  : 'bg-canva-sidebar hover:bg-canva-hover text-gray-400'
              }`}
            >
              <span>{idx + 1}</span>
              <span className="text-[9px] opacity-75 font-mono">({page.aspectRatio || '1:1'})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setZoom(Math.max(10, zoom - 10))}
          className="p-1 rounded hover:bg-canva-hover text-gray-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <div className="w-14 text-center font-mono font-medium text-gray-200">
          {zoom}%
        </div>

        <button
          onClick={() => setZoom(Math.min(500, zoom + 10))}
          className="p-1 rounded hover:bg-canva-hover text-gray-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-canva-border mx-1" />

        <button
          onClick={onZoomFit}
          className="p-1 rounded hover:bg-canva-hover text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="text-[11px]">Fit</span>
        </button>
      </div>
    </div>
  );
};
