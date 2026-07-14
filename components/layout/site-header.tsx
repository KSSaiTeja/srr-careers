"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { HeaderTopStrip } from "@/components/layout/header-top-strip";
import { useSiteSettings } from "@/components/layout/site-settings-context";
import { images } from "@/lib/constants/images";
import { useScrollMotionReady } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import type { NavChildLink } from "@/lib/types/site-settings-content";
import { isNavActive } from "@/lib/utils/is-nav-active";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

function NavChildItem({ child }: { child: NavChildLink }) {
  const pathname = usePathname();
  const isGroup = Boolean(child.isGroup && child.children?.length);
  const groupHref =
    child.href && child.href !== "#" ? child.href : undefined;

  if (isGroup) {
    return (
      <li role="none" className="group/flyout relative">
        {groupHref ? (
          <Link
            href={groupHref}
            role="menuitem"
            aria-haspopup="true"
            aria-current={
              isNavActive(groupHref, pathname) ? "page" : undefined
            }
            className={cn(
              "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium leading-snug transition-colors hover:bg-brand-lavender/40 hover:text-brand-navy",
              isNavActive(groupHref, pathname)
                ? "bg-brand-lavender/60 text-brand-navy"
                : "text-gray-700",
            )}
          >
            {child.label}
            <ChevronRight
              className="size-3.5 shrink-0 opacity-60"
              aria-hidden
            />
          </Link>
        ) : (
          <button
            type="button"
            role="menuitem"
            aria-haspopup="true"
            className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-medium leading-snug text-gray-700 transition-colors hover:bg-brand-lavender/40 hover:text-brand-navy"
          >
            {child.label}
            <ChevronRight
              className="size-3.5 shrink-0 opacity-60"
              aria-hidden
            />
          </button>
        )}
        <div
          className="invisible absolute left-full top-0 z-50 ml-1 w-56 opacity-0 transition-all duration-150 group-hover/flyout:visible group-hover/flyout:opacity-100 group-focus-within/flyout:visible group-focus-within/flyout:opacity-100 max-xl:left-auto max-xl:right-0 max-xl:top-full max-xl:ml-0 max-xl:mt-1"
          role="menu"
        >
          <ul className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5 ring-1 ring-black/5">
            {child.children?.map((sub) => {
              const subActive = isNavActive(sub.href, pathname);
              return (
                <li key={sub.href} role="none">
                  <Link
                    href={sub.href}
                    role="menuitem"
                    aria-current={subActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      subActive
                        ? "bg-brand-lavender/60 text-brand-navy"
                        : "text-gray-700 hover:bg-brand-lavender/40 hover:text-brand-navy",
                    )}
                  >
                    {sub.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    );
  }

  const childActive = isNavActive(child.href, pathname);
  return (
    <li role="none">
      <Link
        href={child.href}
        role="menuitem"
        aria-current={childActive ? "page" : undefined}
        className={cn(
          "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
          childActive
            ? "bg-brand-lavender/60 text-brand-navy"
            : "text-gray-700 hover:bg-brand-lavender/40 hover:text-brand-navy",
        )}
      >
        {child.label}
      </Link>
    </li>
  );
}

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { shouldAnimate } = useScrollMotionReady();
  const { nav, header } = useSiteSettings();
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el || prefersReducedMotion || !shouldAnimate) return;

      gsap.fromTo(
        el,
        {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 0 rgba(8, 63, 136, 0)",
        },
        {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 32px rgba(8, 63, 136, 0.08)",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "140px top",
            scrub: 0.4,
          },
        },
      );
    },
    { dependencies: [prefersReducedMotion, shouldAnimate] },
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 overflow-x-clip border-b border-white/30 bg-white/20 pt-[env(safe-area-inset-top)] backdrop-blur-md"
    >
      <HeaderTopStrip />
      <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:gap-8 sm:px-6 sm:py-4 md:px-10 lg:px-14 xl:gap-10 xl:px-16 2xl:gap-12 2xl:px-20">
        <Link href="/" className="shrink-0">
          <Image
            src={images.logo}
            alt="SRR Careers"
            width={950}
            height={380}
            className="h-10 w-auto object-contain sm:h-12 lg:h-[3.25rem]"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-5 px-4 xl:flex 2xl:gap-7 2xl:px-6"
          aria-label="Main navigation"
        >
          {nav.map((item, index) => {
            const active = isNavActive(item.href, pathname);
            const hasChildren = Boolean(item.children?.length);
            const alignEnd = index >= Math.ceil(nav.length / 2);
            return (
              <div key={item.href} className="group/navitem relative shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={hasChildren ? "true" : undefined}
                  aria-expanded={hasChildren ? "false" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-0.5 whitespace-nowrap text-sm font-semibold transition-colors",
                    active
                      ? "text-brand-navy"
                      : "text-gray-900 hover:text-brand-navy",
                  )}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      className="size-3.5 shrink-0 transition-transform duration-200 group-hover/navitem:rotate-180 group-focus-within/navitem:rotate-180"
                      aria-hidden
                    />
                  )}
                  {active && !hasChildren && (
                    <span
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-brand-navy"
                      aria-hidden
                    />
                  )}
                  {item.badge && (
                    <span
                      className="absolute -right-2 -top-1 size-2 rounded-full bg-red-600"
                      aria-hidden
                    />
                  )}
                </Link>

                {hasChildren && (
                  <div
                    className={cn(
                      "invisible absolute top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] opacity-0 transition-all duration-150 group-hover/navitem:visible group-hover/navitem:opacity-100 group-focus-within/navitem:visible group-focus-within/navitem:opacity-100",
                      alignEnd ? "right-0" : "left-0",
                    )}
                    role="menu"
                  >
                    <ul className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5 ring-1 ring-black/5">
                      {item.children?.map((child) => (
                        <NavChildItem
                          key={`${child.label}-${child.href}`}
                          child={child}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={header.secondaryCtaHref}
            className="hidden whitespace-nowrap rounded-full border border-brand-navy/25 bg-white/80 px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy/50 hover:bg-white xl:inline-flex"
          >
            {header.secondaryCtaLabel}
          </Link>
          <Link
            href={header.ctaHref}
            className="hidden whitespace-nowrap rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-brand-gold-dark sm:inline-flex"
          >
            {header.ctaLabel}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
