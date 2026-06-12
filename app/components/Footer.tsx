import Link from "next/link";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  .ft-root *, .ft-root *::before, .ft-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ft-root {
    width: 100%;
    background: #05080F;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    border-top: 1px solid #1C2740;
  }

  /* ── Top accent line ── */
  .ft-topbar {
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg,
      transparent 0%,
      #0DFF9A 30%,
      #4D9EFF 60%,
      transparent 100%
    );
    opacity: 0.5;
  }

  /* ── Main wrapper ── */
  .ft-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(3.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 3rem) 0;
  }

  /* ── Upper zone: brand + columns ── */
  .ft-upper {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 4rem;
    padding-bottom: clamp(3rem, 6vw, 4rem);
    border-bottom: 1px solid #1C2740;
  }
  @media (max-width: 860px) {
    .ft-upper { grid-template-columns: 1fr; gap: 2.5rem; }
  }

  /* ── Brand column ── */
  .ft-brand { display: flex; flex-direction: column; gap: 0; }

  .ft-logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    margin-bottom: 1.25rem;
  }
  .ft-logo-needle {
    transform-origin: 15px 15px;
    transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
  }
  .ft-logo:hover .ft-logo-needle { transform: rotate(45deg); }
  .ft-logo-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.05rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    transition: color 0.2s;
  }
  .ft-logo:hover .ft-logo-text { color: #0DFF9A; }

  .ft-tagline {
    font-size: 0.9rem;
    color: #6B7A99;
    line-height: 1.65;
    margin-bottom: 1.75rem;
    max-width: 240px;
  }

  /* Pill tags */
  .ft-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 2rem;
  }
  .ft-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6B7A99;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 6px;
    padding: 4px 9px;
    line-height: 1;
  }
  .ft-pill.accent {
    color: #0DFF9A;
    background: rgba(13,255,154,0.06);
    border-color: rgba(13,255,154,0.2);
  }

  /* Social icons */
  .ft-socials {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .ft-social-btn {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 9px;
    background: #0C1018;
    border: 1px solid #1C2740;
    color: #6B7A99;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
  }
  .ft-social-btn:hover {
    background: #111827;
    border-color: #263354;
    color: #FFFFFF;
    transform: translateY(-2px);
  }
  .ft-social-btn.gh:hover { color: #FFFFFF; }
  .ft-social-btn.tw:hover { color: #1D9BF0; border-color: rgba(29,155,240,0.3); }
  .ft-social-btn.dc:hover { color: #5865F2; border-color: rgba(88,101,242,0.3); }

  /* ── Link columns ── */
  .ft-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
  @media (max-width: 640px) {
    .ft-cols { grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; }
  }

  .ft-col-heading {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #263354;
    margin-bottom: 1.1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #1C2740;
  }

  .ft-col-links {
    display: flex;
    flex-direction: column;
    gap: 2px;
    list-style: none;
  }

  .ft-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 0;
    font-size: 0.845rem;
    font-weight: 500;
    color: #6B7A99;
    text-decoration: none;
    transition: color 0.15s, padding-left 0.2s;
    line-height: 1.3;
    border-radius: 4px;
  }
  .ft-link:hover { color: #C5CDD8; padding-left: 4px; }
  .ft-link.ext { color: #4A5A78; }
  .ft-link.ext:hover { color: #0DFF9A; }
  .ft-link-arrow {
    opacity: 0;
    transition: opacity 0.15s, transform 0.15s;
    flex-shrink: 0;
  }
  .ft-link:hover .ft-link-arrow { opacity: 1; transform: translateX(2px); }

  /* ── Install strip ── */
  .ft-install-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    margin: 0 0 0;
    background: #0C1018;
    border-top: 1px solid #1C2740;
  }
  .ft-install-left {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }
  .ft-install-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #263354;
  }
  .ft-install-items {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .ft-install-pkg {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: #080B12;
    border: 1px solid #1C2740;
    border-radius: 7px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    font-weight: 500;
    color: #6B7A99;
    white-space: nowrap;
  }
  .ft-install-pkg span.cmd { color: #C5CDD8; font-weight: 700; }
  .ft-install-pkg span.lang { color: #263354; font-size: 0.62rem; margin-right: 2px; }

  /* ── Bottom bar ── */
  .ft-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.25rem clamp(1.5rem, 5vw, 3rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .ft-copyright {
    font-size: 0.775rem;
    color: #263354;
    line-height: 1.5;
  }
  .ft-copyright a {
    color: #4A5A78;
    text-decoration: none;
    transition: color 0.15s;
  }
  .ft-copyright a:hover { color: #0DFF9A; }
  .ft-bottom-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .ft-made-in {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #263354;
  }
  .ft-made-in svg { flex-shrink: 0; }
  .ft-star-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 7px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 700;
    color: #6B7A99;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .ft-star-link:hover { border-color: rgba(13,255,154,0.3); color: #0DFF9A; }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const COLS = [
  {
    heading: "Product",
    links: [
      { href: "/",           label: "Home"       },
      { href: "/playground", label: "Playground" },
      { href: "/features",   label: "Features"   },
      { href: "/use-cases",  label: "Use Cases"  },
      { href: "/compliance", label: "Compliance" },
      { href: "/changelog",  label: "Changelog"  },
    ],
  },
  {
    heading: "Docs",
    links: [
      { href: "/docs",              label: "Introduction" },
      { href: "/docs/quickstart",   label: "Quickstart"   },
      { href: "/docs/architecture", label: "Architecture" },
      { href: "/docs/sdks/python",  label: "SDK: Python"  },
      { href: "/docs/sdks/node",    label: "SDK: Node.js" },
      { href: "/docs/sdks/go",      label: "SDK: Go"      },
      { href: "/docs/sdks/expo",    label: "SDK: Expo"    },
    ],
  },
  {
    heading: "Community",
    links: [
      { href: "https://github.com/amareshhebbar/TrueNorth",             label: "GitHub",       ext: true },
      { href: "#",                                                        label: "Discord",      ext: true },
      { href: "https://twitter.com/truenorthai",                         label: "Twitter / X",  ext: true },
      { href: "https://github.com/amareshhebbar/TrueNorth/discussions",  label: "Discussions",  ext: true },
      { href: "/blog",       label: "Blog"    },
      { href: "/contact",    label: "Contact" },
    ],
  },
  {
    heading: "More",
    links: [
      { href: "/roadmap",    label: "Roadmap"     },
      { href: "/showcase",   label: "Showcase"    },
      { href: "/compare",    label: "Compare"     },
      { href: "/contributing", label: "Contributing" },
      { href: "https://github.com/amareshhebbar/TrueNorth/blob/main/LICENSE", label: "License", ext: true },
    ],
  },
];

const ARROW_ICON = (
  <svg className="ft-link-arrow" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const EXT_ICON = (
  <svg className="ft-link-arrow" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      <style>{CSS}</style>
      <footer className="ft-root" role="contentinfo">
        <div className="ft-topbar" aria-hidden="true" />

        <div className="ft-inner">
          <div className="ft-upper">

            {/* ── Brand ── */}
            <div className="ft-brand">
              <Link href="/" className="ft-logo" aria-label="TrueNorth home">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                  <circle cx="15" cy="15" r="13.5" stroke="#0DFF9A" strokeWidth="1.5"/>
                  <g className="ft-logo-needle">
                    <path d="M15 5 L19 15 L15 13 L11 15 Z" fill="#0DFF9A"/>
                    <path d="M15 25 L11 15 L15 17 L19 15 Z" fill="#1C2740"/>
                  </g>
                  <circle cx="15" cy="15" r="2.5" fill="#0DFF9A"/>
                </svg>
                <span className="ft-logo-text">TrueNorth</span>
              </Link>

              <p className="ft-tagline">
                Declare the outcome.<br/>Skip the logic.
              </p>

              <div className="ft-pills">
                <span className="ft-pill accent">Open Source</span>
                <span className="ft-pill">Apache 2.0</span>
                <span className="ft-pill">v0.1.5</span>
                <span className="ft-pill">Built in India</span>
              </div>

              <div className="ft-socials">
                {/* GitHub */}
                <a
                  href="https://github.com/amareshhebbar/TrueNorth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn gh"
                  aria-label="TrueNorth on GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                {/* Twitter */}
                <a
                  href="https://twitter.com/truenorthai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn tw"
                  aria-label="TrueNorth on Twitter/X"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Discord */}
                <a
                  href="#"
                  className="ft-social-btn dc"
                  aria-label="TrueNorth on Discord"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </a>
                {/* PyPI */}
                <a
                  href="https://pypi.org/project/truenorth-framework/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-btn"
                  aria-label="TrueNorth on PyPI"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M11.535 0C8.89.002 8.705.12 8.705 1.617v1.39h2.83V3.5H5.968C4.46 3.5 3.168 4.453 2.808 6.22c-.414 2.02-.432 3.28 0 5.39.32 1.568 1.086 2.61 2.594 2.61h1.677V12.08c0-1.698 1.47-3.197 3.2-3.197h5.656c1.423 0 2.556-1.17 2.556-2.596V1.617C18.49.163 17.322 0 14.674 0zm-3.05 1.76a.96.96 0 0 1 .957.963.96.96 0 0 1-.956.962.96.96 0 0 1-.957-.962.96.96 0 0 1 .957-.962z"/>
                    <path d="M18.49 3.5v2.14c0 1.77-1.5 3.264-3.2 3.264H9.634c-1.4 0-2.556 1.196-2.556 2.596v4.867c0 1.385 1.204 2.198 2.556 2.597 1.617.474 3.168.56 5.656 0 1.427-.41 2.556-1.235 2.556-2.597v-1.947h-2.83v.487h5.66c1.508 0 2.8-.965 3.16-2.732.428-2.012.445-3.26 0-5.39-.318-1.536-1.05-2.61-2.558-2.61H18.49zm-3.178 11.2a.96.96 0 0 1 .957.962.96.96 0 0 1-.957.963.96.96 0 0 1-.957-.963.96.96 0 0 1 .957-.962z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ── Link columns ── */}
            <div className="ft-cols">
              {COLS.map((col) => (
                <div key={col.heading}>
                  <div className="ft-col-heading">{col.heading}</div>
                  <ul className="ft-col-links">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        {link.ext ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ft-link ext"
                          >
                            {link.label}
                            {EXT_ICON}
                          </a>
                        ) : (
                          <Link href={link.href} className="ft-link">
                            {link.label}
                            {ARROW_ICON}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>{/* /ft-upper */}
        </div>{/* /ft-inner */}

        {/* ── Install strip ── */}
        <div className="ft-install-strip">
          <div className="ft-install-left">
            <span className="ft-install-label">Install</span>
            <div className="ft-install-items">
              <div className="ft-install-pkg">
                <span className="lang">PY</span>
                <span className="cmd">pip install truenorth</span>
              </div>
              <div className="ft-install-pkg">
                <span className="lang">JS</span>
                <span className="cmd">npm install truenorth</span>
              </div>
              <div className="ft-install-pkg">
                <span className="lang">GO</span>
                <span className="cmd">go get github.com/amareshhebbar/truenorth</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <p className="ft-copyright">
            © 2026 TrueNorth ·{" "}
            <a href="https://github.com/amareshhebbar/TrueNorth" target="_blank" rel="noopener noreferrer">
              amareshhebbar/TrueNorth
            </a>
            {" · "}Apache 2.0 License
          </p>
          <div className="ft-bottom-right">
            <div className="ft-made-in">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Built in India
            </div>
            <a
              href="https://github.com/amareshhebbar/TrueNorth"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-star-link"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>

      </footer>
    </>
  );
}