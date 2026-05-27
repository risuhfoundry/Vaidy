'use client';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Demo', href: '#demo' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Supported labs', href: '#' },
      { label: 'Help centre', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-warm-white/6 bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gold-400 opacity-80" aria-hidden="true" />
              <span className="font-serif text-lg text-warm-white">Vaidy</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-white/40">
              Your AI health copilot — built for India. Reads every report, explains every change.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] tracking-[0.18em] text-warm-white/40 uppercase">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-warm-white/60 ease-premium transition-colors hover:text-warm-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-warm-white/6 pt-6 text-xs text-warm-white/30 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vaidy. All rights reserved.</p>
          <p>Made in India · For India.</p>
        </div>
      </div>
    </footer>
  );
}
