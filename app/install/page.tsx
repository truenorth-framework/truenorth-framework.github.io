"use client";

import { useState } from "react";
import Link from "next/link";

export default function InstallPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = [
    { lang: "Python", color: "#FFD700", cmd: "pip install truenorth-framework" },
    { lang: "Node.js", color: "#00D4AA", cmd: "npm install truenorth" },
    { lang: "Go", color: "#00ADD8", cmd: "go get github.com/amareshhebbar/truenorth-go" },
    { lang: "Expo", color: "#3178C6", cmd: "npx expo install truenorth-expo" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <div className="text-xs font-mono text-[#00D4AA] tracking-widest mb-4">QUICK INSTALL</div>
        <h1 className="text-4xl font-bold text-[#F0F2F5] mb-3">Install TrueNorth</h1>
        <p className="text-[#8B95A3] mb-10">Choose your language. One command. Done.</p>

        <div className="space-y-3 text-left mb-10">
          {commands.map(({ lang, color, cmd }) => (
            <div key={lang} className="flex items-center gap-3 p-4 rounded-xl border border-[#1E2329] bg-[#111318]">
              <span className="text-sm font-mono font-bold w-20 flex-shrink-0" style={{ color }}>{lang}</span>
              <code className="flex-1 text-sm text-[#A8FF78] font-mono truncate">{cmd}</code>
              <button
                onClick={() => copy(cmd, lang)}
                className="text-xs px-3 py-1.5 rounded border border-[#1E2329] text-[#4A5568] hover:text-[#00D4AA] hover:border-[#00D4AA] transition-all flex-shrink-0"
              >
                {copied === lang ? "Copied ✓" : "Copy"}
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link href="/docs/quickstart" className="px-5 py-2.5 rounded bg-[#00D4AA] text-black font-semibold text-sm hover:bg-[#00997A] transition-colors">
            Read Quickstart →
          </Link>
          <Link href="/docs" className="px-5 py-2.5 rounded border border-[#1E2329] text-[#8B95A3] hover:text-[#F0F2F5] text-sm transition-colors">
            Full Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
