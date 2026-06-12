import PageHeader from "../../components/PageHeader";
import Link from "next/link";

export default function UseCasePage() {
  const configs: Record<string, { title: string; subtitle: string; eyebrow: string; accent: string }> = {
    "hr-screening": {
      eyebrow: "HR Screening",
      title: "Structured candidate data. Zero manual effort.",
      subtitle: "Collect 15 fields from candidates via WhatsApp or web. Output goes straight to your ATS as structured JSON.",
      accent: "#00D4AA",
    },
    "lead-qualification": {
      eyebrow: "Lead Qualification",
      title: "WhatsApp leads, structured instantly.",
      subtitle: "Phone number in, qualified lead JSON out. Integrates with any CRM via webhook.",
      accent: "#25D366",
    },
  };
  const slug = "lead-qualification";
  const c = configs[slug];
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle}
        breadcrumbs={[{ label: "Use Cases", href: "/use-cases" }, { label: c.eyebrow }]}
        accentColor={c.accent}
      />
      <div className="max-w-[1280px] mx-auto px-6 pb-24 text-center">
        <p className="text-[#4A5568] text-sm mb-6">Full case study coming soon.</p>
        <Link href="/playground" className="inline-block px-6 py-3 bg-[#00D4AA] text-black font-semibold rounded-none hover:bg-[#00997A] transition-colors text-sm">
          Try in Playground →
        </Link>
      </div>
    </>
  );
}
