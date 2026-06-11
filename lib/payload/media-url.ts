import type { Media } from "@/payload-types";

export function getMediaUrl(
  media: number | Media | null | undefined,
  fallback: string,
): string {
  if (!media || typeof media === "number") {
    return fallback;
  }

  return media.url ?? fallback;
}
