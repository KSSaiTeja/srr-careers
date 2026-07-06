export type CheckoutProduct = {
  slug: string;
  name: string;
  amount: number;
  currency: "INR";
  originalAmount?: number;
};

export type PlanType = "single" | "installment";

/** Minimum acceptable first-installment amount (whole INR). */
export const INSTALLMENT_MIN = 10000;

/** Quick-pick chips for the first-installment input (whole INR). */
export const INSTALLMENT_CHIPS = [10000, 15000, 20000, 25000] as const;

export type EnrollmentDetails = {
  name: string;
  email: string;
  mobile: string;
};

export type BillingAddress = {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type CreateDraftRequest = EnrollmentDetails & {
  slug: string;
  planType: PlanType;
  /** When re-submitting step 1, pass the token from the first save. */
  leadToken?: string;
  /** Required when planType is "installment". Whole INR. */
  firstInstallmentAmount?: number;
};

export type CreateOrderRequest = CreateDraftRequest &
  BillingAddress & {
    /** Required — must match a row saved via /api/checkout/draft. */
    leadToken: string;
  };

export type CreateOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  name: string;
  prefill: { name: string; email: string; contact: string };
};

export type VerifyPaymentRequest = {
  orderId: string;
  paymentId: string;
  signature: string;
};

export type VerifyPaymentResponse = {
  ok: boolean;
  paymentId: string;
};
