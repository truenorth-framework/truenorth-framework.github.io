import PageHeader from "../components/PageHeader";
import Link from "next/link";

const areas = [
  {
    slug: "engine-internals",
    icon: "⚙️",
    title: "Engine Internals",
    description: "Dive into the 13-stage pipeline. Add new stages, improve existing ones, write tests. Requires Python and an understanding of LLM orchestration.",
    issues: 8,
    difficulty: "Advanced",
  },
  {
    slug: "sdks",
    icon: "📦",
    title: "SDK Development",
    description: "Help maintain Python, Node.js, Go, and React Native SDKs. Add new language ports. Full interface contract and test requirements provided.",
    issues: 5,
    difficulty: "Intermediate",
  },
  {
    slug: "docs",
    icon: "📖",
    title: "Documentation",
    description: "Improve guides, fix typos, write tutorials. Style guide included. No code required — documentation PRs are always welcome.",
    issues: 12,
    difficulty: "Beginner",
  },
  {
    icon: "🎯",
    title: "New Goal Packages",
    slug: "goals",
    description: "Build reusable YAML agent configurations for new domains — legal, education, finance, government. Publish to the goal marketplace.",
    issues: 15,
    difficulty: "Beginner",
  },
  {
    icon: "🌐",
    title: "Language Support",
    slug: "languages",
    description: "Improve language detection accuracy, add new regional languages, and test multilingual edge cases.",
    issues: 7,
    difficulty: "Intermediate",
  },
  {
    icon: "📊",
    title: "Benchmarks",
    slug: "benchmarks",
    description: "Run extraction accuracy benchmarks on new datasets, test hallucination rates with new models, and publish reproducible results.",
    issues: 4,
    difficulty: "Advanced",
  },
];

const goodFirstIssues = [
  {
    number: 142,
    title: "Add Kannada language test fixtures for field extraction",
    labels: ["good first issue", "docs"],
    difficulty: "Easy",
  },
  {
    number: 138,
    title: "Fix typo in YAML schema quickstart guide",
    labels: ["good first issue", "documentation"],
    difficulty: "Easy",
  },
  {
    number: 135,
    title: "Add `list` field type to Python SDK",
    labels: ["good first issue", "enhancement"],
    difficulty: "Medium",
  },
  {
    number: 131,
    title: "Node.js SDK: add TypeScript generics for field extraction output",
    labels: ["good first issue", "typescript"],
    difficulty: "Medium",
  },
  {
    number: 128,
    title: "Write integration test for offline sync race condition",
    labels: ["good first issue", "testing"],
    difficulty: "Medium",
  },
];

export default function ContributingPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Open Source"
        title="Build TrueNorth With Us"
        subtitle="We welcome contributions from developers who care about structured AI, India's compliance landscape, and open source infrastructure."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Contributing" }]}
      />

      <section className="max-w-6xl mx-auto px-6 pb-32 space-y-20">
        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Read CONTRIBUTING.md", href: "https://github.com/amareshhebbar/TrueNorth/blob/main/CONTRIBUTING.md", icon: "📄" },
            { label: "Code of Conduct", href: "https://github.com/amareshhebbar/TrueNorth/blob/main/CODE_OF_CONDUCT.md", icon: "🤝" },
            { label: "Join Discord", href: "https://discord.gg/truenorth", icon: "💬" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/40 transition-colors flex items-center gap-3 text-sm text-[#8B95A3] hover:text-[#F0F2F5]"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
              <span className="ml-auto">↗</span>
            </a>
          ))}
        </div>

        {/* Contribution areas */}
        <div>
          <div className="mb-8">
            <div className="text-xs font-mono text-[#00D4AA] tracking-widest mb-2">WHERE TO START</div>
            <h2 className="text-3xl font-bold text-[#F0F2F5]">Contribution Areas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <div
                key={area.slug}
                className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/30 transition-all duration-300 flex flex-col"
              >
                <div className="text-3xl mb-4">{area.icon}</div>
                <h3 className="text-lg font-bold text-[#F0F2F5] mb-2">{area.title}</h3>
                <p className="text-sm text-[#8B95A3] leading-relaxed mb-4 flex-1">{area.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded font-mono ${
                      area.difficulty === "Beginner"
                        ? "bg-[#00D4AA]/10 text-[#00D4AA]"
                        : area.difficulty === "Intermediate"
                        ? "bg-[#79C0FF]/10 text-[#79C0FF]"
                        : "bg-[#FF6B35]/10 text-[#FF6B35]"
                    }`}
                  >
                    {area.difficulty}
                  </span>
                  <a
                    href={`https://github.com/amareshhebbar/TrueNorth/issues?q=label%3A${area.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4A5568] hover:text-[#00D4AA] transition-colors"
                  >
                    {area.issues} open issues →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Good first issues */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-[#00D4AA] tracking-widest mb-2">GOOD FIRST ISSUES</div>
              <h2 className="text-3xl font-bold text-[#F0F2F5]">Start Here</h2>
            </div>
            <a
              href="https://github.com/amareshhebbar/TrueNorth/issues?q=label%3A%22good+first+issue%22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#00D4AA] border border-[#00D4AA]/30 px-4 py-2 rounded hover:bg-[#00D4AA]/10 transition-colors"
            >
              View all on GitHub →
            </a>
          </div>
          <div className="space-y-3">
            {goodFirstIssues.map((issue) => (
              <a
                key={issue.number}
                href={`https://github.com/amareshhebbar/TrueNorth/issues/${issue.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/30 transition-colors group"
              >
                <span className="text-[#4A5568] font-mono text-sm flex-shrink-0">#{issue.number}</span>
                <span className="text-[#F0F2F5] text-sm flex-1 group-hover:text-[#00D4AA] transition-colors">{issue.title}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {issue.labels.slice(0, 2).map((label) => (
                    <span key={label} className="text-xs px-2 py-0.5 rounded bg-[#1E2329] text-[#8B95A3] hidden sm:inline">
                      {label}
                    </span>
                  ))}
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-mono ${
                      issue.difficulty === "Easy"
                        ? "bg-[#00D4AA]/10 text-[#00D4AA]"
                        : "bg-[#79C0FF]/10 text-[#79C0FF]"
                    }`}
                  >
                    {issue.difficulty}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Process */}
        <div>
          <div className="mb-8">
            <div className="text-xs font-mono text-[#00D4AA] tracking-widest mb-2">HOW IT WORKS</div>
            <h2 className="text-3xl font-bold text-[#F0F2F5]">Contribution Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Fork & Clone", desc: "Fork the repo, clone locally, create a feature branch." },
              { step: "02", title: "Make Changes", desc: "Follow the style guide. Write tests. Run the test suite." },
              { step: "03", title: "Open PR", desc: "Open a pull request with a clear description of your changes." },
              { step: "04", title: "Review & Merge", desc: "Maintainers review within 48h. Address feedback. Ship it." },
            ].map((step) => (
              <div key={step.step} className="p-5 rounded-lg border border-[#1E2329] bg-[#111318]">
                <div className="text-3xl font-bold text-[#00D4AA]/30 mb-3 font-mono">{step.step}</div>
                <h3 className="font-semibold text-[#F0F2F5] mb-2">{step.title}</h3>
                <p className="text-sm text-[#8B95A3]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-2xl border border-[#1E2329] bg-[#111318]">
          <h2 className="text-3xl font-bold text-[#F0F2F5] mb-4">Ready to contribute?</h2>
          <p className="text-[#8B95A3] mb-8 max-w-xl mx-auto">
            TrueNorth is Apache 2.0 licensed and built entirely in the open. Every contribution, no matter how small, makes AI infrastructure better for India and the world.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/amareshhebbar/TrueNorth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded bg-[#00D4AA] text-black font-semibold hover:bg-[#00997A] transition-colors"
            >
              View on GitHub
            </a>
            <a
              href="https://discord.gg/truenorth"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded border border-[#1E2329] text-[#8B95A3] hover:text-[#F0F2F5] hover:border-[#8B95A3] transition-colors"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
