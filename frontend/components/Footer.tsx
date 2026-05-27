import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#030408] px-6 py-8 text-white border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-4 text-center sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-md bg-gradient-to-br from-emerald-400 to-teal-300"
            aria-hidden="true"
          />
          <span className="text-[15px] font-bold tracking-[-0.03em]">vaidy</span>
        </div>

        <nav className="flex items-center gap-5" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-white/35 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-white/20">
          (c) {new Date().getFullYear()} Vaidy. Built for India.
        </p>
      </div>
    </footer>
  );
}
