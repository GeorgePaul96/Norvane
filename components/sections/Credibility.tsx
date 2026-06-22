"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const statements = [
  {
    headline: "We do not start with software.",
    body: "Technology is an amplifier, not a solution. We begin by understanding the underlying operational structure: who decides what, when, and based on which information.",
  },
  {
    headline: "Most operational failures are coordination failures.",
    body: "When teams cannot see each other's work, plans drift apart. Better operational visibility creates better alignment before problems compound.",
  },
  {
    headline: "Process before platform.",
    body: "A well-designed process implemented on a spreadsheet outperforms a poorly designed one on an enterprise system. Structure first. Technology follows.",
  },
  {
    headline: "Better visibility creates better decisions.",
    body: "Operational intelligence is only valuable when it changes behaviour. We design systems that surface the right information, at the right time, to the right people.",
  },
];

function StatementCard({
  headline,
  body,
  index,
}: {
  headline: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative p-8 rounded-xl border dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-850/40 bg-white/60 hover:dark:bg-surface-850/70 hover:bg-white/90 hover:dark:border-white/[0.1] hover:border-black/[0.1] transition-all duration-300"
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-500/60 text-steel-600/50">
          0{index + 1}
        </span>
      </div>
      <h3 className="text-xl md:text-2xl font-semibold dark:text-ink-100 text-ink-900 leading-snug mb-3 text-balance">
        {headline}
      </h3>
      <p className="text-sm md:text-base dark:text-ink-300 text-ink-400 leading-relaxed">
        {body}
      </p>
      <div className="absolute bottom-0 left-8 right-8 h-px dark:bg-steel-500/0 bg-steel-500/0 group-hover:dark:bg-steel-500/20 group-hover:bg-steel-500/15 transition-all duration-300" />
    </motion.div>
  );
}

export default function Credibility() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section className="py-28 md:py-36 dark:bg-surface-900 bg-surface-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="max-w-2xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
            <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
              Our Perspective
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
          >
            Operational complexity is a solvable problem.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg dark:text-ink-300 text-ink-400 leading-relaxed"
          >
            We hold a few foundational beliefs that shape every engagement. Not principles for the
            sake of them, but perspectives earned from working inside operationally complex businesses.
          </motion.p>
        </div>

        {/* Statements grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {statements.map((s, i) => (
            <StatementCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
