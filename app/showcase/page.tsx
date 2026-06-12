"use client";

import PageHeader from "../components/PageHeader";

const projects = [
  {
    name: "HealthBridge India",
    description: "Rural health intake system deployed across 50 ASHA workers in Raichur, Karnataka. Processes 200+ intakes/week with offline support.",
    sdk: "Python",
    domain: "Healthcare",
    author: "Dr. Kavitha Rao",
    url: "#",
    stats: "200+ intakes/week · 79% completion",
  },
  {
    name: "TalentFlow HR",
    description: "HR screening agent integrated with Zoho Recruit. Screens candidates in Hindi, Tamil, and English with structured JSON output to ATS.",
    sdk: "Node.js",
    domain: "HR Tech",
    author: "Rohit Mehta",
    url: "#",
    stats: "3 languages · 88% completion",
  },
  {
    name: "LeadBot WhatsApp",
    description: "B2B lead qualification via WhatsApp Business API. Collects 10 qualification fields, scores leads, syncs to Salesforce.",
    sdk: "Node.js",
    domain: "Sales",
    author: "Priya Nair",
    url: "#",
    stats: "10 fields · 87% completion",
  },
  {
    name: "InsureAssist",
    description: "Insurance claim intake for rural policyholders. Works offline, supports 5 regional languages, DPDP Act compliant.",
    sdk: "Python",
    domain: "Insurance",
    author: "Anand Krishnan",
    url: "#",
    stats: "DPDP compliant · 5 languages",
  },
  {
    name: "EduOnboard",
    description: "Student onboarding agent for an EdTech platform. Collects learning preferences, goals, and schedules in under 10 turns.",
    sdk: "Go",
    domain: "EdTech",
    author: "Shreya Bhat",
    url: "#",
    stats: "< 10 turns avg · $0.001/session",
  },
  {
    name: "GovForm AI",
    description: "Government scheme eligibility checker. 22 YAML fields, multilingual, zero cloud dependency (runs on local Ollama).",
    sdk: "React Native",
    domain: "GovTech",
    author: "Vijay Kumar",
    url: "#",
    stats: "22 fields · Zero cloud dependency",
  },
];

const sdkColors: Record<string, string> = {
  Python: "#FFD700",
  "Node.js": "#00D4AA",
  Go: "#00ADD8",
  "React Native": "#3178C6",
};

const domainColors: Record<string, string> = {
  Healthcare: "#FF6B35",
  "HR Tech": "#00D4AA",
  Sales: "#79C0FF",
  Insurance: "#FFD700",
  EdTech: "#00D4AA",
  GovTech: "#8B95A3",
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Built With TrueNorth"
        title="Showcase"
        subtitle="Real projects built by the community. From rural healthcare to enterprise sales — TrueNorth in production."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Showcase" }]}
      />

      <section className="max-w-6xl mx-auto px-6 pb-32">
        {/* Submit CTA */}
        <div className="mb-12 p-5 rounded-xl border border-[#00D4AA]/20 bg-[#00D4AA]/5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-[#F0F2F5] mb-1">Built something with TrueNorth?</p>
            <p className="text-sm text-[#8B95A3]">Share your project with the community. All SDKs, all domains welcome.</p>
          </div>
          <a
            href="https://github.com/amareshhebbar/TrueNorth/discussions/new?category=showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded bg-[#00D4AA] text-black font-semibold text-sm hover:bg-[#00997A] transition-colors flex-shrink-0"
          >
            Add Your Project →
          </a>
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className="text-xs text-[#4A5568]">Filter by SDK:</span>
          {["All", "Python", "Node.js", "Go", "React Native"].map((sdk) => (
            <button
              key={sdk}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                sdk === "All"
                  ? "border-[#00D4AA] bg-[#00D4AA]/10 text-[#00D4AA]"
                  : "border-[#1E2329] text-[#8B95A3] hover:border-[#8B95A3]"
              }`}
            >
              {sdk}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <article
              key={project.name}
              className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/30 transition-all duration-300 flex flex-col"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out forwards`,
                animationDelay: `${idx * 80}ms`,
              }}
            >
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="text-xs px-2 py-0.5 rounded font-mono font-semibold"
                  style={{
                    color: domainColors[project.domain] || "#8B95A3",
                    background: `${domainColors[project.domain] || "#8B95A3"}15`,
                  }}
                >
                  {project.domain}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{
                    color: sdkColors[project.sdk] || "#8B95A3",
                    background: `${sdkColors[project.sdk] || "#8B95A3"}15`,
                  }}
                >
                  {project.sdk}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#F0F2F5] mb-2">{project.name}</h3>
              <p className="text-sm text-[#8B95A3] leading-relaxed mb-4 flex-1">{project.description}</p>

              <div className="text-xs text-[#00D4AA] font-mono mb-4 p-2 rounded bg-[#00D4AA]/5 border border-[#00D4AA]/10">
                {project.stats}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#4A5568]">by {project.author}</span>
                <a
                  href={project.url}
                  className="text-xs text-[#8B95A3] hover:text-[#00D4AA] transition-colors"
                >
                  View project →
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "6+", label: "Showcase projects" },
            { value: "4", label: "SDKs in use" },
            { value: "6", label: "Industries served" },
            { value: "Apache 2.0", label: "License" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 rounded-xl border border-[#1E2329] bg-[#111318]">
              <div className="text-3xl font-bold text-[#00D4AA] mb-1">{stat.value}</div>
              <div className="text-xs text-[#8B95A3]">{stat.label}</div>
            </div>
          ))}
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
