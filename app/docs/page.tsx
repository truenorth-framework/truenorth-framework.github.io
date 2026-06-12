import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction — TrueNorth Docs",
  description: "Why TrueNorth was built and what problem it solves.",
};

export default function DocsIntroPage() {
  return (
    <article className="prose-custom">
      <nav className="flex items-center gap-2 text-xs text-[#4A5568] mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#00D4AA] transition-colors">TrueNorth</Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</Link>
        <span>/</span>
        <span className="text-[#8B95A3]">Introduction</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Introduction</h1>
      <p className="text-lg text-[#8B95A3] mb-8 leading-relaxed">
        TrueNorth is a developer-first AI conversation engine. You declare what data you need in YAML. TrueNorth runs the entire conversation to collect it.
      </p>

      <div className="callout-info mb-8">
        <strong className="text-[#00D4AA]">TL;DR</strong>
        <p className="text-sm text-[#8B95A3] mt-1">
          Write a YAML schema. Get a production-ready AI agent that handles extraction, validation, compliance, reminders, and multi-language support — automatically.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-[#F0F2F5] mt-10 mb-4">Why TrueNorth exists</h2>

      <h3 className="text-lg font-semibold text-[#F0F2F5] mt-6 mb-3">The extraction problem nobody solved right</h3>
      <p className="text-[#8B95A3] leading-relaxed mb-4">
        LLMs are excellent at conversation but terrible at guaranteeing structured output. Every team building data-collection AI ends up re-implementing the same pieces: field tracking, validation, conflict detection, confidence scoring. TrueNorth ships all of it.
      </p>

      <h3 className="text-lg font-semibold text-[#F0F2F5] mt-6 mb-3">The compliance gap for India</h3>
      <p className="text-[#8B95A3] leading-relaxed mb-4">
        India's DPDP Act 2023 creates specific obligations: consent management, data principal rights, retention limits. No Western framework was designed around this. TrueNorth implements the full Act as a configuration block, not an afterthought.
      </p>

      <div className="my-8 border-l-4 border-[#00D4AA] pl-6">
        <p className="text-xl font-semibold text-[#F0F2F5] italic">
          "Configuration replaced 200 lines of Python."
        </p>
        <p className="text-sm text-[#4A5568] mt-2">— from production feedback</p>
      </div>

      <h3 className="text-lg font-semibold text-[#F0F2F5] mt-6 mb-3">The reminder nobody built</h3>
      <p className="text-[#8B95A3] leading-relaxed mb-4">
        Every AI framework assumes sessions complete in one sitting. TrueNorth&apos;s async reminder engine initiates contact days later with full session context — drafting a personalized follow-up message using the LLM and sending it via WhatsApp or any channel. This is a primitive no other framework offers.
      </p>

      <h2 className="text-2xl font-bold text-[#F0F2F5] mt-10 mb-4">When to use TrueNorth</h2>

      <p className="text-[#8B95A3] leading-relaxed mb-4">TrueNorth is the right tool when:</p>
      <ul className="space-y-2 mb-6">
        {[
          "You need to collect structured data through natural conversation",
          "You're operating in a regulated industry (healthcare, finance, HR)",
          "You need multi-language support for Indian languages",
          "You need sessions to survive network interruptions",
          "You want compliance baked in, not bolted on",
          "You need to know the cost of every API call",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-[#8B95A3]">
            <span className="text-[#00D4AA] mt-0.5 shrink-0">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-[#F0F2F5] mt-10 mb-4">Architecture in 30 seconds</h2>
      <p className="text-[#8B95A3] leading-relaxed mb-4">
        Every message runs through 13 sequential stages: language detection, emotion analysis, PII masking, conversation planning, field extraction, conflict detection, validation, confidence scoring, hallucination firewall, output generation, source tracing, cost recording, and MCP tool execution.
      </p>
      <p className="text-[#8B95A3] leading-relaxed mb-8">
        Every stage is auditable. Every stage can be configured. No black boxes.
      </p>

      <div className="flex gap-4 mt-10 pt-8 border-t border-[#1E2329]">
        <Link href="/docs/quickstart" className="flex-1 py-3 text-center rounded-lg bg-[#00D4AA] text-black font-semibold text-sm hover:bg-[#00997A] transition-colors">
          Quickstart →
        </Link>
        <Link href="/docs/architecture" className="flex-1 py-3 text-center rounded-lg border border-[#1E2329] text-[#8B95A3] text-sm hover:border-[#00D4AA] hover:text-[#F0F2F5] transition-all">
          Architecture
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-[#1E2329]">
        <a
          href="https://github.com/amareshhebbar/TrueNorth/blob/main/docs/introduction.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#4A5568] hover:text-[#00D4AA] transition-colors"
        >
          Edit this page on GitHub →
        </a>
      </div>
    </article>
  );
}
