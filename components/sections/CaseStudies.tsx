"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, RotateCw, AlertTriangle, Truck, Building2, Shuffle } from "lucide-react";

const scenarios = [
  {
    id: "agriculture",
    icon: Shuffle,
    sector: "Agriculture & Harvesting",
    title: "Dynamic Dispatch & Crop Coordination",
    scale: "12 harvesting crews · 40 segments · 3 depots",
    context: "A large-scale crop harvester and distributor managing high-speed operations across disconnected paddocks during a tight 6-week seasonal harvest window. Coordination relied on WhatsApp group chats and a mastermind planner's physical notebook.",
    before: {
      chaos: "Handoff delays between field harvesting crews and logistics drivers went undetected. Trucks arrived at empty paddock slots while harvesting machines sat completely idle waiting for empty bin trailers.",
      metric: "22% machine idle capacity",
      consequence: "14 missed harbor terminal delivery slots daily, triggering severe shipping contract penalties and extreme dispatcher exhaustion.",
    },
    after: {
      solution: "We designed a low-friction operational visibility bridge that extracted yield-rates directly from harvester monitors and connected them with real-time GPS transport data, mapping automated dispatch buffers.",
      metric: "Near-zero bin-waiting idle time",
      consequence: "Achieved near-complete terminal delivery compliance and substantially reduced daily dispatcher coordination calls.",
    },
  },
  {
    id: "manufacturing",
    icon: Building2,
    sector: "Industrial Manufacturing",
    title: "Constraint-Based Capacity Allocation",
    scale: "450 monthly custom jobs · 14 work centers",
    context: "A high-variance industrial fabrication supplier producing complex custom steel structures. Production capacities, tooling, and labor planning were tracked in a shared Excel spreadsheet on a local network drive.",
    before: {
      chaos: "The master planning sheet crashed or locked out planners daily. Lead-times were calculated on manual 'guesses', leading to over-allocating machinery and key-worker shortages.",
      metric: "18 days average lead-time variance",
      consequence: "Substantial weekly costs in emergency courier fees and worker overtime to expedite late customer orders.",
    },
    after: {
      solution: "We built a centralized database mapping tool centers and raw capacities, utilizing automated constraint checks. Schedulers plan visually on a shared drag-and-drop planning board.",
      metric: "Zero capacity over-allocations",
      consequence: "Reduced lead-time variance from weeks to days, eliminated emergency expediting costs, and recovered significant planning capacity weekly.",
    },
  },
  {
    id: "logistics",
    icon: Truck,
    sector: "Chilled Supply Chain",
    title: "Dynamic Fleet & Depot Coordination",
    scale: "90 delivery routes daily · 3 cold-store depots",
    context: "A regional chilled food logistics business distributing temperature-sensitive dairy and produce to 400 supermarkets daily. Fleet routes and dispatch manifests were tracked on paper clipboards and magnetic whiteboards.",
    before: {
      chaos: "Route delay events (traffic, vehicle backups, warehouse load issues) were reported verbally by drivers via phone calls, too late for dispatchers to dynamically reroute other vehicles.",
      metric: "3.4% cargo spoilage rate",
      consequence: "Substantial weekly product insurance claims, driver frustration, and average depot turnaround times exceeding 75 minutes.",
    },
    after: {
      solution: "We deployed a light, cloud-connected routing dashboard onto durable tablet screens inside delivery cabs. We linked route telemetry to automated dispatcher alerts.",
      metric: "Major reduction in cargo spoilage",
      consequence: "Reduced average depot turnaround times significantly and substantially reduced manual driver coordination calls.",
    },
  },
];

export default function CaseStudies() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0].id);
  const currentScenario = scenarios.find((s) => s.id === activeScenario) || scenarios[0];
  const IconComp = currentScenario.icon;

  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="cases" className="py-20 md:py-28 dark:bg-surface-850 bg-white border-t dark:border-white/[0.04] border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
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
                System Redesigns
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Operational scenarios.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-sm dark:text-ink-300 text-ink-400 leading-relaxed md:text-right"
          >
            Illustrative scenarios drawn from real coordination patterns across agriculture,
            manufacturing, and logistics operations.
          </motion.p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b dark:border-white/[0.05] border-black/[0.05]">
          {scenarios.map((scen) => (
            <button
              key={scen.id}
              onClick={() => setActiveScenario(scen.id)}
              className={`px-5 py-3 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                scen.id === activeScenario
                  ? "dark:bg-surface-900 bg-surface-50 dark:border-white/[0.08] border-black/[0.08] dark:text-ink-100 text-ink-900"
                  : "bg-transparent border-transparent dark:text-ink-400 text-ink-500 hover:dark:text-ink-200 hover:text-ink-750"
              }`}
            >
              {scen.sector}
            </button>
          ))}
        </div>

        {/* Interactive Case Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="p-8 md:p-12 rounded-xl dark:bg-surface-900 bg-surface-50 border dark:border-white/[0.07] border-black/[0.07] shadow-xl shadow-black/5"
          >
            {/* Top sector label */}
            <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b dark:border-white/[0.04] border-black/[0.04] mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded dark:bg-surface-850 bg-white dark:text-steel-400 text-steel-600 dark:border border-transparent dark:border-white/5">
                  <IconComp size={16} />
                </div>
                <div>
                  <div className="text-[10px] dark:text-steel-400 text-steel-600 font-bold uppercase tracking-wider">
                    {currentScenario.sector}
                  </div>
                  <h3 className="text-lg font-bold dark:text-ink-100 text-ink-900 mt-0.5">
                    {currentScenario.title}
                  </h3>
                </div>
              </div>
              <div className="text-2xs dark:text-ink-400 text-ink-500 font-medium tracking-wide dark:bg-surface-850 bg-white px-3 py-1.5 rounded border dark:border-white/5 border-black/5">
                Scale: {currentScenario.scale}
              </div>
            </div>

            {/* Operational Context */}
            <div className="mb-10 max-w-4xl">
              <span className="text-2xs font-semibold uppercase tracking-wider dark:text-ink-400 text-ink-400">
                Operational Context
              </span>
              <p className="text-sm md:text-base dark:text-ink-200 text-ink-800 leading-relaxed font-medium mt-2">
                {currentScenario.context}
              </p>
            </div>

            {/* Before and After Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Before Column */}
              <div className="p-6 rounded-xl dark:bg-surface-850/40 bg-white/60 border dark:border-red-500/[0.07] border-red-500/[0.07] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-red-500 dark:text-red-400">
                    <AlertTriangle size={14} />
                    <span className="text-2xs font-bold uppercase tracking-wider">
                      The Coordination Breakdown
                    </span>
                  </div>
                  <p className="text-xs dark:text-ink-300 text-ink-500 leading-relaxed">
                    {currentScenario.before.chaos}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t dark:border-white/[0.04] border-black/[0.04]">
                  <div className="text-xl font-bold dark:text-red-400 text-red-600 leading-none">
                    {currentScenario.before.metric}
                  </div>
                  <div className="text-[10px] dark:text-ink-400 text-ink-500 font-semibold uppercase tracking-wider mt-2">
                    Primary Operational Drag
                  </div>
                  <p className="text-2xs dark:text-red-400/80 text-red-600/80 italic mt-1.5">
                    Impact: {currentScenario.before.consequence}
                  </p>
                </div>
              </div>

              {/* After Column */}
              <div className="p-6 rounded-xl dark:bg-surface-850 bg-white border dark:border-green-500/[0.08] border-green-500/[0.08] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-green-500 dark:text-green-400">
                    <RotateCw size={14} className="animate-spin" style={{ animationDuration: "18s" }} />
                    <span className="text-2xs font-bold uppercase tracking-wider">
                      The System Redesign
                    </span>
                  </div>
                  <p className="text-xs dark:text-ink-200 text-ink-800 leading-relaxed font-medium">
                    {currentScenario.after.solution}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t dark:border-white/[0.04] border-black/[0.04]">
                  <div className="text-xl font-bold dark:text-green-400 text-green-600 leading-none">
                    {currentScenario.after.metric}
                  </div>
                  <div className="text-[10px] dark:text-ink-400 text-ink-500 font-semibold uppercase tracking-wider mt-2">
                    Post-Stabilization Result
                  </div>
                  <p className="text-2xs dark:text-green-400/80 text-green-600/80 font-medium italic mt-1.5">
                    Result: {currentScenario.after.consequence}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA block */}
            <div className="mt-10 p-5 rounded-lg dark:bg-surface-850 bg-white border dark:border-white/5 border-black/5 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs dark:text-ink-300 text-ink-400 leading-relaxed max-w-xl">
                Every operation breaks in its own way. Our fixed-scope Diagnostic maps your specific
                processes to locate exactly where coordination is failing, and what it's costing.
              </div>
              <a
                href="#diagnostic"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold dark:text-steel-400 text-steel-600 hover:underline underline-offset-4 transition-all duration-200 cursor-pointer"
              >
                See How the Diagnostic Works
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
