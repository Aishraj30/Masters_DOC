import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Home as HomeIcon,
  LayoutTemplate,
  Monitor,
  Instagram,
  Video,
  FileText,
  FileSpreadsheet,
  Globe,
  Sparkles,
  Maximize,
  UploadCloud,
  MoreHorizontal,
  Crown,
  HelpCircle,
  FolderOpen,
  Edit3,
  Copy,
  Trash2,
  Clock,
  ArrowRight,
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
    if (!currentUser) return;
    const newProj = createNewProject(currentUser.id, title, preset);
    refreshProjects();
    onOpenProject(newProj.id);
  };

  const handleQuickPresetClick = (presetId: string) => {
    const preset = CANVAS_PRESETS.find((p) => p.id === presetId) || CANVAS_PRESETS[0];
    if (!currentUser) return;
    const newProj = createNewProject(currentUser.id, `New ${preset.name}`, preset);
    refreshProjects();
    onOpenProject(newProj.id);
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

  // Quick Action Preset Buttons matching Image 2
  const quickActions = [
    // { id: 'templates', label: 'Templates', icon: LayoutTemplate, color: 'bg-purple-600' },
    { id: 'presentation', label: 'Presentation', icon: Monitor, color: 'bg-orange-500' },
    { id: 'instagram-post', label: 'Social media', icon: Instagram, color: 'bg-pink-600' },
    { id: 'presentation', label: 'Video', icon: Video, color: 'bg-[#8326ee]' },
    { id: 'a4', label: 'Printables', icon: FileText, color: 'bg-blue-600' },
    { id: 'a4', label: 'Doc', icon: FileText, color: 'bg-teal-500' },
    { id: 'presentation', label: 'Whiteboard', icon: Monitor, color: 'bg-emerald-500' },
    { id: 'a4', label: 'Sheet', icon: FileSpreadsheet, color: 'bg-blue-500' },
    { id: 'presentation', label: 'Website', icon: Globe, color: 'bg-indigo-600' },
    { id: 'presentation', label: 'Magic Layers', icon: Sparkles, color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
    { id: 'custom', label: 'Custom size', icon: Maximize, color: 'bg-[#2a3447]' },
    { id: 'custom', label: 'Upload', icon: UploadCloud, color: 'bg-[#2a3447]' },
    { id: 'custom', label: 'More', icon: MoreHorizontal, color: 'bg-[#2a3447]' },
  ];

  return (
    <div className="flex h-screen w-screen bg-[#0f1420] text-gray-100 overflow-hidden select-none font-sans relative">
      {/* Slim Left Navigation Rail matching Image 2 */}
      <DashboardSidebar
        activeTab={sidebarTab}
        setActiveTab={setSidebarTab}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Top Header Banner matching Image 2 */}
        <section className="relative w-full bg-gradient-to-r from-[#172238] via-[#24193d] to-[#142838] pt-8 pb-10 px-8 flex flex-col items-center border-b border-[#232d42]">
          {/* Top-Right Start Free Trial Badge matching Image 2 */}
          <div className="absolute top-4 right-8">
            <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-white text-purple-900 rounded-full font-bold text-xs shadow-lg hover:bg-gray-100 transition-all">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Start your free trial</span>
            </button>
          </div>

          {/* Main Title matching Image 2 */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-200 tracking-tight text-center mb-5">
            What will you design today?
          </h1>

          {/* Home / Templates Sub-Toggle Pill matching Image 2 */}
          <div className="flex bg-[#121826] p-1 rounded-full border border-[#2a344b] mb-6">
            <button
              onClick={() => setHeroTab('home')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                heroTab === 'home'
                  ? 'bg-[#252f44] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Home</span>
            </button>

            {/* <button
              onClick={() => setHeroTab('templates')}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                heroTab === 'templates'
                  ? 'bg-[#252f44] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-purple-400" />
              <span>Templates</span>
            </button> */}
          </div>

          {/* Large Centered Search Bar matching Image 2 */}
          <div className="relative w-full max-w-2xl mb-8">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything"
              className="w-full bg-white text-gray-900 placeholder-gray-500 rounded-full pl-12 pr-6 py-3 text-sm font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Quick Preset Circle Buttons Row matching Image 2 */}
          <div className="flex items-center space-x-5 overflow-x-auto w-full max-w-5xl justify-start sm:justify-center py-2 px-2 scrollbar-none">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickPresetClick(action.id)}
                  className="flex flex-col items-center group flex-shrink-0"
                >
                  <div className={`w-12 h-12 rounded-full ${action.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-300 mt-2 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Workspace Body */}
        <main className="p-8 max-w-7xl w-full mx-auto space-y-10">
          {/* "See what's new" Inspiration Banners matching Image 2 */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>See what's new</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-4 rounded-2xl border border-purple-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white">Make a splash with Peppa Pig designs &gt;</h3>
                <span className="text-[10px] text-purple-200 font-semibold">Featured Collection</span>
              </div>

              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-4 rounded-2xl border border-emerald-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white">For the Women Who Build & Create &gt;</h3>
                <span className="text-[10px] text-emerald-200 font-semibold">Inspiration Series</span>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-cyan-900 p-4 rounded-2xl border border-blue-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white">Explore our vibrant summer travel...</h3>
                <span className="text-[10px] text-cyan-200 font-semibold">Templates Pack</span>
              </div>

              <div className="bg-gradient-to-br from-orange-900 to-red-900 p-4 rounded-2xl border border-orange-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white">Design hot deals for your summer sale. &gt;</h3>
                <span className="text-[10px] text-orange-200 font-semibold">Marketing Graphics</span>
              </div>

              <div className="bg-gradient-to-br from-amber-900 to-yellow-900 p-4 rounded-2xl border border-amber-500/30 flex flex-col justify-between h-36 shadow-lg hover:scale-[1.02] transition-transform cursor-pointer">
                <h3 className="font-extrabold text-xs text-white">Designs that make personal finance fun &gt;</h3>
                <span className="text-[10px] text-amber-200 font-semibold">Infographics</span>
              </div>
            </div>
          </section>

          {/* "Recent Projects" Section (Essential!) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Recent projects</span>
              </h2>

              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>+ Create new project</span>
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-8 bg-[#151c2c] border border-[#242f45] rounded-2xl text-center space-y-3">
                <FolderOpen className="w-10 h-10 text-gray-500 mx-auto" />
                <h3 className="font-bold text-sm text-gray-300">No projects yet</h3>
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
                    className="group bg-[#151c2c] border border-[#242f45] hover:border-cyan-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    {/* Visual Card Preview */}
                    <div className="h-36 bg-[#1a2336] p-4 flex flex-col items-center justify-center relative border-b border-[#242f45] group-hover:bg-[#1e2a40] transition-colors">
                      <div className="w-16 h-20 bg-white/90 rounded-md shadow-md flex items-center justify-center p-2 text-gray-800">
                        <span className="text-[10px] font-bold text-center truncate">
                          {project.title}
                        </span>
                      </div>
                      <span className="absolute bottom-2 left-2 text-[10px] text-gray-400 bg-black/40 px-2 py-0.5 rounded font-mono">
                        {project.preset.name}
                      </span>
                    </div>

                    {/* Card Footer Info & Actions */}
                    <div className="p-3.5 flex items-center justify-between bg-[#151c2c]">
                      <div className="truncate">
                        <h4 className="font-bold text-xs text-white truncate group-hover:text-cyan-400 transition-colors">
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
                          className="p-1 text-gray-400 hover:text-white hover:bg-[#253147] rounded"
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

        {/* Floating Help Assistant Button matching Image 2 */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="w-11 h-11 rounded-full bg-[#8326ee] hover:bg-purple-700 text-white flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
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
