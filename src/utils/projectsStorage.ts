import { CanvasProject } from '../types/project';
import { CANVAS_PRESETS } from '../constants/presets';

const PROJECTS_STORAGE_KEY = 'docmaster_user_projects_v1';

// Initial starter sample projects for new users
const getInitialSampleProjects = (userId: string): CanvasProject[] => [
  {
    id: `proj-sample-1`,
    userId,
    title: 'resume (Copy)',
    preset: CANVAS_PRESETS.find(p => p.id === 'a4') || CANVAS_PRESETS[0],
    pages: [
      {
        id: 'page-1',
        title: 'Page 1',
        width: 800,
        height: 1000,
        aspectRatio: '4:5',
        backgroundColor: '#ffffff',
      },
    ],
    canvasData: {},
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: `proj-sample-2`,
    userId,
    title: 'Fog resume',
    preset: CANVAS_PRESETS.find(p => p.id === 'a4') || CANVAS_PRESETS[0],
    pages: [
      {
        id: 'page-1',
        title: 'Page 1',
        width: 800,
        height: 1000,
        aspectRatio: '4:5',
        backgroundColor: '#ffffff',
      },
    ],
    canvasData: {},
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: `proj-sample-3`,
    userId,
    title: 'updates resume',
    preset: CANVAS_PRESETS.find(p => p.id === 'a4') || CANVAS_PRESETS[0],
    pages: [
      {
        id: 'page-1',
        title: 'Page 1',
        width: 800,
        height: 1000,
        aspectRatio: '4:5',
        backgroundColor: '#ffffff',
      },
    ],
    canvasData: {},
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: `proj-sample-4`,
    userId,
    title: 'Ankit bhai',
    preset: CANVAS_PRESETS.find(p => p.id === 'presentation') || CANVAS_PRESETS[0],
    pages: [
      {
        id: 'page-1',
        title: 'Page 1',
        width: 1920,
        height: 1080,
        aspectRatio: '16:9',
        backgroundColor: '#ffffff',
      },
    ],
    canvasData: {},
    createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
  },
];

export const getAllStoredProjects = (): CanvasProject[] => {
  try {
    const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse projects storage', e);
    return [];
  }
};

const saveAllProjects = (projects: CanvasProject[]) => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save projects to storage', e);
  }
};

export const getUserProjects = (userId: string): CanvasProject[] => {
  const all = getAllStoredProjects();
  const userProjs = all.filter((p) => p.userId === userId && !p.isArchived);

  // If user has no projects yet, initialize with sample starter projects
  if (userProjs.length === 0 && !localStorage.getItem(`initialized_samples_${userId}`)) {
    const samples = getInitialSampleProjects(userId);
    saveAllProjects([...all, ...samples]);
    localStorage.setItem(`initialized_samples_${userId}`, 'true');
    return samples;
  }

  return userProjs.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getArchivedUserProjects = (userId: string): CanvasProject[] => {
  const all = getAllStoredProjects();
  return all
    .filter((p) => p.userId === userId && p.isArchived)
    .sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getProjectById = (projectId: string): CanvasProject | undefined => {
  const all = getAllStoredProjects();
  return all.find((p) => p.id === projectId);
};

export const saveProject = (project: CanvasProject): CanvasProject => {
  const all = getAllStoredProjects();
  const index = all.findIndex((p) => p.id === project.id);
  const updatedProject: CanvasProject = {
    ...project,
    updatedAt: Date.now(),
  };

  if (index >= 0) {
    all[index] = updatedProject;
  } else {
    all.unshift(updatedProject);
  }

  saveAllProjects(all);
  return updatedProject;
};

export const deleteProject = (projectId: string) => {
  const all = getAllStoredProjects();
  const filtered = all.filter((p) => p.id !== projectId);
  saveAllProjects(filtered);
};

export const archiveProject = (projectId: string, isArchived: boolean = true) => {
  const all = getAllStoredProjects();
  const project = all.find((p) => p.id === projectId);
  if (project) {
    project.isArchived = isArchived;
    project.updatedAt = Date.now();
    saveAllProjects(all);
  }
};

export const duplicateProject = (project: CanvasProject): CanvasProject => {
  const newProject: CanvasProject = {
    ...project,
    id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    title: `${project.title} (Copy)`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const all = getAllStoredProjects();
  all.unshift(newProject);
  saveAllProjects(all);
  return newProject;
};

export const createNewProject = (
  userId: string,
  title: string,
  preset = CANVAS_PRESETS[0]
): CanvasProject => {
  const newProject: CanvasProject = {
    id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    userId,
    title: title.trim() || 'Untitled Project',
    preset,
    pages: [
      {
        id: 'page-1',
        title: 'Page 1',
        width: preset.width,
        height: preset.height,
        aspectRatio: preset.aspectRatio,
        backgroundColor: '#ffffff',
      },
    ],
    canvasData: {},
    backgroundColor: '#ffffff',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  return saveProject(newProject);
};
