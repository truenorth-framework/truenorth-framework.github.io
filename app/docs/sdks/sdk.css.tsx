const SDK_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

.sdk-article *, .sdk-article *::before, .sdk-article *::after { box-sizing: border-box; margin: 0; padding: 0; }

.sdk-article {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #A8B4C8;
  line-height: 1.8;
}

.sdk-bc { display: flex; align-items: center; gap: 7px; margin-bottom: 2.5rem; flex-wrap: wrap; }
.sdk-bc-link { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #263354; text-decoration: none; transition: color 0.15s; }
.sdk-bc-link:hover { color: #6B7A99; }
.sdk-bc-sep { color: #1C2740; font-size: 0.65rem; }
.sdk-bc-lang { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }

.sdk-tags { display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; flex-wrap: wrap; }
.sdk-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem; font-weight: 700; padding: 4px 10px;
  border-radius: 100px; letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid; line-height: 1;
}
.sdk-tag-plain {
  font-size: 0.72rem; color: #6B7A99;
}

.sdk-h1 { font-size: clamp(1.9rem, 5vw, 3rem); font-weight: 900; color: #FFFFFF; letter-spacing: -0.03em; line-height: 1.08; margin-bottom: 1rem; }
.sdk-lead { font-size: clamp(1rem, 2vw, 1.1rem); color: #6B7A99; line-height: 1.75; margin-bottom: 2.5rem; max-width: 640px; }
.sdk-h2 { font-size: clamp(1.15rem, 2.5vw, 1.6rem); font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; margin: 2.75rem 0 0.875rem; padding-top: 0.5rem; border-top: 1px solid #1C2740; }
.sdk-h2:first-of-type { border-top: none; }

.sdk-p { font-size: 0.9rem; color: #A8B4C8; line-height: 1.8; margin-bottom: 1.1rem; }
.sdk-p:last-child { margin-bottom: 0; }
.sdk-code {
  font-family: 'JetBrains Mono', monospace; font-size: 0.82em; font-weight: 700;
  color: #F1FA8C; background: rgba(241,250,140,0.06);
  border: 1px solid rgba(241,250,140,0.12); border-radius: 5px; padding: 1px 6px;
}
.sdk-a { color: #0DFF9A; text-decoration: none; transition: opacity 0.15s; }
.sdk-a:hover { opacity: 0.75; }

.sdk-callout {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 1rem 1.25rem; border-radius: 10px; margin: 1.5rem 0;
}
.sdk-callout.info   { background: rgba(13,255,154,0.04); border: 1px solid rgba(13,255,154,0.18); border-left: 3px solid #0DFF9A; }
.sdk-callout.warn   { background: rgba(255,107,53,0.04); border: 1px solid rgba(255,107,53,0.18); border-left: 3px solid #FF6B35; }
.sdk-callout-icon { flex-shrink: 0; margin-top: 1px; }
.sdk-callout-title { font-size: 0.8rem; font-weight: 700; margin-bottom: 3px; }
.sdk-callout.info .sdk-callout-title { color: #0DFF9A; }
.sdk-callout.warn .sdk-callout-title { color: #FF6B35; }
.sdk-callout-text { font-size: 0.845rem; color: #A8B4C8; line-height: 1.65; }

.sdk-ul { list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 7px; }
.sdk-li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.875rem; color: #A8B4C8; line-height: 1.65; }
.sdk-li::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: #0DFF9A; flex-shrink: 0; margin-top: 0.62em; }

.sdk-table-wrap { border-radius: 12px; overflow: hidden; border: 1px solid #1C2740; overflow-x: auto; margin: 1.5rem 0; }
.sdk-table { width: 100%; border-collapse: collapse; font-size: 0.845rem; min-width: 540px; }
.sdk-table thead tr { background: #0A0D14; border-bottom: 1px solid #1C2740; }
.sdk-table th { padding: 10px 14px; text-align: left; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #263354; white-space: nowrap; }
.sdk-table td { padding: 10px 14px; border-bottom: 1px solid #0E1420; line-height: 1.5; vertical-align: top; }
.sdk-table tbody tr:last-child td { border-bottom: none; }
.sdk-table tbody tr { background: #080B12; transition: background 0.12s; }
.sdk-table tbody tr:hover { background: #0C1018; }
.sdk-td-method { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; font-weight: 700; color: #50FA7B; }
.sdk-td-param  { font-size: 0.82rem; color: #A8B4C8; }
.sdk-td-ret    { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #8BE9FD; }

.sdk-page-nav { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-top: 3.5rem; padding-top: 1.5rem; border-top: 1px solid #1C2740; }
.sdk-nav-link { display: flex; flex-direction: column; gap: 3px; padding: 12px 16px; background: #0C1018; border: 1px solid #1C2740; border-radius: 10px; text-decoration: none; transition: border-color 0.15s, background 0.15s; max-width: 48%; }
.sdk-nav-link:hover { border-color: rgba(13,255,154,0.25); background: #0E1520; }
.sdk-nav-link.next { margin-left: auto; text-align: right; }
.sdk-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #263354; }
.sdk-nav-label { font-size: 0.855rem; font-weight: 700; color: #C5CDD8; }
.sdk-nav-link:hover .sdk-nav-label { color: #0DFF9A; }

.sdk-edit { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #263354; text-decoration: none; transition: color 0.15s; }
.sdk-edit:hover { color: #6B7A99; }

`
export default SDK_CSS;