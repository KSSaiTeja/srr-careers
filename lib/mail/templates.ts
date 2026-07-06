/**
 * Branded, dependency-free HTML email templates. Each builder returns a
 * `{ subject, html, text }` payload ready for sendMail(). Inline styles only —
 * email clients ignore <style>/external CSS — and a plain-text fallback for
 * deliverability.
 */

import { getSeller, invoiceNumber } from "./invoice";
import { logoSrc } from "./logo";

const BRAND = "SRR Careers";
const ACCENT = "#0b5fff";
const INK = "#0f172a";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ||
    "https://srrcareers.in"
  );
}

/** Email-safe logo source: inline cid when embeddable, else a hosted URL. */
function logoUrl(): string {
  return logoSrc(siteUrl());
}

/** ₹12,000 — whole-rupee Indian formatting. */
export function inr(amount: number | null | undefined): string {
  const n = typeof amount === "number" && Number.isFinite(amount) ? amount : 0;
  return `₹${n.toLocaleString("en-IN")}`;
}

/** ISO/date string → "July 26, 2026" in IST; "" when missing/invalid. */
export function istDate(iso: string | null | undefined): string {
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

function esc(value: string | number | null | undefined): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type Row = { label: string; value: string };

function detailRows(rows: Row[]): string {
  return rows
    .filter((r) => r.value !== "" && r.value != null)
    .map(
      (r) => `
        <tr>
          <td style="padding:8px 0;color:${MUTED};font-size:14px;vertical-align:top;white-space:nowrap;">${esc(r.label)}</td>
          <td style="padding:8px 0 8px 16px;color:${INK};font-size:14px;font-weight:600;text-align:right;">${esc(r.value)}</td>
        </tr>`,
    )
    .join("");
}

function button(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="border-radius:8px;background:${ACCENT};">
          <a href="${esc(href)}" style="display:inline-block;padding:12px 22px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">${esc(label)}</a>
        </td>
      </tr>
    </table>`;
}

/** Wraps body content in the shared branded shell. */
function layout(opts: {
  heading: string;
  intro: string;
  body: string;
  accent?: string;
}): string {
  const accent = opts.accent ?? ACCENT;
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${BORDER};">
            <tr>
              <td style="height:4px;line-height:4px;font-size:0;background:${accent};">&nbsp;</td>
            </tr>
            <tr>
              <td align="center" style="background:#ffffff;padding:24px 28px 12px;border-bottom:1px solid ${BORDER};">
                <img src="${logoUrl()}" alt="${BRAND}" width="176" style="display:block;margin:0 auto;width:176px;max-width:70%;height:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 8px;color:${INK};font-size:20px;font-weight:700;">${opts.heading}</h1>
                <p style="margin:0 0 16px;color:${MUTED};font-size:15px;line-height:1.6;">${opts.intro}</p>
                ${opts.body}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;border-top:1px solid ${BORDER};">
                <p style="margin:0;color:${MUTED};font-size:12px;line-height:1.6;">
                  ${BRAND} — a finishing school for SAP S/4 HANA FICO consultants.<br/>
                  This is an automated message. Reply to this email if you need help.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function card(inner: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:10px;padding:8px 16px;background:#f8fafc;">${inner}</table>`;
}

/** A labelled totals line (right-aligned), optionally emphasised. */
function totalRow(label: string, value: string, strong = false): string {
  const weight = strong ? "700" : "500";
  const color = strong ? INK : MUTED;
  const size = strong ? "15px" : "14px";
  const border = strong ? `border-top:1px solid ${BORDER};` : "";
  return `
    <tr>
      <td style="padding:7px 0;${border}color:${color};font-size:${size};text-align:right;">${esc(label)}</td>
      <td style="padding:7px 0 7px 18px;${border}color:${INK};font-size:${size};font-weight:${weight};text-align:right;white-space:nowrap;">${esc(value)}</td>
    </tr>`;
}

/**
 * Payment receipt for a successful enrollment. Seller details from env; buyer
 * address from the enrollment record. No GST — supplier is below the GST
 * registration threshold.
 */
function invoiceSection(e: EnrollmentLike): string {
  const seller = getSeller();
  const issuedAt = e.paymentDate ? new Date(e.paymentDate) : new Date();
  const invNo = invoiceNumber(e.orderId, issuedAt);
  const isInstallment = e.planType === "installment";
  const balance = balanceOf(e);

  const description = `${e.courseName || "Course enrollment"} — ${
    isInstallment ? "Installment payment" : "Full payment"
  }`;

  const sellerLines = [
    `<strong style="color:${INK};">${esc(seller.legalName)}</strong>`,
    ...seller.addressLines.map(esc),
    `${esc(seller.email)} · ${esc(seller.phone)}`,
  ].join("<br/>");

  const billToParts = [
    `<strong style="color:${INK};">${esc(e.name || "Customer")}</strong>`,
    e.addressLine1 ? esc(e.addressLine1) : "",
    e.addressLine2 ? esc(e.addressLine2) : "",
    e.city && e.state && e.pincode
      ? `${esc(e.city)}, ${esc(e.state)} — ${esc(e.pincode)}`
      : "",
    esc(e.email),
    e.mobile ? esc(e.mobile) : "",
  ].filter(Boolean);
  const billToLines = billToParts.join("<br/>");

  const lineItems = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 10px;background:#f1f5f9;border:1px solid ${BORDER};color:${MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;">Description</td>
        <td style="padding:8px 10px;background:#f1f5f9;border:1px solid ${BORDER};color:${MUTED};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;text-align:right;white-space:nowrap;">Amount</td>
      </tr>
      <tr>
        <td style="padding:10px;border:1px solid ${BORDER};color:${INK};font-size:14px;">${esc(description)}</td>
        <td style="padding:10px;border:1px solid ${BORDER};color:${INK};font-size:14px;text-align:right;white-space:nowrap;">${inr(e.amount)}</td>
      </tr>
    </table>`;

  const totals = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
      ${totalRow("Amount paid", inr(e.amount), true)}
      ${
        isInstallment && (e.coursePrice ?? 0) > 0
          ? totalRow("Course price", inr(e.coursePrice))
          : ""
      }
      ${isInstallment && balance > 0 ? totalRow("Balance due", inr(balance)) : ""}
    </table>`;

  const metaRows = detailRows([
    { label: "Receipt no.", value: invNo },
    { label: "Date", value: istDate(issuedAt.toISOString()) },
    { label: "Payment status", value: "Paid" },
    { label: "Payment method", value: "Razorpay" },
    { label: "Payment ID", value: e.paymentId ?? "" },
    { label: "Order ID", value: e.orderId },
  ]);

  return `
    <div style="margin-top:8px;border:1px solid ${BORDER};border-radius:12px;overflow:hidden;">
      <div style="padding:16px 18px;background:#f8fafc;border-bottom:1px solid ${BORDER};">
        <span style="display:inline-block;color:${INK};font-size:16px;font-weight:700;letter-spacing:0.3px;">PAYMENT RECEIPT</span>
        <span style="float:right;display:inline-block;padding:3px 10px;border-radius:999px;background:#dcfce7;color:#166534;font-size:12px;font-weight:700;">PAID</span>
      </div>
      <div style="padding:18px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:55%;color:${MUTED};font-size:12px;line-height:1.7;">
              <span style="display:block;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;">From</span>
              ${sellerLines}
            </td>
            <td style="vertical-align:top;width:45%;color:${MUTED};font-size:12px;line-height:1.7;padding-left:14px;">
              <span style="display:block;color:${MUTED};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;margin-bottom:4px;">Bill to</span>
              ${billToLines}
            </td>
          </tr>
        </table>
        <div style="margin-top:14px;">${card(metaRows)}</div>
        ${lineItems}
        ${totals}
        <p style="margin:14px 0 0;color:${MUTED};font-size:12px;line-height:1.6;">
          GST is not applicable on this receipt. SRR Careers is not registered under GST.
        </p>
      </div>
    </div>`;
}

export type MailContent = { subject: string; html: string; text: string };

/* ───────────────────────── Demo / lead capture ───────────────────────── */

export function demoLeadCandidate(input: {
  name: string;
  email: string;
  mobile: string;
  course?: string;
}): MailContent {
  const rows = detailRows([
    { label: "Name", value: input.name },
    { label: "Email", value: input.email },
    { label: "Mobile", value: input.mobile },
    { label: "Course", value: input.course ?? "" },
  ]);
  const body = `${card(rows)}
    <p style="margin:20px 0 0;color:${MUTED};font-size:14px;line-height:1.6;">
      Our team will reach out shortly to schedule your free demo class. Meanwhile, explore the program below.
    </p>
    ${button("Explore the course", siteUrl())}`;
  return {
    subject: "We've got your demo request — SRR Careers",
    html: layout({
      heading: "Thanks for booking a demo! 🎉",
      intro: `Hi ${esc(input.name) || "there"}, we've received your request for a free demo class. Here are the details you shared:`,
      body,
    }),
    text: [
      `Hi ${input.name || "there"},`,
      "",
      "Thanks for booking a free demo class with SRR Careers. We've received your details:",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Mobile: ${input.mobile}`,
      input.course ? `Course: ${input.course}` : "",
      "",
      "Our team will reach out shortly to schedule your demo.",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export function demoLeadInternal(input: {
  name: string;
  email: string;
  mobile: string;
  course?: string;
}): MailContent {
  const rows = detailRows([
    { label: "Name", value: input.name },
    { label: "Email", value: input.email },
    { label: "Mobile", value: input.mobile },
    { label: "Course", value: input.course ?? "—" },
    { label: "Source", value: "Demo Form" },
  ]);
  return {
    subject: `New demo enquiry — ${input.name || input.email}`,
    html: layout({
      heading: "New demo enquiry",
      intro: "A candidate just submitted the demo-class form.",
      body: card(rows),
    }),
    text: `New demo enquiry\nName: ${input.name}\nEmail: ${input.email}\nMobile: ${input.mobile}\nCourse: ${input.course ?? "—"}`,
  };
}

/* ───────────────────────── Payment status ───────────────────────── */

type EnrollmentLike = {
  name: string;
  email: string;
  mobile?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  courseName?: string | null;
  planType: "single" | "installment";
  amount: number;
  coursePrice?: number | null;
  paymentId?: string | null;
  paymentDate?: string | null;
  nextInstallmentDate?: string | null;
  orderId: string;
  failureReason?: string | null;
};

function balanceOf(e: EnrollmentLike): number {
  if (e.planType !== "installment") return 0;
  return Math.max((e.coursePrice ?? 0) - (e.amount ?? 0), 0);
}

export function paymentSuccess(e: EnrollmentLike): MailContent {
  const course = e.courseName || "your course";
  const isInstallment = e.planType === "installment";
  const balance = balanceOf(e);

  let nextNote = "";
  if (isInstallment && balance > 0 && e.nextInstallmentDate) {
    nextNote = `<p style="margin:20px 0 0;color:${INK};font-size:14px;line-height:1.6;">
      Your remaining balance of <strong>${inr(balance)}</strong> is due by
      <strong>${istDate(e.nextInstallmentDate)}</strong>. Our team will share the
      payment details closer to the date — no action needed right now.
    </p>`;
  }

  const body = `
    ${invoiceSection(e)}
    ${nextNote}`;

  return {
    subject: `Payment received — ${course} (${inr(e.amount)})`,
    html: layout({
      heading: "Payment successful ✅",
      intro: `Hi ${esc(e.name) || "there"}, we've received your payment for ${esc(course)}. Here's your receipt.`,
      body,
      accent: "#16a34a",
    }),
    text: [
      `Hi ${e.name || "there"},`,
      "",
      `We've received your payment for ${course}.`,
      `Receipt no.: ${invoiceNumber(e.orderId, e.paymentDate ? new Date(e.paymentDate) : new Date())}`,
      `Amount paid: ${inr(e.amount)}`,
      isInstallment && balance > 0 ? `Balance due: ${inr(balance)}` : "",
      e.paymentId ? `Payment ID: ${e.paymentId}` : "",
      `Order ID: ${e.orderId}`,
      istDate(e.paymentDate) ? `Date: ${istDate(e.paymentDate)}` : "",
      isInstallment && balance > 0 && e.nextInstallmentDate
        ? `Your balance of ${inr(balance)} is due by ${istDate(e.nextInstallmentDate)}.`
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

/** Plain receipt when the full template cannot be built (e.g. seller env missing). */
export function paymentSuccessFallback(e: EnrollmentLike): MailContent {
  const course = e.courseName || "your course";
  const rows = detailRows([
    { label: "Course", value: e.courseName ?? "" },
    { label: "Amount paid", value: inr(e.amount) },
    { label: "Payment ID", value: e.paymentId ?? "" },
    { label: "Order ID", value: e.orderId },
    { label: "Date", value: istDate(e.paymentDate) },
  ]);
  return {
    subject: `Payment received — ${course} (${inr(e.amount)})`,
    html: layout({
      heading: "Payment successful",
      intro: `Hi ${esc(e.name) || "there"}, we've received your payment for ${esc(course)}.`,
      body: card(rows),
      accent: "#16a34a",
    }),
    text: [
      `Hi ${e.name || "there"},`,
      "",
      `We've received your payment for ${course}.`,
      `Amount paid: ${inr(e.amount)}`,
      e.paymentId ? `Payment ID: ${e.paymentId}` : "",
      `Order ID: ${e.orderId}`,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export function paymentFailed(e: EnrollmentLike): MailContent {
  const course = e.courseName || "your course";
  const rows = detailRows([
    { label: "Course", value: e.courseName ?? "" },
    { label: "Amount", value: inr(e.amount) },
    { label: "Order ID", value: e.orderId },
    { label: "Reason", value: e.failureReason ?? "Payment was not completed" },
  ]);
  const body = `${card(rows)}
    <p style="margin:20px 0 0;color:${MUTED};font-size:14px;line-height:1.6;">
      No money has been deducted for a failed payment. You can retry your enrollment any time.
    </p>
    ${button("Retry enrollment", siteUrl())}`;
  return {
    subject: `Payment failed — ${course}`,
    html: layout({
      heading: "Your payment didn't go through",
      intro: `Hi ${esc(e.name) || "there"}, we couldn't confirm your payment for ${esc(course)}.`,
      body,
      accent: "#dc2626",
    }),
    text: [
      `Hi ${e.name || "there"},`,
      "",
      `We couldn't confirm your payment for ${course}.`,
      `Reason: ${e.failureReason ?? "Payment was not completed"}`,
      `Order ID: ${e.orderId}`,
      "",
      "No money has been deducted for a failed payment. You can retry any time.",
    ].join("\n"),
  };
}

