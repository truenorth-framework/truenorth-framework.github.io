"use client";

import { useState } from "react";
import CodeBlock from "../CodeBlock";

const stages = [
  { id: "01", name: "Language Detection", color: "#00D4AA", desc: "Identifies the input language using a local 2MB model. Sets the response locale. Runs before any LLM call.", detail: "Uses fasttext language identification on the raw user message. Supports 22+ Indian languages plus all major world languages. The detected language is passed to all downstream stages and used to select the output template locale." },
  { id: "02", name: "Emotion Detection", color: "#00D4AA", desc: "Scores valence and arousal. Tracks emotional shift across turns.", detail: "A lightweight sentiment model classifies each message into valence (positive/negative) and arousal (calm/excited) dimensions. The session maintains an emotion history so the agent can adapt its tone when a user becomes frustrated or distressed." },
  { id: "03", name: "PII Detection", color: "#FF6B35", desc: "Masks Aadhaar, PAN, phone, account numbers before the LLM sees them.", detail: "Regex + NER-based detection runs on every message. Detected PII is replaced with typed placeholders (e.g., [AADHAAR_REDACTED]) before the message is sent to the LLM. The original values are stored separately in the encrypted session store." },
  { id: "04", name: "Conversation Planning", color: "#00D4AA", desc: "Decides the next question to ask. Skips already-answered fields.", detail: "Reviews the current session state (which fields are filled, which are null) and generates the optimal next question. Uses the YAML field order as a guide but can reorder based on conversation flow. Avoids re-asking questions the user has already answered." },
  { id: "05", name: "Field Extraction", color: "#00D4AA", desc: "Pulls values from natural language using structured prompting.", detail: "The core extraction stage. Uses a structured prompt to extract all target fields simultaneously from the user's message. Handles multi-turn context — if a user said their name in turn 2, it's available in turn 7. Returns a partial JSON object with only the fields mentioned in this turn." },
  { id: "06", name: "Conflict Detection", color: "#FFD700", desc: "Catches contradictions between current and previous turns.", detail: "Compares newly extracted values against existing session values. If a contradiction is found (e.g., age implied as 25 now vs. stated as 30 in turn 2), the stage flags the conflict and generates a clarifying question rather than silently overwriting." },
  { id: "07", name: "Field Validation", color: "#00D4AA", desc: "Type, range, and enum checks against the YAML schema.", detail: "Validates extracted values against the field schema: type checking (integer, text, date, boolean), range validation for numerics, enum validation for choice fields. Returns validation errors that are fed back into the conversation planning stage." },
  { id: "08", name: "Confidence Scoring", color: "#79C0FF", desc: "8-factor per-field confidence rating. Triggers re-ask for low scores.", detail: "Each extracted field receives a confidence score based on 8 factors: directness of statement, presence of qualifiers, linguistic hedging, cross-turn consistency, extraction clarity, context support, NLP confidence, and LLM self-reported certainty. Fields below a threshold are queued for re-asking." },
  { id: "09", name: "Hallucination Firewall", color: "#FF6B35", desc: "3-stage claim extract → verify → sanitize. ~2% error rate.", detail: "The safety-critical stage. (1) ClaimExtractor pulls factual claims from the LLM's proposed output. (2) ClaimVerifier checks each claim against the conversation history — if a claim cannot be grounded in something the user actually said, it is marked unverified. (3) OutputSanitiser removes or replaces all unverified claims before the output reaches the user." },
  { id: "10", name: "Output Generation", color: "#00D4AA", desc: "Renders structured JSON, markdown, or text from the YAML template.", detail: "Renders the final agent response using the YAML output_template, substituting extracted field values. Supports JSON (for API consumption), markdown (for rich messaging), and plain text (for SMS/WhatsApp). The output is localized to the detected language." },
  { id: "11", name: "Source Tracing", color: "#8B95A3", desc: "Sentence → field → turn attribution for every extracted value.", detail: "Maintains a provenance record for every extracted field: which turn contained the source statement, which sentence within that turn, and what the LLM's extraction reasoning was. Used for audit logs, compliance, and debugging extraction failures." },
  { id: "12", name: "Cost Recording", color: "#8B95A3", desc: "USD cost per call, session, and turn. Tracks by model and operation.", detail: "Records the token cost of every LLM API call in the pipeline: extraction, verification, output generation, and planning calls are tracked separately. Costs are aggregated at the session level and can be queried via the SDK. Supports multiple currency display." },
  { id: "13", name: "MCP Tool Execution", color: "#00D4AA", desc: "Calculator, web search, custom tools via Model Context Protocol.", detail: "Executes MCP tools requested by the LLM during extraction or output generation. Built-in tools: calculator, web search, datetime. Custom tools can be registered via the YAML tools block or programmatically via the SDK." },
];

export default function ArchitecturePage() {
  const [selected, setSelected] = useState<typeof stages[0] | null>(null);

  return (
    <div className="prose-container max-w-none">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#4A5568] mb-6 flex items-center gap-2">
        <a href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</a>
        <span>/</span>
        <span className="text-[#8B95A3]">Architecture</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Architecture</h1>
      <p className="text-[#8B95A3] text-lg mb-8 leading-relaxed">
        TrueNorth's engine runs every user message through a 13-stage pipeline. Each stage is isolated, testable, and observable. Click any stage to see the full specification.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Pipeline */}
        <div className="relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-[#1E2329]" />
          <div className="space-y-2">
            {stages.map((stage, idx) => (
              <button
                key={stage.id}
                onClick={() => setSelected(stage.id === selected?.id ? null : stage)}
                className={`relative w-full text-left flex items-center gap-4 p-3 rounded-lg border transition-all duration-200 ${
                  selected?.id === stage.id
                    ? "border-[#00D4AA]/40 bg-[#00D4AA]/5"
                    : "border-transparent hover:border-[#1E2329] hover:bg-[#111318]"
                }`}
              >
                {/* Node */}
                <div
                  className="relative z-10 w-[14px] h-[14px] rounded-full border-2 flex-shrink-0"
                  style={{
                    borderColor: stage.color,
                    backgroundColor: selected?.id === stage.id ? stage.color : "#0A0B0D",
                  }}
                />
                <span className="font-mono text-xs text-[#4A5568] flex-shrink-0 w-6">{stage.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-[#F0F2F5]">{stage.name}</div>
                  <div className="text-xs text-[#4A5568] truncate">{stage.desc}</div>
                </div>
                {stage.id === "09" && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 flex-shrink-0 font-mono">
                    CRITICAL
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="sticky top-24 self-start">
          {selected ? (
            <div
              className="p-6 rounded-xl border bg-[#111318]"
              style={{ borderColor: `${selected.color}40` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold"
                  style={{ borderColor: selected.color, color: selected.color }}
                >
                  {selected.id}
                </div>
                <h2 className="text-xl font-bold text-[#F0F2F5]">{selected.name}</h2>
              </div>
              <p className="text-[#8B95A3] leading-relaxed mb-4">{selected.detail}</p>
              <div
                className="text-xs px-3 py-2 rounded border font-mono"
                style={{ borderColor: `${selected.color}30`, color: selected.color, background: `${selected.color}08` }}
              >
                Stage {selected.id} / 13
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] text-center">
              <div className="text-4xl mb-3">←</div>
              <p className="text-[#8B95A3] text-sm">Click any stage to see the full specification</p>
            </div>
          )}
        </div>
      </div>

      {/* Data flow */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">Data Flow</h2>
      <p className="text-[#8B95A3] mb-6 leading-relaxed">
        Every user message enters the pipeline as a raw string and exits as a structured session update. The pipeline is synchronous within a turn — all 13 stages complete before the response is sent.
      </p>

      <CodeBlock
        lang="yaml"
        filename="pipeline-flow.yaml"
        code={`# Simplified data flow through one turn
input:
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
      unextracted: [goal, height, weight, ...]

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
  age: { value: 28, confidence: 0.97, source_turn: 3 }`}
      />
    </div>
  );
}
