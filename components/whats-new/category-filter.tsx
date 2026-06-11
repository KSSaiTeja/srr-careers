"use client";

import {
  useCallback,
  useRef,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { UpdateFilterCategory } from "@/lib/constants/whats-new-content";
import { categoryFilters } from "@/lib/constants/whats-new-content";
import { cn } from "@/lib/utils/cn";

type CategoryFilterProps = {
  active: UpdateFilterCategory;
  onChange: (category: UpdateFilterCategory) => void;
};

const DRAG_THRESHOLD_PX = 8;

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    tracking: false,
    dragging: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const resetDrag = useCallback((pointerId: number) => {
    const state = dragState.current;
    if (state.dragging && state.pointerId === pointerId) {
      scrollRef.current?.releasePointerCapture(pointerId);
    }

    state.tracking = false;
    state.dragging = false;
    state.pointerId = -1;
  }, []);

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth + 1) return;

    dragState.current = {
      tracking: true,
      dragging: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  }, []);

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = scrollRef.current;
    if (!state.tracking || state.pointerId !== event.pointerId || !el) return;

    const delta = event.clientX - state.startX;

    if (!state.dragging) {
      if (Math.abs(delta) < DRAG_THRESHOLD_PX) return;

      state.dragging = true;
      state.moved = true;
      el.setPointerCapture(event.pointerId);
    }

    el.scrollLeft = state.startScrollLeft - delta;
  }, []);

  const onPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      resetDrag(event.pointerId);
    },
    [resetDrag],
  );

  const onPointerCancel = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      resetDrag(event.pointerId);
    },
    [resetDrag],
  );

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: UpdateFilterCategory,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(id);
    }
  };

  const handleTabClick = (id: UpdateFilterCategory) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    onChange(id);
  };

  return (
    <div className="w-full border-b border-[#d8d8d8]">
      <div
        ref={scrollRef}
        className={cn(
          "flex w-full max-w-full cursor-grab gap-4 overflow-x-auto overscroll-x-contain active:cursor-grabbing",
          "snap-x snap-proximity scroll-smooth py-0 pl-5 pr-8 select-none",
          "touch-pan-x [-webkit-overflow-scrolling:touch]",
          "sm:pl-6 sm:pr-10 md:gap-10 lg:gap-12 xl:cursor-default xl:select-auto xl:gap-16 xl:overflow-x-visible xl:pl-0 xl:pr-0",
          "[-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden",
        )}
        role="tablist"
        aria-label="Filter updates by category"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {categoryFilters.map((filter) => {
          const isActive = filter.id === active;

          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(filter.id)}
              onKeyDown={(event) => handleKeyDown(event, filter.id)}
              className={cn(
                "shrink-0 snap-start -mb-px touch-manipulation border-b pb-4 text-left transition-colors",
                "flex-[0_0_72%] sm:flex-[0_0_58%] md:flex-[0_0_48%] xl:flex-none xl:w-auto",
                "text-sm tracking-[0.15em] md:text-base md:tracking-[0.2em] xl:tracking-[0.25em]",
                isActive
                  ? "border-brand-navy font-semibold text-brand-navy"
                  : "border-transparent font-normal text-[#5a637b]",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
