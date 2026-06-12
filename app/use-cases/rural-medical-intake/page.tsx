import PageHeader from "../../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rural Medical Intake — TrueNorth Use Cases",
};

export default function RuralMedicalIntakePage() {
  return (
    <>
      <PageHeader
        eyebrow="Use Case"
        title="Rural Medical Intake"
        subtitle="Collecting 12 critical fields in Kannada, Hindi, or English — without reliable internet. Built for PHCs and rural health workers."
        breadcrumbs={[{ label: "Use Cases", href: "/use-cases" }, { label: "Rural Medical Intake" }]}
        accentColor="#FF6B35"
      />

      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { v: "79%", l: "Completion rate" },
            { v: "~9", l: "Average turns" },
            { v: "0", l: "Internet required" },
            { v: "22+", l: "Languages" },
          ].map((s) => (
            <div key={s.l} className="p-4 rounded-xl border border-[#1E2329] bg-[#111318] text-center">
              <div className="text-3xl font-bold text-[#FF6B35] mb-1 stat-number">{s.v}</div>
              <div className="text-xs text-[#4A5568]">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Problem */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">The problem</h2>
          <div className="space-y-3 text-[#8B95A3] leading-relaxed text-sm">
            <p>Primary Health Centers in rural India face a documentation crisis. Health workers need to collect 12+ structured data points per patient — but 40% of PHCs have unreliable internet, and most patients speak regional languages like Kannada, Telugu, or Odia.</p>
            <p>Existing solutions either require constant connectivity, or force English-only input that excludes the patients who need care most.</p>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">The TrueNorth solution</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "📱", title: "Offline SQLite", desc: "All session data stored locally. Syncs when connectivity returns." },
              { icon: "🇮🇳", title: "Auto language detect", desc: "Patients speak in any of 22+ languages. TrueNorth responds in kind." },
              { icon: "📊", title: "Structured output", desc: "12 fields extracted and validated. JSON sent to the state health system on sync." },
            ].map((s) => (
              <div key={s.title} className="p-4 rounded-xl border border-[#1E2329] bg-[#111318]">
                <div className="text-2xl mb-3" aria-hidden="true">{s.icon}</div>
                <h3 className="text-sm font-semibold text-[#F0F2F5] mb-2">{s.title}</h3>
                <p className="text-xs text-[#8B95A3] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* YAML config */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">YAML configuration</h2>
          <div className="rounded-xl border border-[#1E2329] bg-[#111318] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1E2329] flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-xs font-mono text-[#4A5568]">medical_intake.yaml</span>
            </div>
            <pre className="p-4 text-xs font-mono text-[#A5D6FF] leading-relaxed overflow-x-auto">
{`id: medical_intake
persona: "You are a compassionate health assistant. Speak in the patient's language."

compliance:
  dpdp_act: true
  purpose: "Healthcare delivery under DPDP Act Section 4(b)"
  retention_days: 90

offline:
  enabled: true
  storage: sqlite
  sync_on_reconnect: true

fields:
  - name: patient_name
    type: text
    required: true
    question: "What is your name?"

  - name: age
    type: integer
    range: [0, 120]
    question: "How old are you?"

  - name: chief_complaint
    type: text
    question: "What health issue brings you in today?"

  - name: pain_scale
    type: integer
    range: [0, 10]
    question: "How severe is your pain, from 0 to 10?"

  - name: duration_days
    type: integer
    question: "How many days have you had this issue?"

  - name: allergies
    type: text
    required: false
    question: "Any known allergies?"

output_template: medical_intake_v2
send_to: "https://statehealth.gov.in/api/intake"`}
            </pre>
          </div>
        </section>

        {/* Install CTA */}
        <div className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] text-center">
          <div className="font-mono text-sm text-[#A8FF78] mb-4">
            $ truenorth install medical-intake
          </div>
          <p className="text-xs text-[#4A5568] mb-4">Installs the full medical-intake goal with default YAML, validation rules, and DPDP compliance block</p>
          <Link href="/playground" className="inline-block px-6 py-2 bg-[#FF6B35] text-white font-semibold text-sm rounded-none hover:bg-[#D4541F] transition-colors">
            Try in Playground →
          </Link>
        </div>
      </div>
    </>
  );
}
