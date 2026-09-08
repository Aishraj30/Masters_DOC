export interface ScientificIcon {
  id: string;
  name: string;
  category: 'Computing' | 'Networking' | 'IoT' | 'Robotics' | 'AI / ML' | 'Graph' | 'Diagram Elements' | 'Environment';
  svgPath: string; // viewBox="0 0 24 24"
  tags: string[];
}

export const ScientificIconCategories = [
  'All',
  'Computing',
  'Networking',
  'IoT',
  'Robotics',
  'AI / ML',
  'Graph',
  'Diagram Elements',
  'Environment'
] as const;

/**
 * Pure Stroke-Only Scientific Vector Icon Catalog (IEEE / ACM Publication Style)
 * Grid-aligned 24x24 viewBox, stroke="currentColor", fill="none", stroke-width=2px.
 */
export const SCIENTIFIC_ICONS: ScientificIcon[] = [
  {
    id: 'cloud',
    name: 'Cloud Platform',
    category: 'Computing',
    tags: ['cloud', 'storage', 'server', 'network', 'aws', 'azure'],
    svgPath: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'
  },
  {
    id: 'data-center',
    name: 'Data Center Rack',
    category: 'Computing',
    tags: ['datacenter', 'servers', 'rack', 'cluster', 'infrastructure'],
    svgPath: 'M4 4h16v5H4V4zm0 11h16v5H4v-5zm2-8h2m4 0h6m-12 11h2m4 0h6'
  },
  {
    id: 'server',
    name: 'Server Node',
    category: 'Computing',
    tags: ['server', 'hardware', 'host', 'mainframe', 'node'],
    svgPath: 'M2 5h20v4H2V5zm0 10h20v4H2v-4zm4-3h2m0 6h2m8-6h4m-4 6h4'
  },
  {
    id: 'edge-server',
    name: 'Edge Computing Node',
    category: 'Computing',
    tags: ['edge', 'node', 'server', 'computing', 'fog', 'mec'],
    svgPath: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 6h14M5 15h14M7 6h2m0 6h2m-2 6h2'
  },
  {
    id: 'fog-node',
    name: 'Fog Node',
    category: 'Computing',
    tags: ['fog', 'edge', 'gateway', 'cloudlet', 'offload'],
    svgPath: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9zM12 12v5m-2.5-2.5l2.5 2.5 2.5-2.5'
  },
  {
    id: 'cpu',
    name: 'CPU / Microprocessor',
    category: 'Computing',
    tags: ['cpu', 'chip', 'processor', 'hardware', 'compute', 'soc'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8v8H8V8zm1-6v2m4-2v2m4-2v2M2 9h2m-2 4h2m-2 4h2m6 7v-2m-4 2v-2m-4 2v-2m18-9h-2m2-4h-2m2-4h-2'
  },
  {
    id: 'gpu',
    name: 'GPU Accelerator',
    category: 'Computing',
    tags: ['gpu', 'cuda', 'graphics', 'ai-chip', 'hardware', 'nvidia'],
    svgPath: 'M2 6h20v12H2V6zm4 3h4v6H6V9zm8 0h4v6h-4V9z'
  },
  {
    id: 'tpu',
    name: 'TPU AI Accelerator',
    category: 'Computing',
    tags: ['tpu', 'npu', 'neural-processor', 'ai-chip', 'google'],
    svgPath: 'M3 3h18v18H3V3zm4 4h10v10H7V7zm3 3h4v4h-4v-4z'
  },
  {
    id: 'storage',
    name: 'Storage Drive Unit',
    category: 'Computing',
    tags: ['storage', 'disk', 'ssd', 'hdd', 'drive', 'volume'],
    svgPath: 'M3 5h18v4H3V5zm0 5h18v4H3v-4zm0 5h18v4H3v-4zm3-8h2m-2 5h2m-2 5h2'
  },
  {
    id: 'database',
    name: 'Database Cylinder',
    category: 'Computing',
    tags: ['database', 'db', 'sql', 'storage', 'nosql', 'postgres', 'mongo'],
    svgPath: 'M12 3c4.97 0 9 1.34 9 3v12c0 1.66-4.03 3-9 3s-9-1.34-9-3V6c0-1.66 4.03-3 9-3zm-9 6c0 1.66 4.03 3 9 3s9-1.34 9-3zm0 6c0 1.66 4.03 3 9 3s9-1.34 9-3'
  },
  {
    id: 'cache-redis',
    name: 'In-Memory Cache',
    category: 'Computing',
    tags: ['cache', 'redis', 'memcached', 'fast-store', 'ram'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm0 7.5L2 14.5l10 5 10-5-10-5z'
  },
  {
    id: 'load-balancer',
    name: 'Load Balancer Proxy',
    category: 'Computing',
    tags: ['load-balancer', 'proxy', 'nginx', 'traffic', 'routing'],
    svgPath: 'M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5'
  },
  {
    id: 'container-docker',
    name: 'Container Pod',
    category: 'Computing',
    tags: ['container', 'docker', 'virtualization', 'pod', 'k8s'],
    svgPath: 'M3 4h8v8H3V4zm10 0h8v8h-8V4ZM3 14h8v8H3v-8zm10 0h8v8h-8v-8z'
  },
  {
    id: 'router',
    name: 'Network Router',
    category: 'Networking',
    tags: ['router', 'wifi', 'network', 'gateway', 'cisco', 'packet'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-5 10h10M9 8l-3 4 3 4m6-8l3 4-3 4'
  },
  {
    id: 'switch',
    name: 'Managed Ethernet Switch',
    category: 'Networking',
    tags: ['switch', 'ethernet', 'hub', 'lan', 'networking', 'ports'],
    svgPath: 'M2 6h20v12H2V6zm3 4h2m3 0h2m3 0h2m3 0h2'
  },
  {
    id: 'gateway',
    name: 'IoT Gateway Interface',
    category: 'Networking',
    tags: ['gateway', 'bridge', 'interface', 'router', 'access'],
    svgPath: 'M4 5h16v14H4V5zm8 0v14M4 12h16'
  },
  {
    id: 'base-station',
    name: '5G / 6G Cell Tower',
    category: 'Networking',
    tags: ['base-station', '5g', '6g', 'cell-tower', 'cellular', 'lte', 'antenna', 'gnb'],
    svgPath: 'M12 2L7 22h10L12 2zm-5 6a7 7 0 0 1 10 0M4.5 4.5a11 11 0 0 1 15 0'
  },
  {
    id: 'antenna',
    name: 'RF Antenna Transceiver',
    category: 'Networking',
    tags: ['antenna', 'radio', 'rf', 'wireless', 'signal', 'transmission'],
    svgPath: 'M12 3v18m-6-15l6 6 6-6M5 7a9 9 0 0 1 14 0'
  },
  {
    id: 'wireless-link',
    name: 'Wireless Signal Wave',
    category: 'Networking',
    tags: ['wireless', 'link', 'wifi', 'radio', 'signal', 'propagation'],
    svgPath: 'M5 12.55a11 11 0 0 1 14 0M8.5 16a7 7 0 0 1 7 0M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
  },
  {
    id: 'wired-link',
    name: 'Wired Connection Cable',
    category: 'Networking',
    tags: ['wired', 'cable', 'ethernet', 'connection', 'link', 'fiber'],
    svgPath: 'M3 12h18M6 8v8m12-8v8'
  },
  {
    id: 'satellite-leo',
    name: 'LEO Satellite Node',
    category: 'Networking',
    tags: ['satellite', 'leo', 'space', 'orbit', 'non-terrestrial', 'ntn'],
    svgPath: 'M12 2L4 7l8 5 8-5-8-5zm-8 9.5l8 5 8-5M4 16.5l8 5 8-5'
  },
  {
    id: 'internet',
    name: 'Internet WAN Network',
    category: 'Networking',
    tags: ['internet', 'globe', 'wan', 'web', 'network', 'public'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-10 10h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'
  },
  {
    id: 'sensor',
    name: 'Sensor Node',
    category: 'IoT',
    tags: ['sensor', 'iot', 'detector', 'probe', 'hardware', 'node'],
    svgPath: 'M12 21a6 6 0 0 0 6-6c0-4-6-11-6-11s-6 7-6 11a6 6 0 0 0 6 6zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  {
    id: 'temp-sensor',
    name: 'Temperature Sensor',
    category: 'IoT',
    tags: ['temperature', 'thermometer', 'sensor', 'heat', 'climate'],
    svgPath: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z'
  },
  {
    id: 'pressure-sensor',
    name: 'Pressure Gauge',
    category: 'IoT',
    tags: ['pressure', 'barometer', 'gauge', 'meter', 'sensor'],
    svgPath: 'M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 9l3-3'
  },
  {
    id: 'humidity-sensor',
    name: 'Humidity Drop Sensor',
    category: 'IoT',
    tags: ['humidity', 'moisture', 'water', 'drop', 'sensor', 'soil'],
    svgPath: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'
  },
  {
    id: 'actuator',
    name: 'Actuator Valve Motor',
    category: 'IoT',
    tags: ['actuator', 'motor', 'control', 'valve', 'switch', 'automation'],
    svgPath: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-2a7.45 7.45 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1l-.4-2.6h-4l-.4 2.6a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5 2.1 1.6a7.45 7.45 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.4 7.4 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.4 7.4 0 0 0 1.7-1l2.5 1 2-3.5z'
  },
  {
    id: 'camera',
    name: 'Smart Vision Camera',
    category: 'IoT',
    tags: ['camera', 'cctv', 'vision', 'video', 'surveillance', 'ai-vision'],
    svgPath: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
  },
  {
    id: 'iot-device',
    name: 'Microcontroller Board',
    category: 'IoT',
    tags: ['iot', 'microcontroller', 'arduino', 'raspberry-pi', 'board', 'stm32', 'esp32'],
    svgPath: 'M4 4h16v16H4V4zm3 3h3v3H7V7zm7 0h3v3h-3V7zm-7 7h3v3H7v-3zm7 0h3v3h-3v-3z'
  },
  {
    id: 'smart-meter',
    name: 'Smart Energy Meter',
    category: 'IoT',
    tags: ['smart-meter', 'energy', 'grid', 'meter', 'gauge', 'electricity'],
    svgPath: 'M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm-4 9a4 4 0 1 1 8 0m-4-4v4'
  },
  {
    id: 'wearable',
    name: 'Biometric Wearable Watch',
    category: 'IoT',
    tags: ['wearable', 'smartwatch', 'band', 'health', 'sensor', 'ppg', 'ecg'],
    svgPath: 'M9 2h6v4H9V2zm0 16h6v4H9v-4zm3-13a7 7 0 1 0 0 14 7 7 0 0 0 0-14z'
  },
  {
    id: 'rfid-tag',
    name: 'RFID / NFC Sensor Tag',
    category: 'IoT',
    tags: ['rfid', 'nfc', 'tag', 'wireless', 'sensor-tag', 'passive'],
    svgPath: 'M3 3h18v18H3V3zm4 4h10v10H7V7zm3 3h4v4h-4v-4z'
  },
  {
    id: 'drone',
    name: 'Autonomous UAV Drone',
    category: 'IoT',
    tags: ['drone', 'uav', 'aerial', 'autonomous', 'vehicle', 'inspection'],
    svgPath: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-8-5a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm12 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm-12 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm12 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 6l4 4m4 0l4-4M6 18l4-4m4 0l4 4'
  },
  {
    id: 'ai-brain',
    name: 'Artificial Intelligence Engine',
    category: 'AI / ML',
    tags: ['ai', 'brain', 'intelligence', 'neural', 'deep-learning', 'algorithm'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-4 6h8M6 12h12M8 18h8'
  },
  {
    id: 'neural-net',
    name: 'Neural Network Layers',
    category: 'AI / ML',
    tags: ['neural-network', 'mlp', 'nodes', 'layers', 'deep-learning', 'dense'],
    svgPath: 'M5 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14-18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 5h10M7 14h10M7 23h10M7 6l10 8M7 15l10 8M7 14l10-8M7 23l10-8'
  },
  {
    id: 'cnn-layer',
    name: 'Convolutional Layer (CNN)',
    category: 'AI / ML',
    tags: ['cnn', 'convolution', 'feature-map', 'filter', 'vision-model'],
    svgPath: 'M3 3h7v7H3V3zm11 0h7v7h-7V3ZM3 14h7v7H3v-7zm11 0h7v7h-7v-7z'
  },
  {
    id: 'transformer',
    name: 'Transformer Encoder Block',
    category: 'AI / ML',
    tags: ['transformer', 'attention', 'bert', 'gpt', 'llm', 'deep-learning', 'encoder'],
    svgPath: 'M4 4h16v16H4V4zm0 5h16M4 15h16'
  },
  {
    id: 'gnn-layer',
    name: 'GNN Graph Neural Network',
    category: 'AI / ML',
    tags: ['gnn', 'graph-neural-network', 'topology', 'nodes', 'edges', 'pyg'],
    svgPath: 'M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm15 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM10.2 7l-4.4 7.2m10.4-7.2l4.4 7.2M7 18.5h10'
  },
  {
    id: 'attention-head',
    name: 'Multi-Head Attention Layer',
    category: 'AI / ML',
    tags: ['attention', 'transformer', 'head', 'weights', 'matrix', 'query-key-value'],
    svgPath: 'M3 4h18v4H3V4zm0 6h18v4H3v-4zm0 6h18v4H3v-4z'
  },
  {
    id: 'digital-twin',
    name: 'Digital Twin Model',
    category: 'AI / ML',
    tags: ['digital-twin', 'virtual-model', 'simulation', 'replica', 'cyber-physical'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm-10 10l10 5 10-5M2 17l10 5 10-5'
  },
  {
    id: 'federated-learning',
    name: 'Federated Learning Server',
    category: 'AI / ML',
    tags: ['federated-learning', 'distributed', 'privacy', 'aggregation', 'fedavg'],
    svgPath: 'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm16 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM9.5 7L6 13m8.5-6L18 13M7 18h10'
  },
  {
    id: 'dataset',
    name: 'Dataset Document',
    category: 'AI / ML',
    tags: ['dataset', 'data', 'vectors', 'csv', 'embeddings', 'corpus'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8'
  },
  {
    id: 'graph-node',
    name: 'Graph Vertex Node',
    category: 'Graph',
    tags: ['graph', 'node', 'vertex', 'topology', 'network'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z'
  },
  {
    id: 'network-topology',
    name: 'Network Topology Graph',
    category: 'Graph',
    tags: ['mesh', 'topology', 'graph', 'network', 'links', 'nodes'],
    svgPath: 'M12 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm16 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-13 8a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm10 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM9.8 6.2L6 9.8m8.2-3.6l3.8 3.6M6.2 13.8L9 17m8.8-3.2L15 17M9.5 19.5h5'
  },
  {
    id: 'arrow-right',
    name: 'Data Flow Arrow',
    category: 'Diagram Elements',
    tags: ['arrow', 'flow', 'direction', 'link', 'pointer', 'right'],
    svgPath: 'M5 12h14M13 6l6 6-6 6'
  },
  {
    id: 'bi-arrow',
    name: 'Bi-Directional Arrow',
    category: 'Diagram Elements',
    tags: ['arrow', 'bi-directional', 'duplex', 'link', 'two-way'],
    svgPath: 'M7 16l-4-4 4-4M3 12h18m-4-4l4 4-4 4'
  },
  {
    id: 'container-box',
    name: 'Container Box Boundary',
    category: 'Diagram Elements',
    tags: ['container', 'box', 'subsystem', 'boundary', 'layer'],
    svgPath: 'M3 3h18v18H3V3z'
  },
  {
    id: 'rounded-layer',
    name: 'Rounded Layer Block',
    category: 'Diagram Elements',
    tags: ['layer', 'tier', 'rounded', 'block', 'stack'],
    svgPath: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'
  },
  {
    id: 'decision-diamond',
    name: 'Flowchart Decision Diamond',
    category: 'Diagram Elements',
    tags: ['decision', 'diamond', 'flowchart', 'condition', 'if-else'],
    svgPath: 'M12 2L2 12l10 10 10-10L12 2z'
  },
  {
    id: 'robotic-arm-6dof',
    name: '6-Axis Industrial Robotic Arm',
    category: 'Robotics',
    tags: ['robotics', 'arm', 'manipulator', '6dof', 'industrial', 'kinematics', 'automation'],
    svgPath: 'M3 20h18M7 20v-3l4-3 6 2M11 14l-4-6 6-4 4 4-6 6M7 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'
  },
  {
    id: 'robotic-gripper',
    name: 'Dual-Finger Robotic End-Effector',
    category: 'Robotics',
    tags: ['gripper', 'end-effector', 'claw', 'manipulator', 'grasping', 'robotics'],
    svgPath: 'M12 3v5M8 8h8M8 8l-3 6 3 4M16 8l3 6-3 4M5 14h3M16 14h3'
  },
  {
    id: 'humanoid-robot',
    name: 'Humanoid Robot Head Array',
    category: 'Robotics',
    tags: ['humanoid', 'head', 'android', 'social-robot', 'robotics', 'ai'],
    svgPath: 'M5 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V6zm4 13v2m6-2v2M9 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 4h4'
  },
  {
    id: 'mobile-robot-agv',
    name: 'AGV / AMR Autonomous Mobile Robot',
    category: 'Robotics',
    tags: ['agv', 'amr', 'mobile-robot', 'rover', 'logistics', 'warehouse', 'robotics'],
    svgPath: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zm1 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8-14v4m-3-2h6'
  },
  {
    id: 'quadruped-robot',
    name: 'Quadruped Legged Robot',
    category: 'Robotics',
    tags: ['quadruped', 'spot', 'legged', 'robotics', 'bionic', 'locomotion'],
    svgPath: 'M5 10h14l1 3v3m-16-6l-1 3v3m3-6l-2 7m12-7l2 7m-9-7v7m6-7v7M19 8l2-2'
  },
  {
    id: 'biped-robot',
    name: 'Bipedal Humanoid Locomotion Legs',
    category: 'Robotics',
    tags: ['biped', 'walking', 'legs', 'humanoid', 'kinematics', 'robotics'],
    svgPath: 'M12 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2v6m-4-4h8m-4 4l-4 6-1 5m5-11l4 6 1 5'
  },
  {
    id: 'drone-quadcopter',
    name: 'Quadcopter Aerial UAV Drone',
    category: 'Robotics',
    tags: ['drone', 'uav', 'quadcopter', 'aerial', 'inspection', 'robotics'],
    svgPath: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-8-5a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm12 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm-12 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm12 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 6l4 4m4 0l4-4M6 18l4-4m4 0l4 4'
  },
  {
    id: 'servo-motor',
    name: 'Servo Actuator Driver Motor',
    category: 'Robotics',
    tags: ['servo', 'motor', 'actuator', 'driver', 'pwm', 'robotics'],
    svgPath: 'M4 8h16v12H4V8zm4-5h8v5H8V3zm4 0v5m6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  {
    id: 'stepper-motor',
    name: 'Precision Rotary Stepper Motor',
    category: 'Robotics',
    tags: ['stepper', 'motor', 'rotary', 'precision', 'nema', 'robotics'],
    svgPath: 'M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 12v3m-9-12H0m21 0h3m-15 0h6'
  },
  {
    id: 'lidar-3d-sensor',
    name: '3D LiDAR Optical Dome Scanner',
    category: 'Robotics',
    tags: ['lidar', 'pointcloud', '3d-scan', 'optical', 'sensor', 'slam', 'robotics'],
    svgPath: 'M12 3a7 7 0 0 0-7 7v4h14v-4a7 7 0 0 0-7-7zm-9 15h18v3H3v-3zm9-12v4m-3.5-2.5l2.5 2.5m4.5-2.5l-2.5 2.5'
  },
  {
    id: 'haptic-glove',
    name: 'Haptic Teleoperation Glove',
    category: 'Robotics',
    tags: ['haptic', 'teleoperation', 'glove', 'vr', 'tactile', 'vr-robotics'],
    svgPath: 'M18 11V4a1.5 1.5 0 0 0-3 0v6m-3-7a1.5 1.5 0 0 0-3 0v7m-3-5a1.5 1.5 0 0 0-3 0v8a8 8 0 0 0 16 0v-2a1.5 1.5 0 0 0-3 0'
  },
  {
    id: 'joint-encoder',
    name: 'Rotary Joint Shaft Encoder',
    category: 'Robotics',
    tags: ['encoder', 'joint', 'rotary', 'position', 'feedback', 'robotics'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-6v4m0 12v4m-10-10h4m12 0h4'
  },
  {
    id: 'cobot-arm',
    name: 'Collaborative Robot (Cobot) Segment',
    category: 'Robotics',
    tags: ['cobot', 'collaborative', 'robotics', 'safe', 'arm', 'industry40'],
    svgPath: 'M4 19h16M7 19v-4a3 3 0 0 1 3-3h4a3 3 0 0 0 3-3V4M14 4l3 3-3 3'
  },
  {
    id: 'underwater-rov',
    name: 'Autonomous Submersible ROV',
    category: 'Robotics',
    tags: ['rov', 'auv', 'underwater', 'submersible', 'marine', 'robotics'],
    svgPath: 'M3 10a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0v-4zm10 2h6m2-3l-2 3 2 3M8 5V2m0 17v3M6 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  {
    id: 'differential-drive',
    name: 'Differential Mobile Chassis Base',
    category: 'Robotics',
    tags: ['differential', 'chassis', 'mobile-robot', 'wheels', 'robotics'],
    svgPath: 'M6 5h12v14H6V5zm-4 2h2v4H2V7zm0 6h2v4H2v-4zm18-6h2v4h-2V7zm0 6h2v4h-2v-4zm-8-3a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  {
    id: 'welding-robot',
    name: 'Robotic Welding Torch End-Effector',
    category: 'Robotics',
    tags: ['welding', 'torch', 'end-effector', 'manufacturing', 'robotics'],
    svgPath: 'M12 2v6m-4-2h8m-6 2l-2 6h8l-2-6m-2 6v4m-2 0l2 4 2-4m-5 4h6'
  },
  {
    id: 'tactile-finger',
    name: 'Tactile Force Sensor Array Finger',
    category: 'Robotics',
    tags: ['tactile', 'force-sensor', 'finger', 'touch', 'grasping', 'robotics'],
    svgPath: 'M8 3h8v7H8V3zm0 7h8v6H8v-6zm1 6h6v5H9v-5zm-4 0h14M12 6v1m0 6v1'
  },
  {
    id: 'kinematic-chain',
    name: 'Kinematic Linkage Chain',
    category: 'Robotics',
    tags: ['kinematics', 'linkage', 'joints', 'chain', 'mechanism', 'robotics'],
    svgPath: 'M4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5.5 15l5-5m2.5-1l5-5'
  },
  {
    id: 'ble-beacon',
    name: 'Bluetooth Low Energy (BLE) Beacon',
    category: 'IoT',
    tags: ['ble', 'bluetooth', 'beacon', 'location', 'rssi', 'indoor-positioning'],
    svgPath: 'M12 2a10 10 0 0 0-7.07 17.07M12 6a6 6 0 0 0-4.24 10.24M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7.07 7.07A10 10 0 0 0 12 2m4.24 14.24A6 6 0 0 0 12 6'
  },
  {
    id: 'lorawan-node',
    name: 'LoRaWAN Long-Range Transceiver Node',
    category: 'IoT',
    tags: ['lora', 'lorawan', 'lpwan', 'long-range', 'transceiver', 'iot'],
    svgPath: 'M12 2v8m0 0L7 4m5 6l5-6M4 20h16V10H4v10zm4-6h2m4 0h2'
  },
  {
    id: 'zigbee-mesh-node',
    name: 'Zigbee / Thread Mesh Router Node',
    category: 'IoT',
    tags: ['zigbee', 'thread', 'mesh', 'wireless', 'smart-home', 'iot'],
    svgPath: 'M12 2l8 5v10l-8 5-8-5V7l8-5zm0 5l4 2.5v5L12 17l-4-2.5v-5L12 7z'
  },
  {
    id: 'smart-plug',
    name: 'IoT Smart Power Outlet Plug',
    category: 'IoT',
    tags: ['smart-plug', 'outlet', 'power', 'energy', 'home-automation', 'iot'],
    svgPath: 'M7 2h10v5H7V2zm2 10a3 3 0 0 0 6 0V7H9v5zm-2 9h10v-3H7v3zm2-14v2m4-2v2'
  },
  {
    id: 'air-quality-sensor',
    name: 'PM2.5 Air Quality Sensor',
    category: 'IoT',
    tags: ['air-quality', 'pm25', 'pollution', 'gas', 'environment', 'sensor'],
    svgPath: 'M4 6h16M4 12h12M4 18h8M18 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
  },
  {
    id: 'water-flow-sensor',
    name: 'Hydro Liquid Flow Rate Meter',
    category: 'IoT',
    tags: ['water-flow', 'liquid', 'flow-meter', 'hydro', 'sensor', 'iot'],
    svgPath: 'M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8zm0 5v6m-3-3l3 3 3-3'
  },
  {
    id: 'light-ldr-sensor',
    name: 'Ambient Light LDR Sensor',
    category: 'IoT',
    tags: ['light', 'ldr', 'photodiode', 'lux', 'optical', 'sensor'],
    svgPath: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-9 5h3m12 0h3m-4.5-4.5l2-2m-13 13l2-2m0-9l-2-2m13 13l-2-2M12 2v3m0 14v3'
  },
  {
    id: 'imu-accelerometer',
    name: '6-DOF IMU Accelerometer Chip',
    category: 'IoT',
    tags: ['imu', 'accelerometer', 'gyroscope', 'motion', 'orientation', 'sensor'],
    svgPath: 'M3 3h18v18H3V3zm9 3v12m-6-6h12m-9.5-3.5l7 7m0-7l-7 7'
  },
  {
    id: 'ultrasonic-distance',
    name: 'Ultrasonic Distance Transducer (HC-SR04)',
    category: 'IoT',
    tags: ['ultrasonic', 'hc-sr04', 'distance', 'range', 'sonar', 'sensor'],
    svgPath: 'M2 7h20v10H2V7zm4 5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0zm7 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z'
  },
  {
    id: 'gas-smoke-sensor',
    name: 'Gas & Smoke Leakage Detector',
    category: 'IoT',
    tags: ['gas', 'smoke', 'mq2', 'co2', 'leakage', 'safety', 'sensor'],
    svgPath: 'M12 2a9 9 0 0 0-9 9c0 4 3 7 7 8v3h4v-3c4-1 7-4 7-8a9 9 0 0 0-9-9zm-4 8a2 2 0 1 1 4 0m0 0a2 2 0 1 1 4 0'
  },
  {
    id: 'heart-rate-ppg',
    name: 'Optical PPG Pulse & Heart Rate Sensor',
    category: 'IoT',
    tags: ['heart-rate', 'ppg', 'ecg', 'pulse', 'biometric', 'health', 'wearable'],
    svgPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78zM4 12h3l2-4 3 8 2-4h4'
  },
  {
    id: 'gps-gnss-module',
    name: 'GPS / GNSS Location Receiver',
    category: 'IoT',
    tags: ['gps', 'gnss', 'location', 'geo', 'satellite-navigation', 'iot'],
    svgPath: 'M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'
  },
  {
    id: 'smart-lock',
    name: 'IoT Digital Smart Door Lock',
    category: 'IoT',
    tags: ['smart-lock', 'lock', 'access-control', 'security', 'smart-home'],
    svgPath: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5V11zm7 4v3'
  },
  {
    id: 'soil-moisture-sensor',
    name: 'Agricultural Soil Moisture Probe',
    category: 'IoT',
    tags: ['soil-moisture', 'probe', 'agriculture', 'smart-farming', 'sensor'],
    svgPath: 'M8 2h8v4H8V2zm1 4v16l3-3 3 3V6M6 4h12'
  },
  {
    id: 'smart-grid-substation',
    name: 'Smart Power Grid Substation',
    category: 'IoT',
    tags: ['smart-grid', 'substation', 'energy', 'high-voltage', 'grid'],
    svgPath: 'M4 20l8-16 8 16M6 15h12M8 10h8M12 4v16'
  },
  {
    id: 'rfid-reader-scanner',
    name: 'RFID High-Frequency Scanner',
    category: 'IoT',
    tags: ['rfid-reader', 'scanner', 'nfc-reader', 'inventory', 'tag-reader'],
    svgPath: 'M3 5h18v14H3V5zm4 4h10M7 13h6M17 13h.01'
  },
  {
    id: 'ptz-camera-node',
    name: 'Pan-Tilt-Zoom (PTZ) Camera Node',
    category: 'IoT',
    tags: ['ptz', 'camera', 'surveillance', 'pan-tilt', 'cctv', 'vision'],
    svgPath: 'M12 2a4 4 0 0 0-4 4v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-3V6a4 4 0 0 0-4-4zm-2 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0z'
  },
  {
    id: 'smart-bulb-lighting',
    name: 'Smart LED Lighting Node',
    category: 'IoT',
    tags: ['smart-lighting', 'led', 'bulb', 'lighting', 'smart-home'],
    svgPath: 'M9 18h6m-5 3h4M9 10a3.5 3.5 0 1 1 7 0c0 2-1.5 3-2 4.5h-3C10.5 13 9 12 9 10z'
  },
  {
    id: 'v2x-vehicle-node',
    name: 'V2X Connected Vehicle Unit',
    category: 'IoT',
    tags: ['v2x', 'v2i', 'v2v', 'connected-car', 'automotive', 'its'],
    svgPath: 'M5 12l2-5h10l2 5M3 12h18v5H3v-5zm3 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm12 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 2v4m-3-2h6'
  },
  {
    id: 'smart-water-valve',
    name: 'Solenoid Controlled Smart Water Valve',
    category: 'IoT',
    tags: ['valve', 'water-valve', 'solenoid', 'flow-control', 'actuator'],
    svgPath: 'M12 2v6M8 4h8M4 12l8 4V8l-8 4zm16 0l-8 4V8l8 4zM12 16v6'
  },
  {
    id: 'quantum-qpu',
    name: 'Quantum Processing Unit (QPU)',
    category: 'Computing',
    tags: ['quantum', 'qpu', 'qubit', 'superconducting', 'quantum-computing'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6h16M12 4v16'
  },
  {
    id: 'fpga-chip',
    name: 'FPGA Gate Array Chip',
    category: 'Computing',
    tags: ['fpga', 'xilinx', 'verilog', 'vhdl', 'logic-array', 'hardware'],
    svgPath: 'M4 4h16v16H4V4zm3 3h3v3H7V7zm7 0h3v3h-3V7zm-7 7h3v3H7v-3zm7 0h3v3h-3v-3zm-6-2h4v2h-4v-2z'
  },
  {
    id: 'serverless-lambda',
    name: 'Serverless FaaS Function',
    category: 'Computing',
    tags: ['serverless', 'lambda', 'faas', 'cloud-function', 'aws-lambda'],
    svgPath: 'M4 4h16v16H4V4zm3 14l4-10h2l4 10m-8-3h6'
  },
  {
    id: 'kubernetes-cluster',
    name: 'Kubernetes (K8s) Cluster Controller',
    category: 'Computing',
    tags: ['kubernetes', 'k8s', 'orchestration', 'cluster', 'containers'],
    svgPath: 'M12 2l7 4v8l-7 4-7-4V6l7-4zm0 4l3.5 2v4L12 14l-3.5-2V8L12 6z'
  },
  {
    id: 'sdn-controller',
    name: 'Software-Defined Network (SDN) Controller',
    category: 'Networking',
    tags: ['sdn', 'openflow', 'controller', 'network-virtualization'],
    svgPath: 'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm14 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm.5-13l-5 5.5m6-5.5l5 5.5m-11 3l5 5.5m6-5.5l-5 5.5'
  },
  {
    id: 'mesh-network',
    name: 'Multi-Hop Wireless Mesh Network',
    category: 'Networking',
    tags: ['mesh', 'wireless-mesh', 'multi-hop', 'ad-hoc', 'topology'],
    svgPath: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm16 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 11l4-6m4 0l4 6M6 13l2 6m8-6l-2 6M6 11h12'
  },
  {
    id: 'rl-agent',
    name: 'Reinforcement Learning Policy Agent',
    category: 'AI / ML',
    tags: ['rl', 'reinforcement-learning', 'agent', 'policy', 'reward', 'q-learning'],
    svgPath: 'M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-4 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7 5c1 1.5 3 2 5 2s4-.5 5-2'
  },
  {
    id: 'vector-database',
    name: 'Vector Embedding Database',
    category: 'AI / ML',
    tags: ['vector-db', 'rag', 'embeddings', 'pinecone', 'milvus', 'chroma'],
    svgPath: 'M12 2c4.97 0 9 1.34 9 3v14c0 1.66-4.03 3-9 3s-9-1.34-9-3V5c0-1.66 4.03-3 9-3zm-5 6l4 4 6-6'
  },
  {
    id: 'autonomous-car',
    name: 'Autonomous Self-Driving Vehicle (AV)',
    category: 'Environment',
    tags: ['autonomous-vehicle', 'av', 'self-driving', 'car', 'lidar-car'],
    svgPath: 'M5 11l2-5h10l2 5M3 11h18v6H3v-6zm3 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 3v3m-3-2h6'
  },
  {
    id: 'renewable-solar',
    name: 'Solar PV Clean Energy Panel',
    category: 'Environment',
    tags: ['solar', 'pv', 'photovoltaic', 'clean-energy', 'renewable', 'energy'],
    svgPath: 'M3 18l4-10h10l4 10H3zm6 0v-5m6 5v-5M5 13h14'
  },
  {
    id: 'renewable-wind',
    name: 'Wind Turbine Generator',
    category: 'Environment',
    tags: ['wind', 'turbine', 'generator', 'clean-energy', 'renewable'],
    svgPath: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 0v10m-3-10c-3-2-6-1-7 1s.5 4 3 3l4-4zm6 0c3-2 6-1 7 1s-.5 4-3 3l-4-4z'
  },
  {
    id: 'smart-home',
    name: 'Smart Home Node',
    category: 'Environment',
    tags: ['smart-home', 'home', 'house', 'automation', 'iot'],
    svgPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10'
  },
  {
    id: 'smart-factory',
    name: 'Smart Factory Plant',
    category: 'Environment',
    tags: ['factory', 'industrial', 'industry', 'plant', 'manufacturing'],
    svgPath: 'M2 20h20V10l-6 4V10l-6 4V10L4 14v6z'
  },
  {
    id: 'hospital',
    name: 'Healthcare Node',
    category: 'Environment',
    tags: ['hospital', 'healthcare', 'medical', 'clinic'],
    svgPath: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm9 3v8m-4-4h8'
  },
  {
    id: 'security-shield',
    name: 'Cyber Security Shield',
    category: 'Environment',
    tags: ['security', 'privacy', 'shield', 'lock', 'protection', 'cybersecurity'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  },
  {
    id: 'energy-leaf',
    name: 'Eco Green Energy Leaf',
    category: 'Environment',
    tags: ['energy', 'leaf', 'green', 'eco', 'low-power', 'clean-energy'],
    svgPath: 'M11 20A9 9 0 0 1 2 11C2 5.5 6.5 2 12 2a9 9 0 0 1 9 9c0 5.5-4.5 9-10 9zm0 0v-8'
  },
  {
    id: 'smart-parking',
    name: 'Smart Parking System',
    category: 'Diagram Elements',
    tags: ['smart', 'parking'],
    svgPath: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.4 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 3c-.1.3-.1.6-.1.9v4c0 .6.4 1 1 1h2m3 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM9 10h6'
  },
  {
    id: 'traffic-light',
    name: 'Smart Traffic Signal',
    category: 'Diagram Elements',
    tags: ['traffic', 'light'],
    svgPath: 'M7 2h10v20H7V2zm5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
  },
  {
    id: 'smart-road',
    name: 'Connected Road Infrastructure',
    category: 'Diagram Elements',
    tags: ['smart', 'road'],
    svgPath: 'M4 22L8 2h8l4 20M12 4v4m0 4v4m0 4v4'
  },
  {
    id: 'smart-campus',
    name: 'Smart Campus',
    category: 'Diagram Elements',
    tags: ['smart', 'campus'],
    svgPath: 'M3 21h18M5 21V7l7-4 7 4v14M9 10h2m2 0h2M9 14h2m2 0h2M9 18h2m2 0h2'
  },
  {
    id: 'smart-building',
    name: 'Intelligent Building',
    category: 'Diagram Elements',
    tags: ['smart', 'building'],
    svgPath: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M6 18h12M6 14h12M6 10h12M6 6h12M10 22v-4h4v4'
  },
  {
    id: 'waste-management',
    name: 'Smart Waste Management',
    category: 'Diagram Elements',
    tags: ['waste', 'management'],
    svgPath: 'M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-6 5v6m4-6v6'
  },
  {
    id: 'water-treatment',
    name: 'Water Treatment Plant',
    category: 'Diagram Elements',
    tags: ['water', 'treatment'],
    svgPath: 'M12 2v6m0 0a6 6 0 1 0 6 6m-6-6a6 6 0 1 1-6 6m6-12a8 8 0 0 1 8 8c0 4.4-3.6 8-8 8s-8-3.6-8-8a8 8 0 0 1 8-8z'
  },
  {
    id: 'weather-station',
    name: 'Weather Monitoring Station',
    category: 'Diagram Elements',
    tags: ['weather', 'station'],
    svgPath: 'M12 3v12m-5 3h10M6 9a6 6 0 0 1 12 0M12 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
  },
  {
    id: 'flood-monitor',
    name: 'Flood Monitoring System',
    category: 'Diagram Elements',
    tags: ['flood', 'monitor'],
    svgPath: 'M2 12c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1 3-1 4-1M2 17c2 0 3-1 4-1s2 1 4 1 3-1 4-1 2 1 4 1 3-1 4-1M12 3v6m-3-3l3-3 3 3'
  },
  {
    id: 'earthquake-sensor',
    name: 'Seismic Monitoring Sensor',
    category: 'Diagram Elements',
    tags: ['earthquake', 'sensor'],
    svgPath: 'M2 12h4l2-5 3 10 3-10 2 5h6'
  },
  {
    id: 'smart-agriculture',
    name: 'Precision Agriculture',
    category: 'Diagram Elements',
    tags: ['smart', 'agriculture'],
    svgPath: 'M12 22V12m0 0C12 7 7 4 3 4c0 6 4 8 9 8zm0 0c0-5 5-8 9-8 0 6-4 8-9 8z'
  },
  {
    id: 'greenhouse',
    name: 'Smart Greenhouse',
    category: 'Diagram Elements',
    tags: ['greenhouse'],
    svgPath: 'M3 21h18M4 21V10l8-6 8 6v11M4 10h16M12 4v17'
  },
  {
    id: 'ev-charger',
    name: 'Electric Vehicle Charging Station',
    category: 'Diagram Elements',
    tags: ['ev', 'charger'],
    svgPath: 'M5 2h10a2 2 0 0 1 2 2v18H5V4a2 2 0 0 1 2-2zm4 7h4m-2-2v4m4 4H7v5h10v-5zm3-11h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'
  },
  {
    id: 'battery-storage',
    name: 'Grid Battery Storage',
    category: 'Diagram Elements',
    tags: ['battery', 'storage'],
    svgPath: 'M6 7h12v13H6V7zm3-4h6v3H9V3zm0 8h6m-3-3v6'
  },
  {
    id: 'hydrogen-energy',
    name: 'Hydrogen Fuel System',
    category: 'Diagram Elements',
    tags: ['hydrogen', 'energy'],
    svgPath: 'M7 4v16m10-16v16M7 12h10M12 7v10'
  },
  {
    id: 'carbon-monitor',
    name: 'Carbon Emission Monitor',
    category: 'Diagram Elements',
    tags: ['carbon', 'monitor'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-4 13a4 4 0 1 1 8 0'
  },
  {
    id: 'recycling-center',
    name: 'Recycling Facility',
    category: 'Diagram Elements',
    tags: ['recycling', 'center'],
    svgPath: 'M7 19l-3-5h4l3 5zm5-14l-3 5h6l-3-5zm5 14l3-5h-4l-3 5z'
  },
  {
    id: 'water-reservoir',
    name: 'Water Reservoir',
    category: 'Diagram Elements',
    tags: ['water', 'reservoir'],
    svgPath: 'M3 6h18v12H3V6zm0 4c4 0 5 2 9 2s5-2 9-2'
  },
  {
    id: 'smart-streetlight',
    name: 'Connected Street Light',
    category: 'Diagram Elements',
    tags: ['smart', 'streetlight'],
    svgPath: 'M8 22h8M12 22V4m0 0a4 4 0 0 1 4 4v2H8V8a4 4 0 0 1 4-4z'
  },
  {
    id: 'city-command-center',
    name: 'Smart City Command Center',
    category: 'Diagram Elements',
    tags: ['city', 'command', 'center'],
    svgPath: 'M2 20h20M4 20V8l8-4 8 4v12M9 12h6v8H9v-8z'
  },
  {
    id: 'slam-system',
    name: 'SLAM Mapping System',
    category: 'Diagram Elements',
    tags: ['slam', 'system'],
    svgPath: 'M3 3h18v18H3V3zm3 3h4v4H6V6zm8 8h4v4h-4v-4zm-4-4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
  },
  {
    id: 'path-planner',
    name: 'Path Planning Module',
    category: 'Diagram Elements',
    tags: ['path', 'planner'],
    svgPath: 'M4 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16-12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16c4 0 6-6 10-6s2 2 4 2'
  },
  {
    id: 'robot-controller',
    name: 'Robot Controller',
    category: 'Diagram Elements',
    tags: ['robot', 'controller'],
    svgPath: 'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 5h2m-1-1v2m6 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
  },
  {
    id: 'robot-base-station',
    name: 'Robot Base Station',
    category: 'Diagram Elements',
    tags: ['robot', 'base', 'station'],
    svgPath: 'M4 20h16M12 4v16m-6-8a6 6 0 0 1 12 0'
  },
  {
    id: 'robot-fleet',
    name: 'Multi Robot Fleet',
    category: 'Diagram Elements',
    tags: ['robot', 'fleet'],
    svgPath: 'M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-8 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-6-8h12'
  },
  {
    id: 'robot-swarm',
    name: 'Swarm Robotics',
    category: 'Diagram Elements',
    tags: ['robot', 'swarm'],
    svgPath: 'M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  {
    id: 'vision-guided-robot',
    name: 'Vision Guided Robot',
    category: 'Diagram Elements',
    tags: ['vision', 'guided', 'robot'],
    svgPath: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
  },
  {
    id: 'pick-place-robot',
    name: 'Pick and Place Robot',
    category: 'Diagram Elements',
    tags: ['pick', 'place', 'robot'],
    svgPath: 'M12 3v8m-4 0h8m-6 0l-2 5h10l-2-5M8 16v5m8-5v5'
  },
  {
    id: 'robot-simulator',
    name: 'Robot Simulator',
    category: 'Diagram Elements',
    tags: ['robot', 'simulator'],
    svgPath: 'M4 4h16v12H4V4zm4 16h8'
  },
  {
    id: 'digital-robot-twin',
    name: 'Robot Digital Twin',
    category: 'Diagram Elements',
    tags: ['digital', 'robot', 'twin'],
    svgPath: 'M7 4h10v16H7V4zm-4 4h2v8H3V8zm16 0h2v8h-2V8z'
  },
  {
    id: 'exoskeleton',
    name: 'Wearable Exoskeleton',
    category: 'Diagram Elements',
    tags: ['exoskeleton'],
    svgPath: 'M12 2v20M6 6h12M8 12h8M7 18h10'
  },
  {
    id: 'robot-wheel',
    name: 'Omni Wheel',
    category: 'Diagram Elements',
    tags: ['robot', 'wheel'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-3 6h6m-3-3v6'
  },
  {
    id: 'robot-track',
    name: 'Tracked Robot',
    category: 'Diagram Elements',
    tags: ['robot', 'track'],
    svgPath: 'M5 7h14a4 4 0 0 1 0 8H5a4 4 0 0 1 0-8zm2 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'
  },
  {
    id: 'warehouse-robot',
    name: 'Warehouse Fulfillment Robot',
    category: 'Diagram Elements',
    tags: ['warehouse', 'robot'],
    svgPath: 'M4 14h16v6H4v-6zm3-8h10v8H7V6zm-3 8v6m16-6v6'
  },
  {
    id: 'delivery-robot',
    name: 'Autonomous Delivery Robot',
    category: 'Diagram Elements',
    tags: ['delivery', 'robot'],
    svgPath: 'M3 10h18v7H3v-7zm3 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 6h10v4H7V6z'
  },
  {
    id: 'inspection-robot',
    name: 'Infrastructure Inspection Robot',
    category: 'Diagram Elements',
    tags: ['inspection', 'robot'],
    svgPath: 'M4 6h16v10H4V6zm8 10v4m-4 0h8'
  },
  {
    id: 'surgical-robot',
    name: 'Surgical Robot',
    category: 'Diagram Elements',
    tags: ['surgical', 'robot'],
    svgPath: 'M12 2v8m-4-4h8m-5 8l-3 6h8l-3-6'
  },
  {
    id: 'agricultural-robot',
    name: 'Agricultural Robot',
    category: 'Diagram Elements',
    tags: ['agricultural', 'robot'],
    svgPath: 'M5 12h14v6H5v-6zm3 6v4m8-4v4M12 4v8'
  },
  {
    id: 'rescue-robot',
    name: 'Search and Rescue Robot',
    category: 'Diagram Elements',
    tags: ['rescue', 'robot'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm-7 9v6l7 4 7-4v-6'
  },
  {
    id: 'space-rover',
    name: 'Planetary Rover',
    category: 'Diagram Elements',
    tags: ['space', 'rover'],
    svgPath: 'M4 9h16v6H4V9zm2 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 3v6'
  },
  {
    id: 'llm-model',
    name: 'Large Language Model',
    category: 'Diagram Elements',
    tags: ['llm', 'model'],
    svgPath: 'M4 4h16v16H4V4zm3 4h10M7 12h10M7 16h6'
  },
  {
    id: 'rag-pipeline',
    name: 'Retrieval Augmented Generation',
    category: 'Diagram Elements',
    tags: ['rag', 'pipeline'],
    svgPath: 'M3 6h6v12H3V6zm12 0h6v12h-6V6zm-6 6h6m-3-3l3 3-3 3'
  },
  {
    id: 'embedding-model',
    name: 'Embedding Generator',
    category: 'Diagram Elements',
    tags: ['embedding', 'model'],
    svgPath: 'M3 3h18v18H3V3zm4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
  },
  {
    id: 'tokenizer',
    name: 'Text Tokenizer',
    category: 'Diagram Elements',
    tags: ['tokenizer'],
    svgPath: 'M4 6h4v12H4V6zm6 0h4v12h-4V6zm6 0h4v12h-4V6z'
  },
  {
    id: 'knowledge-graph',
    name: 'Knowledge Graph',
    category: 'Diagram Elements',
    tags: ['knowledge', 'graph'],
    svgPath: 'M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm14 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM10.2 7L6 14.5m7.8-7.5l4.2 7.5M7.5 18.5h9'
  },
  {
    id: 'diffusion-model',
    name: 'Diffusion Generator',
    category: 'Diagram Elements',
    tags: ['diffusion', 'model'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-4 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
  },
  {
    id: 'gan-model',
    name: 'Generative Adversarial Network',
    category: 'Diagram Elements',
    tags: ['gan', 'model'],
    svgPath: 'M3 4h8v16H3V4zm10 0h8v16h-8V4z'
  },
  {
    id: 'autoencoder',
    name: 'Autoencoder',
    category: 'Diagram Elements',
    tags: ['autoencoder'],
    svgPath: 'M3 4l6 4v8l-6 4V4zm18 0l-6 4v8l6 4V4zM9 8h6v8H9V8z'
  },
  {
    id: 'lstm-network',
    name: 'LSTM Network',
    category: 'Diagram Elements',
    tags: ['lstm', 'network'],
    svgPath: 'M3 4h18v16H3V4zm5 4v8m4-8v8m4-8v8'
  },
  {
    id: 'rnn-network',
    name: 'Recurrent Neural Network',
    category: 'Diagram Elements',
    tags: ['rnn', 'network'],
    svgPath: 'M12 4a8 8 0 1 0 8 8h-4'
  },
  {
    id: 'feature-extractor',
    name: 'Feature Extraction Engine',
    category: 'Diagram Elements',
    tags: ['feature', 'extractor'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8v8H8V8z'
  },
  {
    id: 'model-training',
    name: 'Training Pipeline',
    category: 'Diagram Elements',
    tags: ['model', 'training'],
    svgPath: 'M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83'
  },
  {
    id: 'model-inference',
    name: 'Inference Engine',
    category: 'Diagram Elements',
    tags: ['model', 'inference'],
    svgPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
  },
  {
    id: 'model-registry',
    name: 'Model Registry',
    category: 'Diagram Elements',
    tags: ['model', 'registry'],
    svgPath: 'M4 4h16v5H4V4zm0 11h16v5H4v-5zm3-8h2m-2 11h2'
  },
  {
    id: 'hyperparameter-search',
    name: 'Hyperparameter Optimization',
    category: 'Diagram Elements',
    tags: ['hyperparameter', 'search'],
    svgPath: 'M3 3h18v18H3V3zm3 13l4-8 4 4 6-10'
  },
  {
    id: 'explainable-ai',
    name: 'Explainable AI',
    category: 'Diagram Elements',
    tags: ['explainable', 'ai'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6v4m0 4h.01'
  },
  {
    id: 'anomaly-detector',
    name: 'Anomaly Detection',
    category: 'Diagram Elements',
    tags: ['anomaly', 'detector'],
    svgPath: 'M12 2L2 22h20L12 2zm0 7v5m0 3h.01'
  },
  {
    id: 'recommendation-engine',
    name: 'Recommendation Engine',
    category: 'Diagram Elements',
    tags: ['recommendation', 'engine'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8v8H8V8z'
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    category: 'Diagram Elements',
    tags: ['sentiment', 'analysis'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8v8H8V8z'
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision Pipeline',
    category: 'Diagram Elements',
    tags: ['computer', 'vision'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8v8H8V8z'
  },
  {
    id: 'firewall',
    name: 'Network Firewall',
    category: 'Diagram Elements',
    tags: ['firewall'],
    svgPath: 'M4 4h16v16H4V4zm0 5h16M4 13h16M9 4v5m6 0v4M11 13v7M6 13v7m12-7v7'
  },
  {
    id: 'vpn-gateway',
    name: 'VPN Gateway',
    category: 'Diagram Elements',
    tags: ['vpn', 'gateway'],
    svgPath: 'M12 2a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 0 1 6 0v3H9z'
  },
  {
    id: 'ids',
    name: 'Intrusion Detection System',
    category: 'Diagram Elements',
    tags: ['ids'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-1-11v4m0 2h2'
  },
  {
    id: 'ips',
    name: 'Intrusion Prevention System',
    category: 'Diagram Elements',
    tags: ['ips'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-8l6 6m0-6l-6 6'
  },
  {
    id: 'dns-server',
    name: 'DNS Resolver',
    category: 'Diagram Elements',
    tags: ['dns', 'server'],
    svgPath: 'M4 4h16v5H4V4zm0 11h16v5H4v-5zm4-3l4-4 4 4'
  },
  {
    id: 'dhcp-server',
    name: 'DHCP Server',
    category: 'Diagram Elements',
    tags: ['dhcp', 'server'],
    svgPath: 'M4 4h16v5H4V4zm0 11h16v5H4v-5zm4-3l4 4 4-4'
  },
  {
    id: 'proxy-server',
    name: 'Proxy Server',
    category: 'Diagram Elements',
    tags: ['proxy', 'server'],
    svgPath: 'M4 5h16v14H4V5zm4 7h8m-4-4v8'
  },
  {
    id: 'nat-device',
    name: 'NAT Translator',
    category: 'Diagram Elements',
    tags: ['nat', 'device'],
    svgPath: 'M4 5h16v14H4V5zm4 7l4-4 4 4m-8 2l4 4 4-4'
  },
  {
    id: 'fiber-link',
    name: 'Optical Fiber Link',
    category: 'Diagram Elements',
    tags: ['fiber', 'link'],
    svgPath: 'M2 12h20M6 8v8m12-8v8'
  },
  {
    id: 'microwave-link',
    name: 'Microwave Backhaul',
    category: 'Diagram Elements',
    tags: ['microwave', 'link'],
    svgPath: 'M12 3a9 9 0 0 1 9 9M12 7a5 5 0 0 1 5 5M12 12v9'
  },
  {
    id: 'network-slicer',
    name: '5G Network Slice',
    category: 'Diagram Elements',
    tags: ['network', 'slicer'],
    svgPath: 'M3 6h18M3 12h18M3 18h18'
  },
  {
    id: 'ran-controller',
    name: 'Open RAN Controller',
    category: 'Diagram Elements',
    tags: ['ran', 'controller'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm-8 9.5l8 5 8-5M4 16.5l8 5 8-5'
  },
  {
    id: 'packet-inspector',
    name: 'Deep Packet Inspection',
    category: 'Diagram Elements',
    tags: ['packet', 'inspector'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z'
  },
  {
    id: 'peering-node',
    name: 'Internet Peering Exchange',
    category: 'Diagram Elements',
    tags: ['peering', 'node'],
    svgPath: 'M7 16l-4-4 4-4M3 12h18m-4-4l4 4-4 4'
  },
  {
    id: 'submarine-cable',
    name: 'Submarine Fiber Cable',
    category: 'Diagram Elements',
    tags: ['submarine', 'cable'],
    svgPath: 'M2 12c3 0 4-3 7-3s4 3 7 3 4-3 6-3'
  },
  {
    id: 'network-monitor',
    name: 'Network Analyzer',
    category: 'Diagram Elements',
    tags: ['network', 'monitor'],
    svgPath: 'M3 3h18v14H3V3zm8 14v4m-4 0h8m-7-9l3 3 4-6 3 3'
  },
  {
    id: 'wireless-access-point',
    name: 'Wireless Access Point',
    category: 'Diagram Elements',
    tags: ['wireless', 'access', 'point'],
    svgPath: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7-2a10 10 0 0 1 14 0M8 13a6 6 0 0 1 8 0'
  },
  {
    id: 'small-cell',
    name: 'Small Cell Station',
    category: 'Diagram Elements',
    tags: ['small', 'cell'],
    svgPath: 'M12 2v20m-5-15a7 7 0 0 1 10 0M9 10a4 4 0 0 1 6 0'
  },
  {
    id: 'network-probe',
    name: 'Traffic Probe',
    category: 'Diagram Elements',
    tags: ['network', 'probe'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6v8m-4-4h8'
  },
  {
    id: 'packet-router',
    name: 'Packet Forwarding Node',
    category: 'Diagram Elements',
    tags: ['packet', 'router'],
    svgPath: 'M5 12h14M13 6l6 6-6 6M5 6h4m-4 12h4'
  },
  {
    id: 'hypervisor',
    name: 'Virtual Machine Hypervisor',
    category: 'Diagram Elements',
    tags: ['hypervisor'],
    svgPath: 'M4 4h16v16H4V4zm0 8h16M12 4v16'
  },
  {
    id: 'vm-instance',
    name: 'Virtual Machine Instance',
    category: 'Diagram Elements',
    tags: ['vm', 'instance'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8v8H8V8z'
  },
  {
    id: 'microservice',
    name: 'Microservice Architecture',
    category: 'Diagram Elements',
    tags: ['microservice'],
    svgPath: 'M12 2l7 4v8l-7 4-7-4V6l7-4z'
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    category: 'Diagram Elements',
    tags: ['api', 'gateway'],
    svgPath: 'M4 5h16v14H4V5zm8 0v14M4 12h16'
  },
  {
    id: 'service-mesh',
    name: 'Service Mesh',
    category: 'Diagram Elements',
    tags: ['service', 'mesh'],
    svgPath: 'M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm14 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
  },
  {
    id: 'message-queue',
    name: 'Message Queue Broker',
    category: 'Diagram Elements',
    tags: ['message', 'queue'],
    svgPath: 'M4 6h16M4 12h16M4 18h16'
  },
  {
    id: 'event-stream',
    name: 'Event Streaming Platform',
    category: 'Diagram Elements',
    tags: ['event', 'stream'],
    svgPath: 'M3 12h18M6 8l4 4-4 4m8-8l4 4-4 4'
  },
  {
    id: 'distributed-cache',
    name: 'Distributed Cache Cluster',
    category: 'Diagram Elements',
    tags: ['distributed', 'cache'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm0 7.5L2 14.5l10 5 10-5-10-5z'
  },
  {
    id: 'object-storage',
    name: 'Object Storage Bucket',
    category: 'Diagram Elements',
    tags: ['object', 'storage'],
    svgPath: 'M21 8a2 2 0 0 1-1.18 1.83l-7 3.18a2 2 0 0 1-1.64 0l-7-3.18A2 2 0 0 1 3 8V6a2 2 0 0 1 1.18-1.83l7-3.18a2 2 0 0 1 1.64 0l7 3.18A2 2 0 0 1 21 6z'
  },
  {
    id: 'block-storage',
    name: 'Block Storage Volume',
    category: 'Diagram Elements',
    tags: ['block', 'storage'],
    svgPath: 'M3 5h18v4H3V5zm0 5h18v4H3v-4zm0 5h18v4H3v-4z'
  },
  {
    id: 'nas-storage',
    name: 'Network Attached Storage',
    category: 'Diagram Elements',
    tags: ['nas', 'storage'],
    svgPath: 'M3 4h18v16H3V4zm4 4h2m-2 4h2m-2 4h2'
  },
  {
    id: 'cdn-node',
    name: 'Content Delivery Network Node',
    category: 'Diagram Elements',
    tags: ['cdn', 'node'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-10 10h20'
  },
  {
    id: 'backup-server',
    name: 'Backup Server',
    category: 'Diagram Elements',
    tags: ['backup', 'server'],
    svgPath: 'M4 4h16v5H4V4zm0 11h16v5H4v-5zm8-6v4m-3-2l3-2 3 2'
  },
  {
    id: 'disaster-recovery',
    name: 'Disaster Recovery Site',
    category: 'Diagram Elements',
    tags: ['disaster', 'recovery'],
    svgPath: 'M12 2v20M2 12h20'
  },
  {
    id: 'log-server',
    name: 'Centralized Logging Server',
    category: 'Diagram Elements',
    tags: ['log', 'server'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 12h8M8 16h8'
  },
  {
    id: 'monitoring-server',
    name: 'Infrastructure Monitoring',
    category: 'Diagram Elements',
    tags: ['monitoring', 'server'],
    svgPath: 'M3 3h18v14H3V3zm8 14v4m-4 0h8m-7-9l3 3 4-6 3 3'
  },
  {
    id: 'etl-pipeline',
    name: 'ETL Data Pipeline',
    category: 'Diagram Elements',
    tags: ['etl', 'pipeline'],
    svgPath: 'M3 12h18M6 8l4 4-4 4m6-8l4 4-4 4'
  },
  {
    id: 'data-lake',
    name: 'Data Lake',
    category: 'Diagram Elements',
    tags: ['data', 'lake'],
    svgPath: 'M12 3c4.97 0 9 1.34 9 3v12c0 1.66-4.03 3-9 3s-9-1.34-9-3V6c0-1.66 4.03-3 9-3z'
  },
  {
    id: 'warehouse',
    name: 'Data Warehouse',
    category: 'Diagram Elements',
    tags: ['warehouse'],
    svgPath: 'M3 21h18M4 21V9l8-5 8 5v12M9 13h6v8H9v-8z'
  },
  {
    id: 'cluster-manager',
    name: 'Cluster Manager',
    category: 'Diagram Elements',
    tags: ['cluster', 'manager'],
    svgPath: 'M4 4h7v7H4V4zm9 0h7v7h-7V4ZM4 13h7v7H4v-7zm9 0h7v7h-7v-7z'
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'AI / ML',
    tags: ['prompt', 'instruction', 'llm'],
    svgPath: 'M4 5h16v14H4V5zm4 4l4 3-4 3m5 0h3'
  },
  {
    id: 'embedding-space',
    name: 'Embedding Space',
    category: 'AI / ML',
    tags: ['embedding', 'vector', 'semantic'],
    svgPath: 'M3 3h18v18H3V3zm4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
  },
  {
    id: 'tokenization',
    name: 'Tokenizer',
    category: 'AI / ML',
    tags: ['tokenizer', 'nlp', 'tokens'],
    svgPath: 'M4 6h4v12H4V6zm6 0h4v12h-4V6zm6 0h4v12h-4V6z'
  },
  {
    id: 'knowledge-graph-ai',
    name: 'Knowledge Graph AI',
    category: 'AI / ML',
    tags: ['knowledge-graph', 'reasoning'],
    svgPath: 'M12 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM5 16a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm14 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM10.2 7L6 14.5m7.8-7.5l4.2 7.5M7.5 18.5h9'
  },
  {
    id: 'fine-tuning',
    name: 'Model Fine Tuning',
    category: 'AI / ML',
    tags: ['fine-tuning', 'training'],
    svgPath: 'M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83'
  },
  {
    id: 'model-distillation',
    name: 'Knowledge Distillation',
    category: 'AI / ML',
    tags: ['distillation', 'teacher-student'],
    svgPath: 'M6 4h12v5L13 14v4h3v2H8v-2h3v-4L6 9V4z'
  },
  {
    id: 'gan-network',
    name: 'GAN Architecture',
    category: 'AI / ML',
    tags: ['gan', 'generator', 'discriminator'],
    svgPath: 'M3 4h8v16H3V4zm10 0h8v16h-8V4z'
  },
  {
    id: 'multimodal-ai',
    name: 'Multimodal AI',
    category: 'AI / ML',
    tags: ['vision-language', 'multimodal'],
    svgPath: 'M4 4h7v7H4V4zm9 0h7v7h-7V4ZM4 13h7v7H4v-7zm9 0h7v7h-7v-7z'
  },
  {
    id: 'speech-recognition',
    name: 'Automatic Speech Recognition',
    category: 'AI / ML',
    tags: ['asr', 'speech'],
    svgPath: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm6 10a6 6 0 0 1-12 0M12 18v4'
  },
  {
    id: 'text-to-speech',
    name: 'Text To Speech',
    category: 'AI / ML',
    tags: ['tts', 'audio'],
    svgPath: 'M11 5L6 9H2v6h4l5 4V5zm4.5 3a5 5 0 0 1 0 8m3-11a9 9 0 0 1 0 14'
  },
  {
    id: 'anomaly-detection',
    name: 'Anomaly Detection',
    category: 'AI / ML',
    tags: ['outlier', 'fraud'],
    svgPath: 'M12 2L2 22h20L12 2zm0 7v5m0 3h.01'
  },
  {
    id: 'time-series-model',
    name: 'Time Series Forecasting',
    category: 'AI / ML',
    tags: ['forecast', 'prediction'],
    svgPath: 'M3 3h18v18H3V3zm3 13l4-8 4 4 6-10'
  },
  {
    id: 'active-learning',
    name: 'Active Learning',
    category: 'AI / ML',
    tags: ['active-learning'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 6l6 4-6 4V8z'
  },
  {
    id: 'self-supervised-learning',
    name: 'Self Supervised Learning',
    category: 'AI / ML',
    tags: ['ssl', 'representation-learning'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 6h2v6h-2V8zm0 8h2v2h-2v-2z'
  },
  {
    id: 'few-shot-learning',
    name: 'Few Shot Learning',
    category: 'AI / ML',
    tags: ['few-shot', 'meta-learning'],
    svgPath: 'M4 4h7v7H4V4zm9 0h7v7h-7V4ZM4 13h7v7H4v-7z'
  },
  {
    id: 'intrusion-detection',
    name: 'IDS',
    category: 'Networking',
    tags: ['ids', 'security'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-1-11v4m0 2h2'
  },
  {
    id: 'intrusion-prevention',
    name: 'IPS',
    category: 'Networking',
    tags: ['ips'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-8l6 6m0-6l-6 6'
  },
  {
    id: 'zero-trust',
    name: 'Zero Trust Security',
    category: 'Networking',
    tags: ['zero-trust'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-4-10h8'
  },
  {
    id: 'encryption',
    name: 'Encryption',
    category: 'Networking',
    tags: ['crypto', 'aes'],
    svgPath: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5V11zm7 4v3'
  },
  {
    id: 'public-key',
    name: 'Public Key Cryptography',
    category: 'Networking',
    tags: ['rsa', 'ecc'],
    svgPath: 'M12 2a5 5 0 0 0-5 5v3H5v10h14V10h-2V7a5 5 0 0 0-5-5zm0 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z'
  },
  {
    id: 'digital-signature',
    name: 'Digital Signature',
    category: 'Networking',
    tags: ['signature'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13l2 2 4-4'
  },
  {
    id: 'blockchain-node',
    name: 'Blockchain Node',
    category: 'Networking',
    tags: ['blockchain', 'ledger'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm-8 9.5l8 5 8-5M4 16.5l8 5 8-5'
  },
  {
    id: 'smart-contract',
    name: 'Smart Contract',
    category: 'Networking',
    tags: ['ethereum'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 12h8M8 16h5'
  },
  {
    id: 'security-camera-ai',
    name: 'AI Surveillance',
    category: 'Networking',
    tags: ['surveillance'],
    svgPath: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence',
    category: 'Networking',
    tags: ['threat'],
    svgPath: 'M12 2L2 22h20L12 2zm0 7v5m0 3h.01'
  },
  {
    id: 'malware-analysis',
    name: 'Malware Analysis',
    category: 'Networking',
    tags: ['malware'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z'
  },
  {
    id: 'honeypot',
    name: 'Honeypot',
    category: 'Networking',
    tags: ['honeypot'],
    svgPath: 'M12 2v20M6 6h12M6 18h12'
  },
  {
    id: 'access-control',
    name: 'Access Control',
    category: 'Networking',
    tags: ['rbac'],
    svgPath: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5V11z'
  },
  {
    id: 'identity-management',
    name: 'Identity Management',
    category: 'Networking',
    tags: ['iam'],
    svgPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'
  },
  {
    id: 'security-operations-center',
    name: 'SOC Center',
    category: 'Networking',
    tags: ['soc'],
    svgPath: 'M3 3h18v14H3V3zm8 14v4m-4 0h8'
  },
  {
    id: 'security-audit',
    name: 'Security Audit',
    category: 'Networking',
    tags: ['audit'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4'
  },
  {
    id: 'penetration-testing',
    name: 'Penetration Testing',
    category: 'Networking',
    tags: ['pentest'],
    svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  },
  {
    id: 'secure-cloud',
    name: 'Secure Cloud',
    category: 'Networking',
    tags: ['cloud-security'],
    svgPath: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10zm-6 3v4m-2-2h4'
  },
  {
    id: 'ecg-monitor',
    name: 'ECG Monitor',
    category: 'Environment',
    tags: ['ecg', 'healthcare'],
    svgPath: 'M3 12h4l2-6 3 12 3-8 2 2h4'
  },
  {
    id: 'eeg-brain',
    name: 'EEG Brain Signal',
    category: 'Environment',
    tags: ['eeg', 'brain'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-6 10c2-3 4 3 6 0s4 3 6 0'
  },
  {
    id: 'medical-imaging',
    name: 'Medical Imaging',
    category: 'Environment',
    tags: ['mri', 'ct'],
    svgPath: 'M3 3h18v18H3V3zm9 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10z'
  },
  {
    id: 'dna-helix',
    name: 'DNA Structure',
    category: 'Environment',
    tags: ['dna', 'genomics'],
    svgPath: 'M2 15c6 6 14-6 20 0M2 9c6-6 14 6 20 0M7 6v12M17 6v12M12 3v18'
  },
  {
    id: 'gene-sequencing',
    name: 'Gene Sequencing',
    category: 'Environment',
    tags: ['genome'],
    svgPath: 'M4 4h16v16H4V4zm4 4h8M8 12h8M8 16h5'
  },
  {
    id: 'protein-folding',
    name: 'Protein Folding',
    category: 'Environment',
    tags: ['biology'],
    svgPath: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-4 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
  },
  {
    id: 'cell-analysis',
    name: 'Cell Analysis',
    category: 'Environment',
    tags: ['cell'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
  },
  {
    id: 'microscope',
    name: 'Microscope',
    category: 'Environment',
    tags: ['laboratory'],
    svgPath: 'M6 18h12M12 18V9m0-5a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3zm-4 8h8'
  },
  {
    id: 'lab-flask',
    name: 'Chemical Flask',
    category: 'Environment',
    tags: ['chemistry'],
    svgPath: 'M9 3h6m-3 0v6l5 9a2 2 0 0 1-1.7 3H7.7A2 2 0 0 1 6 18l5-9V3z'
  },
  {
    id: 'pill-capsule',
    name: 'Drug Molecule',
    category: 'Environment',
    tags: ['medicine'],
    svgPath: 'M10.5 20.5l-7-7a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07zM8.5 8.5l7 7'
  },
  {
    id: 'hospital-network',
    name: 'Connected Hospital',
    category: 'Environment',
    tags: ['healthcare-iot'],
    svgPath: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm9 3v8m-4-4h8'
  },
  {
    id: 'telemedicine',
    name: 'Telemedicine',
    category: 'Environment',
    tags: ['remote-healthcare'],
    svgPath: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 10v6m-3-3h6'
  },
  {
    id: 'medical-robot',
    name: 'Surgical Robot',
    category: 'Robotics',
    tags: ['medical-robot'],
    svgPath: 'M12 2v8m-4-4h8m-5 8l-3 6h8l-3-6'
  },
  {
    id: 'prosthetic-arm',
    name: 'Prosthetic Limb',
    category: 'Robotics',
    tags: ['prosthetics'],
    svgPath: 'M4 19h16M7 19v-4a3 3 0 0 1 3-3h4a3 3 0 0 0 3-3V4'
  },
  {
    id: 'bionic-eye',
    name: 'Bionic Vision',
    category: 'Environment',
    tags: ['vision'],
    svgPath: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
  },
  {
    id: 'brain-computer-interface',
    name: 'BCI Interface',
    category: 'AI / ML',
    tags: ['bci'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-4 6h8M6 12h12M8 18h8'
  },
  {
    id: 'patient-record',
    name: 'Electronic Health Record',
    category: 'Environment',
    tags: ['ehr'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 11v6m-3-3h6'
  },
  {
    id: 'heartbeat-signal',
    name: 'Heart Signal',
    category: 'Environment',
    tags: ['heartbeat'],
    svgPath: 'M3 12h4l2-6 3 12 3-8 2 2h4'
  },
  {
    id: 'blood-drop',
    name: 'Blood Sample',
    category: 'Environment',
    tags: ['blood'],
    svgPath: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'
  },
  {
    id: 'medical-dataset',
    name: 'Medical Dataset',
    category: 'AI / ML',
    tags: ['medical-ai'],
    svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8'
  },
  {
    id: 'smart-city',
    name: 'Smart City',
    category: 'Environment',
    tags: ['city'],
    svgPath: 'M3 21h18M5 21V7l7-4 7 4v14M9 10h2m2 0h2M9 14h2m2 0h2'
  },
  {
    id: 'digital-city-twin',
    name: 'Digital City Twin',
    category: 'AI / ML',
    tags: ['digital-twin'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm-10 10l10 5 10-5M2 17l10 5 10-5'
  },
  {
    id: 'traffic-signal',
    name: 'Smart Traffic Signal',
    category: 'Environment',
    tags: ['traffic'],
    svgPath: 'M7 2h10v20H7V2zm5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z'
  },
  {
    id: 'ev-charging',
    name: 'EV Charging Station',
    category: 'Environment',
    tags: ['electric-vehicle'],
    svgPath: 'M5 2h10a2 2 0 0 1 2 2v18H5V4a2 2 0 0 1 2-2zm4 7h4m-2-2v4m4 4H7v5h10v-5zm3-11h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'
  },
  {
    id: 'electric-grid',
    name: 'Electric Grid',
    category: 'Environment',
    tags: ['grid'],
    svgPath: 'M4 20l8-16 8 16M6 15h12M8 10h8M12 4v16'
  },
  {
    id: 'microgrid',
    name: 'Microgrid',
    category: 'Environment',
    tags: ['energy'],
    svgPath: 'M4 20l8-16 8 16M6 15h12M8 10h8'
  },
  {
    id: 'climate-model',
    name: 'Climate Simulation',
    category: 'Environment',
    tags: ['climate'],
    svgPath: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-10 10h20'
  },
  {
    id: 'factory-robot-line',
    name: 'Industrial Robot Line',
    category: 'Robotics',
    tags: ['industry5'],
    svgPath: 'M2 20h20M5 20v-6l4-3 4 3v6m3 0v-8l4-3 4 3v8'
  },
  {
    id: 'smart-warehouse',
    name: 'Smart Warehouse',
    category: 'Environment',
    tags: ['warehouse'],
    svgPath: 'M3 21h18M4 21V9l8-5 8 5v12M9 13h6v8H9v-8z'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    category: 'Environment',
    tags: ['logistics'],
    svgPath: 'M3 12h18M6 8l4 4-4 4m6-8l4 4-4 4'
  },
  {
    id: 'digital-logistics',
    name: 'Digital Logistics',
    category: 'Environment',
    tags: ['tracking'],
    svgPath: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zm1 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
  },
  {
    id: 'fleet-management',
    name: 'Fleet Management',
    category: 'Environment',
    tags: ['fleet'],
    svgPath: 'M5 12l2-5h10l2 5M3 12h18v5H3v-5zm3 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm12 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'
  },
  {
    id: 'agri-drone',
    name: 'Agricultural Drone',
    category: 'Robotics',
    tags: ['agriculture'],
    svgPath: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7-4a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z'
  },
  {
    id: 'precision-farming',
    name: 'Precision Farming',
    category: 'Environment',
    tags: ['agriculture'],
    svgPath: 'M12 22V12m0 0C12 7 7 4 3 4c0 6 4 8 9 8zm0 0c0-5 5-8 9-8 0 6-4 8-9 8z'
  },
  {
    id: 'green-building',
    name: 'Green Building',
    category: 'Environment',
    tags: ['sustainability'],
    svgPath: 'M3 21h18M5 21V7l7-4 7 4v14M9 10h2m2 0h2M11 20A9 9 0 0 1 2 11'
  },
  {
    id: 'equation',
    name: 'Mathematical Equation',
    category: 'Diagram Elements',
    tags: ['equation'],
    svgPath: 'M4 6h16M4 12h16M4 18h16'
  },
  {
    id: 'matrix',
    name: 'Matrix',
    category: 'Diagram Elements',
    tags: ['matrix'],
    svgPath: 'M4 4h4M4 4v16m0 0h4m12-16h-4m4 0v16m0 0h-4M8 8h2m4 0h2M8 12h2m4 0h2M8 16h2m4 0h2'
  },
  {
    id: 'tensor',
    name: 'Tensor',
    category: 'Diagram Elements',
    tags: ['tensor'],
    svgPath: 'M12 2L2 7l10 5 10-5-10-5zm-10 10l10 5 10-5M2 17l10 5 10-5'
  },
  {
    id: 'coordinate-axis',
    name: 'Coordinate Axis',
    category: 'Graph',
    tags: ['x-axis', 'y-axis'],
    svgPath: 'M3 21h18M3 21V3m0 18l5-5m-5 5l5 5'
  },
  {
    id: 'scatter-plot',
    name: 'Scatter Plot',
    category: 'Graph',
    tags: ['plot'],
    svgPath: 'M3 21h18M3 3v18M7 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
  },
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    category: 'Graph',
    tags: ['chart'],
    svgPath: 'M18 20V10m-6 10V4M6 20v-6M3 20h18'
  },
  {
    id: 'line-chart',
    name: 'Line Graph',
    category: 'Graph',
    tags: ['graph'],
    svgPath: 'M3 3v18h18M7 15l4-6 5 4 4-8'
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    category: 'Graph',
    tags: ['statistics'],
    svgPath: 'M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10h10z'
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    category: 'Graph',
    tags: ['heatmap'],
    svgPath: 'M3 3h18v18H3V3zm4 4h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z'
  },
  {
    id: 'confusion-matrix',
    name: 'Confusion Matrix',
    category: 'Graph',
    tags: ['classification'],
    svgPath: 'M3 3h18v18H3V3zm9 0v18M3 12h18'
  },
  {
    id: 'roc-curve',
    name: 'ROC Curve',
    category: 'Graph',
    tags: ['roc'],
    svgPath: 'M3 3v18h18M3 21c4 0 6-12 18-18'
  },
  {
    id: 'decision-tree',
    name: 'Decision Tree',
    category: 'Graph',
    tags: ['tree'],
    svgPath: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM10.5 6L7.5 15m6-9l3 15'
  },
  {
    id: 'bayesian-network',
    name: 'Bayesian Network',
    category: 'Graph',
    tags: ['bayes'],
    svgPath: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM10.5 6L7.5 15m6-9l3 15M7.5 17h9'
  },
  {
    id: 'finite-state-machine',
    name: 'Finite State Machine',
    category: 'Graph',
    tags: ['fsm'],
    svgPath: 'M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm10 0a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM7 12h10'
  },
  {
    id: 'flowchart-process',
    name: 'Flowchart Process',
    category: 'Diagram Elements',
    tags: ['process'],
    svgPath: 'M3 6h18v12H3V6z'
  },
  {
    id: 'parallel-process',
    name: 'Parallel Process',
    category: 'Diagram Elements',
    tags: ['parallel'],
    svgPath: 'M3 5h18v4H3V5zm0 10h18v4H3v-4z'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    category: 'Diagram Elements',
    tags: ['timeline'],
    svgPath: 'M3 12h18M6 8v8m6-8v8m6-8v8'
  },
  {
    id: 'swimlane',
    name: 'Swimlane Diagram',
    category: 'Diagram Elements',
    tags: ['workflow'],
    svgPath: 'M3 3h18v18H3V3zm0 6h18M3 15h18'
  },
  {
    id: 'hierarchy-tree',
    name: 'Hierarchy Tree',
    category: 'Graph',
    tags: ['tree'],
    svgPath: 'M12 3v6M6 9h12M6 9v6m12-6v6'
  },
  {
    id: 'research-framework',
    name: 'Research Framework',
    category: 'Diagram Elements',
    tags: ['framework'],
    svgPath: 'M3 3h18v18H3V3zm4 4h10v10H7V7z'
  }
];
