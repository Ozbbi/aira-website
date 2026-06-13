"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════
   AIRA MENTOR — AI study platform · 120fps · zero images
   Custom brain logo · technique picker · focus timer · LemonSqueezy
   ════════════════════════════════════════════════════════════════ */

const CHECKOUT_URL =
  "https://airamentor.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const C = {
  void: "#000004", deep: "#03030A", base: "#06060F", elev: "#0B0B18",
  surface: "rgba(255,255,255,0.04)", fg: "#F2F2FA", muted: "#9A9AB5", faint: "#5A5A75",
  blue: "#5B7CFA", indigo: "#7B5CFF", violet: "#A855F7", cyan: "#22D3EE",
  pink: "#F472D0", green: "#34F5C5", amber: "#FBBF24",
  border: "rgba(255,255,255,0.07)", ease: "cubic-bezier(0.16,1,0.3,1)",
};

function useReveal() {
  const [seen, setSeen] = useState<{ [k: string]: boolean }>({});
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSeen((p) => ({ ...p, [(e.target as HTMLElement).dataset.k as string]: true }))),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-k]").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);
  return seen;
}

/* rAF-throttled scroll for 120fps parallax */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { if (!raf) raf = requestAnimationFrame(() => { setY(window.scrollY); raf = 0; }); };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return y;
}

/* ════════════ CUSTOM BRAIN LOGO (original SVG) ════════════ */
function BrainLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="AIRA" style={{ display: "block" }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor={C.cyan} />
          <stop offset="50%" stopColor={C.indigo} />
          <stop offset="100%" stopColor={C.violet} />
        </linearGradient>
      </defs>
      {/* stylized neural brain: two hemispheres of nodes + synapse links */}
      <g stroke="url(#lg)" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M24 8 C16 8 12 14 13 20 C9 22 9 28 13 30 C13 36 18 40 24 38" />
        <path d="M24 8 C32 8 36 14 35 20 C39 22 39 28 35 30 C35 36 30 40 24 38" />
        <path d="M24 8 L24 38" opacity="0.4" />
        <path d="M16 17 L24 20 L32 17" opacity="0.6" />
        <path d="M15 27 L24 24 L33 27" opacity="0.6" />
      </g>
      <g fill="url(#lg)">
        <circle cx="24" cy="8" r="2.4" /><circle cx="13" cy="20" r="2" /><circle cx="35" cy="20" r="2" />
        <circle cx="13" cy="30" r="2" /><circle cx="35" cy="30" r="2" /><circle cx="24" cy="38" r="2.4" />
        <circle cx="24" cy="20" r="1.6" /><circle cx="24" cy="24" r="1.6" />
      </g>
    </svg>
  );
}

/* ════════════ HERO ORB (animated, pure SVG) ════════════ */
function NeuralOrb() {
  return (
    <div style={{ position: "relative", width: "min(580px,92vw)", height: "min(580px,92vw)", margin: "0 auto", pointerEvents: "none", willChange: "transform" }} aria-hidden>
      <div style={{ position: "absolute", inset: "-18%", background: `radial-gradient(circle at 50% 48%, ${C.indigo}38, ${C.blue}11 42%, transparent 66%)`, filter: "blur(44px)", animation: "breathe 8s ease-in-out infinite", willChange: "transform,opacity" }} />
      <svg viewBox="0 0 400 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id="core" cx="50%" cy="44%" r="55%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="22%" stopColor={C.cyan} stopOpacity="0.85" />
            <stop offset="52%" stopColor={C.indigo} stopOpacity="0.7" />
            <stop offset="100%" stopColor={C.violet} stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="r1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.cyan} /><stop offset="50%" stopColor={C.blue} /><stop offset="100%" stopColor={C.violet} /></linearGradient>
          <linearGradient id="r2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.pink} /><stop offset="50%" stopColor={C.violet} /><stop offset="100%" stopColor={C.blue} /></linearGradient>
          <filter id="sf"><feGaussianBlur stdDeviation="1.2" /></filter>
        </defs>
        <g style={{ transformOrigin: "200px 200px", animation: "spin 30s linear infinite", willChange: "transform" }}>
          <ellipse cx="200" cy="200" rx="182" ry="72" fill="none" stroke="url(#r1)" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="200" cy="200" rx="162" ry="152" fill="none" stroke="url(#r2)" strokeWidth="1" opacity="0.3" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spinRev 36s linear infinite", willChange: "transform" }}>
          <ellipse cx="200" cy="200" rx="72" ry="182" fill="none" stroke="url(#r2)" strokeWidth="1.5" opacity="0.45" />
          <ellipse cx="200" cy="200" rx="176" ry="122" fill="none" stroke="url(#r1)" strokeWidth="1" opacity="0.25" />
        </g>
        <g style={{ transformOrigin: "200px 200px", animation: "spin 46s linear infinite", transform: "rotate(45deg)", willChange: "transform" }}>
          <ellipse cx="200" cy="200" rx="186" ry="92" fill="none" stroke="url(#r1)" strokeWidth="0.8" opacity="0.3" />
        </g>
        <circle cx="200" cy="184" r="96" fill="url(#core)" filter="url(#sf)" style={{ animation: "pulseCore 6s ease-in-out infinite", transformOrigin: "200px 184px", willChange: "transform,opacity" }} />
        <circle cx="200" cy="184" r="60" fill="url(#core)" opacity="0.85" style={{ animation: "pulseCore 4s ease-in-out infinite reverse", transformOrigin: "200px 184px", willChange: "transform" }} />
        <g style={{ transformOrigin: "200px 200px", animation: "spin 22s linear infinite", willChange: "transform" }}><circle cx="382" cy="200" r="4" fill={C.cyan} /><circle cx="18" cy="200" r="3" fill={C.pink} /></g>
        <g style={{ transformOrigin: "200px 200px", animation: "spinRev 28s linear infinite", willChange: "transform" }}><circle cx="200" cy="18" r="3.5" fill={C.violet} /><circle cx="200" cy="382" r="2.5" fill={C.blue} /></g>
      </svg>
    </div>
  );
}

/* ════════════ FLOWING GRADIENT MESH ════════════ */
function GradientMesh() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden>
      {[{ c: C.indigo, x: "8%", y: "12%", s: 640, d: "24s" }, { c: C.blue, x: "72%", y: "32%", s: 720, d: "30s" }, { c: C.violet, x: "28%", y: "72%", s: 560, d: "26s" }, { c: C.cyan, x: "82%", y: "82%", s: 500, d: "32s" }].map((b, i) => (
        <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: "50%", background: b.c, filter: "blur(120px)", opacity: 0.12, animation: `drift ${b.d} ease-in-out infinite`, animationDelay: `${i * -3}s`, willChange: "transform" }} />
      ))}
      <div style={{ position: "absolute", inset: 0, opacity: 0.022, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}

/* ════════════ UI primitives ════════════ */
function Pill({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: C.cyan, textTransform: "uppercase", backdropFilter: "blur(10px)" }}>{children}</span>;
}
function GBtn({ children, big, full, onClick }: { children: React.ReactNode; big?: boolean; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", background: `linear-gradient(135deg,${C.blue},${C.indigo},${C.violet})`, backgroundSize: "200% 200%", color: "#fff", border: "none", padding: big ? "20px 52px" : "14px 34px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: big ? 18 : 15, fontWeight: 700, cursor: "pointer", boxShadow: h ? `0 0 60px ${C.indigo}66` : `0 0 36px ${C.indigo}33`, transform: h ? "translateY(-2px) scale(1.02)" : "none", animation: "gradShift 4s ease infinite", transition: `transform 0.3s ${C.ease}, box-shadow 0.3s`, willChange: "transform" }}>{children}</button>;
}
function GhostBtn({ children, full, onClick }: { children: React.ReactNode; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surface : "transparent", color: h ? C.fg : C.muted, border: `1px solid ${h ? "rgba(123,92,255,0.5)" : C.border}`, padding: "14px 34px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: 15, cursor: "pointer", backdropFilter: "blur(10px)", transition: `all 0.3s ${C.ease}` }}>{children}</button>;
}
function GlassCard({ children, k, seen, delay = 0, style = {} }: { children: React.ReactNode; k: string; seen: { [k: string]: boolean }; delay?: number; style?: React.CSSProperties }) {
  const [h, setH] = useState(false);
  const [m, setM] = useState({ x: 50, y: 50 });
  return (
    <div data-k={k} onMouseEnter={() => setH(true)} onMouseLeave={() => { setH(false); setM({ x: 50, y: 50 }); }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setM({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
      style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${h ? "rgba(123,92,255,0.5)" : "rgba(255,255,255,0.08)"},${h ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.02)"}) border-box`, border: "1px solid transparent", borderRadius: 20, padding: 32, overflow: "hidden", backdropFilter: "blur(20px)", boxShadow: h ? "0 20px 60px rgba(123,92,255,0.18)" : "0 8px 24px rgba(0,0,0,0.4)", opacity: seen[k] ? 1 : 0, transform: seen[k] ? (h ? "translateY(-6px)" : "translateY(0)") : "translateY(32px)", transition: `opacity 0.8s ${C.ease} ${delay}ms, transform 0.5s ${C.ease}, box-shadow 0.4s, background 0.4s`, willChange: "transform,opacity", ...style }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${m.x}% ${m.y}%, rgba(123,92,255,0.1), transparent 50%)`, opacity: h ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
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

/* ════════════ TECHNIQUE PICKER (Augment-style interactive demo) ════════════ */
const TECHNIQUES = [
  { id: "pomodoro", icon: "🍅", name: "Pomodoro", tag: "25 / 5", color: C.blue,
    short: "Classic focus sprints",
    desc: "Work in 25-minute bursts, then take a 5-minute break. After four rounds, take a longer 15–30 minute break. Best for tasks you tend to procrastinate on — the short commitment lowers the barrier to starting.",
    best: "Best for: reading, problem sets, writing" },
  { id: "flowtime", icon: "🌊", name: "Flowtime", tag: "Free-form", color: C.cyan,
    short: "Ride your natural focus",
    desc: "No fixed timer. You work until your focus naturally dips, then break for as long as you need. AIRA tracks your sessions and learns your real attention span — so you stop forcing breaks when you're in deep flow.",
    best: "Best for: coding, deep creative work" },
  { id: "5217", icon: "⚖️", name: "52 / 17", tag: "52 / 17", color: C.violet,
    short: "Research-optimized rhythm",
    desc: "52 minutes of focused work, then 17 minutes of complete rest. Based on productivity research that found this ratio maximizes sustained output across a full day without burnout.",
    best: "Best for: long study days, exam prep" },
  { id: "deepwork", icon: "🧠", name: "Deep Work", tag: "90 min", color: C.pink,
    short: "Maximum depth blocks",
    desc: "90-minute distraction-free blocks matched to your brain's natural ultradian rhythm. Phone away, notifications off, one task only. The longest runway for the hardest, most cognitively demanding work.",
    best: "Best for: thesis, hard concepts, mastery" },
];

function TechniquePicker({ seen }: { seen: { [k: string]: boolean } }) {
  const [active, setActive] = useState("pomodoro");
  const t = TECHNIQUES.find((x) => x.id === active)!;
  return (
    <div data-k="tech" style={{ opacity: seen["tech"] ? 1 : 0, transform: seen["tech"] ? "translateY(0)" : "translateY(32px)", transition: `all 0.8s ${C.ease}`, willChange: "transform,opacity" }}>
      {/* technique cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 28 }}>
        {TECHNIQUES.map((tech) => {
          const on = tech.id === active;
          return (
            <button key={tech.id} onClick={() => setActive(tech.id)}
              style={{ position: "relative", textAlign: "left", cursor: "pointer", padding: 20, borderRadius: 18, background: on ? `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${tech.color},${C.violet}) border-box` : C.surface, border: on ? "1.5px solid transparent" : `1px solid ${C.border}`, transform: on ? "translateY(-4px)" : "none", boxShadow: on ? `0 16px 40px ${tech.color}33` : "none", transition: `all 0.35s ${C.ease}`, willChange: "transform" }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{tech.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: on ? C.fg : C.muted, marginBottom: 4 }}>{tech.name}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: tech.color }}>{tech.tag}</div>
              <div style={{ fontSize: 12, color: C.faint, marginTop: 6 }}>{tech.short}</div>
              {on && <div style={{ position: "absolute", top: 14, right: 14, width: 18, height: 18, borderRadius: 999, background: `linear-gradient(135deg,${tech.color},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff" }}>✓</div>}
            </button>
          );
        })}
      </div>
      {/* detail panel */}
      <div style={{ background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${t.color}66,rgba(255,255,255,0.05)) border-box`, border: "1px solid transparent", borderRadius: 20, padding: 32, backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 34 }}>{t.icon}</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>{t.name} <span style={{ fontSize: 13, color: t.color, fontWeight: 600 }}>· {t.tag}</span></div>
          </div>
        </div>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{t.desc}</p>
        <span style={{ fontSize: 12, color: t.color, background: `${t.color}18`, padding: "6px 14px", borderRadius: 999, fontWeight: 600 }}>{t.best}</span>
      </div>
    </div>
  );
}

/* ════════════ FOCUS SOUND PLAYER (royalty-free, Pro) ════════════ */
const SOUNDS = [
  { id: "8d", icon: "🎧", name: "8D Ambient", note: "Spatial audio that gently moves around you" },
  { id: "binaural", icon: "🌀", name: "Binaural Beats", note: "Frequency-tuned tones for deep concentration" },
  { id: "rain", icon: "🌧️", name: "Rainfall", note: "Steady rain to mask distractions" },
  { id: "forest", icon: "🌲", name: "Forest", note: "Birdsong and wind for calm focus" },
  { id: "silence", icon: "🔇", name: "Pure Silence", note: "No audio — just you and the work" },
];
function SoundPlayer({ seen }: { seen: { [k: string]: boolean } }) {
  const [active, setActive] = useState("8d");
  const [playing, setPlaying] = useState(false);
  return (
    <div data-k="snd" style={{ opacity: seen["snd"] ? 1 : 0, transform: seen["snd"] ? "translateY(0)" : "translateY(32px)", transition: `all 0.8s ${C.ease}`, willChange: "transform,opacity" }}>
      <div style={{ background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,rgba(34,211,238,0.4),rgba(123,92,255,0.25)) border-box`, border: "1px solid transparent", borderRadius: 24, padding: 36, backdropFilter: "blur(20px)" }}>
        {/* visualizer bars */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, height: 70, marginBottom: 28 }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} style={{ width: 4, borderRadius: 999, background: `linear-gradient(${C.cyan},${C.indigo})`, height: playing ? `${20 + Math.abs(Math.sin(i * 0.9)) * 50}px` : "8px", animation: playing ? `eq 0.${6 + (i % 5)}s ease-in-out infinite alternate` : "none", animationDelay: `${i * 0.04}s`, transition: "height 0.4s ease", willChange: "transform" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>
          {SOUNDS.map((s) => {
            const on = s.id === active;
            return (
              <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, cursor: "pointer", background: on ? `linear-gradient(135deg,${C.cyan}22,${C.indigo}22)` : "transparent", border: `1px solid ${on ? "rgba(34,211,238,0.5)" : C.border}`, color: on ? C.fg : C.muted, fontSize: 13, transition: `all 0.25s ${C.ease}` }}>
                <span>{s.icon}</span>{s.name}
              </button>
            );
          })}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.faint, marginBottom: 24 }}>{SOUNDS.find((s) => s.id === active)?.note}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => setPlaying(!playing)} style={{ width: 64, height: 64, borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 22, boxShadow: `0 0 40px ${C.indigo}55`, display: "flex", alignItems: "center", justifyContent: "center", transition: `all 0.3s ${C.ease}` }}>
            {playing ? "⏸" : "▶"}
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: C.faint, marginTop: 16 }}>Royalty-free focus audio · Available on AIRA Pro</p>
      </div>
    </div>
  );
}

/* ════════════ WELCOME MODAL (post-purchase) ════════════ */
function WelcomeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "🎉", title: "Welcome to AIRA Pro", body: "You just unlocked everything — unlimited AI mentoring, all 15 subjects, every focus technique, and royalty-free focus audio. Let's get you into flow.", cta: "Show me around" },
    { icon: "🎯", title: "Pick a focus technique", body: "Pomodoro, Flowtime, 52/17, or Deep Work — choose how you want to study. AIRA structures the session and keeps you on track.", cta: "Next" },
    { icon: "🧠", title: "Your AI mentor is always on", body: "Stuck on a concept? Ask AIRA anytime. It knows what you're studying, never just hands you answers, and adapts to where you struggle.", cta: "Next" },
    { icon: "⚡", title: "Flow state, on demand", body: "Notifications off. Phone away. Distraction-free. AIRA's sessions are built on neuroscience to get you deep — and keep you there.", cta: "Start learning" },
  ];
  const s = steps[step]; const last = step === steps.length - 1;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,4,0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.4s ease" }}>
      <div style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 48, maxWidth: 480, width: "100%", textAlign: "center", boxShadow: `0 0 100px ${C.indigo}44`, animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
        <div style={{ fontSize: 60, marginBottom: 24, animation: "floaty 3s ease-in-out infinite" }}>{s.icon}</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>{s.title}</h2>
        <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>{s.body}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>{steps.map((_, i) => <div key={i} style={{ width: i === step ? 28 : 8, height: 8, borderRadius: 999, background: i === step ? `linear-gradient(90deg,${C.cyan},${C.indigo})` : C.border, transition: `all 0.4s ${C.ease}` }} />)}</div>
        <GBtn full onClick={() => (last ? onClose() : setStep(step + 1))}>{s.cta}</GBtn>
        {!last && <button onClick={onClose} style={{ marginTop: 16, background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer" }}>Skip intro</button>}
      </div>
    </div>
  );
}

/* ════════════ DATA ════════════ */
const SCIENCE = [
  { i: "⚡", t: "Neural Phase Locking", s: "Ultradian Rhythm Research", b: "Structured focus intervals align with your brain's natural ultradian rhythms — the foundation of deep, sustained concentration." },
  { i: "🔁", t: "Spaced Repetition", s: "Ebbinghaus Memory Research", b: "The forgetting curve shows 70% loss within 24 hours. AIRA schedules reviews at the scientifically optimal moment." },
  { i: "✍️", t: "Active Recall", s: "Roediger & Karpicke, 2006", b: "Passive re-reading retains ~10%. Active recall forces retrieval, retaining up to 80%. Built into every session." },
  { i: "🎯", t: "Socratic AI Method", s: "Schwartz et al. Research", b: "Guided discovery creates 2x stronger neural pathways than passive instruction. AIRA asks, then guides you to the answer." },
];
const HOW = [
  { i: "🎯", c: C.blue, t: "Choose Your Technique", st: "Pomodoro · Flow · 52/17 · Deep", f: ["Four proven study methods", "Each explained in plain language", "AIRA structures the session", "Switch anytime"] },
  { i: "🤖", c: C.violet, t: "AI Study Mentor", st: "24/7 · Personalized · Socratic", f: ["Context-aware guidance", "Socratic questioning", "Finds your weak spots", "Weekly progress insights"] },
  { i: "📚", c: C.cyan, t: "Spaced Review System", st: "Auto-scheduled · Long-term", f: ["SM-2 repetition algorithm", "Automatic concept tagging", "Daily review queue", "Retention analytics"] },
];
const FOCUS_MODES = [
  { i: "🔕", t: "Notifications Off", b: "AIRA's focus mode signals you to silence your phone and close every tab. Deep work demands an undivided mind — we make that the default." },
  { i: "📵", t: "Device-Away Sessions", b: "Some lessons are designed for your phone face-down across the room. AIRA tells you exactly when to step away and think." },
  { i: "🎧", t: "Royalty-Free Audio", b: "8D ambient, binaural beats, rain, forest, or pure silence. Engineered to deepen focus without pulling attention. Yours on Pro." },
  { i: "🌊", t: "Flow State Tracking", b: "AIRA learns when you focus best — 'your peak is 9am' — and nudges your hardest sessions into your sharpest hours." },
];
const STUDY_TYPES = [
  { i: "💻", t: "Screen-Based Study", color: C.blue, b: "For subjects needing a device: coding, data science, AI tools. AIRA keeps you in one focused window, blocks distractions, structures hands-on practice.", items: ["Coding & Programming", "Data Science", "AI & Prompt Engineering", "Marketing & Growth"] },
  { i: "📖", t: "Device-Free Study", color: C.cyan, b: "For subjects best learned off-screen: math on paper, reading, memorization. AIRA sets the structure, then tells you to put the phone down and think.", items: ["Mathematics", "Philosophy & Logic", "History & Society", "Language learning"] },
];
const SUBJECTS = ["🤖 AI & Prompt Engineering", "💻 Coding & Programming", "📐 Mathematics", "🌍 English & Language", "📊 Data Science", "💼 Business & Strategy", "🧠 Psychology", "💰 Finance & Economics", "⚖️ Law Basics", "🎯 Marketing & Growth", "🧬 Biology & Health", "⚗️ Chemistry", "🔭 Physics", "📜 History & Society", "🎨 Philosophy & Logic"];
const FAQ: [string, string][] = [
  ["How is AIRA different from a chatbot?", "A chatbot answers questions. AIRA teaches. It picks a study technique with you, structures focused sessions, uses Socratic questioning, tracks your progress, and schedules spaced reviews. It's a complete study system, not just a Q&A box."],
  ["What study techniques can I use?", "Four proven methods: Pomodoro (25/5), Flowtime (free-form), 52/17, and Deep Work (90 min). Each comes with a plain-language explanation so you know exactly what you're choosing and why."],
  ["How does the AI mentor work?", "It uses the Socratic method — asking questions that guide you to answers rather than handing them over. It knows what you're studying, tracks where you struggle, and adapts to your progress."],
  ["Do I need my phone for every lesson?", "No. Many AIRA sessions are device-free — it sets the structure, then tells you to put your phone away and think on paper. Other subjects need a screen. AIRA tells you which is which."],
  ["What about focus audio?", "AIRA Pro includes royalty-free focus audio: 8D ambient, binaural beats, rain, forest, or pure silence. The free plan focuses on the study system itself — audio is a Pro upgrade."],
  ["Is there really a free trial?", "Yes. 7 days, full access, no credit card required. If AIRA doesn't change how you study, just don't subscribe."],
  ["What if I want to cancel?", "Cancel any time in account settings. No penalties, no questions."],
];

/* ════════════════════════════════════════════════════════════════ MAIN */
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
  const reveal = (k: string, d = 0) => ({ "data-k": k, style: { opacity: seen[k] ? 1 : 0, transform: seen[k] ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ${C.ease} ${d}ms, transform 0.8s ${C.ease} ${d}ms`, willChange: "transform,opacity" } as React.CSSProperties });
  const H = (e: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em", ...e });

  return (
    <main style={{ background: C.void, minHeight: "100vh", color: C.fg, position: "relative", overflowX: "hidden" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--font-display:'Space Grotesk',sans-serif}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;background:${C.void};-webkit-font-smoothing:antialiased}
        ::selection{background:rgba(123,92,255,0.35)}
        button:focus-visible,a:focus-visible{outline:2px solid ${C.cyan};outline-offset:3px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes spinRev{to{transform:rotate(-360deg)}}
        @keyframes pulseCore{0%,100%{transform:scale(1);opacity:0.9}50%{transform:scale(1.08);opacity:1}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.8}50%{transform:scale(1.12);opacity:1}}
        @keyframes drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-40px,30px) scale(0.95)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 40px rgba(123,92,255,0.2)}50%{box-shadow:0 0 70px rgba(123,92,255,0.4)}}
        @keyframes eq{from{transform:scaleY(0.4)}to{transform:scaleY(1)}}
        @keyframes scrollDot{0%{transform:translateY(0);opacity:1}80%{opacity:0}100%{transform:translateY(36px);opacity:0}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
        @media(max-width:768px){.nav-links{display:none!important}.nav-wrap{padding:0 20px!important}.sec{padding:80px 20px!important}.hero-h1{font-size:46px!important}}
      `}</style>

      <GradientMesh />
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      {/* NAV with brain logo */}
      <nav className="nav-wrap" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(24px)", background: scrollY > 40 ? "rgba(0,0,4,0.82)" : "rgba(0,0,4,0.3)", borderBottom: `1px solid ${scrollY > 40 ? C.border : "transparent"}`, height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "all 0.4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <BrainLogo size={30} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 6s ease infinite" }}>AIRA</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 34, fontSize: 14, color: C.muted }}>
          {[["How", "how"], ["Techniques", "tech"], ["Science", "science"], ["Focus", "focus"], ["Pricing", "pricing"]].map(([l, h]) => <a key={l} href={`#${h}`} style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)} onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{l}</a>)}
        </div>
        <GBtn onClick={buy}>Start free trial</GBtn>
      </nav>

      {/* HERO */}
      <section className="sec" style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 24px 0" }}>
        <div style={{ transform: `translate3d(0,${scrollY * 0.3}px,0)`, opacity: Math.max(0, 1 - scrollY / 500), position: "absolute", top: "8%", left: "50%", marginLeft: "min(-290px,-46vw)", zIndex: 0, willChange: "transform,opacity" }}><NeuralOrb /></div>
        <div style={{ position: "relative", zIndex: 1, marginTop: 120 }}>
          <div {...reveal("hp")} style={{ ...reveal("hp").style, marginBottom: 30 }}><Pill>◈ AI-Powered Study Mentor</Pill></div>
          <h1 className="hero-h1" style={H({ fontSize: "clamp(46px,8.5vw,86px)", lineHeight: 1.02, marginBottom: 26, maxWidth: 880 })}>Get into <Grad>flow.</Grad><br />Stay there.</h1>
          <p style={{ fontSize: "clamp(17px,3vw,21px)", color: C.muted, maxWidth: 600, lineHeight: 1.7, margin: "0 auto 38px" }}>Pick a study technique, and your AI mentor structures the session, keeps you focused, and tests what you learn. Deep study, made effortless.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 38 }}>{["⚡ Focus Techniques", "🧠 AI Mentor", "🔬 Science-Backed"].map((t) => <span key={t} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 16px", fontSize: 12, color: C.muted, backdropFilter: "blur(10px)" }}>{t}</span>)}</div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 26 }}><GBtn big onClick={buy}>Start free trial</GBtn><GhostBtn onClick={() => (window.location.hash = "#tech")}>See how it works ↓</GhostBtn></div>
          <p style={{ fontSize: 13, color: C.faint }}>7-day free trial · No credit card · Cancel anytime</p>
        </div>
        <div style={{ position: "absolute", bottom: 36 }}><div style={{ width: 26, height: 42, border: `2px solid ${C.border}`, borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 8 }}><div style={{ width: 4, height: 8, borderRadius: 999, background: C.cyan, animation: "scrollDot 1.8s ease-in-out infinite" }} /></div></div>
      </section>

      {/* TECHNIQUE PICKER */}
      <section id="tech" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div {...reveal("tp-h")} style={{ ...reveal("tp-h").style, textAlign: "center", marginBottom: 56 }}>
          <Label>Choose your study time</Label>
          <h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>How do you want <Grad>to focus?</Grad></h2>
          <p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 540, margin: "18px auto 0", lineHeight: 1.7 }}>Every mind works differently. Pick a technique — AIRA explains each one, then structures your session around it.</p>
        </div>
        <TechniquePicker seen={seen} />
      </section>

      {/* HOW */}
      <section id="how" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("how-h")} style={{ ...reveal("how-h").style, textAlign: "center", marginBottom: 70 }}><Label>How it works</Label><h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Three systems. <Grad>One flow state.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
          {HOW.map((p, i) => <GlassCard key={p.t} k={`how-${i}`} seen={seen} delay={i * 120}><div style={{ fontSize: 38, marginBottom: 18 }}>{p.i}</div><h3 style={H({ fontSize: 23, marginBottom: 8 })}>{p.t}</h3><p style={{ fontSize: 12, color: p.c, fontWeight: 700, marginBottom: 22, letterSpacing: "0.05em" }}>{p.st}</p><div style={{ display: "flex", flexDirection: "column", gap: 11 }}>{p.f.map((f) => <div key={f} style={{ display: "flex", gap: 9, fontSize: 13.5, color: C.muted }}><span style={{ color: p.c }}>•</span>{f}</div>)}</div></GlassCard>)}
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("sci-h")} style={{ ...reveal("sci-h").style, textAlign: "center", marginBottom: 70 }}><Label>Backed by neuroscience</Label><h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Why AIRA works</h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16 }}>Every feature is built on published research, not guesswork.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>{SCIENCE.map((c, i) => <GlassCard key={c.t} k={`sci-${i}`} seen={seen} delay={i * 90}><div style={{ fontSize: 30, marginBottom: 18 }}>{c.i}</div><h3 style={H({ fontSize: 20, marginBottom: 12 })}>{c.t}</h3><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 18 }}>{c.b}</p><span style={{ fontSize: 11, color: C.cyan, background: "rgba(34,211,238,0.08)", padding: "5px 11px", borderRadius: 7, fontWeight: 600 }}>Basis: {c.s}</span></GlassCard>)}</div>
        </div>
      </section>

      {/* FOCUS MODES + SOUND */}
      <section id="focus" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("fm-h")} style={{ ...reveal("fm-h").style, textAlign: "center", marginBottom: 70 }}><Label>Distraction-free by design</Label><h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>Phone away. <Grad>Mind present.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 580, margin: "18px auto 0", lineHeight: 1.7 }}>Real focus means no notifications, no second screen, no pull to scroll. AIRA makes distraction-free the default.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, marginBottom: 48 }}>{FOCUS_MODES.map((m, i) => <GlassCard key={m.t} k={`fm-${i}`} seen={seen} delay={i * 90}><div style={{ fontSize: 32, marginBottom: 18 }}>{m.i}</div><h3 style={H({ fontSize: 18, marginBottom: 10 })}>{m.t}</h3><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{m.b}</p></GlassCard>)}</div>
          <SoundPlayer seen={seen} />
        </div>
      </section>

      {/* STUDY TYPES */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("st-h")} style={{ ...reveal("st-h").style, textAlign: "center", marginBottom: 70 }}><Label>Two ways to study</Label><h2 style={H({ fontSize: "clamp(32px,4.6vw,48px)" })}>Screen when you need it. <Grad>Paper when you don't.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 580, margin: "18px auto 0", lineHeight: 1.7 }}>Not every subject belongs on a screen. AIRA knows the difference and tells you when to look at your phone — and when to put it away.</p></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 22 }}>{STUDY_TYPES.map((s, i) => <GlassCard key={s.t} k={`st-${i}`} seen={seen} delay={i * 120} style={{ padding: 40 }}><div style={{ fontSize: 42, marginBottom: 18 }}>{s.i}</div><h3 style={H({ fontSize: 24, marginBottom: 12 })}>{s.t}</h3><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>{s.b}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{s.items.map((it) => <span key={it} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 14px", fontSize: 12, color: s.color }}>{it}</span>)}</div></GlassCard>)}</div>
      </section>

      {/* SUBJECTS */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div {...reveal("subj-h")} style={{ ...reveal("subj-h").style, textAlign: "center", marginBottom: 52 }}><Label>15 subject categories</Label><h2 style={H({ fontSize: "clamp(30px,4.6vw,44px)" })}>Study anything. <Grad>Master it.</Grad></h2></div>
        <div {...reveal("subj-g")} style={{ ...reveal("subj-g").style, display: "flex", flexWrap: "wrap", gap: 11, justifyContent: "center", marginBottom: 32 }}>{SUBJECTS.map((s) => <span key={s} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "11px 19px", fontSize: 13, color: C.muted, cursor: "default", backdropFilter: "blur(10px)", transition: `all 0.25s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(123,92,255,0.5)"; e.currentTarget.style.color = C.fg; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.transform = "none"; }}>{s}</span>)}</div>
        <p style={{ textAlign: "center", fontSize: 14, color: C.faint }}>Don't see your subject? AIRA adapts to anything — just tell it what you're studying.</p>
      </section>

      {/* PRICING */}
      <section id="pricing" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div {...reveal("p-h")} style={{ ...reveal("p-h").style, textAlign: "center", marginBottom: 70 }}><Label>Pricing</Label><h2 style={H({ fontSize: "clamp(34px,5vw,52px)" })}>$10/month. <Grad>Everything.</Grad></h2><p style={{ color: C.muted, marginTop: 14 }}>One price. No tiers. No tricks.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
            <GlassCard k="pf" seen={seen} style={{ padding: 40 }}>
              <h3 style={H({ fontSize: 22, marginBottom: 8 })}>Free</h3><div style={{ fontSize: 42, fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 4 }}>$0</div><p style={{ fontSize: 13, color: C.muted, marginBottom: 26 }}>7-day full access trial</p>
              {["AI mentor (trial)", "All 4 focus techniques", "Study session structure", "Basic progress tracking", "No credit card required"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.muted }}><span style={{ color: C.green }}>✓</span>{f}</div>)}
              <div style={{ marginTop: 26 }}><GhostBtn full onClick={buy}>Start free trial</GhostBtn></div>
            </GlassCard>
            <GlassCard k="pp" seen={seen} delay={100} style={{ padding: 40, animation: "pulseGlow 4s ease-in-out infinite" }}>
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${C.blue},${C.violet})`, padding: "6px 22px", borderRadius: "0 0 12px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", zIndex: 2 }}>MOST POPULAR</div>
              <h3 style={H({ fontSize: 22, marginBottom: 8, marginTop: 10 })}>AIRA Pro</h3><div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 42, fontWeight: 700, fontFamily: "var(--font-display)" }}>$10</span><span style={{ color: C.muted }}>/month</span></div><p style={{ fontSize: 13, color: C.cyan, marginBottom: 26 }}>or $84/year ($7/mo — save 30%)</p>
              {["Unlimited AI mentor sessions", "All 15 subject categories", "Royalty-free focus audio (8D, binaural)", "Spaced repetition (auto)", "Full progress analytics", "Weekly AI study report", "Device-free + screen modes", "Export notes + certificates", "Cancel anytime"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.fg }}><span style={{ color: C.green }}>✓</span>{f}</div>)}
              <div style={{ marginTop: 26 }}><GBtn full onClick={buy}>Start 7-day free trial</GBtn></div>
            </GlassCard>
          </div>
          <p style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: C.faint }}>Secure checkout via Lemon Squeezy · Cancel anytime · A private tutor costs $50–200/hour. AIRA is $10/month, unlimited.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 820, margin: "0 auto" }}>
        <div {...reveal("f-h")} style={{ ...reveal("f-h").style, textAlign: "center", marginBottom: 52 }}><Label>Questions</Label><h2 style={H({ fontSize: "clamp(30px,4.6vw,44px)" })}>Common questions</h2></div>
        {FAQ.map((f, i) => (
          <div key={f[0]} {...reveal(`fq-${i}`, i * 50)} style={{ ...reveal(`fq-${i}`, i * 50).style, borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", color: C.fg }}><span style={{ fontSize: 16, fontWeight: 500 }}>{f[0]}</span><span style={{ fontSize: 22, color: C.violet, transform: openFaq === i ? "rotate(45deg)" : "none", transition: `transform 0.3s ${C.ease}`, flexShrink: 0, marginLeft: 16 }}>+</span></button>
            <div style={{ maxHeight: openFaq === i ? 240 : 0, overflow: "hidden", transition: `max-height 0.45s ${C.ease}` }}><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, paddingBottom: 22 }}>{f[1]}</p></div>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "170px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "30%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.indigo}22,transparent 65%)`, filter: "blur(60px)", animation: "breathe 8s ease-in-out infinite", pointerEvents: "none", willChange: "transform,opacity" }} />
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
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><BrainLogo size={26} /><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 23, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AIRA</div></div>
              <p style={{ fontSize: 14, color: C.faint, lineHeight: 1.7 }}>Your AI study mentor. Get into flow. Stay there.</p>
            </div>
            {[{ t: "Product", l: ["How it works", "Techniques", "Science", "Pricing"] }, { t: "Study", l: ["Focus Techniques", "Spaced Repetition", "AI Mentor", "Device-free"] }, { t: "Company", l: ["About", "Contact", "Privacy", "Terms"] }].map((col) => <div key={col.t}><h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 16 }}>{col.t}</h4><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{col.l.map((l) => <a key={l} href="#" style={{ fontSize: 14, color: C.faint, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>{l}</a>)}</div></div>)}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}><p style={{ fontSize: 13, color: C.faint }}>© 2026 AIRA Mentor. Built with care. 🇹🇷</p><p style={{ fontSize: 13, color: C.faint }}>airamentor.com</p></div>
        </div>
      </footer>
    </main>
  );
}

