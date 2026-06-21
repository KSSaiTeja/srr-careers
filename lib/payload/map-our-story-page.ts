import type {
  OurStoryIconName,
  OurStoryPageContent,
} from "@/lib/types/our-story-page-content";
import type { OurStoryPage } from "@/payload-types";
import { ourStoryPageDefaults } from "@/payload/seed/our-story-page-defaults";

const ICON_NAMES: OurStoryIconName[] = [
  "users",
  "file-badge",
  "building-2",
  "medal",
  "heart",
  "target",
  "award",
  "graduation-cap",
];

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function asIcon(value: string | null | undefined): OurStoryIconName {
  return ICON_NAMES.includes(value as OurStoryIconName)
    ? (value as OurStoryIconName)
    : "target";
}

export function mapOurStoryPageFromCMS(
  global: OurStoryPage | null | undefined,
): OurStoryPageContent {
  const d = ourStoryPageDefaults;
  const cms: Partial<OurStoryPage> = global ?? {};

  const cmsMetrics = cms.intro?.metrics;
  const metrics =
    cmsMetrics && cmsMetrics.length > 0
      ? cmsMetrics.map((m) => ({
          value: text(m.value, ""),
          label: text(m.label, ""),
          icon: asIcon(m.icon),
        }))
      : d.intro.metrics.map((m) => ({ ...m }));

  const cmsPrinciples = cms.values?.principles;
  const principles =
    cmsPrinciples && cmsPrinciples.length > 0
      ? cmsPrinciples.map((p) => ({
          description: text(p.description, ""),
          icon: asIcon(p.icon),
          featured: Boolean(p.featured),
        }))
      : d.values.principles.map((p) => ({ ...p }));

  const cmsPillars = cms.excellence?.pillars;
  const pillars =
    cmsPillars && cmsPillars.length > 0
      ? cmsPillars.map((p) => ({
          num: text(p.num, ""),
          title: text(p.title, ""),
          description: text(p.description, ""),
        }))
      : d.excellence.pillars.map((p) => ({ ...p }));

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
      headlineSuffix: text(cms.intro?.headlineSuffix, d.intro.headlineSuffix),
      subtext: text(cms.intro?.subtext, d.intro.subtext),
      metrics,
    },
    values: {
      title: text(cms.values?.title, d.values.title),
      titleLine2: text(cms.values?.titleLine2, d.values.titleLine2),
      intro: text(cms.values?.intro, d.values.intro),
      principles,
    },
    excellence: {
      title: text(cms.excellence?.title, d.excellence.title),
      highlight: text(cms.excellence?.highlight, d.excellence.highlight),
      pillars,
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
