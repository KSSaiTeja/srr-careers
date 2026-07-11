import type { Metadata } from "next";
import { WorkshopsPage } from "@/components/workshops/workshops-page";

export const metadata: Metadata = {
  title: "Workshops | SRR Careers",
  description:
    "Campus and corporate workshops from SRR Careers — career pathways, skills blueprint, resume & interview prep, GST, and personal finance. Duration and pricing are customisable.",
};

export default function Page() {
  return <WorkshopsPage />;
}
