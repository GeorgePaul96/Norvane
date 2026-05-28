"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Map, BarChart2, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    id: "diagnostic",
    phase: "Entry point",
    icon: Search,
    title: "Operations Diagnostic",
    tagline: "See exactly where operations are breaking — before we fix anything",
    problem: "Operations teams manage from lagging signals — weekly reports, monthly summaries, and downstream consequences like missed deliveries and cost overruns. By the time a problem is visible, it has already compounded. The real bottlenecks are buried in undocumented handoffs, verbal processes, and isolated spreadsheets.",
    whyExists: "Operational complexity grows faster than operational documentation. Departments solve local problems locally — custom sheets, verbal patches, informal workarounds — each one creating invisible fragmentation at the system level.",
    approach: "We conduct structured field observations and process audits over 4–6 weeks. We trace every handoff, document every data-entry step, and map the actual operating system — not the idealized one on paper. We interview frontline operators, shadow schedulers, and audit every active spreadsheet and workaround.",
    afterState: "A complete, high-fidelity picture of how your operations actually run. Process gaps, coordination risks, and key-person dependencies are formally documented, prioritized by impact, and presented as a clear modernization roadmap.",
  },
  {
    id: "blueprint",
    phase: "Design phase",
    icon: Map,
    title: "Process Blueprint",
    tagline: "A designed operating system — specific to your constraints, ready to build from",
    problem: "Most process improvement fails because the solution doesn't match the actual constraint. Frameworks designed without field observation create coordination systems that staff bypass from day one — returning to spreadsheets, WhatsApp, and personal notebooks within weeks.",
    whyExists: "Generic process templates and consulting slide decks don't account for the environmental reality of your specific operation — your shift rhythms, equipment constraints, team communication patterns, and seasonal pressures.",
    approach: "Using the Diagnostic findings as the foundation, we design a custom coordination framework, scheduling architecture, and workflow specification. Every design decision is traceable to a specific observed bottleneck. We produce visual process maps, scheduling logic, data-flow architecture, and a sequenced implementation plan.",
    afterState: "A complete operational specification. Process maps, scheduling design, handoff protocols, and a prioritized implementation roadmap — grounded in how your operation actually works, not how a textbook says it should.",
  },
  {
    id: "dashboard",
    phase: "Implementation",
    icon: BarChart2,
    title: "Operational Visibility Dashboard",
    tagline: "Real-time coordination visibility — built for decisions, not reports",
    problem: "Leadership relies on retrospective summaries to understand operational state. By the time a bottleneck appears in a weekly report, it has already cascaded into margin erosion, missed service levels, or expediting costs. Operations are managed reactively because the real-time picture doesn't exist.",
    whyExists: "Operational data exists but remains trapped in isolated systems — separate software tools, field devices, local spreadsheets. Aggregating it into a usable view requires manual effort that nobody has time for, so it never gets built.",
    approach: "We design and build a unified operational visibility layer. We extract data from your existing endpoints — ERP, fleet systems, field devices, spreadsheets — and structure it into a real-time coordination dashboard built around the specific decisions your team needs to make. No generic templates.",
    afterState: "A live operational view. Managers see coordination status, active deviations, and bottlenecks in real time — enabling corrective action in the moment. Staff stop coordinating by phone call and start working from a shared operational picture.",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const currentService = services.find((s) => s.id === activeTab) || services[0];

  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-20 md:py-28 dark:bg-surface-900 bg-surface-50 border-t dark:border-white/[0.04] border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
              <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
                Services
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Three services. One direction.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-sm dark:text-ink-300 text-ink-400 leading-relaxed md:text-right"
          >
            Every engagement starts with the Diagnostic. The Blueprint and Dashboard
            follow from what the Diagnostic uncovers — not before.
          </motion.p>
        </div>

        {/* Mobile: Accordion layout */}
        <div className="lg:hidden flex flex-col gap-3">
          {services.map((svc) => {
            const IconComp = svc.icon;
            const isOpen = svc.id === activeTab;
            return (
              <div key={svc.id} className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "dark:bg-surface-850 bg-white dark:border-white/[0.08] border-black/[0.08]"
                  : "dark:border-white/[0.04] border-black/[0.04] dark:bg-surface-900/40 bg-surface-50/60"
              }`}>
                <button
                  onClick={() => setActiveTab(svc.id)}
                  className="w-full text-left p-5 flex items-start gap-4 cursor-pointer"
                >
                  <div className={`p-2 rounded-md flex-shrink-0 ${
                    isOpen ? "dark:bg-surface-800 bg-surface-100 dark:text-steel-400 text-steel-600" : "dark:text-ink-400 text-ink-500"
                  }`}>
                    <IconComp size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-2xs font-semibold uppercase tracking-widest mb-1 ${
                      isOpen ? "dark:text-steel-400 text-steel-600" : "dark:text-ink-500/50 text-ink-500/40"
                    }`}>{svc.phase}</div>
                    <h3 className={`text-sm font-semibold ${isOpen ? "dark:text-ink-100 text-ink-900" : "dark:text-ink-300 text-ink-400"}`}>
                      {svc.title}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 mt-1 text-lg leading-none transition-transform duration-200 ${
                    isOpen ? "rotate-45 dark:text-ink-300 text-ink-600" : "dark:text-ink-500 text-ink-400"
                  }`}>+</div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 flex flex-col gap-5 border-t dark:border-white/[0.05] border-black/[0.05] pt-5">
                    <div>
                      <span className="text-2xs font-semibold uppercase tracking-wider dark:text-red-400/80 text-red-600/85 block mb-2">The Problem</span>
                      <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed">{svc.problem}</p>
                    </div>
                    <div>
                      <span className="text-2xs font-semibold uppercase tracking-wider dark:text-steel-400 text-steel-600 block mb-2">Our Approach</span>
                      <p className="text-sm dark:text-ink-300 text-ink-600 leading-relaxed">{svc.approach}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="dark:text-green-400 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed font-semibold">{svc.afterState}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: Tab + panel layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Tab buttons (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {services.map((svc) => {
              const IconComp = svc.icon;
              const isActive = svc.id === activeTab;
              return (
                <button
                  key={svc.id}
                  onClick={() => setActiveTab(svc.id)}
                  className={`w-full text-left p-5 rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? "dark:bg-surface-850 bg-white dark:border-white/[0.08] border-black/[0.08] dark:shadow-md"
                      : "bg-transparent border-transparent hover:dark:bg-white/[0.02] hover:bg-black/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-steel-500"
                    />
                  )}

                  <div className={`p-2 rounded-md transition-colors flex-shrink-0 ${
                    isActive
                      ? "dark:bg-surface-800 bg-surface-100 dark:text-steel-400 text-steel-600"
                      : "dark:text-ink-400 text-ink-500"
                  }`}>
                    <IconComp size={16} />
                  </div>

                  <div>
                    <div className={`text-2xs font-semibold uppercase tracking-widest mb-1 transition-colors duration-200 ${
                      isActive ? "dark:text-steel-400 text-steel-600" : "dark:text-ink-500/60 text-ink-500/50"
                    }`}>
                      {svc.phase}
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "dark:text-ink-100 text-ink-900" : "dark:text-ink-300 text-ink-400"
                    }`}>
                      {svc.title}
                    </h3>
                    <p className={`text-xs mt-1 transition-colors duration-200 leading-snug ${
                      isActive ? "dark:text-ink-400 text-ink-500" : "dark:text-ink-400/50 text-ink-500/40"
                    }`}>
                      {svc.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Content Display (Right) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-8 md:p-10 rounded-xl dark:bg-surface-850 bg-white border dark:border-white/[0.07] border-black/[0.07] shadow-xl shadow-black/5"
              >
                <h3 className="text-xl md:text-2xl font-semibold dark:text-ink-100 text-ink-900 mb-8">
                  {currentService.title}
                </h3>

                <div className="flex flex-col gap-6">
                  {/* The Problem */}
                  <div className="grid sm:grid-cols-3 gap-3 pb-6 border-b dark:border-white/[0.04] border-black/[0.04]">
                    <span className="text-2xs font-semibold uppercase tracking-wider dark:text-red-400/80 text-red-600/85">
                      The Problem
                    </span>
                    <div className="sm:col-span-2">
                      <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed">
                        {currentService.problem}
                      </p>
                      <div className="mt-3 flex items-start gap-1.5 dark:text-ink-400 text-ink-400">
                        <span className="text-2xs font-bold mt-0.5 flex-shrink-0">Root cause:</span>
                        <p className="text-2xs leading-relaxed italic">{currentService.whyExists}</p>
                      </div>
                    </div>
                  </div>

                  {/* Our Approach */}
                  <div className="grid sm:grid-cols-3 gap-3 pb-6 border-b dark:border-white/[0.04] border-black/[0.04]">
                    <span className="text-2xs font-semibold uppercase tracking-wider dark:text-steel-400 text-steel-600">
                      Our Approach
                    </span>
                    <p className="sm:col-span-2 text-sm dark:text-ink-300 text-ink-600 leading-relaxed">
                      {currentService.approach}
                    </p>
                  </div>

                  {/* After State */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    <span className="text-2xs font-semibold uppercase tracking-wider dark:text-green-400/80 text-green-600/80">
                      What Changes
                    </span>
                    <div className="sm:col-span-2 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="dark:text-green-400 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed font-semibold">
                        {currentService.afterState}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Diagnostic callout */}
                <div className="mt-10 p-5 rounded-lg dark:bg-surface-900 bg-surface-50 border dark:border-white/5 border-black/5 flex items-center justify-between flex-wrap gap-4">
                  <div className="text-xs dark:text-ink-300 text-ink-400 leading-relaxed max-w-sm">
                    {activeTab === "diagnostic"
                      ? "Every engagement starts here. Fixed scope, defined deliverables, no open-ended retainers."
                      : "The Diagnostic is the prerequisite. It establishes the foundation that makes the Blueprint and Dashboard genuinely useful."}
                  </div>
                  <a
                    href="#diagnostic-tool"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("diagnostic-tool")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold dark:text-steel-400 text-steel-600 hover:dark:text-steel-300 hover:text-steel-800 transition-all duration-200 whitespace-nowrap cursor-pointer"
                  >
                    {activeTab === "diagnostic" ? "Assess your operation" : "Start with the Diagnostic"}
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
