import { NextResponse } from "next/server";
import { appendRow, isSheetsConfigured } from "@/lib/google/sheets-client";
import {
  JOIN_OUR_TEAM_HEADERS,
  JOIN_OUR_TEAM_TAB,
  type JoinOurTeamResponse,
  type JoinOurTeamSubmission,
} from "@/lib/join-our-team/types";

export const runtime = "nodejs";

/**
 * Join Our Team applications → Google Sheets tab "Join Our Team".
 * Same spreadsheet as other forms; never writes to Leads / Subscriptions /
 * Enrollments.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PINCODE_RE = /^\d{6}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Partial<JoinOurTeamSubmission>;
  try {
    body = (await request.json()) as Partial<JoinOurTeamSubmission>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = trim(body.fullName);
  const pincode = trim(body.pincode).replace(/\D/g, "");
  const city = trim(body.city);
  const state = trim(body.state);
  const mobile = trim(body.mobile).replace(/[\s-]/g, "");
  const email = trim(body.email);
  const courseName = trim(body.courseName);
  const experience = trim(body.experience);
  const youtubeLink = trim(body.youtubeLink);
  const instagram = trim(body.instagram);
  const linkedin = trim(body.linkedin);

  if (!fullName) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
  }
  if (!PINCODE_RE.test(pincode) || !city || !state) {
    return NextResponse.json(
      { error: "Enter a valid pincode so city and state can be filled." },
      { status: 400 },
    );
  }
  if (!MOBILE_RE.test(mobile)) {
    return NextResponse.json(
      { error: "Enter a valid 10-digit mobile number." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!courseName) {
    return NextResponse.json({ error: "Course name is required." }, { status: 400 });
  }
  if (!experience) {
    return NextResponse.json({ error: "Experience is required." }, { status: 400 });
  }

  if (!isSheetsConfigured()) {
    console.error("[join-our-team] Google Sheets is not configured");
    return NextResponse.json(
      { error: "Application capture is not configured." },
      { status: 503 },
    );
  }

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
    await appendRow(JOIN_OUR_TEAM_TAB, [...JOIN_OUR_TEAM_HEADERS], [
      submittedAt,
      fullName,
      pincode,
      city,
      state,
      mobile,
      email,
      courseName,
      experience,
      youtubeLink,
      instagram,
      linkedin,
    ]);

    const res: JoinOurTeamResponse = { ok: true, delivered: true };
    return NextResponse.json(res);
  } catch (error) {
    console.error("[join-our-team] sheet write failed", error);
    return NextResponse.json(
      { error: "We couldn't submit your application. Please try again." },
      { status: 502 },
    );
  }
}
