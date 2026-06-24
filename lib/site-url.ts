function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Absolute origin for the public site. Used for `metadataBase` so social/share
 * previews (OG + Twitter cards) resolve image and canonical URLs correctly.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return normalizeUrl(process.env.NEXT_PUBLIC_SERVER_URL);
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
