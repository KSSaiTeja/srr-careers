import type { SelectField } from "payload";

export const homeIconOptions = [
  { label: "Chat bubble", value: "chat" },
  { label: "Settings / gear", value: "settings" },
  { label: "Chart", value: "chart" },
  { label: "Alert", value: "alert" },
  { label: "Project / scan", value: "project" },
  { label: "Clock", value: "clock" },
] as const;

export const iconSelectField: SelectField = {
  name: "icon",
  type: "select",
  required: true,
  label: "Icon",
  admin: {
    description: "Small icon shown above the text.",
  },
  options: [...homeIconOptions],
};
