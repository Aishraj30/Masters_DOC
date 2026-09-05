export type CanvasPreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
  iconName: string;
  category: 'social' | 'presentation' | 'print' | 'custom';
  description: string;
};

export type ActiveTab = 'templates' | 'elements' | 'icons' | 'text' | 'uploads' | 'draw' | 'backgrounds' | 'brandkit' | 'qrcode' | 'codecard' | 'accessibility' | 'layers';

export type FontOption = {
  name: string;
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'handwriting';
};

export type CanvasPage = {
  id: string;
  title: string;
  width: number;
  height: number;
  aspectRatio: string;
  jsonState?: string;
  thumbnail?: string;
  backgroundColor: string;
};

export type SelectedObjectType = 'text' | 'i-text' | 'rect' | 'circle' | 'triangle' | 'image' | 'path' | 'group' | 'activeSelection' | 'none';

export type ImageFilterSettings = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: boolean;
  sepia: boolean;
};

export type ObjectProperties = {
  type: SelectedObjectType;
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  fontStyle: string;
  textAlign: string;
  underline: boolean;
  linethrough: boolean;
  charSpacing: number;
  lineHeight: number;
  textBackgroundColor: string;
  shadowColor: string;
  shadowBlur: number;
  angle: number;
  width: number;
  height: number;
  left: number;
  top: number;
  isLocked: boolean;
  rx?: number;
  ry?: number;
  filters?: ImageFilterSettings;
};

export type BrandPalette = {
  id: string;
  name: string;
  colors: string[];
};

export type PrebuiltTemplate = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: any[];
};
