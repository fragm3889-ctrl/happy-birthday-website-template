import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SparkleTrail from "@/components/SparkleTrail";
import ShakeConfetti from "@/components/ShakeConfetti";
import DoubleTapHeart from "@/components/DoubleTapHeart";
import BalloonRelease from "@/components/BalloonRelease";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Happy Birthday | A Magical Interactive Web Experience",
  description: "An open-source, highly interactive, 3D web experience built with Next.js, Three.js, and GSAP. A perfect digital birthday gift template.",
  keywords: ["Happy Birthday", "Birthday Template", "Next.js", "Three.js", "React Three Fiber", "GSAP", "Interactive Web", "Open Source"],
};

export const viewport: Viewport = {
  themeColor: "#FFC0CB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${playfair.variable} antialiased text-foreground selection:bg-pink-300 selection:text-pink-900 overscroll-none overflow-x-hidden`}
      >
        <SmoothScroll>
          <SparkleTrail />
          <ShakeConfetti />
          <DoubleTapHeart />
          <BalloonRelease />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
