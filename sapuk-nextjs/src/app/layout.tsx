import type { Metadata } from "next";
import { Fuzzy_Bubbles } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

const fuzzyBubbles = Fuzzy_Bubbles({
  variable: "--font-fuzzy-bubbles",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SAP;UK - Non Profit CIC",
  description: "Suicide Awareness Prevention UK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fuzzyBubbles.variable} antialiased bg-zinc-100`}>
        <Providers>{children}</Providers>
        <Toaster />

        <Analytics />
      </body>
    </html>
  );
}
