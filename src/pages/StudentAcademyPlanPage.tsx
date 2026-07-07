import { GraduationCap, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'

type AdvancedModelBlock = {
  id: string
  emoji: string
  name: string
  accentBorder: string
  accentLabel: string
  whatYouLearn: string[]
  tools: string[]
  whatYouBuild: string[]
  outcomes: string[]
}

const advancedModelBlocks: AdvancedModelBlock[] = [
  {
    id: 'adv-foundations',
    emoji: '🧠',
    name: 'ZÁKLADY AI A PROMPTOVÁNÍ',
    accentBorder: 'border-violet-200',
    accentLabel: 'text-violet-600',
    whatYouLearn: [
      'Jak efektivně promptovat různé AI nástroje pro studium i tvorbu.',
      'Jak navrhnout jasné zadání, kontext a kritéria kvality výstupu.',
      'Jak bezpečně používat AI a ověřovat správnost odpovědí.',
    ],
    tools: ['ChatGPT / Claude / Copilot Chat', 'Perplexity', 'VS Code'],
    whatYouBuild: [
      'Sadu kvalitních promptů pro různé typy úloh.',
      'První AI-assisted mini výstupy pro školní potřeby.',
    ],
    outcomes: [
      'Budeš vědět, jak AI vést, ne jen jak se jí ptát.',
      'Získáš pevný základ pro tvorbu kódu pomocí AI.',
    ],
  },
  {
    id: 'adv-coding',
    emoji: '💻',
    name: 'TVORBA KÓDU POMOCÍ AI',
    accentBorder: 'border-blue-200',
    accentLabel: 'text-blue-600',
    whatYouLearn: [
      'Jak převést nápad na funkční kód s AI asistencí.',
      'Jak refaktorovat a ladit kód, který navrhne AI.',
      'Jak organizovat projekt a průběžně iterovat řešení.',
    ],
    tools: ['VS Code', 'GitHub Copilot', 'GitHub', 'JavaScript / TypeScript / Python'],
    whatYouBuild: [
      'Sérii krátkých funkčních mini projektů.',
      'Kódové šablony a komponenty pro další práci.',
    ],
    outcomes: [
      'Dokážeš samostatně postavit jednoduchou aplikaci od nápadu po výsledek.',
      'Získáš návyk na kvalitní AI-driven vývojový workflow.',
    ],
  },
  {
    id: 'adv-design-validation',
    emoji: '📊',
    name: 'INFORMAČNÍ DESIGN A VALIDACE NÁPADU',
    accentBorder: 'border-emerald-200',
    accentLabel: 'text-emerald-600',
    whatYouLearn: [
      'Jak pomocí principů informačního designu navrhnout srozumitelnou aplikaci.',
      'Jak zjistit, jestli by aplikace mohla mít úspěch u cílových uživatelů.',
      'Jak sbírat zpětnou vazbu a rozhodovat podle dat, ne pocitu.',
    ],
    tools: ['Figma / Miro', 'dotazníky a testovací scénáře', 'analytics základy', 'AI nástroje pro UX'],
    whatYouBuild: [
      'Návrh uživatelských toků a informační architektury aplikace.',
      'Prototyp a testovací verzi s měřitelnými cíli.',
    ],
    outcomes: [
      'Budeš umět obhájit, proč má projekt šanci na úspěch.',
      'Naučíš se řídit změny podle reálné uživatelské zkušenosti.',
    ],
  },
  {
    id: 'adv-project-studio',
    emoji: '🏗️',
    name: 'PROJEKTOVÉ STUDIO: OD MINI PROJEKTŮ K CELOROČNÍMU',
    accentBorder: 'border-amber-200',
    accentLabel: 'text-amber-600',
    whatYouLearn: [
      'Jak plánovat projekt ve fázích od krátkých úkolů po dlouhodobý produkt.',
      'Jak řídit týmovou spolupráci a rozdělení rolí.',
      'Jak dokončit a prezentovat projekt s reálným dopadem.',
    ],
    tools: ['VS Code', 'GitHub Projects', 'projektová dokumentace', 'prezentační nástroje'],
    whatYouBuild: [
      'Několik krátkých projektů pro rychlé ověření nápadů.',
      'Jeden celoroční projekt dovedený do funkční verze.',
    ],
    outcomes: [
      'Vytvoříš portfolio od mini řešení po velký týmový výstup.',
      'Odejdeš s konkrétním projektem, který může fungovat ve škole.',
    ],
  },
]

export function StudentAcademyPlanPage() {
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(null)

  const expandedBlock = useMemo(
    () => advancedModelBlocks.find((block) => block.id === expandedBlockId) ?? null,
    [expandedBlockId],
  )

  return (
    <div className="teams-shell">
      <PageHeader
        title="Tematický plán AI Coding Club MGO"
        subtitle="Program je rozdělen do 4 praktických bloků zaměřených na tvorbu reálných školních výstupů v AI Coding Club MGO."
        badge="Program"
        icon={GraduationCap}
      />

      <div className="mb-4">
        <Link
          to="/akademie/codingclub"
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          ← Zpět na AI Coding Club MGO
        </Link>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {advancedModelBlocks.map((block) => (
          <article key={block.id} className={`flex h-full flex-col rounded-2xl border-2 ${block.accentBorder} bg-white p-4 shadow-[0_6px_16px_rgba(15,23,42,0.08)]`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${block.accentLabel}`}>Blok programu</p>
            <h3 className="mt-1.5 text-sm font-extrabold leading-snug text-slate-900">{block.emoji} {block.name}</h3>

            <section className="mt-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Co se naučíš</p>
              <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
                {block.whatYouLearn.slice(0, 1).map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>

            <section className="mt-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">S čím budeš pracovat</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {block.tools.slice(0, 2).map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Na čem budeš pracovat</p>
              <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
                {block.whatYouBuild.slice(0, 1).map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>

            <button
              type="button"
              onClick={() => setExpandedBlockId(block.id)}
              className="mt-auto pt-3 inline-flex items-center justify-center rounded-lg border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-100"
            >
              Rozbalit detail bloku
            </button>
          </article>
        ))}
      </section>

      {expandedBlock ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 pt-10 backdrop-blur-sm">
          <div className={`relative w-full max-w-3xl rounded-3xl border-2 ${expandedBlock.accentBorder} bg-white p-6 shadow-[0_28px_60px_rgba(15,23,42,0.2)]`}>
            <button
              type="button"
              onClick={() => setExpandedBlockId(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Zavřít"
            >
              <X className="h-4 w-4" />
            </button>

            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${expandedBlock.accentLabel}`}>Blok programu</p>
            <h2 className="mt-2 pr-12 text-xl font-extrabold text-slate-900">{expandedBlock.emoji} {expandedBlock.name}</h2>

            <section className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Co se naučíš</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                {expandedBlock.whatYouLearn.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>

            <section className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">S čím budeš pracovat</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {expandedBlock.tools.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Na čem budeš pracovat</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                {expandedBlock.whatYouBuild.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>

            <section className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Výstup bloku</p>
              <ul className="mt-1.5 space-y-1 text-sm text-slate-700">
                {expandedBlock.outcomes.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </section>
          </div>
        </div>
      ) : null}
    </div>
  )
}
