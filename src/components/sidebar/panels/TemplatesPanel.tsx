import React from 'react';
import { fabric } from 'fabric';
import { PREBUILT_TEMPLATES } from '../../../constants/templates';
import { PrebuiltTemplate } from '../../../types/canvas';
import { Sparkles, Layout } from 'lucide-react';

interface TemplatesPanelProps {
  canvas: fabric.Canvas | null;
  onApplyTemplate: (template: PrebuiltTemplate) => void;
}

export const TemplatesPanel: React.FC<TemplatesPanelProps> = ({ canvas, onApplyTemplate }) => {
  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Starter Templates</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Click any design to load editable vector elements into your canvas.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {PREBUILT_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onApplyTemplate(tmpl)}
              className="group cursor-pointer bg-canva-sidebar border border-canva-border hover:border-canva-purple rounded-xl overflow-hidden shadow-md hover:shadow-canva-purple/20 transition-all transform hover:-translate-y-0.5"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={tmpl.thumbnail}
                  alt={tmpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-2 left-2.5 text-[10px] font-semibold text-canva-teal uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {tmpl.category}
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xs text-white group-hover:text-canva-teal transition-colors">
                    {tmpl.title}
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    {tmpl.width} × {tmpl.height} px
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full bg-canva-hover group-hover:bg-canva-purple flex items-center justify-center transition-colors">
                  <Layout className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
