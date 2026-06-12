import React, { useState, useEffect } from 'react';
import { 
  Brain, Zap, Play, Pause, Headphones, Target, ArrowRight, 
  ShieldCheck, Sparkles, Activity, Clock, Waves, 
  CheckCircle2, Lock, Unlock, Menu, X, ChevronRight,
  BarChart3, BrainCircuit, Lightbulb
} from 'lucide-react';

const AiraMentorMasterpiece = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const checkoutUrl = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

  useEffect(( ) => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-[#E2E8F0] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Animated Background Waves (Brain.fm Aesthetic) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg' )] opacity-20 brightness-100 contrast-150" />
      </div>

      {/* Premium Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl">
                <Brain className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-white">AIRA MENTOR</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">Neural Focus Engine</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {['Science', 'Technology', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-gray-400 hover:text-white transition-all hover:tracking-widest uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-sm font-black text-white/70 hover:text-white transition-colors tracking-widest">LOG IN</button>
            <a href={checkoutUrl} className="relative group overflow-hidden px-8 py-3.5 rounded-full bg-white text-black font-black text-sm tracking-widest hover:scale-105 transition-all">
              <span className="relative z-10">TRY FREE</span>
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section: The Focus Core */}
      <section className="relative pt-60 pb-40 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 mb-12 animate-bounce-slow">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-black tracking-[0.4em] uppercase text-blue-300">Unlock 100% Neural Capacity</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black mb-12 tracking-tighter leading-[0.85] text-white">
            MASTER YOUR   

            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">FLOW STATE.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium italic">
            "Aira Mentor uses AI-generated neural patterns to sync your brain for deep focus, combined with a Socratic study guide that ensures you never forget what you learn."
          </p>

          {/* Central Focus Trigger (Brain.fm Inspired) */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />
            <a href={checkoutUrl} className="group relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute inset-4 border border-blue-400/20 rounded-full group-hover:rotate-180 transition-transform duration-1000" />
              <div className="relative w-36 h-36 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.6)] group-hover:scale-110 transition-all duration-500">
                <Play className="w-16 h-16 text-white fill-current ml-2" />
              </div>
            </a>
            <div className="mt-10 text-center">
              <p className="text-lg font-black tracking-[0.5em] text-blue-400 uppercase mb-2">Initialize Session</p>
              <p className="text-sm text-gray-500 font-mono">Neural Phase Locking: READY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Neural Tech */}
      <section id="science" className="py-40 px-8 bg-[#04040A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none text-white">
                SCIENCE   
 <span className="text-blue-600">MEETS STUDY.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Traditional study methods are passive. Aira Mentor is active. Our AI Assistant monitors your cognitive rhythm and adjusts the mentoring pace to keep you in the "Challenge-Skill" sweet spot of flow.
              </p>
              
              <div className="space-y-8">
                <FeatureRow 
                  icon={<Waves className="text-blue-500" />} 
                  title="Neural-Phase Locking" 
                  desc="Syncs your brain waves to specific frequencies designed for deep cognitive absorption."
                />
                <FeatureRow 
                  icon={<BrainCircuit className="text-purple-500" />} 
                  title="Socratic AI Mentor" 
                  desc="An AI that asks the right questions to lead you to deep understanding, not just memorization."
                />
                <FeatureRow 
                  icon={<Activity className="text-green-500" />} 
                  title="Real-time Adaptation" 
                  desc="Detects mental fatigue and adjusts study complexity to maintain maximum productivity."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <StatCard label="Focus Increase" value="400%" />
              <StatCard label="Retention Rate" value="92%" />
              <StatCard label="Time to Flow" value="<12m" />
              <StatCard label="Daily Active" value="50k+" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing: The "No-Brainer" Offer */}
      <section id="pricing" className="py-40 px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black mb-6 text-white uppercase tracking-tighter">Choose Your Mindset.</h2>
            <p className="text-xl text-gray-400">Join thousands of high-performers mastering their flow.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Free Plan */}
            <div className="p-12 rounded-[3rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest text-gray-400">Explorer</h3>
              <div className="text-6xl font-black mb-10 text-white">$0</div>
              <ul className="space-y-6 mb-12">
                {['3 Focus Sessions / Day', 'Basic AI Mentoring', 'Standard Subjects'].map(feat => (
                  <li key={feat} className="flex items-center gap-4 text-gray-400 font-bold text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-gray-600" /> {feat}
                  </li>
                ))}
              </ul>
              <a href={checkoutUrl} className="block w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-center hover:bg-white/10 transition-all uppercase tracking-widest">
                Start Free
              </a>
            </div>

            {/* Pro Plan (Brain.fm Blue) */}
            <div className="p-12 rounded-[3rem] bg-blue-600 border-2 border-blue-400 shadow-[0_0_80px_rgba(37,99,235,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-8 py-3 bg-white text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] transform rotate-0">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-widest text-blue-100">Neural Pro</h3>
              <div className="text-7xl font-black mb-10 text-white">$9.99<span className="text-xl opacity-60">/mo</span></div>
              <ul className="space-y-6 mb-12">
                {[
                  'Unlimited Flow Sessions',
                  'Full Socratic AI Mentor',
                  'Neural Analytics Dashboard',
                  'All 15+ Advanced Subjects',
                  'Priority AI Response'
                ].map(feat => (
                  <li key={feat} className="flex items-center gap-4 text-white font-bold text-sm uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-blue-200" /> {feat}
                  </li>
                ))}
              </ul>
              <a href={checkoutUrl} className="block w-full py-6 rounded-2xl bg-white text-blue-600 font-black text-center text-xl hover:scale-[1.03] transition-transform shadow-2xl uppercase tracking-widest">
                Start 5-Day Trial
              </a>
              <p className="mt-6 text-center text-blue-100/60 text-[10px] font-bold uppercase tracking-widest">
                No credit card required to start
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer: Minimal & Dark */}
      <footer className="py-32 px-8 border-t border-white/5 bg-[#010103]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-black tracking-tighter text-white uppercase">AIRA MENTOR</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left font-medium">
              Revolutionizing the way humanity learns through AI and neuroscience.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
            <FooterColumn title="Product" links={['Science', 'Pricing', 'Dashboard']} />
            <FooterColumn title="Legal" links={['Privacy', 'Terms', 'Security']} />
            <FooterColumn title="Social" links={['Twitter', 'Discord', 'LinkedIn']} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 AIRA MENTOR. MADE IN TURKEY 🇹🇷</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <Activity className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureRow = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-6 group">
    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-7 h-7' })}
    </div>
    <div>
      <h4 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{title}</h4>
      <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

const StatCard = ({ label, value }: { label: string, value: string }) => (
  <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 text-center hover:scale-105 transition-transform">
    <div className="text-4xl font-black text-white mb-2">{value}</div>
    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">{label}</div>
  </div>
);

const FooterColumn = ({ title, links }: { title: string, links: string[] }) => (
  <div className="flex flex-col gap-6">
    <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">{title}</h5>
    <ul className="flex flex-col gap-4">
      {links.map(link => (
        <li key={link} className="text-sm font-bold text-gray-500 hover:text-white transition-colors cursor-pointer tracking-wider uppercase">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

export default AiraMentorMasterpiece;
