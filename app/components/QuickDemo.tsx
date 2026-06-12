"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .qd-root *, .qd-root *::before, .qd-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .qd-root {
    position: relative;
    width: 100%;
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem);
    border-top: 1px solid #1C2740;
  }

  .qd-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw; max-width: 900px; height: 50vh;
    background: radial-gradient(ellipse, rgba(13,255,154,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .qd-container {
    position: relative; z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  /* ── Header ── */
  .qd-header {
    text-align: center;
    margin-bottom: clamp(3rem, 6vw, 4.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .qd-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 100px;
    background: rgba(13,255,154,0.07);
    border: 1px solid rgba(13,255,154,0.2);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    color: #0DFF9A;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .qd-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #0DFF9A;
    animation: qdPulse 2s infinite;
  }
  @keyframes qdPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .qd-title {
    font-size: clamp(1.9rem, 4vw, 3.25rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.025em;
    color: #FFFFFF;
    margin-bottom: 1rem;
  }
  .qd-title-accent {
    background: linear-gradient(135deg, #0DFF9A 0%, #00C4FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .qd-sub {
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    color: #6B7A99;
    line-height: 1.7;
    max-width: 520px;
  }

  /* ── Two-pane layout ── */
  .qd-panes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: start;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
  }
  .qd-panes.in { opacity: 1; transform: none; }
  @media (max-width: 820px) {
    .qd-panes { grid-template-columns: 1fr; }
  }

  /* ── Shared pane shell ── */
  .qd-pane {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 520px;
  }
  @media (max-width: 820px) {
    .qd-pane { height: auto; min-height: 380px; max-height: 500px; }
  }

  /* ── Pane titlebar ── */
  .qd-titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px;
    background: #080D15;
    border-bottom: 1px solid #1C2740;
    flex-shrink: 0;
  }
  .qd-dots { display: flex; gap: 6px; align-items: center; }
  .qd-dot { width: 11px; height: 11px; border-radius: 50%; }
  .qd-filename {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    color: #6B7A99;
    background: rgba(255,255,255,0.04);
    border: 1px solid #1C2740;
    padding: 4px 10px;
    border-radius: 6px;
  }
  .qd-spacer { width: 52px; }

  /* ── YAML editor body ── */
  .qd-editor-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
  }
  .qd-line-nums {
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    background: #080D15;
    border-right: 1px solid #1C2740;
    min-width: 44px;
    flex-shrink: 0;
    user-select: none;
  }
  .qd-ln {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    line-height: 1.65;
    color: #2A3550;
    text-align: right;
    padding: 0 10px;
  }
  .qd-code-area {
    flex: 1;
    padding: 16px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    line-height: 1.65;
    overflow-x: auto;
    white-space: pre;
    color: #C9D1D9;
    min-width: 0;
  }
  .qd-ky  { color: #0DFF9A; }
  .qd-val { color: #8BE9FD; }
  .qd-str { color: #F1FA8C; }
  .qd-num { color: #BD93F9; }
  .qd-li  { color: #FF9E64; }
  .qd-cm  { color: #6272A4; }
  .qd-bl-cursor {
    display: inline-block;
    width: 7px; height: 0.9em;
    background: #0DFF9A;
    vertical-align: text-bottom;
    animation: qdBlink 0.9s step-end infinite;
  }
  @keyframes qdBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── Chat pane ── */
  .qd-chat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #080D15;
    border-bottom: 1px solid #1C2740;
    flex-shrink: 0;
  }
  .qd-chat-avatar {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: rgba(13,255,154,0.1);
    border: 1px solid rgba(13,255,154,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #0DFF9A;
    flex-shrink: 0;
  }
  .qd-chat-name { font-size: 0.875rem; font-weight: 600; color: #FFFFFF; line-height: 1; }
  .qd-chat-status {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.7rem; color: #0DFF9A; margin-top: 3px;
  }
  .qd-status-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #0DFF9A;
    animation: qdPulse 2s infinite;
  }
  .qd-chat-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;
  }
  @keyframes qdSlideIn {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .qd-msg { display: flex; gap: 8px; animation: qdSlideIn 0.25s ease-out forwards; }
  .qd-msg.user { flex-direction: row-reverse; }
  .qd-msg-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    flex-shrink: 0; margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
  }
  .qd-msg-avatar.bot  { background: #0DFF9A; color: #000; }
  .qd-msg-avatar.user { background: #1C2740; color: #6B7A99; }
  .qd-bubble {
    max-width: 82%;
    padding: 9px 13px;
    border-radius: 12px;
    font-size: 0.825rem;
    line-height: 1.55;
  }
  .qd-bubble.bot  {
    background: #111827;
    color: #C5CDD8;
    border: 1px solid #1C2740;
    border-top-left-radius: 3px;
  }
  .qd-bubble.user {
    background: #0DFF9A;
    color: #000;
    font-weight: 600;
    border-top-right-radius: 3px;
  }
  /* Typing dots */
  .qd-typing {
    display: flex; gap: 5px; align-items: center;
    padding: 10px 14px;
    background: #111827;
    border: 1px solid #1C2740;
    border-radius: 12px; border-top-left-radius: 3px;
    width: fit-content;
    animation: qdSlideIn 0.25s ease-out forwards;
  }
  .qd-typing span {
    width: 5px; height: 5px; border-radius: 50%;
    background: #6B7A99;
    animation: qdBounce 1.2s ease-in-out infinite;
  }
  .qd-typing span:nth-child(2) { animation-delay: 0.15s; }
  .qd-typing span:nth-child(3) { animation-delay: 0.30s; }
  @keyframes qdBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }

  /* Extraction card */
  .qd-extraction {
    margin: 4px 0 0;
    padding: 13px 14px;
    border-radius: 10px;
    background: rgba(13,255,154,0.05);
    border: 1px solid rgba(13,255,154,0.2);
    animation: qdSlideIn 0.4s ease-out forwards;
    position: relative;
    overflow: hidden;
  }
  .qd-extraction::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #0DFF9A;
  }
  .qd-extraction-head {
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 9px; padding-left: 10px;
  }
  .qd-extraction-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0DFF9A;
  }
  .qd-extraction-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    line-height: 1.65;
    padding-left: 10px;
  }
  .qd-ek  { color: #8BE9FD; }
  .qd-ev  { color: #F1FA8C; }
  .qd-en  { color: #BD93F9; }

  /* Chat footer */
  .qd-chat-footer {
    padding: 12px 14px;
    border-top: 1px solid #1C2740;
    background: #080D15;
    flex-shrink: 0;
  }
  .qd-playground-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(13,255,154,0.3);
    background: transparent;
    color: #0DFF9A;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.825rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    line-height: 1;
  }
  .qd-playground-btn:hover {
    background: #0DFF9A;
    border-color: #0DFF9A;
    color: #000;
  }
`;

// ─── YAML DATA ─────────────────────────────────────────────────────────────────
const YAML_LINES = [
  { type: "key",  content: "id",             val: " fitness_plan"          },
  { type: "key",  content: "persona",        val: ` "You are a friendly fitness coach."` },
  { type: "plain",content: "fields:"                                        },
  { type: "li",   content: "  - name:",      val: " full_name"             },
  { type: "key",  content: "    type:",      val: " text"                  },
  { type: "key",  content: "    required:",  val: " true"                  },
  { type: "key",  content: "    question:",  val: ` "What's your full name?"` },
  { type: "li",   content: "  - name:",      val: " age"                   },
  { type: "key",  content: "    type:",      val: " integer"               },
  { type: "key",  content: "    range:",     val: " [16, 90]"              },
  { type: "key",  content: "    question:",  val: ` "How old are you?"`    },
  { type: "li",   content: "  - name:",      val: " goal"                  },
  { type: "key",  content: "    type:",      val: " enum"                  },
  { type: "key",  content: "    options:",   val: " [weight_loss, muscle_gain, endurance]" },
  { type: "key",  content: "    question:",  val: ` "What's your primary goal?"` },
  { type: "li",   content: "  - name:",      val: " weekly_hours"          },
  { type: "key",  content: "    type:",      val: " float"                 },
  { type: "key",  content: "    question:",  val: ` "Hours per week for training?"` },
  { type: "blank",content: ""                                              },
  { type: "key",  content: "output_template:", val: " fitness_plan_v1"    },
];

// Build the full string for typing
const YAML_FULL = YAML_LINES.map(l => l.type === "blank" ? "" : (l.content + (l.val || ""))).join("\n");

// ─── CHAT DATA ─────────────────────────────────────────────────────────────────
const CHAT = [
  { role: "bot",  text: "Hi! I'm your fitness coach. What's your full name?" },
  { role: "user", text: "I'm Priya"                                           },
  { role: "bot",  text: "Great Priya! How old are you?"                       },
  { role: "user", text: "28"                                                   },
  { role: "bot",  text: "What's your primary goal — weight loss, muscle gain, or endurance?" },
  { role: "user", text: "Muscle gain"                                          },
  { role: "bot",  text: "Perfect! How many hours per week can you dedicate?" },
];

// ─── YAML RENDERER ────────────────────────────────────────────────────────────
function renderYamlLine(raw: string) {
  const colonIdx = raw.indexOf(":");
  if (raw.trim().startsWith("-")) {
    const parts = raw.split(":");
    return (
      <>
        <span className="qd-li">{parts[0]}:</span>
        {parts.slice(1).join(":") && <span className="qd-str">{parts.slice(1).join(":")}</span>}
      </>
    );
  }
  if (colonIdx > -1) {
    const key = raw.slice(0, colonIdx + 1);
    const val = raw.slice(colonIdx + 1);
    const valTrimmed = val.trim();
    const isStr = valTrimmed.startsWith('"') || valTrimmed.startsWith("'");
    const isNum = !isStr && !isNaN(Number(valTrimmed)) && valTrimmed !== "";
    const isBool = valTrimmed === "true" || valTrimmed === "false";
    return (
      <>
        <span className="qd-ky">{key}</span>
        {isStr  && <span className="qd-str">{val}</span>}
        {isNum  && <span className="qd-num">{val}</span>}
        {isBool && <span className="qd-num">{val}</span>}
        {!isStr && !isNum && !isBool && val && <span className="qd-val">{val}</span>}
      </>
    );
  }
  if (raw.trim() === "fields:") return <span className="qd-ky">{raw}</span>;
  return <span>{raw}</span>;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function QuickDemo() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [inView,      setInView]      = useState(false);
  const [started,     setStarted]     = useState(false);
  const [typedLen,    setTypedLen]    = useState(0);
  const [yamlDone,    setYamlDone]    = useState(false);
  const [msgCount,    setMsgCount]    = useState(0);
  const [showTyping,  setShowTyping]  = useState(false);
  const [showOutput,  setShowOutput]  = useState(false);

  // Intersection
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // YAML typing
  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    let i = 0;
    const iv = setInterval(() => {
      i += 2;
      setTypedLen(Math.min(i, YAML_FULL.length));
      if (i >= YAML_FULL.length) { clearInterval(iv); setTimeout(() => setYamlDone(true), 400); }
    }, 16);
    return () => clearInterval(iv);
  }, [inView, started]);

  // Chat sequence
  useEffect(() => {
    if (!yamlDone) return;
    let idx = 0;
    const next = () => {
      if (idx >= CHAT.length) { setTimeout(() => setShowOutput(true), 700); return; }
      if (CHAT[idx].role === "bot") {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setMsgCount(idx + 1);
          idx++;
          setTimeout(next, CHAT[idx - 1] && CHAT[idx - 1].role === "user" ? 600 : 900);
        }, 900);
      } else {
        setMsgCount(idx + 1);
        idx++;
        setTimeout(next, 500);
      }
    };
    const t = setTimeout(next, 400);
    return () => clearTimeout(t);
  }, [yamlDone]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [msgCount, showTyping, showOutput]);

  // Rendered YAML lines
  const displayedText = YAML_FULL.slice(0, typedLen);
  const displayedLines = displayedText.split("\n");
  const totalLines = YAML_FULL.split("\n").length;

  const BOT_ICON = (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );
  const USER_ICON = (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
  const FILE_ICON = (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
      <path d="M13 2v7h7"/>
    </svg>
  );

  return (
    <>
      <style>{CSS}</style>
      <section className="qd-root" ref={sectionRef}>
        <div className="qd-glow" />
        <div className="qd-container">

          {/* Header */}
          <div className="qd-header">
            <div className="qd-eyebrow"><span className="qd-eyebrow-dot" />Live Engine Demo</div>
            <h2 className="qd-title">
              YAML in.{" "}
              <span className="qd-title-accent">Structured out.</span>
            </h2>
            <p className="qd-sub">
              Write your schema once. TrueNorth handles extraction, safety rails, and user interaction automatically.
            </p>
          </div>

          {/* Panes */}
          <div className={`qd-panes ${inView ? "in" : ""}`}>

            {/* LEFT — YAML editor */}
            <div className="qd-pane">
              <div className="qd-titlebar">
                <div className="qd-dots">
                  <div className="qd-dot" style={{ background: "#FF5F56" }} />
                  <div className="qd-dot" style={{ background: "#FFBD2E" }} />
                  <div className="qd-dot" style={{ background: "#27C93F" }} />
                </div>
                <div className="qd-filename">{FILE_ICON}fitness_plan.yaml</div>
                <div className="qd-spacer" />
              </div>
              <div className="qd-editor-body">
                <div className="qd-line-nums">
                  {Array.from({ length: Math.max(totalLines, displayedLines.length) }, (_, i) => (
                    <div key={i} className="qd-ln">{i + 1}</div>
                  ))}
                </div>
                <div className="qd-code-area">
                  {displayedLines.map((line, i) => (
                    <div key={i} style={{ minHeight: "1.3em" }}>
                      {renderYamlLine(line)}
                      {i === displayedLines.length - 1 && !yamlDone && (
                        <span className="qd-bl-cursor" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Chat */}
            <div className="qd-pane">
              <div className="qd-chat-header">
                <div className="qd-chat-avatar">{BOT_ICON}</div>
                <div>
                  <div className="qd-chat-name">TrueNorth Agent</div>
                  <div className="qd-chat-status">
                    <span className="qd-status-dot" />
                    Online
                  </div>
                </div>
              </div>

              <div className="qd-chat-body" ref={chatBodyRef}>
                {CHAT.slice(0, msgCount).map((msg, i) => (
                  <div key={i} className={`qd-msg ${msg.role}`}>
                    <div className={`qd-msg-avatar ${msg.role}`}>
                      {msg.role === "bot" ? BOT_ICON : USER_ICON}
                    </div>
                    <div className={`qd-bubble ${msg.role}`}>{msg.text}</div>
                  </div>
                ))}

                {showTyping && (
                  <div className="qd-msg bot">
                    <div className="qd-msg-avatar bot">{BOT_ICON}</div>
                    <div className="qd-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}

                {showOutput && (
                  <div className="qd-extraction">
                    <div className="qd-extraction-head">
                      <svg width="12" height="12" fill="none" stroke="#0DFF9A" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span className="qd-extraction-label">Extraction Complete</span>
                    </div>
                    <div className="qd-extraction-code">
                      <div><span className="qd-ek">"full_name"</span><span style={{color:"#6B7A99"}}>: </span><span className="qd-ev">"Priya"</span>,</div>
                      <div><span className="qd-ek">"age"</span><span style={{color:"#6B7A99"}}>: </span><span className="qd-en">28</span>,</div>
                      <div><span className="qd-ek">"goal"</span><span style={{color:"#6B7A99"}}>: </span><span className="qd-ev">"muscle_gain"</span></div>
                    </div>
                  </div>
                )}
                <div style={{ height: 4 }} />
              </div>

              <div className="qd-chat-footer">
                <Link href="/playground" className="qd-playground-btn">
                  Try it in Playground
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}