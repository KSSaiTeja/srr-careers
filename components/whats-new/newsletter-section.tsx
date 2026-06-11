import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { newsletterSection } from "@/lib/constants/whats-new-content";

/** Figma 90:2023 — Stay in the loop newsletter CTA band. */
export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="w-full bg-gradient-to-br from-brand-navy to-black py-11 sm:py-14"
    >
      <div className="mx-auto flex max-w-[982px] flex-col items-center gap-10 px-6 text-center sm:gap-14">
        <div className="flex flex-col gap-6 sm:gap-8">
          <h2
            id="newsletter-heading"
            className="font-serif text-3xl font-semibold italic leading-tight text-[#ffc31a] sm:text-4xl sm:leading-snug md:text-[48px] md:leading-[64px]"
          >
            {newsletterSection.title}
          </h2>
          <p className="text-lg font-medium leading-normal text-[#d8d8d8] sm:text-xl">
            {newsletterSection.description}
          </p>
        </div>

        <Link
          href={newsletterSection.ctaHref}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#ffc31a] px-6 py-3.5 text-base font-semibold text-black transition-colors hover:bg-brand-gold"
        >
          {newsletterSection.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
