"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Code2, Calculator, Scale, Atom, BookOpen, TrendingUp,
  FlaskConical, Music, Globe, Cpu, PenTool, Microscope, Languages,
  History, Sparkles, ArrowRight, CheckCircle2, Zap, Infinity,
  ChevronDown, Play, Star,
} from "lucide-react";

const LEMON_URL = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const SUBJECTS = [
  { icon: Cpu,        label: "Artificial Intelligence",  color: "#3D5AFE" },
  { icon: Code2,      label: "Software Engineering",     color: "#00B4D8" },
  { icon: Calculator, label: "Mathematics",              color: "#7C3AED" },
  { icon: Scale,      label: "Law & Ethics",             color: "#3D5AFE" },
  { icon: Brain,      label: "Philosophy",               color: "#00B4D8" },
  { icon: Atom,       label: "Physics",                  color: "#7C3AED" },
  { icon: FlaskConical,label:"Chemistry",                color: "#3D5AFE" },
  { icon: Microscope, label: "Biology",                  color: "#00B4D8" },
  { icon: TrendingUp, label: "Economics",                color: "#7C3AED" },
  { icon: BookOpen,   label: "Literature",               color: "#3D5AFE" },
  { icon: Globe,      label: "World History",            color: "#00B4D8" },
  { icon: Languages,  label: "Linguistics",              color: "#7C3AED" },
  { icon: Music,      label: "Music Theory",             color: "#3D5AFE" },
  { icon: PenTool,    label: "Design & UX",              color: "#00B4D8" },
  { icon: History,    label: "Ancient Civilizations",    color: "#7C3AED" },
];

const SCIENCE_CARDS = [
  {
    tag: "Neuroscience", title: "Neural-Phase Locking", accent: "#3D5AFE", icon: Zap,
    body: "Your brain synchronizes its oscillations to external rhythmic stimuli. AIRA MENTOR generates precise audio frequencies — theta (4–8 Hz) for deep focus, alpha (8–14 Hz) for relaxed absorption — entraining your neural network into a sustained flow state before a single word is read.",
  },
  {
    tag: "Pedagogy", title: "The Socratic AI Method", accent: "#00B4D8", icon: Sparkles,
    body: "AIRA never lectures. It interrogates. Each session opens with a probing question and responds to your answers with deeper, sharper follow-ups — the oldest teaching technique in human history, executed at machine speed, personalized to your exact knowledge gap.",
  },
  {
    tag: "Cognitive Science", title: "Spaced Retrieval Synthesis", accent: "#7C3AED", icon: Infinity,
    body: "AIRA tracks which concepts you've struggled with across sessions and resurfaces them at precisely calculated intervals — right before the forgetting curve drops. The result is genuine long-term retention, not the illusion of understanding.",
  },
];

const PRO_FEATURES = [
  "Unlimited neural-phase flow sessions",
  "All 15 subject tracks unlocked",
  "Socratic AI Mentor — unlimited questions",
  "Spaced retrieval tracking & scheduling",
  "Session analytics & focus heatmap",
  "Priority model access (latest Claude)",
  "Export session notes as PDF",
  "Multi-device sync",
];

// ── NEURAL WAVE CANVAS ──────────────────────────────────────
function NeuralWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const waves = [
      { amp: 28, freq: 0.012, speed: 0.018, color: "rgba(61,90,254,0.55)",  phase: 0   },
      { amp: 18, freq: 0.022, speed: 0.025, color: "rgba(0,180,216,0.40)",  phase: 2.1 },
      { amp: 12, freq: 0.035, speed: 0.032, color: "rgba(124,58,237,0.35)", phase: 4.4 },
      { amp: 7,  freq: 0.055, speed: 0.045, color: "rgba(61,90,254,0.20)",  phase: 1.2 },
    ];

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      waves.forEach((w) => {
        ctx.beginPath();
        const cy = H / 2;
        for (let x = 0; x <= W; x += 2) {
          const y = cy
            + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
            + Math.sin(x * w.freq * 2.3 + t * w.speed * 1.4 + w.phase) * (w.amp * 0.3);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
      });
      t += 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.9 }} />;
}

// ── FLOATING ORBS ────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", filter: "blur(80px)", opacity: 0.18, background: "radial-gradient(circle, #3D5AFE 0%, transparent 70%)", top: "10%", left: "-10%", animation: "float1 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", filter: "blur(80px)", opacity: 0.13, background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)", top: "30%", right: "-5%",  animation: "float2 22s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", filter: "blur(80px)", opacity: 0.10, background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)", bottom: "10%", left: "30%", animation: "float3 25s ease-in-out infinite" }} />
    </div>
  );
}

// ── GLASS CARD ───────────────────────────────────────────────
function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      borderRadius: 16,
      border: "1px solid rgba(61,90,254,0.15)",
      background: "rgba(10,10,26,0.6)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 64px",
        background: scrolled ? "rgba(2,2,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(61,90,254,0.1)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #3D5AFE, #7C3AED)" }}>
          <Brain size={16} color="white" />
        </div>
        <span style={{ color: "white", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
          AIRA<span style={{ color: "#3D5AFE" }}>·</span>MENTOR
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {["The Science", "Subjects", "Pricing"].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}
            style={{ color: "#9CA3AF", fontSize: 14, fontFamily: "'Inter', sans-serif", textDecoration: "none", letterSpacing: "0.02em", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
          >{item}</a>
        ))}
        <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, color: "white", fontSize: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif", textDecoration: "none", background: "linear-gradient(135deg, #3D5AFE, #7C3AED)", transition: "opacity 0.2s, transform 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          Start Free Trial <ArrowRight size={14} />
        </a>
      </div>
    </motion.nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#020205" }}>
      <FloatingOrbs />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(61,90,254,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,90,254,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Wave band */}
      <div style={{ position: "absolute", left: 0, right: 0, height: 160, top: "55%", transform: "translateY(-50%)" }}>
        <NeuralWave />
      </div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, fontSize: 11, fontWeight: 500, marginBottom: 32, background: "rgba(61,90,254,0.12)", border: "1px solid rgba(61,90,254,0.3)", color: "#7B96FF", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", animation: "pulse 2s infinite" }} />
          NEURAL-PHASE LOCKED STUDY ENGINE · v2.4
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span style={{ color: "white" }}>Your Mind,</span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #3D5AFE 0%, #00B4D8 50%, #7C3AED 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            In Flow State.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
          style={{ fontSize: 18, color: "#9CA3AF", maxWidth: 600, marginBottom: 48, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}
        >
          AIRA MENTOR locks your brain into deep focus using neural-phase audio, then guides you through any subject with Socratic AI mentoring — the way the greatest teachers in history actually taught.
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
            style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "20px 40px", borderRadius: 16, color: "white", fontWeight: 600, fontSize: 18, textDecoration: "none", background: "linear-gradient(135deg, #3D5AFE 0%, #7C3AED 100%)", boxShadow: "0 0 60px rgba(61,90,254,0.4), 0 0 120px rgba(124,58,237,0.2)", fontFamily: "'Space Grotesk', sans-serif", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            <Play size={20} />
            Start Flow Session
            <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7, fontFamily: "'Inter', sans-serif" }}>— 5 days free</span>
          </a>
          <p style={{ fontSize: 12, color: "#4B5563", fontFamily: "'Inter', sans-serif" }}>No credit card · Cancel anytime · Works in browser</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 48, marginTop: 64 }}
        >
          {[{ val: "47min", label: "avg. flow session" }, { val: "15+", label: "subject tracks" }, { val: "94%", label: "retention lift" }].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</span>
              <span style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontSize: 11, color: "#4B5563", fontFamily: "'JetBrains Mono', monospace" }}>scroll to explore</span>
        <ChevronDown size={16} color="#4B5563" style={{ animation: "bounce 2s infinite" }} />
      </motion.div>
    </section>
  );
}

// ── SCIENCE ──────────────────────────────────────────────────
function ScienceSection() {
  return (
    <section id="the-science" style={{ padding: "128px 64px", background: "#020205" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3D5AFE", fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>The Mechanism</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>
            Built on science.<br /><span style={{ color: "#4B5563" }}>Not vibes.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {SCIENCE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
                <GlassCard style={{ padding: 32, height: "100%", borderColor: `${card.accent}22`, boxShadow: `0 0 40px ${card.accent}08`, transition: "transform 0.3s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${card.accent}20` }}>
                      <Icon size={16} color={card.accent} />
                    </div>
                    <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, color: card.accent, fontFamily: "'JetBrains Mono', monospace" }}>{card.tag}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: "#9CA3AF", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{card.body}</p>
                  <div style={{ marginTop: 32, height: 1, background: `linear-gradient(90deg, ${card.accent}, transparent)`, opacity: 0.3 }} />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── SUBJECTS ─────────────────────────────────────────────────
function SubjectsSection() {
  return (
    <section id="subjects" style={{ padding: "128px 64px", background: "linear-gradient(180deg, #020205 0%, #06061A 50%, #020205 100%)" }}>
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}
        >
          <div>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00B4D8", fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>Subject Tracks</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>
              15 disciplines.<br /><span style={{ color: "#4B5563" }}>One flow engine.</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: "#6B7280", maxWidth: 280, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Each track is tuned with a different neural-phase frequency profile optimized for that subject's cognitive demands.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {SUBJECTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <GlassCard style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", borderColor: `${s.color}18` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${s.color}18` }}>
                    <Icon size={18} color={s.color} />
                  </div>
                  <span style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", lineHeight: 1.3, fontFamily: "'Inter', sans-serif" }}>{s.label}</span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ──────────────────────────────────────────────────
function PricingSection() {
  return (
    <section id="pricing" style={{ padding: "128px 64px", background: "#020205" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace", marginBottom: 16 }}>Simple Pricing</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "white", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>
            Everything.<br /><span style={{ color: "#4B5563" }}>One plan.</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <GlassCard style={{ padding: 40, position: "relative", overflow: "hidden", borderColor: "rgba(61,90,254,0.3)", boxShadow: "0 0 80px rgba(61,90,254,0.12), 0 0 160px rgba(124,58,237,0.06)" }}>
            {/* Top line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #3D5AFE, #7C3AED, transparent)" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, color: "#3D5AFE", fontFamily: "'JetBrains Mono', monospace" }}>Pro Plan</span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 8 }}>
                  <span style={{ fontSize: 52, fontWeight: 700, color: "white", lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>$9.99</span>
                  <span style={{ fontSize: 14, color: "#6B7280", marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>/ month</span>
                </div>
              </div>
              <div style={{ padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "rgba(61,90,254,0.15)", border: "1px solid rgba(61,90,254,0.3)", color: "#7B96FF", fontFamily: "'JetBrains Mono', monospace" }}>
                5-DAY FREE TRIAL
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {PRO_FEATURES.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <CheckCircle2 size={16} color="#3D5AFE" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#D1D5DB", fontFamily: "'Inter', sans-serif" }}>{f}</span>
                </div>
              ))}
            </div>

            <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "16px 0", borderRadius: 12, color: "white", fontWeight: 600, fontSize: 16, textDecoration: "none", background: "linear-gradient(135deg, #3D5AFE 0%, #7C3AED 100%)", boxShadow: "0 0 40px rgba(61,90,254,0.3)", fontFamily: "'Space Grotesk', sans-serif", transition: "transform 0.2s, opacity 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              <Play size={16} /> Start 5-Day Free Trial <ArrowRight size={16} />
            </a>
            <p style={{ textAlign: "center", fontSize: 12, color: "#4B5563", marginTop: 16, fontFamily: "'Inter', sans-serif" }}>No charge today · Cancel before day 5 to pay nothing</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ── FINAL CTA ────────────────────────────────────────────────
function CtaSection() {
  return (
    <section style={{ padding: "128px 64px", background: "#020205", position: "relative", overflow: "hidden" }}>
      <FloatingOrbs />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 32 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#3D5AFE" color="#3D5AFE" />)}
            <span style={{ fontSize: 12, color: "#6B7280", marginLeft: 8, fontFamily: "'Inter', sans-serif" }}>"The only study tool that actually changes how I think" — beta user</span>
          </div>
          <h2 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 700, color: "white", marginBottom: 24, lineHeight: 1.05, fontFamily: "'Space Grotesk', sans-serif" }}>
            The way your mind<br />
            <span style={{ background: "linear-gradient(135deg, #3D5AFE, #00B4D8, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              was meant to learn.
            </span>
          </h2>
          <p style={{ fontSize: 18, color: "#9CA3AF", marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Five days. No card. Try every feature at full depth and decide if AIRA MENTOR belongs in your study stack — on your terms.
          </p>
          <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 48px", borderRadius: 16, color: "white", fontWeight: 700, fontSize: 18, textDecoration: "none", background: "linear-gradient(135deg, #3D5AFE 0%, #7C3AED 100%)", boxShadow: "0 0 80px rgba(61,90,254,0.4), 0 0 160px rgba(124,58,237,0.2)", fontFamily: "'Space Grotesk', sans-serif", transition: "transform 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            <Play size={20} /> Begin Your Flow Session
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "40px 64px", borderTop: "1px solid rgba(61,90,254,0.1)", background: "#020205", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #3D5AFE, #7C3AED)" }}>
          <Brain size={12} color="white" />
        </div>
        <span style={{ color: "#6B7280", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif" }}>AIRA<span style={{ color: "#3D5AFE" }}>·</span>MENTOR</span>
      </div>
      <p style={{ fontSize: 12, color: "#374151", fontFamily: "'Inter', sans-serif" }}>© {new Date().getFullYear()} AIRA MENTOR. All rights reserved.</p>
      <div style={{ display: "flex", gap: 24 }}>
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a key={l} href="#" style={{ fontSize: 12, color: "#4B5563", textDecoration: "none", fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#9CA3AF")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4B5563")}
          >{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ── ROOT ─────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #020205; color: white; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020205; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#3D5AFE, #7C3AED); border-radius: 3px; }
        ::selection { background: rgba(61,90,254,0.3); color: white; }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.05)} 66%{transform:translate(-20px,20px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,40px) scale(0.95)} 66%{transform:translate(30px,-20px) scale(1.05)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-40px) scale(1.08)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @media (max-width: 768px) {
          nav { padding: 16px 24px !important; }
          nav > div:nth-child(2) { display: none !important; }
          section { padding: 80px 24px !important; }
          footer { padding: 32px 24px !important; }
        }
      `}</style>
      <Navbar />
      <main>
        <HeroSection />
        <ScienceSection />
        <SubjectsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
