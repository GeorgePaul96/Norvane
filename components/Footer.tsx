"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Services: [
    "Operational Diagnostics",
    "Process Mapping",
    "Planning Systems",
    "Operational Visibility",
    "Workflow Modernisation",
    "Decision Support",
  ],
  Approach: [
    "Methodology",
    "How We Work",
    "Industries",
    "Case Studies",
  ],
  Company: [
    "About Norvane",
    "Insights",
    "Contact",
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-surface-850 bg-white border-t dark:border-white/[0.06] border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="py-14 md:py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-sm dark:bg-steel-500/15 bg-steel-500/10 border dark:border-steel-500/25 border-steel-500/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="0.5" className="fill-steel-500" />
                  <rect x="8" y="1" width="5" height="5" rx="0.5" className="fill-steel-400/60" />
                  <rect x="1" y="8" width="5" height="5" rx="0.5" className="fill-steel-400/40" />
                  <rect x="8" y="8" width="5" height="5" rx="0.5" className="fill-steel-500/80" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-widest dark:text-ink-100 text-ink-900 uppercase">
                Norvane
              </span>
            </div>
            <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed max-w-xs mb-6">
              Operational intelligence for real-world complexity. Helping businesses improve
              coordination, visibility, and decision-making.
            </p>
            <a
              href="mailto:hello@norvane.com"
              className="text-sm dark:text-steel-400 text-steel-600 hover:underline underline-offset-4 transition-all duration-200"
            >
              hello@norvane.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="text-2xs font-semibold uppercase tracking-widest dark:text-ink-400 text-ink-400 mb-4">
                {section}
              </div>
              <ul className="flex flex-col gap-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm dark:text-ink-300 text-ink-500 hover:dark:text-ink-100 hover:text-ink-900 transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t dark:border-white/[0.05] border-black/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs dark:text-ink-400 text-ink-400">
            © {currentYear} Norvane. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-xs dark:text-ink-400 text-ink-400 hover:dark:text-ink-200 hover:text-ink-700 transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
