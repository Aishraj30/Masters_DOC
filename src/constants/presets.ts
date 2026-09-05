import { CanvasPreset } from '../types/canvas';

export const CANVAS_PRESETS: CanvasPreset[] = [
  {
    id: 'instagram-post',
    name: 'Square Graphic',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    iconName: 'Square',
    category: 'social',
    description: 'Instagram Post, Square Banner, Profile Cover (1080×1080)'
  },
  {
    id: 'instagram-story',
    name: 'Vertical Story / Mobile',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    iconName: 'Smartphone',
    category: 'social',
    description: 'Instagram Story, TikTok, Reels, Mobile Screen (1080×1920)'
  },
  {
    id: 'presentation',
    name: 'Widescreen Presentation',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    iconName: 'Monitor',
    category: 'presentation',
    description: 'Slide Deck, Full HD Monitor, Desktop Banner (1920×1080)'
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: '16:9 HD',
    iconName: 'Youtube',
    category: 'social',
    description: 'YouTube Video Thumbnail, Video Cover (1280×720)'
  },
  {
    id: 'social-portrait',
    name: 'Social Media Portrait',
    width: 1080,
    height: 1350,
    aspectRatio: '4:5',
    iconName: 'RectangleVertical',
    category: 'social',
    description: 'Instagram Feed Portrait, Facebook Sponsored Ad (1080×1350)'
  },
  {
    id: 'poster',
    name: 'A4 Document / Poster',
    width: 1240,
    height: 1754,
    aspectRatio: '1:1.4 (A4)',
    iconName: 'FileText',
    category: 'print',
    description: 'Flyer, Poster, Report, Printable PDF Page (1240×1754)'
  },
  {
    id: 'photo-standard',
    name: 'Standard Photo Landscape',
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    iconName: 'Image',
    category: 'print',
    description: 'Blog Header Image, Landscape Photo Print (1200×800)'
  },
  {
    id: 'business-card',
    name: 'Business Card',
    width: 1050,
    height: 600,
    aspectRatio: '7:4 (2:1)',
    iconName: 'CreditCard',
    category: 'print',
    description: 'Name Card, Event Badge, Ticket (1050×600)'
  },
];
