import type { Metadata } from "next";
import { CoursesPage } from "@/components/courses/courses-page";
import { getCoursesPageContent } from "@/lib/payload/get-courses-page";

export const metadata: Metadata = {
  title: "SAP FICO Courses & Fees — Consultant & End-User Tracks | SRR Careers",
  description:
    "Compare SAP S/4HANA FICO Consultant and End-User tracks — fees, duration, live mentor-led cohorts, and real client projects. Enrol online at SRR Careers.",
};

export const revalidate = 60;

export default async function Page() {
  const content = await getCoursesPageContent();

  return <CoursesPage content={content} />;
}
