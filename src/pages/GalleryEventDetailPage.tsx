import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PhotoLightbox } from '../components/gallery/PhotoLightbox'
import { PageHeader } from '../components/ui/PageHeader'
import { homeGalleryPhotos } from '../data/homeGallery'

export function GalleryEventDetailPage() {
  const { eventTag = '' } = useParams()
  const decodedEventTag = decodeURIComponent(eventTag)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const eventPhotos = useMemo(
    () => homeGalleryPhotos.filter((item) => item.eventTag === decodedEventTag),
    [decodedEventTag],
  )

  const subtitle = eventPhotos.length
    ? `Událost ${decodedEventTag} obsahuje ${eventPhotos.length} fotografií. Kliknutím na fotku otevřeš zvětšení a můžeš přecházet další snímky.`
    : 'Pro tuto událost zatím nejsou dostupné fotografie.'

  return (
    <div className="space-y-6">
      <PageHeader
        title={decodedEventTag || 'Detail události fotogalerie'}
        subtitle={subtitle}
        badge="Fotogalerie"
      />

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900 md:text-xl">Fotografie události</h2>
        <Link
          to={`/fotogalerie?udalost=${encodeURIComponent(decodedEventTag)}`}
          className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Zpět do fotogalerie
        </Link>
      </div>

      {eventPhotos.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {eventPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIndex(index)}
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
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
          Pro zvolenou událost zatím nejsou nahrané fotografie.
        </div>
      )}

      {lightboxIndex !== null ? (
        <PhotoLightbox
          photos={eventPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  )
}
