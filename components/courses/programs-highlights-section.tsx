import Image from "next/image";
import { Terminal } from "lucide-react";
import { CoursesSection } from "@/components/courses/courses-section";
import { programsHighlights } from "@/lib/constants/courses-content";
import { cn } from "@/lib/utils/cn";

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00cd4f]">
      <span
        className="size-2 rounded-full bg-[#00cd4f]"
        aria-hidden
      />
      {status}
    </span>
  );
}

function ToolRow({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#f0f6ff] px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-navy p-1.5">
          <Terminal className="size-4 text-white" strokeWidth={2} aria-hidden />
        </span>
        <span className="text-base font-medium text-black">{label}</span>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}

/** Figma 73:135 — Tools Connected, Cohort Focus, Career Acceleration. */
export function ProgramsHighlightsSection() {
  const { toolsConnected, cohortFocus, careerAcceleration } =
    programsHighlights;

  return (
    <CoursesSection className="relative z-10 py-0">
      <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
        <div className="flex h-full flex-col gap-6 rounded-2xl border border-[#eaeaea] bg-white p-4 lg:col-span-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-black">
              {toolsConnected.title}
            </h2>
            <div className="flex items-center pl-1" aria-hidden>
              {toolsConnected.avatars.map((src, index) => (
                <div
                  key={src}
                  className={cn(
                    "relative size-8 overflow-hidden rounded-full border-2 border-white",
                    index > 0 && "-ml-3",
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {toolsConnected.rows.map((row) => (
              <ToolRow key={row.label} {...row} />
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-[#eaeaea] bg-white p-4">
          <h2 className="text-2xl font-semibold text-black">
            Cohort Focus
          </h2>
          <div className="flex items-end gap-1">
            <span className="text-5xl font-bold leading-none text-black sm:text-6xl lg:text-[82px]">
              {cohortFocus.value}
            </span>
            <span className="pb-2 text-2xl font-medium text-black sm:text-3xl lg:text-[32px]">
              {cohortFocus.suffix}
            </span>
          </div>
          <p className="max-w-full break-words text-base uppercase tracking-[2px] text-black sm:text-xl sm:tracking-[4.8px]">
            {cohortFocus.label}
          </p>
        </div>

        <div className="flex h-full flex-col gap-2.5 rounded-2xl border border-[#eaeaea] bg-[#0b1023] p-4">
          <div className="flex items-end">
            <span className="text-5xl font-bold leading-none text-white sm:text-6xl lg:text-[82px]">
              {careerAcceleration.value}
            </span>
            <span className="text-5xl font-bold leading-none text-[#ffc31a] sm:text-6xl lg:text-[82px]">
              {careerAcceleration.valueAccent}
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-white">
            {careerAcceleration.title}
          </h2>
          <p className="text-xl leading-[1.45] text-[#e3e3e3]">
            {careerAcceleration.description}
          </p>
        </div>
      </div>
    </CoursesSection>
  );
}
