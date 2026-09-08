import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { ObjectProperties } from '../../types/canvas';
import { 
  deleteActiveObject, 
  duplicateActiveObject, 
  groupSelectedObjects, 
  ungroupSelectedObject, 
  addSvgIconPath,
  getFixedArrowheadPathData 
} from '../../utils/fabricHelpers';

interface CanvasEditorProps {
  width: number;
  height: number;
  backgroundColor: string;
  onCanvasReady: (canvas: fabric.Canvas) => void;
  onSelectionChange: (props: ObjectProperties | null) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  width,
  height,
  backgroundColor,
  onCanvasReady,
  onSelectionChange,
  zoom,
  setZoom,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor,
      preserveObjectStacking: true,
      selection: true,
    });

    fabricCanvasRef.current = canvas;
    onCanvasReady(canvas);

    // Contextual property extraction helper
    const updateSelection = () => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj) {
        onSelectionChange(null);
        return;
      }

      const type = activeObj.type as ObjectProperties['type'];
      const props: ObjectProperties = {
        type,
        fill: (activeObj.fill as string) || '#ffffff',
        stroke: activeObj.stroke || '',
        strokeWidth: activeObj.strokeWidth || 0,
        opacity: activeObj.opacity !== undefined ? activeObj.opacity : 1,
        fontFamily: (activeObj as fabric.IText).fontFamily || 'Inter',
        fontSize: (activeObj as fabric.IText).fontSize || 24,
        fontWeight: (activeObj as fabric.IText).fontWeight || 'normal',
        fontStyle: (activeObj as fabric.IText).fontStyle || 'normal',
        textAlign: (activeObj as fabric.IText).textAlign || 'left',
        underline: (activeObj as fabric.IText).underline || false,
        linethrough: (activeObj as fabric.IText).linethrough || false,
        charSpacing: (activeObj as fabric.IText).charSpacing || 0,
        lineHeight: (activeObj as fabric.IText).lineHeight || 1.16,
        textBackgroundColor: (activeObj as fabric.IText).textBackgroundColor || '',
        shadowColor: activeObj.shadow ? (activeObj.shadow as fabric.Shadow).color || '' : '',
        shadowBlur: activeObj.shadow ? (activeObj.shadow as fabric.Shadow).blur || 0 : 0,
        angle: Math.round(activeObj.angle || 0),
        width: Math.round((activeObj.width || 0) * (activeObj.scaleX || 1)),
        height: Math.round((activeObj.height || 0) * (activeObj.scaleY || 1)),
        left: Math.round(activeObj.left || 0),
        top: Math.round(activeObj.top || 0),
        isLocked: !!activeObj.lockMovementX,
        rx: (activeObj as fabric.Rect).rx || 0,
        ry: (activeObj as fabric.Rect).ry || 0,
      };

      onSelectionChange(props);
    };

    // Event listeners
    canvas.on('selection:created', updateSelection);
    canvas.on('selection:updated', updateSelection);
    canvas.on('selection:cleared', () => onSelectionChange(null));
    canvas.on('object:modified', updateSelection);

    // Enforce uniform stroke width & fixed-size arrowhead when stretching/scaling connector arrows
    const handleFixedArrowScaling = (obj: fabric.Object | undefined) => {
      if (!obj) return;
      obj.set('strokeUniform', true);

      if ((obj as any).isFixedConnectorArrow) {
        const currentWidth = (obj.width || 160) * (obj.scaleX || 1);
        const currentHeight = (obj.height || 40) * (obj.scaleY || 1);
        const style = (obj as any).connectorStyle || 'curved';

        const newPathData = getFixedArrowheadPathData(currentWidth, currentHeight, style);
        const tempPath = new fabric.Path(newPathData);

        (obj as fabric.Path).set({
          path: tempPath.path,
          width: tempPath.width,
          height: tempPath.height,
          pathOffset: tempPath.pathOffset,
          scaleX: 1,
          scaleY: 1,
        });
        obj.setCoords();
      }
    };

    canvas.on('object:added', (e) => {
      if (e.target) {
        e.target.set('strokeUniform', true);
      }
    });

    canvas.on('object:scaling', (e) => {
      if (e.target) {
        e.target.set('strokeUniform', true);
      }
    });

    canvas.on('object:modified', (e) => {
      updateSelection();
      if (e.target) {
        handleFixedArrowScaling(e.target);
      }
    });

    // Smart Snap Guides logic
    canvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj) return;

      const canvasWidth = canvas.width || width;
      const canvasHeight = canvas.height || height;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      const objCenter = obj.getCenterPoint();
      const snapThreshold = 6;

      // Vertical snap (center X)
      if (Math.abs(objCenter.x - centerX) < snapThreshold) {
        obj.setPositionByOrigin(new fabric.Point(centerX, objCenter.y), 'center', 'center');
      }

      // Horizontal snap (center Y)
      if (Math.abs(objCenter.y - centerY) < snapThreshold) {
        obj.setPositionByOrigin(new fabric.Point(objCenter.x, centerY), 'center', 'center');
      }
    });

    // Mouse wheel zoom handling
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom() * (0.999 ** delta);
      if (newZoom > 5) newZoom = 5;
      if (newZoom < 0.1) newZoom = 0.1;
      
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, newZoom);
      setZoom(Math.round(newZoom * 100));
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Global keyboard shortcuts (Delete, Duplicate, Group, Ungroup)
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === 'i-text' && (activeObj as fabric.IText).isEditing) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteActiveObject(canvas);
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          duplicateActiveObject(canvas);
        } else if (e.key === 'g' || e.key === 'G') {
          e.preventDefault();
          if (e.shiftKey) {
            ungroupSelectedObject(canvas);
          } else {
            groupSelectedObjects(canvas);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
    };
  }, [width, height]);

  // Update canvas background color dynamically
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setBackgroundColor(backgroundColor, () => {
        fabricCanvasRef.current?.requestRenderAll();
      });
    }
  }, [backgroundColor]);

  // Drag & Drop handlers for inserting SVGs onto canvas
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const canvas = fabricCanvasRef.current;
    if (!canvas || !canvasRef.current) return;

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;

      const data = JSON.parse(dataStr);
      if (data.type === 'icon' && data.svgPath) {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;

        // Convert client coordinates to canvas zoom/pan position
        const zoomLevel = zoom / 100;
        const x = clientX / zoomLevel - 40;
        const y = clientY / zoomLevel - 40;

        addSvgIconPath(canvas, data.svgPath, data.color || '#000000', { x, y }, data.strokeWidth || 2);
      }
    } catch (err) {
      console.error('Failed to parse dropped icon:', err);
    }
  };

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex-1 h-full canvas-checkerboard overflow-auto flex items-center justify-center p-12 relative select-none"
    >
      <div 
        className="shadow-2xl transition-shadow border border-canva-border/50 rounded-sm bg-white"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'center center',
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
