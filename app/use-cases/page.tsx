import Link from "next/link";
import PageHeader from "../components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases — TrueNorth",
};

const cases = [
  {
    href: "/use-cases/rural-medical-intake",
    icon: "🏥",
    title: "Rural Medical Intake",
    desc: "Offline-first AI intake for rural clinics. No internet required. Hindi, Kannada, and 20+ languages.",
    stats: ["79% completion rate", "~9 turns average", "Offline capable"],
    accent: "#FF6B35",
  },
  {
    href: "/use-cases/hr-screening",
    icon: "💼",
    title: "HR Screening",
    desc: "Collect 15 structured fields from candidates via WhatsApp. Output goes straight to your ATS.",
    stats: ["88% completion", "7.4 avg turns", "$0.004 per screen"],
    accent: "#00D4AA",
  },
  {
    href: "/use-cases/lead-qualification",
    icon: "📲",
    title: "Lead Qualification",
    desc: "WhatsApp-native lead collection. Phone number → session → structured lead data in your CRM.",
    stats: ["WhatsApp native", "Real-time extraction", "CRM ready output"],
    accent: "#25D366",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use Cases"
        title="Built for real industries"
        subtitle="Not toy demos. Production deployments with real completion rates and benchmarks."
        breadcrumbs={[{ label: "Use Cases" }]}
      />
      <div className="max-w-[1280px] mx-auto px-6 pb-24 space-y-6">
        {cases.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col md:flex-row gap-6 p-8 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA] transition-all"
          >
            <div className="text-5xl shrink-0" role="img" aria-hidden="true">{c.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#F0F2F5] mb-3 group-hover:text-[#00D4AA] transition-colors">{c.title}</h2>
              <p className="text-[#8B95A3] text-sm leading-relaxed mb-4">{c.desc}</p>
              <div className="flex flex-wrap gap-2">
                {c.stats.map((s) => (
                  <span key={s} className="px-3 py-1 text-xs rounded-full border text-[#8B95A3]" style={{ borderColor: c.accent + "40", background: c.accent + "10" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-[#00D4AA] text-sm shrink-0">Read case study →</div>
          </Link>
        ))}
      </div>
    </>
  );
}
