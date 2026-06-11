import { Inbox } from "lucide-react";
import type { UpdateFilterCategory } from "@/lib/constants/whats-new-content";
import { categoryFilters } from "@/lib/constants/whats-new-content";

const emptyCopy: Record<
  UpdateFilterCategory,
  { heading: string; body: string }
> = {
  all: {
    heading: "No updates yet",
    body: "There is nothing to show right now. Check back soon for the latest from SRR Careers.",
  },
  admissions: {
    heading: "Nothing in Admissions",
    body: "There are no admissions updates in this category at the moment.",
  },
  curriculum: {
    heading: "Nothing in Curriculum",
    body: "There is nothing in this category yet. New curriculum updates will appear here.",
  },
  placements: {
    heading: "Nothing in Placements",
    body: "There are no placement updates right now. New announcements will show up here.",
  },
  notices: {
    heading: "No notices right now",
    body: "There are no notifications in this category. Important notices will appear here when published.",
  },
  events: {
    heading: "No events listed",
    body: "There is nothing in this category at the moment. Upcoming events will be posted here.",
  },
};

function getCategoryLabel(id: UpdateFilterCategory): string {
  return (
    categoryFilters.find((filter) => filter.id === id)?.label ??
    "this category"
  );
}

type UpdatesEmptyStateProps = {
  category: UpdateFilterCategory;
};

export function UpdatesEmptyState({ category }: UpdatesEmptyStateProps) {
  const copy = emptyCopy[category];

  return (
    <div
      className="flex flex-col items-center rounded-2xl border border-dashed border-[#d8d8d8] bg-[#fafafa] px-6 py-14 text-center sm:px-10 sm:py-16"
      role="status"
    >
      <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-brand-lavender/80">
        <Inbox className="size-7 text-brand-navy" strokeWidth={1.75} aria-hidden />
      </span>
      <h2 className="text-xl font-semibold text-[#0b1023] sm:text-2xl">
        {copy.heading}
      </h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-[#5a637b] sm:text-lg">
        {copy.body}
      </p>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#8a93a8]">
        {getCategoryLabel(category)}
      </p>
    </div>
  );
}
