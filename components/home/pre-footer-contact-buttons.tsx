"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { useSiteSettings } from "@/components/layout/site-settings-context";

type PreFooterContactButtonsProps = {
  phoneButtonLabel: string;
  emailButtonLabel: string;
};

export function PreFooterContactButtons({
  phoneButtonLabel,
  emailButtonLabel,
}: PreFooterContactButtonsProps) {
  const { contact } = useSiteSettings();

  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href={contact.phoneHref}
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-purple shadow-lg transition-colors hover:bg-gray-100"
      >
        <Icon name="phone" className="h-4 w-4" strokeWidth={2} />
        {phoneButtonLabel}
      </Link>
      <Link
        href={contact.emailHref}
        className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
      >
        <Icon name="mail" className="h-4 w-4" strokeWidth={2} />
        {emailButtonLabel}
      </Link>
    </div>
  );
}
