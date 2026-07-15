import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const WorkshopsPage: GlobalConfig = {
  slug: "workshops-page",
  label: "Workshops Listing",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The Workshops catalogue (/workshops) — intro and workshop cards. Each card links to a workshop detail page. Also drives the Workshops nav dropdown. Detail-page copy and agendas live under Workshop Detail Pages.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 · SEO",
          name: "meta",
          fields: [
            {
              name: "title",
              type: "text",
              defaultValue: "Workshops | SRR Careers",
            },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "Campus and corporate workshops from SRR Careers — career pathways, skills blueprint, resume & interview prep, GST, and personal finance. Duration and pricing are customisable.",
            },
          ],
        },
        {
          label: "2 · Page intro",
          name: "intro",
          fields: [
            {
              name: "pageTitle",
              type: "text",
              label: "Eyebrow",
              defaultValue: "Workshops",
            },
            {
              name: "headline",
              type: "text",
              defaultValue: "Practical programmes for campuses and teams",
            },
            {
              name: "subtext",
              type: "textarea",
              admin: {
                description:
                  "Use {{duration}} where the shared duration label should appear (lowercased). Example: …are both {{duration}} for your institution…",
              },
              defaultValue:
                "Careers, skills, placements, GST, and personal finance — delivered by practitioners. Duration and pricing are both {{duration}} for your institution or batch.",
            },
          ],
        },
        {
          label: "3 · Card labels",
          name: "cards",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "durationPrefix",
                  type: "text",
                  label: "Duration prefix",
                  defaultValue: "Duration:",
                  admin: { width: "50%" },
                },
                {
                  name: "pricePrefix",
                  type: "text",
                  label: "Price prefix",
                  defaultValue: "Price:",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "samplePrefix",
              type: "text",
              label: "Sample agenda prefix",
              defaultValue: "· sample",
              admin: {
                description:
                  "Shown after the duration value when a workshop has a sample baseline, e.g. “Customisable · sample 3 hours”.",
              },
            },
          ],
        },
        {
          label: "4 · Workshops",
          description:
            "Cards on /workshops and entries in the Workshops nav dropdown. Order = listing order.",
          fields: [
            {
              name: "workshops",
              type: "array",
              label: "Workshop cards",
              labels: { singular: "Workshop", plural: "Workshops" },
              admin: { initCollapsed: false },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "slug",
                      type: "text",
                      required: true,
                      admin: {
                        width: "35%",
                        description:
                          "Stable id (e.g. career-pathways-and-success-strategies).",
                      },
                    },
                    {
                      name: "sortOrder",
                      type: "number",
                      defaultValue: 0,
                      admin: { width: "20%" },
                    },
                    {
                      name: "published",
                      type: "checkbox",
                      defaultValue: true,
                      label: "Published",
                      admin: { width: "20%" },
                    },
                    {
                      name: "navLabel",
                      type: "text",
                      label: "Nav label",
                      admin: {
                        width: "25%",
                        description: "Workshops dropdown label.",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "eyebrow",
                      type: "text",
                      required: true,
                      defaultValue: "Workshop",
                      admin: { width: "30%" },
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      admin: { width: "35%" },
                    },
                    {
                      name: "href",
                      type: "text",
                      required: true,
                      admin: {
                        width: "35%",
                        description:
                          "e.g. /workshops/career-pathways-and-success-strategies",
                      },
                    },
                  ],
                },
                {
                  name: "summary",
                  type: "textarea",
                  required: true,
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "durationLabel",
                      type: "text",
                      label: "Duration value",
                      defaultValue: "Customisable",
                      admin: { width: "50%" },
                    },
                    {
                      name: "priceLabel",
                      type: "text",
                      label: "Price value",
                      defaultValue: "Customisable",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "durationBaseline",
                  type: "text",
                  label: "Sample agenda length",
                  admin: {
                    description:
                      'Optional, e.g. "3 hours (including Q&A)". Shown after Duration with the sample prefix.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: "5 · Detail page chrome",
          description:
            "Detail-page chrome only — shared duration/pricing notes and labels used on every /workshops/<slug> page. Per-workshop copy and agendas live under Workshop Detail Pages.",
          fields: [
            {
              name: "shared",
              type: "group",
              label: "Shared duration & pricing",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "durationLabel",
                      type: "text",
                      label: "Duration value (detail)",
                      defaultValue: "Customisable",
                      admin: { width: "50%" },
                    },
                    {
                      name: "pricingLabel",
                      type: "text",
                      label: "Price value (detail)",
                      defaultValue: "Customisable",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "durationNote",
                  type: "textarea",
                  label: "Duration note (detail page)",
                  defaultValue:
                    "Sample agenda below — length can be tailored to your institution or batch.",
                },
                {
                  name: "pricingNote",
                  type: "textarea",
                  label: "Pricing note (detail page)",
                  defaultValue:
                    "Fees tailored to campus or corporate batch size.",
                },
              ],
            },
            {
              name: "detail",
              type: "group",
              label: "Detail labels",
              fields: [
                {
                  type: "collapsible",
                  label: "Meta field labels",
                  admin: { initCollapsed: false },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "metaDurationLabel",
                          type: "text",
                          defaultValue: "Duration",
                          admin: { width: "50%" },
                        },
                        {
                          name: "metaPriceLabel",
                          type: "text",
                          defaultValue: "Price",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "metaModeLabel",
                          type: "text",
                          defaultValue: "Mode",
                          admin: { width: "50%" },
                        },
                        {
                          name: "metaAudienceLabel",
                          type: "text",
                          defaultValue: "Audience",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    {
                      name: "metaSpeakerLabel",
                      type: "text",
                      defaultValue: "Speaker",
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Duration & pricing block",
                  admin: { initCollapsed: false },
                  fields: [
                    {
                      name: "pricingEyebrow",
                      type: "text",
                      defaultValue: "Duration & pricing",
                    },
                    {
                      name: "pricingHeadline",
                      type: "text",
                      defaultValue: "Both customisable",
                    },
                    {
                      name: "sampleAgendaPrefix",
                      type: "text",
                      label: "Sample agenda sentence prefix",
                      defaultValue: "Sample agenda:",
                      admin: {
                        description:
                          "Appended before the workshop’s duration baseline on the detail page.",
                      },
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Highlights & agenda",
                  admin: { initCollapsed: false },
                  fields: [
                    {
                      name: "highlightsHeading",
                      type: "text",
                      defaultValue: "What you'll take away",
                    },
                    {
                      name: "agendaEyebrow",
                      type: "text",
                      defaultValue: "Agenda",
                    },
                    {
                      name: "agendaTitleModules",
                      type: "text",
                      label: "Agenda title — module list",
                      defaultValue: "Session modules",
                    },
                    {
                      name: "agendaTitleSessions",
                      type: "text",
                      label: "Agenda title — sessions",
                      defaultValue: "One-day programme flow",
                    },
                    {
                      name: "agendaTitleFormats",
                      type: "text",
                      label: "Agenda title — format tabs",
                      defaultValue: "Choose a format",
                    },
                    {
                      name: "formatAudienceLabel",
                      type: "text",
                      label: "Format “Audience” label",
                      defaultValue: "Audience:",
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Back CTA",
                  admin: { initCollapsed: false },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "backCtaLabel",
                          type: "text",
                          defaultValue: "All workshops",
                          admin: { width: "50%" },
                        },
                        {
                          name: "backCtaHref",
                          type: "text",
                          defaultValue: "/workshops",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
