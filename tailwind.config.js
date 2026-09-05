/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canva: {
          purple: '#7d2ae8',
          'purple-hover': '#6b20ce',
          teal: '#00c4cc',
          blue: '#00c4cc',
          bg: '#0e1318',
          sidebar: '#18191c',
          panel: '#252627',
          hover: '#313235',
          border: '#38393c',
          accent: '#8b3dff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
