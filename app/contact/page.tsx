// FILE: app/contact/page.tsx
"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .ct-root *, .ct-root *::before, .ct-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .ct-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(5rem, 10vw, 8rem);
  }
  .ct-container {
    max-width: 1000px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;
  }
  @media (max-width: 820px) { .ct-container { grid-template-columns: 1fr; gap: 3rem; } }

  .ct-col-title { font-size: 1.1rem; font-weight: 800; color: #FFFFFF; letter-spacing: -0.01em; margin-bottom: 1.25rem; }

  /* ── Channel list ── */
  .ct-channels { display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.75rem; }
  .ct-channel {
    display: flex; align-items: center; gap: 14px;
    padding: 1rem 1.25rem;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 10px;
    text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .ct-channel:hover { border-color: rgba(13,255,154,0.25); background: #0E1520; }
  .ct-ch-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    background: #111827;
    border: 1px solid #1C2740;
    color: #6B7A99;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .ct-channel:hover .ct-ch-icon { color: #0DFF9A; border-color: rgba(13,255,154,0.2); background: rgba(13,255,154,0.06); }
  .ct-ch-body { flex: 1; min-width: 0; }
  .ct-ch-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #263354; margin-bottom: 2px; }
  .ct-ch-value { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 700; color: #C5CDD8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ct-ch-desc  { font-size: 0.75rem; color: #6B7A99; margin-top: 1px; }
  .ct-ch-arrow { color: #263354; flex-shrink: 0; transition: color 0.15s, transform 0.15s; }
  .ct-channel:hover .ct-ch-arrow { color: #0DFF9A; transform: translateX(3px); }

  /* ── Enterprise strip ── */
  .ct-enterprise {
    padding: 1.25rem 1.5rem;
    background: rgba(255,107,53,0.04);
    border: 1px solid rgba(255,107,53,0.18);
    border-radius: 12px;
  }
  .ct-ent-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #FF6B35;
    margin-bottom: 0.5rem;
  }
  .ct-ent-desc { font-size: 0.82rem; color: #6B7A99; line-height: 1.65; margin-bottom: 0.75rem; }
  .ct-ent-link { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 700; color: #FF6B35; text-decoration: none; transition: opacity 0.15s; }
  .ct-ent-link:hover { opacity: 0.75; }

  /* ── Form ── */
  .ct-form { display: flex; flex-direction: column; gap: 1rem; }
  .ct-field-label { display: block; font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #263354; margin-bottom: 6px; }
  .ct-input, .ct-select, .ct-textarea {
    width: 100%;
    padding: 11px 14px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 9px;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: #FFFFFF;
    outline: none;
    transition: border-color 0.15s;
    caret-color: #0DFF9A;
  }
  .ct-input::placeholder, .ct-textarea::placeholder { color: #1E2E4A; }
  .ct-input:focus, .ct-select:focus, .ct-textarea:focus { border-color: rgba(13,255,154,0.3); }
  .ct-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' fill='none' stroke='%236B7A99' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; cursor: pointer; }
  .ct-textarea { resize: none; line-height: 1.6; }
  .ct-submit {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    width: 100%; padding: 12px 24px;
    background: #0DFF9A; color: #000;
    border: none; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 800;
    cursor: pointer; transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    line-height: 1;
  }
  .ct-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 24px rgba(13,255,154,0.2); }
  .ct-submit:disabled { opacity: 0.35; cursor: not-allowed; }

  /* ── Success state ── */
  .ct-success {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 3rem 2rem; text-align: center; gap: 1rem;
    background: rgba(13,255,154,0.04);
    border: 1px solid rgba(13,255,154,0.18);
    border-radius: 14px;
  }
  .ct-success-icon {
    width: 48px; height: 48px; border-radius: 50%;
    background: rgba(13,255,154,0.1); border: 1px solid rgba(13,255,154,0.25);
    display: flex; align-items: center; justify-content: center;
    color: #0DFF9A;
  }
  .ct-success-title { font-size: 1.25rem; font-weight: 800; color: #FFFFFF; }
  .ct-success-sub { font-size: 0.875rem; color: #6B7A99; }
`;

const CHANNELS = [
  {
    href: "mailto:founders@truenorth.ai",
    label: "Email",
    value: "founders@truenorth.ai",
    desc: "General questions, partnerships",
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    href: "https://github.com/amareshhebbar",
    label: "GitHub",
    value: "github.com/amareshhebbar",
    desc: "Code, issues, pull requests",
    icon: <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>,
  },
  {
    href: "https://twitter.com/truenorthai",
    label: "Twitter / X",
    value: "@truenorthai",
    desc: "Updates, announcements",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    href: "https://discord.gg/truenorth",
    label: "Discord",
    value: "discord.gg/truenorth",
    desc: "Community, real-time help",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>,
  },
  {
    href: "https://github.com/amareshhebbar/TrueNorth/discussions",
    label: "Discussions",
    value: "GitHub Discussions",
    desc: "Technical questions, ideas",
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>,
  },
];

const ARROW_ICON = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "General", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const canSubmit = form.name.trim() && form.email.trim() && form.message.trim() && status === "idle";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Questions, enterprise inquiries, bug reports, or just want to say hello — here's how to reach us."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Contact" }]}
      />
      <div className="ct-root">
        <div className="ct-container">

          {/* Left — Channels */}
          <div>
            <div className="ct-col-title">Reach Amaresh</div>
            <div className="ct-channels">
              {CHANNELS.map(ch => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="ct-channel"
                >
                  <div className="ct-ch-icon">{ch.icon}</div>
                  <div className="ct-ch-body">
                    <div className="ct-ch-label">{ch.label}</div>
                    <div className="ct-ch-value">{ch.value}</div>
                    <div className="ct-ch-desc">{ch.desc}</div>
                  </div>
                  <span className="ct-ch-arrow">{ARROW_ICON}</span>
                </a>
              ))}
            </div>
            <div className="ct-enterprise">
              <div className="ct-ent-label">For enterprise</div>
              <p className="ct-ent-desc">Compliance questions, custom deployment, DPDP consulting, volume licensing, or on-premise installation support.</p>
              <a href="mailto:founders@truenorth.ai?subject=Enterprise" className="ct-ent-link">
                founders@truenorth.ai — subject: "Enterprise" →
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="ct-col-title">Send a Message</div>
            {status === "sent" ? (
              <div className="ct-success">
                <div className="ct-success-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="ct-success-title">Message sent</div>
                <div className="ct-success-sub">We typically reply within 24 hours.</div>
              </div>
            ) : (
              <div className="ct-form">
                <div>
                  <label className="ct-field-label">Name</label>
                  <input className="ct-input" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" aria-label="Name" />
                </div>
                <div>
                  <label className="ct-field-label">Email</label>
                  <input className="ct-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@company.com" aria-label="Email" />
                </div>
                <div>
                  <label className="ct-field-label">Type</label>
                  <select className="ct-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})} aria-label="Message type">
                    {["General", "Bug Report", "Feature Request", "Enterprise", "Partnership"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="ct-field-label">Message</label>
                  <textarea className="ct-textarea" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us what's on your mind..." aria-label="Message" />
                </div>
                <button className="ct-submit" onClick={handleSubmit} disabled={!canSubmit} type="button">
                  {status === "sending" ? "Sending…" : <>Send Message {ARROW_ICON}</>}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}