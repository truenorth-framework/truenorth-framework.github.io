import Link from "next/link";
import { ARROW, Breadcrumb, Callout, EditLink } from "./architecture/page";
import { DOCS_CSS } from "./docs.css";

export default function DocsIntroPage() {
  const WHEN = [
    "You need to collect structured data through natural conversation",
    "You're operating in a regulated industry (healthcare, finance, HR)",
    "You need multi-language support for Indian languages",
    "Sessions must survive network interruptions",
    "You want compliance baked in, not bolted on",
    "You need to know the exact cost of every API call",
  ];

  return (
    <>
      <style>{DOCS_CSS}</style>
      <article className="doc-article">
        <Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Introduction" }]} />

        <h1 className="doc-h1">Introduction</h1>
        <p className="doc-lead">
          TrueNorth is a developer-first AI conversation engine. You declare what data you need in YAML. TrueNorth runs the entire conversation to collect it — extraction, validation, compliance, reminders, multi-language support — automatically.
        </p>

        <Callout type="info" title="TL;DR">
          Write a YAML schema. Get a production-ready AI agent that handles everything. Zero Python state management required.
        </Callout>

        <h2 className="doc-h2">Why TrueNorth exists</h2>

        <h3 className="doc-h3">The extraction problem nobody solved right</h3>
        <p className="doc-p">
          LLMs are excellent at conversation but unreliable at guaranteeing structured output. Every team building data-collection AI ends up re-implementing the same pieces: field tracking, validation, conflict detection, confidence scoring. TrueNorth ships all of it as configuration.
        </p>

        <h3 className="doc-h3">The compliance gap for India</h3>
        <p className="doc-p">
          India's DPDP Act 2023 creates specific obligations: consent management, data principal rights, retention limits. No Western framework was designed around this. TrueNorth implements the full Act as a single YAML block — not an afterthought added on top.
        </p>

        <div className="doc-quote">
          <div className="doc-quote-text">"Configuration replaced 200 lines of Python."</div>
          <div className="doc-quote-attr">— from production feedback</div>
        </div>

        <h3 className="doc-h3">The reminder nobody built</h3>
        <p className="doc-p">
          Every AI framework assumes sessions complete in one sitting. TrueNorth's async reminder engine initiates contact days later with full session context — drafting a personalized follow-up using the LLM and sending it via WhatsApp or any channel. This is a primitive no other framework offers.
        </p>

        <h2 className="doc-h2">When to use TrueNorth</h2>
        <ul className="doc-ul">
          {WHEN.map(item => <li key={item} className="doc-li">{item}</li>)}
        </ul>

        <h2 className="doc-h2">Architecture in 30 seconds</h2>
        <p className="doc-p">
          Every message runs through 13 sequential stages: language detection, emotion analysis, PII masking, conversation planning, field extraction, conflict detection, validation, confidence scoring, hallucination firewall, output generation, source tracing, cost recording, and MCP tool execution.
        </p>
        <p className="doc-p">Every stage is auditable. Every stage is configurable. No black boxes.</p>

        <div className="doc-foot-nav">
          <div className="doc-foot-ctas">
            <Link href="/docs/quickstart" className="doc-btn-primary">Quickstart {ARROW}</Link>
            <Link href="/docs/architecture" className="doc-btn-secondary">Architecture</Link>
          </div>
          <EditLink slug="introduction" />
        </div>
      </article>
    </>
  );
}
