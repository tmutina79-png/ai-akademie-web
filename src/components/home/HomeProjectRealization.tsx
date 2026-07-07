import { Flag, Route, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { realizationMilestones, realizationSteps } from '../../data/projectRealization'

export function HomeProjectRealization() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (revealItems.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const element = entry.target as HTMLElement
          element.classList.add('reveal-visible')
          observer.unobserve(element)
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`)
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="teams-shell space-y-5">
      <div className="reveal-on-scroll teams-panel bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_55%,#eef4ff_100%)]" data-reveal>
        <div className="teams-panel-head">
          <h2 className="teams-title text-xl md:text-2xl">Realizace projektu Matiční AI akademie</h2>
          <span className="teams-pill">Chronologický přehled</span>
        </div>
        <p className="teams-subtitle mt-2 max-w-4xl text-sm md:text-base">
          Přehled hlavních kroků realizace od schválení projektu přes vzdělávání pedagogů až po podzimní workshopy a prezentace výstupů.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="reveal-on-scroll rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:p-5" data-reveal>
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-indigo-700" />
            <h3 className="text-base font-bold text-slate-900">5 kroků realizace</h3>
          </div>

          <div className="relative mt-5 space-y-3.5 pl-8">
            <div className="absolute bottom-2 left-3 top-2 w-px bg-gradient-to-b from-indigo-200 via-indigo-300 to-indigo-100" />
            {realizationSteps.map((step, index) => (
              <article
                key={step.id}
                className="reveal-on-scroll relative rounded-2xl border border-slate-200 bg-slate-50/85 p-3.5 md:p-4"
                data-reveal
              >
                <span className="absolute -left-[1.6rem] top-4 inline-flex h-5 w-5 items-center justify-center rounded-full border border-indigo-200 bg-white shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                </span>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                    Krok {index + 1}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    {step.period}
                  </span>
                </div>

                <h4 className="mt-2 text-sm font-bold text-slate-900 md:text-base">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="reveal-on-scroll rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] md:p-5" data-reveal>
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-indigo-700" />
            <h3 className="text-base font-bold text-slate-900">Podzimní milníky</h3>
          </div>
          <p className="mt-2 text-sm text-slate-600">Finální harmonogram klíčových workshopů a prezentace projektu.</p>

          <div className="mt-4 space-y-3">
            {realizationMilestones.map((item, index) => (
              <article key={item.id} className="reveal-on-scroll rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3.5" data-reveal>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">{item.date}</p>
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-indigo-700 px-1.5 text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h4 className="mt-1.5 text-sm font-bold leading-snug text-slate-900">{item.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="reveal-on-scroll mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-600" data-reveal>
            <p className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Všechny předchozí termíny byly nahrazeny tímto finálním podzimním harmonogramem.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
