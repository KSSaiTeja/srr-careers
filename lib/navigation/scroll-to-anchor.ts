import type Lenis from "lenis";

/** Offset for the sticky site header when scrolling to in-page anchors. */
export const ANCHOR_SCROLL_OFFSET = 132;

export function getAnchorElement(hash: string): HTMLElement | null {
  if (!hash || hash === "#") return null;
  const id = decodeURIComponent(hash.slice(1));
  return document.getElementById(id);
}

/** True when `href` is an in-page anchor on the current route. */
export function isSamePageAnchorHref(href: string, pathname: string): boolean {
  if (href.startsWith("#")) {
    return getAnchorElement(href) !== null;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname !== pathname) return false;
    return getAnchorElement(url.hash) !== null;
  } catch {
    return false;
  }
}

export function resolveAnchorHash(href: string): string | null {
  if (href.startsWith("#")) return href;
  try {
    const url = new URL(href, window.location.origin);
    return url.hash || null;
  } catch {
    return null;
  }
}

export function scrollToAnchor(
  hash: string,
  lenis: Lenis | null,
  options?: { immediate?: boolean },
): boolean {
  const el = getAnchorElement(hash);
  if (!el) return false;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -ANCHOR_SCROLL_OFFSET,
      duration: options?.immediate ? 0 : 1.15,
      immediate: options?.immediate,
    });
  } else {
    const top =
      el.getBoundingClientRect().top + window.scrollY - ANCHOR_SCROLL_OFFSET;
    window.scrollTo({
      top,
      behavior: options?.immediate ? "auto" : "smooth",
    });
  }

  return true;
}
