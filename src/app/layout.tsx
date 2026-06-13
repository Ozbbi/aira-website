import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
          title: 'AIRA Mentor - Master Your Learning',
          description: 'AI-powered study platform with neuroscience-backed methods',
};

export default function RootLayout({ children }) {
          return (
                      <html lang="en" className={inter.className}>
                                    <head />
                                    <body>{children}</body>body>
                      </html>html>
                    );
}</body>
