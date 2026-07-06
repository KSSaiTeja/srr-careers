import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { updateEnrollmentStatus } from "@/lib/payment/enrollment-store";

export const runtime = "nodejs";

/**
 * Razorpay webhook — the AUTHORITATIVE source of truth for payment status.
 *
 * It covers cases the browser can't: auto-captured payments, users who close
 * the tab, and the pending→success/failed transitions that arrive minutes
 * later. Every update is idempotent and keyed by `orderId`, so Razorpay's
 * at-least-once delivery (and retries) is safe.
 *
 * Security: the signature is an HMAC-SHA256 of the RAW request body with
 * RAZORPAY_WEBHOOK_SECRET, compared in constant time against the
 * `x-razorpay-signature` header. Unsigned/invalid requests are rejected 401.
 *
 * --- Configure in the Razorpay dashboard ---
 *   Settings → Webhooks → Add New Webhook
 *     URL:     https://<your-domain>/api/checkout/webhook
 *     Secret:  same value as RAZORPAY_WEBHOOK_SECRET
 *     Events:  payment.captured, payment.failed, order.paid
 */
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] RAZORPAY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const signature = request.headers.get("x-razorpay-signature");
  const raw = await request.text();

  if (!signature || !verifySignature(raw, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: RazorpayWebhookBody;
  try {
    event = JSON.parse(raw) as RazorpayWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    await handleEvent(event);
  } catch (error) {
    // Return 500 so Razorpay retries; the update is idempotent.
    console.error("[webhook] processing failed", event.event, error);
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function verifySignature(raw: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  if (expected.length !== signature.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex"),
    );
  } catch {
    return false;
  }
}

async function handleEvent(event: RazorpayWebhookBody): Promise<void> {
  const payment = event.payload?.payment?.entity;
  const order = event.payload?.order?.entity;

  switch (event.event) {
    case "payment.captured":
    case "order.paid": {
      const orderId = payment?.order_id ?? order?.id;
      if (!orderId) return;
      // Razorpay amounts are in paise; cross-check against what we charged.
      const amountPaise = payment?.amount ?? order?.amount;
      await updateEnrollmentStatus({
        orderId,
        status: "success",
        paymentId: payment?.id,
        expectedAmountPaise:
          typeof amountPaise === "number" ? amountPaise : undefined,
      });
      return;
    }
    case "payment.failed": {
      const orderId = payment?.order_id;
      if (!orderId) return;
      await updateEnrollmentStatus({
        orderId,
        status: "failed",
        paymentId: payment?.id,
        failureReason:
          payment?.error_description ?? payment?.error_reason ?? "Payment failed",
      });
      return;
    }
    default:
      return;
  }
}

type RazorpayWebhookBody = {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        amount?: number;
        error_description?: string;
        error_reason?: string;
      };
    };
    order?: { entity?: { id?: string; amount?: number } };
  };
};
