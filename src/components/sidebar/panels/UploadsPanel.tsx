import React, { useRef, useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { UploadCloud, Camera, Plus, X, Check, RotateCcw, FlipHorizontal, AlertCircle, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { addImageFromFile, addImageFromUrl } from '../../../utils/fabricHelpers';
import { UserProfile } from '../../../utils/auth';

interface UploadsPanelProps {
  canvas: fabric.Canvas | null;
  currentUser?: UserProfile | null;
}

export interface MediaItem {
  id?: string;
  url: string;
  filename?: string;
  source?: 'upload' | 'camera' | 'stock';
  isStock?: boolean;
}

const DEFAULT_STOCK_PHOTOS: MediaItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    filename: 'Abstract Gradient',
    source: 'stock',
    isStock: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=80',
    filename: 'Modern Art',
    source: 'stock',
    isStock: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    filename: 'Tropical Ocean',
    source: 'stock',
    isStock: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80',
    filename: 'Foggy Forest',
    source: 'stock',
    isStock: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80',
    filename: 'Circuit Board',
    source: 'stock',
    isStock: true,
  },
];

export const UploadsPanel: React.FC<UploadsPanelProps> = ({ canvas, currentUser }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Media items list (User media + stock photos)
  const [mediaList, setMediaList] = useState<MediaItem[]>(DEFAULT_STOCK_PHOTOS);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Camera Modal State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const snapshotCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Fetch saved user media on login / component mount
  useEffect(() => {
    if (currentUser?.id) {
      setIsLoadingMedia(true);
      fetch(`/api/media?userId=${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.media)) {
            const userMedia: MediaItem[] = data.media.map((m: any) => ({
              id: m.id,
              url: m.url,
              filename: m.filename,
              source: m.source || 'upload',
              isStock: false,
            }));
            setMediaList([...userMedia, ...DEFAULT_STOCK_PHOTOS]);
          }
        })
        .catch((err) => console.error('Error fetching user media:', err))
        .finally(() => setIsLoadingMedia(false));
    } else {
      setMediaList(DEFAULT_STOCK_PHOTOS);
    }
  }, [currentUser?.id]);

  // Camera Management Helpers
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera access denied. Please grant browser camera permissions.'
          : 'Failed to access camera. Make sure a webcam is connected.'
      );
    }
  };

  useEffect(() => {
    if (!isCameraOpen) {
      stopCamera();
      setCapturedImage(null);
      setCameraError(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isCameraOpen, facingMode]);

  if (!canvas) return null;

  // Handle Local File Upload + Persist to DB/Cloudinary
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];

      // Add to canvas immediately
      addImageFromFile(canvas, file);

      // Read file to Base64 data URL
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        if (!base64Data) return;

        if (currentUser?.id) {
          setIsUploading(true);
          try {
            const res = await fetch('/api/media/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: currentUser.id,
                image: base64Data,
                filename: file.name,
                source: 'upload',
                mimeType: file.type,
                size: file.size,
              }),
            });
            const data = await res.json();
            if (data.success && data.media) {
              setMediaList((prev) => [
                {
                  id: data.media.id,
                  url: data.media.url,
                  filename: data.media.filename,
                  source: 'upload',
                  isStock: false,
                },
                ...prev,
              ]);
            }
          } catch (err) {
            console.error('Failed to upload file to backend:', err);
          } finally {
            setIsUploading(false);
          }
        } else {
          // Guest User mode
          setMediaList((prev) => [
            { url: base64Data, filename: file.name, source: 'upload', isStock: false },
            ...prev,
          ]);
        }
      };
      reader.readAsDataURL(file);

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Camera Snap Handler
  const handleTakeSnapshot = () => {
    if (!videoRef.current || !snapshotCanvasRef.current) return;
    const video = videoRef.current;
    const canvasEl = snapshotCanvasRef.current;

    canvasEl.width = video.videoWidth || 1280;
    canvasEl.height = video.videoHeight || 720;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    if (facingMode === 'user') {
      ctx.translate(canvasEl.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvasEl.width, canvasEl.height);
    const dataUrl = canvasEl.toDataURL('image/png');
    setCapturedImage(dataUrl);
    stopCamera();
  };

  // Confirm Camera Photo & Persist to DB
  const handleConfirmCameraImage = async () => {
    if (capturedImage && canvas) {
      addImageFromUrl(canvas, capturedImage);

      const timestampName = `Camera Photo (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;

      if (currentUser?.id) {
        setIsUploading(true);
        try {
          const res = await fetch('/api/media/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: currentUser.id,
              image: capturedImage,
              filename: timestampName,
              source: 'camera',
            }),
          });
          const data = await res.json();
          if (data.success && data.media) {
            setMediaList((prev) => [
              {
                id: data.media.id,
                url: data.media.url,
                filename: data.media.filename,
                source: 'camera',
                isStock: false,
              },
              ...prev,
            ]);
          }
        } catch (err) {
          console.error('Failed to save camera photo to backend:', err);
        } finally {
          setIsUploading(false);
        }
      } else {
        setMediaList((prev) => [
          { url: capturedImage, filename: timestampName, source: 'camera', isStock: false },
          ...prev,
        ]);
      }

      setIsCameraOpen(false);
      setCapturedImage(null);
    }
  };

  // Delete Media Item from DB
  const handleDeleteMedia = async (e: React.MouseEvent, item: MediaItem) => {
    e.stopPropagation();

    if (item.isStock) return;

    if (item.id && currentUser?.id) {
      try {
        await fetch(`/api/media/delete?id=${item.id}&userId=${currentUser.id}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete media item:', err);
      }
    }

    setMediaList((prev) => prev.filter((m) => m !== item && m.id !== item.id));
  };

  return (
    <div className="w-80 bg-canva-panel border-r border-canva-border flex flex-col h-full z-10 select-none">
      {/* Header */}
      <div className="p-4 border-b border-canva-border">
        <div className="flex items-center space-x-2">
          <UploadCloud className="w-4 h-4 text-canva-teal" />
          <h2 className="font-bold text-sm text-white">Media Studio & Camera</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Upload custom images, snap photos with your camera, or pick free stock photos.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Action Buttons: Upload File & Camera Photo */}
        <div className="grid grid-cols-2 gap-3">
          {/* File Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="h-28 border-2 border-dashed border-canva-purple/50 hover:border-canva-teal rounded-xl bg-canva-sidebar hover:bg-canva-purple/10 flex flex-col items-center justify-center p-3 transition-all group cursor-pointer text-center relative overflow-hidden"
          >
            {isUploading ? (
              <Loader2 className="w-7 h-7 text-canva-teal animate-spin mb-1.5" />
            ) : (
              <UploadCloud className="w-7 h-7 text-canva-teal mb-1.5 group-hover:scale-110 transition-transform" />
            )}
            <span className="text-xs font-bold text-white">Upload Files</span>
            <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, SVG</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Camera Take Photo Button */}
          <button
            onClick={() => setIsCameraOpen(true)}
            className="h-28 border-2 border-dashed border-canva-teal/50 hover:border-canva-purple rounded-xl bg-canva-sidebar hover:bg-canva-teal/10 flex flex-col items-center justify-center p-3 transition-all group cursor-pointer text-center"
          >
            <Camera className="w-7 h-7 text-canva-purple mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-white">Use Camera</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Take Photo</span>
          </button>
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileChange}
            accept="image/*"
            capture="environment"
            className="hidden"
          />
        </div>

        {/* Media Gallery Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Recent Media & Photos</span>
              {isLoadingMedia && <Loader2 className="w-3 h-3 animate-spin text-canva-teal" />}
            </h3>
            <span className="text-[10px] text-canva-teal font-medium">Click to add</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {mediaList.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => addImageFromUrl(canvas, item.url)}
                className="group relative h-28 rounded-xl overflow-hidden border border-canva-border hover:border-canva-purple cursor-pointer shadow-md transition-all transform hover:scale-[1.02]"
              >
                <img
                  src={item.url}
                  alt={item.filename || `Media ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Badge for source */}
                {item.source === 'camera' && (
                  <span className="absolute top-1.5 left-1.5 bg-canva-purple/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    Camera
                  </span>
                )}

                {/* Hover overlay with (+) and Delete buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-canva-purple text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Plus className="w-4 h-4" />
                  </div>

                  {!item.isStock && (
                    <button
                      onClick={(e) => handleDeleteMedia(e, item)}
                      className="w-8 h-8 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg hover:bg-rose-700 hover:scale-110 transition-transform"
                      title="Delete saved media"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Camera Capture Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
          <div className="bg-canva-panel border border-canva-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-canva-border flex items-center justify-between bg-canva-sidebar">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-canva-teal" />
                <div>
                  <h2 className="font-bold text-sm text-white">Live Camera Capture</h2>
                  <p className="text-[11px] text-gray-400">Snap a photo to insert directly onto your canvas</p>
                </div>
              </div>
              <button
                onClick={() => setIsCameraOpen(false)}
                className="p-1.5 rounded-lg hover:bg-canva-hover text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewfinder Body */}
            <div className="p-4 bg-canva-bg flex flex-col items-center justify-center relative min-h-[300px]">
              {cameraError ? (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <AlertCircle className="w-10 h-10 text-rose-500" />
                  <p className="text-xs font-semibold text-rose-300">{cameraError}</p>
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-4 py-2 bg-canva-purple text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    Use Device Native Camera App
                  </button>
                </div>
              ) : capturedImage ? (
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-canva-teal/50 shadow-inner bg-black flex items-center justify-center">
                  <img
                    src={capturedImage}
                    alt="Captured Snapshot"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-canva-border bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                  />

                  {/* Switch Camera Button */}
                  <button
                    onClick={() => setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))}
                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full border border-white/20 transition-all"
                    title="Switch Camera (Front / Back)"
                  >
                    <FlipHorizontal className="w-4 h-4" />
                  </button>
                </div>
              )}

              <canvas ref={snapshotCanvasRef} className="hidden" />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-canva-sidebar border-t border-canva-border flex items-center justify-between">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:bg-canva-hover transition-colors"
              >
                Cancel
              </button>

              {capturedImage ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setCapturedImage(null);
                      startCamera();
                    }}
                    className="px-4 py-2 bg-canva-panel border border-canva-border hover:bg-canva-hover text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Retake</span>
                  </button>
                  <button
                    onClick={handleConfirmCameraImage}
                    disabled={isUploading}
                    className="px-5 py-2 bg-gradient-to-r from-canva-purple to-canva-teal hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-lg shadow-canva-purple/30 transition-all flex items-center space-x-1.5"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    <span>Add to Canvas</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleTakeSnapshot}
                  disabled={!!cameraError}
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-gray-950 bg-canva-teal hover:bg-canva-teal/90 shadow-lg shadow-canva-teal/20 transition-all flex items-center space-x-2 ${
                    cameraError ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
