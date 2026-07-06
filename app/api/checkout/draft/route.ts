import { NextResponse } from "next/server";
import { validateOrderRequest } from "@/lib/payment/checkout";
import { upsertLeadEnrollment } from "@/lib/payment/enrollment-store";
import { clientIp, rateLimit } from "@/lib/payment/rate-limit";
import type { CreateDraftRequest } from "@/lib/payment/types";

export const runtime = "nodejs";

/**
 * Step 1 of checkout: capture personal details + plan as a `lead` row
 * (DB + Google Sheet) before address/payment so drop-offs are never lost.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`draft:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Partial<CreateDraftRequest>;
  try {
    body = (await request.json()) as Partial<CreateDraftRequest>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validation = await validateOrderRequest(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const order = validation.order;

  try {
    const doc = await upsertLeadEnrollment({
      leadToken: body.leadToken,
      name: order.name,
      email: order.email,
      mobile: order.mobile,
      courseSlug: order.slug,
      courseName: order.courseName,
      planType: order.planType,
      amount: order.amount,
      coursePrice: order.coursePrice,
      firstInstallmentAmount: order.firstInstallmentAmount,
    });

    return NextResponse.json({ leadToken: doc.leadToken });
  } catch (error) {
    console.error("[checkout] failed to save lead", error);
    return NextResponse.json(
      { error: "Could not save your details. Please try again." },
      { status: 500 },
    );
  }
}
