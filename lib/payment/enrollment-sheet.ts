import { upsertRow } from "@/lib/google/sheets-client";
import type { Enrollment } from "@/payload-types";

/**
 * Mirrors an enrollment to the Google Sheet "Enrollments" tab, upserted by
 * Lead Token (stable from step 1) so lead → pending → success/failed updates
 * the SAME row.
 *
 * Best-effort: the DB is the system of record, so a sheet failure is logged but
 * never blocks the checkout flow.
 */
export type EnrollmentSheetRow = Pick<
  Enrollment,
  | "leadToken"
  | "name"
  | "email"
  | "mobile"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "state"
  | "pincode"
  | "courseSlug"
  | "courseName"
  | "planType"
  | "status"
  | "amount"
  | "coursePrice"
  | "firstInstallmentAmount"
  | "orderId"
  | "paymentId"
  | "paymentDate"
  | "nextInstallmentDate"
  | "failureReason"
>;

const ENROLLMENT_TAB = "Enrollments";
const ENROLLMENT_HEADERS = [
  "Updated At",
  "Enrollment Ref",
  "Order ID",
  "Status",
  "Name",
  "Email",
  "Mobile",
  "Address Line 1",
  "Address Line 2",
  "City",
  "State",
  "Pincode",
  "Course",
  "Course Slug",
  "Plan",
  "Amount",
  "Course Price",
  "First Installment",
  "Balance",
  "Payment ID",
  "Payment Date",
  "Next Installment Date",
  "Failure Reason",
];
const KEY_COLUMN_INDEX = 1; // "Enrollment Ref" (leadToken)
const STATUS_COLUMN_INDEX = 3; // "Status"

function istTimestamp(): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

/** Renders an ISO date as a readable IST day, e.g. "July 26, 2026". */
function istDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

const NA = "N/A";

function displayOrderId(orderId: string | null | undefined): string {
  if (!orderId) return "";
  return orderId.startsWith("draft_") ? "" : orderId;
}

export async function mirrorEnrollmentToSheet(
  row: EnrollmentSheetRow,
): Promise<void> {
  const leadToken = row.leadToken;
  if (!leadToken) {
    console.error("[enrollment] sheet mirror skipped — missing leadToken");
    return;
  }

  const status = row.status ?? "pending";
  const isInstallment = row.planType === "installment";
  const coursePrice = row.coursePrice ?? 0;

  // Installment-only fields read "N/A" for a single (full) payment.
  const firstInstallmentCell = isInstallment
    ? (row.firstInstallmentAmount ?? "")
    : NA;
  const balanceCell = !isInstallment
    ? NA
    : coursePrice > 0
      ? Math.max(coursePrice - (row.amount ?? 0), 0)
      : "";

  // Next installment: N/A for single; for installment it's the due date once
  // paid, "N/A" if fully paid (no balance), or blank while still pending.
  let nextInstallmentCell: string;
  if (!isInstallment) {
    nextInstallmentCell = NA;
  } else if (row.nextInstallmentDate) {
    nextInstallmentCell = istDate(row.nextInstallmentDate);
  } else if (status === "success") {
    nextInstallmentCell = NA;
  } else {
    nextInstallmentCell = "";
  }

  try {
    await upsertRow({
      title: ENROLLMENT_TAB,
      headers: ENROLLMENT_HEADERS,
      keyColumnIndex: KEY_COLUMN_INDEX,
      keyValue: leadToken,
      statusColumnIndex: STATUS_COLUMN_INDEX,
      status,
      values: [
        istTimestamp(),
        leadToken,
        displayOrderId(row.orderId),
        status,
        row.name,
        row.email,
        row.mobile,
        row.addressLine1 ?? "",
        row.addressLine2 ?? "",
        row.city ?? "",
        row.state ?? "",
        row.pincode ?? "",
        row.courseName ?? "",
        row.courseSlug,
        isInstallment ? "installment" : "single",
        row.amount ?? "",
        coursePrice || "",
        firstInstallmentCell,
        balanceCell,
        row.paymentId ?? "",
        istDate(row.paymentDate),
        nextInstallmentCell,
        row.failureReason ?? "",
      ],
    });
  } catch (error) {
    console.error("[enrollment] sheet mirror failed", leadToken, error);
  }
}
