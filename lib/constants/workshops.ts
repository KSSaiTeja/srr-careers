/**
 * Workshop programmes — defaults live in Payload seed files.
 * Prefer `getWorkshopsPageContent` / `getWorkshopDetailPageContent` at runtime.
 */

import { workshopsPageDefaults } from "@/payload/seed/workshops-page-defaults";
import {
  mapWorkshopDetailFromDefaults,
} from "@/lib/payload/map-workshops";
import { workshopDetailsDefaults } from "@/payload/seed/workshop-details-defaults";

export type {
  WorkshopDefinition,
  WorkshopFormat,
  WorkshopModule,
  WorkshopSession,
} from "@/lib/types/workshops-content";

export const WORKSHOP_PRICING_LABEL =
  workshopsPageDefaults.shared.pricingLabel;

export const WORKSHOP_PRICING_NOTE =
  workshopsPageDefaults.shared.pricingNote;

export const WORKSHOP_DURATION_LABEL =
  workshopsPageDefaults.shared.durationLabel;

export const WORKSHOP_DURATION_NOTE =
  workshopsPageDefaults.shared.durationNote;

export const workshops = workshopDetailsDefaults
  .filter((entry) => entry.published)
  .map((entry) => mapWorkshopDetailFromDefaults(entry.slug)!)
  .filter(Boolean);

export function getWorkshopBySlug(slug: string) {
  return mapWorkshopDetailFromDefaults(slug);
}

export function getWorkshopSlugs(): string[] {
  return workshopDetailsDefaults
    .filter((entry) => entry.published)
    .map((entry) => entry.slug);
}
