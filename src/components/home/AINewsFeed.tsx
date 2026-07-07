import { CalendarDays, Newspaper } from 'lucide-react'
import { Link } from 'react-router-dom'
import { aiNewsItems } from '../../data/aiNews'

const newsStatusClass = {
  'Proběhlo': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'Probíhá': 'border-amber-200 bg-amber-50 text-amber-700',
  'Připravuje se': 'border-sky-200 bg-sky-50 text-sky-700',
} as const

export function AINewsFeed() {
  const [featuredItem, ...otherItems] = aiNewsItems

  const getNewsTarget = (item: (typeof aiNewsItems)[number]) => {
    if (item.linkType === 'project' && item.projectId) {
      return `/projekty?projekt=${encodeURIComponent(item.projectId)}`
    }

    return `/novinky/${item.id}`
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
            <Newspaper className="h-6 w-6 text-indigo-700" />
            Novinky z AI akademie MGO
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Přehled nejbližší události a navazujících kroků projektu AI akademie.
          </p>
        </div>

        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
          Časová osa 2026
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Link
          to={getNewsTarget(featuredItem)}
          className="group relative block overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.1)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(15,23,42,0.14)]"
        >
          <div className="relative flex h-full flex-col">
            <div className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#eef2ff_0%,#dbeafe_100%)] px-5 pb-5 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Nejbližší novinky</p>
              <h3 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-950 line-clamp-2 md:text-[2.6rem]">
                {featuredItem.title}
              </h3>
            </div>

            <span className={[
              'mt-2 ml-auto inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em]',
              newsStatusClass[featuredItem.trend],
            ].join(' ')}>
              {featuredItem.trend}
            </span>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">
              {featuredItem.description}
            </p>

            {featuredItem.linkType === 'project' ? (
              <p className="mb-2 ml-auto mt-3 inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Projekt
              </p>
            ) : null}

            <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{featuredItem.source}</p>
              <p className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                {featuredItem.publishedAt}
              </p>
            </div>
          </div>
        </Link>

        <div className="grid gap-4 sm:grid-cols-2">
          {otherItems.map((item, index) => (
            <Link
              key={item.id}
              to={getNewsTarget(item)}
              className={[
                'group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_26px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_32px_rgba(15,23,42,0.11)]',
                index === 2 ? 'sm:col-span-2' : '',
              ].join(' ')}
            >
              <div className="relative flex h-full flex-col">
                <div className="rounded-[18px] bg-[linear-gradient(135deg,#eef2ff_0%,#dbeafe_100%)] px-4 pb-4 pt-4">
                  <h3 className="max-w-xl text-lg font-bold leading-snug text-slate-900">{item.title}</h3>
                </div>

                <span className={[
                  'mt-2 ml-auto inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-[0.08em]',
                  newsStatusClass[item.trend],
                ].join(' ')}>
                  {item.trend}
                </span>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2">{item.description}</p>

                {item.linkType === 'project' ? (
                  <p className="mb-2 ml-auto mt-3 inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Projekt
                  </p>
                ) : null}

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-200 pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{item.source}</p>
                  <p className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                    <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                    {item.publishedAt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
