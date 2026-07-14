import type { GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

export const CoursesListing: GlobalConfig = {
  slug: "courses-listing",
  label: "Courses Listing",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The Courses catalogue (/courses) — intro and programme cards. Each card links to a programme page (e.g. SAP FICO) or a course detail. Also drives the Courses nav dropdown. SAP FICO track copy lives on Courses Page; individual course pages under Course Detail Pages.",
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
              defaultValue: "Courses | SRR Careers",
            },
            {
              name: "description",
              type: "textarea",
              defaultValue:
                "Explore SRR Careers programmes — SAP FICO S/4HANA tracks and Advanced Excel. Live mentor-led cohorts for finance and accounts professionals.",
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
              defaultValue: "Courses",
            },
            {
              name: "headline",
              type: "text",
              defaultValue: "Programmes built for finance careers",
            },
            {
              name: "subtext",
              type: "textarea",
              defaultValue:
                "From SAP FICO certification tracks to Advanced Excel — pick a programme and start with a live mentor-led cohort.",
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
          ],
        },
        {
          label: "4 · Programmes",
          description:
            "Cards on /courses and entries in the Courses nav dropdown. Order = listing order.",
          fields: [
            {
              name: "programs",
              type: "array",
              label: "Programme cards",
              labels: { singular: "Programme", plural: "Programmes" },
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
                        description: "Stable id (e.g. sap-fico).",
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
                        description: "Courses dropdown label.",
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
                      defaultValue: "Programme",
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
                          "e.g. /courses/sap-fico or /courses/advanced-excel",
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
                      admin: { width: "50%" },
                    },
                    {
                      name: "priceLabel",
                      type: "text",
                      label: "Price value",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "isNavGroup",
                  type: "checkbox",
                  label: "Nav group (nested track links)",
                  defaultValue: false,
                  admin: {
                    description:
                      "When on, this programme appears as a parent in the Courses dropdown with the nested links below (e.g. SAP FICO → Consultant / End User).",
                  },
                },
                {
                  name: "navChildren",
                  type: "array",
                  label: "Nested nav links",
                  admin: {
                    condition: (_, siblingData) =>
                      Boolean(siblingData?.isNavGroup),
                    description:
                      "Shown under this programme in the Courses dropdown when “Nav group” is on.",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "label",
                          type: "text",
                          required: true,
                          admin: { width: "45%" },
                        },
                        {
                          name: "href",
                          type: "text",
                          required: true,
                          admin: { width: "55%" },
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
