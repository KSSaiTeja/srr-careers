"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItem[];
  askLinkHref: string;
  askLinkLabel: string;
};

export function FaqList({ items, askLinkHref, askLinkLabel }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-w-0 flex-1 lg:max-w-[699px]">
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <li key={item.question} data-reveal-item>
              <div
                className={cn(
                  "overflow-hidden rounded-xl border bg-white transition-all duration-300",
                  isOpen
                    ? "border-brand-navy/25 shadow-[0_8px_30px_-12px_rgba(8,63,136,0.25)]"
                    : "border-[#eaebf6] shadow-sm hover:border-brand-navy/15 hover:shadow-md",
                )}
              >
                <button
                  type="button"
                  id={`faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center gap-4 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold tabular-nums transition-colors",
                      isOpen
                        ? "bg-brand-navy text-white"
                        : "bg-brand-lavender text-brand-navy",
                    )}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-base font-medium leading-snug text-[#2d2d2d] sm:text-lg sm:leading-normal">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 transition-transform duration-300",
                      isOpen && "rotate-180 bg-brand-navy/15",
                    )}
                  >
                    <ChevronDown
                      className="size-5 text-brand-navy"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </button>

                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-[#eaebf6]/80 px-4 pb-4 pt-3 text-base leading-relaxed text-[#525252] sm:px-5 sm:pb-5 sm:pl-[4.25rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 rounded-xl border border-dashed border-brand-navy/20 bg-brand-lavender/50 px-5 py-4 text-center text-sm text-[#525252] sm:text-left">
        Still have questions?{" "}
        <Link
          href={askLinkHref}
          className="font-semibold text-brand-navy underline decoration-brand-navy/30 underline-offset-4 hover:decoration-brand-navy"
        >
          {askLinkLabel}
        </Link>
      </p>
    </div>
  );
}
