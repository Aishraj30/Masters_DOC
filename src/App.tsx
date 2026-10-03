'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';

import { CANVAS_PRESETS } from './constants/presets';
import { ActiveTab, CanvasPage, CanvasPreset, ObjectProperties, PrebuiltTemplate } from './types/canvas';

import { HeaderBar } from './components/header/HeaderBar';
import { ContextualToolbar } from './components/toolbar/ContextualToolbar';
import { SidebarNav } from './components/sidebar/SidebarNav';

import { ElementsPanel } from './components/sidebar/panels/ElementsPanel';
import { IconsPanel } from './components/sidebar/panels/IconsPanel';
import { IconifyPanel } from './components/sidebar/panels/IconifyPanel';
import { TextPanel } from './components/sidebar/panels/TextPanel';
import { UploadsPanel } from './components/sidebar/panels/UploadsPanel';
import { DrawPanel } from './components/sidebar/panels/DrawPanel';
import { BackgroundsPanel } from './components/sidebar/panels/BackgroundsPanel';
import { BrandKitPanel } from './components/sidebar/panels/BrandKitPanel';
import { LayersPanel } from './components/sidebar/panels/LayersPanel';

import { CanvasEditor } from './components/canvas/CanvasEditor';
import { PageManager } from './components/canvas/PageManager';

import { ExportModal } from './components/modals/ExportModal';
import { FeedbackModal } from './components/modals/FeedbackModal';
import { ResizeModal } from './components/modals/ResizeModal';
import { PresentModal } from './components/modals/PresentModal';
import { NewPageRatioModal } from './components/modals/NewPageRatioModal';
import { AdminDiagramsModal } from './components/modals/AdminDiagramsModal';
import { LoginPage } from './components/auth/LoginPage';
import { LandingPage } from './components/landing/LandingPage';
import { Dashboard } from './components/dashboard/Dashboard';
import { toggleWatermark } from './utils/watermark';
import { getCurrentUser, fetchCurrentUserApi, logoutUser, UserProfile } from './utils/auth';
import { CanvasProject } from './types/project';
import { getProjectById, saveProject, createNewProject, getUserProjects } from './utils/projectsStorage';

interface AppProps {
  initialView?: 'landing' | 'auth' | 'dashboard' | 'editor';
}

export function App({ initialView }: AppProps = {}) {
  // Authentication & View State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(getCurrentUser());
  const [view, setView] = useState<'landing' | 'auth' | 'dashboard' | 'editor'>(
    initialView || (getCurrentUser() ? 'dashboard' : 'landing')
  );

  useEffect(() => {
    fetchCurrentUserApi().then((user) => {
      if (user) {
        setCurrentUser(user);
        if (
          user.role === 'admin' ||
          user.username?.toLowerCase() === 'admin@2005' ||
          user.email?.toLowerCase() === 'admin@2005.com'
        ) {
          window.location.href = '/admin';
          return;
        }
        setView((prev) => (prev === 'landing' || prev === 'auth' ? 'dashboard' : prev));
      }
    });
  }, []);

  // Active Project & Document State
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [designTitle, setDesignTitle] = useState<string>('Untitled Design');
  const [activePreset, setActivePreset] = useState<CanvasPreset>(CANVAS_PRESETS[0]);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [zoom, setZoom] = useState<number>(100);

  // Left Sidebar State
  const [activeTab, setActiveTab] = useState<ActiveTab>('icons');

  // Canvas & Selected Object State
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<ObjectProperties | null>(null);

  // Multi-page System State
  const [pages, setPages] = useState<CanvasPage[]>([
    {
      id: 'page-1',
      title: 'Page 1',
      width: CANVAS_PRESETS[0].width,
      height: CANVAS_PRESETS[0].height,
      aspectRatio: CANVAS_PRESETS[0].aspectRatio,
      backgroundColor: '#ffffff',
    },
  ]);
  const [currentPageId, setCurrentPageId] = useState<string>('page-1');

  // Undo / Redo History Stack
  const historyStack = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);
  const isUndoRedoAction = useRef<boolean>(false);
  const isLoadedRef = useRef<boolean>(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Refs to avoid stale closures in Fabric canvas event listeners
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const activeProjectIdRef = useRef<string | null>(activeProjectId);
  const currentPageIdRef = useRef<string>(currentPageId);
  const pagesRef = useRef<CanvasPage[]>(pages);
  const designTitleRef = useRef<string>(designTitle);
  const activePresetRef = useRef<CanvasPreset>(activePreset);
  const backgroundColorRef = useRef<string>(backgroundColor);
  const currentUserRef = useRef<UserProfile | null>(currentUser);

  useEffect(() => { activeProjectIdRef.current = activeProjectId; }, [activeProjectId]);
  useEffect(() => { currentPageIdRef.current = currentPageId; }, [currentPageId]);
  useEffect(() => { pagesRef.current = pages; }, [pages]);
  useEffect(() => { designTitleRef.current = designTitle; }, [designTitle]);
  useEffect(() => { activePresetRef.current = activePreset; }, [activePreset]);
  useEffect(() => { backgroundColorRef.current = backgroundColor; }, [backgroundColor]);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);

  // Fit Zoom Handler Reference
  const fitZoomFnRef = useRef<(() => void) | null>(null);

  const handleZoomFit = useCallback(() => {
    if (fitZoomFnRef.current) {
      fitZoomFnRef.current();
    } else {
      setZoom(100);
    }
  }, []);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [lastExportFormat, setLastExportFormat] = useState<string>('png');
  const [isResizeOpen, setIsResizeOpen] = useState(false);
  const [isPresentOpen, setIsPresentOpen] = useState(false);
  const [isAddPageRatioOpen, setIsAddPageRatioOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Auto-Save active project state helper using refs to prevent stale data
  const saveCurrentProjectToStorage = useCallback((updatedPages?: CanvasPage[]) => {
    const projId = activeProjectIdRef.current;
    const user = currentUserRef.current;
    if (!projId || !user) return;
    const existing = getProjectById(projId);
    const pagesToSave = updatedPages || pagesRef.current;

    const canvasDataMap: Record<string, string> = {};
    pagesToSave.forEach((p) => {
      if (p.jsonState) {
        canvasDataMap[p.id] = p.jsonState;
      }
    });

    const updated: CanvasProject = {
      id: projId,
      userId: user.id,
      title: designTitleRef.current || 'Untitled Design',
      preset: activePresetRef.current,
      pages: pagesToSave,
      canvasData: existing?.canvasData ? { ...existing.canvasData, ...canvasDataMap } : canvasDataMap,
      backgroundColor: backgroundColorRef.current,
      createdAt: existing?.createdAt || Date.now(),
      updatedAt: Date.now(),
      isArchived: existing?.isArchived || false,
    };
    saveProject(updated);
  }, []);

  // Save current canvas state to history stack and project storage
  const saveState = useCallback(() => {
    const targetCanvas = canvasRef.current;
    if (!targetCanvas || !isLoadedRef.current || isUndoRedoAction.current) return;

    const jsonState = JSON.stringify(
      targetCanvas.toJSON(['id', 'name', 'isLocked', 'rx', 'ry', 'connectorStyle', 'isFixedConnectorArrow', 'strokeUniform'])
    );

    if (historyIndex.current < historyStack.current.length - 1) {
      historyStack.current = historyStack.current.slice(0, historyIndex.current + 1);
    }

    historyStack.current.push(jsonState);
    historyIndex.current = historyStack.current.length - 1;

    setCanUndo(historyIndex.current > 0);
    setCanRedo(historyIndex.current < historyStack.current.length - 1);

    const curPages = pagesRef.current;
    const curPageId = currentPageIdRef.current;
    const curPreset = activePresetRef.current;
    const curBg = backgroundColorRef.current;

    const currentPageObj = curPages.find((p) => p.id === curPageId) || curPages[0];
    const targetW = currentPageObj ? currentPageObj.width : curPreset.width;
    const targetH = currentPageObj ? currentPageObj.height : curPreset.height;
    const targetRatio = currentPageObj ? currentPageObj.aspectRatio : curPreset.aspectRatio;

    const updatedPages = curPages.map((p) =>
      p.id === (curPageId || curPages[0]?.id)
        ? {
            ...p,
            width: targetW,
            height: targetH,
            aspectRatio: targetRatio,
            backgroundColor: curBg,
            jsonState,
          }
        : p
    );

    pagesRef.current = updatedPages;
    setPages(updatedPages);

    saveCurrentProjectToStorage(updatedPages);
  }, [saveCurrentProjectToStorage]);

  // Handle Canvas Ready Initialization
  const handleCanvasReady = useCallback((fabricCanvas: fabric.Canvas) => {
    canvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas);

    fabricCanvas.on('object:added', () => saveState());
    fabricCanvas.on('object:modified', () => saveState());
    fabricCanvas.on('object:removed', () => saveState());
    fabricCanvas.on('path:created', () => saveState());
    fabricCanvas.on('text:changed', () => saveState());
  }, [saveState]);

  // Window unload save listener
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveCurrentProjectToStorage();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [saveCurrentProjectToStorage]);

  // Auto-Load Active Project from URL query param (?id=...) or LocalStorage on mount
  useEffect(() => {
    if (!currentUser) return;

    let targetProjectId: string | null = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlId = params.get('id');
      if (urlId) {
        targetProjectId = urlId;
      }
    }

    if (!targetProjectId && typeof localStorage !== 'undefined') {
      targetProjectId = localStorage.getItem('docmaster_last_active_project_id');
    }

    let proj: CanvasProject | undefined;
    if (targetProjectId) {
      proj = getProjectById(targetProjectId);
    }

    if (!proj) {
      const userProjects = getUserProjects(currentUser.id);
      if (userProjects.length > 0) {
        proj = userProjects[0];
      } else {
        proj = createNewProject(currentUser.id, 'My First Design', CANVAS_PRESETS[0]);
      }
    }

    if (proj) {
      activeProjectIdRef.current = proj.id;
      setActiveProjectId(proj.id);

      designTitleRef.current = proj.title;
      setDesignTitle(proj.title);

      pagesRef.current = proj.pages;
      setPages(proj.pages);

      const bg = proj.backgroundColor || '#ffffff';
      backgroundColorRef.current = bg;
      setBackgroundColor(bg);

      if (proj.pages && proj.pages.length > 0) {
        const p0 = proj.pages[0];
        currentPageIdRef.current = p0.id;
        setCurrentPageId(p0.id);

        const newPreset = {
          id: proj.preset?.id || 'preset-loaded',
          name: proj.preset?.name || 'Canvas Preset',
          width: p0.width,
          height: p0.height,
          aspectRatio: p0.aspectRatio || proj.preset?.aspectRatio || '1:1',
          iconName: proj.preset?.iconName || 'layout',
          category: proj.preset?.category || 'social',
          description: `${p0.width}×${p0.height} px`,
        };
        activePresetRef.current = newPreset;
        setActivePreset(newPreset);
      }

      isLoadedRef.current = true;

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('docmaster_last_active_project_id', proj.id);
      }
      if (typeof window !== 'undefined') {
        const newUrl = `${window.location.pathname}?id=${proj.id}`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [currentUser]);

  // Safe helper to load JSON onto Fabric canvas with context readiness check
  const safeLoadCanvasJson = useCallback((targetCanvas: fabric.Canvas | null, jsonStr: string, onComplete?: () => void) => {
    if (!targetCanvas || !jsonStr) return;

    // Verify 2D Rendering Context is available on fabric canvas
    const ctx = typeof (targetCanvas as any).getContext === 'function' ? (targetCanvas as any).getContext() : null;
    if (!ctx) {
      // If 2D context is not attached yet, defer load to next frame
      requestAnimationFrame(() => {
        safeLoadCanvasJson(targetCanvas, jsonStr, onComplete);
      });
      return;
    }

    try {
      isUndoRedoAction.current = true;
      targetCanvas.loadFromJSON(jsonStr, () => {
        try {
          targetCanvas.requestRenderAll();
        } catch (e) {
          console.error('Failed requestRenderAll:', e);
        }
        isUndoRedoAction.current = false;
        if (onComplete) onComplete();
      });
    } catch (err) {
      console.error('Failed loadFromJSON:', err);
      isUndoRedoAction.current = false;
    }
  }, []);

  // Safe helper to clear Fabric canvas with context readiness check
  const safeClearCanvas = useCallback((targetCanvas: fabric.Canvas | null, bg: string, onComplete?: () => void) => {
    if (!targetCanvas) return;

    // Verify 2D Rendering Context is available on fabric canvas
    const ctx = typeof (targetCanvas as any).getContext === 'function' ? (targetCanvas as any).getContext() : null;
    if (!ctx) {
      // If 2D context is not attached yet, defer clear to next frame
      requestAnimationFrame(() => {
        safeClearCanvas(targetCanvas, bg, onComplete);
      });
      return;
    }

    try {
      isUndoRedoAction.current = true;
      targetCanvas.clear();
      targetCanvas.setBackgroundColor(bg || '#ffffff', () => {
        try {
          targetCanvas.requestRenderAll();
        } catch (e) {
          console.error('Failed requestRenderAll in clear:', e);
        }
        isUndoRedoAction.current = false;
        if (onComplete) onComplete();
      });
    } catch (err) {
      console.error('Failed safeClearCanvas:', err);
      isUndoRedoAction.current = false;
    }
  }, []);

  // Hydrate Fabric Canvas objects whenever project or active page changes
  useEffect(() => {
    const targetCanvas = canvas || canvasRef.current;
    if (!targetCanvas || !isLoadedRef.current) return;
    const curPage = pages.find((p) => p.id === currentPageId) || pages[0];
    if (curPage) {
      if (curPage.jsonState) {
        safeLoadCanvasJson(targetCanvas, curPage.jsonState, () => {
          historyStack.current = [curPage.jsonState!];
          historyIndex.current = 0;
          setCanUndo(false);
          setCanRedo(false);
        });
      } else {
        const bg = curPage.backgroundColor || backgroundColor || '#ffffff';
        safeClearCanvas(targetCanvas, bg, () => {
          const emptyState = JSON.stringify(targetCanvas.toJSON(['id', 'name', 'isLocked', 'rx', 'ry', 'connectorStyle', 'isFixedConnectorArrow', 'strokeUniform']));
          historyStack.current = [emptyState];
          historyIndex.current = 0;
          setCanUndo(false);
          setCanRedo(false);
        });
      }
    }
  }, [canvas, activeProjectId, currentPageId, pages, backgroundColor, safeLoadCanvasJson, safeClearCanvas]);

  const handleLogout = () => {
    saveCurrentProjectToStorage();
    logoutUser();
    setCurrentUser(null);
    setView('landing');
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (
      user.role === 'admin' ||
      user.username?.toLowerCase() === 'admin@2005' ||
      user.email?.toLowerCase() === 'admin@2005.com'
    ) {
      window.location.href = '/admin';
    } else {
      setView('dashboard');
    }
  };

  const handleOpenProject = (projectId: string) => {
    if (!currentUser) {
      setView('auth');
      return;
    }

    // Save previous active project before loading new one
    saveCurrentProjectToStorage();

    const proj = getProjectById(projectId);
    if (!proj) return;

    activeProjectIdRef.current = proj.id;
    setActiveProjectId(proj.id);

    designTitleRef.current = proj.title;
    setDesignTitle(proj.title);

    pagesRef.current = proj.pages;
    setPages(proj.pages);

    const bg = proj.backgroundColor || '#ffffff';
    backgroundColorRef.current = bg;
    setBackgroundColor(bg);

    if (proj.pages && proj.pages.length > 0) {
      const p0 = proj.pages[0];
      currentPageIdRef.current = p0.id;
      setCurrentPageId(p0.id);

      const newPreset = {
        id: proj.preset?.id || 'preset-loaded',
        name: proj.preset?.name || 'Canvas Preset',
        width: p0.width,
        height: p0.height,
        aspectRatio: p0.aspectRatio || proj.preset?.aspectRatio || '1:1',
        iconName: proj.preset?.iconName || 'layout',
        category: proj.preset?.category || 'social',
        description: `${p0.width}×${p0.height} px`,
      };
      activePresetRef.current = newPreset;
      setActivePreset(newPreset);
    }

    isLoadedRef.current = true;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('docmaster_last_active_project_id', proj.id);
    }
    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?id=${proj.id}`;
      window.history.replaceState({}, '', newUrl);
    }

    setView('editor');
  };

  const handleBackToDashboard = () => {
    saveCurrentProjectToStorage();
    setView('dashboard');
  };

  // Undo execution
  const handleUndo = () => {
    if (!canvas || historyIndex.current <= 0) return;
    isUndoRedoAction.current = true;
    historyIndex.current -= 1;
    const jsonState = historyStack.current[historyIndex.current];
    canvas.loadFromJSON(jsonState, () => {
      canvas.requestRenderAll();
      isUndoRedoAction.current = false;
      setCanUndo(historyIndex.current > 0);
      setCanRedo(historyIndex.current < historyStack.current.length - 1);
    });
  };

  // Redo execution
  const handleRedo = () => {
    if (!canvas || historyIndex.current >= historyStack.current.length - 1) return;
    isUndoRedoAction.current = true;
    historyIndex.current += 1;
    const jsonState = historyStack.current[historyIndex.current];
    canvas.loadFromJSON(jsonState, () => {
      canvas.requestRenderAll();
      isUndoRedoAction.current = false;
      setCanUndo(historyIndex.current > 0);
      setCanRedo(historyIndex.current < historyStack.current.length - 1);
    });
  };

  // Apply Template
  const handleApplyTemplate = (template: PrebuiltTemplate) => {
    if (!canvas) return;

    const preset: CanvasPreset = {
      id: template.id,
      name: template.title,
      width: template.width,
      height: template.height,
      aspectRatio: `${template.width}:${template.height}`,
      iconName: 'layout',
      category: 'custom',
      description: template.title,
    };
    setActivePreset(preset);

    canvas.clear();

    if (template.backgroundColor) {
      canvas.setBackgroundColor(template.backgroundColor, () => {
        canvas.requestRenderAll();
      });
      setBackgroundColor(template.backgroundColor);
    } else {
      canvas.setBackgroundColor('#ffffff', () => {
        canvas.requestRenderAll();
      });
      setBackgroundColor('#ffffff');
    }

    if (template.elements) {
      template.elements.forEach((objConfig: any) => {
        if (objConfig.type === 'i-text' || objConfig.type === 'text') {
          const textObj = new fabric.IText(objConfig.text || 'Sample Text', {
            left: objConfig.left,
            top: objConfig.top,
            fontSize: objConfig.fontSize || 32,
            fill: objConfig.fill || '#000000',
            fontFamily: objConfig.fontFamily || 'Inter, sans-serif',
            fontWeight: objConfig.fontWeight || 'normal',
            originX: 'center',
            originY: 'center',
          });
          canvas.add(textObj);
        } else if (objConfig.type === 'rect') {
          const rectObj = new fabric.Rect({
            left: objConfig.left,
            top: objConfig.top,
            width: objConfig.width || 100,
            height: objConfig.height || 100,
            fill: objConfig.fill || '#3b82f6',
            originX: 'center',
            originY: 'center',
          });
          canvas.add(rectObj);
        } else if (objConfig.type === 'circle') {
          const circleObj = new fabric.Circle({
            left: objConfig.left,
            top: objConfig.top,
            radius: objConfig.radius || 50,
            fill: objConfig.fill || '#10b981',
            originX: 'center',
            originY: 'center',
          });
          canvas.add(circleObj);
        }
      });
    }

    canvas.requestRenderAll();
    saveState();
  };

  // Save Canvas to JSON File
  const handleSaveJson = () => {
    if (!canvas) return;
    const jsonString = JSON.stringify(canvas.toJSON(['id', 'name', 'isLocked', 'rx', 'ry']));
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${designTitle.replace(/\s+/g, '_')}.docmaster`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Load Canvas from JSON File
  const handleLoadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target?.result as string;
      try {
        canvas.loadFromJSON(contents, () => {
          canvas.requestRenderAll();
          saveState();
        });
      } catch (err) {
        alert('Invalid .docmaster file format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to New Blank Design
  const handleNewDesign = () => {
    if (!canvas) return;
    if (confirm('Create new blank design? Unsaved changes will be cleared.')) {
      canvas.clear();
      canvas.setBackgroundColor('#ffffff', () => {
        canvas.requestRenderAll();
      });
      setBackgroundColor('#ffffff');
      setDesignTitle('Untitled Design');
      historyStack.current = [];
      historyIndex.current = -1;
      saveState();
    }
  };

  // Preset & Page Aspect Ratio Handlers
  const handleSelectPreset = (preset: CanvasPreset) => {
    setActivePreset(preset);
    setPages((prevPages) =>
      prevPages.map((p) =>
        p.id === currentPageId
          ? {
              ...p,
              width: preset.width,
              height: preset.height,
              aspectRatio: preset.aspectRatio,
            }
          : p
      )
    );
  };

  // Multi-Page Handlers
  const handleSelectPage = (pageId: string) => {
    setCurrentPageId(pageId);
    const targetPage = pages.find((p) => p.id === pageId);
    if (!targetPage) return;

    setActivePreset({
      id: `preset-${targetPage.id}`,
      name: targetPage.title || 'Page',
      width: targetPage.width,
      height: targetPage.height,
      aspectRatio: targetPage.aspectRatio || `${targetPage.width}:${targetPage.height}`,
      iconName: 'layout',
      category: 'custom',
      description: `${targetPage.width}×${targetPage.height} px`,
    });

    if (canvas) {
      if (targetPage.jsonState) {
        isUndoRedoAction.current = true;
        canvas.loadFromJSON(targetPage.jsonState, () => {
          canvas.requestRenderAll();
          isUndoRedoAction.current = false;
          historyStack.current = [targetPage.jsonState!];
          historyIndex.current = 0;
          setCanUndo(false);
          setCanRedo(false);
        });
      } else {
        canvas.clear();
        canvas.setBackgroundColor(targetPage.backgroundColor || '#ffffff', () => {
          canvas.requestRenderAll();
        });
      }
    }
  };

  const handleConfirmAddPage = (preset: CanvasPreset) => {
    const newPageId = `page-${Date.now()}`;
    const newPage: CanvasPage = {
      id: newPageId,
      title: `Page ${pages.length + 1}`,
      width: preset.width,
      height: preset.height,
      aspectRatio: preset.aspectRatio,
      backgroundColor: '#ffffff',
    };
    setPages((prev) => [...prev, newPage]);
    setCurrentPageId(newPageId);
    setActivePreset(preset);
  };

  const handleDuplicatePage = (pageId: string) => {
    const targetPage = pages.find((p) => p.id === pageId);
    if (!targetPage) return;

    const duplicatedPageId = `page-${Date.now()}`;
    const newPage: CanvasPage = {
      ...targetPage,
      id: duplicatedPageId,
      title: `${targetPage.title} (Copy)`,
    };

    const index = pages.findIndex((p) => p.id === pageId);
    const newPages = [...pages];
    newPages.splice(index + 1, 0, newPage);
    setPages(newPages);
    setCurrentPageId(duplicatedPageId);
  };

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) {
      alert('Document must contain at least one page.');
      return;
    }

    const filtered = pages.filter((p) => p.id !== pageId);
    setPages(filtered);

    if (currentPageId === pageId) {
      setCurrentPageId(filtered[0].id);
    }
  };

  // 1. Unauthenticated Public Landing Page (Image 1 View)
  if (view === 'landing' && !currentUser) {
    return (
      <LandingPage
        onOpenLogin={() => setView('auth')}
        onOpenSignup={() => setView('auth')}
      />
    );
  }

  // 2. Auth View Screen (Sign In / Register Modal)
  if (view === 'auth' || !currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 3. Post-Login Canva-Style Dashboard (Image 2 View with Recent Projects)
  if (view === 'dashboard') {
    return (
      <Dashboard
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenProject={handleOpenProject}
        onCreateNewProject={(preset, title) => {
          if (!currentUser) return;
          const newProj = createNewProject(currentUser.id, title || 'Untitled Project', preset);
          handleOpenProject(newProj.id);
        }}
      />
    );
  }

  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];
  const currentWidth = currentPage ? currentPage.width : activePreset.width;
  const currentHeight = currentPage ? currentPage.height : activePreset.height;

  // 4. Canvas Editor Workspace Screen
  return (
    <div className="flex flex-col h-screen w-screen bg-canva-bg overflow-hidden select-none">
      {/* Top Header Bar */}
      <HeaderBar
        title={designTitle}
        onTitleChange={(newTitle) => {
          setDesignTitle(newTitle);
          saveCurrentProjectToStorage();
        }}
        activePreset={{
          ...activePreset,
          width: currentWidth,
          height: currentHeight,
          aspectRatio: currentPage ? currentPage.aspectRatio : activePreset.aspectRatio,
        }}
        onOpenResizeModal={() => setIsResizeOpen(true)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenPresentModal={() => setIsPresentOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onToggleWatermark={() => canvas && toggleWatermark(canvas)}
        onSaveJson={handleSaveJson}
        onLoadJson={handleLoadJson}
        onNewDesign={handleNewDesign}
        onBackToDashboard={handleBackToDashboard}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Contextual Properties Bar for Active Object */}
      <ContextualToolbar canvas={canvas} selectedObject={selectedObject} />

      {/* Main Work Area: Left Sidebar Navigation + Panel + Canvas */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navigation Sidebar */}
        <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Panel Content per Active Tab */}
        {activeTab === 'elements' && <ElementsPanel canvas={canvas} />}
        {activeTab === 'diagram' && <IconsPanel canvas={canvas} title="Diagram Library" />}
        {activeTab === 'icons' && <IconifyPanel canvas={canvas} />}
        {activeTab === 'text' && <TextPanel canvas={canvas} />}
        {activeTab === 'uploads' && <UploadsPanel canvas={canvas} currentUser={currentUser} />}
        {activeTab === 'draw' && <DrawPanel canvas={canvas} />}
        {activeTab === 'backgrounds' && (
          <BackgroundsPanel
            canvas={canvas}
            backgroundColor={backgroundColor}
            onSetBackgroundColor={setBackgroundColor}
          />
        )}
        {activeTab === 'brandkit' && (
          <BrandKitPanel canvas={canvas} onSetBackgroundColor={setBackgroundColor} />
        )}
        {activeTab === 'layers' && <LayersPanel canvas={canvas} />}

        {/* Canvas Editing Board */}
        <CanvasEditor
          width={currentWidth}
          height={currentHeight}
          backgroundColor={backgroundColor}
          onCanvasReady={handleCanvasReady}
          onSelectionChange={setSelectedObject}
          zoom={zoom}
          setZoom={setZoom}
          onRegisterFitZoom={(fn) => { fitZoomFnRef.current = fn; }}
        />
      </div>

      {/* Bottom Page Manager & Zoom Footer */}
      <PageManager
        pages={pages}
        currentPageId={currentPageId}
        onSelectPage={handleSelectPage}
        onOpenAddPageModal={() => setIsAddPageRatioOpen(true)}
        onDuplicatePage={handleDuplicatePage}
        onDeletePage={handleDeletePage}
        zoom={zoom}
        setZoom={setZoom}
        onZoomFit={handleZoomFit}
      />

      {/* Dialog Modals */}
      <NewPageRatioModal
        isOpen={isAddPageRatioOpen}
        onClose={() => setIsAddPageRatioOpen(false)}
        onConfirmAddPage={handleConfirmAddPage}
        defaultPreset={activePreset}
      />

      <ExportModal
        canvas={canvas}
        pages={pages}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        designTitle={designTitle}
        onExportSuccess={(fmt) => {
          setLastExportFormat(fmt);
          setIsFeedbackOpen(true);
        }}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        designTitle={designTitle}
        exportFormat={lastExportFormat}
        currentUser={currentUser}
      />

      <ResizeModal
        isOpen={isResizeOpen}
        onClose={() => setIsResizeOpen(false)}
        activePreset={{
          ...activePreset,
          width: currentWidth,
          height: currentHeight,
          aspectRatio: currentPage ? currentPage.aspectRatio : activePreset.aspectRatio,
        }}
        onSelectPreset={handleSelectPreset}
      />

      <PresentModal
        isOpen={isPresentOpen}
        onClose={() => setIsPresentOpen(false)}
        canvas={canvas}
        pages={pages}
        currentPageId={currentPageId}
      />

      <AdminDiagramsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default App;
