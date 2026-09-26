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
      <body className="bg-[#0e1318] text-gray-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
