import { mapHomePageFromCMS } from "@/lib/payload/map-home-page";
import type { HomePageContent } from "@/lib/types/home-page-content";

/** Default homepage sections when CMS is not passed (other pages reusing home blocks). */
export function getHomePageFallback(): HomePageContent {
  return mapHomePageFromCMS(undefined);
}
