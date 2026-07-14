import type { Field, CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";

const moduleFields: Field[] = [
  {
    type: "row",
    fields: [
      {
        name: "title",
        type: "text",
        required: true,
        admin: { width: "70%" },
      },
      {
        name: "duration",
        type: "text",
        label: "Duration (optional)",
        admin: {
          width: "30%",
          description: 'e.g. "20 mins"',
        },
      },
    ],
  },
];

export const WorkshopDetails: CollectionConfig = {
  slug: "workshop-details",
  labels: {
    singular: "Workshop Detail Page",
    plural: "Workshop Detail Pages",
  },
  admin: {
    group: "Website Pages",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "published", "sortOrder", "updatedAt"],
    description:
      "Individual workshop pages at /workshops/<slug>. Listing intro and shared labels live on the Workshops Page global. Changes go live after you click Save.",
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Internal name",
          required: true,
          admin: {
            width: "40%",
            description: "Shown in the admin list only.",
          },
        },
        {
          name: "slug",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: {
            width: "40%",
            description:
              "URL path under /workshops/ — e.g. career-pathways-and-success-strategies.",
          },
        },
        {
          name: "sortOrder",
          type: "number",
          defaultValue: 0,
          admin: {
            width: "20%",
            description: "Lower numbers appear first on the listing.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "published",
          type: "checkbox",
          defaultValue: true,
          label: "Published on /workshops",
          admin: { width: "40%" },
        },
        {
          name: "navLabel",
          type: "text",
          label: "Nav dropdown label",
          admin: {
            width: "60%",
            description:
              "Short label for the Workshops nav dropdown. Falls back to eyebrow/title if empty.",
          },
        },
      ],
    },
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
              label: "Meta title",
              admin: {
                description:
                  "Browser tab title. Leave empty to use “{workshop title} | SRR Careers”.",
              },
            },
            {
              name: "description",
              type: "textarea",
              label: "Meta description",
              admin: {
                description: "Leave empty to use the card summary.",
              },
            },
          ],
        },
        {
          label: "2 · Listing card",
          name: "card",
          fields: [
            {
              name: "eyebrow",
              type: "text",
              required: true,
              defaultValue: "Workshop",
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "summary",
              type: "textarea",
              required: true,
              admin: {
                description: "Short blurb on the /workshops card grid.",
              },
            },
            {
              name: "durationBaseline",
              type: "text",
              label: "Sample agenda length",
              admin: {
                description:
                  'Optional, e.g. "3 hours (including Q&A)". Shown as the sample on cards and detail.',
              },
            },
          ],
        },
        {
          label: "3 · Detail intro",
          name: "detail",
          fields: [
            {
              name: "description",
              type: "textarea",
              required: true,
              admin: {
                description: "Longer intro under the title on the detail page.",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "mode",
                  type: "text",
                  admin: { width: "50%" },
                },
                {
                  name: "speaker",
                  type: "text",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "audience",
              type: "textarea",
            },
            {
              name: "highlights",
              type: "array",
              label: "Takeaway highlights",
              labels: { singular: "Highlight", plural: "Highlights" },
              minRows: 1,
              admin: { initCollapsed: false },
              fields: [
                {
                  name: "text",
                  type: "text",
                  required: true,
                  label: "Highlight",
                },
              ],
            },
            {
              name: "courseDetailSlug",
              type: "text",
              label: "Use course detail page instead (optional)",
              admin: {
                description:
                  "If set to an existing Course Detail slug, /workshops/{this-slug} renders that course page instead of the workshop template.",
              },
            },
          ],
        },
        {
          label: "4 · Agenda",
          name: "agenda",
          fields: [
            {
              name: "layout",
              type: "select",
              required: true,
              defaultValue: "modules",
              options: [
                {
                  label: "Single module list",
                  value: "modules",
                },
                {
                  label: "Morning / afternoon sessions",
                  value: "sessions",
                },
                {
                  label: "Multiple format tabs",
                  value: "formats",
                },
                { label: "No agenda section", value: "none" },
              ],
              admin: {
                description:
                  "Pick one layout. Only the matching fields below are used on the site.",
              },
            },
            {
              name: "modules",
              type: "array",
              label: "Modules",
              labels: { singular: "Module", plural: "Modules" },
              admin: {
                initCollapsed: true,
                condition: (_, siblingData) =>
                  siblingData?.layout === "modules",
              },
              fields: moduleFields,
            },
            {
              name: "sessions",
              type: "array",
              label: "Sessions",
              labels: { singular: "Session", plural: "Sessions" },
              admin: {
                initCollapsed: true,
                condition: (_, siblingData) =>
                  siblingData?.layout === "sessions",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: { width: "50%" },
                    },
                    {
                      name: "time",
                      type: "text",
                      label: "Time (optional)",
                      admin: {
                        width: "50%",
                        description: 'e.g. "10:00 AM – 1:00 PM"',
                      },
                    },
                  ],
                },
                {
                  name: "modules",
                  type: "array",
                  label: "Session modules",
                  labels: { singular: "Module", plural: "Modules" },
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: moduleFields,
                },
              ],
            },
            {
              name: "formats",
              type: "array",
              label: "Formats",
              labels: { singular: "Format", plural: "Formats" },
              admin: {
                initCollapsed: true,
                condition: (_, siblingData) =>
                  siblingData?.layout === "formats",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "formatId",
                      type: "text",
                      required: true,
                      label: "Format id",
                      admin: {
                        width: "30%",
                        description: 'Stable id, e.g. "3hr"',
                      },
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      admin: { width: "70%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "duration",
                      type: "text",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "audience",
                      type: "text",
                      admin: { width: "60%" },
                    },
                  ],
                },
                {
                  name: "note",
                  type: "textarea",
                },
                {
                  name: "modules",
                  type: "array",
                  label: "Format modules",
                  labels: { singular: "Module", plural: "Modules" },
                  minRows: 1,
                  admin: { initCollapsed: true },
                  fields: moduleFields,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
