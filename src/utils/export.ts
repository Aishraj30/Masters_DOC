import { fabric } from 'fabric';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

export type ExportFormat = 'png' | 'jpeg' | 'svg' | 'pdf' | 'json';

export const exportCanvas = async (
  canvas: fabric.Canvas,
  format: ExportFormat,
  filename: string = 'docmaster-design',
  multiplier: number = 2,
  quality: number = 0.95
) => {
  if (!canvas) return;

  // Deselect active object to avoid selection box border in export
  canvas.discardActiveObject();
  canvas.requestRenderAll();

  const title = filename.trim().toLowerCase().replace(/\s+/g, '-') || 'docmaster-design';

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
        multiplier: 2,
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
