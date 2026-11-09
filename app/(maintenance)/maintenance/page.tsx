import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Coming soon | SRR Careers",
  description:
    "A new batch is on the way. We're adding new features to our course modules and will be back shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-16"
      style={{ backgroundColor: "#00193b", color: "#ffffff" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,213,73,0.16), transparent 60%), radial-gradient(ellipse 40% 40% at 100% 100%, rgba(55,30,203,0.35), transparent 70%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-lg shadow-black/20">
          <Image
            src="/images/logo.png"
            alt="SRR Careers"
            width={950}
            height={380}
            priority
            className="h-20 w-auto sm:h-24"
          />
        </div>

        <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-brand-gold uppercase">
          <span className="size-1.5 rounded-full bg-brand-gold" aria-hidden />
          Work in progress
        </p>

        <h1 className="mt-6 font-serif text-4xl leading-tight text-balance text-white sm:text-5xl" style={{ color: "#ffffff" }}>
          New batch. A new kind of website is coming soon.
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed sm:text-lg" style={{ color: "rgba(255,255,255,0.82)" }}>
          We&apos;re updating SRR Careers and adding new features to our course
          modules. The site will be back once everything is ready.
        </p>

        <p className="mt-10 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
          Questions in the meantime?{" "}
          <a
            href="tel:+919286123457"
            className="font-medium text-brand-gold underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            +91 92861 23457
          </a>
          {" · "}
          <a
            href="mailto:suresh@srrcareers.in"
            className="font-medium text-brand-gold underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            suresh@srrcareers.in
          </a>
        </p>
      </div>
    </main>
  );
}
