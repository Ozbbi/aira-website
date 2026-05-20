"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Cpu,
  Mail,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const headingFont = {
  fontFamily:
    "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
};

const gradientText: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #FF6600 0%, #FF1A80 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const gradientBg = "linear-gradient(90deg, #FF6600 0%, #FF1A80 100%)";

function Logo({ size = 38 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-3 select-none" aria-label="AIRA">
      <span
        className="grid place-items-center rounded-[10px] text-white font-black shadow-[0_12px_28px_rgba(255,26,128,0.24)]"
        style={{
          width: size,
          height: size,
          backgroundImage: gradientBg,
          fontFamily:
            "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
          letterSpacing: 0,
          fontSize: Math.max(13, size * 0.38),
        }}
      >
        AI
      </span>
      <span
        className="text-xl font-black tracking-normal text-aira-text"
        style={headingFont}
      >
        AIRA
      </span>
    </span>
  );
}

function MentorScene() {
  const lanes = [
    "Ask sharper",
    "Judge answers",
    "Build workflows",
    "Practice prompts",
    "Think with AI",
    "Learn safely",
  ];

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#fffefc_0%,#fff7f0_48%,#fff0f6_100%)]"
    >
      <div className="absolute inset-0 opacity-[0.55] bg-[linear-gradient(rgba(26,26,31,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,31,0.055)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute left-0 right-0 top-[18%] h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent" />
      <div className="absolute left-0 right-0 top-[48%] h-px bg-gradient-to-r from-transparent via-pink-300/70 to-transparent" />
      <div className="absolute left-0 right-0 top-[78%] h-px bg-gradient-to-r from-transparent via-orange-200/70 to-transparent" />
      <div className="absolute inset-x-0 top-24 flex min-w-max animate-[airaMarquee_28s_linear_infinite] gap-3 px-6">
        {[...lanes, ...lanes].map((lane, index) => (
          <span
            key={`${lane}-${index}`}
            className="rounded-full border border-orange-200/80 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-700 shadow-sm backdrop-blur"
          >
            {lane}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-16 flex min-w-max animate-[airaMarqueeReverse_34s_linear_infinite] gap-3 px-6">
        {[...lanes.slice().reverse(), ...lanes.slice().reverse()].map((lane, index) => (
          <span
            key={`${lane}-${index}`}
            className="rounded-full border border-pink-200/80 bg-white/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-pink-700 shadow-sm backdrop-blur"
          >
            {lane}
          </span>
        ))}
      </div>
      <div className="absolute left-[8%] top-[34%] h-28 w-28 rounded-[22px] border border-orange-200/70 bg-white/50 shadow-[0_24px_70px_rgba(255,102,0,0.12)] backdrop-blur-md" />
      <div className="absolute right-[10%] top-[24%] h-36 w-36 rounded-[28px] border border-pink-200/70 bg-white/45 shadow-[0_24px_70px_rgba(255,26,128,0.12)] backdrop-blur-md" />
      <div className="absolute bottom-[14%] left-[26%] h-20 w-20 rounded-[18px] border border-orange-200/70 bg-white/50 shadow-[0_18px_50px_rgba(255,102,0,0.10)] backdrop-blur-md" />
      <style jsx>{`
        @keyframes airaMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes airaMarqueeReverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

const proofPoints = [
  "Generated lesson paths",
  "Prompt practice with feedback",
  "AI workflow training",
  "Private sandbox practice",
];

const pillars = [
  {
    icon: Brain,
    eyebrow: "Mentor",
    title: "AIRA teaches judgment.",
    body: "The product is not another chatbot wrapper. It trains the mental skill behind AI: how to ask, compare, verify, and improve.",
  },
  {
    icon: BookOpen,
    eyebrow: "Lessons",
    title: "Generated learning, guided by structure.",
    body: "We are building a lesson engine that can turn a goal into a clean path: concepts, examples, practice, feedback, and next steps.",
  },
  {
    icon: Workflow,
    eyebrow: "Workflows",
    title: "From prompts to real output.",
    body: "AIRA moves learners beyond clever prompts into repeatable workflows for research, writing, planning, coding, and decision-making.",
  },
];

const buildList = [
  "A premium mobile learning flow with generated lessons",
  "A mentor-style AI literacy curriculum",
  "Practice screens for prompt judgment and iteration",
  "A web launch surface for waitlist, updates, and product story",
  "A Hostinger-ready handoff plan for forms, SEO, and deployment",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setStatus("Enter a real email and AIRA will save your place.");
      return;
    }

    const saved = JSON.parse(
      window.localStorage.getItem("aira-coming-soon") || "[]",
    ) as string[];
    window.localStorage.setItem(
      "aira-coming-soon",
      JSON.stringify(Array.from(new Set([...saved, cleanEmail]))),
    );
    setStatus("You are on the early list. Hostinger capture can wire this to production.");
    setEmail("");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-aira-bg text-aira-text">
      <MentorScene />

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-aira-border bg-white/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" aria-label="AIRA home">
            <Logo size={34} />
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-aira-muted md:flex">
            <a className="transition hover:text-aira-text" href="#built">
              Built
            </a>
            <a className="transition hover:text-aira-text" href="#mentor">
              Mentor
            </a>
            <a className="transition hover:text-aira-text" href="#launch">
              Launch
            </a>
          </div>
          <a
            href="#launch"
            className="hidden items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-[0_12px_28px_rgba(255,26,128,0.26)] transition hover:-translate-y-0.5 sm:inline-flex"
            style={{ backgroundImage: gradientBg }}
          >
            Join waitlist
            <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      <section
        id="top"
        className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 pb-14 pt-28 sm:px-8 lg:px-10"
      >
        <div className="mobile-copy min-w-0 max-w-[calc(100vw-40px)] sm:max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-orange-700 shadow-sm backdrop-blur">
            <Sparkles size={14} />
            Coming soon
          </div>

          <h1
            className="mobile-copy mt-7 max-w-[calc(100vw-40px)] break-words text-[37px] font-black leading-[1.02] tracking-normal text-aira-text sm:max-w-5xl sm:text-[68px] lg:text-[92px] lg:leading-[0.98]"
            style={headingFont}
          >
            <span className="block">
              <span className="block sm:inline">AIRA is </span>
              <span className="block sm:inline">coming soon.</span>
            </span>
            <span className="block" style={gradientText}>
              Your AI mentor
            </span>
            <span className="block" style={gradientText}>
              <span className="block sm:inline">for the </span>
              <span className="block sm:inline">AI-native era.</span>
            </span>
          </h1>

          <p className="mobile-copy mt-7 max-w-[calc(100vw-40px)] text-lg leading-8 text-aira-muted sm:max-w-2xl sm:text-xl">
            AIRA turns AI from a tool you ask into a skill you own. It teaches
            prompt judgment, workflow thinking, generated lessons, and the calm
            habit of checking what AI gives back.
          </p>

          <div className="mobile-copy mt-9 flex max-w-[calc(100vw-40px)] flex-col gap-3 sm:max-w-none sm:flex-row">
            <a
              href="#launch"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-black text-white shadow-[0_18px_38px_rgba(255,26,128,0.28)] transition hover:-translate-y-0.5 sm:w-auto"
              style={{ backgroundImage: gradientBg }}
            >
              Get early access
              <ArrowRight size={18} />
            </a>
            <a
              href="#built"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-orange-200 bg-white/72 px-7 py-4 text-base font-black text-orange-700 shadow-sm backdrop-blur transition hover:bg-orange-50 sm:w-auto"
            >
              See what we built
            </a>
          </div>

          <div className="mobile-copy mt-10 grid max-w-[calc(100vw-40px)] gap-3 sm:max-w-3xl sm:grid-cols-2">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="flex min-w-0 items-start gap-3 rounded-[8px] border border-aira-border bg-white/68 p-4 shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                <span className="min-w-0 text-sm font-semibold leading-6 text-aira-muted">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="built" className="relative bg-white/78 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
              What exists already
            </p>
            <h2
              className="mt-3 text-4xl font-black leading-tight tracking-normal sm:text-5xl"
              style={headingFont}
            >
              We are not teasing a vague idea. We are shaping the learning
              engine.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {buildList.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-aira-border bg-aira-card p-5 shadow-[0_14px_38px_rgba(255,102,0,0.06)]"
                >
                  <div
                    className="mb-5 grid h-11 w-11 place-items-center rounded-[8px] text-sm font-black text-white"
                    style={{ backgroundImage: gradientBg }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-base font-black leading-6 text-aira-text">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[8px] border border-aira-border bg-aira-surface p-6 shadow-[0_18px_52px_rgba(255,26,128,0.08)]">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-12 w-12 place-items-center rounded-[8px] text-white"
                  style={{ backgroundImage: gradientBg }}
                >
                  <Cpu size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-600">
                    Launch thesis
                  </p>
                  <h3 className="text-2xl font-black text-aira-text" style={headingFont}>
                    AI literacy needs a mentor, not a maze.
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-base leading-8 text-aira-muted">
                AIRA should feel like the person beside you who says: ask it
                this way, test that answer, turn this into a workflow, and do
                not believe the shiny sentence until it survives a check.
              </p>
              <div className="mt-6 grid gap-3">
                {["Calm", "Practical", "Private", "Built for real output"].map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center justify-between rounded-[8px] border border-orange-200 bg-white px-4 py-3 text-sm font-black text-aira-text"
                  >
                    <span>{tag}</span>
                    <span className="h-2 w-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mentor" className="relative px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.title}
                  className="rounded-[8px] border border-aira-border bg-white/76 p-6 shadow-[0_16px_44px_rgba(255,102,0,0.07)] backdrop-blur"
                >
                  <div
                    className="mb-6 grid h-12 w-12 place-items-center rounded-[8px] text-white"
                    style={{ backgroundImage: gradientBg }}
                  >
                    <Icon size={24} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">
                    {pillar.eyebrow}
                  </p>
                  <h3
                    className="mt-2 text-2xl font-black leading-tight text-aira-text"
                    style={headingFont}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-aira-muted">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="launch" className="relative bg-aira-text px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-300">
              Early access
            </p>
            <h2
              className="mt-3 text-4xl font-black leading-tight tracking-normal sm:text-5xl"
              style={headingFont}
            >
              Join before the public launch.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              The next job is simple: connect the form in Hostinger, publish the
              coming-soon page, collect early users, then ship the web and
              mobile mentor experience with a clean launch sequence.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                { icon: ShieldCheck, text: "No mascot, no gimmicks, no generic AI hype." },
                { icon: MessageCircle, text: "The story is mentor-first: AIRA helps you think better with AI." },
                { icon: Rocket, text: "Hostinger team can wire capture, SEO, analytics, and final publish." },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="flex items-start gap-3 text-sm font-semibold text-white/78">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[8px] border border-white/12 bg-white/[0.07] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-7"
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-12 w-12 place-items-center rounded-[8px] text-white"
                style={{ backgroundImage: gradientBg }}
              >
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-white">AIRA early list</p>
                <p className="text-sm text-white/58">Preview capture until Hostinger form is wired.</p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-h-14 flex-1 rounded-[8px] border border-white/16 bg-white px-4 text-base font-semibold text-aira-text outline-none transition placeholder:text-aira-dim focus:border-orange-300"
              />
              <button
                type="submit"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[8px] px-6 text-base font-black text-white transition hover:-translate-y-0.5"
                style={{ backgroundImage: gradientBg }}
              >
                Join
                <ArrowRight size={18} />
              </button>
            </div>

            <p className="mt-4 min-h-6 text-sm font-semibold text-orange-200">
              {status || "Coming soon. Early users get the cleanest path first."}
            </p>
          </form>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 639px) {
          .mobile-copy {
            width: 320px;
            max-width: calc(100vw - 40px);
          }
        }
      `}</style>

      <footer className="border-t border-aira-border bg-white px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-aira-muted sm:flex-row sm:items-center sm:justify-between">
          <Logo size={30} />
          <p>AIRA - Your AI mentor for the AI-native era.</p>
        </div>
      </footer>
    </main>
  );
}
