import type {
  CourseDetailContent,
  CourseDetailMetaCard,
} from "@/lib/constants/course-detail-content";
import type { CourseDetail } from "@/payload-types";
import { getCoursePrice } from "@/lib/payment/course-prices";

type RawCourseDetail = Partial<CourseDetail>;

const META_ICONS: CourseDetailMetaCard["icon"][] = [
  "duration",
  "modules",
  "format",
  "outcome",
];

function text(value: string | null | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function toLines(value: string | null | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function asMetaIcon(
  value: string | null | undefined,
): CourseDetailMetaCard["icon"] {
  return META_ICONS.includes(value as CourseDetailMetaCard["icon"])
    ? (value as CourseDetailMetaCard["icon"])
    : "modules";
}

function positiveNumber(
  value: number | null | undefined,
): number | undefined {
  return typeof value === "number" && value > 0 ? value : undefined;
}

function mapNotice(
  notice:
    | {
        enabled?: boolean | null;
        text?: string | null;
        highlight?: string | null;
      }
    | null
    | undefined,
): CourseDetailContent["syllabus"]["notice"] {
  const enabled = notice?.enabled !== false;
  const noticeText = text(notice?.text);
  if (!enabled || !noticeText) return undefined;
  return {
    text: noticeText,
    highlight: text(notice?.highlight) || undefined,
  };
}

export function mapCourseDetailFromCMS(
  doc: RawCourseDetail,
): CourseDetailContent {
  const footer = doc.footerBlocks;
  const slug = text(doc.slug);
  const fallbackPrice = getCoursePrice(slug);

  return {
    slug,
    meta: {
      title: text(doc.meta?.title),
      description: text(doc.meta?.description),
    },
    intro: {
      pageTitle: text(doc.intro?.pageTitle),
      headline: text(doc.intro?.headline),
      headlineHighlight: text(doc.intro?.headlineHighlight),
      subtext: text(doc.intro?.subtext) || undefined,
    },
    overview: {
      description: text(doc.overview?.description),
      price: positiveNumber(doc.overview?.price) ?? fallbackPrice.price,
      originalPrice:
        positiveNumber(doc.overview?.originalPrice) ??
        fallbackPrice.originalPrice,
      primaryCta: text(doc.overview?.primaryCta, "Enroll Now"),
      secondaryCta: text(doc.overview?.secondaryCta, "Explore Curriculum"),
      secondaryCtaHref: text(doc.overview?.secondaryCtaHref, "#syllabus"),
      moduleCount: text(doc.overview?.moduleCount),
      moduleLabel: text(doc.overview?.moduleLabel, "Modules"),
      moduleBlurb: text(doc.overview?.moduleBlurb),
      metaCards: (doc.overview?.metaCards ?? []).map((card) => ({
        icon: asMetaIcon(card.icon),
        label: text(card.label),
        value: text(card.value),
        valueSuffix: text(card.valueSuffix) || undefined,
      })),
    },
    whoIsItFor: {
      eyebrow: text(doc.whoIsItFor?.eyebrow, "who is it for"),
      title: text(doc.whoIsItFor?.title),
      titleHighlight: text(doc.whoIsItFor?.titleHighlight),
      audience: toLines(doc.whoIsItFor?.audience),
      handsOnTitle: text(
        doc.whoIsItFor?.handsOnTitle,
        "Hands-on with real systems.",
      ),
      handsOnDescription: text(doc.whoIsItFor?.handsOnDescription),
      handsOnFeatures: toLines(doc.whoIsItFor?.handsOnFeatures),
    },
    syllabus: {
      eyebrow: text(doc.syllabus?.eyebrow, "Curriculum"),
      title: text(doc.syllabus?.title, "Full Syllabus"),
      notice: mapNotice(doc.syllabus?.notice),
      items: (doc.syllabus?.items ?? []).map((item, index) => {
        const number = text(item.number, String(index + 1).padStart(2, "0"));
        return {
          id: number,
          number,
          title: text(item.title),
          description: text(item.description) || undefined,
          topics: toLines(item.topics),
        };
      }),
    },
    alsoOffered: {
      eyebrow: text(footer?.alsoOffered?.eyebrow, "Also offered"),
      title: text(footer?.alsoOffered?.title),
      href: text(footer?.alsoOffered?.href, "/courses"),
      ctaLabel: text(footer?.alsoOffered?.ctaLabel, "Explore Course Details"),
    },
    limitedSeatsCta: {
      eyebrow: text(footer?.limitedSeatsCta?.eyebrow, "NEXT BATCH STARTS SOON"),
      titleLine1: text(footer?.limitedSeatsCta?.titleLine1, "Limited Seats."),
      titleLine2: text(footer?.limitedSeatsCta?.titleLine2, "Reserve yours."),
      description: text(footer?.limitedSeatsCta?.description),
      ctaLabel: text(footer?.limitedSeatsCta?.ctaLabel, "Book a Free Demo"),
      ctaHref: text(footer?.limitedSeatsCta?.ctaHref, "#demo-class"),
    },
    faq: {
      eyebrow: text(doc.faq?.eyebrow, "FAQs"),
      title: text(doc.faq?.title, "Questions we hear,"),
      highlight: text(doc.faq?.highlight, "before the  demo."),
      helperText: text(doc.faq?.helperText),
      askLinkLabel: text(doc.faq?.askLinkLabel, "Ask us anything →"),
      askLinkHref: text(doc.faq?.askLinkHref, "#demo-class"),
      items: (doc.faq?.items ?? []).map((item) => ({
        question: text(item.question),
        answer: text(item.answer),
      })),
    },
  };
}
