/**
 * Whether a nav link is the active route. Hash/anchor links (e.g. #pre-footer)
 * are never "active". Section routes light up for their nested pages too — e.g.
 * /blog is active on /blog/my-post, and /courses on /courses/slug.
 */
export function isNavActive(href: string, pathname: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
