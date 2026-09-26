import React, { useState } from 'react';
import {
  FileText,
  MoreVertical,
  Edit3,
  Copy,
  Trash2,
  ArrowDown,
  RotateCcw,
  CheckSquare,
  Square,
  FolderOpen,
} from 'lucide-react';
import { CanvasProject } from '../../types/project';

interface ProjectTableProps {
  projects: CanvasProject[];
  onOpenProject: (projectId: string) => void;
  onDuplicateProject: (project: CanvasProject) => void;
  onDeleteProject: (projectId: string) => void;
  onRenameProject: (projectId: string, newTitle: string) => void;
  isArchivedView?: boolean;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onOpenProject,
  onDuplicateProject,
  onDeleteProject,
  onRenameProject,
  isArchivedView = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === projects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(projects.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const startRename = (project: CanvasProject, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(project.id);
    setEditingTitle(project.title);
    setActiveMenuId(null);
  };

  const submitRename = (projectId: string) => {
    if (editingTitle.trim()) {
      onRenameProject(projectId, editingTitle.trim());
    }
    setEditingId(null);
  };

  const formatRelativeTime = (timestamp: number): string => {
    const diffMs = Date.now() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffSec < 60) return 'Just now by You';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago by You`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago by You`;
    if (diffDays < 30) return `${diffDays} days ago by You`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago by You`;
    return 'Over a year ago by You';
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#1b212e] rounded-xl border border-[#2a3040] text-center space-y-3 my-4">
        <div className="w-12 h-12 rounded-2xl bg-[#232a3b] flex items-center justify-center text-gray-500">
          <FolderOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-gray-300">No projects found</h3>
        <p className="text-xs text-gray-500 max-w-sm">
          {isArchivedView
            ? 'Your trash/archive is currently empty.'
            : 'Click the "New project" button on the left to start your first design or document.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#1b212e] border border-[#2a3040] rounded-xl overflow-hidden shadow-xl select-none font-sans text-xs">
      {/* Batch Select Toolbar (Visible when rows are selected) */}
      {selectedIds.length > 0 && (
        <div className="bg-[#202738] px-4 py-2 border-b border-[#2a3040] flex items-center justify-between text-emerald-400 font-semibold">
          <span>{selectedIds.length} project(s) selected</span>
          <button
            onClick={() => {
              selectedIds.forEach((id) => onDeleteProject(id));
              setSelectedIds([]);
            }}
            className="flex items-center space-x-1 px-3 py-1 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg text-xs transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* Main Table Structure */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Table Header matching Overleaf screenshot */}
          <thead>
            <tr className="border-b border-[#2a3040] text-gray-400 font-bold uppercase tracking-wider text-[11px] bg-[#171c28]/60">
              <th className="py-3 px-4 w-10">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="text-gray-400 hover:text-white"
                >
                  {selectedIds.length === projects.length && projects.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 font-semibold text-gray-300">Title</th>
              <th className="py-3 px-4 w-32 font-semibold text-gray-300">Owner</th>
              <th className="py-3 px-4 w-56 font-semibold text-gray-300">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                  <span>Last modified</span>
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </th>
              <th className="py-3 px-4 w-16 text-right"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#262d3d]">
            {projects.map((project) => {
              const isSelected = selectedIds.includes(project.id);
              const isEditing = editingId === project.id;

              return (
                <tr
                  key={project.id}
                  onClick={() => onOpenProject(project.id)}
                  className={`group cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#232b3d]'
                      : 'hover:bg-[#212736]'
                  }`}
                >
                  {/* Select Checkbox */}
                  <td className="py-3 px-4" onClick={(e) => toggleSelectRow(project.id, e)}>
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-500 group-hover:text-gray-300" />
                    )}
                  </td>

                  {/* Project Title */}
                  <td className="py-3 px-4 font-medium text-gray-200">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={() => submitRename(project.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') submitRename(project.id);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                        className="bg-[#121620] border border-emerald-500 rounded px-2 py-1 text-xs text-white focus:outline-none w-64"
                      />
                    ) : (
                      <div className="flex items-center space-x-2.5">
                        <FileText className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                        <span className="text-gray-200 group-hover:text-white font-semibold hover:underline">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Owner */}
                  <td className="py-3 px-4 text-gray-400 font-medium">You</td>

                  {/* Last Modified */}
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {formatRelativeTime(project.updatedAt)}
                  </td>

                  {/* Action Menu Buttons */}
                  <td className="py-3 px-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProject(project.id);
                        }}
                        title="Edit in Studio"
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-[11px] transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={(e) => startRename(project, e)}
                        title="Rename"
                        className="p-1 text-gray-400 hover:text-white hover:bg-[#2d364a] rounded"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateProject(project);
                        }}
                        title="Make a Copy"
                        className="p-1 text-gray-400 hover:text-white hover:bg-[#2d364a] rounded"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
                        }}
                        title="Delete Project"
                        className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-950/40 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
