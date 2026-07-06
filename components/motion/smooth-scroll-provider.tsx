"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollMotionContext } from "@/components/motion/lenis-context";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { scrollToAnchor, isSamePageAnchorHref, resolveAnchorHash } from "@/lib/navigation/scroll-to-anchor";

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

  // Own scroll position ourselves: stop the browser from restoring the old
  // offset on refresh / back-forward navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  // Reset to the top on every page switch and on first load. In-page anchor
  // navigations (e.g. "/courses#track-comparison") keep their target.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  // Lenis replaces native scrolling, so hash links must be handled explicitly.
  useEffect(() => {
    if (typeof window === "undefined" || !isReady) return;

    const navigateToHash = (hash: string, immediate = false) => {
      requestAnimationFrame(() => {
        scrollToAnchor(hash, lenis, { immediate });
      });
    };

    const onHashChange = () => {
      navigateToHash(window.location.hash);
    };

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#") || href === "#") return;

      const target = isSamePageAnchorHref(href, window.location.pathname);
      if (!target) return;

      event.preventDefault();
      const hash = resolveAnchorHash(href);
      if (!hash) return;
      window.history.pushState(null, "", hash);
      navigateToHash(hash);
    };

    if (window.location.hash) {
      navigateToHash(window.location.hash, true);
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, [isReady, lenis, pathname]);

  return (
    <ScrollMotionContext.Provider value={{ lenis, isReady }}>
      {children}
    </ScrollMotionContext.Provider>
  );
}
