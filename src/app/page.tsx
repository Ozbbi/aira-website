"use client";

import React from "react";
import { Brain, Sparkles, Play, CheckCircle2 } from "lucide-react";

export default function Page() {
  const checkoutUrl = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center p-8 font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Navbar Style Header */}
      <div className="absolute top-0 w-full p-8 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3">
          <Brain className="w-10 h-10 text-blue-500" />
          <span className="text-2xl font-black tracking-tighter uppercase">AIRA MENTOR</span>
        </div>
        <a href={checkoutUrl} className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest">Try Free</a>
      </div>

      {/* Hero */}
      <div className="text-center mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-300">Neural Focus v2.4</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none uppercase">
          MASTER YOUR   
 <span className="text-blue-600">FLOW STATE.</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 italic leading-relaxed">
          "AIRA MENTOR uses neural-phase audio to lock your brain into deep focus, then guides you through any subject."
        </p>

        <div className="flex flex-col items-center gap-6">
          <a href={checkoutUrl} className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.4 )] hover:scale-110 transition-all group">
            <Play className="w-12 h-12 text-white fill-current ml-1" />
          </a>
          <span className="text-xs font-bold tracking-[0.5em] text-blue-400 uppercase">Initialize Session</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {['Unlimited Flow', 'Socratic AI', '15+ Subjects'].map((f) => (
          <div key={f} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors">
            <CheckCircle2 className="w-6 h-6 text-blue-500 mx-auto mb-4" />
            <h3 className="font-black uppercase tracking-widest text-xs text-white">{f}</h3>
          </div>
        ))}
      </div>

      <footer className="mt-40 opacity-30">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase">© 2026 AIRA MENTOR. 🇹🇷</p>
      </footer>
    </div>
  );
}

