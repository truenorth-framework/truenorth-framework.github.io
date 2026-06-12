import PageHeader from "../../components/PageHeader";
import Link from "next/link";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .uc-root *, .uc-root *::before, .uc-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .uc-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .uc-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(3.5rem, 7vw, 5rem); }

  .uc-section-title {
    font-size: clamp(1.4rem, 2.8vw, 2rem);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.6rem;
  }
  .uc-section-sub { font-size: 0.95rem; color: #6B7A99; line-height: 1.65; max-width: 520px; margin-bottom: 2rem; }

  /* ── Stats ── */
  .uc-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  @media (max-width: 640px) { .uc-stats { grid-template-columns: repeat(2, 1fr); } }
  .uc-stat {
    background: #0C1018;
    padding: 1.75rem 1rem;
    display: flex; flex-direction: column;
    align-items: center; gap: 5px; text-align: center;
  }
  .uc-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 700;
    line-height: 1; letter-spacing: -0.02em;
  }
  .uc-stat-lbl {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: #6B7A99;
  }

  /* ── Two-col ── */
  .uc-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  @media (max-width: 820px) { .uc-two-col { grid-template-columns: 1fr; gap: 2rem; } }

  /* ── Prose ── */
  .uc-prose p { font-size: 0.95rem; color: #A8B4C8; line-height: 1.8; margin-bottom: 1.1rem; }
  .uc-prose p:last-child { margin-bottom: 0; }
  .uc-prose strong { color: #E0E8F0; font-weight: 700; }

  /* ── Feature list ── */
  .uc-feature-list {
    display: flex; flex-direction: column;
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  .uc-feature {
    background: #0C1018;
    padding: 1.25rem 1.5rem;
    display: flex; align-items: flex-start; gap: 1rem;
  }
  .uc-feat-icon {
    width: 38px; height: 38px; flex-shrink: 0;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid;
  }
  .uc-feat-title { font-size: 0.875rem; font-weight: 700; color: #FFFFFF; margin-bottom: 3px; }
  .uc-feat-desc  { font-size: 0.8rem; color: #6B7A99; line-height: 1.6; }

  /* ── Code card ── */
  .uc-code-card { border-radius: 14px; overflow: hidden; border: 1px solid #1C2740; }
  .uc-code-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; background: #0A0D14; border-bottom: 1px solid #1C2740;
  }
  .uc-code-dots { display: flex; gap: 6px; }
  .uc-code-dot  { width: 11px; height: 11px; border-radius: 50%; }
  .uc-code-filename { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #6B7A99; font-weight: 700; }
  .uc-code-pre {
    margin: 0; padding: 1.5rem; background: #07090F;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.775rem; line-height: 1.75;
    overflow-x: auto; white-space: pre;
  }
  .uc-ky  { color: #0DFF9A; }
  .uc-val { color: #8BE9FD; }
  .uc-str { color: #F1FA8C; }
  .uc-num { color: #BD93F9; }
  .uc-cm  { color: #6272A4; font-style: italic; }

  /* ── Flow steps ── */
  .uc-flow { display: flex; flex-direction: column; border: 1px solid #1C2740; border-radius: 14px; overflow: hidden; }
  .uc-flow-step {
    display: flex; align-items: flex-start; gap: 1.25rem;
    padding: 1.4rem 1.75rem;
    background: #0C1018;
    border-bottom: 1px solid #1C2740;
  }
  .uc-flow-step:last-child { border-bottom: none; }
  .uc-flow-num {
    width: 28px; height: 28px; flex-shrink: 0;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; font-weight: 700;
    border: 1px solid;
    margin-top: 1px;
  }
  .uc-flow-title { font-size: 0.9rem; font-weight: 700; color: #FFFFFF; margin-bottom: 3px; }
  .uc-flow-desc  { font-size: 0.82rem; color: #6B7A99; line-height: 1.6; }

  /* ── CTA strip ── */
  .uc-cta {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1.25rem;
    padding: 1.5rem 2rem;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
  }
  .uc-cta-left {}
  .uc-cta-title { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 3px; }
  .uc-cta-sub   { font-size: 0.78rem; color: #6B7A99; }
  .uc-cta-btns  { display: flex; flex-wrap: wrap; gap: 10px; }
  .uc-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 22px;
    border-radius: 9px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .uc-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 20px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .uc-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
`;

const ARROW = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const DOTS = (
  <>
    <div className="uc-code-dot" style={{ background: "#FF5F56" }} />
    <div className="uc-code-dot" style={{ background: "#FFBD2E" }} />
    <div className="uc-code-dot" style={{ background: "#27C93F" }} />
  </>
);



export default function HRScreeningPage() {
  const ACCENT = "#0DFF9A";
  const FEATURES = [
    {
      iconBg: "rgba(13,255,154,0.08)", iconBdr: "rgba(13,255,154,0.2)", iconClr: "#0DFF9A",
      icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      title: "WhatsApp or web",
      desc: "Candidates complete the screening in WhatsApp, a web widget, or any channel — TrueNorth handles all three natively.",
    },
    {
      iconBg: "rgba(77,158,255,0.08)", iconBdr: "rgba(77,158,255,0.2)", iconClr: "#4D9EFF",
      icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
      title: "Direct ATS output",
      desc: "15 fields extracted and validated, output as JSON, pushed to your ATS via webhook. No manual entry, no CSV exports.",
    },
    {
      iconBg: "rgba(255,215,0,0.08)", iconBdr: "rgba(255,215,0,0.2)", iconClr: "#FFD700",
      icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      title: "Async follow-ups",
      desc: "If a candidate drops off, TrueNorth sends a personalised follow-up after 24 hours using the collected context — no cron job needed.",
    },
  ];
  const HR_YAML = [
    "id: hr_screening",
    `persona: "You are a professional HR coordinator."`,
    "",
    "fields:",
    "  - name: candidate_name",
    "    type: text",
    "    required: true",
    "  - name: current_role",
    "    type: text",
    "  - name: experience_years",
    "    type: integer",
    "  - name: skills",
    "    type: list",
    "  - name: salary_expectation",
    "    type: integer",
    "    # Extracted from natural language: \"around 18 LPA\" → 18",
    "",
    "output_template: hr_screening_v1",
    "webhook: https://your-ats.com/api/candidates",
  ];
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Use Case · Recruiting"
        title="Structured candidate data. Zero manual effort."
        subtitle="Collect 15 fields from candidates via WhatsApp or web. Output goes straight to your ATS as validated JSON."
        breadcrumbs={[{ label: "Use Cases", href: "/use-cases" }, { label: "HR Screening" }]}
        accentColor={ACCENT}
      />
      <div className="uc-root">
        <div className="uc-container">
          <div className="uc-stats">
            {[
              { v: "88%", l: "Completion rate", c: ACCENT },
              { v: "7.4", l: "Avg turns",       c: ACCENT },
              { v: "$0.004", l: "Per screen",   c: ACCENT },
              { v: "15",   l: "Fields",         c: ACCENT },
            ].map(s => (
              <div key={s.l} className="uc-stat">
                <div className="uc-stat-val" style={{ color: s.c }}>{s.v}</div>
                <div className="uc-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="uc-two-col">
            <div>
              <h2 className="uc-section-title">The problem</h2>
              <div className="uc-prose">
                <p>Recruiting teams spend <strong>40% of their time on manual data entry</strong> — copying candidate answers from email or Slack into their ATS. A 15-field screening form that takes a human 20 minutes to process takes TrueNorth 7.4 conversation turns.</p>
                <p>Existing chatbot solutions produce flat text transcripts, not structured data. You still have to read the transcript and fill in the ATS manually.</p>
              </div>
            </div>
            <div>
              <h2 className="uc-section-title">Key capabilities</h2>
              <div className="uc-feature-list">
                {FEATURES.map(f => (
                  <div key={f.title} className="uc-feature">
                    <div className="uc-feat-icon" style={{ background: f.iconBg, borderColor: f.iconBdr, color: f.iconClr }}>{f.icon}</div>
                    <div>
                      <div className="uc-feat-title">{f.title}</div>
                      <div className="uc-feat-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section>
            <h2 className="uc-section-title">YAML configuration</h2>
            <p className="uc-section-sub">The complete HR screening agent in under 20 lines.</p>
            <div className="uc-code-card">
              <div className="uc-code-bar">
                <div className="uc-code-dots">{DOTS}</div>
                <span className="uc-code-filename">hr_screening.yaml</span>
                <div style={{ width: 52 }} />
              </div>
              <pre className="uc-code-pre">
                {HR_YAML.map((line, i) => {
                  if (line.trim().startsWith("#")) return <div key={i}><span className="uc-cm">{line}</span></div>;
                  const ci = line.indexOf(":");
                  if (ci > -1) {
                    const k = line.slice(0, ci + 1);
                    const v = line.slice(ci + 1);
                    const vt = v.trim();
                    const isStr = vt.startsWith('"') || vt.startsWith("'");
                    const isNum = !isStr && !isNaN(Number(vt)) && vt !== "";
                    return <div key={i}><span className="uc-ky">{k}</span>{isStr ? <span className="uc-str">{v}</span> : isNum ? <span className="uc-num">{v}</span> : <span className="uc-val">{v}</span>}</div>;
                  }
                  if (line.trim().startsWith("-")) return <div key={i} style={{color:"#8BE9FD"}}>{line}</div>;
                  return <div key={i}>{line}</div>;
                })}
              </pre>
            </div>
          </section>

          <div className="uc-cta">
            <div className="uc-cta-left">
              <div className="uc-cta-title">Try the HR screening agent</div>
              <div className="uc-cta-sub">Live demo in the playground — no account needed.</div>
            </div>
            <div className="uc-cta-btns">
              <Link href="/playground" className="uc-btn-primary" style={{ background: ACCENT, color: "#000" }}>
                Open Playground {ARROW}
              </Link>
              <Link href="/docs/use-cases/hr-screening" className="uc-btn-secondary">Read the docs</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}