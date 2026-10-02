export interface BuiltinVectorIcon {
  id: string;
  name: string;
  category: string;
  tags: string[];
  svgPath: string;
}

export const BUILTIN_ICONS: BuiltinVectorIcon[] = [
  // Arrows
  { id: 'arrow-right', name: 'Arrow Right', category: 'Arrows', tags: ['arrow', 'right', 'next', 'forward'], svgPath: 'M5 12h14M12 5l7 7-7 7' },
  { id: 'arrow-left', name: 'Arrow Left', category: 'Arrows', tags: ['arrow', 'left', 'back', 'previous'], svgPath: 'M19 12H5M12 19l-7-7 7-7' },
  { id: 'arrow-up', name: 'Arrow Up', category: 'Arrows', tags: ['arrow', 'up', 'top'], svgPath: 'M12 19V5M5 12l7-7 7 7' },
  { id: 'arrow-down', name: 'Arrow Down', category: 'Arrows', tags: ['arrow', 'down', 'bottom'], svgPath: 'M12 5v14M19 12l-7 7-7-7' },
  { id: 'chevron-right', name: 'Chevron Right', category: 'Arrows', tags: ['arrow', 'chevron', 'right'], svgPath: 'M9 18l6-6-6-6' },
  { id: 'chevron-left', name: 'Chevron Left', category: 'Arrows', tags: ['arrow', 'chevron', 'left'], svgPath: 'M15 18l-6-6 6-6' },
  { id: 'chevron-down', name: 'Chevron Down', category: 'Arrows', tags: ['arrow', 'chevron', 'down'], svgPath: 'M6 9l6 6 6-6' },
  { id: 'chevron-up', name: 'Chevron Up', category: 'Arrows', tags: ['arrow', 'chevron', 'up'], svgPath: 'M18 15l-6-6-6 6' },

  // Interface & Essential
  { id: 'home', name: 'Home', category: 'Interface', tags: ['home', 'house', 'main'], svgPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'user', name: 'User', category: 'Users', tags: ['user', 'profile', 'account', 'person', 'avatar'], svgPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id: 'search', name: 'Search', category: 'Interface', tags: ['search', 'find', 'magnifier', 'lookup'], svgPath: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35' },
  { id: 'heart', name: 'Heart', category: 'Interface', tags: ['heart', 'like', 'love', 'favorite'], svgPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'star', name: 'Star', category: 'Interface', tags: ['star', 'favorite', 'rating', 'bookmark'], svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { id: 'bell', name: 'Bell', category: 'Communication', tags: ['bell', 'notification', 'alert'], svgPath: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0' },
  { id: 'mail', name: 'Mail', category: 'Communication', tags: ['mail', 'email', 'message', 'envelope'], svgPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6' },
  { id: 'camera', name: 'Camera', category: 'Media', tags: ['camera', 'photo', 'picture'], svgPath: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id: 'phone', name: 'Phone', category: 'Communication', tags: ['phone', 'call', 'contact'], svgPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' },
  { id: 'shopping-cart', name: 'Cart', category: 'Objects', tags: ['cart', 'shopping', 'store', 'buy'], svgPath: 'M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M20 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' },
  { id: 'folder', name: 'Folder', category: 'Objects', tags: ['folder', 'directory', 'files'], svgPath: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' },
  { id: 'file-text', name: 'File', category: 'Objects', tags: ['file', 'document', 'page', 'text'], svgPath: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8' },
  { id: 'download', name: 'Download', category: 'Interface', tags: ['download', 'save', 'get'], svgPath: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' },
  { id: 'share-2', name: 'Share', category: 'Interface', tags: ['share', 'social', 'send'], svgPath: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98' },
  { id: 'lock', name: 'Lock', category: 'Interface', tags: ['lock', 'secure', 'privacy', 'password'], svgPath: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4' },
  { id: 'shield', name: 'Shield', category: 'Interface', tags: ['shield', 'security', 'protect'], svgPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { id: 'calendar', name: 'Calendar', category: 'Objects', tags: ['calendar', 'date', 'event', 'schedule'], svgPath: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18' },
  { id: 'clock', name: 'Clock', category: 'Objects', tags: ['clock', 'time', 'timer'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2' },
  { id: 'trash-2', name: 'Trash', category: 'Interface', tags: ['trash', 'delete', 'remove'], svgPath: 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6' },
  { id: 'edit-3', name: 'Edit', category: 'Interface', tags: ['edit', 'write', 'pencil'], svgPath: 'M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
  { id: 'eye', name: 'Eye', category: 'Interface', tags: ['eye', 'view', 'show', 'preview'], svgPath: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  { id: 'check', name: 'Check', category: 'Interface', tags: ['check', 'done', 'tick', 'accept', 'ok'], svgPath: 'M20 6L9 17l-5-5' },
  { id: 'x', name: 'Close', category: 'Interface', tags: ['x', 'close', 'cancel', 'cross'], svgPath: 'M18 6L6 18 M6 6l12 12' },
  { id: 'plus', name: 'Plus', category: 'Interface', tags: ['plus', 'add', 'create', 'new'], svgPath: 'M12 5v14 M5 12h14' },
  { id: 'cloud', name: 'Cloud', category: 'Objects', tags: ['cloud', 'weather', 'storage'], svgPath: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' },
  { id: 'zap', name: 'Zap', category: 'Objects', tags: ['zap', 'lightning', 'energy', 'power', 'fast'], svgPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { id: 'globe', name: 'Globe', category: 'Objects', tags: ['globe', 'world', 'internet', 'web'], svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' },
  { id: 'wifi', name: 'Wifi', category: 'Objects', tags: ['wifi', 'network', 'connection'], svgPath: 'M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01' },
  { id: 'code', name: 'Code', category: 'Objects', tags: ['code', 'developer', 'script'], svgPath: 'M16 18l6-6-6-6 M8 6l-6 6 6 6' },
  { id: 'terminal', name: 'Terminal', category: 'Objects', tags: ['terminal', 'cmd', 'console'], svgPath: 'M4 17l6-6-6-6 M12 19h8' },
  { id: 'cpu', name: 'Cpu', category: 'Objects', tags: ['cpu', 'processor', 'hardware', 'chip'], svgPath: 'M4 4h16v16H4z M9 9h6v6H9z M15 2v2 M9 2v2 M15 20v2 M9 20v2 M20 15h2 M20 9h2 M2 15h2 M2 9h2' },
];
