"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Compass, Eye, ShieldAlert, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

const capabilities = [
  {
    id: "diagnostics",
    icon: Search,
    title: "Operational Diagnostics & Mapping",
    tagline: "Uncover the silent friction draining your margins",
    problem: "Operational rules are undocumented, residing only in the verbal agreements and habits of individual workers. Handoffs between teams are invisible, leading to constant coordination bottlenecks, human errors, and unpredictable process variance.",
    whyExists: "The business grew faster than its systems could stabilize. Departments optimized for local speed by building local workarounds (custom sheets, verbal patches), fragmenting the global process.",
    approach: "We conduct structured field observations, interview frontline operators, audit data paths, and map every actual process step, inventory buffer, and information handoff. We build a high-fidelity 'as-is' blueprint that details the real systems constraints.",
    afterState: "A single, rigorous, visual source of process truth. Unnecessary steps are eliminated, and coordination risks and optimization bottlenecks are formally identified, laying a clean foundation for modernization.",
  },
  {
    id: "planning",
    icon: Compass,
    title: "Planning & Coordination Systems",
    tagline: "Move from constant fire-fighting to proactive scheduling",
    problem: "Planning is highly reactive. Schedulers spend hours every morning rewriting timelines in response to yesterday's crises. Execution teams lack shared visibility into timelines, causing systemic idle times, missed deadlines, and high expediting fees.",
    whyExists: "Scheduling systems are decoupled from live execution state. Planners rely on trailing reports or 'best-case' assumptions, leaving no buffers or structured mechanisms to handle real-world operational variance.",
    approach: "We design robust coordination frameworks and shared visual planning boards tailored to your hard constraints. We establish synchronized communication cadences, clear escalation rules, and robust scheduling buffers.",
    afterState: "A predictable, stabilized scheduling rhythm. Teams operate with a shared operational picture, reducing emergency scheduling adjustments by up to 80% and restoring high forecast reliability.",
  },
  {
    id: "visibility",
    icon: Eye,
    title: "Operational Visibility Platforms",
    tagline: "Real-time reality over retrospective vanity dashboards",
    problem: "Leadership operates in an operational blind spot, relying on laggy weekly summaries or monthly financial statements. By the time a bottleneck, logistics delay, or margin drain is noticed, it is too late to correct.",
    whyExists: "Operations data is trapped inside siloed software systems, machine registers, or local spreadsheets, requiring hours of manual collection and aggregation to yield any intelligence.",
    approach: "We design the integrated information architecture that extracts live data from your existing endpoints and structures it around critical decisions. We build clean, high-visibility dashboards focused strictly on active metrics.",
    afterState: "Real-time, context-rich visibility. Operators and managers receive immediate alert flags for scheduling deviations, line blockages, or load delays, enabling corrective action on the fly.",
  },
  {
    id: "modernization",
    icon: Cpu,
    title: "Workflow Modernization & Tooling",
    tagline: "Eradicate manual data double-entry and system gaps",
    problem: "High-value operators waste 2 to 3 hours daily copy-pasting customer records, inventory logs, or booking details across separate tools. Fragmented software loops lead to high human error rates and operational lag.",
    whyExists: "Legacy software layers are rigid and lack natural connectivity. Rather than re-architecting systems, previous teams added piecemeal software, leaving manual reconciliation as the 'glue'.",
    approach: "We streamline processes to isolate redundant handoffs, then construct custom internal tools, database bridges, and robust automated flows that connect your critical tools seamlessly.",
    afterState: "Smooth, zero-friction workflows. Manual data double-handling is completely eliminated, data sync is instantaneous, and staff capacity is redirected back to high-value execution.",
  },
  {
    id: "knowledge",
    icon: ShieldAlert,
    title: "Knowledge Capture Systems",
    tagline: "Protect your operations from single-person dependencies",
    problem: "The organization is highly vulnerable to employee turnover. The logic for complex scheduling, equipment setup, or quality standards exists solely in the minds of a few senior individuals.",
    whyExists: "Knowledge capture is consistently deferred to 'later'. Legible, structured, and easy-to-use systems to record operational expertise were never implemented, creating a chronic planning exposure.",
    approach: "We systematically extract specialized operational wisdom through interviews and step-by-step shadow exercises. We translate these rules into visual, digital playbooks, interactive SOPs, and structured checklists.",
    afterState: "A resilient, evergreen organizational memory. Employee onboarding timelines are halved, and the company maintains consistent operational compliance regardless of individual staffing shifts.",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(capabilities[0].id);
  const currentCap = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 md:py-36 dark:bg-surface-900 bg-surface-50 border-t dark:border-white/[0.04] border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
              <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
                Core Capabilities
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Structured capabilities, not marketing solutions.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-sm dark:text-ink-300 text-ink-400 leading-relaxed md:text-right"
          >
            We do not sell generalist software packages or generic automation templates. We construct
            custom operational systems built to solve specific coordination problems.
          </motion.p>
        </div>

        {/* Interactive layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Tab buttons (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {capabilities.map((cap, i) => {
              const IconComp = cap.icon;
              const isActive = cap.id === activeTab;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id)}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? "dark:bg-surface-850 bg-white dark:border-white/[0.08] border-black/[0.08] dark:shadow-md"
                      : "bg-transparent border-transparent hover:dark:bg-white/[0.02] hover:bg-black/[0.02]"
                  }`}
                >
                  {/* Left Active border bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-steel-500"
                    />
                  )}

                  <div className={`p-2 rounded-md transition-colors ${
                    isActive
                      ? "dark:bg-surface-800 bg-surface-100 dark:text-steel-400 text-steel-600"
                      : "dark:text-ink-400 text-ink-500"
                  }`}>
                    <IconComp size={16} />
                  </div>
                  
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "dark:text-ink-100 text-ink-900" : "dark:text-ink-300 text-ink-400"
                    }`}>
                      {cap.title}
                    </h3>
                    <p className={`text-xs mt-1 transition-colors duration-200 ${
                      isActive ? "dark:text-ink-400 text-ink-500" : "dark:text-ink-400/60 text-ink-500/50"
                    }`}>
                      {cap.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content Display (Right) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-8 md:p-10 rounded-xl dark:bg-surface-850 bg-white border dark:border-white/[0.07] border-black/[0.07] shadow-xl shadow-black/5"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-steel-500 rounded-full" />
                  <span className="text-xs font-semibold tracking-wider uppercase dark:text-steel-400 text-steel-600">
                    Capability Detail
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold dark:text-ink-100 text-ink-900 mb-6">
                  {currentCap.title}
                </h3>

                {/* Grid details */}
                <div className="flex flex-col gap-6">
                  {/* The Problem */}
                  <div className="grid sm:grid-cols-3 gap-2 pb-6 border-b dark:border-white/[0.04] border-black/[0.04]">
                    <span className="text-2xs font-semibold uppercase tracking-wider dark:text-red-400/80 text-red-600/85">
                      The Operational Problem
                    </span>
                    <div className="sm:col-span-2">
                      <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed font-medium">
                        {currentCap.problem}
                      </p>
                      <div className="mt-3 flex items-start gap-1.5 dark:text-ink-400 text-ink-400">
                        <span className="text-2xs font-bold mt-0.5">Why it exists:</span>
                        <p className="text-2xs leading-relaxed italic">{currentCap.whyExists}</p>
                      </div>
                    </div>
                  </div>

                  {/* Our Approach */}
                  <div className="grid sm:grid-cols-3 gap-2 pb-6 border-b dark:border-white/[0.04] border-black/[0.04]">
                    <span className="text-2xs font-semibold uppercase tracking-wider dark:text-steel-400 text-steel-600">
                      Norvane's Approach
                    </span>
                    <p className="sm:col-span-2 text-sm dark:text-ink-300 text-ink-600 leading-relaxed">
                      {currentCap.approach}
                    </p>
                  </div>

                  {/* Operational After-State */}
                  <div className="grid sm:grid-cols-3 gap-2">
                    <span className="text-2xs font-semibold uppercase tracking-wider dark:text-green-400/80 text-green-600/80">
                      What Changes Afterward
                    </span>
                    <div className="sm:col-span-2 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="dark:text-green-400 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed font-semibold">
                        {currentCap.afterState}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book Diagnostic callout */}
                <div className="mt-10 p-5 rounded-lg dark:bg-surface-900 bg-surface-50 border dark:border-white/5 border-black/5 flex items-center justify-between flex-wrap gap-4">
                  <div className="text-xs dark:text-ink-300 text-ink-400 leading-relaxed max-w-sm">
                    Interested in evaluating this capability inside your organization? It is a primary deliverable in our diagnostic phase.
                  </div>
                  <a
                    href="#diagnostic"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold dark:text-steel-400 text-steel-600 hover:dark:text-steel-300 hover:text-steel-800 transition-all duration-200 whitespace-nowrap cursor-pointer"
                  >
                    View Diagnostic Offer
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
