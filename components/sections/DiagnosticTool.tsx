"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, HelpCircle } from "lucide-react";

// ── DATA MODEL ──────────────────────────────────────────────────────────────

type CategoryId = "coordination" | "visibility" | "planning" | "execution";

interface RiskCategory {
  id: CategoryId;
  label: string;
  /** Contribution to final score. All weights sum to 1.0. */
  weight: number;
  color: string;
}

interface DiagnosticSignal {
  id: string;
  category: CategoryId;
  /** User-facing checkbox label */
  label: string;
  /**
   * Relative importance within the category.
   * Weights per category sum to 100.
   * A higher weight means this signal contributes more to that category's score.
   */
  weight: number;
  /** Concise driver name used in the explanation panel */
  operationalTerm: string;
}

const CATEGORIES: RiskCategory[] = [
  { id: "coordination", label: "Coordination", weight: 0.35, color: "#4878a0" },
  { id: "visibility",   label: "Visibility",   weight: 0.30, color: "#f59e0b" },
  { id: "planning",     label: "Planning",     weight: 0.20, color: "#8b5cf6" },
  { id: "execution",    label: "Execution",    weight: 0.15, color: "#ef4444" },
];

const SIGNALS: DiagnosticSignal[] = [
  // ── Coordination (weights sum to 100) ────────────────────────────────────
  {
    id: "coord-1", category: "coordination", weight: 35,
    operationalTerm: "informal dispatch coordination",
    label: "Critical scheduling or dispatch decisions are managed via WhatsApp, phone calls, or verbal relay.",
  },
  {
    id: "coord-2", category: "coordination", weight: 30,
    operationalTerm: "undocumented handoff processes",
    label: "Handoffs between shifts, departments, or site teams have no documented or enforced process.",
  },
  {
    id: "coord-3", category: "coordination", weight: 20,
    operationalTerm: "single-person operational dependency",
    label: "A single planner or coordinator holds most operational knowledge with no formal backup or capture.",
  },
  {
    id: "coord-4", category: "coordination", weight: 15,
    operationalTerm: "no cross-team coordination system",
    label: "No shared system tracks coordination status across departments or sites in real time.",
  },
  // ── Visibility (weights sum to 100) ──────────────────────────────────────
  {
    id: "vis-1", category: "visibility", weight: 35,
    operationalTerm: "no real-time operational visibility",
    label: "No real-time view exists for active job status, fleet location, or line throughput.",
  },
  {
    id: "vis-2", category: "visibility", weight: 25,
    operationalTerm: "lagging indicator dependency",
    label: "Management relies on end-of-day or weekly reports to understand current operational state.",
  },
  {
    id: "vis-3", category: "visibility", weight: 25,
    operationalTerm: "reactive bottleneck discovery",
    label: "Delays, blockages, or capacity shortfalls are typically discovered after the margin impact has occurred.",
  },
  {
    id: "vis-4", category: "visibility", weight: 15,
    operationalTerm: "no deviation alerting",
    label: "No automated alerts exist for schedule deviations, loading delays, or throughput threshold breaches.",
  },
  // ── Planning (weights sum to 100) ─────────────────────────────────────────
  {
    id: "plan-1", category: "planning", weight: 35,
    operationalTerm: "spreadsheet-based planning",
    label: "Scheduling, capacity allocation, or route planning is managed in Excel or local spreadsheets.",
  },
  {
    id: "plan-2", category: "planning", weight: 30,
    operationalTerm: "manual data reconciliation",
    label: "Planners spend significant time daily reconciling data across disconnected tools and systems.",
  },
  {
    id: "plan-3", category: "planning", weight: 20,
    operationalTerm: "reactive daily rescheduling",
    label: "Planned schedules require same-day revision frequently due to real-world operational variance.",
  },
  {
    id: "plan-4", category: "planning", weight: 15,
    operationalTerm: "no planning buffers",
    label: "No formal capacity buffer or contingency logic is built into the planning cycle.",
  },
  // ── Execution (weights sum to 100) ────────────────────────────────────────
  {
    id: "exec-1", category: "execution", weight: 30,
    operationalTerm: "informal execution workarounds",
    label: "Frontline teams maintain personal notebooks, group chats, or verbal patches alongside any formal system.",
  },
  {
    id: "exec-2", category: "execution", weight: 25,
    operationalTerm: "inconsistent process compliance",
    label: "Process compliance is inconsistent. Different operators follow different versions of the same workflow.",
  },
  {
    id: "exec-3", category: "execution", weight: 25,
    operationalTerm: "lagging performance measurement",
    label: "Performance is measured through lagging financial data rather than live operational indicators.",
  },
  {
    id: "exec-4", category: "execution", weight: 20,
    operationalTerm: "fragile institutional knowledge",
    label: "Staff absences or turnover cause significant operational disruption due to undocumented procedures.",
  },
];

// ── SCORING ENGINE ───────────────────────────────────────────────────────────

interface CategoryResult {
  category: RiskCategory;
  /** 0-100, derived purely from selected signal weights within the category */
  score: number;
  selectedSignals: DiagnosticSignal[];
}

interface AssessmentResult {
  /** 0-100, weighted average across all category scores */
  overallScore: number;
  categoryResults: CategoryResult[];
  /** Top 3 selected signals by effective contribution (signal.weight × category.weight) */
  topDrivers: DiagnosticSignal[];
  riskLabel: string;
  riskDescription: string;
  explanation: string;
  selectedCount: number;
}

function computeAssessment(selected: Set<string>): AssessmentResult {
  const categoryResults: CategoryResult[] = CATEGORIES.map((cat) => {
    const categorySignals = SIGNALS.filter((s) => s.category === cat.id);
    const totalWeight = categorySignals.reduce((sum, s) => sum + s.weight, 0); // = 100
    const selectedSignals = categorySignals.filter((s) => selected.has(s.id));
    const selectedWeight = selectedSignals.reduce((sum, s) => sum + s.weight, 0);
    return {
      category: cat,
      score: totalWeight > 0 ? (selectedWeight / totalWeight) * 100 : 0,
      selectedSignals,
    };
  });

  // Weighted average: each category contributes (categoryScore × categoryWeight) to overall
  const overallScore = categoryResults.reduce(
    (sum, r) => sum + r.score * r.category.weight,
    0
  );

  // Top drivers: selected signals sorted by effective contribution descending
  const allSelected = SIGNALS.filter((s) => selected.has(s.id));
  const topDrivers = [...allSelected]
    .sort((a, b) => {
      const wA = CATEGORIES.find((c) => c.id === a.category)!.weight;
      const wB = CATEGORIES.find((c) => c.id === b.category)!.weight;
      return b.weight * wB - a.weight * wA;
    })
    .slice(0, 3);

  const { label, description } = getRiskLevel(overallScore);
  const explanation = buildExplanation(categoryResults, topDrivers, selected.size);

  return {
    overallScore,
    categoryResults,
    topDrivers,
    riskLabel: label,
    riskDescription: description,
    explanation,
    selectedCount: selected.size,
  };
}

function getRiskLevel(score: number): { label: string; description: string } {
  if (score < 10) return {
    label: "Minimal Exposure",
    description: "No significant coordination vulnerabilities identified across the four risk dimensions.",
  };
  if (score < 25) return {
    label: "Low-Moderate",
    description: "Isolated gaps are present. Address key dependencies before scaling volume.",
  };
  if (score < 45) return {
    label: "Moderate",
    description: "Active friction points are generating avoidable rework, coordination delays, and margin leakage.",
  };
  if (score < 62) return {
    label: "Elevated",
    description: "Recurring coordination failures are likely eroding margins and suppressing operational capacity.",
  };
  if (score < 78) return {
    label: "High",
    description: "Structural vulnerabilities are present. Stabilisation work is overdue.",
  };
  return {
    label: "Critical",
    description: "Severe systemic risk. Operations are held together by informal systems and individual heroics.",
  };
}

function buildExplanation(
  results: CategoryResult[],
  topDrivers: DiagnosticSignal[],
  count: number
): string {
  if (count === 0) return "";
  const sorted = [...results].sort((a, b) => b.score - a.score);
  const highest = sorted[0];
  if (highest.score === 0) return "";
  const drivers = topDrivers.map((d) => d.operationalTerm).join("; ");
  return `Your highest-exposure area is ${highest.category.label} Risk (${highest.score.toFixed(0)}%). Primary contributors: ${drivers}.`;
}

function scoreToStrokeColor(score: number): string {
  if (score < 25) return "#10b981";
  if (score < 50) return "#f59e0b";
  if (score < 70) return "#f97316";
  return "#ef4444";
}

function scoreToCssColor(score: number): string {
  if (score < 25) return "dark:text-green-400 text-green-600";
  if (score < 50) return "dark:text-amber-400 text-amber-600";
  if (score < 70) return "text-orange-500";
  return "dark:text-red-400 text-red-600";
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

const RING_R = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R; // ≈ 213.6

export default function DiagnosticTool() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const result = useMemo(() => computeAssessment(selected), [selected]);

  return (
    <section
      id="diagnostic-tool"
      className="py-20 md:py-28 dark:bg-surface-850 bg-white relative overflow-hidden border-t dark:border-white/[0.04] border-black/[0.04]"
    >
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full dark:bg-steel-600/5 bg-steel-500/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div ref={containerRef} className="max-w-3xl mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
            <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
              Self-Assessment
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
            Select every signal that applies to your operation. Each item carries a weighted score
            across four risk dimensions. Your profile updates continuously as you select.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Signals grouped by category */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {CATEGORIES.map((cat) => {
              const catSignals = SIGNALS.filter((s) => s.category === cat.id);
              const catResult = result.categoryResults.find((r) => r.category.id === cat.id)!;

              return (
                <div key={cat.id}>
                  {/* Category header with live mini-bar */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-xs font-semibold uppercase tracking-wider dark:text-ink-300 text-ink-600">
                        {cat.label} Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1 dark:bg-white/[0.06] bg-black/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                          initial={{ width: "0%" }}
                          animate={{ width: `${catResult.score}%` }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-2xs font-mono tabular-nums dark:text-ink-400 text-ink-400 w-7 text-right">
                        {Math.round(catResult.score)}%
                      </span>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="flex flex-col gap-2">
                    {catSignals.map((signal) => {
                      const isSelected = selected.has(signal.id);
                      return (
                        <button
                          key={signal.id}
                          onClick={() => toggle(signal.id)}
                          className={`text-left p-4 rounded-lg border transition-all duration-200 flex items-start gap-3.5 cursor-pointer select-none ${
                            isSelected
                              ? "dark:bg-surface-900 bg-white dark:border-white/[0.1] border-black/[0.1]"
                              : "dark:bg-surface-900/30 bg-surface-50/60 dark:border-white/[0.04] border-black/[0.04] hover:dark:bg-surface-900/60 hover:bg-white/80 hover:dark:border-white/[0.08] hover:border-black/[0.08]"
                          }`}
                        >
                          {/* Checkbox */}
                          <div
                            className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                              isSelected ? "text-white" : "dark:border-white/20 border-black/15 bg-transparent"
                            }`}
                            style={isSelected ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
                          >
                            {isSelected && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className={`text-sm leading-relaxed transition-colors duration-200 ${
                              isSelected
                                ? "dark:text-ink-100 text-ink-900 font-medium"
                                : "dark:text-ink-300 text-ink-500"
                            }`}>
                              {signal.label}
                            </span>
                            {isSelected && (
                              <div className="mt-1.5 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                <span className="text-2xs dark:text-ink-400 text-ink-400">
                                  {signal.operationalTerm}
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Score panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="p-7 rounded-xl dark:bg-surface-900 bg-surface-50 border dark:border-white/[0.06] border-black/[0.06] shadow-lg shadow-black/10 flex flex-col gap-0">

              {/* Label */}
              <div className="text-2xs font-bold uppercase tracking-wider dark:text-ink-400 text-ink-400 mb-5">
                Risk Profile
              </div>

              {/* Score + level */}
              <div className="flex items-center gap-5 mb-6">
                {/* Ring */}
                <div className="relative w-[80px] h-[80px] flex-shrink-0 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40" cy="40" r={RING_R}
                      fill="transparent" strokeWidth="5"
                      stroke="currentColor"
                      className="dark:text-white/[0.05] text-black/[0.05]"
                    />
                    <motion.circle
                      cx="40" cy="40" r={RING_R}
                      fill="transparent" strokeWidth="5"
                      strokeLinecap="round"
                      stroke={scoreToStrokeColor(result.overallScore)}
                      strokeDasharray={RING_CIRCUMFERENCE}
                      initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
                      animate={{
                        strokeDashoffset:
                          RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * result.overallScore) / 100,
                      }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="relative text-lg font-bold dark:text-ink-100 text-ink-900 tabular-nums">
                    {Math.round(result.overallScore)}%
                  </span>
                </div>

                <div>
                  <div className={`text-sm font-semibold mb-1 ${
                    result.selectedCount > 0
                      ? scoreToCssColor(result.overallScore)
                      : "dark:text-ink-400 text-ink-400"
                  }`}>
                    {result.selectedCount > 0 ? result.riskLabel : "Not assessed"}
                  </div>
                  <p className="text-xs dark:text-ink-400 text-ink-500 leading-relaxed">
                    {result.selectedCount > 0
                      ? result.riskDescription
                      : "Select signals on the left to calculate your profile."}
                  </p>
                </div>
              </div>

              {/* Category breakdown */}
              <div className="border-t dark:border-white/[0.05] border-black/[0.05] pt-5 mb-5">
                <div className="text-2xs font-semibold uppercase tracking-wider dark:text-ink-400 text-ink-400 mb-4">
                  By Category
                </div>
                <div className="flex flex-col gap-3.5">
                  {result.categoryResults.map((r) => (
                    <div key={r.category.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: r.category.color }}
                          />
                          <span className="text-xs dark:text-ink-300 text-ink-600">
                            {r.category.label}
                          </span>
                          <span className="text-2xs dark:text-ink-500 text-ink-400">
                            ×{r.category.weight}
                          </span>
                        </div>
                        <span className="text-xs font-mono tabular-nums dark:text-ink-300 text-ink-600">
                          {Math.round(r.score)}%
                        </span>
                      </div>
                      <div className="h-1.5 dark:bg-white/[0.05] bg-black/[0.05] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: r.category.color }}
                          initial={{ width: "0%" }}
                          animate={{ width: `${r.score}%` }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary drivers */}
              {result.topDrivers.length > 0 && (
                <div className="border-t dark:border-white/[0.05] border-black/[0.05] pt-5 mb-5">
                  <div className="text-2xs font-semibold uppercase tracking-wider dark:text-ink-400 text-ink-400 mb-3">
                    Primary Drivers
                  </div>
                  <div className="flex flex-col gap-2">
                    {result.topDrivers.map((d) => {
                      const cat = CATEGORIES.find((c) => c.id === d.category)!;
                      return (
                        <div key={d.id} className="flex items-start gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className="text-xs dark:text-ink-300 text-ink-600 leading-relaxed">
                            {d.operationalTerm}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Explanation */}
              {result.explanation && (
                <div className="border-t dark:border-white/[0.05] border-black/[0.05] pt-5 mb-6">
                  <p className="text-xs dark:text-ink-300 text-ink-500 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              )}

              {/* Empty state */}
              {result.selectedCount === 0 && (
                <div className="flex gap-2.5 items-start text-xs dark:text-ink-400 text-ink-500 mb-6">
                  <HelpCircle size={13} className="flex-shrink-0 mt-0.5 dark:text-ink-500 text-ink-400" />
                  <span>Select any signal above. Your weighted risk profile updates in real time, and each item adds its proportional score.</span>
                </div>
              )}

              {/* CTA */}
              <a
                href="#diagnostic"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group w-full inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg text-xs font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200 shadow-sm"
              >
                {result.selectedCount > 0 ? "Discuss These Results" : "View the Diagnostic"}
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
