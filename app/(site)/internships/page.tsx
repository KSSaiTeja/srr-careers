import type { Metadata } from "next";
import { InternshipsPage } from "@/components/internships/internships-page";

export const metadata: Metadata = {
  title: "Internships | SRR Careers",
  description:
    "Apply for an internship at SRR Careers — hands-on experience with finance and SAP training mentors.",
};

export const revalidate = 0;

export default function Page() {
  return <InternshipsPage />;
}
