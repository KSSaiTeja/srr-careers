import type { BillingAddress } from "./types";

const PINCODE_RE = /^\d{6}$/;

export function validateBillingAddress(
  body: Partial<BillingAddress>,
): { ok: true; address: BillingAddress } | { ok: false; error: string } {
  const addressLine1 = (body.addressLine1 ?? "").trim();
  const addressLine2 = (body.addressLine2 ?? "").trim();
  const city = (body.city ?? "").trim();
  const state = (body.state ?? "").trim();
  const pincode = (body.pincode ?? "").trim();

  if (addressLine1.length < 3) {
    return { ok: false, error: "Please enter your address (line 1)." };
  }
  if (city.length < 2) {
    return { ok: false, error: "Please enter your city." };
  }
  if (state.length < 2) {
    return { ok: false, error: "State is required — enter a valid pincode." };
  }
  if (!PINCODE_RE.test(pincode)) {
    return { ok: false, error: "Please enter a valid 6-digit pincode." };
  }

  return {
    ok: true,
    address: {
      addressLine1,
      addressLine2: addressLine2 || undefined,
      city,
      state,
      pincode,
    },
  };
}
