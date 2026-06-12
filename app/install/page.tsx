"use client";

import { useState } from "react";
import Link from "next/link";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .ip-root *, .ip-root *::before, .ip-root *::after,
  .nl-root *, .nl-root *::before, .nl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ═══════════════════════════════
     INSTALL PAGE
  ═══════════════════════════════ */
  .ip-root {
    min-height: 100vh;
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(5rem, 10vw, 7rem) clamp(1.5rem, 5vw, 3rem);
  }
  .ip-container { max-width: 560px; width: 100%; }

  .ip-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: #0DFF9A;
    margin-bottom: 1rem; display: block;
  }
  .ip-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 900; color: #FFFFFF;
    letter-spacing: -0.03em; line-height: 1.05;
    margin-bottom: 0.75rem;
  }
  .ip-sub { font-size: 0.95rem; color: #6B7A99; margin-bottom: 2.5rem; }

  .ip-cmds { display: flex; flex-direction: column; gap: 8px; margin-bottom: 2.5rem; }
  .ip-cmd {
    display: flex; align-items: center; gap: 0;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 11px;
    overflow: hidden;
    transition: border-color 0.15s;
  }
  .ip-cmd:hover { border-color: #263354; }
  .ip-lang {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0 16px;
    min-width: 80px; flex-shrink: 0;
    border-right: 1px solid #1C2740;
    align-self: stretch;
    display: flex; align-items: center;
  }
  .ip-code {
    flex: 1; min-width: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem; font-weight: 700;
    color: #F1FA8C;
    padding: 14px 16px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ip-copy {
    padding: 0 14px; align-self: stretch;
    display: flex; align-items: center;
    background: transparent; border: none; border-left: 1px solid #1C2740;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em;
    color: #263354; cursor: pointer;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap; flex-shrink: 0;
  }
  .ip-copy:hover { color: #0DFF9A; background: rgba(13,255,154,0.04); }
  .ip-copy.copied { color: #0DFF9A; }

  .ip-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
  .ip-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px; background: #0DFF9A; color: #000;
    border-radius: 9px; border: none;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .ip-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 24px rgba(13,255,154,0.25); }
  .ip-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 22px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .ip-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }

  /* ═══════════════════════════════
     NEWSLETTER PAGE
  ═══════════════════════════════ */
  .nl-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .nl-container { max-width: 560px; margin: 0 auto; }

  .nl-what {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .nl-what-title { font-size: 0.875rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; }
  .nl-what-items { display: flex; flex-direction: column; gap: 8px; }
  .nl-what-item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.845rem; color: #A8B4C8; line-height: 1.55; }
  .nl-what-arrow { color: #0DFF9A; flex-shrink: 0; margin-top: 2px; font-size: 0.7rem; }

  .nl-form { display: flex; flex-direction: column; gap: 1rem; }
  .nl-input-row { display: flex; gap: 8px; }
  .nl-input {
    flex: 1; padding: 12px 14px;
    background: #0C1018; border: 1px solid #1C2740; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #FFFFFF;
    outline: none; caret-color: #0DFF9A; transition: border-color 0.15s;
  }
  .nl-input::placeholder { color: #1E2E4A; }
  .nl-input:focus { border-color: rgba(13,255,154,0.3); }
  .nl-submit {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    padding: 12px 22px; background: #0DFF9A; color: #000;
    border: none; border-radius: 9px; flex-shrink: 0;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    cursor: pointer; transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s; line-height: 1;
  }
  .nl-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 20px rgba(13,255,154,0.2); }
  .nl-submit:disabled { opacity: 0.35; cursor: not-allowed; }
  .nl-hint { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: #263354; text-align: center; letter-spacing: 0.04em; }

  .nl-success {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem;
    padding: 3rem 2rem;
    background: rgba(13,255,154,0.04);
    border: 1px solid rgba(13,255,154,0.18);
    border-radius: 14px;
  }
  .nl-success-icon { width: 52px; height: 52px; border-radius: 50%; background: rgba(13,255,154,0.1); border: 1px solid rgba(13,255,154,0.25); display: flex; align-items: center; justify-content: center; color: #0DFF9A; }
  .nl-success-title { font-size: 1.5rem; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .nl-success-sub { font-size: 0.875rem; color: #6B7A99; }
`;

// ─── INSTALL PAGE ─────────────────────────────────────────────────────────────
const CMDS = [
  { lang: "Python",  color: "#FFD700", cmd: "pip install truenorth-framework" },
  { lang: "Node.js", color: "#0DFF9A", cmd: "npm install truenorth" },
  { lang: "Go",      color: "#00ADD8", cmd: "go get github.com/amareshhebbar/truenorth-go" },
  { lang: "Expo",    color: "#4D9EFF", cmd: "npx expo install truenorth-expo" },
];

const ARROW = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function InstallPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="ip-root">
        <div className="ip-container">
          <span className="ip-eyebrow">Quick install</span>
          <h1 className="ip-title">Install TrueNorth</h1>
          <p className="ip-sub">Choose your language. One command. Done.</p>

          <div className="ip-cmds">
            {CMDS.map(({ lang, color, cmd }) => (
              <div key={lang} className="ip-cmd">
                <span className="ip-lang" style={{ color }}>{lang}</span>
                <code className="ip-code">{cmd}</code>
                <button
                  className={`ip-copy${copied === lang ? " copied" : ""}`}
                  onClick={() => copy(cmd, lang)}
                  type="button"
                  aria-label={`Copy ${lang} install command`}
                >
                  {copied === lang ? "✓ Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>

          <div className="ip-actions">
            <Link href="/docs/quickstart" className="ip-btn-primary">
              Read Quickstart {ARROW}
            </Link>
            <Link href="/docs" className="ip-btn-secondary">Full Docs</Link>
          </div>
        </div>
      </div>
    </>
  );
}