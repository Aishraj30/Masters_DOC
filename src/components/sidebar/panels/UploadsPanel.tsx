import React, { useRef, useState } from 'react';
import { fabric } from 'fabric';
import { UploadCloud, Image as ImageIcon, Plus } from 'lucide-react';
import { addImageFromFile, addImageFromUrl } from '../../../utils/fabricHelpers';

interface UploadsPanelProps {
  canvas: fabric.Canvas | null;
}

export const UploadsPanel: React.FC<UploadsPanelProps> = ({ canvas }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80',
  ]);

  if (!canvas) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      addImageFromFile(canvas, file);

      // Add to recent gallery list
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [event.target?.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <UploadCloud className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Media Studio & Uploads</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Upload custom images from your computer or pick free stock photos.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Upload Button Box */}
        <div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-28 border-2 border-dashed border-canva-purple/50 hover:border-canva-teal rounded-xl bg-canva-sidebar hover:bg-canva-purple/10 flex flex-col items-center justify-center p-4 transition-all group cursor-pointer"
          >
            <UploadCloud className="w-8 h-8 text-canva-teal mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white">Upload Files</span>
            <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, SVG, WebP supported</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Stock Photos / Recent Uploads Gallery */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Free Stock Images
            </h3>
            <span className="text-[10px] text-canva-teal font-medium">Click to add</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {uploadedImages.map((url, idx) => (
              <div
                key={idx}
                onClick={() => addImageFromUrl(canvas, url)}
                className="group relative h-28 rounded-xl overflow-hidden border border-canva-border hover:border-canva-purple cursor-pointer shadow-md transition-all transform hover:scale-[1.02]"
              >
                <img
                  src={url}
                  alt={`Upload ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-canva-purple text-white flex items-center justify-center shadow-lg">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
