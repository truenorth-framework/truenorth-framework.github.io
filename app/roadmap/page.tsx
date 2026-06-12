"use client";

import PageHeader from "../components/PageHeader";

const columns: {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  items: { text: string; done: boolean; wip?: boolean }[];
}[] = [
  {
    id: "now",
    label: "NOW",
    sublabel: "v0.1.x",
    color: "#00D4AA",
    items: [
      { text: "Python SDK", done: true },
      { text: "Node.js / TypeScript SDK", done: true },
      { text: "Go SDK", done: true },
      { text: "React Native / Expo SDK", done: true },
      { text: "Hallucination Firewall", done: true },
      { text: "13-stage pipeline engine", done: true },
      { text: "DPDP Act 2023 module", done: true },
      { text: "GDPR compliance module", done: true },
      { text: "Offline-first SQLite mode", done: true },
      { text: "Multilingual (22+ languages)", done: true },
      { text: "WhatsApp Business integration", done: true },
      { text: "8 LLM provider integrations", done: true },
      { text: "MCP tool execution", done: true },
    ],
  },
  {
    id: "next",
    label: "NEXT",
    sublabel: "v0.2",
    color: "#79C0FF",
    items: [
      { text: "Postgres-backed session store", done: false, wip: true },
      { text: "APScheduler integration for reminders", done: false, wip: true },
      { text: "Redis cache layer", done: false, wip: false },
      { text: "Production-ready reminder delivery", done: false, wip: false },
      { text: "WhatsApp v2 API (Cloud API)", done: false, wip: false },
      { text: "Stripe billing integration for cost tracking", done: false, wip: false },
      { text: "gRPC transport layer", done: false, wip: false },
    ],
  },
  {
    id: "soon",
    label: "SOON",
    sublabel: "v0.3",
    color: "#FFD700",
    items: [
      { text: "TrueNorth Studio — visual agent builder", done: false, wip: false },
      { text: "Voice input (Whisper integration)", done: false, wip: false },
      { text: "YAML editor with live validation UI", done: false, wip: false },
      { text: "Analytics dashboard", done: false, wip: false },
      { text: "A/B test framework for agents", done: false, wip: false },
      { text: "Kotlin Android SDK", done: false, wip: false },
      { text: "Swift iOS SDK", done: false, wip: false },
    ],
  },
  {
    id: "future",
    label: "FUTURE",
    sublabel: "v1.0",
    color: "#FF6B35",
    items: [
      { text: "Hosted API (managed TrueNorth cloud)", done: false, wip: false },
      { text: "Goal marketplace — public launch", done: false, wip: false },
      { text: "Visual flow builder (no-code)", done: false, wip: false },
      { text: "Enterprise SSO + audit logs", done: false, wip: false },
      { text: "Multi-tenant SaaS mode", done: false, wip: false },
      { text: "Real-time collaboration on YAML schemas", done: false, wip: false },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="What's Coming"
        title="Roadmap"
        subtitle="TrueNorth is moving fast. Here's what we're building and when."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Roadmap" }]}
      />

      <section className="max-w-7xl mx-auto px-6 pb-32">
        {/* Vote CTA */}
        <div className="mb-12 p-4 rounded-lg border border-[#1E2329] bg-[#111318] flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[#F0F2F5] font-medium mb-1">Shape the roadmap</p>
            <p className="text-sm text-[#8B95A3]">
              Vote on features, suggest ideas, and track what gets shipped.
            </p>
          </div>
          <a
            href="https://github.com/amareshhebbar/TrueNorth/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded border border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-colors flex-shrink-0"
          >
            Vote on Features →
          </a>
        </div>

        {/* Columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {columns.map((col) => (
            <div key={col.id} className="flex flex-col">
              {/* Column header */}
              <div
                className="mb-4 pb-3 border-b-2"
                style={{ borderColor: col.color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-mono font-bold tracking-widest"
                    style={{ color: col.color }}
                  >
                    {col.label}
                  </span>
                  <span className="text-xs text-[#4A5568] font-mono">
                    {col.sublabel}
                  </span>
                </div>
                <div className="text-xs text-[#8B95A3]">
                  {col.items.filter((i) => i.done).length}/{col.items.length} complete
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-2">
                {col.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-sm flex items-start gap-2.5 transition-colors ${
                      item.done
                        ? "border-[#00D4AA]/20 bg-[#00D4AA]/5 text-[#8B95A3]"
                        : item.wip
                        ? "border-[#79C0FF]/20 bg-[#79C0FF]/5 text-[#F0F2F5]"
                        : "border-[#1E2329] bg-[#111318] text-[#8B95A3]"
                    }`}
                    style={{
                      opacity: 0,
                      animation: `fadeInUp 0.4s ease-out forwards`,
                      animationDelay: `${idx * 60}ms`,
                    }}
                  >
                    <span className="flex-shrink-0 mt-0.5">
                      {item.done ? (
                        <svg className="w-4 h-4 text-[#00D4AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : item.wip ? (
                        <span className="block w-4 h-4 rounded-full border-2 border-[#79C0FF] border-t-transparent animate-spin" />
                      ) : (
                        <span className="block w-4 h-4 rounded-full border-2 border-[#4A5568]" />
                      )}
                    </span>
                    <span className={item.done ? "line-through opacity-60" : ""}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 flex items-center gap-8 flex-wrap text-sm text-[#8B95A3]">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#00D4AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Shipped
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-4 h-4 rounded-full border-2 border-[#79C0FF] border-t-transparent" />
            In Progress
          </div>
          <div className="flex items-center gap-2">
            <span className="block w-4 h-4 rounded-full border-2 border-[#4A5568]" />
            Planned
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
