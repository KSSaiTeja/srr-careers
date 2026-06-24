"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { images } from "@/lib/constants/images";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const INITIAL_MS = 1000;
const SWITCH_MS = 650;

/**
 * Brand preloader. Covers the screen with the logo on first load and briefly on
 * every route switch, then fades out. Skipped entirely for reduced-motion users
 * so it never blocks their content.
 */
export function PageLoader() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const duration = isFirstRun.current ? INITIAL_MS : SWITCH_MS;
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      setVisible(true);
    }
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-brand-cream"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Image
              src={images.logo}
              alt="SRR Careers"
              width={1024}
              height={410}
              priority
              className="h-auto w-56 object-contain sm:w-64"
            />
            <div className="h-[3px] w-24 overflow-hidden rounded-full bg-brand-navy/10">
              <motion.div
                className="h-full w-1/2 rounded-full bg-brand-gold"
                animate={{ x: ["-110%", "210%"] }}
                transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
