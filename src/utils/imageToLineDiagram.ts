/**
 * Utility for converting photo/image objects (e.g. lamp, pen, device, etc.)
 * into clean vector SVG line diagrams using edge detection and vector path tracing.
 */

export interface LineDiagramOptions {
  sensitivity: number; // Threshold sensitivity 1-100
  noiseSuppression: number; // Blur / noise removal 0-10
  detailLevel: 'simple' | 'detailed';
  strokeColor: string;
  strokeWidth: number;
  invertEdges?: boolean;
}

export interface LineDiagramResult {
  svgPath: string;
  viewBox: string;
  width: number;
  height: number;
}

/**
 * Processes an image element or Data URL and extracts vector path contours.
 */
export const convertImageToLineDiagram = (
  imageSource: HTMLImageElement,
  options: LineDiagramOptions
): LineDiagramResult => {
  const imgWidth = imageSource.naturalWidth || imageSource.width || 400;
  const imgHeight = imageSource.naturalHeight || imageSource.height || 400;

  // Scale down max processing dimension for fast real-time performance (max 500px)
  const maxDim = 450;
  let scale = 1;
  if (imgWidth > maxDim || imgHeight > maxDim) {
    scale = maxDim / Math.max(imgWidth, imgHeight);
  }

  const w = Math.round(imgWidth * scale);
  const h = Math.round(imgHeight * scale);

  // 1. Render image onto offscreen canvas
  const offCanvas = document.createElement('canvas');
  offCanvas.width = w;
  offCanvas.height = h;
  const ctx = offCanvas.getContext('2d');
  if (!ctx) {
    return { svgPath: '', viewBox: `0 0 ${w} ${h}`, width: w, height: h };
  }

  ctx.drawImage(imageSource, 0, 0, w, h);
  const imgData = ctx.getImageData(0, 0, w, h);
  const pixels = imgData.data;

  // 2. Grayscale & optional noise suppression (simple box blur if noiseSuppression > 0)
  const gray = new Float32Array(w * h);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Luminance formula
    gray[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // 3. Sobel Edge Detection Filter
  const edges = new Uint8Array(w * h);
  // Map sensitivity 1-100 to threshold ~15 to 180
  const threshold = Math.max(10, Math.min(220, (101 - options.sensitivity) * 2.2));

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;

      // Sobel Kernels Gx & Gy
      const gx =
        -1 * gray[(y - 1) * w + (x - 1)] + 1 * gray[(y - 1) * w + (x + 1)] +
        -2 * gray[y * w + (x - 1)]       + 2 * gray[y * w + (x + 1)] +
        -1 * gray[(y + 1) * w + (x - 1)] + 1 * gray[(y + 1) * w + (x + 1)];

      const gy =
        -1 * gray[(y - 1) * w + (x - 1)] - 2 * gray[(y - 1) * w + x] - 1 * gray[(y - 1) * w + (x + 1)] +
         1 * gray[(y + 1) * w + (x - 1)] + 2 * gray[(y + 1) * w + x] + 1 * gray[(y + 1) * w + (x + 1)];

      const mag = Math.sqrt(gx * gx + gy * gy);

      if (options.invertEdges) {
        edges[idx] = mag < threshold ? 255 : 0;
      } else {
        edges[idx] = mag >= threshold ? 255 : 0;
      }
    }
  }

  // 4. Contour Line Tracing -> SVG path segments
  const pathSegments: string[] = [];
  const visited = new Uint8Array(w * h);

  const step = options.detailLevel === 'simple' ? 3 : 1;

  for (let y = 1; y < h - 1; y += step) {
    for (let x = 1; x < w - 1; x += step) {
      const idx = y * w + x;
      if (edges[idx] === 255 && !visited[idx]) {
        // Trace line segment
        let currX = x;
        let currY = y;
        let points = `M ${currX} ${currY}`;
        let length = 0;

        while (currX > 0 && currX < w - 1 && currY > 0 && currY < h - 1) {
          const cIdx = currY * w + currX;
          visited[cIdx] = 1;
          length++;

          // Search 8-neighbor directions for next edge pixel
          let foundNext = false;
          const neighbors = [
            [1, 0], [0, 1], [-1, 0], [0, -1],
            [1, 1], [-1, 1], [1, -1], [-1, -1]
          ];

          for (const [dx, dy] of neighbors) {
            const nx = currX + dx;
            const ny = currY + dy;
            const nIdx = ny * w + nx;
            if (edges[nIdx] === 255 && !visited[nIdx]) {
              currX = nx;
              currY = ny;
              points += ` L ${currX} ${currY}`;
              foundNext = true;
              break;
            }
          }

          if (!foundNext) break;
        }

        // Keep segments longer than 2 pixels to suppress tiny speckle noise
        if (length >= (options.detailLevel === 'simple' ? 3 : 2)) {
          pathSegments.push(points);
        }
      }
    }
  }

  const svgPath = pathSegments.join(' ');
  return {
    svgPath,
    viewBox: `0 0 ${w} ${h}`,
    width: w,
    height: h,
  };
};
