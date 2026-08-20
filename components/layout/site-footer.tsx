"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FooterSocialLinks } from "@/components/layout/footer-social-links";
import { MsmeBadge } from "@/components/layout/msme-badge";
import { OfficeLocations } from "@/components/layout/office-locations";
import { useSiteSettings } from "@/components/layout/site-settings-context";
import type { FooterLink } from "@/lib/types/site-settings-content";
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
  links: FooterLink[];
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

export function SiteFooter() {
  const { brand, contact, footer } = useSiteSettings();

  return (
    <footer className="border-t border-[#e3e3f2] bg-brand-lavender/40">
      <Container className="py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1 lg:max-w-xs">
            <Link href="/" className="mb-4 inline-flex items-center">
              <Image
                src={images.logo}
                alt={brand.siteName}
                width={950}
                height={380}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-5 text-[#5a637b]">
              {brand.footerDescription}
            </p>
            {footer.showMsmeLogo ? (
              <MsmeBadge
                label={footer.msmeBadgeLabel}
                size="footer"
                className="mt-5"
              />
            ) : null}
            <FooterSocialLinks className="mt-6" />
          </div>

          <FooterLinkGroup
            title={footer.exploreTitle}
            links={footer.exploreLinks}
          />
          <FooterLinkGroup
            title={footer.courseTitle}
            links={footer.courseLinks}
          />

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className={cn(footerHeadingClass, "mb-5")}>
              {footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={contact.phoneHref} className={footerLinkClass}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className={footerLinkClass}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {contact.whatsappLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <OfficeLocations className="mt-10 border-t border-[#e3e3f2] pt-10 sm:mt-12 sm:pt-12" />

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#e3e3f2] pt-6 text-xs leading-4 text-[#5a637b] sm:mt-12 sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
          <p>{footer.craftedText}</p>
        </div>
      </Container>
    </footer>
  );
}
