'use client';

import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;

const reportBadges = ['CBC Report', 'Lipid Panel', 'Thyroid Panel', 'HbA1c', 'Vitamin D'];

const flowSteps = [
  {
    title: 'PDF Report',
    detail: 'Lab files from Apollo, Thyrocare, Lal Path Labs, SRL, and more',
  },
  {
    title: 'OCR Extraction',
    detail: 'Text and biomarkers captured with clinical context',
  },
  {
    title: 'AI Analysis',
    detail: 'Trend mapping, risk hints, and doctor-ready summaries',
  },
  {
    title: 'Health Memory',
    detail: 'Your longitudinal timeline updates instantly',
  },
];

const progressValue = 84;

export default function UploadPreview() {
  return (
    <section id="how-it-works" className="vaidy-section">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="vaidy-shell"
        >
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left column */}
            <div className="min-w-0">
              <p className="vaidy-pill">Upload Intelligence</p>

              <h2 className="font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-warm-white md:text-6xl mt-6">
                Drop any lab report. Vaidy does the rest.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-warm-white/50 sm:text-lg">
                Drag in a CBC, Lipid Panel, or Thyroid report and Vaidy extracts every biomarker,
                maps trends, and appends them to your ongoing health timeline.
              </p>

              {/* Upload card */}
              <div className="mt-8 glass-card p-5">
                {/* Drop zone — no shimmer */}
                <div className="rounded-2xl border border-dashed border-warm-white/15">
                  <button
                    type="button"
                    className="group block w-full rounded-2xl bg-warm-white/[0.02] p-6 text-left ease-premium transition-colors hover:border-gold-400/30 hover:bg-warm-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/40"
                    aria-label="Upload PDF report"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      {/* Gold file-upload icon */}
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-gold-400"
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-warm-white sm:text-base">
                          Drop your lab report here
                        </p>
                        <p className="mt-1 text-xs text-warm-white/40 sm:text-sm">
                          PDF only · up to 15 MB · encrypted and private by default
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-5 rounded-2xl border border-warm-white/6 bg-warm-white/[0.02] p-4">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="text-xs text-warm-white/60 sm:text-sm">Upload in progress</p>
                    <p className="text-xs font-medium text-gold-400/85 sm:text-sm">
                      {progressValue}%
                    </p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-warm-white/8">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${progressValue}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: PREMIUM_EASE, delay: 0.12 }}
                      className="h-full rounded-full bg-gradient-to-r from-gold-400/80 to-warm-white/40"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-warm-white/30 sm:text-xs">
                    Parsing pages and normalising biomarker ranges…
                  </p>
                </div>

                {/* Gold report-type badges */}
                <div className="mt-5">
                  <p className="mb-2 text-[11px] tracking-wide text-warm-white/40 uppercase">
                    Supported report types
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {reportBadges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-gold-400/20 bg-gold-400/10 px-3 py-1 text-xs text-gold-400"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — pipeline */}
            <div className="min-w-0">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
                className="glass-card p-5"
              >
                <p className="mb-4 text-xs tracking-[0.18em] text-warm-white/40 uppercase">
                  Intelligence pipeline
                </p>
                <div className="space-y-3">
                  {flowSteps.map((step, index) => (
                    <motion.article
                      key={step.title}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                      className="relative"
                    >
                      <div className="rounded-2xl border border-warm-white/8 bg-warm-white/[0.02] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-sm font-medium text-warm-white sm:text-base">
                            {step.title}
                          </h3>
                          <span className="rounded-full border border-warm-white/10 bg-warm-white/[0.03] px-2 py-0.5 text-[10px] text-warm-white/40">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-warm-white/50 sm:text-sm">
                          {step.detail}
                        </p>
                      </div>

                      {index < flowSteps.length - 1 && (
                        <div className="flex justify-center py-1.5">
                          <span
                            className="h-4 w-px bg-gradient-to-b from-warm-white/20 to-transparent"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
