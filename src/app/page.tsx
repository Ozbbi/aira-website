"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Zap, Play, CheckCircle2, Sparkles, Cpu, 
  Code2, Calculator, Scale, Atom, FlaskConical, 
  Microscope, TrendingUp, BookOpen, Globe, 
  Languages, Music, PenTool, History, Star,
  Activity, Clock, Waves, ShieldCheck, BrainCircuit, Lightbulb,
  Headphones, Lock, Unlock, BarChart3, ArrowRight
} from "lucide-react";

const LEMON_URL = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const SUBJECTS = [
  { icon: Cpu, label: "AI & Prompts", desc: "Master LLMs and Neural Networks." },
  { icon: Code2, label: "Software Engineering", desc: "Systems, architecture, and code." },
  { icon: Calculator, label: "Mathematics", desc: "From Calculus to Linear Algebra." },
  { icon: Scale, label: "Law & Ethics", desc: "Legal frameworks and AI ethics." },
  { icon: Brain, label: "Philosophy", color: "#00B4D8", desc: "Logic and the Socratic method." },
  { icon: Atom, label: "Physics", color: "#7C3AED", desc: "Quantum and classical dynamics." },
  { icon: FlaskConical, label: "Chemistry", color: "#3D5AFE", desc: "Molecular structures and reactions." },
  { icon: Microscope, label: "Biology", color: "#00B4D8", desc: "Genetics and biotechnology." },
  { icon: TrendingUp, label: "Economics", color: "#7C3AED", desc: "Macro trends and game theory." },
  { icon: BookOpen, label: "Literature", color: "#3D5AFE", desc: "Critical analysis of world classics." },
  { icon: Globe, label: "World History", color: "#00B4D8", desc: "The rise and fall of civilizations." },
  { icon: Languages, label: "Linguistics", color: "#7C3AED", desc: "Structure and evolution of language." },
  { icon: Music, label: "Music Theory", color: "#3D5AFE", desc: "Harmony and acoustic science." },
  { icon: PenTool, label: "Design & UX", color: "#00B4D8", desc: "Human-centered visual systems." },
  { icon: History, label: "Ancient Civilizations", color: "#7C3AED", desc: "Unlocking secrets of the past." },
];

export default function AiraMentorUltimate( ) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-[#E2E8F0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tighter leading-none text-white uppercase">AIRA MENTOR</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">Neural Focus Engine</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <a href={LEMON_URL} className="px-8 py-3.5 rounded-full bg-white text-black font-black text-sm tracking-widest hover:scale-105 transition-all uppercase shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              TRY FREE
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-60 pb-40 px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 mb-12">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black tracking-[0.4em] uppercase text-blue-300">Neural-Phase Locked Engine v2.4</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter leading-[0.85] text-white uppercase">
            MASTER YOUR   

            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">FLOW STATE.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed italic font-medium">
            "AIRA MENTOR locks your brain into deep focus using neural-phase audio, then guides you through any subject with Socratic AI mentoring."
          </p>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-col items-center justify-center">
            <a href={LEMON_URL} className="w-48 h-48 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:scale-110 transition-all relative group">
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
              <Play className="w-16 h-16 text-white fill-current ml-2" />
            </a>
            <p className="mt-10 text-center text-lg font-black tracking-[0.5em] text-blue-400 uppercase">Initialize Session</p>
          </motion.div>
        </div>
      </section>

      {/* Science Section */}
      <section className="py-40 px-8 bg-[#04040A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-6">Built on science. Not vibes.</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { tag: "Neuroscience", title: "Neural-Phase Locking", body: "Audio frequencies that entrain your neural network into a sustained flow state.", icon: Zap },
            { tag: "Pedagogy", title: "Socratic AI Method", body: "AIRA never lectures. It interrogates, leading you to answers through deep questioning.", icon: BrainCircuit },
            { tag: "Technology", title: "Cognitive Load Balancing", body: "AI monitors your mental fatigue and adjusts complexity to keep you in the zone.", icon: Activity }
          ].map((card, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all group text-left">
              <card.icon className="w-8 h-8 text-blue-500 mb-6" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 block">{card.tag}</span>
              <h3 className="text-2xl font-bold mb-6 text-white uppercase">{card.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-40 px-8">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-6xl font-black text-white uppercase tracking-tighter mb-6">Subject Tracks</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group flex items-start gap-6 text-left">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-all">
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white uppercase mb-2 group-hover:text-blue-400 transition-colors">{s.label}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed font-medium">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-40 px-8 bg-[#04040A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-16 text-white uppercase tracking-tighter">Simple Pricing.</h2>
          <div className="p-12 md:p-20 rounded-[4rem] bg-blue-600 border-2 border-blue-400 shadow-[0_0_100px_rgba(37,99,235,0.3)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 px-10 py-4 bg-white text-blue-600 text-[10px] font-black uppercase tracking-[0.5em]">RECOMMENDED</div>
            <h3 className="text-3xl font-black mb-4 uppercase text-blue-100 tracking-widest">Neural Pro</h3>
            <div className="text-8xl font-black mb-10 text-white tracking-tighter">$9.99<span className="text-xl opacity-60 font-bold uppercase tracking-widest ml-2">/mo</span></div>
            <ul className="grid sm:grid-cols-2 gap-4 mb-12 text-left max-w-md mx-auto">
              {['Unlimited Flow Sessions', 'Full Socratic AI Mentor', '5-Day Free Trial', 'Neural Analytics'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle2 className="w-4 h-4 text-blue-200" /> {f}
                </li>
              ))}
            </ul>
            <a href={LEMON_URL} className="block w-full py-8 rounded-3xl bg-white text-blue-600 font-black text-center text-2xl hover:scale-105 transition-all uppercase tracking-widest shadow-2xl">
              Start 5-Day Trial
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 border-t border-white/5 text-center bg-[#010103]">
        <div className="flex flex-col items-center gap-12">
          <div className="flex items-center gap-4">
            <Brain className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-black tracking-tighter text-white uppercase text-left">AIRA MENTOR</span>
          </div>
          <p className="text-gray-800 text-[10px] font-black uppercase tracking-[0.6em]">© 2026 AIRA MENTOR. MADE IN TURKEY 🇹🇷</p>
        </div>
      </footer>
    </div>
  );
}
