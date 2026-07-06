"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Loader2, X } from "lucide-react";
import { formatINR } from "@/lib/payment/format";
import {
  INSTALLMENT_CHIPS,
  INSTALLMENT_MIN,
  type BillingAddress,
  type EnrollmentDetails,
  type PlanType,
} from "@/lib/payment/types";
import { cn } from "@/lib/utils/cn";

export type EnrollFormStep1Values = EnrollmentDetails & {
  planType: PlanType;
  firstInstallmentAmount?: number;
};

export type EnrollFormValues = EnrollFormStep1Values &
  BillingAddress & {
    leadToken: string;
  };

type EnrollFormDialogProps = {
  open: boolean;
  courseName: string;
  coursePrice: number;
  leadToken: string | null;
  step1Submitting: boolean;
  submitting: boolean;
  serverError?: string | null;
  step1Error?: string | null;
  onClose: () => void;
  onStep1Complete: (values: EnrollFormStep1Values) => Promise<void>;
  onSubmit: (values: EnrollFormValues) => void;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^(?:\+?91)?[6-9]\d{9}$/;
const PINCODE_RE = /^\d{6}$/;

export function EnrollFormDialog({
  open,
  courseName,
  coursePrice,
  leadToken,
  step1Submitting,
  submitting,
  serverError,
  step1Error,
  onClose,
  onStep1Complete,
  onSubmit,
}: EnrollFormDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [plan, setPlan] = useState<PlanType>("single");
  const [firstAmount, setFirstAmount] = useState<string>(String(INSTALLMENT_MIN));
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setTouched(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const amountNum = Number(firstAmount.replace(/[^\d]/g, ""));

  const step1Errors = useMemo(() => {
    const e: Partial<Record<keyof EnrollFormStep1Values, string>> = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";
    if (!MOBILE_RE.test(mobile.trim().replace(/[\s-]/g, "")))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (plan === "installment") {
      if (!firstAmount.trim() || !Number.isFinite(amountNum) || amountNum <= 0) {
        e.firstInstallmentAmount = `Enter an amount of at least ${formatINR(INSTALLMENT_MIN)}.`;
      } else if (amountNum < INSTALLMENT_MIN) {
        e.firstInstallmentAmount = `Too low — enter at least ${formatINR(INSTALLMENT_MIN)}.`;
      } else if (amountNum > coursePrice) {
        e.firstInstallmentAmount = `Too high — the maximum is the course price, ${formatINR(coursePrice)}.`;
      }
    }
    return e;
  }, [name, email, mobile, plan, amountNum, coursePrice, firstAmount]);

  const step2Errors = useMemo(() => {
    const e: Partial<Record<keyof BillingAddress, string>> = {};
    if (addressLine1.trim().length < 3)
      e.addressLine1 = "Please enter your address.";
    if (city.trim().length < 2) e.city = "Please enter your city.";
    if (state.trim().length < 2)
      e.state = "Enter a valid pincode to auto-fill state.";
    if (!PINCODE_RE.test(pincode.trim()))
      e.pincode = "Enter a valid 6-digit pincode.";
    return e;
  }, [addressLine1, city, state, pincode]);

  const canProceedStep1 =
    Object.keys(step1Errors).length === 0 && !step1Submitting;
  const canSubmitStep2 =
    Object.keys(step2Errors).length === 0 && !submitting && Boolean(leadToken);

  const amountError =
    plan === "installment" ? (step1Errors.firstInstallmentAmount ?? null) : null;

  const lookupPincode = useCallback(async (value: string) => {
    if (!PINCODE_RE.test(value)) {
      setState("");
      return;
    }
    setPincodeLoading(true);
    try {
      const res = await fetch(`/api/pincode?pincode=${value}`);
      const data = await res.json();
      if (res.ok && data.state) {
        setState(data.state);
        if (data.city) setCity(data.city);
      } else {
        setState("");
      }
    } catch {
      setState("");
    } finally {
      setPincodeLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step !== 2) return;
    const digits = pincode.replace(/\D/g, "");
    if (!PINCODE_RE.test(digits)) return;
    const timer = setTimeout(() => void lookupPincode(digits), 400);
    return () => clearTimeout(timer);
  }, [pincode, step, lookupPincode]);

  if (!mounted || !open) return null;

  function step1Values(): EnrollFormStep1Values {
    return {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim().replace(/[\s-]/g, ""),
      planType: plan,
      firstInstallmentAmount: plan === "installment" ? amountNum : undefined,
    };
  }

  async function handleNext() {
    setTouched(true);
    if (!canProceedStep1) return;
    try {
      await onStep1Complete(step1Values());
      setStep(2);
      setTouched(false);
    } catch {
      // Stay on step 1 — error is shown via step1Error.
    }
  }

  function handleSubmit() {
    setTouched(true);
    if (!canSubmitStep2 || !leadToken) return;
    onSubmit({
      ...step1Values(),
      leadToken,
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim() || undefined,
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
    });
  }

  const showStep1Error = (key: keyof EnrollFormStep1Values) =>
    touched && step === 1 && step1Errors[key] ? step1Errors[key] : null;

  const showStep2Error = (key: keyof BillingAddress) =>
    touched && step === 2 && step2Errors[key] ? step2Errors[key] : null;

  const payAmount =
    plan === "installment" ? amountNum || 0 : coursePrice;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Enroll in ${courseName}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[460px] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
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

        <div className="flex flex-col gap-5 px-6 py-8">
          <div className="flex flex-col gap-1 pr-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#9a9a9a]">
              Step {step} of 2
            </p>
            <h3 className="text-xl font-semibold text-black">
              {step === 1 ? "Your details" : "Billing address"}
            </h3>
            <p className="text-sm text-[#5b5b5b]">
              {courseName} · {formatINR(coursePrice)}
            </p>
          </div>

          {step === 1 ? (
            <>
              <div className="flex flex-col gap-3">
                <Field
                  label="Full name"
                  value={name}
                  onChange={setName}
                  placeholder="Your name"
                  autoComplete="name"
                  error={showStep1Error("name")}
                />
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={showStep1Error("email")}
                />
                <Field
                  label="Mobile"
                  type="tel"
                  value={mobile}
                  onChange={setMobile}
                  placeholder="9876543210"
                  autoComplete="tel"
                  error={showStep1Error("mobile")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-black">Payment plan</span>
                <div className="grid grid-cols-2 gap-2">
                  <PlanOption
                    active={plan === "single"}
                    title="Pay in full"
                    subtitle={formatINR(coursePrice)}
                    onClick={() => setPlan("single")}
                  />
                  <PlanOption
                    active={plan === "installment"}
                    title="Installment"
                    subtitle={`From ${formatINR(INSTALLMENT_MIN)}`}
                    onClick={() => setPlan("installment")}
                  />
                </div>
              </div>

              {plan === "installment" ? (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-black">
                    First installment
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INSTALLMENT_CHIPS.map((chip) => {
                      const tooHigh = chip > coursePrice;
                      return (
                        <button
                          key={chip}
                          type="button"
                          disabled={tooHigh}
                          onClick={() => setFirstAmount(String(chip))}
                          className={cn(
                            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                            tooHigh
                              ? "cursor-not-allowed border-black/10 bg-black/5 text-[#b5b5b5]"
                              : amountNum === chip
                                ? "border-brand-navy bg-brand-navy text-white"
                                : "border-black/15 bg-white text-black hover:border-brand-navy/50",
                          )}
                        >
                          {formatINR(chip)}
                        </button>
                      );
                    })}
                  </div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5b5b5b]">
                      ₹
                    </span>
                    <input
                      inputMode="numeric"
                      value={firstAmount}
                      onChange={(e) =>
                        setFirstAmount(e.target.value.replace(/[^\d]/g, ""))
                      }
                      placeholder={String(INSTALLMENT_MIN)}
                      aria-invalid={Boolean(amountError)}
                      className={cn(
                        "w-full rounded-xl border bg-white py-2.5 pl-8 pr-3 text-base text-black outline-none transition-colors focus:border-brand-navy",
                        amountError ? "border-red-500" : "border-black/15",
                      )}
                    />
                  </div>
                  {amountError ? (
                    <p className="text-xs font-medium text-red-600">{amountError}</p>
                  ) : (
                    <p className="text-xs text-[#9a9a9a]">
                      Min {formatINR(INSTALLMENT_MIN)}, max {formatINR(coursePrice)} ·
                      balance of{" "}
                      {formatINR(Math.max(coursePrice - (amountNum || 0), 0))}{" "}
                      payable later.
                    </p>
                  )}
                </div>
              ) : null}

              {step1Error ? (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                  {step1Error}
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => void handleNext()}
                disabled={!canProceedStep1}
                className={cn(
                  "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {step1Submitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Next"
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setTouched(false);
                }}
                className="inline-flex items-center gap-1 self-start text-sm font-medium text-brand-navy"
              >
                <ArrowLeft className="size-4" />
                Back
              </button>

              <div className="flex flex-col gap-3">
                <Field
                  label="Address line 1"
                  value={addressLine1}
                  onChange={setAddressLine1}
                  placeholder="House / flat / street"
                  autoComplete="address-line1"
                  error={showStep2Error("addressLine1")}
                />
                <Field
                  label="Address line 2 (optional)"
                  value={addressLine2}
                  onChange={setAddressLine2}
                  placeholder="Landmark, area"
                  autoComplete="address-line2"
                  error={null}
                />
                <Field
                  label="Pincode"
                  value={pincode}
                  onChange={(v) => setPincode(v.replace(/\D/g, "").slice(0, 6))}
                  placeholder="560001"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  error={showStep2Error("pincode")}
                  suffix={
                    pincodeLoading ? (
                      <Loader2 className="size-4 animate-spin text-[#9a9a9a]" />
                    ) : null
                  }
                />
                <Field
                  label="City"
                  value={city}
                  onChange={setCity}
                  placeholder="City"
                  autoComplete="address-level2"
                  error={showStep2Error("city")}
                />
                <Field
                  label="State"
                  value={state}
                  onChange={() => {}}
                  placeholder="Auto-filled from pincode"
                  readOnly
                  error={showStep2Error("state")}
                />
              </div>

              {serverError ? (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                  {serverError}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmitStep2}
                className={cn(
                  "mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-navy px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {submitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  `Proceed to pay ${formatINR(payAmount)}`
                )}
              </button>
              <p className="text-center text-xs text-[#9a9a9a]">
                Secure payment via Razorpay. You can pay by UPI, card or net
                banking.
              </p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  readOnly,
  error,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  readOnly?: boolean;
  error?: string | null;
  suffix?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          readOnly={readOnly}
          inputMode={inputMode}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-black outline-none transition-colors focus:border-brand-navy",
            readOnly && "cursor-default bg-[#f8f8f8] text-[#5b5b5b]",
            error ? "border-red-500" : "border-black/15",
            suffix && "pr-10",
          )}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
            {suffix}
          </span>
        ) : null}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function PlanOption({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start rounded-xl border px-3.5 py-2.5 text-left transition-colors",
        active
          ? "border-brand-navy bg-brand-navy/5"
          : "border-black/15 bg-white hover:border-brand-navy/50",
      )}
    >
      <span className="text-sm font-semibold text-black">{title}</span>
      <span className="text-xs text-[#5b5b5b]">{subtitle}</span>
    </button>
  );
}
