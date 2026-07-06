import { NextResponse } from "next/server";
import { updateEnrollmentStatus } from "@/lib/payment/enrollment-store";
import { clientIp, rateLimit } from "@/lib/payment/rate-limit";

export const runtime = "nodejs";

/**
 * Client-reported payment failure (Razorpay's `payment.failed` checkout event).
 *
 * This is a convenience so a failed/cancelled payment flips to `failed` even on
 * localhost where the webhook can't reach us. It is intentionally low-trust:
 * `updateEnrollmentStatus` only moves a row from `pending → failed` and never
 * touches a `success` row, and orderIds are server-generated + unguessable. The
 * signed webhook remains the authoritative source of truth in production.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`failed:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: { orderId?: unknown; reason?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
  // Razorpay order ids look like "order_XXXXXXXXXXXXXX".
  if (!/^order_[A-Za-z0-9]+$/.test(orderId)) {
    return NextResponse.json({ error: "Invalid order id." }, { status: 400 });
  }

  const reason =
    typeof body.reason === "string" && body.reason.trim()
      ? body.reason.trim().slice(0, 200)
      : "Payment failed or cancelled.";

  try {
    await updateEnrollmentStatus({ orderId, status: "failed", failureReason: reason });
  } catch (error) {
    console.error("[failed] enrollment update failed", orderId, error);
    return NextResponse.json({ error: "Could not update." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
