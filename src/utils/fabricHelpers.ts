import { fabric } from 'fabric';

export const addHeadingText = (canvas: fabric.Canvas, text: string = 'Add a heading') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const heading = new fabric.IText(text, {
    left: center.left - 150,
    top: center.top - 40,
    fontSize: 54,
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
  const subheading = new fabric.IText(text, {
    left: center.left - 120,
    top: center.top,
    fontSize: 32,
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
  const bodyText = new fabric.IText(text, {
    left: center.left - 100,
    top: center.top + 40,
    fontSize: 22,
    fontFamily: 'Inter',
    fill: '#94a3b8',
  });
  canvas.add(bodyText);
  canvas.setActiveObject(bodyText);
  canvas.requestRenderAll();
};

export const addRectangle = (canvas: fabric.Canvas, color: string = '#8b3dff') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const rect = new fabric.Rect({
    left: center.left - 75,
    top: center.top - 75,
    width: 150,
    height: 150,
    fill: color,
    rx: 12,
    ry: 12,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
  canvas.requestRenderAll();
};

export const addCircle = (canvas: fabric.Canvas, color: string = '#00c4cc') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const circle = new fabric.Circle({
    left: center.left - 75,
    top: center.top - 75,
    radius: 75,
    fill: color,
  });
  canvas.add(circle);
  canvas.setActiveObject(circle);
  canvas.requestRenderAll();
};

export const addTriangle = (canvas: fabric.Canvas, color: string = '#f59e0b') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const triangle = new fabric.Triangle({
    left: center.left - 75,
    top: center.top - 75,
    width: 150,
    height: 150,
    fill: color,
  });
  canvas.add(triangle);
  canvas.setActiveObject(triangle);
  canvas.requestRenderAll();
};

export const addStar = (canvas: fabric.Canvas, color: string = '#ec4899') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  // 5-point star polygon points
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
    left: center.left - 75,
    top: center.top - 75,
    fill: color,
  });
  canvas.add(star);
  canvas.setActiveObject(star);
  canvas.requestRenderAll();
};

export const addLine = (canvas: fabric.Canvas, strokeColor: string = '#ffffff') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const line = new fabric.Line([center.left - 100, center.top, center.left + 100, center.top], {
    stroke: strokeColor,
    strokeWidth: 6,
  });
  canvas.add(line);
  canvas.setActiveObject(line);
  canvas.requestRenderAll();
};

export const addImageFromUrl = (canvas: fabric.Canvas, url: string) => {
  if (!canvas) return;
  fabric.Image.fromURL(url, (img) => {
    const maxDim = Math.min((canvas.width || 800) * 0.6, (canvas.height || 800) * 0.6);
    if (img.width && img.width > maxDim) {
      img.scaleToWidth(maxDim);
    }
    const center = canvas.getCenter();
    img.set({
      left: center.left - ((img.width || 300) * (img.scaleX || 1)) / 2,
      top: center.top - ((img.height || 300) * (img.scaleY || 1)) / 2,
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
      // active selection needs canvas ref
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
