import PageHeader from "../../components/PageHeader";
import Link from "next/link";

// ─── SHARED CSS ───────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  .fp-root *, .fp-root *::before, .fp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .fp-root {
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
  }
  .fp-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem);
    display: flex;
    flex-direction: column;
    gap: clamp(3.5rem, 7vw, 5rem);
  }
  .fp-section-title {
    font-size: clamp(1.4rem, 2.8vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin-bottom: 0.6rem;
  }
  .fp-section-sub {
    font-size: 0.95rem;
    color: #6B7A99;
    line-height: 1.65;
    max-width: 520px;
  }

  /* ── Points grid ── */
  .fp-points {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  .fp-point {
    background: #0C1018;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .fp-point-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .fp-point-title { font-size: 0.95rem; font-weight: 700; color: #FFFFFF; }
  .fp-point-desc  { font-size: 0.825rem; color: #6B7A99; line-height: 1.65; }

  /* ── Tags ── */
  .fp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .fp-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 7px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: #0C1018;
    border: 1px solid #1C2740;
    color: #6B7A99;
  }
  .fp-tag.hi {
    background: rgba(13,255,154,0.06);
    border-color: rgba(13,255,154,0.2);
    color: #0DFF9A;
  }

  /* ── Code block ── */
  .fp-code-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #1C2740;
  }
  .fp-code-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px;
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
  }
  .fp-code-filename {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    color: #6B7A99;
    display: flex; align-items: center; gap: 6px;
  }
  .fp-code-body {
    padding: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.775rem;
    line-height: 1.75;
    background: #07090F;
    overflow-x: auto;
  }
  .fp-ky  { color: #0DFF9A; }
  .fp-val { color: #8BE9FD; }
  .fp-str { color: #F1FA8C; }
  .fp-num { color: #BD93F9; }
  .fp-cm  { color: #6272A4; font-style: italic; }

  /* ── CTA ── */
  .fp-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding: clamp(2.5rem, 5vw, 4rem);
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 16px;
    text-align: center;
  }
  .fp-cta-title { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; }
  .fp-cta-sub   { font-size: 0.95rem; color: #6B7A99; max-width: 380px; line-height: 1.65; }
  .fp-cta-btns  { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 0.5rem; }
  .fp-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px;
    border-radius: 9px; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .fp-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 22px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .fp-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }

  /* ── Language grid (multilingual) ── */
  .fp-lang-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 8px;
  }
  .fp-lang-card {
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .fp-lang-name { font-size: 0.875rem; font-weight: 600; color: #C5CDD8; }
  .fp-lang-native { font-size: 0.8rem; color: #6B7A99; }

  /* ── Reminder flow (async-reminders) ── */
  .fp-flow {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
  }
  .fp-flow-step {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem 1.75rem;
    background: #0C1018;
    border-bottom: 1px solid #1C2740;
    position: relative;
  }
  .fp-flow-step:last-child { border-bottom: none; }
  .fp-flow-num {
    width: 28px; height: 28px; flex-shrink: 0;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    background: rgba(13,255,154,0.08);
    border: 1px solid rgba(13,255,154,0.2);
    color: #0DFF9A;
    margin-top: 1px;
  }
  .fp-flow-body {}
  .fp-flow-title { font-size: 0.9rem; font-weight: 700; color: #FFFFFF; margin-bottom: 4px; }
  .fp-flow-desc  { font-size: 0.825rem; color: #6B7A99; line-height: 1.6; }
`;

// ─── ICON HELPERS ─────────────────────────────────────────────────────────────
const WifiOff = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>
);
const Sync = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);
const Database = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const Globe = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const Bell = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const Chat = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const Arrow = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);


export default function MultilingualPage() {
  const ACCENT = "#BD93F9";
  const LANGUAGES = [
    { name: "Hindi",     native: "हिंदी",      hi: true },
    { name: "Tamil",     native: "தமிழ்",       hi: true },
    { name: "Kannada",   native: "ಕನ್ನಡ",       hi: true },
    { name: "Telugu",    native: "తెలుగు",      hi: true },
    { name: "Malayalam", native: "മലയാളം",     hi: true },
    { name: "Bengali",   native: "বাংলা",      hi: true },
    { name: "Marathi",   native: "मराठी",      hi: false },
    { name: "Gujarati",  native: "ગુજરાતી",     hi: false },
    { name: "Punjabi",   native: "ਪੰਜਾਬੀ",    hi: false },
    { name: "Urdu",      native: "اردو",        hi: false },
    { name: "Odia",      native: "ଓଡ଼ିଆ",       hi: false },
    { name: "Assamese",  native: "অসমীয়া",    hi: false },
    { name: "English",   native: "English",     hi: false },
    { name: "Spanish",   native: "Español",     hi: false },
    { name: "French",    native: "Français",    hi: false },
    { name: "Arabic",    native: "العربية",     hi: false },
    { name: "Mandarin",  native: "中文",         hi: false },
    { name: "Portuguese",native: "Português",   hi: false },
  ];
  const POINTS = [
    {
      icon: <Globe />, iconBg: "rgba(189,147,249,0.1)", iconBdr: "rgba(189,147,249,0.2)", iconClr: "#BD93F9",
      title: "Automatic language detection",
      desc: "TrueNorth detects the user's language on the first message and responds in kind — no locale config, no code changes.",
    },
    {
      icon: <Chat />, iconBg: "rgba(13,255,154,0.08)", iconBdr: "rgba(13,255,154,0.2)", iconClr: "#0DFF9A",
      title: "Mid-conversation switching",
      desc: "If the user switches language mid-session, TrueNorth follows them seamlessly. The extracted data stays typed and validated.",
    },
    {
      icon: <Database />, iconBg: "rgba(241,250,140,0.08)", iconBdr: "rgba(241,250,140,0.2)", iconClr: "#F1FA8C",
      title: "Normalised structured output",
      desc: "Regardless of input language, extracted values are normalised to your schema types in English-compatible JSON.",
    },
  ];
  return (
    <>
      <style>{CSS}</style>
      <PageHeader
        eyebrow="Multilingual"
        title="22+ languages. Auto-detect. Zero config."
        subtitle="Hindi, Tamil, Kannada, Telugu, Malayalam, Bengali — and 16 more. TrueNorth detects language automatically and responds in kind."
        breadcrumbs={[{ label: "Features", href: "/features" }, { label: "Multilingual" }]}
        accentColor={ACCENT}
      />
      <div className="fp-root">
        <div className="fp-container">

          <section>
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="fp-section-title">How it works</h2>
              <p className="fp-section-sub">Three capabilities that make multilingual support production-ready.</p>
            </div>
            <div className="fp-points">
              {POINTS.map((p, i) => (
                <div key={i} className="fp-point">
                  <div className="fp-point-icon" style={{ background: p.iconBg, border: `1px solid ${p.iconBdr}`, color: p.iconClr }}>{p.icon}</div>
                  <div className="fp-point-title">{p.title}</div>
                  <div className="fp-point-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="fp-section-title">Supported languages</h2>
              <p className="fp-section-sub">18 languages fully supported with more in beta.</p>
            </div>
            <div className="fp-lang-grid">
              {LANGUAGES.map((l, i) => (
                <div key={i} className="fp-lang-card" style={l.hi ? { borderColor: "rgba(189,147,249,0.2)" } : {}}>
                  <span className="fp-lang-name">{l.name}</span>
                  <span className="fp-lang-native">{l.native}</span>
                </div>
              ))}
            </div>
            <div className="fp-tags" style={{ marginTop: "1rem" }}>
              <span className="fp-tag hi">India-first</span>
              <span className="fp-tag">Auto-detect</span>
              <span className="fp-tag">Mid-conversation switching</span>
              <span className="fp-tag">DPDP 2023</span>
            </div>
          </section>

          <div className="fp-cta">
            <h2 className="fp-cta-title">Try multilingual extraction</h2>
            <p className="fp-cta-sub">Type in Hindi or Tamil in the playground and watch TrueNorth extract structured data correctly.</p>
            <div className="fp-cta-btns">
              <Link href="/playground" className="fp-btn-primary" style={{ background: ACCENT, color: "#000" }}>
                Open Playground <Arrow />
              </Link>
              <Link href="/docs/multilingual" className="fp-btn-secondary">Read the docs</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}