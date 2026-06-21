/**
 * Default course pricing. Acts as the fallback when a price hasn't been set in
 * the CMS yet. Prices are whole rupees (INR). Editors can override per course
 * in the admin; these keep the buy flow working out of the box.
 */
export type CoursePrice = {
  price: number;
  originalPrice?: number;
};

export const DEFAULT_COURSE_PRICES: Record<string, CoursePrice> = {
  "sap-fico-consultant-track": { price: 35000, originalPrice: 45000 },
  "sap-fico-end-user-track": { price: 15000, originalPrice: 20000 },
};

const GENERIC_FALLBACK: CoursePrice = { price: 25000 };

export function getCoursePrice(slug: string): CoursePrice {
  return DEFAULT_COURSE_PRICES[slug] ?? GENERIC_FALLBACK;
}
