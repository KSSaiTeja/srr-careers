import type { Metadata, Viewport } from "next";
import { DM_Serif_Text, Inter } from "next/font/google";
import { MotionRoot } from "@/components/motion/motion-root";
import { WhatsAppWidget } from "@/components/layout/whatsapp-widget";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "SRR Careers | SAP S/4 HANA FICO Training",
  description:
    "Master SAP FICO with S4 HANA. Live mentors, real client scenarios, and career support from India's leading SAP FICO training institute.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifText.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <MotionRoot>
          {children}
          <WhatsAppWidget />
        </MotionRoot>
      </body>
    </html>
  );
}
