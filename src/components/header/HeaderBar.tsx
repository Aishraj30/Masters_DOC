import React, { useEffect, useState } from 'react';
import {
  RotateCcw,
  RotateCw,
  Download,
  Play,
  Scaling,
  FolderOpen,
  Save,
  FilePlus,
  Palette,
  ShieldAlert,
  LogOut,
  UserCheck,
  Clock,
  Home,
  CheckCircle2,
} from 'lucide-react';
import { CanvasPreset } from '../../types/canvas';
import { UserProfile } from '../../utils/auth';

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
  onToggleWatermark: () => void;
  onSaveJson: () => void;
  onLoadJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewDesign: () => void;
  onBackToDashboard: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
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
  onToggleWatermark,
  onSaveJson,
  onLoadJson,
  onNewDesign,
  onBackToDashboard,
  currentUser,
  onLogout,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <header className="h-14 bg-canva-sidebar border-b border-canva-border px-4 flex items-center justify-between z-30 select-none">
      {/* Left Section: Back to Dashboard & Brand Logo & File Controls */}
      <div className="flex items-center space-x-3">
        {/* Home / Back to Dashboard Button */}
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-2 px-3 py-1.5 bg-[#00a854] hover:bg-[#009249] text-white rounded-lg text-xs font-bold transition-all shadow-md"
          title="Return to Projects Dashboard"
        >
          <Home className="w-4 h-4" />
          <span className="hidden md:inline">Dashboard</span>
        </button>

        <div className="h-5 w-px bg-canva-border" />

        {/* Brand Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={onBackToDashboard}
          title="Back to Dashboard"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-canva-purple via-canva-teal to-blue-500 flex items-center justify-center shadow-lg shadow-canva-purple/20 group-hover:scale-105 transition-transform">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="font-bold text-sm bg-gradient-to-r from-white via-gray-200 to-canva-teal bg-clip-text text-transparent tracking-tight">
              RESEARCH RADAR
            </span>
            <span className="text-[10px] text-emerald-400 font-medium -mt-1 flex items-center space-x-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Saved</span>
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-canva-border hidden sm:block" />

        {/* File Actions */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onNewDesign}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-canva-hover text-xs font-medium text-gray-300 transition-colors"
            title="Create New Blank Design"
          >
            <FilePlus className="w-3.5 h-3.5 text-canva-teal" />
            <span className="hidden lg:inline">New</span>
          </button>

          <button
            onClick={onSaveJson}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-canva-hover text-xs font-medium text-gray-300 transition-colors"
            title="Export Canvas File (.docmaster JSON)"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Save</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md hover:bg-canva-hover text-xs font-medium text-gray-300 transition-colors"
            title="Open Canvas File"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Open</span>
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
          className="bg-transparent hover:bg-canva-hover focus:bg-canva-panel px-2.5 py-1 rounded-md text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-canva-purple text-center max-w-[180px] sm:max-w-[280px] truncate transition-colors"
          placeholder="Untitled Design"
        />

        <button
          onClick={onOpenResizeModal}
          className="flex items-center space-x-1.5 bg-canva-panel hover:bg-canva-hover px-2.5 py-1 rounded-md border border-canva-border text-xs font-medium text-gray-300 transition-colors"
          title="Change Canvas Dimensions"
        >
          <Scaling className="w-3.5 h-3.5 text-canva-teal" />
          <span className="truncate max-w-[100px]">{activePreset.name}</span>
          <span className="text-[10px] text-gray-500 font-mono hidden md:inline">
            {activePreset.width}x{activePreset.height}
          </span>
        </button>
      </div>

      {/* Right Section: User Badge, Watermark, Present & Export */}
      <div className="flex items-center space-x-2">
        {/* User Session Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-canva-panel px-2.5 py-1 rounded-md border border-canva-border text-xs text-gray-300">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-white">{currentUser?.name || 'User'}</span>
        </div>

        {/* <button
          onClick={onToggleWatermark}
          className="flex items-center space-x-1.5 bg-canva-panel hover:bg-canva-hover text-amber-300 px-2.5 py-1.5 rounded-md text-xs font-medium border border-amber-500/30 transition-colors"
          title="Toggle Draft Watermark Security Overlay"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Watermark</span>
        </button> */}

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
          <span>Export</span>
        </button>

        <button
          onClick={onLogout}
          className="p-1.5 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
