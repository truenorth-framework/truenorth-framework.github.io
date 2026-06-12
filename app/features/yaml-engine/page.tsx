import PageHeader from "../../components/PageHeader";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YAML Engine — TrueNorth Features",
  description: "Configure complete AI agents in 15 lines of YAML.",
};

const fieldTypes = [
  { type: "text", desc: "Free-form string input", example: "\"I'm Priya Sharma\"" },
  { type: "integer", desc: "Whole number", example: "28" },
  { type: "float", desc: "Decimal number", example: "5.5" },
  { type: "date", desc: "Date in any format, normalized to ISO", example: "\"born in 1995\" → 1995" },
  { type: "enum", desc: "One of predefined options", example: "weight_loss | muscle_gain | endurance" },
  { type: "boolean", desc: "Yes/no values", example: "\"yeah\" → true" },
  { type: "email", desc: "Validated email address", example: "priya@example.com" },
  { type: "phone", desc: "Validated phone number (India-first)", example: "+91 98765 43210" },
  { type: "list", desc: "Array of values", example: "[\"skill1\", \"skill2\"]" },
];

export default function YAMLEnginePage() {
  return (
    <>
      <PageHeader
        eyebrow="YAML Engine"
        title="Configuration replaced code."
        subtitle="200 lines of Python state management becomes 15 lines of YAML. Zero code. Full production capability."
        breadcrumbs={[{ label: "Features", href: "/features" }, { label: "YAML Engine" }]}
      />

      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        {/* Side-by-side comparison */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Before */}
            <div className="rounded-xl border border-red-900/40 bg-[#110A0A] overflow-hidden">
              <div className="px-4 py-3 border-b border-red-900/30 flex items-center justify-between">
                <span className="text-xs text-red-400 font-mono">❌ Without TrueNorth (200+ lines)</span>
              </div>
              <div className="p-4">
                <div className="space-y-1 text-xs font-mono text-red-300/50">
                  <div>state = {"{}"}</div>
                  <div>conversation_history = []</div>
                  <div>current_field_index = 0</div>
                  <div>retry_count = 0</div>
                  <div className="text-[#4A5568]"># ... 60 more lines of state...</div>
                  <div>&nbsp;</div>
                  <div>def validate_age(value):</div>
                  <div className="pl-4">if not isinstance(value, int):</div>
                  <div className="pl-8">raise ValidationError(...)</div>
                  <div className="pl-4">if value &lt; 0 or value &gt; 120:</div>
                  <div className="pl-8">raise ValidationError(...)</div>
                  <div className="text-[#4A5568]"># ... 40 more validators...</div>
                  <div>&nbsp;</div>
                  <div>def detect_conflict(prev, curr):</div>
                  <div className="pl-4">...</div>
                  <div className="text-[#4A5568]"># ... 50 more lines...</div>
                  <div>&nbsp;</div>
                  <div>def score_confidence(field, value):</div>
                  <div className="pl-4">...</div>
                  <div className="text-[#4A5568]"># ... 40 more lines...</div>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="rounded-xl border border-[#00D4AA]/30 bg-[#0A1410] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#00D4AA]/20 flex items-center justify-between">
                <span className="text-xs text-[#00D4AA] font-mono">✓ With TrueNorth (15 lines)</span>
              </div>
              <div className="p-4">
                <div className="space-y-0.5 text-xs font-mono">
                  <div><span className="text-[#79C0FF]">id</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A5D6FF]">fitness_plan</span></div>
                  <div><span className="text-[#79C0FF]">persona</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A8FF78]">"You are Alex, a fitness coach."</span></div>
                  <div>&nbsp;</div>
                  <div><span className="text-[#79C0FF]">fields</span><span className="text-[#8B95A3]">:</span></div>
                  <div className="pl-4"><span className="text-[#00D4AA]">- name</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A5D6FF]">age</span></div>
                  <div className="pl-6"><span className="text-[#79C0FF]">type</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A5D6FF]">integer</span></div>
                  <div className="pl-6"><span className="text-[#79C0FF]">range</span><span className="text-[#8B95A3]">:</span> <span className="text-[#FFD700]">[16, 90]</span></div>
                  <div className="pl-6"><span className="text-[#79C0FF]">required</span><span className="text-[#8B95A3]">:</span> <span className="text-[#FFD700]">true</span></div>
                  <div className="pl-4"><span className="text-[#00D4AA]">- name</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A5D6FF]">goal</span></div>
                  <div className="pl-6"><span className="text-[#79C0FF]">type</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A5D6FF]">enum</span></div>
                  <div className="pl-6"><span className="text-[#79C0FF]">options</span><span className="text-[#8B95A3]">:</span> <span className="text-[#A5D6FF]">[weight_loss, muscle_gain]</span></div>
                  <div>&nbsp;</div>
                  <div className="text-[#00D4AA] text-[10px]"># Validation ✓ Conflict detection ✓ Confidence scoring ✓</div>
                  <div className="text-[#00D4AA] text-[10px]"># Hallucination firewall ✓ Multilingual ✓ Compliance ✓</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Field types table */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#F0F2F5] mb-6">Field Types</h2>
          <div className="rounded-xl border border-[#1E2329] overflow-hidden">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b border-[#1E2329] bg-[#111318]">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#4A5568]">Extracted from</th>
                </tr>
              </thead>
              <tbody>
                {fieldTypes.map((ft, i) => (
                  <tr key={ft.type} className={`border-b border-[#1E2329] ${i % 2 === 0 ? "bg-[#0A0B0D]" : "bg-[#111318]"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-[#00D4AA]">{ft.type}</td>
                    <td className="px-4 py-3 text-[#8B95A3]">{ft.desc}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#4A5568]">{ft.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/playground" className="inline-block px-8 py-3 bg-[#00D4AA] text-black font-semibold rounded-none hover:bg-[#FF6B35] transition-colors">
            Try YAML Engine in Playground →
          </Link>
        </div>
      </div>
    </>
  );
}
