import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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

export const viewport = { themeColor: "#03030A" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (

            <ClerkProvider>
                  <html lang="en">
                          <body className={inter.className}>{children}</body>body>
                  </html>html>
            </ClerkProvider>ClerkProvider>
          );
}</ClerkProvider>
