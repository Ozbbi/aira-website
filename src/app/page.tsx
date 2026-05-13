"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  Brain,
  BookOpen,
  Infinity as InfinityIcon,
  Sparkles,
  Smartphone,
  Menu,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";

/**
 * AIRA Landing v3 — Bright / Orange / Pink rebrand.
 *
 * The site's central pitch: AIRA is better than Brilliant.org for AI
 * literacy, at $9.99 once instead of $149/year. Every section ladders
 * up to that: hero, why-AIRA, comparison table, pricing, FAQ.
 *
 * Light theme throughout. Warm white background, orange→pink gradients,
 * generous whitespace. Designed to feel premium without feeling cold.
 */

// Lemon Squeezy checkout URL — env var on Vercel, fallback for local dev.
// When the Lemon Squeezy product is live the env var takes over.
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

/* ───────────────────────── Logo ───────────────────────── */

function Logo({ size = 28, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 select-none" aria-label="AIRA">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 4px 10px rgba(255, 102, 0, 0.25))" }}
      >
        <defs>
          <linearGradient id="airaLogoGradV3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6600" />
            <stop offset="100%" stopColor="#FF1A80" />
          </linearGradient>
          <linearGradient id="airaLogoSoftV3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF4ED" />
            <stop offset="100%" stopColor="#FFF0F5" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="url(#airaLogoSoftV3)" stroke="url(#airaLogoGradV3)" strokeWidth="1.5" />
        <path d="M11 30 L20 9 L29 30" stroke="url(#airaLogoGradV3)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14.8 23 L25.2 23" stroke="url(#airaLogoGradV3)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="20" cy="9" r="2.1" fill="url(#airaLogoGradV3)" />
      </svg>
      {withWordmark && (
        <span className="font-bold tracking-tight text-lg" style={{ ...headingFont, ...gradientText, letterSpacing: "0.04em" }}>
          AIRA
        </span>
      )}
    </span>
  );
}

/* ───────────────────────── AIRA Orb ───────────────────────── */

function AiraOrb({ size = 180 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(255,102,0,0.22), transparent 65%)",
          transform: "scale(1.3)",
          filter: "blur(8px)",
        }}
      />
      {/* Orb body */}
      <div
        className="absolute inset-0 rounded-full animate-pulse-slow"
        style={{
          background: "radial-gradient(circle at 30% 28%, #FFB088 0%, #FF6600 35%, #FF1A80 100%)",
          boxShadow: "0 30px 60px -20px rgba(255, 26, 128, 0.45), 0 0 80px rgba(255,102,0,0.35)",
        }}
      />
      {/* White top-left highlight */}
      <div
        className="absolute rounded-full"
        style={{
          top: "12%",
          left: "18%",
          width: size * 0.28,
          height: size * 0.18,
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.75), transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <style jsx>{`
        @keyframes airaBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-pulse-slow {
          animation: airaBreathe 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const faqs = [
    {
      q: "Why is AIRA only $9.99 when Brilliant is $149/year?",
      a: "Because Brilliant is a venture-funded company that needs subscription revenue to justify a billion-dollar valuation. AIRA is built by an indie maker. $9.99 covers our costs, lets us keep building, and means you own the app — not rent it. Like buying a book vs. paying monthly to read it.",
    },
    {
      q: "How is AIRA actually better than Brilliant?",
      a: "Brilliant is a wide curriculum: math, CS, science, all general. AIRA is laser-focused on AI literacy — the most important skill of this decade. We teach you to use ChatGPT, Claude, Gemini, Perplexity, and Cursor effectively. Brilliant teaches you geometry. Different problems, different tools.",
    },
    {
      q: "Is the content really worth $9.99?",
      a: "62 hand-written lessons (no AI-slop) drawn from Stanford CS324, MIT 6.S191, Anthropic's AI Fluency curriculum, and Lee Boonstra's whitepaper. Plus 30+ daily insights, 20 prompt patterns, 15 AI mistakes with fixes, and 25 quick wins. At $9.99, that works out to roughly 8 cents per lesson.",
    },
    {
      q: "How do I get AIRA after paying?",
      a: "Lemon Squeezy emails you an Android APK download link + license key within minutes of purchase. Tap the APK on your phone to install. First time? Android asks to allow 'install from unknown sources' — toggle it on, install, toggle it off. Standard one-time step. iOS coming soon, same purchase covers it.",
    },
    {
      q: "What about iOS and the web app?",
      a: "Web app is live now at airamentor.com — full lessons, sandbox, learning catalog. iOS is coming in a few weeks. One $9.99 purchase = lifetime access on all platforms we ship.",
    },
    {
      q: "What if AIRA doesn't work for me?",
      a: "14-day refund through Lemon Squeezy. Email us, get your $9.99 back. No questions asked. We'd rather you find the right product than feel stuck with the wrong one.",
    },
    {
      q: "Is this another ChatGPT wrapper?",
      a: "No. AIRA teaches the skill of using ANY AI — ChatGPT, Claude, Gemini, Perplexity, Cursor, whatever comes next. The mental models transfer. The prompt patterns transfer. The critical thinking transfers. Tools change every year. The skill of using them doesn't.",
    },
    {
      q: "Who built AIRA?",
      a: "One indie maker who got tired of bad AI tutorials. No VC. No ads. No data selling. Just one builder shipping real work from Turkey. You're not buying from a startup — you're buying from a person.",
    },
  ];

  return (
    <main className="relative w-full overflow-x-hidden bg-aira-bg text-aira-text">
      {/* ─────────────────── NAV ─────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/75 border-b border-aira-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <a href="#top" className="inline-flex items-center" aria-label="AIRA home">
            <Logo size={30} />
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-aira-muted">
            <Link href="/learn" className="hover:text-aira-text transition">Lessons</Link>
            <Link href="/sandbox" className="hover:text-aira-text transition">Sandbox</Link>
            <a href="#why" className="hover:text-aira-text transition">Why AIRA</a>
            <Link href="/pricing" className="hover:text-aira-text transition">Pricing</Link>
            <a href="#faq" className="hover:text-aira-text transition">FAQ</a>
          </div>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex text-sm px-4 py-2 rounded-full text-white font-semibold shadow-[0_8px_24px_rgba(255,26,128,0.35)] hover:shadow-[0_12px_30px_rgba(255,26,128,0.5)] transition-all hover:-translate-y-0.5"
            style={{ backgroundImage: gradientBg }}
          >
            Get AIRA — $9.99
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-aira-text"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-aira-border bg-white/95 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm text-aira-muted">
              <Link href="/learn" onClick={() => setMobileMenuOpen(false)} className="hover:text-aira-text">Lessons</Link>
              <Link href="/sandbox" onClick={() => setMobileMenuOpen(false)} className="hover:text-aira-text">Sandbox</Link>
              <a href="#why" onClick={() => setMobileMenuOpen(false)} className="hover:text-aira-text">Why AIRA</a>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-aira-text">Pricing</Link>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-aira-text">FAQ</a>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-full text-white font-semibold"
                style={{ backgroundImage: gradientBg }}
              >
                Get AIRA — $9.99
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ─────────────────── HERO ─────────────────── */}
      <section id="top" className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* Glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 35%, rgba(255,102,0,0.13) 0%, rgba(255,26,128,0.08) 40%, transparent 75%)",
          }}
        />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] tracking-[0.18em] uppercase text-orange-700 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Live · 62 lessons · No subscription
              </div>

              <h1
                className="mt-6 text-[40px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.02]"
                style={headingFont}
              >
                Brilliant teaches you math.
                <br />
                <span style={gradientText}>AIRA teaches you AI.</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-aira-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                The AI literacy app that costs less than a coffee.
                Pay <span className="font-bold text-aira-text">$9.99 once</span> — own it forever.
                Brilliant charges $149/year. Same idea. Better focus. Better price.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-[0_12px_30px_rgba(255,26,128,0.35)] hover:shadow-[0_16px_40px_rgba(255,26,128,0.5)] transition-all hover:-translate-y-0.5"
                  style={{ backgroundImage: gradientBg }}
                >
                  Get AIRA — $9.99 once
                  <ArrowRight size={18} />
                </a>
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 border-orange-200 bg-white text-orange-700 hover:bg-orange-50 transition-colors"
                >
                  <BookOpen size={18} /> Browse 62 lessons
                </Link>
              </div>

              <p className="mt-5 text-xs text-aira-dim">
                14-day refund · No subscription · Lifetime updates
              </p>
            </div>

            {/* Orb visual */}
            <div className="flex justify-center lg:justify-end">
              <AiraOrb size={260} />
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { num: "62", label: "Lessons" },
              { num: "$9.99", label: "Once. Forever." },
              { num: "5 min", label: "Per session" },
              { num: "0", label: "Subscriptions" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-aira-border px-5 py-4 text-center"
                style={{ boxShadow: "0 4px 12px rgba(255, 102, 0, 0.04)" }}
              >
                <div className="text-2xl font-bold tabular-nums" style={{ ...headingFont, ...gradientText }}>
                  {s.num}
                </div>
                <div className="text-xs uppercase tracking-wider text-aira-dim mt-1 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── WHY AIRA BEATS BRILLIANT ─────────────────── */}
      <section id="why" className="relative py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Why AIRA</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={headingFont}>
              Brilliant is great. AIRA is built for <span style={gradientText}>this decade</span>.
            </h2>
            <p className="mt-4 text-lg text-aira-muted leading-relaxed">
              Three reasons AIRA wins for AI literacy. Read them. Decide for yourself.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                eyebrow: "Focus",
                title: "Built for AI. Only AI.",
                body: "Brilliant teaches geometry, statistics, neural net basics — wide curriculum. AIRA is laser-focused on the one skill that matters most right now: thinking with AI. Prompt craft. Critical thinking. When to use it. When not to.",
                icon: Brain,
              },
              {
                eyebrow: "Ownership",
                title: "Pay once. Own forever.",
                body: "Brilliant: $149/year, every year, forever. AIRA: $9.99 once. Like buying a book vs. renting one. After 5 years, AIRA users save $735. We don't think learning should come with a monthly bill.",
                icon: InfinityIcon,
              },
              {
                eyebrow: "Content",
                title: "Real research. No fluff.",
                body: "62 lessons drawn from Stanford CS324, MIT 6.S191, Anthropic's AI Fluency curriculum, and Lee Boonstra's prompt engineering whitepaper. Hand-written. Not AI-generated content about AI — that would be ironic.",
                icon: Sparkles,
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="group rounded-3xl bg-white border border-aira-border p-7 transition-all hover:-translate-y-1 hover:border-orange-200"
                  style={{ boxShadow: "0 4px 16px rgba(255, 102, 0, 0.04)" }}
                >
                  <div
                    className="inline-flex w-12 h-12 rounded-2xl items-center justify-center text-white shadow-md mb-5"
                    style={{ backgroundImage: gradientBg }}
                  >
                    <Icon size={22} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">{c.eyebrow}</p>
                  <h3 className="mt-1 text-xl font-bold" style={headingFont}>{c.title}</h3>
                  <p className="mt-3 text-sm text-aira-muted leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────── COMPARISON TABLE ─────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-12 bg-orange-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">The honest comparison</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={headingFont}>
              5 years of learning, side by side.
            </h2>
            <p className="mt-4 text-lg text-aira-muted">
              Brilliant, Skillshare, MasterClass — all subscription. AIRA — one payment.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-aira-border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-aira-border">
                  <th className="text-left p-5 font-semibold text-aira-muted">Feature</th>
                  <th className="text-center p-5 font-bold text-orange-700 bg-orange-50/60">AIRA</th>
                  <th className="text-center p-5 font-semibold text-aira-muted">Brilliant</th>
                  <th className="text-center p-5 font-semibold text-aira-muted">Skillshare</th>
                  <th className="text-center p-5 font-semibold text-aira-muted">MasterClass</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Price", a: "$9.99 once", b: "$149/year", c: "$168/year", d: "$180/year" },
                  { f: "5-year cost", a: "$9.99", b: "$745", c: "$840", d: "$900", highlight: true },
                  { f: "Focus", a: "AI literacy", b: "Math/CS/Sci", c: "General", d: "General" },
                  { f: "AI-specific", a: "✓ Core", b: "Some", c: "Few", d: "None" },
                  { f: "Lifetime access", a: "✓ Yes", b: "Subscription", c: "Subscription", d: "Subscription" },
                  { f: "Web + Android", a: "✓ Both", b: "Both", c: "Both", d: "Both" },
                  { f: "Built by", a: "Indie maker", b: "VC-funded", c: "VC-funded", d: "VC-funded" },
                ].map((r) => (
                  <tr key={r.f} className="border-b border-aira-border last:border-b-0">
                    <td className="p-5 font-medium text-aira-text">{r.f}</td>
                    <td
                      className={`p-5 text-center bg-orange-50/40 font-semibold ${
                        r.highlight ? "text-orange-700" : "text-aira-text"
                      }`}
                    >
                      {r.a}
                    </td>
                    <td className={`p-5 text-center ${r.highlight ? "text-aira-muted line-through" : "text-aira-muted"}`}>{r.b}</td>
                    <td className={`p-5 text-center ${r.highlight ? "text-aira-muted line-through" : "text-aira-muted"}`}>{r.c}</td>
                    <td className={`p-5 text-center ${r.highlight ? "text-aira-muted line-through" : "text-aira-muted"}`}>{r.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-xs text-aira-dim text-center max-w-2xl mx-auto">
            Prices verified against each company&apos;s public pricing page. 5-year cost compounds annual subscriptions. AIRA never compounds.
          </p>
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">How AIRA works</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={headingFont}>
              5 minutes a day. <span style={gradientText}>Real skills.</span>
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                title: "Open a lesson.",
                body: "No setup, no signup wall. Tap and start. Each lesson takes 5 minutes — built for the school commute, the coffee break, the 'I have 5 minutes' moment.",
              },
              {
                n: "02",
                title: "See it. Try it.",
                body: "Every lesson shows you a vague prompt vs. a sharp one. You see the difference. Then you try it yourself in the sandbox. AIRA grades you with specific feedback.",
              },
              {
                n: "03",
                title: "Build a habit.",
                body: "XP, streaks, badges — but designed to be encouraging, not punishing. Miss a day? AIRA gives you a free streak save once a week. We want you to keep going, not give up.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-3xl bg-white border border-aira-border p-7"
                style={{ boxShadow: "0 4px 16px rgba(255, 102, 0, 0.04)" }}
              >
                <div className="text-5xl font-black tabular-nums leading-none" style={{ ...headingFont, ...gradientText }}>
                  {s.n}
                </div>
                <h3 className="mt-4 text-xl font-bold" style={headingFont}>{s.title}</h3>
                <p className="mt-3 text-sm text-aira-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-orange-300 text-orange-700 font-semibold hover:bg-orange-50 transition-colors"
            >
              <Zap size={16} /> Try the sandbox (free, no signup)
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────── TRACKS ─────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-12 bg-orange-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">62 lessons across 6 tracks</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={headingFont}>
              From <span className="text-aira-muted">&quot;what&apos;s a prompt&quot;</span> to <span style={gradientText}>&quot;I built this with AI&quot;</span>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "AI Foundations", desc: "Think with AI, not at it. The mental models everything else builds on.", gradient: "linear-gradient(135deg, #FF6600 0%, #FF1A80 100%)" },
              { name: "Critical Thinking", desc: "Know when AI is wrong. Know when to question. The skill that pays.", gradient: "linear-gradient(135deg, #FF4D99 0%, #FFAC30 100%)" },
              { name: "Practical Power", desc: "Chain of thought, role prompting, follow-up mastery. The pro moves.", gradient: "linear-gradient(135deg, #FFA266 0%, #FF6600 100%)" },
              { name: "Tools & Taste", desc: "ChatGPT vs Claude vs Gemini. Honest, real, opinionated comparisons.", gradient: "linear-gradient(135deg, #00C896 0%, #5BA8FF 100%)" },
              { name: "Create with AI", desc: "Go from idea to working thing. Weekend projects. Prompt libraries.", gradient: "linear-gradient(135deg, #FF7F33 0%, #FFB3CC 100%)" },
              { name: "Code Track", desc: "For builders. Vibe-code apps with Cursor, Copilot, and Claude.", gradient: "linear-gradient(135deg, #B380FF 0%, #FF4D99 100%)" },
            ].map((t) => (
              <Link
                key={t.name}
                href="/learn"
                className="group block rounded-3xl bg-white border border-aira-border overflow-hidden transition-all hover:-translate-y-1"
                style={{ boxShadow: "0 4px 16px rgba(255, 102, 0, 0.04)" }}
              >
                <div className="h-2 w-full" style={{ background: t.gradient }} />
                <div className="p-6">
                  <h3 className="text-lg font-bold" style={headingFont}>{t.name}</h3>
                  <p className="mt-2 text-sm text-aira-muted leading-relaxed">{t.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                    Browse <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── PRICING ─────────────────── */}
      <section id="pricing" className="relative py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Pricing</p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold" style={headingFont}>
              One price. <span style={gradientText}>One purchase.</span>
            </h2>
            <p className="mt-4 text-lg text-aira-muted">No tiers. No upsells. No subscription.</p>
          </div>

          <div
            className="mt-12 relative rounded-[28px] p-[2px]"
            style={{ backgroundImage: sunsetBg }}
          >
            <div className="rounded-[26px] bg-white p-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-bold uppercase tracking-wider text-orange-700">
                <Sparkles size={12} /> Founder pricing
              </div>
              <div className="mt-6 flex items-baseline justify-center gap-3">
                <span className="text-2xl text-aira-dim line-through tabular-nums">$29.99</span>
                <span className="text-6xl sm:text-7xl font-bold tabular-nums" style={{ ...headingFont, ...gradientText }}>
                  $9.99
                </span>
              </div>
              <p className="mt-2 text-aira-muted">One time. Yours forever.</p>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
                {[
                  "62 hand-written lessons",
                  "30+ daily insights",
                  "20 prompt patterns",
                  "15 AI mistake cards",
                  "Practice sandbox + grader",
                  "Web + Android + iOS",
                  "Lifetime free updates",
                  "14-day refund",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
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
                className="mt-10 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-white font-bold text-base shadow-[0_12px_30px_rgba(255,26,128,0.35)] hover:shadow-[0_16px_40px_rgba(255,26,128,0.5)] transition-all hover:-translate-y-0.5"
                style={{ backgroundImage: gradientBg }}
              >
                Get AIRA — $9.99
                <ArrowRight size={18} />
              </a>
              <p className="mt-4 text-xs text-aira-dim">
                Secure checkout · Lemon Squeezy · APK delivered by email
              </p>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-aira-muted">
            Need to compare?{" "}
            <Link href="/pricing" className="font-semibold text-orange-600 hover:underline">
              See the full Brilliant comparison →
            </Link>
          </p>
        </div>
      </section>

      {/* ─────────────────── FAQ ─────────────────── */}
      <section id="faq" className="relative py-24 px-6 sm:px-8 lg:px-12 bg-orange-50/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Honest answers</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={headingFont}>
              Frequently asked.
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-aira-border overflow-hidden"
                  style={{ boxShadow: open ? "0 6px 20px rgba(255, 102, 0, 0.06)" : "0 2px 6px rgba(255, 102, 0, 0.03)" }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold text-aira-text">{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-orange-500 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-aira-muted leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────── FINAL CTA ─────────────────── */}
      <section className="relative py-24 px-6 sm:px-8 lg:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 50%, rgba(255,102,0,0.10) 0%, rgba(255,26,128,0.08) 50%, transparent 80%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight" style={headingFont}>
            Your first lesson takes <span style={gradientText}>5 minutes</span>.
          </h2>
          <p className="mt-5 text-lg text-aira-muted">
            No signup needed to start. Browse 62 lessons. Try the sandbox. Then decide.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-[0_12px_30px_rgba(255,26,128,0.35)] hover:shadow-[0_16px_40px_rgba(255,26,128,0.5)] transition-all hover:-translate-y-0.5"
              style={{ backgroundImage: gradientBg }}
            >
              Start free
              <ArrowRight size={18} />
            </Link>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 border-orange-200 bg-white text-orange-700 hover:bg-orange-50 transition-colors"
            >
              <Smartphone size={18} /> Or get the APK — $9.99
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer className="relative border-t border-aira-border py-12 px-6 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div>
              <Logo size={28} />
              <p className="mt-3 text-sm text-aira-muted">
                Better than Brilliant. <br className="hidden md:inline" />
                Costs less than coffee.
              </p>
            </div>
            <div className="flex justify-center gap-6 text-sm text-aira-muted">
              <Link href="/learn" className="hover:text-aira-text">Lessons</Link>
              <Link href="/sandbox" className="hover:text-aira-text">Sandbox</Link>
              <Link href="/pricing" className="hover:text-aira-text">Pricing</Link>
              <Link href="/privacy" className="hover:text-aira-text">Privacy</Link>
              <Link href="/terms" className="hover:text-aira-text">Terms</Link>
            </div>
            <div className="md:text-right text-sm text-aira-dim">
              AIRA © 2026 · Made in Turkey · By a human who thinks with AI
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
