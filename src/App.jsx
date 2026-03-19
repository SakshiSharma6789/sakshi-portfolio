import { profile } from './content/profile'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Section } from './components/Section'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer'

function SkillPill({ label }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-100">
      {label}
    </span>
  )
}

export default function App() {
  return (
    <div className="min-h-svh">
      <Navbar ctaHref="#contact" />
      <main>
        <Hero profile={profile} />

        <Section id="about" eyebrow="About" title="Building clean UI and secure APIs">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass rounded-3xl p-6 md:col-span-2">
              <p className="text-pretty text-zinc-200/90">{profile.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-300/20">
                  MERN
                </span>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-300/20">
                  Java + Spring Boot
                </span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-300/20">
                  REST + Auth
                </span>
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="text-xs font-medium tracking-[0.22em] text-zinc-400">
                QUICK INFO
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-zinc-400">Location</dt>
                  <dd className="text-right text-zinc-100">{profile.location}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-zinc-400">Role</dt>
                  <dd className="text-right text-zinc-100">Full Stack Developer</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-zinc-400">Focus</dt>
                  <dd className="text-right text-zinc-100">Secure APIs & UI</dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="Tools I work with">
          <div className="glass rounded-3xl p-6">
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="GitHub projects">
          <Projects
            username={profile.links.githubUsername}
            descriptionOverrides={profile.projects?.descriptionOverrides}
          />
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let’s build something">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass rounded-3xl p-6 md:col-span-2">
              <p className="text-zinc-200/90">
                Want to collaborate or discuss an opportunity? Send me a message — I usually
                reply quickly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.links?.email ? (
                  <a
                    className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
                    href={`mailto:${profile.links.email}?subject=Portfolio%20Contact%20-%20Sakshi`}
                  >
                    Email: {profile.links.email}
                  </a>
                ) : null}
                {profile.links?.linkedin ? (
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {profile.links?.resume ? (
                  <a
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:bg-white/10"
                    href={profile.links.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download resume
                  </a>
                ) : null}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <p className="text-sm font-semibold text-zinc-100">Prefer GitHub?</p>
              <p className="mt-2 text-sm text-zinc-400">
                Check repositories and contributions.
              </p>
              {profile.links?.githubUsername ? (
                <a
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
                  href={`https://github.com/${profile.links.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open GitHub
                </a>
              ) : null}
            </div>
          </div>
        </Section>
      </main>
      <Footer profile={profile} />
    </div>
  )
}
