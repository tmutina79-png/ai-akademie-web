import { ChevronLeft, ChevronRight, Printer } from 'lucide-react'
import { useMemo, useState } from 'react'
import { homeEvents, type HomeEventCategory, type HomeEventItem } from '../../data/homeEvents'

type HoverPreviewState = {
  event: HomeEventItem
  x: number
  y: number
}

const categoryMeta: Record<HomeEventCategory, { label: string; color: string; dot: string }> = {
  Workshop: {
    label: 'Workshop',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    dot: 'bg-indigo-500',
  },
  'Přednáška': {
    label: 'Přednáška',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  Deadline: {
    label: 'Deadline',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  Prezentace: {
    label: 'Prezentace',
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    dot: 'bg-sky-500',
  },
}

const weekdays = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek']
const minHour = 8
const maxHour = 18
const pxPerHour = 64

function getMonday(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
  }).format(date)
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat('cs-CZ', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function parseTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function EventPlannerCalendar() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<HomeEventItem | null>(null)
  const [hoverPreview, setHoverPreview] = useState<HoverPreviewState | null>(null)

  const monday = useMemo(() => {
    const base = getMonday(new Date())
    base.setDate(base.getDate() + weekOffset * 7)
    return base
  }, [weekOffset])

  const days = useMemo(() => weekdays.map((_, idx) => addDays(monday, idx)), [monday])

  const weekLabel = `${formatDate(days[0])} - ${formatDate(days[4])}`

  const hours = Array.from({ length: maxHour - minHour + 1 }, (_, idx) => minHour + idx)

  const weekEvents = useMemo(
    () =>
      homeEvents.filter((event) => {
        const current = new Date(event.date)
        current.setHours(0, 0, 0, 0)
        return days.some((day) => day.getTime() === current.getTime())
      }),
    [days],
  )

  const categoryCounts = weekEvents.reduce<Record<HomeEventCategory, number>>(
    (acc, event) => {
      acc[event.category] += 1
      return acc
    },
    { Workshop: 0, 'Přednáška': 0, Deadline: 0, Prezentace: 0 },
  )

  const selectedEventDate = selectedEvent ? new Date(selectedEvent.date) : null

  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
      <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">CopilotCal</h2>
          <p className="text-sm text-slate-500">Týdenní plán workshopů a aktivit AI akademie</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Tisk"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={() => setWeekOffset((prev) => prev - 1)}
            aria-label="Předchozí týden"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
            onClick={() => setWeekOffset(0)}
          >
            Dnes
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={() => setWeekOffset((prev) => prev + 1)}
            aria-label="Další týden"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-1 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
            {weekLabel}
          </span>
        </div>
      </header>

      <div className="grid gap-0 lg:grid-cols-[230px_1fr]">
        <aside className="border-b border-slate-200 bg-slate-50 p-4 lg:border-b-0 lg:border-r">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Kategorie</h3>
          <div className="space-y-2">
            {(Object.keys(categoryMeta) as HomeEventCategory[]).map((category) => (
              <div
                key={category}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className={`h-2.5 w-2.5 rounded-full ${categoryMeta[category].dot}`} />
                  {categoryMeta[category].label}
                </span>
                <span className="text-xs font-bold text-slate-500">{categoryCounts[category]}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-indigo-700">Tento týden</p>
            <p className="mt-1 text-sm text-indigo-900">{weekLabel}</p>
          </div>
        </aside>

        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[72px_repeat(5,minmax(120px,1fr))] border-b border-slate-200 bg-white">
              <div className="border-r border-slate-200 px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Čas
              </div>
              {days.map((date, idx) => (
                <div key={weekdays[idx]} className="border-r border-slate-200 px-3 py-3 last:border-r-0">
                  <p className="text-sm font-bold text-slate-800">{weekdays[idx]}</p>
                  <p className="text-xs text-slate-500">{formatDate(date)}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[72px_repeat(5,minmax(120px,1fr))] bg-white">
              <div className="border-r border-slate-200">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="flex h-16 items-start justify-center border-b border-slate-100 pt-1 text-xs font-semibold text-slate-400"
                  >
                    {`${hour}:00`}
                  </div>
                ))}
              </div>

              {weekdays.map((day, dayIndex) => (
                <div
                  key={day}
                  className="relative border-r border-slate-200 last:border-r-0"
                  style={{ height: `${(maxHour - minHour) * pxPerHour}px` }}
                >
                  {Array.from({ length: maxHour - minHour }).map((_, idx) => (
                    <div key={`${day}-${idx}`} className="h-16 border-b border-slate-100" />
                  ))}

                  {weekEvents
                    .filter((event) => {
                      const eventDate = new Date(event.date)
                      return eventDate.getDate() === days[dayIndex].getDate() && eventDate.getMonth() === days[dayIndex].getMonth() && eventDate.getFullYear() === days[dayIndex].getFullYear()
                    })
                    .map((event) => {
                      const start = parseTime(event.startTime)
                      const end = parseTime(event.endTime)
                      const top = ((start - minHour * 60) / 60) * pxPerHour
                      const height = ((end - start) / 60) * pxPerHour

                      return (
                        <article
                          key={event.id}
                          className={`absolute left-1 right-1 rounded-lg border p-2 shadow-sm transition-transform hover:z-10 hover:scale-[1.01] ${categoryMeta[event.category].color}`}
                          style={{ top: `${top}px`, height: `${Math.max(height, 48)}px` }}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedEvent(event)}
                          onMouseEnter={(mouseEvent) => {
                            setHoverPreview({
                              event,
                              x: Math.min(mouseEvent.clientX + 18, window.innerWidth - 310),
                              y: mouseEvent.clientY + 18,
                            })
                          }}
                          onMouseMove={(mouseEvent) => {
                            setHoverPreview({
                              event,
                              x: Math.min(mouseEvent.clientX + 18, window.innerWidth - 310),
                              y: mouseEvent.clientY + 18,
                            })
                          }}
                          onMouseLeave={() => setHoverPreview(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedEvent(event)
                            }
                          }}
                        >
                          <p className="text-[11px] font-bold leading-tight">{event.title}</p>
                          <p className="mt-1 text-[10px] leading-tight opacity-80">
                            {event.startTime} - {event.endTime} · {event.location}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[10px] leading-tight opacity-80">
                            {event.description}
                          </p>
                        </article>
                      )
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {hoverPreview ? (
        <div
          className="pointer-events-none fixed z-40 w-[280px] rounded-2xl border border-slate-200 bg-white/98 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur"
          style={{ left: `${hoverPreview.x}px`, top: `${hoverPreview.y}px` }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${categoryMeta[hoverPreview.event.category].color}`}>
              {hoverPreview.event.category}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {hoverPreview.event.startTime} - {hoverPreview.event.endTime}
            </span>
          </div>
          <p className="mt-3 text-sm font-bold leading-snug text-slate-900">{hoverPreview.event.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{hoverPreview.event.description}</p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            {hoverPreview.event.location}
          </p>
        </div>
      ) : null}

      {selectedEvent && selectedEventDate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="text-lg font-bold text-slate-900">Detail události</h3>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                onClick={() => setSelectedEvent(null)}
              >
                Zavřít
              </button>
            </div>

            <div className="space-y-3 px-5 py-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Název</p>
                <p className="mt-1 font-bold text-slate-900">{selectedEvent.title}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Popis</p>
                  <p className="mt-1 text-slate-700">{selectedEvent.description}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Datum a čas</p>
                  <p className="mt-1 text-slate-700">
                    {formatLongDate(selectedEventDate)}
                    <br />
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Kategorie</p>
                  <p className="mt-1 text-slate-700">{categoryMeta[selectedEvent.category].label}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Místo</p>
                  <p className="mt-1 text-slate-700">{selectedEvent.location}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Priorita</p>
                  <p className="mt-1 text-slate-700">{selectedEvent.priority}</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Připomínka</p>
                  <p className="mt-1 text-slate-700">{selectedEvent.reminder}</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Opakování</p>
                <p className="mt-1 text-slate-700">{selectedEvent.recurring}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
