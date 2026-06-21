import type { Metadata } from "next";
import { BlogListingPage } from "@/components/blog/blog-listing-page";
import { getBlogPageContent, getBlogPosts } from "@/lib/payload/get-blog";

export const metadata: Metadata = {
  title: "Blog | SRR Careers",
  description:
    "Practical guides, real client scenarios, and career advice for aspiring SAP S/4HANA FICO consultants from the SRR Careers team.",
};

export const revalidate = 60;

export default async function Page() {
  const [content, posts] = await Promise.all([
    getBlogPageContent(),
    getBlogPosts(),
  ]);

  return <BlogListingPage content={content} posts={posts} />;
}
