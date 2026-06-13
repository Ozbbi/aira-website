"use client";

import React, { useState, useEffect } from 'react';
import { 
  Brain, Zap, Play, Pause, Headphones, Target, ArrowRight, 
  ShieldCheck, Sparkles, Activity, Clock, Waves, 
  CheckCircle2, Lock, Unlock, Menu, X, ChevronRight,
  BarChart3, BrainCircuit, Lightbulb
} from 'lucide-react';

export default function AiraMentorMasterpiece() {
  const [isScrolled, setIsScrolled] = useState(false);
  const checkoutUrl = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

  useEffect(( ) => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-[#E2E8F0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Waves */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-white uppercase">AIRA MENTOR</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">Neural Focus</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href={checkoutUrl} className="px-8 py-3.5 rounded-full bg-white text-black font-black text-sm tracking-widest hover:scale-105 transition-all uppercase">
              TRY FREE
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-60 pb-40 px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl md:text-[8rem] font-black mb-12 tracking-tighter leading-[0.85] text-white uppercase">
            MASTER YOUR   

            <span className="text-blue-500">FLOW STATE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed italic">
            "Aira Mentor uses AI-generated neural patterns to sync your brain for deep focus."
          </p>
          <div className="flex justify-center">
            <a href={checkoutUrl} className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] hover:scale-110 transition-all">
              <Play className="w-12 h-12 text-white fill-current ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-40 px-8 bg-[#04040A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-16 text-white uppercase">Choose Your Mindset</h2>
          <div className="p-12 rounded-[3rem] bg-blue-600 border-2 border-blue-400 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 uppercase text-blue-100">Neural Pro</h3>
            <div className="text-7xl font-black mb-10 text-white">$9.99<span className="text-xl opacity-60">/mo</span></div>
            <ul className="space-y-4 mb-12 text-left max-w-xs mx-auto">
              <li className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs"><CheckCircle2 className="w-5 h-5" /> Unlimited Flow</li>
              <li className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs"><CheckCircle2 className="w-5 h-5" /> Socratic AI Mentor</li>
              <li className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs"><CheckCircle2 className="w-5 h-5" /> 5-Day Free Trial</li>
            </ul>
            <a href={checkoutUrl} className="block w-full py-6 rounded-2xl bg-white text-blue-600 font-black text-center text-xl hover:scale-105 transition-all uppercase tracking-widest">
              Start Trial
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-gray-600 text-xs font-black tracking-[0.5em] uppercase">© 2026 AIRA MENTOR. 🇹🇷</p>
      </footer>
    </div>
  );
}
