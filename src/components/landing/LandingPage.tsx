import React, { useState, useEffect } from 'react';
import {
  Palette,
  Sparkles,
  ArrowRight,
  Monitor,
  Layout,
  Instagram,
  FileText,
  Video,
  Presentation,
  CheckCircle2,
  Zap,
  Layers,
  Search,
  ChevronDown,
  Star,
  Shield,
  Download,
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
}

const FEATURE_CATEGORIES = [
  { id: 'presentations', label: 'Presentations', icon: Presentation, color: 'from-blue-500 to-indigo-600', desc: '16:9 Decks & Pitch Slides' },
  { id: 'social', label: 'Social Media', icon: Instagram, color: 'from-pink-500 to-rose-600', desc: 'Posts, Stories & Reels' },
  { id: 'docs', label: 'Documents', icon: FileText, color: 'from-emerald-500 to-teal-600', desc: 'A4 Reports & Resumes' },
  { id: 'video', label: 'Video & Motion', icon: Video, color: 'from-purple-500 to-violet-600', desc: 'Promo Reels & Clips' },
  { id: 'graphics', label: 'Custom Canvas', icon: Layout, color: 'from-amber-500 to-orange-600', desc: 'Posters, Logos & Banners' },
];

const BENIFITS = [
  'Drag-and-Drop Fabric Vector Canvas',
  'Export to PDF, PNG & PowerPoint (PPTX)',
  'Hundreds of Free Scientific & Design Templates',
  'Multi-Page Document & Presentation System',
];

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin, onOpenSignup }) => {
  const [activeCategory, setActiveCategory] = useState('presentations');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen w-full bg-[#0e1318] text-white flex flex-col font-sans select-none overflow-x-hidden overflow-y-auto">
      {/* Dynamic Background Glow Blobs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <nav className="w-full px-6 lg:px-12 py-4 flex items-center justify-between z-40 bg-[#0e1318]/80 backdrop-blur-xl border-b border-white/10 sticky top-0">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-white via-gray-100 to-cyan-300 bg-clip-text text-transparent tracking-tight">
              RESEARCH RADAR
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Studio</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-gray-300">
          <button className="hover:text-white transition-colors flex items-center space-x-1">
            <span>Design Suite</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button className="hover:text-white transition-colors flex items-center space-x-1">
            <span>Templates</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>
          <button className="hover:text-white transition-colors">Pricing</button>
          <button className="hover:text-white transition-colors">Education</button>
        </div>

        {/* Auth Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenLogin}
            className="px-5 py-2 rounded-xl text-xs font-bold text-gray-200 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            Log in
          </button>
          <button
            onClick={onOpenSignup}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all transform hover:scale-[1.03]"
          >
            Sign up free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center z-10 space-y-8">
        {/* Top Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Next-Gen Visual Design & Document Suite</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
          What will you{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            design today?
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl font-normal leading-relaxed">
          RESEARCH RADAR Studio makes graphic design, presentation building, and document creation effortlessly fast for everyone.
        </p>

        {/* Mock Search Prompt Input */}
        <div className="w-full max-w-2xl bg-[#18191c]/90 border border-white/15 rounded-2xl p-2 shadow-2xl backdrop-blur-xl flex items-center space-x-3 transition-all focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/20">
          <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates, presentations, flyers, resumes..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
          />
          <button
            onClick={onOpenSignup}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center space-x-1 flex-shrink-0"
          >
            <span>Start Designing</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {FEATURE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/30 border-cyan-400/60 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-[#18191c]/60 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Hero Showcase Card Display */}
        <div className="w-full mt-6 bg-[#18191c]/90 border border-white/15 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {FEATURE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={onOpenSignup}
                  className="p-5 rounded-2xl bg-[#252627]/60 border border-white/10 hover:border-purple-500/50 hover:bg-[#252627] transition-all cursor-pointer group space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
                  </div>
                  <div className="flex items-center text-[11px] font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                    <span>Create now</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6 text-xs text-gray-400 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant PDF & PPTX Export</span>
              </div>
            </div>

            <button
              onClick={onOpenSignup}
              className="px-6 py-2.5 bg-white text-gray-900 hover:bg-gray-100 font-extrabold text-xs rounded-xl transition-all shadow-xl flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full border-t border-white/10">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Everything you need for studio-quality design
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Powerful vector editing tools, pre-built templates, and high-resolution export formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#18191c] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Fabric Vector Canvas</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Full object layering, text formatting, stroke controls, and shape manipulation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#18191c] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Pre-built Templates</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Access business pitch decks, poster layouts, resumes, and scientific diagrams.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#18191c] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Multi-Format Export</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Download high-res PNG images, vector PDFs, or editable PowerPoint files.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#18191c] border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Cloud Workspace</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Save project designs in your personalized MongoDB cloud workspace automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-[#18191c] border-t border-white/10 text-xs text-gray-500 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-gray-400 font-bold">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>RESEARCH RADAR Studio</span>
        </div>
        <p>© 2026 RESEARCH RADAR Studio • Full-Stack Graphic Design System</p>
      </footer>
    </div>
  );
};
