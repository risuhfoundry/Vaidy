"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const badges = ["CBC Report ✓", "Lipid Panel ✓", "Thyroid Panel ✓"];

export default function UploadPreview() {
  return (
    <section id="how-it-works" className="relative bg-bg-void">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
            Drop your report. Vaidy reads it instantly.
          </h2>
        </motion.div>

        <motion.div
          className="shimmer-border mx-auto mt-12 max-w-3xl rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="glass-card p-4 md:p-6">
            <motion.button
              type="button"
              className="group flex min-h-[17rem] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 text-center outline-none transition-colors hover:border-emerald-400/60 hover:bg-emerald-400/[0.04] focus-visible:ring-2 focus-visible:ring-emerald-400/70"
              whileHover={{ scale: 1.01, boxShadow: "0 0 48px rgba(52,211,153,0.18)" }}
              whileTap={{ scale: 0.995 }}
              aria-label="Drag and drop your health report"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-400 shadow-[0_0_34px_rgba(52,211,153,0.16)]">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M12 15V3" />
                  <path d="m7 8 5-5 5 5" />
                  <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                </svg>
              </span>
              <span className="mt-6 text-lg font-medium text-white">
                Drag & drop your blood test, MRI, or prescription
              </span>
              <span className="mt-3 max-w-md text-sm leading-6 text-white/40">
                Vaidy understands Apollo, Thyrocare, Lal Path Labs, and common Indian lab formats.
              </span>
            </motion.button>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
