import React from 'react';
import { 
  Brain, Zap, Target, BookOpen, 
  Code, LineChart, Globe, FlaskConical, 
  Scale, Briefcase, HeartPulse, Palette,
  CheckCircle2, ArrowRight, Star, GraduationCap
} from 'lucide-react';

const AiraMentorLanding = () => {
  // REPLACE THE LINK BELOW WITH YOUR ACTUAL LEMON SQUEEZY CHECKOUT URL
  const checkoutUrl = "YOUR_LEMON_SQUEEZY_CHECKOUT_URL_HERE";

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight uppercase">AIRA MENTOR</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#subjects" className="hover:text-white transition-colors">Subjects</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <a href={checkoutUrl} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all">
            Start Free Trial
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase">AIRA MENTOR · AI STUDY PLATFORM</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
            Study with AI.  
Learn anything.
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            AIRA MENTOR is your personal AI tutor. Pick any topic, and AIRA MENTOR teaches you step by step, tests your understanding, and tracks your progress — 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={checkoutUrl} className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20 text-center">
              Start 5-Day Free Trial
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition-colors text-center">
              See How it Works
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required · Cancel anytime · Full Pro access
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Three steps. Start learning in 60 seconds.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#1A1A24] border border-white/5">
              <div className="text-purple-500 text-4xl font-black mb-4">01</div>
              <h3 className="text-xl font-bold mb-4">Pick your topic</h3>
              <p className="text-gray-400">Choose from 15+ categories or type any custom topic you want to master.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#1A1A24] border border-white/5">
              <div className="text-pink-500 text-4xl font-black mb-4">02</div>
              <h3 className="text-xl font-bold mb-4">AI teaches you</h3>
              <p className="text-gray-400">Your personal AI tutor explains concepts step by step, using the Socratic method.</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#1A1A24] border border-white/5">
              <div className="text-amber-500 text-4xl font-black mb-4">03</div>
              <h3 className="text-xl font-bold mb-4">Get tested & tracked</h3>
              <p className="text-gray-400">Complete quizzes to check understanding. AIRA MENTOR tracks your progress automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Grid */}
      <section id="subjects" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">15 Subject Categories</h2>
            <p className="text-gray-400">From school subjects to professional skills. AIRA MENTOR covers what you need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((subject, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#1A1A24] border border-white/5 hover:border-purple-500/50 transition-all group">
                <subject.icon className="w-8 h-8 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-2">{subject.title}</h3>
                <p className="text-sm text-gray-500">{subject.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-4">$10/month. Everything.</h2>
          <p className="text-gray-400 mb-16 text-lg">One plan. No tiers. No confusion. Just deep learning.</p>
          
          <div className="p-12 rounded-3xl bg-[#1A1A24] border-2 border-purple-500 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-6 py-2 bg-purple-500 text-xs font-bold uppercase tracking-widest">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
            <div className="text-6xl font-black mb-6">$10<span className="text-xl text-gray-500">/mo</span></div>
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Unlimited AI tutor sessions</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> All 15 subject categories</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Full progress tracking + analytics</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> Spaced repetition system</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> 5-Day Free Trial</li>
            </ul>
            <a href={checkoutUrl} className="block w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-black text-xl hover:scale-[1.02] transition-transform text-center">
              Start 5-Day Free Trial
            </a>
            <p className="mt-4 text-sm text-gray-500">Private tutors cost $100/hr. AIRA MENTOR is $10/mo.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            <span className="text-lg font-bold">AIRA MENTOR</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 AIRA MENTOR. Built with care. 🇹🇷</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const subjects = [
  { icon: Brain, title: "AI & Prompts", desc: "Master ChatGPT, Claude, Gemini." },
  { icon: Code, title: "Programming", desc: "Python, JS, Web Dev, Algorithms." },
  { icon: Target, title: "Mathematics", desc: "Algebra, Calculus, Statistics." },
  { icon: Globe, title: "Languages", desc: "Grammar, Speaking, Writing." },
  { icon: LineChart, title: "Data Science", desc: "Analysis, Visualization, ML." },
  { icon: Briefcase, title: "Business", desc: "Strategy, Startups, Operations." },
  { icon: HeartPulse, title: "Health", desc: "Biology, Nutrition, Medicine." },
  { icon: FlaskConical, title: "Chemistry", desc: "Reactions, Atomic Structure." },
  { icon: Zap, title: "Physics", desc: "Mechanics, Quantum Basics." },
  { icon: Scale, title: "Law", desc: "Legal Fundamentals, Contracts." },
  { icon: Palette, title: "Philosophy", desc: "Logic, Ethics, Reasoning." },
  { icon: BookOpen, title: "History", desc: "World History, Politics." },
  { icon: Star, title: "Psychology", desc: "Behavior, Cognitive Science." },
  { icon: LineChart, title: "Finance", desc: "Investing, Economics." },
  { icon: Target, title: "Marketing", desc: "SEO, Digital Growth." }
];

export default AiraMentorLanding;

