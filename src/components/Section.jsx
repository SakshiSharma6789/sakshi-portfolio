export function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="container-app">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <p className="text-xs font-medium tracking-[0.22em] text-zinc-400">
                {eyebrow.toUpperCase()}
              </p>
            ) : null}
            <h2 className="mt-2 text-balance text-2xl font-semibold text-zinc-100 md:text-3xl">
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

