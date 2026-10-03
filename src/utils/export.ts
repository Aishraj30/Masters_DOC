import { fabric } from 'fabric';
import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';
import confetti from 'canvas-confetti';
import { CanvasPage } from '../types/canvas';
import { addWatermarkToCanvas, removeWatermarkFromCanvas } from './watermark';

export type ExportFormat = 'png' | 'jpeg' | 'svg' | 'pdf' | 'json' | 'pptx';

export const exportCanvas = async (
  canvas: fabric.Canvas,
  format: ExportFormat,
  filename: string = 'docmaster-design',
  multiplier: number = 2,
  quality: number = 0.95,
  pages?: CanvasPage[],
  includeWatermark: boolean = true,
  watermarkText: string = 'RESEARCH RADAR'
) => {
  if (!canvas) return;

  // Deselect active object to avoid selection box border in export
  canvas.discardActiveObject();

  // Check if canvas already had a watermark before export
  const hadWatermarkBefore = canvas.getObjects().some((obj) => (obj as any).isWatermark);

  // Apply or remove watermark for export depending on user subscription/pass
  if (includeWatermark) {
    if (!hadWatermarkBefore) {
      addWatermarkToCanvas(canvas, watermarkText);
    }
  } else {
    removeWatermarkFromCanvas(canvas);
  }

  canvas.requestRenderAll();

  const title = filename.trim().toLowerCase().replace(/\s+/g, '-') || 'docmaster-design';

  try {
    // Multi-page PDF or PPTX export
    if (pages && pages.length > 1 && (format === 'pdf' || format === 'pptx')) {
      if (format === 'pdf') {
        const width = canvas.width || 1080;
        const height = canvas.height || 1080;
        const orientation = width > height ? 'l' : 'p';
        const pdf = new jsPDF({
          orientation,
          unit: 'px',
          format: [width, height],
        });

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          if (i > 0) pdf.addPage([width, height], orientation);

          if (page.jsonState) {
            await new Promise<void>((resolve) => {
              canvas.loadFromJSON(page.jsonState, () => {
                if (includeWatermark) {
                  addWatermarkToCanvas(canvas, watermarkText);
                } else {
                  removeWatermarkFromCanvas(canvas);
                }
                canvas.renderAll();
                const imgData = canvas.toDataURL({
                  format: 'jpeg',
                  quality: 1.0,
                  multiplier,
                });
                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                resolve();
              });
            });
          } else {
            if (includeWatermark) {
              addWatermarkToCanvas(canvas, watermarkText);
            } else {
              removeWatermarkFromCanvas(canvas);
            }
            canvas.renderAll();
            const imgData = canvas.toDataURL({
              format: 'jpeg',
              quality: 1.0,
              multiplier,
            });
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
          }
        }
        pdf.save(`${title}.pdf`);
        fireConfetti();
        return;
      }

      if (format === 'pptx') {
        const pptx = new PptxGenJS();
        const width = canvas.width || 1280;
        const height = canvas.height || 720;

        pptx.defineLayout({
          name: 'CUSTOM',
          width: width / 96,
          height: height / 96,
        });
        pptx.layout = 'CUSTOM';

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          const slide = pptx.addSlide();

          if (page.jsonState) {
            await new Promise<void>((resolve) => {
              canvas.loadFromJSON(page.jsonState, () => {
                if (includeWatermark) {
                  addWatermarkToCanvas(canvas, watermarkText);
                } else {
                  removeWatermarkFromCanvas(canvas);
                }
                canvas.renderAll();
                const imgData = canvas.toDataURL({
                  format: 'png',
                  multiplier,
                });
                slide.addImage({
                  data: imgData,
                  x: 0,
                  y: 0,
                  w: width / 96,
                  h: height / 96,
                });
                resolve();
              });
            });
          } else {
            if (includeWatermark) {
              addWatermarkToCanvas(canvas, watermarkText);
            } else {
              removeWatermarkFromCanvas(canvas);
            }
            canvas.renderAll();
            const imgData = canvas.toDataURL({
              format: 'png',
              multiplier,
            });
            slide.addImage({
              data: imgData,
              x: 0,
              y: 0,
              w: width / 96,
              h: height / 96,
            });
          }
        }
        await pptx.writeFile({ fileName: `${title}.pptx` });
        fireConfetti();
        return;
      }
    }

    // Standard export for PNG, JPEG, SVG, JSON or single page PDF/PPTX
    switch (format) {
      case 'png': {
        const dataUrl = canvas.toDataURL({
          format: 'png',
          multiplier,
        });
        triggerDownload(dataUrl, `${title}.png`);
        fireConfetti();
        break;
      }
      case 'jpeg': {
        const dataUrl = canvas.toDataURL({
          format: 'jpeg',
          quality,
          multiplier,
        });
        triggerDownload(dataUrl, `${title}.jpg`);
        fireConfetti();
        break;
      }
      case 'svg': {
        const svgData = canvas.toSVG();
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${title}.svg`);
        fireConfetti();
        break;
      }
      case 'json': {
        const jsonString = JSON.stringify(canvas.toJSON(['id', 'name', 'isLocked', 'rx', 'ry']));
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${title}.docmaster`);
        break;
      }
      case 'pdf': {
        const width = canvas.width || 1080;
        const height = canvas.height || 1080;
        const orientation = width > height ? 'l' : 'p';

        const imgData = canvas.toDataURL({
          format: 'jpeg',
          quality: 1.0,
          multiplier,
        });

        const pdf = new jsPDF({
          orientation,
          unit: 'px',
          format: [width, height],
        });

        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save(`${title}.pdf`);
        fireConfetti();
        break;
      }
      case 'pptx': {
        const pptx = new PptxGenJS();
        const width = canvas.width || 1280;
        const height = canvas.height || 720;

        pptx.defineLayout({
          name: 'CUSTOM',
          width: width / 96,
          height: height / 96,
        });
        pptx.layout = 'CUSTOM';

        const slide = pptx.addSlide();

        const imgData = canvas.toDataURL({
          format: 'png',
          multiplier,
        });

        slide.addImage({
          data: imgData,
          x: 0,
          y: 0,
          w: width / 96,
          h: height / 96,
        });

        await pptx.writeFile({ fileName: `${title}.pptx` });
        fireConfetti();
        break;
      }
    }
  } finally {
    // If watermark was added temporarily for export, clean up so canvas editing stays clean
    if (!hadWatermarkBefore) {
      removeWatermarkFromCanvas(canvas);
    }
  }
};

const triggerDownload = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const fireConfetti = () => {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  } catch (e) {
    // Ignore if confetti fails
  }
};
