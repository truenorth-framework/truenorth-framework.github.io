// FILE: app/use-cases/rural-medical-intake/page.tsx
import PageHeader from "../../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rural Medical Intake — TrueNorth Use Cases",
  description: "Collecting 12 critical fields in Kannada, Hindi, or English — without reliable internet.",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .rm-root *, .rm-root *::before, .rm-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rm-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .rm-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(3.5rem, 7vw, 5rem); }

  .rm-section-title {
    font-size: clamp(1.4rem, 2.8vw, 2rem);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.6rem;
  }
  .rm-section-sub { font-size: 0.95rem; color: #6B7A99; line-height: 1.65; max-width: 520px; margin-bottom: 2rem; }

  /* ── Stats grid ── */
  .rm-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  @media (max-width: 640px) { .rm-stats { grid-template-columns: repeat(2, 1fr); } }
  .rm-stat {
    background: #0C1018;
    padding: 1.75rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    text-align: center;
  }
  .rm-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 700;
    color: #FF6B35;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .rm-stat-lbl {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6B7A99;
  }

  /* ── Two-column body layout ── */
  .rm-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  @media (max-width: 820px) { .rm-two-col { grid-template-columns: 1fr; gap: 2rem; } }

  /* ── Problem section ── */
  .rm-prose p {
    font-size: 0.95rem;
    color: #A8B4C8;
    line-height: 1.8;
    margin-bottom: 1.1rem;
  }
  .rm-prose p:last-child { margin-bottom: 0; }
  .rm-prose strong { color: #E0E8F0; font-weight: 700; }

  /* ── Solution cards ── */
  .rm-solutions {
    display: flex;
    flex-direction: column;
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  .rm-sol-card {
    background: #0C1018;
    padding: 1.4rem 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .rm-sol-icon {
    width: 40px; height: 40px; flex-shrink: 0;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,107,53,0.08);
    border: 1px solid rgba(255,107,53,0.2);
    color: #FF6B35;
  }
  .rm-sol-title { font-size: 0.9rem; font-weight: 700; color: #FFFFFF; margin-bottom: 3px; }
  .rm-sol-desc { font-size: 0.82rem; color: #6B7A99; line-height: 1.6; }

  /* ── Code card ── */
  .rm-code-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #1C2740;
  }
  .rm-code-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px;
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
  }
  .rm-code-dots { display: flex; gap: 6px; }
  .rm-code-dot  { width: 11px; height: 11px; border-radius: 50%; }
  .rm-code-filename {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: #6B7A99;
    font-weight: 700;
  }
  .rm-code-pre {
    margin: 0;
    padding: 1.5rem;
    background: #07090F;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.775rem;
    line-height: 1.75;
    overflow-x: auto;
    white-space: pre;
  }
  .rm-ky  { color: #0DFF9A; }
  .rm-val { color: #8BE9FD; }
  .rm-str { color: #F1FA8C; }
  .rm-num { color: #BD93F9; }
  .rm-cm  { color: #6272A4; font-style: italic; }
  .rm-op  { color: #6B7A99; }

  /* ── Install strip ── */
  .rm-install {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.25rem;
    padding: 1.5rem 2rem;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
  }
  .rm-install-cmd {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: #C5CDD8;
  }
  .rm-install-cmd span.prompt { color: #0DFF9A; font-weight: 700; }
  .rm-install-cmd span.cmd   { font-weight: 700; }
  .rm-install-sub { font-size: 0.75rem; color: #263354; margin-top: 3px; }
  .rm-install-btns { display: flex; flex-wrap: wrap; gap: 10px; }
  .rm-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 22px; background: #FF6B35; color: #fff;
    border-radius: 9px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .rm-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(255,107,53,0.3); }
  .rm-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 20px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .rm-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
`;

const YAML_LINES = [
  [["rm-ky","id"], [" medical_intake"]],
  [["rm-ky","persona"], ["rm-str",' "You are a compassionate health assistant. Speak in the patient\'s language."']],
  [["",""]],
  [["rm-ky","compliance"], ["rm-op",":"]],
  [["rm-ky","  dpdp_act"], ["rm-val"," true"]],
  [["rm-ky","  purpose"], ["rm-str",' "Healthcare delivery under DPDP Act Section 4(b)"']],
  [["rm-ky","  retention_days"], ["rm-num"," 90"]],
  [["",""]],
  [["rm-ky","offline"], ["rm-op",":"]],
  [["rm-ky","  enabled"], ["rm-val"," true"]],
  [["rm-ky","  storage"], ["rm-val"," sqlite"]],
  [["rm-ky","  sync_on_reconnect"], ["rm-val"," true"]],
  [["",""]],
  [["rm-ky","fields"], ["rm-op",":"]],
  [["rm-ky","  - name"], ["rm-val"," patient_name"]],
  [["rm-ky","    type"], ["rm-val"," text"]],
  [["rm-ky","    required"], ["rm-val"," true"]],
  [["rm-ky","    question"], ["rm-str",' "What is your name?"']],
  [["",""]],
  [["rm-ky","  - name"], ["rm-val"," age"]],
  [["rm-ky","    type"], ["rm-val"," integer"]],
  [["rm-ky","    range"], ["rm-num"," [0, 120]"]],
  [["rm-ky","    question"], ["rm-str",' "How old are you?"']],
  [["",""]],
  [["rm-ky","  - name"], ["rm-val"," chief_complaint"]],
  [["rm-ky","    type"], ["rm-val"," text"]],
  [["rm-ky","    question"], ["rm-str",' "What health issue brings you in today?"']],
  [["",""]],
  [["rm-ky","  - name"], ["rm-val"," pain_scale"]],
  [["rm-ky","    type"], ["rm-val"," integer"]],
  [["rm-ky","    range"], ["rm-num"," [0, 10]"]],
  [["rm-ky","    question"], ["rm-str",' "Severity from 0 to 10?"']],
  [["",""]],
  [["rm-ky","output_template"], ["rm-val"," medical_intake_v2"]],
  [["rm-ky","send_to"], ["rm-str",' "https://statehealth.gov.in/api/intake"']],
];

const ARROW = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function RuralMedicalIntakePage() {
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Use Case · Healthcare"
        title="Rural Medical Intake"
        subtitle="Collecting 12 critical fields in Kannada, Hindi, or English — without reliable internet. Built for PHCs and rural health workers."
        breadcrumbs={[{ label: "Use Cases", href: "/use-cases" }, { label: "Rural Medical Intake" }]}
        accentColor="#FF6B35"
      />

      <div className="rm-root">
        <div className="rm-container">

          {/* Stats */}
          <div className="rm-stats">
            {[
              { v: "79%", l: "Completion rate" },
              { v: "~9",  l: "Average turns"   },
              { v: "0",   l: "Internet needed"  },
              { v: "22+", l: "Languages"        },
            ].map(s => (
              <div key={s.l} className="rm-stat">
                <div className="rm-stat-val">{s.v}</div>
                <div className="rm-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Problem + Solution */}
          <div className="rm-two-col">
            <div>
              <h2 className="rm-section-title">The problem</h2>
              <div className="rm-prose">
                <p>Primary Health Centers in rural India face a documentation crisis. Health workers need to collect <strong>12+ structured data points per patient</strong> — but 40% of PHCs have unreliable internet, and most patients speak regional languages like Kannada, Telugu, or Odia.</p>
                <p>Existing solutions either require constant connectivity, or force English-only input that excludes the patients who need care most. Paper forms get lost. Digital forms fail on slow 2G.</p>
                <p>TrueNorth was built specifically for this scenario — offline-first, multilingual, and structured from the first word.</p>
              </div>
            </div>
            <div>
              <h2 className="rm-section-title">The solution</h2>
              <p className="rm-section-sub" style={{ marginBottom: "1.25rem" }}>Three capabilities that make this work in production.</p>
              <div className="rm-solutions">
                {[
                  {
                    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
                    title: "Offline SQLite sessions",
                    desc: "All session data stored locally. The agent continues collecting fields even with zero internet. Syncs when connectivity returns — idempotent, no duplicates.",
                  },
                  {
                    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                    title: "Auto language detection",
                    desc: "Patients speak in any of 22+ languages. TrueNorth detects the language on the first message and responds in kind — no config, no locale flags.",
                  },
                  {
                    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                    title: "Validated structured output",
                    desc: "12 fields extracted and validated with typed constraints. JSON sent to the state health system automatically on sync — ready for any EHR API.",
                  },
                ].map(s => (
                  <div key={s.title} className="rm-sol-card">
                    <div className="rm-sol-icon">{s.icon}</div>
                    <div>
                      <div className="rm-sol-title">{s.title}</div>
                      <div className="rm-sol-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* YAML config */}
          <section>
            <h2 className="rm-section-title">YAML configuration</h2>
            <p className="rm-section-sub">The complete agent definition — offline, compliant, multilingual.</p>
            <div className="rm-code-card">
              <div className="rm-code-bar">
                <div className="rm-code-dots">
                  <div className="rm-code-dot" style={{ background: "#FF5F56" }} />
                  <div className="rm-code-dot" style={{ background: "#FFBD2E" }} />
                  <div className="rm-code-dot" style={{ background: "#27C93F" }} />
                </div>
                <span className="rm-code-filename">medical_intake.yaml</span>
                <div style={{ width: 52 }} />
              </div>
              <pre className="rm-code-pre">
                {YAML_LINES.map((line, li) => (
                  <div key={li}>
                    {line.map(([cls, text], ti) => (
                      <span key={ti} className={cls as string}>{text}</span>
                    ))}
                  </div>
                ))}
              </pre>
            </div>
          </section>

          {/* Install / CTA */}
          <div className="rm-install">
            <div>
              <div className="rm-install-cmd">
                <span className="prompt">$</span>
                <span className="cmd">truenorth install medical-intake</span>
              </div>
              <div className="rm-install-sub">Installs schema, validation rules, DPDP compliance block, and offline config</div>
            </div>
            <div className="rm-install-btns">
              <Link href="/playground" className="rm-btn-primary">
                Try in Playground {ARROW}
              </Link>
              <Link href="/docs/use-cases/medical-intake" className="rm-btn-secondary">
                Read the docs
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}