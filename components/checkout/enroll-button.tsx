"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  CheckoutResultDialog,
  type CheckoutResult,
} from "@/components/checkout/checkout-result-dialog";
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
 * Buy/enroll CTA. Creates a Razorpay order, opens checkout, then verifies the
 * payment. If Razorpay isn't configured yet (no credentials), it routes the
 * user to the enquiry/demo flow so the lead is never lost.
 */
export function EnrollButton({
  product,
  label = "Enroll Now",
  tone = "navy",
  className,
  showArrow = true,
  fallbackHref = "#pre-footer",
}: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  function goToFallback() {
    if (typeof window !== "undefined") window.location.assign(fallbackHref);
  }

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          name: product.name,
          amount: product.amount,
        }),
      });

      if (res.status === 503) {
        goToFallback();
        return;
      }
      if (!res.ok) throw new Error("order failed");

      const order = (await res.json()) as CreateOrderResponse;
      const loaded = await loadRazorpay();
      if (!loaded || !window.Razorpay) {
        goToFallback();
        return;
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        name: "SRR Careers",
        description: order.name,
        theme: { color: "#0b1023" },
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
            const data = await verify.json();
            setResult({
              status: verify.ok && data.ok ? "success" : "error",
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
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch {
      goToFallback();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold transition-colors disabled:cursor-wait disabled:opacity-80",
          toneClasses[tone],
          className,
        )}
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <>
            {label}
            {showArrow ? <ArrowRight className="size-5" strokeWidth={2} /> : null}
          </>
        )}
      </button>

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
