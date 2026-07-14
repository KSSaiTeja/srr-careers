import type {
  WorkshopAgendaLayout,
  WorkshopDefinition,
  WorkshopFormat,
  WorkshopModule,
  WorkshopSession,
  WorkshopsPageContent,
  WorkshopsSharedChrome,
} from "@/lib/types/workshops-content";
import type { WorkshopDetail, WorkshopsPage } from "@/payload-types";
import { workshopDetailsDefaults } from "@/payload/seed/workshop-details-defaults";
import { workshopsPageDefaults } from "@/payload/seed/workshops-page-defaults";

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

function mapModules(
  rows:
    | { title?: string | null; duration?: string | null }[]
    | null
    | undefined,
): WorkshopModule[] {
  if (!rows?.length) return [];
  return rows
    .map((row) => {
      const title = text(row.title, "");
      if (!title) return null;
      const duration = text(row.duration, "");
      return duration ? { title, duration } : { title };
    })
    .filter(Boolean) as WorkshopModule[];
}

function mapSessions(
  rows:
    | {
        label?: string | null;
        time?: string | null;
        modules?:
          | { title?: string | null; duration?: string | null }[]
          | null;
      }[]
    | null
    | undefined,
): WorkshopSession[] {
  if (!rows?.length) return [];
  return rows
    .map((row) => {
      const label = text(row.label, "");
      if (!label) return null;
      const time = text(row.time, "");
      const modules = mapModules(row.modules);
      return {
        label,
        ...(time ? { time } : {}),
        modules,
      };
    })
    .filter(Boolean) as WorkshopSession[];
}

function mapFormats(
  rows:
    | {
        formatId?: string | null;
        title?: string | null;
        duration?: string | null;
        note?: string | null;
        audience?: string | null;
        modules?:
          | { title?: string | null; duration?: string | null }[]
          | null;
      }[]
    | null
    | undefined,
): WorkshopFormat[] {
  if (!rows?.length) return [];
  return rows
    .map((row, index) => {
      const title = text(row.title, "");
      const duration = text(row.duration, "");
      if (!title || !duration) return null;
      const note = text(row.note, "");
      const audience = text(row.audience, "");
      return {
        id: text(row.formatId, `format-${index + 1}`),
        title,
        duration,
        ...(note ? { note } : {}),
        ...(audience ? { audience } : {}),
        modules: mapModules(row.modules),
      };
    })
    .filter(Boolean) as WorkshopFormat[];
}

function asLayout(value: string | null | undefined): WorkshopAgendaLayout {
  if (
    value === "modules" ||
    value === "sessions" ||
    value === "formats" ||
    value === "none"
  ) {
    return value;
  }
  return "modules";
}

export function mapWorkshopsSharedFromCMS(
  global: WorkshopsPage | null | undefined,
): WorkshopsSharedChrome {
  const d = workshopsPageDefaults;
  const cms: Partial<WorkshopsPage> = global ?? {};

  return {
    durationLabel: text(cms.shared?.durationLabel, d.shared.durationLabel),
    pricingLabel: text(cms.shared?.pricingLabel, d.shared.pricingLabel),
    durationNote: text(cms.shared?.durationNote, d.shared.durationNote),
    pricingNote: text(cms.shared?.pricingNote, d.shared.pricingNote),
    cards: {
      durationPrefix: text(cms.cards?.durationPrefix, d.cards.durationPrefix),
      pricePrefix: text(cms.cards?.pricePrefix, d.cards.pricePrefix),
      samplePrefix: text(cms.cards?.samplePrefix, d.cards.samplePrefix),
    },
    detail: {
      metaDurationLabel: text(
        cms.detail?.metaDurationLabel,
        d.detail.metaDurationLabel,
      ),
      metaPriceLabel: text(cms.detail?.metaPriceLabel, d.detail.metaPriceLabel),
      metaModeLabel: text(cms.detail?.metaModeLabel, d.detail.metaModeLabel),
      metaAudienceLabel: text(
        cms.detail?.metaAudienceLabel,
        d.detail.metaAudienceLabel,
      ),
      metaSpeakerLabel: text(
        cms.detail?.metaSpeakerLabel,
        d.detail.metaSpeakerLabel,
      ),
      pricingEyebrow: text(cms.detail?.pricingEyebrow, d.detail.pricingEyebrow),
      pricingHeadline: text(
        cms.detail?.pricingHeadline,
        d.detail.pricingHeadline,
      ),
      sampleAgendaPrefix: text(
        cms.detail?.sampleAgendaPrefix,
        d.detail.sampleAgendaPrefix,
      ),
      highlightsHeading: text(
        cms.detail?.highlightsHeading,
        d.detail.highlightsHeading,
      ),
      agendaEyebrow: text(cms.detail?.agendaEyebrow, d.detail.agendaEyebrow),
      agendaTitleModules: text(
        cms.detail?.agendaTitleModules,
        d.detail.agendaTitleModules,
      ),
      agendaTitleSessions: text(
        cms.detail?.agendaTitleSessions,
        d.detail.agendaTitleSessions,
      ),
      agendaTitleFormats: text(
        cms.detail?.agendaTitleFormats,
        d.detail.agendaTitleFormats,
      ),
      formatAudienceLabel: text(
        cms.detail?.formatAudienceLabel,
        d.detail.formatAudienceLabel,
      ),
      backCtaLabel: text(cms.detail?.backCtaLabel, d.detail.backCtaLabel),
      backCtaHref: text(cms.detail?.backCtaHref, d.detail.backCtaHref),
    },
  };
}

export function mapWorkshopDetailFromCMS(
  doc: WorkshopDetail | null | undefined,
  fallbackSlug?: string,
): WorkshopDefinition | undefined {
  const defaults = workshopDetailsDefaults.find(
    (entry) => entry.slug === (doc?.slug ?? fallbackSlug),
  );

  if (!doc && !defaults) return undefined;

  const slug = text(doc?.slug, defaults?.slug ?? fallbackSlug ?? "");
  if (!slug) return undefined;

  const title = text(doc?.card?.title, defaults?.card.title ?? "");
  const summary = text(doc?.card?.summary, defaults?.card.summary ?? "");
  const layout = asLayout(doc?.agenda?.layout ?? defaults?.agenda.layout);

  const highlightsFromCms = (doc?.detail?.highlights ?? [])
    .map((h) => text(h.text, ""))
    .filter(Boolean);
  const highlights =
    highlightsFromCms.length > 0
      ? highlightsFromCms
      : (defaults?.detail.highlights.map((h) => h.text) ?? []);

  const durationBaseline = text(
    doc?.card?.durationBaseline,
    defaults?.card.durationBaseline ?? "",
  );
  const mode = text(doc?.detail?.mode, defaults?.detail.mode ?? "");
  const speaker = text(doc?.detail?.speaker, defaults?.detail.speaker ?? "");
  const audience = text(doc?.detail?.audience, defaults?.detail.audience ?? "");
  const courseDetailSlug = text(
    doc?.detail?.courseDetailSlug,
    defaults?.detail.courseDetailSlug ?? "",
  );
  const navLabel = text(
    doc?.navLabel,
    defaults?.navLabel ?? text(doc?.card?.eyebrow, defaults?.card.eyebrow ?? title),
  );

  const cmsModules = mapModules(doc?.agenda?.modules);
  const cmsSessions = mapSessions(doc?.agenda?.sessions);
  const cmsFormats = mapFormats(doc?.agenda?.formats);

  const modules =
    layout === "modules"
      ? cmsModules.length > 0
        ? cmsModules
        : mapModules(defaults?.agenda.modules)
      : undefined;
  const sessions =
    layout === "sessions"
      ? cmsSessions.length > 0
        ? cmsSessions
        : mapSessions(defaults?.agenda.sessions)
      : undefined;
  const formats =
    layout === "formats"
      ? cmsFormats.length > 0
        ? cmsFormats
        : mapFormats(defaults?.agenda.formats)
      : undefined;

  const metaDescription = text(doc?.meta?.description, summary);
  const metaTitle = text(doc?.meta?.title, `${title} | SRR Careers`);

  return {
    slug,
    title,
    eyebrow: text(doc?.card?.eyebrow, defaults?.card.eyebrow ?? "Workshop"),
    summary,
    description: text(
      doc?.detail?.description,
      defaults?.detail.description ?? summary,
    ),
    navLabel,
    highlights,
    agendaLayout: layout,
    meta: {
      title: metaTitle,
      description: metaDescription,
    },
    ...(durationBaseline ? { durationBaseline } : {}),
    ...(mode ? { mode } : {}),
    ...(speaker ? { speaker } : {}),
    ...(audience ? { audience } : {}),
    ...(courseDetailSlug ? { courseDetailSlug } : {}),
    ...(modules?.length ? { modules } : {}),
    ...(sessions?.length ? { sessions } : {}),
    ...(formats?.length ? { formats } : {}),
  };
}

export function mapWorkshopDetailFromDefaults(
  slug: string,
): WorkshopDefinition | undefined {
  const defaults = workshopDetailsDefaults.find((entry) => entry.slug === slug);
  if (!defaults) return undefined;
  return mapWorkshopDetailFromCMS(
    defaults as unknown as WorkshopDetail,
    slug,
  );
}

export function mapWorkshopsPageFromCMS(
  global: WorkshopsPage | null | undefined,
  workshopDocs: WorkshopDetail[] | null | undefined,
): WorkshopsPageContent {
  const d = workshopsPageDefaults;
  const cms: Partial<WorkshopsPage> = global ?? {};
  const shared = mapWorkshopsSharedFromCMS(global);

  const fromCms = (workshopDocs ?? [])
    .filter((doc) => doc.published !== false)
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((doc) => mapWorkshopDetailFromCMS(doc))
    .filter(Boolean) as WorkshopDefinition[];

  const workshops =
    fromCms.length > 0
      ? fromCms
      : (workshopDetailsDefaults
          .filter((entry) => entry.published)
          .map((entry) => mapWorkshopDetailFromDefaults(entry.slug))
          .filter(Boolean) as WorkshopDefinition[]);

  const durationLabel = shared.durationLabel;
  const rawSubtext = text(cms.intro?.subtext, d.intro.subtext);
  const subtext = rawSubtext.replaceAll(
    "{{duration}}",
    durationLabel.toLowerCase(),
  );

  return {
    meta: {
      title: text(cms.meta?.title, d.meta.title),
      description: text(cms.meta?.description, d.meta.description),
    },
    intro: {
      pageTitle: text(cms.intro?.pageTitle, d.intro.pageTitle),
      headline: text(cms.intro?.headline, d.intro.headline),
      subtext,
    },
    shared,
    workshops,
  };
}
