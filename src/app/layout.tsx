import { Inter } from 'next/font/google';
// AIRA Mentor - Brain.fm-inspired SaaS landing page v2.1
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'AIRA Mentor' };

export default function RootLayout({ children }) {
        return (
                  <html lang="en" className={inter.className}>
                              <body>{children}</body>body>
                  </html>html>
                );
}</body>
