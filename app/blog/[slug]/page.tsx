// FILE: app/blog/[slug]/page.tsx
import Link from "next/link";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .ba-root *, .ba-root *::before, .ba-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ba-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    color: #C5CDD8;
  }

  /* ── Article header ── */
  .ba-hero {
    padding: clamp(6rem, 12vw, 8rem) clamp(1.5rem, 5vw, 3rem) 0;
    max-width: 800px;
    margin: 0 auto;
  }
  .ba-breadcrumb {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }
  .ba-bc-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #263354;
    text-decoration: none;
    transition: color 0.15s;
  }
  .ba-bc-link:hover { color: #6B7A99; }
  .ba-bc-sep { color: #1C2740; font-size: 0.65rem; }
  .ba-bc-cur {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6B7A99;
  }

  .ba-cat-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 1.25rem;
  }
  .ba-title {
    font-size: clamp(1.9rem, 5vw, 3.25rem);
    font-weight: 900;
    color: #FFFFFF;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 1.5rem;
  }
  .ba-byline {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid #1C2740;
    margin-bottom: 0;
  }
  .ba-author {
    display: flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .ba-author:hover { opacity: 0.8; }
  .ba-author-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(13,255,154,0.1);
    border: 1px solid rgba(13,255,154,0.25);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 700;
    color: #0DFF9A;
    flex-shrink: 0;
  }
  .ba-author-name { font-size: 0.85rem; font-weight: 600; color: #C5CDD8; }
  .ba-sep { color: #1C2740; font-size: 0.8rem; }
  .ba-meta-item {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    color: #263354;
  }

  /* ── Article body ── */
  .ba-body {
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem);
  }

  /* Typography */
  .ba-p {
    font-size: 1rem;
    line-height: 1.8;
    color: #A8B4C8;
    margin-bottom: 1.5rem;
  }
  .ba-h2 {
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    margin: 3rem 0 1rem;
    padding-top: 0.5rem;
    border-top: 1px solid #1C2740;
  }
  .ba-h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #E0E8F0;
    letter-spacing: -0.01em;
    margin: 2rem 0 0.75rem;
  }
  .ba-strong { color: #E0E8F0; font-weight: 700; }
  .ba-ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ba-li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #A8B4C8;
  }
  .ba-li::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #0DFF9A;
    flex-shrink: 0;
    margin-top: 0.58em;
  }

  /* Code block */
  .ba-code-wrap {
    margin: 2rem 0;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #1C2740;
  }
  .ba-code-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 14px;
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
  }
  .ba-code-lang {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #263354;
  }
  .ba-code-pre {
    margin: 0;
    padding: 1.5rem;
    background: #07090F;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    line-height: 1.75;
    color: #C9D1D9;
    overflow-x: auto;
    white-space: pre;
  }
  /* yaml tokens */
  .bky  { color: #0DFF9A; }
  .bval { color: #8BE9FD; }
  .bstr { color: #F1FA8C; }
  .bnum { color: #BD93F9; }
  .bcm  { color: #6272A4; font-style: italic; }
  /* table tokens */
  .btd-hi { color: #0DFF9A; font-weight: 700; }

  /* Table */
  .ba-table-wrap {
    margin: 2rem 0;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #1C2740;
    overflow-x: auto;
  }
  .ba-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.845rem;
    min-width: 480px;
  }
  .ba-table thead tr { background: #0A0D14; border-bottom: 1px solid #1C2740; }
  .ba-table th {
    padding: 10px 14px;
    text-align: left;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #263354;
    white-space: nowrap;
  }
  .ba-table td {
    padding: 10px 14px;
    border-bottom: 1px solid #0E1420;
    color: #A8B4C8;
    line-height: 1.5;
    vertical-align: top;
  }
  .ba-table tbody tr:last-child td { border-bottom: none; }
  .ba-table tbody tr { background: #080B12; transition: background 0.12s; }
  .ba-table tbody tr:hover { background: #0C1018; }

  /* Callout */
  .ba-callout {
    margin: 2rem 0;
    padding: 1.25rem 1.5rem;
    border-radius: 10px;
    border-left: 3px solid #0DFF9A;
    background: rgba(13,255,154,0.04);
    border-top: 1px solid rgba(13,255,154,0.1);
    border-right: 1px solid rgba(13,255,154,0.1);
    border-bottom: 1px solid rgba(13,255,154,0.1);
  }
  .ba-callout p { margin-bottom: 0; color: #A8B4C8; font-size: 0.9rem; line-height: 1.7; }

  /* ── Footer nav ── */
  .ba-foot-divider { height: 1px; background: #1C2740; }
  .ba-foot-nav {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem clamp(1.5rem, 5vw, 3rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .ba-back-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #263354;
    text-decoration: none;
    transition: color 0.15s;
  }
  .ba-back-link:hover { color: #0DFF9A; }
  .ba-gh-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #263354;
    text-decoration: none;
    transition: color 0.15s;
  }
  .ba-gh-link:hover { color: #6B7A99; }

  /* ── Related strip ── */
  .ba-related {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem);
  }
  .ba-related-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #263354;
    margin-bottom: 1rem;
  }
  .ba-related-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 12px;
    overflow: hidden;
  }
  @media (max-width: 560px) {
    .ba-related-grid { grid-template-columns: 1fr; }
  }
  .ba-related-card {
    background: #0C1018;
    padding: 1.25rem 1.5rem;
    text-decoration: none;
    transition: background 0.15s;
  }
  .ba-related-card:hover { background: #0E1520; }
  .ba-rel-cat {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: block;
  }
  .ba-rel-title { font-size: 0.875rem; font-weight: 700; color: #C5CDD8; line-height: 1.35; transition: color 0.15s; }
  .ba-related-card:hover .ba-rel-title { color: #FFFFFF; }
`;

// ─── Article data ─────────────────────────────────────────────────────────────
type Block =
  | { t: "p";     text: string }
  | { t: "h2";    text: string }
  | { t: "h3";    text: string }
  | { t: "ul";    items: string[] }
  | { t: "code";  lang: string; lines: string[] }
  | { t: "table"; headers: string[]; rows: string[][] }
  | { t: "callout"; text: string };

interface Article {
  category: string;
  color: string;
  title: string;
  date: string;
  readTime: string;
  blocks: Block[];
}

const ARTICLES: Record<string, Article> = {
  "why-langchain-is-overkill-for-extraction": {
    category: "Engineering", color: "#4D9EFF",
    title: "Why LangChain Is Overkill for Structured Extraction",
    date: "June 10, 2026", readTime: "8 min read",
    blocks: [
      { t: "p", text: "Most developers reaching for LangChain to extract structured data from conversations are solving the wrong problem with the wrong tool. LangChain is a general-purpose orchestration framework — powerful, but overkill for a 12-field intake form." },
      { t: "h2", text: "The Real Problem" },
      { t: "p", text: "Structured extraction from conversational input has three hard subproblems that most frameworks punt on:" },
      { t: "ul", items: ["Turn-to-turn consistency — contradictions across turns go undetected", "Confidence without verification — 18% hallucination rate on medical forms means 1 in 5 records has fabricated data", "Incomplete sessions — a user drops off with 8 of 12 fields filled, and the data is partial and useless"] },
      { t: "h2", text: "What TrueNorth Does Instead" },
      { t: "code", lang: "yaml", lines: [
        "id: medical_intake",
        "persona: \"You are a caring health assistant...\"",
        "fields:",
        "  - name: patient_name",
        "    type: text",
        "    required: true",
        "  - name: age",
        "    type: integer",
        "    range: [0, 120]",
        "follow_up:",
        "  after_hours: 24",
        "  channel: whatsapp",
      ]},
      { t: "callout", text: "TrueNorth runs all 13 pipeline stages — language detection, PII masking, extraction, conflict detection, validation, confidence scoring, hallucination firewall — on every single turn. Zero Python required." },
      { t: "h2", text: "The Benchmark" },
      { t: "table",
        headers: ["Metric", "Raw GPT-4o", "LangChain + GPT-4o", "TrueNorth"],
        rows: [
          ["Field extraction accuracy", "71%", "~74%", "94%"],
          ["Hallucination rate", "18.3%", "~12%", "2.1%"],
          ["Cost per 1k intakes", "$38.40", "$35.20", "$4.30"],
          ["Implementation time", "4 hours", "6 hours", "15 minutes"],
        ],
      },
      { t: "h2", text: "When Should You Use LangChain?" },
      { t: "p", text: "LangChain is genuinely great for: building RAG pipelines over document corpora, complex multi-agent systems where agents need to reason about tool use, and experimental AI research where you need maximum flexibility. It is not the right tool for structured conversational extraction. For that, declare the outcome. Skip the logic." },
    ],
  },
  "building-offline-first-ai-for-rural-india": {
    category: "Case Study", color: "#0DFF9A",
    title: "Building Offline-First AI for Rural India",
    date: "May 28, 2026", readTime: "6 min read",
    blocks: [
      { t: "p", text: "In Raichur district, Karnataka, 60% of primary health centers experience connectivity outages lasting more than 4 hours per week. A cloud-only AI intake system fails silently during these windows — the ASHA worker gets an error, falls back to paper, and the structured data is lost." },
      { t: "h2", text: "Architecture" },
      { t: "p", text: "The key insight: a conversation engine doesn't need the cloud for the conversation itself. If you're running a local model (Ollama + llama3.1), you don't need the cloud at all." },
      { t: "code", lang: "yaml", lines: [
        "runtime:",
        "  primary: ollama/llama3.1",
        "  fallback: gemini-flash",
        "  offline_mode:",
        "    enabled: true",
        "    storage: sqlite",
        "    sync_on_reconnect: true",
        "    conflict_resolution: last_write_wins",
      ]},
      { t: "h2", text: "What We Learned" },
      { t: "ul", items: ["Language detection must be local — you can't call a cloud API to detect Kannada", "Confidence thresholds must be higher — in offline mode, low-confidence fields are re-asked rather than assumed", "The sync conflict problem is harder than it looks — two ASHA workers interviewing the same patient offline requires careful merge handling"] },
      { t: "h2", text: "Results" },
      { t: "table",
        headers: ["Metric", "Before (paper)", "After (TrueNorth)"],
        rows: [
          ["Intake completion rate", "34%", "79%"],
          ["Data loss events", "Frequent", "Zero"],
          ["Avg. conversation turns", "N/A", "8.9"],
        ],
      },
    ],
  },
  "dpdp-act-2023-for-developers": {
    category: "Compliance", color: "#FFD700",
    title: "The DPDP Act 2023: A Developer's Practical Guide",
    date: "May 14, 2026", readTime: "10 min read",
    blocks: [
      { t: "p", text: "The Digital Personal Data Protection Act, 2023 became enforceable in late 2025. If you're building AI applications that handle personal data of Indian residents, you need to understand what this means in practice. This isn't legal advice — it's a developer's translation." },
      { t: "h2", text: "What Counts as Personal Data" },
      { t: "ul", items: ["Name, age, gender, address — obviously personal", "Health data (symptoms, diagnoses, medications) — personal + sensitive", "Phone numbers, email addresses — personal", "Conversation transcripts — personal (they contain the above)", "Extracted JSON output — personal (derived from the above)"] },
      { t: "h2", text: "Key Requirements" },
      { t: "h3", text: "Consent" },
      { t: "p", text: "You must obtain free, specific, informed, unconditional, and unambiguous consent before processing personal data. For a conversational intake form, the first message must include a consent notice." },
      { t: "code", lang: "yaml", lines: [
        "consent:",
        "  required: true",
        "  message: \"I'll collect your health info per the DPDP Act 2023. Do you consent?\"",
        "  field: consent_given",
        "  type: boolean",
      ]},
      { t: "h3", text: "Data Minimization & Retention" },
      { t: "p", text: "Only collect what you need — TrueNorth enforces this structurally via the YAML schema. The session store supports TTL-based automatic deletion once the purpose is fulfilled." },
      { t: "code", lang: "yaml", lines: [
        "compliance:",
        "  dpdp:",
        "    enabled: true",
        "    purpose: \"Health intake for clinical assessment\"",
        "    retention_days: 90",
        "    auto_delete: true",
        "  pii_masking:",
        "    enabled: true",
        "    fields: [aadhaar, pan, phone]",
        "    action: redact_before_llm",
      ]},
      { t: "callout", text: "PII is masked before it reaches any LLM provider. Aadhaar numbers, PAN cards, and phone numbers are redacted at the TrueNorth layer — they never appear in LLM API calls." },
    ],
  },
  "truenorth-vs-langchain-vs-haystack": {
    category: "Comparison", color: "#FF6B35",
    title: "TrueNorth vs LangChain vs Haystack: A Structured Extraction Showdown",
    date: "May 3, 2026", readTime: "12 min read",
    blocks: [
      { t: "p", text: "We ran 1,000 simulated medical intake conversations through four implementations and measured every dimension that matters in production: accuracy, cost, hallucination rate, and implementation complexity." },
      { t: "h2", text: "Methodology" },
      { t: "p", text: "Each implementation received the same 1,000 conversation transcripts, each containing 12 fields to extract. The reference ground truth was manually annotated by two human reviewers with a Cohen's kappa of 0.94." },
      { t: "h2", text: "Field Extraction Accuracy" },
      { t: "table",
        headers: ["Implementation", "Accuracy", "Notes"],
        rows: [
          ["Raw GPT-4o", "71%", "Misses multi-turn field updates"],
          ["LangChain + GPT-4o", "74%", "Better context, still misses conflicts"],
          ["Haystack + GPT-4o", "73%", "Similar to LangChain"],
          ["TrueNorth", "94%", "Conflict detection + confidence scoring"],
        ],
      },
      { t: "h2", text: "Hallucination Rate" },
      { t: "table",
        headers: ["Implementation", "Rate", "Worst Case"],
        rows: [
          ["Raw GPT-4o", "18.3%", "Fabricated diagnosis in 3 cases"],
          ["LangChain + GPT-4o", "11.2%", "Better, still significant"],
          ["Haystack + GPT-4o", "12.8%", "Similar"],
          ["TrueNorth", "2.1%", "Mostly ambiguous edge cases"],
        ],
      },
      { t: "h2", text: "Cost per 1,000 Intakes" },
      { t: "table",
        headers: ["Implementation", "Cost", "Notes"],
        rows: [
          ["Raw GPT-4o", "$38.40", "No optimization"],
          ["LangChain + GPT-4o", "$35.20", "Marginal savings"],
          ["TrueNorth + GPT-4o", "$4.30", "Smart conversation planning"],
          ["TrueNorth + Ollama", "$2.10", "No cloud LLM costs"],
        ],
      },
      { t: "h2", text: "Implementation Complexity" },
      { t: "table",
        headers: ["Implementation", "Lines of Code"],
        rows: [
          ["Raw GPT-4o", "~180 lines Python"],
          ["LangChain", "~240 lines Python"],
          ["Haystack", "~210 lines Python"],
          ["TrueNorth", "22 lines YAML"],
        ],
      },
    ],
  },
  "reminder-ai-the-missing-primitive": {
    category: "Product", color: "#0DFF9A",
    title: "Reminder AI: The Missing Primitive Every Framework Skipped",
    date: "April 20, 2026", readTime: "7 min read",
    blocks: [
      { t: "p", text: "Every AI framework in 2025 solves the same problem: what happens during a conversation. None solve what happens after it ends." },
      { t: "p", text: "A prospect starts a lead qualification flow, answers 6 of 10 fields, and goes quiet. The session is incomplete. The fields that matter most — budget, timeline, decision authority — are null." },
      { t: "h2", text: "Why Nobody Built This" },
      { t: "p", text: "LangChain, LlamaIndex, Haystack — all model conversations as stateless chains or graphs. A session that ended is gone. Building reminder AI on top requires you to:" },
      { t: "ul", items: ["Build a session persistence layer yourself", "Write a scheduler that queries for incomplete sessions", "Pull the session context and generate a follow-up prompt", "Integrate with your delivery channel (WhatsApp, SMS, email)", "Handle the response and continue the session"] },
      { t: "callout", text: "That's a product in itself. Most teams don't build it. The data stays incomplete." },
      { t: "h2", text: "TrueNorth's Approach" },
      { t: "code", lang: "yaml", lines: [
        "follow_up:",
        "  enabled: true",
        "  check_after_hours: 24",
        "  delivery_channel: whatsapp",
        "  max_attempts: 3",
        "  required_fields: [budget, timeline, decision_maker]",
      ]},
      { t: "h2", text: "The Economics" },
      { t: "p", text: "In a lead qualification study with a B2B SaaS company, reminder AI increased session completion rate from 51% to 87% with three automated follow-ups. That's 36 percentage points of qualified leads recovered automatically, with no human intervention." },
    ],
  },
};

const RELATED: Record<string, string[]> = {
  "why-langchain-is-overkill-for-extraction": ["truenorth-vs-langchain-vs-haystack", "reminder-ai-the-missing-primitive"],
  "building-offline-first-ai-for-rural-india": ["dpdp-act-2023-for-developers", "why-langchain-is-overkill-for-extraction"],
  "dpdp-act-2023-for-developers": ["building-offline-first-ai-for-rural-india", "truenorth-vs-langchain-vs-haystack"],
  "truenorth-vs-langchain-vs-haystack": ["why-langchain-is-overkill-for-extraction", "reminder-ai-the-missing-primitive"],
  "reminder-ai-the-missing-primitive": ["truenorth-vs-langchain-vs-haystack", "building-offline-first-ai-for-rural-india"],
};

// ─── Block renderer ───────────────────────────────────────────────────────────
function RenderBlock({ block }: { block: Block }) {
  if (block.t === "p") return <p className="ba-p">{block.text}</p>;
  if (block.t === "h2") return <h2 className="ba-h2">{block.text}</h2>;
  if (block.t === "h3") return <h3 className="ba-h3">{block.text}</h3>;
  if (block.t === "callout") return <div className="ba-callout"><p>{block.text}</p></div>;
  if (block.t === "ul") return (
    <ul className="ba-ul">
      {block.items.map((item, i) => <li key={i} className="ba-li">{item}</li>)}
    </ul>
  );
  if (block.t === "code") return (
    <div className="ba-code-wrap">
      <div className="ba-code-bar">
        <span className="ba-code-lang">{block.lang}</span>
      </div>
      <pre className="ba-code-pre">
        {block.lines.map((line, i) => {
          const ci = line.indexOf(":");
          if (line.trim().startsWith("#")) return <div key={i}><span className="bcm">{line}</span></div>;
          if (ci > -1) {
            const k = line.slice(0, ci + 1);
            const v = line.slice(ci + 1);
            const vt = v.trim();
            const isStr = vt.startsWith('"') || vt.startsWith("'");
            const isNum = !isStr && !isNaN(Number(vt)) && vt !== "";
            return (
              <div key={i}>
                <span className="bky">{k}</span>
                {isStr ? <span className="bstr">{v}</span> : isNum ? <span className="bnum">{v}</span> : <span className="bval">{v}</span>}
              </div>
            );
          }
          if (line.trim().startsWith("-")) return <div key={i} style={{ color: "#8BE9FD" }}>{line}</div>;
          return <div key={i}>{line}</div>;
        })}
      </pre>
    </div>
  );
  if (block.t === "table") return (
    <div className="ba-table-wrap">
      <table className="ba-table">
        <thead>
          <tr>{block.headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={ci === 0 ? { fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "#C5CDD8" } : {}}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return null;
}

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map(slug => ({ slug }));
}

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];
  const related = (RELATED[params.slug] ?? []).map(s => ({ slug: s, ...ARTICLES[s] })).filter(Boolean);

  if (!article) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#080B12", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.72rem", color: "#263354", textTransform: "uppercase", letterSpacing: "0.1em" }}>404</div>
      <h1 style={{ color: "#FFFFFF", fontSize: "1.5rem", fontWeight: "800" }}>Article not found</h1>
      <Link href="/blog" style={{ color: "#0DFF9A", fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", textDecoration: "none" }}>← Back to blog</Link>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="ba-root">

        {/* Hero */}
        <div className="ba-hero">
          <nav className="ba-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="ba-bc-link">Home</Link>
            <span className="ba-bc-sep">/</span>
            <Link href="/blog" className="ba-bc-link">Blog</Link>
            <span className="ba-bc-sep">/</span>
            <span className="ba-bc-cur">{article.category}</span>
          </nav>

          <span
            className="ba-cat-badge"
            style={{
              color: article.color,
              background: article.color + "12",
              border: `1px solid ${article.color}30`,
            }}
          >
            {article.category}
          </span>

          <h1 className="ba-title">{article.title}</h1>

          <div className="ba-byline">
            <a
              href="https://github.com/amareshhebbar"
              target="_blank"
              rel="noopener noreferrer"
              className="ba-author"
            >
              <div className="ba-author-avatar">A</div>
              <span className="ba-author-name">@amareshhebbar</span>
            </a>
            <span className="ba-sep">·</span>
            <span className="ba-meta-item">{article.date}</span>
            <span className="ba-sep">·</span>
            <span className="ba-meta-item">{article.readTime}</span>
          </div>
        </div>

        {/* Article body */}
        <article className="ba-body">
          {article.blocks.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </article>

        <div className="ba-foot-divider" />

        <div className="ba-foot-nav">
          <Link href="/blog" className="ba-back-link">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            All articles
          </Link>
          <a
            href={`https://github.com/amareshhebbar/TrueNorth/blob/main/blog/${params.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="ba-gh-link"
          >
            Edit on GitHub ↗
          </a>
        </div>

        {related.length > 0 && (
          <div className="ba-related">
            <div className="ba-related-title">Continue reading</div>
            <div className="ba-related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="ba-related-card">
                  <span className="ba-rel-cat" style={{ color: r.color }}>{r.category}</span>
                  <div className="ba-rel-title">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}