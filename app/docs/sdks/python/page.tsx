import CodeBlock from "../../CodeBlock";

export default function PythonSDKPage() {
  return (
    <div className="prose-container max-w-none">
      <nav className="text-xs text-[#4A5568] mb-6 flex items-center gap-2">
        <a href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</a>
        <span>/</span>
        <a href="/docs/sdks" className="hover:text-[#00D4AA] transition-colors">SDKs</a>
        <span>/</span>
        <span className="text-[#FFD700]">Python</span>
      </nav>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 font-mono font-bold">PYTHON</span>
        <span className="text-xs text-[#4A5568]">Primary SDK · Full feature parity</span>
      </div>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Python SDK</h1>
      <p className="text-[#8B95A3] text-lg mb-8 leading-relaxed">
        The Python SDK is the reference implementation of TrueNorth. All features are available in Python first. Supports Python 3.9+.
      </p>

      {/* Install */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">Installation</h2>
      <CodeBlock lang="bash" code={`pip install truenorth-framework`} />

      <div className="my-6 p-4 rounded-lg border border-[#00D4AA]/20 bg-[#00D4AA]/5">
        <p className="text-sm text-[#8B95A3]">
          <strong className="text-[#00D4AA]">PyPI package:</strong> <code className="text-[#A8FF78]">truenorth-framework</code> — not <code className="text-[#4A5568]">truenorth</code> (that's a different package).
        </p>
      </div>

      {/* Initialize */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Initialize</h2>
      <CodeBlock lang="python" filename="main.py" code={`from truenorth import TrueNorthEngine

engine = TrueNorthEngine(
    provider="openai",          # or "anthropic", "gemini", "ollama"
    model="gpt-4o-mini",
    api_key="sk-...",           # omit for ollama
    compliance=["dpdp", "gdpr"] # optional
)`} />

      {/* Create session */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Create a Session</h2>
      <CodeBlock lang="python" filename="session.py" code={`# Load a YAML agent definition
session = engine.create_session(
    yaml_path="agents/medical_intake.yaml",
    session_id="session_abc123",       # optional, auto-generated if omitted
    metadata={"channel": "whatsapp"}   # optional
)

# Or load from a dict
session = engine.create_session(
    schema={
        "id": "quick_demo",
        "fields": [
            {"name": "name", "type": "text", "required": True},
            {"name": "age",  "type": "integer", "range": [0, 120]},
        ]
    }
)`} />

      {/* Send message */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Send a Message</h2>
      <CodeBlock lang="python" filename="chat.py" code={`# Send a message and get a response
response = await session.send("Hi, I'm Priya and I'm 28")

print(response.message)      # "Thanks Priya! What is your primary goal?"
print(response.extracted)    # {"name": "Priya", "age": 28}
print(response.pending)      # ["goal", "height", "weight"]
print(response.cost_usd)     # 0.000043
print(response.stage)        # "field_extraction"
print(response.complete)     # False`} />

      {/* Get output */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Get Structured Output</h2>
      <CodeBlock lang="python" filename="output.py" code={`# After session is complete
output = session.get_output()

# Full structured output as defined in YAML output_template
print(output.json())
# {
#   "patient_name": "Priya",
#   "age": 28,
#   "chief_complaint": "chest pain",
#   ...
# }

# Per-field metadata
print(output.fields["age"].confidence)   # 0.97
print(output.fields["age"].source_turn)  # 3
print(output.total_cost_usd)             # 0.0043
print(output.turns)                      # 9`} />

      {/* API Reference */}
      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">API Reference</h2>
      <div className="overflow-x-auto rounded-xl border border-[#1E2329]">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-[#1E2329] bg-[#111318]">
              <th className="text-left py-3 px-4 text-[#00D4AA] font-semibold">Method</th>
              <th className="text-left py-3 px-4 text-[#8B95A3] font-medium">Parameters</th>
              <th className="text-left py-3 px-4 text-[#8B95A3] font-medium">Returns</th>
            </tr>
          </thead>
          <tbody>
            {[
              { method: "TrueNorthEngine()", params: "provider, model, api_key, compliance", returns: "Engine instance" },
              { method: "engine.create_session()", params: "yaml_path | schema, session_id?, metadata?", returns: "Session" },
              { method: "await session.send()", params: "message: str", returns: "TurnResponse" },
              { method: "session.get_output()", params: "—", returns: "SessionOutput" },
              { method: "session.reset()", params: "—", returns: "void" },
              { method: "session.export_json()", params: "path?: str", returns: "dict | None" },
              { method: "engine.load_template()", params: "name: str, version?: str", returns: "YAMLSchema" },
            ].map((row, i) => (
              <tr key={i} className={`border-b border-[#1E2329] ${i % 2 === 0 ? "bg-[#111318]" : ""}`}>
                <td className="py-2.5 px-4 font-mono text-[#A8FF78]">{row.method}</td>
                <td className="py-2.5 px-4 text-[#8B95A3]">{row.params}</td>
                <td className="py-2.5 px-4 text-[#8B95A3]">{row.returns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer nav */}
      <div className="mt-12 flex items-center justify-between pt-6 border-t border-[#1E2329]">
        <a href="/docs/quickstart" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">← Quickstart</a>
        <a href="/docs/sdks/nodejs" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">Node.js SDK →</a>
      </div>
    </div>
  );
}
