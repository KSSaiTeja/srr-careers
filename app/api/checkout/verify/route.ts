import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import { getRazorpayConfig } from "@/lib/payment/razorpay";
import type {
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "@/lib/payment/types";

export const runtime = "nodejs";

/**
 * Verifies a Razorpay payment signature (HMAC-SHA256 of `${orderId}|${paymentId}`
 * with the key secret). Returns 503 when credentials aren't configured.
 */
export async function POST(request: Request) {
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

  const ok = expected === signature;
  const response: VerifyPaymentResponse = { ok, paymentId };
  return NextResponse.json(response, { status: ok ? 200 : 400 });
}
