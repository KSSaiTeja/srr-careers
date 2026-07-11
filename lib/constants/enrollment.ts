export const enrollmentCourseOptions = [
  {
    value: "sap-fico-consultant-track",
    label: "SAP FICO S/4 HANA — Consultant Track",
  },
  {
    value: "sap-fico-end-user-track",
    label: "SAP FICO S/4 HANA — End User Track",
  },
  {
    value: "advanced-excel",
    label: "Advanced Excel Workshop",
  },
  {
    value: "campus-recruitment-training",
    label: "Campus Recruitment Training (CRT)",
  },
  {
    value: "not-sure",
    label: "Not sure yet — help me choose",
  },
] as const;

export type EnrollmentCourseValue =
  (typeof enrollmentCourseOptions)[number]["value"];
