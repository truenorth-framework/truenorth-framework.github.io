import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center px-6 antialiased">
      <div className="text-center max-w-md w-full py-12 flex flex-col items-center">
        <div className="mb-10 group relative cursor-pointer">
          <div className="absolute inset-0 bg-[#00D4AA]/5 blur-3xl rounded-full group-hover:bg-[#00D4AA]/10 transition-colors duration-500" />

          <svg
            width="140"
            height="140"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <circle cx="60" cy="60" r="52" stroke="#1E293B" strokeWidth="2" />
            <circle cx="60" cy="60" r="46" stroke="#0F172A" strokeWidth="1" />
            <circle
              cx="60"
              cy="60"
              r="42"
              stroke="#1E293B"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            <text
              x="60"
              y="22"
              textAnchor="middle"
              fill="#475569"
              fontSize="9"
              fontWeight="700"
              fontFamily="monospace"
              className="select-none"
            >
              N
            </text>
            <text
              x="101"
              y="63"
              textAnchor="middle"
              fill="#475569"
              fontSize="9"
              fontWeight="700"
              fontFamily="monospace"
              className="select-none"
            >
              E
            </text>
            <text
              x="60"
              y="105"
              textAnchor="middle"
              fill="#475569"
              fontSize="9"
              fontWeight="700"
              fontFamily="monospace"
              className="select-none"
            >
              S
            </text>
            <text
              x="19"
              y="63"
              textAnchor="middle"
              fill="#475569"
              fontSize="9"
              fontWeight="700"
              fontFamily="monospace"
              className="select-none"
            >
              W
            </text>
            <g className="transform origin-[60px_60px] rotate-[135deg] group-hover:rotate-[495deg] transition-transform duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <polygon points="60,16 65,60 60,65 55,60" fill="#FF6B35" />
              <polygon points="60,65 65,60 60,104 55,60" fill="#334155" />
            </g>
            <circle
              cx="60"
              cy="60"
              r="4.5"
              fill="#0F172A"
              stroke="#64748B"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6B35]/20 bg-[#FF6B35]/5 text-xs font-mono text-[#FF6B35] tracking-wider mb-4 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
          ERROR CODE: 404
        </div>

        <h1 className="text-4xl font-extrabold text-[#F0F2F5] tracking-tight mb-4 sm:text-5xl">
          You've drifted off course.
        </h1>

        <p className="text-[#8B95A3] mb-10 leading-relaxed text-base max-w-sm">
          The coordinates you requested do not exist or have changed positions.
          Let's get you back to familiar waters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/"
            className="group/btn flex items-center justify-center gap-3 w-full sm:flex-1 px-8 py-4 rounded-lg bg-gradient-to-r from-[#00D4AA] to-[#00E5BA] text-[#050505] font-semibold tracking-wide hover:brightness-110 active:scale-[0.97] transition-all duration-200 text-sm shadow-[0_4px_20px_rgba(0,212,170,0.15)] hover:shadow-[0_4px_25px_rgba(0,212,170,0.3)]"
          >
            <span className="transform group-hover/btn:-translate-x-1.5 transition-transform duration-200">
              ←
            </span>
            <span>Return Home</span>
          </Link>

          {/* Secondary Docs Button */}
          <Link
            href="/docs"
            className="group/btn flex items-center justify-center gap-3 w-full sm:flex-1 px-8 py-4 rounded-lg border border-slate-800 bg-white/[0.02] text-[#A8B4C8] hover:text-[#F0F2F5] hover:border-slate-600 hover:bg-white/[0.05] active:scale-[0.97] transition-all duration-200 text-sm font-medium"
          >
            <span>Read Documentation</span>
            <span className="transform group-hover/btn:translate-x-1.5 transition-transform duration-200 text-slate-500 group-hover/btn:text-[#A8B4C8]">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
