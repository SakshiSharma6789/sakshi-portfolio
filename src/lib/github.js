const API_BASE = 'https://api.github.com'

function safeJsonParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export async function fetchGithubRepos(username, { limit = 8 } = {}) {
  const cacheKey = `gh_repos_v1:${username}`
  const cachedRaw = sessionStorage.getItem(cacheKey)
  const cached = cachedRaw ? safeJsonParse(cachedRaw) : null
  const now = Date.now()

  if (cached && typeof cached.ts === 'number' && now - cached.ts < 1000 * 60 * 30) {
    return cached.data
  }

  const url = new URL(`${API_BASE}/users/${username}/repos`)
  url.searchParams.set('per_page', '100')
  url.searchParams.set('sort', 'updated')

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })

  if (!res.ok) {
    throw new Error(`GitHub API error (${res.status})`)
  }

  const repos = await res.json()

  const filtered = repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      const aScore = (a.stargazers_count || 0) * 5 + (a.forks_count || 0) * 2
      const bScore = (b.stargazers_count || 0) * 5 + (b.forks_count || 0) * 2
      if (bScore !== aScore) return bScore - aScore
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
    .slice(0, limit)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage,
      language: r.language,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      updatedAt: r.updated_at,
      topics: Array.isArray(r.topics) ? r.topics : [],
      isPrivate: !!r.private,
    }))

  sessionStorage.setItem(cacheKey, JSON.stringify({ ts: now, data: filtered }))
  return filtered
}

function normalizeText(s) {
  return String(s || '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function stripMarkdown(md) {
  const s = normalizeText(md)
  return s
    .replace(/^---[\s\S]*?---/m, '') // frontmatter
    .replace(/```[\s\S]*?```/g, '') // code fences
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .trim()
}

export async function fetchRepoReadmeText(username, repoName) {
  const cacheKey = `gh_readme_v1:${username}/${repoName}`
  const cachedRaw = sessionStorage.getItem(cacheKey)
  const cached = cachedRaw ? safeJsonParse(cachedRaw) : null
  const now = Date.now()

  if (cached && typeof cached.ts === 'number' && now - cached.ts < 1000 * 60 * 60 * 6) {
    return cached.data
  }

  const res = await fetch(`${API_BASE}/repos/${username}/${repoName}/readme`, {
    headers: {
      Accept: 'application/vnd.github.raw+json',
    },
  })

  if (!res.ok) {
    sessionStorage.setItem(cacheKey, JSON.stringify({ ts: now, data: null }))
    return null
  }

  const raw = await res.text()
  const cleaned = stripMarkdown(raw)
  const firstParagraph = cleaned
    .split('\n\n')
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .find((p) => p && p.length > 40)
  const result = firstParagraph || null

  sessionStorage.setItem(cacheKey, JSON.stringify({ ts: now, data: result }))
  return result
}

export function generateRepoDescription(repo, readmeText) {
  if (readmeText) return readmeText

  const name = String(repo?.name || '').replace(/[-_]/g, ' ').trim()
  const topics = Array.isArray(repo?.topics) ? repo.topics : []
  const lang = repo?.language

  const hasMern =
    topics.some((t) => ['mern', 'react', 'node', 'express', 'mongodb'].includes(String(t).toLowerCase())) ||
    /mern|react|node|express|mongo/i.test(name)

  const bits = []
  if (hasMern) bits.push('A MERN full-stack project')
  else if (lang) bits.push(`A ${lang} project`)
  else bits.push('A software project')

  if (topics.length) {
    const top = topics.slice(0, 4).map((t) => String(t).replace(/[-_]/g, ' '))
    bits.push(`focused on ${top.join(', ')}`)
  } else {
    bits.push('built to practice real-world features and clean architecture')
  }

  return `${bits.join(' ')}.`
}

