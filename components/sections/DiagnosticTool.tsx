"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, Activity, Layers } from "lucide-react";

interface PainPoint {
  id: string;
  label: string;
  category: string;
  impact: string;
  advice: string;
}

const painPoints: PainPoint[] = [
  {
    id: "spreadsheets",
    label: "Critical scheduling, dispatch, or inventory lives in personalized spreadsheets.",
    category: "System Dependency",
    impact: "Creates version chaos, broken formulas, and locks operational logic in localized sheets.",
    advice: "Establish a process database and shared visibility layer to secure transaction history and single-source logic.",
  },
  {
    id: "people",
    label: "Process rules exist only in the heads of key operators (single-point-of-failures).",
    category: "Key-Person Risk",
    impact: "Exposes the business to severe disruption if a key planner is absent or departs the firm.",
    advice: "Initiate structured knowledge extraction to build evergreen playbooks and interactive digital SOPs.",
  },
  {
    id: "visibility",
    label: "No single, real-time view of active job status, line delays, or logistics states.",
    category: "Information Silo",
    impact: "Forces leaders to operate in an information lag, acting only on retrospective reports.",
    advice: "Unify local system endpoints into a synchronized operational visibility wall showing active metrics.",
  },
  {
    id: "manual",
    label: "Staff waste substantial hours manually copy-pasting data or reconciling logs.",
    category: "Process Friction",
    impact: "Drains staff energy, delays response times, and increases administrative errors.",
    advice: "Deploy database bridges and automated workflow loops to completely eliminate data double-entry.",
  },
  {
    id: "firefighting",
    label: "Planning is reactive; schedules are redone daily in response to emergencies.",
    category: "Coordination Deficit",
    impact: "Triggers worker exhaustion, idle capacities, customer friction, and high expediting fees.",
    advice: "Design synchronous planning cycles and visual buffers to stabilize daily execution states.",
  },
  {
    id: "forecasting",
    label: "Difficulty predicting operational capacities or job margins with accuracy.",
    category: "Analytical Blindness",
    impact: "Causes under-pricing of contracts or over-commitment of resources, suppressing margins.",
    advice: "Build structured cost-allocation and capacity-tracking rules tied directly to execution history.",
  },
];

export default function DiagnosticTool() {
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const togglePainPoint = (id: string) => {
    setSelectedPainPoints((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedCount = selectedPainPoints.length;
  
  // Risk calculation
  let riskLevel = "Stable";
  let riskColor = "dark:text-green-400 text-green-600";
  let riskBg = "dark:bg-green-500/10 bg-green-500/5 dark:border-green-500/20 border-green-500/15";
  let riskScore = 15;
  let riskEvaluation = "Your processes are relatively stable. Active coordination barriers are minimized, allowing consistent delivery. Focus on documenting edge cases.";
  
  if (selectedCount >= 1 && selectedCount <= 2) {
    riskLevel = "Moderate Risk Exposure";
    riskColor = "dark:text-amber-400 text-amber-600";
    riskBg = "dark:bg-amber-500/10 bg-amber-500/5 dark:border-amber-500/20 border-amber-500/15";
    riskScore = 45;
    riskEvaluation = "High reliance on human heroics. Operational flow is vulnerable to key personnel absences or unexpected volume surges. Siloed spreadsheets are generating friction.";
  } else if (selectedCount >= 3) {
    riskLevel = "Critical Vulnerability Exposure";
    riskColor = "dark:text-red-400 text-red-600";
    riskBg = "dark:bg-red-500/10 bg-red-500/5 dark:border-red-500/20 border-red-500/15";
    riskScore = 85;
    riskEvaluation = "Active margin erosion. Severe spreadsheet dependency, information gaps, and highly reactive fire-fighting are actively capping your organization's scale and profitability.";
  }

  return (
    <section id="diagnostic-tool" className="py-28 md:py-36 dark:bg-surface-850 bg-white relative overflow-hidden border-t dark:border-white/[0.04] border-black/[0.04]">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full dark:bg-steel-600/5 bg-steel-500/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div ref={containerRef} className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
            <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
              Interactive Assessment
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight mb-6"
          >
            Assess your operational coordination risk.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg dark:text-ink-300 text-ink-400 leading-relaxed"
          >
            Select the specific operational hurdles your organization encounters today to generate a
            tailored coordination exposure evaluation and preliminary modernization advice.
          </motion.p>
        </div>

        {/* Assessment grid split */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Pain points checkboard (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <span className="text-2xs font-bold uppercase tracking-wider dark:text-ink-400 text-ink-400 mb-2">
              Select Active Hurdles
            </span>
            <div className="grid gap-3">
              {painPoints.map((pain) => {
                const isSelected = selectedPainPoints.includes(pain.id);
                return (
                  <button
                    key={pain.id}
                    onClick={() => togglePainPoint(pain.id)}
                    className={`text-left p-5 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer select-none ${
                      isSelected
                        ? "dark:bg-surface-900 bg-surface-50 dark:border-steel-500/40 border-steel-500/30"
                        : "dark:bg-surface-900/40 bg-surface-50/40 dark:border-white/[0.05] border-black/[0.05] hover:dark:border-white/10 hover:border-black/10 hover:dark:bg-surface-900/60 hover:bg-surface-50/60"
                    }`}
                  >
                    {/* Checkbox indicator */}
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isSelected
                        ? "bg-steel-500 border-steel-500 text-white"
                        : "dark:border-white/20 border-black/20 bg-transparent"
                    }`}>
                      {isSelected && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2 flex-wrap sm:flex-nowrap">
                        <span className={`text-sm font-semibold transition-colors duration-200 ${
                          isSelected ? "dark:text-ink-100 text-ink-900" : "dark:text-ink-300 text-ink-500"
                        }`}>
                          {pain.label}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider dark:bg-white/[0.04] bg-black/[0.04] px-2 py-0.5 rounded dark:text-ink-400 text-ink-500">
                          {pain.category}
                        </span>
                      </div>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-2xs dark:text-red-400/80 text-red-600/80 italic">
                              Operational Impact: {pain.impact}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time score details (Right) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-xl dark:bg-surface-900 bg-surface-50 border dark:border-white/[0.06] border-black/[0.06] flex flex-col justify-between h-full shadow-lg shadow-black/10">
              <div>
                <span className="text-2xs font-bold uppercase tracking-wider dark:text-ink-400 text-ink-400">
                  Live System Diagnostics
                </span>

                {/* Score circle */}
                <div className="flex items-center gap-6 my-8">
                  <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                    {/* Ring track */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="5" fill="transparent" className="dark:text-white/[0.04] text-black/[0.04]" />
                      {/* Active Ring */}
                      <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={selectedCount >= 3 ? "#ef4444" : selectedCount >= 1 ? "#f59e0b" : "#10b981"}
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={251.2}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * riskScore) / 100 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="text-xl font-bold dark:text-ink-100 text-ink-900 tabular-nums">
                      {riskScore}%
                    </span>
                  </div>

                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${riskBg} ${riskColor}`}>
                      <Activity size={12} />
                      {riskLevel}
                    </span>
                    <div className="text-[10px] dark:text-ink-400 text-ink-500 mt-2 font-medium uppercase tracking-wider">
                      Based on {selectedCount} active {selectedCount === 1 ? "hurdle" : "hurdles"}
                    </div>
                  </div>
                </div>

                {/* Evaluation text */}
                <p className="text-sm dark:text-ink-200 text-ink-800 leading-relaxed font-medium pb-6 border-b dark:border-white/[0.05] border-black/[0.05]">
                  {riskEvaluation}
                </p>

                {/* Tailored modernizations */}
                <div className="mt-6">
                  <span className="text-2xs font-bold uppercase tracking-wider dark:text-ink-400 text-ink-400">
                    Tailored Action Path
                  </span>
                  
                  <div className="mt-3 flex flex-col gap-3 min-h-[120px]">
                    {selectedCount === 0 ? (
                      <div className="flex gap-2.5 items-start text-xs dark:text-ink-300 text-ink-500 italic mt-2">
                        <ShieldCheck size={14} className="dark:text-green-400 text-green-600 flex-shrink-0 mt-0.5" />
                        No hurdles selected. Check boxes on the left to analyze coordination risks and generate customized advice.
                      </div>
                    ) : (
                      painPoints
                        .filter((p) => selectedPainPoints.includes(p.id))
                        .map((p) => (
                          <motion.div
                            key={`adv-${p.id}`}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2.5 text-xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-steel-500 flex-shrink-0 mt-1.5" />
                            <div>
                              <strong className="dark:text-ink-200 text-ink-700 font-semibold">{p.category}:</strong>{" "}
                              <span className="dark:text-ink-300 text-ink-500 leading-relaxed">{p.advice}</span>
                            </div>
                          </motion.div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* Call-to-action bottom */}
              <div className="mt-8 pt-6 border-t dark:border-white/[0.05] border-black/[0.05] flex flex-col gap-3">
                <a
                  href="#diagnostic"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group w-full inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-xs font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200 cursor-pointer shadow-md"
                >
                  Quantify This Risk: View Diagnostic
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
                <span className="text-[10px] dark:text-ink-400 text-ink-500 leading-relaxed text-center">
                  Get a complete, visual coordination risk audit & customized modernisation roadmap.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
