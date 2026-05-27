'use client';

import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Works with Indian Labs',
    description:
      'Reads reports from Apollo, Thyrocare, Lal Path Labs, SRL, and more — no manual entry needed.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Trend Detection',
    description:
      "Spots patterns across multiple reports — not just a single snapshot. Flags what's changing before it becomes a problem.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Hindi + English',
    description:
      'Get plain-language explanations in Hindi or English. No medical jargon — just clear, honest context.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Private by Default',
    description:
      'Your reports are encrypted end-to-end. Vaidy never shares your data with third parties.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Longitudinal Memory',
    description:
      "Vaidy remembers every report you've ever uploaded and builds a personal health baseline over time.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Doctor-Ready Summaries',
    description:
      'Generate a concise summary of your health history to share with your doctor before any appointment.',
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="vaidy-section">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          className="mb-12 max-w-2xl"
        >
          <p className="vaidy-pill">Features</p>
          <h2 className="font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-warm-white md:text-6xl mt-6">
            Everything your health data deserves.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-warm-white/50 sm:text-lg">
            Built specifically for the Indian healthcare ecosystem — from lab formats to language.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: PREMIUM_EASE }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-warm-white/6 bg-warm-white/[0.022] p-5 ease-premium transition-colors hover:border-warm-white/10 hover:bg-warm-white/[0.04]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-warm-white/10 bg-warm-white/[0.04] text-warm-white/60">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-sm font-medium text-warm-white sm:text-base">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-warm-white/50 sm:text-sm">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
