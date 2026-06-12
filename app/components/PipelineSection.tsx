"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stages = [
  { id: "01", name: "LANGUAGE DETECTION", desc: "Detect locale, set response language automatically", special: false },
  { id: "02", name: "EMOTION DETECTION", desc: "Valence + arousal scoring, shift tracking across turns", special: false },
  { id: "03", name: "PII DETECTION", desc: "Mask sensitive data before any LLM sees it", special: false },
  { id: "04", name: "CONVERSATION PLANNING", desc: "Decide which field to collect next, optimally", special: false },
  { id: "05", name: "FIELD EXTRACTION", desc: "Pull structured values from natural language input", special: false },
  { id: "06", name: "CONFLICT DETECTION", desc: "Catch turn-to-turn contradictions automatically", special: false },
  { id: "07", name: "FIELD VALIDATION", desc: "Type, range, and enum checks on every extracted value", special: false },
  { id: "08", name: "CONFIDENCE SCORING", desc: "8-factor per-field confidence rating system", special: false },
  { id: "09", name: "HALLUCINATION FIREWALL", desc: "Claim extract → verify → sanitise. The critical safety gate", special: true },
  { id: "10", name: "OUTPUT GENERATION", desc: "Structured JSON, markdown, or plain text output", special: false },
  { id: "11", name: "SOURCE TRACING", desc: "Sentence → field → turn attribution for every value", special: false },
  { id: "12", name: "COST RECORDING", desc: "USD cost per call, session, and turn — full transparency", special: false },
  { id: "13", name: "MCP TOOL EXECUTION", desc: "Calculator, web search, and custom tool integrations", special: false },
];

export default function PipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    // h-full ensures it stretches to the snap container height
    // overflow-y-auto allows internal scrolling if the user is on a very short screen
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-[#0A0B0D] scrollbar-hide py-32" ref={ref}>
      
      {/* Immersive Background Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,212,170,0.04) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center my-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,212,170,0.1)]">
            The Engine
          </div>
          <h2 className="font-extrabold text-[#F0F2F5] tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            The 13-Stage Pipeline
          </h2>
          <p className="text-[#8B95A3] text-base sm:text-lg max-w-2xl mx-auto">
            Every message runs all 13 stages in sequence. No shortcuts. No black boxes. Every stage is strictly auditable.
          </p>
        </div>

        {/* The Pipeline Diagram - Alternating Centered Layout */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col">
          
          {/* THE SPINE (Vertical center line on desktop, left line on mobile) */}
          <div className="absolute top-0 bottom-0 left-[15px] md:left-1/2 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
            {/* The traveling "Data Pulse" */}
            <div className="w-full h-32 bg-gradient-to-b from-transparent via-[#00D4AA] to-transparent animate-data-flow shadow-[0_0_15px_#00D4AA]" />
          </div>

          <div className="space-y-4 md:space-y-0 relative z-10">
            {stages.map((stage, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div 
                  key={stage.id} 
                  className={`flex items-center w-full ${isLeft ? "md:justify-start" : "md:justify-end"} relative pl-10 md:pl-0`}
                >
                  {/* The actual content card */}
                  <div 
                    className={`w-full md:w-[45%] flex ${isLeft ? "md:justify-end md:pr-10" : "md:justify-start md:pl-10"} py-2 md:py-3`}
                    style={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView 
                        ? "translateY(0)" 
                        // Mobile slides up, desktop slides in from left/right
                        : `translateY(20px)`,
                      transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`
                    }}
                  >
                    <div 
                      className={`relative w-full max-w-md p-4 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-default
                        ${stage.special 
                          ? "bg-[#FF6B35]/5 border-[#FF6B35]/30 hover:border-[#FF6B35]/60 hover:shadow-[0_0_20px_rgba(255,107,53,0.15)]" 
                          : "bg-[#111318]/80 border-white/10 hover:border-[#00D4AA]/40 hover:shadow-[0_0_20px_rgba(0,212,170,0.1)]"
                        }
                      `}
                    >
                      {/* Node Connection Point (Dot) */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 
                        ${isLeft ? "md:-right-[47px]" : "md:-left-[47px]"} 
                        -left-[31px] md:left-auto
                        ${stage.special ? "bg-[#0A0B0D] border-[#FF6B35]" : "bg-[#0A0B0D] border-[#00D4AA]"}
                      `} />

                      {/* Card Content */}
                      <div className={`flex flex-col ${isLeft ? "md:text-right text-left" : "text-left"}`}>
                        <div className={`flex items-center gap-2 mb-1 ${isLeft ? "md:justify-end justify-start" : "justify-start"}`}>
                          <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${stage.special ? "bg-[#FF6B35]/10 text-[#FF6B35]" : "bg-[#00D4AA]/10 text-[#00D4AA]"}`}>
                            {stage.id}
                          </span>
                          <h3 className={`text-sm font-bold tracking-wide ${stage.special ? "text-[#FF6B35]" : "text-[#F0F2F5]"}`}>
                            {stage.name} {stage.special && "⚡"}
                          </h3>
                        </div>
                        <p className="text-xs text-[#8B95A3] leading-relaxed">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx global>{`
        /* Smooth continuous flow animation for the spine */
        @keyframes dataFlow {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(1500px); opacity: 0; }
        }
        .animate-data-flow {
          animation: dataFlow 4s linear infinite;
        }
        /* Hide scrollbar for cleaner look if it needs to scroll on tiny screens */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}