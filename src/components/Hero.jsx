import { motion } from 'framer-motion'

export function Hero({ profile }) {
  const { name, title, location, bio, initials, links } = profile
  const mailto = links?.email ? `mailto:${links.email}` : null

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[52rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-80 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="container-app relative py-16 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-zinc-400"
            >
              {location}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 text-balance text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl"
            >
              Hi, I’m <span className="text-gradient">{name}</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-4 text-pretty text-lg text-zinc-300 md:text-xl"
            >
              {title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-6 max-w-2xl text-pretty text-zinc-300/90"
            >
              {bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {mailto ? (
                <a
                  href={mailto}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
                >
                  Email me
                </a>
              ) : null}

              {links?.githubUsername ? (
                <a
                  href={`https://github.com/${links.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                >
                  GitHub
                </a>
              ) : null}

              {links?.linkedin ? (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                >
                  LinkedIn
                </a>
              ) : null}

              {links?.resume ? (
                <a
                  href={links.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                >
                  Resume
                </a>
              ) : null}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="glass relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl p-6 shadow-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-emerald-400/10" />
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <span className="text-sm font-semibold tracking-wider text-zinc-100">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-100">{name}</p>
                  <p className="truncate text-sm text-zinc-400">{title}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { k: 'Primary', v: 'MERN Stack (React, Node.js, Express, MongoDB)' },
                  { k: 'Backend focus', v: 'Java & Spring Boot (REST APIs, Authentication, JWT)' },
                  { k: 'Currently', v: 'Building secure REST APIs with role-based authentication' },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/40 p-3"
                  >
                    <span className="text-xs font-medium tracking-wide text-zinc-400">
                      {row.k}
                    </span>
                    <span className="text-right text-xs text-zinc-200">{row.v}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-zinc-400">
                Tip: add your resume PDF at <code className="rounded bg-white/5 px-1 py-0.5">public/sakshi-resume.pdf</code>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

