import { CheckCircle2, ChevronLeft, ChevronRight, ExternalLink, GraduationCap, Info, X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import codingClubImage from '../assets/codingclub.jpeg'
import { PageHeader } from '../components/ui/PageHeader'
import { projects } from '../data/projects'

type SyllabusBlock = {
  id: string
  emoji: string
  name: string
  period: string
  accentBorder: string
  accentLabel: string
  accentContent: string
  miniprojektBorder: string
  miniprojektBg: string
  miniprojektText: string
  goal: string
  tools: string
  weeks: string[]
  miniprojekt: string
}

const syllabusBlocks: SyllabusBlock[] = [
  {
    id: 'podzim',
    emoji: '🍁',
    name: 'BLOK 1: PODZIM',
    period: 'Polovina září – Listopad',
    accentBorder: 'border-orange-200',
    accentLabel: 'text-orange-600',
    accentContent: 'text-orange-700',
    miniprojektBorder: 'border-orange-200',
    miniprojektBg: 'bg-orange-50',
    miniprojektText: 'text-orange-800',
    goal: 'Základy, textové a multimodální AI modely, efektivní promptování a generování 3D modelů na tabletech.',
    tools: 'iPady, výkonné PC, dataprojektor.',
    weeks: [
      'Týden 1: Úvod do světa AI a neuronových sítí (Quick, Draw!).',
      'Týden 2: Jak fungují velké jazykové modely (LLM).',
      'Týden 3–4: Prompt Engineering (role, kontext, Few-Shot, Chain-of-Thought).',
      'Týden 5: Kritické myšlení, halucinace AI a etika.',
      'Týden 6–7: Generování grafiky (Midjourney, DALL-E, Firefly) na iPadech.',
      'Týden 8–10: Generování a transformace skic do 3D modelů na tabletech, export pro 3D tisk (.STL/.OBJ).',
    ],
    miniprojekt: 'Virtuální muzeum 3D tisku.',
  },
  {
    id: 'zima',
    emoji: '❄️',
    name: 'BLOK 2: ZIMA',
    period: 'Prosinec – Polovina února',
    accentBorder: 'border-sky-200',
    accentLabel: 'text-sky-600',
    accentContent: 'text-sky-700',
    miniprojektBorder: 'border-sky-200',
    miniprojektBg: 'bg-sky-50',
    miniprojektText: 'text-sky-800',
    goal: 'AI jako osobní tutor, integrace do humanitních, jazykových a vědeckých předmětů.',
    tools: 'iPady.',
    weeks: [
      'Týden 11: AI jako hlasový konverzační partner v cizích jazycích na iPadech.',
      'Týden 12: Analýza, oprava gramatiky a stylistická oponentura vlastních slohů.',
      'Týden 13: Efektivní učení, tvorba výtahů a podkladů pro flashcards (Anki/Quizlet).',
      'Týden 14: AI detektiv – analýza a hledání rozporů v historických pramenech.',
      'Týden 15: Matematika a věda (AI jako osobní doučovatel vysvětlující postupy).',
      'Týden 16: Tvorba vědomostních kvízů a testů z pohledu učitele.',
      'Týden 17–18: Automatizace prezentací (Gamma App) a interaktivní myšlenkové mapy (Miro).',
      'Týden 19: Sestavení vlastního AI studijního toolkitu.',
    ],
    miniprojekt: 'Metodický balíček (taháky a kvízy) pro spolužáky.',
  },
  {
    id: 'jaro',
    emoji: '🌱',
    name: 'BLOK 3: JARO',
    period: 'Polovina února – Duben',
    accentBorder: 'border-emerald-200',
    accentLabel: 'text-emerald-600',
    accentContent: 'text-emerald-700',
    miniprojektBorder: 'border-emerald-200',
    miniprojektBg: 'bg-emerald-50',
    miniprojektText: 'text-emerald-800',
    goal: 'Programování s AI, vývoj webových aplikací pomocí slov (vibecoding) a tvorba školního chatbota.',
    tools: 'Výkonné PC (VS Code / Cursor / v0.dev), iPady na testování.',
    weeks: [
      'Týden 20: Úvod do Vibecodingu (programování pouze pomocí slov).',
      'Týden 21–22: Tvorba frontendové stránky přes AI nástroje (v0.dev), debugging a opravy chyb.',
      'Týden 23: Vývoj webové prezentace pro vystavení 3D modelů.',
      'Týden 24: Úvod do platforem pro custom chatboty (Flowise, Poe, Custom GPTs).',
      'Týden 25–26: Návrh architektury a krmení školního chatbota schválenými daty (RAG systém).',
      'Týden 27: Design uživatelského rozhraní chatovacího widgetu.',
      'Týden 28–29: Testování na iPadech, pokusy o jailbreaking a finální optimalizace chatbota.',
    ],
    miniprojekt: 'Školní AI průvodce pro prváky nasazený na webu.',
  },
  {
    id: 'zaver',
    emoji: '☀️',
    name: 'BLOK 4: ZÁVĚR',
    period: 'Květen – Polovina června',
    accentBorder: 'border-yellow-200',
    accentLabel: 'text-yellow-600',
    accentContent: 'text-yellow-700',
    miniprojektBorder: 'border-yellow-200',
    miniprojektBg: 'bg-yellow-50',
    miniprojektText: 'text-yellow-800',
    goal: 'AI v podnikání (Studentská firma), marketing, tvorba multimédií a obhajoba ročních projektů.',
    tools: 'Výkonné PC, iPady.',
    weeks: [
      'Týden 30: AI ve Studentské firmě (analýza trhu, byznys plán, MVP).',
      'Týden 31: Návrh marketingové kampaně, copywriting a reklamní vizuály.',
      'Týden 32: Tvorba AI audia a videa (Suno, Runway) pro reklamní spoty.',
      'Týden 33–35: Samostatná práce ve skupinách na finálních ročníkových projektech, trénink rétoriky s AI.',
      'Týden 36: Velké finále – AI Akademie Showcase (prezentace produktů za účasti VŠB-TUO).',
    ],
    miniprojekt: 'Pitch Deck pro investora (kompletní prezentace produktu včetně AI videa a rozvahy).',
  },
]

type StudentAcademyPageProps = {
  initialModel?: 'model1' | 'model2' | null
}

export function StudentAcademyPage({ initialModel = null }: StudentAcademyPageProps) {
  const navigate = useNavigate()
  const deliveredProjectsStripRef = useRef<HTMLDivElement | null>(null)
  const [activeSyllabusBlockId, setActiveSyllabusBlockId] = useState<string | null>(null)
  const [selectedSyllabusBlockId, setSelectedSyllabusBlockId] = useState<string>(syllabusBlocks[0]?.id ?? '')
  const [activeSyllabusLessonId, setActiveSyllabusLessonId] = useState<string>('')
  const [completedSyllabusLessonIds, setCompletedSyllabusLessonIds] = useState<string[]>([])
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const selectedModel = initialModel

  const selectedSyllabusBlock = useMemo(
    () => syllabusBlocks.find((block) => block.id === selectedSyllabusBlockId) ?? syllabusBlocks[0],
    [selectedSyllabusBlockId],
  )

  const syllabusLessonsForSelectedBlock = useMemo(() => {
    if (!selectedSyllabusBlock) return []

    return selectedSyllabusBlock.weeks.map((week, index) => {
      const [rawWeek, ...rest] = week.split(':')
      return {
        id: `${selectedSyllabusBlock.id}-lesson-${index + 1}`,
        weekLabel: rawWeek.trim(),
        title: rest.join(':').trim() || week,
        summary: `${selectedSyllabusBlock.goal} (${selectedSyllabusBlock.tools})`,
        task: selectedSyllabusBlock.miniprojekt,
      }
    })
  }, [selectedSyllabusBlock])

  const activeSyllabusLesson = useMemo(
    () => syllabusLessonsForSelectedBlock.find((lesson) => lesson.id === activeSyllabusLessonId) ?? syllabusLessonsForSelectedBlock[0],
    [syllabusLessonsForSelectedBlock, activeSyllabusLessonId],
  )

  const getInitialSyllabusLessonIdForBlock = (blockId: string) => {
    const block = syllabusBlocks.find((item) => item.id === blockId)
    if (!block || block.weeks.length === 0) return ''

    const firstIncompleteIndex = block.weeks.findIndex((_, index) => {
      const lessonId = `${block.id}-lesson-${index + 1}`
      return !completedSyllabusLessonIds.includes(lessonId)
    })

    if (firstIncompleteIndex === -1) {
      return `${block.id}-lesson-${block.weeks.length}`
    }

    return `${block.id}-lesson-${firstIncompleteIndex + 1}`
  }

  const selectSyllabusBlock = (blockId: string) => {
    setSelectedSyllabusBlockId(blockId)
    setActiveSyllabusLessonId(getInitialSyllabusLessonIdForBlock(blockId))
  }

  const markSyllabusLessonAsCompleted = () => {
    if (!activeSyllabusLesson) return

    setCompletedSyllabusLessonIds((previous) => {
      if (previous.includes(activeSyllabusLesson.id)) return previous
      return [...previous, activeSyllabusLesson.id]
    })

    const currentIndex = syllabusLessonsForSelectedBlock.findIndex((lesson) => lesson.id === activeSyllabusLesson.id)
    const nextLesson = syllabusLessonsForSelectedBlock[currentIndex + 1]
    if (!nextLesson) return

    setActiveSyllabusLessonId(nextLesson.id)
  }

  const activeSyllabusBlock = useMemo(
    () => syllabusBlocks.find((block) => block.id === activeSyllabusBlockId) ?? null,
    [activeSyllabusBlockId],
  )

  const deliveredProjects = useMemo(
    () => {
      const priorityByProjectId: Record<string, number> = {
        'web-ai-akademie': 1,
        'chatbot-mgo': 2,
        'web-olympiada-mgo': 3,
      }

      return projects
        .filter((project) => project.status.includes('Dokončeno') || project.status.includes('Běží'))
        .sort((left, right) => {
          const leftPriority = priorityByProjectId[left.id] ?? Number.MAX_SAFE_INTEGER
          const rightPriority = priorityByProjectId[right.id] ?? Number.MAX_SAFE_INTEGER
          return leftPriority - rightPriority
        })
    },
    [],
  )

  const scrollDeliveredProjects = (direction: 'left' | 'right') => {
    const strip = deliveredProjectsStripRef.current
    if (!strip) return
    const amount = Math.round(strip.clientWidth * 0.85)
    strip.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const productUrlByProjectId: Record<string, string> = {
    'chatbot-mgo': 'https://mgo.cz',
    'web-olympiada-mgo': 'https://skolni-nastenka.cz/olympiada',
    'web-ai-akademie': 'http://localhost:5175',
  }

  return (
    <div className="teams-shell">
      <PageHeader
        title={selectedModel === 'model2' ? 'AI Coding Club MGO' : 'AI akdemie MGO'}
        subtitle={selectedModel === 'model2' ? (
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-slate-900 md:text-xl">Co je AI Coding Club MGO</h3>
            <p>
              <strong>AI Coding Club MGO je školní inovační klub zaměřený na programování a praktické využití umělé inteligence</strong>.
              V klubu studenti nepracují jen s teorií, ale tvoří skutečné digitální výstupy pro školu, testují nové nástroje a učí se,
              jak převádět nápady do funkčních projektů.
            </p>
            <p>
              Klub funguje jako otevřená platforma: můžeš se přidat k rozjetému týmu, přijít s vlastním řešením nebo využít sdílené
              know-how pro vlastní rozvoj. Na této stránce najdeš přehled bloků, cílů i technického zázemí, na kterém AI Coding Club MGO
              staví.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-slate-900 md:text-xl">Inovační projekt a platforma pro digitální budoucnost</h3>
            <p>
              <strong>AI akademie je dlouhodobý technologický projekt</strong>, který na naší škole vytváří prostor pro vývoj, inovace a
              praktické využití umělé inteligence. Nejedná se o klasickou výuku, ale o živou platformu, v jejímž centru stojí reálné
              projekty, týmová spolupráce a sdílení klíčového know-how.
            </p>
            <p>
              Na této stránce najdeš přehled aktuálních projektových bloků, technického zázemí a cílů, kterých chceme dosáhnout. AI
              akademie funguje na principu otevřených dveří: <strong>můžeš se aktivně zapojit do rozjetých projektů, přinést vlastní nápad,
              nebo platformu využít jako informační centrum a čerpat z ní důležité materiály pro svůj vlastní rozvoj.</strong>
            </p>
          </div>
        )}
        subtitleClassName="teams-subtitle w-full max-w-none text-justify"
        badge="Studentská zóna"
        icon={GraduationCap}
        headerAside={selectedModel === 'model2' ? (
          <div className="relative hidden min-h-[120px] w-[210px] items-center justify-center overflow-hidden rounded-xl border border-violet-200 bg-slate-950 p-2 md:flex">
            <img src={codingClubImage} alt="AI Coding Club MGO" className="max-h-full w-full object-contain" loading="lazy" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
          </div>
        ) : undefined}
        action={selectedModel === 'model2' ? (
          <button
            type="button"
            onClick={() => navigate('/akademie-zaci')}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Zpěn do AI akdemie
          </button>
        ) : undefined}
      />

      {selectedModel === 'model2' ? (
        <section className="relative rounded-2xl border border-violet-200 bg-white/90 p-4 shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">Výstupy klubu</p>
              <h3 className="mt-1 text-base font-extrabold text-slate-900">Co už jsme udělali</h3>
            </div>
            <div className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollDeliveredProjects('left')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
                aria-label="Posunout projekty doleva"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollDeliveredProjects('right')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
                aria-label="Posunout projekty doprava"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <Link
                to="/projekty"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Všechny projekty
              </Link>
            </div>
          </div>

          <div
            ref={deliveredProjectsStripRef}
            className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {deliveredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative min-w-[260px] overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/70 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(15,23,42,0.1)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-700">{project.status}</p>
                <h4 className="mt-1 text-sm font-bold leading-snug text-slate-900">{project.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{project.description}</p>

                <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-250 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-xl border border-white/80 bg-white/92 p-2 shadow-[0_14px_30px_rgba(15,23,42,0.2)] backdrop-blur">
                    <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">Rychlé akce</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <Link
                        to={`/projekty/${project.id}`}
                        className="pointer-events-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                      >
                        <Info className="h-3.5 w-3.5" />
                        Informace o realizaci
                      </Link>
                      <a
                        href={productUrlByProjectId[project.id] ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="pointer-events-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-2 text-[11px] font-semibold text-white transition hover:bg-violet-700"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Otevřít hotový produkt
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-sm md:p-6">

      {/* Modal bloku – Model 1 */}
      {activeSyllabusBlock ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 pt-12 backdrop-blur-sm">
          <div className={`relative w-full max-w-2xl overflow-hidden rounded-3xl border-2 ${activeSyllabusBlock.accentBorder} bg-white shadow-[0_28px_60px_rgba(15,23,42,0.2)]`}>
            <button
              type="button"
              onClick={() => setActiveSyllabusBlockId(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Zavřít"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="px-6 pt-6 pb-2">
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${activeSyllabusBlock.accentLabel}`}>{activeSyllabusBlock.period}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{activeSyllabusBlock.emoji} {activeSyllabusBlock.name}</h2>
            </div>
            <div className="space-y-4 px-6 pb-6 pt-4 text-sm text-slate-700">
              <div>
                <p><span className="font-semibold text-slate-900">Cíl:</span> {activeSyllabusBlock.goal}</p>
                <p className="mt-2"><span className="font-semibold text-slate-900">Technika:</span> {activeSyllabusBlock.tools}</p>
              </div>
              <div>
                <h4 className={`text-sm font-bold uppercase tracking-wide ${activeSyllabusBlock.accentContent}`}>Jaké lekce budou</h4>
                <ul className="mt-2 space-y-1.5">
                  {activeSyllabusBlock.weeks.map((week) => <li key={week} className="text-slate-700">• {week}</li>)}
                </ul>
              </div>
              <p className={`rounded-lg border ${activeSyllabusBlock.miniprojektBorder} ${activeSyllabusBlock.miniprojektBg} px-3 py-2 ${activeSyllabusBlock.miniprojektText}`}><span className="font-semibold">Miniprojekt:</span> {activeSyllabusBlock.miniprojekt}</p>
              <button
                type="button"
                onClick={() => {
                  selectSyllabusBlock(activeSyllabusBlock.id)
                  setActiveSyllabusBlockId(null)
                }}
                className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                Otevřít lekce tohoto bloku
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Výběr modelu */}
      {!selectedModel ? (
      <section className="grid items-stretch gap-4 lg:grid-cols-[7fr_3fr]">
        <button
          type="button"
          onClick={() => navigate('/akademie/codingclub')}
          className="group h-full w-full overflow-hidden rounded-2xl border border-violet-200 bg-white text-left shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(68,71,145,0.14)]"
        >
          <div className="grid items-stretch md:grid-cols-[1.25fr_0.75fr]">
            <div className="flex flex-col gap-1.5 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-4 md:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">CODE CLUB</p>
              <h3 className="text-lg leading-snug font-extrabold text-slate-900">AI Coding Club MGO</h3>
              <p className="text-sm leading-relaxed text-slate-600">Od promptování přes AI coding až po tvorbu reálných produktů pro školu.</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {['AI nástroje', 'Reálné projekty', 'Portfolio'].map((tag) => <span key={tag} className="rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">{tag}</span>)}
              </div>
              <p className="mt-auto pt-2 text-[11px] font-semibold text-violet-700 transition group-hover:translate-x-0.5">▶ Vstoupit do AI Coding Club MGO</p>
            </div>
            <div className="relative flex min-h-[150px] items-center justify-center overflow-hidden bg-slate-950 p-2">
              <img src={codingClubImage} alt="AI Coding Club MGO" className="max-h-full w-full object-contain" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/10 to-transparent" />
            </div>
          </div>
        </button>

        <aside className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] md:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">Přihlašovací formulář</p>
          <h3 className="mt-1 text-lg font-extrabold text-slate-900">Přihláška do AI Coding Club MGO</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">Vyplň formulář a ozveme se ti s dalšími kroky.</p>

          <form className="mt-4 flex h-[calc(100%-4.75rem)] flex-col gap-2.5">
            <input
              type="text"
              placeholder="Jméno a příjmení"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300"
            />
            <input
              type="text"
              placeholder="Třída"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300"
            />
            <input
              type="email"
              placeholder="Školní e-mail"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300"
            />
            <textarea
              rows={3}
              placeholder="Proč se chceš přihlásit?"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300"
            />
            <button
              type="button"
              onClick={() => setIsRegistrationModalOpen(true)}
              className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Odeslat přihlášku
            </button>
          </form>
        </aside>
      </section>
      ) : null}

      {selectedModel && selectedModel !== 'model2' ? (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate('/akademie-zaci')}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            ← Zpět na výběr modelu
          </button>
        </div>
      ) : null}

      {isRegistrationModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 pt-12 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-violet-200 bg-white shadow-[0_28px_60px_rgba(15,23,42,0.2)]">
            <button
              type="button"
              onClick={() => setIsRegistrationModalOpen(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Zavřít"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="px-6 pt-6 pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">Přihláška</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Přihláška do AI Coding Club MGO</h2>
            </div>
            <div className="space-y-4 px-6 pb-6 pt-4 text-sm text-slate-700">
              <p className="text-sm text-slate-600">Vyplň krátký formulář a ozveme se ti s dalšími kroky.</p>
              <div className="space-y-2.5">
                <input type="text" placeholder="Jméno a příjmení" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                <input type="text" placeholder="Třída" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                <input type="email" placeholder="Školní e-mail" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                <textarea rows={3} placeholder="Proč se chceš přihlásit?" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
              </div>
              <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-600">
                Odeslat přihlášku
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Model 1 obsah */}
      {selectedModel === 'model1' ? (
        <section id="zakladni-ai" className="space-y-4">
          <section id="sylabus-model1" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {syllabusBlocks.map((block) => (
              <button key={block.id} type="button" onClick={() => setActiveSyllabusBlockId(block.id)} className={[
                `group rounded-2xl border-2 ${block.accentBorder} bg-white p-5 text-left shadow-[0_4px_16px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.13)]`,
                selectedSyllabusBlockId === block.id ? 'ring-2 ring-indigo-200' : '',
              ].join(' ')}>
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${block.accentLabel}`}>{block.period}</p>
                <h3 className="mt-1 text-base font-bold text-slate-900">{block.emoji} {block.name}</h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">{block.goal}</p>
                <p className={`mt-3 text-xs font-semibold ${block.accentLabel}`}>Zobrazit detail bloku →</p>
              </button>
            ))}
          </section>

          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_16px_rgba(15,23,42,0.07)]">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Přepnout blok</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {syllabusBlocks.map((block) => {
                const isActive = selectedSyllabusBlockId === block.id
                return (
                  <button
                    key={`switch-${block.id}`}
                    type="button"
                    onClick={() => selectSyllabusBlock(block.id)}
                    className={[
                      'rounded-lg border px-3 py-2 text-sm font-semibold transition',
                      isActive
                        ? 'border-indigo-300 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/60',
                    ].join(' ')}
                  >
                    {block.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid items-start gap-5 xl:grid-cols-[1fr_320px]">
            <div className={`rounded-2xl border ${selectedSyllabusBlock.accentBorder} bg-white p-4 shadow-[0_10px_26px_rgba(15,23,42,0.12)] md:p-5`}>
              <h3 className="text-base font-bold text-slate-900">Pokyny k lekci</h3>
              <p className={`mt-1 text-xs font-semibold uppercase tracking-wide ${selectedSyllabusBlock.accentLabel}`}>{activeSyllabusLesson?.weekLabel} – {activeSyllabusLesson?.title}</p>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                <section><p className="font-semibold text-slate-900">Pojmenování tématu</p><p className="mt-1">{activeSyllabusLesson?.summary}</p></section>
                <section><p className="font-semibold text-slate-900">Důležité pojmy</p><ul className="mt-1 space-y-1"><li>• Základy práce s AI</li><li>• Kritické myšlení a ověřování</li><li>• Praktické využití ve škole</li></ul></section>
                <section><p className="font-semibold text-slate-900">Praktické ukázky</p><ul className="mt-1 space-y-1"><li>• Realizace úkolu podle zadání lekce.</li><li>• Tvorba výstupu pro výuku a spolužáky.</li></ul></section>
                <section><p className="font-semibold text-slate-900">Sekce pro video/a</p><ul className="mt-1 space-y-1"><li>• Ukázka nástroje a postupu z vybraného bloku.</li></ul></section>
                <section className="rounded-lg border border-amber-200 bg-amber-50 p-2.5"><p className="font-semibold text-amber-900">Závěrečný kvíz (povinné splnění)</p><p className="mt-1 text-amber-900">Krátký kontrolní test k lekci {activeSyllabusLesson?.weekLabel?.toLowerCase()}.</p></section>
                <section><p className="font-semibold text-slate-900">Vložený projekt</p><p className="mt-1">{activeSyllabusLesson?.task}</p></section>
                <button type="button" onClick={markSyllabusLessonAsCompleted} disabled={!activeSyllabusLesson || completedSyllabusLessonIds.includes(activeSyllabusLesson.id)} className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-default disabled:bg-emerald-600">
                  {!activeSyllabusLesson || completedSyllabusLessonIds.includes(activeSyllabusLesson.id) ? 'Lekce splněna' : 'Označit lekci jako splněnou a odemknout další'}
                </button>
              </div>
            </div>
            <aside className="space-y-4 xl:sticky xl:top-20">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.07)]">
                <h3 className="text-base font-bold text-slate-900">Lekce</h3>
                <p className="mt-1 text-xs text-slate-500">Mezi bloky můžete přepínat kdykoliv. Kliknutím na libovolnou lekci zobrazíte její pokyny vlevo.</p>
                <div className="mt-3 space-y-2">
                  {syllabusLessonsForSelectedBlock.map((lesson) => {
                    const completed = completedSyllabusLessonIds.includes(lesson.id)
                    const isActive = activeSyllabusLesson?.id === lesson.id
                    return (
                      <button key={lesson.id} type="button" onClick={() => setActiveSyllabusLessonId(lesson.id)} className={['flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition', isActive ? 'border-indigo-300 bg-indigo-50 text-indigo-900' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50'].join(' ')}>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{lesson.weekLabel}</p>
                          <p className="text-sm font-semibold">{lesson.title}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          {completed ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : null}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {/* Model 2 obsah */}
      {selectedModel === 'model2' ? (
        <section id="pokrocila-ai" className="space-y-4">
          <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-violet-300 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-5 shadow-[0_10px_26px_rgba(15,23,42,0.12)] md:p-6">
              <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-violet-200/40 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-cyan-200/40 blur-2xl" />
              <h2 className="relative text-xl font-extrabold text-slate-900">AI Coding Club MGO</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Vítej ve světě, kde technologie nepřijímáme pasivně, ale sami je utváříme. <span className="font-semibold">AI Akademie na Matičním gymnáziu v Ostravě</span> je exkluzivní program pro studenty, kteří chtějí vidět za roh digitální éry. Nejsme jen kroužek programování - jsme inovační lab, kde se z vizí stává realita.
              </p>

              <h3 className="mt-5 text-base font-bold text-slate-900">🚀 Co tě v AI Akademii čeká?</h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                <li><span className="font-semibold">Ovládneš umělou inteligenci na maximum:</span> Zapomeň na pouhé chatování. Naučíš se AI efektivně promptovat, integrovat do kódu a využívat ji jako ultimátního parťáka pro řešení komplexních problémů.</li>
                <li><span className="font-semibold">Kódování webů a aplikací:</span> Od prvních řádků kódu až po nasazení vlastních funkčních webových stránek a aplikací. Získáš hard skills, které hýbou dnešním světem.</li>
                <li><span className="font-semibold">Tvorba výukových materiálů nové generace:</span> Navrhneš a vytvoříš interaktivní pomůcky a materiály, které posunou styl učení na naší škole do 21. století.</li>
              </ul>

              <h3 className="mt-5 text-base font-bold text-slate-900">🏛️ Staň se architektem digitální tváře MGO</h3>
              <p className="mt-2 text-sm text-slate-700">Jako člen akademie nebudeš tvořit věci "do šuplíku". Tvoje práce bude mít reálný dopad na chod celé školy:</p>
              <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm leading-relaxed text-slate-700">
                <p><span className="font-semibold">Spoluvytvářej design Matičního gymnázia:</span> Tvoje nápady, grafika a kód dají tvář digitálním projektům školy.</p>
                <p className="mt-2"><span className="font-semibold">Podporuj své spolužáky:</span> Staneš se mentorem a ambasadorem technologií. Pomůžeš ostatním studentům zorientovat se ve světě AI a IT.</p>
                <p className="mt-2"><span className="font-semibold">Materiály pro učitele:</span> Navrhneš interaktivní prvky a nástroje, které učitelům usnadní a zatraktivní výuku.</p>
              </div>

              <h3 className="mt-5 text-base font-bold text-slate-900">Proč do toho jít?</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">Získáš obrovský náskok. Propojením programování a AI získáš dovednosti, které jsou dnes nejžádanější na trhu práce i prestižních univerzitách. Navíc zanecháš nesmazatelnou stopu v historii a designu MGO.</p>
              <p className="mt-3 text-sm font-bold text-slate-900">Máš nápad? Pojď ho s námi naprogramovat.</p>

            </div>

            <aside className="space-y-3">
              <form className="rounded-2xl border border-violet-200 bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,0.07)]">
                <h3 className="text-base font-bold text-slate-900">Přihláška do AI Coding Club MGO</h3>
                <p className="mt-1 text-xs text-slate-500">Vyplň krátký formulář a ozveme se ti s dalšími kroky.</p>
                <div className="mt-3 space-y-2.5">
                  <input type="text" placeholder="Jméno a příjmení" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                  <input type="text" placeholder="Třída" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                  <input type="email" placeholder="Školní e-mail" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                  <textarea rows={3} placeholder="Proč se chceš přihlásit?" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-violet-300" />
                </div>
                <button type="button" className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-600">
                  Odeslat přihlášku
                </button>
              </form>
            </aside>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 px-4 py-3 shadow-[0_6px_18px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold text-slate-700">Tematický plán můžeš otevřít kdykoliv z tohoto tlačítka:</p>
            <Link to="/akademie/codingclub/tematicky-plan" className="inline-flex items-center rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600">
              AI Coding Club MGO
            </Link>
          </div>

        </section>
      ) : null}

      </div>
    </div>
  )
}
