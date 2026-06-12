// FILE: app/contributing/page.tsx
import PageHeader from "../components/PageHeader";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .co-root *, .co-root *::before, .co-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .co-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .co-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(3.5rem, 7vw, 5rem); }
  .co-section-head { margin-bottom: 2rem; }
  .co-section-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0DFF9A; margin-bottom: 0.5rem; }
  .co-section-title { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .co-section-sub { font-size: 0.95rem; color: #6B7A99; line-height: 1.65; max-width: 520px; margin-top: 0.5rem; }

  /* ── Quick links ── */
  .co-quick { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background: #1C2740; border: 1px solid #1C2740; border-radius: 12px; overflow: hidden; }
  @media (max-width: 640px) { .co-quick { grid-template-columns: 1fr; } }
  .co-quick-link {
    display: flex; align-items: center; gap: 12px;
    padding: 1.25rem 1.5rem;
    background: #0C1018;
    text-decoration: none;
    transition: background 0.15s;
  }
  .co-quick-link:hover { background: #0E1520; }
  .co-quick-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 9px; background: #111827; border: 1px solid #1C2740;
    display: flex; align-items: center; justify-content: center;
    color: #6B7A99; transition: color 0.15s, background 0.15s;
  }
  .co-quick-link:hover .co-quick-icon { color: #0DFF9A; background: rgba(13,255,154,0.06); border-color: rgba(13,255,154,0.2); }
  .co-quick-label { font-size: 0.875rem; font-weight: 600; color: #C5CDD8; flex: 1; }
  .co-quick-arrow { color: #263354; font-size: 0.75rem; transition: color 0.15s, transform 0.15s; }
  .co-quick-link:hover .co-quick-arrow { color: #0DFF9A; transform: translateX(3px); }

  /* ── Areas grid ── */
  .co-areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background: #1C2740; border: 1px solid #1C2740; border-radius: 14px; overflow: hidden; }
  @media (max-width: 900px) { .co-areas-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .co-areas-grid { grid-template-columns: 1fr; } }
  .co-area-card {
    background: #0C1018; padding: 1.75rem;
    display: flex; flex-direction: column; gap: 0.75rem;
    position: relative; overflow: hidden;
  }
  .co-area-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--diff-color, #0DFF9A); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s cubic-bezier(.16,1,.3,1);
  }
  .co-area-card:hover::before { transform: scaleX(1); }
  .co-area-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid;
    color: var(--diff-color, #0DFF9A);
    background: rgba(13,255,154,0.06);
    border-color: rgba(13,255,154,0.2);
    flex-shrink: 0;
  }
  .co-area-title { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; }
  .co-area-desc { font-size: 0.82rem; color: #6B7A99; line-height: 1.65; flex: 1; }
  .co-area-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 0.25rem; }
  .co-diff-badge {
    font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 700;
    padding: 3px 8px; border-radius: 100px; letter-spacing: 0.06em; border: 1px solid;
    color: var(--diff-color); background: rgba(13,255,154,0.06); border-color: rgba(13,255,154,0.2);
  }
  .co-issues-link {
    font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700;
    color: #263354; text-decoration: none; letter-spacing: 0.04em;
    transition: color 0.15s;
  }
  .co-issues-link:hover { color: var(--diff-color, #0DFF9A); }

  /* ── Issues list ── */
  .co-issues-header { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem; }
  .co-view-all {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    background: #0C1018; border: 1px solid #1C2740; border-radius: 8px;
    font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 700;
    color: #6B7A99; text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase;
    transition: border-color 0.15s, color 0.15s;
  }
  .co-view-all:hover { border-color: rgba(13,255,154,0.3); color: #0DFF9A; }
  .co-issues { display: flex; flex-direction: column; gap: 1.5px; background: #1C2740; border: 1px solid #1C2740; border-radius: 12px; overflow: hidden; }
  .co-issue {
    display: flex; align-items: center; gap: 12px;
    padding: 1rem 1.25rem;
    background: #0C1018;
    text-decoration: none;
    transition: background 0.15s;
  }
  .co-issue:hover { background: #0E1520; }
  .co-issue-num {
    font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700;
    color: #263354; flex-shrink: 0; min-width: 36px;
  }
  .co-issue-title { font-size: 0.855rem; color: #C5CDD8; flex: 1; line-height: 1.4; transition: color 0.15s; }
  .co-issue:hover .co-issue-title { color: #FFFFFF; }
  .co-issue-labels { display: flex; gap: 5px; flex-shrink: 0; }
  .co-label {
    font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 700;
    padding: 2px 7px; border-radius: 4px; letter-spacing: 0.04em;
    background: #0E1420; border: 1px solid #1C2740; color: #6B7A99;
  }
  .co-label.easy { background: rgba(13,255,154,0.06); border-color: rgba(13,255,154,0.18); color: #0DFF9A; }
  .co-label.medium { background: rgba(77,158,255,0.06); border-color: rgba(77,158,255,0.18); color: #4D9EFF; }

  /* ── Process steps ── */
  .co-steps {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1.5px; background: #1C2740; border: 1px solid #1C2740; border-radius: 14px; overflow: hidden;
  }
  @media (max-width: 720px) { .co-steps { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 400px) { .co-steps { grid-template-columns: 1fr; } }
  .co-step { background: #0C1018; padding: 1.75rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .co-step-num {
    font-family: 'JetBrains Mono', monospace; font-size: 1.75rem; font-weight: 700;
    color: #1C2740; line-height: 1; letter-spacing: -0.03em;
  }
  .co-step-title { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; }
  .co-step-desc  { font-size: 0.82rem; color: #6B7A99; line-height: 1.65; }

  /* ── Final CTA ── */
  .co-cta {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem;
    padding: clamp(2.5rem, 5vw, 4rem) 2rem;
    background: #0C1018; border: 1px solid #1C2740; border-radius: 16px;
  }
  .co-cta-title { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .co-cta-sub { font-size: 0.95rem; color: #6B7A99; line-height: 1.65; max-width: 480px; }
  .co-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 0.5rem; }
  .co-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; background: #0DFF9A; color: #000;
    border-radius: 9px; border: none;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .co-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 24px rgba(13,255,154,0.25); }
  .co-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 22px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .co-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
`;

const DIFF_COLORS: Record<string, string> = {
  Beginner: "#0DFF9A", Intermediate: "#4D9EFF", Advanced: "#FF6B35",
};

const AREAS = [
  { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Engine Internals", desc: "Dive into the 13-stage pipeline. Add new stages, improve existing ones, write tests. Requires Python and an understanding of LLM orchestration.", issues: 8, difficulty: "Advanced", slug: "engine-internals" },
  { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title: "SDK Development", desc: "Help maintain Python, Node.js, Go, and React Native SDKs. Add new language ports. Full interface contract and test requirements provided.", issues: 5, difficulty: "Intermediate", slug: "sdks" },
  { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>, title: "Documentation", desc: "Improve guides, fix typos, write tutorials. Style guide included. No code required — documentation PRs are always welcome.", issues: 12, difficulty: "Beginner", slug: "docs" },
  { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>, title: "New Goal Packages", desc: "Build reusable YAML agent configurations for new domains — legal, education, finance, government. Publish to the goal marketplace.", issues: 15, difficulty: "Beginner", slug: "goals" },
  { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Language Support", desc: "Improve language detection accuracy, add new regional languages, and test multilingual edge cases across 22+ Indian and global languages.", issues: 7, difficulty: "Intermediate", slug: "languages" },
  { icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, title: "Benchmarks", desc: "Run extraction accuracy benchmarks on new datasets, test hallucination rates with new models, and publish reproducible results.", issues: 4, difficulty: "Advanced", slug: "benchmarks" },
];

const ISSUES = [
  { n: 142, title: "Add Kannada language test fixtures for field extraction", labels: ["good first issue"], difficulty: "Easy" },
  { n: 138, title: "Fix typo in YAML schema quickstart guide", labels: ["documentation"], difficulty: "Easy" },
  { n: 135, title: "Add list field type to Python SDK", labels: ["enhancement"], difficulty: "Medium" },
  { n: 131, title: "Node.js SDK: add TypeScript generics for field extraction output", labels: ["typescript"], difficulty: "Medium" },
  { n: 128, title: "Write integration test for offline sync race condition", labels: ["testing"], difficulty: "Medium" },
];

const GH_ICON = <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>;
const EXT = <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const ARROW = <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;

export default function ContributingPage() {
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Open Source"
        title="Build TrueNorth With Us"
        subtitle="We welcome contributions from developers who care about structured AI, India's compliance landscape, and open source infrastructure."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Contributing" }]}
      />
      <div className="co-root">
        <div className="co-container">

          {/* Quick links */}
          <div className="co-quick">
            {[
              { href: "https://github.com/amareshhebbar/TrueNorth/blob/main/CONTRIBUTING.md", label: "Read CONTRIBUTING.md", icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg> },
              { href: "https://github.com/amareshhebbar/TrueNorth/blob/main/CODE_OF_CONDUCT.md", label: "Code of Conduct", icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { href: "https://discord.gg/truenorth", label: "Join Discord", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg> },
            ].map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="co-quick-link">
                <div className="co-quick-icon">{l.icon}</div>
                <span className="co-quick-label">{l.label}</span>
                <span className="co-quick-arrow">{EXT}</span>
              </a>
            ))}
          </div>

          {/* Contribution areas */}
          <section>
            <div className="co-section-head">
              <div className="co-section-eyebrow">Where to start</div>
              <h2 className="co-section-title">Contribution Areas</h2>
              <p className="co-section-sub">Six tracks — pick the one that matches your skills and interests.</p>
            </div>
            <div className="co-areas-grid">
              {AREAS.map(a => {
                const c = DIFF_COLORS[a.difficulty] ?? "#0DFF9A";
                return (
                  <div
                    key={a.slug}
                    className="co-area-card"
                    // @ts-ignore
                    style={{ "--diff-color": c }}
                  >
                    <div className="co-area-icon" style={{ color: c, background: c + "0D", borderColor: c + "30" }}>{a.icon}</div>
                    <div className="co-area-title">{a.title}</div>
                    <div className="co-area-desc">{a.desc}</div>
                    <div className="co-area-footer">
                      <span className="co-diff-badge" style={{ color: c, background: c + "0D", borderColor: c + "30" }}>{a.difficulty}</span>
                      <a href={`https://github.com/amareshhebbar/TrueNorth/issues?q=label%3A${a.slug}`} target="_blank" rel="noopener noreferrer" className="co-issues-link">{a.issues} issues ↗</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Good first issues */}
          <section>
            <div className="co-issues-header">
              <div>
                <div className="co-section-eyebrow">Good first issues</div>
                <h2 className="co-section-title">Start Here</h2>
              </div>
              <a href="https://github.com/amareshhebbar/TrueNorth/issues?q=label%3A%22good+first+issue%22" target="_blank" rel="noopener noreferrer" className="co-view-all">
                {GH_ICON} View all {EXT}
              </a>
            </div>
            <div className="co-issues">
              {ISSUES.map(iss => (
                <a key={iss.n} href={`https://github.com/amareshhebbar/TrueNorth/issues/${iss.n}`} target="_blank" rel="noopener noreferrer" className="co-issue">
                  <span className="co-issue-num">#{iss.n}</span>
                  <span className="co-issue-title">{iss.title}</span>
                  <div className="co-issue-labels">
                    {iss.labels.map(l => <span key={l} className="co-label">{l}</span>)}
                    <span className={`co-label ${iss.difficulty.toLowerCase()}`}>{iss.difficulty}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Process */}
          <section>
            <div className="co-section-head">
              <div className="co-section-eyebrow">How it works</div>
              <h2 className="co-section-title">Contribution Process</h2>
            </div>
            <div className="co-steps">
              {[
                { n: "01", title: "Fork & Clone",   desc: "Fork the repo, clone locally, create a feature branch." },
                { n: "02", title: "Make Changes",   desc: "Follow the style guide. Write tests. Run the full test suite." },
                { n: "03", title: "Open PR",         desc: "Open a pull request with a clear description of what changed and why." },
                { n: "04", title: "Review & Merge", desc: "Maintainers review within 48h. Address feedback. Ship it." },
              ].map(s => (
                <div key={s.n} className="co-step">
                  <div className="co-step-num">{s.n}</div>
                  <div className="co-step-title">{s.title}</div>
                  <div className="co-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="co-cta">
            <h2 className="co-cta-title">Ready to contribute?</h2>
            <p className="co-cta-sub">TrueNorth is Apache 2.0 licensed and built entirely in the open. Every contribution, no matter how small, makes AI infrastructure better for India and the world.</p>
            <div className="co-cta-btns">
              <a href="https://github.com/amareshhebbar/TrueNorth" target="_blank" rel="noopener noreferrer" className="co-btn-primary">
                {GH_ICON} View on GitHub {ARROW}
              </a>
              <a href="https://discord.gg/truenorth" target="_blank" rel="noopener noreferrer" className="co-btn-secondary">Join Discord</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}