import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ✅ Import the Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Color Palette Generator",
  description: "Generate beautiful color palettes instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased my-8`}>
        {/* ✅ Navbar will now appear on every page */}
        <Navbar />

        {/* ✅ Add padding so content doesn't get hidden under fixed navbar */}
        <main>{children}</main>
      </body>
    </html>
  );
}
