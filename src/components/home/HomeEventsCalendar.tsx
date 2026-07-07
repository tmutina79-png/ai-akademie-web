import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeEvents, type HomeEventCategory, type HomeEventItem } from '../../data/homeEvents'

const categoryStyles: Record<HomeEventCategory, string> = {
  Workshop: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Přednáška': 'bg-sky-100 text-sky-700 border-sky-200',
  Deadline: 'bg-amber-100 text-amber-700 border-amber-200',
  Prezentace: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function toIsoDateLocal(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function sameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

function sameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat('cs-CZ', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat('cs-CZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

function getUpcomingEvents(events: HomeEventItem[], baseDate: Date) {
  const start = new Date(baseDate)
  start.setHours(0, 0, 0, 0)
  return events.filter((event) => {
    const current = new Date(event.date)
    current.setHours(0, 0, 0, 0)
    return current >= start
  })
}

export function HomeEventsCalendar() {
  const today = useMemo(() => new Date('2026-07-04T12:00:00'), [])
  const [viewedMonth, setViewedMonth] = useState(() => startOfMonth(today))
  const [selectedDate, setSelectedDate] = useState(() => {
    const firstEventInCurrentMonth = homeEvents.find((event) => sameMonth(new Date(event.date), today))
    return firstEventInCurrentMonth?.date ?? toIsoDateLocal(startOfMonth(today))
  })
  const [selectedEventByDate, setSelectedEventByDate] = useState<Record<string, string>>({})
  const monthLabel = new Intl.DateTimeFormat('cs-CZ', { month: 'long', year: 'numeric' }).format(viewedMonth)

  const daysInMonth = endOfMonth(viewedMonth).getDate()
  const firstWeekdayOffset = (viewedMonth.getDay() + 6) % 7
  const monthDays = Array.from(
    { length: daysInMonth },
    (_, index) => new Date(viewedMonth.getFullYear(), viewedMonth.getMonth(), index + 1),
  )
  const calendarCells = [...Array.from({ length: firstWeekdayOffset }, () => null), ...monthDays]

  const eventsByDate = useMemo(() => {
    return homeEvents.reduce<Record<string, HomeEventItem[]>>((accumulator, event) => {
      if (!accumulator[event.date]) accumulator[event.date] = []
      accumulator[event.date].push(event)
      return accumulator
    }, {})
  }, [])

  const selectedEvents = eventsByDate[selectedDate] ?? []
  const selectedEventId = selectedEventByDate[selectedDate]
  const activeEvent = selectedEvents.find((event) => event.id === selectedEventId) ?? selectedEvents[0] ?? null
  const upcomingEvents = useMemo(() => getUpcomingEvents(homeEvents, today), [today])

  const changeMonth = (offset: number) => {
    const nextMonth = addMonths(viewedMonth, offset)
    setViewedMonth(nextMonth)

    if (sameMonth(new Date(selectedDate), nextMonth)) return

    const firstEventInMonth = homeEvents.find((event) => sameMonth(new Date(event.date), nextMonth))
    setSelectedDate(firstEventInMonth?.date ?? toIsoDateLocal(nextMonth))
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
            <CalendarDays className="h-6 w-6 text-indigo-700" />
            Kalendář akcí AI akademie MGO
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Přehled workshopů, přednášek a termínů. Kliknutím na den s akcí zobrazíte detail a vpravo uvidíte nejbližší nadcházející události.
          </p>
        </div>
      </div>

      <div className="grid items-stretch gap-5 xl:grid-cols-[0.95fr_1fr_300px]">
        <section className="self-start overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_16px_32px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#eef2ff_52%,#ffffff_100%)] px-4 py-3.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Měsíční přehled</p>
                <h3 className="mt-1 text-base font-bold text-slate-900">Termíny a workshopy</h3>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  className="rounded-full p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Předchozí měsíc"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">{monthLabel}</span>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  className="rounded-full p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Následující měsíc"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 px-2.5 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 p-2.5">
            {calendarCells.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="min-h-[60px] rounded-xl border border-transparent" aria-hidden="true" />
              }

              const isoDate = toIsoDateLocal(date)
              const events = eventsByDate[isoDate] ?? []
              const isSelected = isoDate === selectedDate
              const isToday = sameDay(date, today)

              return (
                <button
                  key={isoDate}
                  type="button"
                  onClick={() => {
                    setSelectedDate(isoDate)
                    const firstEventId = eventsByDate[isoDate]?.[0]?.id
                    if (!firstEventId) return
                    setSelectedEventByDate((previous) => ({ ...previous, [isoDate]: firstEventId }))
                  }}
                  className={[
                    'home-calendar-day min-h-[60px] rounded-xl border p-1.5 text-left transition',
                    events.length > 0 ? 'border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/70' : 'border-slate-200 bg-white hover:bg-slate-50',
                    isSelected ? 'ring-2 ring-indigo-400 ring-offset-1' : '',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className={['text-xs font-bold', isToday ? 'text-indigo-700' : 'text-slate-800'].join(' ')}>{date.getDate()}</span>
                    {events.length > 0 ? <span className="h-2 w-2 rounded-full bg-indigo-500" /> : null}
                  </div>
                  <div className="mt-1.5 space-y-1">
                    {events.slice(0, 1).map((event) => (
                      <p key={event.id} className="line-clamp-2 text-[9px] font-semibold leading-tight text-slate-700">
                        {event.title}
                      </p>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="h-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Detail vybraného dne</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">
              {formatFullDate(selectedDate)}
            </h3>
          </div>

          <div className="p-5">
            {activeEvent ? (
              <article className="space-y-4">
                {selectedEvents.length > 1 ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Události v tento den</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedEvents.map((event) => {
                        const isActive = activeEvent.id === event.id
                        return (
                          <button
                            key={event.id}
                            type="button"
                            onClick={() => {
                              setSelectedEventByDate((previous) => ({ ...previous, [selectedDate]: event.id }))
                            }}
                            className={[
                              'rounded-full border px-3 py-1 text-xs font-semibold transition',
                              isActive
                                ? 'border-indigo-300 bg-indigo-100 text-indigo-800'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50',
                            ].join(' ')}
                          >
                            {event.title}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-2">
                  <span className={[
                    'inline-flex rounded-full border px-3 py-1 text-xs font-semibold',
                    categoryStyles[activeEvent.category],
                  ].join(' ')}>
                    {activeEvent.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {activeEvent.host}
                  </span>
                </div>

                <div>
                  <h4 className="text-2xl font-bold leading-tight text-slate-900">
                    <Link
                      to={`/planovac-akci?eventId=${encodeURIComponent(activeEvent.id)}`}
                      className="rounded-md transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                    >
                      {activeEvent.title}
                    </Link>
                  </h4>
                  <p className="mt-1 text-xs font-semibold text-indigo-700">
                    Klikněte na název události pro detail v menu Události a akce.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{activeEvent.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Čas</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Clock3 className="h-4 w-4 text-indigo-600" />
                      {activeEvent.startTime} - {activeEvent.endTime}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Místo</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                      {activeEvent.location}
                    </p>
                  </div>
                </div>
              </article>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 text-sm font-semibold text-slate-700">V tento den není zapsaná akce</p>
                <p className="mt-1 text-sm text-slate-500">Klikněte na jiný den s modrým bodem.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="h-full overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nadcházející</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">Nadcházející události</h3>
          </div>

          <div className="max-h-[330px] space-y-2 overflow-y-auto p-4">
            {upcomingEvents.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => {
                  const eventDate = new Date(event.date)
                  setViewedMonth(startOfMonth(eventDate))
                  setSelectedDate(event.date)
                  setSelectedEventByDate((previous) => ({ ...previous, [event.date]: event.id }))
                }}
                className={[
                  'w-full rounded-2xl border bg-white p-3 text-left transition',
                  selectedDate === event.date && selectedEventByDate[event.date] === event.id
                    ? 'border-indigo-300 bg-indigo-50/70 ring-2 ring-indigo-200'
                    : 'border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={[
                    'inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                    categoryStyles[event.category],
                  ].join(' ')}>
                    {event.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{formatDayLabel(new Date(event.date))}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-slate-900">{event.title}</p>
                <p className="mt-1 text-xs font-medium text-slate-600">{event.startTime} • {event.location}</p>
              </button>
            ))}
            {!upcomingEvents.length ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                Aktuálně nejsou evidované žádné nadcházející události.
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  )
}
