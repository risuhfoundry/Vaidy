'use client';

import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;

const trustBadges = ['Private & Secure', 'Made for India', 'Instant Results'];

export default function FinalCTA() {
  return (
    <section className="vaidy-section">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="vaidy-shell relative overflow-hidden text-center"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.3), 0 0 44px rgba(200,169,110,0.22), 0 24px 48px rgba(0,0,0,0.35)',
          }}
        >
          {/* Subtle gold ambient glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[500px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.08) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 px-2 py-6 sm:px-6 sm:py-10">
            <p className="vaidy-pill mx-auto mb-6">Start for free</p>

            <h2 className="mx-auto max-w-2xl font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-warm-white md:text-6xl">
              Take control of your health data — starting today.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-warm-white/50 sm:text-lg">
              Upload your first report in under 60 seconds. No credit card required. Works with
              Apollo, Thyrocare, Lal Path Labs, and more.
            </p>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {/* Gold gradient primary CTA */}
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-gold-300 px-7 py-3.5 text-sm font-medium text-[#1a1400] ease-premium transition-shadow hover:shadow-[0_0_48px_rgba(200,169,110,0.32)]"
              >
                Upload Your First Report
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

              <motion.a
                href="#demo"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                className="inline-flex items-center gap-2 rounded-xl border border-warm-white/10 bg-warm-white/[0.04] px-7 py-3.5 text-sm font-medium text-warm-white/70 ease-premium transition-colors hover:border-warm-white/18 hover:bg-warm-white/[0.06]"
              >
                Watch Demo
              </motion.a>
            </div>

            {/* Trust badges — no emoji */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-warm-white/8 bg-warm-white/[0.03] px-3 py-1 text-xs text-warm-white/50"
                >
                  {badge}
                </span>
              ))}
            </div>

            <p className="mt-6 text-xs text-warm-white/30">
              Trusted by users across India · Apollo · Thyrocare · Lal Path Labs · SRL
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
