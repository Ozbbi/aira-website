
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  Calculator,
  Scale,
  Atom,
  BookOpen,
  TrendingUp,
  FlaskConical,
  Music,
  Globe,
  Cpu,
  PenTool,
  Microscope,
  Languages,
  History,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Infinity,
  ChevronDown,
  Play,
  Star,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const LEMON_URL =
  "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const SUBJECTS = [
  { icon: Cpu, label: "Artificial Intelligence", color: "#3D5AFE" },
  { icon: Code2, label: "Software Engineering", color: "#00B4D8" },
  { icon: Calculator, label: "Mathematics", color: "#7C3AED" },
  { icon: Scale, label: "Law & Ethics", color: "#3D5AFE" },
  { icon: Brain, label: "Philosophy", color: "#00B4D8" },
  { icon: Atom, label: "Physics", color: "#7C3AED" },
  { icon: FlaskConical, label: "Chemistry", color: "#3D5AFE" },
  { icon: Microscope, label: "Biology", color: "#00B4D8" },
  { icon: TrendingUp, label: "Economics", color: "#7C3AED" },
  { icon: BookOpen, label: "Literature", color: "#3D5AFE" },
  { icon: Globe, label: "World History", color: "#00B4D8" },
  { icon: Languages, label: "Linguistics", color: "#7C3AED" },
  { icon: Music, label: "Music Theory", color: "#3D5AFE" },
  { icon: PenTool, label: "Design & UX", color: "#00B4D8" },
  { icon: History, label: "Ancient Civilizations", color: "#7C3AED" },
];

const SCIENCE_CARDS = [
  {
    tag: "Neuroscience",
    title: "Neural-Phase Locking",
    body:
      "Your brain synchronizes its oscillations to external rhythmic stimuli. AIRA MENTOR generates precise audio frequencies — theta (4–8 Hz) for deep focus, alpha (8–14 Hz) for relaxed absorption — entraining your neural network into a sustained flow state before a single word is read.",
    accent: "#3D5AFE",
    icon: Zap,
  },
  {
    tag: "Pedagogy",
    title: "The Socratic AI Method",
    body:
      "AIRA never lectures. It interrogates. Each session opens with a probing question and responds to your answers with deeper, sharper follow-ups — the oldest teaching technique in human history, executed at machine speed, personalized to your exact knowledge gap.",
    accent: "#00B4D8",
    icon: Sparkles,
  },
  {
    tag: "Cognitive Science",
    title: "Spaced Retrieval Synthesis",
    body:
      "AIRA tracks which concepts you've struggled with across sessions and resurfaces them at precisely calculated intervals — right before the forgetting curve drops. The result is genuine long-term retention, not the illusion of understanding.",
    accent: "#7C3AED",
    icon: Infinity,
  },
];

// ─────────────────────────────────────────────────────────────
// NEURAL WAVE CANVAS — the signature element
// ─────────────────────────────────────────────────────────────
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
      { amp: 28, freq: 0.012, speed: 0.018, color: "rgba(61,90,254,0.55)", phase: 0 },
      { amp: 18, freq: 0.022, speed: 0.025, color: "rgba(0,180,216,0.40)", phase: 2.1 },
      { amp: 12, freq: 0.035, speed: 0.032, color: "rgba(124,58,237,0.35)", phase: 4.4 },
      { amp: 7,  freq: 0.055, speed: 0.045, color: "rgba(61,90,254,0.20)", phase: 1.2 },
    ];

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      waves.forEach((w) => {
        ctx.beginPath();
        const cy = H / 2;
        for (let x = 0; x <= W; x += 2) {
          const y =
            cy +
            Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp +
            Math.sin(x * w.freq * 2.3 + t * w.speed * 1.4 + w.phase) * (w.amp * 0.3);
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
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// FLOATING ORBS background
// ─────────────────────────────────────────────────────────────
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #3D5AFE 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
          animation: "float1 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          top: "30%",
          right: "-5%",
          animation: "float2 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)",
          bottom: "10%",
          left: "30%",
          animation: "float3 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GLASS CARD
// ─────────────────────────────────────────────────────────────
function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{
        background: "rgba(10,10,26,0.6)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(61,90,254,0.15)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-16"
      style={{
        background: scrolled ? "rgba(2,2,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(61,90,254,0.1)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3D5AFE, #7C3AED)" }}
        >
          <Brain size={16} className="text-white" />
        </div>
        <span
          className="text-white font-bold tracking-tight text-lg"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          AIRA<span style={{ color: "#3D5AFE" }}>·</span>MENTOR
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {["The Science", "Subjects", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em" }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href={LEMON_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:opacity-90 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #3D5AFE, #7C3AED)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Start Free Trial
        <ArrowRight size={14} />
      </a>
    </motion.nav>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [sessionActive, setSessionActive] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#020205" }}
    >
      <FloatingOrbs />

      {/* Neural wave band */}
      <div
        className="absolute left-0 right-0"
        style={{ height: 160, top: "55%", transform: "translateY(-50%)" }}
      >
        <NeuralWave />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(61,90,254,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(61,90,254,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{
            background: "rgba(61,90,254,0.12)",
            border: "1px solid rgba(61,90,254,0.3)",
            color: "#7B96FF",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.08em",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          NEURAL-PHASE LOCKED STUDY ENGINE · v2.4
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="text-white">Your Mind,</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #3D5AFE 0%, #00B4D8 50%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            In Flow State.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          AIRA MENTOR locks your brain into deep focus using neural-phase audio, then
          guides you through any subject with Socratic AI mentoring — the way the greatest
          teachers in history actually taught.
        </motion.p>

        {/* MAIN CTA — Brain.fm style trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={LEMON_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSessionActive(true)}
            className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3D5AFE 0%, #7C3AED 100%)",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 0 60px rgba(61,90,254,0.4), 0 0 120px rgba(124,58,237,0.2)",
            }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-2xl animate-ping"
              style={{
                background: "linear-gradient(135deg, #3D5AFE, #7C3AED)",
                opacity: 0.2,
              }}
            />
            <Play size={20} className="relative z-10" />
            <span className="relative z-10">Start Flow Session</span>
            <span
              className="relative z-10 text-sm font-normal opacity-70"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              — 5 days free
            </span>
          </a>

          <p
            className="text-xs text-gray-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            No credit card · Cancel anytime · Works in browser
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center gap-8 mt-16"
        >
          {[
            { val: "47min", label: "avg. flow session" },
            { val: "15+", label: "subject tracks" },
            { val: "94%", label: "retention lift" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.val}
              </span>
              <span
                className="text-xs text-gray-500 uppercase tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs text-gray-600"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          scroll to explore
        </span>
        <ChevronDown size={16} className="text-gray-600 animate-bounce" />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SCIENCE SECTION
// ─────────────────────────────────────────────────────────────
function ScienceSection() {
  return (
    <section id="the-science" className="py-32 px-6 lg:px-16" style={{ background: "#020205" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#3D5AFE", fontFamily: "'JetBrains Mono', monospace" }}
          >
            The Mechanism
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Built on science.
            <br />
            <span className="text-gray-500">Not vibes.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {SCIENCE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <GlassCard
                  className="p-8 h-full group hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    borderColor: `${card.accent}22`,
                    boxShadow: `0 0 40px ${card.accent}08`,
                  }}
                >
                  {/* Tag */}
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${card.accent}20` }}
                    >
                      <Icon size={16} style={{ color: card.accent }} />
                    </div>
                    <span
                      className="text-xs uppercase tracking-widest font-medium"
                      style={{
                        color: card.accent,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="text-gray-400 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {card.body}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-8 h-px w-full opacity-30"
                    style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
                  />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SUBJECTS GRID
// ─────────────────────────────────────────────────────────────
function SubjectsSection() {
  return (
    <section
      id="subjects"
      className="py-32 px-6 lg:px-16"
      style={{
        background:
          "linear-gradient(180deg, #020205 0%, #06061A 50%, #020205 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#00B4D8", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Subject Tracks
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              15 disciplines.
              <br />
              <span className="text-gray-500">One flow engine.</span>
            </h2>
          </div>
          <p
            className="text-gray-500 text-sm max-w-xs leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Each track is tuned with a different neural-phase frequency profile
            optimized for that subject's cognitive demands.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {SUBJECTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <GlassCard
                  className="p-5 flex flex-col items-center gap-3 cursor-pointer group"
                  style={{
                    borderColor: `${s.color}18`,
                    transition: "all 0.25s ease",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${s.color}18` }}
                  >
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <span
                    className="text-gray-400 text-xs text-center leading-tight group-hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.label}
                  </span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────────────────────
function PricingSection() {
  const features = [
    "Unlimited neural-phase flow sessions",
    "All 15 subject tracks unlocked",
    "Socratic AI Mentor — unlimited questions",
    "Spaced retrieval tracking & scheduling",
    "Session analytics & focus heatmap",
    "Priority model access (latest Claude)",
    "Export session notes as PDF",
    "Multi-device sync",
  ];

  return (
    <section
      id="pricing"
      className="py-32 px-6 lg:px-16"
      style={{ background: "#020205" }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#7C3AED", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Simple Pricing
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Everything.
            <br />
            <span className="text-gray-500">One plan.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <GlassCard
            className="p-8 md:p-10 relative overflow-hidden"
            style={{
              borderColor: "rgba(61,90,254,0.3)",
              boxShadow: "0 0 80px rgba(61,90,254,0.12), 0 0 160px rgba(124,58,237,0.06)",
            }}
          >
            {/* Top gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3D5AFE, #7C3AED, transparent)",
              }}
            />

            {/* Badge */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <span
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: "#3D5AFE", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Pro Plan
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span
                    className="text-5xl font-bold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    $9.99
                  </span>
                  <span
                    className="text-gray-500 text-sm mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    / month
                  </span>
                </div>
              </div>

              <div
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(61,90,254,0.15)",
                  border: "1px solid rgba(61,90,254,0.3)",
                  color: "#7B96FF",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                5-DAY FREE TRIAL
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-3 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#3D5AFE" }} />
                  <span
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={LEMON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #3D5AFE 0%, #7C3AED 100%)",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 0 40px rgba(61,90,254,0.3)",
              }}
            >
              <Play size={16} />
              Start 5-Day Free Trial
              <ArrowRight size={16} />
            </a>

            <p
              className="text-center text-xs text-gray-600 mt-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              No charge today · Cancel before day 5 to pay nothing
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section
      className="py-32 px-6 lg:px-16 relative overflow-hidden"
      style={{ background: "#020205" }}
    >
      <FloatingOrbs />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#3D5AFE" style={{ color: "#3D5AFE" }} />
            ))}
            <span
              className="text-gray-500 text-xs ml-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              "The only study tool that actually changes how I think" — beta user
            </span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The way your mind
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #3D5AFE, #00B4D8, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              was meant to learn.
            </span>
          </h2>

          <p
            className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Five days. No card. Try every feature at full depth and decide if AIRA
            MENTOR belongs in your study stack — on your terms.
          </p>

          <a
            href={LEMON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #3D5AFE 0%, #7C3AED 100%)",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 0 80px rgba(61,90,254,0.4), 0 0 160px rgba(124,58,237,0.2)",
            }}
          >
            <Play size={20} />
            Begin Your Flow Session
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="py-10 px-6 lg:px-16 border-t flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ borderColor: "rgba(61,90,254,0.1)", background: "#020205" }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3D5AFE, #7C3AED)" }}
        >
          <Brain size={12} className="text-white" />
        </div>
        <span
          className="text-gray-500 text-sm"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          AIRA<span style={{ color: "#3D5AFE" }}>·</span>MENTOR
        </span>
      </div>

      <p
        className="text-xs text-gray-700"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        © {new Date().getFullYear()} AIRA MENTOR. All rights reserved.
      </p>

      <div className="flex gap-6">
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: #020205;
          color: white;
          -webkit-font-smoothing: antialiased;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020205; }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(#3D5AFE, #7C3AED);
          border-radius: 3px;
        }

        /* Orb animations */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(0.95); }
          66% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -40px) scale(1.08); }
        }

        /* Selection */
        ::selection {
          background: rgba(61,90,254,0.3);
          color: white;
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
