"use client";

import { useEffect, useRef } from "react";
import PageHeader from "../components/PageHeader";

const releases = [
  {
    version: "v0.1.5",
    date: "2026-06-10",
    tag: "latest",
    entries: [
      { type: "NEW", text: "A2A protocol bridge for AutoGen and CrewAI agents" },
      { type: "NEW", text: "Go SDK v0.1.5 — full parity with Python core" },
      { type: "FIX", text: "SQLite sync race condition on rapid network reconnect" },
      { type: "FIX", text: "Hindi language detection edge case with mixed Devanagari/Latin text" },
      { type: "DOCS", text: "WhatsApp Business full integration guide with phone-frame mockup" },
      { type: "PERF", text: "Hallucination firewall 40% faster — claim extraction now batched" },
    ],
  },
  {
    version: "v0.1.4",
    date: "2026-05-28",
    tag: null,
    entries: [
      { type: "NEW", text: "Async reminder engine — schedule follow-up messages post-session" },
      { type: "NEW", text: "DPDP Act 2023 compliance module with consent management" },
      { type: "NEW", text: "React Native / Expo SDK with ImpossibleAI offline inference" },
      { type: "FIX", text: "Confidence scoring edge case when all fields are optional" },
      { type: "FIX", text: "Cost recording now accurate for multi-turn sessions with retries" },
      { type: "DOCS", text: "Added architecture deep-dive for the 13-stage pipeline" },
    ],
  },
  {
    version: "v0.1.3",
    date: "2026-05-14",
    tag: null,
    entries: [
      { type: "NEW", text: "Multilingual support — 22+ Indian languages via auto-detect" },
      { type: "NEW", text: "PII interceptor with Aadhaar, PAN card, and phone number masking" },
      { type: "NEW", text: "Node.js SDK — TypeScript-native with full async/await support" },
      { type: "PERF", text: "50% reduction in LLM calls via smarter conversation planning" },
      { type: "FIX", text: "Conflict detection now handles temporal contradictions correctly" },
    ],
  },
  {
    version: "v0.1.2",
    date: "2026-04-30",
    tag: null,
    entries: [
      { type: "NEW", text: "Hallucination Firewall — 3-stage claim extract→verify→sanitize" },
      { type: "NEW", text: "Offline-first mode with SQLite local storage and background sync" },
      { type: "NEW", text: "WhatsApp Business API integration with session management" },
      { type: "BREAKING", text: "YAML schema v2 — `output_template` replaces `fields.output`" },
      { type: "DOCS", text: "Rural Medical Intake case study with full YAML config" },
    ],
  },
  {
    version: "v0.1.1",
    date: "2026-04-10",
    tag: null,
    entries: [
      { type: "NEW", text: "Emotion detection — valence + arousal scoring per turn" },
      { type: "NEW", text: "Source tracing — sentence-level attribution back to original input" },
      { type: "FIX", text: "Language detection fails silently on empty messages — now defaults to EN" },
      { type: "PERF", text: "Token usage reduced by 23% via prompt compression" },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-03-22",
    tag: "initial",
    entries: [
      { type: "NEW", text: "Initial release — Python SDK with 13-stage conversation engine" },
      { type: "NEW", text: "YAML-driven agent definition — zero Python required" },
      { type: "NEW", text: "8 LLM provider integrations (OpenAI, Anthropic, Gemini, Ollama, and more)" },
      { type: "NEW", text: "Field extraction, validation, and confidence scoring pipeline" },
      { type: "NEW", text: "MCP tool execution — calculator, web search, custom tools" },
      { type: "DOCS", text: "Full documentation site, quickstart guide, and SDK reference" },
    ],
  },
];

const badgeStyle: Record<string, string> = {
  NEW: "bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20",
  FIX: "bg-[#3178C6]/10 text-[#79C0FF] border border-[#3178C6]/20",
  BREAKING: "bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20",
  DOCS: "bg-[#8B95A3]/10 text-[#8B95A3] border border-[#8B95A3]/20",
  PERF: "bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20",
};

export default function ChangelogPage() {
  const spineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && spineRef.current) {
            spineRef.current.style.animation = "drawSpine 1.5s ease-out forwards";
          }
        });
      },
      { threshold: 0.1 }
    );
    if (spineRef.current) observer.observe(spineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="What's New"
        title="Changelog"
        subtitle="Every release, every fix, every improvement. TrueNorth ships fast."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Changelog" }]}
      />

      <section className="max-w-3xl mx-auto px-6 pb-32">
        {/* Subscribe CTA */}
        <div className="mb-16 p-4 rounded-lg border border-[#1E2329] bg-[#111318] flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-[#8B95A3]">
              Get notified of new releases
            </p>
          </div>
          <a
            href="https://github.com/amareshhebbar/TrueNorth/subscription"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded border border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-colors"
          >
            Watch on GitHub →
          </a>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Spine */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#1E2329]" />

          <div className="space-y-16">
            {releases.map((release, releaseIdx) => (
              <div
                key={release.version}
                className="relative pl-12"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease-out forwards`,
                  animationDelay: `${releaseIdx * 100}ms`,
                }}
              >
                {/* Node */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#111318] border-2 border-[#00D4AA] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00D4AA]" />
                </div>

                {/* Version header */}
                <div id={release.version} className="flex items-center gap-3 mb-4 flex-wrap">
                  <h2 className="text-2xl font-bold text-[#F0F2F5]">
                    {release.version}
                  </h2>
                  {release.tag === "latest" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/30 font-medium">
                      LATEST
                    </span>
                  )}
                  {release.tag === "initial" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/30 font-medium">
                      INITIAL RELEASE
                    </span>
                  )}
                  <span className="text-sm text-[#4A5568] ml-auto font-mono">
                    {release.date}
                  </span>
                  <a
                    href={`https://github.com/amareshhebbar/TrueNorth/releases/tag/${release.version}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#8B95A3] hover:text-[#00D4AA] transition-colors"
                  >
                    View on GitHub →
                  </a>
                </div>

                {/* Entries */}
                <div className="space-y-3">
                  {release.entries.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono font-semibold flex-shrink-0 mt-0.5 ${badgeStyle[entry.type] || "bg-[#8B95A3]/10 text-[#8B95A3]"}`}
                      >
                        {entry.type}
                      </span>
                      <p className="text-[#8B95A3] text-sm leading-relaxed">{entry.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
