import Link from "next/link";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');

  .ph-root *, .ph-root *::before, .ph-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ph-root {
    width: 100%;
    background: #080B12;
    border-bottom: 1px solid #1C2740;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    position: relative;
    overflow: hidden;
  }
  .ph-grid-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(28,39,64,0.45) 1px, transparent 1px),
      linear-gradient(90deg, rgba(28,39,64,0.45) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 100%);
  }
  .ph-inner {
    position: relative; z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 6vw, 4.5rem);
  }
  .ph-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .ph-bc-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #263354;
    text-decoration: none;
    transition: color 0.15s;
    text-transform: uppercase;
  }
  .ph-bc-link:hover { color: #6B7A99; }
  .ph-bc-sep {
    font-size: 0.65rem;
    color: #1C2740;
  }
  .ph-bc-current {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #6B7A99;
    text-transform: uppercase;
  }
  .ph-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 14px;
    border-radius: 100px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .ph-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor;
    animation: phPulse 2s infinite;
  }
  @keyframes phPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .ph-title {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    margin-bottom: 1.25rem;
    max-width: 800px;
  }
  .ph-subtitle {
    font-size: clamp(0.95rem, 1.8vw, 1.15rem);
    color: #6B7A99;
    line-height: 1.7;
    max-width: 640px;
  }
`;

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
  accentColor?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  accentColor = "#0DFF9A",
}: PageHeaderProps) {
  return (
    <>
      <style>{CSS}</style>
      <header className="ph-root">
        <div className="ph-grid-bg" aria-hidden="true" />
        <div className="ph-inner">
          {breadcrumbs.length > 0 && (
            <nav className="ph-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="ph-bc-link">Home</Link>
              {breadcrumbs.map((bc, i) => (
                <span key={i} style={{ display: "contents" }}>
                  <span className="ph-bc-sep" aria-hidden="true">/</span>
                  {bc.href ? (
                    <Link href={bc.href} className="ph-bc-link">{bc.label}</Link>
                  ) : (
                    <span className="ph-bc-current" aria-current="page">{bc.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div
            className="ph-eyebrow"
            style={{
              background: accentColor + "0D",
              border: `1px solid ${accentColor}33`,
              color: accentColor,
            }}
          >
            <span className="ph-eyebrow-dot" />
            {eyebrow}
          </div>
          <h1 className="ph-title">{title}</h1>
          <p className="ph-subtitle">{subtitle}</p>
        </div>
      </header>
    </>
  );
}