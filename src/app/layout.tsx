import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIRA - Your AI Mentor for the AI-Native Era",
  description:
    "Coming soon: AIRA is an AI mentor that teaches prompt judgment, generated lessons, workflow thinking, and the skill of using AI well.",
  openGraph: {
    title: "AIRA - Your AI Mentor for the AI-Native Era",
    description:
      "Coming soon: AI literacy, generated lessons, prompt practice, and workflow training in one mentor-style learning experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIRA - Your AI Mentor for the AI-Native Era",
    description:
      "Coming soon: AIRA helps you think, learn, and build with AI.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFEFC",
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
      <body
        className="min-h-full flex flex-col bg-aira-bg text-aira-text"
        style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
