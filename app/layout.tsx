import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
    title: 'AIRA MENTOR - Neural Focus Engine',
    description: 'Master your flow state with AI-powered Socratic tutoring',
    keywords: 'AI tutor, focus, flow state, study guide, socratic method',
    authors: [{ name: 'AIRA MENTOR' }],
    viewport: 'width=device-width, initial-scale=1',
    icons: {
          icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
          <ClerkProvider>
                <html lang="en" suppressHydrationWarning>
                        <head>
                                  <meta charSet="utf-8" />
                                  <meta name="theme-color" content="#020205" />
                        </head>head>
                        <body className="bg-[#020205] text-[#E2E8F0] font-sans antialiased selection:bg-blue-500/30">
                          {children}
                        </body>body>
                </html>html>
          </ClerkProvider>ClerkProvider>
        );
}</ClerkProvider>
