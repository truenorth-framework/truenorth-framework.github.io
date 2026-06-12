

export const DOCS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  /* ── Typography reset scoped to docs ── */
  .doc-article *, .doc-article *::before, .doc-article *::after { box-sizing: border-box; }

  .doc-article {
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #A8B4C8;
    line-height: 1.8;
  }

  /* ── Breadcrumb ── */
  .doc-breadcrumb {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }
  .doc-bc-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #263354; text-decoration: none; transition: color 0.15s;
  }
  .doc-bc-link:hover { color: #6B7A99; }
  .doc-bc-sep { color: #1C2740; font-size: 0.65rem; }
  .doc-bc-cur {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #6B7A99;
  }

  /* ── Headings ── */
  .doc-h1 {
    font-size: clamp(1.9rem, 5vw, 3rem);
    font-weight: 900; color: #FFFFFF;
    letter-spacing: -0.03em; line-height: 1.08;
    margin-bottom: 1rem;
  }
  .doc-lead {
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: #6B7A99; line-height: 1.75;
    margin-bottom: 2.5rem;
  }
  .doc-h2 {
    font-size: clamp(1.2rem, 2.5vw, 1.7rem);
    font-weight: 800; color: #FFFFFF;
    letter-spacing: -0.02em; line-height: 1.15;
    margin: 3rem 0 0.875rem;
    padding-top: 0.5rem;
    border-top: 1px solid #1C2740;
  }
  .doc-h2:first-of-type { border-top: none; }
  .doc-h3 {
    font-size: 1.05rem; font-weight: 700; color: #E0E8F0;
    letter-spacing: -0.01em;
    margin: 2rem 0 0.625rem;
  }

  /* ── Prose ── */
  .doc-p { font-size: 0.95rem; color: #A8B4C8; line-height: 1.8; margin-bottom: 1.25rem; }
  .doc-p:last-child { margin-bottom: 0; }
  .doc-strong { color: #E0E8F0; font-weight: 700; }
  .doc-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82em; font-weight: 700;
    color: #F1FA8C;
    background: rgba(241,250,140,0.06);
    border: 1px solid rgba(241,250,140,0.12);
    border-radius: 5px;
    padding: 1px 6px;
  }
  .doc-a { color: #0DFF9A; text-decoration: none; transition: opacity 0.15s; }
  .doc-a:hover { opacity: 0.75; }

  /* ── List ── */
  .doc-ul { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 8px; }
  .doc-li {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 0.9rem; color: #A8B4C8; line-height: 1.7;
  }
  .doc-li::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: #0DFF9A; flex-shrink: 0; margin-top: 0.62em;
  }

  /* ── Callout ── */
  .doc-callout {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 1.1rem 1.25rem;
    border-radius: 10px;
    margin: 1.5rem 0;
  }
  .doc-callout.info {
    background: rgba(13,255,154,0.04);
    border: 1px solid rgba(13,255,154,0.18);
    border-left: 3px solid #0DFF9A;
  }
  .doc-callout.warn {
    background: rgba(255,215,0,0.04);
    border: 1px solid rgba(255,215,0,0.18);
    border-left: 3px solid #FFD700;
  }
  .doc-callout.danger {
    background: rgba(255,107,53,0.04);
    border: 1px solid rgba(255,107,53,0.18);
    border-left: 3px solid #FF6B35;
  }
  .doc-callout-icon { flex-shrink: 0; margin-top: 1px; }
  .doc-callout-body {}
  .doc-callout-title { font-size: 0.82rem; font-weight: 700; margin-bottom: 3px; }
  .doc-callout.info   .doc-callout-title { color: #0DFF9A; }
  .doc-callout.warn   .doc-callout-title { color: #FFD700; }
  .doc-callout.danger .doc-callout-title { color: #FF6B35; }
  .doc-callout-text { font-size: 0.845rem; color: #A8B4C8; line-height: 1.65; }
  .doc-callout-text a { color: inherit; opacity: 0.85; }

  /* ── Blockquote ── */
  .doc-quote {
    border-left: 3px solid #0DFF9A;
    padding: 1rem 1.25rem;
    margin: 1.75rem 0;
    background: rgba(13,255,154,0.03);
    border-radius: 0 8px 8px 0;
  }
  .doc-quote-text { font-size: 1.05rem; font-style: italic; font-weight: 600; color: #FFFFFF; margin-bottom: 5px; }
  .doc-quote-attr { font-size: 0.78rem; color: #6B7A99; }

  /* ── Page footer nav ── */
  .doc-foot-nav {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem;
    margin-top: 3.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #1C2740;
  }
  .doc-foot-ctas {
    display: flex; gap: 10px; flex-wrap: wrap;
  }
  .doc-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px; background: #0DFF9A; color: #000;
    border-radius: 9px; border: none;
    font-family: 'Inter', sans-serif; font-size: 0.825rem; font-weight: 800;
    text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; line-height: 1;
  }
  .doc-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 0 20px rgba(13,255,154,0.2); }
  .doc-btn-secondary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 18px; background: transparent; color: #C5CDD8;
    border: 1px solid #263354; border-radius: 9px;
    font-family: 'Inter', sans-serif; font-size: 0.825rem; font-weight: 600;
    text-decoration: none; transition: background 0.15s, border-color 0.15s; line-height: 1;
  }
  .doc-btn-secondary:hover { background: #0E1420; border-color: #6B7A99; color: #FFFFFF; }
  .doc-edit-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: #263354; text-decoration: none; transition: color 0.15s;
  }
  .doc-edit-link:hover { color: #6B7A99; }

  /* ── Prev / Next navigation ── */
  .doc-page-nav {
    display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
    margin-top: 3rem; padding-top: 1.5rem;
    border-top: 1px solid #1C2740;
  }
  .doc-page-nav-link {
    display: flex; flex-direction: column; gap: 3px;
    padding: 12px 16px;
    background: #0C1018; border: 1px solid #1C2740; border-radius: 10px;
    text-decoration: none; transition: border-color 0.15s, background 0.15s;
    max-width: 48%;
  }
  .doc-page-nav-link:hover { border-color: rgba(13,255,154,0.25); background: #0E1520; }
  .doc-page-nav-link.next { margin-left: auto; text-align: right; }
  .doc-page-nav-dir {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #263354;
  }
  .doc-page-nav-label { font-size: 0.855rem; font-weight: 700; color: #C5CDD8; }
  .doc-page-nav-link:hover .doc-page-nav-label { color: #0DFF9A; }
`;

export default function DocStyles() {
  return <style>{DOCS_CSS}</style>;
}