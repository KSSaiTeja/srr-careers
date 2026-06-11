import type { Metadata } from "next";
import { CoursesPage } from "@/components/courses/courses-page";

export const metadata: Metadata = {
  title: "Courses | SRR Careers",
  description:
    "Explore SAP FICO Consultant and End User tracks — live mentor-led cohorts, real S/4 HANA projects, and career-ready outcomes at SRR Careers.",
};

export default function Page() {
  return <CoursesPage />;
}
