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
  Palette,
  Minus,
  Plus
} from 'lucide-react';
import { ObjectProperties } from '../../types/canvas';
import { GOOGLE_FONTS } from '../../constants/fonts';
import { 
  alignObject, 
  bringForward, 
  sendBackward, 
  bringToFront, 
  sendToBack, 
  toggleLock, 
  duplicateActiveObject, 
  deleteActiveObject 
} from '../../utils/fabricHelpers';

interface ContextualToolbarProps {
  canvas: fabric.Canvas | null;
  selectedObject: ObjectProperties | null;
}

export const ContextualToolbar: React.FC<ContextualToolbarProps> = ({ canvas, selectedObject }) => {
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [showAlignMenu, setShowAlignMenu] = useState(false);

  if (!canvas || !selectedObject) {
    return (
      <div className="h-10 bg-canva-panel border-b border-canva-border px-4 flex items-center justify-between text-xs text-gray-400 select-none">
        <span>Click any element on the canvas to edit properties</span>
        <span className="text-[11px] text-gray-500 font-mono">Select Tool</span>
      </div>
    );
  }

  const activeObj = canvas.getActiveObject();

  // Color change handler
  const handleColorChange = (color: string) => {
    if (!activeObj) return;
    activeObj.set('fill', color);
    canvas.requestRenderAll();
  };

  // Stroke color change handler
  const handleStrokeColorChange = (color: string) => {
    if (!activeObj) return;
    activeObj.set('stroke', color);
    canvas.requestRenderAll();
  };

  // Stroke width handler
  const handleStrokeWidthChange = (width: number) => {
    if (!activeObj) return;
    activeObj.set('strokeWidth', width);
    canvas.requestRenderAll();
  };

  // Font family change handler
  const handleFontFamilyChange = (fontFamily: string) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('fontFamily', fontFamily);
    canvas.requestRenderAll();
  };

  // Font size change handler
  const handleFontSizeChange = (size: number) => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('fontSize', Math.max(8, size));
    canvas.requestRenderAll();
  };

  // Toggle Bold
  const handleToggleBold = () => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    const current = (activeObj as fabric.IText).fontWeight;
    (activeObj as fabric.IText).set('fontWeight', current === 'bold' || current === 700 ? 'normal' : 'bold');
    canvas.requestRenderAll();
  };

  // Toggle Italic
  const handleToggleItalic = () => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    const current = (activeObj as fabric.IText).fontStyle;
    (activeObj as fabric.IText).set('fontStyle', current === 'italic' ? 'normal' : 'italic');
    canvas.requestRenderAll();
  };

  // Toggle Underline
  const handleToggleUnderline = () => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    const current = (activeObj as fabric.IText).underline;
    (activeObj as fabric.IText).set('underline', !current);
    canvas.requestRenderAll();
  };

  // Text Alignment
  const handleTextAlign = (align: 'left' | 'center' | 'right') => {
    if (!activeObj || activeObj.type !== 'i-text') return;
    (activeObj as fabric.IText).set('textAlign', align);
    canvas.requestRenderAll();
  };

  // Opacity change handler
  const handleOpacityChange = (opacity: number) => {
    if (!activeObj) return;
    activeObj.set('opacity', opacity);
    canvas.requestRenderAll();
  };

  return (
    <div className="h-10 bg-canva-panel border-b border-canva-border px-4 flex items-center justify-between text-xs select-none z-20 overflow-x-auto scrollbar-none">
      {/* Left Group: Object Type Specific Tools */}
      <div className="flex items-center space-x-3">
        {/* Color Fill Picker */}
        <div className="flex items-center space-x-1.5" title="Fill Color">
          <label className="text-[11px] text-gray-400 font-medium">Color</label>
          <div className="relative flex items-center">
            <input
              type="color"
              value={typeof selectedObject.fill === 'string' && selectedObject.fill.startsWith('#') ? selectedObject.fill : '#8b3dff'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-canva-border bg-transparent p-0"
            />
          </div>
        </div>

        <div className="h-4 w-px bg-canva-border" />

        {/* Text Specific Properties */}
        {selectedObject.type === 'i-text' && (
          <>
            {/* Font Family Dropdown */}
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

            {/* Font Size Selector */}
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

            {/* Formatting Toggles */}
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

            {/* Text Alignment */}
            <div className="flex items-center space-x-0.5">
              <button
                onClick={() => handleTextAlign('left')}
                className={`p-1.5 rounded ${selectedObject.textAlign === 'left' ? 'bg-canva-purple text-white' : 'hover:bg-canva-hover text-gray-300'}`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleTextAlign('center')}
                className={`p-1.5 rounded ${selectedObject.textAlign === 'center' ? 'bg-canva-purple text-white' : 'hover:bg-canva-hover text-gray-300'}`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleTextAlign('right')}
                className={`p-1.5 rounded ${selectedObject.textAlign === 'right' ? 'bg-canva-purple text-white' : 'hover:bg-canva-hover text-gray-300'}`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}

        {/* Stroke / Border Settings */}
        <div className="flex items-center space-x-2">
          <label className="text-[11px] text-gray-400 font-medium">Border</label>
          <input
            type="color"
            value={selectedObject.stroke || '#000000'}
            onChange={(e) => handleStrokeColorChange(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-canva-border bg-transparent p-0"
            title="Stroke Color"
          />
          <input
            type="range"
            min="0"
            max="20"
            value={selectedObject.strokeWidth || 0}
            onChange={(e) => handleStrokeWidthChange(Number(e.target.value))}
            className="w-16 h-1 bg-canva-border rounded appearance-none cursor-pointer accent-canva-purple"
            title="Stroke Width"
          />
        </div>

        {/* Opacity Slider */}
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

      {/* Right Group: Position, Layers, Duplicate & Delete */}
      <div className="flex items-center space-x-2">
        {/* Layer Hierarchy Menu */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-canva-hover text-gray-300 transition-colors"
            title="Position & Layers"
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
              
              <div className="my-1 border-t border-canva-border" />
              
              <div className="px-3 py-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Align to Page
              </div>
              <div className="grid grid-cols-2 gap-1 px-2 py-1">
                <button
                  onClick={() => { alignObject(canvas, 'left'); setShowLayerMenu(false); }}
                  className="px-2 py-1 bg-canva-sidebar hover:bg-canva-hover rounded text-center"
                >
                  Left
                </button>
                <button
                  onClick={() => { alignObject(canvas, 'center'); setShowLayerMenu(false); }}
                  className="px-2 py-1 bg-canva-sidebar hover:bg-canva-hover rounded text-center"
                >
                  Center
                </button>
                <button
                  onClick={() => { alignObject(canvas, 'right'); setShowLayerMenu(false); }}
                  className="px-2 py-1 bg-canva-sidebar hover:bg-canva-hover rounded text-center"
                >
                  Right
                </button>
                <button
                  onClick={() => { alignObject(canvas, 'middle'); setShowLayerMenu(false); }}
                  className="px-2 py-1 bg-canva-sidebar hover:bg-canva-hover rounded text-center"
                >
                  Middle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lock / Unlock */}
        <button
          onClick={() => toggleLock(canvas)}
          className={`p-1.5 rounded transition-colors ${
            selectedObject.isLocked
              ? 'bg-amber-500/20 text-amber-400'
              : 'hover:bg-canva-hover text-gray-300'
          }`}
          title={selectedObject.isLocked ? 'Unlock Object' : 'Lock Object'}
        >
          {selectedObject.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
        </button>

        {/* Duplicate */}
        <button
          onClick={() => duplicateActiveObject(canvas)}
          className="p-1.5 rounded hover:bg-canva-hover text-gray-300 transition-colors"
          title="Duplicate (Ctrl+D)"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          onClick={() => deleteActiveObject(canvas)}
          className="p-1.5 rounded hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors"
          title="Delete Object (Delete)"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
