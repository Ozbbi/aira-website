
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Brain, Zap, Play, CheckCircle2, Sparkles, Cpu,
  Code2, Calculator, Scale, Atom, FlaskConical,
  Microscope, TrendingUp, BookOpen, Globe,
  Languages, Music, PenTool, History, Star,
  Activity, Clock, Waves, ShieldCheck, BrainCircuit, Lightbulb,
  Headphones, Lock, Unlock, BarChart3, ArrowRight, Menu, X, ChevronRight,
  User, Settings, GraduationCap, DollarSign, Book, Info,
  MessageSquare, LayoutDashboard, Target, Flame, MousePointer2,
  ChevronDown, HelpCircle, Mail, Github, Twitter, Linkedin,
  Layers, Database, Terminal, Search, Bell, LogOut,
  Maximize2, Minimize2, Share2, Download, Filter, MoreHorizontal
} from 'lucide-react';

// --- Constants & Data ---

const LEMON_URL = "https://boramir.lemonsqueezy.com/checkout/buy/985b69f3-b126-4452-bd49-129c9429d11a";

const SUBJECTS = [
  { id: 'ai', icon: Cpu, label: "Artificial Intelligence", color: "#3D5AFE", level: "Advanced", modules: 24 },
  { id: 'swe', icon: Code2, label: "Software Engineering", color: "#00B4D8", level: "Intermediate", modules: 32 },
  { id: 'math', icon: Calculator, label: "Mathematics", color: "#7C3AED", level: "Expert", modules: 18 },
  { id: 'law', icon: Scale, label: "Law & Ethics", color: "#3D5AFE", level: "Intermediate", modules: 15 },
  { id: 'phil', icon: Brain, label: "Philosophy", color: "#00B4D8", level: "Beginner", modules: 12 },
  { id: 'phys', icon: Atom, label: "Physics", color: "#7C3AED", level: "Advanced", modules: 20 },
  { id: 'chem', icon: FlaskConical, label: "Chemistry", color: "#3D5AFE", level: "Intermediate", modules: 22 },
  { id: 'bio', icon: Microscope, label: "Biology", color: "#00B4D8", level: "Beginner", modules: 25 },
  { id: 'econ', icon: TrendingUp, label: "Economics & Finance", color: "#7C3AED", level: "Advanced", modules: 28 },
  { id: 'lit', icon: BookOpen, label: "Literature & Arts", color: "#3D5AFE", level: "Beginner", modules: 14 },
  { id: 'geo', icon: Globe, label: "History & Geography", color: "#00B4D8", level: "Intermediate", modules: 19 },
  { id: 'lang', icon: Languages, label: "Languages", color: "#7C3AED", level: "Beginner", modules: 40 },
  { id: 'music', icon: Music, label: "Music Theory", color: "#3D5AFE", level: "Intermediate", modules: 16 },
  { id: 'design', icon: PenTool, label: "Design & UX", color: "#00B4D8", level: "Intermediate", modules: 21 },
  { id: 'psych', icon: History, label: "Psychology", color: "#7C3AED", level: "Advanced", modules: 23 },
];

const FAQ_DATA = [
  {
    question: "What exactly is AIRA MENTOR?",
    answer: "AIRA MENTOR is a high-performance cognitive enhancement platform that combines neural-phase audio technology with a Socratic AI Mentor to facilitate deep focus and accelerated learning. It's designed for students, researchers, and professionals who need to master complex subjects in record time."
  },
  {
    question: "How does the 'Neural-Phase Locking' work?",
    answer: "Our proprietary technology generates audio patterns that synchronize with your brain's neural oscillations (alpha, beta, and gamma waves). By locking your neural activity into these specific phases, we can artificially induce a state of deep concentration, similar to what experienced meditators achieve after years of practice."
  },
  {
    question: "What is the Socratic AI Method?",
    answer: "Instead of giving you direct answers, our AI acts as a digital Socrates. It asks probing, insightful questions that lead you to discover the answers yourself. This active recall and critical thinking process ensures that information is encoded into your long-term memory far more effectively than passive reading."
  },
  {
    question: "Is there a scientific basis for this?",
    answer: "Yes. Our platform is built on decades of research in neuroplasticity, cognitive psychology, and educational technology. We utilize principles such as spaced repetition, active recall, and auditory entrainment to optimize the learning experience."
  },
  {
    question: "Can I use it on mobile?",
    answer: "Absolutely. AIRA MENTOR is fully responsive and optimized for mobile browsers. We are also developing native iOS and Android apps to provide a seamless focus experience on the go."
  },
  {
    question: "What happens after my 5-day free trial?",
    answer: "After your trial, you can continue with our Pro plan for just $9.99/month. This gives you unlimited access to all subjects, advanced analytics, and the full power of the Socratic AI Mentor. You can cancel anytime with a single click."
  },
  {
    question: "Is my data secure?",
    answer: "Security and privacy are our top priorities. We use industry-standard encryption to protect your data and never share your personal information or study habits with third parties."
  }
];

// --- Utility Components ---

const GlassCard = ({ children, className = "", hover = true }) => (
  <motion.div
    className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl ${className}`}
    whileHover={hover ? { scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ title, subtitle, badge }) => (
  <div className="flex flex-col items-center text-center mb-24">
    {badge && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="px-6 py-2 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-blue-600/30"
      >
        {badge}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-xl text-gray-400 max-w-3xl leading-relaxed italic"
    >
      {subtitle}
    </motion.p>
  </div>
);

const StatBox = ({ label, value, icon: Icon, color = "blue" }) => (
  <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
    <Icon className={`w-8 h-8 mb-6 text-${color}-500 group-hover:scale-110 transition-transform`} />
    <div className="text-4xl font-black text-white mb-2 tracking-tighter">{value}</div>
    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-blue-400 transition-colors">{label}</div>
  </div>
);

// --- Main Application ---

export default function AiraMentorBehemoth() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFlowActive, setIsFlowActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'Welcome to your Flow Session. I am your Socratic Mentor. What subject shall we explore today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let interval;
    if (isFlowActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFlowActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newMessages = [...chatMessages, { role: 'user', content: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    
    // Simulate Socratic AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'system', 
        content: `Interesting perspective. If we consider the core principles of ${selectedSubject?.label || 'this topic'}, how would you define the relationship between the fundamental elements we just discussed?` 
      }]);
    }, 1000);
  };

  const startSession = (subject) => {
    setSelectedSubject(subject);
    setIsFlowActive(true);
    setActiveTab('study');
    setSessionTime(0);
    setChatMessages([{ role: 'system', content: `Focus locked. We are now exploring ${subject.label}. Tell me, what is the first thing that comes to your mind when you think about its core purpose?` }]);
  };

  // --- Sub-Pages / Views ---

  const DashboardView = () => (
    <div className="p-8 md:p-12 space-y-16 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-4">Commander Center</h1>
          <p className="text-gray-500 font-bold italic">"Success is the sum of small efforts, repeated day in and day out."</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Current Streak</span>
            <span className="text-2xl font-black text-white">12 DAYS</span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Flame className="w-8 h-8 text-white" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatBox label="Total Flow Hours" value="142.5" icon={Clock} color="blue" />
        <StatBox label="Subjects Mastered" value="08" icon={GraduationCap} color="purple" />
        <StatBox label="Average Focus" value="94%" icon={Activity} color="emerald" />
        <StatBox label="Neural Points" value="12,450" icon={Sparkles} color="amber" />
      </div>

      <SectionHeading 
        title="Active Modules" 
        subtitle="Select a subject to initialize your next neural-phase study session." 
        badge="Ready for Flow"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {SUBJECTS.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ y: -10, scale: 1.02 }}
            onClick={() => startSession(s)}
            className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 cursor-pointer overflow-hidden transition-all hover:border-blue-500/50 hover:bg-white/10"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <s.icon className="w-12 h-12 mb-8 transition-transform group-hover:scale-110" style={{ color: s.color }} />
            <h3 className="text-xl font-black text-white mb-2 leading-tight uppercase tracking-tighter">{s.label}</h3>
            <div className="flex items-center justify-between mt-6">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.modules} Modules</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[8px] font-black text-white uppercase tracking-widest">{s.level}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <GlassCard className="mt-24 p-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Your Neural Progress</h2>
            <p className="text-gray-400 leading-relaxed">Your brain activity patterns are stabilizing. Over the last 7 days, your ability to enter deep flow has increased by 14%. Keep pushing the boundaries of your cognitive limits.</p>
            <div className="space-y-6">
              {['Deep Focus Retention', 'Socratic Comprehension', 'Memory Encoding'].map((label, i) => (
                <div key={label} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>{label}</span>
                    <span className="text-blue-500">{[88, 92, 79][i]}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${[88, 92, 79][i]}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
            <BrainCircuit className="w-48 h-48 text-blue-500 relative z-10" />
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const StudyView = () => (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-[#010103]">
      {/* AI Chat Sidebar */}
      <div className="w-full md:w-[450px] border-r border-white/5 flex flex-col bg-[#020205]/80 backdrop-blur-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-black text-white uppercase tracking-tighter">Socratic Mentor</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Neural Sync Active</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsFlowActive(false)} className="p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <AnimatePresence initial={false}>
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed font-medium ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-600/20' 
                  : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-8 border-t border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your mentor..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 pr-16 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-3 p-3 rounded-xl bg-blue-600 text-white hover:scale-105 transition-transform shadow-lg"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-4 text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest">Type your thoughts. Let the AI guide your understanding.</p>
        </div>
      </div>

      {/* Main Study Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="absolute top-0 w-full p-8 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-6 pointer-events-auto">
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              <span className="text-xl font-black text-white tracking-tighter">{formatTime(sessionTime)}</span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4">
              <Activity className="w-5 h-5 text-purple-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Flow Intensity: 94%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pointer-events-auto">
            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Headphones className="w-6 h-6" />
            </button>
            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Neural Wave Visualizer */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-[150px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-8">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 60px rgba(59,130,246,0.5)", "0 0 20px rgba(59,130,246,0.2)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center mb-12"
            >
              <BrainCircuit className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
              {selectedSubject?.label || 'NEURAL FOCUS'}
            </h2>
            <p className="text-xl text-blue-400/60 font-bold italic mb-12">"Your mind is a muscle. Today, we are training for mastery."</p>
            
            <div className="flex items-center gap-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-1 bg-blue-600/30 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-blue-500"
                  />
                </div>
                <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em]">Neural Sync</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-1 bg-purple-600/30 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/2 bg-purple-500"
                  />
                </div>
                <span className="text-[8px] font-black text-purple-500 uppercase tracking-[0.3em]">Alpha Phase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="p-12 flex justify-center z-20">
          <button 
            onClick={() => setIsFlowActive(false)}
            className="group px-12 py-6 rounded-full bg-white text-black font-black text-xl flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-white/20 uppercase tracking-widest"
          >
            Complete Session
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  const LandingView = () => (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide" ref={scrollContainerRef}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-8 pt-32 pb-48">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[180px]"
          />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-900/15 rounded-full blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center max-w-6xl"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300">The Future of Accelerated Learning</span>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.85] uppercase mb-12">
            Master Your <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Flow State.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed italic mb-16">
            "AIRA MENTOR uses neural-phase locked audio to synchronize your brainwaves for deep focus, while our Socratic AI Mentor guides you to mastery."
          </p>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="px-12 py-8 bg-blue-600 text-white rounded-[2rem] font-black text-2xl flex items-center gap-6 hover:scale-105 transition-all shadow-[0_0_50px_rgba(37,99,235,0.4)] uppercase tracking-widest group"
            >
              Initialize Session
              <Play className="w-8 h-8 fill-current group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex flex-col items-start gap-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020205] bg-gray-800 flex items-center justify-center overflow-hidden">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#020205] bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                  +12K
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Joined by top performers worldwide</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Science Cards */}
        <div className="mt-48 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
          {featuresData.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group"
            >
              <f.icon className="w-12 h-12 text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Science Section */}
      <section className="py-48 px-8 bg-[#010103] relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Cognitive Architecture"
            title="The Science of Deep Flow"
            subtitle="We don't just teach. We optimize your brain's hardware for maximum knowledge retention."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-16">
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                  <Waves className="w-8 h-8 text-blue-500" />
                  Neural-Phase Audio
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg italic">
                  "Our audio engine uses Binaural Entrainment and Isochronic Tones at 40Hz (Gamma) to lock your prefrontal cortex into a state of hyper-focus. This minimizes the 'Default Mode Network' activity, effectively silencing the inner chatter and distractions."
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                  <BrainCircuit className="w-8 h-8 text-purple-500" />
                  Socratic Logic Engine
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg italic">
                  "Traditional learning is passive. AIRA MENTOR is active. By forcing your brain to synthesize information through guided questioning, we trigger 'Long-Term Potentiation' (LTP) at the synaptic level, making learning 3x faster than traditional methods."
                </p>
              </div>
              <div className="pt-8">
                <button className="px-10 py-5 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4">
                  Read Whitepaper
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
              <GlassCard className="p-12 border-blue-500/20 shadow-blue-600/10" hover={false}>
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Brain Activity Monitor</span>
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="h-64 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100, 70, 90, 50, 80, 60, 95, 75, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg"
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 text-center">Focus Depth</div>
                      <div className="text-3xl font-black text-white text-center">9.8/10</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 text-center">Synaptic Load</div>
                      <div className="text-3xl font-black text-white text-center">OPTIMAL</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-48 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Neural Library"
            title="15+ Subject Domains"
            subtitle="From Quantum Physics to Corporate Law. Our AI is specialized across every high-stakes discipline."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SUBJECTS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group relative p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer"
              >
                <div className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <s.icon className="w-14 h-14 mb-10 transition-transform group-hover:scale-110" style={{ color: s.color }} />
                <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter leading-none">{s.label}</h3>
                <div className="flex items-center justify-between mt-8">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.modules} Units</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(dot => (
                      <div key={dot} className={`w-1 h-1 rounded-full ${dot <= (s.level === 'Beginner' ? 1 : s.level === 'Intermediate' ? 2 : 3) ? 'bg-blue-500' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-48 px-8 bg-gradient-to-b from-[#020205] to-[#010103] relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            badge="Investment"
            title="Unlimited Potential"
            subtitle="One plan. Zero limits. Everything you need to master your chosen path."
          />

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl relative group"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[4rem] blur-[80px] group-hover:bg-blue-600/30 transition-all" />
              <div className="relative p-16 rounded-[4rem] bg-[#0A0A15] border border-blue-500/30 backdrop-blur-3xl shadow-2xl text-center">
                <div className="absolute top-10 right-10 px-6 py-2 rounded-full bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white">Best Value</div>
                <h3 className="text-2xl font-black text-blue-500 uppercase tracking-[0.3em] mb-12">Neural Pro</h3>
                <div className="flex items-center justify-center gap-2 mb-12">
                  <span className="text-4xl font-black text-white/50">$</span>
                  <span className="text-9xl font-black text-white tracking-tighter leading-none">9.99</span>
                  <span className="text-2xl font-black text-white/50">/mo</span>
                </div>
                <ul className="space-y-8 mb-16 text-left max-w-xs mx-auto">
                  {[
                    'Unlimited Neural Flow Sessions',
                    'Full Socratic AI Mentor Access',
                    'Advanced Cognitive Analytics',
                    'All 15+ Subject Domains',
                    'Priority Support & Early Access',
                    '5-Day Risk-Free Trial'
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-6 text-white font-bold uppercase tracking-widest text-[10px]">
                      <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-600/30">
                        <CheckCircle2 className="w-3 h-3 text-blue-500" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <a 
                  href={LEMON_URL}
                  className="block w-full py-8 rounded-3xl bg-blue-600 text-white font-black text-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.4)] uppercase tracking-widest"
                >
                  Start 5-Day Trial
                </a>
                <p className="mt-8 text-[10px] font-black text-gray-600 uppercase tracking-widest">Cancel anytime · 100% Secure Payment</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-48 px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeading 
            badge="Knowledge Base"
            title="Common Inquiries"
            subtitle="Everything you need to know about the neural revolution."
          />
          <div className="space-y-6">
            {FAQ_DATA.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between list-none">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">{faq.question}</h3>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ChevronDown className="w-5 h-5 text-blue-500" />
                  </div>
                </summary>
                <p className="mt-8 text-gray-500 leading-relaxed font-medium italic">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center mb-16 shadow-[0_0_60px_rgba(37,99,235,0.6)]"
          >
            <Zap className="w-12 h-12 text-white fill-current" />
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase mb-12 leading-none">
            Your Brain. <br /> <span className="text-blue-600">Upgraded.</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-2xl mb-16 font-bold italic">
            Join the elite circle of high-performers who have already unlocked their true cognitive potential.
          </p>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-16 py-8 bg-white text-black rounded-[2.5rem] font-black text-3xl hover:scale-105 transition-all shadow-2xl shadow-white/10 uppercase tracking-widest"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 border-t border-white/5 bg-[#010103]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="space-y-8 col-span-1 md:col-span-2">
            <div className="flex items-center gap-4">
              <Brain className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-black tracking-tighter text-white uppercase">AIRA MENTOR</span>
            </div>
            <p className="text-gray-600 max-w-sm leading-relaxed font-medium italic">
              "The state of flow is not a dream. It is a trainable mind. AIRA MENTOR is the bridge to your highest self."
            </p>
            <div className="flex gap-6">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-4 rounded-xl bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 col-span-1 md:col-span-2">
            <div className="space-y-8">
              <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Product</h5>
              <ul className="space-y-4">
                {['Dashboard', 'Neural Library', 'Pricing', 'Whitepaper'].map(l => (
                  <li key={l}><a href="#" className="text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Legal</h5>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map(l => (
                  <li key={l}><a href="#" className="text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.6em]">© 2026 AIRA MENTOR. MADE IN TURKEY 🇹🇷</p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">All Systems Operational</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/5 text-[8px] font-black text-gray-500 uppercase tracking-widest">Version 2.4.0-Final</div>
          </div>
        </div>
      </footer>
    </div>
  );

  // --- Sidebar Layout Wrapper ---

  return (
    <div className="flex h-screen overflow-hidden bg-[#020205] text-[#E2E8F0] font-sans">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-white/5 bg-[#020205]/80 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'w-24' : 'w-80'}`}>
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className={`flex items-center gap-4 transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">AIRA MENTOR</span>
          </div>
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-3 rounded-xl hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
            {isSidebarCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto scrollbar-hide">
          <div className="space-y-2">
            <p className={`text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] px-4 mb-4 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Main Command</p>
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Commander Center' },
              { id: 'study', icon: GraduationCap, label: 'Neural Library' },
              { id: 'progress', icon: BarChart3, label: 'Focus Analytics' },
              { id: 'settings', icon: Settings, label: 'Neural Config' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'study' && !selectedSubject) setSelectedSubject(SUBJECTS[0]);
                }}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className={`w-6 h-6 group-hover:scale-110 transition-transform ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'}`} />
                <span className={`font-black uppercase tracking-widest text-[10px] transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>{item.label}</span>
              </button>
            ))}
          </div>

          <div className={`pt-12 space-y-4 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] px-4 mb-4">Support & Science</p>
            {[
              { id: 'faq', icon: HelpCircle, label: 'Knowledge Base' },
              { id: 'whitepaper', icon: Book, label: 'Whitepaper' },
            ].map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-4 p-5 rounded-2xl text-gray-500 hover:bg-white/5 hover:text-white transition-all group"
              >
                <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform group-hover:text-purple-500" />
                <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-white/5">
          <div className={`mb-8 p-6 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Upgrade to Pro</h4>
            <p className="text-[10px] text-gray-400 font-bold italic mb-6">Unlock 15+ subjects and unlimited neural sessions.</p>
            <a href={LEMON_URL} className="block w-full py-3 rounded-xl bg-blue-600 text-white text-center text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Go Pro</a>
          </div>
          <button className="w-full flex items-center gap-4 p-5 rounded-2xl text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all group">
            <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className={`font-black uppercase tracking-widest text-[10px] ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed bottom-10 right-10 z-[100] w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40"
      >
        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#020205]/95 backdrop-blur-2xl flex flex-col p-12"
          >
            <div className="flex items-center gap-4 mb-24">
              <Brain className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-black tracking-tighter text-white uppercase">AIRA MENTOR</span>
            </div>
            <div className="space-y-8 flex-1">
              {['Dashboard', 'Neural Library', 'Progress', 'Settings', 'Pro Plan'].map((l, i) => (
                <motion.button
                  key={l}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setActiveTab(l.toLowerCase());
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-4xl font-black text-white uppercase tracking-tighter hover:text-blue-500 transition-colors"
                >
                  {l}
                </motion.button>
              ))}
            </div>
            <div className="pt-12 border-t border-white/10">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.6em] mb-4">© 2026 AIRA MENTOR</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {isFlowActive ? <StudyView /> : (
          <>
            {/* Header (Desktop) */}
            <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'py-8'}`}>
              <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
                <div className="flex items-center gap-12">
                  <div className="lg:hidden flex items-center gap-3">
                    <Brain className="w-8 h-8 text-blue-600" />
                    <span className="text-xl font-black tracking-tighter text-white uppercase">AIRA MENTOR</span>
                  </div>
                  <div className="hidden lg:flex items-center gap-12">
                    {['Science', 'Library', 'Pricing', 'FAQ'].map(l => (
                      <a key={l} href={`#${l.toLowerCase()}`} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.3em] transition-colors">{l}</a>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <button onClick={() => setActiveTab('dashboard')} className="hidden md:block text-[10px] font-black text-white uppercase tracking-[0.3em] hover:text-blue-500 transition-colors">Sign In</button>
                  <a href={LEMON_URL} className="px-8 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all">Start Trial</a>
                </div>
              </div>
            </nav>

            {/* View Switcher */}
            <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide">
              {activeTab === 'dashboard' ? <DashboardView /> : <LandingView />}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
