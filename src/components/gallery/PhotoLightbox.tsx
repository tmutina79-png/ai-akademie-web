import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export type LightboxPhoto = {
  id: string
  title: string
  image: string
  eventTag: string
  date: string
  location: string
}

type PhotoLightboxProps = {
  photos: LightboxPhoto[]
  initialIndex: number
  onClose: () => void
}

export function PhotoLightbox({ photos, initialIndex, onClose }: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (!photos.length) return 0
    return Math.min(Math.max(initialIndex, 0), photos.length - 1)
  })

  const activePhoto = photos[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((previous) => (previous - 1 + photos.length) % photos.length)
  }

  const goToNext = () => {
    setCurrentIndex((previous) => (previous + 1) % photos.length)
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') {
        setCurrentIndex((previous) => (previous - 1 + photos.length) % photos.length)
      }
      if (event.key === 'ArrowRight') {
        setCurrentIndex((previous) => (previous + 1) % photos.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose, photos.length])

  if (!activePhoto) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-3 backdrop-blur-sm md:p-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Zavřít galerii"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 md:left-5"
        aria-label="Předchozí fotka"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 shadow-[0_26px_70px_rgba(15,23,42,0.55)]">
        <img
          src={activePhoto.image}
          alt={activePhoto.title}
          className="max-h-[68vh] w-full object-cover md:max-h-[74vh]"
        />
        <div className="space-y-1.5 p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-indigo-300/45 bg-indigo-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-indigo-100">
              {activePhoto.eventTag}
            </span>
            <span className="text-xs font-semibold text-slate-300">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
          <h3 className="text-base font-bold text-white md:text-lg">{activePhoto.title}</h3>
          <p className="text-xs text-slate-300 md:text-sm">
            {activePhoto.date} • {activePhoto.location}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20 md:right-5"
        aria-label="Další fotka"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}