"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function ParallaxLayer({
  children,
  className,
  speed = 0.15,
  ...rest
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion) return;

      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [speed, prefersReducedMotion] },
  );

  return (
    <div ref={ref} className={cn(className)} {...rest}>
      {children}
    </div>
  );
}
