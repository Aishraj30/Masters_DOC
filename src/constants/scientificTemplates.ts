import { PrebuiltTemplate } from '../types/canvas';

export const SCIENTIFIC_TEMPLATES: PrebuiltTemplate[] = [
  {
    id: 'iot-3tier-arch',
    title: '3-Tier IoT Architecture',
    category: 'IoT & Edge',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
    width: 1280,
    height: 720,
    backgroundColor: '#0f172a',
    elements: [
      // Title
      {
        type: 'i-text',
        text: '3-Tier Scientific IoT Architecture',
        left: 380,
        top: 40,
        fontSize: 32,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#38bdf8'
      },
      // Layer 1: Sensors (Bottom)
      {
        type: 'rect',
        left: 80,
        top: 520,
        width: 1120,
        height: 140,
        fill: '#1e293b',
        stroke: '#334155',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Tier 1: Sensing Layer (IoT Nodes, Actuators, Cameras)',
        left: 110,
        top: 535,
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#94a3b8'
      },
      // Layer 2: Edge & Gateway (Middle)
      {
        type: 'rect',
        left: 80,
        top: 310,
        width: 1120,
        height: 160,
        fill: '#1e293b',
        stroke: '#0284c7',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Tier 2: Edge & Fog Processing Layer (Gateways, Edge Servers)',
        left: 110,
        top: 325,
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#38bdf8'
      },
      // Layer 3: Cloud Platform (Top)
      {
        type: 'rect',
        left: 80,
        top: 110,
        width: 1120,
        height: 160,
        fill: '#1e293b',
        stroke: '#818cf8',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Tier 3: Cloud & Data Center (Global Analytics, AI Training)',
        left: 110,
        top: 125,
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#818cf8'
      },
      // Flow Connections (Arrows)
      {
        type: 'path',
        path: 'M 640 520 L 640 470',
        stroke: '#38bdf8',
        strokeWidth: 4,
        fill: 'transparent'
      },
      {
        type: 'path',
        path: 'M 640 310 L 640 270',
        stroke: '#818cf8',
        strokeWidth: 4,
        fill: 'transparent'
      }
    ]
  },
  {
    id: 'gnn-pipeline-arch',
    title: 'GNN Pipeline & Message Passing',
    category: 'AI & ML',
    thumbnail: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&auto=format&fit=crop&q=80',
    width: 1280,
    height: 720,
    backgroundColor: '#090d16',
    elements: [
      {
        type: 'i-text',
        text: 'Graph Neural Network (GNN) Message Passing Pipeline',
        left: 240,
        top: 40,
        fontSize: 32,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#00c4cc'
      },
      // Step 1: Input Graph
      {
        type: 'rect',
        left: 60,
        top: 180,
        width: 320,
        height: 440,
        fill: '#131c2e',
        stroke: '#1e293b',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Input Graph G = (V, E)',
        left: 90,
        top: 200,
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#ffffff'
      },
      // Step 2: GNN Layer & Aggregation
      {
        type: 'rect',
        left: 480,
        top: 180,
        width: 320,
        height: 440,
        fill: '#131c2e',
        stroke: '#00c4cc',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'GNN Layer k (Aggregate)',
        left: 505,
        top: 200,
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#00c4cc'
      },
      // Step 3: Embeddings & Classification
      {
        type: 'rect',
        left: 900,
        top: 180,
        width: 320,
        height: 440,
        fill: '#131c2e',
        stroke: '#a855f7',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Node Embeddings & Output',
        left: 920,
        top: 200,
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#a855f7'
      },
      // Inter-step arrows
      {
        type: 'path',
        path: 'M 380 400 L 480 400',
        stroke: '#00c4cc',
        strokeWidth: 4,
        fill: 'transparent'
      },
      {
        type: 'path',
        path: 'M 800 400 L 900 400',
        stroke: '#a855f7',
        strokeWidth: 4,
        fill: 'transparent'
      }
    ]
  },
  {
    id: 'federated-learning-arch',
    title: 'Federated Learning Framework',
    category: 'AI & ML',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    width: 1280,
    height: 720,
    backgroundColor: '#0f172a',
    elements: [
      {
        type: 'i-text',
        text: 'Privacy-Preserving Federated Learning Architecture',
        left: 220,
        top: 40,
        fontSize: 32,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#10b981'
      },
      // Central Server
      {
        type: 'rect',
        left: 480,
        top: 120,
        width: 320,
        height: 180,
        fill: '#1e293b',
        stroke: '#10b981',
        strokeWidth: 3,
        rx: 20,
        ry: 20
      },
      {
        type: 'i-text',
        text: 'Central Aggregation Server',
        left: 510,
        top: 150,
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#10b981'
      },
      {
        type: 'i-text',
        text: 'FedAvg / Global Weights W',
        left: 520,
        top: 210,
        fontSize: 16,
        fontFamily: 'Inter',
        fill: '#94a3b8'
      },
      // Edge Clients (3 Nodes)
      {
        type: 'rect',
        left: 80,
        top: 440,
        width: 320,
        height: 200,
        fill: '#1e293b',
        stroke: '#334155',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Client Node A (Hospital)',
        left: 110,
        top: 470,
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#ffffff'
      },
      {
        type: 'rect',
        left: 480,
        top: 440,
        width: 320,
        height: 200,
        fill: '#1e293b',
        stroke: '#334155',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Client Node B (Smart Grid)',
        left: 500,
        top: 470,
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#ffffff'
      },
      {
        type: 'rect',
        left: 880,
        top: 440,
        width: 320,
        height: 200,
        fill: '#1e293b',
        stroke: '#334155',
        strokeWidth: 2,
        rx: 16,
        ry: 16
      },
      {
        type: 'i-text',
        text: 'Client Node C (Mobile Edge)',
        left: 900,
        top: 470,
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#ffffff'
      }
    ]
  },
  {
    id: 'digital-twin-arch',
    title: 'Digital Twin Cyber-Physical System',
    category: 'Cyber-Physical',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=80',
    width: 1280,
    height: 720,
    backgroundColor: '#0a0f1d',
    elements: [
      {
        type: 'i-text',
        text: 'Digital Twin System: Physical Asset & Virtual Sync',
        left: 200,
        top: 40,
        fontSize: 32,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#ec4899'
      },
      // Physical Space
      {
        type: 'rect',
        left: 100,
        top: 160,
        width: 480,
        height: 480,
        fill: '#131b2e',
        stroke: '#3b82f6',
        strokeWidth: 2,
        rx: 24,
        ry: 24
      },
      {
        type: 'i-text',
        text: 'PHYSICAL DOMAIN (IoT Sensors)',
        left: 130,
        top: 190,
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#60a5fa'
      },
      // Virtual Space
      {
        type: 'rect',
        left: 700,
        top: 160,
        width: 480,
        height: 480,
        fill: '#131b2e',
        stroke: '#ec4899',
        strokeWidth: 2,
        rx: 24,
        ry: 24
      },
      {
        type: 'i-text',
        text: 'VIRTUAL DOMAIN (Digital Twin Engine)',
        left: 720,
        top: 190,
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fill: '#f472b6'
      },
      // Real-time Sync Link
      {
        type: 'path',
        path: 'M 580 340 L 700 340',
        stroke: '#ec4899',
        strokeWidth: 4,
        fill: 'transparent'
      },
      {
        type: 'path',
        path: 'M 700 440 L 580 440',
        stroke: '#60a5fa',
        strokeWidth: 4,
        fill: 'transparent'
      }
    ]
  }
];
