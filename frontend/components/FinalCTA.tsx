"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FinalCTA() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section id="try-vaidy" className="relative overflow-hidden bg-bg-void">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[30rem] w-[30rem] rounded-full bg-emerald-400/15 blur-[150px]" />
      </div>

      <div className="section-shell relative text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Start understanding your health today.
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/60 md:text-lg"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Free to try. No doctor required. Your data stays private.
          </motion.p>

          <motion.a
            href="#how-it-works"
            className="mx-auto mt-10 inline-flex h-14 min-w-[17rem] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 px-8 text-base font-semibold text-[#031411] shadow-[0_0_44px_rgba(52,211,153,0.28)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            whileHover={{ scale: 1.03, boxShadow: "0 0 64px rgba(52,211,153,0.45)" }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isHovering ? "go" : "upload"}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isHovering ? "Let's go →" : "Upload Your First Report →"}
              </motion.span>
            </AnimatePresence>
          </motion.a>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">🔒 Private & Secure</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">🇮🇳 Made for India</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">⚡ Instant Results</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
