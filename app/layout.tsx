import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const siteName = "SRR Careers";
const title = "SAP S/4HANA FICO Training with Live Mentors | SRR Careers";
const description =
  "Become a job-ready SAP S/4HANA FICO consultant. Live mentor-led cohorts, real client projects, and career support from India's leading SAP FICO training institute.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description,
  applicationName: siteName,
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName,
    title,
    description,
    url: siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
