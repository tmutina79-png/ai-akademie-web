import { BookOpenCheck, FolderKanban, Layers3, Presentation, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'

export function TeacherAcademyPage() {
  return (
    <div className="teams-shell">
      <PageHeader
        title="Naše tvorba & Materiály"
        subtitle="Pracovní prostor pro učitele a tým AI akademie: sdílené výstupy, metodické podklady, prezentace a materiály připravené k okamžitému použití ve výuce."
        badge="Tvůrčí zóna"
        icon={Presentation}
      />

      <section className="teams-panel">
        <div className="teams-panel-head">
          <h2 className="teams-title text-xl md:text-2xl">Co tady najdeš</h2>
          <span className="teams-pill">Nástřel stránky</span>
        </div>
        <p className="teams-subtitle mt-2 max-w-4xl text-sm md:text-base">
          Sekce je navržená jako centrální knihovna obsahu: od rychlých materiálů do hodin po projektové šablony a výstupy, které vznikají v AI Coding Club MGO.
        </p>
      </section>

      <section className="teams-grid md:grid-cols-2 xl:grid-cols-4">
        <article className="teams-card">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
            <BookOpenCheck className="h-4 w-4" />
          </div>
          <h2 className="teams-title mt-3 text-base">Metodiky a scénáře hodin</h2>
          <p className="teams-subtitle mt-2 text-sm">Připravené osnovy, postupy a ověřené aktivity pro různé předměty a ročníky.</p>
        </article>

        <article className="teams-card">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
            <Layers3 className="h-4 w-4" />
          </div>
          <h2 className="teams-title mt-3 text-base">Šablony a pracovní listy</h2>
          <p className="teams-subtitle mt-2 text-sm">Praktické materiály do výuky: checklisty, rubriky hodnocení, šablony zadání a prompty.</p>
        </article>

        <article className="teams-card">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <FolderKanban className="h-4 w-4" />
          </div>
          <h2 className="teams-title mt-3 text-base">Výstupy projektů</h2>
          <p className="teams-subtitle mt-2 text-sm">Ukázky reálné tvorby: weby, prezentace, chatboty a další školní AI výstupy.</p>
        </article>

        <article className="teams-card">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="teams-title mt-3 text-base">Tipy a inspirace</h2>
          <p className="teams-subtitle mt-2 text-sm">Krátké návody, doporučené nástroje a osvědčené postupy pro efektivní AI workflow.</p>
        </article>
      </section>

      <section className="teams-panel">
        <div className="teams-panel-head">
          <h2 className="teams-title text-xl md:text-2xl">Doporučené další kroky</h2>
          <span className="teams-pill">Roadmap</span>
        </div>
        <ol className="mt-3 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
          <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">1. Dodat první balík materiálů do sekce Metodiky a scénáře hodin.</li>
          <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">2. Založit šablony pracovních listů podle jednotlivých předmětů.</li>
          <li className="rounded-xl border border-slate-200 bg-white px-4 py-3">3. Průběžně přidávat projektové výstupy z AI Coding Club MGO.</li>
        </ol>
      </section>
    </div>
  )
}
