import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    variable: '--font-space-grotesk',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'AIRA Mentor - AI-Powered Study Platform',
    description: 'Learn smarter with AI mentoring, spaced repetition, and focus audio. 7-day free trial.',
    openGraph: {
          title: 'AIRA Mentor - AI-Powered Study Platform',
          description: 'Learn smarter with AI mentoring, spaced repetition, and focus audio. 7-day free trial.',
          type: 'website',
    },
    twitter: {
          card: 'summary_large_image',
          title: 'AIRA Mentor - Study with AI',
          description: 'Learn smarter with AI mentoring and spaced repetition.',
    },
    icons: {
          icon: '/icon.svg',
    },
};

export const viewport: Viewport = {
    themeColor: '#020205',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
          <html
                  lang="en"
                  className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
                >
                <body className="min-h-full flex flex-col bg-[#020205] text-[#F0F0FF]" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                  {children}
                </body>body>
          </html>html>
        );
}</html>
