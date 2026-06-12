import CodeBlock from "../../CodeBlock";

export default function NodeSDKPage() {
  return (
    <div className="prose-container max-w-none">
      <nav className="text-xs text-[#4A5568] mb-6 flex items-center gap-2">
        <a href="/docs" className="hover:text-[#00D4AA] transition-colors">Docs</a>
        <span>/</span>
        <a href="/docs/sdks" className="hover:text-[#00D4AA] transition-colors">SDKs</a>
        <span>/</span>
        <span className="text-[#00D4AA]">Node.js</span>
      </nav>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs px-2 py-1 rounded bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20 font-mono font-bold">NODE.JS</span>
        <span className="text-xs px-2 py-1 rounded bg-[#3178C6]/10 text-[#3178C6] border border-[#3178C6]/20 font-mono">TypeScript-native</span>
      </div>

      <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">Node.js / TypeScript SDK</h1>
      <p className="text-[#8B95A3] text-lg mb-8 leading-relaxed">
        TypeScript-native SDK with full async/await support. Runs on Node.js 18+ and works with Next.js server actions, Express, Fastify, and any Node runtime.
      </p>

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4">Installation</h2>
      <CodeBlock lang="bash" code={`npm install truenorth
# or
yarn add truenorth
# or
pnpm add truenorth`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Initialize</h2>
      <CodeBlock lang="typescript" filename="lib/truenorth.ts" code={`import { TrueNorthEngine } from "truenorth";

const engine = new TrueNorthEngine({
  provider: "openai",        // or "anthropic" | "gemini" | "ollama"
  model: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY!,
  compliance: ["dpdp"],      // optional
});`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Next.js Server Action</h2>
      <CodeBlock lang="typescript" filename="app/actions.ts" code={`"use server";
import { engine } from "@/lib/truenorth";

export async function sendMessage(sessionId: string, message: string) {
  const session = await engine.getOrCreateSession({
    sessionId,
    yamlPath: "agents/medical_intake.yaml",
  });

  const response = await session.send(message);

  return {
    message: response.message,
    extracted: response.extracted,
    complete: response.complete,
    costUsd: response.costUsd,
  };
}`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">Streaming (for chat UIs)</h2>
      <CodeBlock lang="typescript" filename="api/chat/route.ts" code={`import { TrueNorthEngine } from "truenorth";
import { StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  const { sessionId, message } = await req.json();

  const session = await engine.getOrCreateSession({ sessionId });
  const stream = await session.stream(message);

  return new StreamingTextResponse(stream);
}`} />

      <h2 className="text-2xl font-bold text-[#F0F2F5] mb-4 mt-10">TypeScript Types</h2>
      <CodeBlock lang="typescript" code={`interface TurnResponse {
  message: string;
  extracted: Record<string, unknown>;
  pending: string[];
  complete: boolean;
  costUsd: number;
  stage: PipelineStage;
  confidence: Record<string, number>;
  emotionValence: number;
}

interface SessionOutput {
  fields: Record<string, {
    value: unknown;
    confidence: number;
    sourceTurn: number;
    sourceText: string;
  }>;
  totalCostUsd: number;
  turns: number;
  durationMs: number;
  language: string;
}

type PipelineStage =
  | "language_detection"
  | "emotion_detection"
  | "pii_detection"
  | "conversation_planning"
  | "field_extraction"
  | "conflict_detection"
  | "field_validation"
  | "confidence_scoring"
  | "hallucination_firewall"
  | "output_generation"
  | "source_tracing"
  | "cost_recording"
  | "mcp_tool_execution";`} />

      <div className="mt-12 flex items-center justify-between pt-6 border-t border-[#1E2329]">
        <a href="/docs/sdks/python" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">← Python SDK</a>
        <a href="/docs/sdks/go" className="text-sm text-[#8B95A3] hover:text-[#00D4AA] transition-colors">Go SDK →</a>
      </div>
    </div>
  );
}
