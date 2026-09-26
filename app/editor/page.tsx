'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('@/src/App'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-[#0e1318] flex items-center justify-center text-white font-medium">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-canva-purple border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-gray-400 font-mono">Loading Canvas Studio...</span>
      </div>
    </div>
  ),
});

export default function EditorRoutePage() {
  return <App initialView="editor" />;
}
