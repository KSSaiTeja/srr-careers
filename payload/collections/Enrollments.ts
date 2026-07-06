import type { CollectionConfig } from "payload";

import { authenticated } from "../access/authenticated";

/**
 * Course enrolments + payment records. This is the system of record for every
 * checkout attempt; each row is mirrored to the Google Sheet "Enrollments" tab.
 *
 * Lifecycle: lead (step 1 captured) → pending (address + order created) → failed | success.
 * The Razorpay webhook is authoritative and updates rows idempotently by
 * `orderId`. Amounts are validated server-side and stored in whole rupees.
 *
 * Contains PII, so reads/writes require an authenticated admin. The checkout
 * API routes write via Payload's Local API (which bypasses access control).
 */
export const Enrollments: CollectionConfig = {
  slug: "enrollments",
  labels: {
    singular: "Enrollment",
    plural: "Enrollments",
  },
  admin: {
    group: "Operations",
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "courseSlug",
      "planType",
      "amount",
      "status",
      "createdAt",
    ],
    description:
      "Checkout + payment records. The Razorpay webhook keeps status in sync; do not edit status by hand unless reconciling.",
  },
  access: {
    read: authenticated,
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
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "email",
          type: "email",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "mobile",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "courseSlug",
          type: "text",
          required: true,
          index: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "courseName",
      type: "text",
      admin: { description: "Snapshot of the course title at checkout time." },
    },
    {
      type: "row",
      fields: [
        {
          name: "planType",
          type: "select",
          required: true,
          defaultValue: "single",
          options: [
            { label: "Single payment", value: "single" },
            { label: "Installment", value: "installment" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "pending",
          index: true,
          options: [
            { label: "Lead", value: "lead" },
            { label: "Pending", value: "pending" },
            { label: "Failed", value: "failed" },
            { label: "Success", value: "success" },
          ],
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "amount",
          type: "number",
          required: true,
          admin: {
            width: "50%",
            description: "Amount charged for this transaction (whole INR).",
          },
        },
        {
          name: "firstInstallmentAmount",
          type: "number",
          admin: {
            width: "50%",
            description: "First installment amount (whole INR), if applicable.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "coursePrice",
          type: "number",
          admin: {
            width: "50%",
            description: "Full course price at checkout time (whole INR).",
          },
        },
        {
          name: "currency",
          type: "text",
          defaultValue: "INR",
          admin: { width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "paymentDate",
          type: "date",
          admin: {
            width: "50%",
            description: "Date the (first) payment succeeded.",
            date: { pickerAppearance: "dayOnly" },
          },
        },
        {
          name: "nextInstallmentDate",
          type: "date",
          admin: {
            width: "50%",
            description:
              "Due date for the next installment (one month after payment). Empty for single payments / fully-paid plans.",
            date: { pickerAppearance: "dayOnly" },
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "leadToken",
          type: "text",
          unique: true,
          index: true,
          admin: {
            width: "50%",
            description:
              "Stable id from step 1. Used as the Google Sheet upsert key.",
            readOnly: true,
          },
        },
        {
          name: "orderId",
          type: "text",
          required: true,
          unique: true,
          index: true,
          admin: {
            width: "50%",
            description:
              "Razorpay order id (draft_* placeholder until checkout step 2).",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Billing address",
      admin: {
        initCollapsed: false,
        description: "Captured in checkout step 2. Printed on the payment receipt.",
      },
      fields: [
        {
          name: "addressLine1",
          type: "text",
          admin: { width: "50%" },
        },
        {
          name: "addressLine2",
          type: "text",
          admin: { width: "50%" },
        },
        {
          type: "row",
          fields: [
            {
              name: "city",
              type: "text",
              admin: { width: "33%" },
            },
            {
              name: "state",
              type: "text",
              admin: { width: "33%" },
            },
            {
              name: "pincode",
              type: "text",
              admin: { width: "33%" },
            },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "paymentId",
          type: "text",
          index: true,
          admin: { width: "50%", description: "Razorpay payment id." },
        },
      ],
    },
    {
      name: "failureReason",
      type: "text",
      admin: { description: "Populated when a payment fails." },
    },
    {
      type: "collapsible",
      label: "Mail tracking",
      admin: {
        initCollapsed: true,
        description:
          "Set automatically when a notification email is sent. Idempotency guards — don't toggle by hand unless re-sending.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "mailedSuccess",
              type: "checkbox",
              label: "Success/receipt sent",
              defaultValue: false,
              admin: { readOnly: true, width: "50%" },
            },
            {
              name: "mailedFailed",
              type: "checkbox",
              label: "Failure mail sent",
              defaultValue: false,
              admin: { readOnly: true, width: "50%" },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
};
