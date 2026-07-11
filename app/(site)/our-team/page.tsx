import type { Metadata } from "next";
import { OurTeamPage } from "@/components/team/our-team-page";

export const metadata: Metadata = {
  title: "Our Team | SRR Careers",
  description:
    "Meet the SRR Careers faculty — CA, CMA, and finance educators mentoring the next generation of SAP and finance professionals.",
};

export const revalidate = 0;

export default function Page() {
  return <OurTeamPage />;
}
