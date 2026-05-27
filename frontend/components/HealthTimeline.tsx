"use client";

import { motion } from "framer-motion";

const entries = [
  {
    date: "Jan 2024",
    label: "CBC Report",
    summary: "Hemoglobin low, ferritin depleted",
    color: "#f87171",
    status: "needs attention",
  },
  {
    date: "Mar 2024",
    label: "Lipid Panel",
    summary: "LDL borderline, HDL healthy",
    color: "#fbbf24",
    status: "monitor",
  },
  {
    date: "May 2024",
    label: "Thyroid Panel",
    summary: "TSH and T4 inside range",
    color: "#00d97e",
    status: "normal",
  },
  {
    date: "Jul 2024",
    label: "Follow-up CBC",
    summary: "Hemoglobin improved after iron",
    color: "#00d97e",
    status: "improving",
  },
];

export default function HealthTimeline() {
  return (
    <section id="timeline" className="relative overflow-hidden bg-bg-void px-6 py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          className="mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-400">
            Step 03
          </p>
          <h2 className="max-w-[600px] text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Your health,
            <br />
            <span className="text-white/40">always remembered.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 right-6 top-[30px] hidden h-px bg-white/[0.06] md:block" />

          <div className="grid gap-5 overflow-x-auto pb-3 md:grid-cols-4 md:overflow-visible md:pb-0">
            {entries.map((entry, index) => (
              <motion.article
                key={entry.date}
                className="relative min-w-[220px] pt-[60px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <span
                  className="absolute left-5 top-[22px] h-4 w-4 rounded-full border-2 border-bg-void"
                  style={{
                    backgroundColor: entry.color,
                    boxShadow: `0 0 16px ${entry.color}80`,
                  }}
                  aria-hidden="true"
                />

                <motion.div
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-[18px]"
                  whileHover={{ y: -5, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                >
                  <p className="mb-2 text-[11px] tracking-[0.05em] text-white/30">{entry.date}</p>
                  <h3 className="mb-2 text-sm font-semibold text-white">{entry.label}</h3>
                  <p className="text-xs leading-[1.5] text-white/50">{entry.summary}</p>
                  <div
                    className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px]"
                    style={{
                      borderColor: `${entry.color}30`,
                      backgroundColor: `${entry.color}15`,
                      color: entry.color,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    {entry.status}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-10 flex items-center gap-3.5 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] px-6 py-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/10 text-emerald-400">
            <span aria-hidden="true">+</span>
          </div>
          <div>
            <p className="m-0 text-sm font-semibold text-white">Vaidy spotted a trend</p>
            <p className="mt-1 text-[13px] leading-[1.5] text-white/50">
              Your hemoglobin improved by 18% after iron supplementation. Your body is responding well.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
