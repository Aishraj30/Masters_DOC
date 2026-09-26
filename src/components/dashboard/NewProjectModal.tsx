import React, { useState } from 'react';
import { X, Plus, Sparkles, Layout, Monitor, Instagram, FileText } from 'lucide-react';
import { CANVAS_PRESETS } from '../../constants/presets';
import { CanvasPreset } from '../../types/canvas';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (title: string, preset: CanvasPreset) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [title, setTitle] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<CanvasPreset>(CANVAS_PRESETS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProject(title || 'Untitled Project', selectedPreset);
    setTitle('');
    onClose();
  };

  const getPresetIcon = (presetId: string) => {
    switch (presetId) {
      case 'presentation':
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case 'instagram-post':
        return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'a4':
        return <FileText className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layout className="w-5 h-5 text-canva-teal" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-canva-panel border border-canva-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-canva-border bg-canva-sidebar/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-canva-teal/20 text-canva-teal flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Create New Project</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-canva-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Project Title Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Presentation, Resume, Design..."
              autoFocus
              className="w-full bg-canva-sidebar border border-canva-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium"
            />
          </div>

          {/* Preset Dimensions Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Select Canvas Format
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
              {CANVAS_PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={`flex items-start space-x-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-canva-purple/20 border-canva-purple text-white shadow-md'
                        : 'bg-canva-sidebar border-canva-border text-gray-300 hover:border-gray-600 hover:text-white'
                    }`}
                  >
                    <div className="mt-0.5">{getPresetIcon(preset.id)}</div>
                    <div>
                      <div className="text-xs font-bold">{preset.name}</div>
                      <div className="text-[11px] text-gray-400">
                        {preset.width} × {preset.height} px
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-canva-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-canva-sidebar transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-canva-teal to-canva-purple hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
