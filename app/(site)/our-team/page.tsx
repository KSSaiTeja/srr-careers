import type { Metadata } from "next";
import { OurTeamPage } from "@/components/team/our-team-page";
import { getOurTeamPageContent } from "@/lib/payload/get-our-team-page";

export const metadata: Metadata = {
  title: "Our Team | SRR Careers",
  description:
    "Meet the SRR Careers faculty — CA, CMA, and finance educators mentoring the next generation of SAP and finance professionals.",
};

// Render on every request so CMS edits are reflected instantly (no caching).
export const revalidate = 0;

export default async function Page() {
  const content = await getOurTeamPageContent();

  return <OurTeamPage content={content} />;
}
