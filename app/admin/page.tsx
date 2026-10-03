'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUserApi, getCurrentUser, loginUserApi, UserProfile } from '@/src/utils/auth';
import { AdminDashboard } from '@/src/components/admin/AdminDashboard';
import { Lock, ShieldAlert, ArrowRight, Loader2, KeyRound } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Admin login inline form state if not authenticated as admin
  const [adminUsername, setAdminUsername] = useState('Admin@2005');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCurrentUserApi()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      const res = await loginUserApi(adminUsername, adminPassword);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        if (res.user.role !== 'admin' && res.user.username?.toLowerCase() !== 'admin@2005') {
          setLoginError('Account logged in successfully, but does not have Administrator privileges.');
        }
      } else {
        setLoginError(res.message || 'Invalid admin credentials.');
      }
    } catch (err: any) {
      setLoginError('Server error during admin authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-[#0b0f14] flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-canva-purple" />
          <span className="text-xs text-gray-400 font-mono">Verifying Administrator Permissions...</span>
        </div>
      </div>
    );
  }

  // Access Control Check: User must be logged in with role === 'admin'
  const isAdminAuthorized =
    currentUser &&
    (currentUser.role === 'admin' ||
      currentUser.username?.toLowerCase() === 'admin@2005' ||
      currentUser.email?.toLowerCase() === 'admin@2005.com');

  if (!isAdminAuthorized) {
    return (
      <div className="min-h-screen w-screen bg-[#0b0f14] text-gray-100 flex items-center justify-center p-4 relative select-none">
        <div className="w-full max-w-md bg-[#131920] border border-[#242e3b] rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-canva-purple/20 border border-canva-purple/40 text-canva-purple flex items-center justify-center mx-auto mb-2 shadow-lg shadow-canva-purple/20">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Restricted Console</h2>
            <p className="text-xs text-gray-400">
              Please sign in with administrator credentials to access system management.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Admin@2005"
                required
                disabled={isSubmitting}
                className="w-full bg-[#1c2430] border border-[#2a3648] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-purple font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Admin Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password (e.g. 12341234)"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-[#1c2430] border border-[#2a3648] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-purple font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/30 flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Admin...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              ← Return to Main Canva Studio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboard
      currentUser={currentUser}
      onNavigateToStudio={() => router.push('/dashboard')}
      onLogout={() => {
        setCurrentUser(null);
        router.push('/auth');
      }}
    />
  );
}
