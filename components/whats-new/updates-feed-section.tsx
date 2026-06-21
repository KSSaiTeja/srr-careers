"use client";

import { useMemo } from "react";
import type {
  UpdateFilterCategory,
  WhatsNewUpdate,
} from "@/lib/types/whats-new-page-content";
import { WhatsNewSection } from "@/components/whats-new/whats-new-section";
import { PinnedUpdateCard } from "@/components/whats-new/pinned-update-card";
import { UpdateRow } from "@/components/whats-new/update-row";
import { UpdatesEmptyState } from "@/components/whats-new/updates-empty-state";

function matchesCategory(
  itemCategory: string,
  filter: UpdateFilterCategory,
): boolean {
  return filter === "all" || itemCategory === filter;
}

type UpdatesFeedSectionProps = {
  updates: WhatsNewUpdate[];
  activeCategory: UpdateFilterCategory;
};

export function UpdatesFeedSection({
  updates,
  activeCategory,
}: UpdatesFeedSectionProps) {
  const { pinnedUpdates, listedUpdates } = useMemo(() => {
    const visible = updates.filter((item) =>
      matchesCategory(item.category, activeCategory),
    );
    return {
      pinnedUpdates: visible.filter((item) => item.pinned),
      listedUpdates: visible.filter((item) => !item.pinned),
    };
  }, [updates, activeCategory]);

  const isEmpty = pinnedUpdates.length === 0 && listedUpdates.length === 0;

  return (
    <WhatsNewSection
      id="updates-feed"
      aria-labelledby="whats-new-page-title"
      className="relative z-20 bg-white pb-0 pt-2 sm:pt-4"
      containerClassName="relative"
    >
      <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
        {pinnedUpdates.length > 0 ? (
          <div className="flex flex-col gap-8 sm:gap-10">
            {pinnedUpdates.map((update) => (
              <PinnedUpdateCard
                key={update.id}
                update={update}
                headingId={`pinned-update-${update.id}`}
              />
            ))}
          </div>
        ) : null}

        {listedUpdates.length > 0 ? (
          <div className="flex flex-col divide-y divide-[#d9d9d9]">
            {listedUpdates.map((update) => (
              <UpdateRow key={update.id} update={update} />
            ))}
          </div>
        ) : null}

        {isEmpty ? <UpdatesEmptyState category={activeCategory} /> : null}
      </div>
    </WhatsNewSection>
  );
}
