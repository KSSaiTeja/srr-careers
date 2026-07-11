/**
 * Internship applications → Google Sheets tab "Internships"
 * (same spreadsheet as other forms; separate tab).
 */

export const INTERNSHIPS_TAB = "Internships";

export const INTERNSHIPS_HEADERS = [
  "Submitted At",
  "Full Name",
  "Mobile",
  "Email",
  "College",
  "University",
  "Residing Address",
  "Course of Study",
  "Academic Status",
  "Year of Study",
  "Completed When",
  "Resume",
] as const;

export type AcademicStatus = "studying" | "completed";

export type InternshipResponse = {
  ok: boolean;
  delivered: boolean;
};

export const studyYearOptions = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Final Year",
  "Other",
] as const;
