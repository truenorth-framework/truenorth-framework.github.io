import PageHeader from "../../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hallucination Firewall — TrueNorth Features",
  description: "~2% hallucination rate vs 18.3% raw LLM. A 3-stage claim verification pipeline.",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .hf-root *, .hf-root *::before, .hf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .hf-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
  }
  .hf-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem);
    display: flex;
    flex-direction: column;
    gap: clamp(4rem, 8vw, 6rem);
  }
  .hf-section-title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 0.6rem;
    line-height: 1.1;
  }
  .hf-section-sub {
    font-size: 0.95rem;
    color: #6B7A99;
    line-height: 1.65;
    max-width: 520px;
    margin-bottom: 2rem;
  }

  /* ── Stats row ── */
  .hf-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  @media (max-width: 640px) {
    .hf-stats { grid-template-columns: 1fr; }
  }
  .hf-stat {
    background: #0C1018;
    padding: 2rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .hf-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #FF6B35;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .hf-stat-lbl { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; }
  .hf-stat-sub { font-size: 0.78rem; color: #6B7A99; }

  /* ── Pipeline ── */
  .hf-pipeline {
    display: grid;
    grid-template-columns: 1fr 32px 1fr 32px 1fr;
    align-items: center;
    gap: 0;
  }
  @media (max-width: 720px) {
    .hf-pipeline { grid-template-columns: 1fr; gap: 0; }
    .hf-pipeline-arrow { transform: rotate(90deg); }
  }
  .hf-stage {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.2s;
  }
  .hf-stage:hover { border-color: rgba(255,107,53,0.3); }
  .hf-stage-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .hf-stage-icon {
    width: 42px; height: 42px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid;
  }
  .hf-stage-name { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; }
  .hf-stage-desc { font-size: 0.8rem; color: #6B7A99; line-height: 1.6; }
  .hf-pipeline-arrow {
    display: flex; align-items: center; justify-content: center;
    color: #1C2740;
  }

  /* ── Before/After example ── */
  .hf-example-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 720px) {
    .hf-example-grid { grid-template-columns: 1fr; }
  }
  .hf-ex-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid;
    display: flex;
    flex-direction: column;
  }
  .hf-ex-card.bad  { border-color: rgba(220,60,60,0.25); background: #0D0808; }
  .hf-ex-card.good { border-color: rgba(255,107,53,0.25); background: #0D0A08; }
  .hf-ex-bar {
    display: flex; align-items: center; gap: 8px;
    padding: 11px 16px;
    border-bottom: 1px solid;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    background: rgba(0,0,0,0.2);
  }
  .hf-ex-card.bad  .hf-ex-bar { border-color: rgba(220,60,60,0.15); color: #E05555; }
  .hf-ex-card.good .hf-ex-bar { border-color: rgba(255,107,53,0.15); color: #FF6B35; }
  .hf-ex-body { padding: 1.25rem 1.5rem; flex: 1; }
  .hf-ex-text {
    font-size: 0.85rem;
    line-height: 1.75;
    color: #8B9AB5;
  }
  .hf-halluc { color: #E05555; text-decoration: line-through; font-weight: 500; }
  .hf-clean   { color: #C5CDD8; }
  .hf-ex-note {
    display: flex; align-items: center; gap: 6px;
    margin-top: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 7px 10px;
    border-radius: 7px;
  }
  .hf-ex-card.bad  .hf-ex-note { background: rgba(220,60,60,0.08); color: #E05555; border: 1px solid rgba(220,60,60,0.15); }
  .hf-ex-card.good .hf-ex-note { background: rgba(255,107,53,0.08); color: #FF6B35; border: 1px solid rgba(255,107,53,0.15); }

  /* ── FAQ / how it works detail ── */
  .hf-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 720px) {
    .hf-detail-grid { grid-template-columns: 1fr; }
  }
  .hf-detail-card {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
    padding: 1.75rem;
  }
  .hf-detail-q {
    font-size: 0.95rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 0.6rem;
    display: flex; align-items: flex-start; gap: 10px;
  }
  .hf-detail-q-icon {
    width: 20px; height: 20px; flex-shrink: 0;
    border-radius: 5px;
    background: rgba(255,107,53,0.1);
    border: 1px solid rgba(255,107,53,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #FF6B35;
    margin-top: 1px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
  }
  .hf-detail-a { font-size: 0.845rem; color: #6B7A99; line-height: 1.68; }

  /* ── CTA ── */
  .hf-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: clamp(2.5rem, 5vw, 4rem);
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 16px;
    text-align: center;
  }
  .hf-cta-title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .hf-cta-sub   { font-size: 0.95rem; color: #6B7A99; max-width: 420px; line-height: 1.65; }
  .hf-cta-btns  { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 0.5rem; }
  .hf-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; background: #FF6B35; color: #fff;
    border-radius: 9px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .hf-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 24px rgba(255,107,53,0.3); }
  .hf-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 22px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .hf-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
`;

const STAGES = [
  {
    n: "01", color: "#4D9EFF",
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    name: "ClaimExtractor",
    desc: "Identifies all factual claims in the LLM output before delivery to the user.",
  },
  {
    n: "02", color: "#FFD700",
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    name: "ClaimVerifier",
    desc: "Cross-references each extracted claim against source conversation turns.",
  },
  {
    n: "03", color: "#FF6B35",
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    name: "OutputSanitizer",
    desc: "Removes unverified claims; replaces with null or a targeted follow-up question.",
  },
];

const FAQS = [
  {
    q: "Does this add latency?",
    a: "No. The 3 stages run inside the same LLM call using structured output constraints. There is zero added round-trip latency.",
  },
  {
    q: "How was the 2.1% rate measured?",
    a: "Blind automated evaluation across 1,000 real production medical intakes using a separate verification model. The test harness is open-source.",
  },
  {
    q: "Does it work in other languages?",
    a: "Yes. ClaimExtractor and ClaimVerifier both operate on the semantic content, not raw English strings. All 22 supported languages are covered.",
  },
  {
    q: "Can I tune the confidence threshold?",
    a: "Yes. Set min_confidence: 0.85 in your YAML to accept only claims the verifier is 85%+ confident about. Lower thresholds allow more through.",
  },
];

export default function HallucinationFirewallPage() {
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Hallucination Firewall"
        title="~2% hallucination rate. Not 18%."
        subtitle="A 3-stage pipeline that extracts claims, verifies them against source turns, and sanitizes any that can't be confirmed — all within the same LLM call."
        breadcrumbs={[{ label: "Features", href: "/features" }, { label: "Hallucination Firewall" }]}
        accentColor="#FF6B35"
      />

      <div className="hf-root">
        <div className="hf-container">

          {/* Stats */}
          <div className="hf-stats">
            {[
              { val: "2.1%",  lbl: "Hallucination rate",  sub: "vs 18.3% raw LLM baseline" },
              { val: "94%",   lbl: "Claim catch rate",     sub: "in blind evaluation runs"  },
              { val: "0ms",   lbl: "Added latency",        sub: "runs inside the LLM call"  },
            ].map((s, i) => (
              <div key={i} className="hf-stat">
                <div className="hf-stat-val">{s.val}</div>
                <div className="hf-stat-lbl">{s.lbl}</div>
                <div className="hf-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <section>
            <h2 className="hf-section-title">The 3-stage pipeline</h2>
            <p className="hf-section-sub">Every LLM response passes through all three stages before the user sees it.</p>
            <div className="hf-pipeline">
              {STAGES.map((s, i) => (
                <div key={i}>
                  <div key={i} className="hf-stage">
                    <span className="hf-stage-num" style={{ color: s.color }}>Stage {s.n}</span>
                    <div
                      className="hf-stage-icon"
                      style={{
                        background: s.color + "12",
                        borderColor: s.color + "30",
                        color: s.color,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div className="hf-stage-name">{s.name}</div>
                    <div className="hf-stage-desc">{s.desc}</div>
                  </div>
                  {i < 2 && (
                    <div key={`arr-${i}`} className="hf-pipeline-arrow">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Before / After */}
          <section>
            <h2 className="hf-section-title">Real example: medical intake</h2>
            <p className="hf-section-sub">The same conversation — once with raw LLM output, once with the firewall active.</p>
            <div className="hf-example-grid">
              <div className="hf-ex-card bad">
                <div className="hf-ex-bar">
                  <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2.5"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2.5"/></svg>
                  Raw LLM — invented data
                </div>
                <div className="hf-ex-body">
                  <p className="hf-ex-text">
                    Based on your conversation, your blood pressure appears to be{" "}
                    <span className="hf-halluc">120/80</span> and you seem to have a{" "}
                    <span className="hf-halluc">mild fever of 37.5°C</span>.
                  </p>
                  <div className="hf-ex-note">
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    These values were never mentioned in the conversation
                  </div>
                </div>
              </div>
              <div className="hf-ex-card good">
                <div className="hf-ex-bar">
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  TrueNorth Firewall — sanitized
                </div>
                <div className="hf-ex-body">
                  <p className="hf-ex-text">
                    <span className="hf-clean">
                      Based on what you've shared, I'd like to confirm a few things. Could you share your current blood pressure reading? And have you measured your temperature recently?
                    </span>
                  </p>
                  <div className="hf-ex-note">
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    Unverifiable claims removed, targeted follow-ups generated
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="hf-section-title">Common questions</h2>
            <p className="hf-section-sub" style={{ marginBottom: "2rem" }}>Things engineers ask before deploying to production.</p>
            <div className="hf-detail-grid">
              {FAQS.map((f, i) => (
                <div key={i} className="hf-detail-card">
                  <div className="hf-detail-q">
                    <span className="hf-detail-q-icon">Q</span>
                    {f.q}
                  </div>
                  <p className="hf-detail-a">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="hf-cta">
            <h2 className="hf-cta-title">See it run live</h2>
            <p className="hf-cta-sub">The playground runs the full pipeline including the hallucination firewall on every bot turn.</p>
            <div className="hf-cta-btns">
              <Link href="/playground" className="hf-btn-primary">
                Open Playground
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/docs/hallucination-firewall" className="hf-btn-secondary">Read the docs</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}