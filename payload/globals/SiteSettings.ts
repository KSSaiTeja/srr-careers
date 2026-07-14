import type { Field, GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

const linkFields: Field[] = [
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
        admin: { width: "55%", description: "Page path or # anchor or URL" },
      },
    ],
  },
];

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Global",
    description:
      "Site-wide chrome shared on every page — header, navigation, footer, contact details, and social links. Changes go live after you click Save.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand & Header",
          name: "brand",
          fields: [
            {
              name: "siteName",
              type: "text",
              defaultValue: "SRR Careers",
              admin: {
                description: "Shown next to the logo in the header and footer.",
              },
            },
            {
              name: "footerDescription",
              type: "textarea",
              label: "Footer tagline",
              defaultValue:
                "A dedicated finishing school for SAP S/4 HANA FICO consultants. Live mentors, real client scenarios, lifetime career support.",
            },
            {
              name: "topStrip",
              type: "group",
              label: "Header top strip",
              admin: {
                description:
                  "Thin bar above the navbar. Phone & email on the right come from the Contact tab.",
              },
              fields: [
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Show top strip",
                  defaultValue: true,
                },
                {
                  name: "label",
                  type: "text",
                  label: "MSME label",
                  defaultValue: "Registered with MSME",
                  admin: {
                    description:
                      "Shown on the left of the header top strip (e.g. Registered with MSME).",
                  },
                },
              ],
            },
            {
              name: "header",
              type: "group",
              label: "Header button",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "ctaLabel",
                      type: "text",
                      label: "Button text",
                      defaultValue: "Book a Demo",
                      admin: { width: "50%" },
                    },
                    {
                      name: "ctaHref",
                      type: "text",
                      label: "Button link",
                      defaultValue: "/#demo-class",
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Navigation",
          name: "navigation",
          description: "Top navigation links (header + mobile menu).",
          fields: [
            {
              name: "items",
              type: "array",
              label: "Nav links",
              admin: { initCollapsed: false },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "href",
                      type: "text",
                      required: true,
                      admin: { width: "40%" },
                    },
                    {
                      name: "badge",
                      type: "checkbox",
                      label: "Red dot",
                      defaultValue: false,
                      admin: { width: "20%" },
                    },
                  ],
                },
                {
                  name: "children",
                  type: "array",
                  label: "Dropdown sub-links",
                  admin: {
                    initCollapsed: true,
                    description:
                      "Optional. Add sub-links to turn this nav item into a hover dropdown (desktop) or expandable accordion (mobile). Leave empty for a flat link. Courses and Workshops dropdowns are driven by their listing pages (Courses Listing / Workshop Detail Pages) — edits there update the nav automatically. Nested “Parent group” + child links work for any other top-level item you configure here.",
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "label",
                          type: "text",
                          required: true,
                          admin: { width: "40%" },
                        },
                        {
                          name: "href",
                          type: "text",
                          required: true,
                          admin: {
                            width: "40%",
                            description:
                              "Page path (e.g. /courses/sap-fico), # anchor, or URL. For a group parent that is also clickable, set the programme page path.",
                          },
                        },
                        {
                          name: "isGroup",
                          type: "checkbox",
                          label: "Parent group",
                          defaultValue: false,
                          admin: {
                            width: "20%",
                            description:
                              "Shows nested links on hover (desktop) / expand (mobile).",
                          },
                        },
                      ],
                    },
                    {
                      name: "nestedChildren",
                      type: "array",
                      label: "Nested links (child of this sub-link)",
                      admin: {
                        condition: (_, siblingData) =>
                          Boolean(siblingData?.isGroup),
                        initCollapsed: true,
                        description:
                          "e.g. under SAP FICO → Consultant Track, End User Track.",
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
        {
          label: "Contact",
          name: "contact",
          description:
            "Used in the header top strip, footer, pre-footer buttons, and WhatsApp button.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "phone",
                  type: "text",
                  label: "Phone (display)",
                  admin: { width: "50%" },
                },
                {
                  name: "phoneHref",
                  type: "text",
                  label: "Phone link (optional)",
                  admin: {
                    width: "50%",
                    description: "Leave blank to auto-build from the number.",
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "email",
                  type: "text",
                  label: "Email (display)",
                  admin: { width: "50%" },
                },
                {
                  name: "emailHref",
                  type: "text",
                  label: "Email link (optional)",
                  admin: {
                    width: "50%",
                    description: "Leave blank to auto-build a mailto link.",
                  },
                },
              ],
            },
            {
              name: "whatsappNumber",
              type: "text",
              label: "WhatsApp number (digits only, with country code)",
              defaultValue: "919286123457",
            },
            {
              type: "row",
              fields: [
                {
                  name: "whatsappLabel",
                  type: "text",
                  label: "WhatsApp link text",
                  defaultValue: "WhatsApp us",
                  admin: { width: "40%" },
                },
                {
                  name: "whatsappPrefillMessage",
                  type: "textarea",
                  label: "WhatsApp pre-filled message",
                  admin: { width: "60%" },
                },
              ],
            },
          ],
        },
        {
          label: "Social",
          name: "socialGroup",
          fields: [
            {
              name: "social",
              type: "array",
              label: "Social links",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      defaultValue: "linkedin",
                      options: [
                        { label: "LinkedIn", value: "linkedin" },
                        { label: "YouTube", value: "youtube" },
                        { label: "Instagram", value: "instagram" },
                        { label: "WhatsApp", value: "whatsapp" },
                      ],
                      admin: { width: "30%" },
                    },
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: { width: "30%" },
                    },
                    {
                      name: "href",
                      type: "text",
                      label: "Link (blank = WhatsApp auto)",
                      admin: { width: "40%" },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Footer",
          name: "footer",
          fields: [
            {
              name: "exploreTitle",
              type: "text",
              defaultValue: "Explore",
            },
            {
              name: "exploreLinks",
              type: "array",
              label: "Explore column links",
              admin: { initCollapsed: true },
              fields: linkFields,
            },
            {
              name: "courseTitle",
              type: "text",
              defaultValue: "Course",
            },
            {
              name: "courseLinks",
              type: "array",
              label: "Course column links",
              admin: { initCollapsed: true },
              fields: linkFields,
            },
            {
              name: "contactTitle",
              type: "text",
              defaultValue: "Contact",
            },
            {
              name: "copyright",
              type: "text",
              defaultValue: "© 2026 SRR Careers. All rights reserved.",
            },
            {
              name: "craftedText",
              type: "text",
              defaultValue:
                "MSME-registered institute · Udyam No. UDYAM-TS-02-0353884",
              admin: {
                description:
                  "Short trust line in the footer (e.g. MSME / Udyam registration).",
              },
            },
            {
              name: "showMsmeLogo",
              type: "checkbox",
              label: "Show MSME logo in footer",
              defaultValue: true,
            },
            {
              name: "msmeBadgeLabel",
              type: "text",
              label: "MSME badge label",
              defaultValue: "Registered with MSME",
              admin: {
                description:
                  "Caption under the MSME logo in the footer brand column.",
              },
            },
          ],
        },
      ],
    },
  ],
};
