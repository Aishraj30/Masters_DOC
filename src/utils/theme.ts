export type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'docmaster_theme_v1';

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {}
  return 'dark';
};

export const applyTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;
  try {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.error('Failed to apply theme:', e);
  }
};

export const toggleThemeApi = (): ThemeMode => {
  const current = getStoredTheme();
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
};
