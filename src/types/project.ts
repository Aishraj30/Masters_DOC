import { CanvasPage, CanvasPreset } from './canvas';

export interface CanvasProject {
  id: string;
  userId: string;
  title: string;
  preset: CanvasPreset;
  pages: CanvasPage[];
  canvasData: Record<string, string>; // pageId -> JSON string of fabric canvas
  backgroundColor?: string;
  createdAt: number;
  updatedAt: number;
  isArchived?: boolean;
}
