import React, { useState } from 'react';
import { X, Scaling, Check } from 'lucide-react';
import { CANVAS_PRESETS } from '../../constants/presets';
import { CanvasPreset } from '../../types/canvas';

interface ResizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePreset: CanvasPreset;
  onSelectPreset: (preset: CanvasPreset) => void;
}

export const ResizeModal: React.FC<ResizeModalProps> = ({
  isOpen,
  onClose,
  activePreset,
  onSelectPreset,
}) => {
  const [customWidth, setCustomWidth] = useState<number>(activePreset.width);
  const [customHeight, setCustomHeight] = useState<number>(activePreset.height);

  if (!isOpen) return null;

  const handleApplyCustom = () => {
    const customRatio = (customWidth / (customHeight || 1)).toFixed(2);
    const customPreset: CanvasPreset = {
      id: 'custom',
      name: 'Custom Dimensions',
      width: customWidth,
      height: customHeight,
      aspectRatio: `${customRatio}:1`,
      iconName: 'Maximize',
      category: 'custom',
      description: `Custom Size (${customWidth}×${customHeight} px)`
    };
    onSelectPreset(customPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-canva-panel border border-canva-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scaling className="w-5 h-5 text-canva-teal" />
            <h2 className="font-bold text-base text-white">Resize Canvas</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2.5">
              Popular Dimensions
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {CANVAS_PRESETS.map((preset) => {
                const isSelected = activePreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset);
                      onClose();
                    }}
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-canva-purple/20 border-canva-purple shadow'
                        : 'bg-canva-sidebar border-canva-border hover:bg-canva-hover'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs text-white block">{preset.name}</span>
                      <span className="text-[11px] font-mono text-gray-400 mt-1 block">
                        {preset.width} × {preset.height} px
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-canva-teal mt-2 self-end" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Size Form */}
          <div className="pt-3 border-t border-canva-border">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
              Custom Size (Pixels)
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label className="text-[10px] text-gray-400 block mb-1">Width (px)</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-canva-purple"
                />
              </div>

              <span className="text-gray-500 font-mono pt-4">×</span>

              <div className="flex-1">
                <label className="text-[10px] text-gray-400 block mb-1">Height (px)</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Number(e.target.value))}
                  className="w-full bg-canva-sidebar border border-canva-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-canva-purple"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-canva-sidebar border-t border-canva-border flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-canva-hover transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyCustom}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-canva-purple hover:bg-canva-purple-hover text-white transition-colors"
          >
            Apply Custom Size
          </button>
        </div>
      </div>
    </div>
  );
};
