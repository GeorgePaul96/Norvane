"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  company: string;
  role: string;
  challenge: string;
  message: string;
  website: string; // honeypot, never shown to humans
}

const roleOptions = [
  "Operations Manager",
  "Founder / Director",
  "COO / General Manager",
  "Logistics Coordinator",
  "Head of Planning",
  "Other",
];

const challengeOptions = [
  "Coordination & visibility gaps",
  "Reporting and dashboards",
  "Manual processes & data entry",
  "Process documentation",
  "Workflow automation",
  "Other",
];

const trustItems = [
  {
    title: "Response within 24 hours",
    body: "Every inquiry gets a direct reply, not an automated sequence.",
  },
  {
    title: "No obligation",
    body: "No pitch decks, no sales pressure. Just an honest conversation.",
  },
  {
    title: "Confidential by default",
    body: "What you share stays between us.",
  },
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    role: "",
    challenge: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const next: Partial<FormData> = {};
    if (!formData.name.trim()) next.name = "Required";
    if (!formData.company.trim()) next.company = "Required";
    if (!formData.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setFormData({ name: "", company: "", role: "", challenge: "", message: "", website: "" });
    setErrors({});
  };

  const baseInput =
    "w-full h-10 px-3 rounded-md text-sm dark:bg-surface-800 bg-white border dark:border-white/[0.08] border-black/[0.08] dark:text-ink-100 text-ink-900 dark:placeholder-ink-400 placeholder-ink-400/70 focus:outline-none focus:dark:border-steel-500/50 focus:border-steel-500/50 transition-colors duration-200";
  const errorBorder = "border-red-500/50 dark:border-red-500/50";
  const labelClass = "block text-xs font-medium dark:text-ink-300 text-ink-600 mb-1.5";

  return (
    <section
      id="contact"
      className="py-20 md:py-28 dark:bg-surface-900 bg-surface-50 relative overflow-hidden border-t dark:border-white/[0.04] border-black/[0.04]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 dark:opacity-100 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full dark:bg-steel-600/6 bg-steel-500/3 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Copy & trust signals */}
          <div className="lg:pt-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="h-px w-8 dark:bg-steel-500/60 bg-steel-500/40" />
              <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-steel-400 text-steel-600">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl md:text-5xl font-semibold dark:text-ink-100 text-ink-900 leading-tight tracking-tight text-balance mb-6"
            >
              Good operations are rarely accidental.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg dark:text-ink-300 text-ink-400 leading-relaxed mb-10"
            >
              Every engagement starts with a structured conversation. Tell us what you're dealing
              with, and we'll tell you honestly whether we can help, and how.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-5 mb-10"
            >
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full dark:bg-steel-500/60 bg-steel-500/50 mt-[7px] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold dark:text-ink-200 text-ink-700 mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-sm dark:text-ink-400 text-ink-400 leading-relaxed">
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="mailto:hello@hello.norvane.uk"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="inline-flex items-center gap-2 text-sm dark:text-steel-400 text-steel-600 hover:underline underline-offset-4 transition-all duration-200"
            >
              <Mail size={14} />
              hello@hello.norvane.uk
            </motion.a>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="p-8 rounded-xl dark:bg-surface-850 bg-white border dark:border-white/[0.07] border-black/[0.07] shadow-xl shadow-black/5">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center py-14 text-center"
                  >
                    <div className="w-14 h-14 rounded-full dark:bg-green-500/10 bg-green-500/8 border dark:border-green-500/20 border-green-500/15 flex items-center justify-center mb-6">
                      <CheckCircle size={24} className="dark:text-green-400 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold dark:text-ink-100 text-ink-900 mb-3">
                      Message received
                    </h3>
                    <p className="text-sm dark:text-ink-300 text-ink-400 leading-relaxed max-w-xs">
                      We'll review your message and respond within 24 hours. Check your inbox;
                      we'll reach out directly.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-8 text-xs font-medium dark:text-steel-400 text-steel-600 hover:underline underline-offset-4 transition-all duration-200"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Honeypot: hidden from humans, bots fill it */}
                    <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Name + Company */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Name <span className="dark:text-steel-500 text-steel-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          className={`${baseInput} ${errors.name ? errorBorder : ""}`}
                        />
                        {errors.name && (
                          <p className="text-2xs dark:text-red-400 text-red-600 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Company <span className="dark:text-steel-500 text-steel-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Company name"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, company: e.target.value }))
                          }
                          className={`${baseInput} ${errors.company ? errorBorder : ""}`}
                        />
                        {errors.company && (
                          <p className="text-2xs dark:text-red-400 text-red-600 mt-1">
                            {errors.company}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Role + Challenge */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Your Role</label>
                        <select
                          value={formData.role}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, role: e.target.value }))
                          }
                          className={`${baseInput} cursor-pointer dark:[color-scheme:dark]`}
                        >
                          <option value="">Select role…</option>
                          {roleOptions.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Primary Challenge</label>
                        <select
                          value={formData.challenge}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, challenge: e.target.value }))
                          }
                          className={`${baseInput} cursor-pointer dark:[color-scheme:dark]`}
                        >
                          <option value="">Select challenge…</option>
                          {challengeOptions.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClass}>
                        Message <span className="dark:text-steel-500 text-steel-600">*</span>
                      </label>
                      <textarea
                        placeholder="Describe your operational situation. What's creating friction, what's invisible, or what you're trying to stabilize?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, message: e.target.value }))
                        }
                        rows={4}
                        className={`${baseInput} h-auto py-2.5 resize-none ${errors.message ? errorBorder : ""}`}
                      />
                      {errors.message && (
                        <p className="text-2xs dark:text-red-400 text-red-600 mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Error state */}
                    {status === "error" && (
                      <p className="text-xs dark:text-red-400 text-red-600 leading-relaxed">
                        Something went wrong. Please try again or email us directly at{" "}
                        <a
                          href="mailto:hello@hello.norvane.uk"
                          className="underline underline-offset-2"
                        >
                          hello@hello.norvane.uk
                        </a>
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md text-sm font-semibold dark:bg-ink-100 bg-ink-900 dark:text-ink-900 text-ink-100 hover:dark:bg-white hover:bg-ink-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Start the Conversation
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-0.5 transition-transform duration-200"
                          />
                        </>
                      )}
                    </button>

                    <p className="text-2xs dark:text-ink-400 text-ink-400 text-center leading-relaxed">
                      We typically respond within one business day.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
