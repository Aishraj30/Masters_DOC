import React, { useState } from 'react';
import { fabric } from 'fabric';
import { QrCode, Sparkles, Link, Plus } from 'lucide-react';
import { addQrCodeToCanvas } from '../../../utils/qrGenerator';

interface QRCodePanelProps {
  canvas: fabric.Canvas | null;
}

export const QRCodePanel: React.FC<QRCodePanelProps> = ({ canvas }) => {
  const [qrText, setQrText] = useState('https://docmaster.app');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  if (!canvas) return null;

  const handleGenerate = () => {
    addQrCodeToCanvas(canvas, qrText, fgColor, bgColor);
  };

  const previewUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText || 'https://docmaster.app')}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <QrCode className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">QR Code Generator</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Create scannable vector QR codes for business cards, flyers, and menus.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* URL / Text Input */}
        <div>
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2">
            Target URL or Text
          </label>
          <div className="relative">
            <Link className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="https://yourwebsite.com or text..."
              className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-mono"
            />
          </div>
        </div>

        {/* Color Controls */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-canva-sidebar border border-canva-border p-2.5 rounded-xl space-y-1">
            <span className="text-[10px] text-gray-400 font-medium block">QR Color</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border border-canva-border bg-transparent p-0"
              />
              <span className="text-xs font-mono text-gray-200">{fgColor}</span>
            </div>
          </div>

          <div className="bg-canva-sidebar border border-canva-border p-2.5 rounded-xl space-y-1">
            <span className="text-[10px] text-gray-400 font-medium block">Background</span>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border border-canva-border bg-transparent p-0"
              />
              <span className="text-xs font-mono text-gray-200">{bgColor}</span>
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="bg-canva-sidebar border border-canva-border rounded-xl p-4 flex flex-col items-center justify-center space-y-2">
          <span className="text-[10px] text-canva-teal uppercase tracking-wider font-bold">Live QR Preview</span>
          <div className="p-2 bg-white rounded-lg shadow-md border border-gray-200">
            <img
              src={previewUrl}
              alt="QR Preview"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>

        {/* Insert Button */}
        <button
          onClick={handleGenerate}
          disabled={!qrText.trim()}
          className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/20 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Insert QR Code to Canvas</span>
        </button>
      </div>
    </div>
  );
};
