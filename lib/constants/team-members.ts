/**
 * Team / faculty profiles for `/our-team`.
 *
 * Prefer updating photos and copy via the Payload CMS global **Our Team Page**.
 * Default headshots live under `public/images/team/` (square ≈480×480).
 */

import { ourTeamPageDefaults } from "@/payload/seed/our-team-page-defaults";
import type { TeamMember } from "@/lib/types/our-team-page-content";

export type { TeamMember } from "@/lib/types/our-team-page-content";

export const TEAM_HEADSHOT_SIZE = {
  width: 480,
  height: 480,
} as const;

/** Static fallback list when CMS is unavailable. Prefer `getOurTeamPageContent`. */
export const teamMembers: TeamMember[] =
  ourTeamPageDefaults.membersSection.members.map((member) => ({
    id: member.slug,
    name: member.name,
    credential: member.credential,
    imageSrc: member.fallbackImagePath,
    placeholderGradient: member.placeholderGradient,
    bio: member.bio.map((p) => p.text),
    workshops: member.workshops.map((w) => w.title),
  }));
