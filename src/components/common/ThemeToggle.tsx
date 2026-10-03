import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { applyTheme, getStoredTheme, ThemeMode, toggleThemeApi } from '../../utils/theme';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = getStoredTheme();
    setTheme(current);
    applyTheme(current);
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newTheme = toggleThemeApi();
    setTheme(newTheme);
  };

  if (!mounted) return null;

  const isLight = theme === 'light';

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center shadow-sm select-none transform hover:scale-105 active:scale-95 ${
        isLight
          ? 'bg-[#A7C4A0]/20 border-[#A7C4A0]/60 text-[#2D6A4F] hover:bg-[#A7C4A0]/40'
          : 'bg-[#6A0DAD]/25 border-[#6A0DAD]/60 text-purple-300 hover:bg-[#6A0DAD]/40'
      } ${className}`}
      title={
        isLight
          ? 'Eucalyptus Glow (Light) • Click to switch to Royal Smoke (Dark)'
          : 'Royal Smoke (Dark) • Click to switch to Eucalyptus Glow (Light)'
      }
    >
      {isLight ? (
        <Sun className="w-4 h-4 text-amber-600 fill-amber-500/20 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 text-purple-300 fill-purple-300/20 transition-transform duration-300 -rotate-12" />
      )}
    </button>
  );
};
