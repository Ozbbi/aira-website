import React from 'react';
import { 
  Brain, Zap, Target, BookOpen, 
  Code, LineChart, Globe, FlaskConical, 
  Scale, Briefcase, HeartPulse, Palette,
  CheckCircle2, ArrowRight, Star, GraduationCap,
  Clock, Flame, MousePointer2
} from 'lucide-react';

const AiraMentorLanding = () => {
  // YOUR ACTUAL LEMON SQUEEZY CHECKOUT URL
  const checkoutUrl = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">AIRA MENTOR</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <a href="#flow" className="hover:text-white transition-colors">Flow State</a>
            <a href="#guide" className="hover:text-white transition-colors">Study Guide</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <a href={checkoutUrl} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-black hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
            GET PRO ACCESS
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops ))] from-purple-900/20 via-transparent to-transparent -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">Master Your Mind with AI</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
            ENTER THE  
<span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">FLOW STATE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
            AIRA MENTOR is the world's first AI Study Guide designed to trigger deep focus. Learn complex topics 5x faster with science-backed neuro-feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={checkoutUrl} className="group w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-black text-xl hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-3">
              Start Your 5-Day Trial <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#flow" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-black text-xl hover:bg-white/10 transition-colors text-center">
              Explore Science
            </a>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-gray-500 font-bold text-sm uppercase tracking-widest">
            <span>⚡ Instant Flow</span>
            <span>🧠 Deep Learning</span>
            <span>🎯 100% Focus</span>
          </div>
        </div>
      </section>

      {/* Flow State Section */}
      <section id="flow" className="py-32 px-6 border-y border-white/5 bg-[#0D0D14]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 leading-tight">The Science of  
Deep Work.</h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              AIRA MENTOR doesn't just give answers. It uses the **Socratic Method** to guide your brain into a state of deep absorption where time disappears and learning becomes effortless.
            </p>
            <div className="grid gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-5">
                <Clock className="w-10 h-10 text-purple-500 shrink-0" />
                <div>
                  <h4 className="font-black text-xl mb-2">Eliminate Distractions</h4>
                  <p className="text-gray-500">Our AI identifies your cognitive load and adjusts the teaching pace to keep you in the "Challenge-Skill" sweet spot.</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-5">
                <Target className="w-10 h-10 text-pink-500 shrink-0" />
                <div>
                  <h4 className="font-black text-xl mb-2">Active Study Guide</h4>
                  <p className="text-gray-500">Stop passive reading. AIRA generates dynamic study paths that force your brain to retrieve and connect information.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-white/20 to-transparent">
              <div className="bg-[#0A0A0F] rounded-[2.3rem] p-12 aspect-square flex flex-col items-center justify-center text-center">
                <Brain className="w-32 h-32 text-purple-500 mb-8 animate-pulse" />
                <h3 className="text-3xl font-black mb-4 italic">NEURAL SYNC ACTIVE</h3>
                <p className="text-gray-500 font-mono text-sm uppercase tracking-tighter">Monitoring focus levels... 98% Optimized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-6">Unlock Your Potential.</h2>
          <p className="text-xl text-gray-400 mb-20">No complicated tiers. One price for everything you need to master any subject.</p>
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Free Card */}
            <div className="p-10 rounded-[2.5rem] bg-[#1A1A24] border border-white/5 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Explorer</h3>
              <div className="text-5xl font-black mb-8">$0<span className="text-lg text-gray-500 font-medium">/mo</span></div>
              <ul className="text-left space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle2 className="w-5 h-5 text-gray-600" /> 3 AI Sessions per day</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Basic Study Guide</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle2 className="w-5 h-5 text-gray-600" /> Community Access</li>
              </ul>
              <a href={checkoutUrl} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-lg hover:bg-white/10 transition-colors text-center">
                Start Free Trial
              </a>
            </div>

            {/* Pro Card */}
            <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-[#1A1A24] to-[#0A0A0F] border-2 border-purple-500 shadow-2xl shadow-purple-500/30 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 px-8 py-2 bg-purple-500 text-[10px] font-black uppercase tracking-[0.3em]">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Aira Pro</h3>
              <div className="text-5xl font-black mb-8">$9.99<span className="text-lg text-gray-500 font-medium">/mo</span></div>
              <ul className="text-left space-y-4 mb-10 flex-grow font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-500" /> Unlimited AI Flow Sessions</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-500" /> All 15+ Subject Blueprints</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-500" /> Advanced Neuro-Analytics</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-500" /> Spaced Repetition Engine</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-500" /> 5-Day Full Pro Trial</li>
              </ul>
              <a href={checkoutUrl} className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-black text-xl hover:scale-[1.02] transition-transform shadow-xl shadow-purple-500/20 text-center">
                Go Pro Now
              </a>
            </div>
          </div>
          <p className="mt-12 text-gray-500 font-bold uppercase tracking-widest text-xs italic">
            "The best $9.99 you'll ever spend on your education."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-black italic tracking-tighter">AIRA MENTOR</span>
          </div>
          <div className="flex gap-12 text-sm font-bold text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-600 text-xs font-bold">© 2026 AIRA MENTOR. BUILT FOR PEAK PERFORMANCE. 🇹🇷</p>
        </div>
      </footer>
    </div>
  );
};

export default AiraMentorLanding;
