/** Deterministic on-brand gradient for blog cover banners without an image. */
const ACCENTS = [
  "from-brand-navy to-brand-purple",
  "from-brand-purple to-brand-purple-light",
  "from-brand-navy-deep to-brand-navy",
  "from-[#371ECB] to-[#6D5BE0]",
] as const;

export function blogAccent(seed: string): string {
  let sum = 0;
  for (let i = 0; i < seed.length; i += 1) {
    sum += seed.charCodeAt(i);
  }
  return ACCENTS[sum % ACCENTS.length];
}
