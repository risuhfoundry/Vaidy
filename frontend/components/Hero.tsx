"use client";

import { motion } from "framer-motion";
import GlowOrbs from "@/components/GlowOrbs";
import ParticleField from "@/components/ParticleField";

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg-void px-6 py-24 md:px-8"
    >
      <GlowOrbs />
      <ParticleField count={25} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(52,211,153,0.12),transparent_38%)]" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h1
          className="text-display-lg font-semibold leading-[0.96] tracking-display text-white"
          initial={{ y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Your AI Health Copilot
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Built for India.
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/60 md:text-xl md:leading-9"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Not a chatbot. A health brain that reads your reports, remembers your history,
          and explains everything in plain language.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-[#031411] shadow-[0_0_42px_rgba(52,211,153,0.3)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
            whileHover={{ y: -2, scale: 1.02, boxShadow: "0 0 56px rgba(52,211,153,0.46)" }}
            whileTap={{ scale: 0.98 }}
          >
            Upload a Report
          </motion.a>

          <motion.a
            href="#how-it-works"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-medium text-white/85 backdrop-blur-md outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/30"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See How it Works
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#how-it-works"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white/70"
        aria-label="Scroll to report upload preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <motion.svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
