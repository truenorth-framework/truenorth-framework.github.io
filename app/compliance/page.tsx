// FILE: app/compliance/page.tsx
import PageHeader from "../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compliance — TrueNorth",
  description: "DPDP Act 2023, GDPR, PII detection, and local Ollama deployment for zero data leakage.",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .cp-root *, .cp-root *::before, .cp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .cp-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .cp-container { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: clamp(3.5rem, 7vw, 5rem); }
  .cp-section-title { font-size: clamp(1.4rem, 2.8vw, 2rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin-bottom: 0.6rem; }
  .cp-section-sub { font-size: 0.95rem; color: #6B7A99; line-height: 1.65; max-width: 520px; margin-bottom: 2rem; }

  /* ── Stats ── */
  .cp-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1.5px; background: #1C2740;
    border: 1px solid #1C2740; border-radius: 14px; overflow: hidden;
  }
  @media (max-width: 640px) { .cp-stats { grid-template-columns: repeat(2, 1fr); } }
  .cp-stat {
    background: #0C1018; padding: 1.75rem 1rem;
    display: flex; flex-direction: column; align-items: center; gap: 5px; text-align: center;
  }
  .cp-stat-val { font-family: 'JetBrains Mono', monospace; font-size: clamp(1.75rem, 3.5vw, 2.5rem); font-weight: 700; color: #0DFF9A; line-height: 1; letter-spacing: -0.02em; }
  .cp-stat-lbl { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7A99; text-align: center; }

  /* ── Compliance regulation cards ── */
  .cp-reg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  @media (max-width: 720px) { .cp-reg-grid { grid-template-columns: 1fr; } }
  .cp-reg-card { border-radius: 14px; overflow: hidden; border: 1px solid #1C2740; display: flex; flex-direction: column; }
  .cp-reg-head { padding: 1.75rem; border-bottom: 1px solid #1C2740; background: #0C1018; flex: 1; }
  .cp-reg-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; }
  .cp-reg-flag {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem; flex-shrink: 0;
    border: 1px solid;
  }
  .cp-reg-name { font-size: 1rem; font-weight: 800; color: #FFFFFF; margin-bottom: 2px; }
  .cp-reg-sub  { font-size: 0.72rem; color: #6B7A99; }
  .cp-reg-features { display: flex; flex-direction: column; gap: 8px; }
  .cp-reg-feat {
    display: flex; align-items: flex-start; gap: 9px;
    font-size: 0.845rem; color: #A8B4C8; line-height: 1.55;
  }
  .cp-reg-check { flex-shrink: 0; margin-top: 1px; font-size: 0.75rem; font-weight: 700; }
  .cp-reg-code { background: #07090F; padding: 1.25rem 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.755rem; line-height: 1.72; overflow-x: auto; }

  /* ── Local Ollama / PII cards ── */
  .cp-info-card { background: #0C1018; border: 1px solid #1C2740; border-radius: 14px; overflow: hidden; }
  .cp-info-body { display: flex; align-items: flex-start; gap: 1.5rem; padding: 2rem; }
  @media (max-width: 640px) { .cp-info-body { flex-direction: column; } }
  .cp-info-icon {
    width: 48px; height: 48px; flex-shrink: 0; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(13,255,154,0.08); border: 1px solid rgba(13,255,154,0.2); color: #0DFF9A;
  }
  .cp-info-title { font-size: 1.05rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.5rem; }
  .cp-info-desc { font-size: 0.875rem; color: #6B7A99; line-height: 1.7; margin-bottom: 1.25rem; }
  .cp-code-block { background: #07090F; border-top: 1px solid #1C2740; padding: 1.25rem 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.755rem; line-height: 1.72; overflow-x: auto; white-space: pre; }

  /* ── PII grid ── */
  .cp-pii-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 0 2rem 1.75rem; }
  @media (max-width: 640px) { .cp-pii-grid { grid-template-columns: repeat(2, 1fr); } }
  .cp-pii-item { display: flex; align-items: center; gap: 8px; font-size: 0.845rem; color: #A8B4C8; }
  .cp-pii-check { color: #0DFF9A; font-size: 0.75rem; font-weight: 700; flex-shrink: 0; }

  /* ── Enterprise CTA ── */
  .cp-ent {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 1rem;
    padding: clamp(2.5rem, 5vw, 4rem) 2rem;
    background: rgba(13,255,154,0.03);
    border: 1px solid rgba(13,255,154,0.15);
    border-radius: 16px;
  }
  .cp-ent-title { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .cp-ent-sub { font-size: 0.95rem; color: #6B7A99; line-height: 1.65; max-width: 480px; }
  .cp-ent-btns { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 0.5rem; }
  .cp-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; background: #0DFF9A; color: #000;
    border-radius: 9px; border: none; font-family: 'Inter', sans-serif;
    font-size: 0.875rem; font-weight: 800; text-decoration: none;
    transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .cp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 24px rgba(13,255,154,0.25); }
  .cp-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 22px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .cp-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }

  /* syntax */
  .c-ky  { color: #0DFF9A; }
  .c-val { color: #8BE9FD; }
  .c-str { color: #F1FA8C; }
  .c-num { color: #BD93F9; }
  .c-cm  { color: #6272A4; font-style: italic; }
`;

type YamlLine = [string, string, string?, string?];

function YamlBlock({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => {
        if (line.trim().startsWith("#")) return <div key={i}><span className="c-cm">{line}</span></div>;
        const ci = line.indexOf(":");
        if (ci > -1) {
          const k = line.slice(0, ci + 1);
          const v = line.slice(ci + 1);
          const vt = v.trim();
          const isStr = vt.startsWith('"') || vt.startsWith("'");
          const isNum = !isStr && !isNaN(Number(vt)) && vt !== "";
          return <div key={i}><span className="c-ky">{k}</span>{isStr ? <span className="c-str">{v}</span> : isNum ? <span className="c-num">{v}</span> : <span className="c-val">{v}</span>}</div>;
        }
        return <div key={i}>{line}</div>;
      })}
    </>
  );
}

const DPDP_YAML = [
  "compliance:",
  "  dpdp_act: true",
  "  consent:",
  "    required: true",
  "    proof_storage: encrypted_db",
  `  purpose: "Healthcare delivery"`,
  "  retention_days: 90",
  "  data_principal_rights: enabled",
];

const GDPR_YAML = [
  "compliance:",
  "  gdpr: true",
  "  legal_basis: legitimate_interest",
  "  data_subject_rights: enabled",
  "  data_minimisation: strict",
  "  transfer_controls:",
  "    eu_only: false",
  "    adequacy_decision: required",
];

const OLLAMA_YAML = [
  "# Install Ollama locally",
  "# ollama pull llama3.1",
  "",
  "engine:",
  "  provider: ollama",
  "  model: llama3.1",
  "  base_url: http://localhost:11434",
  "  # Zero data leaves this machine",
];

const ARROW = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function CompliancePage() {
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Compliance"
        title="Enterprise-ready from day one."
        subtitle="Zero-data-leakage. DPDP Act 2023. GDPR. Built for regulated industries — healthcare, finance, HR."
        breadcrumbs={[{ label: "Compliance" }]}
        accentColor="#0DFF9A"
      />
      <div className="cp-root">
        <div className="cp-container">

          {/* Stats */}
          <div className="cp-stats">
            {[
              { v: "2yr",  l: "Head start on DPDP vs Western frameworks" },
              { v: "100%", l: "PII masked before LLM sees data" },
              { v: "0",    l: "Cloud data with local Ollama mode" },
              { v: "1",    l: "Config block for full compliance" },
            ].map(s => (
              <div key={s.l} className="cp-stat">
                <div className="cp-stat-val">{s.v}</div>
                <div className="cp-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>

          {/* DPDP + GDPR */}
          <section>
            <h2 className="cp-section-title">Regulations supported</h2>
            <p className="cp-section-sub">Both configured via a single YAML block. No third-party compliance library required.</p>
            <div className="cp-reg-grid">
              {[
                {
                  flag: "🇮🇳", flagBg: "rgba(255,107,53,0.08)", flagBdr: "rgba(255,107,53,0.2)", check: "#FF6B35",
                  name: "DPDP Act 2023", sub: "India's Digital Personal Data Protection Act",
                  features: ["Consent management with digital proof", "Data Principal rights (access, correction, erasure, nomination)", "Purpose limitation enforcement", "Retention period configuration", "Data Fiduciary obligations", "Breach notification hooks"],
                  yaml: DPDP_YAML,
                },
                {
                  flag: "🇪🇺", flagBg: "rgba(49,120,198,0.1)", flagBdr: "rgba(49,120,198,0.25)", check: "#4D9EFF",
                  name: "GDPR", sub: "EU General Data Protection Regulation",
                  features: ["6 legal bases for processing", "7 data subject rights", "Data minimisation by default", "Purpose binding", "Cross-border transfer controls", "DPA notification support"],
                  yaml: GDPR_YAML,
                },
              ].map(b => (
                <div key={b.name} className="cp-reg-card">
                  <div className="cp-reg-head">
                    <div className="cp-reg-title-row">
                      <div className="cp-reg-flag" style={{ background: b.flagBg, borderColor: b.flagBdr }}>{b.flag}</div>
                      <div>
                        <div className="cp-reg-name">{b.name}</div>
                        <div className="cp-reg-sub">{b.sub}</div>
                      </div>
                    </div>
                    <div className="cp-reg-features">
                      {b.features.map(f => (
                        <div key={f} className="cp-reg-feat">
                          <span className="cp-reg-check" style={{ color: b.check }}>✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="cp-reg-code">
                    <YamlBlock lines={b.yaml} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Local Ollama */}
          <section>
            <h2 className="cp-section-title">Local Ollama — zero data leakage</h2>
            <p className="cp-section-sub">For healthcare and financial applications where no data can leave your infrastructure.</p>
            <div className="cp-info-card">
              <div className="cp-info-body">
                <div className="cp-info-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <div>
                  <div className="cp-info-title">Run entirely on your own infrastructure</div>
                  <div className="cp-info-desc">
                    TrueNorth supports Ollama as a first-class LLM provider. Run llama3.1, mistral, or any Ollama-compatible model locally — the full 13-stage pipeline works identically, with zero cloud API calls.
                  </div>
                </div>
              </div>
              <div className="cp-code-block"><YamlBlock lines={OLLAMA_YAML} /></div>
            </div>
          </section>

          {/* PII detection */}
          <section>
            <h2 className="cp-section-title">PII detection & masking</h2>
            <p className="cp-section-sub">Runs before any data reaches the LLM. Intercepts and masks automatically.</p>
            <div className="cp-info-card">
              <div className="cp-info-body" style={{ paddingBottom: "1.25rem" }}>
                <div className="cp-info-icon" style={{ background: "rgba(255,215,0,0.08)", borderColor: "rgba(255,215,0,0.2)", color: "#FFD700" }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <div className="cp-info-title">Intercept before the LLM sees it</div>
                  <div className="cp-info-desc" style={{ marginBottom: 0 }}>
                    The PII interceptor runs as stage 2 of the pipeline — before any prompt is constructed. Sensitive identifiers never appear in LLM API calls, even when using cloud providers.
                  </div>
                </div>
              </div>
              <div className="cp-pii-grid">
                {["Aadhaar numbers", "PAN card numbers", "Phone numbers", "Email addresses", "Full names", "Account numbers", "Passport numbers", "Custom regex patterns", "Credit card numbers"].map(p => (
                  <div key={p} className="cp-pii-item">
                    <span className="cp-pii-check">✓</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Enterprise CTA */}
          <div className="cp-ent">
            <h2 className="cp-ent-title">Enterprise deployment</h2>
            <p className="cp-ent-sub">Compliance audit reports, custom PII pattern libraries, dedicated deployment support, and DPDP consulting for regulated industries.</p>
            <div className="cp-ent-btns">
              <a href="mailto:founders@truenorth.ai?subject=Enterprise" className="cp-btn-primary">
                Contact for Enterprise {ARROW}
              </a>
              <Link href="/docs/compliance" className="cp-btn-secondary">Read the docs</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}