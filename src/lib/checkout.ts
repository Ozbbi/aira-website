/**
 * Single source of truth for the Lemon Squeezy checkout URL.
 *
 * The real product URL goes in NEXT_PUBLIC_CHECKOUT_URL on Vercel.
 * Until then, this fallback keeps every CTA pointing at a known
 * placeholder so we never ship a dead "javascript:" or empty href.
 *
 * Usage anywhere in the app:
 *
 *   import { CHECKOUT_URL } from "@/lib/checkout";
 *   ...
 *   <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">…</a>
 */

export const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ||
  "https://boramir.lemonsqueezy.com/buy/PRO_PLACEHOLDER";

/** Display price — tweak this in one place when the founder window ends. */
export const PRICE = {
  current: "$9.99",
  strikethrough: "$29.99",
  currency: "USD",
  description: "One time. Lifetime access.",
};
