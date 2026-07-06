import { Resend } from "resend";
import { LOGO_CID, logoBuffer } from "./logo";

/**
 * Thin Resend wrapper. Mail is best-effort and never authoritative.
 */

let cachedClient: Resend | null = null;

function getFrom(): string | undefined {
  return process.env.RESEND_FROM?.trim() || undefined;
}

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey || !getFrom()) return null;
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
}

export function isMailConfigured(): boolean {
  return getClient() !== null;
}

function internalRecipients(): string[] {
  return (process.env.EMAILS_INTERNAL_TO ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function hostedLogoUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ||
    process.env.INVOICE_WEBSITE?.replace(/\/$/, "") ||
    "https://srrcareers.in";
  return `${base}/images/logo.png`;
}

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

type SendAttempt = SendMailInput & { attachLogo?: boolean };

async function sendAttempt(
  client: Resend,
  from: string,
  input: SendAttempt,
): Promise<{ ok: boolean; error?: unknown }> {
  const replyTo = input.replyTo ?? (process.env.RESEND_REPLY_TO?.trim() || undefined);
  const useLogo =
    input.attachLogo !== false && input.html.includes(`cid:${LOGO_CID}`);
  const logo = useLogo ? logoBuffer() : null;
  const attachments = logo
    ? [
        {
          filename: "srr-careers-logo.png",
          content: logo,
          content_id: LOGO_CID,
        },
      ]
    : undefined;

  const toList = Array.isArray(input.to) ? input.to : [input.to];
  const bcc = internalRecipients().filter((e) => !toList.includes(e));

  const { error } = await client.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments ? { attachments } : {}),
    ...(bcc.length > 0 ? { bcc } : {}),
  });

  if (error) return { ok: false, error };
  return { ok: true };
}

/**
 * Sends one email. Retries once without the inline logo if the first attempt
 * fails (some Resend paths choke on large inline attachments). Returns true on
 * a successful hand-off to Resend.
 */
export async function sendMail(input: SendMailInput): Promise<boolean> {
  const client = getClient();
  const from = getFrom();
  if (!client || !from) {
    console.warn(
      "[mail] skipped — RESEND_API_KEY/RESEND_FROM not configured",
      input.subject,
    );
    return false;
  }

  try {
    let result = await sendAttempt(client, from, { ...input, attachLogo: true });
    if (!result.ok && input.html.includes(`cid:${LOGO_CID}`)) {
      console.warn("[mail] retrying without inline logo", input.subject, result.error);
      const html = input.html.replaceAll(`cid:${LOGO_CID}`, hostedLogoUrl());
      result = await sendAttempt(client, from, { ...input, html, attachLogo: false });
    }

    if (!result.ok) {
      console.error("[mail] send failed", input.subject, result.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[mail] send threw", input.subject, error);
    return false;
  }
}
