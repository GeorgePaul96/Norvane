"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const beliefs = [
  {
    statement: "Operational complexity is usually a coordination problem.",
    elaboration:
      "Most organisations have capable people with adequate resources. What they lack is a shared operational picture — a clear view of what everyone else is doing and why it matters. Complexity is often manufactured by poor coordination, not by the work itself.",
  },
  {
    statement: "Process before automation.",
    elaboration:
      "Automating a broken process produces broken results faster. The sequence matters: understand the work, design the process, then — and only then — consider what technology can do to support it. This is not a conservative position. It is a practical one.",
  },
  {
    statement: "Visibility before prediction.",
    elaboration:
      "Organisations that cannot see their current operational state should not be building predictive models. The greatest operational leverage comes from simply knowing what is happening right now — in accurate, timely, legible form.",
  },
  {
    statement: "Structure reduces cognitive load.",
    elaboration:
      "When processes are clear and roles are understood, people focus their energy on the work rather than on figuring out what to do next. Operational structure is not bureaucracy. It is the infrastructure that allows good judgment to be applied consistently.",
  },
  {
    statement: "Intelligence is only useful if it changes decisions.",
    elaboration:
      "Data and reporting that no one acts on is not operational intelligence — it is operational noise. We measure success by the quality of decisions made, not the quantity of information produced.",
  },
];

export default function Philosophy() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 md:py-36 dark:bg-surface-850 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headingRef} className="grid md:grid-cols-2 gap-12 mb-20 md:mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
              <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
                What We Believe
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              A different kind of operational consultancy.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <p className="text-lg dark:text-ink-300 text-ink-400 leading-relaxed mb-4">
              We are not generalist management consultants with an operations practice. We are
              operational specialists with deep experience in the industries where things are built,
              moved, grown, and delivered.
            </p>
            <p className="text-base dark:text-ink-400 text-ink-400 leading-relaxed">
              The beliefs below are not a marketing position. They represent the perspective we bring
              to every engagement — informed by direct experience of what works and what does not.
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
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              label: "Not",
              items: ["Software vendors", "Generic management consultants", "Change management firms", "Technology integrators"],
            },
            {
              label: "But",
              items: ["Operational systems designers", "Process architecture specialists", "Coordination problem solvers", "Decision infrastructure builders"],
            },
            {
              label: "For",
              items: ["COOs and operations directors", "Supply chain and logistics leaders", "Agricultural operators", "Operationally complex founders"],
            },
          ].map((col, i) => (
            <div
              key={i}
              className="p-7 rounded-xl dark:bg-surface-900/60 bg-surface-50/80 border dark:border-white/[0.05] border-black/[0.05]"
            >
              <div className={`text-sm font-semibold mb-4 ${
                col.label === "Not" ? "dark:text-red-400/70 text-red-600/70" :
                col.label === "But" ? "dark:text-steel-400 text-steel-600" :
                "dark:text-green-400/70 text-green-600/70"
              }`}>
                {col.label}
              </div>
              <ul className="flex flex-col gap-2">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm dark:text-ink-300 text-ink-400">
                    <div className="w-1 h-1 rounded-full dark:bg-ink-400 bg-ink-400 mt-2 flex-shrink-0" />
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
