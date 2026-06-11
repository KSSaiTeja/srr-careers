"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { WhatsNewIntroArea } from "@/components/whats-new/whats-new-intro-area";
import { WhatsNewHeroSection } from "@/components/whats-new/whats-new-hero-section";
import { WhatsNewSection } from "@/components/whats-new/whats-new-section";
import { CategoryFilter } from "@/components/whats-new/category-filter";
import { UpdatesFeedSection } from "@/components/whats-new/updates-feed-section";
import type { UpdateFilterCategory } from "@/lib/constants/whats-new-content";

export function WhatsNewIntroHeader() {
  const [activeCategory, setActiveCategory] =
    useState<UpdateFilterCategory>("all");

  return (
    <div className="flex min-w-0 flex-col">
      <WhatsNewIntroArea>
        <WhatsNewHeroSection />
        {/* Tabs: no side container padding on mobile — avoids left clip + enables swipe */}
        <WhatsNewSection
          className="min-w-0 bg-transparent pb-0"
          containerClassName="max-w-[1218px] !px-0 lg:!px-8"
        >
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </WhatsNewSection>
      </WhatsNewIntroArea>
      <AnimatedSection variant="fade-up" staggerChildren>
        <UpdatesFeedSection activeCategory={activeCategory} />
      </AnimatedSection>
    </div>
  );
}
