"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import {
  heroStaggerContainer,
  heroStaggerItem,
} from "@/lib/motion/variants";

type HeroEntranceProps = {
  children: ReactNode;
  className?: string;
};

export function HeroEntrance({ children, className }: HeroEntranceProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={heroStaggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

type HeroEntranceItemProps = {
  children: ReactNode;
  className?: string;
};

export function HeroEntranceItem({ children, className }: HeroEntranceItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={heroStaggerItem}>
      {children}
    </motion.div>
  );
}
