import type { WhatsNewUpdate } from "@/lib/constants/whats-new-content";
import { UpdateBadge } from "@/components/whats-new/update-badge";

type UpdateRowProps = {
  update: WhatsNewUpdate;
};

export function UpdateRow({ update }: UpdateRowProps) {
  return (
    <article
      data-reveal-item
      className="relative flex flex-col gap-6 py-8 transition-transform duration-300 first:pt-0 hover:-translate-y-0.5 sm:flex-row sm:items-start sm:gap-10 sm:py-10 lg:gap-16 xl:gap-24"
    >
      <div className="flex w-full shrink-0 flex-row items-center justify-between gap-4 sm:w-[148px] sm:flex-col sm:items-start sm:justify-start sm:gap-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-black sm:text-sm sm:tracking-[0.3em] lg:text-base lg:tracking-[0.375em]">
          {update.timeAgo}
        </p>
        <UpdateBadge variant={update.badge} label={update.badgeLabel} />
      </div>

      <div className="min-w-0 flex-1 lg:max-w-[665px]">
        <h3 className="text-xl font-bold leading-snug tracking-[-0.5px] text-[#0b1023] sm:text-2xl sm:leading-tight lg:text-[30px] lg:leading-9">
          {update.title}
        </h3>
        <div className="mt-3 space-y-1 text-base leading-relaxed text-[#535b72] sm:mt-4">
          {update.description.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
