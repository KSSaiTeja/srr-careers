"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { EnrollmentSuccessView } from "@/components/home/enrollment-success-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  enrollmentCourseOptions,
  type EnrollmentCourseValue,
} from "@/lib/constants/enrollment";
import type { EnrollmentSubmission } from "@/lib/types/enrollment";
import { cn } from "@/lib/utils/cn";

type EnrollmentFormProps = {
  className?: string;
};

function FormField({
  id,
  label,
  optional,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[15px] font-semibold text-gray-900">
        {label}
        {optional ? (
          <span className="ml-1.5 font-medium text-gray-400">(optional)</span>
        ) : null}
      </Label>
      {children}
    </div>
  );
}

function getCourseLabel(value: EnrollmentCourseValue): string {
  return (
    enrollmentCourseOptions.find((option) => option.value === value)?.label ??
    value
  );
}

export function EnrollmentForm({ className }: EnrollmentFormProps) {
  const [course, setCourse] = useState<EnrollmentCourseValue | "">("");
  const [submission, setSubmission] = useState<EnrollmentSubmission | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (!course) {
      setError("Please select a programme.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const description = String(formData.get("description") ?? "").trim();
    const lead: EnrollmentSubmission = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      mobile: String(formData.get("mobile") ?? ""),
      course: getCourseLabel(course),
      ...(description ? { description } : {}),
    };

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, source: "enrollment-form" }),
      });
      if (!res.ok) throw new Error("submit failed");
      setSubmission(lead);
    } catch {
      setError(
        "Something went wrong submitting your details. Please try again or reach us on WhatsApp.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submission) {
    return (
      <EnrollmentSuccessView submission={submission} className={className} />
    );
  }

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 md:p-10 lg:p-12",
        className,
      )}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <FormField id="enrollment-full-name" label="Full Name">
          <Input
            id="enrollment-full-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </FormField>

        <FormField id="enrollment-email" label="Email Address">
          <Input
            id="enrollment-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </FormField>

        <FormField id="enrollment-mobile" label="Mobile Number">
          <Input
            id="enrollment-mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 9XXXXXXXXX"
          />
        </FormField>

        <div className="space-y-2">
          <Label className="text-[15px] font-semibold text-gray-900">
            Programme
          </Label>
          <Select
            value={course || undefined}
            onValueChange={(value) =>
              setCourse(value as EnrollmentCourseValue)
            }
            required
          >
            <SelectTrigger aria-label="Select programme">
              <SelectValue placeholder="Choose a programme" />
            </SelectTrigger>
            <SelectContent align="end" sideOffset={6}>
              {enrollmentCourseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="course" value={course} required />
        </div>

        <FormField
          id="enrollment-description"
          label="Description"
          optional
        >
          <Textarea
            id="enrollment-description"
            name="description"
            rows={3}
            placeholder="Anything you'd like us to know before the demo"
          />
        </FormField>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="accent"
          disabled={submitting}
          className="mt-1 flex h-14 w-full items-center justify-center gap-2 text-base font-bold disabled:cursor-wait disabled:opacity-80"
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" strokeWidth={2.5} />
              Submitting…
            </>
          ) : (
            <>
              Book My Free Demo
              <ArrowUpRight className="size-5" strokeWidth={2.5} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
