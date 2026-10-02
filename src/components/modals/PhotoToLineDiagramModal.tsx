import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { 
  X, 
  UploadCloud, 
  Sliders, 
  Sparkles, 
  Check, 
  RefreshCw, 
  Layers, 
  Sun,
  Aperture,
  Zap
} from 'lucide-react';
import { 
  convertImageToLineDiagram, 
  LineDiagramOptions, 
  LineDiagramResult 
} from '../../utils/imageToLineDiagram';
import { addSvgIconPath } from '../../utils/fabricHelpers';

interface PhotoToLineDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvas: fabric.Canvas | null;
}

const SAMPLE_PRESET_IMAGES = [
  {
    name: 'Desk Lamp',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Fountain Pen',
    url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Camera Lens',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Chemistry Flask',
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&auto=format&fit=crop&q=80',
  },
];

export const PhotoToLineDiagramModal: React.FC<PhotoToLineDiagramModalProps> = ({
  isOpen,
  onClose,
  canvas,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>(SAMPLE_PRESET_IMAGES[0].url);
  const [loadedImgElement, setLoadedImgElement] = useState<HTMLImageElement | null>(null);

  // Line Diagram settings
  const [sensitivity, setSensitivity] = useState<number>(55);
  const [noiseSuppression, setNoiseSuppression] = useState<number>(2);
  const [detailLevel, setDetailLevel] = useState<'simple' | 'detailed'>('detailed');
  const [strokeColor, setStrokeColor] = useState<string>('#00c4cc');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [invertEdges, setInvertEdges] = useState<boolean>(false);

  // Output generated vector path
  const [result, setResult] = useState<LineDiagramResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Load HTMLImageElement whenever image source changes
  useEffect(() => {
    if (!selectedImageSrc) return;
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedImageSrc;
    img.onload = () => {
      setLoadedImgElement(img);
      setIsProcessing(false);
    };
    img.onerror = () => {
      setIsProcessing(false);
    };
  }, [selectedImageSrc]);

  // Re-generate vector line diagram when image or settings change
  useEffect(() => {
    if (!loadedImgElement) return;

    setIsProcessing(true);
    const timer = setTimeout(() => {
      try {
        const options: LineDiagramOptions = {
          sensitivity,
          noiseSuppression,
          detailLevel,
          strokeColor,
          strokeWidth,
          invertEdges,
        };
        const res = convertImageToLineDiagram(loadedImgElement, options);
        setResult(res);
      } catch (err) {
        console.error('Line diagram generation error:', err);
      } finally {
        setIsProcessing(false);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [loadedImgElement, sensitivity, noiseSuppression, detailLevel, strokeColor, strokeWidth, invertEdges]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setSelectedImageSrc(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCanvas = () => {
    if (!canvas || !result || !result.svgPath) return;
    addSvgIconPath(canvas, result.svgPath, strokeColor, undefined, strokeWidth);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none font-sans animate-in fade-in duration-200">
      <div className="bg-canva-panel border border-canva-border w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-canva-teal to-canva-purple flex items-center justify-center text-black font-bold shadow-md">
              <Zap className="w-4 h-4 fill-black text-black" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">Photo to Vector Line Diagram</h2>
              <p className="text-[11px] text-gray-400">
                Upload any object photo (lamp, pen, device) to extract a clean line art diagram
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-12 gap-4 bg-canva-bg">
          {/* Left Column: Image Source & Sample Presets (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-24 border-2 border-dashed border-canva-teal/50 hover:border-canva-teal rounded-xl bg-canva-sidebar hover:bg-canva-teal/10 flex flex-col items-center justify-center p-3 transition-all group cursor-pointer text-center"
            >
              <UploadCloud className="w-6 h-6 text-canva-teal mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-white">Upload Object Photo</span>
              <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG (Pen, Lamp, Cup, etc.)</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Quick Sample Photo Presets */}
            <div>
              <span className="text-[11px] font-semibold text-gray-400 block mb-2 uppercase tracking-wider">
                Or pick a sample photo:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedImageSrc(preset.url)}
                    className={`relative h-16 rounded-lg overflow-hidden border transition-all ${
                      selectedImageSrc === preset.url
                        ? 'border-canva-teal ring-2 ring-canva-teal/40'
                        : 'border-canva-border hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-medium text-white px-1 py-0.5 truncate text-center">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Original Image Preview */}
            <div className="bg-canva-sidebar p-2.5 rounded-xl border border-canva-border">
              <span className="text-[10px] font-semibold text-gray-400 block mb-1">
                Original Image View:
              </span>
              <div className="h-36 bg-black rounded-lg overflow-hidden flex items-center justify-center border border-canva-border/50">
                <img
                  src={selectedImageSrc}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Vector Line Art Preview & Controls (8 cols) */}
          <div className="md:col-span-8 flex flex-col space-y-4">
            {/* Live Vector SVG Viewport */}
            <div className="flex-1 min-h-[260px] bg-slate-950 border border-canva-border rounded-xl p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 space-x-2 text-canva-teal text-xs font-semibold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Extracting Line Diagram...</span>
                </div>
              )}

              {result && result.svgPath ? (
                <svg
                  viewBox={result.viewBox}
                  className="max-w-full max-h-[240px] drop-shadow-md transition-all"
                  style={{ width: result.width, height: result.height }}
                >
                  <path
                    d={result.svgPath}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <div className="text-gray-500 text-xs text-center">
                  Select or upload an image to view line diagram.
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="bg-canva-sidebar p-3.5 rounded-xl border border-canva-border space-y-3">
              {/* Row 1: Detail Level & Invert */}
              <div className="flex items-center justify-between">
                {/* Detail Level Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-gray-400 font-medium">Style:</span>
                  <div className="flex items-center bg-canva-panel p-0.5 rounded-lg border border-canva-border">
                    <button
                      onClick={() => setDetailLevel('simple')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                        detailLevel === 'simple'
                          ? 'bg-canva-teal text-black font-bold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Simple Outline
                    </button>
                    <button
                      onClick={() => setDetailLevel('detailed')}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                        detailLevel === 'detailed'
                          ? 'bg-canva-teal text-black font-bold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Detailed Line Art
                    </button>
                  </div>
                </div>

                {/* Line Color Picker */}
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-gray-400 font-medium">Line Color:</span>
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border border-canva-border bg-transparent p-0"
                  />
                  <span className="text-[11px] font-mono text-canva-teal uppercase">{strokeColor}</span>
                </div>
              </div>

              {/* Row 2: Sliders for Sensitivity & Stroke Width */}
              <div className="grid grid-cols-2 gap-4">
                {/* Sensitivity Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                    <span>Edge Sensitivity / Detail Threshold:</span>
                    <span className="font-mono text-canva-teal">{sensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(Number(e.target.value))}
                    className="w-full h-1 bg-canva-panel rounded appearance-none accent-canva-teal cursor-pointer"
                  />
                </div>

                {/* Stroke Width Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-gray-300 mb-1">
                    <span>Line Thickness:</span>
                    <span className="font-mono text-canva-teal">{strokeWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full h-1 bg-canva-panel rounded appearance-none accent-canva-teal cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-canva-sidebar border-t border-canva-border flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-canva-hover transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleAddToCanvas}
            disabled={!result || !result.svgPath}
            className="px-6 py-2.5 bg-gradient-to-r from-canva-purple to-canva-teal hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-canva-purple/20 transition-all flex items-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-canva-teal" />
            <span>Add Line Diagram to Canvas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
