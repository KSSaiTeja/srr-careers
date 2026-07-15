import React from "react";

/**
 * Compact brand mark for the Payload admin nav.
 */
export function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Admin panel; keep dependency-free.
    <img
      src="/favicon/favicon-96x96.png"
      alt="SRR Careers"
      width={28}
      height={28}
      decoding="async"
    />
  );
}
