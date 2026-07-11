"use client";

import Image from "next/image";
import {
  TEAM_HEADSHOTS_READY,
  TEAM_HEADSHOT_SIZE,
  type TeamMember,
} from "@/lib/constants/team-members";
import { cn } from "@/lib/utils/cn";

type TeamAvatarProps = {
  member: TeamMember;
  className?: string;
  sizes?: string;
};

/**
 * Shows the headshot when `TEAM_HEADSHOTS_READY` is true and files exist.
 * Otherwise uses a branded gradient + initials placeholder.
 */
export function TeamAvatar({
  member,
  className,
  sizes = "(max-width: 768px) 50vw, 240px",
}: TeamAvatarProps) {
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden bg-brand-lavender",
        className,
      )}
    >
      {TEAM_HEADSHOTS_READY ? (
        <Image
          src={member.imageSrc}
          alt={member.name}
          width={TEAM_HEADSHOT_SIZE.width}
          height={TEAM_HEADSHOT_SIZE.height}
          sizes={sizes}
          className="size-full object-cover"
        />
      ) : (
        <div
          className={cn(
            "flex size-full items-center justify-center bg-gradient-to-br text-3xl font-semibold tracking-wide text-white sm:text-4xl",
            member.placeholderGradient,
          )}
          aria-hidden
        >
          {initials}
        </div>
      )}
    </div>
  );
}
