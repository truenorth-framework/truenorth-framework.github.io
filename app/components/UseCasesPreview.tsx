"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .uc-root *, .uc-root *::before, .uc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .uc-root {
    width: 100%;
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
    border-top: 1px solid #1C2740;
  }

  .uc-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .uc-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: clamp(3rem, 6vw, 4rem);
    max-width: 580px;
  }
  .uc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 100px;
    background: rgba(13,255,154,0.07);
    border: 1px solid rgba(13,255,154,0.2);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    color: #0DFF9A;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .uc-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #0DFF9A;
    animation: ucPulse 2s infinite;
  }
  @keyframes ucPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .uc-title {
    font-size: clamp(1.9rem, 4vw, 3.25rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #FFFFFF;
    margin-bottom: 1rem;
  }
  .uc-sub {
    font-size: 1rem;
    color: #6B7A99;
    line-height: 1.7;
    margin-bottom: 0;
  }

  /* ── Grid ── */
  .uc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 3rem;
  }
  @media (max-width: 900px) {
    .uc-grid { grid-template-columns: 1fr; gap: 1.5px; }
  }

  /* ── Card ── */
  .uc-card {
    background: #0C1018;
    padding: 2.5rem 2.25rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    overflow: hidden;
    transition: background 0.25s;
    opacity: 0;
    transform: translateY(20px);
    transition: background 0.25s, opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1);
  }
  .uc-card.in { opacity: 1; transform: none; }
  .uc-card.d1 { transition-delay: 0.07s; }
  .uc-card.d2 { transition-delay: 0.14s; }
  .uc-card.d3 { transition-delay: 0.21s; }
  .uc-card:hover { background: #0E1520; }

  /* Accent left bar that appears on hover */
  .uc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 3px;
    background: var(--accent-color, #0DFF9A);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.35s cubic-bezier(.16,1,.3,1);
  }
  .uc-card:hover::before { transform: scaleY(1); }

  /* Top glow on hover */
  .uc-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent-color, #0DFF9A);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .uc-card:hover::after { opacity: 0.6; }

  /* ── Icon area ── */
  .uc-icon-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }
  .uc-icon-box {
    width: 50px; height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    transition: transform 0.25s;
  }
  .uc-card:hover .uc-icon-box { transform: scale(1.08) rotate(-4deg); }
  .uc-stat-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 5px 10px;
    border-radius: 100px;
    border: 1px solid;
    letter-spacing: 0.06em;
  }

  /* ── Text ── */
  .uc-card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
    line-height: 1.3;
    transition: color 0.2s;
  }
  .uc-card:hover .uc-card-title { color: var(--accent-text, #0DFF9A); }
  .uc-card-desc {
    font-size: 0.875rem;
    color: #6B7A99;
    line-height: 1.7;
    flex: 1;
    margin-bottom: 2rem;
  }

  /* ── Footer link ── */
  .uc-card-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #263354;
    transition: color 0.2s, gap 0.2s;
    margin-top: auto;
  }
  .uc-card:hover .uc-card-link { color: var(--accent-text, #0DFF9A); gap: 9px; }

  /* ── Tags list ── */
  .uc-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 1.5rem;
  }
  .uc-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.64rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    background: rgba(28,39,64,0.8);
    border: 1px solid #1C2740;
    color: #6B7A99;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── CTA row below grid ── */
  .uc-cta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 2.5rem;
    border-top: 1px solid #1C2740;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease;
  }
  .uc-cta-row.in { opacity: 1; transform: none; }
  .uc-cta-text {
    font-size: 0.95rem;
    color: #6B7A99;
    line-height: 1.5;
  }
  .uc-cta-text strong { color: #C5CDD8; font-weight: 600; }
  .uc-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 11px 22px;
    background: transparent;
    color: #C5CDD8;
    border: 1px solid #263354;
    border-radius: 9px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    line-height: 1;
  }
  .uc-cta-btn:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title:    "Rural Medical Intake",
    desc:     "Offline sync + Kannada/Hindi support. Collects 12 structured fields without internet, syncs on reconnect. Designed for last-mile health workers.",
    stat:     "79% completion",
    href:     "/use-cases/rural-medical-intake",
    tags:     ["Offline-First", "DPDP 2023", "Multilingual"],
    accent:   "#FF6B35",
    iconBg:   "rgba(255,107,53,0.08)",
    iconBdr:  "rgba(255,107,53,0.2)",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title:    "HR Screening",
    desc:     "Structured extraction from unstructured candidate responses. Output goes straight to your ATS in JSON — no manual parsing, no copy-paste errors.",
    stat:     "88% completion",
    href:     "/use-cases/hr-screening",
    tags:     ["ATS Integration", "GDPR", "Multi-LLM"],
    accent:   "#0DFF9A",
    iconBg:   "rgba(13,255,154,0.08)",
    iconBdr:  "rgba(13,255,154,0.2)",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
      </svg>
    ),
    title:    "Lead Qualification",
    desc:     "WhatsApp Business API integration. Phone number → session mapping → structured lead data. Works across 22 languages with zero extra config.",
    stat:     "7.4 avg turns",
    href:     "/use-cases/lead-qualification",
    tags:     ["WhatsApp API", "22+ Languages", "Webhooks"],
    accent:   "#25D366",
    iconBg:   "rgba(37,211,102,0.08)",
    iconBdr:  "rgba(37,211,102,0.2)",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function UseCasesPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs   = useRef<(HTMLAnchorElement | null)[]>([]);
  const ctaRef     = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [
      ...cardRefs.current.filter(Boolean),
      ctaRef.current,
    ].filter(Boolean) as Element[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  const ARROW = (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );

  return (
    <>
      <style>{CSS}</style>
      <section className="uc-root" ref={sectionRef as React.RefObject<HTMLElement>}>
        <div className="uc-container">

          {/* Header */}
          <div className="uc-header">
            <div className="uc-eyebrow"><span className="uc-eyebrow-dot" />Production Use Cases</div>
            <h2 className="uc-title">Built for real industries</h2>
            <p className="uc-sub">
              Deployed in the field — not toy demos. Every case study includes completion rates and real numbers.
            </p>
          </div>

          {/* Grid */}
          <div className="uc-grid">
            {USE_CASES.map((uc, i) => (
              <Link
                key={uc.title}
                href={uc.href}
                className={`uc-card d${i + 1}`}
                ref={el => { cardRefs.current[i] = el; }}
                style={{
                  // @ts-ignore
                  "--accent-color": uc.accent,
                  "--accent-text":  uc.accent,
                }}
              >
                {/* Icon + stat */}
                <div className="uc-icon-row">
                  <div
                    className="uc-icon-box"
                    style={{
                      background:   uc.iconBg,
                      borderColor:  uc.iconBdr,
                      color:        uc.accent,
                    }}
                  >
                    {uc.icon}
                  </div>
                  <div
                    className="uc-stat-badge"
                    style={{
                      color:       uc.accent,
                      background:  uc.iconBg,
                      borderColor: uc.iconBdr,
                    }}
                  >
                    {uc.stat}
                  </div>
                </div>

                {/* Title */}
                <h3 className="uc-card-title">{uc.title}</h3>

                {/* Description */}
                <p className="uc-card-desc">{uc.desc}</p>

                {/* Tags */}
                <div className="uc-tags">
                  {uc.tags.map(t => (
                    <span key={t} className="uc-tag">{t}</span>
                  ))}
                </div>

                {/* Footer link */}
                <span className="uc-card-link">
                  Read case study {ARROW}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA row */}
          <div
            className="uc-cta-row"
            ref={ctaRef}
          >
            <p className="uc-cta-text">
              <strong>Want to see your industry?</strong> These patterns generalise to insurance, education, fintech — anywhere you need structured data from a conversation.
            </p>
            <Link href="/use-cases" className="uc-cta-btn">
              Browse all use cases {ARROW}
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}