import { isMailConfigured, sendMail } from "@/lib/mail/resend-client";

export type InternshipMailPayload = {
  fullName: string;
  mobile: string;
  email: string;
  college: string;
  university: string;
  residingAddress: string;
  courseOfStudy: string;
  academicStatusLabel: string;
  studyYear: string;
  completedWhen: string;
  resume?: {
    filename: string;
    content: Buffer;
    contentType: string;
  };
};

function notifyRecipients(): string[] {
  const internal = (process.env.EMAILS_INTERNAL_TO ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  if (internal.length > 0) return internal;

  const replyTo = process.env.RESEND_REPLY_TO?.trim();
  return replyTo ? [replyTo] : [];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;color:#5b5b5b;font-size:13px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#111;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`;
}

/**
 * Notifies the internal team of an internship application.
 * Resume (if any) is attached to the email — avoids Google Drive SA quota limits.
 */
export async function sendInternshipApplicationMail(
  payload: InternshipMailPayload,
): Promise<boolean> {
  if (!isMailConfigured()) return false;

  const to = notifyRecipients();
  if (to.length === 0) {
    console.warn("[internships] no EMAILS_INTERNAL_TO / RESEND_REPLY_TO for notify");
    return false;
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h1 style="font-size:20px;color:#083f88;">New internship application</h1>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">
        ${row("Full name", payload.fullName)}
        ${row("Mobile", payload.mobile)}
        ${row("Email", payload.email)}
        ${row("College", payload.college)}
        ${row("University", payload.university)}
        ${row("Address", payload.residingAddress)}
        ${row("Course of study", payload.courseOfStudy)}
        ${row("Academic status", payload.academicStatusLabel)}
        ${row("Year of study", payload.studyYear)}
        ${row("Completed when", payload.completedWhen)}
        ${row(
          "Resume",
          payload.resume ? `Attached (${payload.resume.filename})` : "Not provided",
        )}
      </table>
    </div>
  `;

  return sendMail({
    to,
    subject: `Internship application — ${payload.fullName}`,
    html,
    text: [
      `New internship application from ${payload.fullName}`,
      `Mobile: ${payload.mobile}`,
      `Email: ${payload.email}`,
      `College: ${payload.college}`,
      `University: ${payload.university}`,
      `Course: ${payload.courseOfStudy}`,
      payload.resume
        ? `Resume attached: ${payload.resume.filename}`
        : "No resume attached",
    ].join("\n"),
    replyTo: payload.email,
    attachments: payload.resume
      ? [
          {
            filename: payload.resume.filename,
            content: payload.resume.content,
            contentType: payload.resume.contentType,
          },
        ]
      : undefined,
  });
}
