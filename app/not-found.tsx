import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Compass SVG — pointing wrong direction */}
        <div className="mb-8 flex justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" stroke="#1E2329" strokeWidth="2" />
            <circle cx="60" cy="60" r="42" stroke="#1E2329" strokeWidth="1" strokeDasharray="4 4" />
            {/* Cardinal directions */}
            <text x="60" y="16" textAnchor="middle" fill="#4A5568" fontSize="10" fontFamily="monospace">N</text>
            <text x="104" y="64" textAnchor="middle" fill="#4A5568" fontSize="10" fontFamily="monospace">E</text>
            <text x="60" y="111" textAnchor="middle" fill="#4A5568" fontSize="10" fontFamily="monospace">S</text>
            <text x="16" y="64" textAnchor="middle" fill="#4A5568" fontSize="10" fontFamily="monospace">W</text>
            {/* Needle — rotated 135deg (pointing wrong) */}
            <g transform="rotate(135, 60, 60)">
              <polygon points="60,20 64,60 60,66 56,60" fill="#FF6B35" />
              <polygon points="60,66 64,60 60,100 56,60" fill="#1E2329" />
            </g>
            <circle cx="60" cy="60" r="4" fill="#111318" stroke="#8B95A3" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="text-xs font-mono text-[#FF6B35] tracking-widest mb-3">404</div>
        <h1 className="text-4xl font-bold text-[#F0F2F5] mb-4">
          You've drifted off course.
        </h1>
        <p className="text-[#8B95A3] mb-8 leading-relaxed">
          The page you're looking for doesn't exist — or it moved. Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 rounded bg-[#00D4AA] text-black font-semibold hover:bg-[#00997A] transition-colors text-sm"
          >
            → Back to Home
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 rounded border border-[#1E2329] text-[#8B95A3] hover:text-[#F0F2F5] hover:border-[#8B95A3] transition-colors text-sm"
          >
            Read the Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
