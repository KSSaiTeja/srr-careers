import type { Metadata } from "next";
import { CoursesListingPage } from "@/components/courses/courses-listing-page";
import { getCoursesListingContent } from "@/lib/payload/get-courses-listing";

// Render on every request so CMS edits are reflected instantly (no caching).
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCoursesListingContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function Page() {
  const content = await getCoursesListingContent();
  return <CoursesListingPage content={content} />;
}
