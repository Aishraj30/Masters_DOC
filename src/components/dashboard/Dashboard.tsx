import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Home as HomeIcon,
  Crown,
  HelpCircle,
  FolderOpen,
  Copy,
  Trash2,
  Clock,
} from 'lucide-react';
import { UserProfile } from '../../utils/auth';
import { CanvasProject } from '../../types/project';
import {
  getUserProjects,
  deleteProject,
  archiveProject,
  duplicateProject,
  saveProject,
  createNewProject,
} from '../../utils/projectsStorage';
import { DashboardSidebar } from './DashboardSidebar';
import { NewProjectModal } from './NewProjectModal';
import { CANVAS_PRESETS } from '../../constants/presets';
import { CanvasPreset } from '../../types/canvas';
import { ThemeToggle } from '../common/ThemeToggle';

interface DashboardProps {
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenProject: (projectId: string) => void;
  onCreateNewProject: (preset?: CanvasPreset, title?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  onLogout,
  onOpenProject,
  onCreateNewProject,
}) => {
  const [sidebarTab, setSidebarTab] = useState<'home' | 'projects' | 'templates' | 'brand' | 'ai' | 'print'>('home');
  const [heroTab, setHeroTab] = useState<'home' | 'templates'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<CanvasProject[]>([]);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Load user projects
  const refreshProjects = () => {
    if (!currentUser) return;
    setProjects(getUserProjects(currentUser.id));
  };

  useEffect(() => {
    refreshProjects();
  }, [currentUser]);

  // Filtered projects by search
  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProjectModalSubmit = (title: string, preset: CanvasPreset) => {
    setIsNewProjectModalOpen(false);
    onCreateNewProject(preset, title);
  };

  const handleDuplicate = (project: CanvasProject, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateProject(project);
    refreshProjects();
  };

  const handleDelete = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    archiveProject(projectId, true);
    refreshProjects();
  };

  const formatRelativeTime = (timestamp: number): string => {
    const diffMs = Date.now() - timestamp;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 60) return `${diffMin || 1}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="flex h-screen w-screen bg-canva-bg text-canva-text overflow-hidden select-none font-sans relative transition-colors">
      {/* Left Navigation Sidebar */}
      <DashboardSidebar
        activeTab={sidebarTab}
        setActiveTab={setSidebarTab}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Top Header Banner */}
        <section className="relative w-full bg-canva-sidebar border-b border-canva-border pt-8 pb-10 px-8 flex flex-col items-center transition-colors">
          {/* Top-Right Theme Toggle */}
          <div className="absolute top-4 right-8 flex items-center space-x-3">
            <ThemeToggle />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-canva-text tracking-tight text-center mb-5">
            What will you design today?
          </h1>

          {/* Home / Templates Sub-Toggle Pill */}
          <div className="flex bg-canva-panel p-1 rounded-full border border-canva-border mb-6">
            <button
              onClick={() => setHeroTab('home')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                heroTab === 'home'
                  ? 'bg-canva-purple text-white shadow-md'
                  : 'text-gray-400 hover:text-canva-text'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5 text-canva-teal" />
              <span>Home</span>
            </button>
          </div>

          {/* Large Centered Search Bar */}
          <div className="relative w-full max-w-2xl mb-2">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything"
              className="w-full bg-canva-panel text-canva-text placeholder-gray-400 border border-canva-border rounded-full pl-12 pr-6 py-3 text-sm font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-canva-teal"
            />
          </div>
        </section>

        {/* Main Workspace Body */}
        <main className="p-8 max-w-7xl w-full mx-auto space-y-10">
          {/* "See what's new" Inspiration Banners */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-canva-text flex items-center space-x-2">
              <span>See what's new</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-purple-800 to-indigo-900 p-4 rounded-2xl border border-purple-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white" style={{ color: '#ffffff' }}>Make a splash with Peppa Pig designs &gt;</h3>
                <span className="text-[10px] text-purple-200 font-semibold" style={{ color: '#e9d5ff' }}>Featured Collection</span>
              </div>

              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 p-4 rounded-2xl border border-emerald-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white" style={{ color: '#ffffff' }}>For the Women Who Build & Create &gt;</h3>
                <span className="text-[10px] text-emerald-200 font-semibold" style={{ color: '#a7f3d0' }}>Inspiration Series</span>
              </div>

              <div className="bg-gradient-to-br from-blue-800 to-cyan-900 p-4 rounded-2xl border border-blue-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white" style={{ color: '#ffffff' }}>Explore our vibrant summer travel...</h3>
                <span className="text-[10px] text-cyan-200 font-semibold" style={{ color: '#bae6fd' }}>Templates Pack</span>
              </div>

              <div className="bg-gradient-to-br from-orange-800 to-red-900 p-4 rounded-2xl border border-orange-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white" style={{ color: '#ffffff' }}>Design hot deals for your summer sale. &gt;</h3>
                <span className="text-[10px] text-orange-200 font-semibold" style={{ color: '#fed7aa' }}>Marketing Graphics</span>
              </div>

              <div className="bg-gradient-to-br from-amber-800 to-yellow-900 p-4 rounded-2xl border border-amber-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white" style={{ color: '#ffffff' }}>Designs that make personal finance fun &gt;</h3>
                <span className="text-[10px] text-amber-200 font-semibold" style={{ color: '#fef08a' }}>Infographics</span>
              </div>
            </div>
          </section>

          {/* "Recent Projects" Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-canva-text flex items-center space-x-2">
                <Clock className="w-5 h-5 text-canva-teal" />
                <span>Recent projects</span>
              </h2>

              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="text-xs font-bold text-canva-teal hover:underline flex items-center space-x-1"
              >
                <span>+ Create new project</span>
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-8 bg-canva-panel border border-canva-border rounded-2xl text-center space-y-3">
                <FolderOpen className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="font-bold text-sm text-canva-text">No projects yet</h3>
                <p className="text-xs text-gray-500">
                  Select any preset above to create your first design project.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => onOpenProject(project.id)}
                    className="group bg-canva-panel border border-canva-border hover:border-canva-teal rounded-2xl overflow-hidden shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                  >
                    {/* Visual Card Preview */}
                    <div className="h-36 bg-canva-sidebar p-4 flex flex-col items-center justify-center relative border-b border-canva-border group-hover:bg-canva-hover transition-colors">
                      <div className="w-16 h-20 bg-canva-panel rounded-md shadow-md flex items-center justify-center p-2 text-canva-text border border-canva-border">
                        <span className="text-[10px] font-bold text-center truncate">
                          {project.title}
                        </span>
                      </div>
                      <span className="absolute bottom-2 left-2 text-[10px] text-canva-text bg-canva-panel/80 px-2 py-0.5 rounded font-mono border border-canva-border">
                        {project.preset.name}
                      </span>
                    </div>

                    {/* Card Footer Info & Actions */}
                    <div className="p-3.5 flex items-center justify-between bg-canva-panel">
                      <div className="truncate">
                        <h4 className="font-bold text-xs text-canva-text truncate group-hover:text-canva-teal transition-colors">
                          {project.title}
                        </h4>
                        <span className="text-[10px] text-gray-400">
                          Edited {formatRelativeTime(project.updatedAt)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => handleDuplicate(project, e)}
                          title="Duplicate"
                          className="p-1 text-gray-400 hover:text-canva-text hover:bg-canva-hover rounded"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDelete(project.id, e)}
                          title="Delete"
                          className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-950/40 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Floating Help Assistant Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="w-11 h-11 rounded-full bg-canva-purple hover:bg-canva-purple-hover text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
            title="Help & Assistant"
          >
            <HelpCircle className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProjectModalSubmit}
      />
    </div>
  );
};
