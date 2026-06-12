// FILE: app/blog/page.tsx
"use client";

import Link from "next/link";
import PageHeader from "../components/PageHeader";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .bl-root *, .bl-root *::before, .bl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bl-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .bl-container { max-width: 1100px; margin: 0 auto; }

  /* ── Filter strip ── */
  .bl-filters {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
  }
  .bl-filter {
    padding: 5px 14px;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid #1C2740;
    background: #0C1018;
    color: #6B7A99;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    line-height: 1;
  }
  .bl-filter.active, .bl-filter:hover {
    border-color: rgba(13,255,154,0.3);
    color: #0DFF9A;
    background: rgba(13,255,154,0.06);
  }

  /* ── Featured card ── */
  .bl-featured {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid #1C2740;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 2rem;
    text-decoration: none;
    background: #0C1018;
    transition: border-color 0.25s;
    position: relative;
  }
  .bl-featured:hover { border-color: rgba(13,255,154,0.3); }
  @media (max-width: 720px) {
    .bl-featured { grid-template-columns: 1fr; }
  }

  /* left tinted panel */
  .bl-feat-visual {
    background: linear-gradient(135deg, #080F1A 0%, #0B1220 100%);
    border-right: 1px solid #1C2740;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    min-height: 280px;
    position: relative;
    overflow: hidden;
  }
  @media (max-width: 720px) {
    .bl-feat-visual { min-height: 160px; border-right: none; border-bottom: 1px solid #1C2740; }
  }
  .bl-feat-visual-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(28,39,64,0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(28,39,64,0.5) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  }
  .bl-feat-visual-badge {
    position: relative; z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .bl-feat-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 100px;
    border: 1px solid rgba(13,255,154,0.25);
    background: rgba(13,255,154,0.08);
    color: #0DFF9A;
  }
  .bl-feat-read {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.8rem;
    font-weight: 700;
    color: rgba(28,39,64,0.8);
    letter-spacing: -0.03em;
    line-height: 1;
    text-align: center;
  }

  .bl-feat-body {
    padding: 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .bl-feat-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .bl-cat-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 100px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .bl-featured-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: rgba(13,255,154,0.08);
    border: 1px solid rgba(13,255,154,0.2);
    color: #0DFF9A;
  }
  .bl-feat-title {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 0.875rem;
    transition: color 0.2s;
  }
  .bl-featured:hover .bl-feat-title { color: #0DFF9A; }
  .bl-feat-excerpt {
    font-size: 0.875rem;
    color: #6B7A99;
    line-height: 1.72;
    flex: 1;
    margin-bottom: 1.5rem;
  }
  .bl-feat-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }
  .bl-feat-byline {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
    color: #263354;
  }
  .bl-feat-byline span { color: #6B7A99; }
  .bl-read-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    color: #263354;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color 0.15s, gap 0.15s;
  }
  .bl-featured:hover .bl-read-link { color: #0DFF9A; gap: 8px; }

  /* ── Article grid ── */
  .bl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  .bl-card {
    background: #0C1018;
    padding: 1.75rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    transition: background 0.2s;
    overflow: hidden;
  }
  .bl-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--cat-color, #0DFF9A);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(.16,1,.3,1);
  }
  .bl-card:hover { background: #0E1520; }
  .bl-card:hover::before { transform: scaleX(1); }

  .bl-card-cat {
    margin-bottom: 0.875rem;
  }
  .bl-card-title {
    font-size: 1rem;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.35;
    letter-spacing: -0.01em;
    margin-bottom: 0.6rem;
    transition: color 0.2s;
  }
  .bl-card:hover .bl-card-title { color: var(--cat-color, #0DFF9A); }
  .bl-card-excerpt {
    font-size: 0.82rem;
    color: #6B7A99;
    line-height: 1.68;
    flex: 1;
    margin-bottom: 1.25rem;
  }
  .bl-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
  }
  .bl-card-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    color: #263354;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .bl-card-meta span { color: #1C2740; }
  .bl-card-arrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    color: #263354;
    transition: color 0.15s, transform 0.15s;
    letter-spacing: 0.04em;
  }
  .bl-card:hover .bl-card-arrow { color: var(--cat-color, #0DFF9A); transform: translateX(4px); }

  /* ── Newsletter strip ── */
  .bl-newsletter {
    margin-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.5rem 2rem;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 12px;
  }
  .bl-newsletter-left {}
  .bl-newsletter-title { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 3px; }
  .bl-newsletter-sub { font-size: 0.8rem; color: #6B7A99; }
  .bl-gh-watch {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px;
    background: transparent;
    border: 1px solid #263354;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #C5CDD8;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s;
    white-space: nowrap;
    line-height: 1;
  }
  .bl-gh-watch:hover { border-color: #0DFF9A; color: #0DFF9A; }
`;

const ARTICLES = [
  {
    slug: "why-langchain-is-overkill-for-extraction",
    category: "Engineering",
    color: "#4D9EFF",
    title: "Why LangChain Is Overkill for Structured Extraction",
    excerpt: "You don't need a full orchestration framework to extract 12 fields from a conversation. Here's why TrueNorth takes a radically different approach — and why it matters for cost and reliability.",
    date: "Jun 10, 2026",
    readTime: "8 min",
    featured: true,
  },
  {
    slug: "building-offline-first-ai-for-rural-india",
    category: "Case Study",
    color: "#0DFF9A",
    title: "Building Offline-First AI for Rural India",
    excerpt: "3G doesn't reach every village. Here's how we built SQLite-backed offline sessions that sync when connectivity returns — and why this changes what's possible in healthcare.",
    date: "May 28, 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "dpdp-act-2023-for-developers",
    category: "Compliance",
    color: "#FFD700",
    title: "The DPDP Act 2023: A Developer's Practical Guide",
    excerpt: "India's Digital Personal Data Protection Act 2023 is enforceable. Here's what it means for AI applications, what you need to implement, and how TrueNorth handles it out of the box.",
    date: "May 14, 2026",
    readTime: "10 min",
    featured: false,
  },
  {
    slug: "truenorth-vs-langchain-vs-haystack",
    category: "Comparison",
    color: "#FF6B35",
    title: "TrueNorth vs LangChain vs Haystack: Extraction Showdown",
    excerpt: "We ran 1,000 medical intake conversations through three frameworks. Accuracy, cost, hallucination rate, and implementation complexity — the full benchmark breakdown.",
    date: "May 3, 2026",
    readTime: "12 min",
    featured: false,
  },
  {
    slug: "reminder-ai-the-missing-primitive",
    category: "Product",
    color: "#0DFF9A",
    title: "Reminder AI: The Missing Primitive Every Framework Skipped",
    excerpt: "Every framework handles what happens during a conversation. None handle what happens after it ends. Reminder AI changes the economics of AI-assisted workflows.",
    date: "Apr 20, 2026",
    readTime: "7 min",
    featured: false,
  },
];

const ARROW = (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function BlogPage() {
  const featured = ARTICLES.find(a => a.featured)!;
  const rest = ARTICLES.filter(a => !a.featured);
  const categories = ["All", ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="The Blog"
        title="Engineering Notes"
        subtitle="Deep-dives on AI extraction, India-specific compliance, and building developer infrastructure."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Blog" }]}
      />
      <div className="bl-root">
        <div className="bl-container">

          {/* Category filters */}
          <div className="bl-filters">
            {categories.map(c => (
              <button key={c} className={`bl-filter${c === "All" ? " active" : ""}`} type="button">
                {c}
              </button>
            ))}
          </div>

          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`} className="bl-featured" style={{ marginBottom: "2rem" }}>
            <div className="bl-feat-visual">
              <div className="bl-feat-visual-bg" aria-hidden="true" />
              <div className="bl-feat-visual-badge">
                <span className="bl-feat-pill">Featured</span>
                <div className="bl-feat-read">{featured.readTime} read</div>
              </div>
            </div>
            <div className="bl-feat-body">
              <div className="bl-feat-meta">
                <span
                  className="bl-cat-badge"
                  style={{
                    color: featured.color,
                    background: featured.color + "12",
                    border: `1px solid ${featured.color}30`,
                  }}
                >
                  {featured.category}
                </span>
                <span className="bl-featured-label">Featured</span>
              </div>
              <h2 className="bl-feat-title">{featured.title}</h2>
              <p className="bl-feat-excerpt">{featured.excerpt}</p>
              <div className="bl-feat-footer">
                <div className="bl-feat-byline">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
                <span className="bl-read-link">
                  Read article {ARROW}
                </span>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div className="bl-grid">
            {rest.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bl-card"
                // @ts-ignore
                style={{ "--cat-color": article.color }}
              >
                <div className="bl-card-cat">
                  <span
                    className="bl-cat-badge"
                    style={{
                      color: article.color,
                      background: article.color + "12",
                      border: `1px solid ${article.color}30`,
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <h3 className="bl-card-title">{article.title}</h3>
                <p className="bl-card-excerpt">{article.excerpt}</p>
                <div className="bl-card-footer">
                  <div className="bl-card-meta">
                    {article.date} <span>·</span> {article.readTime} read
                  </div>
                  <span className="bl-card-arrow">Read →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter / watch strip */}
          <div className="bl-newsletter">
            <div className="bl-newsletter-left">
              <div className="bl-newsletter-title">Stay up to date</div>
              <div className="bl-newsletter-sub">New posts ship with every release. Watch the repo to get notified.</div>
            </div>
            <a
              href="https://github.com/amareshhebbar/TrueNorth"
              target="_blank"
              rel="noopener noreferrer"
              className="bl-gh-watch"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Watch on GitHub
            </a>
          </div>

        </div>
      </div>
    </>
  );
}