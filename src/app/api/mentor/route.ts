/**
 * AIRA AI Mentor — server-side Google Gemini proxy (free tier).
 *
 * GEMINI_API_KEY lives ONLY in server env (Vercel env var) and is never
 * exposed to the client. The browser POSTs { messages, mode }; we add the
 * right system prompt, call Gemini, and return the assistant text.
 *
 * mode ∈ "chat" | "summary" | "test" | "program"
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

type Mode = "chat" | "summary" | "test" | "program";

const SYSTEM_BASE = `You are AIRA, a premium AI mentor — for studying, but also fitness & sports training, languages, skills, and any goal someone wants a real plan for.

Voice: warm, encouraging, genuinely helpful — like a sharp friend who happens to be an expert. Be clear and human, never robotic or gimmicky. Get to the point but stay kind. When a goal is given, you may ask ONE quick clarifying question — but never interrogate; if they gave enough, just deliver real value.

When a question needs current or real-world information (recent research, a sport's technique, a specific program, today's facts), use web search to ground your answer and weave the findings in naturally — cite a source name when it matters.

Formatting: clean markdown. Short headings (##), **bold** key terms, bullet or numbered lists. Tight paragraphs. No emojis.`;

const MODE_PROMPTS: Record<Mode, string> = {
  chat:
    "Mode: MENTOR. Be warm and genuinely useful. Answer clearly and directly first, then add a short " +
    "'why it works' or a concrete next step. You may ask one guiding question if it truly helps them think — " +
    "but never withhold the answer. If the topic needs current facts, look it up.",
  summary:
    "Mode: SUMMARY. The user pastes lecture notes or source material. Produce a clean summary:\n" +
    "## Overview (2-3 sentences)\n## Key concepts (bullets; **bold** the term, then a one-line " +
    "explanation)\n## Remember this (3-5 high-yield takeaways for recall).",
  test:
    "Mode: TEST. The user pastes material. Generate a practice quiz from it ONLY:\n" +
    "## Quiz (6-8 questions, mix of multiple-choice and short-answer, numbered)\n" +
    "## Answer key (numbered to match, one-line rationale each). Do not invent facts beyond the material.",
  program:
    "Mode: PLAN. Build a personalized, realistic plan for the user's goal — study, fitness/sport training, " +
    "language learning, a skill, anything. Output day-by-day or week-by-week (## Day 1 / ## Week 1 ...). Each block: " +
    "a focus, 2-4 concrete actions, and a progress checkpoint. For study, build in active-recall + spaced repetition; " +
    "for sport/fitness, build in progressive overload + recovery. If current info helps (real programs, techniques), look it up. End with '## How to use this plan'.",
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

  const { messages, mode, name, image } = (body ?? {}) as {
    messages?: Array<{ role?: string; content?: unknown }>;
    mode?: unknown;
    name?: unknown;
    image?: { mime?: unknown; data?: unknown };
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "not_configured", message: "The mentor is not connected yet." },
      { status: 503 },
    );
  }

  const selectedMode: Mode = isMode(mode) ? mode : "chat";

  // Normalize, guard, and convert to Gemini's content format (role: user | model).
  const cleaned = (Array.isArray(messages) ? messages : [])
    .map((m) => ({
      role: m?.role === "assistant" ? "model" : "user",
      content: typeof m?.content === "string" ? m.content : String(m?.content ?? ""),
    }))
    .filter((m) => m.content.trim().length > 0);

  while (cleaned.length && cleaned[0].role === "model") cleaned.shift();
  if (cleaned.length === 0) return Response.json({ error: "Nothing to send." }, { status: 400 });

  const contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> = cleaned.map((m) => ({ role: m.role, parts: [{ text: m.content }] }));
  // attach an uploaded image to the latest user turn (Gemini vision)
  if (image && typeof image.data === "string" && image.data.length > 0 && contents.length > 0) {
    const mime = typeof image.mime === "string" && image.mime.startsWith("image/") ? image.mime : "image/jpeg";
    contents[contents.length - 1].parts.push({ inline_data: { mime_type: mime, data: image.data } });
  }
  const learner = typeof name === "string" && name.trim() ? `\n\nThe learner's name is ${name.trim()}. Address them by name naturally and personalize your guidance to them.` : "";
  const system = `${SYSTEM_BASE}\n\n${MODE_PROMPTS[selectedMode]}${learner}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
          tools: [{ google_search: {} }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Gemini error", res.status, detail);
      return Response.json({ error: "The mentor is unavailable right now." }, { status: 502 });
    }

    const data = (await res.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const text = (data.candidates?.[0]?.content?.parts ?? [])
      .map((p) => (typeof p?.text === "string" ? p.text : ""))
      .join("")
      .trim();

    if (!text) return Response.json({ error: "Empty response." }, { status: 502 });
    return Response.json({ text });
  } catch (err) {
    console.error("Mentor route failure", err);
    return Response.json({ error: "Something went wrong reaching the mentor." }, { status: 500 });
  }
}
