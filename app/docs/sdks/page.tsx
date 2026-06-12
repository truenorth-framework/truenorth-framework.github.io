import Link from "next/link";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

  .si-root *, .si-root *::before, .si-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .si-root {
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #C5CDD8;
  }

  /* breadcrumb */
  .si-bc { display: flex; align-items: center; gap: 7px; margin-bottom: 2.5rem; flex-wrap: wrap; }
  .si-bc-link { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #263354; text-decoration: none; transition: color 0.15s; }
  .si-bc-link:hover { color: #6B7A99; }
  .si-bc-sep { color: #1C2740; font-size: 0.65rem; }
  .si-bc-cur { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7A99; }

  .si-h1 { font-size: clamp(1.9rem, 5vw, 3rem); font-weight: 900; color: #FFFFFF; letter-spacing: -0.03em; line-height: 1.08; margin-bottom: 1rem; }
  .si-lead { font-size: 1rem; color: #6B7A99; line-height: 1.75; margin-bottom: 2.5rem; max-width: 600px; }

  /* SDK grid */
  .si-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5px;
    background: #1C2740;
    border: 1px solid #1C2740;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 680px) { .si-grid { grid-template-columns: 1fr; } }

  .si-card {
    background: #0C1018;
    padding: 1.75rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
  }
  .si-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--sdk-color, #0DFF9A);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s cubic-bezier(.16,1,.3,1);
  }
  .si-card:hover { background: #0E1520; }
  .si-card:hover::before { transform: scaleX(1); }

  .si-card-head { display: flex; align-items: center; gap: 9px; margin-bottom: 0.875rem; }
  .si-card-name { font-size: 1rem; font-weight: 800; color: #FFFFFF; letter-spacing: -0.01em; }
  .si-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem; font-weight: 700; padding: 2px 7px;
    border-radius: 100px; letter-spacing: 0.08em; border: 1px solid;
  }
  .si-desc { font-size: 0.845rem; color: #6B7A99; line-height: 1.65; margin-bottom: 1.25rem; flex: 1; }
  .si-install {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px;
    background: #07090F;
    border: 1px solid #1C2740;
    border-radius: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; font-weight: 700;
    color: #F1FA8C;
    margin-bottom: 0.75rem;
    overflow: hidden;
  }
  .si-install-prompt { color: #0DFF9A; flex-shrink: 0; }
  .si-install-cmd { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .si-compat {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em;
    text-transform: uppercase; color: #263354;
  }

  /* Contract card */
  .si-contract {
    background: #0C1018; border: 1px solid #1C2740; border-radius: 12px;
    padding: 1.5rem 1.75rem;
  }
  .si-contract-title { font-size: 0.95rem; font-weight: 800; color: #FFFFFF; margin-bottom: 0.625rem; }
  .si-contract-desc { font-size: 0.875rem; color: #6B7A99; line-height: 1.72; }
  .si-contract-desc code {
    font-family: 'JetBrains Mono', monospace; font-size: 0.82em; font-weight: 700;
    color: #F1FA8C; background: rgba(241,250,140,0.06);
    border: 1px solid rgba(241,250,140,0.12); border-radius: 5px; padding: 1px 6px;
  }
`;

const SDKS = [
  {
    slug: "python",
    name: "Python",
    color: "#FFD700",
    badge: "Primary SDK",
    desc: "Reference implementation. All features land in Python first. Full async/await support.",
    cmd: "pip install truenorth-framework",
    compat: "Python 3.9+",
  },
  {
    slug: "nodejs",
    name: "Node.js / TypeScript",
    color: "#0DFF9A",
    badge: "Stable",
    desc: "TypeScript-native. Works with Next.js server actions, Express, Fastify, and streaming.",
    cmd: "npm install truenorth",
    compat: "Node.js 18+",
  },
  {
    slug: "go",
    name: "Go",
    color: "#00ADD8",
    badge: "Stable",
    desc: "Goroutine-safe, high-throughput. Built for production APIs with concurrent sessions.",
    cmd: "go get github.com/amareshhebbar/truenorth-go",
    compat: "Go 1.21+",
  },
  {
    slug: "expo",
    name: "Expo / React Native",
    color: "#4D9EFF",
    badge: "Beta",
    desc: "Mobile-first with offline SQLite mode and ImpossibleAI local LLM inference.",
    cmd: "npx expo install truenorth-expo",
    compat: "Expo SDK 50+",
  },
];

export default function SDKsIndexPage() {
  return (
    <>
      <style>{CSS}</style>
      <div className="si-root">

        {/* Breadcrumb */}
        <nav className="si-bc" aria-label="Breadcrumb">
          <Link href="/" className="si-bc-link">Home</Link>
          <span className="si-bc-sep">/</span>
          <Link href="/docs" className="si-bc-link">Docs</Link>
          <span className="si-bc-sep">/</span>
          <span className="si-bc-cur" aria-current="page">SDKs</span>
        </nav>

        <h1 className="si-h1">Language SDKs</h1>
        <p className="si-lead">
          TrueNorth has native SDKs for Python, Node.js / TypeScript, Go, and React Native / Expo. All SDKs expose the same three-method interface.
        </p>

        {/* Grid */}
        <div className="si-grid">
          {SDKS.map((sdk, i) => (
            <Link
              key={i}
              href={`/docs/sdks/${sdk.slug}`}
              className="si-card"
              // @ts-ignore
              style={{ "--sdk-color": sdk.color }}
            >
              <div className="si-card-head">
                <span className="si-card-name" style={{ color: sdk.color }}>{sdk.name}</span>
                <span
                  className="si-badge"
                  style={{
                    color: sdk.color,
                    background: sdk.color + "0D",
                    borderColor: sdk.color + "30",
                  }}
                >
                  {sdk.badge}
                </span>
              </div>
              <p className="si-desc">{sdk.desc}</p>
              <div className="si-install">
                <span className="si-install-prompt">$</span>
                <span className="si-install-cmd">{sdk.cmd}</span>
              </div>
              <span className="si-compat">{sdk.compat}</span>
            </Link>
          ))}
        </div>

        {/* Interface contract */}
        <div className="si-contract">
          <div className="si-contract-title">Interface Contract</div>
          <p className="si-contract-desc">
            All SDKs implement the same three-method interface:{" "}
            <code>create_session()</code>,{" "}
            <code>send(message)</code>, and{" "}
            <code>get_output()</code>.{" "}
            If you know one SDK, you know all of them. Parameter naming follows each language's conventions — snake_case for Python, camelCase for TypeScript and Go.
          </p>
        </div>

      </div>
    </>
  );
}