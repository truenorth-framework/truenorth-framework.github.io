// FILE: app/use-cases/page.tsx
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases — TrueNorth",
  description: "Production deployments with real completion rates and benchmarks.",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .uci-root *, .uci-root *::before, .uci-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .uci-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .uci-container { max-width: 1100px; margin: 0 auto; }

  /* ── Cases list ── */
  .uci-list {
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 16px;
    overflow: hidden;
  }

  .uci-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2rem;
    align-items: center;
    padding: 2.25rem 2rem;
    background: #0C1018;
    text-decoration: none;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .uci-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s cubic-bezier(.16,1,.3,1);
  }
  .uci-card:hover { background: #0E1520; }
  .uci-card:hover::before { transform: scaleY(1); }

  @media (max-width: 720px) {
    .uci-card { grid-template-columns: 1fr; gap: 1.25rem; }
    .uci-card-action { display: none; }
  }

  /* Left: icon box */
  .uci-icon-box {
    width: 56px; height: 56px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .uci-card:hover .uci-icon-box { transform: scale(1.07) rotate(-3deg); }

  /* Middle: content */
  .uci-card-body {}
  .uci-card-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.4rem;
    display: block;
  }
  .uci-card-title {
    font-size: clamp(1.05rem, 2vw, 1.3rem);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.015em;
    margin-bottom: 0.5rem;
    line-height: 1.25;
    transition: color 0.2s;
  }
  .uci-card:hover .uci-card-title { color: var(--accent); }
  .uci-card-desc {
    font-size: 0.855rem;
    color: #6B7A99;
    line-height: 1.68;
    margin-bottom: 1rem;
    max-width: 560px;
  }
  .uci-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .uci-stat-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 100px;
    border: 1px solid;
    letter-spacing: 0.04em;
    background: var(--accent-dim);
    border-color: var(--accent-border);
    color: var(--accent);
  }

  /* Right: arrow */
  .uci-card-action {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #263354;
    white-space: nowrap;
    transition: color 0.2s, gap 0.2s;
    flex-shrink: 0;
  }
  .uci-card:hover .uci-card-action { color: var(--accent); gap: 9px; }

  /* ── Bottom CTA ── */
  .uci-cta {
    margin-top: 3rem;
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
  .uci-cta-text { font-size: 0.9rem; color: #6B7A99; }
  .uci-cta-text strong { color: #C5CDD8; font-weight: 600; }
  .uci-cta-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px;
    background: #0DFF9A; color: #000;
    border-radius: 9px; border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem; font-weight: 800;
    text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s;
    white-space: nowrap; line-height: 1;
  }
  .uci-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(13,255,154,0.25); }
`;

const CASES = [
  {
    href: "/use-cases/rural-medical-intake",
    accent: "#FF6B35",
    accentDim: "rgba(255,107,53,0.08)",
    accentBorder: "rgba(255,107,53,0.2)",
    iconBg: "rgba(255,107,53,0.08)",
    iconBorder: "rgba(255,107,53,0.2)",
    icon: (
      <svg width="22" height="22" fill="none" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    eyebrow: "Healthcare",
    title: "Rural Medical Intake",
    desc: "Offline-first AI intake for rural clinics and PHCs. No internet required. Auto-detects Hindi, Kannada, Telugu, and 20+ more languages. DPDP Act 2023 compliant out of the box.",
    stats: ["79% completion rate", "~9 turns average", "Offline-first", "22+ languages"],
  },
  {
    href: "/use-cases/hr-screening",
    accent: "#0DFF9A",
    accentDim: "rgba(13,255,154,0.08)",
    accentBorder: "rgba(13,255,154,0.2)",
    iconBg: "rgba(13,255,154,0.08)",
    iconBorder: "rgba(13,255,154,0.2)",
    icon: (
      <svg width="22" height="22" fill="none" stroke="#0DFF9A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    eyebrow: "Recruiting",
    title: "HR Screening",
    desc: "Collect 15 structured fields from candidates via WhatsApp or web. Output goes straight to your ATS as validated JSON — no manual entry, no copy-paste errors.",
    stats: ["88% completion", "7.4 avg turns", "$0.004 per screen", "ATS-ready JSON"],
  },
  {
    href: "/use-cases/lead-qualification",
    accent: "#25D366",
    accentDim: "rgba(37,211,102,0.08)",
    accentBorder: "rgba(37,211,102,0.2)",
    iconBg: "rgba(37,211,102,0.08)",
    iconBorder: "rgba(37,211,102,0.2)",
    icon: (
      <svg width="22" height="22" fill="none" stroke="#25D366" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
      </svg>
    ),
    eyebrow: "Sales",
    title: "Lead Qualification",
    desc: "WhatsApp-native lead collection. Phone number in, qualified lead JSON out — with session mapping, real-time extraction, and direct CRM webhook integration.",
    stats: ["WhatsApp native", "Real-time extraction", "CRM webhook", "22+ languages"],
  },
];

const ARROW = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function UseCasesPage() {
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Use Cases"
        title="Built for real industries"
        subtitle="Not toy demos. Production deployments with real completion rates, real benchmarks, and real numbers."
        breadcrumbs={[{ label: "Use Cases" }]}
      />
      <div className="uci-root">
        <div className="uci-container">
          <div className="uci-list">
            {CASES.map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="uci-card"
              style={{
            "--accent": c.accent,
            "--accent-dim": c.accentDim,
            "--accent-border": c.accentBorder,
          } as React.CSSProperties}
              >
                <div
                  className="uci-icon-box"
                  style={{ background: c.iconBg, borderColor: c.iconBorder }}
                >
                  {c.icon}
                </div>
                <div className="uci-card-body">
                  <span className="uci-card-eyebrow">{c.eyebrow}</span>
                  <h2 className="uci-card-title">{c.title}</h2>
                  <p className="uci-card-desc">{c.desc}</p>
                  <div className="uci-stats">
                    {c.stats.map(s => (
                      <span key={s} className="uci-stat-pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="uci-card-action">
                  Read case study {ARROW}
                </div>
              </Link>
            ))}
          </div>

          <div className="uci-cta">
            <p className="uci-cta-text">
              <strong>Want to see your industry?</strong> These patterns generalise to insurance, education, fintech, and more.
            </p>
            <Link href="/playground" className="uci-cta-btn">
              Try in Playground {ARROW}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}