import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { 
  Layers, 
  Type, 
  Square, 
  Circle, 
  Image as ImageIcon, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Trash2, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { 
  bringForward, 
  sendBackward, 
  deleteActiveObject 
} from '../../../utils/fabricHelpers';

interface LayersPanelProps {
  canvas: fabric.Canvas | null;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ canvas }) => {
  const [objects, setObjects] = useState<fabric.Object[]>([]);

  const refreshObjects = () => {
    if (!canvas) return;
    const objs = canvas.getObjects().slice().reverse(); // Topmost layer first
    setObjects(objs);
  };

  useEffect(() => {
    if (!canvas) return;

    refreshObjects();

    canvas.on('object:added', refreshObjects);
    canvas.on('object:removed', refreshObjects);
    canvas.on('object:modified', refreshObjects);
    canvas.on('selection:created', refreshObjects);
    canvas.on('selection:updated', refreshObjects);
    canvas.on('selection:cleared', refreshObjects);

    return () => {
      canvas.off('object:added', refreshObjects);
      canvas.off('object:removed', refreshObjects);
      canvas.off('object:modified', refreshObjects);
    };
  }, [canvas]);

  if (!canvas) return null;

  const selectObject = (obj: fabric.Object) => {
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
  };

  const toggleVisibility = (obj: fabric.Object, e: React.MouseEvent) => {
    e.stopPropagation();
    obj.set('visible', !obj.visible);
    canvas.requestRenderAll();
    refreshObjects();
  };

  const toggleLockObject = (obj: fabric.Object, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLocked = !obj.lockMovementX;
    obj.set({
      lockMovementX: isLocked,
      lockMovementY: isLocked,
      lockRotation: isLocked,
      lockScalingX: isLocked,
      lockScalingY: isLocked,
      hasControls: !isLocked,
    });
    canvas.requestRenderAll();
    refreshObjects();
  };

  const getObjectLabel = (obj: fabric.Object) => {
    if (obj.type === 'i-text') {
      const text = (obj as fabric.IText).text || 'Text';
      return text.length > 20 ? text.substring(0, 20) + '...' : text;
    }
    if (obj.type === 'rect') return 'Rectangle';
    if (obj.type === 'circle') return 'Circle';
    if (obj.type === 'triangle') return 'Triangle';
    if (obj.type === 'image') return 'Image Element';
    if (obj.type === 'path') return 'Brush Drawing';
    return 'Canvas Element';
  };

  const getObjectIcon = (type?: string) => {
    switch (type) {
      case 'i-text': return <Type className="w-4 h-4 text-canva-teal" />;
      case 'rect': return <Square className="w-4 h-4 text-purple-400" />;
      case 'circle': return <Circle className="w-4 h-4 text-pink-400" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-blue-400" />;
      default: return <Layers className="w-4 h-4 text-gray-400" />;
    }
  };

  const activeObj = canvas.getActiveObject();

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Layers Hierarchy</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Manage layer depth, visibility, and object locks.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {objects.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No elements on canvas. Add text or shapes to view layers.
          </div>
        ) : (
          objects.map((obj, index) => {
            const isSelected = activeObj === obj;
            const isLocked = !!obj.lockMovementX;
            const isVisible = obj.visible !== false;

            return (
              <div
                key={index}
                onClick={() => selectObject(obj)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-canva-purple/20 border-canva-purple shadow-sm'
                    : 'bg-canva-sidebar border-canva-border hover:bg-canva-hover'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate max-w-[170px]">
                  {getObjectIcon(obj.type)}
                  <span className={`text-xs truncate font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {getObjectLabel(obj)}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => toggleVisibility(obj, e)}
                    className="p-1 hover:bg-canva-hover rounded text-gray-400 hover:text-white"
                    title={isVisible ? 'Hide Layer' : 'Show Layer'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                  </button>

                  <button
                    onClick={(e) => toggleLockObject(obj, e)}
                    className="p-1 hover:bg-canva-hover rounded text-gray-400 hover:text-white"
                    title={isLocked ? 'Unlock Layer' : 'Lock Layer'}
                  >
                    {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
