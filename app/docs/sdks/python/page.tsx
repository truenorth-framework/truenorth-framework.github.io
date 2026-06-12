import Link from "next/link";
import CodeBlock from "../../CodeBlock";   

import { readFileSync } from "fs";

import SDK_CSS from "../sdk.css"

import React from "react";

export function Bc({ lang, langColor, slug }: { lang: string; langColor: string; slug: string }) {
  return (
    <nav className="sdk-bc" aria-label="Breadcrumb">
      <Link href="/"          className="sdk-bc-link">Home</Link>
      <span className="sdk-bc-sep">/</span>
      <Link href="/docs"      className="sdk-bc-link">Docs</Link>
      <span className="sdk-bc-sep">/</span>
      <Link href="/docs/sdks" className="sdk-bc-link">SDKs</Link>
      <span className="sdk-bc-sep">/</span>
      <span className="sdk-bc-lang" style={{ color: langColor }} aria-current="page">{lang}</span>
    </nav>
  );
}

export function Callout({ type = "info", title, children }: { type?: "info" | "warn"; title: string; children: React.ReactNode }) {
  const icons = {
    info: <svg width="14" height="14" fill="none" stroke="#0DFF9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    warn: <svg width="14" height="14" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  };
  return (
    <div className={`sdk-callout ${type}`}>
      <span className="sdk-callout-icon">{icons[type]}</span>
      <div>
        <div className="sdk-callout-title">{title}</div>
        <div className="sdk-callout-text">{children}</div>
      </div>
    </div>
  );
}

export function PageNav({ prev, next }: { prev?: { href: string; label: string }; next?: { href: string; label: string } }) {
  return (
    <nav className="sdk-page-nav" aria-label="Page navigation">
      {prev && (
        <Link href={prev.href} className="sdk-nav-link">
          <span className="sdk-nav-dir">← Previous</span>
          <span className="sdk-nav-label">{prev.label}</span>
        </Link>
      )}
      {next && (
        <Link href={next.href} className="sdk-nav-link next">
          <span className="sdk-nav-dir">Next →</span>
          <span className="sdk-nav-label">{next.label}</span>
        </Link>
      )}
    </nav>
  );
}

export function EditLink({ slug }: { slug: string }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <a
        href={`https://github.com/amareshhebbar/TrueNorth/blob/main/docs/sdks/${slug}.md`}
        target="_blank" rel="noopener noreferrer"
        className="sdk-edit"
      >
        Edit this page on GitHub ↗
      </a>
    </div>
  );
}

export default function PythonSDKPage() {
  const COLOR = "#FFD700";

  const API_ROWS = [
    { method: "TrueNorthEngine()",      params: "provider, model, api_key, compliance?",      ret: "Engine" },
    { method: "engine.create_session()", params: "yaml_path | schema, session_id?, metadata?", ret: "Session" },
    { method: "await session.send()",   params: "message: str",                                ret: "TurnResponse" },
    { method: "session.get_output()",   params: "—",                                           ret: "SessionOutput" },
    { method: "session.reset()",        params: "—",                                           ret: "None" },
    { method: "session.export_json()",  params: "path?: str",                                  ret: "dict | None" },
    { method: "engine.load_template()", params: "name: str, version?: str",                    ret: "YAMLSchema" },
  ];

  return (
    <>
      <style>{SDK_CSS}</style>
      <article className="sdk-article">
        <Bc lang="Python" langColor={COLOR} slug="python" />

        <div className="sdk-tags">
          <span className="sdk-tag" style={{ color: COLOR, background: COLOR+"0D", borderColor: COLOR+"30" }}>Python</span>
          <span className="sdk-tag" style={{ color: COLOR, background: COLOR+"0D", borderColor: COLOR+"30" }}>Primary SDK</span>
          <span className="sdk-tag-plain">Full feature parity</span>
        </div>

        <h1 className="sdk-h1">Python SDK</h1>
        <p className="sdk-lead">The reference implementation of TrueNorth. All features land in Python first. Supports Python 3.9+.</p>

        <Callout type="info" title="PyPI package name">
          Install <code className="sdk-code">truenorth-framework</code> — not <code className="sdk-code">truenorth</code> (that's a different package on PyPI).
        </Callout>

        <h2 className="sdk-h2">Installation</h2>
        <CodeBlock lang="bash" code={`pip install truenorth-framework`} />

        <h2 className="sdk-h2">Initialize</h2>
        <p className="sdk-p">Create an engine with your LLM provider:</p>
        <CodeBlock
          lang="python"
          filename="main.py"
          code={`from truenorth import TrueNorthEngine

engine = TrueNorthEngine(
    provider="openai",          # "openai" | "anthropic" | "gemini" | "ollama"
    model="gpt-4o-mini",
    api_key="sk-...",           # omit for ollama
    compliance=["dpdp", "gdpr"] # optional compliance modules
)`}
        />

        <h2 className="sdk-h2">Create a Session</h2>
        <CodeBlock
          lang="python"
          filename="session.py"
          code={`# From a YAML file
session = engine.create_session(
    yaml_path="agents/medical_intake.yaml",
    session_id="session_abc123",       # optional — auto-generated if omitted
    metadata={"channel": "whatsapp"}   # optional
)

# Or from an inline dict
session = engine.create_session(
    schema={
        "id": "quick_demo",
        "fields": [
            {"name": "name", "type": "text", "required": True},
            {"name": "age",  "type": "integer", "range": [0, 120]},
        ]
    }
)`}
        />

        <h2 className="sdk-h2">Send a Message</h2>
        <CodeBlock
          lang="python"
          filename="chat.py"
          code={`response = await session.send("Hi, I'm Priya and I'm 28")

print(response.message)      # "Thanks Priya! What is your primary goal?"
print(response.extracted)    # {"name": "Priya", "age": 28}
print(response.pending)      # ["goal", "height", "weight"]
print(response.cost_usd)     # 0.000043
print(response.stage)        # "field_extraction"
print(response.complete)     # False`}
        />

        <h2 className="sdk-h2">Get Structured Output</h2>
        <CodeBlock
          lang="python"
          filename="output.py"
          code={`# After session.complete is True
output = session.get_output()

print(output.json())
# {
#   "patient_name": "Priya",
#   "age": 28,
#   "chief_complaint": "chest pain",
#   ...
# }

print(output.fields["age"].confidence)   # 0.97
print(output.fields["age"].source_turn)  # 3
print(output.total_cost_usd)             # 0.0043
print(output.turns)                      # 9`}
        />

        <h2 className="sdk-h2">API Reference</h2>
        <div className="sdk-table-wrap">
          <table className="sdk-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Parameters</th>
                <th>Returns</th>
              </tr>
            </thead>
            <tbody>
              {API_ROWS.map(row => (
                <tr key={row.method}>
                  <td className="sdk-td-method">{row.method}</td>
                  <td className="sdk-td-param">{row.params}</td>
                  <td className="sdk-td-ret">{row.ret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PageNav
          prev={{ href: "/docs/quickstart", label: "Quickstart" }}
          next={{ href: "/docs/sdks/nodejs", label: "Node.js SDK" }}
        />
        <EditLink slug="python" />
      </article>
    </>
  );
}

// export default PythonSDKPage;