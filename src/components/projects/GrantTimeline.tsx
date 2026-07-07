import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { grantProjects } from '../../data/grantProjects'

export function GrantTimeline() {
  return (
    <section id="harmonogram" className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(160deg,#ffffff_0%,#f8faff_58%,#eef3ff_100%)] p-4 shadow-[0_12px_32px_rgba(15,23,42,0.08)] md:p-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Výběr projektu</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900 md:text-xl">Menu dotačních projektů</h3>
            <p className="mt-1 text-sm text-slate-600">Kliknutím na kartu otevřete chráněný detail timeline projektu.</p>
          </div>
          <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
            {grantProjects.length} projekt
          </span>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[1fr_220px]">
          <div className="grid gap-4 lg:grid-cols-2">
            {grantProjects.map((project) => (
              <Link
                key={project.id}
                to={`/dotacni-projekty/${project.id}`}
                className={[
                  'group overflow-hidden rounded-2xl border p-4 text-left shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition',
                  'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_10px_22px_rgba(79,70,229,0.12)]',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="teams-title text-lg">{project.title}</h3>
                    <p className="teams-subtitle mt-1 text-sm">{project.summary}</p>
                  </div>
                  <span className="teams-pill whitespace-nowrap">{project.period}</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold">{project.code}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-semibold">{project.sponsor}</span>
                </div>

                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition group-hover:border-indigo-300 group-hover:bg-indigo-100">
                  Otevřít timeline
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white/90 p-3.5 shadow-sm lg:sticky lg:top-20">
            <h3 className="teams-title text-base">Partneři</h3>
            <div className="mt-3 space-y-2">
              <div className="partner-logo-frame flex h-14 items-center justify-center rounded-md border border-slate-200 bg-white">
                <img src="/ostrava-logo.png" alt="Ostrava" className="partner-logo-ostrava" />
              </div>
              <div className="partner-logo-frame flex h-14 items-center justify-center rounded-md border border-slate-200 bg-white">
                <img
                  src="/msk-logo.png"
                  alt="Moravskoslezský kraj"
                  className="partner-logo-msk"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
