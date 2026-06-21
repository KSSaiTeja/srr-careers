import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

type Crumb = { label: string; href?: string };

type BlogHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtext?: string;
  breadcrumb: Crumb[];
};

export function BlogHero({
  eyebrow,
  title,
  highlight,
  subtext,
  breadcrumb,
}: BlogHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pb-4 pt-12 sm:pt-14 md:pt-16 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] overflow-hidden"
        aria-hidden
      >
        <div className="absolute left-1/2 top-[6%] h-[320px] w-[min(125%,900px)] -translate-x-1/2 rounded-[50%] bg-brand-lavender/70 blur-[90px]" />
      </div>

      <Container className="text-center">
        <p className="mb-4 font-serif text-2xl italic leading-[1.2] text-brand-navy sm:text-3xl md:text-4xl">
          {eyebrow}
        </p>
        <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.15] text-gray-900 sm:text-5xl lg:text-6xl">
          {title}
          {highlight ? (
            <>
              {" "}
              <span className="italic text-brand-navy">{highlight}</span>
            </>
          ) : null}
        </h1>

        {subtext ? (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            {subtext}
          </p>
        ) : null}

        <nav
          className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-500"
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((crumb, index) => (
            <Fragment key={crumb.label}>
              {index > 0 ? (
                <span className="text-gray-300" aria-hidden>
                  //
                </span>
              ) : null}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-brand-navy"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-brand-navy">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
      </Container>
    </section>
  );
}
