"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";

const channels = [
  {
    icon: "✉️",
    label: "Email",
    value: "founders@truenorth.ai",
    href: "mailto:founders@truenorth.ai",
    desc: "General questions, partnerships",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/amareshhebbar",
    href: "https://github.com/amareshhebbar",
    desc: "Code, issues, pull requests",
  },
  {
    icon: "𝕏",
    label: "Twitter / X",
    value: "@truenorthai",
    href: "https://twitter.com/truenorthai",
    desc: "Updates, announcements",
  },
  {
    icon: "💬",
    label: "Discord",
    value: "discord.gg/truenorth",
    href: "https://discord.gg/truenorth",
    desc: "Community, real-time help",
  },
  {
    icon: "🗣️",
    label: "Discussions",
    value: "GitHub Discussions",
    href: "https://github.com/amareshhebbar/TrueNorth/discussions",
    desc: "Technical questions, ideas",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "General", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Questions, enterprise inquiries, bug reports, or just want to say hello — here's how to reach us."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Contact" }]}
      />

      <section className="max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Channels */}
          <div>
            <h2 className="text-xl font-bold text-[#F0F2F5] mb-6">Reach Amaresh</h2>
            <div className="space-y-3 mb-10">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-[#1E2329] bg-[#111318] hover:border-[#00D4AA]/40 transition-colors group"
                >
                  <span className="text-xl w-8 text-center">{ch.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs text-[#4A5568] mb-0.5">{ch.label}</div>
                    <div className="text-sm text-[#F0F2F5] font-mono group-hover:text-[#00D4AA] transition-colors">{ch.value}</div>
                    <div className="text-xs text-[#4A5568] mt-0.5">{ch.desc}</div>
                  </div>
                  <span className="text-[#4A5568] group-hover:text-[#00D4AA] transition-colors">→</span>
                </a>
              ))}
            </div>

            {/* Enterprise */}
            <div className="p-5 rounded-xl border border-[#FF6B35]/20 bg-[#FF6B35]/5">
              <div className="text-xs font-mono text-[#FF6B35] tracking-widest mb-2">FOR ENTERPRISE</div>
              <p className="text-sm text-[#8B95A3] leading-relaxed mb-3">
                Compliance questions, custom deployment, DPDP consulting, volume licensing, or on-premise installation support.
              </p>
              <a
                href="mailto:founders@truenorth.ai?subject=Enterprise"
                className="text-sm text-[#FF6B35] hover:underline"
              >
                founders@truenorth.ai — subject: "Enterprise" →
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-xl font-bold text-[#F0F2F5] mb-6">Send a Message</h2>

            {status === "sent" ? (
              <div className="p-8 rounded-xl border border-[#00D4AA]/30 bg-[#00D4AA]/5 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-[#F0F2F5] mb-2">Message sent</h3>
                <p className="text-[#8B95A3] text-sm">We typically reply within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#8B95A3] mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#1E2329] text-[#F0F2F5] text-sm placeholder:text-[#4A5568] focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8B95A3] mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#1E2329] text-[#F0F2F5] text-sm placeholder:text-[#4A5568] focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8B95A3] mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#1E2329] text-[#F0F2F5] text-sm focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
                  >
                    <option>General</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Enterprise</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#8B95A3] mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 rounded-lg bg-[#111318] border border-[#1E2329] text-[#F0F2F5] text-sm placeholder:text-[#4A5568] focus:outline-none focus:border-[#00D4AA]/50 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending" || !form.name || !form.email || !form.message}
                  className="w-full py-3 rounded bg-[#00D4AA] text-black font-semibold hover:bg-[#00997A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
