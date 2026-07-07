import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type PageHeaderProps = {
  title: string
  subtitle: ReactNode
  subtitleClassName?: string
  badge: string
  icon?: LucideIcon
  action?: ReactNode
  headerAside?: ReactNode
}

export function PageHeader({ title, subtitle, subtitleClassName, badge, icon: Icon, action, headerAside }: PageHeaderProps) {
  return (
    <section
      className="teams-panel relative space-y-3 border-[#c7d2fe] shadow-[0_14px_32px_rgba(15,23,42,0.10)] ring-1 ring-[#dbeafe]"
      style={{
        background: 'linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)',
        borderColor: '#c7d2fe',
      }}
    >
      <div className={['teams-panel-head', headerAside ? 'pr-0 md:pr-[240px]' : ''].join(' ')}>
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-200 bg-white/80 text-indigo-700 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-slate-900 md:text-4xl">{title}</h1>
        </div>
        <div className="ml-auto flex items-start gap-3">
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-[0.72rem] font-bold text-indigo-700">
            {badge}
          </span>
        </div>
      </div>
      <div
        className={[
          subtitleClassName ?? 'max-w-4xl text-sm leading-relaxed md:text-base',
          headerAside ? 'pr-0 md:pr-[240px]' : '',
          '[&_h1]:!text-slate-900 [&_h2]:!text-slate-900 [&_h3]:!text-slate-900 [&_h4]:!text-slate-900 [&_p]:!text-slate-700 [&_strong]:!text-slate-900 [&_li]:!text-slate-700 [&_span]:!text-inherit',
        ].join(' ')}
        style={{ color: '#475569' }}
      >
        {subtitle}
      </div>
      {action ? <div className={['flex justify-end', headerAside ? 'pr-0 md:pr-[240px]' : ''].join(' ')}>{action}</div> : null}

      {headerAside ? (
        <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 md:block">
          {headerAside}
        </div>
      ) : null}
    </section>
  )
}
