import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  FileText,
  GraduationCap,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { grantProjects, type GrantTimelineStatus } from '../data/grantProjects'

const statusStyles: Record<
  GrantTimelineStatus,
  {
    label: string
    itemBorder: string
    itemBg: string
    pill: string
    icon: typeof CheckCircle2
  }
> = {
  hotovo: {
    label: 'Hotovo',
    itemBorder: 'border-emerald-200',
    itemBg: 'bg-emerald-50',
    pill: 'border-emerald-300 bg-emerald-100 text-emerald-700',
    icon: CheckCircle2,
  },
  probiha: {
    label: 'Probíhá',
    itemBorder: 'border-indigo-200',
    itemBg: 'bg-indigo-50',
    pill: 'border-indigo-300 bg-indigo-100 text-indigo-700',
    icon: Clock3,
  },
  planovano: {
    label: 'Plánováno',
    itemBorder: 'border-slate-200',
    itemBg: 'bg-slate-50',
    pill: 'border-slate-300 bg-slate-100 text-slate-600',
    icon: Circle,
  },
}

const preparationStateStyles = {
  probiha: 'border-indigo-300 bg-indigo-100 text-indigo-700',
  ceka: 'border-amber-300 bg-amber-100 text-amber-700',
} as const

const preparationStateLabels = {
  probiha: 'Probíhá',
  ceka: 'Čeká',
} as const

function normalizeDate(value: string) {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value

  return parsed.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function sortByDate<T extends { date: string; time?: string }>(items: T[]) {
  return [...items].sort((a, b) => {
    const left = new Date(`${a.date}T${a.time ?? '00:00'}`)
    const right = new Date(`${b.date}T${b.time ?? '00:00'}`)
    return left.getTime() - right.getTime()
  })
}

function isUpcoming(date: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)
  return target >= today
}

export function GrantProjectDetailPage() {
  const { grantProjectId } = useParams()
  const [expandedTimelineId, setExpandedTimelineId] = useState<string | null>(null)

  const selectedProject = useMemo(
    () => grantProjects.find((project) => project.id === grantProjectId),
    [grantProjectId],
  )

  const sortedTimeline = useMemo(
    () => (selectedProject ? sortByDate(selectedProject.timeline) : []),
    [selectedProject],
  )

  const sortedCalendar = useMemo(
    () => (selectedProject ? sortByDate(selectedProject.calendar) : []),
    [selectedProject],
  )

  const upcomingWorkshops = useMemo(
    () =>
      sortedCalendar.filter(
        (item) => item.title.toLowerCase().includes('workshop') && isUpcoming(item.date),
      ),
    [sortedCalendar],
  )

  if (!selectedProject) {
    return <Navigate to="/dotacni-projekty" replace />
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-indigo-900">Detail projektu: {selectedProject.title}</p>
          <p className="mt-1 text-xs text-indigo-700">{selectedProject.summary}</p>
        </div>
        <Link
          to="/dotacni-projekty"
          className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Zpět na dotační projekty
        </Link>
      </div>

      <div className="flex justify-end">
        <Link
          to={`/dotacni-projekty/${selectedProject.id}/zaverecna-zprava`}
          className="inline-flex items-center gap-2 rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          <FileText className="h-4 w-4" />
          Zobrazení závěrečné zprávy
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="teams-panel">
          <div className="teams-panel-head">
            <h3 className="teams-title text-xl">Timeline realizace projektu</h3>
            <span className="teams-pill">{sortedTimeline.length} milníků</span>
          </div>

          <div className="relative mt-4 space-y-3">
            <div className="absolute left-5 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-indigo-100 via-indigo-200 to-transparent" />
            {sortedTimeline.map((item) => {
              const style = statusStyles[item.status]
              const StatusIcon = style.icon
              const hasDetails = (item.details?.length ?? 0) > 0
              const isExpanded = expandedTimelineId === item.id

              return (
                <article
                  key={item.id}
                  className={[
                    'relative ml-3 rounded-xl border p-4 pl-12',
                    style.itemBorder,
                    style.itemBg,
                  ].join(' ')}
                >
                  <span className="absolute left-[-10px] top-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white text-slate-500 shadow-sm">
                    <StatusIcon className="h-4 w-4" />
                  </span>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <span className={['inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold', style.pill].join(' ')}>
                      {style.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {normalizeDate(item.date)}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>

                  {hasDetails ? (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => setExpandedTimelineId(isExpanded ? null : item.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                      >
                        {isExpanded ? 'Skrýt specifikaci' : 'Zobrazit specifikaci'}
                        <ChevronDown
                          className={['h-3.5 w-3.5 transition-transform', isExpanded ? 'rotate-180' : ''].join(' ')}
                        />
                      </button>

                      {isExpanded ? (
                        <ul className="mt-2 space-y-1.5 rounded-lg border border-slate-200 bg-white/80 p-2.5">
                          {item.details?.map((detail) => (
                            <li key={detail} className="text-xs leading-relaxed text-slate-700">
                              • {detail}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>

        <div className="space-y-5">
          <section className="teams-panel">
            <div className="teams-panel-head">
              <h3 className="teams-title text-base">Co je třeba ještě připravit</h3>
              <span className="teams-pill">{selectedProject.pendingPreparation.length}</span>
            </div>

            <p className="mt-2 text-xs text-slate-600">
              Přehled aktuálně rozpracovaných bodů k dokončení.
            </p>

            <ul className="mt-3 space-y-2">
              {selectedProject.pendingPreparation.map((item) => (
                <li key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{item.description}</p>
                    </div>
                    <span
                      className={[
                        'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                        preparationStateStyles[item.state],
                      ].join(' ')}
                    >
                      {preparationStateLabels[item.state]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="teams-panel">
            <div className="teams-panel-head">
              <h3 className="teams-title text-xl">Přesný harmonogram workshopů v kalendáři</h3>
              <span className="teams-pill">{upcomingWorkshops.length} zápisů</span>
            </div>

            <div className="mt-3 grid gap-3 grid-cols-1">
              {upcomingWorkshops.map((item) => (
                <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <CalendarClock className="h-4 w-4 text-slate-500" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {normalizeDate(item.date)} • {item.time}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{item.location}</p>
                  {item.note ? <p className="mt-1 text-xs text-slate-600">{item.note}</p> : null}
                </article>
              ))}

              {!upcomingWorkshops.length ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                  Aktuálně nejsou evidované žádné nadcházející workshopy.
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>

      <section className="teams-panel border-[#e1e7ff] bg-[#f7f9ff]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2f3b88]">
          <GraduationCap className="h-4 w-4" />
          Detail projektu je zobrazen samostatně na stránce s plnou timeline, připravovanými úkoly a kalendářem.
        </div>
      </section>
    </div>
  )
}
