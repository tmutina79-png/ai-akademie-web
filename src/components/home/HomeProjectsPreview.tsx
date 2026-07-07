import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'

type ProjectFilter = 'all' | 'in-progress' | 'completed'

const FINISHED_STATUS_TOKENS = ['hotovo', 'dokonceno', 'dokončeno']
const PREPARING_STATUS_TOKENS = ['pripravuje se', 'připravuje se', 'v priprave', 'v přípravě']

function isCompletedStatus(status: string) {
  const normalized = status.trim().toLowerCase()
  return FINISHED_STATUS_TOKENS.some((token) => normalized.includes(token))
}

function isPreparingStatus(status: string) {
  const normalized = status.trim().toLowerCase()
  return PREPARING_STATUS_TOKENS.some((token) => normalized.includes(token))
}

export function HomeProjectsPreview() {
  const [filter, setFilter] = useState<ProjectFilter>('all')

  const visibleProjects = useMemo(
    () => projects.filter((project) => !isPreparingStatus(project.status)),
    [],
  )

  const projectCounts = useMemo(() => {
    const completed = visibleProjects.filter((project) => isCompletedStatus(project.status)).length
    const inProgress = visibleProjects.length - completed

    return {
      all: visibleProjects.length,
      completed,
      inProgress,
    }
  }, [visibleProjects])

  const filteredProjects = useMemo(() => {
    if (filter === 'completed') {
      return visibleProjects.filter((project) => isCompletedStatus(project.status))
    }

    if (filter === 'in-progress') {
      return visibleProjects.filter((project) => !isCompletedStatus(project.status))
    }

    return visibleProjects
  }, [filter, visibleProjects])

  return (
    <section className="teams-shell">
      <div className="teams-panel">
        <div className="teams-panel-head">
          <h2 className="teams-title text-xl md:text-2xl">Projekty AI akademie</h2>
          <span className="teams-pill">Vybrané projektové karty</span>
        </div>
        <p className="teams-subtitle mt-2 max-w-4xl text-sm md:text-base">
          Vybrané projekty ze sekce Projekty s rychlým náhledem na téma, stav a cíl.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={[
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              filter === 'all'
                ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700',
            ].join(' ')}
          >
            Vše ({projectCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilter('in-progress')}
            className={[
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              filter === 'in-progress'
                ? 'border-amber-300 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:text-amber-700',
            ].join(' ')}
          >
            Rozpracované ({projectCounts.inProgress})
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={[
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              filter === 'completed'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700',
            ].join(' ')}
          >
            Dokončené ({projectCounts.completed})
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projekty/${project.id}`}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(68,71,145,0.14)]"
          >
            <img
              src={project.image}
              alt={project.title}
              className={[
                'h-32 w-full',
                project.id === 'online-ai-akademie-mgo' ? 'bg-slate-50 object-contain p-2' : 'object-cover',
              ].join(' ')}
              loading="lazy"
            />
            <div className="flex flex-1 flex-col gap-1.5 p-3">
              <h3 className="teams-title text-sm leading-snug">{project.title}</h3>
              <p className="teams-subtitle text-xs leading-relaxed">{project.description}</p>
              <div className="mt-auto pt-2">
                <span className="teams-pill">{project.status}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!filteredProjects.length ? (
        <p className="mt-3 text-sm text-slate-500">V tomto filtru zatím nejsou dostupné žádné projekty.</p>
      ) : null}
    </section>
  )
}
