"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Brain, Code2, Calculator, Scale, Atom, BookOpen, TrendingUp,
  FlaskConical, Music, Globe, Cpu, PenTool, Microscope, Languages,
  History, Sparkles, ArrowRight, CheckCircle2, Zap, Infinity,
  ChevronDown, Play, Star, Timer, Volume2, VolumeX, X, Crown,
  Shield, Clock, Target, Layers, Flame, Moon, Sun, Headphones,
  Wifi, WifiOff, Monitor, Smartphone, BatteryFull, Bell, BellOff,
  ChevronRight, Lock, Unlock, Pause, SkipForward, Radio,
} from "lucide-react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const LEMON_URL = "https://airamentor.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const COLORS = {
  void: "#020205",
  surface: "#080810",
  glass: "rgba(8,8,20,0.7)",
  border: "rgba(99,102,241,0.15)",
  indigo: "#6366F1",
  cyan: "#06B6D4",
  violet: "#8B5CF6",
  emerald: "#10B981",
  rose: "#F43F5E",
  amber: "#F59E0B",
  white: "#F8FAFC",
  muted: "#64748B",
  faint: "#1E1E3A",
};

const SUBJECTS = [
  { icon: Cpu,         label: "Artificial Intelligence", color: COLORS.indigo,  freq: "β 18Hz" },
  { icon: Code2,       label: "Software Engineering",    color: COLORS.cyan,    freq: "β 16Hz" },
  { icon: Calculator,  label: "Mathematics",             color: COLORS.violet,  freq: "γ 40Hz" },
  { icon: Scale,       label: "Law & Ethics",            color: COLORS.indigo,  freq: "α 10Hz" },
  { icon: Brain,       label: "Philosophy",              color: COLORS.cyan,    freq: "θ 6Hz"  },
  { icon: Atom,        label: "Physics",                 color: COLORS.violet,  freq: "γ 40Hz" },
  { icon: FlaskConical,label: "Chemistry",               color: COLORS.emerald, freq: "β 20Hz" },
  { icon: Microscope,  label: "Biology",                 color: COLORS.cyan,    freq: "α 12Hz" },
  { icon: TrendingUp,  label: "Economics",               color: COLORS.amber,   freq: "β 15Hz" },
  { icon: BookOpen,    label: "Literature",              color: COLORS.rose,    freq: "α 8Hz"  },
  { icon: Globe,       label: "World History",           color: COLORS.indigo,  freq: "θ 7Hz"  },
  { icon: Languages,   label: "Linguistics",             color: COLORS.violet,  freq: "α 10Hz" },
  { icon: Music,       label: "Music Theory",            color: COLORS.cyan,    freq: "α 12Hz" },
  { icon: PenTool,     label: "Design & UX",             color: COLORS.rose,    freq: "α 10Hz" },
  { icon: History,     label: "Ancient Civilizations",   color: COLORS.amber,   freq: "θ 6Hz"  },
];

const FLOW_METHODS = [
  {
    id: "neural", icon: Zap, color: COLORS.indigo,
    title: "Neural Phase Lock",
    subtitle: "Frequency Entrainment Protocol",
    desc: "Binaural beta-wave audio (16–20 Hz) synchronizes your prefrontal cortex before the first word is read. Validated by 2024 Nature Communications Biology study.",
    badge: "Science-Backed",
  },
  {
    id: "socratic", icon: Sparkles, color: COLORS.cyan,
    title: "Socratic AI Mentor",
    subtitle: "Interrogative Learning Engine",
    desc: "AIRA never tells — it asks. Each session begins with a probe question, then sharpens based on your response gaps. The Socratic method at machine velocity.",
    badge: "AI-Powered",
  },
  {
    id: "spaced", icon: Infinity, color: COLORS.violet,
    title: "Spaced Retrieval Synthesis",
    subtitle: "Forgetting Curve Override",
    desc: "Concepts you hesitate on resurface at algorithmically optimal intervals. Not flashcards — a dynamic memory graph rebuilt after every session.",
    badge: "Adaptive",
  },
  {
    id: "environment", icon: Shield, color: COLORS.emerald,
    title: "Deep Work Environment",
    subtitle: "Distraction Elimination Stack",
    desc: "AIRA detects your session type and enforces the optimal environment: devices silenced, notifications off, study posture cues, ambient blocking engaged.",
    badge: "Focus Stack",
  },
  {
    id: "chunking", icon: Layers, color: COLORS.amber,
    title: "Cognitive Chunking",
    subtitle: "Working Memory Optimizer",
    desc: "Complex topics are atomized into 7±2 unit chunks — the precise capacity of human working memory. Each chunk closes before the next opens.",
    badge: "Neuroscience",
  },
  {
    id: "retrieval", icon: Target, color: COLORS.rose,
    title: "Active Retrieval Testing",
    subtitle: "Test Effect Amplifier",
    desc: "AIRA interrupts passive reading with retrieval challenges every 8 minutes — the interval shown to maximize long-term retention over passive re-reading by 3×.",
    badge: "Research-Proven",
  },
];

const STUDY_MODES = [
  {
    id: "pomodoro", icon: Timer, color: COLORS.indigo,
    title: "Pomodoro Protocol",
    time: "25 + 5 min",
    desc: "25 minutes of locked focus followed by a mandatory 5-minute rest. Prevents cognitive fatigue by cycling between intense work and recovery. Best for: tasks with clear checkpoints.",
    tag: "Classic",
  },
  {
    id: "deepwork", icon: Flame, color: COLORS.rose,
    title: "Deep Work Mode",
    time: "90–120 min",
    desc: "Extended unbroken focus sessions modeled on Cal Newport's research. Engages full neural immersion for complex problem-solving. Best for: research, coding, writing.",
    tag: "Advanced",
  },
  {
    id: "ultradian", icon: Moon, color: COLORS.violet,
    title: "Ultradian Rhythm",
    time: "90 min cycles",
    desc: "Follows your brain's natural 90-minute focus-rest cycle. AIRA monitors your response times to detect when cognitive performance peaks and auto-schedules breaks.",
    tag: "Biohack",
  },
  {
    id: "sprint", icon: Zap, color: COLORS.amber,
    title: "Sprint Sessions",
    time: "10–15 min",
    desc: "Hyper-focused micro-sessions designed for concept reviews, flashcard retrieval, and quick-fire problem sets. Zero warmup time. Maximum output density.",
    tag: "Quick",
  },
];

const AMBIENT_TRACKS = [
  { id: "brown",   label: "Brown Noise",      freq: "Deep Focus",   color: COLORS.amber   },
  { id: "white",   label: "White Noise",       freq: "Concentration", color: COLORS.white   },
  { id: "rain",    label: "Rain on Glass",     freq: "Creative Flow", color: COLORS.cyan    },
  { id: "forest",  label: "Forest Ambience",   freq: "Calm Focus",    color: COLORS.emerald },
  { id: "cafe",    label: "Café Murmur",        freq: "Mild Stim",     color: COLORS.amber   },
  { id: "space",   label: "Cosmic Drone",       freq: "Deep Theta",    color: COLORS.violet  },
];

const DEVICE_RULES = [
  { icon: Smartphone, label: "Phone face-down",     desc: "Physical distance reduces impulse checks by 74%",   color: COLORS.rose    },
  { icon: BellOff,    label: "All notifications off", desc: "Each alert costs 23 minutes of refocus time",       color: COLORS.amber   },
  { icon: WifiOff,    label: "Social tabs closed",   desc: "Passive availability triggers distraction loops",    color: COLORS.indigo  },
  { icon: Monitor,    label: "Single task window",   desc: "Multitasking reduces IQ equivalent to 10 IQ points", color: COLORS.violet  },
];

const PRO_FEATURES = [
  "Unlimited deep focus sessions — all 15 subjects",
  "Socratic AI Mentor with unlimited question depth",
  "6 AIRA Flow State protocols unlocked",
  "All 4 study mode timers + custom intervals",
  "6 ambient audio tracks (Brown Noise, Rain, Space...)",
  "Spaced retrieval memory graph — lifetime tracking",
  "Session analytics + weekly cognitive performance report",
  "Deep Work environment enforcement stack",
  "Device distraction protocol with smart reminders",
  "Priority access to new subjects and features",
  "Export session notes and progress as PDF",
  "Multi-device sync across all platforms",
];

// ─── WEBGL PARTICLE FIELD ─────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const PARTICLE_COUNT = 120;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / W, y: e.clientY / H };
    };
    window.addEventListener("mousemove", onMouse);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string; pulse: number;
    };

    const palette = ["#6366F1", "#06B6D4", "#8B5CF6", "#10B981", "#F59E0B"];

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulse: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += (dx / dist) * 0.08;
          p.vy += (dy / dist) * 0.08;
        }

        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const pulseAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        const pulseR = p.r * (0.8 + 0.2 * Math.sin(p.pulse));

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseR * 4);
        grad.addColorStop(0, p.color + Math.round(pulseAlpha * 255).toString(16).padStart(2, "0"));
        grad.addColorStop(1, p.color + "00");

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, pulseR * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

// ─── NEURAL WAVE ──────────────────────────────────────────────────────────────
function NeuralWave({ height = 120, opacity = 1 }: { height?: number; opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const waves = [
      { amp: 22, freq: 0.013, speed: 0.020, color: "rgba(99,102,241,0.6)",  phase: 0   },
      { amp: 14, freq: 0.025, speed: 0.027, color: "rgba(6,182,212,0.45)",  phase: 2.1 },
      { amp: 9,  freq: 0.038, speed: 0.035, color: "rgba(139,92,246,0.4)",  phase: 4.4 },
      { amp: 5,  freq: 0.060, speed: 0.050, color: "rgba(99,102,241,0.25)", phase: 1.2 },
    ];

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      waves.forEach((w) => {
        ctx.beginPath();
        const cy = H / 2;
        for (let x = 0; x <= W; x += 1.5) {
          const y = cy
            + Math.sin(x * w.freq + t * w.speed + w.phase) * w.amp
            + Math.sin(x * w.freq * 2.4 + t * w.speed * 1.5 + w.phase) * (w.amp * 0.35)
            + Math.sin(x * w.freq * 0.5 + t * w.speed * 0.7) * (w.amp * 0.2);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
      });

      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }}
    />
  );
}

// ─── COUNTER ANIMATION ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GlassCard({ children, style = {}, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 20,
        border: `1px solid ${COLORS.border}`,
        background: COLORS.glass,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── WELCOME MODAL ────────────────────────────────────────────────────────────
function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(2,2,5,0.92)", backdropFilter: "blur(20px)" }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        style={{ maxWidth: 520, width: "90%", padding: 48, position: "relative", textAlign: "center" }}
      >
        <GlassCard style={{ padding: 48, border: `1px solid rgba(99,102,241,0.4)`, boxShadow: "0 0 120px rgba(99,102,241,0.2)" }}>
          {/* Top glow line */}
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, #6366F1, #06B6D4, transparent)" }} />

          {/* Brain logo */}
          <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 40px rgba(99,102,241,0.5)" }}>
            <Brain size={32} color="white" />
          </div>

          <div style={{ fontSize: 11, color: COLORS.indigo, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            ◈ AIRA MENTOR — SESSION READY
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 700, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16, lineHeight: 1.1 }}>
            Welcome to<br />
            <span style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Flow State</span>
          </h2>

          <p style={{ fontSize: 15, color: COLORS.muted, fontFamily: "'Inter', sans-serif", lineHeight: 1.7, marginBottom: 32 }}>
            Your neural-phase study engine is initialized. Before your first session, configure your environment for maximum cognitive performance.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
            {["Phone face-down", "Notifications off", "Single tab open", "Headphones on"].map((tip, i) => (
              <div key={tip} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <CheckCircle2 size={14} color={COLORS.indigo} />
                <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>{tip}</span>
              </div>
            ))}
          </div>

          <a
            href={LEMON_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 32px", borderRadius: 14, color: "white", fontWeight: 600, fontSize: 15, textDecoration: "none", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 40px rgba(99,102,241,0.35)", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12, transition: "transform 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
          >
            <Play size={16} /> Begin Flow Session — 5 Days Free
          </a>

          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: COLORS.muted, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif", textDecoration: "underline" }}
          >
            Explore the platform first
          </button>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 64px",
        background: scrolled ? "rgba(2,2,5,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,102,241,0.12)" : "none",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", boxShadow: "0 0 20px rgba(99,102,241,0.5)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
          <Brain size={16} color="white" />
        </div>
        <div>
          <span style={{ color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            AIRA<span style={{ color: COLORS.indigo }}>·</span>MENTOR
          </span>
          <div style={{ fontSize: 9, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", marginTop: -2 }}>NEURAL FOCUS ENGINE</div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[["Methods", "#methods"], ["Study Modes", "#study-modes"], ["Subjects", "#subjects"], ["Pricing", "#pricing"]].map(([label, href]) => (
          <a key={label} href={href}
            style={{ color: "#64748B", fontSize: 14, fontFamily: "'Inter', sans-serif", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.01em" }}
            onMouseEnter={e => (e.currentTarget.style.color = COLORS.white)}
            onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
          >{label}</a>
        ))}
      </div>

      {/* CTA */}
      <a
        href={LEMON_URL} target="_blank" rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 12, color: "white", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: "none", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 30px rgba(99,102,241,0.3)", transition: "all 0.25s" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05)"; el.style.boxShadow = "0 0 50px rgba(99,102,241,0.5)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.boxShadow = "0 0 30px rgba(99,102,241,0.3)"; }}
      >
        <Crown size={14} /> Start Free Trial
      </a>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: COLORS.void }}>
      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Radial glow center */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Wave band */}
      <div style={{ position: "absolute", left: 0, right: 0, height: 180, top: "52%", transform: "translateY(-50%)" }}>
        <NeuralWave height={180} opacity={0.85} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", maxWidth: 960, margin: "0 auto" }}>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 18px", borderRadius: 999, marginBottom: 36, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#818CF8", letterSpacing: "0.08em" }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.indigo, animation: "glow-pulse 2s infinite" }} />
          NEURAL-PHASE LOCKED STUDY ENGINE · 2025
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.cyan, animation: "glow-pulse 2s infinite 0.5s" }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: 28, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span style={{ color: COLORS.white, display: "block" }}>Your Brain.</span>
          <span style={{ background: "linear-gradient(135deg, #6366F1 0%, #06B6D4 40%, #8B5CF6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block" }}>
            Peak State.
          </span>
          <span style={{ color: "#1E293B", display: "block", WebkitTextStroke: "1px rgba(99,102,241,0.3)" }}>Always.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontSize: 18, color: "#94A3B8", maxWidth: 620, marginBottom: 48, lineHeight: 1.75, fontFamily: "'Inter', sans-serif" }}
        >
          AIRA MENTOR locks your neural oscillations into deep focus using frequency entrainment,
          then guides you through any subject with Socratic AI — the teaching method that produced
          Plato, Newton, and every great thinker since antiquity.
        </motion.p>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.55, type: "spring", damping: 18 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
        >
          <div style={{ position: "relative" }}>
            {/* Pulse rings */}
            <div style={{ position: "absolute", inset: -12, borderRadius: 24, border: "1px solid rgba(99,102,241,0.3)", animation: "ring-pulse 2.5s infinite" }} />
            <div style={{ position: "absolute", inset: -24, borderRadius: 28, border: "1px solid rgba(99,102,241,0.15)", animation: "ring-pulse 2.5s infinite 0.5s" }} />

            <a
              href={LEMON_URL} target="_blank" rel="noopener noreferrer"
              style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, padding: "22px 48px", borderRadius: 18, color: "white", fontWeight: 700, fontSize: 18, textDecoration: "none", background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", boxShadow: "0 0 80px rgba(99,102,241,0.5), 0 0 160px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.15)", fontFamily: "'Space Grotesk', sans-serif", transition: "transform 0.25s, box-shadow 0.25s", letterSpacing: "-0.01em" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.04) translateY(-2px)"; el.style.boxShadow = "0 0 100px rgba(99,102,241,0.7), 0 0 200px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1) translateY(0)"; el.style.boxShadow = "0 0 80px rgba(99,102,241,0.5), 0 0 160px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            >
              <Play size={22} />
              Enter Flow State
              <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7, fontFamily: "'Inter', sans-serif" }}>— 5 days free</span>
            </a>
          </div>
          <p style={{ fontSize: 12, color: "#475569", fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em" }}>
            No credit card · Cancel anytime · Instant access
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }}
          style={{ display: "flex", alignItems: "center", gap: 48, marginTop: 72 }}
        >
          {[
            { val: 47, suffix: "min", label: "avg. flow session" },
            { val: 15, suffix: "+",   label: "subject tracks" },
            { val: 94, suffix: "%",   label: "retention lift" },
            { val: 3,  suffix: "×",   label: "recall speed" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </span>
              <span style={{ fontSize: 10, color: "#475569", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontSize: 10, color: "#334155", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)", animation: "scroll-line 2s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}

// ─── FLOW METHODS ─────────────────────────────────────────────────────────────
function MethodsSection() {
  const [active, setActive] = useState(0);
  const method = FLOW_METHODS[active];

  return (
    <section id="methods" style={{ padding: "120px 64px", background: COLORS.void, position: "relative", overflow: "hidden" }}>
      {/* BG wave */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 100, opacity: 0.3 }}>
        <NeuralWave height={100} opacity={0.4} />
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 11, color: COLORS.indigo, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>◈ The AIRA Protocol</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            6 methods to reach<br /><span style={{ color: "#334155" }}>flow state.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32, alignItems: "start" }}>
          {/* Method list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FLOW_METHODS.map((m, i) => {
              const Icon = m.icon;
              const isActive = active === i;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  onClick={() => setActive(i)}
                  style={{ padding: "16px 20px", borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all 0.25s", background: isActive ? `${m.color}12` : "rgba(8,8,20,0.4)", border: isActive ? `1px solid ${m.color}40` : "1px solid rgba(99,102,241,0.08)", boxShadow: isActive ? `0 0 30px ${m.color}12` : "none" }}
                  whileHover={{ x: 4 }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: isActive ? `${m.color}20` : "rgba(99,102,241,0.08)", flexShrink: 0 }}>
                    <Icon size={16} color={isActive ? m.color : "#475569"} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? COLORS.white : "#64748B", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2 }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: isActive ? m.color : "#334155", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>{m.subtitle}</div>
                  </div>
                  {isActive && <ChevronRight size={16} color={m.color} style={{ marginLeft: "auto" }} />}
                </motion.div>
              );
            })}
          </div>

          {/* Active method detail */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
              <GlassCard style={{ padding: 40, borderColor: `${method.color}25`, boxShadow: `0 0 60px ${method.color}10`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${method.color}, transparent)` }} />

                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: `${method.color}15`, border: `1px solid ${method.color}30`, marginBottom: 20 }}>
                  <span style={{ fontSize: 10, color: method.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{method.badge}</span>
                </div>

                <h3 style={{ fontSize: 26, fontWeight: 700, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 8, letterSpacing: "-0.02em" }}>{method.title}</h3>
                <p style={{ fontSize: 13, color: method.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em", marginBottom: 20 }}>{method.subtitle}</p>
                <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.75, fontFamily: "'Inter', sans-serif", marginBottom: 32 }}>{method.desc}</p>

                <div style={{ display: "flex", gap: 12 }}>
                  <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: `${method.color}15`, border: `1px solid ${method.color}30`, color: method.color, fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${method.color}25`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${method.color}15`}
                  >
                    Unlock This Method <ArrowRight size={14} />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── STUDY MODES (Augment-style selector) ─────────────────────────────────────
function StudyModesSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="study-modes" style={{ padding: "120px 64px", background: `linear-gradient(180deg, ${COLORS.void} 0%, #04040E 50%, ${COLORS.void} 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 11, color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>◈ Configure Your Session</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
            How do you want to study?
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, fontFamily: "'Inter', sans-serif", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Select a protocol before each session. AIRA adapts its pacing, question depth, and break reminders to your chosen mode.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {STUDY_MODES.map((mode, i) => {
            const Icon = mode.icon;
            const isSelected = selected === mode.id;
            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(isSelected ? null : mode.id)}
              >
                <GlassCard style={{ padding: 32, cursor: "pointer", borderColor: isSelected ? `${mode.color}40` : COLORS.border, background: isSelected ? `${mode.color}08` : COLORS.glass, boxShadow: isSelected ? `0 0 50px ${mode.color}12` : "none", transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
                  {isSelected && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${mode.color}, transparent)` }} />}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: isSelected ? `${mode.color}20` : "rgba(99,102,241,0.08)" }}>
                      <Icon size={22} color={isSelected ? mode.color : COLORS.muted} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, color: mode.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 6, background: `${mode.color}12`, border: `1px solid ${mode.color}25` }}>{mode.tag}</span>
                      {isSelected && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 20, height: 20, borderRadius: "50%", background: mode.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <CheckCircle2 size={12} color="white" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4, letterSpacing: "-0.02em" }}>{mode.title}</div>
                  <div style={{ fontSize: 13, color: mode.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 16, letterSpacing: "0.04em" }}>⏱ {mode.time}</div>
                  <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{mode.desc}</p>

                  {isSelected && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 20, padding: "10px 16px", borderRadius: 10, background: `${mode.color}12`, border: `1px solid ${mode.color}25`, display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={14} color={mode.color} />
                      <span style={{ fontSize: 13, color: mode.color, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Mode selected — Start your session to activate</span>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {selected && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginTop: 32 }}>
            <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", borderRadius: 14, color: "white", fontWeight: 600, fontSize: 16, textDecoration: "none", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 0 40px rgba(99,102,241,0.4)", fontFamily: "'Space Grotesk', sans-serif", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
            >
              <Play size={18} /> Start {STUDY_MODES.find(m => m.id === selected)?.title} Session
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── AMBIENT AUDIO ────────────────────────────────────────────────────────────
function AmbientSection() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section style={{ padding: "120px 64px", background: COLORS.void }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, color: COLORS.violet, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>◈ Neural Ambience Layer</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Sound that prepares your brain.
          </h2>
          <p style={{ fontSize: 15, color: COLORS.muted, fontFamily: "'Inter', sans-serif", maxWidth: 480, lineHeight: 1.7 }}>
            Copyright-free ambient tracks engineered to support neural entrainment. Each track is mixed with subtle phase-aligned modulations — not music, not silence, but a third thing.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {AMBIENT_TRACKS.map((track, i) => {
            const isPlaying = playing === track.id;
            return (
              <motion.div key={track.id} initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -3 }}>
                <GlassCard style={{ padding: 24, cursor: "pointer", borderColor: isPlaying ? `${track.color}40` : COLORS.border, background: isPlaying ? `${track.color}08` : COLORS.glass, transition: "all 0.25s" }}
                  onClick={() => setPlaying(isPlaying ? null : track.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: isPlaying ? `${track.color}20` : "rgba(99,102,241,0.08)" }}>
                      <Radio size={18} color={isPlaying ? track.color : COLORS.muted} />
                    </div>
                    <button style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${isPlaying ? track.color : "rgba(99,102,241,0.2)"}`, background: isPlaying ? `${track.color}20` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                      {isPlaying ? <Pause size={14} color={track.color} /> : <Play size={14} color={COLORS.muted} />}
                    </button>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>{track.label}</div>
                  <div style={{ fontSize: 11, color: track.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>{track.freq}</div>

                  {isPlaying && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: 3, marginTop: 14, alignItems: "flex-end", height: 20 }}>
                      {[...Array(8)].map((_, j) => (
                        <div key={j} style={{ flex: 1, background: track.color, borderRadius: 2, opacity: 0.7, animation: `equalizer ${0.4 + j * 0.1}s ease-in-out infinite alternate`, height: `${40 + Math.random() * 60}%` }} />
                      ))}
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <div style={{ marginTop: 24, padding: "16px 24px", borderRadius: 14, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
          <Lock size={14} color={COLORS.muted} />
          <span style={{ fontSize: 13, color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>Preview available free · Full uninterrupted sessions unlock with Pro</span>
          <a href={LEMON_URL} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: 13, color: COLORS.indigo, fontFamily: "'Inter', sans-serif", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            Unlock Pro <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── DEVICE DISCIPLINE ────────────────────────────────────────────────────────
function DeviceSection() {
  return (
    <section style={{ padding: "100px 64px", background: `linear-gradient(180deg, ${COLORS.void}, #030309)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p style={{ fontSize: 11, color: COLORS.emerald, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>◈ Environment Protocol</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
            The devices will<br />destroy your session.
          </h2>
          <p style={{ fontSize: 15, color: COLORS.muted, fontFamily: "'Inter', sans-serif", lineHeight: 1.75, marginBottom: 32 }}>
            Research shows a single notification — even one you ignore — degrades cognitive performance for up to 23 minutes. AIRA enforces a pre-session environment protocol every time.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            {DEVICE_RULES.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div key={rule.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <GlassCard style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: `${rule.color}12`, flexShrink: 0 }}>
                      <Icon size={16} color={rule.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 2 }}>{rule.label}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>{rule.desc}</div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <GlassCard style={{ padding: 40, borderColor: "rgba(16,185,129,0.2)", boxShadow: "0 0 60px rgba(16,185,129,0.06)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, #10B981, transparent)" }} />
            <div style={{ fontSize: 11, color: COLORS.emerald, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Session Type</div>

            {[
              { label: "Online Study", icon: Wifi,    color: COLORS.cyan,    desc: "AI mentor active, real-time feedback, cloud sync enabled" },
              { label: "Device-Free",  icon: WifiOff, color: COLORS.emerald, desc: "Offline notes, no screens — full analog deep work mode" },
            ].map((opt, i) => {
              const Icon = opt.icon;
              return (
                <div key={opt.label} style={{ padding: "18px 20px", borderRadius: 14, border: `1px solid ${i === 0 ? opt.color + "40" : "rgba(99,102,241,0.1)"}`, background: i === 0 ? `${opt.color}08` : "transparent", marginBottom: 12, cursor: "pointer", transition: "all 0.25s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <Icon size={18} color={opt.color} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif" }}>{opt.label}</span>
                    {i === 0 && <span style={{ marginLeft: "auto", fontSize: 10, color: opt.color, fontFamily: "'JetBrains Mono', monospace", padding: "2px 8px", borderRadius: 6, background: `${opt.color}15`, border: `1px solid ${opt.color}30` }}>SELECTED</span>}
                  </div>
                  <p style={{ fontSize: 13, color: COLORS.muted, fontFamily: "'Inter', sans-serif" }}>{opt.desc}</p>
                </div>
              );
            })}

            <div style={{ marginTop: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", display: "flex", alignItems: "center", gap: 10 }}>
              <BatteryFull size={14} color={COLORS.emerald} />
              <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'Inter', sans-serif" }}>AIRA adapts its behavior to your selected session type</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SUBJECTS ─────────────────────────────────────────────────────────────────
function SubjectsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="subjects" style={{ padding: "120px 64px", background: COLORS.void }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 11, color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>◈ Subject Tracks</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              15 disciplines.<br /><span style={{ color: "#1E293B" }}>One engine.</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: COLORS.muted, maxWidth: 300, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Each track ships with a subject-specific frequency profile, pre-calibrated question depth, and topic graph for spaced retrieval.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {SUBJECTS.map((s, i) => {
            const Icon = s.icon;
            const isHov = hovered === i;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.04 }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                <GlassCard style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", borderColor: isHov ? `${s.color}40` : "rgba(99,102,241,0.08)", background: isHov ? `${s.color}08` : COLORS.glass, transition: "all 0.25s", position: "relative", overflow: "hidden" }}>
                  {isHov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />}
                  <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: isHov ? `${s.color}18` : "rgba(99,102,241,0.08)", transition: "all 0.25s" }}>
                    <Icon size={20} color={isHov ? s.color : COLORS.muted} />
                  </div>
                  <span style={{ fontSize: 12, color: isHov ? COLORS.white : "#64748B", textAlign: "center", lineHeight: 1.3, fontFamily: "'Inter', sans-serif", fontWeight: isHov ? 500 : 400, transition: "all 0.25s" }}>{s.label}</span>
                  {isHov && <span style={{ fontSize: 10, color: s.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>{s.freq}</span>}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section id="pricing" style={{ padding: "120px 64px", background: COLORS.void, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 11, color: COLORS.violet, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>◈ Simple Pricing</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: COLORS.white, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Everything.<br /><span style={{ color: "#1E293B" }}>One plan.</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <GlassCard style={{ padding: 48, position: "relative", overflow: "hidden", borderColor: "rgba(99,102,241,0.35)", boxShadow: "0 0 100px rgba(99,102,241,0.12), 0 0 200px rgba(139,92,246,0.06)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #6366F1, #06B6D4, #8B5CF6, transparent)" }} />

            {/* Price header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
              <div>
                <div style={{ fontSize: 11, color: COLORS.indigo, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Pro Plan</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ fontSize: 60, fontWeight: 800, color: COLORS.white, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.04em" }}>$9</span>
                  <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.white, lineHeight: 1.2, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>.99</span>
                  <span style={{ fontSize: 14, color: COLORS.muted, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>/ month</span>
                </div>
              </div>
              <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: COLORS.indigo, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", fontWeight: 700 }}>5 DAYS</div>
                <div style={{ fontSize: 10, color: "#475569", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}>FREE TRIAL</div>
              </div>
            </div>

            {/* Features */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 11, marginBottom: 36 }}>
              {PRO_FEATURES.map((f, i) => (
                <motion.div key={f} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <CheckCircle2 size={15} color={COLORS.indigo} style={{ marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#CBD5E1", fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>{f}</span>
                </motion.div>
              ))}
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)", marginBottom: 28 }} />

            {/* CTA */}
            <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", padding: "18px 0", borderRadius: 14, color: "white", fontWeight: 700, fontSize: 17, textDecoration: "none", background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", boxShadow: "0 0 50px rgba(99,102,241,0.35)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.02) translateY(-2px)"; el.style.boxShadow = "0 0 70px rgba(99,102,241,0.55)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1) translateY(0)"; el.style.boxShadow = "0 0 50px rgba(99,102,241,0.35)"; }}
            >
              <Play size={18} /> Start 5-Day Free Trial <ArrowRight size={16} />
            </a>
            <p style={{ textAlign: "center", fontSize: 12, color: "#334155", marginTop: 14, fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
              No charge until day 6 · Cancel anytime · Instant access to all features
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ padding: "120px 64px", background: COLORS.void, position: "relative", overflow: "hidden" }}>
      <ParticleField />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 28 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={COLORS.indigo} color={COLORS.indigo} />)}
            <span style={{ fontSize: 13, color: COLORS.muted, marginLeft: 10, fontFamily: "'Inter', sans-serif" }}>"Changed how I study forever." — Beta user</span>
          </div>

          <h2 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, color: COLORS.white, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
            Your mind was built<br />
            <span style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              for this.
            </span>
          </h2>

          <p style={{ fontSize: 18, color: "#64748B", marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Five days. Full access. No card. Decide with your own eyes whether AIRA MENTOR belongs in your stack.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <a href={LEMON_URL} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "22px 56px", borderRadius: 20, color: "white", fontWeight: 800, fontSize: 20, textDecoration: "none", background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)", boxShadow: "0 0 100px rgba(99,102,241,0.5), 0 0 200px rgba(139,92,246,0.2)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em", transition: "all 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.05) translateY(-4px)"; el.style.boxShadow = "0 0 120px rgba(99,102,241,0.7), 0 0 240px rgba(139,92,246,0.3)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1) translateY(0)"; el.style.boxShadow = "0 0 100px rgba(99,102,241,0.5), 0 0 200px rgba(139,92,246,0.2)"; }}
            >
              <Zap size={22} /> Enter Flow State Now
            </a>
            <p style={{ fontSize: 12, color: "#1E293B", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
              NO CARD · 5 DAYS FREE · CANCEL ANYTIME
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "36px 64px", borderTop: "1px solid rgba(99,102,241,0.1)", background: "#020205", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
          <Brain size={13} color="white" />
        </div>
        <span style={{ color: "#334155", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>AIRA<span style={{ color: COLORS.indigo }}>·</span>MENTOR</span>
      </div>
      <p style={{ fontSize: 12, color: "#1E293B", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>© {new Date().getFullYear()} AIRA MENTOR — NEURAL FOCUS ENGINE</p>
      <div style={{ display: "flex", gap: 24 }}>
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a key={l} href="#" style={{ fontSize: 12, color: "#1E293B", textDecoration: "none", fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#64748B")}
            onMouseLeave={e => (e.currentTarget.style.color = "#1E293B")}
          >{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────────────────────
export default function Page() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #020205; color: #F8FAFC; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020205; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#6366F1, #8B5CF6); border-radius: 2px; }
        ::selection { background: rgba(99,102,241,0.35); color: white; }
        @keyframes glow-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
          50% { opacity: 0.5; box-shadow: 0 0 12px currentColor; }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.12); opacity: 0; }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        @keyframes equalizer {
          from { height: 20%; }
          to { height: 100%; }
        }
        @media (max-width: 900px) {
          nav { padding: 14px 20px !important; }
          nav > div:nth-child(2) { display: none !important; }
          section { padding: 80px 20px !important; }
          footer { padding: 28px 20px !important; }
          h1 { font-size: clamp(44px, 12vw, 72px) !important; }
        }
      `}</style>

      <AnimatePresence>
        {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <HeroSection />
        <MethodsSection />
        <StudyModesSection />
        <AmbientSection />
        <DeviceSection />
        <SubjectsSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
