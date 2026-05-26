"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Operational Diagnostics",
    description:
      "A structured assessment of your current operational state. We identify where coordination breaks down, where information goes missing, and where process design creates unnecessary friction.",
  },
  {
    number: "02",
    title: "Process Mapping",
    description:
      "Rigorous documentation of how work actually flows through your organisation — not the idealised version, but the real one. The foundation for meaningful improvement.",
  },
  {
    number: "03",
    title: "Planning & Coordination Systems",
    description:
      "Design and implementation of operational planning frameworks that connect teams, timelines, and priorities into a coherent, shared view of what needs to happen and when.",
  },
  {
    number: "04",
    title: "Operational Visibility Design",
    description:
      "Building the information architecture that gives leadership and operational teams a clear, real-time view of what is happening, where delays are forming, and what requires attention.",
  },
  {
    number: "05",
    title: "Workflow Modernisation",
    description:
      "Rebuilding manual, fragmented, or unreliable workflows into structured, repeatable processes. Reducing cognitive load and operational risk simultaneously.",
  },
  {
    number: "06",
    title: "Decision Support Systems",
    description:
      "Designing the data flows, reporting structures, and analytical frameworks that ensure decisions are made with the right information rather than the available information.",
  },
  {
    number: "07",
    title: "Scenario Planning",
    description:
      "Structured approaches to operational planning under uncertainty. Building the capacity to think ahead, identify exposures, and respond without losing operational coherence.",
  },
  {
    number: "08",
    title: "Knowledge Capture Systems",
    description:
      "Preserving operational knowledge that currently lives in the heads of key individuals. Creating organisational memory that makes teams more resilient and consistent.",
  },
  {
    number: "09",
    title: "Operational Intelligence Infrastructure",
    description:
      "Designing the integrated data, reporting, and analytical infrastructure that connects operational reality to decision-makers — giving organisations the ability to act on what they see.",
  },
];

function ServiceCard({ number, title, description, index }: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative p-7 rounded-xl border dark:border-white/[0.05] border-black/[0.05] dark:hover:border-white/[0.1] hover:border-black/[0.1] dark:bg-surface-850/30 bg-white/50 hover:dark:bg-surface-850/60 hover:bg-white/80 transition-all duration-300 cursor-default"
    >
      {/* Number */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-500/50 text-steel-600/40">
          {number}
        </span>
        <ArrowUpRight
          size={14}
          className="dark:text-ink-400/0 text-ink-400/0 group-hover:dark:text-ink-400/60 group-hover:text-ink-400/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold dark:text-ink-100 text-ink-900 mb-2.5 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-xl overflow-hidden">
        <div className="h-full dark:bg-steel-500/0 bg-steel-500/0 group-hover:dark:bg-steel-500/30 group-hover:bg-steel-500/20 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 md:py-36 dark:bg-surface-850 bg-white">
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
                Core Services
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance"
            >
              Structured services for operational complexity.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-sm text-sm dark:text-ink-300 text-ink-400 leading-relaxed md:text-right"
          >
            Each service is designed to address a specific operational constraint — and most
            engagements combine several to address the system as a whole.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service, i) => (
            <ServiceCard key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
