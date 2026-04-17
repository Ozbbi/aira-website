"use client";

import { motion } from "framer-motion";
import {
  Play,
  Brain,
  TrendingUp,
  Check,
  Code,
  BookOpen,
  Shield,
  ArrowRight,
} from "lucide-react";

// Twitter/X + Github icons — lucide removed brand icons in newer versions, so inline SVG.
function Twitter({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function Github({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.98 3.23 9.2 7.7 10.7.56.1.77-.24.77-.54v-1.88c-3.13.68-3.79-1.5-3.79-1.5-.52-1.3-1.26-1.65-1.26-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.17-3.02-.12-.28-.51-1.44.11-3 0 0 .96-.3 3.13 1.15a10.9 10.9 0 0 1 5.7 0c2.17-1.46 3.12-1.15 3.12-1.15.63 1.56.24 2.72.11 3 .73.78 1.17 1.8 1.17 3.02 0 4.32-2.64 5.28-5.15 5.55.41.35.77 1.05.77 2.11v3.13c0 .3.2.65.78.54 4.47-1.5 7.7-5.72 7.7-10.7C23.23 5.46 18.27.5 12 .5Z" />
    </svg>
  );
}
import PhoneMockup from "@/components/PhoneMockup";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headingFont = {
  fontFamily:
    "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
};

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-aira-bg text-aira-text">
      {/* =================== NAV =================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-aira-bg/70 border-b border-aira-border/50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold tracking-tight"
            style={{
              ...headingFont,
              backgroundImage: "linear-gradient(90deg, #A78BFA, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AIRA
          </a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href="#download"
            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{
              backgroundImage: "linear-gradient(90deg, #7C3AED, #4F46E5)",
            }}
          >
            Download
          </motion.a>
        </div>
      </nav>

      {/* =================== SECTION 1: HERO =================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-40 pb-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(124,58,237,0.25), transparent 60%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-aira-purple/40 bg-aira-purple/10 text-aira-glow text-xs font-medium mb-8">
                Think with AI. Not against it.
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.05] tracking-tight max-w-4xl"
              style={headingFont}
            >
              Learn to think with AI.
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #A78BFA, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Not just use it.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-[20px] text-aira-muted max-w-2xl leading-relaxed"
            >
              AIRA teaches you AI skills, prompt engineering, and critical
              thinking — through interactive lessons that actually stick. 5
              minutes a day.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#download"
                className="px-6 py-3 rounded-full font-semibold text-white text-center"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7C3AED, #4F46E5)",
                }}
              >
                Download for iOS
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#download"
                className="px-6 py-3 rounded-full font-semibold text-aira-text border border-aira-purple text-center hover:bg-aira-purple/10 transition-colors"
              >
                Download for Android
              </motion.a>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-6 text-xs text-aira-dim">
              Free • No signup required • 5 lessons/day
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
              style={{ marginBottom: "-80px" }}
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =================== SECTION 2: PROBLEM / SOLUTION =================== */}
      <section className="relative py-24 md:py-32 pt-32 md:pt-40">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center max-w-3xl mx-auto leading-tight"
            style={headingFont}
          >
            Everyone&apos;s talking about AI.
            <br />
            Almost nobody&apos;s learning it right.
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                title: "Watching tutorials",
                desc: "Passive. You forget in a week.",
              },
              {
                title: "Random prompting",
                desc: "No structure. No feedback. No growth.",
              },
              { title: "Ignoring AI", desc: "Not an option in 2026." },
            ].map((p) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5 },
                  },
                }}
                className="rounded-xl bg-aira-card border border-aira-border border-l-4 p-6"
                style={{ borderLeftColor: "#EF4444" }}
              >
                <h3 className="font-semibold text-aira-text text-lg">
                  {p.title}
                </h3>
                <p className="text-aira-muted mt-2 text-sm">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center my-12">
            <div className="h-px bg-aira-border flex-1 max-w-[200px]" />
            <div className="mx-4 w-10 h-10 rounded-full border border-aira-border flex items-center justify-center text-aira-glow">
              <ArrowRight size={18} />
            </div>
            <div className="h-px bg-aira-border flex-1 max-w-[200px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl p-[1.5px] mx-auto max-w-3xl"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #7C3AED, #EC4899, #4F46E5)",
            }}
          >
            <div className="rounded-2xl bg-aira-card p-8 md:p-10 text-center">
              <p className="text-lg md:text-xl text-aira-text leading-relaxed">
                AIRA gives you a structured path from complete beginner to AI
                power user.{" "}
                <span className="text-aira-glow font-semibold">
                  5 minutes a day. Real skills. Real feedback.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================== SECTION 3: HOW IT WORKS =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
            style={headingFont}
          >
            How AIRA works
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
          >
            {[
              {
                n: 1,
                icon: Play,
                title: "Open. Start a lesson.",
                desc: "No signup. No setup. Just tap and learn.",
              },
              {
                n: 2,
                icon: Brain,
                title: "Learn. Answer. Get feedback.",
                desc: "Every answer gets personalized feedback from AIRA, your AI mentor who actually explains why.",
              },
              {
                n: 3,
                icon: TrendingUp,
                title: "Level up. Build streaks.",
                desc: "Track your XP, maintain your streak, unlock advanced topics. Get better every single day.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center md:items-start md:text-left"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #7C3AED, #4F46E5)",
                      }}
                    >
                      {s.n}
                    </div>
                    <Icon size={22} className="text-aira-glow" />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={headingFont}
                  >
                    {s.title}
                  </h3>
                  <p className="text-aira-muted text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =================== SECTION 4: TOPICS =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center max-w-4xl mx-auto leading-tight"
            style={headingFont}
          >
            From &quot;what is a prompt&quot; to &quot;I built this with AI&quot;
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {[
              {
                emoji: "✨",
                name: "AI Foundations",
                desc: "How to think with AI, not just type at it",
              },
              {
                emoji: "🧠",
                name: "Critical Thinking",
                desc: "Know when AI is wrong. Know when to question.",
              },
              {
                emoji: "⚡",
                name: "Practical Power",
                desc: "Chain of thought, role prompting, follow-up mastery",
              },
              {
                emoji: "🛠️",
                name: "Tools & Taste",
                desc: "ChatGPT vs Claude vs Gemini — honest, real comparisons",
              },
              {
                emoji: "💻",
                name: "Creating with AI",
                desc: "Go from idea to working thing. Weekend projects, prompt libraries.",
              },
            ].map((t) => (
              <motion.div
                key={t.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
                className="rounded-xl bg-aira-card border border-aira-border border-l-4 border-l-aira-purple p-5 hover:bg-aira-surface transition-colors"
              >
                <div className="text-2xl mb-3">{t.emoji}</div>
                <h3
                  className="font-semibold text-aira-text mb-1.5"
                  style={headingFont}
                >
                  {t.name}
                </h3>
                <p className="text-xs text-aira-muted leading-relaxed">
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =================== SECTION 5: AIRA CHARACTER =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
            style={headingFont}
          >
            Meet AIRA — your AI mentor
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full"
                style={{
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle at 30% 30%, #A78BFA, #7C3AED 50%, #4F46E5 100%)",
                  boxShadow:
                    "0 0 80px #7C3AED, 0 0 120px rgba(124,58,237,0.4)",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                style={headingFont}
              >
                AIRA isn&apos;t a mascot. She&apos;s a mentor.
              </h3>
              <p className="text-aira-muted leading-relaxed mb-6">
                She introduces every lesson. She gives you feedback. She
                remembers your streak. She tells you when you&apos;re ready
                for harder topics — and when to slow down.
              </p>
              <div className="rounded-xl bg-aira-card border border-aira-border border-l-4 border-l-aira-purple p-5">
                <div className="text-[10px] uppercase tracking-wider text-aira-glow font-bold mb-1.5">
                  AIRA
                </div>
                <p className="text-aira-text text-sm leading-relaxed">
                  Quick honest moment — this is the kind of question AI gets
                  wrong a lot. Let&apos;s see why.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================== SECTION 6: PRICING =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
            style={headingFont}
          >
            Simple. Fair. No tricks.
          </motion.h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-aira-card border border-aira-border p-8"
            >
              <h3 className="text-xl font-bold mb-2" style={headingFont}>
                Free — forever
              </h3>
              <p className="text-aira-dim text-sm mb-6">
                Get started. No credit card.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "5 lessons/day",
                  "3 learning tracks",
                  "XP & streaks",
                  "AIRA feedback",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-aira-glow shrink-0" />
                    <span className="text-aira-text">{f}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#download"
                className="block w-full text-center py-3 rounded-full font-semibold border border-aira-purple text-aira-text hover:bg-aira-purple/10 transition-colors"
              >
                Start Free
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-2xl p-[1.5px]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #7C3AED, #EC4899, #4F46E5)",
              }}
            >
              <div className="rounded-2xl bg-aira-card p-8 relative">
                <div
                  className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #7C3AED, #EC4899)",
                  }}
                >
                  Recommended
                </div>
                <h3 className="text-xl font-bold mb-2" style={headingFont}>
                  $9.99 — one time
                </h3>
                <p className="text-aira-dim text-sm mb-6">
                  Not a subscription. Pay once, yours forever.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited lessons",
                    "All 5 learning tracks",
                    "Advanced AI topics",
                    "Priority AIRA feedback",
                    "Support an indie builder",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Check
                        size={16}
                        className="text-aira-glow shrink-0"
                      />
                      <span className="text-aira-text">{f}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  id="get-pro-btn"
                  // Web buyers hit Lemon Squeezy directly — without a logged-in
                  // userId we let Lemon Squeezy collect the email, then the
                  // webhook falls back to matching that email against our users
                  // on the backend. Set NEXT_PUBLIC_LEMON_SQUEEZY_URL at build
                  // time; if unset, we fall back to the mobile-app CTA.
                  href={
                    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL ?? "#download"
                  }
                  target={
                    process.env.NEXT_PUBLIC_LEMON_SQUEEZY_URL
                      ? "_blank"
                      : undefined
                  }
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-full font-semibold text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #7C3AED, #4F46E5)",
                  }}
                >
                  Get Pro
                </motion.a>
                <p className="text-xs text-aira-dim text-center mt-4">
                  Powered by Lemon Squeezy. Secure checkout.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================== SECTION 7: TRUST =================== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="max-w-2xl mx-auto space-y-5"
          >
            {[
              {
                icon: Code,
                text: "Built by a solo developer who uses AI every day",
              },
              {
                icon: BookOpen,
                text: "15 hand-written lessons (not AI-generated content about AI — ironic, right?)",
              },
              {
                icon: Shield,
                text: "No tracking. No ads. No data selling. Just learning.",
              },
            ].map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-aira-card border border-aira-border flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-aira-glow" />
                  </div>
                  <p className="text-aira-text text-base md:text-lg leading-relaxed pt-1">
                    {t.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 max-w-2xl mx-auto flex items-start gap-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full shrink-0"
              style={{
                width: 56,
                height: 56,
                background:
                  "radial-gradient(circle at 30% 30%, #A78BFA, #7C3AED 50%, #4F46E5 100%)",
                boxShadow: "0 0 30px rgba(124,58,237,0.6)",
              }}
            />
            <div className="flex-1 rounded-xl bg-aira-card border border-aira-border border-l-4 border-l-aira-purple p-5">
              <div className="text-[10px] uppercase tracking-wider text-aira-glow font-bold mb-1.5">
                AIRA
              </div>
              <p className="text-aira-text text-sm leading-relaxed">
                I don&apos;t have 10,000 reviews yet. But every lesson was
                written by someone who genuinely wants you to learn. Give me
                5 minutes. I&apos;ll prove it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================== SECTION 8: FINAL CTA =================== */}
      <section
        id="download"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.3))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.2), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight"
            style={headingFont}
          >
            Your first lesson takes 5 minutes.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-aira-muted"
          >
            No signup. No credit card. Just start.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#"
              className="px-8 py-4 rounded-full text-lg font-semibold text-white"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #7C3AED, #4F46E5)",
                boxShadow: "0 10px 40px rgba(124,58,237,0.4)",
              }}
            >
              Download AIRA
            </motion.a>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                disabled
                className="px-6 py-3 rounded-full text-sm font-medium bg-aira-card border border-aira-border text-aira-dim cursor-not-allowed"
              >
                App Store
              </button>
              <button
                disabled
                className="px-6 py-3 rounded-full text-sm font-medium bg-aira-card border border-aira-border text-aira-dim cursor-not-allowed"
              >
                Google Play
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================== SECTION 9: FOOTER =================== */}
      <footer className="relative border-t border-aira-border py-12 bg-aira-bg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div
              className="font-bold text-lg"
              style={{
                ...headingFont,
                backgroundImage:
                  "linear-gradient(90deg, #A78BFA, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AIRA © 2026
            </div>
            <div className="flex justify-center gap-6 text-sm text-aira-muted">
              <a
                href="/privacy"
                className="hover:text-aira-text transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="hover:text-aira-text transition-colors"
              >
                Terms
              </a>
              <a
                href="mailto:ozuysalcaboramir@gmail.com"
                className="hover:text-aira-text transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex md:justify-end justify-center gap-4">
              <a
                href="https://twitter.com/boramir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-aira-card border border-aira-border flex items-center justify-center text-aira-muted hover:text-aira-glow transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://github.com/boramir"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-aira-card border border-aira-border flex items-center justify-center text-aira-muted hover:text-aira-glow transition-colors"
                aria-label="Github"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-aira-dim">
            Made with 💜 by a human who thinks with AI
          </div>
        </div>
      </footer>
    </main>
  );
}
