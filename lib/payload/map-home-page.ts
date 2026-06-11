import type { IconName } from "@/components/ui/icon";
import { images } from "@/lib/constants/images";
import type { HomePageContent } from "@/lib/types/home-page-content";
import type { HomePage } from "@/payload-types";
import { homePageDefaults } from "@/payload/seed/home-page-defaults";
import { getMediaUrl } from "./media-url";

const iconNames = new Set<string>([
  "chat",
  "settings",
  "chart",
  "alert",
  "project",
  "clock",
]);

function asIcon(value: string | null | undefined): IconName {
  if (value && iconNames.has(value)) {
    return value as IconName;
  }
  return "chat";
}

function cta(
  fromCms: { label?: string | null; href?: string | null } | undefined,
  fallback: { label: string; href: string },
) {
  return {
    label: fromCms?.label?.trim() || fallback.label,
    href: fromCms?.href?.trim() || fallback.href,
  };
}

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

export function mapHomePageFromCMS(
  global: HomePage | null | undefined,
): HomePageContent {
  const d = homePageDefaults;
  const cms: Partial<HomePage> = global ?? {};

  return {
    hero: {
      badge: text(cms.hero?.badge, d.hero.badge),
      titleLine1: text(cms.hero?.titleLine1, d.hero.titleLine1),
      titleAccent: text(cms.hero?.titleAccent, d.hero.titleAccent),
      primaryCta: cta(cms.hero?.primaryCta, d.hero.primaryCta),
      secondaryCta: cta(cms.hero?.secondaryCta, d.hero.secondaryCta),
      imageUrl: getMediaUrl(cms.hero?.image, images.hero),
      imageAlt: text(cms.hero?.imageAlt, d.hero.imageAlt),
    },
    problem: {
      headingGray: text(cms.problem?.headingGray, d.problem.headingGray),
      headingNavy: text(cms.problem?.headingNavy, d.problem.headingNavy),
      items:
        cms.problem?.items && cms.problem.items.length > 0
          ? cms.problem.items.map((item) => ({
              icon: asIcon(item.icon),
              text: text(item.text, ""),
            }))
          : d.problem.items.map((item) => ({ ...item })),
    },
    mission: {
      eyebrow: text(cms.mission?.eyebrow, d.mission.eyebrow),
      headingGray: text(cms.mission?.headingGray, d.mission.headingGray),
      headingNavy: text(cms.mission?.headingNavy, d.mission.headingNavy),
      roiCard: {
        label: text(cms.mission?.roiCard?.label, d.mission.roiCard.label),
        value: text(cms.mission?.roiCard?.value, d.mission.roiCard.value),
        suffix: text(cms.mission?.roiCard?.suffix, d.mission.roiCard.suffix),
        description: text(
          cms.mission?.roiCard?.description,
          d.mission.roiCard.description,
        ),
        partnersLabel: text(
          cms.mission?.roiCard?.partnersLabel,
          d.mission.roiCard.partnersLabel,
        ),
      },
      placementCardTop: {
        label: text(
          cms.mission?.placementCardTop?.label,
          d.mission.placementCardTop.label,
        ),
        value: text(
          cms.mission?.placementCardTop?.value,
          d.mission.placementCardTop.value,
        ),
        suffix: text(
          cms.mission?.placementCardTop?.suffix,
          d.mission.placementCardTop.suffix,
        ),
        description: text(
          cms.mission?.placementCardTop?.description,
          d.mission.placementCardTop.description,
        ),
      },
      alumniCard: {
        body: text(cms.mission?.alumniCard?.body, d.mission.alumniCard.body),
        rating: text(
          cms.mission?.alumniCard?.rating,
          d.mission.alumniCard.rating,
        ),
        ratingSuffix: text(
          cms.mission?.alumniCard?.ratingSuffix,
          d.mission.alumniCard.ratingSuffix,
        ),
        trustedBy: text(
          cms.mission?.alumniCard?.trustedBy,
          d.mission.alumniCard.trustedBy,
        ),
      },
      placementCardBottom: {
        label: text(
          cms.mission?.placementCardBottom?.label,
          d.mission.placementCardBottom.label,
        ),
        value: text(
          cms.mission?.placementCardBottom?.value,
          d.mission.placementCardBottom.value,
        ),
        suffix: text(
          cms.mission?.placementCardBottom?.suffix,
          d.mission.placementCardBottom.suffix,
        ),
        description: text(
          cms.mission?.placementCardBottom?.description,
          d.mission.placementCardBottom.description,
        ),
      },
      practiceCard: {
        label: text(
          cms.mission?.practiceCard?.label,
          d.mission.practiceCard.label,
        ),
        value: text(
          cms.mission?.practiceCard?.value,
          d.mission.practiceCard.value,
        ),
        description: text(
          cms.mission?.practiceCard?.description,
          d.mission.practiceCard.description,
        ),
      },
    },
    instructor: {
      eyebrow: text(cms.instructor?.eyebrow, d.instructor.eyebrow),
      title: text(cms.instructor?.title, d.instructor.title),
      titleHighlight: text(
        cms.instructor?.titleHighlight,
        d.instructor.titleHighlight,
      ),
      photoUrl: getMediaUrl(cms.instructor?.photo, images.instructor),
      journeyHeading: text(
        cms.instructor?.journeyHeading,
        d.instructor.journeyHeading,
      ),
      journeyBody: text(cms.instructor?.journeyBody, d.instructor.journeyBody),
      skillsHeading: text(
        cms.instructor?.skillsHeading,
        d.instructor.skillsHeading,
      ),
      skillsBody: text(cms.instructor?.skillsBody, d.instructor.skillsBody),
      featuresLeft:
        cms.instructor?.featuresLeft && cms.instructor.featuresLeft.length > 0
          ? cms.instructor.featuresLeft.map((f) => ({
              title: text(f.title, ""),
              description: text(f.description, ""),
            }))
          : d.instructor.featuresLeft.map((f) => ({ ...f })),
      featuresRight:
        cms.instructor?.featuresRight &&
        cms.instructor.featuresRight.length > 0
          ? cms.instructor.featuresRight.map((f) => ({
              title: text(f.title, ""),
              description: text(f.description, ""),
            }))
          : d.instructor.featuresRight.map((f) => ({ ...f })),
    },
    curriculum: {
      eyebrow: text(cms.curriculum?.eyebrow, d.curriculum.eyebrow),
      titleLine1: text(cms.curriculum?.titleLine1, d.curriculum.titleLine1),
      titleLine2: text(cms.curriculum?.titleLine2, d.curriculum.titleLine2),
      titleHighlight: text(
        cms.curriculum?.titleHighlight,
        d.curriculum.titleHighlight,
      ),
      titleLine2Suffix: text(
        cms.curriculum?.titleLine2Suffix,
        d.curriculum.titleLine2Suffix,
      ),
      modules:
        cms.curriculum?.modules && cms.curriculum.modules.length > 0
          ? cms.curriculum.modules.map((m) => ({
              num: text(m.num, ""),
              title: text(m.title, ""),
              desc: text(m.desc, ""),
            }))
          : d.curriculum.modules.map((m) => ({ ...m })),
      ctaEyebrow: text(cms.curriculum?.ctaEyebrow, d.curriculum.ctaEyebrow),
      ctaTitle: text(cms.curriculum?.ctaTitle, d.curriculum.ctaTitle),
      cta: cta(cms.curriculum?.cta, d.curriculum.cta),
    },
    testimonials: {
      eyebrow: text(cms.testimonials?.eyebrow, d.testimonials.eyebrow),
      title: text(cms.testimonials?.title, d.testimonials.title),
      titleHighlight: text(
        cms.testimonials?.titleHighlight,
        d.testimonials.titleHighlight,
      ),
      items:
        cms.testimonials?.items && cms.testimonials.items.length > 0
          ? cms.testimonials.items.map((t) => ({
              name: text(t.name, ""),
              role: text(t.role, ""),
              initials: text(t.initials, ""),
              quote: text(t.quote, ""),
            }))
          : d.testimonials.items.map((t) => ({ ...t })),
    },
    preFooter: {
      badge: text(cms.preFooter?.badge, d.preFooter.badge),
      headingLine1: text(cms.preFooter?.headingLine1, d.preFooter.headingLine1),
      headingLine2: text(cms.preFooter?.headingLine2, d.preFooter.headingLine2),
      description: text(cms.preFooter?.description, d.preFooter.description),
      phoneButtonLabel: text(
        cms.preFooter?.phoneButtonLabel,
        d.preFooter.phoneButtonLabel,
      ),
      emailButtonLabel: text(
        cms.preFooter?.emailButtonLabel,
        d.preFooter.emailButtonLabel,
      ),
    },
  };
}
