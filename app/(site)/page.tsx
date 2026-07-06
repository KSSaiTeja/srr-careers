import { HomePage } from "@/components/home/home-page";
import { getHomePageContent } from "@/lib/payload/get-home-page";

// Render on every request so CMS edits are reflected instantly (no caching).
export const revalidate = 0;

export default async function Page() {
  const content = await getHomePageContent();

  return <HomePage content={content} />;
}
