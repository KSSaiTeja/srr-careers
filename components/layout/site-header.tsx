"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useSiteSettings } from "@/components/layout/site-settings-context";
import { images } from "@/lib/constants/images";
import { useScrollMotionReady } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { isNavActive } from "@/lib/utils/is-nav-active";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

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
      className="sticky top-0 z-50 border-b border-white/30 bg-white/20 pt-[env(safe-area-inset-top)] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5 md:px-10 lg:gap-6 lg:px-14 lg:py-6 xl:px-20 2xl:px-28">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={images.logo}
            alt="SRR Careers"
            width={950}
            height={380}
            className="h-12 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 rounded-full bg-white/10 px-8 py-3 xl:flex xl:gap-14 xl:px-10 xl:py-4"
          aria-label="Main navigation"
        >
          {nav.map((item) => {
            const active = isNavActive(item.href, pathname);
            const hasChildren = Boolean(item.children?.length);
            return (
              <div
                key={item.href}
                className={cn(
                  "group/navitem relative",
                  hasChildren && "static",
                )}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup={hasChildren ? "true" : undefined}
                  aria-expanded={hasChildren ? "false" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold transition-colors xl:text-base",
                    active
                      ? "text-brand-navy"
                      : "text-gray-900 hover:text-brand-navy",
                  )}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      className="size-3.5 transition-transform duration-200 group-hover/navitem:rotate-180 group-focus-within/navitem:rotate-180"
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
                    className="invisible absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover/navitem:visible group-hover/navitem:opacity-100 group-focus-within/navitem:visible group-focus-within/navitem:opacity-100"
                    role="menu"
                  >
                    <ul className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5 ring-1 ring-black/5">
                      {item.children?.map((child) => {
                        const childActive = isNavActive(child.href, pathname);
                        return (
                          <li key={child.href} role="none">
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
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={header.ctaHref}
            className="hidden rounded-full bg-brand-gold px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-gold-dark sm:inline-flex sm:px-5 sm:text-base lg:px-6"
          >
            {header.ctaLabel}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
