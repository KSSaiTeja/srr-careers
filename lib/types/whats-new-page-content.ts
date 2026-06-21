export type UpdateFilterCategory =
  | "all"
  | "admissions"
  | "curriculum"
  | "placements"
  | "notices"
  | "events";

export type UpdateCategory = Exclude<UpdateFilterCategory, "all">;

export type UpdateBadgeVariant = "update" | "notice" | "alert" | "update-navy";

export type UpdateCta = {
  label: string;
  href: string;
};

export type WhatsNewUpdate = {
  id: string;
  category: UpdateCategory;
  badge: UpdateBadgeVariant;
  badgeLabel: string;
  timeAgo: string;
  title: string;
  description: string[];
  /** When true the card renders as the large highlighted "pinned" block. */
  pinned: boolean;
  /** Optional call-to-action button. Null when no button should be shown. */
  cta: UpdateCta | null;
};

export type WhatsNewPageContent = {
  pageTitle: string;
  updates: WhatsNewUpdate[];
  newsletter: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
};
