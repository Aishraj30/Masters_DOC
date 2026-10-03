import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'RESEARCH RADAR Studio - Creative Graphic Design & Document Suite',
  description: 'Canva-style full stack graphic design and document studio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased font-sans transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
