import type { Metadata } from "next";
import { OurStoryPage } from "@/components/our-story/our-story-page";

export const metadata: Metadata = {
  title: "Our Story | SRR Careers",
  description:
    "Discover how SRR Careers trains finance professionals into world-class SAP S/4 HANA FICO consultants — our journey, values, and mission.",
};

export default function Page() {
  return <OurStoryPage />;
}
