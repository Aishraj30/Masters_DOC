import React, { useState, useRef, useCallback } from 'react';
import { fabric } from 'fabric';

import { CANVAS_PRESETS } from './constants/presets';
import { ActiveTab, CanvasPage, CanvasPreset, ObjectProperties, PrebuiltTemplate } from './types/canvas';

import { HeaderBar } from './components/header/HeaderBar';
import { ContextualToolbar } from './components/toolbar/ContextualToolbar';
import { SidebarNav } from './components/sidebar/SidebarNav';

import { TemplatesPanel } from './components/sidebar/panels/TemplatesPanel';
import { ElementsPanel } from './components/sidebar/panels/ElementsPanel';
import { TextPanel } from './components/sidebar/panels/TextPanel';
import { UploadsPanel } from './components/sidebar/panels/UploadsPanel';
import { DrawPanel } from './components/sidebar/panels/DrawPanel';
import { BackgroundsPanel } from './components/sidebar/panels/BackgroundsPanel';
import { LayersPanel } from './components/sidebar/panels/LayersPanel';

import { CanvasEditor } from './components/canvas/CanvasEditor';
import { PageManager } from './components/canvas/PageManager';

import { ExportModal } from './components/modals/ExportModal';
import { ResizeModal } from './components/modals/ResizeModal';
import { PresentModal } from './components/modals/PresentModal';
import { NewPageRatioModal } from './components/modals/NewPageRatioModal';
import { exportCanvas } from './utils/export';

export function App() {
  // Document State
  const [designTitle, setDesignTitle] = useState<string>('Untitled Design');
  const [activePreset, setActivePreset] = useState<CanvasPreset>(CANVAS_PRESETS[0]); // Instagram Post 1:1
  const [backgroundColor, setBackgroundColor] = useState<string>('#0f172a');
  const [zoom, setZoom] = useState<number>(100);

  // Left Sidebar State
  const [activeTab, setActiveTab] = useState<ActiveTab>('templates');

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
      backgroundColor: '#0f172a' 
    },
  ]);
  const [currentPageId, setCurrentPageId] = useState<string>('page-1');

  // Undo / Redo History Stack
  const historyStack = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);
  const isUndoRedoAction = useRef<boolean>(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isResizeOpen, setIsResizeOpen] = useState(false);
  const [isPresentOpen, setIsPresentOpen] = useState(false);
  const [isAddPageRatioOpen, setIsAddPageRatioOpen] = useState(false);

  // Save current canvas state to history stack
  const saveState = useCallback(() => {
    if (!canvas || isUndoRedoAction.current) return;

    const json = JSON.stringify(canvas.toJSON(['id', 'name', 'isLocked', 'rx', 'ry']));
    
    if (historyIndex.current < historyStack.current.length - 1) {
      historyStack.current = historyStack.current.slice(0, historyIndex.current + 1);
    }

    historyStack.current.push(json);
    historyIndex.current = historyStack.current.length - 1;

    setCanUndo(historyIndex.current > 0);
    setCanRedo(historyIndex.current < historyStack.current.length - 1);
  }, [canvas]);

  // Handle Canvas Ready Initialization
  const handleCanvasReady = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);

    fabricCanvas.on('object:added', () => saveState());
    fabricCanvas.on('object:modified', () => saveState());
    fabricCanvas.on('object:removed', () => saveState());

    saveState();
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
      aspectRatio: template.width === template.height ? '1:1' : '16:9',
      iconName: 'Layout',
      category: 'social',
      description: `${template.title} (${template.width}×${template.height})`
    };

    setActivePreset(preset);
    setBackgroundColor(template.backgroundColor);

    // Update current page record
    setPages((prevPages) =>
      prevPages.map((p) =>
        p.id === currentPageId
          ? { ...p, width: template.width, height: template.height, aspectRatio: preset.aspectRatio }
          : p
      )
    );

    canvas.clear();
    canvas.setBackgroundColor(template.backgroundColor, () => {});

    canvas.loadFromJSON({ objects: template.elements, background: template.backgroundColor }, () => {
      canvas.requestRenderAll();
      saveState();
    });
  };

  // Switch Active Page
  const handleSelectPage = (pageId: string) => {
    const targetPage = pages.find((p) => p.id === pageId);
    if (!targetPage || !canvas) return;

    // Save current page state
    const currentState = JSON.stringify(canvas.toJSON());
    setPages((prevPages) =>
      prevPages.map((p) => (p.id === currentPageId ? { ...p, jsonState: currentState } : p))
    );

    setCurrentPageId(pageId);
    setActivePreset({
      id: targetPage.id,
      name: targetPage.title,
      width: targetPage.width,
      height: targetPage.height,
      aspectRatio: targetPage.aspectRatio,
      iconName: 'Square',
      category: 'custom',
      description: `${targetPage.title} (${targetPage.width}x${targetPage.height})`
    });

    canvas.clear();
    if (targetPage.jsonState) {
      canvas.loadFromJSON(targetPage.jsonState, () => {
        canvas.requestRenderAll();
      });
    } else {
      canvas.setBackgroundColor(targetPage.backgroundColor, () => {
        canvas.requestRenderAll();
      });
    }
  };

  // Page Management: Insert Page with Chosen Ratio
  const handleConfirmAddPage = (chosenPreset: CanvasPreset) => {
    if (!canvas) return;

    // Save active page state before adding new page
    const currentState = JSON.stringify(canvas.toJSON());
    setPages((prevPages) =>
      prevPages.map((p) => (p.id === currentPageId ? { ...p, jsonState: currentState } : p))
    );

    const newId = `page-${pages.length + 1}`;
    const newPage: CanvasPage = {
      id: newId,
      title: `Page ${pages.length + 1}`,
      width: chosenPreset.width,
      height: chosenPreset.height,
      aspectRatio: chosenPreset.aspectRatio,
      backgroundColor,
    };

    setPages((prev) => [...prev, newPage]);
    setCurrentPageId(newId);
    setActivePreset(chosenPreset);

    canvas.clear();
    canvas.setBackgroundColor(backgroundColor, () => {
      canvas.requestRenderAll();
    });
  };

  const handleDuplicatePage = (pageId: string) => {
    if (!canvas) return;
    const jsonState = JSON.stringify(canvas.toJSON());
    const sourcePage = pages.find((p) => p.id === pageId);

    const newId = `page-${pages.length + 1}`;
    const newPage: CanvasPage = {
      id: newId,
      title: `Page ${pages.length + 1} (Copy)`,
      width: sourcePage?.width || activePreset.width,
      height: sourcePage?.height || activePreset.height,
      aspectRatio: sourcePage?.aspectRatio || activePreset.aspectRatio,
      jsonState,
      backgroundColor,
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newId);
  };

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) return;
    const filtered = pages.filter((p) => p.id !== pageId);
    setPages(filtered);
    setCurrentPageId(filtered[0].id);
  };

  // Save / Load JSON Project
  const handleSaveJson = () => {
    if (!canvas) return;
    exportCanvas(canvas, 'json', designTitle);
  };

  const handleLoadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const jsonString = event.target.result as string;
        canvas.loadFromJSON(jsonString, () => {
          canvas.requestRenderAll();
          saveState();
        });
      }
    };
    reader.readAsText(file);
  };

  const handleNewDesign = () => {
    if (!canvas) return;
    if (window.confirm('Create a new blank canvas? Unsaved changes will be cleared.')) {
      canvas.clear();
      canvas.setBackgroundColor('#0f172a', () => {
        canvas.requestRenderAll();
      });
      setBackgroundColor('#0f172a');
      setDesignTitle('Untitled Design');
      saveState();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-canva-bg text-gray-100 select-none">
      {/* Top Header Navbar */}
      <HeaderBar
        title={designTitle}
        onTitleChange={setDesignTitle}
        activePreset={activePreset}
        onOpenResizeModal={() => setIsResizeOpen(true)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onOpenExportModal={() => setIsExportOpen(true)}
        onOpenPresentModal={() => setIsPresentOpen(true)}
        onSaveJson={handleSaveJson}
        onLoadJson={handleLoadJson}
        onNewDesign={handleNewDesign}
      />

      {/* Contextual Object Toolbar */}
      <ContextualToolbar canvas={canvas} selectedObject={selectedObject} />

      {/* Main Workspace Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Vertical Icon Bar */}
        <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Active Side Panel */}
        {activeTab === 'templates' && (
          <TemplatesPanel canvas={canvas} onApplyTemplate={handleApplyTemplate} />
        )}
        {activeTab === 'elements' && <ElementsPanel canvas={canvas} />}
        {activeTab === 'text' && <TextPanel canvas={canvas} />}
        {activeTab === 'uploads' && <UploadsPanel canvas={canvas} />}
        {activeTab === 'draw' && <DrawPanel canvas={canvas} />}
        {activeTab === 'backgrounds' && (
          <BackgroundsPanel
            canvas={canvas}
            backgroundColor={backgroundColor}
            onSetBackgroundColor={setBackgroundColor}
          />
        )}
        {activeTab === 'layers' && <LayersPanel canvas={canvas} />}

        {/* Canvas Editing Board */}
        <CanvasEditor
          width={activePreset.width}
          height={activePreset.height}
          backgroundColor={backgroundColor}
          onCanvasReady={handleCanvasReady}
          onSelectionChange={setSelectedObject}
          zoom={zoom}
          setZoom={setZoom}
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
        onZoomFit={() => setZoom(100)}
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
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        designTitle={designTitle}
      />

      <ResizeModal
        isOpen={isResizeOpen}
        onClose={() => setIsResizeOpen(false)}
        activePreset={activePreset}
        onSelectPreset={setActivePreset}
      />

      <PresentModal
        isOpen={isPresentOpen}
        onClose={() => setIsPresentOpen(false)}
        canvas={canvas}
        pages={pages}
        currentPageId={currentPageId}
      />
    </div>
  );
}

export default App;
