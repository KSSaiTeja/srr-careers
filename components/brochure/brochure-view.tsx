"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  BrochureInsideSpread,
  BrochureOutsideSpread,
} from "@/components/brochure/brochure-sheets";
import "@/components/brochure/brochure.css";

const SPREAD_WIDTH_IN = 11;
const SPREAD_HEIGHT_IN = 8.5;
const CSS_PX_PER_IN = 96;

function SheetPreview({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      const native = SPREAD_WIDTH_IN * CSS_PX_PER_IN;
      setScale(Math.min(1, available / native));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="brochure-sheet-wrap">
      <div className="brochure-sheet-label">
        <p className="brochure-sheet-label__title">{label}</p>
        <p className="brochure-sheet-label__hint">{hint}</p>
      </div>
      <div
        ref={wrapRef}
        className="brochure-scale"
        style={
          {
            "--preview-h": `${SPREAD_HEIGHT_IN * CSS_PX_PER_IN * scale}px`,
          } as CSSProperties
        }
      >
        <div
          className="brochure-scale__inner"
          style={{ transform: `scale(${scale})` } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function BrochureView() {
  return (
    <div className="brochure-root">
      <header className="brochure-toolbar no-print">
        <div className="brochure-toolbar__meta">
          <p className="brochure-toolbar__eyebrow">SRR Careers</p>
          <p className="brochure-toolbar__title">
            Half-fold brochure · 11&quot; × 8.5&quot; flat · 5.5&quot; × 8.5&quot;
            folded
          </p>
        </div>
        <div className="brochure-toolbar__actions">
          <Link href="/" className="brochure-btn brochure-btn--ghost">
            Back to site
          </Link>
          <button
            type="button"
            className="brochure-btn brochure-btn--primary"
            onClick={() => window.print()}
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      <main className="brochure-stage">
        <SheetPreview
          label="Sheet 1 — Outside"
          hint="Print side A · Back cover (left) · Front cover (right)"
        >
          <BrochureOutsideSpread />
        </SheetPreview>

        <SheetPreview
          label="Sheet 2 — Inside"
          hint="Print side B · Courses (left) · Workshops (right)"
        >
          <BrochureInsideSpread />
        </SheetPreview>
      </main>
    </div>
  );
}
