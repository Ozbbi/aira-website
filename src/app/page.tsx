"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Brain,
  BookOpen,
  Infinity as InfinityIcon,
  MessageSquare,
  Search,
  Zap,
  Wrench,
  Code2,
  PenLine,
  Sparkles,
} from "lucide-react";

const headingFont = {
  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
};

const gradientText = {
  backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const gradientBg = "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mailto fallback — no third-party integration wired yet.
    window.location.href = `mailto:hello@airamentor.com?subject=Early%20Access&body=Please%20add%20me%20to%20the%20early%20access%20list:%20${encodeURIComponent(email)}`;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "When does AIRA launch?",
      a: "Soon. We're putting the final polish on the experience. Sign up below to be the first to know — early signups get founder pricing locked in.",
    },
    {
      q: "Will it be on web or mobile?",
      a: "Both. Web launches first, mobile follows shortly after. One purchase covers both — your account syncs across all your devices.",
    },
    {
      q: "Why $9.99 lifetime instead of subscription?",
      a: "Because AI literacy isn't a recurring problem. You learn it once, you keep it forever. Subscriptions punish loyal users. AIRA doesn't.",
    },
    {
      q: "Is this another ChatGPT wrapper?",
      a: "No. AIRA teaches you to use ANY AI — ChatGPT, Claude, Gemini, Perplexity, Cursor, whatever comes next. The skills transfer.",
    },
    {
      q: "Who is this for?",
      a: "Curious people 16+. Students, professionals, creators. Not technical. Slightly behind on AI, want a guide they can trust.",
    },
    {
      q: "Who built AIRA?",
      a: "An indie maker who got tired of bad AI tutorials. No VC. No ads. Just one builder shipping real work.",
    },
  ];

  return (
    <main className="relative w-full overflow-x-hidden bg-aira-bg text-aira-text">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-aira-bg/70 border-b border-aira-border/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <a href="#top" className="font-bold tracking-tight text-lg" style={headingFont}>
            AIRA
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-aira-muted">
            <a href="#how" className="hover:text-aira-text transition">How it works</a>
            <a href="#learn" className="hover:text-aira-text transition">Lessons</a>
            <a href="#pricing" className="hover:text-aira-text transition">Pricing</a>
            <a href="#faq" className="hover:text-aira-text transition">FAQ</a>
          </div>
          <a
            href="#signup"
            className="text-sm px-4 py-2 rounded-full text-white font-medium shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition"
            style={{ backgroundImage: gradientBg }}
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative pt-40 pb-28 px-6 sm:px-8 lg:px-12">
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 35%, transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aira-card/60 border border-aira-border text-[11px] tracking-[0.18em] uppercase text-aira-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            AIRA · Launching Soon
          </div>

          <h1
            className="mt-7 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
            style={{ ...headingFont, ...gradientText }}
          >
            Think with AI.
            <br />
            Not against it.
          </h1>

          <p className="mt-7 text-lg sm:text-xl md:text-2xl text-aira-text/90 max-w-3xl mx-auto leading-relaxed">
            The AI literacy app that turns you from someone who uses AI into someone who masters it.
          </p>

          <p className="mt-4 text-sm sm:text-base text-aira-muted max-w-2xl mx-auto">
            62 lessons. Infinite AI-generated content. Research-backed by Anthropic, OpenAI, and DeepLearning.AI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#signup"
              className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:shadow-[0_0_45px_rgba(236,72,153,0.6)] transition"
              style={{ backgroundImage: gradientBg }}
            >
              <span className="absolute inset-0 rounded-full opacity-50 blur-xl -z-10" style={{ backgroundImage: gradientBg }} />
              Get early access
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-aira-border text-aira-text hover:bg-aira-card/60 transition"
            >
              How it works
            </a>
          </div>

          <p className="mt-6 text-xs sm:text-sm text-aira-dim">
            Launching soon on web and mobile · $9.99 lifetime · One payment, yours forever
          </p>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-6 sm:px-8 lg:px-12 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-aira-dim mb-5">Built on research from</p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {["Anthropic", "OpenAI", "DeepLearning.AI", "Google Research"].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full bg-aira-card/60 border border-aira-border text-sm text-aira-muted"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section id="how" className="px-6 sm:px-8 lg:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>
              How AIRA works
            </h2>
            <p className="mt-4 text-lg text-aira-muted">Three minutes to understand why this is different.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Brain,
                title: "Start with how AI thinks",
                body:
                  "Most AI tutorials teach you tricks. AIRA teaches you the underlying mental model — why specificity beats creativity, when AI hallucinates, what makes a prompt actually work.",
              },
              {
                Icon: BookOpen,
                title: "Walk a structured path",
                body:
                  "62 lessons across 6 categories. A 90-day journey from foundation to creator. 30 minutes a day. No fluff, no filler — every lesson teaches one new move.",
              },
              {
                Icon: InfinityIcon,
                title: "Never run out of lessons",
                body:
                  "After the curriculum, AIRA generates new lessons forever — adapted to your weak spots, updated as AI evolves. Your library grows with you. One purchase. Lifetime access.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl bg-aira-card border border-aira-border p-7 hover:border-aira-glow/40 transition"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundImage: gradientBg }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={headingFont}>{title}</h3>
                <p className="text-aira-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center italic text-aira-muted">
            AIRA isn't another ChatGPT wrapper. It's the literacy layer beneath all of them.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section id="learn" className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>
              What you'll learn
            </h2>
            <p className="mt-4 text-lg text-aira-muted">62 lessons. 6 categories. Every lesson teaches one specific move.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                Icon: MessageSquare,
                tag: "PROMPT CRAFT",
                title: "Write prompts that actually work",
                body: "12 lessons covering specificity, context, role prompting, few-shot, chain prompts, and the follow-up move pros use every day.",
              },
              {
                Icon: Search,
                tag: "CRITICAL THINKING WITH AI",
                title: "Spot bad answers. Verify like a pro.",
                body: "10 lessons on hallucinations, AI bias, citation checks, and building your AI bullshit detector.",
              },
              {
                Icon: Zap,
                tag: "POWER USER MOVES",
                title: "Chain of thought, role prompting, few-shot",
                body: "10 advanced techniques from Anthropic and OpenAI's official guides. Templates you'll use weekly.",
              },
              {
                Icon: Wrench,
                tag: "AI TOOLS MASTERY",
                title: "ChatGPT vs Claude vs Gemini",
                body: "8 lessons comparing major AIs. Plus Perplexity, Cursor, ElevenLabs, Midjourney — the honest take on which tool for which job.",
              },
              {
                Icon: Code2,
                tag: "VIBE CODE",
                title: "Build real things by talking to AI",
                body: "12 lessons on Claude Code, Cursor, Copilot. Build a chat app, deploy to Vercel, ship a side project — even if you've never coded.",
              },
              {
                Icon: PenLine,
                tag: "CREATE WITH AI",
                title: "Write, research, ship without sounding like AI",
                body: "10 lessons on writing in your voice, research workflows, ethics, and shipping real creative projects.",
              },
            ].map(({ Icon, tag, title, body }) => (
              <div
                key={tag}
                className="rounded-2xl bg-aira-card border border-aira-border p-7 hover:border-aira-glow/40 transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundImage: gradientBg }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-aira-dim">{tag}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={headingFont}>{title}</h3>
                <p className="text-aira-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90-DAY JOURNEY */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>
              The 90-Day Journey
            </h2>
            <p className="mt-4 text-lg text-aira-muted">30 minutes a day. Real skills. Real results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                phase: "Phase 1 — Days 1–30",
                title: "THE FOUNDATION",
                body: "Understand how AI thinks. Build the mindset that separates the curious from the confused.",
              },
              {
                phase: "Phase 2 — Days 31–60",
                title: "THE PRACTITIONER",
                body: "Use AI for real work. Build your toolkit. The techniques pros use without telling anyone.",
              },
              {
                phase: "Phase 3 — Days 61–90",
                title: "THE CREATOR",
                body: "Build things. Create with AI. Lead others. By day 90, you'll think differently.",
              },
            ].map(({ phase, title, body }) => (
              <div key={title} className="rounded-2xl bg-aira-card border border-aira-border p-7">
                <p className="text-xs tracking-[0.2em] uppercase text-aira-dim mb-2">{phase}</p>
                <h3 className="text-2xl font-bold mb-3" style={{ ...headingFont, ...gradientText }}>{title}</h3>
                <p className="text-aira-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFINITE LESSONS */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aira-card/60 border border-aira-border text-[11px] tracking-[0.18em] uppercase text-aira-muted mb-6">
            <Sparkles className="w-3 h-3" /> Forever Updated
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>
            When 62 isn't enough
          </h2>
          <p className="mt-4 text-lg text-aira-muted">AIRA generates new lessons forever.</p>
          <p className="mt-8 text-aira-text/90 leading-relaxed max-w-3xl mx-auto">
            Most learning apps end. AIRA doesn't. After the structured curriculum, AIRA continues to generate
            new lessons in your weak areas, on emerging AI tools, on edge cases the textbooks miss. Your library
            grows with you.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Personalized", body: "Lessons adapted to where you struggle" },
              { title: "Always Fresh", body: "New techniques as AI evolves" },
              { title: "Forever Yours", body: "All future content included in your one purchase" },
            ].map((c) => (
              <div key={c.title} className="rounded-xl bg-aira-card border border-aira-border p-5">
                <h4 className="font-semibold mb-1" style={headingFont}>{c.title}</h4>
                <p className="text-sm text-aira-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AIRA */}
      <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>Why AIRA?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "RESEARCH-BACKED",
                body: "Every lesson traces to real sources: Anthropic's prompt engineering documentation, OpenAI's guides, Lee Boonstra's whitepaper, DeepLearning.AI courses. No made-up tricks.",
              },
              {
                title: "INDIE BUILT",
                body: "One maker. No VC. No ads. No tracking. Just one indie shipping real work.",
              },
              {
                title: "ONE PAYMENT, FOREVER",
                body: "$9.99 lifetime. Not $9.99/month. Not $99/year. One payment. All 62 lessons. All future content. No subscription anywhere.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl bg-aira-card border border-aira-border p-7">
                <h3 className="text-sm tracking-[0.2em] mb-3" style={{ ...headingFont, ...gradientText }}>{c.title}</h3>
                <p className="text-aira-muted leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>Pricing</h2>
          <p className="mt-4 text-lg text-aira-muted">Simple. Honest. Forever.</p>

          <div className="mt-12 rounded-3xl bg-aira-card border border-aira-border p-8 sm:p-10 text-left relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ backgroundImage: gradientBg }}
            />
            <p className="text-xs tracking-[0.25em] uppercase text-aira-dim">AIRA — Lifetime Access</p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-bold" style={{ ...headingFont, ...gradientText }}>$9.99</span>
              <span className="text-aira-dim line-through text-lg">$29.99</span>
            </div>
            <p className="mt-2 text-aira-muted">One-time payment. Lifetime access. All future content.</p>

            <ul className="mt-8 space-y-3">
              {[
                "All 6 categories — 62 lessons",
                "Full 90-day Journey",
                "Infinite AI-generated lessons",
                "All daily insights, prompt patterns, quick wins",
                "Future content updates free forever",
                "No subscriptions. Ever.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundImage: gradientBg }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-aira-text/90">{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="#signup"
              className="mt-9 inline-flex w-full items-center justify-center px-7 py-3.5 rounded-full text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_45px_rgba(236,72,153,0.55)] transition"
              style={{ backgroundImage: gradientBg }}
            >
              Get early access
            </a>
            <p className="mt-4 text-center text-sm text-aira-dim">Launching soon on web and mobile</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center" style={headingFont}>
            Common questions
          </h2>

          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="rounded-xl bg-aira-card border border-aira-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-aira-border/30 transition"
                  >
                    <span className="font-medium pr-4">{f.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-aira-muted transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 -mt-1 text-aira-muted leading-relaxed">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section id="signup" className="px-6 sm:px-8 lg:px-12 py-24 border-t border-aira-border/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={headingFont}>Get early access</h2>
          <p className="mt-4 text-lg text-aira-muted">
            Be the first to know when AIRA launches. Founder pricing locks in for everyone on the early list.
          </p>

          <form onSubmit={onSubscribe} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-aira-card border border-aira-border text-aira-text placeholder:text-aira-dim focus:outline-none focus:border-aira-glow/60 transition"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full text-white font-semibold shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] transition"
              style={{ backgroundImage: gradientBg }}
            >
              Notify me
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-sm text-emerald-400">Thanks! Your email client just opened — send the message to confirm.</p>
          )}
          <p className="mt-5 text-sm text-aira-dim">No spam. One email when we launch. That's it.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 sm:px-8 lg:px-12 py-14 border-t border-aira-border/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg tracking-tight" style={headingFont}>AIRA</p>
            <p className="text-sm text-aira-muted mt-1">Think with AI. Not against it.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-aira-muted">
            <a href="/privacy" className="hover:text-aira-text transition">Privacy</a>
            <a href="/terms" className="hover:text-aira-text transition">Terms</a>
            <a href="mailto:hello@airamentor.com" className="hover:text-aira-text transition">Contact</a>
          </div>
          <p className="text-xs text-aira-dim">© 2026 Boramir Apps. Built with care.</p>
        </div>
      </footer>
    </main>
  );
}
