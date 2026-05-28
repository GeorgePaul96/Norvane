"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const operationRows = [
  { ref: "OP-2841", label: "Outbound delivery — Site A", status: "on-track", time: "14:30" },
  { ref: "OP-2842", label: "Facility coordination — Zone 3", status: "on-track", time: "16:00" },
  { ref: "OP-2843", label: "Field inspection — Block 4", status: "at-risk", time: "17:00" },
  { ref: "OP-2844", label: "Maintenance — Unit 4", status: "scheduled", time: "09:00 ↑" },
];

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
  "on-track": { label: "On Track", dot: "bg-green-400", text: "dark:text-green-400 text-green-600" },
  "at-risk": { label: "At Risk", dot: "bg-amber-400", text: "dark:text-amber-400 text-amber-600" },
  "scheduled": { label: "Scheduled", dot: "dark:bg-ink-400 bg-ink-400", text: "dark:text-ink-400 text-ink-400" },
};

function OperationalPreview() {
  return (
    <div className="rounded-xl dark:bg-surface-850/70 bg-white/80 border dark:border-white/[0.07] border-black/[0.07] backdrop-blur-sm overflow-hidden">
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-800/50 bg-surface-50/80">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full dark:bg-white/[0.06] bg-black/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full dark:bg-white/[0.06] bg-black/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full dark:bg-white/[0.06] bg-black/[0.08]" />
          </div>
          <span className="text-2xs dark:text-ink-400 text-ink-400 font-medium">Coordination Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
          <span className="text-2xs dark:text-ink-400 text-ink-400">Live</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-px dark:bg-white/[0.04] bg-black/[0.04]">
        {[
          { label: "On-Schedule", value: "91.4%", good: true },
          { label: "Active Ops", value: "18" , good: null },
          { label: "Open Flags", value: "3", good: false },
        ].map((kpi, i) => (
          <div key={i} className="px-4 py-3 dark:bg-surface-850 bg-white">
            <div className="text-2xs dark:text-ink-400 text-ink-400 mb-1">{kpi.label}</div>
            <div className={`text-lg font-semibold tabular-nums ${
              kpi.good === true ? "dark:text-green-400 text-green-600" :
              kpi.good === false ? "dark:text-amber-400 text-amber-600" :
              "dark:text-ink-100 text-ink-900"
            }`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Operations list */}
      <div className="px-4 pt-4 pb-2">
        <div className="text-2xs font-semibold uppercase tracking-wider dark:text-ink-400 text-ink-400 mb-3">
          Active Operations
        </div>
        <div className="flex flex-col gap-1.5">
          {operationRows.map((op, i) => {
            const cfg = statusConfig[op.status];
            return (
              <motion.div
                key={op.ref}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="flex items-center justify-between py-2 border-b dark:border-white/[0.04] border-black/[0.04] last:border-0"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-2xs dark:text-ink-500 text-ink-400 flex-shrink-0">{op.ref}</span>
                  <span className="text-xs dark:text-ink-200 text-ink-700 truncate">{op.label}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <span className="text-2xs dark:text-ink-400 text-ink-400 tabular-nums">{op.time}</span>
                  <span className={`flex items-center gap-1 text-2xs font-medium ${cfg.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Flag */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="mx-4 mb-4 flex items-center gap-2 p-2.5 rounded-lg dark:bg-amber-500/8 bg-amber-500/5 border dark:border-amber-500/15 border-amber-500/10"
      >
        <AlertTriangle size={12} className="dark:text-amber-400 text-amber-600 flex-shrink-0" />
        <span className="text-2xs dark:text-amber-300 text-amber-700">Block 4 inspection running 40 min late — downstream rescheduling required</span>
      </motion.div>
    </div>
  );
}

const engagementFacts = [
  { value: "Diagnostic-first", label: "Every engagement starts with a structured audit" },
  { value: "Fixed scope", label: "Defined deliverables, no open-ended retainers" },
  { value: "Agriculture & Logistics", label: "Primary sectors we serve" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden dark:bg-surface-900 bg-surface-50">
      {/* Background grid */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.065) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 dark:bg-gradient-radial from-transparent via-transparent to-surface-900/80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 dark:bg-gradient-to-t dark:from-surface-900 bg-gradient-to-t from-surface-50 pointer-events-none" />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full dark:bg-steel-600/10 bg-steel-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left: Content */}
          <div className="max-w-2xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
              <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
                Operations Consulting
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.06] tracking-tight dark:text-ink-100 text-ink-900 mb-6">
              {["Operational", "clarity", "for", "complex", "businesses."].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25 + i * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-lg md:text-xl dark:text-ink-300 text-ink-400 leading-relaxed mb-10 max-w-xl"
            >
              We map localized workflows, replace fragile spreadsheets, and build coordination
              systems your frontline teams actually use — for agriculture, logistics, and field
              operations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#diagnostic"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md text-sm font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200"
              >
                Book a Diagnostic
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#cases"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-md text-sm font-medium dark:text-ink-200 text-ink-700 dark:border border dark:border-white/10 border-black/10 hover:dark:bg-white/5 hover:bg-black/5 transition-all duration-200"
              >
                See Case Studies
                <ChevronRight size={14} className="dark:text-ink-400 text-ink-400" />
              </a>
            </motion.div>

            {/* Engagement facts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mt-14 pt-8 border-t dark:border-white/[0.06] border-black/[0.06]"
            >
              {engagementFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full dark:bg-steel-500/60 bg-steel-500/50 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold dark:text-ink-200 text-ink-800 leading-none mb-1">
                      {fact.value}
                    </div>
                    <div className="text-xs dark:text-ink-400 text-ink-400 leading-snug">{fact.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Operational Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:block relative"
          >
            <OperationalPreview />

            {/* Floating resolved card */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="absolute -bottom-5 -left-8 rounded-lg dark:bg-surface-800 bg-white border dark:border-white/[0.08] border-black/[0.08] p-3.5 shadow-lg flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full dark:bg-green-500/10 bg-green-500/8 border dark:border-green-500/20 border-green-500/15 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={14} className="dark:text-green-400 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-semibold dark:text-ink-200 text-ink-800 leading-none mb-0.5">
                  Site A delivery complete
                </div>
                <div className="text-2xs dark:text-ink-400 text-ink-400">12 min ahead of schedule</div>
              </div>
            </motion.div>

            {/* Floating flag count */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.0 }}
              className="absolute -top-4 -right-4 rounded-lg dark:bg-surface-800 bg-white border dark:border-white/[0.08] border-black/[0.08] px-3 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Clock size={12} className="dark:text-steel-400 text-steel-600" />
                <span className="text-2xs font-semibold dark:text-ink-200 text-ink-700">Updated 2m ago</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
