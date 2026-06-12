"use client";

import { useEffect, useRef, useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .cs-root *, .cs-root *::before, .cs-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cs-root {
    width: 100%;
    background: #05080F;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
    border-top: 1px solid #1C2740;
    position: relative;
    overflow: hidden;
  }

  /* ambient glow */
  .cs-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw; max-width: 900px; height: 60vh;
    background: radial-gradient(ellipse, rgba(13,255,154,0.035) 0%, transparent 68%);
    pointer-events: none;
    z-index: 0;
  }

  .cs-container {
    position: relative; z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  @media (max-width: 820px) {
    .cs-container { grid-template-columns: 1fr; gap: 3rem; }
  }

  /* ── LEFT copy ── */
  .cs-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  .cs-eyebrow {
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
  .cs-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #0DFF9A;
    animation: csPulse 2s infinite;
  }
  @keyframes csPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .cs-title {
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: #FFFFFF;
    margin-bottom: 1rem;
  }
  .cs-title-accent {
    background: linear-gradient(135deg, #0DFF9A 0%, #00C4FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cs-desc {
    font-size: 1rem;
    color: #6B7A99;
    line-height: 1.72;
    margin-bottom: 2.25rem;
    max-width: 420px;
  }
  .cs-desc a {
    color: #0DFF9A;
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.15s;
  }
  .cs-desc a:hover { opacity: 0.75; }

  /* ── Action buttons ── */
  .cs-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .cs-btn-gh {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    background: #0DFF9A;
    color: #000;
    border-radius: 9px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    line-height: 1;
    white-space: nowrap;
  }
  .cs-btn-gh:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 28px rgba(13,255,154,0.3);
  }

  .cs-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 11px 20px;
    background: transparent;
    color: #6B7A99;
    border: 1px solid #1C2740;
    border-radius: 9px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    line-height: 1;
    white-space: nowrap;
  }
  .cs-btn-outline:hover {
    background: #0E1420;
    border-color: #263354;
    color: #C5CDD8;
  }
  .cs-btn-outline.dc:hover { border-color: rgba(88,101,242,0.4); color: #7B88FF; }
  .cs-btn-outline.tw:hover { border-color: rgba(29,155,240,0.4); color: #4DAAFF; }

  /* ── RIGHT: stat card + activity ── */
  .cs-right {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* Repo card */
  .cs-repo-card {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
    text-decoration: none;
    display: block;
    transition: border-color 0.2s;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1), border-color 0.2s;
  }
  .cs-repo-card.in { opacity: 1; transform: none; }
  .cs-repo-card:hover { border-color: rgba(13,255,154,0.25); }

  .cs-repo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem 0;
  }
  .cs-repo-name {
    display: flex;
    align-items: center;
    gap: 9px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    font-weight: 700;
    color: #C5CDD8;
  }
  .cs-repo-icon { color: #6B7A99; }
  .cs-repo-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 100px;
    background: rgba(13,255,154,0.08);
    border: 1px solid rgba(13,255,154,0.2);
    color: #0DFF9A;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .cs-repo-desc {
    padding: 0.875rem 1.5rem 1.25rem;
    font-size: 0.82rem;
    color: #6B7A99;
    line-height: 1.6;
    border-bottom: 1px solid #1C2740;
  }

  /* Stat row */
  .cs-stat-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .cs-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.1rem 0.5rem;
    border-right: 1px solid #1C2740;
    gap: 4px;
  }
  .cs-stat:last-child { border-right: none; }
  .cs-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.3rem;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1;
  }
  .cs-stat-icon { color: #0DFF9A; margin-bottom: 1px; }
  .cs-stat-lbl {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #263354;
  }

  /* Activity / contrib bar */
  .cs-activity-card {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
    padding: 1.25rem 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s 0.12s cubic-bezier(.16,1,.3,1), transform 0.6s 0.12s cubic-bezier(.16,1,.3,1);
  }
  .cs-activity-card.in { opacity: 1; transform: none; }

  .cs-activity-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .cs-activity-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #263354;
  }
  .cs-activity-live {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    color: #0DFF9A;
    letter-spacing: 0.06em;
  }
  .cs-live-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #0DFF9A;
    animation: csPulse 2s infinite;
  }

  /* contrib grid */
  .cs-contrib-grid {
    display: grid;
    grid-template-columns: repeat(26, 1fr);
    gap: 3px;
  }
  @media (max-width: 480px) {
    .cs-contrib-grid { grid-template-columns: repeat(13, 1fr); }
  }
  .cs-contrib-cell {
    aspect-ratio: 1;
    border-radius: 2px;
    background: #0E1420;
    transition: background 0.2s;
  }
  .cs-contrib-cell.l1 { background: rgba(13,255,154,0.15); }
  .cs-contrib-cell.l2 { background: rgba(13,255,154,0.35); }
  .cs-contrib-cell.l3 { background: rgba(13,255,154,0.6);  }
  .cs-contrib-cell.l4 { background: #0DFF9A; }

  .cs-contrib-legend {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    justify-content: flex-end;
  }
  .cs-legend-lbl {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    color: #263354;
  }
  .cs-legend-cell {
    width: 10px; height: 10px; border-radius: 2px;
  }

  /* tag pills below */
  .cs-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s 0.22s ease, transform 0.6s 0.22s ease;
  }
  .cs-tag-row.in { opacity: 1; transform: none; }
  .cs-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 6px;
    background: #0C1018;
    border: 1px solid #1C2740;
    color: #263354;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .cs-tag.hi { color: #4A5A78; border-color: #1C2740; }
`;

// ── Deterministic contribution grid (seeded so SSR matches client) ──────────
function buildContribGrid(seed = 42) {
  let s = seed;
  const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.abs(s) / 0x7fffffff; };
  return Array.from({ length: 52 * 7 }, () => {
    const r = rng();
    if (r > 0.92) return "l4";
    if (r > 0.78) return "l3";
    if (r > 0.58) return "l2";
    if (r > 0.38) return "l1";
    return "";
  });
}

const GRID = buildContribGrid();

// cut to 26 cols × 2 rows visible (compact)
const COMPACT = Array.from({ length: 26 }, (_, col) =>
  [GRID[col * 7 + 2], GRID[col * 7 + 4]]
).flat();

const GH_ICON = (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

// ── count-up ─────────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!active || target === 0) { setVal(target); return; }
    const dur = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(e * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active]);
  return val;
}

function StatCell({ icon, value, label, active }: { icon: React.ReactNode; value: number; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="cs-stat">
      <span className="cs-stat-icon">{icon}</span>
      <span className="cs-stat-val">{count.toLocaleString()}</span>
      <span className="cs-stat-lbl">{label}</span>
    </div>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function CommunitySection() {
  const cardRef     = useRef<HTMLAnchorElement>(null);
  const actRef      = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const [ghStats, setGhStats] = useState({ stars: 2, forks: 0, watchers: 1, issues: 0 });

  useEffect(() => {
    fetch("https://api.github.com/repos/amareshhebbar/TrueNorth")
      .then(r => r.json())
      .then(d => {
        if (d.stargazers_count !== undefined) {
          setGhStats({ stars: d.stargazers_count, forks: d.forks_count, watchers: d.subscribers_count, issues: d.open_issues_count });
        }
      }).catch(() => {});
  }, []);

  useEffect(() => {
    const targets = [cardRef.current, actRef.current, tagRef.current].filter(Boolean) as Element[];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => obs.observe(t));

    // trigger count-up when card visible
    const countObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); countObs.disconnect(); }
    }, { threshold: 0.3 });
    if (cardRef.current) countObs.observe(cardRef.current);

    return () => { obs.disconnect(); countObs.disconnect(); };
  }, []);

  const STAR_ICON = <svg width="13" height="13" fill="#0DFF9A" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>;
  const FORK_ICON = <svg width="13" height="13" fill="none" stroke="#0DFF9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M12 7v3m0 0c0 3-6 4-6 7m6-7c0 3 6 4 6 7"/></svg>;
  const EYE_ICON  = <svg width="13" height="13" fill="none" stroke="#0DFF9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
  const ISS_ICON  = <svg width="13" height="13" fill="none" stroke="#0DFF9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

  return (
    <>
      <style>{CSS}</style>
      <section className="cs-root">
        <div className="cs-glow" aria-hidden="true" />
        <div className="cs-container">

          {/* ── LEFT: copy + actions ── */}
          <div className="cs-copy">
            <div className="cs-eyebrow"><span className="cs-eyebrow-dot" />Open Source</div>
            <h2 className="cs-title">
              Built in public.<br />
              <span className="cs-title-accent">Grown by the community.</span>
            </h2>
            <p className="cs-desc">
              TrueNorth is fully open source under Apache 2.0 — built by{" "}
              <a href="https://github.com/amareshhebbar" target="_blank" rel="noopener noreferrer">
                @amareshhebbar
              </a>{" "}
              and shaped by every star, fork, and issue. Star the repo to follow progress, or jump in and contribute.
            </p>
            <div className="cs-actions">
              <a
                href="https://github.com/amareshhebbar/TrueNorth"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn-gh"
              >
                {GH_ICON}
                Star on GitHub
              </a>
              <a href="#" className="cs-btn-outline dc">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Join Discord
              </a>
              <a
                href="https://twitter.com/truenorthai"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn-outline tw"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Follow on X
              </a>
            </div>
          </div>

          {/* ── RIGHT: repo card + activity ── */}
          <div className="cs-right">

            {/* Repo card */}
            <a
              href="https://github.com/amareshhebbar/TrueNorth"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-repo-card"
              ref={cardRef}
            >
              <div className="cs-repo-header">
                <div className="cs-repo-name">
                  <span className="cs-repo-icon">{GH_ICON}</span>
                  amareshhebbar / TrueNorth
                </div>
                <span className="cs-repo-badge">Apache 2.0</span>
              </div>
              <p className="cs-repo-desc">
                Multi-agent LLM framework — declare outcomes in YAML, skip the orchestration logic. Hallucination firewall, DPDP compliance, WhatsApp native.
              </p>
              <div className="cs-stat-row">
                <StatCell icon={STAR_ICON} value={ghStats.stars}    label="Stars"    active={active} />
                <StatCell icon={FORK_ICON} value={ghStats.forks}    label="Forks"    active={active} />
                <StatCell icon={EYE_ICON}  value={ghStats.watchers} label="Watching" active={active} />
                <StatCell icon={ISS_ICON}  value={ghStats.issues}   label="Issues"   active={active} />
              </div>
            </a>

            {/* Activity card */}
            <div className="cs-activity-card" ref={actRef}>
              <div className="cs-activity-top">
                <span className="cs-activity-label">Contribution activity</span>
                <span className="cs-activity-live"><span className="cs-live-dot" />Active</span>
              </div>
              <div className="cs-contrib-grid">
                {COMPACT.map((level, i) => (
                  <div key={i} className={`cs-contrib-cell${level ? " " + level : ""}`} />
                ))}
              </div>
              <div className="cs-contrib-legend">
                <span className="cs-legend-lbl">Less</span>
                {["", "l1", "l2", "l3", "l4"].map(l => (
                  <div key={l} className={`cs-legend-cell cs-contrib-cell${l ? " " + l : ""}`} />
                ))}
                <span className="cs-legend-lbl">More</span>
              </div>
            </div>

            {/* Tech tags */}
            <div className="cs-tag-row" ref={tagRef}>
              {["Python", "TypeScript", "Go", "Expo", "LangGraph", "WhatsApp API", "DPDP 2023", "GDPR", "Multi-Agent"].map(t => (
                <span key={t} className="cs-tag hi">{t}</span>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}