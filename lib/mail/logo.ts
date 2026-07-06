import { readFileSync } from "fs";
import { join } from "path";

/**
 * Brand logo handling for email. Email clients don't render relative paths and
 * often can't reach a dev/un-deployed host, so we embed the logo as an inline
 * `cid:` attachment (multipart/related) — which renders everywhere, Gmail
 * included — and only fall back to a hosted URL if the file can't be read.
 */

export const LOGO_CID = "srr-logo";

let cached: Buffer | null | undefined;

/** Logo bytes, read once and cached. Null if the file can't be read. */
export function logoBuffer(): Buffer | null {
  if (cached !== undefined) return cached;
  try {
    cached = readFileSync(join(process.cwd(), "public", "images", "logo.png"));
  } catch {
    cached = null;
  }
  return cached;
}

/**
 * `src` for the logo <img>: the inline CID when we have the bytes, otherwise a
 * hosted absolute URL as a best-effort fallback.
 */
export function logoSrc(siteUrl: string): string {
  return logoBuffer() ? `cid:${LOGO_CID}` : `${siteUrl}/images/logo.png`;
}
