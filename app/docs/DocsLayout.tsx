"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .dl-root *, .dl-root *::before, .dl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dl-root {
    display: flex;
    min-height: 100vh;
    padding-top: 64px;
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Sidebar ── */
  .dl-sidebar {
    position: sticky;
    top: 64px;
    height: calc(100vh - 64px);
    width: 268px;
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid #1C2740;
    background: #080B12;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s cubic-bezier(.16,1,.3,1);
    z-index: 40;
  }
  .dl-sidebar::-webkit-scrollbar { width: 3px; }
  .dl-sidebar::-webkit-scrollbar-track { background: transparent; }
  .dl-sidebar::-webkit-scrollbar-thumb { background: #1C2740; border-radius: 3px; }

  @media (max-width: 820px) {
    .dl-sidebar {
      position: fixed;
      top: 64px; left: 0; bottom: 0;
      transform: translateX(-100%);
    }
    .dl-sidebar.open { transform: translateX(0); }
  }

  .dl-sidebar-inner { padding: 16px 14px 24px; flex: 1; }

  /* Search bar */
  .dl-search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: border-color 0.15s;
  }
  .dl-search:hover { border-color: rgba(13,255,154,0.3); }
  .dl-search-icon { color: #263354; flex-shrink: 0; }
  .dl-search-text { font-size: 0.8rem; color: #263354; flex: 1; }
  .dl-search-kbd {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    padding: 2px 6px;
    border-radius: 4px;
    background: #0E1420;
    border: 1px solid #1C2740;
    color: #263354;
    flex-shrink: 0;
  }

  /* Sections */
  .dl-section { margin-bottom: 4px; }
  .dl-section-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 6px 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #263354;
    transition: color 0.15s, background 0.15s;
  }
  .dl-section-btn:hover { color: #6B7A99; background: #0C1018; }
  .dl-section-chevron { transition: transform 0.2s; flex-shrink: 0; }
  .dl-section-chevron.open { transform: rotate(90deg); }

  .dl-section-items { padding: 2px 0 6px 0; display: flex; flex-direction: column; gap: 1px; }
  .dl-nav-link {
    display: block;
    padding: 6px 10px;
    border-radius: 7px;
    font-size: 0.82rem;
    font-weight: 500;
    color: #6B7A99;
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
    border-left: 2px solid transparent;
    margin-left: 4px;
  }
  .dl-nav-link:hover { color: #C5CDD8; background: #0C1018; }
  .dl-nav-link.active {
    color: #0DFF9A;
    background: rgba(13,255,154,0.06);
    border-left-color: #0DFF9A;
  }

  /* Sidebar footer */
  .dl-sidebar-foot {
    padding: 14px;
    border-top: 1px solid #1C2740;
    display: flex;
    gap: 16px;
    flex-shrink: 0;
  }
  .dl-foot-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #263354;
    text-decoration: none;
    transition: color 0.15s;
  }
  .dl-foot-link:hover { color: #0DFF9A; }

  /* ── Mobile overlay ── */
  .dl-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 39;
    backdrop-filter: blur(4px);
  }
  @media (max-width: 820px) {
    .dl-overlay.show { display: block; }
  }

  /* ── Mobile FAB ── */
  .dl-fab {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 50;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #0DFF9A;
    color: #000;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(13,255,154,0.3);
    transition: transform 0.2s;
  }
  .dl-fab:hover { transform: scale(1.08); }
  @media (max-width: 820px) { .dl-fab { display: flex; } }

  /* ── Main content ── */
  .dl-main {
    flex: 1;
    min-width: 0;
    padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem);
  }
  .dl-content { max-width: 760px; margin: 0 auto; }
`;

const NAV = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs",             label: "Introduction" },
      { href: "/docs/quickstart",  label: "Quickstart" },
      { href: "/docs/architecture",label: "Architecture" },
    ],
  },
  {
    title: "YAML Engine",
    items: [
      { href: "/docs/yaml/schema",     label: "Schema Syntax" },
      { href: "/docs/yaml/validation", label: "Validation Rules" },
      { href: "/docs/yaml/behavior",   label: "Agent Behavior" },
      { href: "/docs/yaml/reminders",  label: "Async Reminders" },
    ],
  },
  {
    title: "Language SDKs",
    items: [
      { href: "/docs/sdks/python",     label: "Python" },
      { href: "/docs/sdks/nodejs",     label: "Node.js" },
      { href: "/docs/sdks/go",         label: "Go" },
      { href: "/docs/sdks/expo",       label: "React Native (Expo)" },
    ],
  },
  {
    title: "State & Memory",
    items: [
      { href: "/docs/state/sessions",    label: "Session Management" },
      { href: "/docs/state/offline",     label: "Offline & SQLite" },
      { href: "/docs/state/persistence", label: "State Persistence" },
    ],
  },
  {
    title: "Safety & Compliance",
    items: [
      { href: "/docs/safety/hallucination", label: "Hallucination Firewall" },
      { href: "/docs/safety/pii",           label: "PII Detection" },
      { href: "/docs/safety/dpdp",          label: "DPDP Act 2023" },
      { href: "/docs/safety/gdpr",          label: "GDPR" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { href: "/docs/integrations/whatsapp", label: "WhatsApp Business" },
      { href: "/docs/integrations/a2a",      label: "Multi-Agent A2A" },
      { href: "/docs/integrations/mcp",      label: "MCP Tools" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { href: "/docs/advanced/multilingual",   label: "Multilingual" },
      { href: "/docs/advanced/cost",           label: "Cost Recording" },
      { href: "/docs/advanced/source-tracing", label: "Source Tracing" },
    ],
  },
];

const DEFAULT_OPEN = ["Getting Started", "YAML Engine", "Language SDKs"];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open,       setOpen]       = useState<string[]>(DEFAULT_OPEN);
  const [sidebarOpen,setSidebarOpen]= useState(false);

  const toggle = (title: string) =>
    setOpen(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);

  const closeSidebar = () => setSidebarOpen(false);

  const CHEVRON = (expanded: boolean) => (
    <svg
      className={`dl-section-chevron${expanded ? " open" : ""}`}
      width="11" height="11"
      fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="dl-root">

        <aside className={`dl-sidebar${sidebarOpen ? " open" : ""}`} aria-label="Documentation navigation">
          <div className="dl-sidebar-inner">

            <div className="dl-search" role="search">
              <svg className="dl-search-icon" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span className="dl-search-text">Search docs…</span>
              <kbd className="dl-search-kbd">⌘K</kbd>
            </div>

            {NAV.map((section, idx) => {
              const expanded = open.includes(section.title);
              return (
                <div key={section.title} className="dl-section">
                  <button
                    className="dl-section-btn"
                    onClick={() => toggle(section.title)}
                    aria-expanded={expanded}
                    type="button"
                  >
                    {section.title}
                    {CHEVRON(expanded)}
                  </button>
                  {expanded && (
                    <div className="dl-section-items">
                      {section.items.map(item => (
                        <Link
                          key={`${item.href || item.label}-${idx}`}
                          href={item.href}
                          className={`dl-nav-link${pathname === item.href ? " active" : ""}`}
                          onClick={closeSidebar}
                          aria-current={pathname === item.href ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="dl-sidebar-foot">
            <a href="https://github.com/amareshhebbar/TrueNorth/discussions" target="_blank" rel="noopener noreferrer" className="dl-foot-link">Discord</a>
            <a href="https://github.com/amareshhebbar/TrueNorth" target="_blank" rel="noopener noreferrer" className="dl-foot-link">GitHub</a>
            <a href="https://github.com/amareshhebbar/TrueNorth/issues" target="_blank" rel="noopener noreferrer" className="dl-foot-link">Issues</a>
          </div>
        </aside>

        <div
          className={`dl-overlay${sidebarOpen ? " show" : ""}`}
          onClick={closeSidebar}
          aria-hidden="true"
        />

        <button
          className="dl-fab"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
          type="button"
        >
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            {sidebarOpen ? (
              <><line x1="4" y1="4" x2="13" y2="13"/><line x1="13" y1="4" x2="4" y2="13"/></>
            ) : (
              <><line x1="2" y1="5" x2="15" y2="5"/><line x1="2" y1="9" x2="15" y2="9"/><line x1="2" y1="13" x2="15" y2="13"/></>
            )}
          </svg>
        </button>

        <main className="dl-main">
          <div className="dl-content">
            {children}
          </div>
        </main>

      </div>
    </>
  );
}