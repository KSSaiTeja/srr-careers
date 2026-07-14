/** Deterministic on-brand gradient for blog cover banners without an image. */
const ACCENTS = [
  "from-brand-lavender to-brand-purple-light",
  "from-brand-purple-light to-brand-purple",
  "from-brand-purple to-brand-purple-deep",
  "from-[#6D49F4] to-[#1A0A4D]",
] as const;

export function blogAccent(seed: string): string {
  let sum = 0;
  for (let i = 0; i < seed.length; i += 1) {
    sum += seed.charCodeAt(i);
  }
  return ACCENTS[sum % ACCENTS.length];
}
