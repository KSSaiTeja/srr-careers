"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PINCODE_RE = /^\d{6}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  fullName: string;
  pincode: string;
  city: string;
  state: string;
  mobile: string;
  email: string;
  course: string;
  experience: string;
  youtubeLink: string;
  instagram: string;
  linkedin: string;
};

const initialState: FormState = {
  fullName: "",
  pincode: "",
  city: "",
  state: "",
  mobile: "",
  email: "",
  course: "",
  experience: "",
  youtubeLink: "",
  instagram: "",
  linkedin: "",
};

function Field({
  id,
  label,
  required,
  children,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export function JoinOurTeamForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const lookupPincode = useCallback(async (value: string) => {
    if (!PINCODE_RE.test(value)) {
      setField("city", "");
      setField("state", "");
      setPincodeError(null);
      return;
    }
    setPincodeLoading(true);
    setPincodeError(null);
    try {
      const res = await fetch(`/api/pincode?pincode=${value}`);
      const data = (await res.json()) as {
        city?: string;
        state?: string;
        error?: string;
      };
      if (res.ok && data.state) {
        setField("state", data.state);
        setField("city", data.city ?? "");
      } else {
        setField("city", "");
        setField("state", "");
        setPincodeError(data.error ?? "Pincode not found.");
      }
    } catch {
      setField("city", "");
      setField("state", "");
      setPincodeError("Could not look up pincode. Try again.");
    } finally {
      setPincodeLoading(false);
    }
  }, []);

  useEffect(() => {
    const digits = values.pincode.replace(/\D/g, "");
    if (!PINCODE_RE.test(digits)) return;
    const timer = setTimeout(() => void lookupPincode(digits), 400);
    return () => clearTimeout(timer);
  }, [values.pincode, lookupPincode]);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!values.fullName.trim()) e.fullName = "Full name is required.";
    if (!PINCODE_RE.test(values.pincode.trim())) {
      e.pincode = "Enter a valid 6-digit pincode.";
    } else if (!values.city.trim() || !values.state.trim()) {
      e.pincode = "Enter a valid pincode to auto-fill city and state.";
    }
    if (!MOBILE_RE.test(values.mobile.trim().replace(/[\s-]/g, ""))) {
      e.mobile = "Enter a valid 10-digit mobile number.";
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      e.email = "Enter a valid email address.";
    }
    if (!values.course.trim()) {
      e.course = "Enter at least one course name.";
    }
    if (!values.experience.trim()) e.experience = "Experience is required.";
    return e;
  }, [values]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError(null);
    if (Object.keys(errors).length > 0 || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/join-our-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          pincode: values.pincode.trim(),
          city: values.city.trim(),
          state: values.state.trim(),
          mobile: values.mobile.trim().replace(/[\s-]/g, ""),
          email: values.email.trim(),
          courseName: values.course
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean)
            .join(", "),
          experience: values.experience.trim(),
          youtubeLink: values.youtubeLink.trim(),
          instagram: values.instagram.trim(),
          linkedin: values.linkedin.trim(),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "submit failed");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message !== "submit failed"
          ? error.message
          : "Something went wrong submitting your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-brand-navy/15 bg-brand-lavender/40 px-6 py-10 text-center sm:px-10">
        <h2 className="text-2xl font-bold text-brand-navy">
          Application received
        </h2>
        <p className="mt-3 text-base text-gray-600">
          Thanks for applying to join SRR Careers. Our team will review your
          details and get back to you soon.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setSubmitted(false);
              setValues(initialState);
              setTouched(false);
              setSubmitError(null);
              setPincodeError(null);
            }}
          >
            Submit another
          </Button>
          <Link
            href="/our-team"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-brand-navy bg-white/10 px-6 py-3 text-xl font-medium text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
          >
            Meet our team
          </Link>
        </div>
      </div>
    );
  }

  const show = (key: keyof FormState) =>
    touched ? errors[key] : undefined;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <Field id="fullName" label="Full Name" required error={show("fullName")}>
        <Input
          id="fullName"
          name="fullName"
          autoComplete="name"
          value={values.fullName}
          onChange={(event) => setField("fullName", event.target.value)}
          placeholder="Your full name"
          aria-invalid={Boolean(show("fullName"))}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="pincode" label="Pincode" required error={show("pincode") ?? pincodeError ?? undefined}>
          <div className="relative">
            <Input
              id="pincode"
              name="pincode"
              inputMode="numeric"
              maxLength={6}
              value={values.pincode}
              onChange={(event) =>
                setField("pincode", event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="6-digit pincode"
              aria-invalid={Boolean(show("pincode") || pincodeError)}
              className="pr-10"
            />
            {pincodeLoading ? (
              <Loader2
                className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-brand-navy"
                aria-hidden
              />
            ) : null}
          </div>
        </Field>
        <Field id="city" label="City" required>
          <Input
            id="city"
            name="city"
            value={values.city}
            readOnly
            placeholder="Auto-filled"
            className="bg-gray-50"
            aria-describedby="location-hint"
          />
        </Field>
        <Field id="state" label="State" required>
          <Input
            id="state"
            name="state"
            value={values.state}
            readOnly
            placeholder="Auto-filled"
            className="bg-gray-50"
          />
        </Field>
      </div>
      <p id="location-hint" className="-mt-2 text-sm text-gray-500">
        Enter your pincode — city and state fill in automatically.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="mobile" label="Mobile" required error={show("mobile")}>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={values.mobile}
            onChange={(event) =>
              setField("mobile", event.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile"
            aria-invalid={Boolean(show("mobile"))}
          />
        </Field>
        <Field id="email" label="Mail Id" required error={show("email")}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(show("email"))}
          />
        </Field>
      </div>

      <Field id="course" label="Course Name" required error={show("course")}>
        <Input
          id="course"
          name="course"
          value={values.course}
          onChange={(event) => setField("course", event.target.value)}
          placeholder="e.g. SAP FICO, Advanced Excel"
          aria-invalid={Boolean(show("course"))}
          aria-describedby="course-hint"
        />
        <p id="course-hint" className="text-sm text-gray-500">
          Enter one or more courses, separated by commas.
        </p>
      </Field>

      <Field id="experience" label="Experience" required error={show("experience")}>
        <Input
          id="experience"
          name="experience"
          value={values.experience}
          onChange={(event) => setField("experience", event.target.value)}
          placeholder="e.g. 5 years in finance / SAP training"
          aria-invalid={Boolean(show("experience"))}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="youtubeLink" label="YouTube Link">
          <Input
            id="youtubeLink"
            name="youtubeLink"
            type="url"
            value={values.youtubeLink}
            onChange={(event) => setField("youtubeLink", event.target.value)}
            placeholder="https://youtube.com/…"
          />
        </Field>
        <Field id="instagram" label="Instagram">
          <Input
            id="instagram"
            name="instagram"
            value={values.instagram}
            onChange={(event) => setField("instagram", event.target.value)}
            placeholder="@handle or profile URL"
          />
        </Field>
        <Field id="linkedin" label="LinkedIn Profile">
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            value={values.linkedin}
            onChange={(event) => setField("linkedin", event.target.value)}
            placeholder="https://linkedin.com/in/…"
          />
        </Field>
      </div>

      {submitError ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="accent"
        className="w-full sm:w-fit"
        disabled={submitting}
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Submitting…
          </span>
        ) : (
          "Submit application"
        )}
      </Button>
    </form>
  );
}
