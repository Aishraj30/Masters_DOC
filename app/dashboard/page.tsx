'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCurrentUserApi, logoutUser, UserProfile } from '@/src/utils/auth';
import { createNewProject } from '@/src/utils/projectsStorage';

const Dashboard = dynamic(() => import('@/src/components/dashboard/Dashboard').then(m => m.Dashboard), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-[#0e1318] flex items-center justify-center text-white font-medium">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-canva-teal border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-gray-400 font-mono">Loading Dashboard...</span>
      </div>
    </div>
  ),
});

export default function DashboardRoutePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUserApi().then((user) => {
      if (user) {
        setCurrentUser(user);
        if (
          user.role === 'admin' ||
          user.username?.toLowerCase() === 'admin@2005' ||
          user.email?.toLowerCase() === 'admin@2005.com'
        ) {
          router.push('/admin');
          return;
        }
      } else {
        router.push('/auth');
      }
      setIsLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    router.push('/');
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?id=${projectId}`);
  };

  const handleCreateNewProject = (preset?: any, title?: string) => {
    if (!currentUser) return;
    const newProj = createNewProject(currentUser.id, title || 'Untitled Project', preset);
    router.push(`/editor?id=${newProj.id}`);
  };

  if (isLoading || !currentUser) {
    return (
      <div className="h-screen w-screen bg-[#0e1318] flex items-center justify-center text-white font-medium">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-canva-teal border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-gray-400 font-mono">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <Dashboard
      currentUser={currentUser}
      onLogout={handleLogout}
      onOpenProject={handleOpenProject}
      onCreateNewProject={handleCreateNewProject}
    />
  );
}
