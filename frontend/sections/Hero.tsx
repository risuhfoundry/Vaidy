'use client';

import { motion } from 'framer-motion';
import ParticleField from '@/components/ParticleField';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-transparent text-warm-white flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Single soft caustic glow from above — replaces all coloured orbs */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 h-[400px] w-[800px]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Sparse, large, warm-white particles */}
      <ParticleField count={8} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.p
          className="vaidy-pill mx-auto mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: PREMIUM_EASE }}
        >
          AI Health Copilot
        </motion.p>

        {/* Headline — Instrument Serif, italic accent */}
        <motion.h1
          className="font-serif text-[3.5rem] font-normal leading-[0.96] tracking-[-0.02em] text-warm-white sm:text-7xl lg:text-[6rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.65, ease: PREMIUM_EASE }}
        >
          Your AI Health Copilot
          <br />
          <span className="font-serif italic bg-gradient-to-r from-gold-400 to-warm-white/80 bg-clip-text text-transparent">
            Built for India.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-warm-white/50 sm:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: PREMIUM_EASE }}
        >
          Upload reports from Apollo, Thyrocare, or Lal Path Labs. Vaidy reads every biomarker,
          tracks trends over time, and explains what changed — in Hindi or English.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6, ease: PREMIUM_EASE }}
        >
          {/* Primary — warm-white pill */}
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="inline-flex items-center gap-2 rounded-xl bg-warm-white px-7 py-3.5 text-sm font-medium text-[#080808] shadow-[0_0_32px_rgba(245,240,232,0.12)] ease-premium hover:shadow-[0_0_48px_rgba(245,240,232,0.2)]"
          >
            Upload Your Report
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>

          {/* Secondary — restrained ghost */}
          <motion.a
            href="#demo"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="inline-flex items-center gap-2 rounded-xl border border-warm-white/10 bg-warm-white/[0.04] px-7 py-3.5 text-sm font-medium text-warm-white/70 ease-premium transition-colors hover:border-warm-white/18 hover:bg-warm-white/[0.06]"
          >
            See Live Demo
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="mt-7 text-xs text-warm-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: PREMIUM_EASE }}
        >
          Works with Apollo, Thyrocare, Lal Path Labs, SRL, and more
        </motion.p>
      </div>

      {/* Scroll chevron */}
      <motion.a
        href="#features"
        aria-label="Scroll to features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-warm-white/30 ease-premium transition-colors hover:text-warm-white/60"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5, ease: PREMIUM_EASE }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
