import { socialProfiles } from "@/lib/constants/social";
import { SocialIcon } from "@/components/ui/social-icon";
import { cn } from "@/lib/utils/cn";

type FooterSocialLinksProps = {
  className?: string;
};

export function FooterSocialLinks({ className }: FooterSocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {socialProfiles.map((profile) => (
        <a
          key={profile.platform}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={profile.label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e3e3f2] bg-white text-[#5a637b] transition-colors hover:border-brand-navy/20 hover:text-brand-navy"
        >
          <SocialIcon platform={profile.platform} />
        </a>
      ))}
    </div>
  );
}
