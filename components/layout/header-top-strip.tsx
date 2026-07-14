"use client";

import { Mail, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/layout/site-settings-context";
import { cn } from "@/lib/utils/cn";

const stripLinkClass =
  "inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-white";

export function HeaderTopStrip({ className }: { className?: string }) {
  const { topStrip, contact } = useSiteSettings();

  if (!topStrip.enabled) return null;

  return (
    <div
      className={cn(
        "border-b border-white/10 bg-brand-navy text-white",
        className,
      )}
    >
      <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-3 px-5 py-2 sm:gap-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20">
        <span className="min-w-0 truncate text-xs font-medium tracking-wide sm:text-sm">
          {topStrip.label}
        </span>

        <div className="flex min-w-0 shrink items-center gap-2.5 text-xs sm:gap-5 sm:text-sm">
          <a href={contact.phoneHref} className={stripLinkClass}>
            <Phone className="size-3.5 shrink-0 opacity-80" aria-hidden />
            <span className="whitespace-nowrap">{contact.phone}</span>
          </a>
          <a href={contact.emailHref} className={cn(stripLinkClass, "min-w-0")}>
            <Mail className="size-3.5 shrink-0 opacity-80" aria-hidden />
            <span className="truncate">{contact.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
