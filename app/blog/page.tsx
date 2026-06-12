"use client";

import PageHeader from "../components/PageHeader";
import Link from "next/link";

const articles = [
  {
    slug: "why-langchain-is-overkill-for-extraction",
    category: "Engineering",
    categoryColor: "#79C0FF",
    title: "Why LangChain Is Overkill for Structured Extraction",
    excerpt:
      "You don't need a full orchestration framework to extract 12 fields from a conversation. Here's why TrueNorth takes a radically different approach — and why it matters for cost and reliability.",
    date: "June 10, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "building-offline-first-ai-for-rural-india",
    category: "Case Study",
    categoryColor: "#00D4AA",
    title: "Building Offline-First AI for Rural India",
    excerpt:
      "3G doesn't reach every village. Here's how we built SQLite-backed offline sessions that sync when connectivity returns — and why this changes what's possible in healthcare.",
    date: "May 28, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "dpdp-act-2023-for-developers",
    category: "Compliance",
    categoryColor: "#FFD700",
    title: "The DPDP Act 2023: A Developer's Practical Guide",
    excerpt:
      "India's Digital Personal Data Protection Act 2023 is enforceable. Here's what it means for AI applications, what you need to implement, and how TrueNorth handles it out of the box.",
    date: "May 14, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug: "truenorth-vs-langchain-vs-haystack",
    category: "Comparison",
    categoryColor: "#FF6B35",
    title: "TrueNorth vs LangChain vs Haystack: A Structured Extraction Showdown",
    excerpt:
      "We ran 1,000 medical intake conversations through three frameworks. Accuracy, cost, hallucination rate, and implementation complexity — the full benchmark breakdown.",
    date: "May 3, 2026",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug: "reminder-ai-the-missing-primitive",
    category: "Product",
    categoryColor: "#00D4AA",
    title: "Reminder AI: The Missing Primitive Every Framework Skipped",
    excerpt:
      "Every framework handles what happens during a conversation. None handle what happens after it ends. Reminder AI — the ability to re-initiate contact when fields are still null — changes the economics of AI-assisted workflows.",
    date: "April 20, 2026",
    readTime: "7 min read",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="The Blog"
        title="Engineering Notes"
        subtitle="Deep-dives on AI extraction, India-specific compliance, and building developer infrastructure."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Blog" }]}
      />

      <section className="max-w-6xl mx-auto px-6 pb-32">
        {/* Featured */}
        <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
          <article className="p-8 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs px-2 py-0.5 rounded font-mono font-semibold"
                style={{
                  color: featured.categoryColor,
                  background: `${featured.categoryColor}15`,
                  border: `1px solid ${featured.categoryColor}30`,
                }}
              >
                {featured.category}
              </span>
              <span className="text-xs text-[#4A5568] px-2 py-0.5 rounded bg-[#161B22] border border-[#1E2329]">
                FEATURED
              </span>
            </div>
            <h2 className="text-3xl font-bold text-[#F0F2F5] mb-3 group-hover:text-[#00D4AA] transition-colors leading-tight">
              {featured.title}
            </h2>
            <p className="text-[#8B95A3] text-lg leading-relaxed mb-6 max-w-3xl">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-[#4A5568]">
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
              <span className="ml-auto text-[#00D4AA] group-hover:translate-x-1 transition-transform">
                Read article →
              </span>
            </div>
          </article>
        </Link>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((article, idx) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
              <article
                className="h-full p-6 rounded-xl border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/30 transition-all duration-300"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease-out forwards`,
                  animationDelay: `${idx * 80}ms`,
                }}
              >
                <div className="mb-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono font-semibold"
                    style={{
                      color: article.categoryColor,
                      background: `${article.categoryColor}15`,
                      border: `1px solid ${article.categoryColor}30`,
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#F0F2F5] mb-3 group-hover:text-[#00D4AA] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-[#8B95A3] text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#4A5568] mt-auto">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                  <span className="ml-auto text-[#8B95A3] group-hover:text-[#00D4AA] transition-colors group-hover:translate-x-1 inline-block transition-transform">
                    Read →
                  </span>
                </div>
              </article>
            </Link>
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
