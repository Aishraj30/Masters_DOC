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

export const addHexagon = (canvas: fabric.Canvas, color: string = '#3b82f6') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 50, y: 0 },
    { x: 150, y: 0 },
    { x: 200, y: 86 },
    { x: 150, y: 173 },
    { x: 50, y: 173 },
    { x: 0, y: 86 },
  ];
  const hex = new fabric.Polygon(points, {
    left: center.left - 100,
    top: center.top - 86,
    fill: color,
  });
  canvas.add(hex);
  canvas.setActiveObject(hex);
  canvas.requestRenderAll();
};

export const addDiamond = (canvas: fabric.Canvas, color: string = '#10b981') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const points = [
    { x: 75, y: 0 },
    { x: 150, y: 75 },
    { x: 75, y: 150 },
    { x: 0, y: 75 },
  ];
  const diamond = new fabric.Polygon(points, {
    left: center.left - 75,
    top: center.top - 75,
    fill: color,
  });
  canvas.add(diamond);
  canvas.setActiveObject(diamond);
  canvas.requestRenderAll();
};

export const addHeart = (canvas: fabric.Canvas, color: string = '#ef4444') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
  const path = new fabric.Path(heartPath, {
    left: center.left - 60,
    top: center.top - 60,
    fill: color,
  });
  path.scaleToWidth(120);
  canvas.add(path);
  canvas.setActiveObject(path);
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

export const addArrow = (
  canvas: fabric.Canvas,
  type: 'right' | 'left' | 'up' | 'down' | 'double',
  color: string = '#00c4cc'
) => {
  if (!canvas) return;
  const center = canvas.getCenter();

  let pathData = '';
  switch (type) {
    case 'right':
      pathData = 'M 0 20 L 120 20 L 120 0 L 160 30 L 120 60 L 120 40 L 0 40 Z';
      break;
    case 'left':
      pathData = 'M 160 20 L 40 20 L 40 0 L 0 30 L 40 60 L 40 40 L 160 40 Z';
      break;
    case 'up':
      pathData = 'M 20 160 L 20 40 L 0 40 L 30 0 L 60 40 L 40 40 L 40 160 Z';
      break;
    case 'down':
      pathData = 'M 20 0 L 20 120 L 0 120 L 30 160 L 60 120 L 40 120 L 40 0 Z';
      break;
    case 'double':
      pathData = 'M 40 20 L 120 20 L 120 0 L 160 30 L 120 60 L 120 40 L 40 40 L 40 60 L 0 30 L 40 0 Z';
      break;
  }

  const arrow = new fabric.Path(pathData, {
    left: center.left - 80,
    top: center.top - 30,
    fill: color,
  });
  canvas.add(arrow);
  canvas.setActiveObject(arrow);
  canvas.requestRenderAll();
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

export const addSvgIconPath = (canvas: fabric.Canvas, pathData: string, color: string = '#00c4cc') => {
  if (!canvas) return;
  const center = canvas.getCenter();
  const path = new fabric.Path(pathData, {
    left: center.left - 40,
    top: center.top - 40,
    fill: color,
  });
  path.scaleToWidth(80);
  canvas.add(path);
  canvas.setActiveObject(path);
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
