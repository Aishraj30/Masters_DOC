import React, { useState } from 'react';
import { fabric } from 'fabric';
import { 
  Square, 
  Circle as CircleIcon, 
  Triangle as TriangleIcon, 
  Star as StarIcon, 
  Minus, 
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  MessageSquare,
  Database,
  Hexagon,
  Diamond as DiamondIcon,
  Heart as HeartIcon,
  Shapes,
  Sparkles
} from 'lucide-react';
import { 
  addRectangle, 
  addCircle, 
  addTriangle, 
  addStar, 
  addHexagon,
  addDiamond,
  addHeart,
  addPentagon,
  addOctagon,
  addEllipse,
  addParallelogram,
  addTrapezoid,
  addCross,
  addRightTriangle,
  addCloudShape,
  addPillShape,
  addLine,
  addArrow,
  addStretchableArrow,
  addBentConnectorArrow,
  addSpeechBubble,
  addFlowchartDatabase
} from '../../../utils/fabricHelpers';

interface ElementsPanelProps {
  canvas: fabric.Canvas | null;
}

export const ElementsPanel: React.FC<ElementsPanelProps> = ({ canvas }) => {
  const [shapeStyle, setShapeStyle] = useState<'filled' | 'hollow'>('filled');

  if (!canvas) return null;

  const basicShapes = [
    { 
      name: 'Rectangle', 
      icon: Square, 
      action: () => addRectangle(canvas, shapeStyle === 'hollow' ? 'transparent' : '#8b3dff', shapeStyle === 'hollow', '#00c4cc', 3) 
    },
    { 
      name: 'Pill Capsule', 
      icon: Square, 
      action: () => addPillShape(canvas, shapeStyle === 'hollow' ? 'transparent' : '#6366f1', shapeStyle === 'hollow', '#6366f1', 3) 
    },
    { 
      name: 'Circle', 
      icon: CircleIcon, 
      action: () => addCircle(canvas, shapeStyle === 'hollow' ? 'transparent' : '#00c4cc', shapeStyle === 'hollow', '#00c4cc', 3) 
    },
    { 
      name: 'Ellipse', 
      icon: CircleIcon, 
      action: () => addEllipse(canvas, shapeStyle === 'hollow' ? 'transparent' : '#06b6d4', shapeStyle === 'hollow', '#06b6d4', 3) 
    },
    { 
      name: 'Triangle', 
      icon: TriangleIcon, 
      action: () => addTriangle(canvas, shapeStyle === 'hollow' ? 'transparent' : '#f59e0b', shapeStyle === 'hollow', '#f59e0b', 3) 
    },
    { 
      name: 'Right Tri', 
      icon: TriangleIcon, 
      action: () => addRightTriangle(canvas, shapeStyle === 'hollow' ? 'transparent' : '#eab308', shapeStyle === 'hollow', '#eab308', 3) 
    },
    { 
      name: 'Star', 
      icon: StarIcon, 
      action: () => addStar(canvas, shapeStyle === 'hollow' ? 'transparent' : '#ec4899', shapeStyle === 'hollow', '#ec4899', 3) 
    },
    { 
      name: 'Hexagon', 
      icon: Hexagon, 
      action: () => addHexagon(canvas, shapeStyle === 'hollow' ? 'transparent' : '#3b82f6', shapeStyle === 'hollow', '#3b82f6', 3) 
    },
    { 
      name: 'Pentagon', 
      icon: Hexagon, 
      action: () => addPentagon(canvas, shapeStyle === 'hollow' ? 'transparent' : '#8b5cf6', shapeStyle === 'hollow', '#8b5cf6', 3) 
    },
    { 
      name: 'Octagon', 
      icon: Hexagon, 
      action: () => addOctagon(canvas, shapeStyle === 'hollow' ? 'transparent' : '#0ea5e9', shapeStyle === 'hollow', '#0ea5e9', 3) 
    },
    { 
      name: 'Diamond', 
      icon: DiamondIcon, 
      action: () => addDiamond(canvas, shapeStyle === 'hollow' ? 'transparent' : '#10b981', shapeStyle === 'hollow', '#10b981', 3) 
    },
    { 
      name: 'Heart', 
      icon: HeartIcon, 
      action: () => addHeart(canvas, shapeStyle === 'hollow' ? 'transparent' : '#ef4444', shapeStyle === 'hollow', '#ef4444', 3) 
    },
    { 
      name: 'Parallelogram', 
      icon: Square, 
      action: () => addParallelogram(canvas, shapeStyle === 'hollow' ? 'transparent' : '#f43f5e', shapeStyle === 'hollow', '#f43f5e', 3) 
    },
    { 
      name: 'Trapezoid', 
      icon: Square, 
      action: () => addTrapezoid(canvas, shapeStyle === 'hollow' ? 'transparent' : '#a855f7', shapeStyle === 'hollow', '#a855f7', 3) 
    },
    { 
      name: 'Plus Cross', 
      icon: Square, 
      action: () => addCross(canvas, shapeStyle === 'hollow' ? 'transparent' : '#14b8a6', shapeStyle === 'hollow', '#14b8a6', 3) 
    },
    { 
      name: 'Cloud Node', 
      icon: Square, 
      action: () => addCloudShape(canvas, shapeStyle === 'hollow' ? 'transparent' : '#38bdf8', shapeStyle === 'hollow', '#38bdf8', 3) 
    },
  ];

  const arrowShapes = [
    { name: 'Curved Arc Arrow', icon: ArrowRight, action: () => addBentConnectorArrow(canvas, 'curved', '#000000') },
    { name: 'Elbow 90° Bend', icon: ArrowRight, action: () => addBentConnectorArrow(canvas, 'elbow', '#000000') },
    { name: 'S-Curve Arrow', icon: ArrowRight, action: () => addBentConnectorArrow(canvas, 'scurve', '#000000') },
    { name: 'Stretch Arrow', icon: ArrowRight, action: () => addStretchableArrow(canvas, '#000000', false, false) },
    { name: 'Dashed Curved', icon: ArrowRight, action: () => addBentConnectorArrow(canvas, 'dashed-curved', '#000000') },
    { name: 'Bi-Directional', icon: ArrowLeftRight, action: () => addBentConnectorArrow(canvas, 'double-curved', '#000000') },
  ];

  const diagramShapes = [
    { name: 'Callout Bubble', icon: MessageSquare, action: () => addSpeechBubble(canvas, '#3b82f6') },
    { name: 'Database Node', icon: Database, action: () => addFlowchartDatabase(canvas, '#8b3dff') },
    { name: 'Solid Line', icon: Minus, action: () => addLine(canvas, '#ffffff', false) },
    { name: 'Dashed Line', icon: Minus, action: () => addLine(canvas, '#38bdf8', true) },
  ];

  const colorPalettes = [
    '#7d2ae8', '#00c4cc', '#f59e0b', '#ec4899', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'
  ];

  const addQuickColoredShape = (shapeType: 'rect' | 'circle' | 'triangle' | 'star', color: string, hollow: boolean = false) => {
    switch (shapeType) {
      case 'rect': addRectangle(canvas, hollow ? 'transparent' : color, hollow, color, 3); break;
      case 'circle': addCircle(canvas, hollow ? 'transparent' : color, hollow, color, 3); break;
      case 'triangle': addTriangle(canvas, hollow ? 'transparent' : color, hollow, color, 3); break;
      case 'star': addStar(canvas, hollow ? 'transparent' : color, hollow, color, 3); break;
    }
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Shapes className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Shapes, Arrows & Diagrams</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Vector shapes (filled & hollow), directional arrows, flowcharts, & diagram elements.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-canva-border">


        {/* Basic Geometric Shapes Grid with Filled vs Hollow Toggle */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Basic Shapes
            </h3>
            <div className="flex items-center bg-canva-sidebar p-0.5 rounded-lg border border-canva-border">
              <button
                onClick={() => setShapeStyle('filled')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                  shapeStyle === 'filled' ? 'bg-canva-teal text-black font-bold shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Filled
              </button>
              <button
                onClick={() => setShapeStyle('hollow')}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                  shapeStyle === 'hollow' ? 'bg-canva-teal text-black font-bold shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                Hollow
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {basicShapes.map((shape) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.name}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify({
                        type: 'shape',
                        shapeName: shape.name,
                        isHollow: shapeStyle === 'hollow',
                      })
                    );
                  }}
                  onClick={shape.action}
                  className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl transition-all hover:scale-105 group relative cursor-grab active:cursor-grabbing"
                >
                  <Icon className={`w-6 h-6 mb-1 transition-colors ${shapeStyle === 'hollow' ? 'text-canva-teal stroke-2 fill-none' : 'text-canva-teal fill-canva-teal/30 group-hover:text-canva-text'}`} />
                  <span className="text-[11px] text-canva-text font-medium truncate w-full text-center">{shape.name}</span>
                  <span className="text-[9px] text-canva-text-muted font-mono mt-0.5">
                    {shapeStyle === 'hollow' ? 'Hollow' : 'Filled'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Arrows & Directional Pointers */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Arrows & Directional Pointers
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {arrowShapes.map((shape) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.name}
                  onClick={shape.action}
                  className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl transition-all hover:scale-105 group"
                >
                  <Icon className="w-6 h-6 text-amber-400 mb-1 group-hover:text-white transition-colors" />
                  <span className="text-[11px] text-gray-300 font-medium truncate w-full text-center">{shape.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flowchart & Diagram Connectors */}
        <div>
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
            Diagrams & Connectors
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {diagramShapes.map((shape) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.name}
                  onClick={shape.action}
                  className="flex flex-col items-center justify-center p-3 bg-canva-sidebar hover:bg-canva-hover border border-canva-border rounded-xl transition-all hover:scale-105 group"
                >
                  <Icon className="w-6 h-6 text-sky-400 mb-1 group-hover:text-white transition-colors" />
                  <span className="text-[11px] text-gray-300 font-medium truncate w-full text-center">{shape.name}</span>
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


      </div>
    </div>
  );
};
