"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = async () => {
    if (!email) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("done");
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Stay Updated"
        title="Release Announcements"
        subtitle="No spam. Only releases. Max 1 email per month."
        breadcrumbs={[{ label: "TrueNorth", href: "/" }, { label: "Newsletter" }]}
      />

      <section className="max-w-xl mx-auto px-6 pb-32">
        {status === "done" ? (
          <div className="p-10 rounded-2xl border border-[#00D4AA]/30 bg-[#00D4AA]/5 text-center">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-[#F0F2F5] mb-2">You're in.</h2>
            <p className="text-[#8B95A3]">We'll notify you when a new version ships. That's it.</p>
          </div>
        ) : (
          <div>
            <div className="p-6 rounded-xl border border-[#1E2329] bg-[#111318] mb-6">
              <h3 className="font-semibold text-[#F0F2F5] mb-2">What you'll get</h3>
              <div className="space-y-2 text-sm text-[#8B95A3]">
                {[
                  "New version announcement with changelog highlights",
                  "Breaking changes flagged clearly",
                  "Notable community projects if any shipped that month",
                  "Nothing else. Ever.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#00D4AA] mt-0.5">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="you@company.com"
                className="flex-1 px-4 py-3 rounded-lg bg-[#111318] border border-[#1E2329] text-[#F0F2F5] text-sm placeholder:text-[#4A5568] focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={status === "submitting" || !email}
                className="px-6 py-3 rounded bg-[#00D4AA] text-black font-semibold hover:bg-[#00997A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm flex-shrink-0"
              >
                {status === "submitting" ? "…" : "Subscribe"}
              </button>
            </div>
            <p className="text-xs text-[#4A5568] mt-3 text-center">
              Unsubscribe any time. We use a simple email list, not a CRM.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
