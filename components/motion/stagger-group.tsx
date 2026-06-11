"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { staggerContainer, staggerItem } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  as?: "ul" | "div" | "ol";
};

export function StaggerGroup({
  children,
  className,
  as: Component = "div",
}: StaggerGroupProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      className={cn(Component === "div" ? className : undefined)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
    >
      {Component === "div" ? (
        children
      ) : (
        <Component className={className}>{children}</Component>
      )}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "li" | "div" | "article";
};

export function StaggerItem({
  children,
  className,
  as: Component = "div",
}: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      className={cn(Component === "div" ? className : undefined)}
      variants={staggerItem}
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
