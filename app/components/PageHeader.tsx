import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  accentColor?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  accentColor = "#00D4AA",
}: PageHeaderProps) {
  return (
    <div className="pt-28 pb-16 px-6 relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accentColor}0D 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-[#4A5568] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00D4AA] transition-colors">TrueNorth</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#00D4AA] transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-[#8B95A3]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="badge-pill mb-4 w-fit" style={{ borderColor: accentColor, color: accentColor }}>
            {eyebrow}
          </div>
        )}
        <h1
          className="font-bold text-[#F0F2F5] mb-4 leading-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-[#8B95A3] max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
