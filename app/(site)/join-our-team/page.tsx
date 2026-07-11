import type { Metadata } from "next";
import { JoinOurTeamPage } from "@/components/join-our-team/join-our-team-page";

export const metadata: Metadata = {
  title: "Join our team | SRR Careers",
  description:
    "Apply to join the SRR Careers team — mentors, operations, and placement roles supporting SAP and finance learners.",
};

export const revalidate = 0;

export default function Page() {
  return <JoinOurTeamPage />;
}
