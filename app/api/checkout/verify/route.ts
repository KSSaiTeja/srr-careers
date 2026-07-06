import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { updateEnrollmentStatus } from "@/lib/payment/enrollment-store";
import { clientIp, rateLimit } from "@/lib/payment/rate-limit";
import { getRazorpayConfig } from "@/lib/payment/razorpay";
import type {
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "@/lib/payment/types";

export const runtime = "nodejs";

/**
 * Instant client confirmation after Razorpay returns. Verifies the payment
 * signature (HMAC-SHA256 of `${orderId}|${paymentId}` with the key secret) and,
 * on success, flips the enrollment to `success` (idempotent). The webhook is
 * the authoritative source of truth; this just gives the user a fast result.
 * Returns 503 when credentials aren't configured.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`verify:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Partial<VerifyPaymentRequest>;
  try {
    body = (await request.json()) as Partial<VerifyPaymentRequest>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { keySecret, isConfigured } = getRazorpayConfig();
  if (!isConfigured) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const { orderId, paymentId, signature } = body;
  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { error: "Missing payment verification fields." },
      { status: 400 },
    );
  }

  const expected = createHmac("sha256", keySecret!)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const ok = safeEqualHex(expected, signature);

  if (ok) {
    try {
      await updateEnrollmentStatus({ orderId, status: "success", paymentId });
    } catch (error) {
      // The webhook will reconcile; don't fail the user's confirmation.
      console.error("[verify] enrollment update failed", orderId, error);
    }
  }

  const response: VerifyPaymentResponse = { ok, paymentId };
  return NextResponse.json(response, { status: ok ? 200 : 400 });
}

/** Constant-time hex comparison; falls back to false on length mismatch. */
function safeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}
