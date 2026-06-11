export const enrollmentCourseOptions = [
  { value: "sap-s4-fico", label: "SAP S/4 HANA FICO" },
  { value: "end-user-track", label: "End user track" },
] as const;

export type EnrollmentCourseValue =
  (typeof enrollmentCourseOptions)[number]["value"];
