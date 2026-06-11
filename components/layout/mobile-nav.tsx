"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNavItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const panel =
    open && mounted
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px]"
              onClick={close}
              aria-label="Close menu"
            />

            <nav
              id="mobile-nav-panel"
              className="fixed inset-y-0 right-0 z-[201] flex w-[min(calc(100vw-env(safe-area-inset-right)),22rem)] flex-col bg-white pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
                <span className="text-lg font-bold text-gray-900">Menu</span>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex size-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
                {mainNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "relative flex items-center rounded-xl px-4 py-3.5 text-base font-semibold transition-colors hover:bg-brand-lavender/60",
                        item.href === "/"
                          ? "text-brand-navy"
                          : "text-gray-900",
                      )}
                    >
                      {item.label}
                      {item.badge ? (
                        <span
                          className="ml-2 size-2 rounded-full bg-red-600"
                          aria-hidden
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Link
                  href="#pre-footer"
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3.5 text-base font-semibold text-black transition-colors hover:bg-brand-gold-dark"
                >
                  Book a Demo
                </Link>
              </div>
            </nav>
          </>,
          document.body,
        )
      : null;

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-xl border border-gray-200/80 bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>
      {panel}
    </div>
  );
}
