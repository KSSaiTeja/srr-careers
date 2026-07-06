import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/course-detail/course-detail-page";
import type { CourseDetailSlug } from "@/lib/constants/course-detail-content";
import {
  getCourseDetailContent,
  getCourseDetailSlugs,
} from "@/lib/payload/get-course-detail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Render on every request so CMS edits (price, content, etc.) are reflected
// instantly with no caching delay.
export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getCourseDetailSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseDetailContent(slug);

  if (!course) {
    return { title: "Course Not Found | SRR Careers" };
  }

  return {
    title: course.meta.title,
    description: course.meta.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseDetailContent(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}

export type { CourseDetailSlug };
