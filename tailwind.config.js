/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Royal Smoke (Dark Theme) & Eucalyptus Glow (Light Theme) Config
        royal: {
          purple: '#6A0DAD',
          'purple-hover': '#580B93',
          dark: '#1C1C1C',
          panel: '#242424',
          border: '#333333',
        },
        eucalyptus: {
          green: '#A7C4A0',
          'green-hover': '#8EB086',
          bg: '#F4EFE6',
          panel: '#FFFFFF',
          sidebar: '#EAE4D9',
          border: '#DCD3C5',
        },
        // App Theme variables mapping
        canva: {
          purple: 'var(--color-purple, #6A0DAD)',
          'purple-hover': 'var(--color-purple-hover, #580B93)',
          teal: 'var(--color-accent, #00c4cc)',
          blue: 'var(--color-accent, #00c4cc)',
          bg: 'var(--color-bg, #1C1C1C)',
          sidebar: 'var(--color-sidebar, #18191c)',
          panel: 'var(--color-panel, #242424)',
          hover: 'var(--color-hover, #2E2E2E)',
          border: 'var(--color-border, #333333)',
          accent: 'var(--color-accent, #6A0DAD)',
          text: 'var(--color-text, #F3F4F6)',
          'text-muted': 'var(--color-text-muted, #9CA3AF)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
