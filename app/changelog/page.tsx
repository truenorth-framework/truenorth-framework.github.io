// FILE: app/changelog/page.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import PageHeader from "../components/PageHeader";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .cl-root *, .cl-root *::before, .cl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cl-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    padding: clamp(3.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }

  .cl-container {
    max-width: 780px;
    margin: 0 auto;
  }

  /* ── Watch strip ── */
  .cl-watch-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 12px;
    margin-bottom: 3rem;
  }
  .cl-watch-left { display: flex; flex-direction: column; gap: 2px; }
  .cl-watch-title { font-size: 0.875rem; font-weight: 700; color: #FFFFFF; }
  .cl-watch-sub { font-size: 0.78rem; color: #6B7A99; }
  .cl-watch-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px;
    border: 1px solid #263354;
    border-radius: 8px;
    background: transparent;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: #C5CDD8;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s;
    white-space: nowrap;
    line-height: 1;
  }
  .cl-watch-btn:hover { border-color: #0DFF9A; color: #0DFF9A; }

  /* ── Timeline ── */
  .cl-timeline {
    position: relative;
  }
  /* The spine */
  .cl-timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 8px;
    bottom: 0;
    width: 1px;
    background: #1C2740;
  }

  .cl-releases {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* ── Release block ── */
  .cl-release {
    position: relative;
    padding-left: 52px;
    padding-bottom: 3.5rem;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1);
  }
  .cl-release.in { opacity: 1; transform: none; }
  .cl-release:last-child { padding-bottom: 0; }

  /* Node */
  .cl-node {
    position: absolute;
    left: 0;
    top: 4px;
    width: 30px; height: 30px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid;
    background: #080B12;
    transition: box-shadow 0.2s;
    z-index: 1;
  }
  .cl-node.latest {
    border-color: #0DFF9A;
    box-shadow: 0 0 16px rgba(13,255,154,0.2);
  }
  .cl-node.minor { border-color: #263354; }
  .cl-node.initial { border-color: #FF6B35; }
  .cl-node-dot { width: 8px; height: 8px; border-radius: 50%; }
  .cl-node.latest  .cl-node-dot { background: #0DFF9A; }
  .cl-node.minor   .cl-node-dot { background: #263354; }
  .cl-node.initial .cl-node-dot { background: #FF6B35; }

  /* Release header */
  .cl-release-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    padding-top: 4px;
  }
  .cl-version {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    text-decoration: none;
    scroll-margin-top: 6rem;
  }
  .cl-version:hover { color: #0DFF9A; }
  .cl-release-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 100px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .cl-release-pill.latest  { background: rgba(13,255,154,0.08); border: 1px solid rgba(13,255,154,0.2); color: #0DFF9A; }
  .cl-release-pill.initial { background: rgba(255,107,53,0.08); border: 1px solid rgba(255,107,53,0.2); color: #FF6B35; }
  .cl-release-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: #263354;
    margin-left: auto;
  }
  .cl-gh-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    color: #263354;
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: color 0.15s;
  }
  .cl-gh-link:hover { color: #6B7A99; }

  /* Entries */
  .cl-entries {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .cl-entry {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .cl-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    flex-shrink: 0;
    margin-top: 1px;
    line-height: 1.5;
    border: 1px solid;
  }
  .cl-badge.NEW      { background: rgba(13,255,154,0.08); color: #0DFF9A;   border-color: rgba(13,255,154,0.2);  }
  .cl-badge.FIX      { background: rgba(77,158,255,0.08); color: #4D9EFF;   border-color: rgba(77,158,255,0.2);  }
  .cl-badge.BREAKING { background: rgba(255,107,53,0.08); color: #FF6B35;   border-color: rgba(255,107,53,0.2);  }
  .cl-badge.DOCS     { background: rgba(107,122,153,0.1); color: #8B9AB5;   border-color: rgba(107,122,153,0.2); }
  .cl-badge.PERF     { background: rgba(255,215,0,0.08);  color: #FFD700;   border-color: rgba(255,215,0,0.2);  }
  .cl-entry-text {
    font-size: 0.855rem;
    color: #A8B4C8;
    line-height: 1.6;
    flex: 1;
  }

  /* Entry separator between releases */
  .cl-release + .cl-release { border-top: none; }
`;

const RELEASES = [
  {
    version: "v0.1.5",
    date: "2026-06-10",
    tag: "latest",
    entries: [
      { type: "NEW",  text: "A2A protocol bridge for AutoGen and CrewAI agents" },
      { type: "NEW",  text: "Go SDK v0.1.5 — full parity with Python core" },
      { type: "FIX",  text: "SQLite sync race condition on rapid network reconnect" },
      { type: "FIX",  text: "Hindi language detection edge case with mixed Devanagari/Latin text" },
      { type: "DOCS", text: "WhatsApp Business full integration guide with phone-frame mockup" },
      { type: "PERF", text: "Hallucination firewall 40% faster — claim extraction now batched" },
    ],
  },
  {
    version: "v0.1.4",
    date: "2026-05-28",
    tag: null,
    entries: [
      { type: "NEW",  text: "Async reminder engine — schedule follow-up messages post-session" },
      { type: "NEW",  text: "DPDP Act 2023 compliance module with consent management" },
      { type: "NEW",  text: "React Native / Expo SDK with ImpossibleAI offline inference" },
      { type: "FIX",  text: "Confidence scoring edge case when all fields are optional" },
      { type: "FIX",  text: "Cost recording now accurate for multi-turn sessions with retries" },
      { type: "DOCS", text: "Added architecture deep-dive for the 13-stage pipeline" },
    ],
  },
  {
    version: "v0.1.3",
    date: "2026-05-14",
    tag: null,
    entries: [
      { type: "NEW",  text: "Multilingual support — 22+ Indian languages via auto-detect" },
      { type: "NEW",  text: "PII interceptor with Aadhaar, PAN card, and phone number masking" },
      { type: "NEW",  text: "Node.js SDK — TypeScript-native with full async/await support" },
      { type: "PERF", text: "50% reduction in LLM calls via smarter conversation planning" },
      { type: "FIX",  text: "Conflict detection now handles temporal contradictions correctly" },
    ],
  },
  {
    version: "v0.1.2",
    date: "2026-04-30",
    tag: null,
    entries: [
      { type: "NEW",      text: "Hallucination Firewall — 3-stage claim extract → verify → sanitize" },
      { type: "NEW",      text: "Offline-first mode with SQLite local storage and background sync" },
      { type: "NEW",      text: "WhatsApp Business API integration with session management" },
      { type: "BREAKING", text: "YAML schema v2 — output_template replaces fields.output" },
      { type: "DOCS",     text: "Rural Medical Intake case study with full YAML config" },
    ],
  },
  {
    version: "v0.1.1",
    date: "2026-04-10",
    tag: null,
    entries: [
      { type: "NEW",  text: "Emotion detection — valence + arousal scoring per turn" },
      { type: "NEW",  text: "Source tracing — sentence-level attribution back to original input" },
      { type: "FIX",  text: "Language detection fails silently on empty messages — now defaults to EN" },
      { type: "PERF", text: "Token usage reduced by 23% via prompt compression" },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-03-22",
    tag: "initial",
    entries: [
      { type: "NEW",  text: "Initial release — Python SDK with 13-stage conversation engine" },
      { type: "NEW",  text: "YAML-driven agent definition — zero Python required" },
      { type: "NEW",  text: "8 LLM provider integrations (OpenAI, Anthropic, Gemini, Ollama, and more)" },
      { type: "NEW",  text: "Field extraction, validation, and confidence scoring pipeline" },
      { type: "NEW",  text: "MCP tool execution — calculator, web search, custom tools" },
      { type: "DOCS", text: "Full documentation site, quickstart guide, and SDK reference" },
    ],
  },
];

export default function ChangelogPage() {
  const releaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.15 }
    );
    releaseRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="What's New"
        title="Changelog"
        subtitle="Every release, every fix, every improvement. TrueNorth ships fast."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Changelog" }]}
      />

      <div className="cl-root">
        <div className="cl-container">

          {/* Watch strip */}
          <div className="cl-watch-strip">
            <div className="cl-watch-left">
              <div className="cl-watch-title">Get release notifications</div>
              <div className="cl-watch-sub">Watch the repo on GitHub to get notified of every release.</div>
            </div>
            <a
              href="https://github.com/amareshhebbar/TrueNorth/subscription"
              target="_blank"
              rel="noopener noreferrer"
              className="cl-watch-btn"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Watch on GitHub
            </a>
          </div>

          {/* Timeline */}
          <div className="cl-timeline">
            <div className="cl-releases">
              {RELEASES.map((release, ri) => {
                const nodeClass = release.tag === "latest" ? "latest" : release.tag === "initial" ? "initial" : "minor";
                return (
                  <div
                    key={release.version}
                    className="cl-release"
                    ref={el => { releaseRefs.current[ri] = el; }}
                    style={{ transitionDelay: `${ri * 0.06}s` }}
                  >
                    {/* Node */}
                    <div className={`cl-node ${nodeClass}`}>
                      <div className="cl-node-dot" />
                    </div>

                    {/* Header */}
                    <div className="cl-release-head">
                      <a
                        href={`#${release.version}`}
                        id={release.version}
                        className="cl-version"
                      >
                        {release.version}
                      </a>
                      {release.tag === "latest" && <span className="cl-release-pill latest">Latest</span>}
                      {release.tag === "initial" && <span className="cl-release-pill initial">Initial release</span>}
                      <span className="cl-release-date">{release.date}</span>
                      <a
                        href={`https://github.com/amareshhebbar/TrueNorth/releases/tag/${release.version}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cl-gh-link"
                        aria-label={`View ${release.version} on GitHub`}
                      >
                        GitHub ↗
                      </a>
                    </div>

                    {/* Entries */}
                    <div className="cl-entries">
                      {release.entries.map((entry, ei) => (
                        <div key={ei} className="cl-entry">
                          <span className={`cl-badge ${entry.type}`}>{entry.type}</span>
                          <span className="cl-entry-text">{entry.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}