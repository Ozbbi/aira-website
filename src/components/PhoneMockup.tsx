"use client";

import { Home, User } from "lucide-react";

export default function PhoneMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{ width: "280px", maxWidth: "100%" }}
    >
      {/* Outer glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.4), transparent 70%)",
        }}
      />
      {/* Phone bezel */}
      <div
        className="relative rounded-[2.5rem] bg-black p-3 shadow-2xl"
        style={{
          aspectRatio: "280 / 560",
          boxShadow:
            "0 25px 80px -10px rgba(124,58,237,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
        {/* Screen */}
        <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-aira-bg flex flex-col">
          {/* Status padding */}
          <div className="h-8" />
          {/* Content */}
          <div className="flex-1 px-4 pb-16 overflow-hidden">
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] text-aira-dim">Welcome back</div>
                <div className="text-sm font-semibold text-aira-text">
                  Hey there 👋
                </div>
              </div>
              <div className="px-2 py-1 rounded-full bg-aira-card border border-aira-border text-[11px] font-semibold flex items-center gap-1">
                <span>🔥</span>
                <span>7</span>
              </div>
            </div>

            {/* XP bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-aira-muted font-medium">Level 3</span>
                <span className="text-aira-dim">150/200 XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-aira-card overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "75%",
                    background:
                      "linear-gradient(90deg, #7C3AED, #4F46E5)",
                  }}
                />
              </div>
            </div>

            {/* Continue card */}
            <div
              className="rounded-xl p-3 mb-3 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(79,70,229,0.9))",
              }}
            >
              <div className="text-[9px] uppercase tracking-wider text-white/70 font-semibold">
                Next Lesson
              </div>
              <div className="text-sm font-semibold text-white mt-0.5">
                Continue Learning
              </div>
              <div className="text-[10px] text-white/80 mt-1">
                Tap to start
              </div>
            </div>

            {/* Topic grid 2x2 */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { emoji: "✨", label: "AI Basics" },
                { emoji: "🧠", label: "Thinking" },
                { emoji: "⚡", label: "Prompts" },
                { emoji: "🛠️", label: "Tools" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="rounded-lg bg-aira-card border border-aira-border p-2"
                >
                  <div className="text-base">{t.emoji}</div>
                  <div className="text-[10px] font-medium text-aira-text mt-0.5">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom tab bar */}
          <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-aira-border bg-aira-surface flex items-center justify-around">
            <div className="flex flex-col items-center gap-0.5">
              <Home size={18} className="text-aira-purple" />
              <span className="text-[9px] text-aira-purple font-semibold">
                Home
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <User size={18} className="text-aira-dim" />
              <span className="text-[9px] text-aira-dim">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
