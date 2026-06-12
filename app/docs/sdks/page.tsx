import Link from "next/link";

const sdks = [
  {
    slug: "python",
    name: "Python",
    color: "#FFD700",
    badge: "PRIMARY",
    desc: "Reference implementation. All features available first in Python.",
    install: "pip install truenorth-framework",
    compatibility: "Python 3.9+",
  },
  {
    slug: "nodejs",
    name: "Node.js / TypeScript",
    color: "#00D4AA",
    badge: "STABLE",
    desc: "TypeScript-native with full async/await, Next.js server actions, streaming support.",
    install: "npm install truenorth",
    compatibility: "Node.js 18+",
  },
  {
    slug: "go",
    name: "Go",
    color: "#00ADD8",
    badge: "STABLE",
    desc: "High-throughput, goroutine-safe, built for production APIs.",
    install: "go get github.com/amareshhebbar/truenorth-go",
    compatibility: "Go 1.21+",
  },
  {
    slug: "expo",
    name: "Expo / React Native",
    color: "#3178C6",
    badge: "BETA",
    desc: "Mobile-first with offline SQLite mode and ImpossibleAI local inference.",
    install: "npx expo install truenorth-expo",
    compatibility: "Expo SDK 50+",
  },
];

export default function SDKsIndexPage() {
  return (
    <div className="prose-container max-w-none">
      <nav className="text-xs text-[#4A5568] mb-6 flex items-center gap-2">
        <a href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</a>
        <span>/</span>
        <span className="text-[#8B95A3]">SDKs</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Language SDKs</h1>
      <p className="text-[#8B95A3] text-lg mb-8 leading-relaxed">
        TrueNorth has native SDKs for Python, Node.js/TypeScript, Go, and React Native/Expo. All SDKs expose the same core interface.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sdks.map((sdk) => (
          <Link key={sdk.slug} href={`/docs/sdks/${sdk.slug}`}>
            <div className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/30 transition-all duration-200 h-full cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl font-bold" style={{ color: sdk.color }}>{sdk.name}</span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold"
                  style={{ color: sdk.color, background: `${sdk.color}15`, border: `1px solid ${sdk.color}30` }}
                >
                  {sdk.badge}
                </span>
              </div>
              <p className="text-sm text-[#8B95A3] mb-4">{sdk.desc}</p>
              <div className="p-2.5 rounded bg-[#0A0B0D] border border-[#1E2329] font-mono text-xs text-[#A8FF78] mb-3">
                {sdk.install}
              </div>
              <div className="text-xs text-[#4A5568]">{sdk.compatibility}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-xl border border-[#1E2329] bg-[#111318]">
        <h2 className="text-lg font-bold text-[#F0F2F5] mb-3">Interface Contract</h2>
        <p className="text-sm text-[#8B95A3] leading-relaxed">
          All SDKs implement the same three-method interface: <code className="text-[#A8FF78]">create_session()</code>, <code className="text-[#A8FF78]">send(message)</code>, and <code className="text-[#A8FF78]">get_output()</code>. If you know how to use one SDK, you know how to use all of them. Parameter naming follows each language's conventions (snake_case for Python, camelCase for TypeScript/Go).
        </p>
      </div>
    </div>
  );
}
