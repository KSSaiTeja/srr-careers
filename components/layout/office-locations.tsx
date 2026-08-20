"use client";

import { useSiteSettings } from "@/components/layout/site-settings-context";
import { cn } from "@/lib/utils/cn";

const footerHeadingClass = "text-sm font-bold tracking-tight text-[#0b1023]";
const footerMutedClass = "text-sm leading-5 text-[#5a637b]";
const footerLinkClass =
  "text-sm leading-5 text-[#5a637b] transition-colors hover:text-[#0b1023]";

type OfficeLocationsProps = {
  className?: string;
};

/** Compact office addresses + map embeds for the site footer. */
export function OfficeLocations({ className }: OfficeLocationsProps) {
  const { contact } = useSiteSettings();
  const locations = contact.locations;

  if (!locations.length) return null;

  return (
    <div id="locations" className={cn("scroll-mt-24", className)}>
      <h3 className={cn(footerHeadingClass, "mb-5")}>Offices</h3>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        {locations.map((office) => (
          <div key={`${office.label}-${office.city}`} className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1023]">
              {office.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#0b1023]">
              {office.city}
            </p>
            <p className={cn(footerMutedClass, "mt-2")}>{office.address}</p>
            {office.phone && office.phoneHref ? (
              <a
                href={office.phoneHref}
                className={cn(footerLinkClass, "mt-1.5 inline-block")}
              >
                {office.phone}
              </a>
            ) : null}
            {office.mapsUrl ? (
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(footerLinkClass, "mt-1 block")}
              >
                View on Google Maps
              </a>
            ) : null}
            {office.mapsEmbedUrl ? (
              <div className="relative mt-3 h-40 w-full overflow-hidden rounded-xl border border-[#e3e3f2] bg-[#f4f5f9] sm:h-44">
                <iframe
                  title={`Map — ${office.label}, ${office.city}`}
                  src={office.mapsEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
