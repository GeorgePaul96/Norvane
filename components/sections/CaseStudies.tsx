"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const insights = [
  {
    category: "Operational Analysis",
    headline: "Why harvest coordination fails at scale — and how to redesign it.",
    excerpt:
      "When operations grow faster than the systems coordinating them, what starts as a planning challenge becomes a coordination emergency. We examine the common patterns and practical solutions.",
    readTime: "8 min read",
    tag: "Agriculture",
  },
  {
    category: "Process Design",
    headline: "The cost of invisible handoffs in logistics operations.",
    excerpt:
      "Most logistics delays are not caused by external disruptions. They originate in the seams between teams — the handoffs that no one is formally responsible for monitoring. A systems analysis.",
    readTime: "6 min read",
    tag: "Logistics",
  },
  {
    category: "Systems Thinking",
    headline: "Process before platform: how technology deployments fail operationally.",
    excerpt:
      "Enterprise software implementations routinely underperform. The cause is rarely technical. We examine why the sequence of change matters more than the choice of technology.",
    readTime: "10 min read",
    tag: "Transformation",
  },
  {
    category: "Transformation",
    headline: "Building operational memory in a high-turnover environment.",
    excerpt:
      "When knowledge leaves with people, operations become fragile. The organisations that manage this best do not rely on individuals to remember — they build systems that retain operational intelligence.",
    readTime: "7 min read",
    tag: "Knowledge Systems",
  },
];

function InsightCard({ item, index }: { item: typeof insights[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      className="group flex flex-col p-8 rounded-xl border dark:border-white/[0.05] border-black/[0.05] dark:bg-surface-850/30 bg-white/60 hover:dark:bg-surface-850/60 hover:bg-white/90 hover:dark:border-white/[0.1] hover:border-black/[0.1] transition-all duration-300 cursor-pointer"
    >
      {/* Meta */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-2xs font-semibold border dark:bg-steel-500/8 bg-steel-500/6 dark:text-steel-400 text-steel-600 dark:border-steel-500/20 border-steel-500/15">
            {item.tag}
          </span>
        </div>
        <span className="text-2xs dark:text-ink-400 text-ink-400">{item.readTime}</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="text-2xs font-semibold uppercase tracking-widest dark:text-ink-400 text-ink-400 mb-3">
          {item.category}
        </div>
        <h3 className="text-lg md:text-xl font-semibold dark:text-ink-100 text-ink-900 leading-snug mb-3 text-balance group-hover:dark:text-white group-hover:text-ink-900 transition-colors duration-200">
          {item.headline}
        </h3>
        <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed">
          {item.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t dark:border-white/[0.05] border-black/[0.05] flex items-center justify-between">
        <span className="text-xs font-medium dark:text-steel-400 text-steel-600 group-hover:underline underline-offset-4 transition-all duration-200">
          Read analysis
        </span>
        <ArrowRight
          size={14}
          className="dark:text-steel-400 text-steel-600 group-hover:translate-x-1 transition-transform duration-200"
        />
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="insights" className="py-28 md:py-36 dark:bg-surface-900 bg-surface-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
                Operational Insights
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Analysis from operational practice.
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            href="#"
            className="group inline-flex items-center gap-1.5 text-sm font-medium dark:text-steel-400 text-steel-600 hover:underline underline-offset-4 transition-all duration-200 whitespace-nowrap"
          >
            View all insights
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((item, i) => (
            <InsightCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Featured pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8 p-10 md:p-14 rounded-xl dark:bg-surface-850/40 bg-white/60 border dark:border-white/[0.05] border-black/[0.05] text-center"
        >
          <div className="text-4xl dark:text-steel-500/30 text-steel-500/20 font-serif mb-4">"</div>
          <p className="text-xl md:text-2xl font-medium dark:text-ink-200 text-ink-700 leading-relaxed max-w-3xl mx-auto text-balance">
            Operational intelligence is not about having more data. It is about having the right
            information reach the right person at the moment a decision needs to be made.
          </p>
          <div className="mt-6 text-sm dark:text-ink-400 text-ink-400">
            — Norvane Operational Principles
          </div>
        </motion.div>
      </div>
    </section>
  );
}
