import type { Metadata } from "next";
import { OurStoryPage } from "@/components/our-story/our-story-page";
import { getOurStoryPageContent } from "@/lib/payload/get-our-story-page";

export const metadata: Metadata = {
  title: "Our Story | SRR Careers",
  description:
    "Discover how SRR Careers trains finance professionals into world-class SAP S/4 HANA FICO consultants — our journey, values, and mission.",
};

// Render on every request so CMS edits are reflected instantly (no caching).
export const revalidate = 0;

export default async function Page() {
  const content = await getOurStoryPageContent();

  return <OurStoryPage content={content} />;
}
