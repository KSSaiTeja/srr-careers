"use client";

import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

type MotionRootProps = {
  children: React.ReactNode;
};

export function MotionRoot({ children }: MotionRootProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
