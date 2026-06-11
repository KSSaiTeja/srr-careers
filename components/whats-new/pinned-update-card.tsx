import Link from "next/link";
import { Pin } from "lucide-react";
import { UpdateBadge } from "@/components/whats-new/update-badge";
import { pinnedUpdate } from "@/lib/constants/whats-new-content";

export function PinnedUpdateCard() {
  return (
    <article
      className="relative flex flex-col gap-8 rounded-3xl bg-gradient-to-br from-[#00275a] to-[#002c67] p-6 sm:gap-10 sm:p-8"
      aria-labelledby="pinned-update-title"
    >
      <UpdateBadge
        variant="update"
        label="UPDATE"
        onDark
        className="self-end sm:absolute sm:right-8 sm:top-8"
      />

      <div className="flex max-w-3xl flex-col gap-6 sm:pr-0">
        <div className="flex items-center gap-3 text-brand-gold-dark">
          <Pin className="h-6 w-6 shrink-0" aria-hidden />
          <span className="font-mono text-base uppercase tracking-[0.25em]">
            PINNED
          </span>
        </div>

        <div className="space-y-4 tracking-[-0.75px]">
          <h2
            id="pinned-update-title"
            className="text-3xl font-bold leading-tight text-white sm:text-[48px] sm:leading-normal"
          >
            {pinnedUpdate.title}
          </h2>
          <div className="text-xl leading-normal text-[#f3f3f3]">
            {pinnedUpdate.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={pinnedUpdate.ctaHref}
        className="inline-flex w-fit items-center justify-center rounded-2xl border border-brand-navy bg-white px-8 py-3 text-xl text-brand-navy transition-colors hover:bg-brand-lavender"
      >
        {pinnedUpdate.ctaLabel}
        <span className="ml-2" aria-hidden>
          →
        </span>
      </Link>
    </article>
  );
}
