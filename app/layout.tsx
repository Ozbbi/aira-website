import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AIRA — Your AI Study Mentor",
    description:
          "Get into flow. Stay there. AIRA is an AI-powered study platform with six science-backed focus techniques, a Socratic AI mentor, and a real-time progress dashboard.",
    metadataBase: new URL("https://airamentor.com"),
    icons: {
          icon: [
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon.png", type: "image/png", sizes: "32x32" },
                ],
          apple: "/apple-touch-icon.png",
    },
    manifest: undefined,
    themeColor: "#03030A",
    openGraph: {
          title: "AIRA — Your AI Study Mentor",
          description: "Get into flow. Stay there. Study smarter with AI.",
          url: "https://airamentor.com",
          siteName: "AIRA Mentor",
          images: [
            {
                      url: "/og-image.png",
                      width: 1200,
                      height: 630,
                      alt: "AIRA — Your AI Study Mentor",
            },
                ],
          locale: "en_US",
          type: "website",
    },
    twitter: {
          card: "summary_large_image",
          title: "AIRA — Your AI Study Mentor",
          description: "Get into flow. Stay there. Study smarter with AI.",
          images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
          <ClerkProvider>
                <html lang="en">
                        <body className={inter.className}>{children}</body>body>
                </html>html>
          </ClerkProvider>ClerkProvider>
        );
}</ClerkProvider>
