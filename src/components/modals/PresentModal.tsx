import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { CanvasPage } from '../../types/canvas';

interface PresentModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: fabric.Canvas | null;
  pages: CanvasPage[];
  currentPageId: string;
}

export const PresentModal: React.FC<PresentModalProps> = ({
  isOpen,
  onClose,
  canvas,
  pages,
  currentPageId,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && canvas) {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      const url = canvas.toDataURL({
        format: 'png',
        multiplier: 2,
      });
      setDataUrl(url);
    }
  }, [isOpen, canvas]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-6 select-none animate-in fade-in duration-300">
      {/* Floating Header controls */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-2 bg-gray-900/80 px-3 py-1.5 rounded-full border border-gray-800 backdrop-blur-md">
          <Play className="w-4 h-4 text-canva-teal fill-canva-teal" />
          <span className="text-xs font-semibold text-white">Presentation Mode</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-900/80 border border-gray-800 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          title="Exit Fullscreen (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 w-full flex items-center justify-center p-4 overflow-hidden">
        {dataUrl && (
          <img
            src={dataUrl}
            alt="Presentation Canvas"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-gray-800"
          />
        )}
      </div>

      {/* Footer info */}
      <div className="z-10 text-xs text-gray-400 font-mono">
        Press <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-200">ESC</kbd> to return to Canva Editor
      </div>
    </div>
  );
};
