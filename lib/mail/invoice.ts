/**
 * Invoice / receipt helpers for transactional mail.
 *
 * SRR Careers is not registered under GST (turnover below the registration
 * threshold). Receipts show the course fee as a single amount with no tax
 * breakdown. Seller details are read from environment variables.
 */

export type SellerDetails = {
  companyName: string;
  legalName: string;
  addressLines: string[];
  email: string;
  phone: string;
  website: string;
};

function env(name: string): string {
  return process.env[name]?.trim() || "";
}

function requireEnv(name: string, missing: string[]): string {
  const value = env(name);
  if (!value) missing.push(name);
  return value;
}

/**
 * Seller block for payment receipts. Throws when any required env var is
 * missing so misconfigured deployments fail loudly.
 */
export function getSeller(): SellerDetails {
  const missing: string[] = [];
  const legalName = requireEnv("INVOICE_LEGAL_NAME", missing);
  const address = requireEnv("INVOICE_ADDRESS", missing);
  const email = env("INVOICE_EMAIL") || env("RESEND_REPLY_TO");
  const phone = requireEnv("INVOICE_PHONE", missing);
  const website =
    env("INVOICE_WEBSITE") ||
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ||
    "";

  if (!email) missing.push("INVOICE_EMAIL (or RESEND_REPLY_TO)");
  if (!website) missing.push("INVOICE_WEBSITE (or NEXT_PUBLIC_SERVER_URL)");

  if (missing.length > 0) {
    throw new Error(
      `Invoice seller configuration incomplete. Set: ${missing.join(", ")}`,
    );
  }

  return {
    companyName: env("INVOICE_COMPANY_NAME") || "SRR Careers",
    legalName,
    addressLines: address
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    email,
    phone,
    website,
  };
}

/**
 * Indian financial year label for a date, e.g. "2026-27".
 * FY runs Apr 1 → Mar 31.
 */
function financialYear(d: Date): string {
  const y = d.getFullYear();
  const startYear = d.getMonth() >= 3 ? y : y - 1; // Apr = month 3
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, "0")}`;
}

/**
 * Deterministic, human-readable receipt number derived from the order:
 *   SRR/2026-27/AB12CD34
 */
export function invoiceNumber(orderId: string, when: Date): string {
  const prefix = env("INVOICE_PREFIX") || "SRR";
  const tail = orderId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase();
  return `${prefix}/${financialYear(when)}/${tail || "00000000"}`;
}
