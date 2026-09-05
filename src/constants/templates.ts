import { PrebuiltTemplate } from '../types/canvas';

export const PREBUILT_TEMPLATES: PrebuiltTemplate[] = [
  {
    id: 'tech-innovate',
    title: 'Cyber Tech Event',
    category: 'Social Media',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
    width: 1080,
    height: 1080,
    backgroundColor: '#0f172a',
    elements: [
      {
        type: 'rect',
        left: 0,
        top: 0,
        width: 1080,
        height: 1080,
        fill: '#0f172a',
        selectable: false
      },
      {
        type: 'circle',
        left: 240,
        top: 200,
        radius: 300,
        fill: '#3b82f6',
        opacity: 0.2
      },
      {
        type: 'rect',
        left: 140,
        top: 140,
        width: 800,
        height: 800,
        fill: 'transparent',
        stroke: '#38bdf8',
        strokeWidth: 4,
        rx: 24,
        ry: 24
      },
      {
        type: 'i-text',
        text: 'FUTURE OF AI',
        left: 200,
        top: 280,
        fontSize: 76,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#ffffff'
      },
      {
        type: 'i-text',
        text: 'ANNUAL TECH SUMMIT 2026',
        left: 204,
        top: 380,
        fontSize: 28,
        fontFamily: 'Space Grotesk',
        fontWeight: '600',
        fill: '#38bdf8'
      },
      {
        type: 'i-text',
        text: 'Join industry pioneers exploring quantum computing, generative neural networks, and scalable automation systems.',
        left: 204,
        top: 460,
        width: 680,
        fontSize: 24,
        fontFamily: 'Inter',
        fill: '#94a3b8'
      },
      {
        type: 'rect',
        left: 204,
        top: 620,
        width: 320,
        height: 80,
        fill: '#2563eb',
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'REGISTER NOW',
        left: 245,
        top: 642,
        fontSize: 24,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#ffffff'
      }
    ]
  },
  {
    id: 'minimal-quote',
    title: 'Minimalist Quote Card',
    category: 'Quotes',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80',
    width: 1080,
    height: 1080,
    backgroundColor: '#f8fafc',
    elements: [
      {
        type: 'rect',
        left: 0,
        top: 0,
        width: 1080,
        height: 1080,
        fill: '#f8fafc',
        selectable: false
      },
      {
        type: 'rect',
        left: 100,
        top: 100,
        width: 880,
        height: 880,
        fill: '#ffffff',
        stroke: '#e2e8f0',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: '“',
        left: 160,
        top: 180,
        fontSize: 160,
        fontFamily: 'Playfair Display',
        fill: '#cbd5e1'
      },
      {
        type: 'i-text',
        text: 'Simplicity is about subtracting the obvious and adding the meaningful.',
        left: 180,
        top: 360,
        width: 720,
        fontSize: 48,
        fontFamily: 'Playfair Display',
        fontStyle: 'italic',
        fill: '#0f172a'
      },
      {
        type: 'rect',
        left: 180,
        top: 640,
        width: 120,
        height: 4,
        fill: '#6366f1'
      },
      {
        type: 'i-text',
        text: '— JOHN MAEDA',
        left: 180,
        top: 670,
        fontSize: 24,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fill: '#64748b'
      }
    ]
  },
  {
    id: 'mega-sale-banner',
    title: 'Mega Flash Sale 50% OFF',
    category: 'Promotions',
    thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop&q=80',
    width: 1280,
    height: 720,
    backgroundColor: '#7c3aed',
    elements: [
      {
        type: 'rect',
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
        fill: '#7c3aed',
        selectable: false
      },
      {
        type: 'circle',
        left: 800,
        top: -100,
        radius: 400,
        fill: '#a855f7',
        opacity: 0.6
      },
      {
        type: 'i-text',
        text: 'BIGGEST DISCOUNTS',
        left: 100,
        top: 140,
        fontSize: 32,
        fontFamily: 'Oswald',
        fill: '#fde047'
      },
      {
        type: 'i-text',
        text: 'MEGA FLASH SALE',
        left: 95,
        top: 190,
        fontSize: 88,
        fontFamily: 'Anton',
        fill: '#ffffff'
      },
      {
        type: 'rect',
        left: 100,
        top: 320,
        width: 380,
        height: 90,
        fill: '#facc15',
        rx: 20,
        ry: 20
      },
      {
        type: 'i-text',
        text: 'UP TO 50% OFF',
        left: 130,
        top: 342,
        fontSize: 40,
        fontFamily: 'Montserrat',
        fontWeight: '800',
        fill: '#000000'
      },
      {
        type: 'i-text',
        text: 'Limited time offer. Free worldwide shipping on all orders over $50.',
        left: 100,
        top: 450,
        width: 600,
        fontSize: 22,
        fontFamily: 'Inter',
        fill: '#e9d5ff'
      },
      {
        type: 'rect',
        left: 100,
        top: 540,
        width: 260,
        height: 60,
        fill: '#ffffff',
        rx: 30,
        ry: 30
      },
      {
        type: 'i-text',
        text: 'SHOP NOW →',
        left: 140,
        top: 556,
        fontSize: 22,
        fontFamily: 'Poppins',
        fontWeight: '700',
        fill: '#6b21a8'
      }
    ]
  }
];
