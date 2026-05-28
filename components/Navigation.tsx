"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#cases" },
  { label: "Methodology", href: "#methodology" },
  { label: "Diagnostic", href: "#diagnostic" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "dark:bg-surface-900/80 bg-surface-50/80 backdrop-blur-xl border-b dark:border-white/[0.06] border-black/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 group"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
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
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm dark:text-ink-300 text-ink-400 hover:dark:text-ink-100 hover:text-ink-900 transition-colors duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-8 h-8 rounded-md flex items-center justify-center dark:text-ink-300 text-ink-400 hover:dark:text-ink-100 hover:text-ink-900 dark:hover:bg-white/5 hover:bg-black/5 transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              )}

              {/* CTA */}
              <button
                onClick={() => handleNavClick("#contact")}
                className="hidden md:flex items-center gap-2 h-8 px-4 rounded-md text-xs font-semibold tracking-wide dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 transition-all duration-200"
              >
                Book a Diagnostic
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-8 h-8 rounded-md flex items-center justify-center dark:text-ink-300 text-ink-400 hover:dark:text-ink-100 hover:text-ink-900 dark:hover:bg-white/5 hover:bg-black/5 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 dark:bg-surface-850 bg-white border-b dark:border-white/[0.06] border-black/[0.06] shadow-xl md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-2.5 rounded-md text-sm dark:text-ink-200 text-ink-700 hover:dark:text-ink-100 hover:text-ink-900 hover:dark:bg-white/5 hover:bg-black/5 transition-all duration-150 font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2 pb-1 border-t dark:border-white/[0.06] border-black/[0.06] mt-2">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full h-10 rounded-md text-sm font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 transition-all duration-200"
                >
                  Book a Diagnostic
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
