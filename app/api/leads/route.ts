import { NextResponse } from "next/server";
import type { LeadResponse, LeadSubmission } from "@/lib/leads/types";

export const runtime = "nodejs";

/**
 * Lead capture → Google Sheets.
 *
 *   GOOGLE_SHEETS_WEBHOOK_URL    deployed Apps Script web-app URL (required)
 *   GOOGLE_SHEETS_WEBHOOK_TOKEN  (optional) shared secret to reject spam
 *
 * Enrolment enquiries land in the "Leads" tab; newsletter sign-ups land in the
 * "Subscriptions" tab of the same spreadsheet (routed by `source`).
 *
 * IMPORTANT — deploying the Apps Script (do this exactly, or POSTs 404/405):
 *   1. Open the target Google Sheet → Extensions → Apps Script (so the script is
 *      *bound* to the sheet and getActiveSpreadsheet() works).
 *   2. Paste the doPost below. Save.
 *   3. Deploy → New deployment → type "Web app" → Execute as: Me →
 *      Who has access: "Anyone". Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL.
 *   4. After ANY script edit, redeploy (Deploy → Manage deployments → edit →
 *      Version: "New version"), or the old code keeps running.
 *
 * --- Google Apps Script ---
 *   function doPost(e) {
 *     var body = JSON.parse(e.postData.contents);
 *     var TOKEN = "";            // match GOOGLE_SHEETS_WEBHOOK_TOKEN if used
 *     if (TOKEN && body.token !== TOKEN) {
 *       return json({ ok: false, error: "forbidden" });
 *     }
 *     var ss = SpreadsheetApp.getActiveSpreadsheet();
 *     if (body.source === "newsletter") {
 *       var subs = ss.getSheetByName("Subscriptions") || ss.insertSheet("Subscriptions");
 *       subs.appendRow([body.submittedAt, body.email]);
 *     } else {
 *       var leads = ss.getSheetByName("Leads") || ss.insertSheet("Leads");
 *       leads.appendRow([
 *         body.submittedAt, body.source, body.fullName,
 *         body.email, body.mobile, body.course || ""
 *       ]);
 *     }
 *     return json({ ok: true });
 *   }
 *   function json(obj) {
 *     return ContentService.createTextOutput(JSON.stringify(obj))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 */
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

  const payload = {
    submittedAt,
    source,
    fullName,
    email,
    mobile,
    course,
    token: process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN ?? "",
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[lead] GOOGLE_SHEETS_WEBHOOK_URL is not set");
    return NextResponse.json(
      { error: "Lead capture is not configured." },
      { status: 503 },
    );
  }

  try {
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = (await resp.text()).trim();

    // Apps Script can answer 200 with an HTML error/login page even when the row
    // was never written, so a 2xx status alone is not proof of delivery. Require
    // an explicit success marker from our doPost ({"ok":true} or plain "ok").
    let delivered = false;
    if (resp.ok && !/^<!doctype|^<html/i.test(text)) {
      if (/^ok$/i.test(text)) {
        delivered = true;
      } else {
        try {
          delivered = JSON.parse(text)?.ok === true;
        } catch {
          delivered = false;
        }
      }
    }

    if (!delivered) {
      console.error(
        `[lead] webhook did not confirm delivery (status ${resp.status}): ${text.slice(0, 200)}`,
      );
      throw new Error(`webhook unconfirmed (${resp.status})`);
    }

    const res: LeadResponse = { ok: true, delivered: true };
    return NextResponse.json(res);
  } catch (error) {
    console.error("[lead] delivery failed", error);
    return NextResponse.json(
      { error: "We couldn't submit your details. Please try again." },
      { status: 502 },
    );
  }
}
