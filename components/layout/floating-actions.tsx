"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, GraduationCap, X } from "lucide-react";
import { useSiteSettings } from "@/components/layout/site-settings-context";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils/cn";

/**
 * Fixed bottom-right stack: internship CTA above WhatsApp.
 * Dismiss hides it until the next page reload. Hidden on /internships.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const { contact } = useSiteSettings();
  const [dismissed, setDismissed] = useState(false);

  const onInternshipsPage = pathname === "/internships";
  const showInternship = !dismissed && !onInternshipsPage;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-50 flex flex-col items-end gap-3",
        "[bottom:max(1rem,env(safe-area-inset-bottom))] [right:max(1rem,env(safe-area-inset-right))]",
      )}
    >
      {showInternship ? (
        <div className="pointer-events-auto relative animate-internship-pop">
          <span
            className="pointer-events-none absolute -inset-1 rounded-2xl bg-brand-gold/50 opacity-70 blur-md"
            aria-hidden
          />

          <div className="relative max-w-[min(calc(100vw-2rem),19rem)]">
            <Link
              href="/internships"
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white py-3 pl-3.5 pr-11 shadow-xl shadow-brand-navy/15 ring-1 ring-brand-gold/40 transition-colors hover:bg-brand-lavender/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/20"
            >
              <span
                className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-brand-gold via-brand-gold-dark to-brand-navy"
                aria-hidden
              />
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white">
                <span
                  className="absolute inset-0 animate-ping rounded-xl bg-brand-navy/40"
                  aria-hidden
                />
                <GraduationCap className="relative size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-navy">
                  Now open
                </span>
                <span className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  Internships
                  <ArrowRight
                    className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="block text-xs font-medium text-brand-navy underline-offset-2 group-hover:underline">
                  Apply now
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss internship notice"
              className="absolute right-1.5 top-1.5 z-10 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}

      <a
        href={contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SRR Careers on WhatsApp"
        className="pointer-events-auto flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-colors hover:bg-[#20bd5a] sm:size-14"
      >
        <SocialIcon platform="whatsapp" className="size-7" />
      </a>
    </div>
  );
}
