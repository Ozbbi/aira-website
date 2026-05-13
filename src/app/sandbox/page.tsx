"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, RotateCcw, ChevronDown } from "lucide-react";

/**
 * /sandbox — the open practice page.
 *
 * Interactive prompt evaluator. The user writes a prompt; we run four
 * rule-based judges (clarity / specificity / audience / format) on it
 * and surface a single warm headline + a "Show details" breakdown.
 *
 * The evaluator is a direct port of mobile's OpenPracticeSandbox
 * `evaluatePrompt`. Pure function. No network. No model call. The
 * scoring is rules-of-thumb, not a real LLM — that's the point: this
 * is the same kind of judging the real backend does, but on-device, so
 * the practice surface is free and instant.
 *
 * Visual design matches /learn and /lesson/[id]: warm cream background,
 * orange brand, Soft & Sweet palette from the mobile v19 redesign.
 */

type Judge = "clarity" | "specificity" | "audience" | "format";

interface JudgeRationale {
  why: string;
  tip: string;
}

interface PromptEvaluation {
  scores: Record<Judge, number>;
  stars: Record<Judge, number>;
  overallStars: number;
  band: "great" | "good" | "try-again";
  rationale: Record<Judge, JudgeRationale>;
}

type FollowUpKey = "why" | "improve" | "example";

const JUDGE_LABELS: Record<Judge, string> = {
  clarity: "Clarity",
  specificity: "Specificity",
  audience: "Audience",
  format: "Format",
};

const STARTER_PROMPTS = [
  "Explain compound interest to me.",
  "Write a tweet about coffee.",
  "Give me a workout plan.",
  "Help me prep for a job interview.",
];

export default function SandboxPage() {
  const [draft, setDraft] = useState("");
  const [evaluation, setEvaluation] = useState<PromptEvaluation | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedJudges, setExpandedJudges] = useState<Set<Judge>>(new Set());
  const [openedFollowUps, setOpenedFollowUps] = useState<Set<FollowUpKey>>(new Set());

  const onSubmit = useCallback(() => {
    if (draft.trim().length < 5) return;
    const result = evaluatePrompt(draft);
    setEvaluation(result);
    setShowDetails(false);
    setExpandedJudges(new Set());
    setOpenedFollowUps(new Set());
    // Scroll the feedback into view
    setTimeout(() => {
      document.getElementById("feedback")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, [draft]);

  const onTryAgain = useCallback(() => {
    setEvaluation(null);
    setShowDetails(false);
    setExpandedJudges(new Set());
    setOpenedFollowUps(new Set());
  }, []);

  const toggleJudge = useCallback((j: Judge) => {
    setExpandedJudges((prev) => {
      const next = new Set(prev);
      if (next.has(j)) next.delete(j);
      else next.add(j);
      return next;
    });
  }, []);

  const toggleFollowUp = useCallback((key: FollowUpKey) => {
    setOpenedFollowUps((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const onStarterPrompt = useCallback((p: string) => {
    setDraft(p);
    setEvaluation(null);
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF9F5] text-[#2D2D2D]">
      {/* Top nav */}
      <nav className="sticky top-0 z-10 border-b border-[#F0E0D6] bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="rounded-md bg-orange-500 px-2 py-0.5 text-white">AIRA</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/learn" className="font-medium text-gray-700 hover:text-orange-500">Lessons</Link>
            <Link href="/sandbox" className="font-semibold text-orange-500">Sandbox</Link>
            <Link href="/" className="font-medium text-gray-700 hover:text-orange-500">Get the app</Link>
          </div>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-10">
        {/* Eyebrow + back */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Open practice</p>
          <Link href="/learn" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-orange-500">
            <ArrowLeft size={16} /> Browse lessons
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl"
        >
          Try your prompt. Get instant feedback.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 text-lg leading-relaxed text-gray-600"
        >
          Type any prompt. Ara scores it on four moves — clarity, specificity, audience, and format — and tells you the cheapest fix.
        </motion.p>

        {/* Starter prompts */}
        {!evaluation ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 self-center mr-1">Or try:</span>
            {STARTER_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => onStarterPrompt(p)}
                className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-medium text-orange-700 transition hover:bg-orange-50"
              >
                {p}
              </button>
            ))}
          </motion.div>
        ) : null}

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6 rounded-2xl border border-[#F0E0D6] bg-white p-4 shadow-sm"
        >
          <textarea
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              if (evaluation) setEvaluation(null);
            }}
            placeholder="Write your prompt here…"
            maxLength={600}
            disabled={!!evaluation}
            className="block w-full resize-none bg-transparent text-base leading-relaxed text-gray-900 outline-none placeholder:text-gray-400 disabled:opacity-70"
            rows={6}
          />
          <div className="mt-3 flex items-center justify-between border-t border-[#F4E6DC] pt-3 text-xs text-gray-500">
            <span>{draft.length} / 600</span>
            {evaluation ? (
              <button
                onClick={onTryAgain}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 font-semibold text-orange-700 hover:bg-orange-100"
              >
                <RotateCcw size={12} /> Try another
              </button>
            ) : (
              <span className="font-medium">Hint: name the reader + the format.</span>
            )}
          </div>
        </motion.div>

        {/* Submit */}
        {!evaluation ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <button
              onClick={onSubmit}
              disabled={draft.trim().length < 5}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles size={18} /> Get feedback
            </button>
          </motion.div>
        ) : null}

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {evaluation ? (
            <motion.section
              id="feedback"
              key="feedback"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-3xl border border-[#F0E0D6] bg-white p-6 shadow-sm md:p-8"
            >
              <SmileyScore evaluation={evaluation} />

              {/* Details toggle */}
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:underline"
              >
                {showDetails ? "Hide details" : "Show details"}
                <ChevronDown
                  size={14}
                  className={`transition ${showDetails ? "rotate-180" : ""}`}
                />
              </button>

              {/* Per-judge bars */}
              <AnimatePresence>
                {showDetails ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-1">
                      {(["clarity", "specificity", "audience", "format"] as Judge[]).map((j) => (
                        <JudgeBar
                          key={j}
                          label={JUDGE_LABELS[j]}
                          score={evaluation.scores[j]}
                          rationale={evaluation.rationale[j]}
                          expanded={expandedJudges.has(j)}
                          onToggle={() => toggleJudge(j)}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Follow-up chips */}
              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Ask Ara</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <FollowUpChip
                    label="Tell me more"
                    active={openedFollowUps.has("why")}
                    onClick={() => toggleFollowUp("why")}
                  />
                  <FollowUpChip
                    label="How can I improve?"
                    active={openedFollowUps.has("improve")}
                    onClick={() => toggleFollowUp("improve")}
                  />
                  <FollowUpChip
                    label="Show an example"
                    active={openedFollowUps.has("example")}
                    onClick={() => toggleFollowUp("example")}
                  />
                </div>

                <AnimatePresence>
                  {openedFollowUps.has("why") ? (
                    <FollowUpAnswer
                      key="why"
                      label="Tell me more"
                      text={fallbackWhy(evaluation)}
                    />
                  ) : null}
                  {openedFollowUps.has("improve") ? (
                    <FollowUpAnswer
                      key="improve"
                      label="How can I improve?"
                      text={fallbackHowToImprove(evaluation)}
                    />
                  ) : null}
                  {openedFollowUps.has("example") ? (
                    <FollowUpAnswer
                      key="example"
                      label="Show an example"
                      text={fallbackExample(draft)}
                    />
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#F4E6DC] pt-6">
                <button
                  onClick={onTryAgain}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                >
                  <RotateCcw size={14} /> Give it another go
                </button>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
                >
                  Read a lesson
                </Link>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-gray-400">
          The web sandbox runs offline rule-based judges so it&apos;s free + instant. The mobile app adds full Ask Ara follow-ups, lesson XP, and history.
        </p>
      </article>
    </main>
  );
}

/* ───────────────────────── SmileyScore ───────────────────────── */

function SmileyScore({ evaluation }: { evaluation: PromptEvaluation }) {
  const { overallStars, band } = evaluation;
  const weakest = pickLowestJudge(evaluation);

  const headline =
    band === "great" ? "Beautiful prompt." :
    band === "good"  ? "Really nice start." :
                       "You're close — keep going!";

  const supportMsg: string =
    band === "great" ? "You hit every move. Save this one as a template!" :
    weakest === "audience"
      ? 'Tiny tweak: tell Ara WHO this is for (e.g. "for a 10th grader"). That makes a huge difference!'
      : weakest === "specificity"
      ? 'Add a number or a constraint — like "in 5 bullets" — and Ara can see exactly what you want.'
      : weakest === "format"
      ? 'End with "Reply as a list / table" so the answer comes back in the shape you need.'
      : "Try stretching to a full sentence so Ara has more to work with.";

  // Gradient ring + emoji face — stand-in for the AiraMascot in mobile.
  const faceEmoji =
    band === "great" ? "🤩" :
    band === "good"  ? "😊" :
                       "🙂";

  const ringGradient =
    band === "great" ? "from-orange-400 via-rose-400 to-pink-400" :
    band === "good"  ? "from-orange-300 to-amber-300" :
                       "from-amber-200 to-orange-200";

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
      <div className="shrink-0">
        <div className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${ringGradient} shadow-md`}>
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white text-5xl">
            {faceEmoji}
          </div>
        </div>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{headline}</h2>
        <p className="mt-2 text-base leading-relaxed text-gray-700">{supportMsg}</p>
        <div className="mt-3 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
          {overallStars.toFixed(1)} / 5
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── JudgeBar ───────────────────────── */

function JudgeBar({
  label,
  score,
  rationale,
  expanded,
  onToggle,
}: {
  label: string;
  score: number;
  rationale: JudgeRationale;
  expanded: boolean;
  onToggle: () => void;
}) {
  const barColor =
    score >= 70 ? "bg-emerald-500" :
    score >= 40 ? "bg-orange-500" :
                  "bg-rose-500";

  return (
    <div className="border-b border-[#F4E6DC] last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-3 text-left hover:bg-orange-50/40"
      >
        <div className="flex-1 pr-4">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`h-full rounded-full ${barColor}`}
            />
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Why</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">{rationale.why}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-orange-500">Next move</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-800">{rationale.tip}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── FollowUp chips ───────────────────────── */

function FollowUpChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
          : "rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-semibold text-orange-700 hover:bg-orange-50"
      }
    >
      {label}
    </button>
  );
}

function FollowUpAnswer({ label, text }: { label: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="mt-3 rounded-2xl border-l-4 border-orange-500 bg-orange-50/60 p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-orange-500">{label}</p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800">{text}</p>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── evaluatePrompt (ported) ───────────────────────── */

const AUDIENCE_WORDS = [
  "beginner", "expert", "student", "teacher", "engineer", "cfo", "pm",
  "manager", "executive", "developer", "designer", "audience", "reader",
  "kid", "child", "10-year-old", "10 year old", "parent", "investor", "customer",
  "colleague", "team", "recruiter", "client", "user", "doctor", "nurse", "founder",
  "senior", "junior", "apprentice", "analyst", "professor", "undergrad", "high school",
];

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function toStars(score: number): number {
  if (score >= 80) return 5;
  if (score >= 60) return 4;
  if (score >= 40) return 3;
  if (score >= 20) return 2;
  return 1;
}

function evaluatePrompt(rawDraft: string): PromptEvaluation {
  const draft = rawDraft.trim();
  const lower = draft.toLowerCase();
  const wordCount = draft.split(/\s+/).filter(Boolean).length;
  const hasMultipleSentences = /[.!?].+[.!?]/.test(draft);

  // Clarity
  let clarity = 50;
  if (wordCount >= 8) clarity += 15;
  if (wordCount >= 18) clarity += 10;
  if (hasMultipleSentences) clarity += 15;
  if (/[.!?]\s/.test(draft)) clarity += 5;
  if (draft === draft.toUpperCase() && draft.length > 10) clarity -= 25;
  if (wordCount > 120) clarity -= 10;
  clarity = clamp(clarity);

  // Specificity
  let specificity = 30;
  if (/\b\d+\b/.test(draft)) specificity += 20;
  if (/(in \d+ words|under \d+ words|max \d+ words|\d+ bullets|\d+ sentences|\d+ words)/i.test(draft)) specificity += 30;
  if (/\b(specifically|exactly|precisely|step.by.step)\b/i.test(draft)) specificity += 15;
  if (/\b(don't use|avoid|skip|no )\b/i.test(draft)) specificity += 15;
  specificity = clamp(specificity);

  // Audience
  let audience = 20;
  if (AUDIENCE_WORDS.some((w) => lower.includes(w))) audience += 50;
  if (/\b(act as|you are|imagine you are|roleplay as|pretend you are)\b/i.test(draft)) audience += 20;
  if (/\bfor (a |an |the |my )/i.test(draft)) audience += 15;
  if (/\b(my (situation|goal|audience|context)|i am|i'm|i want to)\b/i.test(draft)) audience += 15;
  audience = clamp(audience);

  // Format
  let format = 25;
  if (/\b(bullet|bullets|list|numbered list)\b/i.test(draft)) format += 25;
  if (/\btable\b/i.test(draft)) format += 25;
  if (/\b(json|markdown|yaml)\b/i.test(draft)) format += 25;
  if (/\b(paragraph|sentences?|words)\b/i.test(draft) && /\d/.test(draft)) format += 20;
  if (/\b(no intro|no preamble|skip the disclaimer|don't apologi[sz]e)\b/i.test(draft)) format += 15;
  format = clamp(format);

  const scores = { clarity, specificity, audience, format };
  const stars = {
    clarity: toStars(clarity),
    specificity: toStars(specificity),
    audience: toStars(audience),
    format: toStars(format),
  };
  const overallStars = Number(
    (((stars.clarity + stars.specificity + stars.audience + stars.format) / 4).toFixed(1))
  );
  const band: PromptEvaluation["band"] =
    overallStars >= 4.0 ? "great" :
    overallStars >= 3.0 ? "good" :
                          "try-again";

  const rationale = {
    clarity: rationaleFor("clarity", clarity),
    specificity: rationaleFor("specificity", specificity),
    audience: rationaleFor("audience", audience),
    format: rationaleFor("format", format),
  };

  return { scores, stars, overallStars, band, rationale };
}

function rationaleFor(judge: Judge, score: number): JudgeRationale {
  const band = score >= 70 ? "high" : score >= 40 ? "mid" : "low";
  const lookup: Record<Judge, Record<"low" | "mid" | "high", JudgeRationale>> = {
    clarity: {
      low: {
        why: "Your prompt is too short or fragmented for the AI to grip. Single words and shouting both confuse it.",
        tip: "Stretch to at least one full sentence. Lower-case unless you mean to shout.",
      },
      mid: {
        why: "There's enough structure for the AI to follow, but the prompt could use one more sentence to set up the ask.",
        tip: "Add a quick sentence explaining what you actually want done.",
      },
      high: {
        why: "The prompt reads cleanly and has enough length to anchor the AI.",
        tip: "Lock this clarity in and move to sharpening Specificity or Audience.",
      },
    },
    specificity: {
      low: {
        why: "Nothing concrete to anchor the AI: no numbers, no length caps, no constraints.",
        tip: 'Add a count or length: "5 bullets", "under 80 words", "step by step." Numbers anchor.',
      },
      mid: {
        why: "Some specifics, but the AI still has room to be vague where you wanted sharp.",
        tip: 'Layer one more constraint: a word ban, a maximum length, or a "step by step" instruction.',
      },
      high: {
        why: "Constraints are well-defined: the AI has to hit your specific targets, not guess.",
        tip: "Excellent — keep this constraint discipline in every prompt going forward.",
      },
    },
    audience: {
      low: {
        why: 'No named reader. The AI defaults to "average internet expert," which is rarely what you want.',
        tip: 'Add who this is for: "for a busy CFO" / "for a curious 10-year-old" / "for a junior engineer."',
      },
      mid: {
        why: "Audience is hinted but not committed. AI takes its best guess.",
        tip: "Name the reader explicitly with one trait: their role + one thing about them.",
      },
      high: {
        why: "The reader is named, so the AI can pitch tone and depth correctly.",
        tip: 'Optional: layer a second trait ("a CFO who hates jargon") for even sharper output.',
      },
    },
    format: {
      low: {
        why: "No shape requested — the AI will default to a wall of prose, almost never what you want.",
        tip: 'End with the format: "Reply as a 5-bullet list" or "Reply as a 2-column table."',
      },
      mid: {
        why: "A shape is suggested but loosely. Strong prompts state the shape unambiguously.",
        tip: "Be explicit: name the format AND the count (5 bullets, 3 sentences, 2-column table).",
      },
      high: {
        why: "Format is locked in. The AI has no excuse to drift back to essay-with-disclaimers.",
        tip: "Worth saving this prompt structure as a reusable template.",
      },
    },
  };
  return lookup[judge][band];
}

function pickLowestJudge(ev: PromptEvaluation): Judge {
  const entries = Object.entries(ev.scores) as [Judge, number][];
  entries.sort((a, b) => a[1] - b[1]);
  return entries[0][0];
}

/* ───────────────────────── Follow-up fallback text ───────────────────────── */

function fallbackWhy(ev: PromptEvaluation): string {
  const weakest = pickLowestJudge(ev);
  return (
    `Your overall ${ev.overallStars.toFixed(1)}/5 is the average of four independent judges. ` +
    `The weakest one was ${JUDGE_LABELS[weakest]} — that's where the AI had the least to work with. ` +
    "Strong prompts hit all four: a clear sentence, a named audience, a number or two, and an explicit shape."
  );
}

function fallbackHowToImprove(ev: PromptEvaluation): string {
  const weakest = pickLowestJudge(ev);
  const tipMap: Record<Judge, string> = {
    clarity:
      "Stretch your prompt to a complete sentence or two. State the task in one clean line, then the constraints in the next.",
    specificity:
      'Add a number. "5 bullets", "under 80 words", "step by step" — pick whichever makes sense. Numbers anchor AI.',
    audience:
      'Name the reader. "For a busy CFO." "For a curious 10-year-old." That single phrase is the cheapest win in prompting.',
    format:
      'End with the format you want. "Reply as a 5-bullet list" or "Reply as a 2-column table" or "Max 80 words."',
  };
  return tipMap[weakest];
}

function fallbackExample(draft: string): string {
  const seed = draft.slice(0, 50).replace(/[.!?]+$/, "");
  return (
    "Here's the same idea, prompted properly:\n\n" +
    `"${seed || "Explain compound interest"} — for a curious 10-year-old. ` +
    "Reply as a 4-bullet list, one sentence each. " +
    "No analogies that involve money — use food. " +
    'End with one question I should ask next."\n\n' +
    "Notice the four moves: named audience, count + length cap, banned device, and a follow-up nudge."
  );
}
