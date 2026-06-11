"use client";

import { useState } from "react";
import { CircleCheck, Plus, X } from "lucide-react";
import type { SyllabusItem } from "@/lib/constants/course-detail-content";
import { cn } from "@/lib/utils/cn";

type SyllabusModuleAccordionProps = {
  items: SyllabusItem[];
};

export function SyllabusModuleAccordion({ items }: SyllabusModuleAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <ul className="flex flex-col gap-5">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <li key={item.id}>
            <article
              className={cn(
                "rounded-2xl border border-[#e3e3e3] bg-white transition-shadow",
                isOpen && "shadow-[0px_4px_24px_-8px_rgba(8,63,136,0.12)]",
              )}
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-0 p-5 sm:gap-x-6 sm:p-6 md:p-8">
                <p className="shrink-0 pt-0.5 text-sm font-bold text-brand-navy sm:text-base">
                  {item.number}
                </p>

                <h3 className="min-w-0 break-words text-xl font-bold leading-tight tracking-tight text-[#0b1023] sm:text-2xl md:text-[28px] md:leading-9">
                  {item.title}
                </h3>

                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors sm:size-10",
                    isOpen
                      ? "bg-brand-navy text-white hover:bg-brand-navy-dark"
                      : "border border-[#b1b1b1] bg-white text-brand-navy hover:bg-[#f5f5f5]",
                  )}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Close" : "Open"} ${item.title}`}
                >
                  {isOpen ? (
                    <X className="size-4 sm:size-5" strokeWidth={2.5} />
                  ) : (
                    <Plus className="size-4 sm:size-5" strokeWidth={2.5} />
                  )}
                </button>
              </div>

              {isOpen && item.topics.length > 0 ? (
                <div className="border-t border-[#e3e3e3] px-5 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-6 md:px-8 md:pb-8">
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6">
                    <span
                      className="invisible shrink-0 pt-0.5 text-sm font-bold sm:text-base"
                      aria-hidden
                    >
                      {item.number}
                    </span>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                    {item.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex min-w-0 items-start gap-2.5"
                      >
                        <span
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-gold"
                          aria-hidden
                        >
                          <CircleCheck
                            className="size-3 text-[#0b1023]"
                            strokeWidth={3}
                          />
                        </span>
                        <span className="min-w-0 break-words text-base leading-snug text-[#5a637b]">
                          {topic}
                        </span>
                      </li>
                    ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
