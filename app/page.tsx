"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════
   AIRA MENTOR — Brain.fm-grade AI study platform
   Pure code visuals: animated orb, flowing gradients, zero images
   Payment: Lemon Squeezy
   ════════════════════════════════════════════════════════════════ */

const CHECKOUT_URL =
  "https://airamentor.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const C = {
  void: "#000004",
  deep: "#03030A",
  base: "#06060F",
  elev: "#0B0B18",
  surface: "rgba(255,255,255,0.04)",
  fg: "#F2F2FA",
  muted: "#9A9AB5",
  faint: "#5A5A75",
  blue: "#5B7CFA",
  indigo: "#7B5CFF",
  violet: "#A855F7",
  cyan: "#22D3EE",
  pink: "#F472D0",
  green: "#34F5C5",
  amber: "#FBBF24",
  border: "rgba(255,255,255,0.07)",
  ease: "cubic-bezier(0.16,1,0.3,1)",
};

/* ─────────── reveal-on-scroll ─────────── */
function useReveal() {
  const [seen, setSeen] = useState<{ [k: string]: boolean }>({});
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) =>
            e.isIntersecting &&
            setSeen((p) => ({ ...p, [(e.target as HTMLElement).dataset.k as string]: true }))
        ),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-k]").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);
  return seen;
}

/* ─────────── scroll progress for parallax ─────────── */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

/* ════════════════════════════════════════════════════════════════
   THE ORB — Brain.fm-style hero centerpiece (pure SVG + CSS)
   Layered rotating gradient rings + pulsing core + orbiting nodes
   ════════════════════════════════════════════════════════════════ */
function NeuralOrb() {
  return (
    <div
      style={{
        position: "relative",
        width: "min(560px,90vw)",
        height: "min(560px,90vw)",
        margin: "0 auto",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {/* ambient glow behind orb */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          background: `radial-gradient(circle at 50% 50%, ${C.indigo}33, ${C.blue}11 40%, transparent 65%)`,
          filter: "blur(40px)",
          animation: "breathe 8s ease-in-out infinite",
        }}
      />
      <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="core" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="25%" stopColor={C.cyan} stopOpacity="0.8" />
            <stop offset="55%" stopColor={C.indigo} stopOpacity="0.7" />
            <stop offset="100%" stopColor={C.violet} stopOpacity="0.1" />
          </radialGradient>
          <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.cyan} />
            <stop offset="50%" stopColor={C.blue} />
            <stop offset="100%" stopColor={C.violet} />
          </linearGradient>
          <linearGradient id="ring2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={C.pink} />
            <stop offset="50%" stopColor={C.violet} />
            <stop offset="100%" stopColor={C.blue} />
          </linearGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="1.2" /></filter>
        </defs>

        {/* rotating outer rings */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin 28s linear infinite" }}>
          <ellipse cx="200" cy="200" rx="180" ry="70" fill="none" stroke="url(#ring1)" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="200" cy="200" rx="160" ry="150" fill="none" stroke="url(#ring2)" strokeWidth="1" opacity="0.3" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spinRev 34s linear infinite" }}>
          <ellipse cx="200" cy="200" rx="70" ry="180" fill="none" stroke="url(#ring2)" strokeWidth="1.5" opacity="0.45" />
          <ellipse cx="200" cy="200" rx="175" ry="120" fill="none" stroke="url(#ring1)" strokeWidth="1" opacity="0.25" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spin 44s linear infinite", transform: "rotate(45deg)" }}>
          <ellipse cx="200" cy="200" rx="185" ry="90" fill="none" stroke="url(#ring1)" strokeWidth="0.8" opacity="0.3" />
        </g>

        {/* glowing core */}
        <circle cx="200" cy="185" r="95" fill="url(#core)" style={{ animation: "pulseCore 6s ease-in-out infinite", transformOrigin: "200px 185px" }} filter="url(#soft)" />
        <circle cx="200" cy="185" r="60" fill="url(#core)" opacity="0.8" style={{ animation: "pulseCore 4s ease-in-out infinite reverse", transformOrigin: "200px 185px" }} />

        {/* orbiting nodes */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin 20s linear infinite" }}>
          <circle cx="380" cy="200" r="4" fill={C.cyan} />
          <circle cx="20" cy="200" r="3" fill={C.pink} />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spinRev 26s linear infinite" }}>
          <circle cx="200" cy="20" r="3.5" fill={C.violet} />
          <circle cx="200" cy="380" r="2.5" fill={C.blue} />
        </g>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   FLOWING GRADIENT MESH — animated background blobs (CSS only)
   ════════════════════════════════════════════════════════════════ */
function GradientMesh() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden>
      {[
        { c: C.indigo, x: "10%", y: "15%", s: 600, d: "22s" },
        { c: C.blue, x: "70%", y: "35%", s: 700, d: "28s" },
        { c: C.violet, x: "30%", y: "70%", s: 550, d: "25s" },
        { c: C.cyan, x: "80%", y: "80%", s: 480, d: "30s" },
      ].map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.s,
            height: b.s,
            borderRadius: "50%",
            background: b.c,
            filter: "blur(110px)",
            opacity: 0.12,
            animation: `drift ${b.d} ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}
      {/* fine grain noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/* ─────────── reusable UI ─────────── */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: C.cyan, textTransform: "uppercase", backdropFilter: "blur(10px)" }}>
      {children}
    </span>
  );
}

function GBtn({ children, big, full, onClick }: { children: React.ReactNode; big?: boolean; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", background: `linear-gradient(135deg,${C.blue},${C.indigo},${C.violet})`, backgroundSize: "200% 200%", color: "#fff", border: "none", padding: big ? "20px 52px" : "14px 34px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: big ? 18 : 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em", boxShadow: h ? `0 0 60px ${C.indigo}66` : `0 0 36px ${C.indigo}33`, transform: h ? "translateY(-2px) scale(1.02)" : "none", animation: "gradShift 4s ease infinite", transition: `all 0.4s ${C.ease}` }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, full, onClick }: { children: React.ReactNode; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.surface : "transparent", color: h ? C.fg : C.muted, border: `1px solid ${h ? "rgba(123,92,255,0.5)" : C.border}`, padding: "14px 34px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: 15, cursor: "pointer", backdropFilter: "blur(10px)", transition: `all 0.3s ${C.ease}` }}>
      {children}
    </button>
  );
}

function GlassCard({ children, k, seen, delay = 0, style = {} }: { children: React.ReactNode; k: string; seen: { [k: string]: boolean }; delay?: number; style?: React.CSSProperties }) {
  const [h, setH] = useState(false);
  const [mx, setMx] = useState({ x: 50, y: 50 });
  return (
    <div data-k={k}
      onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setMx({ x: 50, y: 50 }); }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setMx({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
      style={{
        position: "relative",
        background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${h ? "rgba(123,92,255,0.5)" : "rgba(255,255,255,0.08)"},${h ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.02)"}) border-box`,
        border: "1px solid transparent",
        borderRadius: 20,
        padding: 32,
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        boxShadow: h ? `0 20px 60px rgba(123,92,255,0.18)` : "0 8px 24px rgba(0,0,0,0.4)",
        opacity: seen[k] ? 1 : 0,
        transform: seen[k] ? (h ? "translateY(-6px)" : "translateY(0)") : "translateY(32px)",
        transition: `opacity 0.8s ${C.ease} ${delay}ms, transform 0.6s ${C.ease}, box-shadow 0.4s, background 0.4s`,
        ...style,
      }}>
      {/* spotlight follows mouse */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${mx.x}% ${mx.y}%, rgba(123,92,255,0.1), transparent 50%)`, opacity: h ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function Grad({ children }: { children: React.ReactNode }) {
  return <span style={{ background: `linear-gradient(120deg,${C.cyan},${C.blue},${C.violet},${C.pink})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradShift 6s ease infinite" }}>{children}</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, display: "inline-block", marginBottom: 18 }}>{children}</span>;
}

/* ─────────── post-purchase welcome ─────────── */
function WelcomeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "🎉", title: "Welcome to AIRA Pro", body: "You just unlocked everything — unlimited AI mentoring, all 15 subjects, spaced repetition, and every focus method. Let's get you into flow.", cta: "Show me around" },
    { icon: "🎯", title: "Pick a subject, start a session", body: "Choose from 15 subjects — or type your own. AIRA structures a focused study session and guides you with Socratic questions.", cta: "Next" },
    { icon: "🧠", title: "Your AI mentor is always on", body: "Stuck? Ask AIRA anytime. It knows what you're studying, never just hands you answers, and adapts to where you struggle.", cta: "Next" },
    { icon: "⚡", title: "Flow state, on demand", body: "Notifications off. Phone away. Distraction-free. AIRA's sessions are built on neuroscience to get you deep — and keep you there.", cta: "Start learning" },
  ];
  const s = steps[step];
  const last = step === steps.length - 1;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,4,0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.4s ease" }}>
      <div style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 48, maxWidth: 480, width: "100%", textAlign: "center", boxShadow: `0 0 100px ${C.indigo}44`, animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ fontSize: 60, marginBottom: 24, animation: "floaty 3s ease-in-out infinite" }}>{s.icon}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>{s.title}</h2>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>{s.body}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === step ? 28 : 8, height: 8, borderRadius: 999, background: i === step ? `linear-gradient(90deg,${C.cyan},${C.indigo})` : C.border, transition: `all 0.4s ${C.ease}` }} />
          ))}
        </div>
        <GBtn full onClick={() => (last ? onClose() : setStep(step + 1))}>{s.cta}</GBtn>
        {!last && <button onClick={onClose} style={{ marginTop: 16, background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer" }}>Skip intro</button>}
      </div>
    </div>
  );
}

/* ─────────── DATA ─────────── */
const SCIENCE = [
  { i: "⚡", t: "Neural Phase Locking", s: "Ultradian Rhythm Research", b: "Structured 25-minute focus intervals align with your brain's natural ultradian rhythms — the same mechanism that makes focus music effective." },
  { i: "🔁", t: "Spaced Repetition", s: "Ebbinghaus Memory Research", b: "The forgetting curve shows 70% information loss within 24 hours. AIRA schedules reviews at the scientifically optimal moment." },
  { i: "✍️", t: "Active Recall", s: "Roediger & Karpicke, 2006", b: "Passive re-reading retains ~10%. Active recall forces retrieval, retaining up to 80%. Built into every session." },
  { i: "🎯", t: "Socratic AI Method", s: "Schwartz et al. Research", b: "Guided discovery creates 2x stronger neural pathways than passive instruction. AIRA asks, then guides you to the answer." },
];
const HOW = [
  { i: "⏱️", c: C.blue, t: "Deep Work Sessions", st: "25 min · 5 min break · Repeat", f: ["Customizable session lengths", "Ambient audio options", "Daily focus hours tracking", "Streak tracking"] },
  { i: "🤖", c: C.violet, t: "AI Study Mentor", st: "24/7 · Personalized · Socratic", f: ["Context-aware guidance", "Socratic questioning", "Finds your weak spots", "Weekly progress insights"] },
  { i: "📚", c: C.cyan, t: "Spaced Review System", st: "Auto-scheduled · Long-term", f: ["SM-2 repetition algorithm", "Automatic concept tagging", "Daily review queue", "Retention analytics"] },
];
const METHODS = [
  { i: "⏱️", t: "Pomodoro Focus Sprints", g: "AIRA automates this", b: "25 minutes deep work, 5 minute break, repeat. After four cycles, a longer break. Matched to your brain's attention cycles so focus feels effortless." },
  { i: "🔁", t: "Spaced Repetition", g: "Auto-scheduled", b: "Review concepts just before you'd forget. Each review pushes the next further out. After five reviews, knowledge becomes effectively permanent." },
  { i: "✍️", t: "Active Recall Testing", g: "Every session", b: "Close the notes. Retrieve from memory. AIRA ends each session with targeted retrieval — the single most effective study technique in research." },
  { i: "🎯", t: "Feynman Technique", g: "How AIRA teaches", b: "Explain it simply, as if to a curious 12-year-old. The gaps in your explanation reveal where understanding breaks down. AIRA guides you through." },
  { i: "🔗", t: "Habit Stacking", g: "AIRA reminds you", b: "Attach studying to a routine you already have. Research shows this raises follow-through by 2–3x over willpower alone." },
  { i: "🪞", t: "Weekly Reflection", g: "AIRA generates this", b: "Every Sunday, AIRA produces your week in review: what you learned, what's shaky, what to prioritize. Reflection lifts retention 20–30%." },
];
const FOCUS_MODES = [
  { i: "🔕", t: "Notifications Off", b: "AIRA's focus mode signals you to silence your phone and close every tab. Deep work demands an undivided mind — we make that the default." },
  { i: "📵", t: "Device-Away Sessions", b: "Some lessons are designed for your phone face-down across the room. AIRA tells you exactly when to step away and think." },
  { i: "🎧", t: "Ambient Soundscapes", b: "Lo-fi, forest, rain, or pure silence. Audio engineered to deepen focus without pulling attention — fades with each session." },
  { i: "🌊", t: "Flow State Tracking", b: "AIRA learns when you focus best — 'your peak is 9am' — and nudges your hardest sessions into your sharpest hours." },
];
const STUDY_TYPES = [
  { i: "💻", t: "Screen-Based Study", color: C.blue, b: "For subjects needing a device: coding, data science, AI tools. AIRA keeps you in one focused window, blocks distractions, structures hands-on practice.", items: ["Coding & Programming", "Data Science", "AI & Prompt Engineering", "Marketing & Growth"] },
  { i: "📖", t: "Device-Free Study", color: C.cyan, b: "For subjects best learned off-screen: math on paper, reading, memorization. AIRA sets the structure, then tells you to put the phone down and think.", items: ["Mathematics", "Philosophy & Logic", "History & Society", "Language learning"] },
];
const SUBJECTS = ["🤖 AI & Prompt Engineering", "💻 Coding & Programming", "📐 Mathematics", "🌍 English & Language", "📊 Data Science", "💼 Business & Strategy", "🧠 Psychology", "💰 Finance & Economics", "⚖️ Law Basics", "🎯 Marketing & Growth", "🧬 Biology & Health", "⚗️ Chemistry", "🔭 Physics", "📜 History & Society", "🎨 Philosophy & Logic"];
const COMPARE: [string, string, string][] = [["Focus support", "✅ Music only", "✅ Sessions + Audio"], ["AI study mentor", "❌", "✅ Always available"], ["Study structure", "❌", "✅ Built-in"], ["Spaced repetition", "❌", "✅ Automatic"], ["Progress analytics", "Basic", "✅ Full dashboard"], ["Device-free guidance", "❌", "✅ Yes"], ["15 study subjects", "❌", "✅ Included"], ["Price", "$7/mo", "$10/mo"]];
const FAQ: [string, string][] = [["How is this different from Brain.fm?", "Brain.fm gives you focus music. AIRA gives you structured focus sessions, an AI study mentor, spaced repetition, and progress tracking — all built on the same neuroscience. Brain.fm is the soundtrack. AIRA is the whole system."], ["What subjects does AIRA cover?", "15 built-in categories from Math to AI to Psychology. But AIRA's mentor works with any topic — just tell it what you're studying and it adapts instantly."], ["How does the AI mentor actually work?", "It uses the Socratic method — asking questions that guide you to answers rather than handing them over. It knows what you're studying and adjusts to your progress."], ["Do I need my phone for every lesson?", "No. Many AIRA sessions are device-free — it sets the structure, then tells you to put your phone away. Other subjects need a screen. AIRA tells you which is which."], ["Is there really a free trial?", "Yes. 7 days, full access, no credit card required. If AIRA doesn't change how you study, just don't subscribe."], ["What if I want to cancel?", "Cancel any time in account settings. No penalties, no questions."], ["Does AIRA help with ADHD?", "Structured 25-minute sessions, ambient audio, device-away prompts, and frequent check-ins align with attention research. Many ADHD users say it's the only system that keeps them on track."]];

/* ════════════════════════════════════════════════════════════════
   MAIN
   ════════════════════════════════════════════════════════════════ */
export default function Home() {
  const seen = useReveal();
  const scrollY = useScrollY();
  const [showWelcome, setShowWelcome] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("success") === "true" || p.get("checkout") === "success") setShowWelcome(true);
  }, []);

  const buy = useCallback(() => { window.location.href = CHECKOUT_URL; }, []);
  const reveal = (k: string, d = 0) => ({ "data-k": k, style: { opacity: seen[k] ? 1 : 0, transform: seen[k] ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ${C.ease} ${d}ms, transform 0.8s ${C.ease} ${d}ms` } as React.CSSProperties });
  const H = (e: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em", ...e });

  return (
    <main style={{ background: C.void, minHeight: "100vh", color: C.fg, position: "relative", overflowX: "hidden" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--font-display:'Space Grotesk',sans-serif}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;background:${C.void}}
        ::selection{background:rgba(123,92,255,0.35)}
        button:focus-visible,a:focus-visible{outline:2px solid ${C.cyan};outline-offset:3px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes spinRev{from{transform:rotate(360deg)}to{transform:rotate(0)}}
        @keyframes pulseCore{0%,100%{transform:scale(1);opacity:0.9}50%{transform:scale(1.08);opacity:1}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.12);opacity:1}}
        @keyframes drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-40px,30px) scale(0.95)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 40px rgba(123,92,255,0.2)}50%{box-shadow:0 0 70px rgba(123,92,255,0.4)}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        @keyframes scrollDot{0%{transform:translateY(0);opacity:1}80%{opacity:0}100%{transform:translateY(36px);opacity:0}}
        @media(max-width:768px){
          .nav-links{display:none!important}
          .nav-wrap{padding:0 20px!important}
          .sec{padding:80px 20px!important}
          .hero-h1{font-size:44px!important}
        }
      `}</style>

      <GradientMesh />
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      {/* NAV */}
      <nav className="nav-wrap" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(24px)", background: scrollY > 40 ? "rgba(0,0,4,0.82)" : "rgba(0,0,4,0.3)", borderBottom: `1px solid ${scrollY > 40 ? C.border : "transparent"}`, height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "all 0.4s ease" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 23, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 6s ease infinite" }}>AIRA</span>
        <div className="nav-links" style={{ display: "flex", gap: 34, fontSize: 14, color: C.muted }}>
          {[["How", "how"], ["Science", "science"], ["Methods", "methods"], ["Focus", "focus"], ["Pricing", "pricing"]].map(([l, h]) => (
            <a key={l} href={`#${h}`} style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)} onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{l}</a>
          ))}
        </div>
        <GBtn onClick={buy}>Start free trial</GBtn>
      </nav>

      {/* HERO */}
      <section className="sec" style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 24px 0" }}>
        <div style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: Math.max(0, 1 - scrollY / 500), position: "absolute", top: "8%", left: "50%", marginLeft: "min(-280px,-45vw)", zIndex: 0 }}>
          <NeuralOrb />
        </div>
        <div style={{ position: "relative", zIndex: 1, marginTop: 120 }}>
          <div style={{ marginBottom: 30, ...reveal("hero-pill").style } as React.CSSProperties} data-k="hero-pill"><Pill>◈ AI-Powered Study Mentor</Pill></div>
          <h1 className="hero-h1" style={H({ fontSize: "clamp(44px,8.5vw,84px)", lineHeight: 1.02, marginBottom: 26, maxWidth: 880 })}>Get into <Grad>flow.</Grad><br />Stay there.</h1>
          <p style={{ fontSize: "clamp(17px,3vw,21px)", color: C.muted, maxWidth: 590, lineHeight: 1.7, margin: "0 auto 38px" }}>AIRA Mentor blends neuroscience-backed focus methods with a Socratic AI mentor to get you into deep study — and keep you there.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 38 }}>
            {["⚡ Neural Focus", "🧠 AI Mentor", "🔬 Science-Backed"].map((t) => <span key={t} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 16px", fontSize: 12, color: C.muted, backdropFilter: "blur(10px)" }}>{t}</span>)}
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 26 }}>
            <GBtn big onClick={buy}>Start free trial</GBtn>
            <GhostBtn onClick={() => (window.location.hash = "#how")}>See how it works ↓</GhostBtn>
          </div>
          <p style={{ fontSize: 13, color: C.faint }}>7-day free trial · No credit card · Cancel anytime</p>
        </div>
        <div style={{ position: "absolute", bottom: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 42, border: `2px solid ${C.border}`, borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 4, height: 8, borderRadius: 999, background: C.cyan, animation: "scrollDot 1.8s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("how-h")} style={{ ...reveal("how-h").style, textAlign: "center", marginBottom: 70 }}>
          <Label>How it works</Label>
          <h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Three systems. <Grad>One flow state.</Grad></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
          {HOW.map((p, i) => (
            <GlassCard key={p.t} k={`how-${i}`} seen={seen} delay={i * 120}>
              <div style={{ fontSize: 38, marginBottom: 18 }}>{p.i}</div>
              <h3 style={H({ fontSize: 23, marginBottom: 8 })}>{p.t}</h3>
              <p style={{ fontSize: 12, color: p.c, fontWeight: 700, marginBottom: 22, letterSpacing: "0.05em" }}>{p.st}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {p.f.map((f) => <div key={f} style={{ display: "flex", gap: 9, fontSize: 13.5, color: C.muted }}><span style={{ color: p.c }}>•</span>{f}</div>)}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("sci-h")} style={{ ...reveal("sci-h").style, textAlign: "center", marginBottom: 70 }}>
            <Label>Backed by neuroscience</Label>
            <h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Why AIRA works</h2>
            <p style={{ color: C.muted, marginTop: 18, fontSize: 16 }}>Every feature is built on published research, not guesswork.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>
            {SCIENCE.map((c, i) => (
              <GlassCard key={c.t} k={`sci-${i}`} seen={seen} delay={i * 90}>
                <div style={{ fontSize: 30, marginBottom: 18 }}>{c.i}</div>
                <h3 style={H({ fontSize: 20, marginBottom: 12 })}>{c.t}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 18 }}>{c.b}</p>
                <span style={{ fontSize: 11, color: C.cyan, background: "rgba(34,211,238,0.08)", padding: "5px 11px", borderRadius: 7, fontWeight: 600 }}>Basis: {c.s}</span>
              </GlassCard>
            ))}
          </div>
          <p {...reveal("sci-q")} style={{ ...reveal("sci-q").style, textAlign: "center", marginTop: 52, fontSize: 15, color: C.faint, fontStyle: "italic" }}>Brain.fm gets you into flow with music. AIRA keeps you in flow with science-backed structure + AI mentoring.</p>
        </div>
      </section>

      {/* METHODS */}
      <section id="methods" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("m-h")} style={{ ...reveal("m-h").style, textAlign: "center", marginBottom: 70 }}>
          <Label>The methods</Label>
          <h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Six ways AIRA <Grad>builds focus.</Grad></h2>
          <p style={{ color: C.muted, marginTop: 18, fontSize: 16 }}>Proven study techniques, automated so you actually use them.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 22 }}>
          {METHODS.map((m, i) => (
            <GlassCard key={m.t} k={`m-${i}`} seen={seen} delay={(i % 3) * 90}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{m.i}</div>
              <span style={{ display: "inline-block", background: "rgba(123,92,255,0.14)", color: C.violet, fontSize: 11, fontWeight: 700, padding: "5px 11px", borderRadius: 7, marginBottom: 13 }}>{m.g}</span>
              <h3 style={H({ fontSize: 18, marginBottom: 10 })}>{m.t}</h3>
              <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{m.b}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FOCUS MODES */}
      <section id="focus" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("fm-h")} style={{ ...reveal("fm-h").style, textAlign: "center", marginBottom: 70 }}>
            <Label>Distraction-free by design</Label>
            <h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Phone away. <Grad>Mind present.</Grad></h2>
            <p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 580, margin: "18px auto 0", lineHeight: 1.7 }}>Real focus means no notifications, no second screen, no pull to scroll. AIRA makes distraction-free the default — not something you fight for.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
            {FOCUS_MODES.map((m, i) => (
              <GlassCard key={m.t} k={`fm-${i}`} seen={seen} delay={i * 90}>
                <div style={{ fontSize: 32, marginBottom: 18 }}>{m.i}</div>
                <h3 style={H({ fontSize: 18, marginBottom: 10 })}>{m.t}</h3>
                <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{m.b}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* STUDY TYPES */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("st-h")} style={{ ...reveal("st-h").style, textAlign: "center", marginBottom: 70 }}>
          <Label>Two ways to study</Label>
          <h2 style={H({ fontSize: "clamp(32px,4.6vw,48px)" })}>Screen when you need it. <Grad>Paper when you don't.</Grad></h2>
          <p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 580, margin: "18px auto 0", lineHeight: 1.7 }}>Not every subject belongs on a screen. AIRA knows the difference and tells you when to look at your phone — and when to put it away.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 22 }}>
          {STUDY_TYPES.map((s, i) => (
            <GlassCard key={s.t} k={`st-${i}`} seen={seen} delay={i * 120} style={{ padding: 40 }}>
              <div style={{ fontSize: 42, marginBottom: 18 }}>{s.i}</div>
              <h3 style={H({ fontSize: 24, marginBottom: 12 })}>{s.t}</h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>{s.b}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.items.map((it) => <span key={it} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 14px", fontSize: 12, color: s.color }}>{it}</span>)}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* VS BRAIN.FM */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div {...reveal("vs-h")} style={{ ...reveal("vs-h").style, textAlign: "center", marginBottom: 52 }}>
            <Label>How we compare</Label>
            <h2 style={H({ fontSize: "clamp(30px,4.6vw,44px)" })}>Brain.fm gets you focused.<br /><Grad>AIRA keeps you learning.</Grad></h2>
          </div>
          <div {...reveal("vs-t")} style={{ ...reveal("vs-t").style, background: C.elev, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden", backdropFilter: "blur(20px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${C.border}` }}>
              {["Feature", "Brain.fm", "AIRA"].map((t, i) => <div key={t} style={{ padding: "16px 22px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: i === 2 ? C.violet : C.muted, textAlign: i === 0 ? "left" : "center" }}>{t}</div>)}
            </div>
            {COMPARE.map((row, i) => (
              <div key={row[0]} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: i < COMPARE.length - 1 ? `1px solid ${C.border}` : "none", background: i === COMPARE.length - 1 ? "rgba(123,92,255,0.04)" : "transparent" }}>
                <div style={{ padding: "15px 22px", fontSize: 14, color: C.fg, fontWeight: i === COMPARE.length - 1 ? 600 : 400 }}>{row[0]}</div>
                <div style={{ padding: "15px 22px", fontSize: 14, textAlign: "center", color: row[1].includes("❌") ? C.faint : C.muted }}>{row[1]}</div>
                <div style={{ padding: "15px 22px", fontSize: 14, textAlign: "center", color: row[2].includes("✅") ? C.green : C.violet, fontWeight: i === COMPARE.length - 1 ? 600 : 400 }}>{row[2]}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 26, fontSize: 14, color: C.muted }}>$3 more per month. A complete learning system instead of music.</p>
          <div style={{ textAlign: "center", marginTop: 32 }}><GBtn onClick={buy}>Try AIRA free for 7 days →</GBtn></div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div {...reveal("subj-h")} style={{ ...reveal("subj-h").style, textAlign: "center", marginBottom: 52 }}>
          <Label>15 subject categories</Label>
          <h2 style={H({ fontSize: "clamp(30px,4.6vw,44px)" })}>Study anything. <Grad>Master it.</Grad></h2>
        </div>
        <div {...reveal("subj-g")} style={{ ...reveal("subj-g").style, display: "flex", flexWrap: "wrap", gap: 11, justifyContent: "center", marginBottom: 32 }}>
          {SUBJECTS.map((s) => (
            <span key={s} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "11px 19px", fontSize: 13, color: C.muted, cursor: "default", backdropFilter: "blur(10px)", transition: `all 0.25s ${C.ease}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(123,92,255,0.5)"; e.currentTarget.style.color = C.fg; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.transform = "none"; }}>{s}</span>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: C.faint }}>Don't see your subject? AIRA adapts to anything — just tell it what you're studying.</p>
      </section>

      {/* PRICING */}
      <section id="pricing" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div {...reveal("p-h")} style={{ ...reveal("p-h").style, textAlign: "center", marginBottom: 70 }}>
            <Label>Pricing</Label>
            <h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>$10/month. <Grad>Everything.</Grad></h2>
            <p style={{ color: C.muted, marginTop: 14 }}>One price. No tiers. No tricks.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
            <GlassCard k="pf" seen={seen} style={{ padding: 40 }}>
              <h3 style={H({ fontSize: 22, marginBottom: 8 })}>Free</h3>
              <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 4 }}>$0</div>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 26 }}>7-day full access trial</p>
              {["AI mentor (trial)", "All study methods", "Focus timer + soundscapes", "Basic progress tracking", "No credit card required"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.muted }}><span style={{ color: C.green }}>✓</span>{f}</div>)}
              <div style={{ marginTop: 26 }}><GhostBtn full onClick={buy}>Start free trial</GhostBtn></div>
            </GlassCard>
            <GlassCard k="pp" seen={seen} delay={100} style={{ padding: 40, animation: "pulseGlow 4s ease-in-out infinite" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${C.blue},${C.violet})`, padding: "6px 22px", borderRadius: "0 0 12px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", zIndex: 2 }}>MOST POPULAR</div>
              <h3 style={H({ fontSize: 22, marginBottom: 8, marginTop: 10 })}>AIRA Pro</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 42, fontWeight: 700, fontFamily: "var(--font-display)" }}>$10</span><span style={{ color: C.muted }}>/month</span></div>
              <p style={{ fontSize: 13, color: C.cyan, marginBottom: 26 }}>or $84/year ($7/mo — save 30%)</p>
              {["Unlimited AI mentor sessions", "All 15 subject categories", "Spaced repetition (auto)", "Full progress analytics", "Weekly AI study report", "Device-free + screen modes", "Focus timer + ambient audio", "Export notes + certificates", "Cancel anytime"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.fg }}><span style={{ color: C.green }}>✓</span>{f}</div>)}
              <div style={{ marginTop: 26 }}><GBtn full onClick={buy}>Start 7-day free trial</GBtn></div>
            </GlassCard>
          </div>
          <p style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: C.faint }}>Secure checkout via Lemon Squeezy · Cancel anytime · Brain.fm costs $84/year for music only. AIRA gives you music + AI mentor + study system for the same price.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 820, margin: "0 auto" }}>
        <div {...reveal("f-h")} style={{ ...reveal("f-h").style, textAlign: "center", marginBottom: 52 }}>
          <Label>Questions</Label>
          <h2 style={H({ fontSize: "clamp(30px,4.6vw,44px)" })}>Common questions</h2>
        </div>
        {FAQ.map((f, i) => (
          <div key={f[0]} {...reveal(`f-${i}`, i * 50)} style={{ ...reveal(`f-${i}`, i * 50).style, borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", color: C.fg }}>
              <span style={{ fontSize: 16, fontWeight: 500 }}>{f[0]}</span>
              <span style={{ fontSize: 22, color: C.violet, transform: openFaq === i ? "rotate(45deg)" : "none", transition: `transform 0.3s ${C.ease}`, flexShrink: 0, marginLeft: 16 }}>+</span>
            </button>
            <div style={{ maxHeight: openFaq === i ? 220 : 0, overflow: "hidden", transition: `max-height 0.45s ${C.ease}` }}>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, paddingBottom: 22 }}>{f[1]}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "170px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "30%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.indigo}22,transparent 65%)`, filter: "blur(60px)", animation: "breathe 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 {...reveal("cta-h")} style={{ ...reveal("cta-h").style, ...H({ fontSize: "clamp(40px,7vw,68px)", marginBottom: 26, lineHeight: 1.04 }) }}>Your mind is capable<br /><Grad>of more.</Grad></h2>
          <p style={{ fontSize: 18, color: C.muted, maxWidth: 490, margin: "0 auto 42px", lineHeight: 1.7 }}>Stop fighting for focus. Start building it. AIRA turns every study session into a structured path to mastery.</p>
          <GBtn big onClick={buy}>Start free trial</GBtn>
          <p style={{ marginTop: 16, fontSize: 13, color: C.faint }}>7 days free · No card · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${C.border}`, padding: "60px 48px 40px", background: C.deep }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 25, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 12 }}>AIRA</div>
              <p style={{ fontSize: 14, color: C.faint, lineHeight: 1.7 }}>Your AI study mentor. Get into flow. Stay there.</p>
            </div>
            {[{ t: "Product", l: ["How it works", "Science", "Methods", "Pricing"] }, { t: "Study", l: ["Focus Sessions", "Spaced Repetition", "AI Mentor", "Device-free"] }, { t: "Company", l: ["About", "Contact", "Privacy", "Terms"] }].map((col) => (
              <div key={col.t}>
                <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 16 }}>{col.t}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.l.map((l) => <a key={l} href="#" style={{ fontSize: 14, color: C.faint, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: C.faint }}>© 2026 AIRA Mentor. Built with care. 🇹🇷</p>
            <p style={{ fontSize: 13, color: C.faint }}>airamentor.com</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
