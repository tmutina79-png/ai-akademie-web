import { Link } from 'react-router-dom'
import { projects, type ProjectItem } from '../../data/projects'

type StudentProjectsSectionProps = {
  selectedProjectId?: string
  projectItems?: ProjectItem[]
}

export function StudentProjectsSection({ selectedProjectId, projectItems = projects }: StudentProjectsSectionProps) {
  return (
    <section className="teams-shell">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projectItems.map((project) => {
          const isSelected = selectedProjectId === project.id
          return (
            <Link
              key={project.id}
              id={project.id}
              to={`/projekty/${project.id}`}
              className={[
                'flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(68,71,145,0.14)]',
                isSelected
                  ? 'ring-2 ring-indigo-300 shadow-[0_14px_30px_rgba(79,70,229,0.18)]'
                  : '',
              ].join(' ')}
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
                {isSelected ? (
                  <p className="pt-1 text-[11px] font-semibold text-indigo-700">Sledovaný projekt</p>
                ) : null}
                <div className="mt-auto pt-2">
                  <span className="teams-pill">{project.status}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
