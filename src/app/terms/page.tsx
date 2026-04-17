import Link from "next/link";

export const metadata = {
  title: "Terms — AIRA",
  description: "AIRA terms of service.",
};

export default function TermsPage() {
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
          Terms
        </h1>
        <div className="mt-8 space-y-5 text-aira-muted leading-relaxed">
          <p>
            AIRA is provided as-is. Pro purchases are non-refundable but
            we&apos;ll work with you if something&apos;s wrong.
          </p>
          <p>
            Use AIRA to learn. Don&apos;t abuse the service. Respect the
            content — it was written by a human, for humans.
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
