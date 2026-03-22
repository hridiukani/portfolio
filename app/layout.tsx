import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hridi Ukani',
  description: 'Portfolio of Hridi Ukani — Software Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
