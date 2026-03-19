const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar({ ctaHref = '#contact' }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/65 backdrop-blur-xl">
      <div className="container-app">
        <div className="flex h-16 items-center justify-between gap-3">
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-semibold text-zinc-100 hover:bg-white/5"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
              <span className="text-[11px] tracking-widest">SS</span>
            </span>
            <span className="hidden sm:inline">Sakshi</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-zinc-50"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 shadow-sm hover:bg-zinc-100"
          >
            Let’s talk
          </a>
        </div>
      </div>
    </header>
  )
}

