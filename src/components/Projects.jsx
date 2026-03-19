import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchGithubRepos, fetchRepoReadmeText, generateRepoDescription } from '../lib/github'

function normalizeKey(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function formatUpdated(dateIso) {
  if (!dateIso) return null
  const dt = new Date(dateIso)
  return dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-200">
      {children}
    </span>
  )
}

function RepoCard({ repo }) {
  const updated = formatUpdated(repo.updatedAt)
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="group glass block rounded-3xl p-5 transition hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-zinc-50">{repo.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-300/90">
            {repo.smartDescription || repo.description || 'No description yet — open to improvements.'}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-200">
          ↗
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {repo.language ? <Chip>{repo.language}</Chip> : null}
        <Chip>★ {repo.stars}</Chip>
        <Chip>⑂ {repo.forks}</Chip>
        {updated ? <Chip>Updated {updated}</Chip> : null}
      </div>
    </a>
  )
}

export function Projects({ username, descriptionOverrides = {} }) {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | error | ready
  const [limit, setLimit] = useState(8)

  const visible = useMemo(() => repos.slice(0, limit), [repos, limit])

  useEffect(() => {
    let mounted = true
    if (!username) return
    setStatus('loading')
    fetchGithubRepos(username, { limit: 24 })
      .then(async (data) => {
        if (!mounted) return
        const enriched = await Promise.all(
          data.map(async (r) => {
            const override =
              descriptionOverrides?.[r.name] ||
              descriptionOverrides?.[normalizeKey(r.name)] ||
              descriptionOverrides?.[normalizeKey(r.name).replace(/-/g, ' ')]
            if (override) return { ...r, smartDescription: override }

            const readme = await fetchRepoReadmeText(username, r.name)
            return { ...r, smartDescription: generateRepoDescription(r, readme) }
          }),
        )

        if (!mounted) return
        setRepos(enriched)
        setStatus('ready')
      })
      .catch(() => {
        if (!mounted) return
        setStatus('error')
      })
    return () => {
      mounted = false
    }
  }, [username])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">
          Showing GitHub repos from{' '}
          <a
            className="text-zinc-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
          >
            @{username}
          </a>
        </p>

        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
          >
            View all
          </a>
        </div>
      </div>

      {status === 'loading' ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass h-36 animate-pulse rounded-3xl bg-white/[0.04]"
            />
          ))}
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="glass rounded-3xl p-6">
          <p className="text-sm text-zinc-200">
            Couldn’t load GitHub projects right now (rate limit or network). You can still
            visit your GitHub.
          </p>
          <a
            className="mt-3 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
          >
            Open GitHub
          </a>
        </div>
      ) : null}

      {status === 'ready' ? (
        <>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid gap-4 md:grid-cols-2"
          >
            {visible.map((repo) => (
              <motion.div
                key={repo.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35 }}
              >
                <RepoCard repo={repo} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-3">
            {limit < repos.length ? (
              <button
                type="button"
                onClick={() => setLimit((v) => Math.min(v + 4, repos.length))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
              >
                Load more
              </button>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  )
}

