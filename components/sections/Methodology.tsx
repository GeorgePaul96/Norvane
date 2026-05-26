"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Diagnose",
    tagline: "Understand before designing",
    description:
      "We conduct structured interviews, process observations, and data reviews to build an accurate picture of your operational reality — including the constraints and tensions that rarely appear in formal documentation.",
    outputs: ["Operational assessment report", "Constraint map", "Priority matrix"],
  },
  {
    number: "02",
    title: "Map",
    tagline: "Document how work actually flows",
    description:
      "Every relevant process, handoff, decision point, and information flow is documented in precise, legible form. This is the reference layer everything else builds from.",
    outputs: ["Process maps", "Information flow diagrams", "Role and responsibility matrices"],
  },
  {
    number: "03",
    title: "Structure",
    tagline: "Design the improved system",
    description:
      "We design the new operational architecture — process flows, coordination mechanisms, reporting structures, and decision frameworks — built specifically for your context.",
    outputs: ["Redesigned process architecture", "Systems specification", "Implementation roadmap"],
  },
  {
    number: "04",
    title: "Implement",
    tagline: "Build with precision",
    description:
      "We work alongside your team to build the systems, templates, and tools defined in the design phase — with practical attention to adoption and change management.",
    outputs: ["Live operational systems", "Configured tools and templates", "Training materials"],
  },
  {
    number: "05",
    title: "Embed",
    tagline: "Make it stick",
    description:
      "New systems only deliver value if they are actually used. We focus significant effort on embedding new processes into daily operations, addressing resistance and reinforcing consistency.",
    outputs: ["Team onboarding", "Usage monitoring", "Process governance"],
  },
  {
    number: "06",
    title: "Improve",
    tagline: "Refine based on operational reality",
    description:
      "Once embedded, we create structured feedback loops that allow the system to improve continuously — informed by operational data, frontline input, and performance monitoring.",
    outputs: ["Review cadences", "Performance dashboards", "Improvement backlog"],
  },
];

export default function Methodology() {
  const [activePhase, setActivePhase] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="methodology" className="py-28 md:py-36 dark:bg-surface-900 bg-surface-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="max-w-2xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
            <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
              How We Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
          >
            A rigorous, repeatable methodology.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg dark:text-ink-300 text-ink-400 leading-relaxed"
          >
            Our engagement process is structured, transparent, and designed to produce durable
            operational improvements — not presentations.
          </motion.p>
        </div>

        {/* Phase selector — desktop horizontal timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:block"
        >
          {/* Timeline track */}
          <div className="relative mb-10">
            <div className="absolute top-5 left-0 right-0 h-px dark:bg-white/[0.06] bg-black/[0.06]" />
            <div
              className="absolute top-5 left-0 h-px bg-steel-500/60 transition-all duration-500 ease-out"
              style={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
            />
            <div className="grid grid-cols-6 relative">
              {phases.map((phase, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-semibold transition-all duration-300 z-10 ${
                      i === activePhase
                        ? "dark:bg-steel-500 bg-steel-500 border-steel-500 dark:text-white text-white"
                        : i < activePhase
                        ? "dark:bg-surface-850 bg-white dark:border-steel-500/40 border-steel-500/40 dark:text-steel-400 text-steel-600"
                        : "dark:bg-surface-850 bg-white dark:border-white/[0.08] border-black/[0.08] dark:text-ink-400 text-ink-400 group-hover:dark:border-white/[0.2] group-hover:border-black/[0.2]"
                    }`}
                  >
                    {phase.number}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors duration-200 ${
                      i === activePhase
                        ? "dark:text-ink-100 text-ink-900"
                        : "dark:text-ink-400 text-ink-400 group-hover:dark:text-ink-200 group-hover:text-ink-700"
                    }`}
                  >
                    {phase.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Phase detail */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-10 p-8 rounded-xl dark:bg-surface-850/50 bg-white/70 border dark:border-white/[0.06] border-black/[0.06]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold dark:text-steel-500/20 text-steel-500/15">
                  {phases[activePhase].number}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold dark:text-ink-100 text-ink-900">
                    {phases[activePhase].title}
                  </h3>
                  <p className="text-sm dark:text-steel-400 text-steel-600 mt-0.5">
                    {phases[activePhase].tagline}
                  </p>
                </div>
              </div>
              <p className="text-base dark:text-ink-300 text-ink-400 leading-relaxed">
                {phases[activePhase].description}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest dark:text-ink-400 text-ink-400 mb-4">
                Phase Outputs
              </div>
              <div className="flex flex-col gap-2.5">
                {phases[activePhase].outputs.map((output, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg dark:bg-surface-800/60 bg-surface-50/80 border dark:border-white/[0.04] border-black/[0.04]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-steel-500/60" />
                    <span className="text-sm dark:text-ink-200 text-ink-700">{output}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative p-6 rounded-xl dark:bg-surface-850/50 bg-white/70 border dark:border-white/[0.06] border-black/[0.06]"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full dark:bg-steel-500/10 bg-steel-500/8 border dark:border-steel-500/25 border-steel-500/20 flex items-center justify-center text-xs font-semibold dark:text-steel-400 text-steel-600 flex-shrink-0 mt-0.5">
                  {phase.number}
                </div>
                <div>
                  <h3 className="text-base font-semibold dark:text-ink-100 text-ink-900 mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-sm dark:text-steel-400/80 text-steel-600/70 mb-3">
                    {phase.tagline}
                  </p>
                  <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
