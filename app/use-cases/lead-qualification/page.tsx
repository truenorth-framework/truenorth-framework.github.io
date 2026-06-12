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

export default function LeadQualificationPage() {
  const ACCENT = "#25D366";
  const FLOW = [
    { n: "1", title: "Prospect sends a WhatsApp message", desc: "Any message to your WhatsApp Business number starts a session. Phone number becomes the session ID — no login, no form link to click." },
    { n: "2", title: "TrueNorth qualifies in real time", desc: "The agent collects budget, timeline, use case, team size, and decision authority — adapting questions based on previous answers." },
    { n: "3", title: "Structured JSON sent to your CRM", desc: "On session complete, a validated lead object is posted to your CRM webhook. Salesforce, HubSpot, Pipedrive — any REST endpoint." },
    { n: "4", title: "Async follow-up if dropped off", desc: "If the prospect leaves mid-session, TrueNorth re-initiates with a personalised message after 24 hours. 87% completion rate with 3 follow-ups." },
  ];
  const LQ_YAML = [
    "id: lead_qualification",
    `persona: "You are a friendly sales assistant at a SaaS company."`,
    "",
    "fields:",
    "  - name: company_name",
    "    type: text",
    "  - name: team_size",
    "    type: integer",
    "  - name: budget_usd",
    "    type: integer",
    "    # \"around 10k\" → 10000",
    "  - name: timeline_weeks",
    "    type: integer",
    "  - name: decision_maker",
    "    type: boolean",
    "",
    "follow_up:",
    "  enabled: true",
    "  after_hours: 24",
    "  channel: whatsapp",
    "",
    "webhook: https://your-crm.com/api/leads",
  ];
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Use Case · Sales"
        title="WhatsApp leads, structured instantly."
        subtitle="Phone number in, qualified lead JSON out. Integrates with any CRM via webhook. Async follow-ups included."
        breadcrumbs={[{ label: "Use Cases", href: "/use-cases" }, { label: "Lead Qualification" }]}
        accentColor={ACCENT}
      />
      <div className="uc-root">
        <div className="uc-container">
          <div className="uc-stats">
            {[
              { v: "87%", l: "Completion rate", c: ACCENT },
              { v: "6.2", l: "Avg turns",       c: ACCENT },
              { v: "24h", l: "Follow-up delay", c: ACCENT },
              { v: "3×",  l: "CRM pipeline",    c: ACCENT },
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
                <p>Most lead qualification happens in email threads or Calendly forms that lose <strong>60%+ of prospects before completion</strong>. WhatsApp has 3x higher open rates — but no native way to collect structured data.</p>
                <p>Existing WhatsApp bots send canned messages and dump transcripts into a spreadsheet. TrueNorth extracts typed, validated fields and pushes them directly to your CRM.</p>
              </div>
            </div>
            <div>
              <h2 className="uc-section-title">How the pipeline works</h2>
              <div className="uc-flow">
                {FLOW.map(s => (
                  <div key={s.n} className="uc-flow-step">
                    <div className="uc-flow-num" style={{ background: "rgba(37,211,102,0.08)", borderColor: "rgba(37,211,102,0.2)", color: ACCENT }}>{s.n}</div>
                    <div>
                      <div className="uc-flow-title">{s.title}</div>
                      <div className="uc-flow-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section>
            <h2 className="uc-section-title">YAML configuration</h2>
            <p className="uc-section-sub">Async follow-ups and CRM webhook — all in the schema.</p>
            <div className="uc-code-card">
              <div className="uc-code-bar">
                <div className="uc-code-dots">{DOTS}</div>
                <span className="uc-code-filename">lead_qualification.yaml</span>
                <div style={{ width: 52 }} />
              </div>
              <pre className="uc-code-pre">
                {LQ_YAML.map((line, i) => {
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
              <div className="uc-cta-title">Try the lead qualification agent</div>
              <div className="uc-cta-sub">Live demo in the playground — no account needed.</div>
            </div>
            <div className="uc-cta-btns">
              <Link href="/playground" className="uc-btn-primary" style={{ background: ACCENT, color: "#000" }}>
                Open Playground {ARROW}
              </Link>
              <Link href="/docs/use-cases/lead-qualification" className="uc-btn-secondary">Read the docs</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}