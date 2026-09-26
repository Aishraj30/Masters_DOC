import { fabric } from 'fabric';

/**
 * Removes any existing watermark group/objects from the canvas.
 */
export const removeWatermarkFromCanvas = (canvas: fabric.Canvas) => {
  if (!canvas) return;
  const existingWatermarks = canvas.getObjects().filter((obj) => (obj as any).isWatermark);
  existingWatermarks.forEach((obj) => canvas.remove(obj));
  canvas.requestRenderAll();
};

/**
 * Adds a diagonal repeating staggered grid watermark of text (default: 'RESEARCH RADAR')
 * covering the entire canvas area.
 */
export const addWatermarkToCanvas = (
  canvas: fabric.Canvas,
  watermarkText: string = 'RESEARCH RADAR'
) => {
  if (!canvas) return null;

  // Remove existing watermark first
  removeWatermarkFromCanvas(canvas);

  const width = canvas.width || 1080;
  const height = canvas.height || 1080;
  const textUpper = watermarkText.toUpperCase();

  const textObjects: fabric.Object[] = [];

  // Grid step configuration for diagonal staggered pattern
  const stepX = 280;
  const stepY = 130;
  const angle = -30;

  // Extend coverage bounds beyond 0..width and 0..height for full corner-to-corner angled coverage
  const startX = -width;
  const endX = width * 2;
  const startY = -height;
  const endY = height * 2;

  let rowIndex = 0;
  for (let y = startY; y <= endY; y += stepY) {
    const rowOffset = rowIndex % 2 === 0 ? 0 : stepX / 2;
    for (let x = startX; x <= endX; x += stepX) {
      const textObj = new fabric.Text(textUpper, {
        left: x + rowOffset,
        top: y,
        fontSize: 22,
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#888888',
        opacity: 0.18,
        angle: angle,
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
      });
      textObjects.push(textObj);
    }
    rowIndex++;
  }

  const group = new fabric.Group(textObjects, {
    selectable: false,
    evented: false,
    objectCaching: false,
  });

  (group as any).isWatermark = true;
  canvas.add(group);
  canvas.bringToFront(group);
  canvas.requestRenderAll();

  return group;
};

/**
 * Toggles watermark on or off.
 */
export const toggleWatermark = (
  canvas: fabric.Canvas,
  watermarkText: string = 'RESEARCH RADAR'
) => {
  if (!canvas) return false;

  const existing = canvas.getObjects().find((obj) => (obj as any).isWatermark);

  if (existing) {
    removeWatermarkFromCanvas(canvas);
    return false; // Removed
  } else {
    addWatermarkToCanvas(canvas, watermarkText);
    return true; // Added
  }
};
