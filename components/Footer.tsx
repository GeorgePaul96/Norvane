"use client";

import { motion } from "framer-motion";
import { LogoMark } from "@/components/Logo";

const footerLinks = {
  Services: [
    "Operations Diagnostic",
    "Process Blueprint",
    "Operational Visibility Dashboard",
  ],
  Approach: [
    "Methodology",
    "Case Studies",
    "Industries Served",
  ],
  Company: [
    "About Norvane",
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
            <div className="flex items-center gap-3 mb-4">
              <LogoMark height={32} className="dark:text-ink-100 text-ink-900" />
              <span className="text-sm font-semibold tracking-[0.18em] dark:text-ink-100 text-ink-900 uppercase">
                Norvane
              </span>
            </div>
            <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed max-w-xs mb-6">
              Diagnostics-led operations consultancy. We map broken processes and build the
              coordination systems that replace them, for agriculture and logistics businesses.
            </p>
            <a
              href="mailto:hello@hello.norvane.uk"
              className="text-sm dark:text-steel-400 text-steel-600 hover:underline underline-offset-4 transition-all duration-200"
            >
              hello@hello.norvane.uk
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
