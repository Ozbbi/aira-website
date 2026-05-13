"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, BookOpen } from "lucide-react";
import lessons from "@/data/lessons.json";

/**
 * /learn — the lessons catalog page.
 *
 * 52 lessons from the mobile data file, grouped by track and rendered
 * as a Brilliant-style grid. Each card shows title, character,
 * track tag, and a one-line preview pulled from the realWorldScenario.
 *
 * Top of page: search bar (token-based fuzzy filter against title +
 * scenes + takeaway). Beneath: track grid; click any card to open
 * /lesson/[id].
 *
 * Pure client-side rendering — the JSON is statically bundled so no
 * runtime API is needed. Vercel deploys this as static HTML/JS.
 */

interface LessonLite {
  id: string;
  trackId: string;
  title: string;
  character: string;
  airaIntro: string;
  realWorldScenario: string;
  scenes: { heading: string; note: string }[];
  takeaway: string;
}

const TRACK_META: Record<
  string,
  { label: string; gradient: string; accent: string }
> = {
  prompt: { label: "AI Foundations", gradient: "from-orange-500 to-rose-400", accent: "text-orange-500" },
  critical: { label: "Critical Thinking", gradient: "from-rose-500 to-pink-400", accent: "text-rose-500" },
  power: { label: "Practical Power", gradient: "from-emerald-500 to-teal-400", accent: "text-emerald-500" },
  tools: { label: "Tools & Taste", gradient: "from-amber-500 to-orange-400", accent: "text-amber-500" },
  create: { label: "Create with AI", gradient: "from-fuchsia-500 to-pink-400", accent: "text-fuchsia-500" },
  vibe: { label: "Code Track", gradient: "from-violet-500 to-indigo-400", accent: "text-violet-500" },
};

export default function LearnPage() {
  const [query, setQuery] = useState("");

  const filtered: LessonLite[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lessons as LessonLite[];
    const tokens = q.split(/\s+/);
    return (lessons as LessonLite[]).filter((l) => {
      const hay = `${l.title} ${l.character} ${l.takeaway} ${l.scenes.map((s) => s.heading + " " + s.note).join(" ")}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [query]);

  // Group by track for the sectioned layout
  const grouped = useMemo(() => {
    const map: Record<string, LessonLite[]> = {};
    for (const l of filtered) {
      if (!map[l.trackId]) map[l.trackId] = [];
      map[l.trackId].push(l);
    }
    return map;
  }, [filtered]);

  const trackOrder = ["prompt", "critical", "power", "tools", "create", "vibe"];

  return (
    <main className="min-h-screen bg-[#FFF9F5] text-[#2D2D2D]">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 border-b border-[#F0E0D6] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="rounded-md bg-orange-500 px-2 py-0.5 text-white">AIRA</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/learn" className="font-semibold text-orange-500">Lessons</Link>
            <Link href="/sandbox" className="font-medium text-gray-700 hover:text-orange-500">Sandbox</Link>
            <Link href="/" className="font-medium text-gray-700 hover:text-orange-500">Get the app</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500">The library</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
            Learn to think with AI.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">
            52 hand-written lessons drawn from Stanford CS324, MIT 6.S191, and Anthropic&apos;s AI Fluency curriculum. Real scenarios. Plain English. No fluff.
          </p>
        </motion.div>

        {/* Search */}
        <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-[#F0E0D6] bg-white px-4 py-3 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, character, or word…"
            className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-xs font-semibold text-orange-500 hover:underline"
            >
              Clear
            </button>
          ) : null}
        </div>

        {/* Count chip */}
        <p className="mt-3 text-sm text-gray-500">
          {filtered.length} lesson{filtered.length === 1 ? "" : "s"}
          {query ? ` matching "${query}"` : ""}
        </p>
      </section>

      {/* Track sections */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        {trackOrder
          .filter((t) => grouped[t] && grouped[t].length > 0)
          .map((trackId) => {
            const meta = TRACK_META[trackId] ?? { label: trackId, gradient: "from-gray-500 to-gray-400", accent: "text-gray-500" };
            const list = grouped[trackId];
            return (
              <div key={trackId} className="mb-12">
                <div className={`mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${meta.gradient} px-4 py-1.5 text-sm font-bold text-white shadow-md`}>
                  <BookOpen size={14} />
                  {meta.label}
                  <span className="ml-1 opacity-80">· {list.length}</span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((l, i) => (
                    <motion.div
                      key={l.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.4) }}
                    >
                      <Link
                        href={`/lesson/${l.id}`}
                        className="group block h-full rounded-2xl border border-[#F0E0D6] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <p className={`text-[11px] font-bold uppercase tracking-wider ${meta.accent}`}>
                          With {l.character}
                        </p>
                        <h3 className="mt-1 text-lg font-bold leading-snug">{l.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm text-gray-600">{l.realWorldScenario}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                            {l.takeaway}
                          </span>
                          <ArrowRight size={16} className="text-orange-500 transition group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#F0E0D6] bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-bold">Nothing matches that.</p>
            <p className="mt-2 text-sm text-gray-600">Try a different word — like &ldquo;audience&rdquo; or &ldquo;format&rdquo;.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
