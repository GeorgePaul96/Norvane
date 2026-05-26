"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-28 md:py-36 dark:bg-surface-900 bg-surface-50 relative overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full dark:bg-steel-600/8 bg-steel-500/4 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
          <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
            Get Started
          </span>
          <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance mb-6"
        >
          Bring structure to operational complexity.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-lg md:text-xl dark:text-ink-300 text-ink-400 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Norvane helps businesses improve coordination, visibility, and operational
          decision-making through practical systems and modern operational intelligence.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@norvane.com"
            className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md text-sm font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200 shadow-lg shadow-black/20"
          >
            Schedule a Diagnostic
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
          <a
            href="mailto:hello@norvane.com"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-md text-sm font-medium dark:text-ink-300 text-ink-500 hover:dark:text-ink-100 hover:text-ink-900 transition-colors duration-200"
          >
            <Mail size={14} />
            hello@norvane.com
          </a>
        </motion.div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10"
        >
          {[
            "No obligation initial conversation",
            "Confidential by default",
            "Sector-experienced team",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full dark:bg-steel-500/60 bg-steel-500/50" />
              <span className="text-xs dark:text-ink-400 text-ink-400">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
