"use client";

import { useState } from "react";

const langColors: Record<string, string> = {
  python: "#FFD700",
  typescript: "#3178C6",
  go: "#00ADD8",
  bash: "#A8FF78",
  yaml: "#79C0FF",
  json: "#00D4AA",
  javascript: "#F7DF1E",
};

export default function CodeBlock({ code, lang = "bash", filename }: { code: string; lang?: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl border border-[#1E2329] bg-[#111318] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1E2329]">
        <div className="flex items-center gap-2">
          {lang && (
            <span
              className="text-xs font-mono font-semibold uppercase tracking-wider"
              style={{ color: langColors[lang.toLowerCase()] || "#8B95A3" }}
            >
              {lang}
            </span>
          )}
          {filename && (
            <span className="text-xs text-[#4A5568] font-mono">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded border border-[#1E2329] text-[#4A5568] hover:text-[#00D4AA] hover:border-[#00D4AA] transition-all"
          aria-label="Copy code"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 text-sm font-mono leading-relaxed overflow-x-auto">
        <code className="text-[#A5D6FF]">{code}</code>
      </pre>
    </div>
  );
}
