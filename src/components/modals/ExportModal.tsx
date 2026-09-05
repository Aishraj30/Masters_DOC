import React, { useState } from 'react';
import { fabric } from 'fabric';
import { X, Download, FileImage, FileCode, FileText, CheckCircle2 } from 'lucide-react';
import { exportCanvas, ExportFormat } from '../../utils/export';

interface ExportModalProps {
  canvas: fabric.Canvas | null;
  isOpen: boolean;
  onClose: () => void;
  designTitle: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  canvas,
  isOpen,
  onClose,
  designTitle,
}) => {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [scale, setScale] = useState<number>(2);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen || !canvas) return null;

  const handleExport = async () => {
    setIsExporting(true);
    await exportCanvas(canvas, format, designTitle, scale);
    setIsExporting(false);
    onClose();
  };

  const formatOptions = [
    {
      id: 'png' as ExportFormat,
      name: 'PNG Image',
      desc: 'High quality image with transparent background support.',
      icon: FileImage,
      badge: 'Best for Web',
    },
    {
      id: 'jpeg' as ExportFormat,
      name: 'JPG Image',
      desc: 'Small file size ideal for social media sharing.',
      icon: FileImage,
      badge: 'Small Size',
    },
    {
      id: 'svg' as ExportFormat,
      name: 'SVG Vector',
      desc: 'Scalable vector graphic for printing and illustrations.',
      icon: FileCode,
      badge: 'Vector',
    },
    {
      id: 'pdf' as ExportFormat,
      name: 'PDF Document',
      desc: 'High resolution print-ready document.',
      icon: FileText,
      badge: 'Print Ready',
    },
    {
      id: 'json' as ExportFormat,
      name: '.docmaster JSON Project',
      desc: 'Editable raw file to reload design state anytime.',
      icon: FileCode,
      badge: 'Editable Backup',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-canva-panel border border-canva-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-canva-teal" />
            <h2 className="font-bold text-base text-white">Export Design</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* File Format Selection */}
          <div>
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2.5">
              Select File Format
            </label>
            <div className="space-y-2">
              {formatOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = format === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setFormat(opt.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-canva-purple/20 border-canva-purple shadow-md'
                        : 'bg-canva-sidebar border-canva-border hover:bg-canva-hover'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-canva-purple text-white' : 'bg-canva-panel text-gray-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-xs text-white">{opt.name}</span>
                          <span className="text-[9px] bg-canva-panel text-canva-teal px-1.5 py-0.5 rounded font-mono">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-canva-teal" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scale Resolution Multiplier (PNG / JPG / PDF) */}
          {(format === 'png' || format === 'jpeg' || format === 'pdf') && (
            <div className="pt-2 border-t border-canva-border">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Quality & Scale Multiplier
                </label>
                <span className="text-xs font-mono text-canva-teal">{scale}x Resolution</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      scale === s
                        ? 'bg-canva-purple text-white border-canva-purple shadow'
                        : 'bg-canva-sidebar border-canva-border text-gray-400 hover:text-white'
                    }`}
                  >
                    {s}x ({s * (canvas.width || 1080)}px)
                  </button>
                ))}
              </div>
            </div>
          )}
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
            onClick={handleExport}
            disabled={isExporting}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-90 text-white shadow-lg shadow-canva-purple/30 transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Download File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
