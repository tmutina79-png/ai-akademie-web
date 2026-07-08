import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PhotoLightbox } from '../gallery/PhotoLightbox'
import { homeGalleryPhotos } from '../../data/homeGallery'

const MIXED_PHOTO_COUNT = 12
const RIGHT_COLUMN_PAGE_SIZE = 6

export function HomePhotoGallery() {
  const [lightboxState, setLightboxState] = useState<{ photos: typeof homeGalleryPhotos; index: number } | null>(null)
  const [rightColumnPage, setRightColumnPage] = useState(0)

  const eventTagsInSourceOrder = useMemo(
    () => Array.from(new Set(homeGalleryPhotos.map((photo) => photo.eventTag))),
    [],
  )

  const latestEventTag = eventTagsInSourceOrder[eventTagsInSourceOrder.length - 1] ?? null

  const latestEventPhotos = useMemo(() => {
    if (!latestEventTag) return [] as typeof homeGalleryPhotos
    return homeGalleryPhotos.filter((photo) => photo.eventTag === latestEventTag)
  }, [latestEventTag])

  const featuredPhoto = latestEventPhotos[0] ?? null

  const rightColumnPhotos = useMemo(() => {
    const latestWithoutFeatured = featuredPhoto
      ? latestEventPhotos.filter((photo) => photo.id !== featuredPhoto.id)
      : latestEventPhotos

    return latestWithoutFeatured.slice(0, MIXED_PHOTO_COUNT)
  }, [featuredPhoto, latestEventPhotos])

  const rightColumnPages = Math.max(1, Math.ceil(rightColumnPhotos.length / RIGHT_COLUMN_PAGE_SIZE))
  const currentRightPage = Math.min(rightColumnPage, rightColumnPages - 1)
  const visibleRightColumnPhotos = rightColumnPhotos.slice(
    currentRightPage * RIGHT_COLUMN_PAGE_SIZE,
    (currentRightPage + 1) * RIGHT_COLUMN_PAGE_SIZE,
  )
  const rightTopRowPhotos = visibleRightColumnPhotos.slice(0, 3)
  const rightBottomRowPhotos = visibleRightColumnPhotos.slice(3, 6)

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
        <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr]">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.12)] lg:h-full">
            <button
              type="button"
              onClick={() => openLightboxForPhoto(featuredPhoto.id)}
              className="group relative block h-full w-full text-left"
              aria-label={`Otevřít fotku: ${featuredPhoto.title}`}
            >
              <img
                src={featuredPhoto.image}
                alt={featuredPhoto.title}
                className="h-[240px] w-full bg-slate-100 object-contain p-1 transition duration-500 group-hover:scale-[1.02] md:h-[290px] lg:h-full"
                loading="lazy"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-transparent p-4 md:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200/95">
                  {featuredPhoto.date} • {featuredPhoto.location}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white md:text-xl">{featuredPhoto.eventTag}</h3>
              </div>
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.08)] md:p-4">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {rightTopRowPhotos.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightboxForPhoto(item.id)}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  aria-label={`Otevřít fotku: ${item.title}`}
                >
                  <div className="flex h-[120px] items-center justify-center bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_100%)] px-1.5 py-1.5 md:h-[140px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full rounded-sm object-contain transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>

            {rightColumnPages > 1 ? (
              <div className="my-2 flex items-center justify-center gap-8">
                <button
                  type="button"
                  onClick={() => setRightColumnPage((previous) => (previous - 1 + rightColumnPages) % rightColumnPages)}
                  className="inline-flex h-7 w-7 items-center justify-center text-slate-500 transition hover:text-indigo-700"
                  aria-label="Předchozí sada fotek"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setRightColumnPage((previous) => (previous + 1) % rightColumnPages)}
                  className="inline-flex h-7 w-7 items-center justify-center text-slate-500 transition hover:text-indigo-700"
                  aria-label="Další sada fotek"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : null}

            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {rightBottomRowPhotos.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightboxForPhoto(item.id)}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  aria-label={`Otevřít fotku: ${item.title}`}
                >
                  <div className="flex h-[120px] items-center justify-center bg-[linear-gradient(160deg,#f8fafc_0%,#eef2ff_100%)] px-1.5 py-1.5 md:h-[140px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full rounded-sm object-contain transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>

            {!rightColumnPhotos.length ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-xs text-slate-500">
                Pro poslední dvě akce zatím nejsou dostupné další fotografie.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {!latestEventPhotos.length ? (
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