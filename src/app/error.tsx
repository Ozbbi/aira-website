"use client";
import { useEffect } from "react";

// Next.js App Router error boundary — catches any render crash anywhere in the
// app (auth, API glue, whatever) and shows a recoverable screen instead of a
// blank white page. This is the permanent fix for "beyaz ekran" incidents.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("AIRA render error:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#03030A", color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: 24, textAlign: "center" }}>
      <div style={{ maxWidth: 420 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Something glitched</h1>
        <p style={{ fontSize: 14.5, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 24 }}>
          AIRA hit an unexpected snag loading this page. It&apos;s on us — try again in a moment.
        </p>
        <button
          onClick={() => reset()}
          style={{ padding: "12px 26px", borderRadius: 999, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#3B82F6,#7C3AED)", color: "#fff", fontSize: 14.5, fontWeight: 600 }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
