'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className="pointer-events-auto mx-auto w-full max-w-7xl rounded-2xl border border-warm-white/8 bg-warm-white/[0.03] backdrop-blur-xl"
        aria-label="Primary"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-5 lg:px-7">
          {/* Logo with single static gold dot */}
          <a
            href="#"
            className="flex items-center gap-2.5 font-serif text-lg font-normal tracking-[-0.01em] text-warm-white ease-premium transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
          >
            <span className="h-2 w-2 rounded-full bg-gold-400 opacity-80" aria-hidden="true" />
            Vaidy
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-warm-white/60 ease-premium transition-colors hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/35"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — gold gradient */}
          <div className="hidden md:flex">
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-gold-400/80 via-gold-300/70 to-warm-white/20 px-5 py-2.5 text-sm font-medium text-[#1a1400] ease-premium transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
            >
              Try Vaidy Free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-warm-white/8 bg-warm-white/[0.03] text-warm-white/80 ease-premium transition-colors hover:bg-warm-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/40 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-panel"
          >
            <span className="sr-only">Toggle menu</span>
            <motion.span
              className="relative block h-4 w-4"
              animate={isMenuOpen ? 'open' : 'closed'}
              initial={false}
            >
              <motion.span
                className="absolute left-0 top-1/2 block h-px w-4 bg-current"
                variants={{ closed: { rotate: 0, y: -4 }, open: { rotate: 45, y: 0 } }}
                transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1/2 block h-px w-4 bg-current"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 block h-px w-4 bg-current"
                variants={{ closed: { rotate: 0, y: 4 }, open: { rotate: -45, y: 0 } }}
                transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
              />
            </motion.span>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence initial={false}>
          {isMenuOpen ? (
            <motion.div
              id="mobile-nav-panel"
              className="overflow-hidden border-t border-warm-white/8 md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0, 0, 1] }}
            >
              <ul className="flex flex-col px-4 py-3" role="list">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-warm-white/60 ease-premium transition-colors hover:bg-warm-white/[0.04] hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/35"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="#"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-gold-400/80 via-gold-300/70 to-warm-white/20 px-5 py-2.5 text-sm font-medium text-[#1a1400] ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/40"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Try Vaidy Free
                  </a>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  );
}
