import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getRazorpayConfig } from "@/lib/payment/razorpay";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/lib/payment/types";

export const runtime = "nodejs";

/**
 * Creates a Razorpay order. Returns 503 { configured: false } when credentials
 * aren't set yet, so the client can fall back to the enquiry flow.
 */
export async function POST(request: Request) {
  let body: Partial<CreateOrderRequest>;
  try {
    body = (await request.json()) as Partial<CreateOrderRequest>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const slug = typeof body.slug === "string" ? body.slug : "";
  const name = typeof body.name === "string" ? body.name : "SRR Careers course";

  if (!Number.isFinite(amount) || amount <= 0 || !slug) {
    return NextResponse.json(
      { error: "A valid course and amount are required." },
      { status: 400 },
    );
  }

  const { keyId, keySecret, isConfigured } = getRazorpayConfig();
  if (!isConfigured) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  try {
    const client = new Razorpay({ key_id: keyId!, key_secret: keySecret! });
    const order = await client.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `${slug}-${Date.now()}`,
      notes: { slug, course: name },
    });

    const response: CreateOrderResponse = {
      orderId: order.id,
      amount,
      currency: "INR",
      keyId: keyId!,
      name,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 },
    );
  }
}
