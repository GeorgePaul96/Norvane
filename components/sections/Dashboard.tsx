"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle } from "lucide-react";

const metrics = [
  { label: "On-Schedule Rate", value: "91.4%", change: "+3.2%", trend: "up", positiveWhenUp: true },
  { label: "Active Operations", value: "18", change: "±0", trend: "flat", positiveWhenUp: true },
  { label: "Open Flags", value: "4", change: "−2", trend: "down", positiveWhenUp: false },
  { label: "Avg Cycle Time", value: "53 min", change: "+6 min", trend: "up", positiveWhenUp: false },
];

const operationsData = [
  { ref: "OP-2841", type: "Delivery Run", location: "Distribution Centre → Site A", assigned: "D. Chen", status: "in-transit", due: "Today 14:30" },
  { ref: "OP-2842", type: "Site Coordination", location: "Facility 3, North Zone", assigned: "J. Walsh", status: "on-track", due: "Today 16:00" },
  { ref: "OP-2843", type: "Field Inspection", location: "Zone C, Block 4", assigned: "Team 2", status: "at-risk", due: "Today 17:00" },
  { ref: "OP-2844", type: "Maintenance Run", location: "Unit 4, Depot B", assigned: "R. Patel", status: "scheduled", due: "Tomorrow 09:00" },
  { ref: "OP-2845", type: "Outbound Load", location: "Depot B → Client Site 7", assigned: "M. Singh", status: "complete", due: "Completed" },
];

const weeklyBarData = [
  { day: "Mon", value: 85 },
  { day: "Tue", value: 93 },
  { day: "Wed", value: 78 },
  { day: "Thu", value: 96 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 64 },
  { day: "Sun", value: 51 },
];

const flagsData = [
  { level: "warning", message: "Zone C team running 40 min behind schedule" },
  { level: "error", message: "Unit 4 parts reorder — supplier delay confirmed" },
  { level: "success", message: "Site A delivery completed ahead of window" },
];

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; classes: string; dot: string }> = {
    "on-track": {
      label: "On Track",
      classes: "dark:bg-green-500/10 bg-green-500/8 dark:text-green-400 text-green-700 dark:border-green-500/20 border-green-500/15",
      dot: "bg-green-400",
    },
    "at-risk": {
      label: "At Risk",
      classes: "dark:bg-amber-500/10 bg-amber-500/8 dark:text-amber-400 text-amber-700 dark:border-amber-500/20 border-amber-500/15",
      dot: "bg-amber-400",
    },
    "in-transit": {
      label: "In Transit",
      classes: "dark:bg-blue-500/10 bg-blue-500/8 dark:text-blue-400 text-blue-700 dark:border-blue-500/20 border-blue-500/15",
      dot: "bg-blue-400",
    },
    "complete": {
      label: "Complete",
      classes: "dark:bg-green-500/10 bg-green-500/8 dark:text-green-400 text-green-700 dark:border-green-500/20 border-green-500/15",
      dot: "bg-green-400",
    },
    "scheduled": {
      label: "Scheduled",
      classes: "dark:bg-white/5 bg-black/5 dark:text-ink-300 text-ink-400 dark:border-white/[0.08] border-black/[0.08]",
      dot: "dark:bg-ink-400 bg-ink-400",
    },
    "delayed": {
      label: "Delayed",
      classes: "dark:bg-red-500/10 bg-red-500/8 dark:text-red-400 text-red-700 dark:border-red-500/20 border-red-500/15",
      dot: "bg-red-400",
    },
  };
  const c = config[status] || config["scheduled"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-2xs font-medium border ${c.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}

export default function Dashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });
  const dashInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section className="py-20 md:py-28 dark:bg-surface-850 bg-white overflow-hidden">
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
                Operational Intelligence
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Operational visibility built for real decisions.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-sm dark:text-ink-300 text-ink-400 leading-relaxed md:text-right"
          >
            The dashboards we design surface operational reality — not vanity metrics. Built on your
            existing data sources, without replacing the systems you already run.
          </motion.p>
        </div>

        {/* Dashboard shell */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 32 }}
          animate={dashInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="rounded-2xl border dark:border-white/[0.07] border-black/[0.07] dark:bg-surface-900/80 bg-surface-50/80 overflow-hidden shadow-2xl shadow-black/20"
        >
          {/* Window bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-850/60 bg-white/80">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full dark:bg-white/[0.06] bg-black/[0.1]" />
                <div className="w-3 h-3 rounded-full dark:bg-white/[0.06] bg-black/[0.1]" />
                <div className="w-3 h-3 rounded-full dark:bg-white/[0.06] bg-black/[0.1]" />
              </div>
              <span className="text-2xs dark:text-ink-400 text-ink-400 font-medium">
                Coordination Dashboard — Live View
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
              <span className="text-2xs dark:text-ink-400 text-ink-400">Live · Updated 2m ago</span>
            </div>
          </div>

          <div className="p-5 grid gap-4">
            {/* KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metrics.map((m, i) => {
                const isPositive =
                  (m.positiveWhenUp && m.trend === "up") ||
                  (!m.positiveWhenUp && m.trend === "down");
                const isNegative =
                  (!m.positiveWhenUp && m.trend === "up") ||
                  (m.positiveWhenUp && m.trend === "down");
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={dashInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                    className="p-4 rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05]"
                  >
                    <div className="text-2xs dark:text-ink-400 text-ink-400 mb-2 leading-tight">
                      {m.label}
                    </div>
                    <div className="text-xl font-semibold dark:text-ink-100 text-ink-900 tabular-nums mb-1">
                      {m.value}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-2xs font-medium ${
                        isPositive
                          ? "dark:text-green-400 text-green-600"
                          : isNegative
                          ? "dark:text-red-400 text-red-600"
                          : "dark:text-ink-400 text-ink-400"
                      }`}
                    >
                      {m.trend === "up" ? (
                        <TrendingUp size={11} />
                      ) : m.trend === "down" ? (
                        <TrendingDown size={11} />
                      ) : (
                        <Minus size={11} />
                      )}
                      {m.change} vs prior period
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main area: table + sidebar */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Active Operations table */}
              <div className="lg:col-span-2 rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] overflow-hidden">
                <div className="px-4 py-3 border-b dark:border-white/[0.05] border-black/[0.05] flex items-center justify-between">
                  <span className="text-xs font-semibold dark:text-ink-200 text-ink-700">
                    Active Operations
                  </span>
                  <span className="text-2xs dark:text-ink-400 text-ink-400">Today · 5 active</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="dark:bg-surface-800/40 bg-surface-50/60">
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">
                          Ref
                        </th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden md:table-cell">
                          Type
                        </th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">
                          Location / Route
                        </th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">
                          Status
                        </th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden lg:table-cell">
                          Due
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {operationsData.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t dark:border-white/[0.04] border-black/[0.04] hover:dark:bg-white/[0.02] hover:bg-black/[0.02] transition-colors"
                        >
                          <td className="px-4 py-2.5">
                            <div className="font-mono text-2xs font-semibold dark:text-ink-300 text-ink-500 tracking-wide">
                              {row.ref}
                            </div>
                          </td>
                          <td className="px-4 py-2.5 dark:text-ink-300 text-ink-500 hidden md:table-cell">
                            {row.type}
                          </td>
                          <td className="px-4 py-2.5 dark:text-ink-200 text-ink-700">
                            <div className="truncate max-w-[180px]">{row.location}</div>
                          </td>
                          <td className="px-4 py-2.5">
                            <StatusBadge status={row.status} />
                          </td>
                          <td className="px-4 py-2.5 dark:text-ink-300 text-ink-500 tabular-nums hidden lg:table-cell">
                            {row.due}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right sidebar */}
              <div className="flex flex-col gap-4">
                {/* Weekly throughput chart */}
                <div className="flex-1 rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] p-4">
                  <div className="text-xs font-semibold dark:text-ink-200 text-ink-700 mb-1">
                    Weekly Throughput
                  </div>
                  <div className="text-2xs dark:text-ink-400 text-ink-400 mb-4">
                    On-schedule score by day
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {weeklyBarData.map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          className="w-full rounded-t dark:bg-steel-500/50 bg-steel-500/40"
                          initial={{ height: 0 }}
                          animate={
                            dashInView ? { height: `${(bar.value / 100) * 80}px` } : { height: 0 }
                          }
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                        />
                        <span className="text-2xs dark:text-ink-400 text-ink-400">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operational flags */}
                <div className="rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] p-4">
                  <div className="text-xs font-semibold dark:text-ink-200 text-ink-700 mb-3">
                    Operational Flags
                  </div>
                  <div className="flex flex-col gap-2">
                    {flagsData.map((flag, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 p-2 rounded border text-2xs ${
                          flag.level === "error"
                            ? "dark:bg-red-500/8 bg-red-500/5 dark:border-red-500/15 border-red-500/10 dark:text-red-300 text-red-700"
                            : flag.level === "warning"
                            ? "dark:bg-amber-500/8 bg-amber-500/5 dark:border-amber-500/15 border-amber-500/10 dark:text-amber-300 text-amber-700"
                            : "dark:bg-green-500/8 bg-green-500/5 dark:border-green-500/15 border-green-500/10 dark:text-green-300 text-green-700"
                        }`}
                      >
                        {flag.level === "success" ? (
                          <CheckCircle size={11} className="flex-shrink-0" />
                        ) : (
                          <AlertCircle size={11} className="flex-shrink-0" />
                        )}
                        <span>{flag.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
