import { FontOption } from '../types/canvas';

export const GOOGLE_FONTS: FontOption[] = [
  // --- SANS-SERIF ---
  { name: 'Inter', family: 'Inter', category: 'sans-serif' },
  { name: 'Poppins', family: 'Poppins', category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto', category: 'sans-serif' },
  { name: 'Montserrat', family: 'Montserrat', category: 'sans-serif' },
  { name: 'Oswald', family: 'Oswald', category: 'sans-serif' },
  { name: 'Space Grotesk', family: 'Space Grotesk', category: 'sans-serif' },
  { name: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', category: 'sans-serif' },
  { name: 'Outfit', family: 'Outfit', category: 'sans-serif' },
  { name: 'Work Sans', family: 'Work Sans', category: 'sans-serif' },
  { name: 'Fira Sans', family: 'Fira Sans', category: 'sans-serif' },

  // --- SERIF ---
  { name: 'Playfair Display', family: 'Playfair Display', category: 'serif' },
  { name: 'Merriweather', family: 'Merriweather', category: 'serif' },
  { name: 'Lora', family: 'Lora', category: 'serif' },
  { name: 'Cinzel', family: 'Cinzel', category: 'serif' },
  { name: 'Abril Fatface', family: 'Abril Fatface', category: 'serif' },
  { name: 'Cormorant Garamond', family: 'Cormorant Garamond', category: 'serif' },
  { name: 'PT Serif', family: 'PT Serif', category: 'serif' },

  // --- DISPLAY ---
  { name: 'Anton', family: 'Anton', category: 'display' },
  { name: 'Lobster', family: 'Lobster', category: 'display' },
  { name: 'Bebas Neue', family: 'Bebas Neue', category: 'display' },
  { name: 'Monoton', family: 'Monoton', category: 'display' },
  { name: 'Syne', family: 'Syne', category: 'display' },
  { name: 'Righteous', family: 'Righteous', category: 'display' },
  { name: 'Ultra', family: 'Ultra', category: 'display' },

  // --- HANDWRITING & SCRIPT ---
  { name: 'Pacifico', family: 'Pacifico', category: 'handwriting' },
  { name: 'Caveat', family: 'Caveat', category: 'handwriting' },
  { name: 'Dancing Script', family: 'Dancing Script', category: 'handwriting' },
  { name: 'Satisfy', family: 'Satisfy', category: 'handwriting' },
  { name: 'Permanent Marker', family: 'Permanent Marker', category: 'handwriting' },
  { name: 'Great Vibes', family: 'Great Vibes', category: 'handwriting' },

  // --- MONOSPACE ---
  { name: 'Fira Code', family: 'Fira Code', category: 'monospace' },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', category: 'monospace' },
  { name: 'Space Mono', family: 'Space Mono', category: 'monospace' }
];

const loadedFonts = new Set<string>();

/**
 * Dynamically load Google Font into document head if not already loaded
 */
export function loadGoogleFont(fontFamily: string) {
  if (!fontFamily || loadedFonts.has(fontFamily)) return;
  loadedFonts.add(fontFamily);

  const formattedFamily = fontFamily.replace(/\s+/g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${formattedFamily}:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap`;
  document.head.appendChild(link);
}
