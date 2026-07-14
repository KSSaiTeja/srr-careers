"use client";

import { useState } from "react";
import type { WorkshopFormat, WorkshopModule } from "@/lib/types/workshops-content";

function ModuleList({ modules }: { modules: WorkshopModule[] }) {
  return (
    <ol className="divide-y divide-[#eee]">
      {modules.map((module, index) => (
        <li
          key={`${module.title}-${index}`}
          className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0 sm:py-4"
        >
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-navy/8 text-xs font-semibold text-brand-navy">
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-gray-800 sm:text-base">
              {module.title}
            </p>
          </div>
          {module.duration ? (
            <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm">
              {module.duration}
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

type WorkshopFormatTabsProps = {
  formats: WorkshopFormat[];
  audienceLabel?: string;
};

export function WorkshopFormatTabs({
  formats,
  audienceLabel = "Audience:",
}: WorkshopFormatTabsProps) {
  const [activeFormatId, setActiveFormatId] = useState(formats[0]?.id ?? "");
  const activeFormat =
    formats.find((format) => format.id === activeFormatId) ?? formats[0];

  if (!activeFormat) return null;

  return (
    <div className="mt-6">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Workshop formats"
      >
        {formats.map((format) => {
          const selected = format.id === activeFormat.id;
          return (
            <button
              key={format.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveFormatId(format.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-brand-navy text-white"
                  : "border border-brand-navy/20 bg-white text-brand-navy hover:border-brand-navy/40"
              }`}
            >
              {format.duration.split(" (")[0]}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-[#eaeaea] bg-white p-5 sm:mt-6 sm:p-7">
        <div className="flex flex-col gap-3 border-b border-[#eee] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              {activeFormat.title}
            </h3>
            {activeFormat.note ? (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-gray-600">
                {activeFormat.note}
              </p>
            ) : null}
          </div>
          <p className="shrink-0 text-sm font-semibold text-brand-navy">
            {activeFormat.duration}
          </p>
        </div>
        {activeFormat.audience ? (
          <p className="mt-4 text-sm text-gray-600">
            <span className="font-medium text-gray-900">{audienceLabel} </span>
            {activeFormat.audience}
          </p>
        ) : null}
        <div className="mt-5">
          <ModuleList modules={activeFormat.modules} />
        </div>
      </div>
    </div>
  );
}
