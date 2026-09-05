import React, { useState } from 'react';
import { X, Plus, Ratio, Check, AspectRatio } from 'lucide-react';
import { CANVAS_PRESETS } from '../../constants/presets';
import { CanvasPreset } from '../../types/canvas';

interface NewPageRatioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmAddPage: (preset: CanvasPreset) => void;
  defaultPreset: CanvasPreset;
}

export const NewPageRatioModal: React.FC<NewPageRatioModalProps> = ({
  isOpen,
  onClose,
  onConfirmAddPage,
  defaultPreset,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<CanvasPreset>(defaultPreset);
  const [customWidth, setCustomWidth] = useState<number>(defaultPreset.width);
  const [customHeight, setCustomHeight] = useState<number>(defaultPreset.height);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (isCustomMode) {
      const customRatio = (customWidth / customHeight).toFixed(2);
      const custom: CanvasPreset = {
        id: 'custom',
        name: 'Custom Page Ratio',
        width: customWidth,
        height: customHeight,
        aspectRatio: `${customRatio}:1`,
        iconName: 'Maximize',
        category: 'custom',
        description: `Custom Dimensions (${customWidth}×${customHeight} px)`
      };
      onConfirmAddPage(custom);
    } else {
      onConfirmAddPage(selectedPreset);
    }
    onClose();
  };

  // Helper to render visual aspect ratio shape box
  const renderRatioBox = (aspectRatio: string) => {
    switch (aspectRatio) {
      case '1:1':
        return <div className="w-10 h-10 border-2 border-canva-teal rounded bg-canva-purple/20" />;
      case '9:16':
        return <div className="w-6 h-10 border-2 border-canva-teal rounded bg-canva-purple/20" />;
      case '16:9':
      case '16:9 HD':
        return <div className="w-12 h-7 border-2 border-canva-teal rounded bg-canva-purple/20" />;
      case '4:5':
        return <div className="w-8 h-10 border-2 border-canva-teal rounded bg-canva-purple/20" />;
      case '1:1.4 (A4)':
        return <div className="w-7 h-10 border-2 border-canva-teal rounded bg-canva-purple/20" />;
      case '3:2':
        return <div className="w-10 h-7 border-2 border-canva-teal rounded bg-canva-purple/20" />;
      default:
        return <div className="w-10 h-6 border-2 border-canva-teal rounded bg-canva-purple/20" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="bg-canva-panel border border-canva-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
          <div className="flex items-center space-x-2">
            <Ratio className="w-5 h-5 text-canva-teal" />
            <div>
              <h2 className="font-bold text-base text-white">Choose New Page Aspect Ratio & Size</h2>
              <p className="text-xs text-gray-400">Select the aspect ratio or page dimensions for your new page.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Presets Grid */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-3">
              Standard Aspect Ratios & Page Sizes
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CANVAS_PRESETS.map((preset) => {
                const isSelected = !isCustomMode && selectedPreset.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setIsCustomMode(false);
                    }}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-canva-purple/20 border-canva-teal shadow-lg shadow-canva-purple/20'
                        : 'bg-canva-sidebar border-canva-border hover:bg-canva-hover hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 flex items-center justify-center bg-canva-panel rounded-lg border border-canva-border">
                        {renderRatioBox(preset.aspectRatio)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-white">{preset.name}</span>
                          <span className="text-[10px] font-bold bg-canva-purple text-white px-2 py-0.5 rounded-full">
                            {preset.aspectRatio}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-canva-teal font-medium mt-0.5 block">
                          {preset.width} × {preset.height} px
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">
                          {preset.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-canva-teal flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Aspect Ratio Section */}
          <div className="pt-4 border-t border-canva-border">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Custom Page Ratio & Pixel Dimensions
              </label>
              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                  isCustomMode ? 'bg-canva-teal text-gray-950' : 'bg-canva-sidebar text-gray-300 hover:bg-canva-hover'
                }`}
              >
                {isCustomMode ? 'Custom Active' : 'Use Custom Size'}
              </button>
            </div>

            {isCustomMode && (
              <div className="p-4 bg-canva-sidebar border border-canva-teal/50 rounded-xl space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <label className="text-[11px] text-gray-400 block mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="w-full bg-canva-panel border border-canva-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-canva-teal"
                    />
                  </div>

                  <span className="text-gray-400 font-bold pt-4 text-sm">×</span>

                  <div className="flex-1">
                    <label className="text-[11px] text-gray-400 block mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="w-full bg-canva-panel border border-canva-border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-canva-teal"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-canva-teal font-mono flex items-center space-x-2">
                  <span>Calculated Aspect Ratio:</span>
                  <span className="font-bold bg-canva-panel px-2 py-0.5 rounded border border-canva-border">
                    {(customWidth / (customHeight || 1)).toFixed(2)} : 1
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-canva-sidebar border-t border-canva-border flex items-center justify-between">
          <div className="text-xs text-gray-400 font-mono">
            Selected Ratio: <span className="text-canva-teal font-bold">{isCustomMode ? 'Custom' : selectedPreset.aspectRatio}</span> ({isCustomMode ? `${customWidth}x${customHeight}` : `${selectedPreset.width}x${selectedPreset.height}`} px)
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-canva-hover transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-90 text-white shadow-lg shadow-canva-purple/30 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Insert New Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
