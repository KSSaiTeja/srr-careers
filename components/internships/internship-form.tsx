"use client";

import { useMemo, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  studyYearOptions,
  type AcademicStatus,
} from "@/lib/internships/types";
import { cn } from "@/lib/utils/cn";

const MOBILE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  college: string;
  university: string;
  residingAddress: string;
  courseOfStudy: string;
  academicStatus: AcademicStatus | "";
  studyYear: string;
  completedWhen: string;
};

const initialState: FormState = {
  fullName: "",
  mobile: "",
  email: "",
  college: "",
  university: "",
  residingAddress: "",
  courseOfStudy: "",
  academicStatus: "",
  studyYear: "",
  completedWhen: "",
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

export function InternshipForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [resume, setResume] = useState<File | null>(null);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState | "resume", string>> = {};
    if (!values.fullName.trim()) e.fullName = "Full name is required.";
    if (!MOBILE_RE.test(values.mobile.trim().replace(/[\s-]/g, ""))) {
      e.mobile = "Enter a valid 10-digit mobile number.";
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      e.email = "Enter a valid email address.";
    }
    if (!values.college.trim()) e.college = "College is required.";
    if (!values.university.trim()) e.university = "University is required.";
    if (values.residingAddress.trim().length < 5) {
      e.residingAddress = "Residing address is required.";
    }
    if (!values.courseOfStudy.trim()) {
      e.courseOfStudy = "Course of study is required.";
    }
    if (!values.academicStatus) {
      e.academicStatus = "Please select your academic status.";
    }
    if (values.academicStatus === "studying" && !values.studyYear) {
      e.studyYear = "Select which year you are studying.";
    }
    if (values.academicStatus === "completed" && !values.completedWhen.trim()) {
      e.completedWhen = "Enter when you completed your course.";
    }
    if (resume && resume.size > MAX_RESUME_BYTES) {
      e.resume = "Resume must be 5 MB or smaller.";
    }
    return e;
  }, [values, resume]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError(null);
    if (Object.keys(errors).length > 0 || submitting) return;

    const body = new FormData();
    body.set("fullName", values.fullName.trim());
    body.set("mobile", values.mobile.trim().replace(/[\s-]/g, ""));
    body.set("email", values.email.trim());
    body.set("college", values.college.trim());
    body.set("university", values.university.trim());
    body.set("residingAddress", values.residingAddress.trim());
    body.set("courseOfStudy", values.courseOfStudy.trim());
    body.set("academicStatus", values.academicStatus);
    body.set("studyYear", values.studyYear);
    body.set("completedWhen", values.completedWhen.trim());
    if (resume) body.set("resume", resume);

    setSubmitting(true);
    try {
      const res = await fetch("/api/internships", {
        method: "POST",
        body,
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
          Thanks for applying for an internship at SRR Careers. Our team will
          review your details and get back to you soon.
        </p>
        <Button
          type="button"
          variant="primary"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setValues(initialState);
            setResume(null);
            setTouched(false);
            setSubmitError(null);
          }}
        >
          Submit another
        </Button>
      </div>
    );
  }

  const show = (key: keyof typeof errors) =>
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
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="mobile" label="Mobile" required error={show("mobile")}>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            value={values.mobile}
            onChange={(event) =>
              setField("mobile", event.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile"
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
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="college" label="College" required error={show("college")}>
          <Input
            id="college"
            name="college"
            value={values.college}
            onChange={(event) => setField("college", event.target.value)}
            placeholder="College name"
          />
        </Field>
        <Field
          id="university"
          label="University"
          required
          error={show("university")}
        >
          <Input
            id="university"
            name="university"
            value={values.university}
            onChange={(event) => setField("university", event.target.value)}
            placeholder="University name"
          />
        </Field>
      </div>

      <Field
        id="residingAddress"
        label="Residing Address"
        required
        error={show("residingAddress")}
      >
        <textarea
          id="residingAddress"
          name="residingAddress"
          rows={3}
          value={values.residingAddress}
          onChange={(event) => setField("residingAddress", event.target.value)}
          placeholder="Full residential address"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-colors placeholder:text-gray-400 focus-visible:border-brand-navy/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/10"
        />
      </Field>

      <Field
        id="courseOfStudy"
        label="Course of Study"
        required
        error={show("courseOfStudy")}
      >
        <Input
          id="courseOfStudy"
          name="courseOfStudy"
          value={values.courseOfStudy}
          onChange={(event) => setField("courseOfStudy", event.target.value)}
          placeholder="e.g. B.Com, BBA, MBA, CA Inter"
        />
      </Field>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-semibold text-gray-900">
          Academic status <span className="text-red-600">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { value: "studying", label: "Currently studying" },
              { value: "completed", label: "Course completed" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                values.academicStatus === option.value
                  ? "border-brand-navy bg-brand-lavender/50 text-brand-navy"
                  : "border-gray-200 text-gray-700 hover:border-brand-navy/30",
              )}
            >
              <input
                type="radio"
                name="academicStatus"
                value={option.value}
                checked={values.academicStatus === option.value}
                onChange={() => {
                  setField("academicStatus", option.value);
                  if (option.value === "studying") setField("completedWhen", "");
                  else setField("studyYear", "");
                }}
                className="size-4 accent-brand-navy"
              />
              {option.label}
            </label>
          ))}
        </div>
        {show("academicStatus") ? (
          <p className="text-sm text-red-600">{show("academicStatus")}</p>
        ) : null}
      </fieldset>

      {values.academicStatus === "studying" ? (
        <Field
          id="studyYear"
          label="If studying, which year"
          required
          error={show("studyYear")}
        >
          <Select
            value={values.studyYear || undefined}
            onValueChange={(value) => setField("studyYear", value)}
          >
            <SelectTrigger id="studyYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {studyYearOptions.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      ) : null}

      {values.academicStatus === "completed" ? (
        <Field
          id="completedWhen"
          label="If completed, when"
          required
          error={show("completedWhen")}
        >
          <Input
            id="completedWhen"
            name="completedWhen"
            value={values.completedWhen}
            onChange={(event) => setField("completedWhen", event.target.value)}
            placeholder="e.g. May 2025 / 2024"
          />
        </Field>
      ) : null}

      <Field id="resume" label="Attach Resume / CV" error={show("resume")}>
        <label
          htmlFor="resume"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition-colors hover:border-brand-navy/40 hover:bg-brand-lavender/30"
        >
          <Upload className="size-5 text-brand-navy" aria-hidden />
          <span className="text-sm font-medium text-gray-800">
            {resume ? resume.name : "Upload PDF or Word (max 5 MB)"}
          </span>
          <span className="text-xs text-gray-500">
            Optional — sent to our team with your application
          </span>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setResume(file);
            }}
          />
        </label>
      </Field>

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
          "Apply for internship"
        )}
      </Button>
    </form>
  );
}
