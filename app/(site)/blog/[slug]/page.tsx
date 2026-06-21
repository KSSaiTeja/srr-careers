import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/blog/blog-detail-page";
import { getBlogPost, getBlogPosts, getBlogSlugs } from "@/lib/payload/get-blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return { title: "Article Not Found | SRR Careers" };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const related = allPosts.filter((entry) => entry.slug !== slug).slice(0, 3);

  return <BlogDetailPage post={post} related={related} />;
}
