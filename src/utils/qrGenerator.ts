import { fabric } from 'fabric';

export const addQrCodeToCanvas = (
  canvas: fabric.Canvas,
  textOrUrl: string,
  fgColor: string = '#000000',
  bgColor: string = '#ffffff'
) => {
  if (!canvas || !textOrUrl.trim()) return;

  const encodedData = encodeURIComponent(textOrUrl.trim());
  const cleanFg = fgColor.replace('#', '');
  const cleanBg = bgColor.replace('#', '');

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodedData}&color=${cleanFg}&bgcolor=${cleanBg}&margin=2`;

  fabric.Image.fromURL(qrApiUrl, (img) => {
    const center = canvas.getCenter();
    img.scaleToWidth(200);
    img.set({
      left: center.left - 100,
      top: center.top - 100,
    });
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.requestRenderAll();
  }, { crossOrigin: 'anonymous' });
};
