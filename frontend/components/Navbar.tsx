"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg-void/55 px-4 py-3 backdrop-blur-2xl md:px-6">
      <nav className="mx-auto flex h-12 max-w-7xl items-center justify-between" aria-label="Primary navigation">
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 text-base font-semibold tracking-[-0.02em] text-white outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          </span>
          Vaidy
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              {link.label}
            </a>
          ))}
        </div>

        <motion.a
          href="#try-vaidy"
          className="relative hidden rounded-full p-px md:inline-flex"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/80 via-teal-300/70 to-indigo-400/70 opacity-80 blur-[1px] transition-opacity hover:opacity-100" />
          <span className="relative rounded-full bg-bg-void px-5 py-2 text-sm font-medium text-white shadow-[0_0_32px_rgba(52,211,153,0.18)] transition-shadow hover:shadow-[0_0_42px_rgba(52,211,153,0.28)]">
            Try Vaidy
          </span>
        </motion.a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((value) => !value)}
        >
          <motion.span className="relative h-4 w-4" animate={isOpen ? "open" : "closed"} initial={false}>
            <motion.span
              className="absolute left-0 top-1/2 h-px w-4 bg-current"
              variants={{ closed: { rotate: 0, y: -5 }, open: { rotate: 45, y: 0 } }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-px w-4 bg-current"
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-px w-4 bg-current"
              variants={{ closed: { rotate: 0, y: 5 }, open: { rotate: -45, y: 0 } }}
            />
          </motion.span>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-nav"
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="flex flex-col p-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#try-vaidy"
                className="mt-1 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-center text-sm font-medium text-emerald-400"
                onClick={() => setIsOpen(false)}
              >
                Try Vaidy
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
