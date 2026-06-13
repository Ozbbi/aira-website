import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIRA MENTOR - Neural Focus Engine',
  description: 'Master your flow state with AI-powered Socratic tutoring',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#020205', color: '#E2E8F0' }}>
        {children}
      </body>
    </html>
  );
}
