import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AINewsFeed } from '../components/home/AINewsFeed'
import { HomeEventsCalendar } from '../components/home/HomeEventsCalendar'
import { HomeHero } from '../components/home/HomeHero'
import { HomePhotoGallery } from '../components/home/HomePhotoGallery'
import { HomeProjectsPreview } from '../components/home/HomeProjectsPreview'

export function HomePage() {
  const [showFundingModal, setShowFundingModal] = useState(true)

  useEffect(() => {
    if (!showFundingModal) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [showFundingModal])

  return (
    <>
      {showFundingModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/50 bg-[linear-gradient(145deg,#ffffff_0%,#f7faff_55%,#eef4ff_100%)] shadow-[0_28px_80px_rgba(15,23,42,0.32)]">
            <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-5rem] left-[-2rem] h-48 w-48 rounded-full bg-indigo-200/50 blur-3xl" />

            <button
              type="button"
              onClick={() => setShowFundingModal(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 transition hover:bg-white hover:text-slate-900"
              aria-label="Zavřít informační okno"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative grid gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">
                  Projekt AI akademie
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">
                  Tento projekt AI akademie je financován za podpory partnerů projektu.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
                  Děkujeme statutárnímu městu Ostrava a Moravskoslezskému kraji za podporu
                  rozvoje moderního AI vzdělávání na Matičním gymnáziu Ostrava.
                </p>
                <button
                  type="button"
                  onClick={() => setShowFundingModal(false)}
                  className="mt-6 inline-flex items-center rounded-full bg-indigo-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-600"
                >
                  Pokračovat na hlavní stránku
                </button>
              </div>

              <div className="grid content-center gap-4">
                <div className="partner-logo-frame flex h-28 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                  <img src="/ostrava-logo.png" alt="Ostrava" className="partner-logo-ostrava" />
                </div>
                <div className="partner-logo-frame flex h-28 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                  <img src="/msk-logo.png" alt="Moravskoslezský kraj" className="partner-logo-msk" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="space-y-14">
        <HomeHero />
        <HomeProjectsPreview />
        <HomePhotoGallery />
        <HomeEventsCalendar />
        <AINewsFeed />
      </div>

      {!showFundingModal ? (
        <aside className="pointer-events-none fixed right-0 top-[96px] z-40 hidden h-[calc(100vh-120px)] w-[min(96vw,1450px)] translate-x-full transition-transform duration-[875ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-0 focus-within:translate-x-0 xl:block">
          <div className="pointer-events-auto relative h-full rounded-l-2xl border border-slate-200 bg-white/98 p-4 shadow-[-18px_0_45px_rgba(15,23,42,0.16)] backdrop-blur">
            <button
              type="button"
              className="absolute left-[-40px] top-10 inline-flex h-40 w-10 items-center justify-center rounded-l-2xl border border-r-0 border-indigo-600 bg-indigo-600 px-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[-8px_10px_18px_rgba(49,46,129,0.35)] [text-orientation:mixed] [writing-mode:vertical-rl]"
              aria-label="Zobrazit kalendář akcí"
            >
              Kalendář
            </button>

            <div className="h-full overflow-y-auto pr-1">
              <HomeEventsCalendar />
            </div>
          </div>
        </aside>
      ) : null}

      {!showFundingModal ? (
        <aside className="pointer-events-none fixed right-0 top-[96px] z-50 hidden h-[calc(100vh-120px)] w-screen translate-x-full transition-transform duration-[875ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-0 focus-within:translate-x-0 xl:block">
          <div className="pointer-events-auto relative h-full w-full rounded-l-2xl border border-slate-200 bg-white/98 p-6 shadow-[-18px_0_45px_rgba(15,23,42,0.16)] backdrop-blur">
            <button
              type="button"
              className="absolute left-[-40px] top-[280px] inline-flex h-40 w-10 items-center justify-center rounded-l-2xl border border-r-0 border-sky-600 bg-sky-600 px-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[-8px_10px_18px_rgba(3,105,161,0.35)] [text-orientation:mixed] [writing-mode:vertical-rl]"
              aria-label="Zobrazit novinky"
            >
              Novinky
            </button>

            <div className="h-full overflow-y-auto pr-1">
              <AINewsFeed />
            </div>
          </div>
        </aside>
      ) : null}
    </>
  )
}
