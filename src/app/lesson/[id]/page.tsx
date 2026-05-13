"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import lessons from "@/data/lessons.json";

/**
 * /lesson/[id] — the lesson reader.
 *
 * Long-form, Brilliant-style desktop layout:
 *   1. Header strip with back link + track tag
 *   2. Big title + AIRA intro
 *   3. "The scenario" block (realWorldScenario)
 *   4. Concept scenes — vague vs. specific cards, side by side
 *   5. Takeaway pill
 *   6. CTA — Try in the sandbox / Get the app
 *
 * Quiz / questions are intentionally NOT here — those are mobile-only
 * interactive moments. The web is a reader + preview surface.
 *
 * No server roundtrip — the lesson JSON is statically bundled.
 */

interface LessonLite {
  id: string;
  trackId: string;
  title: string;
  character: string;
  airaIntro: string;
  learnFirst: string;
  realWorldScenario: string;
  scenes: { heading: string; vague: string; specific: string; note: string }[];
  airaOutro: string;
  takeaway: string;
}

const TRACK_META: Record<string, { label: string; gradient: string; accent: string }> = {
  prompt: { label: "AI Foundations", gradient: "from-orange-500 to-rose-400", accent: "text-orange-500" },
  critical: { label: "Critical Thinking", gradient: "from-rose-500 to-pink-400", accent: "text-rose-500" },
  power: { label: "Practical Power", gradient: "from-emerald-500 to-teal-400", accent: "text-emerald-500" },
  tools: { label: "Tools & Taste", gradient: "from-amber-500 to-orange-400", accent: "text-amber-500" },
  create: { label: "Create with AI", gradient: "from-fuchsia-500 to-pink-400", accent: "text-fuchsia-500" },
  vibe: { label: "Code Track", gradient: "from-violet-500 to-indigo-400", accent: "text-violet-500" },
};

interface Params {
  id: string;
}

export default function LessonPage({ params }: { params: Promise<Params> }) {
  const { id } = use(params);
  const router = useRouter();

  const lesson = useMemo(() => {
    return (lessons as LessonLite[]).find((l) => l.id === id) ?? null;
  }, [id]);

  // Determine prev / next in flat order for chevron nav
  const { prev, next } = useMemo(() => {
    const list = lessons as LessonLite[];
    const idx = list.findIndex((l) => l.id === id);
    return {
      prev: idx > 0 ? list[idx - 1] : null,
      next: idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null,
    };
  }, [id]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#FFF9F5] text-[#2D2D2D]">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="text-3xl font-bold">Lesson not found.</h1>
          <p className="mt-3 text-gray-600">Maybe try the full catalog.</p>
          <Link
            href="/learn"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-white shadow-sm hover:bg-orange-600"
          >
            Browse lessons <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  const meta = TRACK_META[lesson.trackId] ?? { label: lesson.trackId, gradient: "from-gray-500 to-gray-400", accent: "text-gray-500" };

  return (
    <main className="min-h-screen bg-[#FFF9F5] text-[#2D2D2D]">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 border-b border-[#F0E0D6] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="rounded-md bg-orange-500 px-2 py-0.5 text-white">AIRA</span>
          </Link>
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-orange-500">
            <ArrowLeft size={16} /> All lessons
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-12">
        {/* Track tag */}
        <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${meta.gradient} px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm`}>
          {meta.label}
          <span className="opacity-80">· With {lesson.character}</span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl"
        >
          {lesson.title}
        </motion.h1>

        {/* Ara intro */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-5 text-xl leading-relaxed text-gray-700"
        >
          {lesson.airaIntro}
        </motion.p>

        {/* Learn first */}
        {lesson.learnFirst ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 rounded-2xl border-l-4 border-orange-500 bg-white p-6 shadow-sm"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-500">Learn first</p>
            <p className="text-base leading-relaxed text-gray-800">{lesson.learnFirst}</p>
          </motion.div>
        ) : null}

        {/* Real-world scenario */}
        {lesson.realWorldScenario ? (
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10"
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">The scenario</h2>
            <p className="mt-2 text-lg leading-relaxed text-gray-800">{lesson.realWorldScenario}</p>
          </motion.section>
        ) : null}

        {/* Scenes — vague vs specific */}
        {lesson.scenes && lesson.scenes.length > 0 ? (
          <section className="mt-12 space-y-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              The moves
            </h2>
            {lesson.scenes.map((scene, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-[#F0E0D6] bg-white p-6 shadow-sm"
              >
                <h3 className="text-2xl font-bold">{scene.heading}</h3>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-rose-600">Vague</p>
                    <p className="text-base leading-relaxed text-gray-800">{scene.vague}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-emerald-600">Specific</p>
                    <p className="text-base leading-relaxed text-gray-800">{scene.specific}</p>
                  </div>
                </div>
                {scene.note ? (
                  <p className="mt-4 border-l-2 border-orange-400 pl-4 text-sm italic text-gray-600">
                    {scene.note}
                  </p>
                ) : null}
              </motion.div>
            ))}
          </section>
        ) : null}

        {/* Ara outro */}
        {lesson.airaOutro ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-gradient-to-br from-orange-50 to-rose-50 p-6"
          >
            <p className="text-lg italic leading-relaxed text-gray-800">{lesson.airaOutro}</p>
          </motion.div>
        ) : null}

        {/* Takeaway */}
        {lesson.takeaway ? (
          <div className="mt-12 flex flex-col items-center text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">The takeaway</p>
            <p className="mt-3 max-w-xl rounded-full bg-orange-500 px-6 py-3 text-2xl font-extrabold text-white shadow-md">
              {lesson.takeaway}
            </p>
          </div>
        ) : null}

        {/* CTAs */}
        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl border border-[#F0E0D6] bg-white p-8 shadow-sm">
          <p className="text-center text-lg font-semibold">
            Quizzes, sandbox, flashcards & XP live in the app.
          </p>
          <p className="text-center text-sm text-gray-600">
            This page is a preview. Practice the full version on iOS or Android.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sandbox"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-sm hover:bg-orange-600"
            >
              <Sparkles size={16} /> Try the sandbox
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-3 font-semibold text-orange-700 hover:bg-orange-50"
            >
              Get the app
            </Link>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-12 flex items-center justify-between border-t border-[#F0E0D6] pt-6 text-sm">
          {prev ? (
            <Link
              href={`/lesson/${prev.id}`}
              className="group inline-flex max-w-[45%] flex-col items-start gap-1 rounded-xl px-3 py-2 hover:bg-orange-50"
            >
              <span className="text-xs uppercase tracking-widest text-gray-500">Previous</span>
              <span className="text-left font-semibold text-gray-800 group-hover:text-orange-600">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link
              href={`/lesson/${next.id}`}
              className="group inline-flex max-w-[45%] flex-col items-end gap-1 rounded-xl px-3 py-2 text-right hover:bg-orange-50"
            >
              <span className="text-xs uppercase tracking-widest text-gray-500">Next</span>
              <span className="text-right font-semibold text-gray-800 group-hover:text-orange-600">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </article>
    </main>
  );
}
