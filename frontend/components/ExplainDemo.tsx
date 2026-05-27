"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const sampleText =
  "Your Hemoglobin is 10.2 g/dL - slightly below the normal range of 12-16 g/dL for women. This likely indicates mild iron-deficiency anemia. Your Ferritin (9 ng/mL) confirms this. The good news: this is very treatable.";

const questions = ["What should I eat?", "Is this serious?", "When should I retest?"];

function HighlightedText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(Hemoglobin|Ferritin|anemia)/g).map((part, index) =>
        /Hemoglobin|Ferritin|anemia/.test(part) ? (
          <mark key={`${part}-${index}`} className="rounded bg-emerald-400/15 px-1 text-emerald-400">
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
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || typedCount >= sampleText.length) return;
    const timer = window.setTimeout(() => setTypedCount((count) => count + 1), 18);
    return () => window.clearTimeout(timer);
  }, [typedCount, visible]);

  const visibleText = useMemo(() => sampleText.slice(0, typedCount), [typedCount]);

  return (
    <section id="demo" ref={ref} className="relative overflow-hidden bg-surface px-6 py-[120px]">
      <div className="pointer-events-none absolute -left-[5%] top-1/2 h-[500px] w-[500px] rounded-full bg-emerald-400/[0.07] blur-[130px]" />

      <div className="mx-auto max-w-[1100px]">
        <motion.div
          className="mb-[60px] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-400">
            Step 02
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Ask anything.
            <br />
            <span className="text-white/40">Get answers you'll understand.</span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            className="overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.025]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-1.5 border-b border-white/[0.05] px-[18px] py-3.5">
              {["#00d97e", "#fbbf24", "#f87171"].map((color) => (
                <span key={color} className="h-2.5 w-2.5 rounded-full opacity-60" style={{ backgroundColor: color }} />
              ))}
              <span className="ml-2 text-xs text-white/30">vaidy.ai - Report Analysis</span>
            </div>

            <div className="space-y-4 p-5">
              <div className="ml-auto max-w-[82%] rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm leading-[1.6] text-white/85">
                Why is my hemoglobin low?
              </div>
              <div className="max-w-[82%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-[1.6] text-white/60">
                Looking at your CBC and ferritin levels now.
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-white/60 outline-none placeholder:text-white/30"
                  placeholder="Ask about your report..."
                  readOnly
                />
                <button className="h-9 w-9 rounded-full bg-emerald-400 text-[#03120a]" aria-label="Send question">
                  -&gt;
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-300 text-sm font-bold text-[#03120a]">
                  V
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Vaidy</p>
                  <p className="text-xs text-white/35">AI health copilot</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                Live
              </span>
            </div>

            <div className="min-h-[14rem] text-base leading-8 text-white/75">
              <HighlightedText text={visibleText} />
              <motion.span
                className="ml-1 inline-block h-5 w-px translate-y-1 bg-teal-300"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {questions.map((question) => (
                <span key={question} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/50">
                  {question}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
