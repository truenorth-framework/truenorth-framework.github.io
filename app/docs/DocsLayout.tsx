"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const docsSections = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/architecture", label: "Architecture" },
    ],
  },
  {
    title: "YAML Engine",
    items: [
      { href: "/docs/yaml/schema", label: "Schema Syntax" },
      { href: "/docs/yaml/validation", label: "Validation Rules" },
      { href: "/docs/yaml/behavior", label: "Agent Behavior" },
      { href: "/docs/yaml/reminders", label: "Async Reminders" },
    ],
  },
  {
    title: "Language SDKs",
    items: [
      { href: "/docs/sdks/python", label: "Python" },
      { href: "/docs/sdks/nodejs", label: "Node.js" },
      { href: "/docs/sdks/go", label: "Go" },
      { href: "/docs/sdks/expo", label: "React Native (Expo)" },
    ],
  },
  {
    title: "State & Memory",
    items: [
      { href: "/docs/state/sessions", label: "Session Management" },
      { href: "/docs/state/offline", label: "Offline & SQLite" },
      { href: "/docs/state/persistence", label: "State Persistence" },
    ],
  },
  {
    title: "Safety & Compliance",
    items: [
      { href: "/docs/safety/hallucination", label: "Hallucination Firewall" },
      { href: "/docs/safety/pii", label: "PII Detection" },
      { href: "/docs/safety/dpdp", label: "DPDP Act 2023" },
      { href: "/docs/safety/gdpr", label: "GDPR" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { href: "/docs/integrations/whatsapp", label: "WhatsApp Business" },
      { href: "/docs/integrations/a2a", label: "Multi-Agent A2A" },
      { href: "/docs/integrations/mcp", label: "MCP Tools" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { href: "/docs/advanced/multilingual", label: "Multilingual" },
      { href: "/docs/advanced/cost", label: "Cost Recording" },
      { href: "/docs/advanced/source-tracing", label: "Source Tracing" },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>(["Getting Started", "YAML Engine", "Language SDKs"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#00D4AA] text-black flex items-center justify-center shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {sidebarOpen ? (
            <>
              <line x1="4" y1="4" x2="14" y2="14" />
              <line x1="14" y1="4" x2="4" y2="14" />
            </>
          ) : (
            <>
              <line x1="2" y1="6" x2="16" y2="6" />
              <line x1="2" y1="11" x2="16" y2="11" />
              <line x1="2" y1="16" x2="16" y2="16" />
            </>
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-16 left-0 z-40 w-72 shrink-0 h-[calc(100vh-64px)] overflow-y-auto bg-[#0A0B0D] border-r border-[#1E2329] transition-transform md:transition-none`}
        aria-label="Documentation navigation"
      >
        <div className="p-4">
          {/* Search hint */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1E2329] bg-[#111318] mb-6 cursor-pointer hover:border-[#00D4AA] transition-colors text-[#4A5568] text-sm">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="4" />
              <path d="M9.5 9.5l3 3" strokeLinecap="round" />
            </svg>
            <span>Search docs</span>
            <kbd className="ml-auto text-xs px-1.5 py-0.5 rounded bg-[#1E2329]">⌘K</kbd>
          </div>

          {/* Nav sections */}
          {docsSections.map((section) => {
            const isOpen = openSections.includes(section.title);
            return (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#4A5568] hover:text-[#8B95A3] transition-colors"
                  aria-expanded={isOpen}
                >
                  {section.title}
                  <svg
                    width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                  >
                    <path d="M4 2l4 4-4 4" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="mt-1 space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-3 py-1.5 rounded-lg text-sm transition-all ${
                            isActive
                              ? "text-[#00D4AA] bg-[rgba(0,212,170,0.08)] border-l-2 border-[#00D4AA] ml-1"
                              : "text-[#8B95A3] hover:text-[#F0F2F5] hover:bg-[#111318]"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-[#1E2329] flex gap-4">
            <a href="https://github.com/amareshhebbar/TrueNorth/discussions" target="_blank" rel="noopener noreferrer" className="text-xs text-[#4A5568] hover:text-[#00D4AA] transition-colors">
              Discord
            </a>
            <a href="https://github.com/amareshhebbar/TrueNorth" target="_blank" rel="noopener noreferrer" className="text-xs text-[#4A5568] hover:text-[#00D4AA] transition-colors">
              GitHub
            </a>
            <a href="https://github.com/amareshhebbar/TrueNorth/issues" target="_blank" rel="noopener noreferrer" className="text-xs text-[#4A5568] hover:text-[#00D4AA] transition-colors">
              Issues
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
