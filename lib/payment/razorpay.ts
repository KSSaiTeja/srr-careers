/**
 * Razorpay configuration. The checkout goes live the moment these env vars are
 * present — no code change required:
 *
 *   RAZORPAY_KEY_ID      (server + returned to the browser to open checkout)
 *   RAZORPAY_KEY_SECRET  (server only — creates orders + verifies signatures)
 *
 * Until then, `isConfigured` is false and the UI falls back to the enquiry /
 * demo flow so the page still converts.
 */
export type RazorpayConfig = {
  keyId: string | null;
  keySecret: string | null;
  isConfigured: boolean;
};

export function getRazorpayConfig(): RazorpayConfig {
  const keyId =
    process.env.RAZORPAY_KEY_ID ??
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ??
    null;
  const keySecret = process.env.RAZORPAY_KEY_SECRET ?? null;

  return {
    keyId,
    keySecret,
    isConfigured: Boolean(keyId && keySecret),
  };
}
