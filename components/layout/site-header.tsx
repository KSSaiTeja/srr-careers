"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mainNavItems } from "@/lib/constants/navigation";
import { images } from "@/lib/constants/images";
import { useScrollMotionReady } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { shouldAnimate } = useScrollMotionReady();

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
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5"
        >
          <Image
            src={images.logo}
            alt="SRR Careers"
            width={48}
            height={48}
            className="size-10 shrink-0 object-contain sm:size-12"
            priority
          />
          <span className="truncate text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
            SRR Careers
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 rounded-full bg-white/10 px-8 py-3 xl:flex xl:gap-14 xl:px-10 xl:py-4"
          aria-label="Main navigation"
        >
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative whitespace-nowrap text-sm font-semibold transition-colors xl:text-base",
                item.href === "/"
                  ? "text-brand-navy"
                  : "text-gray-900 hover:text-brand-navy",
              )}
            >
              {item.label}
              {item.badge && (
                <span
                  className="absolute -right-2 -top-1 size-2 rounded-full bg-red-600"
                  aria-hidden
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="#pre-footer"
            className="hidden rounded-full bg-brand-gold px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-gold-dark sm:inline-flex sm:px-5 sm:text-base lg:px-6"
          >
            Book a Demo
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
