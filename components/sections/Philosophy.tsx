"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const beliefs = [
  {
    statement: "Process before software.",
    elaboration:
      "A well-designed process running on a spreadsheet will always outperform a broken process running on an expensive enterprise system. Sequence matters: define, map, and structure the work first. Technology follows to cement and accelerate those rules, not to invent them.",
  },
  {
    statement: "Systems people actually use.",
    elaboration:
      "The most sophisticated planning system is worthless if your operators bypass it to coordinate via informal group chats or notebook scribbles. We design systems around the daily habits, friction, and environmental realities of the frontline workers who maintain them.",
  },
  {
    statement: "Visibility before automation.",
    elaboration:
      "Automating a blind, chaotic process simply generates coordination failures at a higher velocity. Organizations must first establish transparent operational visibility—knowing exactly what is happening in real-time—before delegating decisions to automated routines.",
  },
  {
    statement: "Coordination over complexity.",
    elaboration:
      "When teams lack a shared operational picture, they drift into reactive troubleshooting. True efficiency is the quiet result of clean, predictable handoffs — not harder work or more sophisticated tools.",
  },
  {
    statement: "Intelligence that creates operational agency.",
    elaboration:
      "Data reporting that no one acts upon is not operational intelligence—it is noise. Dashboards are only valuable if they supply execution teams with the agency and information required to make a corrective decision in the moment, not 30 days later.",
  },
];

export default function Philosophy() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="philosophy" className="py-20 md:py-28 dark:bg-surface-850 bg-white border-t dark:border-white/[0.04] border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="grid md:grid-cols-2 gap-12 mb-14 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
              <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
                Core Philosophy
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Quiet operational discipline beats technological hype.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <p className="text-lg dark:text-ink-300 text-ink-400 leading-relaxed mb-4">
              We are not technology salespeople marketing the latest trendy integration. We are
              systems-first operators who understand how real businesses move, build, and deliver.
            </p>
            <p className="text-base dark:text-ink-400 text-ink-400 leading-relaxed">
              These principles are not marketing claims. They represent the rigorous operational framework
              we apply to design structural resilience into every client's workflow.
            </p>
          </motion.div>
        </div>

        {/* Beliefs */}
        <div className="flex flex-col">
          {beliefs.map((belief, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group grid md:grid-cols-2 gap-6 md:gap-16 py-10 border-b dark:border-white/[0.05] border-black/[0.05] last:border-0"
            >
              {/* Statement */}
              <div className="flex items-start gap-4">
                <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-500/40 text-steel-500/40 mt-1.5 flex-shrink-0">
                  0{i + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold dark:text-ink-100 text-ink-900 leading-snug text-balance">
                  {belief.statement}
                </h3>
              </div>

              {/* Elaboration */}
              <p className="text-base dark:text-ink-300 text-ink-400 leading-relaxed">
                {belief.elaboration}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Differentiator block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              label: "What We Are Not",
              items: ["A generic AI wrapper agency", "A generic marketing consultancy", "A no-code automation shop", "An enterprise dashboard factory"],
            },
            {
              label: "What We Are",
              items: ["Operational systems designers", "Implementation-focused, not advisory", "Coordination architecture partners", "Embedded for outcomes, not hours"],
            },
            {
              label: "Who We Serve",
              items: ["Operations Directors & COOs", "Logistics & agricultural firms", "Supply chain & manufacturing leads", "Operationally complex, scaling companies"],
            },
          ].map((col, i) => (
            <div
              key={i}
              className="p-7 rounded-xl dark:bg-surface-900/60 bg-surface-50/80 border dark:border-white/[0.05] border-black/[0.05]"
            >
              <div className={`text-2xs font-bold uppercase tracking-widest mb-4 ${
                col.label.includes("NOT") ? "dark:text-red-400/80 text-red-600/80" :
                col.label.includes("IS") ? "dark:text-steel-400 text-steel-600" :
                "dark:text-ink-300 text-ink-600"
              }`}>
                {col.label}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm dark:text-ink-300 text-ink-400">
                    <div className="w-1.5 h-1.5 rounded-full dark:bg-steel-500/40 bg-steel-500/30 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
