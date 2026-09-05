import React, { useState } from 'react';
import { Palette, Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { loginUser } from '../../utils/auth';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = loginUser(username, password);
    if (res.success) {
      onLoginSuccess();
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-canva-bg text-gray-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-canva-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-canva-teal/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-canva-panel border border-canva-border rounded-3xl shadow-2xl overflow-hidden p-8 z-10 space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-canva-purple via-canva-teal to-blue-500 flex items-center justify-center shadow-xl shadow-canva-purple/30 mb-2">
            <Palette className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-canva-teal bg-clip-text text-transparent tracking-tight">
            DocMaster Studio
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            Single-User Secure Access • Session Token Expires in 30 Min
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (Aish30)"
                required
                className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-canva-sidebar border border-canva-border rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-canva-teal font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-canva-purple to-canva-purple-hover hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-canva-purple/30 flex items-center justify-center space-x-2 transform hover:scale-[1.01]"
          >
            <span>Sign In to Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer Badge */}
        <div className="pt-4 border-t border-canva-border flex items-center justify-center space-x-2 text-[11px] text-gray-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-canva-teal" />
          <span>Protected Session (30 Min Auto-Expire)</span>
        </div>
      </div>
    </div>
  );
};
