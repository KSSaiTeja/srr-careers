import Image from "next/image";
import { siteSettingsDefaults } from "@/payload/seed/site-settings-defaults";

const CONTACT = {
  phone: "9490430555",
  phoneHref: "tel:+919490430555",
  email: "suresh@srrcareers.in",
  emailHref: "mailto:suresh@srrcareers.in",
  web: "www.srrcareers.in",
  webHref: "https://www.srrcareers.in",
} as const;

const OFFICES = siteSettingsDefaults.contact.locations;

const FRONT_WHY = [
  "Practical Training",
  "Expert Mentorship",
  "Industry-Relevant Skills",
  "Career Success Support",
] as const;

const FACILITIES = [
  "SAP FICO Consultant Track",
  "SAP FICO End User Track",
  "Advanced Excel Workshop",
  "Campus Recruitment Training",
  "GST & Finance Workshops",
  "Resume & Interview Labs",
] as const;

const WORKSHOPS = [
  {
    num: "01",
    name: "Campus Recruitment Training",
    points: ["Aptitude & verbal", "Mock interviews", "Placement readiness"],
  },
  {
    num: "02",
    name: "Career Pathways — Finance",
    points: ["Career roadmap", "Leadership skills", "Salary insights"],
  },
  {
    num: "03",
    name: "Skills Blueprint for Students",
    points: ["Domain skills", "Professional mindset", "Role-focused paths"],
  },
  {
    num: "04",
    name: "Ultimate Resume Writing",
    points: ["Formats & best practices", "AI tools for prep", "Common mistakes"],
  },
  {
    num: "05",
    name: "Conceptual & Practical GST",
    points: ["ITC & E-way bill", "Live return filing", "E-invoice demos"],
  },
  {
    num: "06",
    name: "Build Wealth & Retire Smart",
    points: ["Mutual funds & stocks", "Protection planning", "Freedom strategies"],
  },
] as const;

function CheckIcon({ className = "bf-check-icon" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={className}>
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M5.8 10.2 8.6 13l5.6-6.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="bf-mini-icon">
      <path
        fill="currentColor"
        d="M7.2 3.5c.4-.4 1-.5 1.5-.3l2.2.9c.6.2 1 .8.9 1.4l-.4 2.3c-.1.5-.4.9-.8 1.1l-1.2.6c.8 1.6 2.1 2.9 3.7 3.7l.6-1.2c.2-.4.6-.7 1.1-.8l2.3-.4c.6-.1 1.2.3 1.4.9l.9 2.2c.2.5.1 1.1-.3 1.5l-1.3 1.3c-.4.4-1 .6-1.6.5C10.5 17.8 6.2 13.5 4.7 7.9c-.1-.6.1-1.2.5-1.6l2-2.8Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="bf-mini-icon">
      <path
        fill="currentColor"
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.2.5 5.3 3.8L16.8 7H6.2Zm11.3 1.7-5.1 3.6a1 1 0 0 1-1.2 0L6.1 8.7V17h11.4V8.7Z"
      />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="bf-mini-icon">
      <path
        fill="currentColor"
        d="M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 1.5c-.8 1.3-1.3 3.2-1.4 5.3h2.8c-.1-2.1-.6-4-1.4-5.3Zm1.6 0c.7 1.2 1.2 2.9 1.3 5.3h2.7A7 7 0 0 0 13.6 5Zm-3.2 0A7 7 0 0 0 5.4 10.3h2.7c.1-2.4.6-4.1 1.3-5.3ZM5.4 13.7A7 7 0 0 0 10.4 19c-.7-1.2-1.2-2.9-1.3-5.3H5.4Zm4.6 0c.1 2.1.6 4 1.4 5.3.8-1.3 1.3-3.2 1.4-5.3H10Zm4.2 0c-.1 2.4-.6 4.1-1.3 5.3a7 7 0 0 0 5.7-5.3h-4.4Z"
      />
    </svg>
  );
}

function WaveDivider({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 550 72"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 34C62 10 118 58 178 40C238 22 286 4 348 24C410 44 468 12 550 30V72H0V34Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** FRONT — Rimberio-style: filled navy hero, torn wave, checklist + overlapping portrait */
function FrontCover() {
  return (
    <section className="brochure-panel bf-front" aria-label="Front cover">
      <div className="bf-front__hero">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero-duo.png"
            alt=""
            fill
            className="bf-front__hero-img"
            sizes="5.5in"
            priority
          />
        </div>
        <div className="bf-front__hero-veil" />
        <div className="bf-dots bf-dots--gold bf-front__dots" aria-hidden />

        <div className="bf-front__logo-tab">
          <Image
            src="/images/logo.png"
            alt="SRR Careers"
            width={160}
            height={64}
            className="bf-front__logo"
            priority
          />
        </div>

        <p className="bf-front__eyebrow">Learn · Grow · Succeed</p>
        <h1 className="bf-front__headline">
          Admissions
          <br />
          Now Open
        </h1>
        <div className="bf-ribbon bf-ribbon--gold bf-front__ribbon">
          Build skills. Boost confidence. Create success.
        </div>
        <p className="bf-front__lede">
          Industry-relevant learning designed for real-world performance and
          lasting career growth.
        </p>
      </div>

      <WaveDivider className="bf-front__wave" />

      <div className="bf-front__lower">
        <div className="bf-front__lower-left">
          <span className="bf-tab">Why Choose Us?</span>
          <ul className="bf-checklist bf-front__checks">
            {FRONT_WHY.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a className="bf-ribbon-cta" href={CONTACT.webHref}>
            Start Now
          </a>
          <span className="bf-urgency">Limited seats available</span>
        </div>

        <div className="bf-front__portrait-wrap">
          <div className="bf-front__ring" aria-hidden />
          <div className="bf-front__portrait">
            <div className="absolute inset-0">
              <Image
                src="/images/home/instructor.png"
                alt="SRR Careers mentor"
                fill
                className="bf-front__portrait-img"
                sizes="2.7in"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bf-front__stripe" aria-hidden />
    </section>
  );
}

/** BACK — Borcelle-style: diagonal header, big photo, facilities grid, contact footer */
function BackCover() {
  return (
    <section className="brochure-panel bf-back" aria-label="Back cover">
      <div className="bf-back__diag" aria-hidden />
      <div className="bf-back__wash" aria-hidden />

      <div className="bf-back__top">
        <div className="bf-back__headline-block">
          <h2 className="bf-back__headline">
            Your Global
            <br />
            Career Partner
          </h2>
          <p className="bf-back__subhead">Ready when you are</p>
        </div>
        <div className="bf-back__brand">
          <Image
            src="/images/logo.png"
            alt="SRR Careers"
            width={140}
            height={56}
            className="bf-back__logo"
          />
          <p>
            Train with experts. Practice with purpose. Move forward with
            confidence.
          </p>
        </div>
      </div>

      <div className="bf-back__mid">
        <div className="bf-back__photo-wrap">
          <div className="bf-back__photo">
            <div className="absolute inset-0">
              <Image
                src="/images/home/demo-cta.png"
                alt=""
                fill
                className="bf-back__photo-img"
                sizes="2.6in"
                priority
              />
            </div>
          </div>
          <a className="bf-cta-pill bf-back__cta" href={CONTACT.phoneHref}>
            Enquire Now
          </a>
        </div>

        <div className="bf-back__facilities">
          <span className="bf-pill-label">What We Offer</span>
          <ul className="bf-facilities">
            {FACILITIES.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bf-back__ready">
        <p>Ready to move your career forward?</p>
        <strong>Let&apos;s build your career advantage.</strong>
      </div>

      <footer className="bf-footer-grid">
        <a href={CONTACT.webHref} className="bf-footer-grid__item">
          <span className="bf-footer-grid__icon">
            <WebIcon />
          </span>
          <span>
            <small>Website</small>
            {CONTACT.web}
          </span>
        </a>
        <a href={CONTACT.phoneHref} className="bf-footer-grid__item">
          <span className="bf-footer-grid__icon">
            <PhoneIcon />
          </span>
          <span>
            <small>Contact</small>
            {CONTACT.phone}
          </span>
        </a>
        <a href={CONTACT.emailHref} className="bf-footer-grid__item">
          <span className="bf-footer-grid__icon">
            <MailIcon />
          </span>
          <span>
            <small>Email</small>
            {CONTACT.email}
          </span>
        </a>
        <div className="bf-footer-grid__item bf-footer-grid__item--offices">
          <span className="bf-footer-grid__icon">
            <WebIcon />
          </span>
          <span>
            <small>Offices</small>
            {OFFICES.map((office) => (
              <a
                key={`${office.label}-${office.city}`}
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bf-footer-office"
              >
                {office.city}: {office.phone}
              </a>
            ))}
          </span>
        </div>
      </footer>
    </section>
  );
}

/** COURSES — Education Fair style: hero band, info chip, filled course blocks */
function CoursesPanel() {
  return (
    <section className="brochure-panel bf-courses" aria-label="Our courses">
      <div className="bf-courses__hero">
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero-duo.png"
            alt=""
            fill
            className="bf-courses__hero-img"
            sizes="5.5in"
          />
        </div>
        <div className="bf-courses__hero-veil" />
        <div className="bf-courses__logo-chip">
          <Image
            src="/images/logo.png"
            alt="SRR Careers"
            width={120}
            height={48}
            className="bf-courses__logo"
          />
        </div>
      </div>
      <WaveDivider className="bf-courses__wave" />

      <div className="bf-courses__body">
        <h2 className="bf-courses__title">Skills that pay off</h2>
        <p className="bf-courses__lede">
          Structured learning. Hands-on practice. Job-ready outcomes on SAP
          S/4HANA and professional Excel.
        </p>

        <div className="bf-info-chip">
          <div>
            <strong>Consultant</strong>
            <span>40 Hours</span>
          </div>
          <div className="bf-info-chip__divider" aria-hidden />
          <div>
            <strong>End User</strong>
            <span>15 Hours</span>
          </div>
        </div>

        <span className="bf-pill-label">Our Courses</span>

        <article className="bf-course bf-course--hero">
          <div className="bf-course__meta">
            <span className="bf-course__track">Consultant Track</span>
            <span className="bf-badge">40 HRS</span>
          </div>
          <h3 className="bf-course__name">SAP FICO — Consultant Track</h3>
          <p className="bf-course__desc">Master SAP FICO on S/4HANA</p>
          <ul className="bf-checklist bf-checklist--tight">
            <li>
              <CheckIcon />
              <span>End-to-end S/4HANA FI &amp; CO configurations</span>
            </li>
            <li>
              <CheckIcon />
              <span>ECC vs S/4HANA differences &amp; full-cycle configs</span>
            </li>
            <li>
              <CheckIcon />
              <span>GST, TDS, asset accounting lifecycle</span>
            </li>
          </ul>
        </article>

        <div className="bf-courses__split">
          <article className="bf-course">
            <div className="bf-course__meta">
              <span className="bf-course__track">End User</span>
              <span className="bf-badge">15 HRS</span>
            </div>
            <h3 className="bf-course__name">SAP FICO End User</h3>
            <ul className="bf-checklist bf-checklist--tight">
              <li>
                <CheckIcon />
                <span>Vendor, Customer &amp; GL masters</span>
              </li>
              <li>
                <CheckIcon />
                <span>Postings, reporting &amp; assets</span>
              </li>
            </ul>
          </article>

          <article className="bf-excel">
            <h3 className="bf-excel__title">Advanced Excel</h3>
            <ul className="bf-checklist bf-checklist--tight">
              <li>
                <CheckIcon />
                <span>Dashboards &amp; pivots</span>
              </li>
              <li>
                <CheckIcon />
                <span>Lookups, macros &amp; reporting</span>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <footer className="bf-bar-footer">
        <span>More information</span>
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        <a href={CONTACT.webHref}>{CONTACT.web}</a>
      </footer>
    </section>
  );
}

/** WORKSHOPS — admission-style: dense workshop grid + dual photo masks */
function WorkshopsPanel() {
  return (
    <section className="brochure-panel bf-workshops" aria-label="Our workshops">
      <div className="bf-workshops__bg" aria-hidden />
      <a className="bf-workshops__web" href={CONTACT.webHref}>
        <WebIcon /> {CONTACT.web}
      </a>

      <div className="bf-workshops__top">
        <h2 className="bf-workshops__title">
          Our <span>Workshops</span>
        </h2>
        <p className="bf-workshops__open">High-impact sessions for 2026</p>
        <p className="bf-workshops__lede">
          For students, professionals and future leaders — sessions that turn
          knowledge into confidence.
        </p>

        <div className="bf-workshops__why">
          <span className="bf-pill-label">Workshop Lineup</span>
          <ul className="bf-why-grid">
            {WORKSHOPS.map((w) => (
              <li key={w.num}>
                <CheckIcon />
                <span>
                  <strong>
                    {w.num}. {w.name}
                  </strong>
                  {w.points.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bf-workshops__actions">
          <a className="bf-cta-pill bf-workshops__cta" href={CONTACT.emailHref}>
            Enquire Now
          </a>
          <div className="bf-workshops__contact">
            <p className="bf-workshops__contact-label">Contact Us</p>
            <a href={CONTACT.phoneHref}>
              <PhoneIcon /> {CONTACT.phone}
            </a>
            <a href={CONTACT.emailHref}>
              <MailIcon /> {CONTACT.email}
            </a>
          </div>
        </div>
      </div>

      <div className="bf-workshops__mosaic">
        <div className="bf-workshops__mosaic-left">
          <div className="absolute inset-0">
            <Image
              src="/images/courses/track-builder.png"
              alt=""
              fill
              className="bf-workshops__mosaic-img"
              sizes="2.4in"
            />
          </div>
        </div>
        <div className="bf-workshops__mosaic-right">
          <div className="absolute inset-0">
            <Image
              src="/images/home/instructor.png"
              alt=""
              fill
              className="bf-workshops__mosaic-img bf-workshops__mosaic-img--portrait"
              sizes="2.8in"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BrochureOutsideSpread() {
  return (
    <div className="brochure-spread" data-sheet="outside">
      <div className="brochure-fold brochure-fold--outside" aria-hidden />
      <BackCover />
      <FrontCover />
    </div>
  );
}

export function BrochureInsideSpread() {
  return (
    <div className="brochure-spread" data-sheet="inside">
      <div className="brochure-fold brochure-fold--inside" aria-hidden />
      <CoursesPanel />
      <WorkshopsPanel />
    </div>
  );
}
