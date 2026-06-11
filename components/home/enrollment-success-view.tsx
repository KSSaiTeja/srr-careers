import type { EnrollmentSubmission } from "@/lib/types/enrollment";
import { cn } from "@/lib/utils/cn";

type EnrollmentSuccessViewProps = {
  submission: EnrollmentSubmission;
  className?: string;
};

function SuccessCheckmark() {
  return (
    <svg
      className="size-20"
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden
    >
      <circle
        cx="26"
        cy="26"
        r="24"
        stroke="currentColor"
        strokeWidth="2"
        className="enrollment-success-circle text-brand-navy"
      />
      <path
        d="M15 27.5 22.5 35 37 19.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="enrollment-success-check text-brand-navy"
      />
    </svg>
  );
}

export function EnrollmentSuccessView({
  submission,
  className,
}: EnrollmentSuccessViewProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Full name", value: submission.fullName },
    { label: "Email", value: submission.email },
    { label: "Mobile", value: submission.mobile },
    { label: "Course", value: submission.course },
  ];

  return (
    <div
      className={cn(
        "flex min-h-[24rem] w-full flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-6 text-center sm:min-h-[28rem] sm:p-10 lg:p-12",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="mb-6 flex items-center justify-center">
        <SuccessCheckmark />
      </div>

      <h3 className="mb-2 text-2xl font-bold text-gray-900">
        Details captured
      </h3>
      <p className="mb-8 max-w-sm text-base text-gray-600">
        Thank you. Our team will reach out shortly to confirm your free live
        demo slot.
      </p>

      <dl className="w-full max-w-sm space-y-3 text-left">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3"
          >
            <dt className="text-xs font-medium tracking-wide text-gray-500 uppercase">
              {row.label}
            </dt>
            <dd className="mt-1 break-words text-sm font-semibold text-gray-900">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
