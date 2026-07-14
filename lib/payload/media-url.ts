import type { Media } from "@/payload-types";

/**
 * Resolve a CMS media field to a URL safe for `next/image`.
 * Payload often returns absolute same-origin URLs
 * (e.g. http://localhost:3000/api/media/file/…); those fail unless the host
 * is in remotePatterns. App-served media is always rewritten to a path.
 */
export function getMediaUrl(
  media: number | Media | null | undefined,
  fallback: string,
): string {
  if (!media || typeof media === "number") {
    return fallback;
  }

  const url = media.url;
  if (!url) return fallback;

  return toNextImageSrc(url) || fallback;
}

function toNextImageSrc(url: string): string {
  if (url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    // Local / Payload file handler — keep as a relative path for next/image.
    if (
      parsed.pathname.startsWith("/api/media/") ||
      parsed.pathname.startsWith("/media/")
    ) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    // Non-URL strings fall through.
  }

  return url;
}
