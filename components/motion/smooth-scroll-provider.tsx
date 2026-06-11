"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollMotionContext } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isAdminRoute = pathname.startsWith("/admin");
  const usesSmoothScroll = !isAdminRoute && !prefersReducedMotion;
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(!usesSmoothScroll);

  useEffect(() => {
    if (!usesSmoothScroll) {
      setLenis(null);
      setIsReady(true);
      return;
    }

    setIsReady(false);

    const instance = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.35,
    });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    instance.on("scroll", ScrollTrigger.update);

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => {
      refresh();
      setIsReady(true);
    });
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      instance.destroy();
      setLenis(null);
      setIsReady(!usesSmoothScroll);
    };
  }, [usesSmoothScroll]);

  return (
    <ScrollMotionContext.Provider value={{ lenis, isReady }}>
      {children}
    </ScrollMotionContext.Provider>
  );
}
