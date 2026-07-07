import { CalendarDays, Newspaper } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { aiNewsItems } from '../data/aiNews'

export function NewsDetailPage() {
  const { newsId } = useParams()
  const item = aiNewsItems.find((news) => news.id === newsId)

  if (!item) {
    return <Navigate to="/" replace />
  }

  const backTarget = item.linkType === 'project' && item.projectId
    ? `/projekty?projekt=${encodeURIComponent(item.projectId)}`
    : '/'

  return (
    <div className="space-y-6">
      <PageHeader
        title="Detail novinky"
        subtitle="Podrobnější informace k události AI akademie MGO."
        badge="Novinky"
        icon={Newspaper}
      />

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            {item.category}
          </span>
          <p className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
            {item.publishedAt}
          </p>
        </div>

        <h2 className="mt-4 text-2xl font-extrabold text-slate-900 md:text-3xl">{item.title}</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-700">{item.description}</p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Bližší informace</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {item.details.map((detail) => (
              <li key={detail}>• {detail}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to={backTarget}
            className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:bg-indigo-100"
          >
            {item.linkType === 'project' ? 'Otevřít navázaný projekt' : 'Zpět na novinky'}
          </Link>
        </div>
      </article>
    </div>
  )
}