"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useSiteSettings } from "@/components/layout/site-settings-context";
import type { NavChildLink } from "@/lib/types/site-settings-content";
import { isNavActive } from "@/lib/utils/is-nav-active";
import { cn } from "@/lib/utils/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const { nav, header } = useSiteSettings();
  const pathname = usePathname();

  const close = useCallback(() => {
    setOpen(false);
    setExpanded(null);
    setExpandedGroup(null);
  }, []);

  const toggleExpanded = useCallback((href: string) => {
    setExpanded((current) => (current === href ? null : href));
    setExpandedGroup(null);
  }, []);

  const toggleGroup = useCallback((key: string) => {
    setExpandedGroup((current) => (current === key ? null : key));
  }, []);

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

  const renderChild = (child: NavChildLink) => {
    const groupKey = `${child.label}-${child.href}`;
    const isGroup = Boolean(child.isGroup && child.children?.length);
    const groupOpen = expandedGroup === groupKey;

    if (isGroup) {
      const groupHref =
        child.href && child.href !== "#" ? child.href : undefined;
      return (
        <li key={groupKey}>
          <div className="flex items-center gap-1">
            {groupHref ? (
              <Link
                href={groupHref}
                onClick={close}
                aria-current={
                  isNavActive(groupHref, pathname) ? "page" : undefined
                }
                className={cn(
                  "flex-1 rounded-lg py-2.5 pl-4 pr-2 text-left text-sm font-medium transition-colors",
                  isNavActive(groupHref, pathname)
                    ? "bg-brand-lavender/50 text-brand-navy"
                    : "text-gray-700 hover:bg-brand-lavender/40 hover:text-brand-navy",
                )}
              >
                {child.label}
              </Link>
            ) : (
              <span className="flex-1 py-2.5 pl-4 pr-2 text-left text-sm font-medium text-gray-700">
                {child.label}
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleGroup(groupKey)}
              aria-expanded={groupOpen}
              aria-label={`${groupOpen ? "Collapse" : "Expand"} ${child.label}`}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-brand-lavender/40 hover:text-brand-navy"
            >
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  groupOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
          </div>
          <ul
            className={cn(
              "mb-1 flex flex-col gap-1 overflow-hidden pl-3 transition-all",
              groupOpen ? "max-h-40" : "max-h-0",
            )}
            hidden={!groupOpen}
          >
            {child.children?.map((sub) => {
              const subActive = isNavActive(sub.href, pathname);
              return (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    onClick={close}
                    aria-current={subActive ? "page" : undefined}
                    className={cn(
                      "block rounded-lg py-2.5 pl-4 pr-4 text-sm font-medium transition-colors",
                      subActive
                        ? "bg-brand-lavender/50 text-brand-navy"
                        : "text-gray-700 hover:bg-brand-lavender/40 hover:text-brand-navy",
                    )}
                  >
                    {sub.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    }

    const childActive = isNavActive(child.href, pathname);
    return (
      <li key={child.href}>
        <Link
          href={child.href}
          onClick={close}
          aria-current={childActive ? "page" : undefined}
          className={cn(
            "block rounded-lg py-2.5 pl-4 pr-4 text-sm font-medium transition-colors",
            childActive
              ? "bg-brand-lavender/50 text-brand-navy"
              : "text-gray-700 hover:bg-brand-lavender/40 hover:text-brand-navy",
          )}
        >
          {child.label}
        </Link>
      </li>
    );
  };

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
                {nav.map((item) => {
                  const active = isNavActive(item.href, pathname);
                  const hasChildren = Boolean(item.children?.length);
                  const isOpen = expanded === item.href;
                  return (
                    <li key={item.href}>
                      <div
                        className={cn(
                          "relative flex items-center rounded-xl transition-colors",
                          active
                            ? "bg-brand-lavender/60"
                            : "hover:bg-brand-lavender/60",
                        )}
                      >
                        {active && (
                          <span
                            className="absolute inset-y-2 left-0 w-1 rounded-full bg-brand-navy"
                            aria-hidden
                          />
                        )}
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex flex-1 items-center px-4 py-3.5 text-base font-semibold",
                            active ? "text-brand-navy" : "text-gray-900",
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
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => toggleExpanded(item.href)}
                            aria-expanded={isOpen}
                            aria-controls={`mobile-submenu-${item.href}`}
                            aria-label={`Toggle ${item.label} sub-menu`}
                            className="mr-2 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-white/60"
                          >
                            <ChevronDown
                              className={cn(
                                "size-5 transition-transform duration-200",
                                isOpen && "rotate-180",
                              )}
                              aria-hidden
                            />
                          </button>
                        )}
                      </div>

                      {hasChildren && (
                        <ul
                          id={`mobile-submenu-${item.href}`}
                          className={cn(
                            "mt-1 mb-1 flex flex-col gap-1 overflow-hidden pl-4 transition-all",
                            isOpen ? "max-h-[40rem]" : "max-h-0",
                          )}
                          hidden={!isOpen}
                        >
                          {item.children?.map((child) => renderChild(child))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col gap-3 border-t border-gray-100 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Link
                  href={header.secondaryCtaHref}
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-full border border-brand-navy/25 px-6 py-3.5 text-base font-semibold text-brand-navy transition-colors hover:border-brand-navy/50 hover:bg-brand-lavender/40"
                >
                  {header.secondaryCtaLabel}
                </Link>
                <Link
                  href={header.ctaHref}
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3.5 text-base font-semibold text-black transition-colors hover:bg-brand-gold-dark"
                >
                  {header.ctaLabel}
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
