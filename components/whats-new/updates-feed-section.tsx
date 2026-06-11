"use client";

import { useMemo } from "react";
import {
  pinnedUpdate,
  updates,
  type UpdateFilterCategory,
} from "@/lib/constants/whats-new-content";
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
  activeCategory: UpdateFilterCategory;
};

export function UpdatesFeedSection({ activeCategory }: UpdatesFeedSectionProps) {
  const showPinned = matchesCategory(pinnedUpdate.category, activeCategory);

  const filteredUpdates = useMemo(
    () => updates.filter((item) => matchesCategory(item.category, activeCategory)),
    [activeCategory],
  );

  const hasListItems = filteredUpdates.length > 0;
  const isEmpty = !showPinned && !hasListItems;

  return (
    <WhatsNewSection
      id="updates-feed"
      aria-labelledby="whats-new-page-title"
      className="relative z-20 bg-white pb-0 pt-2 sm:pt-4"
      containerClassName="relative"
    >
      <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16">
        {showPinned ? <PinnedUpdateCard /> : null}

        {hasListItems ? (
          <div className="flex flex-col divide-y divide-[#d9d9d9]">
            {filteredUpdates.map((update) => (
              <UpdateRow key={update.id} update={update} />
            ))}
          </div>
        ) : null}

        {isEmpty ? <UpdatesEmptyState category={activeCategory} /> : null}
      </div>
    </WhatsNewSection>
  );
}
