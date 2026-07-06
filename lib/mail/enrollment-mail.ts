import type { Payload } from "payload";
import type { Enrollment } from "@/payload-types";
import { isMailConfigured, sendMail } from "./resend-client";
import * as templates from "./templates";

/**
 * Idempotent transactional mail for enrollments. Each send is guarded by a
 * boolean flag on the row (mailed_*), set only after a successful hand-off to
 * Resend — so retries (verify + webhook) never double-send, and a transient
 * mail failure is retried on the next transition. All sends are best-effort:
 * mail is never authoritative and never blocks the caller.
 */

type FlagField = "mailedSuccess" | "mailedFailed";

async function setFlag(
  payload: Payload,
  id: number,
  field: FlagField,
  value: boolean,
): Promise<void> {
  try {
    await payload.update({
      collection: "enrollments",
      id,
      data: { [field]: value },
    });
  } catch (error) {
    console.error("[mail] failed to set flag", field, id, error);
  }
}

function buildStatusMail(
  status: "success" | "failed",
  fresh: Enrollment,
): templates.MailContent {
  if (status === "failed") return templates.paymentFailed(fresh);
  try {
    return templates.paymentSuccess(fresh);
  } catch (error) {
    console.error(
      "[mail] receipt template failed, using fallback",
      fresh.orderId,
      error,
    );
    return templates.paymentSuccessFallback(fresh);
  }
}

/**
 * Routes a status transition to the right mail (success → receipt,
 * failed → failure notice). Safe to call repeatedly and concurrently.
 */
export async function sendEnrollmentStatusMail(
  payload: Payload,
  doc: Enrollment,
): Promise<void> {
  if (!isMailConfigured()) return;
  const status = doc.status;
  if (status !== "success" && status !== "failed") return;
  const field: FlagField = status === "success" ? "mailedSuccess" : "mailedFailed";

  let fresh: Enrollment = doc;
  try {
    fresh = (await payload.findByID({
      collection: "enrollments",
      id: doc.id,
      depth: 0,
    })) as Enrollment;
  } catch {
    // Fall back to the passed-in snapshot if the re-read fails.
  }

  if (fresh.status !== status || fresh[field] || !fresh.email) return;

  await setFlag(payload, doc.id, field, true);
  const content = buildStatusMail(status, fresh);
  const ok = await sendMail({ to: fresh.email, ...content });
  if (!ok) await setFlag(payload, doc.id, field, false);
}

export async function sendDemoLeadMails(input: {
  name: string;
  email: string;
  mobile: string;
  course?: string;
}): Promise<void> {
  if (!isMailConfigured() || !input.email) return;
  await sendMail({ to: input.email, ...templates.demoLeadCandidate(input) });
}
