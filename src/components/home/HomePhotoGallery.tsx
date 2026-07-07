import { Images } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PhotoLightbox } from '../gallery/PhotoLightbox'
import { homeGalleryPhotos } from '../../data/homeGallery'

const GALLERY_ITEMS_COUNT = 7

const CZ_MONTHS: Record<string, number> = {
  ledna: 0,
  unora: 1,
  března: 2,
  brezna: 2,
  dubna: 3,
  kvetna: 4,
  května: 4,
  cervna: 5,
  června: 5,
  cervence: 6,
  července: 6,
  srpna: 7,
  zari: 8,
  září: 8,
  rijna: 9,
  října: 9,
  listopadu: 10,
  prosince: 11,
}

function parseCzDate(date: string) {
  const normalized = date.toLowerCase().replace('.', '').trim()
  const parts = normalized.split(/\s+/)
  if (parts.length < 3) return new Date(0)
  const day = Number(parts[0])
  const month = CZ_MONTHS[parts[1]]
  const year = Number(parts[2])
  if (Number.isNaN(day) || Number.isNaN(year) || month === undefined) return new Date(0)
  return new Date(year, month, day)
}

export function HomePhotoGallery() {
  const [lightboxState, setLightboxState] = useState<{ photos: typeof homeGalleryPhotos; index: number } | null>(null)

  const latestThreeEventTags = useMemo(() => {
    const latestByTag = new Map<string, Date>()

    homeGalleryPhotos.forEach((item) => {
      const parsedDate = parseCzDate(item.date)
      const current = latestByTag.get(item.eventTag)
      if (!current || parsedDate > current) {
        latestByTag.set(item.eventTag, parsedDate)
      }
    })

    return Array.from(latestByTag.entries())
      .sort((left, right) => right[1].getTime() - left[1].getTime())
      .slice(0, 3)
      .map((item) => item[0])
  }, [])

  const latestPhotos = useMemo(() => {
    return homeGalleryPhotos
      .filter((item) => latestThreeEventTags.includes(item.eventTag))
      .sort((left, right) => parseCzDate(right.date).getTime() - parseCzDate(left.date).getTime())
      .slice(0, GALLERY_ITEMS_COUNT)
  }, [latestThreeEventTags])

  const featuredPhoto = latestPhotos[0] ?? null
  const rightColumnPhotos = latestPhotos.slice(1)

  const openLightboxForPhoto = (photoId: string) => {
    const clickedPhoto = homeGalleryPhotos.find((photo) => photo.id === photoId)
    if (!clickedPhoto) return

    const photosFromSameEvent = homeGalleryPhotos.filter((photo) => photo.eventTag === clickedPhoto.eventTag)
    const index = photosFromSameEvent.findIndex((photo) => photo.id === photoId)
    if (index === -1) return
    setLightboxState({ photos: photosFromSameEvent, index })
  }

  return (
    <section className="teams-shell space-y-5">
      <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(130deg,#f8fafc_0%,#eef2ff_52%,#ecfeff_100%)] p-6 shadow-[0_12px_32px_rgba(15,23,42,0.08)] md:p-7">
        <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-indigo-200/70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-4rem] left-[-3rem] h-36 w-36 rounded-full bg-cyan-200/60 blur-3xl" />

        <div className="relative">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
            <Images className="h-6 w-6 text-indigo-700" />
            Fotogalerie
          </h2>
        </div>
      </div>

      {featuredPhoto ? (
        <div className="grid gap-4 xl:grid-cols-[1fr_1.6fr]">
          <button
            type="button"
            onClick={() => openLightboxForPhoto(featuredPhoto.id)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_10px_28px_rgba(15,23,42,0.12)] xl:h-full"
          >
            <img
              src={featuredPhoto.image}
              alt={featuredPhoto.title}
              className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[315px] xl:h-full"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent p-4 md:p-5">
              <h3 className="text-lg font-bold text-white md:text-xl">{featuredPhoto.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-slate-200">{featuredPhoto.description}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-100/90">
                {featuredPhoto.date} • {featuredPhoto.location}
              </p>
              <span className="absolute bottom-3 right-3 rounded-full border border-white/35 bg-slate-950/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                {featuredPhoto.eventTag}
              </span>
            </div>
          </button>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.08)] md:p-4">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {rightColumnPhotos.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightboxForPhoto(item.id)}
                  className="group relative overflow-hidden rounded-xl border border-slate-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[120px] w-full object-cover transition duration-300 group-hover:scale-[1.03] md:h-[140px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-2 py-2">
                    <p className="line-clamp-2 text-[10px] font-semibold text-white">{item.title}</p>
                    <span className="absolute bottom-1.5 right-1.5 rounded-full border border-white/35 bg-slate-950/55 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                      {item.eventTag}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {!latestPhotos.length ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
          Z posledních akcí zatím nejsou dostupné žádné fotografie.
        </div>
      ) : null}

      {lightboxState ? (
        <PhotoLightbox
          photos={lightboxState.photos}
          initialIndex={lightboxState.index}
          onClose={() => setLightboxState(null)}
        />
      ) : null}
    </section>
  )
}