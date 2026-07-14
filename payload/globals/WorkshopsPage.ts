import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const WorkshopsPage: GlobalConfig = {
  slug: "workshops-page",
  label: "Workshops Page",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The Workshops listing (/workshops) — intro, shared duration/pricing labels, card labels, and chrome for every workshop detail page. Individual workshops are edited under Workshop Detail Pages. Changes go live after you click Save.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 · SEO (listing)",
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
                  "Use {{duration}} where the duration label should appear (lowercased). Example: …are both {{duration}} for your institution…",
              },
              defaultValue:
                "Careers, skills, placements, GST, and personal finance — delivered by practitioners. Duration and pricing are both {{duration}} for your institution or batch.",
            },
          ],
        },
        {
          label: "3 · Duration & pricing",
          name: "shared",
          description:
            "Shared across listing cards and every workshop detail page.",
          fields: [
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
                  name: "pricingLabel",
                  type: "text",
                  label: "Price value",
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
              defaultValue: "Fees tailored to campus or corporate batch size.",
            },
          ],
        },
        {
          label: "4 · Listing cards",
          name: "cards",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "durationPrefix",
                  type: "text",
                  label: "Duration label prefix",
                  defaultValue: "Duration:",
                  admin: { width: "50%" },
                },
                {
                  name: "pricePrefix",
                  type: "text",
                  label: "Price label prefix",
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
          label: "5 · Detail page chrome",
          name: "detail",
          description:
            "Labels shared by every workshop detail page. Per-workshop copy lives in Workshop Detail Pages.",
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
};
