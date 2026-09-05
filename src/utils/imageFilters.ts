import { fabric } from 'fabric';
import { ImageFilterSettings } from '../types/canvas';

export const applyImageFilters = (imgObj: fabric.Image, settings: ImageFilterSettings) => {
  if (!imgObj || imgObj.type !== 'image') return;

  const filters: fabric.IBaseFilter[] = [];

  // Brightness (-1 to 1)
  if (settings.brightness !== 0) {
    filters.push(new fabric.Image.filters.Brightness({ brightness: settings.brightness }));
  }

  // Contrast (-1 to 1)
  if (settings.contrast !== 0) {
    filters.push(new fabric.Image.filters.Contrast({ contrast: settings.contrast }));
  }

  // Saturation (-1 to 1)
  if (settings.saturation !== 0) {
    filters.push(new (fabric.Image.filters as any).Saturation({ saturation: settings.saturation }));
  }

  // Blur (0 to 1)
  if (settings.blur > 0) {
    filters.push(new (fabric.Image.filters as any).Blur({ blur: settings.blur }));
  }

  // Grayscale
  if (settings.grayscale) {
    filters.push(new fabric.Image.filters.Grayscale());
  }

  // Sepia
  if (settings.sepia) {
    filters.push(new fabric.Image.filters.Sepia());
  }

  imgObj.filters = filters;
  imgObj.applyFilters();
  if (imgObj.canvas) {
    imgObj.canvas.requestRenderAll();
  }
};
