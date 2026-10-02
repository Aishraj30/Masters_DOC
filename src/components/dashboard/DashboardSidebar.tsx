import React from 'react';
import {
  Plus,
  Home,
  Folder,
  Bell,
  LogOut,
} from 'lucide-react';
import { UserProfile } from '../../utils/auth';

interface DashboardSidebarProps {
  activeTab: 'home' | 'projects' | 'templates' | 'brand' | 'ai' | 'print';
  setActiveTab: (tab: 'home' | 'projects' | 'templates' | 'brand' | 'ai' | 'print') => void;
  onOpenNewProjectModal: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewProjectModal,
  currentUser,
  onLogout,
}) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'projects' as const, label: 'Projects', icon: Folder },
  ];

  return (
    <aside className="w-[76px] bg-[#0e131f] border-r border-[#1e2638] flex flex-col items-center py-4 justify-between h-screen select-none font-sans text-gray-300 z-20">
      <div className="flex flex-col items-center space-y-4 w-full">
        {/* Top Left Menu Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6320ee] to-[#00c4cc] flex items-center justify-center shadow-md mb-1">
          <span className="text-white font-extrabold text-sm">D</span>
        </div>

        {/* Big "+ Create" Button matching Image 2 */}
        <button
          onClick={onOpenNewProjectModal}
          className="flex flex-col items-center justify-center group"
          title="Create New Project"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-[10px] font-bold text-gray-300 mt-1">Create</span>
        </button>

        <div className="w-10 h-px bg-[#1e2638]" />

        {/* Navigation Items matching Image 2 */}
        <nav className="flex flex-col space-y-3 w-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#1e283d] text-cyan-400 font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-[#161d2e]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Notifications matching Image 2 */}
      <div className="flex flex-col items-center space-y-3">
        <button
          className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-[#161d2e]"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        <div className="relative group">
          {currentUser?.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-cyan-400 cursor-pointer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
          )}

          <button
            onClick={onLogout}
            title="Log Out"
            className="absolute bottom-0 right-0 translate-x-2 translate-y-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full text-[9px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <LogOut className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};
