import type { Viewport } from "next";
import { DM_Serif_Text, Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function MaintenanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifText.variable} h-full antialiased`}
    >
      <body
        className="min-h-full text-white"
        style={{ backgroundColor: "#00193b", color: "#ffffff" }}
      >
        {children}
      </body>
    </html>
  );
}
