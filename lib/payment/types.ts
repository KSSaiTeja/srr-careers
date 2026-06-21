export type CheckoutProduct = {
  slug: string;
  name: string;
  amount: number;
  currency: "INR";
  originalAmount?: number;
};

export type CreateOrderRequest = {
  slug: string;
  name: string;
  amount: number;
};

export type CreateOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  name: string;
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
