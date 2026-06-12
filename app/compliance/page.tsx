import PageHeader from "../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compliance — TrueNorth",
  description: "DPDP Act 2023, GDPR, PII detection, and local Ollama deployment for zero data leakage.",
};

const complianceBlocks = [
  {
    flag: "🇮🇳",
    title: "DPDP Act 2023",
    subtitle: "India's Digital Personal Data Protection Act",
    color: "#FF6B35",
    features: [
      "Consent management with digital proof",
      "Data Principal rights (access, correction, erasure, nomination)",
      "Purpose limitation enforcement",
      "Retention period configuration",
      "Data Fiduciary obligations",
      "Breach notification hooks",
    ],
    code: `compliance:
  dpdp_act: true
  consent:
    required: true
    proof_storage: encrypted_db
  purpose: "Healthcare delivery"
  retention_days: 90
  data_principal_rights: enabled`,
  },
  {
    flag: "🇪🇺",
    title: "GDPR",
    subtitle: "EU General Data Protection Regulation",
    color: "#3178C6",
    features: [
      "6 legal bases for processing",
      "7 data subject rights",
      "Data minimisation by default",
      "Purpose binding",
      "Cross-border transfer controls",
      "DPA notification support",
    ],
    code: `compliance:
  gdpr: true
  legal_basis: legitimate_interest
  data_subject_rights: enabled
  data_minimisation: strict
  transfer_controls:
    eu_only: false
    adequacy_decision: required`,
  },
];

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance"
        title="Enterprise-ready from day one."
        subtitle="Zero-data-leakage. DPDP Act 2023. GDPR. Built for regulated industries — healthcare, finance, HR."
        breadcrumbs={[{ label: "Compliance" }]}
        accentColor="#00D4AA"
      />

      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { v: "2yr", l: "Head start on DPDP vs Western frameworks" },
            { v: "100%", l: "PII masked before LLM sees data" },
            { v: "0", l: "Data to cloud with local Ollama" },
            { v: "1", l: "Config block for full compliance" },
          ].map((s) => (
            <div key={s.l} className="p-4 rounded-xl border border-[#1E2329] bg-[#111318] text-center">
              <div className="text-3xl font-bold text-[#00D4AA] mb-2 stat-number">{s.v}</div>
              <div className="text-xs text-[#4A5568] leading-relaxed">{s.l}</div>
            </div>
          ))}
        </div>

        {/* DPDP + GDPR */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {complianceBlocks.map((block) => (
            <div key={block.title} className="rounded-xl border border-[#1E2329] bg-[#111318] overflow-hidden">
              <div className="p-6 border-b border-[#1E2329]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">{block.flag}</span>
                  <div>
                    <h2 className="font-bold text-[#F0F2F5]">{block.title}</h2>
                    <p className="text-xs text-[#4A5568]">{block.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {block.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#8B95A3]">
                      <span style={{ color: block.color }} className="shrink-0 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4">
                <pre className="text-xs font-mono text-[#A5D6FF] leading-relaxed overflow-x-auto">
                  <code>{block.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Local Ollama */}
        <section className="mb-16 p-8 rounded-xl border border-[#1E2329] bg-[#111318]">
          <div className="flex items-start gap-4">
            <div className="text-3xl shrink-0" aria-hidden="true">🔒</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#F0F2F5] mb-2">Local Ollama: Zero Data Leakage</h2>
              <p className="text-sm text-[#8B95A3] leading-relaxed mb-4">
                For healthcare and financial applications: run TrueNorth entirely on your own infrastructure. No data ever reaches a cloud LLM provider.
              </p>
              <pre className="text-xs font-mono text-[#A5D6FF] mb-4 bg-[#0A0B0D] p-3 rounded-lg overflow-x-auto">
{`# Install Ollama locally
ollama pull llama3.1

# Configure TrueNorth to use local model
engine:
  provider: ollama
  model: llama3.1
  base_url: http://localhost:11434
  # Zero data leaves this machine`}
              </pre>
            </div>
          </div>
        </section>

        {/* PII detection */}
        <section className="mb-16 p-8 rounded-xl border border-[#1E2329] bg-[#111318]">
          <h2 className="text-xl font-bold text-[#F0F2F5] mb-4">PII Detection</h2>
          <p className="text-sm text-[#8B95A3] leading-relaxed mb-4">
            Runs before any data reaches the LLM. Intercepts and masks: names, phone numbers, Aadhaar numbers, account numbers, email addresses, and custom patterns.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {["Aadhaar numbers", "Phone numbers", "Account numbers", "Email addresses", "Names", "Custom patterns"].map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm text-[#8B95A3]">
                <span className="text-[#00D4AA]">✓</span>
                {p}
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="p-8 rounded-2xl border border-[#00D4AA]/20 bg-[rgba(0,212,170,0.04)] text-center">
          <h2 className="text-2xl font-bold text-[#F0F2F5] mb-3">Enterprise deployment</h2>
          <p className="text-sm text-[#8B95A3] mb-6 max-w-lg mx-auto">
            Compliance audit report, custom PII patterns, dedicated deployment support, and DPDP consulting.
          </p>
          <a
            href="mailto:founders@truenorth.ai?subject=Enterprise"
            className="inline-block px-8 py-3 bg-[#00D4AA] text-black font-semibold rounded-none hover:bg-[#FF6B35] hover:text-white transition-colors text-sm"
          >
            Contact for Enterprise →
          </a>
        </section>
      </div>
    </>
  );
}
