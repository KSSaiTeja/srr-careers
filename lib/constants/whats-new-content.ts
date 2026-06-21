import type { UpdateFilterCategory } from "@/lib/types/whats-new-page-content";

export type {
  UpdateFilterCategory,
  UpdateCategory,
  UpdateBadgeVariant,
  UpdateCta,
  WhatsNewUpdate,
  WhatsNewPageContent,
} from "@/lib/types/whats-new-page-content";

/** Static filter tabs — tied to the category enum, not editable copy. */
export const categoryFilters: ReadonlyArray<{
  id: UpdateFilterCategory;
  label: string;
}> = [
  { id: "all", label: "ALL UPDATES" },
  { id: "admissions", label: "ADMISSIONS" },
  { id: "curriculum", label: "CURRICULUM" },
  { id: "placements", label: "PLACEMENTS" },
  { id: "notices", label: "NOTICES" },
  { id: "events", label: "EVENTS" },
] as const;
