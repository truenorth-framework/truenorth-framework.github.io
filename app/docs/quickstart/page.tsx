"use client"
import Link from "next/link";
import { Breadcrumb, Callout, EditLink } from "../architecture/page";
import CodeBlock from "../CodeBlock";
import { DOCS_CSS } from "../docs.css";
export default function QuickstartPage() {
  const STEPS = [
    {
      n: "1",
      title: "Install TrueNorth",
      content: (
        <>
          <p className="doc-p">Install via pip (Python 3.9+):</p>
          <CodeBlock lang="bash" code={`pip install truenorth-framework`} />
          <p className="doc-p">Or Node.js:</p>
          <CodeBlock lang="bash" code={`npm install truenorth`} />
          <p className="doc-p">Or Go:</p>
          <CodeBlock lang="bash" code={`go get github.com/amareshhebbar/truenorth/sdk`} />
        </>
      ),
    },
    {
      n: "2",
      title: "Set your API key",
      content: (
        <>
          <p className="doc-p">TrueNorth works with any OpenAI-compatible provider:</p>
          <CodeBlock lang="bash" code={`# OpenAI
export OPENAI_API_KEY=sk-...
# Anthropic
export ANTHROPIC_API_KEY=sk-ant-...
# Local via Ollama — no key needed`} />
        </>
      ),
    },
    {
      n: "3",
      title: "Create your schema",
      content: (
        <>
          <p className="doc-p">
            Create <code className="doc-code">my_agent.yaml</code>:
          </p>
          <CodeBlock
            lang="yaml"
            filename="my_agent.yaml"
            code={`id: my_first_agent
persona: "You are a helpful assistant named Alex."

fields:
  - name: user_name
    type: text
    required: true
    question: "What's your name?"

  - name: email
    type: email
    question: "What's your email address?"

  - name: inquiry
    type: text
    question: "How can I help you today?"

output_template: inquiry_v1`}
          />
        </>
      ),
    },
    {
      n: "4",
      title: "Run the engine",
      content: (
        <>
          <CodeBlock
            lang="python"
            filename="main.py"
            code={`from truenorth import Engine, Schema

schema = Schema.load("my_agent.yaml")
engine = Engine(schema=schema)

session = engine.create_session(user_id="user_123")

while not session.is_complete:
    user_input = input(f"Agent: {session.last_message}\\nYou: ")
    session = engine.chat(session.id, user_input)

print(session.output.json())`}
          />
          <p className="doc-p">Expected output:</p>
          <CodeBlock
            lang="json"
            code={`{
  "user_name": "Priya",
  "email": "priya@example.com",
  "inquiry": "I need help with my subscription",
  "_meta": {
    "turns": 3,
    "cost_usd": 0.0008,
    "confidence": 0.94
  }
}`}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <style>{DOCS_CSS}</style>
      <article className="doc-article">
        <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Quickstart" }]} />

        <h1 className="doc-h1">Quickstart</h1>
        <p className="doc-lead">From zero to a working AI conversation agent in under 5 minutes.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "1.5rem", position: "relative" }}
            >
              {/* Spine + node */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  border: "2px solid #0DFF9A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem", fontWeight: 700, color: "#0DFF9A",
                  background: "#080B12", zIndex: 1, flexShrink: 0,
                }}>
                  {step.n}
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: "#1C2740", margin: "4px 0" }} />
                )}
              </div>
              {/* Content */}
              <div style={{ flex: 1, paddingBottom: i < STEPS.length - 1 ? "2rem" : 0, minWidth: 0 }}>
                <h2 className="doc-h3" style={{ marginTop: "5px", marginBottom: "1rem" }}>{step.title}</h2>
                {step.content}
              </div>
            </div>
          ))}
        </div>

        <Callout type="info" title="Next steps">
          Try the <Link href="/playground" className="doc-a">Playground</Link> for a live browser demo, or read about the{" "}
          <Link href="/docs/architecture" className="doc-a">13-stage engine architecture</Link>.
        </Callout>

        <div className="doc-page-nav">
          <Link href="/docs" className="doc-page-nav-link">
            <span className="doc-page-nav-dir">← Previous</span>
            <span className="doc-page-nav-label">Introduction</span>
          </Link>
          <Link href="/docs/architecture" className="doc-page-nav-link next">
            <span className="doc-page-nav-dir">Next →</span>
            <span className="doc-page-nav-label">Architecture</span>
          </Link>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <EditLink slug="quickstart" />
        </div>
      </article>
    </>
  );
}
