export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-void">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between md:px-8">
        <a href="#hero" className="inline-flex items-center gap-2 font-semibold text-white">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          Vaidy
        </a>
        <nav className="flex gap-6" aria-label="Footer navigation">
          <a className="transition-colors hover:text-white" href="#privacy">
            Privacy
          </a>
          <a className="transition-colors hover:text-white" href="#terms">
            Terms
          </a>
          <a className="transition-colors hover:text-white" href="#contact">
            Contact
          </a>
        </nav>
        <p>© 2024 Vaidy</p>
      </div>
    </footer>
  );
}
