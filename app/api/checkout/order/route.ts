import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { validateBillingAddress } from "@/lib/payment/address";
import { validateOrderRequest } from "@/lib/payment/checkout";
import { finalizeLeadForCheckout } from "@/lib/payment/enrollment-store";
import { clientIp, rateLimit } from "@/lib/payment/rate-limit";
import { getRazorpayConfig } from "@/lib/payment/razorpay";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/lib/payment/types";

export const runtime = "nodejs";

/**
 * Step 2 of checkout: validates address, promotes the lead to `pending`, creates
 * a Razorpay order, and opens payment.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`order:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Partial<CreateOrderRequest>;
  try {
    body = (await request.json()) as Partial<CreateOrderRequest>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const leadToken = (body.leadToken ?? "").trim();
  if (!leadToken) {
    return NextResponse.json(
      { error: "Enrollment session expired. Please start again." },
      { status: 400 },
    );
  }

  const validation = await validateOrderRequest(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const order = validation.order;

  const addressResult = validateBillingAddress(body);
  if (!addressResult.ok) {
    return NextResponse.json({ error: addressResult.error }, { status: 400 });
  }
  const address = addressResult.address;

  const { keyId, keySecret, isConfigured } = getRazorpayConfig();
  if (!isConfigured) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  try {
    const client = new Razorpay({ key_id: keyId!, key_secret: keySecret! });
    const rzpOrder = await client.orders.create({
      amount: Math.round(order.amount * 100), // paise
      currency: "INR",
      receipt: `${order.slug}-${Date.now()}`,
      notes: {
        slug: order.slug,
        course: order.courseName,
        planType: order.planType,
        leadToken,
      },
    });

    try {
      await finalizeLeadForCheckout({
        leadToken,
        name: order.name,
        email: order.email,
        mobile: order.mobile,
        courseSlug: order.slug,
        courseName: order.courseName,
        planType: order.planType,
        amount: order.amount,
        coursePrice: order.coursePrice,
        firstInstallmentAmount: order.firstInstallmentAmount,
        orderId: rzpOrder.id,
        ...address,
      });
    } catch (error) {
      console.error("[checkout] failed to finalize enrollment", error);
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 500 },
      );
    }

    const response: CreateOrderResponse = {
      orderId: rzpOrder.id,
      amount: order.amount,
      currency: "INR",
      keyId: keyId!,
      name: order.courseName,
      prefill: { name: order.name, email: order.email, contact: order.mobile },
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
