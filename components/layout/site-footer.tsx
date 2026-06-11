import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FooterSocialLinks } from "@/components/layout/footer-social-links";
import {
  footerCourseLinks,
  footerExploreLinks,
} from "@/lib/constants/navigation";
import { getWhatsAppHref, siteContact } from "@/lib/constants/site-contact";
import { images } from "@/lib/constants/images";
import { cn } from "@/lib/utils/cn";

const footerHeadingClass = "text-sm font-bold tracking-tight text-[#0b1023]";
const footerLinkClass =
  "text-sm leading-5 text-[#5a637b] transition-colors hover:text-[#0b1023]";

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className={cn(footerHeadingClass, "mb-5")}>{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContactGroup() {
  return (
    <div className="sm:col-span-2 lg:col-span-1">
      <h3 className={cn(footerHeadingClass, "mb-5")}>Contact</h3>
      <ul className="flex flex-col gap-2.5">
        <li>
          <a href={siteContact.phoneHref} className={footerLinkClass}>
            {siteContact.phone}
          </a>
        </li>
        <li>
          <a href={siteContact.emailHref} className={footerLinkClass}>
            {siteContact.email}
          </a>
        </li>
        <li>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            {siteContact.whatsappLabel}
          </a>
        </li>
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e3e3f2] bg-brand-lavender/40">
      <Container className="py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1 lg:max-w-xs">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5">
              <Image
                src={images.logo}
                alt="SRR Careers"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xl font-bold text-[#0b1023]">
                SRR Careers
              </span>
            </Link>
            <p className="text-sm leading-5 text-[#5a637b]">
              A dedicated finishing school for SAP S/4 HANA FICO consultants.
              Live mentors, real client scenarios, lifetime career support.
            </p>
            <FooterSocialLinks className="mt-6" />
          </div>

          <FooterLinkGroup title="Explore" links={footerExploreLinks} />
          <FooterLinkGroup title="Course" links={footerCourseLinks} />
          <FooterContactGroup />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#e3e3f2] pt-6 text-xs leading-4 text-[#5a637b] sm:flex-row sm:items-center">
          <p>© 2026 SRR Careers. All rights reserved.</p>
          <p>Crafted with care for future SAP consultants.</p>
        </div>
      </Container>
    </footer>
  );
}
