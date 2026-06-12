"use client";
import { useState } from "react";

import Link from "next/link";
import CodeBlock from "../CodeBlock";
import DocStyles, { DOCS_CSS } from "../docs.css";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="doc-breadcrumb" aria-label="Breadcrumb">
      <Link href="/" className="doc-bc-link">Home</Link>
      {items.map((item, i) => (
        <span key={i} style={{ display: "contents" }}>
          <span className="doc-bc-sep">/</span>
          {item.href
            ? <Link href={item.href} className="doc-bc-link">{item.label}</Link>
            : <span className="doc-bc-cur" aria-current="page">{item.label}</span>
          }
        </span>
      ))}
    </nav>
  );
}

export function Callout({ type = "info", title, children }: { type?: "info" | "warn" | "danger"; title: string; children: React.ReactNode }) {
  const icons = {
    info:   <svg width="15" height="15" fill="none" stroke="#0DFF9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    warn:   <svg width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    danger: <svg width="15" height="15" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  };
  return (
    <div className={`doc-callout ${type}`}>
      <span className="doc-callout-icon">{icons[type]}</span>
      <div className="doc-callout-body">
        <div className="doc-callout-title">{title}</div>
        <div className="doc-callout-text">{children}</div>
      </div>
    </div>
  );
}

export function EditLink({ slug }: { slug: string }) {
  return (
    <a
      href={`https://github.com/amareshhebbar/TrueNorth/blob/main/docs/${slug}.md`}
      target="_blank" rel="noopener noreferrer"
      className="doc-edit-link"
    >
      Edit this page on GitHub ↗
    </a>
  );
}

export const ARROW = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);




const ARCH_CSS = `
  .arc-pipeline { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
  @media (max-width: 720px) { .arc-pipeline { grid-template-columns: 1fr; } }

  .arc-list { position: relative; }
  .arc-spine {
    position: absolute; left: 13px; top: 4px; bottom: 4px;
    width: 1px; background: #1C2740;
  }

  .arc-stage-btn {
    position: relative; width: 100%;
    display: flex; align-items: center; gap: 12px;
    padding: 9px 12px; margin-bottom: 2px;
    background: transparent; border: 1px solid transparent;
    border-radius: 9px; cursor: pointer; text-align: left;
    transition: background 0.15s, border-color 0.15s;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .arc-stage-btn:hover { background: #0C1018; border-color: #1C2740; }
  .arc-stage-btn.active { background: rgba(13,255,154,0.05); border-color: rgba(13,255,154,0.25); }

  .arc-node {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid; flex-shrink: 0; z-index: 1;
    background: #080B12;
    transition: background 0.15s;
  }
  .arc-stage-btn.active .arc-node { background: currentColor; }

  .arc-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; color: #263354;
    width: 20px; flex-shrink: 0;
  }
  .arc-stage-info { flex: 1; min-width: 0; }
  .arc-stage-name { font-size: 0.82rem; font-weight: 700; color: #C5CDD8; margin-bottom: 1px; }
  .arc-stage-desc { font-size: 0.72rem; color: #6B7A99; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .arc-crit {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.56rem; font-weight: 700; padding: 2px 6px;
    border-radius: 4px; letter-spacing: 0.06em;
    background: rgba(255,107,53,0.1); color: #FF6B35;
    border: 1px solid rgba(255,107,53,0.2); flex-shrink: 0;
  }

  .arc-detail {
    position: sticky; top: 88px;
    background: #0C1018; border: 1px solid; border-radius: 12px;
    padding: 1.75rem; min-height: 240px;
    display: flex; flex-direction: column;
  }
  .arc-detail-head { display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem; }
  .arc-detail-badge {
    width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700;
    border: 2px solid; flex-shrink: 0;
  }
  .arc-detail-name { font-size: 1.05rem; font-weight: 800; color: #FFFFFF; }
  .arc-detail-text { font-size: 0.875rem; color: #A8B4C8; line-height: 1.72; flex: 1; }
  .arc-detail-tag {
    margin-top: 1.25rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; padding: 4px 10px;
    border-radius: 6px; letter-spacing: 0.06em; width: fit-content;
  }

  .arc-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: 0.75rem; height: 100%; color: #263354;
    font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
  }
`;

const STAGES = [
  { id:"01", name:"Language Detection",    color:"#0DFF9A", crit:false, desc:"Local 2MB model. 22+ languages. Runs before any LLM call.",         detail:"Uses fasttext language identification on the raw user message. Supports 22+ Indian languages plus all major world languages. The detected language is passed to all downstream stages and used to select the output template locale." },
  { id:"02", name:"Emotion Detection",     color:"#0DFF9A", crit:false, desc:"Valence + arousal scores. Tracks shift across turns.",               detail:"A lightweight sentiment model classifies each message into valence (positive/negative) and arousal (calm/excited) dimensions. The session maintains an emotion history so the agent can adapt its tone when a user becomes frustrated or distressed." },
  { id:"03", name:"PII Detection",         color:"#FF6B35", crit:false, desc:"Masks Aadhaar, PAN, phone, account numbers before the LLM.",        detail:"Regex + NER-based detection runs on every message. Detected PII is replaced with typed placeholders before the message reaches any LLM API call. Original values are stored separately in the encrypted session store." },
  { id:"04", name:"Conversation Planning", color:"#0DFF9A", crit:false, desc:"Decides the next question. Skips already-answered fields.",         detail:"Reviews the current session state (which fields are filled, which are null) and generates the optimal next question. Uses the YAML field order as a guide but can reorder based on conversation flow. Avoids re-asking questions already answered." },
  { id:"05", name:"Field Extraction",      color:"#0DFF9A", crit:false, desc:"Pulls values from natural language via structured prompting.",       detail:"The core extraction stage. Uses a structured prompt to extract all target fields simultaneously from the user's message. Handles multi-turn context — if a user said their name in turn 2, it's available in turn 7. Returns a partial JSON object." },
  { id:"06", name:"Conflict Detection",    color:"#FFD700", crit:false, desc:"Catches contradictions between current and previous turns.",        detail:"Compares newly extracted values against existing session values. If a contradiction is found (age implied as 25 now vs. stated as 30 in turn 2), the stage flags it and generates a clarifying question rather than silently overwriting." },
  { id:"07", name:"Field Validation",      color:"#0DFF9A", crit:false, desc:"Type, range, and enum checks against the YAML schema.",             detail:"Validates extracted values: type checking (integer, text, date, boolean), range validation for numerics, enum validation for choice fields. Validation errors are fed back into conversation planning so the agent asks again." },
  { id:"08", name:"Confidence Scoring",    color:"#4D9EFF", crit:false, desc:"8-factor per-field score. Triggers re-ask for low confidence.",     detail:"Each extracted field receives a confidence score based on 8 factors: directness, qualifiers, linguistic hedging, cross-turn consistency, extraction clarity, context support, NLP confidence, and LLM self-certainty. Low-scoring fields are re-asked." },
  { id:"09", name:"Hallucination Firewall",color:"#FF6B35", crit:true,  desc:"3-stage claim extract → verify → sanitize. ~2.1% error rate.",     detail:"(1) ClaimExtractor pulls factual claims from the LLM's proposed output. (2) ClaimVerifier checks each claim against the conversation history. (3) OutputSanitizer removes or replaces all claims that cannot be grounded in what the user actually said." },
  { id:"10", name:"Output Generation",     color:"#0DFF9A", crit:false, desc:"Renders JSON, markdown, or text from the YAML output_template.",   detail:"Renders the final agent response using the YAML output_template, substituting extracted field values. Supports JSON (API consumption), markdown (rich messaging), and plain text (SMS/WhatsApp). Output is localized to the detected language." },
  { id:"11", name:"Source Tracing",        color:"#8B9AB5", crit:false, desc:"Sentence → field → turn attribution for every extracted value.",   detail:"Maintains a provenance record for every extracted field: which turn, which sentence, and what the LLM's extraction reasoning was. Used for audit logs, compliance, and debugging extraction failures." },
  { id:"12", name:"Cost Recording",        color:"#8B9AB5", crit:false, desc:"USD cost per call, session, and turn. Tracks by model.",            detail:"Records the token cost of every LLM API call in the pipeline. Extraction, verification, output generation, and planning calls are tracked separately. Costs are aggregated at session level and queryable via SDK." },
  { id:"13", name:"MCP Tool Execution",    color:"#0DFF9A", crit:false, desc:"Calculator, web search, custom tools via MCP.",                     detail:"Executes MCP tools requested by the LLM during extraction or output generation. Built-in tools: calculator, web search, datetime. Custom tools can be registered via the YAML tools block or programmatically via SDK." },
];

export default function ArchitecturePage() {
  const [selected, setSelected] = useState<typeof STAGES[0] | null>(null);

  return (
    <>
      <style>{DOCS_CSS}</style>
      <style>{ARCH_CSS}</style>
      <article className="doc-article">
        <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Architecture" }]} />

        <h1 className="doc-h1">Architecture</h1>
        <p className="doc-lead">
          TrueNorth's engine runs every user message through a 13-stage pipeline. Each stage is isolated, testable, and observable. Click any stage to see the full specification.
        </p>

        <div className="arc-pipeline">
          {/* Stage list */}
          <div className="arc-list">
            <div className="arc-spine" aria-hidden="true" />
            {STAGES.map(stage => (
              <button
                key={stage.id}
                type="button"
                className={`arc-stage-btn${selected?.id === stage.id ? " active" : ""}`}
                onClick={() => setSelected(selected?.id === stage.id ? null : stage)}
                aria-pressed={selected?.id === stage.id}
              >
                <div
                  className="arc-node"
                  style={{ borderColor: stage.color, color: stage.color }}
                />
                <span className="arc-num">{stage.id}</span>
                <div className="arc-stage-info">
                  <div className="arc-stage-name">{stage.name}</div>
                  <div className="arc-stage-desc">{stage.desc}</div>
                </div>
                {stage.crit && <span className="arc-crit">CRITICAL</span>}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className="arc-detail"
            style={{ borderColor: selected ? selected.color + "33" : "#1C2740" }}
          >
            {selected ? (
              <>
                <div className="arc-detail-head">
                  <div
                    className="arc-detail-badge"
                    style={{ borderColor: selected.color, color: selected.color }}
                  >
                    {selected.id}
                  </div>
                  <div className="arc-detail-name">{selected.name}</div>
                </div>
                <p className="arc-detail-text">{selected.detail}</p>
                <div
                  className="arc-detail-tag"
                  style={{
                    background: selected.color + "0D",
                    border: `1px solid ${selected.color}30`,
                    color: selected.color,
                  }}
                >
                  Stage {selected.id} / 13
                </div>
              </>
            ) : (
              <div className="arc-empty">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Click any stage to see the full specification
              </div>
            )}
          </div>
        </div>

        <h2 className="doc-h2">Data flow through one turn</h2>
        <p className="doc-p">Every user message enters the pipeline as a raw string and exits as a structured session update. All 13 stages complete before the response is sent.</p>

        <CodeBlock
          lang="yaml"
          filename="pipeline-flow.yaml"
          code={`input:
  message: "I'm Priya, I'm 28 years old"
  session_id: "sess_abc123"
  turn: 3

pipeline:
  - stage: language_detection
    output: { locale: "en", confidence: 0.99 }

  - stage: emotion_detection
    output: { valence: 0.6, arousal: 0.3 }

  - stage: pii_detection
    output: { masked: false, pii_found: [] }

  - stage: field_extraction
    output:
      extracted:
        name: "Priya"
        age: 28
      unextracted: [goal, height, weight]

  - stage: hallucination_firewall
    output:
      claims_verified: ["user stated name=Priya in turn 3"]
      claims_blocked: []

  - stage: output_generation
    output:
      message: "Thanks Priya! What's your primary fitness goal?"
      fields_remaining: 6

session_update:
  name: { value: "Priya", confidence: 0.98, source_turn: 3 }
  age:  { value: 28,      confidence: 0.97, source_turn: 3 }`}
        />

        <div className="doc-page-nav">
          <Link href="/docs/quickstart" className="doc-page-nav-link">
            <span className="doc-page-nav-dir">← Previous</span>
            <span className="doc-page-nav-label">Quickstart</span>
          </Link>
          <Link href="/docs/yaml/schema" className="doc-page-nav-link next">
            <span className="doc-page-nav-dir">Next →</span>
            <span className="doc-page-nav-label">Schema Syntax</span>
          </Link>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <EditLink slug="architecture" />
        </div>
      </article>
    </>
  );
}
