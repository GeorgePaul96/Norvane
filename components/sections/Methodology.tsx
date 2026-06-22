"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Diagnose",
    tagline: "Understand local habits and bottlenecks",
    description:
      "We conduct intensive field observations, data flow path audits, and structured interviews with execution teams to expose the hidden friction, coordination gaps, and key-person dependencies that trailing reports mask.",
    outputs: ["Coordination Risk Audit", "Spreadsheet Registry", "Priority Modernization Blueprint"],
  },
  {
    number: "02",
    title: "Map",
    tagline: "Document how actual work flows",
    description:
      "We map out every single process handoff, data entry step, buffer constraint, and communication pipeline. Not the idealized version written in corporate manuals, but the messy, actual operational path.",
    outputs: ["High-Fidelity Process Maps", "Endpoint Data-Flow Blueprints", "Handoff Vulnerability Matrices"],
  },
  {
    number: "03",
    title: "Structure",
    tagline: "Design custom operational architecture",
    description:
      "We design the optimized operational system, including process paths, scheduling buffers, coordination cadences, database integrations, and custom internal tools, specifically structured to solve your bottlenecks.",
    outputs: ["To-Be System Specification", "Database Schema & Bridge Designs", "Custom Tooling Prototypes"],
  },
  {
    number: "04",
    title: "Implement",
    tagline: "Construct the systems with precision",
    description:
      "We build the database bridges, configure the synchronization flows, construct the custom operational portals, and set up the planning boards. Every integration is tested against real operational conditions before handover.",
    outputs: ["Configured Database Bridges", "Live Operational Portals & Tools", "Automated Synchronization Scripts"],
  },
  {
    number: "05",
    title: "Stabilize",
    tagline: "Embed the process deep in daily habits",
    description:
      "A modern systems design is worthless if your teams bypass it. We spend significant hands-on energy embedding the new workflows into daily routines, onboarding operators, and refining tools to eradicate friction.",
    outputs: ["Frontline Operator Onboarding", "Usage & Process Compliance Logs", "Refined Habit Checklists"],
  },
  {
    number: "06",
    title: "Scale",
    tagline: "Expand capacities and protect margins",
    description:
      "Once operations are stable and predictable, we set up real-time monitoring and reporting loops. We establish long-term feedback rhythms to support volume expansion without adding administrative overhead.",
    outputs: ["Real-time Visibility Dashboards", "Operational Review Cadences", "Continuous Optimization Backlog"],
  },
];

export default function Methodology() {
  const [activePhase, setActivePhase] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="methodology" className="py-20 md:py-28 dark:bg-surface-900 bg-surface-50 border-t dark:border-white/[0.04] border-black/[0.04]">
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
              Our Methodology
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
          >
            Six phases. No shortcuts.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg dark:text-ink-300 text-ink-400 leading-relaxed"
          >
            No slide decks, no open-ended statements of work. A disciplined, phased roadmap that
            transforms chaotic operations into structured, predictable systems.
          </motion.p>
        </div>

        {/* Phase selector: desktop horizontal timeline */}
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
              style={{ width: `${(activePhase / (phases.length - 1)) * 100}%` }}
            />
            <div className="grid grid-cols-6 relative">
              {phases.map((phase, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className="flex flex-col items-center gap-3 group cursor-pointer"
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
                  <h3 className="text-xl font-semibold dark:text-ink-100 text-ink-900">
                    {phases[activePhase].title}
                  </h3>
                  <p className="text-sm dark:text-steel-400 text-steel-600 mt-0.5">
                    {phases[activePhase].tagline}
                  </p>
                </div>
              </div>
              <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed">
                {phases[activePhase].description}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest dark:text-ink-400 text-ink-400 mb-4">
                Phase Deliverables
              </div>
              <div className="flex flex-col gap-2.5">
                {phases[activePhase].outputs.map((output, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg dark:bg-surface-800/60 bg-surface-50/80 border dark:border-white/[0.04] border-black/[0.04]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-steel-500/60" />
                    <span className="text-xs dark:text-ink-200 text-ink-700">{output}</span>
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
                  <p className="text-xs dark:text-steel-400/80 text-steel-600/70 mb-3">
                    {phase.tagline}
                  </p>
                  <p className="text-xs dark:text-ink-300 text-ink-400 leading-relaxed mb-4">
                    {phase.description}
                  </p>
                  <div className="text-2xs font-semibold uppercase tracking-wider dark:text-ink-400 text-ink-400 mb-2">
                    Phase Deliverables:
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {phase.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-2xs dark:text-ink-300 text-ink-500">
                        <div className="w-1 h-1 rounded-full bg-steel-500" />
                        {out}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
