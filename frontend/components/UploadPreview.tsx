"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const badges = ["CBC Report ✓", "Lipid Panel ✓", "Thyroid ✓"];
const biomarkers = [
  { label: "Hemoglobin", value: "10.2 g/dL", status: "low", flag: "↓" },
  { label: "WBC Count", value: "7,800 /uL", status: "normal" },
  { label: "Platelets", value: "2.4 L/uL", status: "normal" },
  { label: "Ferritin", value: "9 ng/mL", status: "low", flag: "↓" },
];

export default function UploadPreview() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-bg-void px-6 py-[120px]">
      <div className="pointer-events-none absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-teal-300/[0.07] blur-[120px]" />

      <div className="mx-auto max-w-[1100px]">
        <motion.div
          className="mb-[60px] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-400">
            Step 01
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Drop your report.
            <br />
            <span className="text-white/40">Vaidy reads it in seconds.</span>
          </h2>
        </motion.div>

        <div className="grid items-center gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              type="button"
              onHoverStart={() => setDragging(true)}
              onHoverEnd={() => setDragging(false)}
              onClick={() => setUploaded((value) => !value)}
              className={`w-full rounded-[20px] border border-dashed p-10 text-center backdrop-blur-xl transition-colors ${
                dragging ? "border-emerald-400 bg-emerald-400/[0.04]" : "border-white/10 bg-white/[0.025]"
              }`}
              whileHover={{ scale: 1.01 }}
            >
              <AnimatePresence mode="wait">
                {!uploaded ? (
                  <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                    </div>
                    <p className="mb-2 text-base font-semibold text-white">
                      Drag & drop your blood test, MRI, or prescription
                    </p>
                    <p className="text-[13px] leading-[1.6] text-white/40">
                      PDF, JPG, PNG - Apollo, Thyrocare, Lal Path Labs & more
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {badges.map((badge) => (
                        <span key={badge} className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-400/10 text-emerald-400">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-base font-semibold text-white">CBC_Report_Apollo_Jan2024.pdf</p>
                    <p className="mt-1.5 text-[13px] text-emerald-400">Analyzing 24 biomarkers...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03]"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">Apollo Diagnostics</p>
                <p className="mt-0.5 text-xs text-white/35">Complete Blood Count - Jan 2024</p>
              </div>
              <span className="rounded-lg border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-[11px] font-semibold text-red-300">
                PDF
              </span>
            </div>
            <div className="p-5">
              {biomarkers.map((row, index) => (
                <div
                  key={row.label}
                  className={`mb-1 flex items-center justify-between rounded-[10px] px-3 py-2.5 ${
                    index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                  }`}
                >
                  <span className="text-[13px] text-white/60">{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[13px] font-semibold ${row.status === "low" ? "text-red-300" : "text-white"}`}>
                      {row.value}
                    </span>
                    <span className={`text-[11px] ${row.status === "low" ? "text-red-300" : "text-emerald-400"}`}>
                      {row.flag || "✓"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
