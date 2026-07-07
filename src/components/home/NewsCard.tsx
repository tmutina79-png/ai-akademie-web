import { CalendarDays, ChevronRight, TrendingUp } from 'lucide-react'
import type { NewsItem } from '../../data/aiNews'

type NewsCardProps = {
  item: NewsItem
  featured?: boolean
}

const categoryClass: Record<NewsItem['category'], string> = {
  Spuštění: 'bg-indigo-600 text-white ring-indigo-500/40',
  Přihlášení: 'bg-sky-600 text-white ring-sky-500/40',
  Chatbot: 'bg-violet-600 text-white ring-violet-500/40',
  Materiály: 'bg-emerald-600 text-white ring-emerald-500/40',
}

export function NewsCard({ item, featured = false }: NewsCardProps) {
  return (
    <article
      className={[
        'group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]',
        featured
          ? 'min-h-[360px] p-6 shadow-[0_16px_36px_rgba(15,23,42,0.08)]'
          : 'p-5 shadow-[0_10px_26px_rgba(15,23,42,0.06)]',
      ].join(' ')}
    >
      <div className={[
        'pointer-events-none absolute inset-x-0 top-0 h-24 opacity-90',
        featured
          ? 'bg-[linear-gradient(135deg,#c7d2fe_0%,#dbeafe_40%,#eef2ff_100%)]'
          : 'bg-[linear-gradient(135deg,#f8fafc_0%,#e8eefc_100%)]',
      ].join(' ')} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(248,250,252,0.75)_100%)]" />
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={[
            'inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ring-1',
            categoryClass[item.category],
          ].join(' ')}
        >
          {item.category}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
          <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
          {item.trend}
        </span>
      </div>

      <div className="relative">
        <h3 className={[
          'mb-2 font-bold text-slate-900',
          featured ? 'max-w-xl text-[1.9rem] leading-[1.05] tracking-[-0.03em]' : 'text-lg leading-snug',
        ].join(' ')}>
          {item.title}
        </h3>
        <p className={[
          'text-slate-700',
          featured ? 'mb-8 max-w-xl text-base leading-relaxed' : 'mb-5 text-sm leading-relaxed',
        ].join(' ')}>
          {item.description}
        </p>
      </div>

      {featured ? (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Dopad na MGO</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Téma přímo navazuje na školní workshopy a metodiku AI akademie.
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Proč teď</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Pomáhá rychle filtrovat trendy, které se dají převést do výuky i projektů.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
            {item.source}
          </p>
          <p className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
            {item.publishedAt}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition group-hover:border-indigo-300 group-hover:bg-indigo-50 group-hover:text-indigo-700"
        >
          Zobrazit
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  )
}
