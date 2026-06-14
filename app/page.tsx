"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ════════════════════════════════════════════════════════════════════════
   AIRA MENTOR — V7 MASTER BUILD
   Bento grid · dashboard preview · 6 techniques · scroll-color background
   3D tilt · kinetic type · live timer · zero images · 120fps · $9.99/mo
   No voice section (removed). Lemon Squeezy + Clerk-ready auth.
   ════════════════════════════════════════════════════════════════════════ */

const CHECKOUT_URL =
  "https://airamentor.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const C = {
  void: "#000004", deep: "#03030A", base: "#06060F", elev: "#0B0B18", elev2: "#101022",
  surface: "rgba(255,255,255,0.04)", glass: "rgba(255,255,255,0.05)",
  fg: "#F2F2FA", muted: "#9A9AB5", faint: "#5A5A75",
  blue: "#5B7CFA", indigo: "#7B5CFF", violet: "#A855F7", cyan: "#22D3EE",
  pink: "#F472D0", green: "#34F5C5", amber: "#FBBF24", orange: "#FB923C", red: "#FB7185",
  border: "rgba(255,255,255,0.08)", ease: "cubic-bezier(0.16,1,0.3,1)",
  spring: "cubic-bezier(0.34,1.56,0.64,1)",
};

/* scroll-linked section tints */
const TINTS = [
  { at: 0.0, a: "#7B5CFF", b: "#22D3EE" },
  { at: 0.14, a: "#5B7CFA", b: "#A855F7" },
  { at: 0.28, a: "#22D3EE", b: "#34F5C5" },
  { at: 0.42, a: "#A855F7", b: "#F472D0" },
  { at: 0.56, a: "#F472D0", b: "#FBBF24" },
  { at: 0.70, a: "#34F5C5", b: "#5B7CFA" },
  { at: 0.85, a: "#7B5CFF", b: "#22D3EE" },
];
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function hexToRgb(h: string) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function mix(h1: string, h2: string, t: number) {
  const [r1, g1, b1] = hexToRgb(h1), [r2, g2, b2] = hexToRgb(h2);
  return `rgb(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))})`;
}
function useTint(p: number) {
  let i = 0;
  for (let k = 0; k < TINTS.length - 1; k++) if (p >= TINTS[k].at) i = k;
  const cur = TINTS[i], nxt = TINTS[Math.min(i + 1, TINTS.length - 1)];
  const span = nxt.at - cur.at || 1;
  const t = Math.max(0, Math.min(1, (p - cur.at) / span));
  return { a: mix(cur.a, nxt.a, t), b: mix(cur.b, nxt.b, t) };
}

function useReveal() {
  const [seen, setSeen] = useState<{ [k: string]: boolean }>({});
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSeen((p) => ({ ...p, [(e.target as HTMLElement).dataset.k as string]: true }))),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-k]").forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);
  return seen;
}
function useScrollProgress() {
  const [p, setP] = useState(0); const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { if (raf) return; raf = requestAnimationFrame(() => { const max = document.documentElement.scrollHeight - window.innerHeight; setP(max > 0 ? window.scrollY / max : 0); setY(window.scrollY); raf = 0; }); };
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return { p, y };
}
function useCountUp(target: number, run: boolean, dur = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const start = performance.now();
    const tick = (now: number) => { const t = Math.min(1, (now - start) / dur); setV(target * (1 - Math.pow(1 - t, 3))); if (t < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return v;
}

/* ════════════ LIVING BACKGROUND (scroll-color-shift + canvas) ════════════ */
function LivingBackground({ p }: { p: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tint = useTint(p);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    const stars = Array.from({ length: 130 }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2, tw: Math.random() * Math.PI * 2 }));
    const nodes = Array.from({ length: 32 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: Math.random() * 1.5 + 0.6 }));
    let raf = 0, t = 0;
    const draw = () => {
      t += 0.012; ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => { const a = (0.3 + Math.sin(t * 2 + s.tw) * 0.3) * s.z; ctx.beginPath(); ctx.arc(s.x, s.y, s.z * 1.3, 0, Math.PI * 2); ctx.fillStyle = `rgba(190,200,255,${a})`; ctx.fill(); });
      nodes.forEach((n) => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(150,160,255,0.4)"; ctx.fill(); });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, d = Math.hypot(dx, dy); if (d < 150) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = `rgba(140,150,255,${0.09 * (1 - d / 150)})`; ctx.lineWidth = 0.6; ctx.stroke(); } }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "60vw", height: "60vw", borderRadius: "50%", background: tint.a, filter: "blur(140px)", opacity: 0.15, transition: "background 0.6s linear", animation: "drift 28s ease-in-out infinite", willChange: "transform" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-5%", width: "65vw", height: "65vw", borderRadius: "50%", background: tint.b, filter: "blur(150px)", opacity: 0.14, transition: "background 0.6s linear", animation: "drift 34s ease-in-out infinite reverse", willChange: "transform" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", width: "45vw", height: "45vw", borderRadius: "50%", background: mix(tint.a, tint.b, 0.5), filter: "blur(130px)", opacity: 0.1, transition: "background 0.6s linear", transform: "translate(-50%,-50%)", animation: "breathe 12s ease-in-out infinite", willChange: "transform" }} />
      <canvas ref={ref} style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      {/* noise texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.018, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45vh", background: `linear-gradient(transparent, ${C.void})`, zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: "-55%", left: "-25%", right: "-25%", height: "100%", backgroundImage: `linear-gradient(${tint.a}22 1px, transparent 1px), linear-gradient(90deg, ${tint.a}22 1px, transparent 1px)`, backgroundSize: "64px 64px", transform: "perspective(420px) rotateX(72deg)", opacity: 0.2, transition: "background-image 0.6s linear", maskImage: "linear-gradient(transparent, #000 65%)", WebkitMaskImage: "linear-gradient(transparent, #000 65%)" }} />
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${p * 100}%`, background: `linear-gradient(90deg,${tint.a},${tint.b})`, zIndex: 300, transition: "width 0.1s linear", boxShadow: `0 0 10px ${tint.a}` }} />
    </div>
  );
}

/* ════════════ BRAIN LOGO ════════════ */
function BrainLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="AIRA" style={{ display: "block" }}>
      <defs><linearGradient id="lg" x1="0" y1="0" x2="48" y2="48"><stop offset="0%" stopColor={C.cyan} /><stop offset="50%" stopColor={C.indigo} /><stop offset="100%" stopColor={C.violet} /></linearGradient></defs>
      <g stroke="url(#lg)" strokeWidth="1.6" fill="none" strokeLinecap="round"><path d="M24 8 C16 8 12 14 13 20 C9 22 9 28 13 30 C13 36 18 40 24 38" /><path d="M24 8 C32 8 36 14 35 20 C39 22 39 28 35 30 C35 36 30 40 24 38" /><path d="M24 8 L24 38" opacity="0.4" /><path d="M16 17 L24 20 L32 17" opacity="0.6" /><path d="M15 27 L24 24 L33 27" opacity="0.6" /></g>
      <g fill="url(#lg)"><circle cx="24" cy="8" r="2.4" /><circle cx="13" cy="20" r="2" /><circle cx="35" cy="20" r="2" /><circle cx="13" cy="30" r="2" /><circle cx="35" cy="30" r="2" /><circle cx="24" cy="38" r="2.4" /><circle cx="24" cy="20" r="1.6" /><circle cx="24" cy="24" r="1.6" /></g>
    </svg>
  );
}

/* ════════════ KINETIC WORD CYCLER ════════════ */
function WordCycler() {
  const WORDS = [{ t: "flow.", c: C.cyan }, { t: "focus.", c: C.indigo }, { t: "mastery.", c: C.pink }, { t: "the zone.", c: C.green }, { t: "deep work.", c: C.blue }];
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2200); return () => clearInterval(id); }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", minWidth: "5ch" }}>
      {WORDS.map((w, k) => (
        <span key={w.t} style={{ position: k === i ? "relative" : "absolute", left: 0, top: 0, whiteSpace: "nowrap", color: w.c, opacity: k === i ? 1 : 0, transform: k === i ? "translateY(0) rotateX(0)" : "translateY(0.4em) rotateX(-50deg)", transition: `opacity 0.55s ${C.ease}, transform 0.55s ${C.ease}`, textShadow: `0 0 50px ${w.c}66`, display: "inline-block" }}>{w.t}</span>
      ))}
    </span>
  );
}

/* ════════════ UI PRIMITIVES ════════════ */
function Pill({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.glass, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: C.cyan, textTransform: "uppercase", backdropFilter: "blur(10px)" }}>{children}</span>;
}
function GBtn({ children, big, full, onClick }: { children: React.ReactNode; big?: boolean; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", background: `linear-gradient(135deg,${C.blue},${C.indigo},${C.violet})`, backgroundSize: "200% 200%", color: "#fff", border: "none", padding: big ? "20px 52px" : "13px 30px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: big ? 18 : 15, fontWeight: 700, cursor: "pointer", boxShadow: h ? `0 0 60px ${C.indigo}66` : `0 0 36px ${C.indigo}33`, transform: h ? "translateY(-2px) scale(1.02)" : "none", animation: "gradShift 4s ease infinite", transition: `transform 0.3s ${C.ease}, box-shadow 0.3s`, willChange: "transform" }}>{children}</button>;
}
function GhostBtn({ children, full, onClick }: { children: React.ReactNode; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.glass : "transparent", color: h ? C.fg : C.muted, border: `1px solid ${h ? "rgba(123,92,255,0.5)" : C.border}`, padding: "13px 30px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: 15, cursor: "pointer", backdropFilter: "blur(10px)", transition: `all 0.3s ${C.ease}` }}>{children}</button>;
}
function Grad({ children }: { children: React.ReactNode }) {
  return <span style={{ background: `linear-gradient(120deg,${C.cyan},${C.blue},${C.violet},${C.pink})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradShift 6s ease infinite" }}>{children}</span>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, display: "inline-block", marginBottom: 18 }}>{children}</span>;
}
/* 3D tilt glass card */
function Tilt({ children, k, seen, delay = 0, style = {}, span = 1 }: { children: React.ReactNode; k: string; seen: { [k: string]: boolean }; delay?: number; style?: React.CSSProperties; span?: number }) {
  const [tf, setTf] = useState(""); const [glow, setGlow] = useState({ x: 50, y: 50, on: false });
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    setTf(`perspective(900px) rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 8}deg) translateY(-5px)`);
    setGlow({ x: px * 100, y: py * 100, on: true });
  };
  const reset = () => { setTf(""); setGlow((g) => ({ ...g, on: false })); };
  return (
    <div data-k={k} onMouseMove={onMove} onMouseLeave={reset} style={{ gridColumn: span > 1 ? `span ${span}` : undefined, position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${glow.on ? "rgba(123,92,255,0.5)" : "rgba(255,255,255,0.09)"},${glow.on ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.02)"}) border-box`, border: "1px solid transparent", borderRadius: 22, padding: 30, overflow: "hidden", backdropFilter: "blur(20px)", boxShadow: glow.on ? "0 24px 70px rgba(123,92,255,0.22)" : "0 8px 24px rgba(0,0,0,0.4)", opacity: seen[k] ? 1 : 0, transform: seen[k] ? (tf || "translateY(0) scale(1)") : "translateY(44px) scale(0.95)", filter: seen[k] ? "blur(0)" : "blur(8px)", transition: `opacity 0.9s ${C.ease} ${delay}ms, transform 0.3s ${C.ease}, filter 0.9s ${C.ease} ${delay}ms, box-shadow 0.4s, background 0.4s`, transformStyle: "preserve-3d", willChange: "transform,filter", ...style }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(123,92,255,0.12), transparent 50%)`, opacity: glow.on ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, transform: "translateZ(18px)" }}>{children}</div>
    </div>
  );
}

/* ════════════ DASHBOARD PREVIEW (shows how the app works) ════════════ */
function DashboardPreview({ seen }: { seen: { [k: string]: boolean } }) {
  const [tab, setTab] = useState("today");
  const TABS = [{ id: "today", label: "Today", icon: "📊" }, { id: "subjects", label: "Subjects", icon: "📚" }, { id: "progress", label: "Progress", icon: "📈" }];
  return (
    <div data-k="dash" style={{ opacity: seen["dash"] ? 1 : 0, transform: seen["dash"] ? "translateY(0) scale(1)" : "translateY(50px) scale(0.96)", filter: seen["dash"] ? "blur(0)" : "blur(10px)", transition: `all 1s ${C.ease}`, willChange: "transform,filter" }}>
      <div style={{ background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,rgba(123,92,255,0.35),rgba(34,211,238,0.2)) border-box`, border: "1px solid transparent", borderRadius: 24, overflow: "hidden", backdropFilter: "blur(20px)", boxShadow: "0 40px 120px rgba(123,92,255,0.15)" }}>
        {/* window chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px", borderBottom: `1px solid ${C.border}`, background: "rgba(0,0,4,0.3)" }}>
          <div style={{ display: "flex", gap: 7 }}><span style={{ width: 12, height: 12, borderRadius: 999, background: "#FF5F57" }} /><span style={{ width: 12, height: 12, borderRadius: 999, background: "#FEBC2E" }} /><span style={{ width: 12, height: 12, borderRadius: 999, background: "#28C840" }} /></div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: C.faint }}>airamentor.com/app</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 440 }}>
          {/* sidebar */}
          <div style={{ borderRight: `1px solid ${C.border}`, padding: 16, background: "rgba(0,0,4,0.2)" }} className="dash-side">
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 24, padding: "4px 8px" }}><BrainLogo size={24} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>AIRA</span></div>
            {TABS.map((t) => <button key={t.id} onClick={() => setTab(t.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", borderRadius: 11, marginBottom: 4, cursor: "pointer", border: "none", textAlign: "left", background: tab === t.id ? `linear-gradient(135deg,${C.indigo}33,${C.cyan}11)` : "transparent", color: tab === t.id ? C.fg : C.muted, fontSize: 14, fontWeight: tab === t.id ? 600 : 400, transition: `all 0.2s ${C.ease}` }}><span>{t.icon}</span>{t.label}</button>)}
            <div style={{ marginTop: 24, padding: "14px 12px", borderRadius: 14, background: `linear-gradient(135deg,${C.indigo}22,${C.violet}11)`, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>🔥 Current streak</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: C.amber }}>12 days</div>
            </div>
          </div>
          {/* main panel */}
          <div style={{ padding: 24 }}>
            {tab === "today" && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Good evening, ready to focus?</h4>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 22 }}>You have 2 reviews due and 1 session planned.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                  {[{ l: "Focus time today", v: "2h 15m", c: C.cyan, i: "⏱️" }, { l: "Sessions this week", v: "9", c: C.violet, i: "🎯" }, { l: "Concepts mastered", v: "47", c: C.green, i: "🧠" }, { l: "Retention rate", v: "94%", c: C.pink, i: "📊" }].map((s) => (
                    <div key={s.l} style={{ padding: 16, borderRadius: 14, background: C.surface, border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 18, marginBottom: 8 }}>{s.i}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: s.c, marginBottom: 2 }}>{s.v}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <button style={{ width: "100%", padding: 14, borderRadius: 14, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 15, fontWeight: 700, boxShadow: `0 0 30px ${C.indigo}44` }}>▶ Start a focus session</button>
              </div>
            )}
            {tab === "subjects" && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Your subjects</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[{ n: "🤖 AI & Prompt Engineering", p: 78, c: C.cyan }, { n: "💻 Coding & Programming", p: 64, c: C.violet }, { n: "📐 Mathematics", p: 45, c: C.blue }, { n: "🧠 Psychology", p: 30, c: C.pink }].map((s) => (
                    <div key={s.n} style={{ padding: 14, borderRadius: 12, background: C.surface, border: `1px solid ${C.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}><span>{s.n}</span><span style={{ color: s.c, fontWeight: 600 }}>{s.p}%</span></div>
                      <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}><div style={{ height: "100%", width: `${s.p}%`, borderRadius: 999, background: `linear-gradient(90deg,${s.c},${C.violet})` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "progress" && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 18 }}>This week's focus</h4>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, height: 180, padding: "0 4px", marginBottom: 12 }}>
                  {[{ d: "Mon", h: 60 }, { d: "Tue", h: 85 }, { d: "Wed", h: 45 }, { d: "Thu", h: 95 }, { d: "Fri", h: 70 }, { d: "Sat", h: 100 }, { d: "Sun", h: 55 }].map((b, i) => (
                    <div key={b.d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                      <div style={{ width: "100%", height: `${b.h}%`, borderRadius: "8px 8px 0 0", background: `linear-gradient(${C.cyan},${C.indigo})`, opacity: seen["dash"] ? 1 : 0, transform: seen["dash"] ? "scaleY(1)" : "scaleY(0)", transformOrigin: "bottom", transition: `all 0.6s ${C.spring} ${i * 80}ms` }} />
                      <span style={{ fontSize: 11, color: C.faint }}>{b.d}</span>
                    </div>
                  ))}
                </div>
                <p style={{ textAlign: "center", fontSize: 13, color: C.muted }}>Your peak focus day is <span style={{ color: C.cyan, fontWeight: 600 }}>Saturday</span>. AIRA schedules hard topics then.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════ STUDY SPACE (6 techniques, working timer) ════════════ */
const TECHNIQUES = [
  { id: "pomodoro", icon: "🍅", name: "Pomodoro", tag: "25 / 5", work: 25, brk: 5, color: C.blue, desc: "25-minute focus sprints with 5-minute breaks. Lowers the barrier to starting — perfect for tasks you put off.", best: "Reading, problem sets, writing" },
  { id: "flowtime", icon: "🌊", name: "Flowtime", tag: "Free-form", work: 50, brk: 10, color: C.cyan, desc: "No fixed timer. Work until your focus dips, then break as needed. AIRA learns your real attention span.", best: "Coding, deep creative work" },
  { id: "5217", icon: "⚖️", name: "52 / 17", tag: "52 / 17", work: 52, brk: 17, color: C.violet, desc: "52 minutes on, 17 off. The research-backed ratio that maximizes a full day's output without burnout.", best: "Long study days, exam prep" },
  { id: "deepwork", icon: "🧠", name: "Deep Work", tag: "90 min", work: 90, brk: 20, color: C.pink, desc: "90-minute distraction-free blocks matched to your ultradian rhythm. Phone away, one task, maximum depth.", best: "Thesis, hard concepts" },
  { id: "timeboxing", icon: "📦", name: "Timeboxing", tag: "Fixed slots", work: 40, brk: 10, color: C.green, desc: "Assign each task a fixed time slot in advance. Parkinson's Law in reverse — work shrinks to fit the box you give it.", best: "Busy days, many small tasks" },
  { id: "ultradian", icon: "🌗", name: "Ultradian", tag: "Rhythm", work: 75, brk: 25, color: C.amber, desc: "75-minute waves of work mirroring your body's natural energy cycles, with full 25-minute recovery between.", best: "All-day deep study" },
];
function StudySpace({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<"choose" | "session">("choose");
  const [tech, setTech] = useState(TECHNIQUES[0]);
  const [secs, setSecs] = useState(TECHNIQUES[0].work * 60);
  const [running, setRunning] = useState(false); const [onBreak, setOnBreak] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs((s) => { if (s <= 1) { setOnBreak((b) => !b); return (!onBreak ? tech.brk : tech.work) * 60; } return s - 1; }), 1000);
    return () => clearInterval(id);
  }, [running, onBreak, tech]);
  const begin = (t: typeof TECHNIQUES[0]) => { setTech(t); setSecs(t.work * 60); setOnBreak(false); setRunning(true); setStage("session"); };
  const total = (onBreak ? tech.brk : tech.work) * 60;
  const mm = String(Math.floor(secs / 60)).padStart(2, "0"), ss = String(secs % 60).padStart(2, "0");
  const R = 130, CIRC = 2 * Math.PI * R, pct = 1 - secs / total;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,4,0.94)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.4s ease", overflowY: "auto" }}>
      <button onClick={onClose} style={{ position: "fixed", top: 24, right: 28, background: C.glass, border: `1px solid ${C.border}`, color: C.muted, fontSize: 22, cursor: "pointer", width: 44, height: 44, borderRadius: 999, zIndex: 2 }}>×</button>
      {stage === "choose" ? (
        <div style={{ maxWidth: 920, width: "100%", animation: `popIn 0.5s ${C.spring}`, padding: "40px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ marginBottom: 16 }}><Pill>◈ Your study space</Pill></div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,5vw,44px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>How do you want to focus?</h2>
            <p style={{ color: C.muted, fontSize: 15, maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>Six science-backed techniques. Pick one — AIRA structures the session, starts your timer, and keeps you on track.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
            {TECHNIQUES.map((t) => (
              <button key={t.id} onClick={() => begin(t)} style={{ textAlign: "left", cursor: "pointer", padding: 24, borderRadius: 20, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${t.color}55,rgba(255,255,255,0.05)) border-box`, border: "1px solid transparent", transition: `all 0.3s ${C.ease}`, willChange: "transform" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${t.color}33`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><span style={{ fontSize: 32 }}>{t.icon}</span><span style={{ fontSize: 12, fontWeight: 700, color: t.color, letterSpacing: "0.05em" }}>{t.tag}</span></div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 12 }}>{t.desc}</p>
                <span style={{ fontSize: 11, color: t.color, background: `${t.color}18`, padding: "5px 12px", borderRadius: 999, fontWeight: 600 }}>Best for: {t.best}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", animation: `popIn 0.5s ${C.spring}` }}>
          <div style={{ marginBottom: 24 }}><span style={{ fontSize: 13, color: onBreak ? C.green : tech.color, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>{tech.icon} {tech.name} · {onBreak ? "Break" : "Focus"}</span></div>
          <div style={{ position: "relative", width: 320, height: 320, margin: "0 auto 36px" }}>
            <svg viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}><circle cx="160" cy="160" r={R} fill="none" stroke={C.border} strokeWidth="8" /><circle cx="160" cy="160" r={R} fill="none" stroke={tech.color} strokeWidth="8" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear", filter: `drop-shadow(0 0 10px ${tech.color})` }} /></svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: "var(--font-display)", fontSize: 76, fontWeight: 700, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{mm}:{ss}</div></div>
          </div>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 28 }}>
            <button onClick={() => setRunning(!running)} style={{ width: 72, height: 72, borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${tech.color},${C.violet})`, color: "#fff", fontSize: 26, boxShadow: `0 0 50px ${tech.color}66` }}>{running ? "⏸" : "▶"}</button>
            <button onClick={() => { setSecs(tech.work * 60); setOnBreak(false); setRunning(false); }} style={{ width: 72, height: 72, borderRadius: 999, border: `1px solid ${C.border}`, cursor: "pointer", background: C.glass, color: C.muted, fontSize: 22 }}>↺</button>
          </div>
          <button onClick={() => setStage("choose")} style={{ background: "none", border: "none", color: C.faint, fontSize: 14, cursor: "pointer" }}>← Change technique</button>
        </div>
      )}
    </div>
  );
}

/* ════════════ ENTRY PORTAL ════════════ */
function EntryPortal({ onEnter }: { onEnter: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onEnter} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", width: 220, height: 220, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Enter study space">
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${C.indigo}`, opacity: hov ? 0.6 - i * 0.18 : 0.3 - i * 0.1, transform: `scale(${1 + i * 0.18})`, animation: `portalRing ${2 + i * 0.5}s ease-out infinite`, animationDelay: `${i * 0.4}s` }} />)}
      <div style={{ width: 130, height: 130, borderRadius: "50%", background: `radial-gradient(circle at 40% 35%, #fff, ${C.cyan} 30%, ${C.indigo} 65%, ${C.violet})`, boxShadow: hov ? `0 0 80px ${C.indigo}, 0 0 120px ${C.violet}55` : `0 0 50px ${C.indigo}88`, display: "flex", alignItems: "center", justifyContent: "center", transform: hov ? "scale(1.08)" : "scale(1)", transition: `all 0.4s ${C.ease}`, animation: "pulseCore 4s ease-in-out infinite" }}><span style={{ fontSize: 34, transform: hov ? "scale(1.15)" : "scale(1)", transition: `transform 0.3s ${C.ease}` }}>{hov ? "→" : "✦"}</span></div>
      <span style={{ position: "absolute", bottom: -44, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontSize: 14, fontWeight: 600, color: hov ? C.fg : C.muted, letterSpacing: "0.05em", transition: "color 0.3s" }}>Enter your study space</span>
    </button>
  );
}

/* ════════════ AUTH MODAL ════════════ */
function AuthModal({ mode, onClose, onSwitch }: { mode: "in" | "up"; onClose: () => void; onSwitch: (m: "in" | "up") => void }) {
  const isUp = mode === "up";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1100, background: "rgba(0,0,4,0.9)", backdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.3s ease" }}>
      <div style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 44, maxWidth: 420, width: "100%", boxShadow: `0 0 100px ${C.indigo}44`, animation: `popIn 0.45s ${C.spring}` }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: C.faint, fontSize: 22, cursor: "pointer" }}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}><BrainLogo size={28} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>AIRA</span></div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>{isUp ? "Create your account" : "Welcome back"}</h2>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 28 }}>{isUp ? "Start your 7-day free trial. No card required." : "Sign in to continue your flow."}</p>
        <button data-clerk={isUp ? "sign-up-google" : "sign-in-google"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px", borderRadius: 12, background: "#fff", color: "#1a1a1a", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 12 }}><span style={{ fontSize: 18 }}>🔵</span> Continue with Google</button>
        <button data-clerk={isUp ? "sign-up-apple" : "sign-in-apple"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px", borderRadius: 12, background: "#000", color: "#fff", border: `1px solid ${C.border}`, fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}><span style={{ fontSize: 18 }}></span> Continue with Apple</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: C.border }} /><span style={{ fontSize: 12, color: C.faint }}>or</span><div style={{ flex: 1, height: 1, background: C.border }} /></div>
        <input data-clerk="email" type="email" placeholder="you@email.com" style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, color: C.fg, fontSize: 15, marginBottom: 12, outline: "none" }} />
        <input data-clerk="password" type="password" placeholder="Password" style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: C.surface, border: `1px solid ${C.border}`, color: C.fg, fontSize: 15, marginBottom: 20, outline: "none" }} />
        <GBtn full onClick={() => {}}>{isUp ? "Create account" : "Sign in"}</GBtn>
        <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 20 }}>{isUp ? "Already have an account? " : "New to AIRA? "}<button onClick={() => onSwitch(isUp ? "in" : "up")} style={{ background: "none", border: "none", color: C.cyan, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{isUp ? "Sign in" : "Sign up"}</button></p>
        <p style={{ textAlign: "center", fontSize: 11, color: C.faint, marginTop: 16, lineHeight: 1.6 }}>By continuing you agree to AIRA's Terms & Privacy. Powered by Clerk.</p>
      </div>
    </div>
  );
}

/* ════════════ WELCOME MODAL ════════════ */
function WelcomeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [{ icon: "🎉", title: "Welcome to AIRA Pro", body: "You unlocked everything — unlimited AI mentoring, all 15 subjects, all 6 focus techniques, and royalty-free audio.", cta: "Show me around" }, { icon: "✦", title: "Enter your study space", body: "Tap the glowing portal anytime to open a focus session. Pick a technique and AIRA starts your timer instantly.", cta: "Next" }, { icon: "📊", title: "Track everything", body: "Your dashboard shows focus time, streaks, mastery per subject, and your peak hours. AIRA learns how you study best.", cta: "Next" }, { icon: "⚡", title: "Flow state, on demand", body: "Notifications off. Phone away. Distraction-free. Built on neuroscience to get you deep — and keep you there.", cta: "Start learning" }];
  const s = steps[step]; const last = step === steps.length - 1;
  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,4,0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.4s ease" }}><div style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 48, maxWidth: 480, width: "100%", textAlign: "center", boxShadow: `0 0 100px ${C.indigo}44`, animation: `popIn 0.5s ${C.spring}` }}><div style={{ fontSize: 60, marginBottom: 24, animation: "floaty 3s ease-in-out infinite" }}>{s.icon}</div><h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>{s.title}</h2><p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>{s.body}</p><div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>{steps.map((_, i) => <div key={i} style={{ width: i === step ? 28 : 8, height: 8, borderRadius: 999, background: i === step ? `linear-gradient(90deg,${C.cyan},${C.indigo})` : C.border, transition: `all 0.4s ${C.ease}` }} />)}</div><GBtn full onClick={() => (last ? onClose() : setStep(step + 1))}>{s.cta}</GBtn>{!last && <button onClick={onClose} style={{ marginTop: 16, background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer" }}>Skip intro</button>}</div></div>;
}

/* ════════════ SOUND PLAYER ════════════ */
const SOUNDS = [{ id: "8d", icon: "🎧", name: "8D Ambient", note: "Spatial audio that moves around you" }, { id: "binaural", icon: "🌀", name: "Binaural Beats", note: "40Hz gamma tones for deep concentration" }, { id: "rain", icon: "🌧️", name: "Rainfall", note: "Steady rain to mask distractions" }, { id: "forest", icon: "🌲", name: "Forest", note: "Birdsong and wind for calm focus" }, { id: "cafe", icon: "☕", name: "Café Hum", note: "Gentle background chatter" }, { id: "silence", icon: "🔇", name: "Pure Silence", note: "No audio — just you and the work" }];
function SoundPlayer({ seen }: { seen: { [k: string]: boolean } }) {
  const [active, setActive] = useState("8d"); const [playing, setPlaying] = useState(false);
  return (
    <div data-k="snd" style={{ opacity: seen["snd"] ? 1 : 0, transform: seen["snd"] ? "translateY(0)" : "translateY(32px)", transition: `all 0.8s ${C.ease}`, willChange: "transform,opacity" }}>
      <div style={{ background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,rgba(34,211,238,0.4),rgba(123,92,255,0.25)) border-box`, border: "1px solid transparent", borderRadius: 24, padding: 36, backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, height: 70, marginBottom: 28 }}>{Array.from({ length: 34 }).map((_, i) => <div key={i} style={{ width: 4, borderRadius: 999, background: `linear-gradient(${C.cyan},${C.indigo})`, height: playing ? `${20 + Math.abs(Math.sin(i * 0.9)) * 50}px` : "8px", animation: playing ? `eq 0.${6 + (i % 5)}s ease-in-out infinite alternate` : "none", animationDelay: `${i * 0.04}s`, transition: "height 0.4s ease", willChange: "transform", transformOrigin: "bottom" }} />)}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>{SOUNDS.map((s) => { const on = s.id === active; return <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 999, cursor: "pointer", background: on ? `linear-gradient(135deg,${C.cyan}22,${C.indigo}22)` : "transparent", border: `1px solid ${on ? "rgba(34,211,238,0.5)" : C.border}`, color: on ? C.fg : C.muted, fontSize: 13, transition: `all 0.25s ${C.ease}` }}><span>{s.icon}</span>{s.name}</button>; })}</div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.faint, marginBottom: 24 }}>{SOUNDS.find((s) => s.id === active)?.note}</p>
        <div style={{ display: "flex", justifyContent: "center" }}><button onClick={() => setPlaying(!playing)} style={{ width: 64, height: 64, borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 22, boxShadow: `0 0 40px ${C.indigo}55` }}>{playing ? "⏸" : "▶"}</button></div>
        <p style={{ textAlign: "center", fontSize: 11, color: C.faint, marginTop: 16 }}>Royalty-free focus audio · 6 soundscapes on AIRA Pro</p>
      </div>
    </div>
  );
}

/* ════════════ DATA ════════════ */
const SCIENCE = [
  { i: "⚡", t: "Neural Phase Locking", s: "Ultradian Rhythm Research", b: "Structured focus intervals align with your brain's natural ultradian rhythms — the foundation of deep concentration." },
  { i: "🔁", t: "Spaced Repetition", s: "Ebbinghaus · replicated 2024", b: "The forgetting curve shows 70% loss within 24 hours. AIRA schedules reviews at the mathematically optimal moment." },
  { i: "✍️", t: "Active Recall", s: "Roediger & Karpicke, 2006", b: "Passive re-reading retains ~10%. Active recall forces retrieval, retaining up to 94%. Built into every session." },
  { i: "🎯", t: "Socratic Method", s: "Chi et al., Self-Explanation", b: "Guided discovery creates 2x stronger neural pathways than passive instruction. AIRA asks, then guides you." },
];
const BENTO = [
  { i: "🎯", t: "Six Focus Techniques", b: "Pomodoro, Flowtime, 52/17, Deep Work, Timeboxing, Ultradian — each explained, each structured by AIRA.", c: C.blue, span: 2 },
  { i: "🤖", t: "Socratic AI Mentor", b: "Guides you to answers instead of handing them over.", c: C.violet, span: 1 },
  { i: "📊", t: "Live Dashboard", b: "Focus time, streaks, mastery, peak hours — all tracked.", c: C.cyan, span: 1 },
  { i: "🔁", t: "Auto Spaced Review", b: "Never forget what you learn. Reviews scheduled at the perfect moment.", c: C.green, span: 2 },
];
const PREMIUM = [
  { i: "♾️", t: "Unlimited AI Mentoring", b: "No daily caps, no token limits. Ask AIRA as much as your curiosity demands — every hour, every subject, forever." },
  { i: "🧬", t: "Adaptive Difficulty Engine", b: "AIRA measures your accuracy and speed, then calibrates every question to the exact edge of your ability — where learning is fastest." },
  { i: "🎧", t: "Royalty-Free Focus Audio", b: "8D spatial ambient, binaural beats tuned to 40Hz gamma, rain, forest, café. Engineered to deepen focus, not distract." },
  { i: "📊", t: "Deep Progress Analytics", b: "Your retention curve, peak focus hours, strongest and weakest concepts — the data top students use to study less and score more." },
  { i: "🔥", t: "Streak & Momentum System", b: "Daily streaks, focus milestones, and a momentum score that turns consistent study into a habit you won't want to break." },
  { i: "🏆", t: "Verified Certificates", b: "Complete a subject, earn a shareable certificate with a verification link — proof of mastery for LinkedIn, CVs, applications." },
  { i: "📥", t: "Offline & Export", b: "Download sessions for offline study; export notes, summaries, and flashcards anytime. Your knowledge, your data." },
  { i: "🌙", t: "Device-Free Mode", b: "AIRA tells you exactly when to put your phone down and work on paper — the biggest focus upgrade most students never make." },
  { i: "🧩", t: "Auto Flashcard Generator", b: "AIRA turns any session into spaced-repetition flashcards automatically — no manual card-making, just instant review material." },
  { i: "🎙️", t: "Full Subject Library", b: "15 categories from AI to Philosophy, plus any custom topic. AIRA adapts to anything you want to learn." },
];
const FOCUS_MODES = [
  { i: "🔕", t: "Notifications Off", b: "AIRA's focus mode signals you to silence your phone and close every tab. Deep work demands an undivided mind." },
  { i: "📵", t: "Device-Away Sessions", b: "Some lessons are designed for your phone face-down across the room. AIRA tells you exactly when to step away." },
  { i: "🎧", t: "Royalty-Free Audio", b: "8D ambient, binaural beats, rain, forest, café, or silence. Engineered to deepen focus without pulling attention." },
  { i: "🌊", t: "Flow State Tracking", b: "AIRA learns when you focus best — 'your peak is 9am' — and nudges your hardest sessions into your sharpest hours." },
];
const STUDY_TYPES = [
  { i: "💻", t: "Screen-Based Study", color: C.blue, b: "For subjects needing a device: coding, data science, AI tools. AIRA keeps you in one focused window and structures hands-on practice.", items: ["Coding & Programming", "Data Science", "AI & Prompt Engineering", "Marketing & Growth"] },
  { i: "📖", t: "Device-Free Study", color: C.cyan, b: "For subjects best learned off-screen: math on paper, reading, memorization. AIRA sets the structure, then tells you to put the phone down.", items: ["Mathematics", "Philosophy & Logic", "History & Society", "Language learning"] },
];
const SUBJECTS = ["🤖 AI & Prompt Engineering", "💻 Coding & Programming", "📐 Mathematics", "🌍 English & Language", "📊 Data Science", "💼 Business & Strategy", "🧠 Psychology", "💰 Finance & Economics", "⚖️ Law Basics", "🎯 Marketing & Growth", "🧬 Biology & Health", "⚗️ Chemistry", "🔭 Physics", "📜 History & Society", "🎨 Philosophy & Logic"];
const GUIDE = [
  { n: "01", t: "Set one clear intention", b: "Before you start, write the single thing you want to understand. Vague goals produce vague focus. AIRA helps you turn any topic into one sharp, specific intention." },
  { n: "02", t: "Remove every distraction first", b: "Don't rely on willpower mid-session. Phone in another room, notifications off, one tab. It takes 23 minutes to refocus after an interruption — so the goal is zero." },
  { n: "03", t: "Work in your brain's rhythm", b: "Your attention runs on ~90-minute ultradian cycles. Pick a technique — Pomodoro for short tasks, Deep Work for hard ones — and let the rhythm carry you." },
  { n: "04", t: "Learn actively, never passively", b: "Re-reading feels productive but retains almost nothing. Read, close it, explain it out loud. Active recall is the most powerful technique in the research." },
  { n: "05", t: "Let the AI question you", b: "Don't ask AIRA for answers — let it ask you. Being guided to discover an answer builds twice the neural connection of being told it." },
  { n: "06", t: "Review at the right moment", b: "You forget 70% within 24 hours unless you review. AIRA's spaced-repetition engine schedules each review right before you'd forget — never wasted, never too late." },
  { n: "07", t: "Reflect every week", b: "Each Sunday: what did I learn, what's unclear, what's next? This single habit lifts retention 20–30%. AIRA generates your weekly reflection automatically." },
];
const TESTIMONIALS = [
  { q: "I went from cramming the night before to remembering things weeks later. The spaced reviews are unreal.", n: "Med student", r: "Anatomy", c: C.cyan },
  { q: "The Socratic mentor won't let me get away with surface answers. It's like a tutor who actually cares.", n: "CS undergrad", r: "Algorithms", c: C.violet },
  { q: "The dashboard showing my peak hours changed how I plan my whole day. I study smarter now.", n: "Self-taught dev", r: "System design", c: C.blue },
  { q: "Six techniques meant I finally found one that fits my brain. Timeboxing saved my exam season.", n: "PhD candidate", r: "Research", c: C.pink },
];
const FAQ: [string, string][] = [
  ["How is AIRA different from a chatbot?", "A chatbot answers questions. AIRA teaches. It picks a technique with you, structures focused sessions, uses Socratic questioning, tracks progress on a dashboard, and schedules spaced reviews. A complete study system."],
  ["What study techniques can I use?", "Six proven methods: Pomodoro, Flowtime, 52/17, Deep Work, Timeboxing, and Ultradian. Each comes with a plain explanation so you know exactly what you're choosing and why."],
  ["What does the dashboard show?", "Your daily focus time, current streak, sessions per week, concepts mastered, retention rate, mastery per subject, and your peak focus hours. AIRA uses this to schedule hard topics when you're sharpest."],
  ["Do I need my phone for every lesson?", "No. Many AIRA sessions are device-free — it sets the structure, then tells you to put your phone away. Other subjects need a screen. AIRA tells you which is which."],
  ["What about focus audio?", "AIRA Pro includes royalty-free focus audio: 8D ambient, binaural beats, rain, forest, café, or silence. The free plan focuses on the study system itself."],
  ["Is there really a free trial?", "Yes. 7 days, full access, no credit card required. If AIRA doesn't change how you study, just don't subscribe."],
  ["What if I want to cancel?", "Cancel any time in account settings. No penalties, no questions."],
];

function StatsBand({ seen }: { seen: { [k: string]: boolean } }) {
  const run = !!seen["stats"];
  const a = useCountUp(94, run), b = useCountUp(2, run), c = useCountUp(40, run), d = useCountUp(6, run);
  const stats = [{ v: a, suf: "%", label: "retention with active recall vs 10% from re-reading", col: C.cyan }, { v: b, suf: "x", label: "stronger neural pathways via the Socratic method", col: C.violet }, { v: c, suf: "%", label: "more deep-focus time in structured sessions", col: C.blue }, { v: d, suf: "", label: "science-backed focus techniques to choose from", col: C.pink }];
  return <div data-k="stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24 }}>{stats.map((s, i) => <div key={i} style={{ textAlign: "center", opacity: seen["stats"] ? 1 : 0, transform: seen["stats"] ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s ${C.ease} ${i * 100}ms` }}><div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 700, color: s.col, lineHeight: 1, marginBottom: 12, textShadow: `0 0 30px ${s.col}44` }}>{Math.round(s.v)}{s.suf}</div><p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, maxWidth: 200, margin: "0 auto" }}>{s.label}</p></div>)}</div>;
}
function StudyGuide({ seen, open, setOpen }: { seen: { [k: string]: boolean }; open: number | null; setOpen: (n: number | null) => void }) {
  return <div>{GUIDE.map((g, i) => <div key={g.n} data-k={`g-${i}`} style={{ opacity: seen[`g-${i}`] ? 1 : 0, transform: seen[`g-${i}`] ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ${C.ease} ${i * 60}ms`, background: open === i ? `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo}55,rgba(255,255,255,0.05)) border-box` : "transparent", border: open === i ? "1px solid transparent" : `1px solid ${C.border}`, borderRadius: 18, marginBottom: 12, overflow: "hidden" }}><button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, cursor: "pointer", textAlign: "left", color: C.fg }}><span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: open === i ? C.cyan : C.faint, minWidth: 36 }}>{g.n}</span><span style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>{g.t}</span><span style={{ fontSize: 22, color: C.violet, transform: open === i ? "rotate(45deg)" : "none", transition: `transform 0.3s ${C.ease}` }}>+</span></button><div style={{ maxHeight: open === i ? 240 : 0, overflow: "hidden", transition: `max-height 0.45s ${C.ease}` }}><p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.75, padding: "0 24px 24px 70px" }}>{g.b}</p></div></div>)}</div>;
}

/* ════════════════════════════════════════════════════════════════ MAIN */
export default function Home() {
  const seen = useReveal();
  const { p, y } = useScrollProgress();
  const [showWelcome, setShowWelcome] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [auth, setAuth] = useState<null | "in" | "up">(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openGuide, setOpenGuide] = useState<number | null>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true" || params.get("checkout") === "success") setShowWelcome(true);
  }, []);
  const buy = useCallback(() => { window.location.href = CHECKOUT_URL; }, []);
  const reveal = (k: string, d = 0) => ({ "data-k": k, style: { opacity: seen[k] ? 1 : 0, transform: seen[k] ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)", filter: seen[k] ? "blur(0)" : "blur(6px)", transition: `opacity 0.9s ${C.ease} ${d}ms, transform 0.9s ${C.ease} ${d}ms, filter 0.9s ${C.ease} ${d}ms`, willChange: "transform,opacity,filter" } as React.CSSProperties });
  const HD = (e: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em", ...e });

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
        input::placeholder{color:${C.faint}}
        input:focus{border-color:rgba(123,92,255,0.5)!important}
        button:focus-visible,a:focus-visible{outline:2px solid ${C.cyan};outline-offset:3px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulseCore{0%,100%{transform:scale(1);opacity:0.9}50%{transform:scale(1.08);opacity:1}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.85}50%{transform:scale(1.1);opacity:1}}
        @keyframes drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-40px,30px) scale(0.95)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 40px rgba(123,92,255,0.2)}50%{box-shadow:0 0 70px rgba(123,92,255,0.4)}}
        @keyframes eq{from{transform:scaleY(0.35)}to{transform:scaleY(1)}}
        @keyframes portalRing{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.6);opacity:0}}
        @keyframes scrollDot{0%{transform:translateY(0);opacity:1}80%{opacity:0}100%{transform:translateY(36px);opacity:0}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
        @media(max-width:860px){.dash-side{display:none!important}}
        @media(max-width:768px){.nav-links,.nav-auth-extra{display:none!important}.nav-wrap{padding:0 20px!important}.sec{padding:80px 20px!important}.hero-h1{font-size:48px!important}.bento{grid-template-columns:1fr!important}.bento>*{grid-column:span 1!important}}
      `}</style>

      <LivingBackground p={p} />
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      {studyOpen && <StudySpace onClose={() => setStudyOpen(false)} />}
      {auth && <AuthModal mode={auth} onClose={() => setAuth(null)} onSwitch={(m) => setAuth(m)} />}

      {/* NAV */}
      <nav className="nav-wrap" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(24px)", background: y > 40 ? "rgba(0,0,4,0.82)" : "rgba(0,0,4,0.3)", borderBottom: `1px solid ${y > 40 ? C.border : "transparent"}`, height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "all 0.4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}><BrainLogo size={30} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 6s ease infinite" }}>AIRA</span></div>
        <div className="nav-links" style={{ display: "flex", gap: 26, fontSize: 14, color: C.muted }}>{[["Features", "features"], ["Dashboard", "dashboard"], ["Science", "science"], ["Guide", "guide"], ["Premium", "premium"], ["Pricing", "pricing"]].map(([l, h]) => <a key={l} href={`#${h}`} style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)} onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{l}</a>)}</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}><button className="nav-auth-extra" onClick={() => setAuth("in")} style={{ background: "none", border: "none", color: C.muted, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Sign in</button><GBtn onClick={() => setAuth("up")}>Sign up free</GBtn></div>
      </nav>

      {/* HERO */}
      <section className="sec" style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 0", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) translateY(${y * 0.15}px)`, fontFamily: "var(--font-display)", fontSize: "clamp(180px,38vw,560px)", fontWeight: 700, color: "transparent", WebkitTextStroke: "1px rgba(123,92,255,0.08)", letterSpacing: "-0.04em", zIndex: 0, pointerEvents: "none", whiteSpace: "nowrap", userSelect: "none" }}>AIRA</div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div {...reveal("hp")} style={{ ...reveal("hp").style, marginBottom: 34 }}><Pill>◈ AI-Powered Study Mentor</Pill></div>
          <h1 className="hero-h1" style={HD({ fontSize: "clamp(48px,9vw,104px)", lineHeight: 1.0, marginBottom: 30, maxWidth: 1000 })}>Get into<br /><WordCycler /></h1>
          <p style={{ fontSize: "clamp(17px,3vw,21px)", color: C.muted, maxWidth: 600, lineHeight: 1.7, margin: "0 auto 44px" }}>Pick a study technique, and your AI mentor structures the session, keeps you focused, and tracks everything on your dashboard. Deep study, made effortless.</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 70 }}><EntryPortal onEnter={() => setStudyOpen(true)} /></div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}><GBtn big onClick={() => setAuth("up")}>Start free trial</GBtn><GhostBtn onClick={() => setStudyOpen(true)}>Enter study space →</GhostBtn></div>
          <p style={{ fontSize: 13, color: C.faint }}>7-day free trial · No credit card · Cancel anytime</p>
        </div>
        <div style={{ position: "absolute", bottom: 36 }}><div style={{ width: 26, height: 42, border: `2px solid ${C.border}`, borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 8 }}><div style={{ width: 4, height: 8, borderRadius: 999, background: C.cyan, animation: "scrollDot 1.8s ease-in-out infinite" }} /></div></div>
      </section>

      {/* MARQUEE */}
      <div style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "18px 0", overflow: "hidden", background: "rgba(0,0,4,0.4)" }}><div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", animation: "marquee 26s linear infinite", width: "max-content" }}>{[...Array(2)].map((_, r) => <div key={r} style={{ display: "flex", gap: 48 }}>{["⚡ Neural Phase Locking", "🔁 Spaced Repetition", "✍️ Active Recall", "🎯 Socratic Method", "📦 Timeboxing", "🌗 Ultradian", "📚 15 Subjects", "🎧 Focus Audio"].map((t) => <span key={t + r} style={{ fontSize: 14, color: C.muted, letterSpacing: "0.04em" }}>{t}</span>)}</div>)}</div></div>

      {/* BENTO FEATURES */}
      <section id="features" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("bn-h")} style={{ ...reveal("bn-h").style, textAlign: "center", marginBottom: 70 }}><Label>Everything you need</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>One system. <Grad>Total focus.</Grad></h2></div>
        <div className="bento" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {BENTO.map((b, i) => <Tilt key={b.t} k={`bn-${i}`} seen={seen} delay={i * 100} span={b.span} style={{ padding: 36 }}><div style={{ fontSize: 40, marginBottom: 18 }}>{b.i}</div><h3 style={HD({ fontSize: 22, marginBottom: 10, color: b.c })}>{b.t}</h3><p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.7 }}>{b.b}</p></Tilt>)}
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div {...reveal("dh-h")} style={{ ...reveal("dh-h").style, textAlign: "center", marginBottom: 56 }}><Label>Your command center</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>See your progress <Grad>in real time.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 540, margin: "18px auto 0", lineHeight: 1.7 }}>This is where you study. Track focus time, streaks, mastery per subject, and discover your peak hours — try the tabs below.</p></div>
        <DashboardPreview seen={seen} />
      </section>

      {/* SCIENCE */}
      <section id="science" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("sci-h")} style={{ ...reveal("sci-h").style, textAlign: "center", marginBottom: 70 }}><Label>Backed by neuroscience</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>Why AIRA works</h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16 }}>Every feature is built on published, peer-reviewed research — not guesswork.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>{SCIENCE.map((c, i) => <Tilt key={c.t} k={`sci-${i}`} seen={seen} delay={i * 90}><div style={{ fontSize: 30, marginBottom: 18 }}>{c.i}</div><h3 style={HD({ fontSize: 20, marginBottom: 12 })}>{c.t}</h3><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 18 }}>{c.b}</p><span style={{ fontSize: 11, color: C.cyan, background: "rgba(34,211,238,0.08)", padding: "5px 11px", borderRadius: 7, fontWeight: 600 }}>Basis: {c.s}</span></Tilt>)}</div>
        </div>
      </section>

      {/* STATS */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div {...reveal("stats-h")} style={{ ...reveal("stats-h").style, textAlign: "center", marginBottom: 60 }}><Label>The numbers</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Study methods that <Grad>actually work.</Grad></h2></div>
        <StatsBand seen={seen} />
      </section>

      {/* STUDY GUIDE */}
      <section id="guide" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 820, margin: "0 auto" }}>
        <div {...reveal("gd-h")} style={{ ...reveal("gd-h").style, textAlign: "center", marginBottom: 56 }}><Label>The AIRA method</Label><h2 style={HD({ fontSize: "clamp(32px,4.6vw,48px)" })}>How to study with AI, <Grad>the right way.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 540, margin: "18px auto 0", lineHeight: 1.7 }}>Seven research-backed steps that turn scattered studying into real, lasting learning — the method AIRA runs you through every session.</p></div>
        <StudyGuide seen={seen} open={openGuide} setOpen={setOpenGuide} />
      </section>

      {/* FOCUS + SOUND */}
      <section id="focus" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("fm-h")} style={{ ...reveal("fm-h").style, textAlign: "center", marginBottom: 70 }}><Label>Distraction-free by design</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>Phone away. <Grad>Mind present.</Grad></h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, marginBottom: 48 }}>{FOCUS_MODES.map((m, i) => <Tilt key={m.t} k={`fm-${i}`} seen={seen} delay={i * 90}><div style={{ fontSize: 32, marginBottom: 18 }}>{m.i}</div><h3 style={HD({ fontSize: 18, marginBottom: 10 })}>{m.t}</h3><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{m.b}</p></Tilt>)}</div>
          <SoundPlayer seen={seen} />
        </div>
      </section>

      {/* PREMIUM */}
      <section id="premium" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("pr-h")} style={{ ...reveal("pr-h").style, textAlign: "center", marginBottom: 70 }}><Label>Everything in Pro</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>Ten reasons to <Grad>go Pro.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>{PREMIUM.map((p2, i) => <Tilt key={p2.t} k={`pr-${i}`} seen={seen} delay={(i % 3) * 90}><div style={{ fontSize: 30, marginBottom: 14 }}>{p2.i}</div><h3 style={HD({ fontSize: 18, marginBottom: 10 })}>{p2.t}</h3><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{p2.b}</p></Tilt>)}</div>
      </section>

      {/* STUDY TYPES */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("st-h")} style={{ ...reveal("st-h").style, textAlign: "center", marginBottom: 70 }}><Label>Two ways to study</Label><h2 style={HD({ fontSize: "clamp(32px,4.6vw,48px)" })}>Screen when you need it. <Grad>Paper when you don't.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 22 }}>{STUDY_TYPES.map((s, i) => <Tilt key={s.t} k={`st-${i}`} seen={seen} delay={i * 120} style={{ padding: 40 }}><div style={{ fontSize: 42, marginBottom: 18 }}>{s.i}</div><h3 style={HD({ fontSize: 24, marginBottom: 12 })}>{s.t}</h3><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>{s.b}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{s.items.map((it) => <span key={it} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 14px", fontSize: 12, color: s.color }}>{it}</span>)}</div></Tilt>)}</div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1140, margin: "0 auto" }}>
        <div {...reveal("ts-h")} style={{ ...reveal("ts-h").style, textAlign: "center", marginBottom: 60 }}><Label>What learners say</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Built for how you <Grad>actually learn.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>{TESTIMONIALS.map((t, i) => <Tilt key={i} k={`ts-${i}`} seen={seen} delay={i * 100}><div style={{ fontSize: 28, color: t.c, marginBottom: 12, fontFamily: "var(--font-display)" }}>"</div><p style={{ fontSize: 15, color: C.fg, lineHeight: 1.7, marginBottom: 20 }}>{t.q}</p><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${t.c},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{t.n[0]}</div><div><div style={{ fontSize: 13, fontWeight: 600 }}>{t.n}</div><div style={{ fontSize: 12, color: C.faint }}>{t.r}</div></div></div></Tilt>)}</div>
      </section>

      {/* SUBJECTS */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div {...reveal("subj-h")} style={{ ...reveal("subj-h").style, textAlign: "center", marginBottom: 52 }}><Label>15 subject categories</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Study anything. <Grad>Master it.</Grad></h2></div>
        <div {...reveal("subj-g")} style={{ ...reveal("subj-g").style, display: "flex", flexWrap: "wrap", gap: 11, justifyContent: "center", marginBottom: 32 }}>{SUBJECTS.map((s) => <span key={s} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "11px 19px", fontSize: 13, color: C.muted, cursor: "default", backdropFilter: "blur(10px)", transition: `all 0.25s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(123,92,255,0.5)"; e.currentTarget.style.color = C.fg; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.transform = "none"; }}>{s}</span>)}</div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div {...reveal("p-h")} style={{ ...reveal("p-h").style, textAlign: "center", marginBottom: 70 }}><Label>Pricing</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>$9.99/month. <Grad>Everything.</Grad></h2><p style={{ color: C.muted, marginTop: 14 }}>One simple plan. Cancel anytime.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22 }}>
            <Tilt k="pf" seen={seen} style={{ padding: 40 }}><h3 style={HD({ fontSize: 22, marginBottom: 8 })}>Free</h3><div style={{ fontSize: 42, fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 4 }}>$0</div><p style={{ fontSize: 13, color: C.muted, marginBottom: 26 }}>7-day full access trial</p>{["AI mentor (trial period)", "All 6 focus techniques", "Study space + dashboard", "Basic progress tracking", "No credit card required"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.muted }}><span style={{ color: C.green }}>✓</span>{f}</div>)}<div style={{ marginTop: 26 }}><GhostBtn full onClick={() => setAuth("up")}>Start free trial</GhostBtn></div></Tilt>
            <Tilt k="pp" seen={seen} delay={100} style={{ padding: 40, animation: "pulseGlow 4s ease-in-out infinite" }}><div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${C.blue},${C.violet})`, padding: "6px 22px", borderRadius: "0 0 12px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", zIndex: 2 }}>MOST POPULAR</div><h3 style={HD({ fontSize: 22, marginBottom: 8, marginTop: 10 })}>AIRA Pro</h3><div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 42, fontWeight: 700, fontFamily: "var(--font-display)" }}>$9.99</span><span style={{ color: C.muted }}>/month</span></div><p style={{ fontSize: 13, color: C.cyan, marginBottom: 26 }}>Billed monthly · Cancel anytime</p>{["Unlimited AI mentor sessions", "All 6 focus techniques", "All 15 subject categories", "Full dashboard + analytics", "6 royalty-free soundscapes", "Spaced repetition + flashcards", "Streaks + certificates", "Export + offline mode", "Cancel anytime"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.fg }}><span style={{ color: C.green }}>✓</span>{f}</div>)}<div style={{ marginTop: 26 }}><GBtn full onClick={buy}>Start 7-day free trial</GBtn></div></Tilt>
          </div>
          <p style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: C.faint }}>Secure checkout via Lemon Squeezy · Cancel anytime · A private tutor costs $50–200/hour. AIRA is $9.99/month, unlimited.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "130px 48px", maxWidth: 820, margin: "0 auto" }}>
        <div {...reveal("f-h")} style={{ ...reveal("f-h").style, textAlign: "center", marginBottom: 52 }}><Label>Questions</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Common questions</h2></div>
        {FAQ.map((f, i) => <div key={f[0]} {...reveal(`fq-${i}`, i * 50)} style={{ ...reveal(`fq-${i}`, i * 50).style, borderBottom: `1px solid ${C.border}` }}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", color: C.fg }}><span style={{ fontSize: 16, fontWeight: 500 }}>{f[0]}</span><span style={{ fontSize: 22, color: C.violet, transform: openFaq === i ? "rotate(45deg)" : "none", transition: `transform 0.3s ${C.ease}`, flexShrink: 0, marginLeft: 16 }}>+</span></button><div style={{ maxHeight: openFaq === i ? 240 : 0, overflow: "hidden", transition: `max-height 0.45s ${C.ease}` }}><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, paddingBottom: 22 }}>{f[1]}</p></div></div>)}
      </section>

      {/* FINAL CTA */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "170px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "30%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.indigo}22,transparent 65%)`, filter: "blur(60px)", animation: "breathe 8s ease-in-out infinite", pointerEvents: "none", willChange: "transform,opacity" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 {...reveal("cta-h")} style={{ ...reveal("cta-h").style, ...HD({ fontSize: "clamp(40px,7vw,68px)", marginBottom: 26, lineHeight: 1.04 }) }}>Your mind is capable<br /><Grad>of more.</Grad></h2>
          <p style={{ fontSize: 18, color: C.muted, maxWidth: 490, margin: "0 auto 42px", lineHeight: 1.7 }}>Stop fighting for focus. Start building it. AIRA turns every study session into a structured path to mastery.</p>
          <GBtn big onClick={() => setAuth("up")}>Start free trial</GBtn>
          <p style={{ marginTop: 16, fontSize: 13, color: C.faint }}>7 days free · No card · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${C.border}`, padding: "60px 48px 40px", background: C.deep }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 280 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><BrainLogo size={26} /><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 23, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AIRA</div></div><p style={{ fontSize: 14, color: C.faint, lineHeight: 1.7 }}>Your AI study mentor. Get into flow. Stay there.</p></div>
            {[{ t: "Product", l: ["Features", "Dashboard", "Premium", "Pricing"] }, { t: "Study", l: ["Study Space", "Study Guide", "Techniques", "Device-free"] }, { t: "Company", l: ["About", "Contact", "Privacy", "Terms"] }].map((col) => <div key={col.t}><h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 16 }}>{col.t}</h4><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{col.l.map((l) => <a key={l} href="#" style={{ fontSize: 14, color: C.faint, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>{l}</a>)}</div></div>)}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}><p style={{ fontSize: 13, color: C.faint }}>© 2026 AIRA Mentor. Built with care. 🇹🇷</p><p style={{ fontSize: 13, color: C.faint }}>airamentor.com</p></div>
        </div>
      </footer>
    </main>
  );
}
