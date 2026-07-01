import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Real Google login turns on ONLY when BOTH Clerk keys are present (see
// next.config.mjs — CLERK_READY is the single source of truth shared by server
// and client so they can never disagree about whether Clerk actually mounted).
const CLERK_ON = process.env.CLERK_READY === "true";

const DESC =
  "AIRA is your AI study mentor. It summarizes your notes, makes practice tests from your own material, builds personalized study programs, and keeps you in deep focus — backed by learning science.";

export const metadata: Metadata = {
  title: "AIRA - Your AI Study Mentor",
  description: DESC,
  metadataBase: new URL("https://airamentor.com"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AIRA - Your AI Study Mentor",
    description: DESC,
    url: "https://airamentor.com",
    siteName: "AIRA",
    type: "website",
  },
  twitter: { card: "summary", title: "AIRA - Your AI Study Mentor", description: DESC },
};

export const viewport: Viewport = { themeColor: "#03030A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tree = (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
  return CLERK_ON ? <ClerkProvider>{tree}</ClerkProvider> : tree;
}
