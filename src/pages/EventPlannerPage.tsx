import { CalendarClock, Camera, ChevronLeft, ChevronRight, MapPin, Users, Video } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PhotoLightbox, type LightboxPhoto } from '../components/gallery/PhotoLightbox'
import { homeEvents } from '../data/homeEvents'
import { PageHeader } from '../components/ui/PageHeader'
import { assetPath } from '../utils/assetPath'

const PHOTOS_PER_PAGE = 6
const MEDIA_PLACEHOLDER = 'Po uskutečnění události budou přidány fotky a videa.'

type SeasonFilter = 'all' | 'podzim' | 'zima' | 'jaro' | 'leto'

type ShowcaseEvent = {
  id: string
  title: string
  date: string
  timeRange: string
  location: string
  participants: string[]
  participantGroups?: {
    institutions: string[]
    teachers: string[]
    students: string[]
  }
  summary: string
  photos: string[]
  videoEmbedUrl?: string
}

const showcaseEvents: ShowcaseEvent[] = [
  {
    id: 'event-vibecoding-2026-03-24',
    title: 'Vibecoding pro vyšší gymnázium',
    date: '2026-03-24',
    timeRange: '09:00 - 12:30',
    location: 'Matiční gymnázium Ostrava',
    participants: ['Vyšší gymnázium MGO', 'Ing. Tomáš Mutina'],
    participantGroups: {
      institutions: ['Matiční gymnázium Ostrava'],
      teachers: ['Ing. Tomáš Mutina'],
      students: ['Žáci vyššího gymnázia'],
    },
    summary:
      'Workshop představil vibecoding jako praktický způsob tvorby aplikací s pomocí AI. Žáci si vyzkoušeli, jak formulovat zadání, generovat prototyp, ladit chyby a vybírat správné nástroje pro vývoj i dokumentaci. Proběhla i diskuse, co je vibecoding, kdy se hodí používat GitHub Copilot, ChatGPT, Claude nebo VS Code a jak výstupy AI bezpečně ověřovat.',
    photos: [
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-01.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-02.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-03.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-04.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-05.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-06.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-07.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-08.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-09.jpg'),
      assetPath('events/vibecoding-2026-03-24/vibecoding-2026-03-24-10.jpg'),
    ],
  },
  {
    id: 'event-zazitkove-odpoledne-robotika',
    title: 'Zážitkové odpoledne s programováním a robotikou',
    date: '2026-06-17',
    timeRange: '09:00 - 12:00',
    location: 'Základní škola Slezská Ostrava, Bohumínská 72, příspěvková organizace',
    participants: [
      'ZŠ Bohumínská Ostrava',
      'ZŠ ČSA Bohumín',
      'Matiční gymnázium Ostrava',
      'Ing. Tomáš Mutina',
      'Matěj Raško',
      'Eliáš Riedl',
      'Filip Gecík',
      'Jan Pastrňák',
      'Jakub Bajger',
    ],
    participantGroups: {
      institutions: ['ZŠ Bohumínská Ostrava', 'ZŠ ČSA Bohumín', 'Matiční gymnázium Ostrava'],
      teachers: ['Ing. Tomáš Mutina'],
      students: ['Matěj Raško', 'Eliáš Riedl', 'Filip Gecík', 'Jan Pastrňák', 'Jakub Bajger'],
    },
    summary:
      'Naši žáci z Matičního gymnázia Ostrava připravili pro žáky základních škol interaktivní dopoledne zaměřené na programování, AI, robotiku a práci s moderní digitální technikou.',
    photos: [
      assetPath('events/zazitkove-odpoledne/IMG_5388.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5390.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5391.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5392.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5393.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5394.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5408.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5409.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5410.JPG'),
      assetPath('events/zazitkove-odpoledne/IMG_5411.JPG'),
    ],
    videoEmbedUrl: assetPath('events/zazitkove-odpoledne/IMG_5396-muted.mp4'),
  },
]

function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function isLocalVideoFile(url: string) {
  return /\.(mp4|mov|webm)$/i.test(url)
}

function shuffleArray<T>(items: T[]) {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[randomIndex]] = [next[randomIndex], next[index]]
  }
  return next
}

function getSeasonFromDate(date: string): Exclude<SeasonFilter, 'all'> {
  const month = new Date(date).getMonth() + 1
  if (month >= 3 && month <= 5) return 'jaro'
  if (month >= 6 && month <= 8) return 'leto'
  if (month >= 9 && month <= 11) return 'podzim'
  return 'zima'
}

function isUpcomingEvent(date: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(date)
  eventDate.setHours(0, 0, 0, 0)
  return eventDate > today
}

export function EventPlannerPage() {
  const [searchParams] = useSearchParams()
  const requestedEventId = searchParams.get('eventId')
  const [selectedEventId, setSelectedEventId] = useState('')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [photoPage, setPhotoPage] = useState(0)
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all')
  const cardsStripRef = useRef<HTMLDivElement | null>(null)

  const calendarEventsAsShowcase = useMemo<ShowcaseEvent[]>(() => {
    return homeEvents.map((event) => ({
      id: `calendar-${event.id}`,
      title: event.title,
      date: event.date,
      timeRange: `${event.startTime} - ${event.endTime}`,
      location: event.location,
      participants: [event.host],
      summary: event.description,
      photos: [],
      videoEmbedUrl: '',
    }))
  }, [])

  const allEvents = useMemo(() => {
    const deduped = new Map<string, ShowcaseEvent>()

    calendarEventsAsShowcase.forEach((event) => {
      deduped.set(`${event.date}-${event.title.toLowerCase()}`, event)
    })

    showcaseEvents.forEach((event) => {
      deduped.set(`${event.date}-${event.title.toLowerCase()}`, event)
    })

    return Array.from(deduped.values()).sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime())
  }, [calendarEventsAsShowcase])

  const requestedEvent = useMemo(
    () => allEvents.find((event) => event.id === requestedEventId || event.id === `calendar-${requestedEventId}`),
    [allEvents, requestedEventId],
  )

  const effectiveSelectedEventId = selectedEventId || requestedEvent?.id || allEvents[0]?.id || ''

  const filteredEvents = useMemo(() => {
    if (seasonFilter === 'all') return allEvents
    return allEvents.filter((event) => getSeasonFromDate(event.date) === seasonFilter)
  }, [allEvents, seasonFilter])

  const selectedEvent = useMemo(
    () => filteredEvents.find((event) => event.id === effectiveSelectedEventId) ?? filteredEvents[0] ?? allEvents[0],
    [allEvents, effectiveSelectedEventId, filteredEvents],
  )

  const shuffledPhotosByEventId = useMemo(() => {
    return allEvents.reduce<Record<string, string[]>>((accumulator, event) => {
      accumulator[event.id] = shuffleArray(event.photos)
      return accumulator
    }, {})
  }, [allEvents])

  const selectedEventPhotos = shuffledPhotosByEventId[selectedEvent.id] ?? selectedEvent.photos

  const lightboxPhotos = useMemo<LightboxPhoto[]>(() => {
    return selectedEventPhotos.map((photo, index) => ({
      id: `${selectedEvent.id}-lightbox-${index}`,
      title: selectedEvent.title,
      image: photo,
      eventTag: selectedEvent.title,
      date: formatEventDate(selectedEvent.date),
      location: selectedEvent.location,
    }))
  }, [selectedEvent, selectedEventPhotos])

  const totalPhotoPages = Math.max(1, Math.ceil(selectedEventPhotos.length / PHOTOS_PER_PAGE))
  const currentPhotoPage = Math.min(photoPage, totalPhotoPages - 1)
  const photoStartIndex = currentPhotoPage * PHOTOS_PER_PAGE

  const visiblePhotos = useMemo(() => {
    return selectedEventPhotos.slice(photoStartIndex, photoStartIndex + PHOTOS_PER_PAGE)
  }, [photoStartIndex, selectedEventPhotos])

  const scrollCards = (direction: 'left' | 'right') => {
    const strip = cardsStripRef.current
    if (!strip) return
    const amount = Math.round(strip.clientWidth * 0.8)
    strip.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="teams-shell">
      <PageHeader
        title="Událost a akce"
        subtitle=""
        badge="Přehled událostí"
        icon={CalendarClock}
      />

      <section className="teams-panel">
        <div className="teams-panel-head">
          <h2 className="teams-title text-xl md:text-2xl">Akce AI akademie</h2>
          <span className="teams-pill">Klikni na kartu akce</span>
        </div>
        <p className="teams-subtitle mt-2 text-sm md:text-base">
          Události jsou řazeny zleva od nejstarší proběhlé po nejnovější. Filtrování podle sezóny pomůže rychle najít akce.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { key: 'all', label: `Vše (${allEvents.length})` },
            { key: 'podzim', label: 'Podzim' },
            { key: 'zima', label: 'Zima' },
            { key: 'jaro', label: 'Jaro' },
            { key: 'leto', label: 'Léto' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSeasonFilter(item.key as SeasonFilter)}
              className={[
                'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                seasonFilter === item.key
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <button
            type="button"
            onClick={() => scrollCards('left')}
            className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 md:inline-flex"
            aria-label="Posunout karty doleva"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards('right')}
            className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 md:inline-flex"
            aria-label="Posunout karty doprava"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={cardsStripRef}
            className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-10"
          >
          {filteredEvents.map((event) => {
            const isActive = effectiveSelectedEventId === event.id
            const isUpcoming = isUpcomingEvent(event.date)
            const cardStyle = isActive
              ? {
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)',
                  borderColor: '#a5b4fc',
                }
              : {
                  background: 'linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)',
                  borderColor: '#c7d2fe',
                }

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => {
                  setSelectedEventId(event.id)
                  setPhotoPage(0)
                }}
                style={cardStyle}
                className={[
                  'min-w-[290px] rounded-2xl border p-4 text-left shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition',
                  isActive
                    ? 'ring-2 ring-indigo-200'
                    : 'hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.10)]',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">{formatEventDate(event.date)}</p>
                  {isUpcoming ? (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                      Nadcházející
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 text-base font-bold text-slate-900">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{event.summary}</p>
              </button>
            )
          })}
          </div>
        </div>
        {!filteredEvents.length ? (
          <p className="mt-3 text-sm text-slate-500">Pro vybranou sezónu zatím nejsou evidované žádné akce.</p>
        ) : null}
      </section>

      {selectedEvent ? (
        <section className="teams-panel">
          <div className="teams-panel-head">
            <h2 className="teams-title text-xl md:text-2xl">{selectedEvent.title}</h2>
            <div className="flex items-center gap-2">
              <span className="teams-pill">Detail akce</span>
              {isUpcomingEvent(selectedEvent.date) ? (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                  Nadcházející
                </span>
              ) : null}
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{selectedEvent.summary}</p>

          <div className="mt-3 grid gap-4 lg:grid-cols-[0.9fr_0.9fr_1.2fr]">
            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Název události</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{selectedEvent.title}</p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Datum akce</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{formatEventDate(selectedEvent.date)}</p>
              <p className="mt-1 text-xs text-slate-600">{selectedEvent.timeRange}</p>
              <p className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                <MapPin className="h-3.5 w-3.5 text-indigo-600" />
                {selectedEvent.location}
              </p>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Kdo se účastnil</p>
              {selectedEvent.participantGroups ? (
                <div className="mt-2.5 space-y-2.5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Instituce</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {selectedEvent.participantGroups.institutions.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700">
                          <Users className="h-3 w-3" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Učitelé</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {selectedEvent.participantGroups.teachers.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                          <Users className="h-3 w-3" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Žáci</p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {selectedEvent.participantGroups.students.map((item) => (
                        <span key={item} className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
                          <Users className="h-3 w-3" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedEvent.participants.map((participant) => (
                    <span key={participant} className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      <Users className="h-3.5 w-3.5" />
                      {participant}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <Camera className="h-4 w-4 text-indigo-600" />
                  Fotky z akce
                </p>
                {totalPhotoPages > 1 ? (
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPhotoPage((previous) => (previous - 1 + totalPhotoPages) % totalPhotoPages)}
                      className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                    >
                      Předchozí
                    </button>
                    <span className="text-xs font-semibold text-slate-500">
                      {currentPhotoPage + 1} / {totalPhotoPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPhotoPage((previous) => (previous + 1) % totalPhotoPages)}
                      className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700"
                    >
                      Další
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="mt-3">
                {selectedEventPhotos.length ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {visiblePhotos.map((photo, index) => (
                      <button
                        key={`${selectedEvent.id}-photo-${photoStartIndex + index}`}
                        type="button"
                        onClick={() => setLightboxIndex(photoStartIndex + index)}
                        className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-left transition hover:shadow-[0_8px_20px_rgba(15,23,42,0.14)]"
                      >
                        <div className="flex h-48 items-center justify-center bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_100%)] px-2 py-2">
                          <img
                            src={photo}
                            alt={`${selectedEvent.title} - fotka ${index + 1}`}
                            className="max-h-full max-w-full rounded-md object-contain"
                            loading="lazy"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                    {MEDIA_PLACEHOLDER}
                  </div>
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <Video className="h-4 w-4 text-indigo-600" />
                Video z akce
              </p>
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                {selectedEvent.videoEmbedUrl ? isLocalVideoFile(selectedEvent.videoEmbedUrl) ? (
                  <video
                    src={selectedEvent.videoEmbedUrl}
                    poster={selectedEventPhotos[0]}
                    className="h-64 w-full bg-slate-100 object-contain"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <iframe
                    src={selectedEvent.videoEmbedUrl}
                    title={`${selectedEvent.title} - video`}
                    className="h-64 w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center px-4 text-center text-sm text-slate-600">
                    {MEDIA_PLACEHOLDER}
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={lightboxPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  )
}
