import Link from "next/link";

export const metadata = {
  title: "Privacy — AIRA",
  description: "AIRA privacy policy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-aira-bg text-aira-text py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm text-aira-glow hover:text-aira-text transition-colors"
        >
          ← Back to home
        </Link>
        <h1
          className="mt-8 text-4xl md:text-5xl font-bold"
          style={{
            fontFamily:
              "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
          }}
        >
          Privacy
        </h1>
        <div className="mt-8 space-y-5 text-aira-muted leading-relaxed">
          <p>
            AIRA collects your lesson progress locally. We don&apos;t sell
            your data. We don&apos;t track you across the web.
          </p>
          <p>
            Your learning data stays on your device. We only collect what
            we need to make AIRA better — and even that is anonymous.
          </p>
          <p>
            Contact:{" "}
            <a
              className="text-aira-glow hover:text-aira-text"
              href="mailto:ozuysalcaboramir@gmail.com"
            >
              ozuysalcaboramir@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
