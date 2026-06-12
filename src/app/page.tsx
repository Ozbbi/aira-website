'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {
  Brain, Zap, Target, BookOpen, Code, LineChart, Globe, FlaskConical,
  Scale, Briefcase, HeartPulse, Palette, CheckCircle2, Flame, Star,
  Settings, LogOut, Crown, Plus, MessageCircle
} from 'lucide-react';

const subjects = [
  { icon: Brain, title: "AI & Prompts", id: "ai-prompts" },
  { icon: Code, title: "Programming", id: "programming" },
  { icon: Target, title: "Mathematics", id: "math" },
  { icon: Globe, title: "Languages", id: "languages" },
  { icon: LineChart, title: "Data Science", id: "data-science" },
  { icon: Briefcase, title: "Business", id: "business" },
  { icon: HeartPulse, title: "Health", id: "health" },
  { icon: FlaskConical, title: "Chemistry", id: "chemistry" },
  { icon: Zap, title: "Physics", id: "physics" },
  { icon: Scale, title: "Law", id: "law" },
  { icon: Palette, title: "Philosophy", id: "philosophy" },
  { icon: BookOpen, title: "History", id: "history" },
  { icon: Star, title: "Psychology", id: "psychology" },
  { icon: LineChart, title: "Finance", id: "finance" },
  { icon: Target, title: "Marketing", id: "marketing" }
];

interface UserProgress {
  streak: number;
  totalXP: number;
  lastStudied: string;
  isPro: boolean;
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [progress, setProgress] = useState<UserProgress>({
    streak: 0,
    totalXP: 0,
    lastStudied: '',
    isPro: user?.publicMetadata?.isPro === true || false
  });
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoaded && !user) {
      redirect('/');
    }
  }, [user, isLoaded]);

  // Fetch user progress from Supabase
  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      const response = await fetch(`/api/progress/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setProgress(data);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const startFlowSession = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setChatOpen(true);
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A24] border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold">AIRA MENTOR</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem
            icon={Brain}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <NavItem
            icon={BookOpen}
            label="My Studies"
            active={activeTab === 'studies'}
            onClick={() => setActiveTab('studies')}
          />
          <NavItem
            icon={LineChart}
            label="Progress"
            active={activeTab === 'progress'}
            onClick={() => setActiveTab('progress')}
          />
          <NavItem
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="space-y-4 pt-4 border-t border-white/5">
          {!progress.isPro && (
            <button className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <Crown className="w-5 h-5" />
              Go Pro
            </button>
          )}
          <button className="w-full px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black">Welcome back, {user?.firstName || 'Learner'}! 👋</h1>
              <p className="text-gray-400 mt-1">Keep your streak alive and level up today.</p>
            </div>
            <div className="flex items-center gap-4">
              {progress.isPro && (
                <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-bold text-purple-300">Pro Member</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'home' && (
            <div className="space-y-8">
              {/* Progress Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProgressCard
                  icon={Flame}
                  label="Current Streak"
                  value={progress.streak}
                  unit="days"
                  color="orange"
                />
                <ProgressCard
                  icon={Zap}
                  label="Total XP"
                  value={progress.totalXP}
                  unit="points"
                  color="purple"
                />
                <ProgressCard
                  icon={Star}
                  label="Level"
                  value={Math.floor(progress.totalXP / 1000)}
                  unit="of 50"
                  color="pink"
                />
              </div>

              {/* XP Progress Bar */}
              <div className="p-6 rounded-3xl bg-[#1A1A24] border border-white/5">
                <h3 className="font-bold mb-3">Progress to Next Level</h3>
                <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all"
                    style={{ width: `${(progress.totalXP % 1000) / 10}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {1000 - (progress.totalXP % 1000)} XP until next level
                </p>
              </div>

              {/* Subject Selection */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Start a Flow Session</h2>
                  <p className="text-gray-400 text-sm">15 subjects available</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onClick={() => startFlowSession(subject.id)}
                      isSelected={selectedSubject === subject.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="p-8 rounded-3xl bg-[#1A1A24] border border-white/5">
              <h2 className="text-2xl font-bold mb-6">Your Learning Journey</h2>
              <div className="space-y-4">
                <p className="text-gray-400">Streak: <span className="text-white font-bold">{progress.streak} days</span></p>
                <p className="text-gray-400">Total XP: <span className="text-white font-bold">{progress.totalXP} points</span></p>
                <p className="text-gray-400">Last studied: <span className="text-white font-bold">{progress.lastStudied || 'Never'}</span></p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-8 rounded-3xl bg-[#1A1A24] border border-white/5">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <p className="text-gray-400">Account settings coming soon...</p>
            </div>
          )}
        </div>
      </main>

      {/* AI Chat Modal */}
      {chatOpen && selectedSubject && (
        <AIChatModal
          subject={subjects.find(s => s.id === selectedSubject)?.title || ''}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}

// Components
function NavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active
          ? 'bg-white/10 text-white font-bold'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function ProgressCard({ icon: Icon, label, value, unit, color }: any) {
  const colorClasses = {
    orange: 'bg-orange-500/20 border-orange-500/50',
    purple: 'bg-purple-500/20 border-purple-500/50',
    pink: 'bg-pink-500/20 border-pink-500/50'
  };

  return (
    <div className={`p-6 rounded-2xl border ${colorClasses[color]} backdrop-blur`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-4xl font-black mb-1">{value}</div>
      <p className="text-xs text-gray-500">{unit}</p>
    </div>
  );
}

function SubjectCard({ subject, onClick, isSelected }: any) {
  const { icon: Icon, title } = subject;
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl border transition-all ${
        isSelected
          ? 'bg-purple-500/20 border-purple-500/50'
          : 'bg-[#1A1A24] border-white/5 hover:border-purple-500/50'
      }`}
    >
      <Icon className="w-8 h-8 mb-3 text-purple-500" />
      <h4 className="font-bold text-sm leading-tight">{title}</h4>
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-500">Start</span>
        <MessageCircle className="w-4 h-4 text-gray-500" />
      </div>
    </button>
  );
}

function AIChatModal({ subject, onClose }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message: input })
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] rounded-3xl bg-[#0A0A0F] border border-white/5 flex flex-col">
        {/* Header */}
        <div className="border-b border-white/5 p-6 flex items-center justify-between">
          <h3 className="text-lg font-bold">{subject} - AI Flow Session</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Ask me anything about {subject}. I'll guide you step by step using the Socratic method.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-2xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/5 p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask your question..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl bg-purple-600 font-bold hover:bg-purple-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
