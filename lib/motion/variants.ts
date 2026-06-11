import type { Variants } from "motion/react";

export type SectionRevealVariant =
  | "fade-up"
  | "fade-in"
  | "scale-up"
  | "slide-left"
  | "slide-right";

export const sectionRevealFrom: Record<
  SectionRevealVariant,
  { opacity: number; y?: number; x?: number; scale?: number }
> = {
  "fade-up": { opacity: 0, y: 72 },
  "fade-in": { opacity: 0 },
  "scale-up": { opacity: 0, scale: 0.94 },
  "slide-left": { opacity: 0, x: -72 },
  "slide-right": { opacity: 0, x: 72 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const heroStaggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const hoverCardMotion = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};
