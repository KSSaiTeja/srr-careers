import { NextResponse, after } from "next/server";
import { appendRow, isSheetsConfigured } from "@/lib/google/sheets-client";
import { sendInternshipApplicationMail } from "@/lib/mail/internship-mail";
import { isMailConfigured } from "@/lib/mail/resend-client";
import {
  INTERNSHIPS_HEADERS,
  INTERNSHIPS_TAB,
  type AcademicStatus,
  type InternshipResponse,
} from "@/lib/internships/types";

export const runtime = "nodejs";

/**
 * Internship applications → Google Sheets tab "Internships".
 * Resume (optional) is emailed to the internal team via Resend (service
 * accounts cannot store files in personal Drive folders without a Shared Drive).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function trim(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const fullName = trim(form.get("fullName"));
  const mobile = trim(form.get("mobile")).replace(/[\s-]/g, "");
  const email = trim(form.get("email"));
  const college = trim(form.get("college"));
  const university = trim(form.get("university"));
  const residingAddress = trim(form.get("residingAddress"));
  const courseOfStudy = trim(form.get("courseOfStudy"));
  const academicStatus = trim(form.get("academicStatus")) as AcademicStatus | "";
  const studyYear = trim(form.get("studyYear"));
  const completedWhen = trim(form.get("completedWhen"));
  const resume = form.get("resume");

  if (!fullName) {
    return NextResponse.json({ error: "Full name is required." }, { status: 400 });
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
  if (!college) {
    return NextResponse.json({ error: "College is required." }, { status: 400 });
  }
  if (!university) {
    return NextResponse.json({ error: "University is required." }, { status: 400 });
  }
  if (!residingAddress || residingAddress.length < 5) {
    return NextResponse.json(
      { error: "Residing address is required." },
      { status: 400 },
    );
  }
  if (!courseOfStudy) {
    return NextResponse.json(
      { error: "Course of study is required." },
      { status: 400 },
    );
  }
  if (academicStatus !== "studying" && academicStatus !== "completed") {
    return NextResponse.json(
      { error: "Select whether you are currently studying or have completed." },
      { status: 400 },
    );
  }
  if (academicStatus === "studying" && !studyYear) {
    return NextResponse.json(
      { error: "Please select which year you are studying." },
      { status: 400 },
    );
  }
  if (academicStatus === "completed" && !completedWhen) {
    return NextResponse.json(
      { error: "Please enter when you completed your course." },
      { status: 400 },
    );
  }

  if (!isSheetsConfigured()) {
    console.error("[internships] Google Sheets is not configured");
    return NextResponse.json(
      { error: "Application capture is not configured." },
      { status: 503 },
    );
  }

  let resumeFile:
    | { filename: string; content: Buffer; contentType: string }
    | undefined;
  let resumeNote = "";

  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume must be 5 MB or smaller." },
        { status: 400 },
      );
    }
    if (!ALLOWED_MIME.has(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document." },
        { status: 400 },
      );
    }
    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Resume delivery is not configured. Please remove the file and submit, or try again later.",
        },
        { status: 503 },
      );
    }

    resumeFile = {
      filename: resume.name || "resume.pdf",
      content: Buffer.from(await resume.arrayBuffer()),
      contentType: resume.type,
    };
    resumeNote = `Emailed to team (${resumeFile.filename})`;
  }

  const academicStatusLabel =
    academicStatus === "studying" ? "Currently studying" : "Completed";

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
    await appendRow(INTERNSHIPS_TAB, [...INTERNSHIPS_HEADERS], [
      submittedAt,
      fullName,
      mobile,
      email,
      college,
      university,
      residingAddress,
      courseOfStudy,
      academicStatusLabel,
      academicStatus === "studying" ? studyYear : "",
      academicStatus === "completed" ? completedWhen : "",
      resumeNote,
    ]);

    after(() =>
      sendInternshipApplicationMail({
        fullName,
        mobile,
        email,
        college,
        university,
        residingAddress,
        courseOfStudy,
        academicStatusLabel,
        studyYear: academicStatus === "studying" ? studyYear : "",
        completedWhen: academicStatus === "completed" ? completedWhen : "",
        resume: resumeFile,
      }).catch((error) =>
        console.error("[internships] notify mail failed", error),
      ),
    );

    const res: InternshipResponse = { ok: true, delivered: true };
    return NextResponse.json(res);
  } catch (error) {
    console.error("[internships] sheet write failed", error);
    return NextResponse.json(
      { error: "We couldn't submit your application. Please try again." },
      { status: 502 },
    );
  }
}
