"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

// AIRA is launching on the App Store. The marketing site is pre-launch:
// no live demo / web app yet. CTAs route to the email signup form below.

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headingFont = {
  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
};

const gradientText = {
  backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-aira-bg text-aira-text">
      {/* =================== NAV =================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-aira-bg/70 border-b border-aira-border/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight" style={{ ...headingFont, ...gradientText }}>
            AIRA
          </a>
          <a
            href="#signup"
            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)" }}
          >
            Notify me
          </a>
        </div>
      </nav>

      {/* =================== HERO =================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-40 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at top, rgba(139,92,246,0.18), transparent 60%)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-aira-purple/40 bg-aira-purple/10 text-[10px] tracking-[0.2em] uppercase text-aira-glow font-semibold">
                ● AIRA · Coming soon to App Store
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[44px] sm:text-[60px] lg:text-[76px] font-bold leading-[1.05] tracking-tight max-w-4xl"
              style={headingFont}
            >
              <span style={gradientText}>Think with AI.</span>
              <br />
              <span style={gradientText}>Not against it.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[18px] md:text-[20px] text-aira-muted max-w-2xl leading-relaxed"
            >
              The AI literacy app that teaches you to use AI like the people who actually know how.
              Research-backed. Built by an indie maker. No ads. No tracking.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#signup"
                className="px-8 py-3 rounded-full font-semibold text-white text-center text-base"
                style={{
                  backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
                  boxShadow: "0 10px 30px rgba(139,92,246,0.35)",
                }}
              >
                Notify me on launch
              </a>
              <a
                href="#whatsinside"
                className="px-8 py-3 rounded-full font-semibold text-aira-text text-center text-base bg-transparent border border-aira-border hover:border-aira-purple/60 transition-colors"
              >
                See what's inside
              </a>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-xs text-aira-dim">
              Launching on App Store — $9.99 lifetime. One payment. Yours forever.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* =================== TRUST BAR =================== */}
      <section className="relative py-12 border-y border-aira-border/40 bg-aira-card/30">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-aira-dim font-semibold">
            Built on research from
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-aira-muted text-base md:text-lg font-semibold">
            <span>Anthropic</span>
            <span className="text-aira-border">·</span>
            <span>OpenAI</span>
            <span className="text-aira-border">·</span>
            <span>DeepLearning.AI</span>
            <span className="text-aira-border">·</span>
            <span>Google (Lee Boonstra prompt engineering whitepaper)</span>
          </div>
        </div>
      </section>

      {/* =================== WHAT YOU'LL LEARN =================== */}
      <section id="whatsinside" className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={headingFont}
            >
              What you'll learn
            </h2>
            <p className="mt-4 text-aira-muted text-lg max-w-2xl mx-auto leading-relaxed">
              62 lessons. 6 categories. Infinite AI-generated content. 90-day structured journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              {
                emoji: "💬",
                tag: "PROMPT CRAFT",
                title: "Write prompts that actually work",
                desc: "12 lessons covering specificity, context, role prompting, few-shot, chain prompts, and the follow-up move pros use every day.",
              },
              {
                emoji: "🧠",
                tag: "CRITICAL THINKING WITH AI",
                title: "Spot bad answers. Verify like a pro.",
                desc: "10 lessons on hallucinations, AI bias, citation checks, and building your AI bullshit detector.",
              },
              {
                emoji: "⚡",
                tag: "POWER USER MOVES",
                title: "Chain of thought, role prompting, few-shot",
                desc: "10 advanced techniques from Anthropic and OpenAI's official guides. Templates you'll use weekly.",
              },
              {
                emoji: "🛠",
                tag: "AI TOOLS MASTERY",
                title: "ChatGPT vs Claude vs Gemini",
                desc: "8 lessons comparing major AIs. Plus Perplexity, Cursor, ElevenLabs, Midjourney — the honest take on which tool for which job.",
              },
              {
                emoji: "💻",
                tag: "VIBE CODE",
                title: "Build real things by talking to AI",
                desc: "12 lessons on Claude Code, Cursor, Copilot. Build a chat app, deploy to Vercel, ship a side project — even if you've never coded.",
              },
              {
                emoji: "✍️",
                tag: "CREATE WITH AI",
                title: "Write, research, ship without sounding like AI",
                desc: "10 lessons on writing in your voice, research workflows, ethics, and shipping real creative projects.",
              },
            ].map((c) => (
              <motion.div
                key={c.tag}
                variants={fadeUp}
                className="rounded-2xl bg-aira-card border border-aira-border border-l-4 border-l-aira-purple p-6 hover:border-l-aira-glow transition-colors"
              >
                <div className="text-3xl mb-3">{c.emoji}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-aira-glow font-bold mb-2">
                  {c.tag}
                </div>
                <h3 className="font-semibold text-aira-text text-lg mb-2" style={headingFont}>
                  {c.title}
                </h3>
                <p className="text-aira-muted text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== 90-DAY JOURNEY =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={headingFont}>
              The 90-Day Journey
            </h2>
            <p className="mt-4 text-aira-muted text-lg">
              30 minutes a day. Real skills. Real results.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                phase: "Phase 1 — Days 1–30",
                title: "THE FOUNDATION",
                desc: "Understand how AI thinks. Build the mindset that separates the curious from the confused.",
              },
              {
                phase: "Phase 2 — Days 31–60",
                title: "THE PRACTITIONER",
                desc: "Use AI for real work. Build your toolkit. The techniques pros use without telling anyone.",
              },
              {
                phase: "Phase 3 — Days 61–90",
                title: "THE CREATOR",
                desc: "Build things. Create with AI. Lead others. By day 90, you'll think differently.",
              },
            ].map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="relative rounded-2xl p-[1.5px]"
                style={{
                  backgroundImage: "linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)",
                }}
              >
                <div className="rounded-2xl bg-aira-card p-7 h-full">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-aira-glow font-bold mb-3">
                    {p.phase}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={headingFont}>
                    {p.title}
                  </h3>
                  <p className="text-aira-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== INFINITE LESSONS =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={headingFont}>
              When 62 isn't enough
            </h2>
            <p className="mt-4 text-aira-muted text-lg">AIRA generates new lessons forever.</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 max-w-3xl mx-auto text-center text-aira-text text-base md:text-lg leading-relaxed"
          >
            Most learning apps end. AIRA doesn't. After the structured curriculum, AIRA continues to
            generate new lessons in your weak areas, on emerging AI tools, on edge cases the textbooks
            miss. Your library grows with you.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
          >
            {[
              { title: "Personalized", desc: "Lessons adapted to where you struggle" },
              { title: "Always Fresh", desc: "New techniques as AI evolves" },
              { title: "Forever Yours", desc: "All future content included in your one purchase" },
            ].map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="rounded-xl bg-aira-card border border-aira-border p-5 text-center"
              >
                <div className="font-semibold text-aira-text text-base mb-1.5" style={headingFont}>
                  {c.title}
                </div>
                <div className="text-aira-muted text-sm leading-relaxed">{c.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== WHY AIRA =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
            style={headingFont}
          >
            Why AIRA?
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "RESEARCH-BACKED",
                desc:
                  "Every lesson traces to real sources: Anthropic's prompt engineering documentation, OpenAI's guides, Lee Boonstra's whitepaper, DeepLearning.AI courses. No made-up tricks.",
              },
              {
                title: "INDIE BUILT",
                desc:
                  "One maker. No VC. No ads. No tracking. Just one indie shipping real work.",
              },
              {
                title: "ONE PAYMENT, FOREVER",
                desc:
                  "$9.99 lifetime. Not $9.99/month. Not $99/year. One payment. All 62 lessons. All future content. No subscription anywhere.",
              },
            ].map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="rounded-2xl bg-aira-card border border-aira-border p-7"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-aira-glow font-bold mb-3">
                  {c.title}
                </div>
                <p className="text-aira-text/90 text-sm md:text-base leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== PRICING =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={headingFont}>
              Pricing
            </h2>
            <p className="mt-4 text-aira-muted text-lg">Simple. Honest. Forever.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16 max-w-xl mx-auto relative rounded-3xl p-[1.5px]"
            style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)" }}
          >
            <div className="rounded-3xl bg-aira-card p-8 md:p-10">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.2em] text-aira-glow font-bold">
                  AIRA — Lifetime Access
                </div>
                <div className="mt-4 flex items-baseline justify-center gap-3">
                  <span className="text-5xl md:text-6xl font-bold" style={{ ...headingFont, ...gradientText }}>
                    $9.99
                  </span>
                  <span className="text-base text-aira-dim line-through">$29.99</span>
                </div>
                <p className="mt-3 text-aira-muted text-sm">
                  One-time payment. Lifetime access. All future content.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "All 6 categories — 62 lessons",
                  "Full 90-day Journey",
                  "Infinite AI-generated lessons",
                  "All daily insights, prompt patterns, quick wins",
                  "Future content updates free forever",
                  "No subscriptions. Ever.",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-aira-glow shrink-0 mt-0.5" />
                    <span className="text-aira-text">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#signup"
                className="mt-8 block w-full text-center py-3 rounded-full font-semibold text-white"
                style={{
                  backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
                  boxShadow: "0 10px 30px rgba(139,92,246,0.35)",
                }}
              >
                Notify me on launch
              </a>

              <p className="mt-4 text-xs text-aira-dim text-center">
                Launches on App Store — coming soon
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================== FAQ =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
            style={headingFont}
          >
            Common questions
          </motion.h2>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "When does AIRA launch?",
                a: "App Store launch is coming soon. Sign up below to be the first to know.",
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
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* =================== EMAIL SIGNUP =================== */}
      <section id="signup" className="relative py-24 md:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.18), transparent 70%)" }}
        />
        <div className="relative max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={headingFont}
          >
            Be first to know
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-aira-muted text-lg"
          >
            We'll email you when AIRA launches on the App Store.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 px-5 py-3 rounded-full bg-aira-card border border-aira-border text-aira-text placeholder:text-aira-dim focus:outline-none focus:border-aira-purple transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3 rounded-full font-semibold text-white"
              style={{
                backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)",
                boxShadow: "0 10px 30px rgba(139,92,246,0.35)",
              }}
            >
              Notify me
            </button>
          </motion.form>

          <p className="mt-5 text-xs text-aira-dim">
            No spam. One email when we launch. That's it.
          </p>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="relative border-t border-aira-border py-12 bg-aira-bg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div>
              <div className="font-bold text-xl" style={{ ...headingFont, ...gradientText }}>
                AIRA
              </div>
              <p className="text-aira-muted text-sm mt-2">Think with AI. Not against it.</p>
            </div>
            <div className="flex justify-center gap-6 text-sm text-aira-muted">
              <a href="/privacy" className="hover:text-aira-text transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-aira-text transition-colors">
                Terms
              </a>
              <a
                href="mailto:ozuysalcaboramir@gmail.com"
                className="hover:text-aira-text transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="text-aira-dim text-xs md:text-right">
              © 2026 Boramir Apps. Built with care.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-aira-card border border-aira-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-aira-text text-base md:text-lg" style={headingFont}>
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`text-aira-muted transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-aira-muted text-sm md:text-base leading-relaxed">{a}</div>
      )}
    </div>
  );
}
