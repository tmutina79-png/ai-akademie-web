import { AINewsFeed } from '../components/home/AINewsFeed'
import { HomeEventsCalendar } from '../components/home/HomeEventsCalendar'
import { HomeHero } from '../components/home/HomeHero'
import { HomePhotoGallery } from '../components/home/HomePhotoGallery'
import { HomeProjectsPreview } from '../components/home/HomeProjectsPreview'

export function HomePage() {
  return (
    <>
      <div className="space-y-14">
        <HomeHero />
        <HomeProjectsPreview />
        <HomePhotoGallery />
        <HomeEventsCalendar />
        <AINewsFeed />
      </div>

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

      <aside className="pointer-events-none fixed right-0 top-[96px] z-50 hidden h-[calc(100vh-120px)] w-screen translate-x-full transition-transform duration-[875ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-0 focus-within:translate-x-0 xl:block">
        <div className="pointer-events-auto relative h-full w-full rounded-l-2xl border border-slate-200 bg-white/98 p-6 shadow-[-18px_0_45px_rgba(15,23,42,0.16)] backdrop-blur">
          <button
            type="button"
            className="absolute left-[-40px] top-[260px] inline-flex h-40 w-10 items-center justify-center rounded-l-2xl border border-r-0 border-sky-600 bg-sky-600 px-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[-8px_10px_18px_rgba(3,105,161,0.35)] [text-orientation:mixed] [writing-mode:vertical-rl]"
            aria-label="Zobrazit novinky"
          >
            Novinky
          </button>

          <div className="h-full overflow-y-auto pr-1">
            <AINewsFeed />
          </div>
        </div>
      </aside>
    </>
  )
}
