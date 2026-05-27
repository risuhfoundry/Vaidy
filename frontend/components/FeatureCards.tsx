"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
      {children}
    </span>
  );
}

const iconClass = "h-5 w-5";

const features = [
  {
    title: "Reads Any Report",
    description: "Blood tests, MRIs, prescriptions — in English or Hindi",
    icon: (
      <Icon>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5" />
          <path d="M8.5 13h7M8.5 17h5" />
        </svg>
      </Icon>
    ),
  },
  {
    title: "Remembers Everything",
    description: "Builds your personal health timeline automatically",
    icon: (
      <Icon>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 4a5 5 0 0 0-5 5v1H6a3 3 0 0 0 0 6h1v1a3 3 0 0 0 6 0V9a5 5 0 0 0-1-5Z" />
          <path d="M12 4a5 5 0 0 1 5 5v1h1a3 3 0 0 1 0 6h-1v1a3 3 0 0 1-6 0" />
        </svg>
      </Icon>
    ),
  },
  {
    title: "Plain Language Always",
    description: "No jargon. Explanations a 12-year-old can follow",
    icon: (
      <Icon>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 5h16v10H8l-4 4V5Z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      </Icon>
    ),
  },
  {
    title: "Trend Detection",
    description: "Spots patterns across reports over time",
    icon: (
      <Icon>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M4 18h16" />
          <path d="m5 15 4-4 4 2 6-7" />
          <path d="M18 6h1v1" />
        </svg>
      </Icon>
    ),
  },
  {
    title: "Ask Anything",
    description: "Chat with your health history like a conversation",
    icon: (
      <Icon>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
          <path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
        </svg>
      </Icon>
    ),
  },
  {
    title: "India-First",
    description: "Understands Indian lab formats, ranges, and context",
    icon: (
      <Icon>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </Icon>
    ),
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="relative bg-bg-void">
      <div className="section-shell">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
            Everything your doctor wishes you had.
          </h2>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              className="glass-card min-h-[220px] p-6 transition-colors hover:border-emerald-400/35 hover:bg-white/[0.07] hover:shadow-[0_0_36px_rgba(52,211,153,0.14)]"
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
