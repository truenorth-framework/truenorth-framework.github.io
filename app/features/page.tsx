import Link from "next/link";
import PageHeader from "../components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — TrueNorth",
  description: "What makes TrueNorth different from every other AI conversation framework.",
};


const features = [
  {
    slug: "yaml-engine",
    icon: "⚙️",
    title: "YAML Engine",
    desc: "Configure entire AI agents in 15 lines of YAML. No state management, no validation logic, no turn tracking. It just works.",
    highlights: ["Schema-driven agents", "Conditional field flows", "Custom personas", "Output templates"],
  },
  {
    slug: "hallucination-firewall",
    icon: "🛡️",
    title: "Hallucination Firewall",
    desc: "3-stage claim extraction, verification, and sanitization pipeline. ~2% hallucination rate vs 18.3% for raw LLMs.",
    highlights: ["Claim extractor", "Claim verifier", "Output sanitizer", "~94% catch rate"],
  },
  {
    slug: "offline-first",
    icon: "📡",
    title: "Offline First",
    desc: "SQLite-backed local sessions. Conversations survive network outages, power cuts, and poor connectivity.",
    highlights: ["SQLite on-device", "Auto sync on reconnect", "Queue management", "Rural deployment ready"],
  },
  {
    slug: "multilingual",
    icon: "🌐",
    title: "Multilingual",
    desc: "22+ language support with auto-detection. Hindi, Tamil, Kannada, Telugu, and 18 more — respond in the language the user speaks.",
    highlights: ["Auto language detection", "22+ languages", "Code-switching aware", "Indian language first"],
  },
  {
    slug: "async-reminders",
    icon: "🔔",
    title: "Async Reminders",
    desc: "The only AI conversation framework that initiates contact. LLM drafts personalized follow-ups days after an incomplete session.",
    highlights: ["Session-aware follow-ups", "LLM-drafted messages", "WhatsApp delivery", "Configurable triggers"],
  },
];

export default function FeaturesIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Features"
        title="What makes TrueNorth different"
        subtitle="Every feature exists because a production system needed it. No demos, no toy examples."
        breadcrumbs={[{ label: "Features" }]}
      />

      <div className="max-w-[1280px] mx-auto px-6 pb-24 space-y-6">
        {features.map((f, i) => (
          <Link
            key={f.slug}
            href={`/features/${f.slug}`}
            className="group flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA] transition-all"
          >
            <div className="text-4xl shrink-0" role="img" aria-hidden="true">{f.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#F0F2F5] mb-2 group-hover:text-[#00D4AA] transition-colors">
                {f.title}
              </h2>
              <p className="text-[#8B95A3] text-sm leading-relaxed mb-4">{f.desc}</p>
              <div className="flex flex-wrap gap-2">
                {f.highlights.map((h) => (
                  <span key={h} className="px-2 py-1 text-xs rounded bg-[#1E2329] text-[#4A5568] border border-[#1E2329] group-hover:border-[#00D4AA33] group-hover:text-[#8B95A3] transition-all">
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-[#00D4AA] text-sm shrink-0">
              Learn more →
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
