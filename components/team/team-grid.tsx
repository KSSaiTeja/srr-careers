"use client";

import { useState } from "react";
import { TeamAvatar } from "@/components/team/team-avatar";
import { TeamMemberDialog } from "@/components/team/team-member-dialog";
import { teamMembers, type TeamMember } from "@/lib/constants/team-members";

export function TeamGrid() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <>
      <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-8 xl:grid-cols-5">
        {teamMembers.map((member) => (
          <li key={member.id} className="min-w-0">
            <button
              type="button"
              onClick={() => setSelected(member)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-navy/20 hover:shadow-lg hover:shadow-brand-navy/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-navy/15"
            >
              <TeamAvatar
                member={member}
                className="w-full rounded-none"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 220px"
              />
              <div className="flex flex-1 flex-col gap-1 px-5 py-5">
                <h2 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-navy">
                  {member.name}
                </h2>
                <p className="text-sm font-medium text-brand-navy/80">
                  {member.credential}
                </p>
                <p className="mt-auto pt-2 text-sm text-gray-500">
                  View profile →
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <TeamMemberDialog member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
