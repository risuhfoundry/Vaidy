"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const sampleText =
  "Your Hemoglobin is 10.2 g/dL — slightly below the normal range of 12–16 g/dL for women. This may indicate mild anemia. Common causes include low iron intake or...";

const reportLines = [
  { label: "Hemoglobin", value: "10.2 g/dL", muted: false },
  { label: "RBC Count", value: "3.9 M/uL", muted: true },
  { label: "MCV", value: "73 fL", muted: true },
  { label: "Ferritin", value: "9 ng/mL", muted: true },
];

function HighlightedText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(Hemoglobin|anemia)/g).map((part, index) =>
        /Hemoglobin|anemia/.test(part) ? (
          <mark
            key={`${part}-${index}`}
            className="rounded bg-emerald-400/10 px-0.5 text-emerald-400"
          >
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

export default function ExplainDemo() {
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTypedCount((count) => {
        if (count >= sampleText.length) {
          window.clearInterval(timer);
          return count;
        }

        return count + 1;
      });
    }, 24);

    return () => window.clearInterval(timer);
  }, []);

  const visibleText = useMemo(() => sampleText.slice(0, typedCount), [typedCount]);

  return (
    <section id="demo" className="relative bg-bg-void">
      <div className="section-shell">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.div
            className="glass-card overflow-hidden p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-xl border border-white/10 bg-surface/80 p-4 blur-[0.35px]">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Apollo Diagnostics</p>
                  <p className="mt-1 text-xs text-white/40">Complete Blood Count · Jan 2024</p>
                </div>
                <span className="rounded-full bg-red-400/10 px-3 py-1 text-xs text-red-200">
                  PDF
                </span>
              </div>

              <div className="space-y-3">
                {reportLines.map((line) => (
                  <div
                    key={line.label}
                    className="grid grid-cols-2 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <span className={line.muted ? "text-white/35" : "font-medium text-emerald-400"}>
                      {line.label}
                    </span>
                    <span className={line.muted ? "text-right text-white/35" : "text-right text-white"}>
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-2 w-11/12 rounded-full bg-white/10" />
                <div className="h-2 w-9/12 rounded-full bg-white/10" />
                <div className="h-2 w-10/12 rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-5 md:p-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
                Explain my report
              </p>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                AI response
              </span>
            </div>

            <div className="min-h-[14rem] rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-base leading-8 text-white/75 md:text-lg md:leading-9">
              <HighlightedText text={visibleText} />
              <motion.span
                className="ml-1 inline-block h-5 w-px translate-y-1 bg-teal-300"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </div>

            <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/40">
              Based on your Apollo report · Jan 2024
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
