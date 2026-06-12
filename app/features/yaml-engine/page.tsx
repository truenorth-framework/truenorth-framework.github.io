import PageHeader from "../../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YAML Engine — TrueNorth Features",
  description: "Configure complete AI agents in 15 lines of YAML.",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .ye-root *, .ye-root *::before, .ye-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ye-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
  }

  .ye-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem);
    display: flex;
    flex-direction: column;
    gap: clamp(4rem, 8vw, 6rem);
  }

  /* ── Section heading ── */
  .ye-section-head {
    margin-bottom: 2rem;
  }
  .ye-section-title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    line-height: 1.1;
    margin-bottom: 0.6rem;
  }
  .ye-section-sub {
    font-size: 0.95rem;
    color: #6B7A99;
    line-height: 1.65;
    max-width: 520px;
  }

  /* ── Comparison ── */
  .ye-compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 720px) {
    .ye-compare-grid { grid-template-columns: 1fr; }
  }
  .ye-code-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid;
    display: flex;
    flex-direction: column;
  }
  .ye-code-card.bad  { border-color: rgba(220,60,60,0.25); background: #0D0808; }
  .ye-code-card.good { border-color: rgba(13,255,154,0.2); background: #080D0B; }
  .ye-card-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px;
    border-bottom: 1px solid;
    background: rgba(0,0,0,0.25);
  }
  .ye-code-card.bad  .ye-card-bar { border-color: rgba(220,60,60,0.15); }
  .ye-code-card.good .ye-card-bar { border-color: rgba(13,255,154,0.12); }
  .ye-card-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .ye-code-card.bad  .ye-card-label { color: #E05555; }
  .ye-code-card.good .ye-card-label { color: #0DFF9A; }
  .ye-card-lines {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    padding: 4px 9px;
    border-radius: 100px;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .ye-code-card.bad  .ye-card-lines { background: rgba(220,60,60,0.1); color: #E05555; border: 1px solid rgba(220,60,60,0.2); }
  .ye-code-card.good .ye-card-lines { background: rgba(13,255,154,0.08); color: #0DFF9A; border: 1px solid rgba(13,255,154,0.2); }

  .ye-code-body {
    padding: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    line-height: 1.75;
    flex: 1;
    overflow-x: auto;
  }
  .ye-dim   { color: #1E2E4A; }
  .ye-muted { color: #263354; }
  .ye-key   { color: #0DFF9A; }
  .ye-val   { color: #8BE9FD; }
  .ye-str   { color: #F1FA8C; }
  .ye-num   { color: #BD93F9; }
  .ye-bool  { color: #FF79C6; }
  .ye-cm    { color: #6272A4; font-style: italic; }
  .ye-bad-key { color: #E05555; }
  .ye-bad-fn  { color: rgba(220,100,100,0.6); }

  .ye-code-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 12px 18px;
    border-top: 1px solid rgba(13,255,154,0.1);
  }
  .ye-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: rgba(13,255,154,0.06);
    border: 1px solid rgba(13,255,154,0.15);
    color: #0DFF9A;
  }

  /* ── Field types table ── */
  .ye-table-wrap {
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  .ye-table {
    width: 100%;
    border-collapse: collapse;
  }
  .ye-table thead tr {
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
  }
  .ye-table th {
    padding: 11px 16px;
    text-align: left;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #263354;
    white-space: nowrap;
  }
  .ye-table td {
    padding: 11px 16px;
    font-size: 0.825rem;
    border-bottom: 1px solid #0E1420;
    vertical-align: top;
  }
  .ye-table tbody tr:last-child td { border-bottom: none; }
  .ye-table tbody tr { background: #080B12; transition: background 0.15s; }
  .ye-table tbody tr:hover { background: #0C1018; }
  .ye-td-type {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    color: #0DFF9A;
    white-space: nowrap;
  }
  .ye-td-desc { color: #C5CDD8; line-height: 1.5; }
  .ye-td-ex {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: #6B7A99;
  }
  /* mobile: stack table */
  @media (max-width: 600px) {
    .ye-table thead { display: none; }
    .ye-table, .ye-table tbody, .ye-table tr, .ye-table td { display: block; width: 100%; }
    .ye-table tr { padding: 12px 16px; border-bottom: 1px solid #0E1420; }
    .ye-table td { padding: 2px 0; border: none; }
    .ye-td-type { margin-bottom: 4px; }
  }

  /* ── How it works steps ── */
  .ye-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  @media (max-width: 720px) {
    .ye-steps { grid-template-columns: 1fr; }
  }
  .ye-step {
    background: #0C1018;
    padding: 2rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .ye-step-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #263354;
  }
  .ye-step-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(13,255,154,0.08);
    border: 1px solid rgba(13,255,154,0.18);
    color: #0DFF9A;
  }
  .ye-step-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.3;
  }
  .ye-step-desc {
    font-size: 0.825rem;
    color: #6B7A99;
    line-height: 1.65;
  }

  /* ── CTA ── */
  .ye-cta {
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
  .ye-cta-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
  }
  .ye-cta-sub {
    font-size: 0.95rem;
    color: #6B7A99;
    max-width: 420px;
    line-height: 1.65;
  }
  .ye-cta-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 0.5rem;
  }
  .ye-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px;
    background: #0DFF9A; color: #000;
    border-radius: 9px; border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem; font-weight: 800;
    text-decoration: none; cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    line-height: 1;
  }
  .ye-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 24px rgba(13,255,154,0.28); }
  .ye-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 22px;
    background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem; font-weight: 600;
    text-decoration: none; cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    line-height: 1;
  }
  .ye-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
`;

const fieldTypes = [
  { type: "text",    desc: "Free-form string input",                              example: "\"I'm Priya Sharma\"" },
  { type: "integer", desc: "Whole number with optional min/max range",            example: "\"I'm 28\" → 28" },
  { type: "float",   desc: "Decimal number",                                      example: "\"about 5 and a half\" → 5.5" },
  { type: "date",    desc: "Date in any format, normalized to ISO 8601",           example: "\"born in 1995\" → 1995-01-01" },
  { type: "enum",    desc: "Constrained to one of predefined options",            example: "weight_loss | muscle_gain | endurance" },
  { type: "boolean", desc: "Yes / no values, normalised from natural language",   example: "\"yeah sure\" → true" },
  { type: "email",   desc: "Validated email address",                             example: "priya@example.com" },
  { type: "phone",   desc: "Validated phone number, India-first",                 example: "+91 98765 43210" },
  { type: "list",    desc: "Array of values extracted from a single response",    example: "[\"Python\", \"Go\", \"Rust\"]" },
];

const steps = [
  {
    n: "01",
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
    title: "Write your schema in YAML",
    desc: "Define fields, types, ranges, personas, and output templates. One file is all you need.",
  },
  {
    n: "02",
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "TrueNorth builds the pipeline",
    desc: "Validation, conflict detection, confidence scoring, hallucination firewall — all compiled from your YAML.",
  },
  {
    n: "03",
    icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: "Get structured JSON out",
    desc: "The engine runs the conversation and returns fully validated, typed JSON — ready for your database or API.",
  },
];

export default function YAMLEnginePage() {
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="YAML Engine"
        title="Configuration replaced code."
        subtitle="200 lines of Python state management becomes 15 lines of YAML. Zero custom code. Full production capability — validation, conflict detection, compliance, all included."
        breadcrumbs={[{ label: "Features", href: "/features" }, { label: "YAML Engine" }]}
      />

      <div className="ye-root">
        <div className="ye-container">

          {/* ── Before / After comparison ── */}
          <section>
            <div className="ye-section-head">
              <h2 className="ye-section-title">Before and after</h2>
              <p className="ye-section-sub">The same fitness intake agent — one with raw Python, one with TrueNorth.</p>
            </div>
            <div className="ye-compare-grid">

              {/* Before */}
              <div className="ye-code-card bad">
                <div className="ye-card-bar">
                  <span className="ye-card-label">
                    <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/></svg>
                    Without TrueNorth
                  </span>
                  <span className="ye-card-lines">200+ lines</span>
                </div>
                <div className="ye-code-body">
                  <div><span className="ye-bad-key">state</span> <span className="ye-muted">= {"{}"}</span></div>
                  <div><span className="ye-bad-key">conversation_history</span> <span className="ye-muted">= []</span></div>
                  <div><span className="ye-bad-key">current_field_index</span> <span className="ye-muted">= 0</span></div>
                  <div><span className="ye-bad-key">retry_count</span> <span className="ye-muted">= 0</span></div>
                  <div className="ye-dim"># ... 60 more lines of state ...</div>
                  <div>&nbsp;</div>
                  <div><span className="ye-bad-fn">def</span> <span className="ye-bad-key">validate_age</span><span className="ye-muted">(value):</span></div>
                  <div className="ye-muted">    <span className="ye-bad-fn">if not</span> isinstance(value, int):</div>
                  <div className="ye-muted">        raise ValidationError(...)</div>
                  <div className="ye-muted">    <span className="ye-bad-fn">if</span> value &lt; 0 or value &gt; 120:</div>
                  <div className="ye-muted">        raise ValidationError(...)</div>
                  <div className="ye-dim"># ... 40 more validators ...</div>
                  <div>&nbsp;</div>
                  <div><span className="ye-bad-fn">def</span> <span className="ye-bad-key">detect_conflict</span><span className="ye-muted">(prev, curr):</span></div>
                  <div className="ye-dim">    # ... 50 more lines ...</div>
                  <div>&nbsp;</div>
                  <div><span className="ye-bad-fn">def</span> <span className="ye-bad-key">score_confidence</span><span className="ye-muted">(field, val):</span></div>
                  <div className="ye-dim">    # ... 40 more lines ...</div>
                </div>
              </div>

              {/* After */}
              <div className="ye-code-card good">
                <div className="ye-card-bar">
                  <span className="ye-card-label">
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    With TrueNorth
                  </span>
                  <span className="ye-card-lines">15 lines</span>
                </div>
                <div className="ye-code-body">
                  <div><span className="ye-key">id</span><span className="ye-muted">:</span> <span className="ye-val">fitness_plan</span></div>
                  <div><span className="ye-key">persona</span><span className="ye-muted">:</span> <span className="ye-str">"You are Alex, a fitness coach."</span></div>
                  <div>&nbsp;</div>
                  <div><span className="ye-key">fields</span><span className="ye-muted">:</span></div>
                  <div><span className="ye-key">  - name</span><span className="ye-muted">:</span> <span className="ye-val">age</span></div>
                  <div><span className="ye-key">    type</span><span className="ye-muted">:</span> <span className="ye-val">integer</span></div>
                  <div><span className="ye-key">    range</span><span className="ye-muted">:</span> <span className="ye-num">[16, 90]</span></div>
                  <div><span className="ye-key">    required</span><span className="ye-muted">:</span> <span className="ye-bool">true</span></div>
                  <div><span className="ye-key">  - name</span><span className="ye-muted">:</span> <span className="ye-val">goal</span></div>
                  <div><span className="ye-key">    type</span><span className="ye-muted">:</span> <span className="ye-val">enum</span></div>
                  <div><span className="ye-key">    options</span><span className="ye-muted">:</span> <span className="ye-val">[weight_loss, muscle_gain]</span></div>
                  <div>&nbsp;</div>
                  <div className="ye-cm"># Validation ✓  Conflict detection ✓</div>
                  <div className="ye-cm"># Confidence scoring ✓  Firewall ✓  Compliance ✓</div>
                </div>
                <div className="ye-code-tags">
                  {["Validation", "Conflict detection", "Confidence scoring", "Hallucination firewall", "DPDP 2023"].map(t => (
                    <span key={t} className="ye-tag">{t}</span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ── How it works ── */}
          <section>
            <div className="ye-section-head">
              <h2 className="ye-section-title">How it works</h2>
              <p className="ye-section-sub">Three steps from schema to structured output.</p>
            </div>
            <div className="ye-steps">
              {steps.map(s => (
                <div key={s.n} className="ye-step">
                  <span className="ye-step-num">Step {s.n}</span>
                  <div className="ye-step-icon">{s.icon}</div>
                  <div className="ye-step-title">{s.title}</div>
                  <div className="ye-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Field types ── */}
          <section>
            <div className="ye-section-head">
              <h2 className="ye-section-title">Supported field types</h2>
              <p className="ye-section-sub">Every type handles natural language extraction — not just exact string matching.</p>
            </div>
            <div className="ye-table-wrap">
              <table className="ye-table" role="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Extracted from</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldTypes.map(ft => (
                    <tr key={ft.type}>
                      <td className="ye-td-type">{ft.type}</td>
                      <td className="ye-td-desc">{ft.desc}</td>
                      <td className="ye-td-ex">{ft.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="ye-cta">
            <h2 className="ye-cta-title">Try the YAML Engine now</h2>
            <p className="ye-cta-sub">Write a schema in the playground, run it live, and see structured JSON come out of a real conversation.</p>
            <div className="ye-cta-btns">
              <Link href="/playground" className="ye-btn-primary">
                Open Playground
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/docs/quickstart" className="ye-btn-secondary">Read the docs</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}