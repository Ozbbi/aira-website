"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════════
   AIRA MENTOR — V9 FINAL · clean, no emojis, minimal line icons
   Engaging landing advantages pricing at bottom · app workspace
   $9.99/mo · Lemon Squeezy · Clerk-ready · zero images · 120fps
   ════════════════════════════════════════════════════════════════════════ */

const CHECKOUT_URL =
  "https://airamentor.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";
const LIFETIME_CODE = "16025397070";

const C = {
  void: "#000004", deep: "#03030A", base: "#06060F", elev: "#0B0B18", elev2: "#101022",
  surface: "rgba(255,255,255,0.04)", glass: "rgba(255,255,255,0.05)",
  fg: "#F2F2FA", muted: "#9A9AB5", faint: "#5A5A75",
  blue: "#5B7CFA", indigo: "#7B5CFF", violet: "#A855F7", cyan: "#22D3EE",
  pink: "#F472D0", green: "#34F5C5", amber: "#FBBF24",
  border: "rgba(255,255,255,0.08)", ease: "cubic-bezier(0.16,1,0.3,1)",
  spring: "cubic-bezier(0.34,1.56,0.64,1)",
};
const TINTS = [
  { at: 0.0, a: "#7B5CFF", b: "#22D3EE" }, { at: 0.16, a: "#5B7CFA", b: "#A855F7" },
  { at: 0.32, a: "#22D3EE", b: "#34F5C5" }, { at: 0.48, a: "#A855F7", b: "#F472D0" },
  { at: 0.64, a: "#34F5C5", b: "#5B7CFA" }, { at: 0.82, a: "#7B5CFF", b: "#22D3EE" },
];
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function hexToRgb(h: string) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function mix(h1: string, h2: string, t: number) { const [r1, g1, b1] = hexToRgb(h1), [r2, g2, b2] = hexToRgb(h2); return `rgb(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))})`; }
function useTint(p: number) { let i = 0; for (let k = 0; k < TINTS.length - 1; k++) if (p >= TINTS[k].at) i = k; const cur = TINTS[i], nxt = TINTS[Math.min(i + 1, TINTS.length - 1)]; const span = nxt.at - cur.at || 1; const t = Math.max(0, Math.min(1, (p - cur.at) / span)); return { a: mix(cur.a, nxt.a, t), b: mix(cur.b, nxt.b, t) }; }
function useReveal() {
  const [seen, setSeen] = useState<{ [k: string]: boolean }>({});
  useEffect(() => {
    const reveal = (k?: string | null) => { if (!k) return; setSeen((p) => (p[k] ? p : { ...p, [k]: true })); };
    const tracked: HTMLElement[] = [];
    const observed = new WeakSet<Element>();
    // 1) Anything already in or just below the first screen is shown immediately — no blank first paint.
    const showNearViewport = () => { const vh = window.innerHeight; tracked.forEach((el) => { if (el.getBoundingClientRect().top < vh * 1.15) reveal(el.dataset.k); }); };
    // 2) Pre-trigger ~160px before an element scrolls into view so the animation is done by the time it's seen.
    const ob = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal((e.target as HTMLElement).dataset.k); ob.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px 160px 0px" });
    const scan = () => { document.querySelectorAll<HTMLElement>("[data-k]").forEach((el) => { if (!observed.has(el)) { observed.add(el); tracked.push(el); ob.observe(el); } }); showNearViewport(); };
    scan();
    // 3) Catch sections that mount later (tabs, modals, lazy content).
    const mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });
    // 4) Absolute safety net: nothing is allowed to stay invisible.
    const safety = window.setTimeout(() => tracked.forEach((el) => reveal(el.dataset.k)), 3000);
    return () => { ob.disconnect(); mo.disconnect(); clearTimeout(safety); };
  }, []);
  return seen;
}
function useScrollProgress() {
  const [p, setP] = useState(0); const [y, setY] = useState(0);
  useEffect(() => { let raf = 0; const on = () => { if (raf) return; raf = requestAnimationFrame(() => { const max = document.documentElement.scrollHeight - window.innerHeight; setP(max > 0 ? window.scrollY / max : 0); setY(window.scrollY); raf = 0; }); }; on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on, { passive: true }); return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); }; }, []);
  return { p, y };
}
function useCountUp(target: number, run: boolean, dur = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => { if (!run) return; let raf = 0; const start = performance.now(); const tick = (now: number) => { const t = Math.min(1, (now - start) / dur); setV(target * (1 - Math.pow(1 - t, 3))); if (t < 1) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf); }, [run, target, dur]);
  return v;
}

/* ════════════ ICONS (clean line icons, no emoji) ════════════ */
function Icon({ name, size = 22, color = "currentColor", stroke = 1.6 }: { name: string; size?: number; color?: string; stroke?: number }) {
  const p: { [k: string]: React.ReactNode } = {
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill={color} /></>,
    bot: <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M9 16h6" /><path d="M4 12H2M22 12h-2" /></>,
    chart: <><path d="M4 20V4M4 20h16" /><path d="M8 16v-4M12 16V8M16 16v-6M20 16v-2" /></>,
    repeat: <><path d="M17 2l4 4-4 4" /><path d="M3 11v-1a4 4 0 014-4h14" /><path d="M7 22l-4-4 4-4" /><path d="M21 13v1a4 4 0 01-4 4H3" /></>,
    bolt: <path d="M13 2L4.5 13.5H11l-1 8.5L19 10.5h-6.5z" />,
    pencil: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" /></>,
    brain: <><path d="M9.5 4a2.5 2.5 0 00-2.5 2.5c-1.4.2-2.5 1.4-2.5 2.9 0 .8.3 1.5.8 2-.5.5-.8 1.2-.8 2 0 1.5 1.1 2.7 2.5 2.9A2.5 2.5 0 009.5 21H12V4z" /><path d="M14.5 4A2.5 2.5 0 0117 6.5c1.4.2 2.5 1.4 2.5 2.9 0 .8-.3 1.5-.8 2 .5.5.8 1.2.8 2 0 1.5-1.1 2.7-2.5 2.9A2.5 2.5 0 0114.5 21H12V4z" /></>,
    moon: <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />,
    wave: <path d="M2 12c2 0 2-3 4-3s2 6 4 6 2-9 4-9 2 6 4 6 2-3 2-3" />,
    box: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flame: <path d="M12 2c1 3 4 4.5 4 8a4 4 0 11-8 0c0-1.5.5-2.5 1-3 .2 1 .8 1.5 1.5 1.5C12 7 11 4.5 12 2z" />,
    trophy: <><path d="M8 21h8M12 17v4" /><path d="M7 4h10v5a5 5 0 01-10 0z" /><path d="M7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3" /></>,
    download: <><path d="M12 3v12M7 11l5 5 5-5" /><path d="M4 21h16" /></>,
    cards: <><rect x="3" y="5" width="13" height="16" rx="2" /><path d="M8 2h11a2 2 0 012 2v13" /></>,
    map: <><path d="M9 4l6 2 6-2v14l-6 2-6-2-6 2V6z" /><path d="M9 4v14M15 6v14" /></>,
    bell: <><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></>,
    book: <><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19a2 2 0 012-2h13" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    play: <path d="M7 5l12 7-12 7z" fill={color} />,
    pause: <><rect x="7" y="5" width="3.5" height="14" rx="1" fill={color} /><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill={color} /></>,
    reset: <><path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3" /><path d="M3 3v4h4" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    gift: <><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13M3 12h18" /><path d="M12 8S10 3 7.5 3 5.5 6 12 8zM12 8s2-5 4.5-5S18.5 6 12 8z" /></>,
    spark: <path d="M12 2l2.2 6.5L21 11l-6.8 2.5L12 20l-2.2-6.5L3 11l6.8-2.5z" />,
    layers: <><path d="M12 2l9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5M3 17l9 5 9-5" /></>,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />,
    image: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="9" r="1.8" /><path d="M21 16l-5-5L5 21" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{p[name]}</svg>;
}

/* ════════════ LIVING BACKGROUND ════════════ */
function LivingBackground({ p }: { p: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tint = useTint(p);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || ((navigator as any).deviceMemory || 8) <= 4 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lowEnd) { canvas.style.display = "none"; return; }
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    const stars = Array.from({ length: 18 }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2, tw: Math.random() * Math.PI * 2 }));
    const nodes = Array.from({ length: 6 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: Math.random() * 1.5 + 0.6 }));
    let raf = 0, t = 0;
    const draw = () => {
      t += 0.008; ctx.clearRect(0, 0, w, h);
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
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "60vw", height: "60vw", borderRadius: "50%", background: tint.a, filter: "blur(140px)", opacity: 0.14, transition: "background 0.6s linear", animation: "drift 28s ease-in-out infinite", willChange: "transform" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-5%", width: "65vw", height: "65vw", borderRadius: "50%", background: tint.b, filter: "blur(150px)", opacity: 0.13, transition: "background 0.6s linear", animation: "drift 34s ease-in-out infinite reverse", willChange: "transform" }} />
      <div style={{ position: "absolute", top: "-20%", left: "50%", width: "90vw", height: "55vh", background: `conic-gradient(from 200deg at 50% 50%, ${C.cyan}00, ${C.indigo}24, ${C.violet}26, ${C.cyan}18, ${C.cyan}00)`, filter: "blur(64px)", opacity: 0.4, animation: "auroraSpin 60s linear infinite", willChange: "transform" }} />
      <canvas ref={ref} style={{ position: "absolute", inset: 0, opacity: 0.55 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45vh", background: `linear-gradient(transparent, ${C.void})`, zIndex: 1 }} />
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${p * 100}%`, background: `linear-gradient(90deg,${tint.a},${tint.b})`, zIndex: 300, transition: "width 0.1s linear", boxShadow: `0 0 10px ${tint.a}` }} />
    </div>
  );
}
function BrainLogo({ size = 30 }: { size?: number }) {
  // AIRA mark v4 — clean app-icon: gradient tile + crisp geometric "A" with a node apex.
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="AIRA">
      <defs>
        <linearGradient id="lg" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={C.cyan} /><stop offset="50%" stopColor={C.indigo} /><stop offset="100%" stopColor={C.violet} />
        </linearGradient>
        <linearGradient id="lgHi" x1="24" y1="2" x2="24" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" /><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#lg)" />
      <rect x="2" y="2" width="44" height="23" rx="13" fill="url(#lgHi)" />
      <path d="M14.5 35 L24 12.5 L33.5 35" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M18.4 27.6 H29.6" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="24" cy="12.5" r="3.1" fill="#FFFFFF" />
    </svg>
  );
}
function WordCycler() {
  const WORDS = [{ t: "flow.", c: C.cyan }, { t: "focus.", c: C.indigo }, { t: "mastery.", c: C.pink }, { t: "the zone.", c: C.green }];
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2200); return () => clearInterval(id); }, []);
  return <span style={{ position: "relative", display: "inline-block", minWidth: "5ch" }}>{WORDS.map((w, k) => <span key={w.t} style={{ position: k === i ? "relative" : "absolute", left: 0, top: 0, whiteSpace: "nowrap", color: w.c, opacity: k === i ? 1 : 0, transform: k === i ? "translateY(0) rotateX(0)" : "translateY(0.4em) rotateX(-50deg)", transition: `opacity 0.55s ${C.ease}, transform 0.55s ${C.ease}`, textShadow: `0 0 50px ${w.c}66`, display: "inline-block" }}>{w.t}</span>)}</span>;
}

/* ════════════ HERO PRODUCT PREVIEW ════════════ */
function HeroPreview() {
  const caps = [
    { ic: "pencil", t: "Summarize notes", c: C.cyan },
    { ic: "cards", t: "Make a test", c: C.violet },
    { ic: "map", t: "Study program", c: C.blue },
    { ic: "bot", t: "Mentor me", c: C.pink },
  ];
  return (
    <div className="hero-preview" style={{ perspective: 1600, width: "100%", maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ position: "relative", transform: "rotateX(16deg) scale(0.98)", transformOrigin: "center top", animation: "floaty 7s ease-in-out infinite", willChange: "transform" }}>
        <div style={{ position: "absolute", inset: "-60px -30px 10px", background: `radial-gradient(60% 55% at 50% 0%, ${C.indigo}40, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, background: `linear-gradient(${C.elev},${C.base})`, boxShadow: "0 50px 140px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 18px", borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
            {[C.pink, C.amber, C.green].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
            <span style={{ marginLeft: 10, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: C.faint }}><BrainLogo size={16} /> AIRA · AI Mentor</span>
          </div>
          <div style={{ padding: "24px 26px", display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bot" size={16} color="#fff" /></span>
              <div style={{ maxWidth: 460, padding: "12px 16px", borderRadius: 14, background: C.surface, border: `1px solid ${C.border}`, fontSize: 14, lineHeight: 1.6, color: C.fg }}>Hi, I&apos;m AIRA. Paste your notes and I&apos;ll summarize them, or ask me for a test from your own material.</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }} className="hp-caps">
              {caps.map((c) => <div key={c.t} style={{ padding: "12px 12px", borderRadius: 13, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${c.c}55,rgba(255,255,255,0.05)) border-box`, border: "1px solid transparent", display: "flex", flexDirection: "column", gap: 8 }}><span style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${c.c}33,${c.c}11)`, border: `1px solid ${c.c}33`, display: "flex", alignItems: "center", justifyContent: "center", color: c.c }}><Icon name={c.ic} size={17} color={c.c} /></span><span style={{ fontSize: 12.5, fontWeight: 600, color: C.fg }}>{c.t}</span></div>)}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ padding: "11px 16px", borderRadius: 14, background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 13.5, fontWeight: 500 }}>Summarize my biology notes</div></div>
            <div style={{ display: "flex", gap: 10, padding: 8, borderRadius: 14, background: C.elev, border: `1px solid ${C.border}` }}><div style={{ flex: 1, padding: "9px 12px", fontSize: 14, color: C.faint }}>Ask AIRA anything…</div><span style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg,${C.blue},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="send" size={16} color="#fff" /></span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════ UI PRIMITIVES ════════════ */
function Pill({ children }: { children: React.ReactNode }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.glass, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 18px", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: C.cyan, textTransform: "uppercase", backdropFilter: "blur(10px)" }}>{children}</span>;
}
function GBtn({ children, big, full, onClick }: { children: React.ReactNode; big?: boolean; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: `linear-gradient(135deg,${C.blue},${C.indigo},${C.violet})`, backgroundSize: "200% 200%", color: "#fff", border: "none", padding: big ? "18px 44px" : "12px 26px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: big ? 17 : 15, fontWeight: 600, cursor: "pointer", boxShadow: h ? `0 0 60px ${C.indigo}66` : `0 0 32px ${C.indigo}33`, transform: h ? "translateY(-2px)" : "none", animation: "gradShift 4s ease infinite", transition: `transform 0.3s ${C.ease}, box-shadow 0.3s`, willChange: "transform" }}><span style={{ position: "absolute", top: 0, left: 0, width: "45%", height: "100%", background: "linear-gradient(105deg,transparent,rgba(255,255,255,0.4),transparent)", transform: "translateX(-130%)", animation: "shine 5s ease-in-out infinite", pointerEvents: "none" }} /><span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8 }}>{children}</span></button>;
}
function GhostBtn({ children, full, onClick }: { children: React.ReactNode; full?: boolean; onClick?: () => void }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: h ? C.glass : "transparent", color: h ? C.fg : C.muted, border: `1px solid ${h ? "rgba(123,92,255,0.5)" : C.border}`, padding: "12px 26px", width: full ? "100%" : "auto", borderRadius: 999, fontSize: 15, cursor: "pointer", backdropFilter: "blur(10px)", transition: `all 0.3s ${C.ease}` }}>{children}</button>;
}
function Grad({ children }: { children: React.ReactNode }) {
  return <span style={{ background: `linear-gradient(120deg,${C.cyan},${C.blue},${C.violet},${C.pink})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "gradShift 6s ease infinite" }}>{children}</span>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.cyan, display: "inline-block", marginBottom: 18 }}>{children}</span>;
}
function IconBadge({ name, color }: { name: string; color: string }) {
  return <div style={{ width: 48, height: 48, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${color}26,${color}0d)`, border: `1px solid ${color}33`, color, marginBottom: 18 }}><Icon name={name} size={24} color={color} /></div>;
}
function Tilt({ children, k, seen, delay = 0, style = {}, span = 1 }: { children: React.ReactNode; k: string; seen: { [k: string]: boolean }; delay?: number; style?: React.CSSProperties; span?: number }) {
  const [tf, setTf] = useState(""); const [glow, setGlow] = useState({ x: 50, y: 50, on: false });
  // Varied entrance: derive a direction from the key so neighbouring cards slide in from different sides.
  const dir = (k.charCodeAt(0) + k.charCodeAt(k.length - 1)) % 4;
  const hidden = dir === 0 ? "translateY(48px) scale(0.94)" : dir === 1 ? "translateX(-46px) translateY(16px) scale(0.95)" : dir === 2 ? "translateX(46px) translateY(16px) scale(0.95)" : "translateY(20px) scale(0.9) rotate(-2deg)";
  const onMove = (e: React.MouseEvent) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; setTf(`perspective(900px) rotateX(${(py - 0.5) * -7}deg) rotateY(${(px - 0.5) * 7}deg) translateY(-5px)`); setGlow({ x: px * 100, y: py * 100, on: true }); };
  const reset = () => { setTf(""); setGlow((g) => ({ ...g, on: false })); };
  return <div data-k={k} onMouseMove={onMove} onMouseLeave={reset} style={{ gridColumn: span > 1 ? `span ${span}` : undefined, position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${glow.on ? "rgba(123,92,255,0.5)" : "rgba(255,255,255,0.09)"},${glow.on ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.02)"}) border-box`, border: "1px solid transparent", borderRadius: 22, padding: 30, overflow: "hidden", backdropFilter: "blur(20px)", boxShadow: glow.on ? "0 24px 70px rgba(123,92,255,0.2)" : "0 8px 24px rgba(0,0,0,0.4)", opacity: seen[k] ? 1 : 0, transform: seen[k] ? (tf || "translateY(0) scale(1)") : hidden, filter: seen[k] ? "blur(0)" : "blur(7px)", transition: `opacity 0.7s ${C.ease} ${delay}ms, transform ${tf ? "0.3s" : "0.75s"} ${C.spring} ${delay}ms, filter 0.7s ${C.ease} ${delay}ms, box-shadow 0.4s, background 0.4s`, transformStyle: "preserve-3d", willChange: "transform,filter", ...style }}>
    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(123,92,255,0.1), transparent 50%)`, opacity: glow.on ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
    <div style={{ position: "relative", zIndex: 1, transform: "translateZ(16px)" }}>{children}</div>
  </div>;
}

/* ════════════ DATA ════════════ */
const TECHNIQUES = [
  { id: "pomodoro", ic: "clock", name: "Pomodoro", tag: "25 / 5", work: 25, brk: 5, color: C.blue, desc: "25-minute focus sprints with 5-minute breaks. Lowers the barrier to starting.", best: "Reading, problem sets, writing" },
  { id: "flowtime", ic: "wave", name: "Flowtime", tag: "Free-form", work: 50, brk: 10, color: C.cyan, desc: "No fixed timer. Work until your focus dips, then break as needed. AIRA learns your attention span.", best: "Coding, deep creative work" },
  { id: "5217", ic: "repeat", name: "52 / 17", tag: "52 / 17", work: 52, brk: 17, color: C.violet, desc: "52 minutes on, 17 off. The research-backed ratio that maximizes a full day's output.", best: "Long study days, exam prep" },
  { id: "deepwork", ic: "brain", name: "Deep Work", tag: "90 min", work: 90, brk: 20, color: C.pink, desc: "90-minute distraction-free blocks matched to your ultradian rhythm. Maximum depth.", best: "Thesis, hard concepts" },
  { id: "timeboxing", ic: "box", name: "Timeboxing", tag: "Fixed", work: 40, brk: 10, color: C.green, desc: "Assign each task a fixed time slot. Work shrinks to fit the box you give it.", best: "Busy days, small tasks" },
  { id: "ultradian", ic: "moon", name: "Ultradian", tag: "Rhythm", work: 75, brk: 25, color: C.amber, desc: "75-minute waves of work mirroring your body's natural energy cycles, with full recovery.", best: "All-day deep study" },
];
const APP_SUBJECTS = [
  { n: "AI & Prompt Engineering", p: 78, c: C.cyan }, { n: "Coding & Programming", p: 64, c: C.violet },
  { n: "Mathematics", p: 45, c: C.blue }, { n: "Data Science", p: 52, c: C.green },
  { n: "Psychology", p: 30, c: C.pink }, { n: "Physics", p: 18, c: C.amber },
];

/* ════════════ SESSION HISTORY (real, localStorage) ════════════ */
type SessionLog = { id: string; tech: string; color: string; mins: number; ts: number };
function getSessions(): SessionLog[] { try { return JSON.parse(window.localStorage.getItem("aira_sessions") || "[]") as SessionLog[]; } catch { return []; } }
function logSession(s: Omit<SessionLog, "id" | "ts">) { try { const list = getSessions(); list.unshift({ ...s, id: Math.random().toString(36).slice(2), ts: Date.now() }); window.localStorage.setItem("aira_sessions", JSON.stringify(list.slice(0, 60))); } catch {} }
function relTime(ts: number) { const d = Date.now() - ts; const m = Math.floor(d / 60000); if (m < 1) return "just now"; if (m < 60) return `${m}m ago`; const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`; const days = Math.floor(h / 24); return days === 1 ? "yesterday" : `${days}d ago`; }
/* ── real streak: a day counts when the learner shows up (opens the app / reflects) ── */
function recordActivity() { try { const today = new Date().toDateString(); const days: string[] = JSON.parse(window.localStorage.getItem("aira_activity") || "[]"); if (!days.includes(today)) { days.push(today); window.localStorage.setItem("aira_activity", JSON.stringify(days.slice(-180))); } } catch {} }
function computeStreak(): number { try { const days = new Set<string>(JSON.parse(window.localStorage.getItem("aira_activity") || "[]")); const d = new Date(); if (!days.has(d.toDateString())) { d.setDate(d.getDate() - 1); if (!days.has(d.toDateString())) return 0; } let streak = 0; while (days.has(d.toDateString())) { streak++; d.setDate(d.getDate() - 1); } return streak; } catch { return 0; } }
function getXp(): number { try { const x = parseInt(window.localStorage.getItem("aira_xp") || "0", 10); return Number.isNaN(x) ? 0 : x; } catch { return 0; } }

/* ════════════ APP WORKSPACE ════════════ */
function AppWorkspace({ initial, onClose, onAuth, lifetime, userName, onSaveName, onLogout }: { initial: string; onClose: () => void; onAuth: () => void; lifetime: boolean; userName: string; onSaveName: (n: string, remember: boolean) => void; onLogout: () => void }) {
  const [tab, setTab] = useState(initial);
  const [sideOpen, setSideOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  useEffect(() => { recordActivity(); setStreak(computeStreak()); }, []);
  const NAV = [{ id: "dashboard", ic: "chart", label: "Dashboard" }, { id: "mentor", ic: "bot", label: "AI Mentor" }, { id: "subjects", ic: "book", label: "Subjects" }, { id: "history", ic: "clock", label: "History" }, { id: "progress", ic: "layers", label: "Progress" }, { id: "profile", ic: "user", label: "Profile" }];
  const go = (id: string) => { setTab(id); setSideOpen(false); };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1300, background: C.void, display: "flex", animation: `appIn 0.5s ${C.ease}` }}>
      {!userName && <NameModal onSave={onSaveName} />}
      {sideOpen && <div className="app-scrim" onClick={() => setSideOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 19, background: "rgba(0,0,4,0.6)", backdropFilter: "blur(4px)" }} />}
      <aside className={`app-side${sideOpen ? " open" : ""}`} style={{ width: 256, borderRight: `1px solid ${C.border}`, background: C.deep, display: "flex", flexDirection: "column", padding: 16, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 18px" }}>
          <BrainLogo size={26} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AIRA</span>
          {lifetime && <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, color: C.green, background: `${C.green}18`, border: `1px solid ${C.green}44`, borderRadius: 999, padding: "3px 8px", letterSpacing: "0.06em" }}>MASTERMIND</span>}
        </div>
        <button onClick={() => go("mentor")} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "11px 14px", borderRadius: 12, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 18 }}><Icon name="plus" size={17} color="#fff" /> New chat</button>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: C.faint, textTransform: "uppercase", padding: "0 8px 8px" }}>Workspace</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV.map((n) => { const on = tab === n.id; return <button key={n.id} onClick={() => go(n.id)} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "11px 14px", borderRadius: 11, border: "none", cursor: "pointer", textAlign: "left", background: on ? `linear-gradient(135deg,${C.indigo}2e,${C.cyan}11)` : "transparent", color: on ? C.fg : C.muted, fontSize: 14, fontWeight: on ? 600 : 400, transition: `all 0.2s ${C.ease}`, position: "relative" }}>{on && <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 18, borderRadius: 999, background: `linear-gradient(${C.cyan},${C.violet})` }} />}<Icon name={n.ic} size={18} color={on ? C.fg : C.muted} />{n.label}</button>; })}
        </nav>
        <div style={{ margin: "18px 0", padding: 16, borderRadius: 14, background: `linear-gradient(135deg,${C.amber}1a,${C.amber}0d)`, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: C.muted, marginBottom: 6 }}><Icon name="flame" size={14} color={C.amber} /> Current streak</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: C.amber }}>{streak} day{streak === 1 ? "" : "s"}</div>
          <div style={{ height: 5, borderRadius: 999, background: "rgba(255,255,255,0.06)", marginTop: 10, overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.min(100, (streak % 7) / 7 * 100 || (streak > 0 ? 100 : 8))}%`, borderRadius: 999, background: `linear-gradient(90deg,${C.amber},#FB923C)`, transition: "width 0.6s ease" }} /></div>
          <div style={{ fontSize: 10.5, color: C.faint, marginTop: 7 }}>{streak === 0 ? "Show up today to start it" : streak < 7 ? `${7 - (streak % 7)} days to a full week` : "On fire — keep it alive"}</div>
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 11, border: `1px solid ${C.border}`, textAlign: "left", background: C.surface, color: C.fg, fontSize: 14, fontWeight: 600, marginBottom: 3 }}><span style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${C.indigo},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>{userName ? userName.trim()[0] : <Icon name="user" size={14} color="#fff" />}</span><div style={{ minWidth: 0, flex: 1 }}><div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName || "Guest"}</div><div style={{ fontSize: 11, fontWeight: 500, color: lifetime ? C.green : C.faint }}>{lifetime ? "Mastermind" : "Free plan"}</div></div></div>
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "11px 14px", borderRadius: 11, border: "none", cursor: "pointer", textAlign: "left", background: "transparent", color: C.muted, fontSize: 14, transition: `all 0.2s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.fg; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}><Icon name="arrow" size={18} color={C.muted} /> Sign out</button>
        </div>
      </aside>
      <main style={{ flex: 1, overflowY: "auto", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px", borderBottom: `1px solid ${C.border}`, background: "rgba(3,3,10,0.8)", backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><button className="app-burger" onClick={() => setSideOpen(true)} aria-label="Open menu" style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.fg, width: 36, height: 36, borderRadius: 10, cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center" }}><Icon name="menu" size={18} color={C.fg} /></button><button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.muted, width: 36, height: 36, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="arrow" size={16} color={C.muted} /></button><h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, textTransform: "capitalize" }}>{NAV.find((n) => n.id === tab)?.label || tab}</h2></div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>{!lifetime && <button onClick={onAuth} style={{ padding: "9px 18px", borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 13, fontWeight: 600 }}>Become a Mastermind</button>}<button onClick={onClose} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.muted, padding: "9px 16px", borderRadius: 999, cursor: "pointer", fontSize: 13 }}>Exit</button></div>
        </div>
        <div style={{ padding: 28, maxWidth: 1000, margin: "0 auto" }}>
          {tab === "dashboard" && <DashTab onGo={setTab} userName={userName} />}
          {tab === "mentor" && <MentorTab lifetime={lifetime} onUpgrade={onAuth} userName={userName} />}
          {tab === "subjects" && <SubjectsTab />}
          {tab === "history" && <HistoryTab />}
          {tab === "progress" && <ProgressTab />}
          {tab === "profile" && <ProfileTab userName={userName} lifetime={lifetime} streak={streak} onUpgrade={onAuth} onLogout={onLogout} />}
        </div>
      </main>
    </div>
  );
}

/* ░░ PROFILE TAB ░░ */
function ProfileTab({ userName, lifetime, streak, onUpgrade, onLogout }: { userName: string; lifetime: boolean; streak: number; onUpgrade: () => void; onLogout: () => void }) {
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [xp, setXp] = useState(0);
  useEffect(() => { try { const p = window.localStorage.getItem("aira_profile"); if (p) setProfile(JSON.parse(p)); setXp(getXp()); } catch {} }, []);
  const conf = profile?.confidence ? parseInt(String(profile.confidence)) : 0;
  const level = Math.floor(xp / 500) + 1;
  const rows: [string, string][] = [
    ["Goal", profile?.goal || "—"], ["Level", profile?.level || "—"], ["Deadline", profile?.deadline || "—"],
    ["Weekly time", profile?.hours || "—"], ["Focus window", profile?.when || "—"], ["Watch out for", profile?.weakness || "—"],
  ];
  const retake = () => { try { window.localStorage.removeItem("aira_profile"); } catch {} window.location.reload(); };
  return (
    <div style={{ animation: "tabIn 0.4s ease", maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <span style={{ width: 64, height: 64, borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${C.indigo},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#fff", textTransform: "uppercase", fontFamily: "var(--font-display)" }}>{userName ? userName.trim()[0] : "?"}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>{userName || "Guest"}</h3>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 4, padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: lifetime ? C.green : C.muted, background: lifetime ? `${C.green}14` : C.surface, border: `1px solid ${lifetime ? C.green + "44" : C.border}` }}>{lifetime ? "Mastermind · lifetime" : "Free plan"}</div>
        </div>
        {!lifetime && <button onClick={onUpgrade} style={{ padding: "11px 20px", borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>Become a Mastermind</button>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }} className="dash-grid">
        {[{ l: "Level", v: String(level), c: C.violet }, { l: "Total XP", v: String(xp), c: C.cyan }, { l: "Day streak", v: String(streak), c: C.amber }].map((s) => <div key={s.l} style={{ padding: 18, borderRadius: 16, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${s.c}44,rgba(255,255,255,0.04)) border-box`, border: "1px solid transparent" }}><div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: s.c }}>{s.v}</div><div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{s.l}</div></div>)}
      </div>
      {profile ? (
        <div style={{ padding: 24, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}`, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700 }}>Learning Profile</h4>
            {conf > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: C.cyan }}>{conf}% confidence</span>}
          </div>
          {rows.map(([l, v]) => <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 12.5, color: C.faint, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</span><span style={{ fontSize: 14, fontWeight: 600, color: C.fg, textAlign: "right", maxWidth: "60%" }}>{v}</span></div>)}
          <button onClick={retake} style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.surface, color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Icon name="reset" size={15} color={C.muted} /> Retake onboarding</button>
        </div>
      ) : (
        <div style={{ padding: 24, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}`, marginBottom: 20, textAlign: "center", color: C.muted, fontSize: 14 }}>No learning profile yet. <button onClick={retake} style={{ background: "none", border: "none", color: C.cyan, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Build one now →</button></div>
      )}
      <button onClick={onLogout} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 20px", borderRadius: 999, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 14, fontWeight: 600, cursor: "pointer" }}><Icon name="arrow" size={16} color={C.muted} /> Sign out</button>
    </div>
  );
}

/* ░░ DASHBOARD TAB ░░ */
function DashTab({ onGo, userName }: { onGo: (t: string) => void; userName: string }) {
  const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0, sessions: 0 });
  useEffect(() => { const xp = getXp(); setStats({ xp, level: Math.floor(xp / 500) + 1, streak: computeStreak(), sessions: getSessions().length }); }, []);
  const cards = [
    { l: "Total XP earned", v: String(stats.xp), c: C.cyan, ic: "spark" },
    { l: "Current level", v: String(stats.level), c: C.violet, ic: "layers" },
    { l: "Day streak", v: String(stats.streak), c: C.amber, ic: "flame" },
    { l: "Sessions logged", v: String(stats.sessions), c: C.green, ic: "target" },
  ];
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  useEffect(() => { try { const p = window.localStorage.getItem("aira_profile"); if (p) setProfile(JSON.parse(p)); } catch {} }, []);
  const goal = profile?.goal;
  const coachMsg = (() => {
    const g = goal || "your goal";
    switch (profile?.weakness) {
      case "Procrastination": return `Procrastination's the enemy today. Don't plan — start. One 25-minute block on ${g} before anything else; momentum beats motivation.`;
      case "Staying focused": return `Focus is your edge today. Phone in another room, one tab, 25 minutes on ${g}. Protect the block and the rest follows.`;
      case "The hard concepts": return `Growth hides in the hard parts. Take the one ${g} idea you've been avoiding, break it into three small questions, then answer them.`;
      case "Staying consistent": return `Consistency is the whole game. Even 15 minutes on ${g} today keeps the streak alive — just show up, that's the win.`;
      default: return `Today's move: one focused block on ${g}. Small, steady reps compound faster than you'd think.`;
    }
  })();
  const [reflect, setReflect] = useState<string | null>(null);
  useEffect(() => { try { const r = JSON.parse(window.localStorage.getItem("aira_reflect") || "{}"); if (r && r.date === new Date().toDateString()) setReflect(r.mood); } catch {} }, []);
  const doReflect = (mood: string) => { setReflect(mood); try { window.localStorage.setItem("aira_reflect", JSON.stringify({ mood, date: new Date().toDateString() })); const x = getXp() + 50; window.localStorage.setItem("aira_xp", String(x)); recordActivity(); setStats((s) => ({ ...s, xp: x, level: Math.floor(x / 500) + 1, streak: computeStreak() })); } catch {} };
  const reflectMsg: Record<string, string> = { Great: "Love it. I'll push today's block a little harder — you're ready for it.", Okay: "Solid. Steady beats perfect — one small win at a time, same plan tomorrow.", Tough: "Thanks for being honest. I'll lighten tomorrow: shorter block, easier entry point. Rest counts too." };
  return (
    <div style={{ animation: "tabIn 0.4s ease" }}>
      <div style={{ fontSize: 12.5, color: C.faint, marginBottom: 5, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>{today}</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 23, fontWeight: 700, marginBottom: 4 }}>{greet}{userName ? `, ${userName}` : ""}.{goal ? ` Let's move the needle on ${goal}.` : " Ready to focus?"}</h3>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>{goal ? `Your next move toward ${goal} is ready — one tap and AIRA walks you through it.` : "You have 2 reviews due and 1 session planned for today."}</p>
      {goal && (
        <button onClick={() => onGo("mentor")} style={{ width: "100%", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", borderRadius: 18, marginBottom: 24, background: `linear-gradient(135deg,${C.cyan}1f,${C.violet}1a)`, border: `1px solid ${C.border}`, transition: `transform 0.25s ${C.ease}` }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
        <span style={{ flexShrink: 0, width: 46, height: 46, borderRadius: 13, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bolt" size={22} color="#fff" /></span>
        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.cyan, marginBottom: 3 }}>Today&apos;s mission</div><div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: C.fg }}>Start your next {goal} session</div><div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{profile?.when ? `${profile.when} focus` : "Focused block"} · {profile?.hours || "short"} this week</div></div>
        <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 999, background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 13, fontWeight: 600 }}>Start <Icon name="arrow" size={15} color="#fff" /></span>
      </button>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 24 }} className="dash-grid">
        <button onClick={() => onGo("mentor")} style={{ position: "relative", overflow: "hidden", textAlign: "left", cursor: "pointer", border: "none", padding: 28, borderRadius: 20, background: `linear-gradient(135deg,${C.blue},${C.indigo},${C.violet})`, color: "#fff", boxShadow: `0 18px 50px ${C.indigo}44`, transition: `transform 0.3s ${C.ease}` }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.12)", filter: "blur(10px)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 15, background: "rgba(255,255,255,0.18)", marginBottom: 18 }}><Icon name="bot" size={24} color="#fff" /></div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Talk to your AI Mentor</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, maxWidth: 380 }}>Summarize notes, score them, make tests, build study plans, get into flow — everything starts with a message.</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 18, fontSize: 14, fontWeight: 600 }}>Open mentor <Icon name="arrow" size={16} color="#fff" /></span>
          </div>
        </button>
        <button onClick={() => onGo("subjects")} style={{ textAlign: "left", cursor: "pointer", padding: 28, borderRadius: 20, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.cyan}66,rgba(255,255,255,0.05)) border-box`, border: "1px solid transparent", color: C.fg, transition: `transform 0.3s ${C.ease}` }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 15, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, marginBottom: 18 }}><Icon name="book" size={24} color="#fff" /></div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 700, marginBottom: 6 }}>Your subjects</div>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6 }}>Track mastery across everything you&apos;re learning — tap one to dive in.</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 18, fontSize: 14, fontWeight: 600, color: C.cyan }}>Open subjects <Icon name="arrow" size={16} color={C.cyan} /></span>
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        {cards.map((s, i) => <div key={s.l} style={{ padding: 18, borderRadius: 16, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${s.c}44,rgba(255,255,255,0.04)) border-box`, border: "1px solid transparent", animation: `tabIn 0.5s ease ${i * 80}ms both` }}><div style={{ marginBottom: 10, color: s.c }}><Icon name={s.ic} size={20} color={s.c} /></div><div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: s.c, marginBottom: 2 }}>{s.v}</div><div style={{ fontSize: 12.5, color: C.muted }}>{s.l}</div></div>)}
      </div>
      {goal && (
        <div style={{ display: "flex", gap: 14, padding: 20, borderRadius: 18, background: `linear-gradient(135deg,${C.violet}14,${C.cyan}0d)`, border: `1px solid ${C.border}`, marginBottom: 24 }}>
          <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="brain" size={20} color="#fff" /></span>
          <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.violet, marginBottom: 4 }}>AI Coach</div><p style={{ fontSize: 14, color: C.fg, lineHeight: 1.6 }}>{coachMsg}</p></div>
        </div>
      )}
      {goal && (
        <div style={{ padding: 20, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}`, marginBottom: 24 }}>
          {!reflect ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 170 }}><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.cyan, marginBottom: 4 }}>Daily reflection</div><div style={{ fontSize: 15, fontWeight: 600 }}>How did today go?</div></div>
              <div style={{ display: "flex", gap: 8 }}>{[{ m: "Great", c: C.green }, { m: "Okay", c: C.amber }, { m: "Tough", c: C.pink }].map((o) => <button key={o.m} onClick={() => doReflect(o.m)} style={{ padding: "10px 18px", borderRadius: 999, cursor: "pointer", background: "transparent", border: `1px solid ${o.c}55`, color: o.c, fontSize: 13.5, fontWeight: 600, transition: `all 0.2s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.background = `${o.c}1a`; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>{o.m}</button>)}</div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 14, animation: "tabIn 0.4s ease" }}>
              <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={20} color="#fff" stroke={3} /></span>
              <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.cyan, marginBottom: 4 }}>Plan adapted · +50 XP</div><p style={{ fontSize: 14, color: C.fg, lineHeight: 1.6 }}>{reflectMsg[reflect]}</p></div>
            </div>
          )}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }} className="dash-grid">
        <div style={{ padding: 24, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}` }}>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>This week's focus</h4>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, height: 140 }}>{[60, 85, 45, 95, 70, 100, 55].map((h, i) => <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}><div style={{ width: "100%", height: `${h}%`, borderRadius: "8px 8px 0 0", background: `linear-gradient(${C.cyan},${C.indigo})`, animation: `growBar 0.7s ${C.spring} ${i * 70}ms both`, transformOrigin: "bottom" }} /><span style={{ fontSize: 11, color: C.faint }}>{["M", "T", "W", "T", "F", "S", "S"][i]}</span></div>)}</div>
        </div>
        <div style={{ padding: 24, borderRadius: 18, background: `linear-gradient(135deg,${C.indigo}1a,${C.violet}0d)`, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: C.violet, marginBottom: 12 }}><Icon name="target" size={28} color={C.violet} /></div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Today's goal</h4>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>Complete 1 Deep Work session on Mathematics. You're 60% there.</p>
          <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}><div style={{ height: "100%", width: "60%", borderRadius: 999, background: `linear-gradient(90deg,${C.cyan},${C.violet})`, animation: "growW 1s ease 0.3s both" }} /></div>
        </div>
      </div>
    </div>
  );
}

/* ░░ STUDY TAB ░░ */
function StudyTab({ onGo }: { onGo: (t: string) => void }) {
  const [tech, setTech] = useState(TECHNIQUES[0]);
  const [secs, setSecs] = useState(TECHNIQUES[0].work * 60);
  const [running, setRunning] = useState(false); const [onBreak, setOnBreak] = useState(false);
  const [goal, setGoal] = useState("");
  const [sound, setSound] = useState("silence");
  const [focusMode, setFocusMode] = useState(false);
  const [sessions, setSessions] = useState<SessionLog[]>([]);
  useEffect(() => { setSessions(getSessions()); }, []);
  useEffect(() => { if (!running) return; const id = setInterval(() => setSecs((s) => { if (s <= 1) { if (!onBreak) { logSession({ tech: tech.name, color: tech.color, mins: tech.work }); setSessions(getSessions()); } setOnBreak((b) => !b); return (!onBreak ? tech.brk : tech.work) * 60; } return s - 1; }), 1000); return () => clearInterval(id); }, [running, onBreak, tech]);
  const topTech = (() => { const counts: Record<string, number> = {}; sessions.forEach((s) => { counts[s.tech] = (counts[s.tech] || 0) + 1; }); return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]; })();
  const todayMins = sessions.filter((s) => new Date(s.ts).toDateString() === new Date().toDateString()).reduce((a, s) => a + s.mins, 0);
  const weekCount = sessions.filter((s) => Date.now() - s.ts < 7 * 864e5).length;
  const statCards = [
    { l: "Focus today", v: todayMins >= 60 ? `${Math.floor(todayMins / 60)}h ${todayMins % 60}m` : `${todayMins}m`, c: C.cyan, ic: "clock" },
    { l: "Sessions this week", v: String(weekCount), c: C.violet, ic: "target" },
    { l: "Total sessions", v: String(sessions.length), c: C.green, ic: "layers" },
  ];
  const pick = (t: typeof TECHNIQUES[0]) => { setTech(t); setSecs(t.work * 60); setOnBreak(false); setRunning(false); };
  const total = (onBreak ? tech.brk : tech.work) * 60;
  const mm = String(Math.floor(secs / 60)).padStart(2, "0"), ss = String(secs % 60).padStart(2, "0");
  const R = 120, CIRC = 2 * Math.PI * R, pct = 1 - secs / total;
  return (
    <div style={{ animation: "tabIn 0.4s ease", display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }} className="study-grid">
      <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="dash-grid">
        {statCards.map((s, i) => <div key={s.l} style={{ padding: "16px 18px", borderRadius: 14, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${s.c}44,rgba(255,255,255,0.04)) border-box`, border: "1px solid transparent", display: "flex", alignItems: "center", gap: 12, animation: `tabIn 0.5s ease ${i * 70}ms both` }}><span style={{ width: 38, height: 38, borderRadius: 11, background: `${s.c}1f`, display: "flex", alignItems: "center", justifyContent: "center", color: s.c, flexShrink: 0 }}><Icon name={s.ic} size={18} color={s.c} /></span><div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.v}</div><div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{s.l}</div></div></div>)}
      </div>
      {focusMode && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1400, background: "rgba(2,2,8,0.96)", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, animation: "fadeIn 0.3s ease" }}>
          <div style={{ fontSize: 13, color: onBreak ? C.green : tech.color, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>{onBreak ? "Break" : "Focus"} · {tech.name}</div>
          <div style={{ position: "relative", width: 300, height: 300 }}>
            <div style={{ position: "absolute", inset: -24, borderRadius: "50%", background: `radial-gradient(circle, ${tech.color}33, transparent 70%)`, animation: "breathe 3s ease-in-out infinite" }} />
            <svg viewBox="0 0 264 264" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}><circle cx="132" cy="132" r={R} fill="none" stroke={C.border} strokeWidth="6" /><circle cx="132" cy="132" r={R} fill="none" stroke={tech.color} strokeWidth="6" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear", filter: `drop-shadow(0 0 14px ${tech.color})` }} /></svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 66, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss}</div>
          </div>
          {goal.trim() && <div style={{ fontSize: 15, color: C.muted, maxWidth: 420, textAlign: "center" }}>{goal}</div>}
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => setRunning(!running)} style={{ width: 60, height: 60, borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${tech.color},${C.violet})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 36px ${tech.color}55` }}><Icon name={running ? "pause" : "play"} size={22} color="#fff" /></button>
            <button onClick={() => setFocusMode(false)} style={{ padding: "0 24px", height: 60, borderRadius: 999, border: `1px solid ${C.border}`, cursor: "pointer", background: C.surface, color: C.muted, fontSize: 14, fontWeight: 600 }}>Exit focus</button>
          </div>
        </div>
      )}
      <div>
        <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 12, background: `linear-gradient(135deg,${C.cyan}1a,${C.violet}0d)`, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="spark" size={16} color={C.cyan} />
          <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{sessions.length > 0 ? <>AIRA learned from your last <strong style={{ color: C.fg }}>{sessions.length}</strong> session{sessions.length > 1 ? "s" : ""}{topTech ? <> — your go-to is <strong style={{ color: C.fg }}>{topTech[0]}</strong>. Want to beat your streak?</> : "."}</> : <>Complete a session and AIRA starts adapting to your rhythm and peak hours.</>}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Pick your technique</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {TECHNIQUES.map((t) => { const on = t.id === tech.id; return <button key={t.id} onClick={() => pick(t)} style={{ textAlign: "left", cursor: "pointer", padding: 18, borderRadius: 16, background: on ? `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${t.color},${C.violet}) border-box` : C.surface, border: on ? "1.5px solid transparent" : `1px solid ${C.border}`, transform: on ? "translateY(-3px)" : "none", boxShadow: on ? `0 14px 36px ${t.color}33` : "none", transition: `all 0.3s ${C.ease}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><span style={{ color: t.color }}><Icon name={t.ic} size={22} color={t.color} /></span><span style={{ fontSize: 11, fontWeight: 700, color: t.color }}>{t.tag}</span></div><div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: on ? C.fg : C.muted, marginBottom: 4 }}>{t.name}</div><p style={{ fontSize: 12, color: C.faint, lineHeight: 1.5 }}>{t.best}</p></button>; })}
        </div>
        <div style={{ marginTop: 16, padding: 18, borderRadius: 14, background: C.surface, border: `1px solid ${C.border}` }}><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{tech.desc}</p></div>

        {/* AI-generated plan */}
        <div style={{ marginTop: 16, padding: 20, borderRadius: 16, background: `linear-gradient(135deg,${C.indigo}16,${C.violet}0a)`, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${C.violet}33,transparent 70%)`, filter: "blur(20px)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bot" size={18} color="#fff" /></span>
                <div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>AIRA&apos;s plan for you</div><div style={{ fontSize: 12, color: C.faint }}>Generated from your goals & sessions</div></div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.cyan, background: `${C.cyan}14`, border: `1px solid ${C.cyan}33`, borderRadius: 999, padding: "4px 9px" }}><Icon name="spark" size={11} color={C.cyan} /> AI-generated</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[{ d: "Day 1", t: "Deep Work · core concepts", m: "90m", c: C.pink }, { d: "Day 2", t: "Active-recall quiz from your notes", m: "30m", c: C.cyan }, { d: "Day 3", t: "Spaced review of Day 1", m: "20m", c: C.green }].map((r) => (
                <div key={r.d} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, background: C.elev, border: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: r.c, width: 42, flexShrink: 0 }}>{r.d}</span>
                  <span style={{ flex: 1, fontSize: 13.5, color: C.fg }}>{r.t}</span>
                  <span style={{ fontSize: 12.5, color: C.muted, fontVariantNumeric: "tabular-nums" }}>{r.m}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onGo("mentor")} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 13.5, fontWeight: 600 }}>Generate my full plan <Icon name="arrow" size={15} color="#fff" /></button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "fit-content" }}>
        <div style={{ padding: 28, borderRadius: 20, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${tech.color}55,rgba(255,255,255,0.05)) border-box`, border: "1px solid transparent", textAlign: "center" }}>
          <div style={{ fontSize: 12, color: onBreak ? C.green : tech.color, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 14 }}>{onBreak ? "Break" : "Focus"}{running && !onBreak && goal.trim() ? "" : ""}</div>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="What's your goal this session?" style={{ width: "100%", textAlign: "center", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 11, color: C.fg, fontSize: 13.5, padding: "10px 12px", outline: "none", marginBottom: 20 }} />
          <div style={{ position: "relative", width: 240, height: 240, margin: "0 auto 22px" }}>
            {running && <div style={{ position: "absolute", inset: -10, borderRadius: "50%", background: `radial-gradient(circle, ${tech.color}33, transparent 70%)`, animation: "breathe 3s ease-in-out infinite", pointerEvents: "none" }} />}
            <svg viewBox="0 0 264 264" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}><defs><linearGradient id={`ring-${tech.id}`} x1="0" y1="0" x2="264" y2="264"><stop offset="0%" stopColor={tech.color} /><stop offset="100%" stopColor={C.violet} /></linearGradient></defs><circle cx="132" cy="132" r={R} fill="none" stroke={C.border} strokeWidth="8" /><circle cx="132" cy="132" r={R} fill="none" stroke={`url(#ring-${tech.id})`} strokeWidth="8" opacity="0.16" /><circle cx="132" cy="132" r={R} fill="none" stroke={`url(#ring-${tech.id})`} strokeWidth="8" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct)} style={{ transition: "stroke-dashoffset 1s linear", filter: `drop-shadow(0 0 10px ${tech.color}aa)` }} /></svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 700, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{mm}:{ss}</div><div style={{ fontSize: 11, color: C.faint, marginTop: 6 }}>{running ? "in session" : "ready"}</div></div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}><button onClick={() => setRunning(!running)} style={{ width: 60, height: 60, borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${tech.color},${C.violet})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 36px ${tech.color}55` }}><Icon name={running ? "pause" : "play"} size={22} color="#fff" /></button><button onClick={() => pick(tech)} style={{ width: 60, height: 60, borderRadius: 999, border: `1px solid ${C.border}`, cursor: "pointer", background: C.surface, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="reset" size={18} color={C.muted} /></button></div>
          <button onClick={() => { setFocusMode(true); setRunning(true); }} style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.surface, color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Icon name="moon" size={15} color={C.cyan} /> Enter focus mode</button>
        </div>
        <div style={{ padding: 18, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted }}><Icon name="wave" size={15} color={C.cyan} /> Soundscape</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{SOUNDS.map((s) => { const on = s.id === sound; return <button key={s.id} onClick={() => setSound(s.id)} style={{ padding: "7px 13px", borderRadius: 999, cursor: "pointer", fontSize: 12.5, background: on ? `linear-gradient(135deg,${C.cyan}26,${C.indigo}26)` : "transparent", border: `1px solid ${on ? "rgba(34,211,238,0.5)" : C.border}`, color: on ? C.fg : C.muted, transition: `all 0.2s ${C.ease}` }}>{s.name}</button>; })}</div>
        </div>
      </div>
    </div>
  );
}

/* ░░ MARKDOWN (lite, inline-styled for dark theme) ░░ */
function MarkdownLite({ text }: { text: string }) {
  const inline = (s: string, k: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []; const re = /\*\*([^*]+)\*\*|`([^`]+)`/g; let last = 0, i = 0; let m: RegExpExecArray | null;
    while ((m = re.exec(s)) !== null) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      if (m[1] != null) parts.push(<strong key={k + "b" + i} style={{ color: C.fg, fontWeight: 700 }}>{m[1]}</strong>);
      else parts.push(<code key={k + "c" + i} style={{ background: "rgba(255,255,255,0.08)", padding: "1px 6px", borderRadius: 6, fontSize: "0.9em", color: C.cyan }}>{m[2]}</code>);
      last = m.index + m[0].length; i++;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  };
  const lines = text.replace(/\r/g, "").split("\n");
  const out: React.ReactNode[] = []; let list: string[] | null = null; let ordered = false; let key = 0;
  const flush = () => { if (!list) return; const items = list; const ol = ordered; out.push(ol
    ? <ol key={key++} style={{ margin: "6px 0", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>{items.map((it, ix) => <li key={ix}>{inline(it, "o" + key + ix)}</li>)}</ol>
    : <ul key={key++} style={{ margin: "6px 0", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>{items.map((it, ix) => <li key={ix} style={{ listStyle: "none", position: "relative", paddingLeft: 16 }}><span style={{ position: "absolute", left: 0, top: 9, width: 5, height: 5, borderRadius: 9, background: C.cyan }} />{inline(it, "u" + key + ix)}</li>)}</ul>); list = null; };
  lines.forEach((raw) => {
    const line = raw.trim();
    if (/^###?\s+/.test(line)) { flush(); const t = line.replace(/^#{2,3}\s+/, ""); out.push(<div key={key++} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: line.startsWith("###") ? 14 : 15.5, color: C.fg, margin: "10px 0 4px" }}>{inline(t, "h" + key)}</div>); return; }
    const ul = line.match(/^[-*]\s+(.*)/); const ol = line.match(/^\d+[.)]\s+(.*)/);
    if (ul) { if (!list || ordered) { flush(); list = []; ordered = false; } list.push(ul[1]); return; }
    if (ol) { if (!list || !ordered) { flush(); list = []; ordered = true; } list.push(ol[1]); return; }
    if (line === "") { flush(); return; }
    flush(); out.push(<p key={key++} style={{ margin: "4px 0", lineHeight: 1.65 }}>{inline(line, "p" + key)}</p>);
  });
  flush();
  return <div>{out}</div>;
}

/* ░░ AI MENTOR TAB ░░ */
type MMsg = { role: "ai" | "user"; text: string; local?: boolean; image?: string };
type MMode = "chat" | "summary" | "test" | "program";
const FREE_MENTOR = 3;
const PERSONAS: { id: string; label: string; ic: string }[] = [
  { id: "balanced", label: "Balanced", ic: "bot" },
  { id: "strict", label: "Strict", ic: "bolt" },
  { id: "teacher", label: "Teacher", ic: "book" },
  { id: "goggins", label: "Relentless", ic: "flame" },
  { id: "chill", label: "Chill", ic: "wave" },
];
const MODE_CHIPS: { mode: MMode; ic: string; label: string; guide: string }[] = [
  { mode: "summary", ic: "pencil", label: "Summarize notes", guide: "**Summary mode.** Paste your lecture notes or reading below and I'll turn them into a clean, structured summary." },
  { mode: "test", ic: "cards", label: "Make me a test", guide: "**Test mode.** Paste your material below and I'll generate a practice quiz with a full answer key." },
  { mode: "program", ic: "map", label: "Make a plan", guide: "**Plan mode.** Tell me your goal — study, gym/sport, a language, a skill — and your timeframe. I'll research what's needed and build a real day-by-day plan." },
  { mode: "chat", ic: "bot", label: "Mentor me", guide: "**Mentor mode.** Ask me anything about your subject and I'll guide you Socratically." },
];
const CAPS: { mode: MMode; ic: string; title: string; desc: string; c: string }[] = [
  { mode: "summary", ic: "pencil", title: "Summarize my notes", desc: "Paste lecture notes — get a clean, structured summary of the key concepts.", c: C.cyan },
  { mode: "test", ic: "cards", title: "Make me a test", desc: "Turn any material into a practice quiz with a full answer key.", c: C.violet },
  { mode: "program", ic: "map", title: "Build any plan", desc: "Study, gym, sport, or language — a real day-by-day plan, researched for you.", c: C.blue },
  { mode: "chat", ic: "bot", title: "Mentor me Socratically", desc: "Get guided to the answer with questions — not just handed it.", c: C.pink },
];

function MentorTab({ lifetime, onUpgrade, userName }: { lifetime: boolean; onUpgrade: () => void; userName: string }) {
  const [msgs, setMsgs] = useState<MMsg[]>([{ role: "ai", local: true, text: `Hi${userName ? ` ${userName}` : ""}, I'm **AIRA** — your study mentor.\n\nI can **summarize your notes**, **make tests**, **build any plan** (study, gym, sport, language), **research anything on the web**, **read a photo** of your notes, and **mentor you**. Pick an action, snap a photo, or just tell me your goal.` }]);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState("");
  const [mode, setMode] = useState<MMode>("chat");
  const [persona, setPersona] = useState("balanced");
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  useEffect(() => { try { const p = window.localStorage.getItem("aira_profile"); if (p) setProfile(JSON.parse(p)); } catch {} }, []);
  const [loading, setLoading] = useState(false);
  const [used, setUsed] = useState(0);
  const [imgData, setImgData] = useState<string | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgMime, setImgMime] = useState("image/jpeg");
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => { try { const raw = JSON.parse(window.localStorage.getItem("aira_free_day") || "{}"); if (raw && raw.date === new Date().toDateString() && typeof raw.count === "number") setUsed(raw.count); else setUsed(0); } catch {} }, []);
  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f || !f.type.startsWith("image/")) return;
    if (f.size > 3 * 1024 * 1024) { alert("Image is too large (max 3MB)."); return; }
    const reader = new FileReader();
    reader.onload = () => { const url = String(reader.result); setImgPreview(url); setImgMime(f.type); setImgData(url.split(",")[1] || ""); };
    reader.readAsDataURL(f); e.target.value = "";
  };
  const usesNotes = mode === "summary" || mode === "test";
  const gated = !lifetime && used >= FREE_MENTOR;
  const scroll = () => setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 60);

  const pickMode = (m: MMode) => { const chip = MODE_CHIPS.find((c) => c.mode === m)!; setMode(m); setMsgs((x) => [...x, { role: "ai", local: true, text: chip.guide }]); scroll(); };

  const send = async (text: string) => {
    const t = text.trim();
    if ((!t && !imgData) || loading || gated) return;
    const userText = t || "Read this image and help me study it.";
    const convo: MMsg[] = [...msgs, { role: "user", text: userText, image: imgPreview || undefined }];
    setMsgs(convo); setInput(""); setNotes(""); setLoading(true); scroll();
    const sentImg = imgData ? { mime: imgMime, data: imgData } : undefined;
    setImgData(null); setImgPreview(null);
    if (!lifetime) { const u = used + 1; setUsed(u); try { window.localStorage.setItem("aira_free_day", JSON.stringify({ date: new Date().toDateString(), count: u })); } catch {} }
    const apiMessages = convo.filter((m) => !m.local).map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
    try {
      const r = await fetch("/api/mentor", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: apiMessages, mode, name: userName, image: sentImg, persona, profile: profile ? { goal: profile.goal, level: profile.level, when: profile.when, weakness: profile.weakness, deadline: profile.deadline } : undefined }) });
      const d = await r.json();
      if (r.ok && d.text) setMsgs((m) => [...m, { role: "ai", text: d.text }]);
      else setMsgs((m) => [...m, { role: "ai", text: offlineReply(mode, userText, userName) }]); // graceful fallback (e.g. key not set)
    } catch { setMsgs((m) => [...m, { role: "ai", text: offlineReply(mode, userText, userName) }]); }
    finally { setLoading(false); scroll(); }
  };

  return (
    <div style={{ animation: "tabIn 0.4s ease", display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 460 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 16 }}>
        {msgs.map((m, i) => <div key={i} style={{ display: "flex", gap: 12, flexDirection: m.role === "user" ? "row-reverse" : "row", animation: "tabIn 0.4s ease" }}><div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: m.role === "ai" ? `linear-gradient(135deg,${C.cyan},${C.violet})` : C.surface, border: m.role === "user" ? `1px solid ${C.border}` : "none" }}><Icon name={m.role === "ai" ? "bot" : "user"} size={17} color={m.role === "ai" ? "#fff" : C.muted} /></div><div style={{ maxWidth: "78%", padding: "13px 17px", borderRadius: 16, fontSize: 14.5, lineHeight: 1.65, background: m.role === "ai" ? C.elev : `linear-gradient(135deg,${C.blue},${C.violet})`, color: m.role === "ai" ? C.fg : "#fff", border: m.role === "ai" ? `1px solid ${C.border}` : "none" }}>{m.role === "ai" ? <MarkdownLite text={m.text} /> : <>{m.image && <img src={m.image} alt="upload" style={{ maxWidth: 200, borderRadius: 10, marginBottom: 8, display: "block" }} />}{m.text}</>}</div></div>)}
        {loading && <div style={{ display: "flex", gap: 12 }}><div style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${C.cyan},${C.violet})` }}><Icon name="bot" size={17} color="#fff" /></div><div style={{ padding: "16px 18px", borderRadius: 16, background: C.elev, border: `1px solid ${C.border}`, display: "flex", gap: 5 }}>{[0, 1, 2].map((d) => <span key={d} style={{ width: 7, height: 7, borderRadius: 9, background: C.cyan, animation: `eq 0.6s ease-in-out ${d * 0.15}s infinite alternate` }} />)}</div></div>}
        {msgs.length <= 1 && !loading && (
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.faint, margin: "6px 2px 12px" }}>Here&apos;s what I can do — tap one</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="dash-grid">
              {CAPS.map((c) => <button key={c.mode} onClick={() => pickMode(c.mode)} style={{ textAlign: "left", cursor: "pointer", padding: 18, borderRadius: 16, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${c.c}55,rgba(255,255,255,0.05)) border-box`, border: "1px solid transparent", transition: `transform 0.25s ${C.ease}, box-shadow 0.25s` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 14px 36px ${c.c}33`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}><div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${c.c}33,${c.c}11)`, border: `1px solid ${c.c}33`, color: c.c, marginBottom: 12 }}><Icon name={c.ic} size={20} color={c.c} /></div><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>{c.title}</div><p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>{c.desc}</p></button>)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {gated ? (
        <div style={{ padding: 20, borderRadius: 16, background: `linear-gradient(135deg,${C.indigo}22,${C.violet}11)`, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>That&apos;s your {FREE_MENTOR} free messages for today</div><p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Resets tomorrow — or become a Mastermind for unlimited mentoring, tests, study plans, and photo reading.</p></div>
          <button onClick={onUpgrade} style={{ padding: "12px 24px", borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>Become a Mastermind</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 10 }}>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.faint, marginRight: 2 }}>Mentor</span>
            {PERSONAS.map((p) => { const on = persona === p.id; return <button key={p.id} onClick={() => setPersona(p.id)} title={`${p.label} mentor style`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 11px", borderRadius: 999, cursor: "pointer", background: on ? `linear-gradient(135deg,${C.cyan}26,${C.violet}26)` : "transparent", border: `1px solid ${on ? "rgba(34,211,238,0.5)" : C.border}`, color: on ? C.fg : C.muted, fontSize: 12, fontWeight: on ? 600 : 400, transition: `all 0.2s ${C.ease}` }}><Icon name={p.ic} size={12} color={on ? C.cyan : C.muted} />{p.label}</button>; })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>{["Review my notes & score them 1–10", "Research a topic and explain it", "Build me a gym / sport training plan", "Plan my study week"].map((s) => <button key={s} onClick={() => send(s)} disabled={loading} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 10, cursor: loading ? "default" : "pointer", background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontSize: 12.5, transition: `all 0.2s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.color = C.fg; e.currentTarget.style.borderColor = "rgba(123,92,255,0.5)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}><Icon name="spark" size={12} color={C.cyan} />{s}</button>)}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>{MODE_CHIPS.map((c) => { const on = mode === c.mode; return <button key={c.mode} onClick={() => pickMode(c.mode)} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999, cursor: "pointer", background: on ? `linear-gradient(135deg,${C.blue},${C.violet})` : C.surface, border: `1px solid ${on ? "transparent" : C.border}`, color: on ? "#fff" : C.muted, fontSize: 13, fontWeight: on ? 600 : 400, transition: `all 0.2s ${C.ease}` }}><Icon name={c.ic} size={14} color={on ? "#fff" : C.muted} />{c.label}</button>; })}</div>
          {usesNotes ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 8, borderRadius: 16, background: C.elev, border: `1px solid ${C.border}` }}>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(notes); }} rows={4} placeholder={mode === "summary" ? "Paste your lecture notes here — I'll summarize them…" : "Paste the material you want to be tested on…"} style={{ width: "100%", resize: "vertical", background: "transparent", border: "none", outline: "none", color: C.fg, fontSize: 14.5, lineHeight: 1.6, padding: "8px 12px", fontFamily: "inherit" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 12 }}><span style={{ fontSize: 11, color: C.faint }}>Ctrl / ⌘ + Enter to send</span><button onClick={() => send(notes)} disabled={loading || !notes.trim()} style={{ padding: "10px 20px", borderRadius: 12, border: "none", cursor: loading || !notes.trim() ? "default" : "pointer", opacity: loading || !notes.trim() ? 0.5 : 1, background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 14, fontWeight: 600 }}>{mode === "summary" ? "Summarize" : "Generate test"}</button></div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {imgPreview && <div style={{ position: "relative", width: 88, height: 88, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}><img src={imgPreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} /><button onClick={() => { setImgData(null); setImgPreview(null); }} style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.65)", color: "#fff", cursor: "pointer", fontSize: 13, lineHeight: 1 }}>×</button></div>}
              <div style={{ display: "flex", gap: 10, padding: 8, borderRadius: 16, background: C.elev, border: `1px solid ${C.border}` }}>
                <button onClick={() => (lifetime ? fileRef.current?.click() : onUpgrade())} title={lifetime ? "Add a photo of your notes" : "Photo reading is a Mastermind feature"} style={{ position: "relative", width: 42, height: 42, borderRadius: 12, border: `1px solid ${C.border}`, cursor: "pointer", background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="image" size={18} color={lifetime ? C.cyan : C.faint} />{!lifetime && <span style={{ position: "absolute", top: -7, right: -7, fontSize: 8, fontWeight: 700, letterSpacing: "0.04em", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", borderRadius: 999, padding: "1px 5px" }}>MIND</span>}</button>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} placeholder={mode === "program" ? "e.g. Master calculus derivatives in 5 days…" : imgPreview ? "Ask about this photo…" : "Ask AIRA anything…"} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.fg, fontSize: 15, padding: "8px 12px" }} />
                <button onClick={() => send(input)} disabled={loading || (!input.trim() && !imgData)} style={{ width: 42, height: 42, borderRadius: 12, border: "none", cursor: loading || (!input.trim() && !imgData) ? "default" : "pointer", opacity: loading || (!input.trim() && !imgData) ? 0.5 : 1, background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="send" size={17} color="#fff" /></button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={onPickImage} style={{ display: "none" }} />
            </div>
          )}
          <p style={{ textAlign: "center", fontSize: 11, color: C.faint, marginTop: 12 }}>{lifetime ? "AIRA Mastermind · unlimited mentoring + photo reading" : `Free · ${Math.max(0, FREE_MENTOR - used)} of ${FREE_MENTOR} messages left today · photos are Mastermind`}</p>
        </>
      )}
    </div>
  );
}
/* Offline mentor engine — runs fully in the browser when the live AI key
   isn't connected yet. It reorganizes the learner's OWN text (no invented
   facts), so summaries / tests / plans are real and useful out of the box. */
const STOP = new Set("the a an and or but of to in on at for with is are was were be been being it its this that these those as by from into your you i we they he she them his her our about over more most than then so if can will just not no yes".split(" "));
function offlineSentences(t: string) { return t.replace(/\s+/g, " ").split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.split(" ").length >= 3); }
function offlineKeyword(s: string) { const cap = s.match(/\b([A-Z][a-zA-Z]{3,})\b/); if (cap) return cap[1]; const w = s.split(/\s+/).map((x) => x.replace(/[^a-zA-Z]/g, "")).filter((x) => x.length > 4 && !STOP.has(x.toLowerCase())).sort((a, b) => b.length - a.length); return w[0] || ""; }
function offlineTopic(t: string) { const first = t.replace(/\s+/g, " ").trim().split(/[.!?]/)[0].split(" ").slice(0, 8).join(" "); return first || "your topic"; }

function offlineReply(mode: MMode, raw: string, name: string): string {
  const text = (raw || "").trim();
  const who = name || "there";
  const sents = offlineSentences(text);
  const wc = text.split(/\s+/).filter(Boolean).length;

  if (mode === "summary") {
    if (wc < 14) return `Paste a paragraph or more of your notes, ${who}, and I'll turn it into a clean **Overview → Key concepts → Remember-this** summary. The more you give me, the sharper it gets.`;
    const overview = sents.slice(0, 2).join(" ");
    const ranked = [...sents].sort((a, b) => b.length - a.length).slice(0, Math.min(6, Math.max(3, Math.ceil(sents.length / 2))));
    const concepts = ranked.map((s) => { const k = offlineKeyword(s); return `- ${k ? `**${k}** — ` : ""}${s.replace(/^[-*]\s*/, "")}`; }).join("\n");
    const remember = ranked.slice(0, 3).map((s, i) => `${i + 1}. ${s.split(" ").slice(0, 16).join(" ")}${s.split(" ").length > 16 ? "…" : ""}`).join("\n");
    return `## Overview\n${overview}\n\n## Key concepts\n${concepts}\n\n## Remember this\n${remember}\n\n*Want me to turn this into a quiz? Switch to **Make me a test** and paste the same notes.*`;
  }

  if (mode === "test") {
    if (wc < 14) return `Paste the material you want to be tested on, ${who}, and I'll generate a practice quiz with an answer key from it.`;
    const pool = [...sents].sort((a, b) => b.length - a.length).slice(0, 8);
    const qs: string[] = [], keys: string[] = [];
    pool.forEach((s, i) => {
      const k = offlineKeyword(s);
      const at = k ? s.indexOf(k) : -1;
      if (at >= 0) { qs.push(`${i + 1}. ${s.slice(0, at)}______${s.slice(at + k.length)}`); keys.push(`${i + 1}. **${k}**`); }
      else { qs.push(`${i + 1}. In your own words, explain: "${s.split(" ").slice(0, 12).join(" ")}…"`); keys.push(`${i + 1}. Open answer — check it covers the idea above.`); }
    });
    return `## Quiz\nFill the blank or answer in your own words — no peeking.\n\n${qs.join("\n")}\n\n## Answer key\n${keys.join("\n")}\n\n*Score yourself, then bring me the ones you missed and I'll explain them.*`;
  }

  if (mode === "program") {
    const topic = offlineTopic(text);
    const days = [
      { d: "Day 1", f: `Map ${topic}`, t: ["Skim the whole topic, write 5 questions you can't yet answer", "Build a one-page outline of the core ideas"] },
      { d: "Day 2", f: "Core concepts", t: ["Deep-read the 3 hardest ideas", "Explain each out loud without looking (active recall)"] },
      { d: "Day 3", f: "Practice", t: ["Do problems / make a test from your notes", "Mark every gap you find"] },
      { d: "Day 4", f: "Fill the gaps", t: ["Re-study only what you missed on Day 3", "Spaced review of Day 1–2 (15 min)"] },
      { d: "Day 5", f: "Lock it in", t: ["Full self-test under time pressure", "Teach the topic to an imaginary student"] },
    ];
    const body = days.map((x) => `## ${x.d} · ${x.f}\n- ${x.t.join("\n- ")}\n- **Active-recall check:** close everything and write what you remember`).join("\n\n");
    return `Here's a 5-day plan to master **${topic}**, ${who}:\n\n${body}\n\n## How to use this plan\nDo one day per sitting. Never re-read passively — always close the page and retrieve from memory. Each day starts by recalling the day before, so it compounds.`;
  }

  // chat / mentor — Socratic
  const l = text.toLowerCase();
  if (l.includes("focus") || l.includes("concentrate") || l.includes("distract")) return `Let's fix your focus, ${who}. First: how long can you currently work before your attention drifts? If it's under 20 min, we start with **Pomodoro** (25/5). If longer, **Deep Work** blocks. Open the **Study** tab and I'll run the timer with you. What's your honest focus span right now?`;
  if (l.includes("flashcard") || l.includes("memor") || l.includes("remember") || l.includes("forget")) return `Memory is a retrieval game, not a re-reading game, ${who}. Tell me the topic and I'll show you how to build spaced-repetition flashcards from it. Quick check first: when you "study", do you re-read, or do you close the page and test yourself? Be honest — that's the whole difference.`;
  if (l.includes("how") || l.includes("why") || l.includes("what") || l.includes("explain")) return `Good question. Before I explain — what's your current best guess? Even a rough one. I learn the most about how to help you from where your intuition lands, and you'll remember it far better if you reason toward it first. Take a shot and I'll build on it.`;
  return `I'm with you, ${who}. To mentor you well I work Socratically — I'll ask, you reason, then I confirm and we lock it in with a quick recall check. Tell me the exact topic or paste your notes, and pick a mode: **Summarize**, **Make a test**, or **Study program**. Where do you want to start?`;
}

/* ░░ SUBJECTS TAB ░░ */
function SubjectsTab() {
  return (
    <div style={{ animation: "tabIn 0.4s ease" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Your subjects</h3>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Track mastery across everything you're learning. Tap one to start a session.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 14 }}>
        {APP_SUBJECTS.map((s, i) => <div key={s.n} style={{ padding: 20, borderRadius: 16, background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${s.c}33,rgba(255,255,255,0.04)) border-box`, border: "1px solid transparent", cursor: "pointer", animation: `tabIn 0.5s ease ${i * 70}ms both`, transition: `all 0.25s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><Icon name="book" size={24} color={s.c} /><span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: s.c }}>{s.p}%</span></div><div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{s.n}</div><div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}><div style={{ height: "100%", width: `${s.p}%`, borderRadius: 999, background: `linear-gradient(90deg,${s.c},${C.violet})`, animation: `growW 1s ease ${i * 70}ms both` }} /></div></div>)}
      </div>
      <button style={{ marginTop: 20, padding: "13px 24px", borderRadius: 12, border: `1px dashed ${C.border}`, background: "transparent", color: C.muted, fontSize: 14, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Icon name="plus" size={16} color={C.muted} /> Add a custom subject — AIRA adapts to anything</button>
    </div>
  );
}

/* ░░ PROGRESS TAB — XP · Knowledge Graph · Adaptive Roadmap ░░ */
function ProgressTab() {
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [xp, setXp] = useState(0);
  useEffect(() => { try { const p = window.localStorage.getItem("aira_profile"); if (p) setProfile(JSON.parse(p)); setXp(getXp()); } catch {} }, []);
  const goal = profile?.goal || "your goal";
  const level = Math.floor(xp / 500) + 1;
  const intoLevel = Math.round(((xp % 500) / 500) * 100);
  const base = profile?.level === "Advanced" ? 55 : profile?.level === "Intermediate" ? 38 : profile?.level === "Some basics" ? 22 : 10;
  const areas = [
    { n: "Fundamentals", p: Math.min(96, base + 34), c: C.cyan },
    { n: "Core concepts", p: Math.min(92, base + 14), c: C.indigo },
    { n: "Hands-on practice", p: Math.max(6, base - 2), c: C.violet },
    { n: "Advanced topics", p: Math.max(4, base - 12), c: C.pink },
    { n: "Real projects", p: Math.max(3, base - 6), c: C.green },
  ];
  const phases = [
    { t: "Foundations", d: `Lock in the basics of ${goal}.`, st: "done" },
    { t: "Core skills", d: "Main concepts, patterns and vocabulary.", st: "now" },
    { t: "Deliberate practice", d: "Active recall and drills on your weak spots.", st: "next" },
    { t: "Build something real", d: "Apply everything in a project.", st: "next" },
    { t: "Mastery & review", d: "Spaced review so it actually sticks.", st: "next" },
  ];
  const stats = [{ l: "Level", v: String(level), c: C.amber }, { l: "Total XP", v: xp.toLocaleString(), c: C.cyan }, { l: "Day streak", v: "12", c: C.pink }, { l: "Avg retention", v: "94%", c: C.green }];
  return (
    <div style={{ animation: "tabIn 0.4s ease" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Your path to {goal}</h3>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 22 }}>AIRA tracks what you know, what&apos;s next, and adapts the plan as you go.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: 22, borderRadius: 18, marginBottom: 18, background: `linear-gradient(135deg,${C.amber}16,${C.violet}10)`, border: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 220 }}>
          <span style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 15, background: `linear-gradient(135deg,${C.amber},#FB923C)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, color: "#fff" }}>{level}</span>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Level {level} · {500 - (xp % 500)} XP to level {level + 1}</div><div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}><div style={{ height: "100%", width: `${intoLevel}%`, borderRadius: 999, background: `linear-gradient(90deg,${C.amber},#FB923C)`, animation: "growW 1s ease both" }} /></div></div>
        </div>
        <div style={{ display: "flex", gap: 22 }}>{stats.slice(1).map((s) => <div key={s.l} style={{ textAlign: "center" }}><div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: s.c }}>{s.v}</div><div style={{ fontSize: 11, color: C.muted }}>{s.l}</div></div>)}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="dash-grid">
        <div style={{ padding: 24, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}><Icon name="brain" size={18} color={C.cyan} /><h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700 }}>Knowledge graph</h4></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{areas.map((a, i) => <div key={a.n}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13.5, color: C.fg }}>{a.n}</span><span style={{ fontSize: 12.5, fontWeight: 600, color: a.c }}>{a.p}%</span></div><div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}><div style={{ height: "100%", width: `${a.p}%`, borderRadius: 999, background: `linear-gradient(90deg,${a.c},${C.violet})`, animation: `growW 1s ease ${i * 80}ms both` }} /></div></div>)}</div>
          <p style={{ fontSize: 12, color: C.faint, marginTop: 16, lineHeight: 1.5 }}>AIRA spots your weakest area — <span style={{ color: C.fg }}>{areas.slice().sort((a, b) => a.p - b.p)[0].n}</span> — and aims you there next.</p>
        </div>
        <div style={{ padding: 24, borderRadius: 18, background: C.elev, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}><Icon name="map" size={18} color={C.violet} /><h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700 }}>Adaptive roadmap</h4></div>
          <div style={{ display: "flex", flexDirection: "column" }}>{phases.map((ph, i) => { const done = ph.st === "done"; const now = ph.st === "now"; const col = done ? C.green : now ? C.cyan : C.faint; return <div key={ph.t} style={{ display: "flex", gap: 13, paddingBottom: i < phases.length - 1 ? 18 : 0 }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", border: `2px solid ${col}`, background: done ? C.green : now ? `${C.cyan}22` : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? <Icon name="check" size={13} color="#fff" stroke={3} /> : <span style={{ fontSize: 11, fontWeight: 700, color: col }}>{i + 1}</span>}</span>{i < phases.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 18, background: done ? C.green : C.border, marginTop: 2 }} />}</div><div style={{ paddingTop: 2 }}><div style={{ fontSize: 14, fontWeight: 600, color: now ? C.fg : done ? C.muted : C.muted }}>{ph.t}{now && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700, color: C.cyan, background: `${C.cyan}1a`, border: `1px solid ${C.cyan}44`, borderRadius: 999, padding: "2px 7px" }}>NOW</span>}</div><div style={{ fontSize: 12.5, color: C.faint, marginTop: 2, lineHeight: 1.5 }}>{ph.d}</div></div></div>; })}</div>
        </div>
      </div>
    </div>
  );
}

/* ░░ HISTORY TAB ░░ */
function HistoryTab() {
  const [sessions, setSessions] = useState<SessionLog[]>([]);
  useEffect(() => { setSessions(getSessions()); }, []);
  const totalMins = sessions.reduce((a, s) => a + s.mins, 0);
  const hrs = Math.floor(totalMins / 60), mm = totalMins % 60;
  const clear = () => { try { window.localStorage.removeItem("aira_sessions"); } catch {} setSessions([]); };
  return (
    <div style={{ animation: "tabIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 6 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>Session history</h3>
        {sessions.length > 0 && <button onClick={clear} style={{ fontSize: 12.5, color: C.faint, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 999, padding: "6px 14px", cursor: "pointer" }}>Clear history</button>}
      </div>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Every focus session you complete is logged here automatically.</p>
      {sessions.length === 0 ? (
        <div style={{ padding: 48, borderRadius: 18, background: C.elev, border: `1px dashed ${C.border}`, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, color: C.faint }}><Icon name="clock" size={40} color={C.faint} /></div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>No sessions yet</div>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>Your activity will appear here as you study with AIRA — track your momentum over time.</p>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 22 }}>
            {[{ l: "Total sessions", v: String(sessions.length), c: C.violet }, { l: "Focus logged", v: hrs > 0 ? `${hrs}h ${mm}m` : `${mm}m`, c: C.cyan }, { l: "This week", v: String(sessions.filter((s) => Date.now() - s.ts < 7 * 864e5).length), c: C.green }].map((s) => <div key={s.l} style={{ padding: 18, borderRadius: 16, background: C.elev, border: `1px solid ${C.border}`, textAlign: "center" }}><div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: s.c, marginBottom: 2 }}>{s.v}</div><div style={{ fontSize: 12.5, color: C.muted }}>{s.l}</div></div>)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sessions.map((s, i) => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, background: C.elev, border: `1px solid ${C.border}`, animation: `tabIn 0.4s ease ${Math.min(i, 8) * 50}ms both` }}><span style={{ width: 40, height: 40, borderRadius: 11, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${s.color}33,${s.color}11)`, border: `1px solid ${s.color}33`, color: s.color }}><Icon name="target" size={18} color={s.color} /></span><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 15, fontWeight: 600, color: C.fg }}>{s.tech}</div><div style={{ fontSize: 12.5, color: C.faint }}>{relTime(s.ts)}</div></div><div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: s.color }}>{s.mins}m</div></div>)}
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════ NAME ONBOARDING ════════════ */
const ONB_Q: Array<{ key: string; ai: string; type: "text" | "chips"; ph?: string; opts?: string[] }> = [
  { key: "name", ai: "Hey — I'm AIRA, your AI mentor. Give me 40 seconds and I'll build a plan made just for you. First: what should I call you?", type: "text", ph: "Your name" },
  { key: "goal", ai: "What do you want to learn or get better at?", type: "text", ph: "e.g. React, Calculus, Spanish, the guitar…" },
  { key: "level", ai: "Where are you starting from?", type: "chips", opts: ["Total beginner", "Some basics", "Intermediate", "Advanced"] },
  { key: "deadline", ai: "By when do you want to get there?", type: "chips", opts: ["30 days", "60 days", "90 days", "No deadline"] },
  { key: "hours", ai: "How many hours a week can you realistically commit?", type: "chips", opts: ["1–3h", "4–7h", "8–14h", "15h+"] },
  { key: "when", ai: "When do you focus best?", type: "chips", opts: ["Morning", "Afternoon", "Evening", "Late night"] },
  { key: "weakness", ai: "Last one — what gets in your way the most?", type: "chips", opts: ["Procrastination", "Staying focused", "The hard concepts", "Staying consistent"] },
];
function looksFake(s: string) {
  const t = s.trim().toLowerCase();
  if (t.length < 2) return true;
  if (!/[aeiouıöüäé]/i.test(t)) return true;                 // no vowel at all → mash
  if (/(.)\1\1/.test(t)) return true;                        // 3+ repeated chars (aaaa)
  if (/^(asd|qwe|zxc|wer|sdf|dfg|fgh|ghj|hjk|jkl|qaz|wsx)/i.test(t)) return true; // keyboard rows
  const letters = t.replace(/[^a-zçğıöşü]/gi, "");
  if (letters.length >= 4 && new Set(letters).size <= 2) return true; // only 1-2 distinct letters
  return false;
}
function NameModal({ onSave }: { onSave: (name: string, remember: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const cur = ONB_Q[step];
  const answer = (val: string) => {
    const v = val.trim(); if (!v) return;
    if ((cur.key === "goal" || cur.key === "name") && looksFake(v)) {
      setErr(cur.key === "goal"
        ? "Hmm — that's not a real thing. Tell me an actual skill or goal (React, calculus, guitar, marathon training…)."
        : "Come on — give me your real name so I can mentor you properly.");
      return;
    }
    setErr("");
    const next = { ...ans, [cur.key]: v }; setAns(next); setText("");
    if (step < ONB_Q.length - 1) setStep(step + 1);
    else {
      const hoursIdx = ["1–3h", "4–7h", "8–14h", "15h+"].indexOf(next.hours);
      const levelIdx = ["Total beginner", "Some basics", "Intermediate", "Advanced"].indexOf(next.level);
      const confidence = Math.min(95, 72 + (hoursIdx >= 0 ? hoursIdx * 4 : 6) + (levelIdx >= 0 ? levelIdx * 3 : 0));
      const profile = { ...next, confidence, created: Date.now() };
      try { window.localStorage.setItem("aira_profile", JSON.stringify(profile)); } catch {}
      setAns({ ...next, confidence: String(confidence) });
      setDone(true);
    }
  };
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 12.5, color: C.faint, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span><span style={{ fontSize: 14, fontWeight: 600, color: C.fg, textAlign: "right", maxWidth: "60%" }}>{value}</span></div>
  );
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1700, background: "rgba(0,0,4,0.92)", backdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.3s ease" }}>
      <div className="auth-card" style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 40, maxWidth: 460, width: "100%", boxShadow: `0 0 100px ${C.indigo}44`, animation: `popIn 0.45s ${C.spring}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}><BrainLogo size={28} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19 }}>AIRA</span>{!done && <span style={{ marginLeft: "auto", fontSize: 12, color: C.faint }}>{step + 1} / {ONB_Q.length}</span>}</div>
        {!done ? (
          <>
            <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.07)", marginBottom: 24, overflow: "hidden" }}><div style={{ height: "100%", width: `${((step + 1) / ONB_Q.length) * 100}%`, borderRadius: 999, background: `linear-gradient(90deg,${C.cyan},${C.violet})`, transition: `width 0.4s ${C.ease}` }} /></div>
            <div style={{ display: "flex", gap: 12, marginBottom: 26 }}>
              <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bot" size={18} color="#fff" /></span>
              <p key={step} style={{ fontSize: 16.5, lineHeight: 1.5, color: C.fg, paddingTop: 4, animation: "tabIn 0.4s ease" }}>{cur.ai}</p>
            </div>
            {cur.type === "text" ? (
              <input value={text} onChange={(e) => { setText(e.target.value); setErr(""); }} onKeyDown={(e) => e.key === "Enter" && answer(text)} autoFocus placeholder={cur.ph} style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: C.surface, border: `1px solid ${err ? "#FB7185" : C.border}`, color: C.fg, fontSize: 16, marginBottom: err ? 8 : 16, outline: "none" }} />
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>{cur.opts!.map((o) => <button key={o} onClick={() => answer(o)} style={{ padding: "13px 14px", borderRadius: 12, cursor: "pointer", background: C.surface, border: `1px solid ${C.border}`, color: C.fg, fontSize: 14, fontWeight: 500, transition: `all 0.2s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(123,92,255,0.6)"; e.currentTarget.style.background = `${C.indigo}1a`; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.surface; }}>{o}</button>)}</div>
            )}
            {err && <p style={{ fontSize: 13, color: "#FB7185", marginBottom: 14, lineHeight: 1.5, animation: "tabIn 0.3s ease" }}>{err}</p>}
            {cur.type === "text" && <GBtn full onClick={() => answer(text)}>Continue <Icon name="arrow" size={18} color="#fff" /></GBtn>}
            {step > 0 && <button onClick={() => setStep(step - 1)} style={{ background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer", marginTop: 14, display: "block" }}>← Back</button>}
          </>
        ) : (
          <div style={{ animation: "tabIn 0.4s ease" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 23, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.02em" }}>Your Learning Profile</h2>
            <p style={{ fontSize: 13.5, color: C.muted, marginBottom: 20 }}>Got it, {ans.name}. Here&apos;s the plan I&apos;ll mentor you on.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 18, borderRadius: 16, background: `linear-gradient(135deg,${C.indigo}1f,${C.cyan}11)`, border: `1px solid ${C.border}`, marginBottom: 18 }}>
              <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}><svg viewBox="0 0 36 36" style={{ width: 64, height: 64, transform: "rotate(-90deg)" }}><circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" /><circle cx="18" cy="18" r="15.5" fill="none" stroke={C.cyan} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(parseInt(String(ans.confidence ?? 80)) / 100) * 97.4} 97.4`} /></svg><span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: C.fg }}>{ans.confidence ?? 80}%</span></div>
              <div><div style={{ fontSize: 12, color: C.faint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Confidence</div><div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>You&apos;re set up to hit <strong style={{ color: C.fg }}>{ans.goal}</strong>. Let&apos;s start.</div></div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <Row label="Goal" value={ans.goal || "—"} />
              <Row label="Level" value={ans.level || "—"} />
              <Row label="Deadline" value={ans.deadline || "—"} />
              <Row label="Weekly time" value={ans.hours || "—"} />
              <Row label="Focus window" value={ans.when || "—"} />
              <Row label="Watch out for" value={ans.weakness || "—"} />
            </div>
            <GBtn full onClick={() => onSave(ans.name || "there", true)}>Start with AIRA <Icon name="arrow" size={18} color="#fff" /></GBtn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════ AUTH MODAL ════════════ */
function AuthModal({ mode, onClose, onSwitch, onSuccess }: { mode: "in" | "up"; onClose: () => void; onSwitch: (m: "in" | "up") => void; onSuccess: (email?: string) => void }) {
  const isUp = mode === "up";
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    if (!email.trim() || !email.includes("@")) { setErr("Enter a valid email address."); return; }
    onSuccess(email.trim());
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1500, background: "rgba(0,0,4,0.9)", backdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.3s ease" }}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()} style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 44, maxWidth: 420, width: "100%", boxShadow: `0 0 100px ${C.indigo}44`, animation: `popIn 0.45s ${C.spring}` }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: C.faint, fontSize: 24, cursor: "pointer", lineHeight: 1 }}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}><BrainLogo size={28} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>AIRA</span></div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.02em" }}>{isUp ? "Create your account" : "Welcome back"}</h2>
        <p style={{ fontSize: 14, color: C.muted, marginBottom: 28 }}>{isUp ? "Start free — 3 AI mentor sessions a day, no card." : "Sign in to continue your flow."}</p>
        <button onClick={() => onSuccess()} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px", borderRadius: 12, background: "#fff", color: "#1a1a1a", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92a8.78 8.78 0 002.68-6.62z" /><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 009 18z" /><path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 010-3.44V4.96H.96a9 9 0 000 8.08l3.01-2.32z" /><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 00.96 4.96L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58z" /></svg>{isUp ? "Sign up with Google" : "Log in with Google"}</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: C.border }} /><span style={{ fontSize: 12, color: C.faint }}>or email</span><div style={{ flex: 1, height: 1, background: C.border }} /></div>
        <input value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} onKeyDown={(e) => e.key === "Enter" && submit()} type="email" placeholder="you@email.com" style={{ width: "100%", padding: "13px 16px", borderRadius: 12, background: C.surface, border: `1px solid ${err ? "#FB7185" : C.border}`, color: C.fg, fontSize: 15, marginBottom: err ? 8 : 20, outline: "none" }} />
        {err && <p style={{ fontSize: 12.5, color: "#FB7185", marginBottom: 14 }}>{err}</p>}
        <GBtn full onClick={submit}>{isUp ? "Continue with email" : "Sign in with email"}</GBtn>
        <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 20 }}>{isUp ? "Already have an account? " : "New to AIRA? "}<button onClick={() => onSwitch(isUp ? "in" : "up")} style={{ background: "none", border: "none", color: C.cyan, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{isUp ? "Sign in" : "Sign up"}</button></p>
        <p style={{ textAlign: "center", fontSize: 11, color: C.faint, marginTop: 16, lineHeight: 1.6 }}>By continuing you agree to AIRA&apos;s Terms &amp; Privacy.</p>
      </div>
    </div>
  );
}

/* ════════════ GIFT CODE ════════════ */
function GiftCode({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState(""); const [status, setStatus] = useState<"idle" | "error">("idle"); const [unlocked, setUnlocked] = useState(false);
  const redeem = () => { if (code.trim() === LIFETIME_CODE) { setUnlocked(true); onUnlock(); try { window.localStorage.setItem("aira_lifetime", "true"); } catch {} } else setStatus("error"); };
  return (
    <div style={{ maxWidth: 520, margin: "0 auto" }}>
      <div style={{ background: unlocked ? `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.green},${C.cyan}) border-box` : `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,rgba(251,191,36,0.5),rgba(168,85,247,0.3)) border-box`, border: "1px solid transparent", borderRadius: 24, padding: 40, backdropFilter: "blur(20px)", textAlign: "center", transition: "all 0.5s ease" }}>
        {!unlocked ? (<>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, color: C.amber }}><Icon name="gift" size={40} color={C.amber} /></div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Have a gift code?</h3>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 28, lineHeight: 1.6 }}>Enter your code to unlock lifetime AIRA Mastermind access — no subscription, yours forever.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><input value={code} onChange={(e) => { setCode(e.target.value); setStatus("idle"); }} onKeyDown={(e) => e.key === "Enter" && redeem()} placeholder="Enter gift code" style={{ flex: 1, minWidth: 180, padding: "15px 18px", borderRadius: 14, background: C.surface, border: `1px solid ${status === "error" ? "#FB7185" : C.border}`, color: C.fg, fontSize: 16, outline: "none", letterSpacing: "0.05em", textAlign: "center" }} /><button onClick={redeem} style={{ padding: "15px 28px", borderRadius: 14, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.amber},${C.violet})`, color: "#fff", fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>Redeem</button></div>
          {status === "error" && <p style={{ fontSize: 13, color: "#FB7185", marginTop: 16 }}>That code isn't valid. Double-check and try again.</p>}
        </>) : (
          <div style={{ animation: `popIn 0.5s ${C.spring}` }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, color: C.green }}><Icon name="check" size={48} color={C.green} stroke={2.5} /></div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 10, color: C.green }}>You&apos;re a Mastermind now.</h3>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>Lifetime access to everything — unlimited mentoring, plans, photo reading, and audio. Yours forever. Welcome to the inner circle.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 999, background: `${C.green}18`, border: `1px solid ${C.green}44`, fontSize: 13, fontWeight: 600, color: C.green }}><Icon name="check" size={14} color={C.green} /> Lifetime access active</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════ SOUND PLAYER ════════════ */
const SOUNDS = [
  { id: "8d", name: "8D Ambient", note: "A warm pad that swirls around your head", hz: "220 · 277 · 330 Hz" },
  { id: "binaural", name: "Binaural Beats", note: "40 Hz gamma beat for deep concentration", hz: "240 / 280 Hz · 40 Hz beat" },
  { id: "rain", name: "Rainfall", note: "Steady rain to mask distractions", hz: "Pink noise · 5 kHz" },
  { id: "forest", name: "Forest", note: "Wind and birdsong for calm focus", hz: "Filtered noise · 660 Hz" },
  { id: "cafe", name: "Cafe Hum", note: "Gentle low background chatter", hz: "Low-pass · 480 Hz" },
  { id: "silence", name: "Pure Silence", note: "No audio, just you and the work", hz: "—" },
];
function SoundPlayer({ seen, lifetime, onUpgrade }: { seen: { [k: string]: boolean }; lifetime: boolean; onUpgrade: () => void }) {
  const [active, setActive] = useState("8d");
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const timerRef = useRef<number | null>(null);

  const teardown = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (nodesRef.current) { try { nodesRef.current.stop(); } catch {} nodesRef.current = null; }
  };
  const start = (id: string) => {
    teardown();
    if (id === "silence") return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current || (ctxRef.current = new AC());
    if (ctx.state === "suspended") ctx.resume();
    const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.7);
    const cleanup: Array<() => void> = [];
    const noise = () => { const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; const s = ctx.createBufferSource(); s.buffer = b; s.loop = true; return s; };
    if (id === "binaural") {
      const merger = ctx.createChannelMerger(2);
      const oL = ctx.createOscillator(); oL.type = "sine"; oL.frequency.value = 240;
      const oR = ctx.createOscillator(); oR.type = "sine"; oR.frequency.value = 280;
      const gL = ctx.createGain(); const gR = ctx.createGain(); gL.gain.value = gR.gain.value = 0.5;
      oL.connect(gL).connect(merger, 0, 0); oR.connect(gR).connect(merger, 0, 1); merger.connect(master);
      oL.start(); oR.start(); cleanup.push(() => { oL.stop(); oR.stop(); });
    } else if (id === "8d") {
      // Audible calm A-major pad (220/277/330 Hz) so it plays clearly on laptop speakers,
      // with a slow stereo LFO that swirls it around your head — the "8D" effect.
      const freqs = [220, 277.18, 329.63];
      const oscs = freqs.map((f, i) => { const o = ctx.createOscillator(); o.type = i === 2 ? "triangle" : "sine"; o.frequency.value = f; return o; });
      const pan = ctx.createStereoPanner();
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.15; const lg = ctx.createGain(); lg.gain.value = 0.92;
      lfo.connect(lg).connect(pan.pan);
      const g = ctx.createGain(); g.gain.value = 0.3; oscs.forEach((o) => o.connect(g)); g.connect(pan).connect(master);
      oscs.forEach((o) => o.start()); lfo.start(); cleanup.push(() => { oscs.forEach((o) => { try { o.stop(); } catch {} }); lfo.stop(); });
    } else {
      const n = noise(); const f = ctx.createBiquadFilter(); f.type = "lowpass";
      f.frequency.value = id === "cafe" ? 480 : id === "forest" ? 2400 : 5000;
      const g = ctx.createGain(); g.gain.value = id === "cafe" ? 0.7 : 0.4; n.connect(f).connect(g).connect(master); n.start(); cleanup.push(() => n.stop());
      if (id === "forest") { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = 660; const og = ctx.createGain(); og.gain.value = 0.03; o.connect(og).connect(master); o.start(); cleanup.push(() => o.stop()); }
    }
    nodesRef.current = { stop: () => { try { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25); } catch {} setTimeout(() => cleanup.forEach((c) => { try { c(); } catch {} }), 280); } };
    // Mastermind plays a full hour-long session; gating happens in toggle() so free users never start it.
    timerRef.current = window.setTimeout(() => { teardown(); setPlaying(false); }, 60 * 60 * 1000);
  };
  const toggle = () => { if (!lifetime) { onUpgrade(); return; } if (playing) { teardown(); setPlaying(false); } else { start(active); setPlaying(true); } };
  useEffect(() => { if (playing) start(active); /* restart on sound change */ }, [active]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { teardown(); try { ctxRef.current?.close(); } catch {} }, []);
  return (
    <div data-k="snd" style={{ opacity: seen["snd"] ? 1 : 0, transform: seen["snd"] ? "translateY(0)" : "translateY(32px)", transition: `all 0.8s ${C.ease}`, willChange: "transform,opacity" }}>
      <div style={{ background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,rgba(34,211,238,0.4),rgba(123,92,255,0.25)) border-box`, border: "1px solid transparent", borderRadius: 24, padding: 36, backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14, height: 22 }}>{playing && <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 999, background: `${C.green}14`, border: `1px solid ${C.green}44`, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: C.green }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, animation: "breathe 1.2s ease-in-out infinite" }} />LIVE AUDIO</span>}</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5, height: 70, marginBottom: 28 }}>{Array.from({ length: 34 }).map((_, i) => <div key={i} style={{ width: 4, borderRadius: 999, background: `linear-gradient(${C.cyan},${C.indigo})`, height: playing ? `${20 + Math.abs(Math.sin(i * 0.9)) * 50}px` : "8px", animation: playing ? `eq 0.${6 + (i % 5)}s ease-in-out ${i * 0.04}s infinite alternate` : "none", transition: "height 0.4s ease", willChange: "transform", transformOrigin: "bottom" }} />)}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 24 }}>{SOUNDS.map((s) => { const on = s.id === active; return <button key={s.id} onClick={() => setActive(s.id)} style={{ padding: "10px 18px", borderRadius: 999, cursor: "pointer", background: on ? `linear-gradient(135deg,${C.cyan}22,${C.indigo}22)` : "transparent", border: `1px solid ${on ? "rgba(34,211,238,0.5)" : C.border}`, color: on ? C.fg : C.muted, fontSize: 13, transition: `all 0.25s ${C.ease}` }}>{s.name}</button>; })}</div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.faint, marginBottom: 10 }}>{SOUNDS.find((s) => s.id === active)?.note}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: `${C.cyan}10`, border: `1px solid ${C.cyan}33`, fontSize: 11.5, fontWeight: 600, color: C.cyan, fontVariantNumeric: "tabular-nums" }}><Icon name="wave" size={12} color={C.cyan} /> {SOUNDS.find((s) => s.id === active)?.hz}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: C.surface, border: `1px solid ${C.border}`, fontSize: 11.5, fontWeight: 600, color: C.muted }}><Icon name="bell" size={12} color={C.muted} /> Use headphones for the full effect</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}><button onClick={toggle} title={lifetime ? "" : "Mastermind only"} style={{ position: "relative", width: 64, height: 64, borderRadius: 999, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${C.indigo}55` }}><Icon name={playing ? "pause" : "play"} size={22} color="#fff" />{!lifetime && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 8, fontWeight: 700, letterSpacing: "0.04em", background: `linear-gradient(135deg,${C.amber},${C.violet})`, color: "#fff", borderRadius: 999, padding: "2px 6px" }}>MIND</span>}</button></div>
        {!lifetime ? (
          <p style={{ textAlign: "center", fontSize: 12.5, color: C.amber, marginTop: 16 }}>Focus audio is Mastermind-only. <button onClick={onUpgrade} style={{ background: "none", border: "none", color: C.cyan, cursor: "pointer", fontSize: 12.5, fontWeight: 600 }}>Unlock 1-hour sessions →</button></p>
        ) : (
          <p style={{ textAlign: "center", fontSize: 11, color: C.faint, marginTop: 16 }}>Real generated focus audio · 1-hour sessions · Mastermind</p>
        )}
      </div>
    </div>
  );
}

/* ════════════ LANDING DATA ════════════ */
const SCIENCE = [
  { ic: "bolt", c: C.cyan, t: "Neural Phase Locking", s: "Ultradian Rhythm Research", b: "Structured focus intervals align with your brain's natural ultradian rhythms — the foundation of deep concentration." },
  { ic: "repeat", c: C.violet, t: "Spaced Repetition", s: "Ebbinghaus, replicated 2024", b: "The forgetting curve shows 70% loss within 24 hours. AIRA schedules reviews at the mathematically optimal moment." },
  { ic: "pencil", c: C.blue, t: "Active Recall", s: "Roediger & Karpicke, 2006", b: "Passive re-reading retains ~10%. Active recall forces retrieval, retaining up to 94%. Built into every session." },
  { ic: "target", c: C.pink, t: "Socratic Method", s: "Chi et al., Self-Explanation", b: "Guided discovery creates 2x stronger neural pathways than passive instruction. AIRA asks, then guides you." },
];
const BENTO = [
  { ic: "target", t: "Six Focus Techniques", b: "Pomodoro, Flowtime, 52/17, Deep Work, Timeboxing, Ultradian — each explained, each structured by AIRA.", c: C.blue, span: 2 },
  { ic: "bot", t: "Socratic AI Mentor", b: "Guides you to answers instead of handing them over.", c: C.violet, span: 1 },
  { ic: "chart", t: "Live Dashboard", b: "Focus time, streaks, mastery, peak hours — all tracked.", c: C.cyan, span: 1 },
  { ic: "repeat", t: "Auto Spaced Review", b: "Never forget what you learn. Reviews scheduled at the perfect moment.", c: C.green, span: 2 },
];
const FLOW_STEPS = [
  { n: "1", ic: "spark", t: "Open your study space", b: "Pick from six science-backed focus techniques in one tap.", c: C.cyan },
  { n: "2", ic: "target", t: "AIRA structures it", b: "Your timer starts, distractions are blocked, the session is built around how your brain learns.", c: C.indigo },
  { n: "3", ic: "bot", t: "Learn with your mentor", b: "AIRA asks Socratic questions, catches weak spots, never just hands you the answer.", c: C.violet },
  { n: "4", ic: "chart", t: "Track and review", b: "Everything lands on your dashboard. Spaced reviews get scheduled automatically.", c: C.pink },
];
const PREMIUM = [
  { ic: "spark", t: "Unlimited AI Mentoring", b: "No daily caps, no token limits. Ask AIRA as much as your curiosity demands — every hour, every subject, forever." },
  { ic: "layers", t: "Adaptive Difficulty Engine", b: "AIRA measures your accuracy and speed, then calibrates every question to the exact edge of your ability." },
  { ic: "wave", t: "Royalty-Free Focus Audio", b: "8D spatial ambient, binaural beats tuned to 40Hz gamma, rain, forest, cafe. Engineered to deepen focus." },
  { ic: "chart", t: "Deep Progress Analytics", b: "Your retention curve, peak focus hours, strongest and weakest concepts — the data top students use." },
  { ic: "flame", t: "Streak & Momentum System", b: "Daily streaks, focus milestones, and a momentum score that turns consistent study into a habit." },
  { ic: "trophy", t: "Verified Certificates", b: "Complete a subject, earn a shareable certificate with a verification link — proof of mastery." },
  { ic: "download", t: "Offline & Export", b: "Download sessions for offline study; export notes, summaries, and flashcards anytime." },
  { ic: "moon", t: "Device-Free Mode", b: "AIRA tells you exactly when to put your phone down and work on paper — the biggest focus upgrade." },
  { ic: "cards", t: "Auto Flashcard Generator", b: "AIRA turns any session into spaced-repetition flashcards automatically — no manual card-making." },
  { ic: "map", t: "Smart Concept Maps", b: "AIRA auto-builds a visual map of how every concept connects — see the big picture, not isolated facts." },
];
const FOCUS_MODES = [
  { ic: "bell", t: "Notifications Off", b: "AIRA's focus mode signals you to silence your phone and close every tab. Deep work demands an undivided mind." },
  { ic: "moon", t: "Device-Away Sessions", b: "Some lessons are designed for your phone face-down across the room. AIRA tells you exactly when to step away." },
  { ic: "wave", t: "Royalty-Free Audio", b: "8D ambient, binaural beats, rain, forest, cafe, or silence. Engineered to deepen focus without pulling attention." },
  { ic: "chart", t: "Flow State Tracking", b: "AIRA learns when you focus best and nudges your hardest sessions into your sharpest hours." },
];
const COMPARE = [
  { f: "Six science-backed techniques", aira: true, other: "1-2 only" }, { f: "Socratic AI mentor", aira: true, other: false },
  { f: "Progress dashboard + analytics", aira: true, other: "Basic" }, { f: "Auto spaced repetition", aira: true, other: false },
  { f: "Device-free study guidance", aira: true, other: false }, { f: "Royalty-free focus audio", aira: true, other: "Paid add-on" },
  { f: "Auto flashcard generation", aira: true, other: false }, { f: "Price", aira: "$9.99/mo", other: "$12-20/mo" },
];
const SUBJECTS = ["AI & Prompt Engineering", "Coding & Programming", "Mathematics", "English & Language", "Data Science", "Business & Strategy", "Psychology", "Finance & Economics", "Law Basics", "Marketing & Growth", "Biology & Health", "Chemistry", "Physics", "History & Society", "Philosophy & Logic"];
const GUIDE = [
  { n: "01", t: "Set one clear intention", b: "Before you start, write the single thing you want to understand. Vague goals produce vague focus. AIRA helps you turn any topic into one sharp, specific intention." },
  { n: "02", t: "Remove every distraction first", b: "Don't rely on willpower mid-session. Phone in another room, notifications off, one tab. It takes 23 minutes to refocus after an interruption — so the goal is zero." },
  { n: "03", t: "Work in your brain's rhythm", b: "Your attention runs on ~90-minute ultradian cycles. Pick a technique and let the rhythm carry you instead of forcing it." },
  { n: "04", t: "Learn actively, never passively", b: "Re-reading feels productive but retains almost nothing. Read, close it, explain it out loud. Active recall is the most powerful technique in the research." },
  { n: "05", t: "Let the AI question you", b: "Don't ask AIRA for answers — let it ask you. Being guided to discover an answer builds twice the neural connection of being told it." },
  { n: "06", t: "Review at the right moment", b: "You forget 70% within 24 hours unless you review. AIRA's spaced-repetition engine schedules each review right before you'd forget." },
  { n: "07", t: "Reflect every week", b: "Each Sunday: what did I learn, what's unclear, what's next? This single habit lifts retention 20-30%. AIRA generates your weekly reflection automatically." },
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
  ["What does the dashboard show?", "Your daily focus time, current streak, sessions per week, concepts mastered, retention rate, mastery per subject, and your peak focus hours."],
  ["Do I need my phone for every lesson?", "No. Many AIRA sessions are device-free — it sets the structure, then tells you to put your phone away. Other subjects need a screen. AIRA tells you which is which."],
  ["Is it really free to start?", "Yes. You get 3 AI mentor messages every day, free forever, no credit card. Become a Mastermind ($9.99/mo) for unlimited mentoring, plans, photo reading, and focus audio — cancel anytime."],
  ["What if I want to cancel?", "Cancel any time in account settings. No penalties, no questions."],
];
function StatsBand({ seen }: { seen: { [k: string]: boolean } }) {
  const run = !!seen["stats"];
  const a = useCountUp(94, run), b = useCountUp(2, run), c = useCountUp(40, run), d = useCountUp(6, run);
  const stats = [{ v: a, suf: "%", label: "retention with active recall vs 10% from re-reading", col: C.cyan }, { v: b, suf: "x", label: "stronger neural pathways via the Socratic method", col: C.violet }, { v: c, suf: "%", label: "more deep-focus time in structured sessions", col: C.blue }, { v: d, suf: "", label: "science-backed focus techniques to choose from", col: C.pink }];
  return <div data-k="stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24 }}>{stats.map((s, i) => <div key={i} style={{ textAlign: "center", opacity: seen["stats"] ? 1 : 0, transform: seen["stats"] ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s ${C.ease} ${i * 100}ms` }}><div style={{ fontFamily: "var(--font-display)", fontSize: 68, fontWeight: 800, color: s.col, lineHeight: 0.95, marginBottom: 14, textShadow: `0 0 40px ${s.col}55`, letterSpacing: "-0.03em" }}>{Math.round(s.v)}{s.suf}</div><p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, maxWidth: 200, margin: "0 auto" }}>{s.label}</p></div>)}</div>;
}
function FlowStateGraph({ seen }: { seen: { [k: string]: boolean } }) {
  const on = !!seen["fsg"];
  const aira = "0,268 93,193 149,100 224,60 336,45 448,40 560,38";
  const other = "0,273 112,250 224,210 336,168 429,125 485,105 560,95";
  const ticks = ["0", "5", "10", "15", "20", "25", "30m"];
  return (
    <div data-k="fsg" style={{ opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(30px)", transition: `all 0.8s ${C.ease}`, background: C.elev, border: `1px solid ${C.border}`, borderRadius: 24, padding: "32px 28px", maxWidth: 920, margin: "0 auto", willChange: "transform,opacity" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}><span style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="bolt" size={18} color="#fff" /></span><div><div style={{ fontSize: 15, fontWeight: 700, color: C.fg }}>With AIRA</div><div style={{ fontSize: 12.5, color: C.muted }}>In deep flow by ~7 minutes</div></div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}><span style={{ width: 36, height: 36, borderRadius: 11, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={16} color={C.faint} /></span><div><div style={{ fontSize: 15, fontWeight: 700, color: C.muted }}>On your own</div><div style={{ fontSize: 12.5, color: C.faint }}>Takes ~23 minutes — if at all</div></div></div>
      </div>
      <svg viewBox="0 0 600 300" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="fsLine" x1="0" y1="0" x2="600" y2="0"><stop offset="0%" stopColor={C.cyan} /><stop offset="100%" stopColor={C.violet} /></linearGradient>
          <linearGradient id="fsFill" x1="0" y1="0" x2="0" y2="300"><stop offset="0%" stopColor={C.indigo} stopOpacity="0.28" /><stop offset="100%" stopColor={C.indigo} stopOpacity="0" /></linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => <line key={i} x1="0" y1={40 + i * 70} x2="600" y2={40 + i * 70} stroke={C.border} strokeWidth="1" />)}
        <line x1="0" y1="105" x2="600" y2="105" stroke={C.cyan} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="2 6" />
        <text x="8" y="98" fill={C.cyan} fontSize="11" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="0.1em">FLOW STATE</text>
        <polygon points={`${aira} 560,280 0,280`} fill="url(#fsFill)" opacity={on ? 1 : 0} style={{ transition: "opacity 1s ease 0.5s" }} />
        <polyline points={other} fill="none" stroke={C.faint} strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" strokeLinejoin="round" opacity={on ? 1 : 0} style={{ transition: "opacity 1s ease 0.6s" }} />
        <polyline points={aira} fill="none" stroke="url(#fsLine)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray={100} strokeDashoffset={on ? 0 : 100} style={{ transition: "stroke-dashoffset 1.6s ease 0.2s", filter: `drop-shadow(0 0 6px ${C.indigo}88)` }} />
        <circle cx="146" cy="105" r="6" fill={C.cyan} opacity={on ? 1 : 0} style={{ transition: "opacity 0.4s ease 1.5s" }} />
        <circle cx="485" cy="105" r="5" fill={C.faint} opacity={on ? 1 : 0} style={{ transition: "opacity 0.4s ease 1.3s" }} />
        <text x="150" y="86" fill={C.cyan} fontSize="14" fontWeight="700" fontFamily="var(--font-display)" opacity={on ? 1 : 0} style={{ transition: "opacity 0.5s ease 1.6s" }}>7 min</text>
        <text x="489" y="128" fill={C.faint} fontSize="13" fontWeight="700" fontFamily="var(--font-display)" opacity={on ? 1 : 0} style={{ transition: "opacity 0.5s ease 1.4s" }}>23 min</text>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.faint, marginTop: 8, padding: "0 2px" }}>{ticks.map((d) => <span key={d}>{d}</span>)}</div>
      <p style={{ textAlign: "center", fontSize: 14.5, color: C.muted, marginTop: 20, lineHeight: 1.7, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>AIRA structures your session so you hit deep focus <strong style={{ color: C.fg }}>3× faster</strong> — flow in minutes, not half an hour of warming up.</p>
    </div>
  );
}
function StudyGuide({ seen, open, setOpen }: { seen: { [k: string]: boolean }; open: number | null; setOpen: (n: number | null) => void }) {
  return <div>{GUIDE.map((g, i) => <div key={g.n} data-k={`g-${i}`} style={{ opacity: seen[`g-${i}`] ? 1 : 0, transform: seen[`g-${i}`] ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ${C.ease} ${i * 60}ms`, background: open === i ? `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo}55,rgba(255,255,255,0.05)) border-box` : "transparent", border: open === i ? "1px solid transparent" : `1px solid ${C.border}`, borderRadius: 18, marginBottom: 12, overflow: "hidden" }}><button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 24px", display: "flex", alignItems: "center", gap: 18, cursor: "pointer", textAlign: "left", color: C.fg }}><span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: open === i ? C.cyan : C.faint, minWidth: 36 }}>{g.n}</span><span style={{ fontSize: 17, fontWeight: 600, flex: 1 }}>{g.t}</span><span style={{ color: C.violet, transform: open === i ? "rotate(45deg)" : "none", transition: `transform 0.3s ${C.ease}`, display: "flex" }}><Icon name="plus" size={20} color={C.violet} /></span></button><div style={{ maxHeight: open === i ? 240 : 0, overflow: "hidden", transition: `max-height 0.45s ${C.ease}` }}><p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.75, padding: "0 24px 24px 70px" }}>{g.b}</p></div></div>)}</div>;
}
function WelcomeModal({ onClose, onEnter }: { onClose: () => void; onEnter: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [{ ic: "spark", title: "Welcome, Mastermind", body: "You unlocked everything — unlimited AI mentoring, all 15 subjects, all 6 focus techniques, and royalty-free audio.", cta: "Show me around" }, { ic: "target", title: "Your study space", body: "Pick a technique and AIRA starts your timer, blocks distractions, and structures the whole session.", cta: "Next" }, { ic: "chart", title: "Track everything", body: "Your dashboard shows focus time, streaks, mastery per subject, and your peak hours.", cta: "Next" }, { ic: "bolt", title: "Flow state, on demand", body: "Notifications off. Phone away. Distraction-free. Built on neuroscience to get you deep and keep you there.", cta: "Enter AIRA" }];
  const s = steps[step]; const last = step === steps.length - 1;
  return <div style={{ position: "fixed", inset: 0, zIndex: 1600, background: "rgba(0,0,4,0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 0.4s ease" }}><div style={{ position: "relative", background: `linear-gradient(${C.elev},${C.elev}) padding-box, linear-gradient(135deg,${C.indigo},${C.cyan}) border-box`, border: "1px solid transparent", borderRadius: 28, padding: 48, maxWidth: 460, width: "100%", textAlign: "center", boxShadow: `0 0 100px ${C.indigo}44`, animation: `popIn 0.5s ${C.spring}` }}><div style={{ display: "flex", justifyContent: "center", marginBottom: 24, color: C.cyan }}><Icon name={s.ic} size={48} color={C.cyan} /></div><h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>{s.title}</h2><p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 32 }}>{s.body}</p><div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>{steps.map((_, i) => <div key={i} style={{ width: i === step ? 28 : 8, height: 8, borderRadius: 999, background: i === step ? `linear-gradient(90deg,${C.cyan},${C.indigo})` : C.border, transition: `all 0.4s ${C.ease}` }} />)}</div><GBtn full onClick={() => (last ? onEnter() : setStep(step + 1))}>{s.cta}</GBtn>{!last && <button onClick={onClose} style={{ marginTop: 16, background: "none", border: "none", color: C.faint, fontSize: 13, cursor: "pointer" }}>Skip intro</button>}</div></div>;
}

/* ════════════ FLOATING STORY VISUAL (scroll-linked glass panel) ════════════ */
function PanelSlide({ progress, i, n, children }: { progress: MotionValue<number>; i: number; n: number; children: React.ReactNode }) {
  const seg = 1 / n, band = 0.05;
  const lo = i * seg, hi = (i + 1) * seg;
  const opacity = useTransform(progress, [lo - band, lo + band, hi - band, hi + band], [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]);
  const scale = useTransform(progress, [lo, lo + band], [i === 0 ? 1 : 0.92, 1]);
  return <motion.div style={{ opacity, scale, position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform, opacity" }}>{children}</motion.div>;
}
function StoryVisual({ progress }: { progress: MotionValue<number> }) {
  const R = 68, CIRC = 2 * Math.PI * R;
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 460, margin: "0 auto" }}>
      <div style={{ position: "relative", transform: "perspective(1500px) rotateX(6deg) rotateY(-6deg)" }}>
        <div style={{ position: "absolute", inset: "-55px -30px 25px", background: `radial-gradient(60% 60% at 50% 28%, ${C.indigo}48, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${C.border}`, background: "linear-gradient(160deg, rgba(20,20,42,0.97), rgba(8,8,18,0.98))", boxShadow: "0 50px 130px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 18px", borderBottom: `1px solid ${C.border}` }}>
            {[C.pink, C.amber, C.green].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: 9, background: c, opacity: 0.65 }} />)}
            <span style={{ marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: C.faint }}><BrainLogo size={15} /> AIRA Mentor</span>
          </div>
          <div style={{ position: "relative", height: 322 }}>
            {/* notes */}
            <PanelSlide progress={progress} i={1} n={4}>
              <div style={{ padding: "24px 26px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.cyan, marginBottom: 20 }}>Lecture notes · pasted</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {[94, 82, 66, 90, 74].map((w, i) => <div key={i} style={{ height: 9, width: `${w}%`, borderRadius: 5, background: i === 0 ? `linear-gradient(90deg,${C.cyan},${C.indigo})` : "rgba(255,255,255,0.10)" }} />)}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ height: 9, width: "40%", borderRadius: 5, background: "rgba(255,255,255,0.10)" }} /><span style={{ width: 2, height: 16, background: C.cyan, animation: "blink 1s step-end infinite" }} /></div>
                </div>
              </div>
            </PanelSlide>
            {/* summary + test */}
            <PanelSlide progress={progress} i={2} n={4}>
              <div style={{ padding: "24px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}><span style={{ width: 28, height: 28, borderRadius: 9, background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="spark" size={15} color="#fff" /></span><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Summary</span></div>
                {[88, 76, 66].map((w, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}><span style={{ width: 6, height: 6, borderRadius: 9, background: C.cyan, flexShrink: 0 }} /><div style={{ height: 8, width: `${w}%`, borderRadius: 4, background: "rgba(255,255,255,0.12)" }} /></div>)}
                <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: `${C.green}15`, border: `1px solid ${C.green}40`, fontSize: 12.5, color: C.green, fontWeight: 600 }}><Icon name="check" size={13} color={C.green} /> Practice quiz ready · 6 questions</div>
              </div>
            </PanelSlide>
            {/* focus */}
            <PanelSlide progress={progress} i={0} n={4}>
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
                <div style={{ position: "relative", width: 150, height: 150 }}>
                  <div style={{ position: "absolute", inset: -12, borderRadius: "50%", background: `radial-gradient(circle,${C.cyan}26,transparent 70%)`, animation: "breathe 3s ease-in-out infinite" }} />
                  <svg viewBox="0 0 160 160" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                    <defs><linearGradient id="sv-ring" x1="0" y1="0" x2="160" y2="160"><stop offset="0%" stopColor={C.cyan} /><stop offset="100%" stopColor={C.violet} /></linearGradient></defs>
                    <circle cx="80" cy="80" r={R} fill="none" stroke={C.border} strokeWidth="8" />
                    <circle cx="80" cy="80" r={R} fill="none" stroke="url(#sv-ring)" strokeWidth="8" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * 0.34} style={{ filter: `drop-shadow(0 0 8px ${C.cyan}99)` }} />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>25:00</div>
                </div>
                <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: C.cyan, fontWeight: 600 }}>Deep Work · Focus</div>
              </div>
            </PanelSlide>
            {/* 3 — retention chart */}
            <PanelSlide progress={progress} i={3} n={4}>
              <div style={{ padding: "24px 26px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Retention</span><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: C.cyan }}>94%</span></div>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 12, paddingTop: 16 }}>{[32, 48, 60, 78, 100].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "6px 6px 0 0", background: i === 4 ? `linear-gradient(${C.cyan},${C.violet})` : "rgba(255,255,255,0.10)" }} />)}</div>
                <div style={{ fontSize: 12, color: C.faint, marginTop: 14 }}>vs ~10% from passive re-reading</div>
              </div>
            </PanelSlide>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextSlide({ progress, i, n, t, b }: { progress: MotionValue<number>; i: number; n: number; t: React.ReactNode; b: string }) {
  const seg = 1 / n, band = 0.05;
  const lo = i * seg, hi = (i + 1) * seg;
  const opacity = useTransform(progress, [lo - band, lo + band, hi - band, hi + band], [i === 0 ? 1 : 0, 1, 1, i === n - 1 ? 1 : 0]);
  const y = useTransform(progress, [lo, lo + band], [i === 0 ? 0 : 46, 0]);
  return (
    <motion.div style={{ opacity, y, position: "absolute", top: 0, left: 0, right: 0, willChange: "transform, opacity" }}>
      <h1 className="hero-h1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em", fontSize: "clamp(38px,5vw,66px)", lineHeight: 1.04, marginBottom: 22 }}>{t}</h1>
      <p style={{ fontSize: "clamp(16px,2vw,19px)", color: C.muted, lineHeight: 1.7, maxWidth: 460 }}>{b}</p>
    </motion.div>
  );
}

function StoryScroll({ onOpen }: { onOpen: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);
  const STEPS = [
    { t: <>Enter flow state, <Grad>fast.</Grad></>, b: "Deep focus in minutes — not 30 minutes of warming up." },
    { t: <>Drop in your <Grad>notes.</Grad></>, b: "Paste your lecture notes. AIRA reads all of it in seconds." },
    { t: <>Get <Grad>summaries</Grad> &amp; tests.</>, b: "Clean summaries and quizzes, from your own material." },
    { t: <>Remember it <Grad>for good.</Grad></>, b: "Spaced reviews lock it in — up to 94% retention." },
  ];
  const n = STEPS.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(n - 1, Math.max(0, Math.floor(v * n + 0.0001)));
    setStep((prev) => (prev === s ? prev : s));
  });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [0.7, 0]);
  return (
    <section ref={ref} style={{ position: "relative", zIndex: 2, height: `${n * 78}vh` }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="story-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, maxWidth: 1180, width: "100%", margin: "0 auto", padding: "90px 56px 0", alignItems: "center" }}>
          <div>
            <Pill>AI Study Mentor</Pill>
            <div style={{ position: "relative", height: 248, marginTop: 26, overflow: "hidden" }}>
              {STEPS.map((s, i) => <TextSlide key={i} progress={scrollYProgress} i={i} n={n} t={s.t} b={s.b} />)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "6px 0 34px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: C.cyan }}>0{step + 1}<span style={{ color: C.faint }}> / 0{n}</span></span>
              <div style={{ display: "flex", gap: 8 }}>{STEPS.map((_, i) => <div key={i} style={{ height: 4, width: i === step ? 40 : 22, borderRadius: 999, background: i <= step ? `linear-gradient(90deg,${C.cyan},${C.violet})` : C.border, transition: "all 0.4s ease" }} />)}</div>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <GBtn big onClick={() => onOpen("mentor")}>Get Started Free <Icon name="arrow" size={18} color="#fff" /></GBtn>
              <GhostBtn onClick={() => onOpen("dashboard")}>Open Dashboard</GhostBtn>
            </div>
            <p style={{ fontSize: 13, color: C.faint, marginTop: 16 }}>7-day free trial · No credit card · Cancel anytime</p>
          </div>
          <div className="story-art"><StoryVisual progress={scrollYProgress} /></div>
        </div>
        <motion.div style={{ opacity: hintOpacity, position: "absolute", bottom: 30, left: "50%", x: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, pointerEvents: "none" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.faint }}>Scroll</span>
          <div style={{ width: 22, height: 36, border: `2px solid ${C.border}`, borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 7 }}><div style={{ width: 4, height: 8, borderRadius: 999, background: C.cyan, animation: "scrollDot 1.8s ease-in-out infinite" }} /></div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════ HERO SECTION ════════════ */
function HeroSection({ onOpen }: { onOpen: (t: string) => void }) {
  return (
    <section style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", overflow: "hidden" }} className="hero-sec">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)", width: "90vw", height: "55vh", background: `radial-gradient(ellipse at center, ${C.indigo}1e 0%, transparent 65%)`, filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", background: `radial-gradient(ellipse at center, ${C.cyan}0e, transparent 60%)`, filter: "blur(70px)" }} />
      </div>
      <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 64, maxWidth: 1200, margin: "0 auto", width: "100%", alignItems: "center" }}>
        {/* Left */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.glass, backdropFilter: "blur(12px)", fontSize: 12.5, color: C.muted, marginBottom: 36, fontWeight: 500 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 7px ${C.green}` }} />
            AI Study Mentor
          </div>
          <h1 className="hero-h1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.93, marginBottom: 30, fontSize: "clamp(52px,8.5vw,96px)" }}>
            Stop reading.<br />
            <span style={{ background: `linear-gradient(130deg,${C.cyan} 10%,${C.indigo} 55%,${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Start&nbsp;learning.</span>
          </h1>
          <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: C.muted, lineHeight: 1.7, maxWidth: 450, marginBottom: 44 }}>AIRA is an AI mentor that knows your goals, builds your plan, and gets you into deep focus — all in one conversation.</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginBottom: 28 }}>
            <GBtn big onClick={() => onOpen("mentor")}>Talk to AIRA <Icon name="arrow" size={18} color="#fff" /></GBtn>
            <GhostBtn onClick={() => onOpen("dashboard")}>Open dashboard</GhostBtn>
          </div>
          <p style={{ fontSize: 13, color: C.faint }}>3 free messages/day · No card required · Upgrade for unlimited</p>
        </div>
        {/* Right — product preview */}
        <div className="hero-art" style={{ perspective: 1400 }}>
          <div style={{ transform: "rotateX(3deg) rotateY(-6deg)", animation: "floaty 8s ease-in-out infinite", willChange: "transform" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: "-50px -20px 20px", background: `radial-gradient(60% 60% at 50% 20%, ${C.indigo}38, transparent 70%)`, filter: "blur(50px)", pointerEvents: "none" }} />
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, background: `linear-gradient(160deg,rgba(16,16,34,0.98),rgba(6,6,15,0.99))`, boxShadow: "0 60px 160px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.015)" }}>
                  {[C.pink, C.amber, C.green].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
                  <span style={{ marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.faint }}><BrainLogo size={14} /> AIRA · AI Mentor</span>
                </div>
                <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 11 }}>
                  <div style={{ display: "flex", gap: 9 }}>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bot" size={14} color="#fff" /></span>
                    <div style={{ maxWidth: 290, padding: "10px 13px", borderRadius: 13, background: C.surface, border: `1px solid ${C.border}`, fontSize: 13, color: C.fg, lineHeight: 1.6 }}>
                      Your <strong style={{ color: C.cyan }}>60-day React plan</strong> is ready. Week 1 fits your evening schedule — 45 min/day.
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 9, justifyContent: "flex-end" }}>
                    <div style={{ maxWidth: 200, padding: "10px 13px", borderRadius: 13, background: `linear-gradient(135deg,${C.blue},${C.violet})`, color: "#fff", fontSize: 13, lineHeight: 1.6 }}>Show me week 1</div>
                  </div>
                  <div style={{ display: "flex", gap: 9 }}>
                    <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bot" size={14} color="#fff" /></span>
                    <div style={{ maxWidth: 310, padding: "10px 13px", borderRadius: 13, background: C.surface, border: `1px solid ${C.border}`, fontSize: 13, color: C.fg, lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 700, marginBottom: 7, fontSize: 13.5 }}>Week 1 — Foundations</div>
                      {[{ d: "Day 1–2", t: "React core & JSX · 2h", c: C.cyan }, { d: "Day 3–4", t: "State & hooks · 2h", c: C.violet }, { d: "Day 5", t: "Build a mini-project · 45m", c: C.green }].map((r) => (
                        <div key={r.d} style={{ display: "flex", gap: 8, padding: "5px 0", borderTop: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 10.5, fontWeight: 700, color: r.c, width: 50, flexShrink: 0, paddingTop: 1 }}>{r.d}</span>
                          <span style={{ fontSize: 12, color: C.muted }}>{r.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, padding: "7px 10px", borderRadius: 12, background: C.elev, border: `1px solid ${C.border}` }}>
                    <span style={{ flex: 1, fontSize: 13, color: C.faint, lineHeight: "32px" }}>Ask AIRA anything…</span>
                    <span style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${C.blue},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="send" size={14} color="#fff" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════ MAIN */
export default function Home() {
  const seen = useReveal();
  const { p, y } = useScrollProgress();
  const [showWelcome, setShowWelcome] = useState(false);
  const [workspace, setWorkspace] = useState<string | null>(null);
  const [auth, setAuth] = useState<null | "in" | "up">(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openGuide, setOpenGuide] = useState<number | null>(0);
  const [lifetime, setLifetime] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => { const params = new URLSearchParams(window.location.search); if (params.get("success") === "true" || params.get("checkout") === "success") setShowWelcome(true); try { if (window.localStorage.getItem("aira_lifetime") === "true") setLifetime(true); const n = window.localStorage.getItem("aira_name"); if (n) setUserName(n); } catch {} }, []);
  const saveName = useCallback((n: string, remember: boolean) => { const name = n.trim(); if (!name) return; setUserName(name); if (remember) { try { window.localStorage.setItem("aira_name", name); } catch {} } }, []);
  const logout = useCallback(() => { setUserName(""); setWorkspace(null); try { window.localStorage.removeItem("aira_name"); } catch {} }, []);
  const signedIn = !!userName;
  // Landing entry points: require a quick sign-up first if they're not in yet, then the app runs onboarding.
  const enterApp = useCallback((tab: string) => { try { if (window.localStorage.getItem("aira_name") || window.localStorage.getItem("aira_profile")) { setWorkspace(tab); return; } } catch {} setAuth("up"); }, []);
  const buy = useCallback(() => { window.location.href = CHECKOUT_URL; }, []);
  const reveal = (k: string, d = 0) => ({ "data-k": k, style: { opacity: seen[k] ? 1 : 0, transform: seen[k] ? "translateY(0) scale(1)" : "translateY(34px) scale(0.97)", filter: seen[k] ? "blur(0)" : "blur(5px)", transition: `opacity 0.65s ${C.ease} ${d}ms, transform 0.7s ${C.ease} ${d}ms, filter 0.65s ${C.ease} ${d}ms`, willChange: "transform,opacity,filter" } as React.CSSProperties });
  const HD = (e: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em", ...e });
  const sec = (extra: React.CSSProperties = {}): React.CSSProperties => ({ position: "relative", zIndex: 2, padding: "92px 48px", ...extra });

  return (
    <main style={{ background: C.void, minHeight: "100vh", color: C.fg, position: "relative", overflowX: "clip" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="theme-color" content="#03030A" />
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--font-display:'Bricolage Grotesque',sans-serif}
        html{scroll-behavior:smooth}
        body{font-family:'Inter',sans-serif;background:${C.void};-webkit-font-smoothing:antialiased}
        ::selection{background:rgba(123,92,255,0.35)}
        ::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:${C.deep}}::-webkit-scrollbar-thumb{background:rgba(123,92,255,0.3);border-radius:999px}::-webkit-scrollbar-thumb:hover{background:rgba(123,92,255,0.5)}
        input::placeholder{color:${C.faint}}
        input:focus{border-color:rgba(123,92,255,0.5)!important}
        button:focus-visible,a:focus-visible{outline:2px solid ${C.cyan};outline-offset:3px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes appIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}
        @keyframes tabIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulseCore{0%,100%{transform:scale(1);opacity:0.9}50%{transform:scale(1.08);opacity:1}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.85}50%{transform:scale(1.1);opacity:1}}
        @keyframes drift{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-40px,30px) scale(0.95)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 40px rgba(123,92,255,0.2)}50%{box-shadow:0 0 70px rgba(123,92,255,0.4)}}
        @keyframes eq{from{transform:scaleY(0.35)}to{transform:scaleY(1)}}
        @keyframes growBar{from{transform:scaleY(0)}to{transform:scaleY(1)}}
        @keyframes growW{from{width:0}}
        @keyframes scrollDot{0%{transform:translateY(0);opacity:1}80%{opacity:0}100%{transform:translateY(36px);opacity:0}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes auroraSpin{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(360deg)}}
        @keyframes shine{0%{transform:translateX(-130%)}60%,100%{transform:translateX(130%)}}
        @keyframes blurIn{0%{opacity:0;transform:translateY(42px);filter:blur(16px)}55%{opacity:1}100%{opacity:1;transform:translateY(0);filter:blur(0)}}
        @keyframes blink{50%{opacity:0}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
        @media(max-width:900px){.app-side{position:fixed;left:0;top:0;bottom:0;z-index:20;transform:translateX(-100%);transition:transform 0.3s ${C.ease};box-shadow:0 0 60px rgba(0,0,0,0.6)}.app-side.open{transform:translateX(0)}.app-burger{display:flex!important}.dash-grid,.study-grid{grid-template-columns:1fr!important}}
        @media(max-width:768px){.nav-links,.nav-auth-extra{display:none!important}.nav-wrap{padding:0 18px!important}.sec{padding:72px 18px!important}.hero-h1{font-size:44px!important;line-height:0.95!important}.hero-sec{padding:100px 22px 64px!important}.hero-grid{grid-template-columns:1fr!important;gap:40px!important}.hero-art{display:none!important}.bento{grid-template-columns:1fr!important}.bento>*{grid-column:span 1!important}.bento-hero{grid-template-columns:1fr!important}.bento-hero>*:last-child{display:none!important}.hp-caps{grid-template-columns:repeat(2,1fr)!important}.story-grid{grid-template-columns:1fr!important;gap:18px!important;padding:96px 20px 48px!important}.story-art{display:none!important}.auth-card{padding:26px 22px!important;border-radius:22px!important}}
      ` }} />

      <LivingBackground p={p} />
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} onEnter={() => { setShowWelcome(false); setWorkspace("dashboard"); }} />}
      {workspace && <AppWorkspace initial={workspace} onClose={() => setWorkspace(null)} onAuth={buy} lifetime={lifetime} userName={userName} onSaveName={saveName} onLogout={logout} />}
      {auth && <AuthModal mode={auth} onClose={() => setAuth(null)} onSwitch={(m) => setAuth(m)} onSuccess={(email) => { const wasSignup = auth === "up"; if (email && !wasSignup) { const nm = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "there"; saveName(nm.charAt(0).toUpperCase() + nm.slice(1), true); } setAuth(null); setWorkspace("dashboard"); }} />}

      {/* NAV */}
      <nav className="nav-wrap" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: "blur(24px)", background: y > 40 ? "rgba(0,0,4,0.82)" : "rgba(0,0,4,0.3)", borderBottom: `1px solid ${y > 40 ? C.border : "transparent"}`, height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "all 0.4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}><BrainLogo size={30} /><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradShift 6s ease infinite" }}>AIRA</span></div>
        <div className="nav-links" style={{ display: "flex", gap: 26, fontSize: 14, color: C.muted }}>{[["Features", "features"], ["Science", "science"], ["Guide", "guide"], ["Mastermind", "premium"], ["Pricing", "pricing"]].map(([l, h]) => <a key={l} href={`#${h}`} style={{ color: C.muted, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)} onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}>{l}</a>)}</div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {signedIn ? (
            <>
              <button className="nav-auth-extra" onClick={logout} style={{ background: "none", border: "none", color: C.muted, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Sign out</button>
              <button onClick={() => setWorkspace("dashboard")} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 8px 7px 16px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.glass, color: C.fg, fontSize: 14, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(10px)" }}>Open app <span style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.indigo},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>{userName.trim()[0]}</span></button>
            </>
          ) : (
            <>
              <button className="nav-auth-extra" onClick={() => setAuth("in")} style={{ background: "none", border: "none", color: C.muted, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Sign in</button>
              <GBtn onClick={() => setAuth("up")}>Get started free <Icon name="arrow" size={16} color="#fff" /></GBtn>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <HeroSection onOpen={enterApp} />

      {/* MARQUEE */}
      <div style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "18px 0", overflow: "hidden", background: "rgba(0,0,4,0.4)" }}><div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", animation: "marquee 26s linear infinite", width: "max-content" }}>{[...Array(2)].map((_, r) => <div key={r} style={{ display: "flex", gap: 48 }}>{["Neural Phase Locking", "Spaced Repetition", "Active Recall", "Socratic Method", "Timeboxing", "Ultradian Rhythm", "15 Subjects", "Focus Audio"].map((t) => <span key={t + r} style={{ fontSize: 14, color: C.muted, letterSpacing: "0.04em" }}>{t}</span>)}</div>)}</div></div>

      {/* FLOW-STATE GRAPHIC */}
      <section className="sec" style={sec({ maxWidth: 1000, margin: "0 auto", padding: "110px 48px" })}>
        <div {...reveal("vs-h")} style={{ ...reveal("vs-h").style, textAlign: "center", marginBottom: 52 }}><Label>The difference</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Get into flow <Grad>3× faster.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 560, margin: "18px auto 0", lineHeight: 1.7 }}>AIRA structures the session so you reach deep focus in minutes. On your own, most of a study session is just warming up.</p></div>
        <FlowStateGraph seen={seen} />
      </section>

      {/* BENTO */}
      <section id="features" className="sec" style={sec({ maxWidth: 1140, margin: "0 auto" })}>
        <div {...reveal("bn-h")} style={{ ...reveal("bn-h").style, textAlign: "center", marginBottom: 70 }}><Label>Everything you need</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>One system. Total focus.</h2></div>
        {/* Featured hero card */}
        <div data-k="bn-hero" style={{ marginBottom: 20, opacity: seen["bn-hero"] ? 1 : 0, transform: seen["bn-hero"] ? "translateY(0)" : "translateY(44px)", transition: `all 1s ${C.ease}`, borderRadius: 22, overflow: "hidden", border: `1px solid ${C.border}`, background: `linear-gradient(135deg,${C.elev},${C.base})`, display: "grid", gridTemplateColumns: "1fr 1.1fr", minHeight: 260 }} className="bento-hero">
          <div style={{ padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.cyan, marginBottom: 18 }}><Icon name="bot" size={14} color={C.cyan} /> AI Mentor</div>
            <h3 style={HD({ fontSize: "clamp(22px,3vw,30px)", marginBottom: 14, lineHeight: 1.15 })}>The AI that learns <span style={{ color: C.cyan }}>you.</span></h3>
            <p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.75, marginBottom: 22, maxWidth: 320 }}>AIRA remembers your goal, your level, and your schedule. Every session builds on the last — no re-explaining yourself.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {["Personalized roadmap from day 1", "Socratic guidance — not just answers", "Persistent memory across sessions"].map((f) => (
                <div key={f} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13.5, color: C.fg }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, background: `${C.cyan}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={11} color={C.cyan} stroke={2.5} /></span>{f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: `linear-gradient(135deg,${C.deep},${C.base})`, borderLeft: `1px solid ${C.border}`, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            {[
              { role: "ai", text: "Based on your goal, I mapped a 60-day React plan. Week 1 starts with JSX fundamentals — fits your evenings." },
              { role: "user", text: "Show me day 1" },
              { role: "ai", text: "Day 1: 45 min. Read the React docs intro (link attached), then build Hello World from scratch. No tutorials — just you and the code." },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 8, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                {m.role === "ai" && <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg,${C.cyan},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="bot" size={12} color="#fff" /></span>}
                <div style={{ maxWidth: "80%", padding: "9px 12px", borderRadius: 12, fontSize: 13, lineHeight: 1.6, background: m.role === "ai" ? C.elev : `linear-gradient(135deg,${C.blue},${C.violet})`, border: m.role === "ai" ? `1px solid ${C.border}` : "none", color: m.role === "ai" ? C.fg : "#fff" }}>{m.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bento" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>{BENTO.map((b, i) => <Tilt key={b.t} k={`bn-${i}`} seen={seen} delay={i * 100} span={b.span} style={{ padding: 36 }}><IconBadge name={b.ic} color={b.c} /><h3 style={HD({ fontSize: 22, marginBottom: 10, color: b.c })}>{b.t}</h3><p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.7 }}>{b.b}</p></Tilt>)}</div>
      </section>

      {/* FLOW */}
      <section className="sec" style={sec({ maxWidth: 1140, margin: "0 auto" })}>
        <div {...reveal("fl-h")} style={{ ...reveal("fl-h").style, textAlign: "center", marginBottom: 70 }}><Label>How it works</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>From distracted to <Grad>deep focus.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 22 }}>{FLOW_STEPS.map((s, i) => <Tilt key={s.n} k={`fl-${i}`} seen={seen} delay={i * 110}><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}><div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(135deg,${s.c},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#fff" }}>{s.n}</div><Icon name={s.ic} size={26} color={s.c} /></div><h3 style={HD({ fontSize: 19, marginBottom: 10 })}>{s.t}</h3><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{s.b}</p></Tilt>)}</div>
      </section>

      {/* SCIENCE */}
      <section id="science" className="sec" style={sec()}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("sci-h")} style={{ ...reveal("sci-h").style, textAlign: "center", marginBottom: 70 }}><Label>Backed by neuroscience</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>Why AIRA works</h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16 }}>Every feature is built on published, peer-reviewed research — not guesswork.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>{SCIENCE.map((c, i) => <Tilt key={c.t} k={`sci-${i}`} seen={seen} delay={i * 90}><IconBadge name={c.ic} color={c.c} /><h3 style={HD({ fontSize: 20, marginBottom: 12 })}>{c.t}</h3><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 18 }}>{c.b}</p><span style={{ fontSize: 11, color: C.cyan, background: "rgba(34,211,238,0.08)", padding: "5px 11px", borderRadius: 7, fontWeight: 600 }}>Basis: {c.s}</span></Tilt>)}</div>
        </div>
      </section>

      {/* STATS */}
      <section className="sec" style={sec({ maxWidth: 1100, margin: "0 auto", padding: "100px 48px" })}>
        <div {...reveal("stats-h")} style={{ ...reveal("stats-h").style, textAlign: "center", marginBottom: 60 }}><Label>The numbers</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Methods that <Grad>actually work.</Grad></h2></div>
        <StatsBand seen={seen} />
      </section>

      {/* COMPARISON */}
      <section className="sec" style={sec({ maxWidth: 820, margin: "0 auto" })}>
        <div {...reveal("cmp-h")} style={{ ...reveal("cmp-h").style, textAlign: "center", marginBottom: 52 }}><Label>How we compare</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>More than the <Grad>other apps.</Grad></h2></div>
        <div {...reveal("cmp-t")} style={{ ...reveal("cmp-t").style, background: C.elev, border: `1px solid ${C.border}`, borderRadius: 20, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${C.border}` }}>{["Feature", "AIRA", "Others"].map((t, i) => <div key={t} style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: i === 1 ? C.cyan : C.muted, textAlign: i === 0 ? "left" : "center" }}>{t}</div>)}</div>
          {COMPARE.map((row, i) => <div key={row.f} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: i < COMPARE.length - 1 ? `1px solid ${C.border}` : "none", background: i === COMPARE.length - 1 ? "rgba(123,92,255,0.04)" : "transparent" }}><div style={{ padding: "15px 20px", fontSize: 14, color: C.fg, fontWeight: i === COMPARE.length - 1 ? 600 : 400 }}>{row.f}</div><div style={{ padding: "15px 20px", textAlign: "center", color: C.green, fontWeight: 600, display: "flex", justifyContent: "center", alignItems: "center" }}>{row.aira === true ? <Icon name="check" size={18} color={C.green} stroke={2.5} /> : <span style={{ fontSize: 14 }}>{row.aira}</span>}</div><div style={{ padding: "15px 20px", fontSize: 14, textAlign: "center", color: row.other === false ? C.faint : C.muted }}>{row.other === false ? "—" : row.other}</div></div>)}
        </div>
      </section>

      {/* GUIDE */}
      <section id="guide" className="sec" style={sec({ maxWidth: 820, margin: "0 auto" })}>
        <div {...reveal("gd-h")} style={{ ...reveal("gd-h").style, textAlign: "center", marginBottom: 56 }}><Label>The AIRA method</Label><h2 style={HD({ fontSize: "clamp(32px,4.6vw,48px)" })}>How to study with AI, <Grad>the right way.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 16, maxWidth: 540, margin: "18px auto 0", lineHeight: 1.7 }}>Seven research-backed steps — the method AIRA runs you through every session.</p></div>
        <StudyGuide seen={seen} open={openGuide} setOpen={setOpenGuide} />
      </section>

      {/* FOCUS + SOUND */}
      <section className="sec" style={sec()}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div {...reveal("fm-h")} style={{ ...reveal("fm-h").style, textAlign: "center", marginBottom: 70 }}><Label>Distraction-free by design</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>Phone away. <Grad>Mind present.</Grad></h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, marginBottom: 48 }}>{FOCUS_MODES.map((m, i) => <Tilt key={m.t} k={`fm-${i}`} seen={seen} delay={i * 90}><IconBadge name={m.ic} color={C.cyan} /><h3 style={HD({ fontSize: 18, marginBottom: 10 })}>{m.t}</h3><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{m.b}</p></Tilt>)}</div>
          <SoundPlayer seen={seen} lifetime={lifetime} onUpgrade={buy} />
        </div>
      </section>

      {/* PREMIUM */}
      <section id="premium" className="sec" style={sec({ maxWidth: 1140, margin: "0 auto" })}>
        <div {...reveal("pr-h")} style={{ ...reveal("pr-h").style, textAlign: "center", marginBottom: 70 }}><Label>Everything in Mastermind</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,52px)" })}>Ten reasons to <Grad>master your mind.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>{PREMIUM.map((p2, i) => <Tilt key={p2.t} k={`pr-${i}`} seen={seen} delay={(i % 3) * 90}><IconBadge name={p2.ic} color={[C.cyan, C.violet, C.blue, C.pink, C.green, C.amber][i % 6]} /><h3 style={HD({ fontSize: 18, marginBottom: 10 })}>{p2.t}</h3><p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{p2.b}</p></Tilt>)}</div>
      </section>

      {/* SUBJECTS */}
      <section className="sec" style={sec({ maxWidth: 1000, margin: "0 auto" })}>
        <div {...reveal("subj-h")} style={{ ...reveal("subj-h").style, textAlign: "center", marginBottom: 52 }}><Label>15 subject categories</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Study anything. <Grad>Master it.</Grad></h2></div>
        <div {...reveal("subj-g")} style={{ ...reveal("subj-g").style, display: "flex", flexWrap: "wrap", gap: 11, justifyContent: "center" }}>{SUBJECTS.map((s) => <span key={s} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, padding: "11px 19px", fontSize: 13, color: C.muted, cursor: "default", backdropFilter: "blur(10px)", transition: `all 0.25s ${C.ease}` }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(123,92,255,0.5)"; e.currentTarget.style.color = C.fg; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; e.currentTarget.style.transform = "none"; }}>{s}</span>)}</div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sec" style={sec({ maxWidth: 1140, margin: "0 auto" })}>
        <div {...reveal("ts-h")} style={{ ...reveal("ts-h").style, textAlign: "center", marginBottom: 60 }}><Label>What learners say</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Built for how you <Grad>actually learn.</Grad></h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}>{TESTIMONIALS.map((t, i) => <Tilt key={i} k={`ts-${i}`} seen={seen} delay={i * 100}><div style={{ fontSize: 40, color: t.c, marginBottom: 8, fontFamily: "var(--font-display)", lineHeight: 0.5 }}>"</div><p style={{ fontSize: 15, color: C.fg, lineHeight: 1.7, marginBottom: 20 }}>{t.q}</p><div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${t.c},${C.violet})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{t.n[0]}</div><div><div style={{ fontSize: 13, fontWeight: 600 }}>{t.n}</div><div style={{ fontSize: 12, color: C.faint }}>{t.r}</div></div></div></Tilt>)}</div>
      </section>

      {/* FAQ */}
      <section className="sec" style={sec({ maxWidth: 820, margin: "0 auto" })}>
        <div {...reveal("f-h")} style={{ ...reveal("f-h").style, textAlign: "center", marginBottom: 52 }}><Label>Questions</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Common questions</h2></div>
        {FAQ.map((f, i) => <div key={f[0]} {...reveal(`fq-${i}`, i * 50)} style={{ ...reveal(`fq-${i}`, i * 50).style, borderBottom: `1px solid ${C.border}` }}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", color: C.fg }}><span style={{ fontSize: 16, fontWeight: 500 }}>{f[0]}</span><span style={{ color: C.violet, transform: openFaq === i ? "rotate(45deg)" : "none", transition: `transform 0.3s ${C.ease}`, flexShrink: 0, marginLeft: 16, display: "flex" }}><Icon name="plus" size={20} color={C.violet} /></span></button><div style={{ maxHeight: openFaq === i ? 240 : 0, overflow: "hidden", transition: `max-height 0.45s ${C.ease}` }}><p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, paddingBottom: 22 }}>{f[1]}</p></div></div>)}
      </section>

      {/* GIFT CODE */}
      <section className="sec" style={sec()}>
        <div {...reveal("gc-h")} style={{ ...reveal("gc-h").style, textAlign: "center", marginBottom: 48 }}><Label>Special access</Label><h2 style={HD({ fontSize: "clamp(30px,4.6vw,44px)" })}>Got a <Grad>gift code?</Grad></h2></div>
        <div {...reveal("gc-c")} style={reveal("gc-c").style}><GiftCode onUnlock={() => setLifetime(true)} /></div>
      </section>

      {/* ════ PRICING — AT THE BOTTOM (after all advantages) ════ */}
      <section id="pricing" className="sec" style={sec({ paddingTop: 80 })}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div {...reveal("p-h")} style={{ ...reveal("p-h").style, textAlign: "center", marginBottom: 20 }}><Label>Pricing</Label><h2 style={HD({ fontSize: "clamp(34px,5vw,56px)" })}>You've seen everything. <Grad>Here's the price.</Grad></h2><p style={{ color: C.muted, marginTop: 18, fontSize: 17, maxWidth: 480, margin: "18px auto 0", lineHeight: 1.6 }}>One simple plan. Everything unlocked. Less than a single hour with a private tutor.</p></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22, marginTop: 60 }}>
            <Tilt k="pf" seen={seen} style={{ padding: 40 }}><h3 style={HD({ fontSize: 22, marginBottom: 8 })}>Free</h3><div style={{ fontSize: 44, fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: 4 }}>$0</div><p style={{ fontSize: 13, color: C.muted, marginBottom: 26 }}>3 free messages/day, forever</p>{["3 AI mentor messages/day", "All 6 focus techniques", "Study space + dashboard", "Basic progress tracking", "No credit card required"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.muted, alignItems: "center" }}><Icon name="check" size={16} color={C.green} />{f}</div>)}<div style={{ marginTop: 26 }}><GhostBtn full onClick={() => setWorkspace("dashboard")}>Try the dashboard</GhostBtn></div></Tilt>
            <Tilt k="pp" seen={seen} delay={100} style={{ padding: 40, animation: "pulseGlow 4s ease-in-out infinite" }}><div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${C.blue},${C.violet})`, padding: "6px 22px", borderRadius: "0 0 12px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", zIndex: 2 }}>MOST POPULAR</div><h3 style={HD({ fontSize: 22, marginBottom: 8, marginTop: 10 })}>AIRA Mastermind</h3><div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 48, fontWeight: 700, fontFamily: "var(--font-display)" }}>$9.99</span><span style={{ color: C.muted }}>/month</span></div><p style={{ fontSize: 13, color: C.cyan, marginBottom: 26 }}>Billed monthly · Cancel anytime</p>{["Unlimited AI mentor sessions", "All 6 focus techniques", "All 15 subject categories", "Full dashboard + analytics", "6 royalty-free soundscapes", "Spaced repetition + flashcards", "Streaks + certificates", "Export + offline mode", "Cancel anytime"].map((f) => <div key={f} style={{ display: "flex", gap: 10, padding: "9px 0", fontSize: 14, color: C.fg, alignItems: "center" }}><Icon name="check" size={16} color={C.green} />{f}</div>)}<div style={{ marginTop: 26 }}><GBtn full onClick={buy}>Become a Mastermind</GBtn></div></Tilt>
          </div>
          <p style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: C.faint }}>3 free messages/day with no card · Mastermind unlocks unlimited mentoring, plans, photo reading, and audio · $9.99/month, cancel anytime.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sec" style={{ position: "relative", zIndex: 2, padding: "170px 24px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "30%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.indigo}22,transparent 65%)`, filter: "blur(60px)", animation: "breathe 8s ease-in-out infinite", pointerEvents: "none", willChange: "transform,opacity" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 {...reveal("cta-h")} style={{ ...reveal("cta-h").style, ...HD({ fontSize: "clamp(40px,7vw,68px)", marginBottom: 26, lineHeight: 1.04 }) }}>Your mind is capable<br /><Grad>of more.</Grad></h2>
          <p style={{ fontSize: 18, color: C.muted, maxWidth: 490, margin: "0 auto 42px", lineHeight: 1.7 }}>Stop fighting for focus. Start building it. AIRA turns every study session into a structured path to mastery.</p>
          <GBtn big onClick={() => enterApp("mentor")}>Try the AI mentor <Icon name="arrow" size={18} color="#fff" /></GBtn>
          <p style={{ marginTop: 16, fontSize: 13, color: C.faint }}>3 free messages/day · No card · Mastermind unlocks unlimited</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 2, borderTop: `1px solid ${C.border}`, padding: "60px 48px 40px", background: C.deep }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 280 }}><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><BrainLogo size={26} /><div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 23, background: `linear-gradient(120deg,${C.cyan},${C.indigo},${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AIRA</div></div><p style={{ fontSize: 14, color: C.faint, lineHeight: 1.7 }}>Your AI study mentor. Get into flow. Stay there.</p></div>
            {[{ t: "Product", l: [["Features", "#features"], ["Science", "#science"], ["Mastermind", "#premium"], ["Pricing", "#pricing"]] }, { t: "Study", l: [["Study Guide", "#guide"], ["Techniques", "#features"], ["Focus Audio", "#premium"], ["Compare", "#features"]] }, { t: "Company", l: [["How it works", "#features"], ["Get a gift code", "#pricing"], ["Privacy", "/privacy"], ["Terms", "/terms"]] }].map((col) => <div key={col.t}><h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, marginBottom: 16 }}>{col.t}</h4><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{col.l.map(([l, href]) => <a key={l} href={href} style={{ fontSize: 14, color: C.faint, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)} onMouseLeave={(e) => (e.currentTarget.style.color = C.faint)}>{l}</a>)}</div></div>)}
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}><p style={{ fontSize: 13, color: C.faint }}>© 2026 AIRA Mentor. airamentor.com</p><p style={{ fontSize: 13, color: C.faint }}>Made in Turkey</p></div>
        </div>
      </footer>
    </main>
  );
}
