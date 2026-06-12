import PageHeader from "../../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hallucination Firewall — TrueNorth Features",
};

export default function HallucinationFirewallPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hallucination Firewall"
        title="~2% hallucination rate. Not 18%."
        subtitle="A 3-stage pipeline that extracts claims, verifies them against source turns, and sanitizes any that can't be confirmed."
        breadcrumbs={[{ label: "Features", href: "/features" }, { label: "Hallucination Firewall" }]}
        accentColor="#FF6B35"
      />
      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        {/* Pipeline diagram */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-3xl">
            {[
              { n: "01", name: "ClaimExtractor", desc: "Identifies all factual claims in the LLM output before delivery", color: "#79C0FF" },
              { n: "02", name: "ClaimVerifier", desc: "Cross-references each claim against source conversation turns", color: "#FFD700" },
              { n: "03", name: "OutputSanitizer", desc: "Removes unverified claims, replaces with null or follow-up question", color: "#00D4AA" },
            ].map((stage, i) => (
              <div key={stage.n} className="flex md:flex-col items-center gap-3 flex-1">
                <div className="flex-1 p-4 rounded-xl border bg-[#111318] text-center" style={{ borderColor: stage.color + "40" }}>
                  <div className="text-xs font-mono mb-2" style={{ color: stage.color }}>STAGE {stage.n}</div>
                  <div className="font-semibold text-[#F0F2F5] mb-2 text-sm">{stage.name}</div>
                  <div className="text-xs text-[#8B95A3] leading-relaxed">{stage.desc}</div>
                </div>
                {i < 2 && (
                  <div className="text-[#4A5568] text-xl md:rotate-90">→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16 grid md:grid-cols-3 gap-6">
          {[
            { value: "~2%", label: "Hallucination rate", sub: "vs 18.3% raw LLM" },
            { value: "94%", label: "Claim catch rate", sub: "in blind evaluations" },
            { value: "0ms", label: "Added latency", sub: "runs in the same LLM call" },
          ].map((s) => (
            <div key={s.label} className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] text-center">
              <div className="text-4xl font-bold text-[#FF6B35] mb-2 stat-number">{s.value}</div>
              <div className="text-[#F0F2F5] font-medium mb-1">{s.label}</div>
              <div className="text-xs text-[#4A5568]">{s.sub}</div>
            </div>
          ))}
        </section>

        {/* Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F2F5] mb-6">Real example: medical intake</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-red-900/40 bg-[#110A0A] p-4">
              <div className="text-xs text-red-400 font-semibold mb-3">❌ Raw LLM output (invented data)</div>
              <p className="text-sm text-[#8B95A3] font-mono">
                Based on your conversation, your blood pressure appears to be <span className="text-red-400 line-through">120/80</span> and you seem to have a <span className="text-red-400 line-through">mild fever of 37.5°C</span>.
              </p>
              <p className="text-xs text-red-400 mt-2">⚠ These values were never mentioned in the conversation</p>
            </div>
            <div className="rounded-xl border border-[#00D4AA]/30 bg-[#0A1410] p-4">
              <div className="text-xs text-[#00D4AA] font-semibold mb-3">✓ TrueNorth Firewall output</div>
              <p className="text-sm text-[#8B95A3] font-mono">
                Based on your conversation, I&apos;d like to confirm a few things. Could you share your current blood pressure reading? And have you measured your temperature recently?
              </p>
              <p className="text-xs text-[#00D4AA] mt-2">✓ Unverifiable claims removed, follow-ups generated</p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/playground" className="inline-block px-8 py-3 bg-[#FF6B35] text-white font-semibold rounded-none hover:bg-[#D4541F] transition-colors">
            See Hallucination Firewall in Playground →
          </Link>
        </div>
      </div>
    </>
  );
}
