import React from 'react';
import { fabric } from 'fabric';
import { 
  Square, 
  Circle as CircleIcon, 
  Triangle as TriangleIcon, 
  Star as StarIcon, 
  Minus, 
  ArrowRight,
  Shapes,
  Hexagon,
  Shield,
  Award,
  Zap
} from 'lucide-react';
import { 
  addRectangle, 
  addCircle, 
  addTriangle, 
  addStar, 
  addLine 
} from '../../../utils/fabricHelpers';

interface ElementsPanelProps {
  canvas: fabric.Canvas | null;
}

export const ElementsPanel: React.FC<ElementsPanelProps> = ({ canvas }) => {
  if (!canvas) return null;

  const basicShapes = [
    { name: 'Rectangle', icon: Square, action: () => addRectangle(canvas, '#8b3dff') },
    { name: 'Circle', icon: CircleIcon, action: () => addCircle(canvas, '#00c4cc') },
    { name: 'Triangle', icon: TriangleIcon, action: () => addTriangle(canvas, '#f59e0b') },
    { name: 'Star', icon: StarIcon, action: () => addStar(canvas, '#ec4899') },
    { name: 'Line', icon: Minus, action: () => addLine(canvas, '#ffffff') },
  ];

  const colorPalettes = [
    '#7d2ae8', '#00c4cc', '#f59e0b', '#ec4899', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'
  ];

  const addQuickColoredShape = (shapeType: 'rect' | 'circle' | 'triangle' | 'star', color: string) => {
    switch (shapeType) {
      case 'rect': addRectangle(canvas, color); break;
      case 'circle': addCircle(canvas, color); break;
      case 'triangle': addTriangle(canvas, color); break;
      case 'star': addStar(canvas, color); break;
    }
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Shapes className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Elements & Shapes</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Add geometric vectors, shapes, and decorative lines to your design.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Shapes Grid */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Basic Shapes
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {basicShapes.map((shape) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.name}
                  onClick={shape.action}
                  className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl transition-all hover:scale-105 group"
                >
                  <Icon className="w-7 h-7 text-canva-teal mb-1 group-hover:text-white transition-colors" />
                  <span className="text-[11px] text-gray-300 font-medium">{shape.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preset Palette Shapes */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Color Preset Rectangles
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {colorPalettes.map((color) => (
              <button
                key={color}
                onClick={() => addQuickColoredShape('rect', color)}
                className="h-10 rounded-lg shadow border border-canva-border hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
                title={`Add ${color} Rectangle`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Vector Badges */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Decorative Badges
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => addQuickColoredShape('circle', '#3b82f6')}
              className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl"
            >
              <Shield className="w-6 h-6 text-blue-400 mb-1" />
              <span className="text-[10px] text-gray-300">Shield</span>
            </button>
            <button
              onClick={() => addQuickColoredShape('star', '#f59e0b')}
              className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl"
            >
              <Award className="w-6 h-6 text-amber-400 mb-1" />
              <span className="text-[10px] text-gray-300">Award</span>
            </button>
            <button
              onClick={() => addQuickColoredShape('triangle', '#ec4899')}
              className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl"
            >
              <Zap className="w-6 h-6 text-pink-400 mb-1" />
              <span className="text-[10px] text-gray-300">Badge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
