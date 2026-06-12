"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";

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


export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const canSubmit = email.trim() && status === "idle";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("submitting");
    await new Promise(r => setTimeout(r, 1000));
    setStatus("done");
  };

  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Stay Updated"
        title="Release Announcements"
        subtitle="No spam. Only releases. Max one email per month."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Newsletter" }]}
      />
      <div className="nl-root">
        <div className="nl-container">
          {status === "done" ? (
            <div className="nl-success">
              <div className="nl-success-icon">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="nl-success-title">You're in.</div>
              <div className="nl-success-sub">We'll notify you when a new version ships. That's it.</div>
            </div>
          ) : (
            <div className="nl-form">
              <div className="nl-what">
                <div className="nl-what-title">What you'll get</div>
                <div className="nl-what-items">
                  {[
                    "New version announcement with changelog highlights",
                    "Breaking changes flagged clearly",
                    "Notable community projects if any shipped that month",
                    "Nothing else. Ever.",
                  ].map((item, i) => (
                    <div key={i} className="nl-what-item">
                      <span className="nl-what-arrow">→</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="nl-input-row">
                <input
                  className="nl-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="you@company.com"
                  aria-label="Email address"
                />
                <button
                  className="nl-submit"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  type="button"
                >
                  {status === "submitting" ? "…" : "Subscribe"}
                </button>
              </div>
              <p className="nl-hint">Unsubscribe any time · Simple email list, not a CRM</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
