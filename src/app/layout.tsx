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
  title: "AIRA — Better than Brilliant. $9.99 once.",
  description:
    "Learn AI literacy through 62 hand-written lessons. Prompt engineering, critical thinking with AI, and tool mastery. $9.99 once — lifetime access. Brilliant alternative for the AI era.",
  openGraph: {
    title: "AIRA — Better than Brilliant. $9.99 once.",
    description:
      "62 lessons. AI literacy. One payment. Lifetime access. The Brilliant.org alternative built for the AI era.",
    type: "website",
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
