import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Play, 
  Scaling, 
  FolderOpen, 
  Save, 
  FilePlus,
  Palette
} from 'lucide-react';
import { CanvasPreset } from '../../types/canvas';

interface HeaderBarProps {
  title: string;
  onTitleChange: (title: string) => void;
  activePreset: CanvasPreset;
  onOpenResizeModal: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onOpenExportModal: () => void;
  onOpenPresentModal: () => void;
  onSaveJson: () => void;
  onLoadJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewDesign: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  onTitleChange,
  activePreset,
  onOpenResizeModal,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenExportModal,
  onOpenPresentModal,
  onSaveJson,
  onLoadJson,
  onNewDesign,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <header className="h-14 bg-canva-sidebar border-b border-canva-border px-4 flex items-center justify-between z-30 select-none">
      {/* Left Section: Logo & File Controls */}
      <div className="flex items-center space-x-4">
        {/* Brand Logo */}
        <div className="flex items-center space-x-2 cursor-pointer group" onClick={onNewDesign}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-canva-purple via-canva-teal to-blue-500 flex items-center justify-center shadow-lg shadow-canva-purple/20 group-hover:scale-105 transition-transform">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm bg-gradient-to-r from-white via-gray-200 to-canva-teal bg-clip-text text-transparent tracking-tight">
              DocMaster
            </span>
            <span className="text-[10px] text-gray-400 font-medium -mt-1">Free Open Source</span>
          </div>
        </div>

        <div className="h-5 w-px bg-canva-border" />

        {/* File Actions */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onNewDesign}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-canva-hover text-xs font-medium text-gray-300 transition-colors"
            title="Create New Blank Design"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New</span>
          </button>

          <button
            onClick={onSaveJson}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-canva-hover text-xs font-medium text-gray-300 transition-colors"
            title="Save Canvas (.docmaster JSON)"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-canva-hover text-xs font-medium text-gray-300 transition-colors"
            title="Load Canvas File"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onLoadJson}
            accept=".docmaster,.canva,.json"
            className="hidden"
          />
        </div>

        <div className="h-5 w-px bg-canva-border" />

        {/* Undo / Redo */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={`p-1.5 rounded-md transition-colors ${
              canUndo ? 'hover:bg-canva-hover text-gray-200' : 'text-gray-600 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={`p-1.5 rounded-md transition-colors ${
              canRedo ? 'hover:bg-canva-hover text-gray-200' : 'text-gray-600 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Section: Document Title & Preset Size */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-transparent hover:bg-canva-hover focus:bg-canva-panel px-2.5 py-1 rounded-md text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-canva-purple text-center max-w-[200px] sm:max-w-[300px] truncate transition-colors"
          placeholder="Untitled Design"
        />

        <button
          onClick={onOpenResizeModal}
          className="flex items-center space-x-1.5 bg-canva-panel hover:bg-canva-hover px-2.5 py-1 rounded-md border border-canva-border text-xs font-medium text-gray-300 transition-colors"
          title="Change Canvas Dimensions"
        >
          <Scaling className="w-3.5 h-3.5 text-canva-teal" />
          <span className="truncate max-w-[120px]">{activePreset.name}</span>
          <span className="text-[10px] text-gray-500 font-mono">
            {activePreset.width}x{activePreset.height}
          </span>
        </button>
      </div>

      {/* Right Section: Present & Export Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenPresentModal}
          className="flex items-center space-x-1.5 bg-canva-panel hover:bg-canva-hover text-gray-200 px-3 py-1.5 rounded-md text-xs font-medium border border-canva-border transition-colors"
          title="Fullscreen Presentation Preview"
        >
          <Play className="w-3.5 h-3.5 text-canva-teal fill-canva-teal" />
          <span className="hidden sm:inline">Present</span>
        </button>

        <button
          onClick={onOpenExportModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-90 text-white px-4 py-1.5 rounded-md text-xs font-bold shadow-md shadow-canva-purple/20 transition-all transform hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>Export Design</span>
        </button>
      </div>
    </header>
  );
};
