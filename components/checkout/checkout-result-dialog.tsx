"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, TriangleAlert, X } from "lucide-react";
import { formatINR } from "@/lib/payment/format";
import { cn } from "@/lib/utils/cn";

export type CheckoutResult = {
  status: "success" | "error";
  courseName: string;
  amount: number;
  paymentId?: string;
  message?: string;
};

type CheckoutResultDialogProps = {
  open: boolean;
  onClose: () => void;
  result: CheckoutResult;
};

/** Confirmation shown after Razorpay returns (success or failure). */
export function CheckoutResultDialog({
  open,
  onClose,
  result,
}: CheckoutResultDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const isSuccess = result.status === "success";

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isSuccess ? "Enrollment confirmed" : "Payment issue"}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1 text-[#9a9a9a] transition-colors hover:bg-black/5"
        >
          <X className="size-5" />
        </button>

        <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
          {isSuccess ? (
            <CheckCircle2 className="size-14 text-emerald-500" strokeWidth={1.8} />
          ) : (
            <TriangleAlert className="size-14 text-amber-500" strokeWidth={1.8} />
          )}

          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold text-black">
              {isSuccess ? "You're enrolled!" : "Payment didn't go through"}
            </h3>
            <p className="text-sm text-[#5b5b5b]">
              {isSuccess
                ? `Your seat in ${result.courseName} is confirmed. Our team will email your batch details and onboarding steps shortly.`
                : (result.message ??
                  "No money was deducted. You can try again, or reach out and we'll help you enroll.")}
            </p>
          </div>

          {isSuccess && result.paymentId ? (
            <p className="text-xs text-[#9a9a9a]">
              {formatINR(result.amount)} paid · Ref {result.paymentId}
            </p>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "mt-1 w-full rounded-2xl px-5 py-3 text-base font-semibold text-white transition-colors",
              isSuccess
                ? "bg-brand-navy hover:bg-brand-navy-dark"
                : "bg-brand-navy hover:bg-brand-navy-dark",
            )}
          >
            {isSuccess ? "Done" : "Close"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
