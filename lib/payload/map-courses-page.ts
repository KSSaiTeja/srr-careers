import type {
  CourseOffering,
  CourseOfferingVariant,
  CoursesPageContent,
  TrackBadgeVariant,
  TrackCard,
} from "@/lib/types/courses-page-content";
import type { CoursesPage } from "@/payload-types";
import { getCoursePrice } from "@/lib/payment/course-prices";
import { coursesPageDefaults } from "@/payload/seed/courses-page-defaults";

const TRACK_SIGNPOST_IMAGE = "/images/courses/track-signpost.png";

const TRACK_IMAGES: Record<TrackBadgeVariant, { src: string; alt: string }> = {
  consultant: {
    src: "/images/courses/track-builder.png",
    alt: "SAP FICO consultant track illustration",
  },
  "end-user": {
    src: "/images/courses/track-operator.png",
    alt: "SAP FICO end-user track illustration",
  },
};

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function toLines(value: string | null | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function asOfferingVariant(
  value: string | null | undefined,
): CourseOfferingVariant {
  return value === "end-user" ? "end-user" : "consultant";
}

function asTrackVariant(value: string | null | undefined): TrackBadgeVariant {
  return value === "end-user" ? "end-user" : "consultant";
}

type RawCourse = NonNullable<
  NonNullable<CoursesPage["offerings"]>["courses"]
>[number];
type RawTrack = NonNullable<
  NonNullable<CoursesPage["trackComparison"]>["tracks"]
>[number];

function slugFromHref(href: string): string {
  return href.split("?")[0].replace(/\/+$/, "").split("/").pop() ?? "";
}

function positiveNumber(
  value: number | null | undefined,
): number | undefined {
  return typeof value === "number" && value > 0 ? value : undefined;
}

function mapOffering(raw: RawCourse): CourseOffering {
  const variant = asOfferingVariant(raw.variant);
  const ctaHref = text(raw.ctaHref, "/courses");
  const slug = slugFromHref(ctaHref);
  const fallbackPrice = getCoursePrice(slug);
  return {
    id: `${variant}-track`,
    slug,
    title: text(raw.title, ""),
    description: text(raw.description, ""),
    variant,
    duration: raw.duration?.trim() ?? "",
    durationSuffix: raw.durationSuffix?.trim() ?? "",
    modules: raw.modules?.trim() ?? "",
    outcome: text(raw.outcome, ""),
    highlights: toLines(raw.highlights),
    price: positiveNumber(raw.price) ?? fallbackPrice.price,
    originalPrice:
      positiveNumber(raw.originalPrice) ?? fallbackPrice.originalPrice,
    ctaLabel: text(raw.ctaLabel, "View course details"),
    ctaHref,
  };
}

function mapTrack(raw: RawTrack): TrackCard {
  const variant = asTrackVariant(raw.badgeVariant);
  const image = TRACK_IMAGES[variant];
  return {
    id: `${variant}-track`,
    badge: text(raw.badge, ""),
    badgeVariant: variant,
    personaPrefix: text(raw.personaPrefix, "The"),
    persona: text(raw.persona, ""),
    personaDescription: text(raw.personaDescription, ""),
    image: image.src,
    imageAlt: image.alt,
    workLabel: text(raw.workLabel, "you'll work on"),
    workItems: toLines(raw.workItems),
    toolsLabel: text(raw.toolsLabel, "TOOLS YOU'LL TOUCH"),
    tools: toLines(raw.tools),
    outcomeLabel: text(raw.outcomeLabel, "OUTCOME"),
    outcome: text(raw.outcome, ""),
    tags: toLines(raw.tags),
  };
}

export function mapCoursesPageFromCMS(
  global: CoursesPage | null | undefined,
): CoursesPageContent {
  const d = coursesPageDefaults;
  const cms: Partial<CoursesPage> = global ?? {};

  const cmsCourses = cms.offerings?.courses;
  const rawCourses =
    cmsCourses && cmsCourses.length > 0
      ? cmsCourses
      : (d.offerings.courses as unknown as RawCourse[]);

  const cmsTracks = cms.trackComparison?.tracks;
  const rawTracks =
    cmsTracks && cmsTracks.length > 0
      ? cmsTracks
      : (d.trackComparison.tracks as unknown as RawTrack[]);

  const cmsFaq = cms.faq?.items;
  const faqItems =
    cmsFaq && cmsFaq.length > 0
      ? cmsFaq.map((item) => ({
          question: text(item.question, ""),
          answer: text(item.answer, ""),
        }))
      : d.faq.items.map((item) => ({ ...item }));

  return {
    intro: {
      pageTitle: text(cms.intro?.pageTitle, d.intro.pageTitle),
      headline: text(cms.intro?.headline, d.intro.headline),
      headlineHighlight: text(
        cms.intro?.headlineHighlight,
        d.intro.headlineHighlight,
      ),
      subtext: text(cms.intro?.subtext, d.intro.subtext),
    },
    offerings: {
      eyebrow: text(cms.offerings?.eyebrow, d.offerings.eyebrow),
      title: text(cms.offerings?.title, d.offerings.title),
      titleHighlight: text(
        cms.offerings?.titleHighlight,
        d.offerings.titleHighlight,
      ),
      courses: rawCourses.map((raw) => mapOffering(raw)),
    },
    learningApproach: {
      title: text(cms.learningApproach?.title, d.learningApproach.title),
      titleHighlight: text(
        cms.learningApproach?.titleHighlight,
        d.learningApproach.titleHighlight,
      ),
      description: text(
        cms.learningApproach?.description,
        d.learningApproach.description,
      ),
      ctaLabel: text(cms.learningApproach?.ctaLabel, d.learningApproach.ctaLabel),
      ctaHref: text(cms.learningApproach?.ctaHref, d.learningApproach.ctaHref),
      stats: {
        maxSeats: {
          value: text(
            cms.learningApproach?.stats?.maxSeats?.value,
            d.learningApproach.stats.maxSeats.value,
          ),
          label: text(
            cms.learningApproach?.stats?.maxSeats?.label,
            d.learningApproach.stats.maxSeats.label,
          ),
          description: text(
            cms.learningApproach?.stats?.maxSeats?.description,
            d.learningApproach.stats.maxSeats.description,
          ),
        },
        mentorLed: {
          title: text(
            cms.learningApproach?.stats?.mentorLed?.title,
            d.learningApproach.stats.mentorLed.title,
          ),
          description: text(
            cms.learningApproach?.stats?.mentorLed?.description,
            d.learningApproach.stats.mentorLed.description,
          ),
        },
        rating: {
          value: text(
            cms.learningApproach?.stats?.rating?.value,
            d.learningApproach.stats.rating.value,
          ),
          suffix: text(
            cms.learningApproach?.stats?.rating?.suffix,
            d.learningApproach.stats.rating.suffix,
          ),
        },
      },
    },
    trackComparison: {
      eyebrow: text(cms.trackComparison?.eyebrow, d.trackComparison.eyebrow),
      title: text(cms.trackComparison?.title, d.trackComparison.title),
      titleHighlight: text(
        cms.trackComparison?.titleHighlight,
        d.trackComparison.titleHighlight,
      ),
      signpostImage: TRACK_SIGNPOST_IMAGE,
      tracks: rawTracks.map((raw) => mapTrack(raw)),
    },
    faq: {
      eyebrow: text(cms.faq?.eyebrow, d.faq.eyebrow),
      title: text(cms.faq?.title, d.faq.title),
      highlight: text(cms.faq?.highlight, d.faq.highlight),
      helperText: text(cms.faq?.helperText, d.faq.helperText),
      askLinkLabel: text(cms.faq?.askLinkLabel, d.faq.askLinkLabel),
      askLinkHref: text(cms.faq?.askLinkHref, d.faq.askLinkHref),
      items: faqItems,
    },
  };
}
