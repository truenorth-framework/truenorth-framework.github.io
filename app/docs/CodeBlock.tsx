// FILE: app/docs/CodeBlock.tsx
"use client";

import { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

  .cb-root *, .cb-root *::before, .cb-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cb-root {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #1C2740;
    margin: 1.25rem 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .cb-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 16px;
    background: #0A0D14;
    border-bottom: 1px solid #1C2740;
    gap: 12px;
  }
  .cb-bar-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .cb-lang {
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    flex-shrink: 0;
  }
  .cb-filename {
    font-size: 0.68rem;
    color: #6B7A99;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cb-sep { color: #1C2740; font-size: 0.65rem; flex-shrink: 0; }
  .cb-copy {
    padding: 3px 10px;
    background: #0C1018;
    border: 1px solid #1C2740;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #263354;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
    flex-shrink: 0;
    line-height: 1.5;
  }
  .cb-copy:hover { color: #0DFF9A; border-color: rgba(13,255,154,0.3); }
  .cb-copy.ok    { color: #0DFF9A; border-color: rgba(13,255,154,0.3); }

  .cb-pre {
    margin: 0;
    padding: 1.25rem 1.5rem;
    background: #07090F;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.79rem;
    line-height: 1.78;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .cb-pre::-webkit-scrollbar { height: 4px; }
  .cb-pre::-webkit-scrollbar-track { background: transparent; }
  .cb-pre::-webkit-scrollbar-thumb { background: #1C2740; border-radius: 4px; }

  /* ── Syntax token colours ── */
  .cb-plain   { color: #C9D1D9; }

  /* YAML */
  .cb-ky      { color: #0DFF9A; }
  .cb-val     { color: #8BE9FD; }
  .cb-str     { color: #F1FA8C; }
  .cb-num     { color: #BD93F9; }
  .cb-bool    { color: #FF79C6; }
  .cb-cm      { color: #6272A4; font-style: italic; }
  .cb-li      { color: #8BE9FD; }

  /* Python / JS / Go / Bash */
  .cb-kw      { color: #FF79C6; }
  .cb-fn      { color: #50FA7B; }
  .cb-s-str   { color: #F1FA8C; }
  .cb-d-str   { color: #F1FA8C; }
  .cb-var     { color: #8BE9FD; }
  .cb-op      { color: #FF79C6; }
  .cb-num2    { color: #BD93F9; }
  .cb-cm2     { color: #6272A4; font-style: italic; }
  .cb-prompt  { color: #0DFF9A; user-select: none; }

  /* JSON */
  .cb-jk      { color: #8BE9FD; }
  .cb-jv-s    { color: #F1FA8C; }
  .cb-jv-n    { color: #BD93F9; }
  .cb-jv-b    { color: #FF79C6; }
  .cb-jv-null { color: #6B7A99; }
  .cb-jp      { color: #6B7A99; }
`;

// ─── Language metadata ────────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  python:     "#FFD700",
  typescript: "#4D9EFF",
  javascript: "#F1FA8C",
  go:         "#00ADD8",
  bash:       "#0DFF9A",
  shell:      "#0DFF9A",
  yaml:       "#8BE9FD",
  json:       "#F1FA8C",
  rust:       "#FF6B35",
};

// ─── YAML highlighter ─────────────────────────────────────────────────────────
function highlightYAML(code: string): React.ReactNode {
  return code.split("\n").map((line, li) => {
    if (line.trim().startsWith("#")) {
      return <div key={li}><span className="cb-cm">{line}</span></div>;
    }
    if (line.trim().startsWith("-") && !line.includes(":")) {
      return <div key={li}><span className="cb-li">{line}</span></div>;
    }
    const ci = line.indexOf(":");
    if (ci > -1) {
      const k = line.slice(0, ci + 1);
      const v = line.slice(ci + 1);
      const vt = v.trim();
      const isStr = vt.startsWith('"') || vt.startsWith("'");
      const isNum = !isStr && !isNaN(Number(vt)) && vt !== "";
      const isBool = vt === "true" || vt === "false";
      const isNull = vt === "null" || vt === "~";
      const isDash = k.trim().startsWith("-");
      return (
        <div key={li}>
          <span className={isDash ? "cb-li" : "cb-ky"}>{k}</span>
          {isStr  && <span className="cb-str">{v}</span>}
          {isNum  && <span className="cb-num">{v}</span>}
          {isBool && <span className="cb-bool">{v}</span>}
          {isNull && <span className="cb-cm">{v}</span>}
          {!isStr && !isNum && !isBool && !isNull && v && <span className="cb-val">{v}</span>}
        </div>
      );
    }
    return <div key={li}><span className="cb-plain">{line}</span></div>;
  });
}

// ─── JSON highlighter ─────────────────────────────────────────────────────────
function highlightJSON(code: string): React.ReactNode {
  return code.split("\n").map((line, li) => {
    // key: value pairs
    const keyMatch = line.match(/^(\s*)("[\w_]+")(\s*:\s*)(.*)(,?)$/);
    if (keyMatch) {
      const [, indent, key, colon, rawVal, comma] = keyMatch;
      const val = rawVal.trim();
      const isStr = val.startsWith('"');
      const isNum = !isStr && !isNaN(Number(val)) && val !== "";
      const isBool = val === "true" || val === "false";
      const isNull = val === "null";
      return (
        <div key={li}>
          <span>{indent}</span>
          <span className="cb-jk">{key}</span>
          <span className="cb-jp">{colon}</span>
          {isStr  && <span className="cb-jv-s">{rawVal}</span>}
          {isNum  && <span className="cb-jv-n">{rawVal}</span>}
          {isBool && <span className="cb-jv-b">{rawVal}</span>}
          {isNull && <span className="cb-jv-null">{rawVal}</span>}
          <span className="cb-jp">{comma}</span>
        </div>
      );
    }
    return <div key={li}><span className="cb-plain">{line}</span></div>;
  });
}

// ─── Bash / shell highlighter ─────────────────────────────────────────────────
function highlightBash(code: string): React.ReactNode {
  return code.split("\n").map((line, li) => {
    if (line.trim().startsWith("#")) {
      return <div key={li}><span className="cb-cm2">{line}</span></div>;
    }
    // Lines starting with $ prompt
    if (line.trim().startsWith("$")) {
      const prompt = line.slice(0, line.indexOf("$") + 1);
      const rest   = line.slice(line.indexOf("$") + 1);
      return <div key={li}><span className="cb-prompt">{prompt}</span><span className="cb-plain">{rest}</span></div>;
    }
    // export VAR=value
    if (line.trim().startsWith("export ")) {
      const parts = line.split("=");
      return (
        <div key={li}>
          <span className="cb-kw">{parts[0].replace("export ", "export ")}</span>
          <span className="cb-op">=</span>
          <span className="cb-s-str">{parts.slice(1).join("=")}</span>
        </div>
      );
    }
    return <div key={li}><span className="cb-plain">{line}</span></div>;
  });
}

// ─── Python highlighter ───────────────────────────────────────────────────────
const PY_KW = /\b(from|import|def|class|return|if|else|elif|for|while|in|not|and|or|True|False|None|async|await|with|as|pass|raise|try|except|print)\b/g;

function highlightPython(code: string): React.ReactNode {
  return code.split("\n").map((line, li) => {
    if (line.trim().startsWith("#")) {
      return <div key={li}><span className="cb-cm2">{line}</span></div>;
    }
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    const strRe = /(f?"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g;
    let lastIdx = 0;
    let m: RegExpExecArray | null;
    const segments: { start: number; end: number; str: string }[] = [];
    while ((m = strRe.exec(line)) !== null) {
      segments.push({ start: m.index, end: m.index + m[0].length, str: m[0] });
    }

    if (segments.length === 0) {
      // No strings — highlight keywords
      const highlighted = line.replace(PY_KW, match => `\x00kw\x01${match}\x02`);
      for (const chunk of highlighted.split(/\x00kw\x01(.*?)\x02/)) {
        if (chunk.match(PY_KW)) {
          parts.push(<span key={key++} className="cb-kw">{chunk}</span>);
        } else {
          parts.push(<span key={key++} className="cb-plain">{chunk}</span>);
        }
      }
    } else {
      let cursor = 0;
      for (const [segIdx, seg] of segments.entries()) {
        if (seg.start > cursor) {
          const plain = line.slice(cursor, seg.start);
          
          plain.split(PY_KW).map((chunk, i) => {
            const isKw = /^(from|import|def|class|return|if|else|elif|for|while|in|not|and|or|True|False|None|async|await|with|as|pass|raise|try|except|print)$/.test(chunk);
            parts.push(
              isKw 
                ? <span key={`kw-${segIdx}-${i}`} className="cb-kw">{chunk}</span>
                : <span key={`plain-${segIdx}-${i}`} className="cb-plain">{chunk}</span>
            );
          });
        }
        
        // Fix 2: Give the string segment a distinct key prefix
        parts.push(<span key={`str-${segIdx}`} className="cb-s-str">{seg.str}</span>);
        cursor = seg.end;
      }
      if (cursor < line.length) {
        parts.push(<span key={`end-${cursor}`} className="cb-plain">{line.slice(cursor)}</span>);
      }
    }

    return <div key={li}>{parts}</div>;
  });
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export default function CodeBlock({ code, lang = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const normalLang = lang.toLowerCase();
  const langColor = LANG_COLORS[normalLang] ?? "#6B7A99";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let highlighted: React.ReactNode;
  if (normalLang === "yaml")                          highlighted = highlightYAML(code);
  else if (normalLang === "json")                     highlighted = highlightJSON(code);
  else if (normalLang === "bash" || normalLang === "shell") highlighted = highlightBash(code);
  else if (normalLang === "python")                   highlighted = highlightPython(code);
  else highlighted = code.split("\n").map((line, i) => <div key={i}><span className="cb-plain">{line}</span></div>);

  return (
    <>
      <style>{CSS}</style>
      <div className="cb-root">
        <div className="cb-bar">
          <div className="cb-bar-left">
            {lang && <span className="cb-lang" style={{ color: langColor }}>{lang}</span>}
            {lang && filename && <span className="cb-sep">/</span>}
            {filename && <span className="cb-filename">{filename}</span>}
          </div>
          <button
            className={`cb-copy${copied ? " ok" : ""}`}
            onClick={handleCopy}
            type="button"
            aria-label="Copy code"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <pre className="cb-pre">
          <code>{highlighted}</code>
        </pre>
      </div>
    </>
  );
}