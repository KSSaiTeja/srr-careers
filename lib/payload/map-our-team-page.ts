import type { OurTeamPageContent, TeamMember } from "@/lib/types/our-team-page-content";
import type { OurTeamPage } from "@/payload-types";
import { ourTeamPageDefaults } from "@/payload/seed/our-team-page-defaults";
import { getMediaUrl } from "./media-url";

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

const DEFAULT_GRADIENT =
  "from-brand-lavender via-brand-purple-light to-brand-purple";

function mapMemberFromDefault(
  member: (typeof ourTeamPageDefaults.membersSection.members)[number],
): TeamMember {
  return {
    id: member.slug,
    name: member.name,
    credential: member.credential,
    imageSrc: member.fallbackImagePath,
    placeholderGradient: member.placeholderGradient,
    bio: member.bio.map((p) => p.text),
    workshops: member.workshops.map((w) => w.title),
  };
}

function mapMemberFromCMS(
  member: NonNullable<
    NonNullable<OurTeamPage["membersSection"]>["members"]
  >[number],
  defaultsBySlug: Map<string, (typeof ourTeamPageDefaults.membersSection.members)[number]>,
): TeamMember {
  const slug = text(member.slug, "member");
  const fallback = defaultsBySlug.get(slug);
  const fallbackPath = text(
    member.fallbackImagePath,
    fallback?.fallbackImagePath ?? "",
  );

  return {
    id: slug,
    name: text(member.name, fallback?.name ?? "Team member"),
    credential: text(member.credential, fallback?.credential ?? ""),
    imageSrc: getMediaUrl(member.photo, fallbackPath),
    placeholderGradient: text(
      member.placeholderGradient,
      fallback?.placeholderGradient ?? DEFAULT_GRADIENT,
    ),
    bio:
      member.bio && member.bio.length > 0
        ? member.bio.map((p) => text(p.text, "")).filter(Boolean)
        : (fallback?.bio.map((p) => p.text) ?? []),
    workshops: (member.workshops ?? []).map((w) => text(w.title, "")).filter(Boolean),
  };
}

export function mapOurTeamPageFromCMS(
  global: OurTeamPage | null | undefined,
): OurTeamPageContent {
  const d = ourTeamPageDefaults;
  const cms: Partial<OurTeamPage> = global ?? {};
  const defaultsBySlug = new Map(
    d.membersSection.members.map((m) => [m.slug, m]),
  );

  const cmsMembers = cms.membersSection?.members;
  const members =
    cmsMembers && cmsMembers.length > 0
      ? cmsMembers.map((m) => mapMemberFromCMS(m, defaultsBySlug))
      : d.membersSection.members.map(mapMemberFromDefault);

  return {
    intro: {
      pageTitle: text(cms.intro?.pageTitle, d.intro.pageTitle),
      headline: text(cms.intro?.headline, d.intro.headline),
      subtext: text(cms.intro?.subtext, d.intro.subtext),
    },
    viewProfileLabel: text(
      cms.membersSection?.viewProfileLabel,
      d.membersSection.viewProfileLabel,
    ),
    workshopsHeading: text(
      cms.membersSection?.workshopsHeading,
      d.membersSection.workshopsHeading,
    ),
    members,
  };
}
