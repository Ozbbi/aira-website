"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles, Infinity as InfinityIcon } from "lucide-react";

/**
 * /pricing — dedicated pricing & comparison page.
 *
 * The honest pitch:
 *   - $9.99 once vs $149/yr Brilliant subscription
 *   - 5-year cost: $9.99 vs $745
 *   - Everything's included, no tiers, no upsells.
 *
 * This page reuses the same Lemon Squeezy URL pattern as the landing
 * page. When the real product is created, NEXT_PUBLIC_CHECKOUT_URL on
 * Vercel switches it over with no code changes.
 */

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CHECKOUT_URL ||
  "https://boramir.lemonsqueezy.com/buy/PRO_PLACEHOLDER";

const headingFont = {
  fontFamily:
    "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
  letterSpacing: "-0.02em",
};

const gradientText: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #FF6600 0%, #FF1A80 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const gradientBg = "linear-gradient(90deg, #FF6600 0%, #FF1A80 100%)";
const sunsetBg = "linear-gradient(135deg, #FFA266 0%, #FF4D99 50%, #FFB3CC 100%)";

const INCLUDED = [
  "62 hand-written lessons",
  "6 learning tracks (Foundations → Code)",
  "30+ daily insights",
  "20 prompt patterns with examples",
  "15 AI mistake cards",
  "25 quick wins",
  "Practice sandbox + AI grader",
  "Daily challenges",
  "Streak tracking + insurance",
  "Achievement badges",
  "Bookmarks + takeaways",
  "Activity calendar",
  "Web app (airamentor.com)",
  "Android APK",
  "iOS app (coming soon)",
  "Lifetime free updates",
];

const COMPARISON_ROWS = [
  { feature: "Price", aira: "$9.99 once", brilliant: "$149/yr", skillshare: "$168/yr", masterclass: "$180/yr" },
  { feature: "5-year cost", aira: "$9.99", brilliant: "$745", skillshare: "$840", masterclass: "$900", highlight: true },
  { feature: "10-year cost", aira: "$9.99", brilliant: "$1,490", skillshare: "$1,680", masterclass: "$1,800", highlight: true },
  { feature: "Focus", aira: "AI literacy", brilliant: "Math/CS", skillshare: "General creative", masterclass: "Celebrity lectures" },
  { feature: "AI-specific content", aira: true, brilliant: false, skillshare: false, masterclass: false },
  { feature: "Prompt engineering", aira: true, brilliant: false, skillshare: false, masterclass: false },
  { feature: "Hands-on practice", aira: true, brilliant: true, skillshare: false, masterclass: false },
  { feature: "Critical thinking with AI", aira: true, brilliant: false, skillshare: false, masterclass: false },
  { feature: "Lifetime access", aira: true, brilliant: false, skillshare: false, masterclass: false },
  { feature: "Cancel-anytime risk", aira: "None — owned", brilliant: "Lose access", skillshare: "Lose access", masterclass: "Lose access" },
  { feature: "Refund window", aira: "14 days", brilliant: "7 days", skillshare: "Variable", masterclass: "30 days" },
  { feature: "Built by", aira: "Indie maker", brilliant: "VC-funded", skillshare: "Public co.", masterclass: "VC-funded" },
];

function ComparisonCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center text-white" style={{ backgroundImage: gradientBg }}>
        <Check size={14} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-aira-border text-aira-dim">
        <X size={14} />
      </span>
    );
  }
  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-aira-bg text-aira-text">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 border-b border-aira-border bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold text-lg" style={{ ...headingFont, ...gradientText }}>AIRA</Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/learn" className="font-medium text-aira-muted hover:text-aira-text">Lessons</Link>
            <Link href="/sandbox" className="font-medium text-aira-muted hover:text-aira-text">Sandbox</Link>
            <Link href="/pricing" className="font-semibold text-orange-600">Pricing</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Pricing</p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]"
            style={headingFont}
          >
            $9.99 once. <span style={gradientText}>Forever.</span>
          </motion.h1>
          <p className="mt-5 text-lg sm:text-xl text-aira-muted leading-relaxed max-w-2xl mx-auto">
            Brilliant charges $149/year. Skillshare charges $168. MasterClass $180. AIRA charges <span className="font-bold text-aira-text">$9.99 — once</span>. We&apos;d rather build a product you own than a subscription that owns you.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="px-6 sm:px-8 lg:px-12 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative rounded-[28px] p-[2px]"
            style={{ backgroundImage: sunsetBg }}
          >
            <div className="rounded-[26px] bg-white p-8 sm:p-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                  <Sparkles size={12} /> Founder pricing
                </div>
                <p className="text-xs text-aira-dim">Lifetime · Single payment</p>
              </div>

              <div className="mt-6 flex items-baseline gap-3 justify-center sm:justify-start">
                <span className="text-2xl text-aira-dim line-through tabular-nums">$29.99</span>
                <span className="text-6xl sm:text-7xl font-bold tabular-nums" style={{ ...headingFont, ...gradientText }}>
                  $9.99
                </span>
                <span className="text-aira-muted text-sm">once</span>
              </div>

              <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 inline-flex w-5 h-5 rounded-full items-center justify-center text-white shrink-0"
                      style={{ backgroundImage: gradientBg }}
                    >
                      <Check size={12} />
                    </span>
                    <span className="text-aira-text">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-4 rounded-full text-white font-bold text-base shadow-[0_12px_30px_rgba(255,26,128,0.35)] hover:shadow-[0_16px_40px_rgba(255,26,128,0.5)] transition-all hover:-translate-y-0.5"
                style={{ backgroundImage: gradientBg }}
              >
                Get AIRA — $9.99 <ArrowRight size={18} />
              </a>
              <p className="mt-4 text-xs text-aira-dim">
                Secure checkout · Lemon Squeezy · APK delivered by email · 14-day refund
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 sm:px-8 lg:px-12 pb-20 bg-orange-50/40 pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Honest comparison</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={headingFont}>
              The math, side by side.
            </h2>
            <p className="mt-4 text-aira-muted">
              We didn&apos;t cherry-pick. These are public prices from each company&apos;s website.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-aira-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-aira-border">
                  <th className="text-left p-5 font-semibold text-aira-muted min-w-[180px]">Feature</th>
                  <th className="text-center p-5 font-bold text-orange-700 bg-orange-50/60 min-w-[110px]">AIRA</th>
                  <th className="text-center p-5 font-semibold text-aira-muted min-w-[110px]">Brilliant</th>
                  <th className="text-center p-5 font-semibold text-aira-muted min-w-[110px]">Skillshare</th>
                  <th className="text-center p-5 font-semibold text-aira-muted min-w-[110px]">MasterClass</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((r) => (
                  <tr key={r.feature} className="border-b border-aira-border last:border-b-0">
                    <td className="p-4 font-medium text-aira-text">{r.feature}</td>
                    <td className={`p-4 text-center bg-orange-50/40 font-semibold ${r.highlight ? "text-orange-700" : "text-aira-text"}`}>
                      <ComparisonCell value={r.aira} />
                    </td>
                    <td className={`p-4 text-center ${r.highlight ? "text-aira-muted line-through" : "text-aira-muted"}`}>
                      <ComparisonCell value={r.brilliant} />
                    </td>
                    <td className={`p-4 text-center ${r.highlight ? "text-aira-muted line-through" : "text-aira-muted"}`}>
                      <ComparisonCell value={r.skillshare} />
                    </td>
                    <td className={`p-4 text-center ${r.highlight ? "text-aira-muted line-through" : "text-aira-muted"}`}>
                      <ComparisonCell value={r.masterclass} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-aira-dim text-center max-w-2xl mx-auto">
            Prices verified May 2026 against each company&apos;s public pricing page. 5-year and 10-year totals compound annual subscription renewals. AIRA price never compounds.
          </p>
        </div>
      </section>

      {/* Why one-time pricing */}
      <section className="px-6 sm:px-8 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Why one-time pricing</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={headingFont}>
              We sell <span style={gradientText}>products</span>, not subscriptions.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                title: "You own it.",
                body: "Pay once. Use forever. If we ever shut down (we won't), you keep the APK. Your purchase isn't conditional on our existence.",
                icon: InfinityIcon,
              },
              {
                title: "No dark patterns.",
                body: "We don't gate features behind tiers. We don't auto-renew on the 364th day. We don't make refunds hard. One price, one click.",
                icon: Sparkles,
              },
              {
                title: "Aligned incentives.",
                body: "Subscription apps make money when you pay every month, whether you use them or not. We make money once. So we have to make it good — or you refund.",
                icon: Check,
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-3xl bg-white border border-aira-border p-6"
                  style={{ boxShadow: "0 4px 16px rgba(255, 102, 0, 0.04)" }}
                >
                  <div
                    className="inline-flex w-11 h-11 rounded-2xl items-center justify-center text-white shadow-md mb-4"
                    style={{ backgroundImage: gradientBg }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold" style={headingFont}>{c.title}</h3>
                  <p className="mt-2 text-sm text-aira-muted leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 sm:px-8 lg:px-12 py-20 bg-orange-50/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold" style={headingFont}>
            Ready to learn AI for <span style={gradientText}>real</span>?
          </h2>
          <p className="mt-4 text-aira-muted text-lg">
            Try the sandbox free. Browse the catalog free. Pay only if you&apos;re sold.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-bold shadow-[0_12px_30px_rgba(255,26,128,0.35)] hover:shadow-[0_16px_40px_rgba(255,26,128,0.5)] transition-all hover:-translate-y-0.5"
              style={{ backgroundImage: gradientBg }}
            >
              Get AIRA — $9.99 <ArrowRight size={18} />
            </a>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 border-orange-200 bg-white text-orange-700 hover:bg-orange-50"
            >
              Browse 62 lessons first
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-aira-border py-10 px-6 text-center text-sm text-aira-dim bg-white">
        AIRA © 2026 ·{" "}
        <Link href="/privacy" className="hover:text-aira-text">Privacy</Link> ·{" "}
        <Link href="/terms" className="hover:text-aira-text">Terms</Link>
      </footer>
    </main>
  );
}
