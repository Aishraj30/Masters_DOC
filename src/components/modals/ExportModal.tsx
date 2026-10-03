import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { 
  X, 
  Download, 
  FileImage, 
  FileCode, 
  FileText, 
  CheckCircle2, 
  Presentation,
  ShieldAlert,
  Crown,
  Sparkles,
  Ticket
} from 'lucide-react';
import { exportCanvas, ExportFormat } from '../../utils/export';
import { CanvasPage } from '../../types/canvas';
import { UpgradeModal } from './UpgradeModal';

import { fetchCurrentUserApi, consumeOneTimePassApi } from '../../utils/auth';

interface ExportModalProps {
  canvas: fabric.Canvas | null;
  isOpen: boolean;
  onClose: () => void;
  designTitle: string;
  onExportSuccess?: (format: ExportFormat) => void;
  pages?: CanvasPage[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  canvas,
  isOpen,
  onClose,
  designTitle,
  onExportSuccess,
  pages,
}) => {
  const [format, setFormat] = useState<ExportFormat>('png');
  const [scale, setScale] = useState<number>(2);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Premium / Watermark Pass State
  const [isPro, setIsPro] = useState<boolean>(false);
  const [hasOneTimePass, setHasOneTimePass] = useState<boolean>(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);

  // Load Pro & Pass state from localStorage and sync live from MongoDB
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined') {
        setIsPro(localStorage.getItem('is_pro_user') === 'true');
        setHasOneTimePass(localStorage.getItem('has_onetime_pass') === 'true');
      }
      fetchCurrentUserApi().then((user) => {
        if (user) {
          setIsPro(!!user.isPro);
          setHasOneTimePass((user.oneTimePassesCount || 0) > 0);
        }
      });
    }
  }, [isOpen]);

  if (!isOpen || !canvas) return null;

  const handleFreeDownloadWithWatermark = async () => {
    setIsExporting(true);
    await exportCanvas(canvas, format, designTitle, scale, 0.95, pages, true, 'RESEARCH RADAR');
    setIsExporting(false);
    onClose();
    if (onExportSuccess) {
      onExportSuccess(format);
    }
  };

  const handleCleanHdDownload = async () => {
    // If user is Pro or has single pass, download cleanly immediately
    if (isPro || hasOneTimePass) {
      setIsExporting(true);
      await exportCanvas(canvas, format, designTitle, scale, 0.95, pages, false, 'RESEARCH RADAR');
      setIsExporting(false);

      // Consume one-time pass in database after single export
      if (hasOneTimePass && !isPro) {
        await consumeOneTimePassApi();
        setHasOneTimePass(false);
      }

      onClose();
      if (onExportSuccess) {
        onExportSuccess(format);
      }
    } else {
      // Open Upgrade Paywall Modal for free users
      setIsUpgradeModalOpen(true);
    }
  };

  const handleSelectOneTimePass = async () => {
    setIsUpgradeModalOpen(false);

    // Perform clean export
    setIsExporting(true);
    await exportCanvas(canvas, format, designTitle, scale, 0.95, pages, false, 'RESEARCH RADAR');
    setIsExporting(false);

    // Consume pass in database
    await consumeOneTimePassApi();
    setHasOneTimePass(false);

    onClose();
    if (onExportSuccess) {
      onExportSuccess(format);
    }
  };

  const handleSelectProSubscription = async () => {
    setIsPro(true);
    localStorage.setItem('is_pro_user', 'true');
    setIsUpgradeModalOpen(false);

    // Perform clean export
    setIsExporting(true);
    await exportCanvas(canvas, format, designTitle, scale, 0.95, pages, false, 'RESEARCH RADAR');
    setIsExporting(false);

    onClose();
    if (onExportSuccess) {
      onExportSuccess(format);
    }
  };

  const formatOptions = [
    {
      id: 'png' as ExportFormat,
      name: 'PNG Image',
      desc: 'High quality image with transparent background support.',
      icon: FileImage,
      badge: 'Best for Web',
    },
    {
      id: 'svg' as ExportFormat,
      name: 'SVG Vector',
      desc: 'Scalable vector graphic for IEEE/ACM LaTeX papers.',
      icon: FileCode,
      badge: 'LaTeX / Vector',
    },
    {
      id: 'pdf' as ExportFormat,
      name: 'PDF Document',
      desc: 'High resolution print-ready paper figure.',
      icon: FileText,
      badge: 'Paper Submission',
    },
    {
      id: 'pptx' as ExportFormat,
      name: 'PowerPoint (.pptx)',
      desc: 'Editable slide presentation for scientific talks.',
      icon: Presentation,
      badge: 'Presentation',
    },
    {
      id: 'jpeg' as ExportFormat,
      name: 'JPG Image',
      desc: 'Small file size ideal for quick preview sharing.',
      icon: FileImage,
      badge: 'Small Size',
    },
    {
      id: 'json' as ExportFormat,
      name: '.docmaster JSON Project',
      desc: 'Editable raw file to reload design state anytime.',
      icon: FileCode,
      badge: 'Editable Backup',
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
        <div className="bg-canva-panel border border-canva-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Modal Header */}
          <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-canva-teal" />
              <h2 className="font-bold text-base text-white">Export & Download Design</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-5 space-y-4 max-h-[72vh] overflow-y-auto bg-canva-bg">
            {/* File Format Selection */}
            <div>
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block mb-2.5">
                Select File Format
              </label>
              <div className="space-y-2">
                {formatOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = format === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormat(opt.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-canva-purple/20 border-canva-purple shadow-md'
                          : 'bg-canva-sidebar border-canva-border hover:bg-canva-hover'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-canva-purple text-white' : 'bg-canva-panel text-gray-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-xs text-white">{opt.name}</span>
                            <span className="text-[9px] bg-canva-panel text-canva-teal px-1.5 py-0.5 rounded font-mono">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-canva-teal" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scale Resolution Multiplier */}
            {(format === 'png' || format === 'jpeg' || format === 'pdf' || format === 'pptx') && (
              <div className="pt-2 border-t border-canva-border">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Quality & Scale Multiplier
                  </label>
                  <span className="text-xs font-mono text-canva-teal">{scale}x Resolution</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        scale === s
                          ? 'bg-canva-purple text-white border-canva-purple shadow'
                          : 'bg-canva-sidebar border-canva-border text-gray-400 hover:text-white'
                      }`}
                    >
                      {s}x ({s * (canvas.width || 1080)}px)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-canva-sidebar border-t border-canva-border space-y-2">
            {isPro ? (
              /* PRO USERS: Single Clean Download Button (No Watermark option & No One-Time Payment shown) */
              <button
                onClick={handleCleanHdDownload}
                disabled={isExporting}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-canva-purple to-canva-teal hover:opacity-95 text-white shadow-lg shadow-canva-purple/30 transition-all flex items-center justify-center space-x-2"
              >
                <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>{isExporting ? 'Exporting HD File...' : 'Download Clean HD File (Pro Member)'}</span>
              </button>
            ) : (
              /* FREE USERS: Option for Free Watermarked vs Clean HD (One-Time Pass or Pro Upgrade) */
              <>
                <div className="flex items-center justify-between gap-3">
                  {/* Free Download with Watermark */}
                  <button
                    onClick={handleFreeDownloadWithWatermark}
                    disabled={isExporting}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold bg-canva-panel hover:bg-canva-hover text-gray-300 border border-canva-border transition-colors flex items-center justify-center space-x-1.5"
                    title="Free Download with RESEARCH RADAR watermark"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    <span>Free (With Watermark)</span>
                  </button>

                  {/* Clean Download (No Watermark) */}
                  <button
                    onClick={handleCleanHdDownload}
                    disabled={isExporting}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-canva-purple hover:opacity-95 text-black shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center space-x-1.5"
                    title="Download clean HD without watermark"
                  >
                    <Crown className="w-3.5 h-3.5 text-black fill-black" />
                    <span>
                      {hasOneTimePass ? 'Use Pass & Download' : 'Clean HD (No Watermark)'}
                    </span>
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 text-center">
                  Free downloads include default <span className="text-gray-400 font-mono font-bold">RESEARCH RADAR</span> watermark.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Paywall Upgrade Modal for Free Users */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onSelectOneTimePass={handleSelectOneTimePass}
        onSelectProSubscription={handleSelectProSubscription}
      />
    </>
  );
};
