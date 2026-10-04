import React from 'react';
import { fabric } from 'fabric';
import { BUILTIN_ICONS } from '../constants/iconLibrary';

/**
 * Calculates a responsive default size for newly added elements based on canvas resolution.
 * Target default ratio: ~15-20% of canvas min dimension (clamped to sensible bounds).
 */
export const getResponsiveElementSize = (
  canvas: fabric.Canvas,
  defaultBaseSize: number = 150,
  targetRatio: number = 0.18
): number => {
  if (!canvas) return defaultBaseSize;
  const canvasWidth = canvas.width || 1000;
  const canvasHeight = canvas.height || 1000;
  const minDim = Math.min(canvasWidth, canvasHeight);
  
  const proportionalSize = Math.round(minDim * targetRatio);
  return Math.max(40, Math.min(800, proportionalSize));
};

export const addHeadingText = (canvas: fabric.Canvas, text: string = 'Add a heading') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const fontSize = Math.max(28, Math.round((canvas.height || 1000) * 0.054));
  const heading = new fabric.IText(text, {
    left: center.left - fontSize * 2.5,
    top: center.top - fontSize * 0.8,
    fontSize,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fill: '#ffffff',
  });
  canvas.add(heading);
  canvas.setActiveObject(heading);
  canvas.requestRenderAll();
};

export const addSubheadingText = (canvas: fabric.Canvas, text: string = 'Add a subheading') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const fontSize = Math.max(20, Math.round((canvas.height || 1000) * 0.032));
  const subheading = new fabric.IText(text, {
    left: center.left - fontSize * 3.5,
    top: center.top,
    fontSize,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fill: '#e2e8f0',
  });
  canvas.add(subheading);
  canvas.setActiveObject(subheading);
  canvas.requestRenderAll();
};

export const addBodyText = (canvas: fabric.Canvas, text: string = 'Add a little bit of body text') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const fontSize = Math.max(14, Math.round((canvas.height || 1000) * 0.022));
  const bodyText = new fabric.IText(text, {
    left: center.left - fontSize * 4.5,
    top: center.top + fontSize * 1.5,
    fontSize,
    fontFamily: 'Inter',
    fill: '#94a3b8',
  });
  canvas.add(bodyText);
  canvas.setActiveObject(bodyText);
  canvas.requestRenderAll();
};

export interface ShapeOptions {
  color?: string;
  isHollow?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  strokeDashArray?: number[];
  rx?: number;
  ry?: number;
}

export const addRectangle = (
  canvas: fabric.Canvas, 
  color: string = '#8b3dff', 
  isHollow: boolean = false, 
  strokeColor: string = '#00c4cc', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const size = getResponsiveElementSize(canvas, 150, 0.18);
  const posX = position ? position.x : center.left - size / 2;
  const posY = position ? position.y : center.top - size / 2;
  const rect = new fabric.Rect({
    left: posX,
    top: posY,
    width: size,
    height: size,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
    rx: Math.round(size * 0.08),
    ry: Math.round(size * 0.08),
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
};

export const addCircle = (
  canvas: fabric.Canvas, 
  color: string = '#00c4cc', 
  isHollow: boolean = false, 
  strokeColor: string = '#00c4cc', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const size = getResponsiveElementSize(canvas, 150, 0.18);
  const posX = position ? position.x : center.left - size / 2;
  const posY = position ? position.y : center.top - size / 2;
  const circle = new fabric.Circle({
    left: posX,
    top: posY,
    radius: size / 2,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.requestRenderAll();
};

export const addTriangle = (
  canvas: fabric.Canvas, 
  color: string = '#f59e0b', 
  isHollow: boolean = false, 
  strokeColor: string = '#f59e0b', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const posX = position ? position.x : center.left - 75;
  const posY = position ? position.y : center.top - 75;
  const triangle = new fabric.Triangle({
    left: posX,
    top: posY,
    width: 150,
    height: 150,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.requestRenderAll();
};

export const addStar = (
  canvas: fabric.Canvas, 
  color: string = '#ec4899', 
  isHollow: boolean = false, 
  strokeColor: string = '#ec4899', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const posX = position ? position.x : center.left - 75;
  const posY = position ? position.y : center.top - 75;
  const points = [
    { x: 75, y: 0 },
    { x: 95, y: 55 },
    { x: 150, y: 55 },
    { x: 105, y: 90 },
    { x: 122, y: 145 },
    { x: 75, y: 110 },
    { x: 28, y: 145 },
    { x: 45, y: 90 },
    { x: 0, y: 55 },
    { x: 55, y: 55 },
  ];
  const star = new fabric.Polygon(points, {
    left: posX,
    top: posY,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(star);
  canvas.setActiveObject(star);
  canvas.requestRenderAll();
};

export const addHexagon = (
  canvas: fabric.Canvas, 
  color: string = '#3b82f6', 
  isHollow: boolean = false, 
  strokeColor: string = '#3b82f6', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const posX = position ? position.x : center.left - 100;
  const posY = position ? position.y : center.top - 86;
  const points = [
    { x: 50, y: 0 },
    { x: 150, y: 0 },
    { x: 200, y: 86 },
    { x: 150, y: 173 },
    { x: 50, y: 173 },
    { x: 0, y: 86 },
  ];
  const hex = new fabric.Polygon(points, {
    left: posX,
    top: posY,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(hex);
  canvas.setActiveObject(hex);
  canvas.requestRenderAll();
};

export const addDiamond = (
  canvas: fabric.Canvas, 
  color: string = '#10b981', 
  isHollow: boolean = false, 
  strokeColor: string = '#10b981', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const posX = position ? position.x : center.left - 75;
  const posY = position ? position.y : center.top - 75;
  const points = [
    { x: 75, y: 0 },
    { x: 150, y: 75 },
    { x: 75, y: 150 },
    { x: 0, y: 75 },
  ];
  const diamond = new fabric.Polygon(points, {
    left: posX,
    top: posY,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(diamond);
  canvas.setActiveObject(diamond);
  canvas.requestRenderAll();
};

export const addHeart = (
  canvas: fabric.Canvas, 
  color: string = '#ef4444', 
  isHollow: boolean = false, 
  strokeColor: string = '#ef4444', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const posX = position ? position.x : center.left - 60;
  const posY = position ? position.y : center.top - 60;
  const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
  const path = new fabric.Path(heartPath, {
    left: posX,
    top: posY,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  path.scaleToWidth(120);
  canvas.add(path);
  canvas.setActiveObject(path);
  canvas.requestRenderAll();
};

export const addPentagon = (
  canvas: fabric.Canvas, 
  color: string = '#8b5cf6', 
  isHollow: boolean = false, 
  strokeColor: string = '#8b5cf6', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 75, y: 0 },
    { x: 150, y: 55 },
    { x: 120, y: 145 },
    { x: 30, y: 145 },
    { x: 0, y: 55 },
  ];
  const pentagon = new fabric.Polygon(points, {
    left: center.left - 75,
    top: center.top - 75,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(pentagon);
  canvas.setActiveObject(pentagon);
  canvas.requestRenderAll();
};

export const addOctagon = (
  canvas: fabric.Canvas, 
  color: string = '#0ea5e9', 
  isHollow: boolean = false, 
  strokeColor: string = '#0ea5e9', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 45, y: 0 },
    { x: 105, y: 0 },
    { x: 150, y: 45 },
    { x: 150, y: 105 },
    { x: 105, y: 150 },
    { x: 45, y: 150 },
    { x: 0, y: 105 },
    { x: 0, y: 45 },
  ];
  const octagon = new fabric.Polygon(points, {
    left: center.left - 75,
    top: center.top - 75,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(octagon);
  canvas.setActiveObject(octagon);
  canvas.requestRenderAll();
};

export const addEllipse = (
  canvas: fabric.Canvas, 
  color: string = '#06b6d4', 
  isHollow: boolean = false, 
  strokeColor: string = '#06b6d4', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const ellipse = new fabric.Ellipse({
    left: center.left - 90,
    top: center.top - 50,
    rx: 90,
    ry: 50,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(ellipse);
  canvas.setActiveObject(ellipse);
  canvas.requestRenderAll();
};

export const addParallelogram = (
  canvas: fabric.Canvas, 
  color: string = '#f43f5e', 
  isHollow: boolean = false, 
  strokeColor: string = '#f43f5e', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 40, y: 0 },
    { x: 160, y: 0 },
    { x: 120, y: 100 },
    { x: 0, y: 100 },
  ];
  const poly = new fabric.Polygon(points, {
    left: center.left - 80,
    top: center.top - 50,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(poly);
  canvas.setActiveObject(poly);
  canvas.requestRenderAll();
};

export const addTrapezoid = (
  canvas: fabric.Canvas, 
  color: string = '#a855f7', 
  isHollow: boolean = false, 
  strokeColor: string = '#a855f7', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 30, y: 0 },
    { x: 130, y: 0 },
    { x: 160, y: 100 },
    { x: 0, y: 100 },
  ];
  const trap = new fabric.Polygon(points, {
    left: center.left - 80,
    top: center.top - 50,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(trap);
  canvas.setActiveObject(trap);
  canvas.requestRenderAll();
};

export const addCross = (
  canvas: fabric.Canvas, 
  color: string = '#14b8a6', 
  isHollow: boolean = false, 
  strokeColor: string = '#14b8a6', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 45, y: 0 }, { x: 95, y: 0 }, { x: 95, y: 45 },
    { x: 140, y: 45 }, { x: 140, y: 95 }, { x: 95, y: 95 },
    { x: 95, y: 140 }, { x: 45, y: 140 }, { x: 45, y: 95 },
    { x: 0, y: 95 }, { x: 0, y: 45 }, { x: 45, y: 45 },
  ];
  const cross = new fabric.Polygon(points, {
    left: center.left - 70,
    top: center.top - 70,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(cross);
  canvas.setActiveObject(cross);
  canvas.requestRenderAll();
};

export const addRightTriangle = (
  canvas: fabric.Canvas, 
  color: string = '#eab308', 
  isHollow: boolean = false, 
  strokeColor: string = '#eab308', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 0, y: 0 },
    { x: 0, y: 140 },
    { x: 140, y: 140 },
  ];
  const tri = new fabric.Polygon(points, {
    left: center.left - 70,
    top: center.top - 70,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(tri);
  canvas.setActiveObject(tri);
  canvas.requestRenderAll();
};

export const addCloudShape = (
  canvas: fabric.Canvas, 
  color: string = '#38bdf8', 
  isHollow: boolean = false, 
  strokeColor: string = '#38bdf8', 
  strokeWidth: number = 3
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const cloudPath = 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z';
  const path = new fabric.Path(cloudPath, {
    left: center.left - 75,
    top: center.top - 50,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  path.scaleToWidth(150);
  canvas.add(path);
  canvas.setActiveObject(path);
  canvas.requestRenderAll();
};

export const addPillShape = (
  canvas: fabric.Canvas, 
  color: string = '#6366f1', 
  isHollow: boolean = false, 
  strokeColor: string = '#6366f1', 
  strokeWidth: number = 3,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const posX = position ? position.x : center.left - 90;
  const posY = position ? position.y : center.top - 35;
  const pill = new fabric.Rect({
    left: posX,
    top: posY,
    width: 180,
    height: 70,
    rx: 35,
    ry: 35,
    fill: isHollow ? 'transparent' : color,
    stroke: strokeColor,
    strokeWidth: isHollow ? (strokeWidth || 3) : strokeWidth,
    strokeUniform: true,
  });
  canvas.add(pill);
  canvas.setActiveObject(pill);
  canvas.requestRenderAll();
};

export const addLine = (canvas: fabric.Canvas, strokeColor: string = '#ffffff', isDashed: boolean = false) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const line = new fabric.Line([center.left - 100, center.top, center.left + 100, center.top], {
    stroke: strokeColor,
    strokeWidth: 6,
    strokeDashArray: isDashed ? [12, 8] : undefined,
  });
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
};

export type ArrowStyleType = 'straight' | 'curved' | 'elbow' | 'scurve' | 'dashed-curved' | 'double-curved';

export const getFixedArrowheadPathData = (
  w: number,
  h: number,
  style: ArrowStyleType
): string => {
  const width = Math.max(30, w);
  const height = Math.max(16, h);
  const L = 14; // Fixed 14px arrowhead length
  const W = 6.5; // Fixed 6.5px wing spread

  if (style === 'curved' || style === 'dashed-curved' || style === 'double-curved') {
    // Arc curve: Q (width/2) 0 (width) height
    // Calculate right endpoint tangent vector (dx, dy)
    const dx = width / 2;
    const dy = height;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const nx = -uy;
    const ny = ux;

    // Right arrowhead wings
    const rx1 = width - L * ux + W * nx;
    const ry1 = height - L * uy + W * ny;
    const rx2 = width - L * ux - W * nx;
    const ry2 = height - L * uy - W * ny;

    let path = `M 0 ${height} Q ${width / 2} 0 ${width} ${height} M ${rx1.toFixed(1)} ${ry1.toFixed(1)} L ${width} ${height} L ${rx2.toFixed(1)} ${ry2.toFixed(1)}`;

    if (style === 'double-curved') {
      // Left endpoint tangent vector (pointing outwards back from start): dx = -width/2, dy = height
      const ldx = -width / 2;
      const ldy = height;
      const llen = Math.hypot(ldx, ldy) || 1;
      const lux = ldx / llen;
      const luy = ldy / llen;
      const lnx = -luy;
      const lny = lux;

      const lx1 = 0 - L * lux + W * lnx;
      const ly1 = height - L * luy + W * lny;
      const lx2 = 0 - L * lux - W * lnx;
      const ly2 = height - L * luy - W * lny;

      path = `M ${lx1.toFixed(1)} ${ly1.toFixed(1)} L 0 ${height} L ${lx2.toFixed(1)} ${ly2.toFixed(1)} ` + path;
    }

    return path;
  }

  if (style === 'elbow') {
    // L-shaped orthogonal 90-degree bend with fixed 14px arrowhead
    return `M 0 0 L 0 ${height} L ${width} ${height} M ${width - L} ${height - W} L ${width} ${height} L ${width - L} ${height + W}`;
  }

  if (style === 'scurve') {
    // S-curve cubic bezier with fixed 14px arrowhead
    return `M 0 0 C ${width * 0.45} 0 ${width * 0.55} ${height} ${width} ${height} M ${width - L} ${height - W} L ${width} ${height} L ${width - L} ${height + W}`;
  }

  // Default straight line with fixed 14px arrowhead
  return `M 0 10 L ${width} 10 M ${width - L} ${10 - W} L ${width} 10 L ${width - L} ${10 + W}`;
};

export const addBentConnectorArrow = (
  canvas: fabric.Canvas,
  style: ArrowStyleType = 'curved',
  color: string = '#000000'
) => {
  if (!canvas) return;
  const center = canvas.getCenter();

  const initialWidth = 160;
  const initialHeight = style === 'straight' ? 20 : 60;
  const pathString = getFixedArrowheadPathData(initialWidth, initialHeight, style);
  const isDashed = style === 'dashed-curved';

  const arrow = new fabric.Path(pathString, {
    left: center.left - initialWidth / 2,
    top: center.top - initialHeight / 2,
    fill: 'transparent',
    stroke: color,
    strokeWidth: 3,
    strokeUniform: true,
    strokeLineCap: 'round',
    strokeLineJoin: 'round',
    strokeDashArray: isDashed ? [10, 6] : undefined,
  });

  // Attach metadata to identify fixed-arrowhead connector
  (arrow as any).isFixedConnectorArrow = true;
  (arrow as any).connectorStyle = style;

  // Enable stretch and height controls
  arrow.setControlsVisibility({
    tl: true,
    tr: true,
    br: true,
    bl: true,
    ml: true, // Stretch width handle
    mr: true, // Stretch width handle
    mt: true, // Bend / Curve height handle
    mb: true, // Bend / Curve height handle
    mtr: true, // Rotate handle
  });

  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.requestRenderAll();
};

export const addStretchableArrow = (
  canvas: fabric.Canvas,
  color: string = '#000000',
  isDashed: boolean = false,
  isDouble: boolean = false
) => {
  const style = isDouble ? 'double-curved' : (isDashed ? 'dashed-curved' : 'straight');
  addBentConnectorArrow(canvas, style, color);
};

export const addArrow = (
  canvas: fabric.Canvas,
  type: 'right' | 'left' | 'up' | 'down' | 'double' | 'stretch',
  color: string = '#000000'
) => {
  if (!canvas) return;
  const style: ArrowStyleType = type === 'double' ? 'double-curved' : 'straight';
  addBentConnectorArrow(canvas, style, color);
};

export const addSpeechBubble = (canvas: fabric.Canvas, color: string = '#3b82f6') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const bubblePath = 'M 20 0 L 180 0 C 190 0 200 10 200 20 L 200 120 C 200 130 190 140 180 140 L 80 140 L 40 180 L 40 140 L 20 140 C 10 140 0 130 0 120 L 0 20 C 0 10 10 0 20 0 Z';
  const bubble = new fabric.Path(bubblePath, {
    left: center.left - 100,
    top: center.top - 70,
    fill: color,
  });
  canvas.add(bubble);
  canvas.setActiveObject(bubble);
  canvas.requestRenderAll();
};

export const addFlowchartDatabase = (canvas: fabric.Canvas, color: string = '#8b3dff') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const dbPath = 'M 0 30 C 0 10 120 10 120 30 L 120 130 C 120 150 0 150 0 130 Z';
  const db = new fabric.Path(dbPath, {
    left: center.left - 60,
    top: center.top - 70,
    fill: color,
    stroke: '#ffffff',
    strokeWidth: 2,
  });
  canvas.add(db);
  canvas.setActiveObject(db);
  canvas.requestRenderAll();
};

export const addSvgIconPath = (
  canvas: fabric.Canvas,
  pathData: string,
  color: string = '#00c4cc',
  position?: { x: number; y: number },
  strokeWidth: number = 2
) => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const iconSize = getResponsiveElementSize(canvas, 100, 0.14);
  const posX = position ? position.x : center.left - iconSize / 2;
  const posY = position ? position.y : center.top - iconSize / 2;

  const strokeColor = color && color !== '#000000' ? color : '#00c4cc';

  const path = new fabric.Path(pathData, {
    left: posX,
    top: posY,
    fill: 'transparent',
    stroke: strokeColor,
    strokeWidth: strokeWidth,
    strokeUniform: true,
    strokeLineCap: 'round',
    strokeLineJoin: 'round',
  });
  path.scaleToWidth(iconSize);
  canvas.add(path);
  canvas.setActiveObject(path);
  canvas.requestRenderAll();
};

export const addImageFromUrl = (
  canvas: fabric.Canvas, 
  url: string,
  position?: { x: number; y: number }
) => {
  if (!canvas) return;
  fabric.Image.fromURL(url, (img) => {
    const maxDim = Math.min((canvas.width || 800) * 0.6, (canvas.height || 800) * 0.6);
    if (img.width && img.width > maxDim) {
      img.scaleToWidth(maxDim);
    }
    const center = canvas.getCenter();
    const posX = position ? position.x : center.left - ((img.width || 300) * (img.scaleX || 1)) / 2;
    const posY = position ? position.y : center.top - ((img.height || 300) * (img.scaleY || 1)) / 2;
    img.set({
      left: posX,
      top: posY,
    });
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.requestRenderAll();
  }, { crossOrigin: 'anonymous' });
};

export const addImageFromFile = (canvas: fabric.Canvas, file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      addImageFromUrl(canvas, e.target.result as string);
    }
  };
  reader.readAsDataURL(file);
};

export const groupSelectedObjects = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (!activeObj || activeObj.type !== 'activeSelection') return;

  const selection = activeObj as fabric.ActiveSelection;
  selection.toGroup();
  canvas.requestRenderAll();
};

export const ungroupSelectedObject = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (!activeObj || activeObj.type !== 'group') return;

  const group = activeObj as fabric.Group;
  group.toActiveSelection();
  canvas.requestRenderAll();
};

export const distributeObjects = (canvas: fabric.Canvas, direction: 'horizontal' | 'vertical') => {
  const activeObj = canvas.getActiveObject();
  if (!activeObj || activeObj.type !== 'activeSelection') return;

  const selection = activeObj as fabric.ActiveSelection;
  const objects = selection.getObjects();
  if (objects.length < 3) return;

  if (direction === 'horizontal') {
    objects.sort((a, b) => (a.left || 0) - (b.left || 0));
    const first = objects[0].left || 0;
    const last = objects[objects.length - 1].left || 0;
    const totalDistance = last - first;
    const step = totalDistance / (objects.length - 1);

    objects.forEach((obj, idx) => {
      obj.set('left', first + idx * step);
    });
  } else {
    objects.sort((a, b) => (a.top || 0) - (b.top || 0));
    const first = objects[0].top || 0;
    const last = objects[objects.length - 1].top || 0;
    const totalDistance = last - first;
    const step = totalDistance / (objects.length - 1);

    objects.forEach((obj, idx) => {
      obj.set('top', first + idx * step);
    });
  }
  selection.setCoords();
  canvas.requestRenderAll();
};

export const alignObject = (canvas: fabric.Canvas, alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
  const activeObject = canvas.getActiveObject();
  if (!activeObject || !canvas.width || !canvas.height) return;

  const objectWidth = activeObject.getBoundingRect().width;
  const objectHeight = activeObject.getBoundingRect().height;

  switch (alignment) {
    case 'left':
      activeObject.set({ left: 0 });
      break;
    case 'center':
      activeObject.set({ left: (canvas.width - objectWidth) / 2 });
      break;
    case 'right':
      activeObject.set({ left: canvas.width - objectWidth });
      break;
    case 'top':
      activeObject.set({ top: 0 });
      break;
    case 'middle':
      activeObject.set({ top: (canvas.height - objectHeight) / 2 });
      break;
    case 'bottom':
      activeObject.set({ top: canvas.height - objectHeight });
      break;
  }
  activeObject.setCoords();
  canvas.requestRenderAll();
};

export const duplicateActiveObject = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;

  activeObject.clone((cloned: fabric.Object) => {
    canvas.discardActiveObject();
    cloned.set({
      left: (cloned.left || 0) + 20,
      top: (cloned.top || 0) + 20,
      evented: true,
    });
    if (cloned.type === 'activeSelection') {
      cloned.canvas = canvas;
      (cloned as fabric.Group).forEachObject((obj) => {
        canvas.add(obj);
      });
      cloned.setCoords();
    } else {
      canvas.add(cloned);
    }
    canvas.setActiveObject(cloned);
    canvas.requestRenderAll();
  });
};

export const deleteActiveObject = (canvas: fabric.Canvas) => {
  const activeGroup = canvas.getActiveObjects();
  if (activeGroup.length > 0) {
    canvas.discardActiveObject();
    activeGroup.forEach((obj) => {
      canvas.remove(obj);
    });
    canvas.requestRenderAll();
  }
};

export const bringForward = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    canvas.bringForward(activeObj);
    canvas.requestRenderAll();
  }
};

export const sendBackward = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    canvas.sendBackwards(activeObj);
    canvas.requestRenderAll();
  }
};

export const bringToFront = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    canvas.bringToFront(activeObj);
    canvas.requestRenderAll();
  }
};

export const sendToBack = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    canvas.sendToBack(activeObj);
    canvas.requestRenderAll();
  }
};

export const toggleLock = (canvas: fabric.Canvas) => {
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    const isLocked = !activeObj.lockMovementX;
    activeObj.set({
      lockMovementX: isLocked,
      lockMovementY: isLocked,
      lockRotation: isLocked,
      lockScalingX: isLocked,
      lockScalingY: isLocked,
      hasControls: !isLocked,
    });
    canvas.requestRenderAll();
  }
};

export const addIconifySvgToCanvas = async (
  canvas: fabric.Canvas,
  iconName: string,
  color: string = '#000000',
  fallbackSvgPath?: string
) => {
  if (!canvas) return;

  const cleanId = iconName.includes(':') ? iconName.split(':')[1] : iconName;
  const builtin = BUILTIN_ICONS.find(
    (b) => b.id === cleanId || b.id === iconName || b.tags.includes(cleanId)
  );
  const targetSvgPath = fallbackSvgPath || builtin?.svgPath;

  const tryAddFallback = () => {
    if (targetSvgPath) {
      addSvgIconPath(canvas, targetSvgPath, color);
      return true;
    }
    const defaultRect = 'M4 4h16v16H4z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z';
    addSvgIconPath(canvas, defaultRect, color);
    return true;
  };

  try {
    const formattedPath = iconName.includes(':') ? iconName.replace(':', '/') : iconName;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const iconUrl = `https://api.iconify.design/${formattedPath}.svg?color=${encodeURIComponent(
      color === '#000000' ? '#000000' : color
    )}`;

    const res = await fetch(iconUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      tryAddFallback();
      return;
    }

    const svgText = await res.text();
    if (!svgText || !svgText.includes('<svg')) {
      tryAddFallback();
      return;
    }

    fabric.loadSVGFromString(svgText, (objects, options) => {
      if (!objects || objects.length === 0) {
        tryAddFallback();
        return;
      }
      const group = fabric.util.groupSVGElements(objects, options);
      const center = canvas.getCenter();
      const targetSize = getResponsiveElementSize(canvas, 100, 0.14);

      group.set({
        left: center.left - targetSize / 2,
        top: center.top - targetSize / 2,
      });
      group.scaleToWidth(targetSize);

      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.requestRenderAll();
    });
  } catch (err) {
    console.warn('Network error loading Iconify SVG, using vector fallback:', err);
    tryAddFallback();
  }
};

export const addLucideIconToCanvas = (
  canvas: fabric.Canvas,
  IconComponent: React.ComponentType<any>,
  color: string = '#000000',
  position?: { x: number; y: number }
) => {
  if (!canvas || !IconComponent) return;

  const strokeColor = color && color !== '#000000' ? color : '#00c4cc';

  const processSvgString = (svgString: string) => {
    if (!svgString) return;

    // Ensure XML Namespace is present on SVG root element for DOMParser & Fabric.js compatibility
    let validSvg = svgString;
    if (!validSvg.includes('xmlns=')) {
      validSvg = validSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    fabric.loadSVGFromString(validSvg, (objects, options) => {
      if (!objects || objects.length === 0) return;
      objects.forEach((obj) => {
        obj.set('strokeUniform', true);
        if (strokeColor && strokeColor !== '#000000') {
          if (obj.stroke && obj.stroke !== 'none' && obj.stroke !== 'transparent') {
            obj.set('stroke', strokeColor);
          }
        }
      });
      const group = fabric.util.groupSVGElements(objects, options);
      const center = canvas.getCenter();
      const targetSize = getResponsiveElementSize(canvas, 100, 0.14);

      const posX = position ? position.x : center.left - targetSize / 2;
      const posY = position ? position.y : center.top - targetSize / 2;

      group.set({
        left: posX,
        top: posY,
      });
      group.scaleToWidth(targetSize);

      canvas.add(group);
      canvas.setActiveObject(group);
      canvas.requestRenderAll();
    });
  };

  // 1. Try Server-side renderToStaticMarkup if available
  try {
    const ReactDOMServer = require('react-dom/server');
    if (ReactDOMServer && typeof ReactDOMServer.renderToStaticMarkup === 'function') {
      const staticSvg = ReactDOMServer.renderToStaticMarkup(
        React.createElement(IconComponent, { color: strokeColor, size: 48, strokeWidth: 2 })
      );
      if (staticSvg) {
        processSvgString(staticSvg);
        return;
      }
    }
  } catch (e) {
    // Fall back to client-side DOM rendering
  }

  // 2. Client-side DOM fallback with flushSync for Next.js browser runtime
  if (typeof document !== 'undefined') {
    try {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);

      const ReactDOMClient = require('react-dom/client');
      const ReactDOM = require('react-dom');
      const root = ReactDOMClient.createRoot(container);

      if (typeof ReactDOM.flushSync === 'function') {
        ReactDOM.flushSync(() => {
          root.render(
            React.createElement(IconComponent, { color: strokeColor, size: 48, strokeWidth: 2 })
          );
        });
      } else {
        root.render(
          React.createElement(IconComponent, { color: strokeColor, size: 48, strokeWidth: 2 })
        );
      }

      const svgEl = container.querySelector('svg');
      let svgString = svgEl ? svgEl.outerHTML : '';

      try {
        root.unmount();
      } catch (uErr) {}
      container.remove();

      if (svgString) {
        processSvgString(svgString);
      }
    } catch (domErr) {
      console.error('DOM render fallback error:', domErr);
    }
  }
};

export const recolorObject = (
  canvas: fabric.Canvas,
  activeObj: fabric.Object | null,
  property: 'fill' | 'stroke',
  color: string
) => {
  if (!activeObj || !canvas) return;

  const applyRecursive = (obj: fabric.Object) => {
    obj.dirty = true;
    if (obj.type === 'group' || obj.type === 'activeSelection') {
      (obj as fabric.Group).getObjects().forEach(applyRecursive);
    } else {
      if (property === 'fill') {
        const isHollowPath = obj.fill === 'transparent' || obj.fill === 'none' || obj.fill === '' || !obj.fill;
        if (isHollowPath && obj.stroke && obj.stroke !== 'none' && obj.stroke !== 'transparent') {
          obj.set('stroke', color);
        } else {
          obj.set('fill', color);
        }
      } else if (property === 'stroke') {
        obj.set('stroke', color);
        if (!obj.strokeWidth || obj.strokeWidth === 0) {
          obj.set('strokeWidth', 2);
        }
      }
    }
  };

  applyRecursive(activeObj);
  activeObj.set(property === 'fill' ? 'fill' : 'stroke', color);
  activeObj.dirty = true;
  canvas.requestRenderAll();
};

export const applyStrokeWidthToObject = (
  canvas: fabric.Canvas,
  activeObj: fabric.Object | null,
  width: number
) => {
  if (!activeObj || !canvas) return;

  const applyRecursive = (obj: fabric.Object) => {
    obj.dirty = true;
    if (obj.type === 'group' || obj.type === 'activeSelection') {
      (obj as fabric.Group).getObjects().forEach(applyRecursive);
    } else {
      obj.set('strokeWidth', width);
    }
  };

  applyRecursive(activeObj);
  activeObj.set('strokeWidth', width);
  activeObj.dirty = true;
  canvas.requestRenderAll();
};

export const toggleHollowObject = (
  canvas: fabric.Canvas,
  activeObj: fabric.Object | null,
  targetColor: string = '#8b3dff'
) => {
  if (!activeObj || !canvas) return;

  const checkIsHollow = (obj: fabric.Object): boolean => {
    if (obj.type === 'group' || obj.type === 'activeSelection') {
      const children = (obj as fabric.Group).getObjects();
      return children.length > 0 ? children.every(checkIsHollow) : true;
    }
    return obj.fill === 'transparent' || obj.fill === 'none' || obj.fill === '' || !obj.fill;
  };

  const currentlyHollow = checkIsHollow(activeObj);

  const applyToggle = (obj: fabric.Object) => {
    obj.dirty = true;
    if (obj.type === 'group' || obj.type === 'activeSelection') {
      (obj as fabric.Group).getObjects().forEach(applyToggle);
    } else {
      if (currentlyHollow) {
        obj.set({ fill: targetColor });
      } else {
        obj.set({
          fill: 'transparent',
          stroke: obj.stroke && obj.stroke !== 'none' && obj.stroke !== 'transparent' ? obj.stroke : '#00c4cc',
          strokeWidth: obj.strokeWidth || 3,
        });
      }
    }
  };

  applyToggle(activeObj);
  activeObj.dirty = true;
  canvas.requestRenderAll();
};
