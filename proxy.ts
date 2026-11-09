import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Shows the maintenance page for every public URL.
 * Existing pages stay in the repo. Remove this file to bring the site back.
 * /admin and /api are left alone so the CMS and payment webhooks keep working.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|admin|maintenance|_next/static|_next/image|favicon|.*\\..*).*)",
  ],
};
