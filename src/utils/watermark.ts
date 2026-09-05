import { fabric } from 'fabric';

export const toggleWatermark = (canvas: fabric.Canvas, watermarkText: string = 'DOCMASTER DRAFT') => {
  if (!canvas) return;

  // Check if watermark already exists
  const existingWatermark = canvas.getObjects().find((obj) => (obj as any).isWatermark);

  if (existingWatermark) {
    canvas.remove(existingWatermark);
    canvas.requestRenderAll();
    return false; // Watermark removed
  }

  // Create angled watermark text across canvas center
  const center = canvas.getCenter();
  const watermark = new fabric.IText(watermarkText.toUpperCase(), {
    left: center.left - 200,
    top: center.top - 50,
    fontSize: 56,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fill: '#ffffff',
    opacity: 0.15,
    angle: -30,
    selectable: false,
    evented: false,
  });

  (watermark as any).isWatermark = true;
  canvas.add(watermark);
  canvas.bringToFront(watermark);
  canvas.requestRenderAll();
  return true; // Watermark added
};
