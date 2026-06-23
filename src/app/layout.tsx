import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIRA - Your AI Study Mentor",
  description: "Get into flow. Stay there.",
  metadataBase: new URL("https://airamentor.com"),
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "AIRA - Your AI Study Mentor",
    description: "Get into flow. Stay there.",
    url: "https://airamentor.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = { themeColor: "#03030A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
