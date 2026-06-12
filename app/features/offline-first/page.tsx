import PageHeader from "../../components/PageHeader";
import Link from "next/link";

export default function FeaturePage() {
  const config: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
    "offline-first": {
      eyebrow: "Offline First",
      title: "Conversations that survive network outages.",
      subtitle: "SQLite-backed local sessions with automatic sync on reconnect. Built for rural India and anywhere connectivity is unreliable.",
    },
    "multilingual": {
      eyebrow: "Multilingual",
      title: "22+ languages. Auto-detect. Zero config.",
      subtitle: "Hindi, Tamil, Kannada, Telugu, Malayalam, Bengali — and 16 more. TrueNorth detects language automatically and responds in kind.",
    },
    "async-reminders": {
      eyebrow: "Async Reminders",
      title: "The only framework that initiates contact.",
      subtitle: "Configure follow-up rules in YAML. TrueNorth checks incomplete sessions, drafts a personalized message using the LLM, and sends it via WhatsApp or any channel.",
    },
  };
  const slug = "offline-first";
  const c = config[slug] || { eyebrow: "Feature", title: "Feature Page", subtitle: "" };
  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
        breadcrumbs={[{ label: "Features", href: "/features" }, { label: c.eyebrow }]}
      />
      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center py-12 text-[#4A5568]">
          <p className="text-sm mb-6">Full documentation coming soon. Try the playground to see this feature live.</p>
          <Link href="/playground" className="inline-block px-6 py-3 bg-[#00D4AA] text-black font-semibold rounded-none hover:bg-[#00997A] transition-colors text-sm">
            Open Playground →
          </Link>
        </div>
      </div>
    </>
  );
}
