"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  CheckoutResultDialog,
  type CheckoutResult,
} from "@/components/checkout/checkout-result-dialog";
import {
  EnrollFormDialog,
  type EnrollFormStep1Values,
  type EnrollFormValues,
} from "@/components/checkout/enroll-form-dialog";
import { loadRazorpay } from "@/lib/payment/load-razorpay";
import type { CheckoutProduct, CreateOrderResponse } from "@/lib/payment/types";
import { cn } from "@/lib/utils/cn";

type Tone = "gold" | "navy" | "light" | "outline-light";

const toneClasses: Record<Tone, string> = {
  gold: "bg-brand-gold text-black hover:bg-brand-gold-dark",
  navy: "bg-brand-navy text-white hover:bg-brand-navy-dark",
  light: "bg-[#0b1023] text-white hover:opacity-90",
  "outline-light":
    "border border-white/40 bg-white/10 text-white hover:bg-white/20",
};

type EnrollButtonProps = {
  product: CheckoutProduct;
  label?: string;
  tone?: Tone;
  className?: string;
  showArrow?: boolean;
  /** Where to send the user when checkout isn't available yet. */
  fallbackHref?: string;
};

/**
 * Buy/enroll CTA. Two-step form → Razorpay checkout → verify payment.
 * Step 1 syncs a `lead` row immediately so drop-offs are never lost.
 */
export function EnrollButton({
  product,
  label = "Enroll Now",
  tone = "navy",
  className,
  showArrow = true,
  fallbackHref = "#demo-class",
}: EnrollButtonProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [leadToken, setLeadToken] = useState<string | null>(null);
  const [step1Submitting, setStep1Submitting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  function goToFallback() {
    if (typeof window !== "undefined") window.location.assign(fallbackHref);
  }

  function resetForm() {
    setLeadToken(null);
    setStep1Error(null);
    setServerError(null);
  }

  async function handleStep1Complete(values: EnrollFormStep1Values) {
    if (step1Submitting) return;
    setStep1Submitting(true);
    setStep1Error(null);
    try {
      const res = await fetch("/api/checkout/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          leadToken: leadToken ?? undefined,
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          planType: values.planType,
          firstInstallmentAmount: values.firstInstallmentAmount,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStep1Error(data?.error ?? "Could not save your details. Please try again.");
        throw new Error("draft failed");
      }

      setLeadToken(data.leadToken as string);
    } finally {
      setStep1Submitting(false);
    }
  }

  async function handleSubmit(values: EnrollFormValues) {
    if (submitting) return;
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          leadToken: values.leadToken,
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          planType: values.planType,
          firstInstallmentAmount: values.firstInstallmentAmount,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        }),
      });

      if (res.status === 503) {
        setFormOpen(false);
        resetForm();
        goToFallback();
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setServerError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      const order = data as CreateOrderResponse;
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        setFormOpen(false);
        resetForm();
        goToFallback();
        return;
      }

      setFormOpen(false);
      resetForm();

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        name: "SRR Careers",
        description: order.name,
        theme: { color: "#0b1023" },
        prefill: {
          name: order.prefill.name,
          email: order.prefill.email,
          contact: order.prefill.contact,
        },
        handler: async (response) => {
          try {
            const verify = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verify.json();
            setResult({
              status: verify.ok && verifyData.ok ? "success" : "error",
              courseName: order.name,
              amount: order.amount,
              paymentId: response.razorpay_payment_id,
            });
          } catch {
            setResult({
              status: "error",
              courseName: order.name,
              amount: order.amount,
              message:
                "We couldn't confirm your payment automatically. If money was deducted, contact us and we'll sort it instantly.",
            });
          }
        },
      });

      rzp.on("payment.failed", (response) => {
        const orderId = response?.error?.metadata?.order_id ?? order.orderId;
        const reason =
          response?.error?.description ?? response?.error?.reason ?? undefined;
        void fetch("/api/checkout/failed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, reason }),
        }).catch(() => {});
        setResult({
          status: "error",
          courseName: order.name,
          amount: order.amount,
          message:
            reason ??
            "Your payment didn't go through. No money was deducted — you can try again.",
        });
      });

      rzp.open();
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetForm();
          setFormOpen(true);
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold transition-colors",
          toneClasses[tone],
          className,
        )}
      >
        {label}
        {showArrow ? <ArrowRight className="size-5" strokeWidth={2} /> : null}
      </button>

      {formOpen ? (
        <EnrollFormDialog
          open={formOpen}
          courseName={product.name}
          coursePrice={product.amount}
          leadToken={leadToken}
          step1Submitting={step1Submitting}
          submitting={submitting}
          serverError={serverError}
          step1Error={step1Error}
          onClose={() => {
            if (step1Submitting || submitting) return;
            setFormOpen(false);
            resetForm();
          }}
          onStep1Complete={handleStep1Complete}
          onSubmit={handleSubmit}
        />
      ) : null}

      {result ? (
        <CheckoutResultDialog
          open={Boolean(result)}
          onClose={() => setResult(null)}
          result={result}
        />
      ) : null}
    </>
  );
}
