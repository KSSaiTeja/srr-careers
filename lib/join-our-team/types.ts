/**
 * Join Our Team applications → Google Sheets tab "Join Our Team"
 * (same spreadsheet as Leads / Subscriptions / Enrollments; separate tab).
 */

export const JOIN_OUR_TEAM_TAB = "Join Our Team";

export const JOIN_OUR_TEAM_HEADERS = [
  "Submitted At",
  "Full Name",
  "Pincode",
  "City",
  "State",
  "Mobile",
  "Email",
  "Course Name",
  "Experience",
  "YouTube Link",
  "Instagram",
  "LinkedIn Profile",
] as const;

export type JoinOurTeamSubmission = {
  fullName: string;
  pincode: string;
  city: string;
  state: string;
  mobile: string;
  email: string;
  courseName: string;
  experience: string;
  youtubeLink?: string;
  instagram?: string;
  linkedin?: string;
};

export type JoinOurTeamResponse = {
  ok: boolean;
  delivered: boolean;
};
