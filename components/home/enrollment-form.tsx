"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { EnrollmentSuccessView } from "@/components/home/enrollment-success-view";
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
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[15px] font-semibold text-gray-900">
        {label}
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
  const [course, setCourse] = useState<EnrollmentCourseValue>(
    enrollmentCourseOptions[0].value,
  );
  const [submission, setSubmission] = useState<EnrollmentSubmission | null>(
    null,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setSubmission({
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      mobile: String(formData.get("mobile") ?? ""),
      course: getCourseLabel(course),
    });
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
            Course
          </Label>
          <Select
            value={course}
            onValueChange={(value) =>
              setCourse(value as EnrollmentCourseValue)
            }
            required
          >
            <SelectTrigger aria-label="Select course">
              <SelectValue placeholder="Choose your course" />
            </SelectTrigger>
            <SelectContent align="end" sideOffset={6}>
              {enrollmentCourseOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="course" value={course} />
        </div>

        <Button
          type="submit"
          variant="accent"
          className="mt-1 flex h-14 w-full items-center justify-center gap-2 text-base font-bold"
        >
          Enroll Now for Free Demo
          <ArrowUpRight className="size-5" strokeWidth={2.5} />
        </Button>
      </form>
    </div>
  );
}
