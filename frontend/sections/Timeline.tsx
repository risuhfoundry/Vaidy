'use client';

import { motion } from 'framer-motion';

const PREMIUM_EASE = [0.25, 0, 0, 1] as const;

interface TimelineEvent {
  date: string;
  lab: string;
  title: string;
  summary: string;
  tags: string[];
  /** Semantic health-status colour — kept by design intent */
  dotColor: string;
}

const events: TimelineEvent[] = [
  {
    date: 'Jan 2024',
    lab: 'Apollo Diagnostics',
    title: 'CBC — Hemoglobin low',
    summary:
      'Hemoglobin dropped to 10.8 g/dL. Ferritin at 8 ng/mL confirms iron-deficiency anemia. Doctor advised iron supplementation.',
    tags: ['Hemoglobin ↓', 'Ferritin ↓', 'Anemia'],
    dotColor: 'bg-red-400',
  },
  {
    date: 'Oct 2023',
    lab: 'Thyrocare',
    title: 'Thyroid Panel — TSH elevated',
    summary:
      'TSH at 6.2 mIU/L (normal < 4.5). T3 and T4 within range. Subclinical hypothyroidism flagged for monitoring.',
    tags: ['TSH ↑', 'Subclinical hypothyroid'],
    dotColor: 'bg-yellow-400',
  },
  {
    date: 'Jul 2023',
    lab: 'Lal Path Labs',
    title: 'Lipid Panel — LDL borderline',
    summary:
      'LDL at 138 mg/dL (borderline high). HDL healthy at 52 mg/dL. Triglycerides normal. Lifestyle changes recommended.',
    tags: ['LDL borderline', 'HDL normal'],
    dotColor: 'bg-yellow-400',
  },
  {
    date: 'Mar 2023',
    lab: 'SRL Diagnostics',
    title: 'HbA1c — Pre-diabetic range',
    summary:
      'HbA1c at 5.9% — in the pre-diabetic range (5.7–6.4%). Fasting glucose 108 mg/dL. Diet and exercise plan initiated.',
    tags: ['HbA1c 5.9%', 'Pre-diabetic'],
    dotColor: 'bg-yellow-400',
  },
  {
    date: 'Nov 2022',
    lab: 'Apollo Diagnostics',
    title: 'Annual checkup — Baseline set',
    summary:
      'All markers within normal range. Hemoglobin 12.4 g/dL, HbA1c 5.2%, LDL 118 mg/dL. Personal baseline established.',
    tags: ['All normal', 'Baseline'],
    dotColor: 'bg-emerald-400',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="vaidy-section">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          className="vaidy-shell"
        >
          <div className="max-w-2xl">
            <p className="vaidy-pill">Health Timeline</p>
            <h2 className="font-serif text-4xl font-normal leading-[1.05] tracking-[-0.02em] text-warm-white md:text-6xl mt-6">
              Every report. Every trend. One timeline.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-warm-white/50 sm:text-lg">
              Vaidy builds a longitudinal record from your Apollo, Thyrocare, and Lal Path Labs
              reports — so you can see exactly how your health has changed over time.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-10 relative">
            {/* Vertical connecting line — subtle warm-white */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-px sm:left-[15px]"
              style={{ background: 'rgba(245,240,232,0.15)' }}
              aria-hidden="true"
            />

            <ol className="space-y-6" aria-label="Health history timeline">
              {events.map((event, index) => (
                <motion.li
                  key={event.date + event.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: index * 0.08 }}
                  className="relative flex gap-5 sm:gap-7"
                >
                  {/* Semantic status dot */}
                  <div className="relative z-10 mt-1 flex-shrink-0">
                    <span
                      className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full ${event.dotColor}`}
                      aria-hidden="true"
                    >
                      <span className="h-2 w-2 rounded-full bg-warm-white/80" />
                    </span>
                  </div>

                  {/* Card */}
                  <article className="glass-card flex-1 min-w-0 p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-warm-white/30">
                          {event.date} · {event.lab}
                        </p>
                        <h3 className="mt-0.5 text-sm font-medium text-warm-white sm:text-base">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-warm-white/50 sm:text-sm">
                      {event.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-warm-white/8 bg-warm-white/[0.03] px-2.5 py-0.5 text-[11px] text-warm-white/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
