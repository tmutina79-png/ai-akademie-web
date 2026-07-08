import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PhotoLightbox } from '../components/gallery/PhotoLightbox'
import { PageHeader } from '../components/ui/PageHeader'
import { homeGalleryPhotos } from '../data/homeGallery'

const MIX_FILTER = 'Mix událostí'

export function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filterOptions = useMemo(() => {
    const uniqueEventTags = Array.from(new Set(homeGalleryPhotos.map((item) => item.eventTag)))
    return [MIX_FILTER, ...uniqueEventTags]
  }, [])

  const requestedFilter = searchParams.get('udalost') ?? MIX_FILTER
  const activeFilter = filterOptions.includes(requestedFilter) ? requestedFilter : MIX_FILTER

  const filteredPhotos = useMemo(() => {
    if (activeFilter === MIX_FILTER) return homeGalleryPhotos
    return homeGalleryPhotos.filter((item) => item.eventTag === activeFilter)
  }, [activeFilter])

  const eventOverviewCards = useMemo(() => {
    return filterOptions
      .filter((filter) => filter !== MIX_FILTER)
      .map((eventTag) => {
        const photos = homeGalleryPhotos.filter((item) => item.eventTag === eventTag)
        return {
          eventTag,
          cover: photos[0],
          count: photos.length,
        }
      })
  }, [filterOptions])

  const onSelectFilter = (filter: string) => {
    if (filter === MIX_FILTER) {
      setSearchParams({})
      return
    }
    setSearchParams({ udalost: filter })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fotogalerie AI MGO"
        subtitle=""
        badge="Média & události"
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)] md:p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onSelectFilter(MIX_FILTER)}
            className={[
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
              activeFilter === MIX_FILTER
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700',
            ].join(' ')}
          >
            Mix událostí
          </button>

          <label className="sr-only" htmlFor="gallery-event-filter">Vybrat událost</label>
          <select
            id="gallery-event-filter"
            value={activeFilter === MIX_FILTER ? '' : activeFilter}
            onChange={(event) => onSelectFilter(event.target.value || MIX_FILTER)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 pr-8 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Vyberte událost…</option>
            {filterOptions.filter((filter) => filter !== MIX_FILTER).map((filter) => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>

          {activeFilter !== MIX_FILTER ? (
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              Aktivní: {activeFilter}
            </span>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Události fotogalerie</h2>
          <Link
            to="/"
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Zpět na hlavní stránku
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {eventOverviewCards.map((eventCard) => (
            <Link
              key={eventCard.eventTag}
              to={`/fotogalerie/udalost/${encodeURIComponent(eventCard.eventTag)}`}
              className={[
                'group relative overflow-hidden rounded-2xl border text-left shadow-[0_8px_22px_rgba(15,23,42,0.1)] transition hover:-translate-y-0.5',
                activeFilter === eventCard.eventTag
                  ? 'border-indigo-300 ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-indigo-200',
              ].join(' ')}
            >
              {eventCard.cover ? (
                <div className="flex h-48 items-center justify-center bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_100%)] px-3 py-3">
                  <img
                    src={eventCard.cover.image}
                    alt={eventCard.eventTag}
                    className="max-h-full max-w-full rounded-lg object-contain transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-600">{eventCard.count} fotek</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo-700">Otevřít událost</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 md:text-xl">
          {activeFilter === MIX_FILTER ? 'Všechny fotografie' : `Fotografie události: ${activeFilter}`}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => {
                const index = filteredPhotos.findIndex((item) => item.id === photo.id)
                if (index === -1) return
                setLightboxIndex(index)
              }}
              className="group relative overflow-hidden rounded-xl border border-slate-200 text-left shadow-[0_6px_16px_rgba(15,23,42,0.1)]"
              aria-label={`Otevřít fotku: ${photo.title}`}
            >
              <div className="flex h-48 items-center justify-center bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_100%)] px-3 py-3">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="max-h-full max-w-full rounded-lg object-contain transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </div>

        {!filteredPhotos.length ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            Pro zvolenou událost zatím nejsou nahrané fotografie.
          </div>
        ) : null}
      </section>

      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={filteredPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  )
}