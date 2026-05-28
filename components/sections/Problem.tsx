"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Database, Users, GitFork, EyeOff, RefreshCw, AlertTriangle } from "lucide-react";

const vulnerabilities = [
  {
    icon: Database,
    title: "Spreadsheet Dependency",
    metric: "Most operations teams",
    label: "rely on local files for critical planning",
    description:
      "Critical scheduling, inventory state, and coordination plans live in isolated spreadsheets. Version control is impossible, calculations break silently, and critical context is lost in email threads.",
  },
  {
    icon: Users,
    title: "Institutional Knowledge Silos",
    metric: "Single-point-of-failure",
    label: "individuals holding critical process rules",
    description:
      "Operational logic lives entirely in the heads of key planners. When an individual is absent, operations slow, errors compound, and the organization suffers from chronic decision bottlenecks.",
  },
  {
    icon: GitFork,
    title: "Fragmented Workflows",
    metric: "Informal coordination",
    label: "replacing structured operating systems",
    description:
      "Handoffs between planning, execution, and reporting are handled via personal text messages, phone calls, and emergency meetings. There is no central, systemic operational discipline.",
  },
  {
    icon: EyeOff,
    title: "Operational Blind Spots",
    metric: "Lagging indicators",
    label: "masking active bottlenecks",
    description:
      "Management relies on trailing financial summaries or static weekly reports. Active blockages, line delays, or logistics deviations are invisible until they have already damaged margins.",
  },
  {
    icon: RefreshCw,
    title: "Manual Reconciliation",
    metric: "2-3 hours daily",
    label: "spent manually moving data between screens",
    description:
      "Operators waste high-value hours copy-pasting data, cross-checking spreadsheets, and reconciling conflicting logs across isolated systems. Intelligence is buried in labor-intensive friction.",
  },
  {
    icon: AlertTriangle,
    title: "Cascading Coordination Failures",
    metric: "Unpredicted ripple effects",
    label: "turning minor delays into margin losses",
    description:
      "Without cross-functional visibility, a delay in one department triggers invisible backlogs elsewhere. The results are reactive scheduling, expediting fees, and broken client commitments.",
  },
];

export default function Problem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="py-20 md:py-28 dark:bg-surface-900 bg-surface-50 relative overflow-hidden border-t dark:border-white/[0.04] border-black/[0.04]">
      {/* Background dot grid details */}
      <div
        className="absolute inset-0 dark:bg-dot-grid bg-dot-grid-light bg-40 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      <div className="absolute inset-0 dark:bg-gradient-radial from-transparent via-transparent to-surface-900/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
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
              The Operational Reality
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight mb-6"
          >
            Most operational failures are coordination failures disguised as software problems.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg dark:text-ink-300 text-ink-400 leading-relaxed"
          >
            Businesses rarely break because of incapable people or insufficient capital. They break
            in the invisible gaps between departments—where undocumented processes, manual data entry,
            and isolated tracking systems replace deliberate coordination.
          </motion.p>
        </div>

        {/* Vulnerabilities Matrix Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vulnerabilities.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group p-8 rounded-xl border dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-850/40 bg-white/60 hover:dark:bg-surface-850/80 hover:bg-white/90 hover:dark:border-white/[0.1] hover:border-black/[0.1] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg dark:bg-surface-800 bg-surface-100 dark:text-steel-400 text-steel-600 dark:border border-transparent dark:border-white/5">
                    <v.icon size={18} />
                  </div>
                  <h3 className="text-base font-semibold dark:text-ink-100 text-ink-900 group-hover:dark:text-white transition-colors duration-200">
                    {v.title}
                  </h3>
                </div>

                <div className="mb-4">
                  <div className="text-xl font-bold dark:text-steel-300 text-steel-700 leading-none">
                    {v.metric}
                  </div>
                  <div className="text-2xs dark:text-ink-400 text-ink-500 font-medium uppercase tracking-wide mt-1.5">
                    {v.label}
                  </div>
                </div>

                <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed">
                  {v.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Operational quote summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 p-8 rounded-xl border dark:border-white/[0.04] border-black/[0.04] dark:bg-surface-850/20 bg-white/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed max-w-2xl">
            If this describes your operation, a structured diagnostic is the right starting point —
            not more software.
          </p>
          <a
            href="#diagnostic-tool"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("diagnostic-tool")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs font-semibold dark:text-steel-400 text-steel-600 dark:border-b border-b dark:border-steel-400/30 border-steel-600/30 pb-0.5 hover:dark:border-steel-400 hover:border-steel-600 transition-all duration-200 whitespace-nowrap"
          >
            Assess your risk ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
