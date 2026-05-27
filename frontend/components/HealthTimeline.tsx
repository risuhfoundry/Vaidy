"use client";

import { motion } from "framer-motion";

const entries = [
  {
    date: "Jan 2024",
    type: "CBC Report",
    finding: "Hemoglobin low",
    dot: "bg-red-400",
  },
  {
    date: "Mar 2024",
    type: "Lipid Panel",
    finding: "LDL borderline",
    dot: "bg-yellow-300",
  },
  {
    date: "May 2024",
    type: "Thyroid",
    finding: "TSH normal",
    dot: "bg-emerald-400",
  },
  {
    date: "Jul 2024",
    type: "Follow-up",
    finding: "Hemoglobin improving",
    dot: "bg-emerald-400",
  },
];

export default function HealthTimeline() {
  return (
    <section id="timeline" className="relative bg-bg-void">
      <div className="section-shell">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
            Your health. Remembered.
          </h2>
        </motion.div>

        <div className="relative mt-14">
          <svg
            className="pointer-events-none absolute left-0 top-8 hidden h-16 w-full md:block"
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M20 40 C 240 40, 260 40, 380 40 S 560 40, 690 40 S 840 40, 980 40"
              fill="none"
              stroke="rgba(52,211,153,0.32)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          <div className="md:fade-mask-x -mx-6 overflow-x-auto px-6 pb-3 md:mx-0 md:px-0">
            <ol className="relative grid min-w-[760px] grid-cols-4 gap-4 md:min-w-0">
              {entries.map((entry, index) => (
                <motion.li
                  key={`${entry.date}-${entry.type}`}
                  className="relative pt-16"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.1 }}
                >
                  <span
                    className={`absolute left-4 top-6 z-10 h-4 w-4 rounded-full ${entry.dot} shadow-[0_0_24px_rgba(52,211,153,0.38)]`}
                    aria-hidden="true"
                  />
                  <article className="glass-card min-h-[160px] p-5">
                    <p className="text-sm text-white/40">{entry.date}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{entry.type}</h3>
                    <p className="mt-3 text-sm text-white/60">{entry.finding}</p>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
