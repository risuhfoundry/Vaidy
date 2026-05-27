"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📄",
    title: "Reads Any Format",
    description: "Blood tests, MRIs, prescriptions, echoes - PDF or image, English or Hindi.",
    accent: "#00d97e",
  },
  {
    icon: "🧠",
    title: "Health Memory",
    description: "Builds a complete, searchable record of your health across all time.",
    accent: "#00c4b8",
  },
  {
    icon: "💬",
    title: "Plain Language",
    description: "No jargon. Explanations even a 12-year-old can follow.",
    accent: "#a78bfa",
  },
  {
    icon: "📈",
    title: "Trend Detection",
    description: "Identifies patterns across reports over months and years.",
    accent: "#fbbf24",
  },
  {
    icon: "🔍",
    title: "Ask Anything",
    description: "Chat naturally with your entire health history.",
    accent: "#f87171",
  },
  {
    icon: "🇮🇳",
    title: "India-First",
    description: "Built for Indian lab formats, ranges, diets, and context.",
    accent: "#fb923c",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="bg-surface px-6 py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          className="mb-[60px] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            Everything your doctor
            <br />
            <span className="text-white/40">wishes you had.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="rounded-[20px] border border-white/[0.07] bg-white/[0.025] px-6 py-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -5, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}
            >
              <div className="mb-4 text-[28px]" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="mb-2.5 text-base font-bold text-white">{feature.title}</h3>
              <p className="text-[13.5px] leading-[1.6] text-white/50">{feature.description}</p>
              <div
                className="mt-5 h-0.5 w-8 rounded-sm opacity-70"
                style={{ backgroundColor: feature.accent }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
