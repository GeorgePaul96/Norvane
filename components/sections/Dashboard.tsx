"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Clock } from "lucide-react";

const metrics = [
  { label: "On-Time Delivery Rate", value: "87.3%", change: "+4.1%", trend: "up" },
  { label: "Active Bottlenecks", value: "3", change: "-2", trend: "down" },
  { label: "Planning Coverage", value: "94%", change: "+11%", trend: "up" },
  { label: "Process Compliance", value: "91.8%", change: "0.0%", trend: "flat" },
];

const harvestData = [
  { field: "North Paddock A", crop: "Winter Wheat", scheduled: "14 Jun", status: "on-track", team: "Team 2", progress: 0, size: "142 ha" },
  { field: "South Block 3", crop: "Canola", scheduled: "8 Jun", status: "delayed", team: "Team 1", progress: 35, size: "98 ha" },
  { field: "East Flats", crop: "Barley", scheduled: "10 Jun", status: "on-track", team: "Team 3", progress: 68, size: "210 ha" },
  { field: "River Paddock", crop: "Winter Wheat", scheduled: "18 Jun", status: "on-track", team: "Team 2", progress: 0, size: "76 ha" },
  { field: "Western Ridge", crop: "Sorghum", scheduled: "22 Jun", status: "at-risk", team: "Team 1", progress: 12, size: "155 ha" },
];

const logisticsData = [
  { route: "Depot A → Port Melbourne", load: "Grain — 28t", status: "in-transit", eta: "Today 14:30", driver: "R. Chen" },
  { route: "Farm Gate → Silo 7", load: "Canola — 18t", status: "loading", eta: "Today 16:00", driver: "M. Patel" },
  { route: "Cold Store → Distribution", load: "Produce — Mixed", status: "complete", eta: "Completed", driver: "J. Walsh" },
  { route: "Depot B → Processor", load: "Barley — 32t", status: "scheduled", eta: "Tomorrow 09:00", driver: "Assigned" },
];

const weeklyBarData = [
  { day: "Mon", value: 82 },
  { day: "Tue", value: 91 },
  { day: "Wed", value: 74 },
  { day: "Thu", value: 96 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 61 },
  { day: "Sun", value: 45 },
];

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; classes: string; dot: string }> = {
    "on-track": { label: "On Track", classes: "dark:bg-green-500/10 bg-green-500/8 dark:text-green-400 text-green-700 dark:border-green-500/20 border-green-500/15", dot: "bg-green-400" },
    "delayed": { label: "Delayed", classes: "dark:bg-red-500/10 bg-red-500/8 dark:text-red-400 text-red-700 dark:border-red-500/20 border-red-500/15", dot: "bg-red-400" },
    "at-risk": { label: "At Risk", classes: "dark:bg-amber-500/10 bg-amber-500/8 dark:text-amber-400 text-amber-700 dark:border-amber-500/20 border-amber-500/15", dot: "bg-amber-400" },
    "in-transit": { label: "In Transit", classes: "dark:bg-blue-500/10 bg-blue-500/8 dark:text-blue-400 text-blue-700 dark:border-blue-500/20 border-blue-500/15", dot: "bg-blue-400" },
    "loading": { label: "Loading", classes: "dark:bg-amber-500/10 bg-amber-500/8 dark:text-amber-400 text-amber-700 dark:border-amber-500/20 border-amber-500/15", dot: "bg-amber-400" },
    "complete": { label: "Complete", classes: "dark:bg-green-500/10 bg-green-500/8 dark:text-green-400 text-green-700 dark:border-green-500/20 border-green-500/15", dot: "bg-green-400" },
    "scheduled": { label: "Scheduled", classes: "dark:bg-white/5 bg-black/5 dark:text-ink-300 text-ink-400 dark:border-white/8 border-black/8", dot: "dark:bg-ink-400 bg-ink-400" },
  };
  const c = config[status] || config["scheduled"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-2xs font-medium border ${c.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}

function ProgressBar({ value, status }: { value: number; status: string }) {
  const color = status === "delayed" ? "bg-red-500/60" : status === "at-risk" ? "bg-amber-500/60" : "bg-steel-500/70";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 dark:bg-white/5 bg-black/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-2xs dark:text-ink-400 text-ink-400 tabular-nums w-6">{value}%</span>
    </div>
  );
}

export default function Dashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });
  const dashInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section className="py-28 md:py-36 dark:bg-surface-850 bg-white overflow-hidden">
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
            The dashboards we design surface operational reality — not vanity metrics. Every view is
            built around a decision someone needs to make.
          </motion.p>
        </div>

        {/* Dashboard container */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 32 }}
          animate={dashInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="rounded-2xl border dark:border-white/[0.07] border-black/[0.07] dark:bg-surface-900/80 bg-surface-50/80 overflow-hidden shadow-2xl shadow-black/20"
        >
          {/* Dashboard header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-850/60 bg-white/80">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full dark:bg-white/[0.06] bg-black/[0.1]" />
                <div className="w-3 h-3 rounded-full dark:bg-white/[0.06] bg-black/[0.1]" />
                <div className="w-3 h-3 rounded-full dark:bg-white/[0.06] bg-black/[0.1]" />
              </div>
              <span className="text-2xs dark:text-ink-400 text-ink-400 font-medium">
                Operational Command — Harvest Season 2024
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
              <span className="text-2xs dark:text-ink-400 text-ink-400">Live · Updated 2m ago</span>
            </div>
          </div>

          <div className="p-5 grid gap-4">
            {/* Top metrics row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={dashInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                  className="p-4 rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05]"
                >
                  <div className="text-2xs dark:text-ink-400 text-ink-400 mb-2 leading-tight">{m.label}</div>
                  <div className="text-xl font-semibold dark:text-ink-100 text-ink-900 tabular-nums mb-1">
                    {m.value}
                  </div>
                  <div className={`flex items-center gap-1 text-2xs font-medium ${
                    m.trend === "up" ? "dark:text-green-400 text-green-600" :
                    m.trend === "down" ? "dark:text-red-400 text-red-600" :
                    "dark:text-ink-400 text-ink-400"
                  }`}>
                    {m.trend === "up" ? <TrendingUp size={11} /> : m.trend === "down" ? <TrendingDown size={11} /> : <Minus size={11} />}
                    {m.change} vs prior period
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main content: tables + chart */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Harvest planning table */}
              <div className="lg:col-span-2 rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] overflow-hidden">
                <div className="px-4 py-3 border-b dark:border-white/[0.05] border-black/[0.05] flex items-center justify-between">
                  <span className="text-xs font-semibold dark:text-ink-200 text-ink-700">Harvest Planning</span>
                  <span className="text-2xs dark:text-ink-400 text-ink-400">Season 2024 · 5 blocks</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="dark:bg-surface-800/40 bg-surface-50/60">
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">Field</th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden md:table-cell">Crop</th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">Scheduled</th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">Status</th>
                        <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden lg:table-cell">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {harvestData.map((row, i) => (
                        <tr key={i} className="border-t dark:border-white/[0.04] border-black/[0.04] hover:dark:bg-white/[0.02] hover:bg-black/[0.02] transition-colors">
                          <td className="px-4 py-2.5">
                            <div className="dark:text-ink-200 text-ink-700 font-medium">{row.field}</div>
                            <div className="dark:text-ink-400 text-ink-400 text-2xs">{row.size}</div>
                          </td>
                          <td className="px-4 py-2.5 dark:text-ink-300 text-ink-500 hidden md:table-cell">{row.crop}</td>
                          <td className="px-4 py-2.5 dark:text-ink-300 text-ink-500 tabular-nums">{row.scheduled}</td>
                          <td className="px-4 py-2.5"><StatusBadge status={row.status} /></td>
                          <td className="px-4 py-2.5 hidden lg:table-cell"><ProgressBar value={row.progress} status={row.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right column: bar chart + mini stats */}
              <div className="flex flex-col gap-4">
                {/* Weekly output chart */}
                <div className="flex-1 rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] p-4">
                  <div className="text-xs font-semibold dark:text-ink-200 text-ink-700 mb-1">
                    Operational Output
                  </div>
                  <div className="text-2xs dark:text-ink-400 text-ink-400 mb-4">Weekly efficiency score</div>
                  <div className="flex items-end gap-2 h-24">
                    {weeklyBarData.map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          className="w-full rounded-t dark:bg-steel-500/50 bg-steel-500/40"
                          initial={{ height: 0 }}
                          animate={dashInView ? { height: `${(bar.value / 100) * 80}px` } : { height: 0 }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                        />
                        <span className="text-2xs dark:text-ink-400 text-ink-400">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert summary */}
                <div className="rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] p-4">
                  <div className="text-xs font-semibold dark:text-ink-200 text-ink-700 mb-3">Operational Flags</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 rounded dark:bg-amber-500/8 bg-amber-500/5 border dark:border-amber-500/15 border-amber-500/10">
                      <AlertCircle size={11} className="dark:text-amber-400 text-amber-600 flex-shrink-0" />
                      <span className="text-2xs dark:text-amber-300 text-amber-700">Western Ridge behind schedule</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded dark:bg-red-500/8 bg-red-500/5 border dark:border-red-500/15 border-red-500/10">
                      <AlertCircle size={11} className="dark:text-red-400 text-red-600 flex-shrink-0" />
                      <span className="text-2xs dark:text-red-300 text-red-700">South Block 3 crew shortage</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded dark:bg-green-500/8 bg-green-500/5 border dark:border-green-500/15 border-green-500/10">
                      <CheckCircle size={11} className="dark:text-green-400 text-green-600 flex-shrink-0" />
                      <span className="text-2xs dark:text-green-300 text-green-700">East Flats ahead of plan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics table */}
            <div className="rounded-lg dark:bg-surface-850/60 bg-white border dark:border-white/[0.05] border-black/[0.05] overflow-hidden">
              <div className="px-4 py-3 border-b dark:border-white/[0.05] border-black/[0.05] flex items-center justify-between">
                <span className="text-xs font-semibold dark:text-ink-200 text-ink-700">Logistics Coordination</span>
                <span className="text-2xs dark:text-ink-400 text-ink-400">Today · 4 movements</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="dark:bg-surface-800/40 bg-surface-50/60">
                      <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">Route</th>
                      <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden sm:table-cell">Load</th>
                      <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium">Status</th>
                      <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden md:table-cell">ETA</th>
                      <th className="text-left px-4 py-2 dark:text-ink-400 text-ink-400 font-medium hidden lg:table-cell">Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logisticsData.map((row, i) => (
                      <tr key={i} className="border-t dark:border-white/[0.04] border-black/[0.04] hover:dark:bg-white/[0.02] hover:bg-black/[0.02] transition-colors">
                        <td className="px-4 py-2.5 dark:text-ink-200 text-ink-700 font-medium">{row.route}</td>
                        <td className="px-4 py-2.5 dark:text-ink-300 text-ink-500 hidden sm:table-cell">{row.load}</td>
                        <td className="px-4 py-2.5"><StatusBadge status={row.status} /></td>
                        <td className="px-4 py-2.5 dark:text-ink-300 text-ink-500 tabular-nums hidden md:table-cell">{row.eta}</td>
                        <td className="px-4 py-2.5 dark:text-ink-400 text-ink-400 hidden lg:table-cell">{row.driver}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
