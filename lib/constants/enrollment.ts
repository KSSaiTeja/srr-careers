export const enrollmentCourseOptions = [
  {
    value: "sap-fico-consultant-track",
    label: "SAP FICO S/4HANA — Consultant Track",
  },
  {
    value: "sap-fico-end-user-track",
    label: "SAP FICO S/4HANA — End User Track",
  },
  {
    value: "advanced-excel",
    label: "Advanced Excel",
  },
  {
    value: "campus-recruitment-training",
    label: "Campus Recruitment Training (CRT)",
  },
  {
    value: "institution-customisation",
    label: "Institution — Contact for customisation",
  },
] as const;

export type EnrollmentCourseValue =
  (typeof enrollmentCourseOptions)[number]["value"];
