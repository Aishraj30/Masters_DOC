import React from 'react';
import { LayoutTemplate, Shapes, Type, UploadCloud, Brush, Palette, Layers } from 'lucide-react';
import { ActiveTab } from '../../types/canvas';

interface SidebarNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'templates' as ActiveTab, label: 'Templates', icon: LayoutTemplate },
    { id: 'elements' as ActiveTab, label: 'Elements', icon: Shapes },
    { id: 'text' as ActiveTab, label: 'Text', icon: Type },
    { id: 'uploads' as ActiveTab, label: 'Uploads', icon: UploadCloud },
    { id: 'draw' as ActiveTab, label: 'Draw', icon: Brush },
    { id: 'backgrounds' as ActiveTab, label: 'Background', icon: Palette },
    { id: 'layers' as ActiveTab, label: 'Layers', icon: Layers },
  ];

  return (
    <aside className="w-[72px] bg-canva-sidebar border-r border-canva-border flex flex-col items-center py-4 z-20 select-none">
      <div className="flex flex-col space-y-3 w-full px-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-canva-purple/20 text-canva-teal font-semibold shadow-inner'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-canva-hover'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-canva-teal' : 'text-gray-400'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
