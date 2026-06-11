"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

type ScrollMotionContextValue = {
  lenis: Lenis | null;
  /** True when scroll-triggered animations are allowed to run */
  isReady: boolean;
};

export const ScrollMotionContext = createContext<ScrollMotionContextValue>({
  lenis: null,
  isReady: true,
});

export function useScrollMotion() {
  return useContext(ScrollMotionContext);
}

export function useLenis() {
  return useContext(ScrollMotionContext).lenis;
}

export function useScrollMotionReady() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isAdminRoute = pathname.startsWith("/admin");
  const usesSmoothScroll = !isAdminRoute && !prefersReducedMotion;
  const { lenis, isReady } = useScrollMotion();

  return {
    shouldAnimate: usesSmoothScroll && isReady,
    usesSmoothScroll,
    isReady: !usesSmoothScroll || isReady,
  };
}
