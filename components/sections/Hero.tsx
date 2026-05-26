"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const words = ["Operational", "clarity", "for", "complex", "businesses."];

function FlowDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid lines */}
      <defs>
        <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#smallGrid)" className="text-ink-300/10 dark:text-white/[0.04]" />

      {/* Connection lines */}
      <motion.path
        d="M 80 160 H 180"
        stroke="#4878a0"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M 280 160 H 380"
        stroke="#4878a0"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
      />
      <motion.path
        d="M 480 160 H 550"
        stroke="#4878a0"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
      />

      {/* Vertical connections */}
      <motion.path
        d="M 230 160 V 100 H 330"
        stroke="#4878a0"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 1.4, delay: 1.4, ease: "easeOut" }}
      />
      <motion.path
        d="M 430 160 V 220 H 330"
        stroke="#4878a0"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
      />

      {/* Nodes */}
      {[
        { cx: 80, cy: 160, r: 6, delay: 0.6 },
        { cx: 230, cy: 160, r: 8, delay: 0.9 },
        { cx: 330, cy: 100, r: 5, delay: 1.3 },
        { cx: 380, cy: 160, r: 6, delay: 1.1 },
        { cx: 330, cy: 220, r: 5, delay: 1.5 },
        { cx: 480, cy: 160, r: 8, delay: 1.3 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="#4878a0"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.4, delay: node.delay, ease: "backOut" }}
        />
      ))}

      {/* Pulse rings on key nodes */}
      {[{ cx: 230, cy: 160 }, { cx: 480, cy: 160 }].map((node, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={node.cx}
          cy={node.cy}
          r={8}
          fill="none"
          stroke="#4878a0"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 2.5,
            delay: 1.5 + i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Labels */}
      {[
        { x: 80, y: 148, text: "Input" },
        { x: 222, y: 148, text: "Process" },
        { x: 472, y: 148, text: "Output" },
      ].map((label, i) => (
        <motion.text
          key={i}
          x={label.x}
          y={label.y}
          fontSize="9"
          fill="#8890a4"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 1.6 + i * 0.1 }}
        >
          {label.text}
        </motion.text>
      ))}
    </svg>
  );
}

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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
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
                Operational Intelligence
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
              Norvane helps operationally complex businesses improve coordination, visibility,
              planning, and decision-making through structured systems and intelligent process design.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md text-sm font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200"
              >
                Book a Diagnostic
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#methodology"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("methodology")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-md text-sm font-medium dark:text-ink-200 text-ink-700 dark:border border dark:border-white/10 border-black/10 hover:dark:bg-white/5 hover:bg-black/5 transition-all duration-200"
              >
                View Methodology
                <ChevronRight size={14} className="dark:text-ink-400 text-ink-400" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex items-center gap-8 mt-14 pt-8 border-t dark:border-white/[0.06] border-black/[0.06]"
            >
              {[
                { value: "8+", label: "Sectors Served" },
                { value: "60+", label: "Processes Mapped" },
                { value: "100%", label: "Process-First Approach" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl font-semibold dark:text-ink-100 text-ink-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs dark:text-ink-400 text-ink-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Flow Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-xl dark:bg-surface-850/60 bg-white/70 border dark:border-white/[0.06] border-black/[0.06] p-8 backdrop-blur-sm">
              {/* Header of the diagram box */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-steel-500/60" />
                  <span className="text-2xs font-medium tracking-widest uppercase dark:text-ink-400 text-ink-400">
                    Operational Flow
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400/40" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/40" />
                  <div className="w-2 h-2 rounded-full bg-green-400/40" />
                </div>
              </div>
              <div className="h-64">
                <FlowDiagram />
              </div>
              {/* Bottom label */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xs dark:text-ink-400 text-ink-400">Process architecture mapping</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-steel-500 animate-pulse" />
                  <span className="text-2xs dark:text-steel-400 text-steel-600">Live</span>
                </div>
              </div>
            </div>

            {/* Floating metrics card */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="absolute -bottom-5 -left-8 rounded-lg dark:bg-surface-800 bg-white border dark:border-white/[0.08] border-black/[0.08] p-4 shadow-lg"
            >
              <div className="text-2xs font-medium uppercase tracking-wide dark:text-ink-400 text-ink-400 mb-2">
                Coordination Score
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold dark:text-ink-100 text-ink-900">94</span>
                <span className="text-xs dark:text-green-400 text-green-600 mb-1">+12 pts</span>
              </div>
              <div className="mt-2 h-1.5 w-32 dark:bg-white/5 bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-steel-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
