"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root {
    --bg:         #080B12;
    --surface:    #0E1420;
    --surface2:   #111827;
    --border:     #1C2740;
    --border2:    #263354;
    --accent:     #0DFF9A;
    --blue:       #4D9EFF;
    --text1:      #FFFFFF;
    --text2:      #C5CDD8;
    --text3:      #6B7A99;
    --font-sans:  'Inter', system-ui, sans-serif;
    --font-mono:  'JetBrains Mono', monospace;
  }

  /* ── shared section shell ── */
  .hs-section {
    width: 100%;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  .hs-section *, .hs-section *::before, .hs-section *::after {
    box-sizing: border-box;
  }
  .hs-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* ── eyebrow pill ── */
  .hs-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 100px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .hs-eyebrow.green {
    background: #0DFF9A0A;
    border: 1px solid #0DFF9A33;
    color: var(--accent);
  }
  .hs-eyebrow.blue {
    background: #4D9EFF0A;
    border: 1px solid #4D9EFF33;
    color: var(--blue);
  }
  .hs-eyebrow .hs-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
    animation: hsPulse 2s infinite;
  }
  @keyframes hsPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* ── headings ── */
  .hs-h2 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: var(--text1);
    margin: 0 0 1rem;
  }
  .hs-h2-sub {
    font-size: 1rem;
    font-weight: 400;
    color: var(--text3);
    line-height: 1.7;
    margin: 0 0 3rem;
    max-width: 580px;
  }
  .hs-grad-green {
    background: linear-gradient(135deg, #0DFF9A 0%, #00C4FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hs-grad-blue {
    background: linear-gradient(135deg, #4D9EFF 0%, #0DFF9A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── scroll reveal ── */
  .hs-fade {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s cubic-bezier(.16,1,.3,1),
                transform 0.7s cubic-bezier(.16,1,.3,1);
  }
  .hs-fade.in  { opacity: 1; transform: none; }
  .hs-fade.d1  { transition-delay: 0.08s; }
  .hs-fade.d2  { transition-delay: 0.16s; }
  .hs-fade.d3  { transition-delay: 0.24s; }
  .hs-fade.d4  { transition-delay: 0.32s; }
  .hs-fade.d5  { transition-delay: 0.40s; }
  .hs-fade.d6  { transition-delay: 0.48s; }

  /* ── buttons ── */
  .hs-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 24px;
    background: var(--accent);
    color: #000;
    border-radius: 10px;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 800;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    line-height: 1;
    white-space: nowrap;
  }
  .hs-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 32px #0DFF9A44;
  }
  .hs-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 24px;
    background: transparent;
    color: var(--text2);
    border: 1px solid var(--border2);
    border-radius: 10px;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    line-height: 1;
    white-space: nowrap;
  }
  .hs-btn-secondary:hover {
    background: var(--surface);
    border-color: var(--text3);
    color: var(--text1);
  }

  /* ════════════════════════════════
     FEATURES GRID
  ════════════════════════════════ */
  #hs-features {
    background: var(--bg);
  }
  .hs-feat-header {
    max-width: 600px;
    margin-bottom: clamp(2.5rem, 5vw, 4rem);
  }
  .hs-feat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  @media (max-width: 900px) {
    .hs-feat-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .hs-feat-grid { grid-template-columns: 1fr; }
  }
  .hs-feat-card {
    background: var(--surface);
    padding: 2.25rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
  }
  .hs-feat-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mx,50%) var(--my,50%), #0DFF9A0A, transparent 55%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .hs-feat-card:hover { background: #0F1825; }
  .hs-feat-card:hover::after { opacity: 1; }
  .hs-feat-icon {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 10px;
    color: var(--text3);
    flex-shrink: 0;
    transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .hs-feat-card:hover .hs-feat-icon {
    color: var(--accent);
    background: #0DFF9A0A;
    border-color: #0DFF9A33;
    transform: scale(1.08) rotate(-3deg);
  }
  .hs-feat-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text1);
    margin: 0;
    line-height: 1.3;
  }
  .hs-feat-desc {
    font-size: 0.855rem;
    color: var(--text3);
    line-height: 1.68;
    margin: 0;
    flex: 1;
  }
  .hs-feat-cta {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text3);
    margin-top: 4px;
    transition: color 0.2s;
  }
  .hs-feat-cta svg { transition: transform 0.2s; }
  .hs-feat-card:hover .hs-feat-cta { color: var(--accent); }
  .hs-feat-card:hover .hs-feat-cta svg { transform: translateX(4px); }

  /* ════════════════════════════════
     BENCHMARKS
  ════════════════════════════════ */
  #hs-benchmarks {
    background: var(--bg);
    border-top: 1px solid var(--border);
  }
  .hs-bench-header {
    max-width: 600px;
    margin-bottom: clamp(2.5rem, 5vw, 4rem);
  }
  .hs-bench-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 900px) {
    .hs-bench-grid { grid-template-columns: 1fr; }
  }
  .hs-bench-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s;
  }
  .hs-bench-card:hover { border-color: var(--border2); }
  .hs-bench-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }
  .hs-bench-label {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text3);
    max-width: 70%;
    line-height: 1.4;
  }
  .hs-bench-idx {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--border2);
    flex-shrink: 0;
  }
  .hs-bench-value {
    font-family: var(--font-mono);
    font-size: clamp(2.4rem, 4vw, 3rem);
    font-weight: 700;
    color: var(--text1);
    line-height: 1;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .hs-bench-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 700;
    padding: 3px 9px;
    border-radius: 6px;
    background: #0DFF9A12;
    border: 1px solid #0DFF9A22;
    color: var(--accent);
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  .hs-bench-delta {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text3);
    margin-bottom: 1.75rem;
  }
  .hs-bench-bars {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: auto;
  }
  .hs-bar-row { display: flex; flex-direction: column; gap: 5px; }
  .hs-bar-labels {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .hs-bar-name {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text3);
  }
  .hs-bar-name.w { color: var(--text2); font-weight: 600; }
  .hs-bar-val {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text3);
  }
  .hs-bar-val.w { color: var(--accent); }
  .hs-bar-track {
    height: 3px;
    width: 100%;
    background: var(--border);
    border-radius: 100px;
    overflow: hidden;
  }
  .hs-bar-fill {
    height: 100%;
    border-radius: 100px;
    width: 0;
    transition: width 1.1s cubic-bezier(.16,1,.3,1);
  }
  .hs-bar-fill.w { background: linear-gradient(90deg, var(--accent), #00C4FF); }
  .hs-bar-fill.l { background: var(--border2); }
  .hs-bench-foot {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
  }
  .hs-bench-foot span {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text3);
  }

  /* ════════════════════════════════
     SDK CAROUSEL
  ════════════════════════════════ */
  #hs-sdk {
    background: var(--surface);
    border-top: 1px solid var(--border);
  }
  .hs-sdk-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  @media (max-width: 900px) {
    .hs-sdk-layout { grid-template-columns: 1fr; gap: 3rem; }
  }
  .hs-sdk-copy-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 2rem;
  }
  .hs-sdk-tabs {
    display: flex;
    gap: 4px;
    padding: 5px;
    background: var(--bg);
    border: 1px solid var(--border2);
    border-bottom: none;
    border-radius: 10px 10px 0 0;
  }
  .hs-sdk-tab {
    padding: 7px 16px;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
    background: transparent;
    color: var(--text3);
    transition: background 0.15s, color 0.15s;
    letter-spacing: 0.03em;
    line-height: 1;
  }
  .hs-sdk-tab.active {
    background: var(--surface2);
    color: var(--text1);
  }
  .hs-sdk-window {
    background: #07090F;
    border: 1px solid var(--border2);
    border-radius: 0 10px 10px 10px;
    overflow: hidden;
  }
  .hs-sdk-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: #0A0D15;
    border-bottom: 1px solid var(--border);
  }
  .hs-sdk-dots { display: flex; gap: 6px; }
  .hs-sdk-dot { width: 11px; height: 11px; border-radius: 50%; }
  .hs-sdk-copy {
    padding: 4px 12px;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--text3);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    line-height: 1.6;
  }
  .hs-sdk-copy:hover { color: var(--text1); border-color: var(--text3); }
  .hs-sdk-pre {
    padding: 1.5rem 1.75rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.8;
    color: #C9D1D9;
    white-space: pre;
    overflow-x: auto;
    min-height: 270px;
    margin: 0;
  }
  /* syntax token colours */
  .t-kw  { color: #FF79C6; }
  .t-fn  { color: #50FA7B; }
  .t-str { color: #F1FA8C; }
  .t-cm  { color: #6272A4; }
  .t-var { color: #8BE9FD; }
  .hs-cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background: var(--accent);
    vertical-align: text-bottom;
    margin-left: 1px;
    animation: hsBlink 1s step-end infinite;
  }
  @keyframes hsBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ════════════════════════════════
     CTA SECTION
  ════════════════════════════════ */
  #hs-cta {
    background: var(--surface);
    border-top: 1px solid var(--border);
  }
  .hs-cta-inner {
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hs-cta-inner .hs-h2 { margin-bottom: 1rem; }
  .hs-cta-body {
    font-size: 1.05rem;
    color: var(--text3);
    line-height: 1.7;
    margin: 0 0 2.5rem;
    max-width: 520px;
  }
  .hs-install {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    max-width: 420px;
    padding: 14px 16px;
    background: var(--bg);
    border: 1px solid var(--border2);
    border-radius: 12px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--text1);
    margin-bottom: 2.5rem;
  }
  .hs-install-left {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow: hidden;
    min-width: 0;
    flex: 1;
  }
  .hs-install-prompt { color: var(--accent); flex-shrink: 0; font-weight: 700; }
  .hs-install-cmd { font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hs-install-btn {
    padding: 5px 12px;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--text3);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
    flex-shrink: 0;
    line-height: 1.5;
  }
  .hs-install-btn:hover { color: var(--text1); border-color: var(--text3); }
  .hs-cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useIntersect() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function MagCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
    ref.current.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
  };
  return <div ref={ref} onMouseMove={onMove}>{children}</div>;
}

function CodeHighlight({ tokens }: { tokens: { t: string; v: string }[] }) {
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.t === "kw")  return <span key={i} className="t-kw">{tok.v}</span>;
        if (tok.t === "fn")  return <span key={i} className="t-fn">{tok.v}</span>;
        if (tok.t === "str") return <span key={i} className="t-str">{tok.v}</span>;
        if (tok.t === "cm")  return <span key={i} className="t-cm">{tok.v}</span>;
        if (tok.t === "var") return <span key={i} className="t-var">{tok.v}</span>;
        return <span key={i}>{tok.v}</span>;
      })}
    </>
  );
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    href: "/features/hallucination-firewall",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "Hallucination Firewall",
    desc: "3-stage claim verification pipeline. 2.1% false-claim rate vs 18.3% raw LLM. Built for regulated industries where accuracy is non-negotiable.",
  },
  {
    href: "/features/async-reminders",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Proactive Reminder AI",
    desc: "The only framework that initiates contact. LLM drafts personalized follow-ups with full session context — no cron jobs, no boilerplate.",
  },
  {
    href: "/compliance",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18M14 9h4M14 15h4"/>
      </svg>
    ),
    title: "India-First Compliance",
    desc: "DPDP Act 2023 full implementation. GDPR included at no extra config. 2-year head start over frameworks built for Western defaults.",
  },
  {
    href: "/features/whatsapp",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h.01M12 10h.01M16 10h.01"/>
      </svg>
    ),
    title: "WhatsApp Native",
    desc: "Full webhook integration, session management, media handling — production-ready out of the box. No third-party library needed.",
  },
  {
    href: "/features/multi-agent",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    title: "Multi-Agent A2A",
    desc: "Google ADK, AutoGen, and CrewAI compatible. Build cross-framework agent pipelines without adapter hell.",
  },
  {
    href: "/features/multilingual",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "22+ Languages",
    desc: "Auto-detect and respond in Hindi, Tamil, Kannada, and 19+ more Indian and global languages. No manual locale config.",
  },
];

const METRICS = [
  {
    title: "Data Extraction Accuracy",
    value: "94.2%",
    tag: "SOTA Tier",
    delta: "+23.2pp over raw baseline",
    bars: [
      { name: "TrueNorth Engine", val: "94.2%", pct: 94.2, w: true },
      { name: "LangChain",        val: "76.0%", pct: 76.0, w: false },
      { name: "Raw GPT-4o",       val: "71.0%", pct: 71.0, w: false },
    ],
  },
  {
    title: "Hallucination Rate (Strict)",
    value: "2.1%",
    tag: "Zero-Trust Active",
    delta: "8.7× deflection factor",
    bars: [
      { name: "Raw GPT-4o",       val: "18.3%", pct: 100,  w: false },
      { name: "LangChain",        val: "14.5%", pct: 79,   w: false },
      { name: "TrueNorth Engine", val: "2.1%",  pct: 11.5, w: true  },
    ],
  },
  {
    title: "Compute Cost / 1,000 Intakes",
    value: "$4.30",
    tag: "Optimized Pipeline",
    delta: "89% budget reduction",
    bars: [
      { name: "Raw GPT-4o",       val: "$38.40", pct: 100,  w: false },
      { name: "LangChain",        val: "$35.20", pct: 91.7, w: false },
      { name: "TrueNorth Engine", val: "$4.30",  pct: 11.2, w: true  },
    ],
  },
];

type TokenList = { t: string; v: string }[];

const CODE_TOKENS: Record<string, TokenList> = {
  Python: [
    {t:"kw",v:"from"},{t:"tx",v:" truenorth "},{t:"kw",v:"import"},{t:"tx",v:" Engine, Schema\n\n"},
    {t:"var",v:"schema"},{t:"tx",v:" = "},{t:"fn",v:"Schema.load"},{t:"tx",v:"("},{t:"str",v:'"fitness_plan.yaml"'},{t:"tx",v:")\n"},
    {t:"var",v:"engine"},{t:"tx",v:" = "},{t:"fn",v:"Engine"},{t:"tx",v:"(schema="},{t:"var",v:"schema"},{t:"tx",v:', model='},{t:"str",v:'"gpt-4o-mini"'},{t:"tx",v:")\n\n"},
    {t:"var",v:"session"},{t:"tx",v:" = engine."},{t:"fn",v:"create_session"},{t:"tx",v:"(user_id="},{t:"str",v:'"priya_001"'},{t:"tx",v:")\n\n"},
    {t:"cm",v:"# Send a message\n"},
    {t:"var",v:"response"},{t:"tx",v:" = "},{t:"kw",v:"await"},{t:"tx",v:" engine."},{t:"fn",v:"chat"},{t:"tx",v:"(\n    session_id="},{t:"var",v:"session"},{t:"tx",v:".id,\n    message="},{t:"str",v:'"I\'m Priya, I want to lose weight"'},{t:"tx",v:"\n)\n\n"},
    {t:"fn",v:"print"},{t:"tx",v:"("},{t:"var",v:"response"},{t:"tx",v:".message)\n"},
    {t:"cm",v:'# → "Great Priya! How old are you?"'},
  ],
  TypeScript: [
    {t:"kw",v:"import"},{t:"tx",v:" { TrueNorth, Schema } "},{t:"kw",v:"from"},{t:"tx",v:" "},{t:"str",v:"'truenorth'"},{t:"tx",v:";\n\n"},
    {t:"kw",v:"const"},{t:"tx",v:" "},{t:"var",v:"schema"},{t:"tx",v:" = "},{t:"kw",v:"await"},{t:"tx",v:" Schema."},{t:"fn",v:"load"},{t:"tx",v:"("},{t:"str",v:"'fitness_plan.yaml'"},{t:"tx",v:");\n"},
    {t:"kw",v:"const"},{t:"tx",v:" "},{t:"var",v:"tn"},{t:"tx",v:" = "},{t:"kw",v:"new"},{t:"tx",v:" "},{t:"fn",v:"TrueNorth"},{t:"tx",v:"({ schema, model: "},{t:"str",v:"'gpt-4o-mini'"},{t:"tx",v:" });\n\n"},
    {t:"kw",v:"const"},{t:"tx",v:" "},{t:"var",v:"session"},{t:"tx",v:" = "},{t:"kw",v:"await"},{t:"tx",v:" tn."},{t:"fn",v:"createSession"},{t:"tx",v:"({ userId: "},{t:"str",v:"'priya_001'"},{t:"tx",v:" });\n\n"},
    {t:"cm",v:"// Send a message\n"},
    {t:"kw",v:"const"},{t:"tx",v:" "},{t:"var",v:"response"},{t:"tx",v:" = "},{t:"kw",v:"await"},{t:"tx",v:" tn."},{t:"fn",v:"chat"},{t:"tx",v:"({\n  sessionId: "},{t:"var",v:"session"},{t:"tx",v:".id,\n  message: "},{t:"str",v:'"I\'m Priya, I want to lose weight"'},{t:"tx",v:"\n});\n\n"},
    {t:"var",v:"console"},{t:"tx",v:"."},{t:"fn",v:"log"},{t:"tx",v:"("},{t:"var",v:"response"},{t:"tx",v:".message);\n"},
    {t:"cm",v:'// → "Great Priya! How old are you?"'},
  ],
  Go: [
    {t:"kw",v:"package"},{t:"tx",v:" main\n"},{t:"kw",v:"import"},{t:"tx",v:" "},{t:"str",v:'"github.com/amareshhebbar/truenorth/sdk"'},{t:"tx",v:"\n\n"},
    {t:"kw",v:"func"},{t:"tx",v:" "},{t:"fn",v:"main"},{t:"tx",v:"() {\n"},
    {t:"tx",v:"  "},{t:"var",v:"schema"},{t:"tx",v:", _ := truenorth."},{t:"fn",v:"LoadSchema"},{t:"tx",v:"("},{t:"str",v:'"fitness_plan.yaml"'},{t:"tx",v:")\n"},
    {t:"tx",v:"  "},{t:"var",v:"engine"},{t:"tx",v:" := truenorth."},{t:"fn",v:"NewEngine"},{t:"tx",v:"("},{t:"var",v:"schema"},{t:"tx",v:",\n    truenorth."},{t:"fn",v:"WithModel"},{t:"tx",v:"("},{t:"str",v:'"gpt-4o-mini"'},{t:"tx",v:"),\n  )\n\n"},
    {t:"tx",v:"  "},{t:"var",v:"session"},{t:"tx",v:", _ := "},{t:"var",v:"engine"},{t:"tx",v:"."},{t:"fn",v:"CreateSession"},{t:"tx",v:"("},{t:"str",v:'"priya_001"'},{t:"tx",v:")\n\n"},
    {t:"tx",v:"  "},{t:"var",v:"resp"},{t:"tx",v:", _ := "},{t:"var",v:"engine"},{t:"tx",v:"."},{t:"fn",v:"Chat"},{t:"tx",v:"("},{t:"var",v:"session"},{t:"tx",v:".ID,\n    "},{t:"str",v:'"I\'m Priya, I want to lose weight"'},{t:"tx",v:",\n  )\n"},
    {t:"tx",v:"  fmt."},{t:"fn",v:"Println"},{t:"tx",v:"("},{t:"var",v:"resp"},{t:"tx",v:".Message)\n}"},
  ],
};

const GH_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const ARROW = (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT 1 — FeaturesGrid
// ─────────────────────────────────────────────────────────────────────────────
export function FeaturesGrid() {
  const [sectionRef, visible] = useIntersect();

  return (
    <section
      id="hs-features"
      className="hs-section"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <style>{CSS}</style>
      <div className="hs-container">
        <div className={`hs-feat-header hs-fade ${visible ? "in" : ""}`}>
          <div className="hs-eyebrow green"><span className="hs-dot" />Platform Capabilities</div>
          <h2 className="hs-h2">
            What makes <span className="hs-grad-green">TrueNorth</span> different
          </h2>
          <p className="hs-h2-sub">
            Every feature exists because a production system demanded it.
          </p>
        </div>

        <div className="hs-feat-grid">
          {FEATURES.map((f, i) => (
            <MagCard key={f.title}>
              <Link
                href={f.href}
                className={`hs-feat-card hs-fade d${Math.min(i + 1, 6)} ${visible ? "in" : ""}`}
              >
                <div className="hs-feat-icon">{f.icon}</div>
                <p className="hs-feat-title">{f.title}</p>
                <p className="hs-feat-desc">{f.desc}</p>
                <span className="hs-feat-cta">
                  Explore
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            </MagCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT 2 — BenchmarksSection
// ─────────────────────────────────────────────────────────────────────────────
export function BenchmarksSection() {
  const [sectionRef, visible] = useIntersect();

  return (
    <section
      id="hs-benchmarks"
      className="hs-section"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="hs-container">
        <div className={`hs-bench-header hs-fade ${visible ? "in" : ""}`}>
          <div className="hs-eyebrow green"><span className="hs-dot" />System Audit · Harness v4.12</div>
          <h2 className="hs-h2">
            Hard data.<br />
            <span style={{ color: "var(--text3)", WebkitTextFillColor: "var(--text3)" }}>No synthetic buffer.</span>
          </h2>
          <p className="hs-h2-sub">
            Blind automated evaluation across 1,000 real production medical intakes. No cherry-picked runs.
          </p>
        </div>

        <div className="hs-bench-grid">
          {METRICS.map((m, mi) => (
            <div
              key={m.title}
              className={`hs-bench-card hs-fade d${mi + 1} ${visible ? "in" : ""}`}
            >
              <div className="hs-bench-top">
                <span className="hs-bench-label">{m.title}</span>
                <span className="hs-bench-idx">[0{mi + 1}/03]</span>
              </div>
              <div className="hs-bench-value">{m.value}</div>
              <span className="hs-bench-tag">{m.tag}</span>
              <p className="hs-bench-delta">↳ {m.delta}</p>
              <div className="hs-bench-bars">
                {m.bars.map((b, bi) => (
                  <div key={b.name} className="hs-bar-row">
                    <div className="hs-bar-labels">
                      <span className={`hs-bar-name${b.w ? " w" : ""}`}>{b.name}</span>
                      <span className={`hs-bar-val${b.w ? " w" : ""}`}>{b.val}</span>
                    </div>
                    <div className="hs-bar-track">
                      <div
                        className={`hs-bar-fill ${b.w ? "w" : "l"}`}
                        style={{
                          width: visible ? b.pct + "%" : "0%",
                          transitionDelay: `${mi * 0.1 + bi * 0.1 + 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hs-bench-foot">
          <span>Confidence threshold: p &lt; 0.01 · Automated run profile</span>
          <span>Environment: Production-mirror node cluster</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT 3 — SDKCarousel
// ─────────────────────────────────────────────────────────────────────────────
const SDK_TABS = ["Python", "TypeScript", "Go"] as const;

export function SDKCarousel() {
  const [active,  setActive]  = useState<0 | 1 | 2>(0);
  const [copied,  setCopied]  = useState(false);
  const [sectionRef, visible] = useIntersect();

  const RAW: Record<string, string> = {
    Python: `from truenorth import Engine, Schema\n\nschema = Schema.load("fitness_plan.yaml")\nengine = Engine(schema=schema, model="gpt-4o-mini")\n\nsession = engine.create_session(user_id="priya_001")\n\n# Send a message\nresponse = await engine.chat(\n    session_id=session.id,\n    message="I'm Priya, I want to lose weight"\n)\nprint(response.message)\n# → "Great Priya! How old are you?"`,
    TypeScript: `import { TrueNorth, Schema } from 'truenorth';\n\nconst schema = await Schema.load('fitness_plan.yaml');\nconst tn = new TrueNorth({ schema, model: 'gpt-4o-mini' });\n\nconst session = await tn.createSession({ userId: 'priya_001' });\n\n// Send a message\nconst response = await tn.chat({\n  sessionId: session.id,\n  message: "I'm Priya, I want to lose weight"\n});\nconsole.log(response.message);\n// → "Great Priya! How old are you?"`,
    Go: `package main\nimport "github.com/amareshhebbar/truenorth/sdk"\n\nfunc main() {\n  schema, _ := truenorth.LoadSchema("fitness_plan.yaml")\n  engine := truenorth.NewEngine(schema,\n    truenorth.WithModel("gpt-4o-mini"),\n  )\n  session, _ := engine.CreateSession("priya_001")\n  resp, _ := engine.Chat(session.ID,\n    "I'm Priya, I want to lose weight",\n  )\n  fmt.Println(resp.Message)\n}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW[SDK_TABS[active]]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hs-sdk"
      className="hs-section"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="hs-container">
        <div className="hs-sdk-layout">

          {/* Left — copy */}
          <div className={`hs-fade ${visible ? "in" : ""}`}>
            <div className="hs-eyebrow blue"><span className="hs-dot" />Developer Experience</div>
            <h2 className="hs-h2">
              One API.<br />
              <span className="hs-grad-blue">Any language.</span>
            </h2>
            <p className="hs-h2-sub">
              Identical interface across Python, TypeScript, and Go. Drop it into your existing stack in minutes — no framework lock-in, no adapter layer.
            </p>
            <div className="hs-sdk-copy-btns">
              <Link href="/docs" className="hs-btn-primary">
                View full docs {ARROW}
              </Link>
              <a
                href="https://pypi.org/project/truenorth"
                target="_blank"
                rel="noopener noreferrer"
                className="hs-btn-secondary"
              >
                PyPI package
              </a>
            </div>
          </div>

          {/* Right — code window */}
          <div className={`hs-fade d2 ${visible ? "in" : ""}`}>
            <div className="hs-sdk-tabs">
              {SDK_TABS.map((t, i) => (
                <button
                  key={t}
                  className={`hs-sdk-tab${active === i ? " active" : ""}`}
                  onClick={() => setActive(i as 0 | 1 | 2)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="hs-sdk-window">
              <div className="hs-sdk-titlebar">
                <div className="hs-sdk-dots">
                  <div className="hs-sdk-dot" style={{ background: "#FF5F56" }} />
                  <div className="hs-sdk-dot" style={{ background: "#FFBD2E" }} />
                  <div className="hs-sdk-dot" style={{ background: "#27C93F" }} />
                </div>
                <button className="hs-sdk-copy" onClick={handleCopy} type="button">
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <pre className="hs-sdk-pre">
                <code>
                  <CodeHighlight tokens={CODE_TOKENS[SDK_TABS[active]]} />
                  <span className="hs-cursor" />
                </code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT 4 — CTASection
// ─────────────────────────────────────────────────────────────────────────────
export function CTASection() {
  const [copied, setCopied] = useState(false);
  const [sectionRef, visible] = useIntersect();

  const handleCopy = () => {
    navigator.clipboard.writeText("pip install truenorth");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hs-cta"
      className="hs-section"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className={`hs-cta-inner hs-fade ${visible ? "in" : ""}`}>
        <div className="hs-eyebrow green"><span className="hs-dot" />Get Started</div>
        <h2 className="hs-h2">
          Build reliable AI.<br />
          <span className="hs-grad-green">Ship faster.</span>
        </h2>
        <p className="hs-cta-body">
          Join the developers building production-grade AI conversation systems with a framework that handles the hard parts.
        </p>

        <div className="hs-install">
          <div className="hs-install-left">
            <span className="hs-install-prompt">$</span>
            <span className="hs-install-cmd">pip install truenorth</span>
          </div>
          <button className="hs-install-btn" onClick={handleCopy} type="button">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div className="hs-cta-actions">
          <Link href="/docs" className="hs-btn-primary">
            Read the Docs {ARROW}
          </Link>
          <a
            href="https://github.com/amareshhebbar/TrueNorth"
            target="_blank"
            rel="noopener noreferrer"
            className="hs-btn-secondary"
          >
            {GH_ICON}
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}