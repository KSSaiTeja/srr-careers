import { NextResponse, after } from "next/server";
import { appendRow, isSheetsConfigured } from "@/lib/google/sheets-client";
import { sendDemoLeadMails } from "@/lib/mail/enrollment-mail";
import type { LeadResponse, LeadSubmission } from "@/lib/leads/types";

export const runtime = "nodejs";

/**
 * Lead capture → Google Sheets (via the service-account Sheets API; see
 * lib/google/sheets-client.ts for setup). Routed by `source`:
 *   - "Subscriptions" → newsletter sign-ups.
 *   - "Leads"         → demo-class enquiries (source enrollment-form, labelled
 *                       "Demo Form"). Paid checkouts do NOT go here — they live
 *                       in the "Enrollments" tab (see lib/payment/enrollment-sheet).
 */
const LEADS_TAB = "Leads";
const LEADS_HEADERS = [
  "Submitted At",
  "Source",
  "Name",
  "Email",
  "Mobile",
  "Course",
];

const SUBSCRIPTIONS_TAB = "Subscriptions";
const SUBSCRIPTIONS_HEADERS = ["Submitted At", "Email"];

export async function POST(request: Request) {
  let body: Partial<LeadSubmission>;
  try {
    body = (await request.json()) as Partial<LeadSubmission>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = (body.fullName ?? "").trim();
  const email = (body.email ?? "").trim();
  const mobile = (body.mobile ?? "").trim();
  const course = (body.course ?? "").trim();
  const source = body.source === "newsletter" ? "newsletter" : "enrollment-form";

  if (!email || (source === "enrollment-form" && (!fullName || !mobile))) {
    return NextResponse.json(
      { error: "Name, email and mobile are required." },
      { status: 400 },
    );
  }

  if (!isSheetsConfigured()) {
    console.error("[lead] Google Sheets service account is not configured");
    return NextResponse.json(
      { error: "Lead capture is not configured." },
      { status: 503 },
    );
  }

  // Human-readable IST timestamp for the sheet, e.g. "June 21, 2026, 5:30 PM".
  const submittedAt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  try {
    if (source === "newsletter") {
      await appendRow(SUBSCRIPTIONS_TAB, SUBSCRIPTIONS_HEADERS, [
        submittedAt,
        email,
      ]);
    } else {
      await appendRow(LEADS_TAB, LEADS_HEADERS, [
        submittedAt,
        "Demo Form",
        fullName,
        email,
        mobile,
        course,
      ]);

      // Confirmation to the candidate + internal copy, after the response so
      // the slow mail round-trip never blocks the form submission.
      after(() =>
        sendDemoLeadMails({ name: fullName, email, mobile, course }).catch(
          (error) => console.error("[lead] demo mail failed", error),
        ),
      );
    }

    const res: LeadResponse = { ok: true, delivered: true };
    return NextResponse.json(res);
  } catch (error) {
    console.error("[lead] sheet write failed", error);
    return NextResponse.json(
      { error: "We couldn't submit your details. Please try again." },
      { status: 502 },
    );
  }
}
