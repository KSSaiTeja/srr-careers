import type { Field, GlobalConfig } from "payload";

import { authenticated } from "../access/authenticated";

const placeholderGradientField: Field = {
  name: "placeholderGradient",
  type: "select",
  label: "Fallback gradient (shown if no photo)",
  required: true,
  defaultValue: "from-brand-lavender via-brand-purple-light to-brand-purple",
  options: [
    {
      label: "Lavender → purple light → purple",
      value: "from-brand-lavender via-brand-purple-light to-brand-purple",
    },
    {
      label: "Purple light → purple → deep",
      value: "from-brand-purple-light via-brand-purple to-brand-purple-deep",
    },
    {
      label: "Lavender → purple → purple light",
      value: "from-brand-lavender via-brand-purple to-brand-purple-light",
    },
    {
      label: "Deep → purple → purple light",
      value: "from-brand-purple-deep via-brand-purple to-brand-purple-light",
    },
  ],
};

export const OurTeamPage: GlobalConfig = {
  slug: "our-team-page",
  label: "Our Team Page",
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: "Website Pages",
    description:
      "The Our Team page (/our-team) — intro copy and faculty profiles. Click a member to edit card + profile popup (bio, workshops, photo). Changes go live after you click Save.",
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
              label: "Eyebrow",
              defaultValue: "Our Team",
            },
            {
              name: "headline",
              type: "text",
              defaultValue: "Mentors you'd love to work with",
            },
            {
              name: "subtext",
              type: "textarea",
              defaultValue:
                "Meet the facilitators behind SRR Careers — experienced educators and practitioners who bring real-world finance and SAP expertise into every cohort. Select a profile to learn more.",
            },
          ],
        },
        {
          label: "2 · Team members",
          name: "membersSection",
          fields: [
            {
              name: "viewProfileLabel",
              type: "text",
              label: "Card CTA label",
              defaultValue: "View profile →",
            },
            {
              name: "workshopsHeading",
              type: "text",
              label: "Workshops heading (in profile)",
              defaultValue: "Workshops",
            },
            {
              name: "members",
              type: "array",
              label: "Faculty profiles",
              labels: { singular: "Member", plural: "Members" },
              admin: {
                initCollapsed: true,
                description:
                  "Drag to reorder. Each row is a card on the page; Bio + Workshops appear in the profile popup when someone clicks the card. Upload a square headshot (≈480×480), or leave empty to use the fallback image path.",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "slug",
                      type: "text",
                      required: true,
                      label: "Slug (stable id)",
                      admin: {
                        width: "40%",
                        description: 'e.g. "kumar-arun"',
                      },
                    },
                    {
                      name: "name",
                      type: "text",
                      required: true,
                      admin: { width: "60%" },
                    },
                  ],
                },
                {
                  name: "credential",
                  type: "text",
                  required: true,
                  label: "Credential / title",
                  admin: {
                    description:
                      'Shown on the card and as the badge in the profile popup (e.g. "SAP FICO Expert", "CA").',
                  },
                },
                {
                  name: "photo",
                  type: "upload",
                  relationTo: "media",
                  label: "Headshot",
                  admin: {
                    description:
                      "Used on the card and in the popup. Square JPEG/PNG, ideally 480×480. Leave empty to keep the fallback path below.",
                  },
                },
                {
                  name: "fallbackImagePath",
                  type: "text",
                  label: "Fallback image path (optional)",
                  admin: {
                    description:
                      "Public path used when no CMS photo is uploaded, e.g. /images/team/kumar-arun.jpg",
                  },
                },
                placeholderGradientField,
                {
                  type: "collapsible",
                  label: "Profile popup content",
                  admin: {
                    initCollapsed: false,
                    description:
                      "Everything below shows when a visitor opens this person’s profile dialog.",
                  },
                  fields: [
                    {
                      name: "bio",
                      type: "array",
                      label: "Bio paragraphs (popup)",
                      labels: { singular: "Paragraph", plural: "Paragraphs" },
                      minRows: 1,
                      admin: {
                        initCollapsed: false,
                        description:
                          "Main body copy inside the profile popup. Add one row per paragraph.",
                      },
                      fields: [
                        {
                          name: "text",
                          type: "textarea",
                          required: true,
                          label: "Paragraph",
                        },
                      ],
                    },
                    {
                      name: "workshops",
                      type: "array",
                      label: "Workshops list (popup)",
                      labels: { singular: "Workshop", plural: "Workshops" },
                      admin: {
                        initCollapsed: false,
                        description:
                          "Optional list at the bottom of the popup. Leave empty to hide that block.",
                      },
                      fields: [
                        {
                          name: "title",
                          type: "text",
                          required: true,
                          label: "Workshop title",
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
