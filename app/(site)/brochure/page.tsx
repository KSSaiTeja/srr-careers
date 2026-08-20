import type { Metadata } from "next";
import Script from "next/script";
import { BrochureView } from "@/components/brochure/brochure-view";

export const metadata: Metadata = {
  title: "SRR Careers Brochure | Half-Fold Print Ready",
  description:
    "Print-ready half-fold brochure for SRR Careers — SAP FICO courses, workshops, and career outcomes. 11×8.5 flat, folds to 5.5×8.5.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrochurePage() {
  return (
    <>
      {/* Temporary Figma MCP capture script — remove after export */}
      <Script
        src="https://mcp.figma.com/mcp/html-to-design/capture.js"
        strategy="afterInteractive"
      />
      <BrochureView />
    </>
  );
}
