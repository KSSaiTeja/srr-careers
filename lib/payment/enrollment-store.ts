import { randomUUID } from "crypto";
import config from "@payload-config";
import { after } from "next/server";
import { getPayload, type Payload } from "payload";
import { sendEnrollmentStatusMail } from "@/lib/mail/enrollment-mail";
import type { Enrollment } from "@/payload-types";
import { mirrorEnrollmentToSheet } from "./enrollment-sheet";
import type { BillingAddress, PlanType } from "./types";

/**
 * Mirrors to the Sheet AFTER the response is sent (Next.js `after()`), so the
 * slow Sheets API round-trips never block checkout. The DB is the system of
 * record; the Sheet is an eventually-consistent mirror. Falls back to a
 * fire-and-forget call outside a request context (e.g. scripts/cron).
 */
function scheduleSheetSync(doc: Enrollment): void {
  try {
    after(() => mirrorEnrollmentToSheet(doc));
  } catch {
    void mirrorEnrollmentToSheet(doc);
  }
}

/**
 * Sends the success/failed transactional mail AFTER the response (non-blocking),
 * mirroring scheduleSheetSync. Idempotent: sendEnrollmentStatusMail guards on a
 * per-row flag, and we only schedule it on the first real status transition.
 */
function scheduleStatusMail(payload: Payload, doc: Enrollment): void {
  const run = () =>
    sendEnrollmentStatusMail(payload, doc).catch((error) =>
      console.error("[enrollment] status mail failed", doc.orderId, error),
    );
  try {
    after(run);
  } catch {
    void run();
  }
}

type LeadInput = {
  leadToken?: string;
  name: string;
  email: string;
  mobile: string;
  courseSlug: string;
  courseName: string;
  planType: PlanType;
  amount: number;
  coursePrice: number;
  firstInstallmentAmount?: number;
};

/** Returns the same calendar day one month later, as an ISO string. */
function addOneMonth(from: Date): string {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 1);
  return d.toISOString();
}

function draftOrderId(leadToken: string): string {
  return `draft_${leadToken}`;
}

/**
 * Step 1: creates or updates a `lead` enrollment (personal details + plan).
 * Uses a stable `leadToken` as the sheet upsert key; `orderId` is a draft
 * placeholder until Razorpay assigns a real id on step 2.
 */
export async function upsertLeadEnrollment(input: LeadInput): Promise<Enrollment> {
  const payload = await getPayload({ config });

  if (input.leadToken) {
    const found = await payload.find({
      collection: "enrollments",
      where: { leadToken: { equals: input.leadToken } },
      limit: 1,
      depth: 0,
    });
    const current = found.docs[0] as Enrollment | undefined;
    if (!current) {
      throw new Error(`Lead not found: ${input.leadToken}`);
    }
    if (current.status !== "lead") {
      throw new Error(`Lead already progressed: ${input.leadToken}`);
    }

    const updated = (await payload.update({
      collection: "enrollments",
      id: current.id,
      data: {
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        courseSlug: input.courseSlug,
        courseName: input.courseName,
        planType: input.planType,
        amount: input.amount,
        coursePrice: input.coursePrice,
        firstInstallmentAmount: input.firstInstallmentAmount ?? null,
      },
    })) as Enrollment;

    scheduleSheetSync(updated);
    return updated;
  }

  const leadToken = randomUUID();
  const doc = (await payload.create({
    collection: "enrollments",
    data: {
      leadToken,
      name: input.name,
      email: input.email,
      mobile: input.mobile,
      courseSlug: input.courseSlug,
      courseName: input.courseName,
      planType: input.planType,
      status: "lead",
      amount: input.amount,
      coursePrice: input.coursePrice,
      firstInstallmentAmount: input.firstInstallmentAmount ?? null,
      currency: "INR",
      orderId: draftOrderId(leadToken),
    },
  })) as Enrollment;

  scheduleSheetSync(doc);
  return doc;
}

type FinalizeCheckoutInput = LeadInput &
  BillingAddress & {
    leadToken: string;
    orderId: string;
  };

/**
 * Step 2: attaches billing address and promotes a `lead` to `pending` with the
 * real Razorpay order id, ready for payment.
 */
export async function finalizeLeadForCheckout(
  input: FinalizeCheckoutInput,
): Promise<Enrollment> {
  const payload = await getPayload({ config });
  const found = await payload.find({
    collection: "enrollments",
    where: { leadToken: { equals: input.leadToken } },
    limit: 1,
    depth: 0,
  });

  const current = found.docs[0] as Enrollment | undefined;
  if (!current) {
    throw new Error(`Lead not found: ${input.leadToken}`);
  }
  if (current.status !== "lead") {
    throw new Error(`Lead already progressed: ${input.leadToken}`);
  }

  // Guard against token reuse with mismatched identity.
  if (
    current.email.trim().toLowerCase() !== input.email.trim().toLowerCase() ||
    current.mobile.replace(/\D/g, "") !== input.mobile.replace(/\D/g, "")
  ) {
    throw new Error("Lead identity mismatch");
  }

  const updated = (await payload.update({
    collection: "enrollments",
    id: current.id,
    data: {
      name: input.name,
      email: input.email,
      mobile: input.mobile,
      courseSlug: input.courseSlug,
      courseName: input.courseName,
      planType: input.planType,
      amount: input.amount,
      coursePrice: input.coursePrice,
      firstInstallmentAmount: input.firstInstallmentAmount ?? null,
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2 ?? null,
      city: input.city,
      state: input.state,
      pincode: input.pincode,
      orderId: input.orderId,
      status: "pending",
    },
  })) as Enrollment;

  scheduleSheetSync(updated);
  return updated;
}

type UpdateStatusInput = {
  orderId: string;
  status: "failed" | "success";
  paymentId?: string;
  failureReason?: string;
  /**
   * When set (from the signed webhook), the captured amount in paise MUST match
   * the stored order amount before we mark `success`. Defends against any
   * amount mismatch / misattribution even though the signature is already valid.
   */
  expectedAmountPaise?: number;
};

/**
 * Idempotently transitions an enrollment by `orderId`. Designed to be called
 * from both the instant verify route and the (authoritative) webhook, possibly
 * multiple times:
 *   - `success` always wins and is terminal (re-applying is a no-op).
 *   - `failed` is only applied while still `pending` (never downgrades success).
 * Returns the resulting enrollment, or null when no matching order exists.
 */
export async function updateEnrollmentStatus(
  input: UpdateStatusInput,
): Promise<Enrollment | null> {
  const payload = await getPayload({ config });
  const found = await payload.find({
    collection: "enrollments",
    where: { orderId: { equals: input.orderId } },
    limit: 1,
    depth: 0,
  });

  const current = found.docs[0] as Enrollment | undefined;
  if (!current) return null;

  // Security guard: never confirm `success` if the captured amount doesn't match
  // what we charged. (Normally impossible — Razorpay enforces the order amount —
  // so a mismatch means tampering or a bug; leave it pending for manual review.)
  if (
    input.status === "success" &&
    input.expectedAmountPaise != null &&
    input.expectedAmountPaise !== Math.round((current.amount ?? 0) * 100)
  ) {
    console.error(
      `[security] amount mismatch for ${input.orderId}: captured ${input.expectedAmountPaise} paise, expected ${Math.round((current.amount ?? 0) * 100)} paise`,
    );
    return current;
  }

  if (current.status === "success") {
    return current;
  }
  if (input.status === "failed" && current.status !== "pending") {
    return current;
  }
  if (
    current.status === input.status &&
    (input.paymentId ?? null) === (current.paymentId ?? null)
  ) {
    return current;
  }

  // On the first successful payment, stamp the payment date and (for an
  // installment plan that still has a balance) the next installment due date.
  let paymentDate = current.paymentDate ?? null;
  let nextInstallmentDate = current.nextInstallmentDate ?? null;
  if (input.status === "success" && !paymentDate) {
    const now = new Date();
    paymentDate = now.toISOString();
    const balance = (current.coursePrice ?? 0) - (current.amount ?? 0);
    if (current.planType === "installment" && balance > 0) {
      nextInstallmentDate = addOneMonth(now);
    }
  }

  const updated = (await payload.update({
    collection: "enrollments",
    id: current.id,
    data: {
      status: input.status,
      paymentId: input.paymentId ?? current.paymentId ?? null,
      paymentDate,
      nextInstallmentDate,
      failureReason:
        input.status === "failed"
          ? (input.failureReason ?? current.failureReason ?? "Payment failed")
          : null,
    },
  })) as Enrollment;

  scheduleSheetSync(updated);
  scheduleStatusMail(payload, updated);
  return updated;
}
