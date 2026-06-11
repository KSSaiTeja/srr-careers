import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailPage } from "@/components/course-detail/course-detail-page";
import {
  COURSE_DETAIL_SLUGS,
  getCourseDetail,
  type CourseDetailSlug,
} from "@/lib/constants/course-detail-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COURSE_DETAIL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseDetail(slug);

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
  const course = getCourseDetail(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}

export type { CourseDetailSlug };
