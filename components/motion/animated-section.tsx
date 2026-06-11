"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ElementType, type ReactNode } from "react";
import { useScrollMotionReady } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import {
  sectionRevealFrom,
  type SectionRevealVariant,
} from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type AnimatedSectionProps = {
  children: ReactNode;
  variant?: SectionRevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  id?: string;
  staggerChildren?: boolean;
  staggerAmount?: number;
};

export function AnimatedSection({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  className,
  as: Component = "div",
  id,
  staggerChildren = false,
  staggerAmount = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { shouldAnimate } = useScrollMotionReady();
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion || !shouldAnimate) return;

      const from = sectionRevealFrom[variant];
      const scrollTrigger: ScrollTrigger.Vars = {
        trigger: el,
        start: "top 90%",
        once: true,
        invalidateOnRefresh: true,
      };

      if (staggerChildren) {
        const targets = el.querySelectorAll("[data-reveal-item]");
        if (targets.length === 0) return;

        gsap.from(targets, {
          ...from,
          autoAlpha: from.opacity === 0 ? 0 : undefined,
          duration,
          delay,
          stagger: staggerAmount,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger,
        });
      } else {
        gsap.from(el, {
          ...from,
          autoAlpha: from.opacity === 0 ? 0 : undefined,
          duration,
          delay,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger,
        });
      }

      ScrollTrigger.refresh();
    },
    {
      scope: ref,
      dependencies: [
        variant,
        delay,
        duration,
        staggerChildren,
        staggerAmount,
        prefersReducedMotion,
        shouldAnimate,
      ],
    },
  );

  return (
    <Component ref={ref} id={id} className={cn(className)}>
      {children}
    </Component>
  );
}
