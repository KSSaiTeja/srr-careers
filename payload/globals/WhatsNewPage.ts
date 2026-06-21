import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const WhatsNewPage: GlobalConfig = {
  slug: "whats-new-page",
  label: "What's New Page",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The What's New page (/whats-new) — page title, the update cards, and the newsletter band. Changes go live after you click Save.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "1 · Page intro",
          name: "intro",
          fields: [
            {
              name: "pageTitle",
              type: "text",
              label: "Page title",
              defaultValue: "What's Happening at SRR",
            },
          ],
        },
        {
          label: "2 · Updates",
          name: "feed",
          description:
            "Each row is one update card. Turn on “Pin this card” to show it as the large highlighted block at the top.",
          fields: [
            {
              name: "updates",
              type: "array",
              label: "Update cards",
              labels: { singular: "Update", plural: "Updates" },
              admin: {
                description:
                  "Drag to reorder. Pinned cards appear first as large blocks; the rest show as the list below.",
                initCollapsed: true,
              },
              fields: [
                {
                  name: "pinned",
                  type: "checkbox",
                  label: "Pin this card",
                  defaultValue: false,
                  admin: {
                    description:
                      "When enabled, this card is highlighted at the top and can show an optional button.",
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "category",
                      type: "select",
                      required: true,
                      defaultValue: "events",
                      options: [
                        { label: "Admissions", value: "admissions" },
                        { label: "Curriculum", value: "curriculum" },
                        { label: "Placements", value: "placements" },
                        { label: "Notices", value: "notices" },
                        { label: "Events", value: "events" },
                      ],
                      admin: { width: "50%" },
                    },
                    {
                      name: "timeAgo",
                      type: "text",
                      label: "Time label",
                      required: true,
                      admin: {
                        width: "50%",
                        description: 'e.g. "2 DAYS AGO"',
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "badge",
                      type: "select",
                      label: "Badge style",
                      required: true,
                      defaultValue: "update",
                      options: [
                        { label: "Update (purple)", value: "update" },
                        { label: "Update (navy)", value: "update-navy" },
                        { label: "Notice", value: "notice" },
                        { label: "Alert", value: "alert" },
                      ],
                      admin: { width: "50%" },
                    },
                    {
                      name: "badgeLabel",
                      type: "text",
                      label: "Badge text",
                      required: true,
                      defaultValue: "UPDATE",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                  admin: {
                    description:
                      "Each new line becomes its own paragraph in the card.",
                  },
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Button text (optional)",
                  admin: {
                    description:
                      "Only used on pinned cards. Leave this and the link empty for no button.",
                    condition: (_data, siblingData) =>
                      Boolean(siblingData?.pinned),
                  },
                },
                {
                  name: "ctaHref",
                  type: "text",
                  label: "Button link (optional)",
                  admin: {
                    description: 'Page path or URL — e.g. "#pre-footer" or "/courses".',
                    condition: (_data, siblingData) =>
                      Boolean(siblingData?.pinned),
                  },
                },
              ],
            },
          ],
        },
        {
          label: "3 · Newsletter",
          name: "newsletter",
          description: "“Stay in the loop” band near the bottom of the page.",
          fields: [
            {
              name: "title",
              type: "text",
              defaultValue: "Stay in the loop",
            },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "One email when something actually matters. No drip campaigns, no fluff — just pure career intelligence.",
            },
            {
              name: "ctaLabel",
              type: "text",
              label: "Button text",
              defaultValue: "Subscribe",
            },
            {
              name: "ctaHref",
              type: "text",
              label: "Button link",
              defaultValue:
                "mailto:suresh@srrcareers.in?subject=SRR%20Careers%20newsletter",
            },
          ],
        },
      ],
    },
  ],
};
