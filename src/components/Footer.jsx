export function Footer({ profile }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-app">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} {profile.name}. Built with React + Vite + Tailwind.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {profile.links?.githubUsername ? (
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                href={`https://github.com/${profile.links.githubUsername}`}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}
            {profile.links?.linkedin ? (
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            ) : null}
            {profile.links?.email ? (
              <a
                className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
                href={`mailto:${profile.links.email}`}
              >
                Email
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}

