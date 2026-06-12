import CodeBlock from "../../CodeBlock";
import { Bc, EditLink, PageNav } from "../python/page";
import SDK_CSS from "../sdk.css"

export default function NodeSDKPage() {
  const COLOR = "#0DFF9A";

  return (
    <>
      <style>{SDK_CSS}</style>
      <article className="sdk-article">
        <Bc lang="Node.js" langColor={COLOR} slug="nodejs" />

        <div className="sdk-tags">
          <span className="sdk-tag" style={{ color: COLOR, background: COLOR+"0D", borderColor: COLOR+"30" }}>Node.js</span>
          <span className="sdk-tag" style={{ color: "#4D9EFF", background: "#4D9EFF0D", borderColor: "#4D9EFF30" }}>TypeScript-native</span>
          <span className="sdk-tag-plain">Stable</span>
        </div>

        <h1 className="sdk-h1">Node.js / TypeScript SDK</h1>
        <p className="sdk-lead">TypeScript-native SDK with full async/await support. Runs on Node.js 18+ and works with Next.js server actions, Express, Fastify, and any Node runtime.</p>

        <h2 className="sdk-h2">Installation</h2>
        <CodeBlock lang="bash" code={`npm install truenorth
# or
yarn add truenorth
# or
pnpm add truenorth`} />

        <h2 className="sdk-h2">Initialize</h2>
        <CodeBlock
          lang="typescript"
          filename="lib/truenorth.ts"
          code={`import { TrueNorthEngine } from "truenorth";

const engine = new TrueNorthEngine({
  provider: "openai",        // "openai" | "anthropic" | "gemini" | "ollama"
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY!,
  compliance: ["dpdp"],      // optional
});`}
        />

        <h2 className="sdk-h2">Next.js Server Action</h2>
        <CodeBlock
          lang="typescript"
          filename="app/actions.ts"
          code={`"use server";
import { engine } from "@/lib/truenorth";

export async function sendMessage(sessionId: string, message: string) {
  const session = await engine.getOrCreateSession({
    sessionId,
    yamlPath: "agents/medical_intake.yaml",
  });

  const response = await session.send(message);

  return {
    message:   response.message,
    extracted: response.extracted,
    complete:  response.complete,
    costUsd:   response.costUsd,
  };
}`}
        />

        <h2 className="sdk-h2">Streaming (for chat UIs)</h2>
        <CodeBlock
          lang="typescript"
          filename="app/api/chat/route.ts"
          code={`import { TrueNorthEngine } from "truenorth";
import { StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  const { sessionId, message } = await req.json();

  const session = await engine.getOrCreateSession({ sessionId });
  const stream  = await session.stream(message);

  return new StreamingTextResponse(stream);
}`}
        />

        <h2 className="sdk-h2">TypeScript Types</h2>
        <CodeBlock
          lang="typescript"
          code={`interface TurnResponse {
  message:        string;
  extracted:      Record<string, unknown>;
  pending:        string[];
  complete:       boolean;
  costUsd:        number;
  stage:          PipelineStage;
  confidence:     Record<string, number>;
  emotionValence: number;
}

interface SessionOutput {
  fields: Record<string, {
    value:      unknown;
    confidence: number;
    sourceTurn: number;
    sourceText: string;
  }>;
  totalCostUsd: number;
  turns:        number;
  durationMs:   number;
  language:     string;
}

type PipelineStage =
  | "language_detection"   | "emotion_detection"
  | "pii_detection"        | "conversation_planning"
  | "field_extraction"     | "conflict_detection"
  | "field_validation"     | "confidence_scoring"
  | "hallucination_firewall" | "output_generation"
  | "source_tracing"       | "cost_recording"
  | "mcp_tool_execution";`}
        />

        <PageNav
          prev={{ href: "/docs/sdks/python", label: "Python SDK" }}
          next={{ href: "/docs/sdks/go",     label: "Go SDK" }}
        />
        <EditLink slug="nodejs" />
      </article>
    </>
  );
}
