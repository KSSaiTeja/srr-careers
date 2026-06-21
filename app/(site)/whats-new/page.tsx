import type { Metadata } from "next";
import { WhatsNewPage } from "@/components/whats-new/whats-new-page";
import { getWhatsNewPageContent } from "@/lib/payload/get-whats-new-page";

export const metadata: Metadata = {
  title: "What's New | SRR Careers",
  description:
    "Latest updates from SRR Careers — admissions, curriculum changes, placements, notices, and live events for SAP S/4 HANA FICO learners.",
};

export const revalidate = 60;

export default async function Page() {
  const content = await getWhatsNewPageContent();

  return <WhatsNewPage content={content} />;
}
