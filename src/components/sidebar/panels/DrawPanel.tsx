import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { Brush, Paintbrush } from 'lucide-react';

interface DrawPanelProps {
  canvas: fabric.Canvas | null;
}

export const DrawPanel: React.FC<DrawPanelProps> = ({ canvas }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#00c4cc');
  const [brushWidth, setBrushWidth] = useState(10);
  const [brushType, setBrushType] = useState<'pencil' | 'spray' | 'circle'>('pencil');

  useEffect(() => {
    if (!canvas) return;

    canvas.isDrawingMode = isDrawing;

    if (isDrawing) {
      switch (brushType) {
        case 'pencil':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          break;
        case 'spray':
          canvas.freeDrawingBrush = new (fabric as any).SprayBrush(canvas);
          break;
        case 'circle':
          canvas.freeDrawingBrush = new (fabric as any).CircleBrush(canvas);
          break;
      }

      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushWidth;
      }
    }

    canvas.requestRenderAll();

    return () => {
      if (canvas) {
        canvas.isDrawingMode = false;
      }
    };
  }, [canvas, isDrawing, brushColor, brushWidth, brushType]);

  if (!canvas) return null;

  const presetColors = [
    '#00c4cc', '#7d2ae8', '#f59e0b', '#ec4899', '#10b981', '#3b82f6', '#ffffff', '#000000'
  ];

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Brush className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Freehand Draw & Brush</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Draw vector brush strokes and freehand illustrations directly on canvas.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Toggle Drawing Mode */}
        <div>
          <button
            onClick={() => setIsDrawing(!isDrawing)}
            className={`w-full p-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md ${
              isDrawing
                ? 'bg-canva-teal text-gray-950 shadow-canva-teal/30 animate-pulse'
                : 'bg-canva-purple hover:bg-canva-purple-hover text-white shadow-canva-purple/20'
            }`}
          >
            <Paintbrush className="w-4 h-4" />
            <span>{isDrawing ? 'Drawing Mode Active (Click to Exit)' : 'Start Freehand Drawing'}</span>
          </button>
        </div>

        {/* Brush Type Selector */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Brush Style
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(['pencil', 'spray', 'circle'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setBrushType(type)}
                className={`py-2 px-3 rounded-lg text-xs font-medium border capitalize transition-all ${
                  brushType === type
                    ? 'bg-canva-sidebar border-canva-teal text-canva-teal font-semibold'
                    : 'bg-canva-sidebar border-canva-border text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Width Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Brush Thickness
            </h3>
            <span className="text-xs font-mono text-canva-teal">{brushWidth} px</span>
          </div>
          <input
            type="range"
            min="1"
            max="60"
            value={brushWidth}
            onChange={(e) => setBrushWidth(Number(e.target.value))}
            className="w-full h-1.5 bg-canva-sidebar rounded-lg appearance-none cursor-pointer accent-canva-teal"
          />
        </div>

        {/* Color Palette */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Brush Color
          </h3>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                className={`h-10 rounded-lg border-2 transition-transform ${
                  brushColor === color ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex items-center space-x-2 bg-canva-sidebar border border-canva-border p-2 rounded-xl">
            <span className="text-xs text-gray-400">Custom Color:</span>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-canva-border bg-transparent p-0"
            />
            <span className="text-xs font-mono text-gray-200">{brushColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
