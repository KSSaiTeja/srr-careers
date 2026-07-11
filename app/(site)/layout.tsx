import type { Metadata, Viewport } from "next";
import { DM_Serif_Text, Inter } from "next/font/google";
import { MotionRoot } from "@/components/motion/motion-root";
import { PageLoader } from "@/components/motion/page-loader";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteSettingsProvider } from "@/components/layout/site-settings-context";
import { getSiteSettings } from "@/lib/payload/get-site-settings";
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

export const metadata: Metadata = {
  title: "SAP S/4HANA FICO Training with Live Mentors | SRR Careers",
  description:
    "Become a job-ready SAP S/4HANA FICO consultant. Live mentor-led cohorts, real client projects, and career support from India's leading SAP FICO training institute.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifText.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <PageLoader />
        <MotionRoot>
          <SiteSettingsProvider value={siteSettings}>
            {children}
            <FloatingActions />
          </SiteSettingsProvider>
        </MotionRoot>
      </body>
    </html>
  );
}
