/**
 * AIRA AI Mentor — server-side Anthropic proxy.
 *
 * ANTHROPIC_API_KEY lives ONLY in server env (Vercel env var) and is never
 * exposed to the client. The browser POSTs { messages, mode }; we add the
 * right system prompt, call Anthropic, and return the assistant text.
 *
 * mode ∈ "chat" | "summary" | "test" | "program"
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

type Mode = "chat" | "summary" | "test" | "program";

const SYSTEM_BASE = `You are AIRA, a premium AI study mentor for learners in the AI-native era.

Voice: calm, sharp, encouraging — never gimmicky, never filler. You teach with the
Socratic method: you prefer asking the next good question over dumping facts, and you
push the learner to retrieve and reason before you confirm.

Formatting: reply in clean markdown. Use short headings (##), **bold** for key terms,
and bullet or numbered lists. Keep paragraphs tight. No emojis.`;

const MODE_PROMPTS: Record<Mode, string> = {
  chat:
    "Mode: MENTOR. Guide the learner Socratically. Help them reason toward the answer with " +
    "one or two pointed questions, then give a concise, structured explanation. End with a " +
    "quick check-for-understanding prompt.",
  summary:
    "Mode: SUMMARY. The user pastes lecture notes or source material. Produce a clean summary:\n" +
    "## Overview (2-3 sentences)\n## Key concepts (bullets; **bold** the term, then a one-line " +
    "explanation)\n## Remember this (3-5 high-yield takeaways for recall).",
  test:
    "Mode: TEST. The user pastes material. Generate a practice quiz from it ONLY:\n" +
    "## Quiz (6-8 questions, mix of multiple-choice and short-answer, numbered)\n" +
    "## Answer key (numbered to match, one-line rationale each). Do not invent facts beyond the material.",
  program:
    "Mode: STUDY PROGRAM. Build a personalized multi-day study program for the user's topic and " +
    "goal. Output day-by-day (## Day 1, ## Day 2, ...). Each day: a focus, 2-4 concrete tasks, an " +
    "**active-recall** checkpoint, and a **spaced-repetition** review of earlier days. End with '## How to use this plan'.",
};

function isMode(v: unknown): v is Mode {
  return v === "chat" || v === "summary" || v === "test" || v === "program";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { messages, mode } = (body ?? {}) as {
    messages?: Array<{ role?: string; content?: unknown }>;
    mode?: unknown;
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "not_configured", message: "The mentor is not connected yet." },
      { status: 503 },
    );
  }

  const selectedMode: Mode = isMode(mode) ? mode : "chat";

  const cleaned = (Array.isArray(messages) ? messages : [])
    .map((m) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: typeof m?.content === "string" ? m.content : String(m?.content ?? ""),
    }))
    .filter((m) => m.content.trim().length > 0);

  while (cleaned.length && cleaned[0].role === "assistant") cleaned.shift();
  if (cleaned.length === 0) return Response.json({ error: "Nothing to send." }, { status: 400 });

  const system = `${SYSTEM_BASE}\n\n${MODE_PROMPTS[selectedMode]}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 2000, system, messages: cleaned }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Anthropic error", res.status, detail);
      return Response.json({ error: "The mentor is unavailable right now." }, { status: 502 });
    }

    const data = (await res.json()) as { content?: Array<{ type?: string; text?: string }> };
    const text = Array.isArray(data.content)
      ? data.content.filter((b) => b?.type === "text" && typeof b.text === "string").map((b) => b.text as string).join("\n").trim()
      : "";

    if (!text) return Response.json({ error: "Empty response." }, { status: 502 });
    return Response.json({ text });
  } catch (err) {
    console.error("Mentor route failure", err);
    return Response.json({ error: "Something went wrong reaching the mentor." }, { status: 500 });
  }
}
