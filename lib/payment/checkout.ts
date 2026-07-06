import { getCourseDetailContent } from "@/lib/payload/get-course-detail";
import { INSTALLMENT_MIN, type CreateOrderRequest, type PlanType } from "./types";

export type ValidatedOrder = {
  slug: string;
  name: string;
  email: string;
  mobile: string;
  courseName: string;
  planType: PlanType;
  /** Server-resolved amount to charge (whole INR). */
  amount: number;
  /** Full course price (whole INR), for reference. */
  coursePrice: number;
  firstInstallmentAmount?: number;
};

export type ValidationResult =
  | { ok: true; order: ValidatedOrder }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile: 10 digits, optionally +91 / 0 prefix. Be lenient but sane.
const MOBILE_RE = /^(?:\+?91)?[6-9]\d{9}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates a checkout request entirely on the server — the amount is NEVER
 * trusted from the client. The course price is resolved from the CMS (with the
 * code defaults as fallback). For installments the first amount must be at
 * least ₹{INSTALLMENT_MIN} and no more than the full course price.
 */
export async function validateOrderRequest(
  body: Partial<CreateOrderRequest>,
): Promise<ValidationResult> {
  const slug = clean(body.slug);
  const name = clean(body.name);
  const email = clean(body.email);
  const mobile = clean(body.mobile).replace(/[\s-]/g, "");
  const planType: PlanType =
    body.planType === "installment" ? "installment" : "single";

  if (!slug) return { ok: false, error: "A course is required." };
  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!MOBILE_RE.test(mobile)) {
    return { ok: false, error: "Please enter a valid mobile number." };
  }

  const course = await getCourseDetailContent(slug);
  if (!course) return { ok: false, error: "Unknown course." };

  const coursePrice = Math.round(course.overview.price);
  if (!Number.isFinite(coursePrice) || coursePrice <= 0) {
    return { ok: false, error: "Course pricing is unavailable right now." };
  }

  const courseName = course.intro.pageTitle || course.intro.headline || slug;

  if (planType === "single") {
    return {
      ok: true,
      order: {
        slug,
        name,
        email,
        mobile,
        courseName,
        planType,
        amount: coursePrice,
        coursePrice,
      },
    };
  }

  const first = Math.round(Number(body.firstInstallmentAmount));
  if (!Number.isFinite(first) || first < INSTALLMENT_MIN) {
    return {
      ok: false,
      error: `The first installment must be at least ₹${INSTALLMENT_MIN.toLocaleString("en-IN")}.`,
    };
  }
  if (first > coursePrice) {
    return {
      ok: false,
      error: "The first installment cannot exceed the course price.",
    };
  }

  return {
    ok: true,
    order: {
      slug,
      name,
      email,
      mobile,
      courseName,
      planType,
      amount: first,
      coursePrice,
      firstInstallmentAmount: first,
    },
  };
}
