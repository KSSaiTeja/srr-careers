"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { TeamAvatar } from "@/components/team/team-avatar";
import type { TeamMember } from "@/lib/types/our-team-page-content";

type TeamMemberDialogProps = {
  member: TeamMember | null;
  workshopsHeading?: string;
  onClose: () => void;
};

export function TeamMemberDialog({
  member,
  workshopsHeading = "Workshops",
  onClose,
}: TeamMemberDialogProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!member) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [member, onClose]);

  if (!mounted || !member) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`team-member-${member.id}-title`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[min(90vh,720px)] w-full max-w-xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-lavender via-brand-purple-light to-brand-purple-deep" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-4 top-5 z-10 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="size-5" />
        </button>

        <div className="overflow-y-auto px-6 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-8">
          <div className="flex items-start gap-4 sm:gap-5">
            <TeamAvatar
              member={member}
              className="size-20 shrink-0 rounded-2xl sm:size-24"
              sizes="96px"
            />
            <div className="min-w-0 flex-1 pr-8">
              <p className="inline-flex rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy">
                {member.credential}
              </p>
              <h2
                id={`team-member-${member.id}-title`}
                className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              >
                {member.name}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-gray-100 pt-6 text-[15px] leading-relaxed text-gray-600 sm:text-base">
            {member.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          {member.workshops.length > 0 && (
            <div className="mt-7 rounded-2xl bg-brand-lavender/50 px-5 py-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy">
                {workshopsHeading}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {member.workshops.map((workshop) => (
                  <li
                    key={workshop}
                    className="flex gap-3 text-sm text-gray-800 sm:text-[15px]"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-navy"
                      aria-hidden
                    />
                    <span>{workshop}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
