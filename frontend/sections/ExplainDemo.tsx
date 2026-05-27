'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;

type Language = 'EN' | 'HI';

const reportRows = [
  { marker: 'Hemoglobin', value: '10.8 g/dL', range: '12.0 – 15.0', status: 'low' },
  { marker: 'RBC Count', value: '3.94 M/uL', range: '4.2 – 5.4', status: 'low' },
  { marker: 'MCV', value: '72 fL', range: '80 – 100', status: 'low' },
  { marker: 'Serum Ferritin', value: '8 ng/mL', range: '12 – 150', status: 'low' },
  { marker: 'HbA1c', value: '5.4 %', range: '< 5.7', status: 'normal' },
];

const anomalyChips = [
  { label: 'Hemoglobin drop (3 months)', severity: 'high' },
  { label: 'Iron-deficiency pattern', severity: 'high' },
  { label: 'RBC below baseline', severity: 'medium' },
] as const;

const explanations: Record<Language, string> = {
  HI: 'Teri hemoglobin 3 mahine se gir rahi hai — 12.4 se 10.8 tak. Ferritin bhi bahut kam hai, jo iron-deficiency anemia ka sign hai. Ye pattern normal nahi hai, doctor se milna chahiye.',
  EN: 'Your hemoglobin has dropped from 12.4 to 10.8 g/dL over 3 months. Combined with low ferritin (8 ng/mL), this pattern is consistent with iron-deficiency anemia and should be reviewed by a doctor.',
};

export default function ExplainDemo() {
  const [language, setLanguage] = useState<Language>('HI');
  const [typedCount, setTypedCount] = useState(0);

  const activeText = explanations[language];

  const visibleText = useMemo(
    () => activeText.slice(0, typedCount),
    [activeText, typedCount],
  );

  useEffect(() => {
    setTypedCount(0);
    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        if (prev >= activeText.length) {
          window.clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 22);
    return () => window.clearInterval(timer);
  }, [activeText]);

  return (
    <section id="demo" className="vaidy-section">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="vaidy-shell"
        >
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left — report preview */}
            <div className="min-w-0">
              <p className="vaidy-pill">Explain My Report</p>
              <h2 className="font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-warm-white md:text-6xl mt-6">
                Instant clinical context in your language.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-warm-white/50 sm:text-lg">
                Vaidy highlights important biomarker shifts and explains what changed in simple,
                human terms — in Hindi or English.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: 0.1 }}
                className="mt-8 glass-card p-5"
              >
                {/* Blurred PDF thumbnail + source row */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-lg border border-warm-white/12 bg-warm-white/[0.04]">
                    <div className="absolute inset-0 flex flex-col justify-center gap-1 p-1.5 blur-[1.5px]">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="h-px rounded-full bg-warm-white/40"
                          style={{ width: `${55 + (i % 3) * 15}%` }}
                        />
                      ))}
                    </div>
                    <div className="absolute bottom-0.5 right-0.5 text-[7px] font-bold text-gold-400/85">
                      PDF
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-warm-white/85">
                      Apollo_CBC_Jan2024.pdf
                    </p>
                    <p className="text-[11px] text-warm-white/30">
                      Complete Blood Count · Jan 2024
                    </p>
                  </div>
                  <span className="ml-auto rounded-full border border-warm-white/10 bg-warm-white/[0.03] px-2.5 py-1 text-[10px] text-warm-white/50">
                    CBC · 3 months
                  </span>
                </div>

                {/* Report table */}
                <div className="overflow-hidden rounded-2xl border border-warm-white/8 bg-warm-white/[0.02]">
                  <div className="grid grid-cols-3 gap-2 border-b border-warm-white/8 px-4 py-2 text-[11px] tracking-wide text-warm-white/40 uppercase">
                    <span>Biomarker</span>
                    <span>Value</span>
                    <span>Range</span>
                  </div>

                  <div className="divide-y divide-warm-white/6">
                    {reportRows.map((row) => {
                      const tone =
                        row.status === 'low'
                          ? 'border-l-emerald-400/70 bg-emerald-400/[0.05]'
                          : 'border-l-transparent';

                      return (
                        <div
                          key={row.marker}
                          className={`grid grid-cols-3 gap-2 border-l-2 px-4 py-3 text-xs sm:text-sm ${tone}`}
                        >
                          <span
                            className={
                              row.marker === 'Hemoglobin'
                                ? 'truncate font-medium text-emerald-400'
                                : 'truncate text-warm-white/85'
                            }
                          >
                            {row.marker}
                          </span>
                          <span className="truncate text-warm-white/75">{row.value}</span>
                          <span className="truncate text-warm-white/40">{row.range}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — AI explanation */}
            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: PREMIUM_EASE, delay: 0.1 }}
                className="glass-card p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs tracking-[0.18em] text-warm-white/40 uppercase">
                    AI explanation
                  </p>
                  {/* Language toggle */}
                  <div className="inline-flex rounded-full border border-warm-white/10 bg-warm-white/[0.03] p-1">
                    {(['EN', 'HI'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setLanguage(lang)}
                        className={`rounded-full px-3 py-1 text-[11px] font-medium ease-premium transition-colors ${
                          language === lang
                            ? 'bg-gold-400/85 text-[#1a1400]'
                            : 'text-warm-white/60 hover:text-warm-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typed explanation */}
                <div className="rounded-2xl border border-warm-white/8 bg-warm-white/[0.02] p-4">
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm leading-relaxed text-warm-white/90 sm:text-base">
                    <span>
                      {visibleText
                        .split(/(Hemoglobin|hemoglobin|anemia|Anemia)/g)
                        .map((part, i) =>
                          /hemoglobin|anemia/i.test(part) ? (
                            <mark
                              key={i}
                              className="rounded bg-emerald-400/15 px-0.5 text-emerald-400 not-italic"
                            >
                              {part}
                            </mark>
                          ) : (
                            <span key={i}>{part}</span>
                          ),
                        )}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="ml-0.5 inline-block h-4 w-[2px] bg-gold-400/85 align-middle"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Source badge */}
                  <p className="mt-3 text-[11px] text-warm-white/30">
                    Based on your Apollo report · Jan 2024
                  </p>

                  {/* Anomaly chips */}
                  <div className="mt-4">
                    <p className="mb-2 text-[11px] tracking-wide text-warm-white/40 uppercase">
                      Anomaly indicators
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {anomalyChips.map((chip) => {
                        const tone =
                          chip.severity === 'high'
                            ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
                            : 'border-warm-white/10 bg-warm-white/[0.04] text-warm-white/75';
                        return (
                          <span
                            key={chip.label}
                            className={`rounded-full border px-3 py-1 text-xs ${tone}`}
                          >
                            {chip.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
