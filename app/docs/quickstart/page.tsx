import Link from "next/link";
import type { Metadata } from "next";
import CodeBlock from "../CodeBlock";

export const metadata: Metadata = {
  title: "Quickstart — TrueNorth Docs",
  description: "Get started with TrueNorth in under 5 minutes.",
};

const steps = [
  {
    title: "Install TrueNorth",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[#8B95A3]">Install via pip (Python 3.9+):</p>
        <CodeBlock lang="bash" code={`pip install truenorth-framework`} />
        <p className="text-sm text-[#8B95A3]">Or Node.js:</p>
        <CodeBlock lang="bash" code={`npm install truenorth`} />
        <p className="text-sm text-[#8B95A3]">Or Go:</p>
        <CodeBlock lang="bash" code={`go get github.com/amareshhebbar/truenorth/sdk`} />
      </div>
    ),
  },
  {
    title: "Set your API key",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[#8B95A3]">TrueNorth works with any OpenAI-compatible provider:</p>
        <CodeBlock lang="bash" code={`export OPENAI_API_KEY=sk-...
# or Anthropic
export ANTHROPIC_API_KEY=sk-ant-...
# or local via Ollama — no API key needed`} />
      </div>
    ),
  },
  {
    title: "Create your first schema",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-[#8B95A3]">Create a file called <code className="text-[#A8FF78] text-xs">my_agent.yaml</code>:</p>
        <CodeBlock
          lang="yaml"
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
      </div>
    ),
  },
  {
    title: "Run the engine",
    content: (
      <div className="space-y-3">
        <CodeBlock
          lang="python"
          code={`from truenorth import Engine, Schema

schema = Schema.load("my_agent.yaml")
engine = Engine(schema=schema)

# Create a session
session = engine.create_session(user_id="user_123")

# Chat loop
while not session.is_complete:
    user_input = input(f"Agent: {session.last_message}\\nYou: ")
    session = engine.chat(session.id, user_input)

# Get structured output
print(session.output.json())`}
        />
        <p className="text-sm text-[#8B95A3]">Expected output:</p>
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
      </div>
    ),
  },
];

export default function QuickstartPage() {
  return (
    <article>
      <nav className="flex items-center gap-2 text-xs text-[#4A5568] mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#00D4AA] transition-colors">TrueNorth</Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</Link>
        <span>/</span>
        <span className="text-[#8B95A3]">Quickstart</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Quickstart</h1>
      <p className="text-lg text-[#8B95A3] mb-10 leading-relaxed">
        From zero to a working AI conversation agent in under 5 minutes.
      </p>

      <div className="space-y-10">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-6">
            {/* Step number */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full border-2 border-[#00D4AA] flex items-center justify-center text-sm font-bold text-[#00D4AA]">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 mt-2 bg-[#1E2329]" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h2 className="text-lg font-semibold text-[#F0F2F5] mb-4">{step.title}</h2>
              {step.content}
            </div>
          </div>
        ))}
      </div>

      <div className="callout-info mt-8">
        <strong className="text-[#00D4AA]">Next steps</strong>
        <p className="text-sm text-[#8B95A3] mt-1">
          Now try the <Link href="/playground" className="text-[#00D4AA] hover:underline">Playground</Link> for a live browser demo, or read about the{" "}
          <Link href="/docs/architecture" className="text-[#00D4AA] hover:underline">13-stage engine architecture</Link>.
        </p>
      </div>

      <div className="flex gap-4 mt-10 pt-8 border-t border-[#1E2329]">
        <Link href="/docs" className="text-sm text-[#4A5568] hover:text-[#00D4AA] transition-colors">
          ← Introduction
        </Link>
        <Link href="/docs/architecture" className="ml-auto text-sm text-[#4A5568] hover:text-[#00D4AA] transition-colors">
          Architecture →
        </Link>
      </div>

      <div className="mt-6">
        <a
          href="https://github.com/amareshhebbar/TrueNorth/blob/main/docs/quickstart.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#4A5568] hover:text-[#00D4AA] transition-colors"
        >
          Edit this page on GitHub →
        </a>
      </div>
    </article>
  );
}
