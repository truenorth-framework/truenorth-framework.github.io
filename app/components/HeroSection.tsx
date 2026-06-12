"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');

  .hr-root *, .hr-root *::before, .hr-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .hr-root {
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #080B12;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Grid bg ── */
  .hr-grid-bg {
    position: absolute; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(28,39,64,0.6) 1px, transparent 1px),
      linear-gradient(90deg, rgba(28,39,64,0.6) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent);
    -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent);
  }

  /* ── Canvas ── */
  .hr-canvas {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 1;
  }

  /* ── Radial vignette ── */
  .hr-vignette {
    position: absolute; inset: 0; z-index: 2; pointer-events: none;
    background: radial-gradient(ellipse 100% 80% at 50% 0%, transparent 30%, #080B12 100%);
  }

  /* ── Content ── */
  .hr-content {
    position: relative; z-index: 10;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(7rem, 14vw, 10rem) clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* ── Badge ── */
  .hr-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 100px;
    background: rgba(13,255,154,0.07);
    border: 1px solid rgba(13,255,154,0.2);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    font-weight: 700;
    color: #0DFF9A;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 2.5rem;
    backdrop-filter: blur(8px);
  }
  .hr-badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #0DFF9A;
    animation: hrPulse 2s infinite;
    flex-shrink: 0;
  }
  @keyframes hrPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* ── Headline ── */
  .hr-headline {
    font-size: clamp(2.6rem, 6.5vw, 5.5rem);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin-bottom: 1.75rem;
  }
  .hr-headline-line2 {
    color: #0DFF9A;
    display: block;
    margin-top: 0.1em;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .hr-headline-line2.hidden { opacity: 0; transform: translateY(16px); }
  .hr-headline-line2.visible { opacity: 1; transform: translateY(0); }
  .hr-cursor {
    display: inline-block;
    width: 3px;
    height: 0.85em;
    background: #0DFF9A;
    vertical-align: text-bottom;
    margin-left: 3px;
    animation: hrBlink 0.9s step-end infinite;
  }
  @keyframes hrBlink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── Sub ── */
  .hr-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: #6B7A99;
    line-height: 1.7;
    max-width: 600px;
    margin-bottom: 3rem;
  }
  .hr-sub strong { color: #C5CDD8; font-weight: 600; }

  /* ── Actions ── */
  .hr-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-bottom: 5rem;
  }
  .hr-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: #0DFF9A;
    color: #000;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: transform 0.2s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1;
  }
  .hr-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(13,255,154,0.35);
  }
  .hr-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: transparent;
    color: #C5CDD8;
    border: 1px solid #263354;
    border-radius: 10px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    white-space: nowrap;
    line-height: 1;
  }
  .hr-btn-secondary:hover {
    background: #0E1420;
    border-color: #6B7A99;
    color: #FFFFFF;
  }

  /* ── Stats card ── */
  .hr-stats-card {
    width: 100%;
    background: rgba(14,20,32,0.7);
    border: 1px solid #1C2740;
    border-radius: 16px;
    backdrop-filter: blur(16px);
    overflow: hidden;
  }
  .hr-stats-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 900px) {
    .hr-stats-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 480px) {
    .hr-stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .hr-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.75rem 1rem;
    border-right: 1px solid #1C2740;
    border-bottom: 1px solid #1C2740;
    gap: 6px;
  }
  /* Remove right border on last in each row */
  @media (min-width: 901px) {
    .hr-stat:nth-child(6n) { border-right: none; }
    .hr-stat:nth-child(n+4) { border-bottom: none; }
  }
  @media (max-width: 900px) and (min-width: 481px) {
    .hr-stat:nth-child(3n) { border-right: none; }
    .hr-stat:nth-child(n+4) { border-bottom: none; }
  }
  @media (max-width: 480px) {
    .hr-stat:nth-child(2n) { border-right: none; }
    .hr-stat:nth-child(n+5) { border-bottom: none; }
  }
  .hr-stat-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 700;
    color: #0DFF9A;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .hr-stat-lbl {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6B7A99;
    text-align: center;
  }

  /* ── Scroll hint ── */
  .hr-scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0.45;
    animation: hrBob 2s ease-in-out infinite;
  }
  @keyframes hrBob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
  .hr-scroll-line {
    width: 1px;
    height: 28px;
    background: linear-gradient(to bottom, #6B7A99, transparent);
  }
  .hr-scroll-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #6B7A99;
  }
`;

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -999, y: -999 });
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number; c: string };
    const COLORS = ["#0DFF9A", "#0DFF9A", "#4D9EFF", "#FFFFFF"];
    const COUNT  = 320;

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: 0.08 + Math.random() * 0.18,
      vy: (Math.random() - 0.5) * 0.06,
      r:  0.7 + Math.random() * 1.1,
      a:  0.15 + Math.random() * 0.35,
      c:  COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        const dx   = mouse.current.x - p.x;
        const dy   = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const f = ((120 - dist) / 120) * 0.15;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
        p.vx = p.vx * 0.985 + 0.09 * 0.015;
        p.vy = p.vy * 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > canvas.width  + 8) p.x = -8;
        if (p.x < -8) p.x = canvas.width + 8;
        if (p.y > canvas.height + 8) p.y = -8;
        if (p.y < -8) p.y = canvas.height + 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="hr-canvas" aria-hidden="true" />;
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
const LINE1 = "DECLARE THE OUTCOME.";

function TypewriterHeading() {
  const [typed,     setTyped]     = useState("");
  const [line2,     setLine2]     = useState(false);
  const [showCursor,setShowCursor]= useState(true);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(LINE1.slice(0, i));
      if (i >= LINE1.length) {
        clearInterval(iv);
        setTimeout(() => { setShowCursor(false); setLine2(true); }, 350);
      }
    }, 48);
    return () => clearInterval(iv);
  }, []);

  return (
    <h1 className="hr-headline">
      {typed}{showCursor && <span className="hr-cursor" />}
      <span className={`hr-headline-line2 ${line2 ? "visible" : "hidden"}`}>
        SKIP THE LOGIC.
      </span>
    </h1>
  );
}

// ─── COUNT-UP ─────────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(e * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, active, duration]);
  return val;
}

// ─── STAT ITEM ────────────────────────────────────────────────────────────────
const STATS = [
  { value: 25506, label: "Lines of code",  suffix: ""  },
  { value: 1258,  label: "Tests",          suffix: ""  },
  { value: 8,     label: "LLM providers",  suffix: ""  },
  { value: 4,     label: "SDKs",           suffix: ""  },
  { value: 2,     label: "Halluc. rate",   suffix: "%" },
  { value: 22,    label: "Languages",      suffix: "+" },
];

function StatItem({ value, label, suffix, active }: { value: number; label: string; suffix: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="hr-stat">
      <span className="hr-stat-val">{count.toLocaleString()}{suffix}</span>
      <span className="hr-stat-lbl">{label}</span>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section className="hr-root">
        <div className="hr-grid-bg" />
        <ParticleCanvas />
        <div className="hr-vignette" />

        <div className="hr-content">
          {/* Badge */}
          <div className="hr-badge">
            <span className="hr-badge-dot" />
            Open Source · Apache 2.0 · v0.1.5
          </div>

          {/* Headline */}
          <TypewriterHeading />

          {/* Subtitle */}
          <p className="hr-sub">
            Define your AI agent in YAML.{" "}
            <strong>TrueNorth</strong> runs the conversation — extraction,
            safety, compliance, WhatsApp delivery.
          </p>

          {/* Actions */}
          <div className="hr-actions">
            <a
              href="https://pypi.org/project/truenorth-framework/"
              target="_blank"
              rel="noopener noreferrer"
              className="hr-btn-primary"
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10h14V4z"/>
              </svg>
              pip install truenorth
            </a>
            <a
              href="https://github.com/amareshhebbar/TrueNorth"
              target="_blank"
              rel="noopener noreferrer"
              className="hr-btn-secondary"
            >
              <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View on GitHub
            </a>
            <Link href="/docs/quickstart" className="hr-btn-secondary">
              Read the docs →
            </Link>
          </div>

          {/* Stats */}
          <div className="hr-stats-card" ref={statsRef}>
            <div className="hr-stats-grid">
              {STATS.map((s) => (
                <StatItem key={s.label} {...s} active={statsVisible} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hr-scroll" aria-hidden="true">
          <div className="hr-scroll-line" />
          <div className="hr-scroll-dot" />
        </div>
      </section>
    </>
  );
}