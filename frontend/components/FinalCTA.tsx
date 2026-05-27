"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useWaitlist } from "@/components/WaitlistProvider";

const badges = ["Private & Secure", "Made for India", "Instant Results"];

export default function FinalCTA() {
  const { openWaitlist } = useWaitlist();
  const [hover, setHover] = useState(false);

  return (
    <section id="try-vaidy" className="relative overflow-hidden bg-bg-void px-6 py-[140px]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,217,126,0.1)_0%,transparent_70%)] blur-[40px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[700px] text-center">
        <motion.h2
          className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Start understanding
          <br />
          your health today.
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-[500px] text-base leading-[1.7] text-white/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Free to try. No doctor required. Your data stays private.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.button
            type="button"
            onClick={openWaitlist}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            className="inline-flex items-center gap-2.5 rounded-[36px] bg-gradient-to-br from-emerald-400 to-teal-300 px-9 py-4 text-base font-bold text-[#03120a] shadow-[0_0_40px_rgba(0,217,126,0.35)]"
            whileHover={{ scale: 1.04, boxShadow: "0 0 64px rgba(0,217,126,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={hover ? "go" : "upload"}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {hover ? "Let's go ->" : "Upload Your First Report ->"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-white/50"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
