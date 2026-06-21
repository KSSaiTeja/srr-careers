"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ElementType, type ReactNode } from "react";
import { useScrollMotionReady } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type BlurRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Initial blur in px. */
  blur?: number;
  /** Initial vertical offset in px. */
  y?: number;
  delay?: number;
  duration?: number;
};

/**
 * Heading-focused scroll reveal: text fades up while a soft blur resolves to
 * sharp. Uses `fromTo` so the blur start/end are explicit (GSAP cannot reliably
 * interpolate `filter` toward a computed `none`). Honours reduced motion and the
 * Lenis-ready gate, matching AnimatedSection.
 */
export function BlurReveal({
  children,
  className,
  as: Component = "div",
  blur = 12,
  y = 28,
  delay = 0,
  duration = 0.9,
}: BlurRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { shouldAnimate } = useScrollMotionReady();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion || !shouldAnimate) return;

      gsap.fromTo(
        el,
        { opacity: 0, y, filter: `blur(${blur}px)` },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
            invalidateOnRefresh: true,
          },
          onComplete: () => {
            // Drop all inline styles GSAP set so nothing lingers (a leftover
            // filter costs paint; a leftover transform breaks `position: sticky`).
            gsap.set(el, { clearProps: "all" });
          },
        },
      );
    },
    {
      scope: ref,
      dependencies: [blur, y, delay, duration, prefersReducedMotion, shouldAnimate],
    },
  );

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
