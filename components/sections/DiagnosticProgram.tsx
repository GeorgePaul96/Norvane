"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ShieldAlert, Cpu, FileText, BarChart2, Calendar, ClipboardCheck } from "lucide-react";

const diagnosticSteps = [
  {
    step: "01",
    phase: "Discovery & Handoff Audit",
    duration: "Weeks 1–2",
    icon: MapPin,
    description:
      "We embed with your execution team to observe frontline operations. We shadow schedulers, trace inventory states, map data-flow paths, and inventory all active localized spreadsheets and verbal workarounds.",
  },
  {
    step: "02",
    phase: "Bottleneck & Coordination Risk Mapping",
    duration: "Weeks 3–4",
    icon: ShieldAlert,
    description:
      "We catalog every operational handover, check for manual copy-paste reconciliation loops, run volume stress tests, and identify key-person dependencies that threaten process stability.",
  },
  {
    step: "03",
    phase: "Modernization Roadmap & Specification",
    duration: "Weeks 5–6",
    icon: Cpu,
    description:
      "We design the improved systems architecture. We outline the integration bridges, custom tooling, communication cadences, and priority process changes inside a concrete execution blueprint.",
  },
];

const deliverables = [
  {
    title: "High-Fidelity Process Blueprint",
    subtitle: "Complete visual map of actual workflows, handovers, and bottlenecks.",
    icon: FileText,
  },
  {
    title: "Coordination Risk Audit",
    subtitle: "Formal index of all single-point-of-failures, spreadsheet leaks, and manual data errors.",
    icon: ShieldAlert,
  },
  {
    title: "Systems Modernization Specification",
    subtitle: "Detailed layout of integrations, databases, and tooling specifications.",
    icon: Cpu,
  },
  {
    title: "Prioritized Phase Roadmap",
    subtitle: "Sequenced implementation timeline matching cost, impact, and operational capacity.",
    icon: BarChart2,
  },
];

export default function DiagnosticProgram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section id="diagnostic" className="py-28 md:py-36 dark:bg-surface-900 bg-surface-50 border-t dark:border-white/[0.04] border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div ref={containerRef} className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
            <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
              Primary Engagement
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight mb-6"
          >
            The Operational Diagnostic.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg dark:text-ink-300 text-ink-400 leading-relaxed"
          >
            We do not pitch open-ended retainer projects. We begin every partnership with a 4 to 6 week, 
            fixed-scope Operational Diagnostic. It is a highly disciplined analysis that uncovers 
            exactly how your operations break, and maps the precise steps required to stabilize them.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {diagnosticSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="group relative p-8 rounded-xl border dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-850/40 bg-white/60 hover:dark:bg-surface-850 hover:bg-white/80 transition-all duration-300"
              >
                {/* Visual Step Counter */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg dark:bg-surface-800 bg-surface-100 dark:text-steel-400 text-steel-600 dark:border border-transparent dark:border-white/5">
                    <Icon size={18} />
                  </div>
                  <span className="text-4xl font-black dark:text-white/[0.03] text-black/[0.03] tracking-tighter select-none">
                    {step.step}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xs dark:text-steel-400 text-steel-600 font-semibold uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-base font-semibold dark:text-ink-100 text-ink-900 mb-3 group-hover:dark:text-white transition-colors">
                  {step.phase}
                </h3>

                <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Deliverables Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="p-8 md:p-12 rounded-xl dark:bg-surface-850 bg-white border dark:border-white/[0.07] border-black/[0.07]"
        >
          <div className="flex items-center gap-3 mb-8">
            <ClipboardCheck size={20} className="dark:text-steel-400 text-steel-600" />
            <span className="text-2xs font-semibold uppercase tracking-wider dark:text-ink-400 text-ink-400">
              Structured Deliverables
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {deliverables.map((del, i) => {
              const DelIcon = del.icon;
              return (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-2 rounded-md dark:bg-surface-900 bg-surface-50 dark:text-steel-400 text-steel-600 dark:border border-transparent dark:border-white/5 mt-0.5">
                    <DelIcon size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold dark:text-ink-100 text-ink-900 mb-1">
                      {del.title}
                    </h4>
                    <p className="text-xs dark:text-ink-300 text-ink-400 leading-relaxed">
                      {del.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing callout */}
          <div className="mt-12 pt-8 border-t dark:border-white/[0.05] border-black/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="dark:text-steel-500 text-steel-400" />
              <div className="text-xs dark:text-ink-300 text-ink-500">
                <strong>Schedule:</strong> Fixed 4–6 week timeline. Requires 4 hours of management time total.
              </div>
            </div>
            <a
              href="mailto:hello@norvane.com"
              className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md text-xs font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Initiate Diagnostic Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
