export type LeadSource = "enrollment-form" | "newsletter";

export type LeadSubmission = {
  fullName: string;
  email: string;
  mobile: string;
  course?: string;
  source: LeadSource;
};

export type LeadResponse = {
  ok: boolean;
  /** True only when the lead was actually written to Google Sheets. */
  delivered: boolean;
};
