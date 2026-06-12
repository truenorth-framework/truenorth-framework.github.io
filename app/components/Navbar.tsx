"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── DATA ────────────────────────────────────────────────────────────────────

const featuresMenu = [
  { href: "/features/yaml-engine",            label: "YAML Engine",            desc: "Configure agents in pure YAML" },
  { href: "/features/hallucination-firewall", label: "Hallucination Firewall", desc: "~2% false-claim rate" },
  { href: "/features/offline-first",          label: "Offline First",           desc: "SQLite-backed local sessions" },
  { href: "/features/multilingual",           label: "Multilingual",            desc: "22+ Indian languages" },
  { href: "/features/async-reminders",        label: "Async Reminders",         desc: "The only framework that initiates" },
  { href: "/compliance",                      label: "Compliance",              desc: "DPDP 2023 + GDPR built-in" },
];

const useCasesMenu = [
  { href: "/use-cases/rural-medical-intake", label: "Rural Medical Intake" },
  { href: "/use-cases/hr-screening",         label: "HR Screening" },
  { href: "/use-cases/lead-qualification",   label: "Lead Qualification" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

  :root {
    --bg-base:     #080B12;
    --bg-surface:  #0E1420;
    --bg-hover:    #131C2E;
    --border:      #1C2740;
    --border-hi:   #263354;
    --accent:      #0DFF9A;
    --accent-text: #000000;
    --text-1:      #FFFFFF;
    --text-2:      #C5CDD8;
    --text-3:      #6B7A99;
    --font-ui:     'Inter', system-ui, sans-serif;
    --font-mono:   'JetBrains Mono', monospace;
    --nav-h:       64px;
  }

  /* ── Reset scoped to navbar ── */
  .tn-nav *, .tn-nav *::before, .tn-nav *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── Outer header ── */
  .tn-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    height: var(--nav-h);
    font-family: var(--font-ui);
    -webkit-font-smoothing: antialiased;
    transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  }
  .tn-nav.scrolled {
    background: rgba(8, 11, 18, 0.88);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* ── Inner wrapper ── */
  .tn-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: var(--nav-h);
    display: flex;
    align-items: center;
    gap: 0;
  }

  /* ── Logo ── */
  .tn-logo {
    display: flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
    flex-shrink: 0;
    margin-right: 40px;
  }
  .tn-logo-text {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 700;
    color: var(--text-1);
    letter-spacing: -0.02em;
    white-space: nowrap;
    transition: color 0.2s;
  }
  .tn-logo:hover .tn-logo-text { color: var(--accent); }
  .tn-logo-svg { flex-shrink: 0; }
  .tn-logo-needle {
    transform-origin: 14px 14px;
    transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
  }
  .tn-logo:hover .tn-logo-needle { transform: rotate(45deg); }

  /* ── Desktop center nav ── */
  .tn-desktop-nav {
    display: flex;
    align-items: center;
    gap: 2px;
    flex: 1;
  }

  /* ── Nav link base ── */
  .tn-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 12px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-3);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.15s, background 0.15s;
    font-family: var(--font-ui);
    line-height: 1;
  }
  .tn-link:hover,
  .tn-link[aria-expanded="true"] {
    color: var(--text-1);
    background: var(--bg-hover);
  }
  .tn-link .tn-chevron {
    flex-shrink: 0;
    transition: transform 0.2s;
    color: var(--text-3);
  }
  .tn-link[aria-expanded="true"] .tn-chevron { transform: rotate(180deg); }

  /* ── Dropdown wrapper ── */
  .tn-dropdown {
    position: relative;
  }
  .tn-dropdown-panel {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
    padding: 6px;
    z-index: 300;
    min-width: 240px;
    animation: dropIn 0.18s cubic-bezier(.16,1,.3,1);
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Features panel wider */
  .tn-dropdown-panel.wide { min-width: 288px; }

  /* ── Dropdown item ── */
  .tn-drop-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px 12px;
    border-radius: 9px;
    text-decoration: none;
    transition: background 0.15s;
  }
  .tn-drop-item:hover { background: var(--bg-hover); }
  .tn-drop-label {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-2);
    transition: color 0.15s;
    white-space: nowrap;
  }
  .tn-drop-item:hover .tn-drop-label { color: var(--accent); }
  .tn-drop-desc {
    font-size: 12px;
    color: var(--text-3);
    line-height: 1.4;
  }

  /* ── Dropdown item simple (no desc) ── */
  .tn-drop-simple {
    display: block;
    padding: 9px 12px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-3);
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
  }
  .tn-drop-simple:hover {
    background: var(--bg-hover);
    color: var(--text-1);
  }

  /* ── Divider inside dropdown ── */
  .tn-drop-divider {
    height: 1px;
    background: var(--border);
    margin: 5px 6px;
  }

  /* ── Right side actions ── */
  .tn-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .tn-gh-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 13px;
    border-radius: 8px;
    border: 1px solid var(--border-hi);
    background: var(--bg-surface);
    font-size: 13px;
    font-weight: 500;
    color: var(--text-3);
    text-decoration: none;
    white-space: nowrap;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    font-family: var(--font-ui);
    line-height: 1;
  }
  .tn-gh-btn:hover {
    border-color: var(--accent);
    color: var(--text-1);
    background: var(--bg-hover);
  }
  .tn-gh-stars {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.02em;
  }

  .tn-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 8px;
    background: var(--accent);
    color: var(--accent-text);
    font-size: 13.5px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.15s;
    font-family: var(--font-ui);
    line-height: 1;
  }
  .tn-cta:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── Hamburger ── */
  .tn-hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    border: 1px solid var(--border-hi);
    background: var(--bg-surface);
    cursor: pointer;
    color: var(--text-3);
    transition: border-color 0.2s, color 0.2s;
    margin-left: auto;
    flex-shrink: 0;
  }
  .tn-hamburger:hover { border-color: var(--accent); color: var(--text-1); }

  /* ── Mobile menu panel ── */
  .tn-mobile-menu {
    position: fixed;
    top: var(--nav-h);
    left: 0;
    right: 0;
    background: var(--bg-base);
    border-bottom: 1px solid var(--border);
    z-index: 199;
    overflow-y: auto;
    max-height: calc(100dvh - var(--nav-h));
    animation: slideDown 0.22s cubic-bezier(.16,1,.3,1);
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tn-mobile-inner {
    padding: 16px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .tn-mob-section {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-3);
    padding: 14px 8px 6px;
    border-top: 1px solid var(--border);
    margin-top: 8px;
  }
  .tn-mob-section:first-child { border-top: none; margin-top: 0; padding-top: 4px; }
  .tn-mob-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 10px;
    border-radius: 9px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-2);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    line-height: 1;
  }
  .tn-mob-link:hover { background: var(--bg-hover); color: var(--text-1); }
  .tn-mob-sub {
    font-size: 11.5px;
    color: var(--text-3);
    margin-top: 1px;
  }
  .tn-mob-link.indent {
    padding-left: 20px;
  }
  .tn-mob-actions {
    display: flex;
    gap: 10px;
    padding-top: 16px;
    margin-top: 8px;
    border-top: 1px solid var(--border);
  }
  .tn-mob-gh {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--border-hi);
    background: var(--bg-surface);
    font-size: 13px;
    font-weight: 500;
    color: var(--text-3);
    text-decoration: none;
    flex-shrink: 0;
    font-family: var(--font-ui);
  }
  .tn-mob-cta {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 11px;
    border-radius: 8px;
    background: var(--accent);
    color: var(--accent-text);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    font-family: var(--font-ui);
  }

  /* ── Responsive breakpoints ── */
  @media (max-width: 900px) {
    .tn-desktop-nav { display: none; }
    .tn-actions      { display: none; }
    .tn-hamburger    { display: inline-flex; }
  }

  @media (min-width: 901px) {
    .tn-mobile-menu { display: none !important; }
  }
`;

// ─── CHEVRON ─────────────────────────────────────────────────────────────────

function Chevron() {
  return (
    <svg
      className="tn-chevron"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5 L5.5 7 L9 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="tn-logo" aria-label="TrueNorth home">
      <svg
        className="tn-logo-svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="15" cy="15" r="13.5" stroke="#0DFF9A" strokeWidth="1.5" />
        <g className="tn-logo-needle">
          <path d="M15 5 L19 15 L15 13 L11 15 Z" fill="#0DFF9A" />
          <path d="M15 25 L11 15 L15 17 L19 15 Z" fill="#1C2740" />
        </g>
        <circle cx="15" cy="15" r="2.5" fill="#0DFF9A" />
      </svg>
      <span className="tn-logo-text">TrueNorth</span>
    </Link>
  );
}

// ─── GITHUB BUTTON ────────────────────────────────────────────────────────────

function GhButton({ stars }: { stars: number | null }) {
  return (
    <a
      href="https://github.com/amareshhebbar/TrueNorth"
      target="_blank"
      rel="noopener noreferrer"
      className="tn-gh-btn"
      aria-label="View TrueNorth on GitHub"
    >
      <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      <span className="tn-gh-stars">★ {stars !== null ? stars.toLocaleString() : "—"}</span>
    </a>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [featOpen,     setFeatOpen]     = useState(false);
  const [casesOpen,    setCasesOpen]    = useState(false);
  const [stars,        setStars]        = useState<number | null>(null);

  const pathname = usePathname();

  const featRef  = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);

  // Scroll lock
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GitHub stars
  useEffect(() => {
    fetch("https://api.github.com/repos/amareshhebbar/TrueNorth")
      .then((r) => r.json())
      .then((d) => { if (typeof d.stargazers_count === "number") setStars(d.stargazers_count); })
      .catch(() => {});
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setFeatOpen(false);
    setCasesOpen(false);
  }, [pathname]);

  // Click-outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (featRef.current  && !featRef.current.contains(e.target  as Node)) setFeatOpen(false);
      if (casesRef.current && !casesRef.current.contains(e.target as Node)) setCasesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMobileOpen(false); setFeatOpen(false); setCasesOpen(false); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <style>{css}</style>

      <header className={`tn-nav${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="tn-inner">

          {/* Logo */}
          <Logo />

          {/* Desktop center nav */}
          <nav className="tn-desktop-nav" role="navigation" aria-label="Main navigation">

            <Link href="/docs"       className="tn-link">Docs</Link>
            <Link href="/playground" className="tn-link">Playground</Link>

            {/* Features dropdown */}
            <div className="tn-dropdown" ref={featRef}>
              <button
                className="tn-link"
                onClick={() => { setFeatOpen(!featOpen); setCasesOpen(false); }}
                aria-expanded={featOpen}
                aria-haspopup="true"
                type="button"
              >
                Features <Chevron />
              </button>
              {featOpen && (
                <div className="tn-dropdown-panel wide" role="menu">
                  {featuresMenu.map((item) => (
                    <Link key={item.href} href={item.href} className="tn-drop-item" role="menuitem">
                      <span className="tn-drop-label">{item.label}</span>
                      <span className="tn-drop-desc">{item.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Use Cases dropdown */}
            <div className="tn-dropdown" ref={casesRef}>
              <button
                className="tn-link"
                onClick={() => { setCasesOpen(!casesOpen); setFeatOpen(false); }}
                aria-expanded={casesOpen}
                aria-haspopup="true"
                type="button"
              >
                Use Cases <Chevron />
              </button>
              {casesOpen && (
                <div className="tn-dropdown-panel" role="menu">
                  {useCasesMenu.map((item) => (
                    <Link key={item.href} href={item.href} className="tn-drop-simple" role="menuitem">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog"      className="tn-link">Blog</Link>
            <Link href="/changelog" className="tn-link">Changelog</Link>

          </nav>

          {/* Right actions */}
          <div className="tn-actions">
            <GhButton stars={stars} />
            <Link href="/docs/quickstart" className="tn-cta">
              Get Started
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="tn-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="tn-mobile-menu"
            type="button"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4"  y2="14" />
                </>
              ) : (
                <>
                  <line x1="2" y1="5"  x2="16" y2="5"  />
                  <line x1="2" y1="9"  x2="16" y2="9"  />
                  <line x1="2" y1="13" x2="16" y2="13" />
                </>
              )}
            </svg>
          </button>

        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="tn-mobile-menu" id="tn-mobile-menu" role="navigation" aria-label="Mobile navigation">
          <div className="tn-mobile-inner">

            <div className="tn-mob-section">Navigation</div>
            <Link href="/docs"       className="tn-mob-link">Docs</Link>
            <Link href="/playground" className="tn-mob-link">Playground</Link>
            <Link href="/blog"       className="tn-mob-link">Blog</Link>
            <Link href="/changelog"  className="tn-mob-link">Changelog</Link>

            <div className="tn-mob-section">Features</div>
            {featuresMenu.map((item) => (
              <Link key={item.href} href={item.href} className="tn-mob-link indent">
                <div>
                  <div>{item.label}</div>
                  <div className="tn-mob-sub">{item.desc}</div>
                </div>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}

            <div className="tn-mob-section">Use Cases</div>
            {useCasesMenu.map((item) => (
              <Link key={item.href} href={item.href} className="tn-mob-link indent">
                {item.label}
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}

            <div className="tn-mob-actions">
              <a
                href="https://github.com/amareshhebbar/TrueNorth"
                target="_blank"
                rel="noopener noreferrer"
                className="tn-mob-gh"
              >
                <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                ★ {stars !== null ? stars.toLocaleString() : "—"}
              </a>
              <Link href="/docs/quickstart" className="tn-mob-cta">
                Get Started →
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
}