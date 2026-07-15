import React from "react";

/**
 * Full brand mark for the Payload login / account views.
 */
export function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Admin panel; keep dependency-free.
    <img
      src="/images/logo.png"
      alt="SRR Careers"
      width={240}
      height={96}
      decoding="async"
    />
  );
}
