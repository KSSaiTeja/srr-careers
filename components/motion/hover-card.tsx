"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { hoverCardMotion } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

type HoverCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function HoverCard({
  children,
  className,
  as: Component = "div",
}: HoverCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      className={cn(Component === "div" ? className : undefined)}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverCardMotion}
      data-reveal-item
    >
      {Component === "div" ? (
        children
      ) : (
        <Component className={className}>{children}</Component>
      )}
    </motion.div>
  );
}
