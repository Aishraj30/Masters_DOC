'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCurrentUserApi, UserProfile } from '@/src/utils/auth';

const LoginPage = dynamic(() => import('@/src/components/auth/LoginPage').then(m => m.LoginPage), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen bg-[#0e1318] flex items-center justify-center text-white font-medium">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-canva-purple border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-gray-400 font-mono">Loading authentication...</span>
      </div>
    </div>
  ),
});

export default function AuthRoutePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

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
        } else {
          router.push('/dashboard');
        }
      }
    });
  }, [router]);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (
      user.role === 'admin' ||
      user.username?.toLowerCase() === 'admin@2005' ||
      user.email?.toLowerCase() === 'admin@2005.com'
    ) {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}
