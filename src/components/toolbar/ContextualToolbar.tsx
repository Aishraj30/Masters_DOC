import React, { useState } from 'react';
import { fabric } from 'fabric';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Trash2, 
  Copy, 
  Lock, 
  Unlock, 
  Layers, 
  ArrowUp, 
  ArrowDown, 
  ChevronsUp, 
  ChevronsDown,
  Minus,
  Plus,
  Sliders,
  Group,
  Ungroup,
  Sparkles,
  LayoutGrid,
  Sun,
  Contrast,
  Aperture
} from 'lucide-react';
import { ObjectProperties, ImageFilterSettings } from '../../types/canvas';
import { GOOGLE_FONTS } from '../../constants/fonts';
import { applyImageFilters } from '../../utils/imageFilters';
import { 
  alignObject, 
  bringForward, 
  sendBackward, 
  bringToFront, 
  sendToBack, 
  toggleLock, 
  duplicateActiveObject, 
  deleteActiveObject,
  groupSelectedObjects,
  ungroupSelectedObject,
  distributeObjects
} from '../../utils/fabricHelpers';

interface ContextualToolbarProps {
  canvas: fabric.Canvas | null;
  selectedObject: ObjectProperties | null;
}

export const ContextualToolbar: React.FC<ContextualToolbarProps> = ({ canvas, selectedObject }) => {
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showTextEffectsMenu, setShowTextEffectsMenu] = useState(false);
  const [showImageFiltersMenu, setShowImageFiltersMenu] = useState(false);

  // Image filter state values
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(false);

  if (!canvas || !selectedObject) {
    return (
      <div className="h-10 bg-canva-panel border-b border-canva-border px-4 flex items-center justify-between text-xs text-gray-400 select-none">
        <span>Click any element on the canvas to edit properties</span>
        <span className="text-[11px] text-gray-500 font-mono">Select Tool</span>
      </div>
    );
  }

  const activeObj = canvas.getActiveObject();

  // Fill Color
  const handleColorChange = (color: string) => {
    if (!activeObj) return;
    activeObj.set('fill', color);
    canvas.requestRenderAll();
  };

  // Stroke Color & Width
  const handleStrokeColorChange = (color: string) => {
    if (!activeObj) return;
    activeObj.set('stroke', color);
    canvas.requestRenderAll();
  };

  const handleStrokeWidthChange = (width: number) => {
    if (!activeObj) return;
    activeObj.set('strokeWidth', width);
    canvas.requestRenderAll();
  };

  // Font family & size
  const handleFontFamilyChange = (fontFamily: string) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('fontFamily', fontFamily);
    canvas.requestRenderAll();
  };

  const handleFontSizeChange = (size: number) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('fontSize', Math.max(8, size));
    canvas.requestRenderAll();
  };

  // Letter Spacing (Tracking) & Line Height (Leading)
  const handleCharSpacingChange = (charSpacing: number) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('charSpacing', charSpacing);
    canvas.requestRenderAll();
  };

  const handleLineHeightChange = (lineHeight: number) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('lineHeight', lineHeight);
    canvas.requestRenderAll();
  };

  // Text Background Pill Highlight Color
  const handleTextBackgroundChange = (color: string) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('textBackgroundColor', color);
    canvas.requestRenderAll();
  };

  // Text Formatting Toggles
  const handleToggleBold = () => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    const current = (activeObj as fabric.IText).fontWeight;
    (activeObj as fabric.IText).set('fontWeight', current === 'bold' || current === 700 ? 'normal' : 'bold');
    canvas.requestRenderAll();
  };

  const handleToggleItalic = () => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    const current = (activeObj as fabric.IText).fontStyle;
    (activeObj as fabric.IText).set('fontStyle', current === 'italic' ? 'normal' : 'italic');
    canvas.requestRenderAll();
  };

  const handleToggleUnderline = () => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    const current = (activeObj as fabric.IText).underline;
    (activeObj as fabric.IText).set('underline', !current);
    canvas.requestRenderAll();
  };

  const handleTextAlign = (align: 'left' | 'center' | 'right') => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('textAlign', align);
    canvas.requestRenderAll();
  };

  const handleOpacityChange = (opacity: number) => {
    if (!activeObj) return;
    activeObj.set('opacity', opacity);
    canvas.requestRenderAll();
  };

  // Image Filter Changes
  const handleFilterUpdate = (newSettings: Partial<ImageFilterSettings>) => {
    if (!activeObj || activeObj.type !== 'image') return;
    const updated = {
      brightness: newSettings.brightness !== undefined ? newSettings.brightness : brightness,
      contrast: newSettings.contrast !== undefined ? newSettings.contrast : contrast,
      saturation: newSettings.saturation !== undefined ? newSettings.saturation : saturation,
      blur: newSettings.blur !== undefined ? newSettings.blur : blur,
      grayscale: newSettings.grayscale !== undefined ? newSettings.grayscale : grayscale,
      sepia: false,
    };
    if (newSettings.brightness !== undefined) setBrightness(newSettings.brightness);
    if (newSettings.contrast !== undefined) setContrast(newSettings.contrast);
    if (newSettings.saturation !== undefined) setSaturation(newSettings.saturation);
    if (newSettings.blur !== undefined) setBlur(newSettings.blur);
    if (newSettings.grayscale !== undefined) setGrayscale(newSettings.grayscale);

    applyImageFilters(activeObj as fabric.Image, updated);
  };

  return (
    <div className="h-10 bg-canva-panel border-b border-canva-border px-4 flex items-center justify-between text-xs select-none z-20 overflow-x-auto scrollbar-none">
      {/* Left Group: Dynamic Object Properties */}
      <div className="flex items-center space-x-3">
        {/* Fill Color */}
        <div className="flex items-center space-x-1.5" title="Fill Color">
          <label className="text-[11px] text-gray-400 font-medium">Color</label>
          <input
            type="color"
            value={typeof selectedObject.fill === 'string' && selectedObject.fill.startsWith('#') ? selectedObject.fill : '#8b3dff'}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border border-canva-border bg-transparent p-0"
          />
        </div>

        <div className="h-4 w-px bg-canva-border" />

        {/* Text Specific Properties */}
        {selectedObject.type === 'i-text' && (
          <>
            <select
              value={selectedObject.fontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
              className="bg-canva-sidebar border border-canva-border text-gray-200 px-2 py-1 rounded text-xs focus:outline-none focus:ring-1 focus:ring-canva-purple max-w-[130px]"
            >
              {GOOGLE_FONTS.map((f) => (
                <option key={f.family} value={f.family} style={{ fontFamily: f.family }}>
                  {f.name}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-1 bg-canva-sidebar border border-canva-border rounded px-1 py-0.5">
              <button
                onClick={() => handleFontSizeChange(selectedObject.fontSize - 2)}
                className="p-1 hover:bg-canva-hover rounded text-gray-300"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-mono font-medium text-gray-200">
                {selectedObject.fontSize}
              </span>
              <button
                onClick={() => handleFontSizeChange(selectedObject.fontSize + 2)}
                className="p-1 hover:bg-canva-hover rounded text-gray-300"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center space-x-0.5 border-l border-r border-canva-border px-2">
              <button
                onClick={handleToggleBold}
                className={`p-1.5 rounded transition-colors ${
                  selectedObject.fontWeight === 'bold' || selectedObject.fontWeight === 700
                    ? 'bg-canva-purple text-white'
                    : 'hover:bg-canva-hover text-gray-300'
                }`}
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleToggleItalic}
                className={`p-1.5 rounded transition-colors ${
                  selectedObject.fontStyle === 'italic'
                    ? 'bg-canva-purple text-white'
                    : 'hover:bg-canva-hover text-gray-300'
                }`}
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleToggleUnderline}
                className={`p-1.5 rounded transition-colors ${
                  selectedObject.underline
                    ? 'bg-canva-purple text-white'
                    : 'hover:bg-canva-hover text-gray-300'
                }`}
                title="Underline"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Rich Text Spacing & Pill Background Menu */}
            <div className="relative">
              <button
                onClick={() => setShowTextEffectsMenu(!showTextEffectsMenu)}
                className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-canva-hover text-gray-300 transition-colors border border-canva-border"
                title="Text Spacing & Background Pill"
              >
                <Sliders className="w-3.5 h-3.5 text-canva-teal" />
                <span>Text Spacing</span>
              </button>

              {showTextEffectsMenu && (
                <div className="absolute left-0 top-8 bg-canva-panel border border-canva-border rounded-xl shadow-xl p-3.5 w-64 z-50 text-gray-200 space-y-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Letter Spacing (Tracking)</label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      onChange={(e) => handleCharSpacingChange(Number(e.target.value))}
                      className="w-full h-1 bg-canva-sidebar rounded appearance-none accent-canva-teal cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Line Height (Leading)</label>
                    <input
                      type="range"
                      min="0.8"
                      max="3.0"
                      step="0.1"
                      onChange={(e) => handleLineHeightChange(Number(e.target.value))}
                      className="w-full h-1 bg-canva-sidebar rounded appearance-none accent-canva-teal cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-canva-border">
                    <span className="text-[11px] text-gray-400">Background Pill</span>
                    <input
                      type="color"
                      onChange={(e) => handleTextBackgroundChange(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border border-canva-border bg-transparent p-0"
                      title="Set Text Background Pill Highlight"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Image Filter Studio Menu */}
        {selectedObject.type === 'image' && (
          <div className="relative">
            <button
              onClick={() => setShowImageFiltersMenu(!showImageFiltersMenu)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded hover:bg-canva-hover text-canva-teal transition-colors border border-canva-teal/50 font-semibold"
            >
              <Aperture className="w-3.5 h-3.5" />
              <span>Magic Image Filters</span>
            </button>

            {showImageFiltersMenu && (
              <div className="absolute left-0 top-8 bg-canva-panel border border-canva-border rounded-xl shadow-2xl p-4 w-72 z-50 text-gray-200 space-y-3">
                <h4 className="font-bold text-xs text-white border-b border-canva-border pb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-canva-teal" />
                  <span>Image Adjustments</span>
                </h4>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-300 mb-1">
                    <span className="flex items-center space-x-1"><Sun className="w-3 h-3 text-amber-400" /> <span>Brightness</span></span>
                    <span className="font-mono text-canva-teal">{brightness.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="-0.8"
                    max="0.8"
                    step="0.05"
                    value={brightness}
                    onChange={(e) => handleFilterUpdate({ brightness: Number(e.target.value) })}
                    className="w-full h-1 bg-canva-sidebar rounded appearance-none accent-canva-teal cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-300 mb-1">
                    <span className="flex items-center space-x-1"><Contrast className="w-3 h-3 text-blue-400" /> <span>Contrast</span></span>
                    <span className="font-mono text-canva-teal">{contrast.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="-0.8"
                    max="0.8"
                    step="0.05"
                    value={contrast}
                    onChange={(e) => handleFilterUpdate({ contrast: Number(e.target.value) })}
                    className="w-full h-1 bg-canva-sidebar rounded appearance-none accent-canva-teal cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-300 mb-1">
                    <span>Blur Effect</span>
                    <span className="font-mono text-canva-teal">{blur.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.02"
                    value={blur}
                    onChange={(e) => handleFilterUpdate({ blur: Number(e.target.value) })}
                    className="w-full h-1 bg-canva-sidebar rounded appearance-none accent-canva-teal cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-canva-border flex items-center justify-between">
                  <span className="text-[11px] text-gray-300">Grayscale Filter</span>
                  <input
                    type="checkbox"
                    checked={grayscale}
                    onChange={(e) => handleFilterUpdate({ grayscale: e.target.checked })}
                    className="w-4 h-4 rounded accent-canva-teal cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stroke / Border */}
        <div className="flex items-center space-x-2">
          <label className="text-[11px] text-gray-400 font-medium">Border</label>
          <input
            type="color"
            value={selectedObject.stroke || '#000000'}
            onChange={(e) => handleStrokeColorChange(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-canva-border bg-transparent p-0"
          />
          <input
            type="range"
            min="0"
            max="20"
            value={selectedObject.strokeWidth || 0}
            onChange={(e) => handleStrokeWidthChange(Number(e.target.value))}
            className="w-16 h-1 bg-canva-border rounded appearance-none cursor-pointer accent-canva-purple"
          />
        </div>

        {/* Opacity */}
        <div className="flex items-center space-x-2 border-l border-canva-border pl-3">
          <label className="text-[11px] text-gray-400 font-medium">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={selectedObject.opacity}
            onChange={(e) => handleOpacityChange(Number(e.target.value))}
            className="w-16 h-1 bg-canva-border rounded appearance-none cursor-pointer accent-canva-purple"
          />
          <span className="text-[11px] font-mono text-gray-400">
            {Math.round(selectedObject.opacity * 100)}%
          </span>
        </div>
      </div>

      {/* Right Group: Grouping, Distribution, Layers & Delete */}
      <div className="flex items-center space-x-2">
        {/* Multi-Selection Grouping & Distribution */}
        {selectedObject.type === 'activeSelection' && (
          <div className="flex items-center space-x-1 border-r border-canva-border pr-2">
            <button
              onClick={() => groupSelectedObjects(canvas)}
              className="flex items-center space-x-1 px-2 py-1 rounded bg-canva-purple hover:bg-canva-purple-hover text-white transition-colors text-[11px] font-semibold"
              title="Group Selected Objects (Ctrl+G)"
            >
              <Group className="w-3.5 h-3.5" />
              <span>Group</span>
            </button>
            <button
              onClick={() => distributeObjects(canvas, 'horizontal')}
              className="p-1.5 rounded hover:bg-canva-hover text-gray-300"
              title="Distribute Objects Horizontally"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {selectedObject.type === 'group' && (
          <button
            onClick={() => ungroupSelectedObject(canvas)}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-canva-teal text-gray-950 font-bold transition-colors text-[11px]"
            title="Ungroup Object (Ctrl+Shift+G)"
          >
            <Ungroup className="w-3.5 h-3.5" />
            <span>Ungroup</span>
          </button>
        )}

        {/* Position Menu */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-canva-hover text-gray-300 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Position</span>
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 top-8 bg-canva-panel border border-canva-border rounded-lg shadow-xl py-1.5 w-44 z-50 text-gray-200">
              <button
                onClick={() => { bringToFront(canvas); setShowLayerMenu(false); }}
                className="w-full px-3 py-1.5 text-left hover:bg-canva-hover flex items-center space-x-2"
              >
                <ChevronsUp className="w-3.5 h-3.5 text-canva-teal" />
                <span>Bring to Front</span>
              </button>
              <button
                onClick={() => { bringForward(canvas); setShowLayerMenu(false); }}
                className="w-full px-3 py-1.5 text-left hover:bg-canva-hover flex items-center space-x-2"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Bring Forward</span>
              </button>
              <button
                onClick={() => { sendBackward(canvas); setShowLayerMenu(false); }}
                className="w-full px-3 py-1.5 text-left hover:bg-canva-hover flex items-center space-x-2"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Send Backward</span>
              </button>
              <button
                onClick={() => { sendToBack(canvas); setShowLayerMenu(false); }}
                className="w-full px-3 py-1.5 text-left hover:bg-canva-hover flex items-center space-x-2"
              >
                <ChevronsDown className="w-3.5 h-3.5 text-canva-teal" />
                <span>Send to Back</span>
              </button>
            </div>
          )}
        </div>

        {/* Lock */}
        <button
          onClick={() => toggleLock(canvas)}
          className={`p-1.5 rounded transition-colors ${
            selectedObject.isLocked
              ? 'bg-amber-500/20 text-amber-400'
              : 'hover:bg-canva-hover text-gray-300'
          }`}
        >
          {selectedObject.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>

        {/* Duplicate */}
        <button
          onClick={() => duplicateActiveObject(canvas)}
          className="p-1.5 rounded hover:bg-canva-hover text-gray-300 transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          onClick={() => deleteActiveObject(canvas)}
          className="p-1.5 rounded hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
