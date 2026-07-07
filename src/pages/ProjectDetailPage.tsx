import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Cpu,
  FileText,
  PlayCircle,
  Rocket,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { projects } from '../data/projects'

type SidebarCard = {
  eyebrow: string
  title: string
  items: string[]
  icon: LucideIcon
  toneClass: string
  linkLabel?: string
  linkHref?: string
}

type TimelinePhase = {
  id: string
  title: string
  period: string
  status: string
  statusClass: string
  dotClass: string
  dotIconClass: string
  icon: typeof CheckCircle2
  tasks: Array<{ heading: string; text: string; stepStatus: 'Ukončen' | 'Probíhá' }>
}

const stepStatusClass: Record<'Ukončen' | 'Probíhá', string> = {
  'Ukončen': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  'Probíhá': 'border-amber-200 bg-amber-50 text-amber-700',
}

const defaultSidebarCards: SidebarCard[] = [
  {
    eyebrow: 'Malý výstup 1',
    title: 'Rychlá statistika',
    items: ['Placeholder pro KPI nebo průběžný stav.'],
    icon: UserRound,
    toneClass: 'border-slate-200 bg-slate-50',
  },
  {
    eyebrow: 'Malý výstup 2',
    title: 'Stavový widget',
    items: ['Místo pro ikonu, progres nebo oznámení.'],
    icon: Cpu,
    toneClass: 'border-slate-200 bg-slate-50',
  },
  {
    eyebrow: 'Malý výstup 3',
    title: 'Poslední aktivita',
    items: ['Prostor pro stručné logy nebo poznámku týmu.'],
    icon: Rocket,
    toneClass: 'border-slate-200 bg-slate-50',
  },
]

const chatbotSidebarCards: SidebarCard[] = [
  {
    eyebrow: '1. Základní info',
    title: 'Chatbot MATY',
    items: [
      'Název projektu: Chatbot MATY',
      'Učitel: programování, žáci: UI design',
      'Projekt realizován pro Matiční gymnázium Ostrava',
    ],
    icon: UserRound,
    toneClass: 'border-indigo-200 bg-[linear-gradient(145deg,#eef2ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '2. Řízení verzí a stavu projektu',
    title: 'Základ změn projektu',
    items: [
      'Verze: 1.01',
      'Nasazeno: 05/2026',
      'Autor: Mutina Tomáš (učitel), žáci Oliver Turecký, Dan Pastrňák',
    ],
    icon: FileText,
    toneClass: 'border-violet-200 bg-[linear-gradient(145deg,#f5f3ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '3. Cíl a zadání',
    title: 'Zaměření projektu',
    items: [
      'Zjednodušení hledání informací na webových stránkách školy',
      'Vytvoření chatbota, který pomůže žákům a veřejnosti v orientaci na stránkách MGO',
    ],
    icon: Cpu,
    toneClass: 'border-sky-200 bg-[linear-gradient(145deg,#f0f9ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '4. Harmonogram a úkoly',
    title: 'Čas a financování',
    items: [
      'Předpokládané spuštění: duben-květen 2026',
      'Projekt je spolufinancován MSK',
      'Použitý HW: PC, iPady, dataprojektor',
      'Použitý SW: VS Code, GitHub, Claude AI',
    ],
    icon: Rocket,
    toneClass: 'border-slate-300 bg-[linear-gradient(145deg,#f8fafc_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '5. Průběh a výsledky',
    title: 'Shrnutí',
    items: [
      'Aktuálně: projekt běží a dále se rozvíjí (monitoring a optimalizace).',
      'Plánuje se: pokročilé nasazení na AI a hlubší integrace do celoškolního AI ekosystému.',
      'Naváže propojení s metodickými nástroji pro učitele i studenty.',
    ],
    icon: Clock3,
    toneClass: 'border-emerald-200 bg-[linear-gradient(145deg,#ecfdf5_0%,#ffffff_70%)]',
  },
]

const defaultTimelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'Fáze 1',
    period: 'Období / termín',
    status: 'Dokončená',
    statusClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotClass: 'border-emerald-500 bg-emerald-500',
    dotIconClass: 'text-white',
    icon: CheckCircle2,
    tasks: [
      { heading: 'Placeholder úkol 1', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Ukončen' },
      { heading: 'Placeholder úkol 2', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Ukončen' },
      { heading: 'Placeholder úkol 3', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Ukončen' },
    ],
  },
  {
    id: 'phase-2',
    title: 'Fáze 2',
    period: 'Období / termín',
    status: 'Aktivní / Probíhá',
    statusClass: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dotClass: 'border-indigo-500 bg-indigo-500 animate-pulse',
    dotIconClass: 'text-white',
    icon: PlayCircle,
    tasks: [
      { heading: 'Placeholder úkol 1', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Probíhá' },
      { heading: 'Placeholder úkol 2', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Probíhá' },
      { heading: 'Placeholder úkol 3', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Probíhá' },
    ],
  },
  {
    id: 'phase-3',
    title: 'Fáze 3',
    period: 'Období / termín',
    status: 'Naplánováno',
    statusClass: 'border-slate-200 bg-slate-100 text-slate-600',
    dotClass: 'border-slate-300 bg-white',
    dotIconClass: 'text-slate-400',
    icon: Clock3,
    tasks: [
      { heading: 'Placeholder úkol 1', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Probíhá' },
      { heading: 'Placeholder úkol 2', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Probíhá' },
      { heading: 'Placeholder úkol 3', text: 'Doplňte konkrétní položku fáze.', stepStatus: 'Probíhá' },
    ],
  },
]

const chatbotTimelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'FÁZE 1: REALIZACE CHATBOTA',
    period: 'Realizováno',
    status: 'HOTOVO',
    statusClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotClass: 'border-emerald-500 bg-emerald-500',
    dotIconClass: 'text-white',
    icon: CheckCircle2,
    tasks: [
      {
        heading: 'Průzkum možností a rešerše',
        text: 'Studenti zjišťovali technologické možnosti a za pomoci AI mapovali online prostředí jiných škol, zda a jak podobní chatboti v českém školství fungují.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Sběr požadavků uvnitř školy',
        text: 'Žáci zjistili u spolužáků a učitelů pomocí formulářů a dotazníků, co přesně by od chatbota potřebovali (suplování, jídelníček, kontakty).',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Vývoj a kódování',
        text: 'Za asistence a vedení učitele začalo samotné programování chatbota. Žáci doplňovali potřebné funkčnosti a ladili design uživatelského rozhraní (UI).',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Prezentace a nasazení',
        text: 'Hotový prototyp žáci odprezentovali řediteli MGO a následně s pomocí učitele úspěšně nasadili přímo na oficiální webové stránky školy.',
        stepStatus: 'Ukončen',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'FÁZE 2: ANALÝZA POUŽITÍ CHATBOTA',
    period: 'Aktuálně v běhu',
    status: 'AKTIVNÍ / PROBÍHÁ',
    statusClass: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dotClass: 'border-indigo-500 bg-indigo-500 animate-pulse',
    dotIconClass: 'text-white',
    icon: PlayCircle,
    tasks: [
      {
        heading: 'Analýza použití chatbota',
        text: 'Sleduje se, jak žáci, rodiče a veřejnost chatbota využívají v ostrém provozu, které dotazy jsou nejčastější a kde je prostor pro další vylepšení.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Vyhodnocení nejčastějších dotazů',
        text: 'Tým průběžně třídí a vyhodnocuje opakující se otázky, aby bylo možné zlepšit pokrytí odpovědí v klíčových tématech.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Optimalizace promptů a odpovědí',
        text: 'Na základě zjištěných dat se upravují systémové instrukce a prompty tak, aby chatbot odpovídal přesněji a konzistentněji.',
        stepStatus: 'Probíhá',
      },
    ],
  },
]

const olympiadSidebarCards: SidebarCard[] = [
  {
    eyebrow: '1. Základní info',
    title: 'Olympiáda MGO - online přihlášky',
    items: [
      'Název projektu: Webové stránky s možností online přihlášení na Olympiádu MGO',
      'Role týmu: učitel (architektura a integrace), žáci (UI, formulář, testování)',
      'Projekt realizován pro Matiční gymnázium Ostrava',
    ],
    icon: UserRound,
    toneClass: 'border-indigo-200 bg-[linear-gradient(145deg,#eef2ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '2. Řízení verzí a stavu projektu',
    title: 'Základ změn projektu',
    items: [
      'Verze: 1.02',
      'Stav: Projekt je realizován a dokončen',
      'Dokončeno: 06/2026',
    ],
    icon: FileText,
    toneClass: 'border-violet-200 bg-[linear-gradient(145deg,#f5f3ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '3. Cíl a zadání',
    title: 'Zaměření projektu',
    items: [
      'Zjednodušit registraci účastníků olympiády přes přehledný online formulář.',
      'Zautomatizovat sběr přihlášek a snížit chybovost ruční administrace.',
    ],
    icon: Cpu,
    toneClass: 'border-sky-200 bg-[linear-gradient(145deg,#f0f9ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '4. Harmonogram a úkoly',
    title: 'Čas a technologie',
    items: [
      'Analýza a návrh: dokončeno',
      'Implementace formuláře a validací: dokončeno',
      'Tvorba databáze pro evidenci přihlášek: dokončeno',
      'Ukládání dat z formuláře do databáze: nasazeno',
      'Nasazení produkční verze: dokončeno (06/2026)',
      'Použitý SW: VS Code, GitHub, Claude AI',
      'Použitý HW: PC, iPady, dataprojektor',
    ],
    icon: Rocket,
    toneClass: 'border-slate-300 bg-[linear-gradient(145deg,#f8fafc_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '5. Průběh a výsledky',
    title: 'Shrnutí',
    items: [
      'Projekt byl úspěšně dokončen v 06/2026.',
      'Pro příští školní rok se připravují úpravy funkcí a obsahu podle zpětné vazby.',
    ],
    icon: Clock3,
    toneClass: 'border-emerald-200 bg-[linear-gradient(145deg,#ecfdf5_0%,#ffffff_70%)]',
  },
]

const olympiadTimelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'FÁZE 1: NÁVRH A ARCHITEKTURA WEBU',
    period: 'Dokončeno',
    status: 'HOTOVO',
    statusClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotClass: 'border-emerald-500 bg-emerald-500',
    dotIconClass: 'text-white',
    icon: CheckCircle2,
    tasks: [
      {
        heading: 'Definice požadavků registrace',
        text: 'Byly určeny povinné údaje účastníků, pravidla validace a provozní scénáře registrace.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Návrh struktury stránky olympiády',
        text: 'Vznikla informační struktura webu včetně sekce pravidel, termínů a online přihlášky.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Příprava UX návrhu formuláře',
        text: 'Byla navržena uživatelská cesta vyplnění formuláře s důrazem na jednoduchost a přehlednost.',
        stepStatus: 'Ukončen',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'FÁZE 2: IMPLEMENTACE, TESTOVÁNÍ A NASAZENÍ',
    period: 'Dokončeno (06/2026)',
    status: 'HOTOVO',
    statusClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotClass: 'border-emerald-500 bg-emerald-500',
    dotIconClass: 'text-white',
    icon: CheckCircle2,
    tasks: [
      {
        heading: 'Vývoj formuláře online přihlášky',
        text: 'Implementuje se formulář s kontrolou vstupních dat a srozumitelnými validacemi.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Napojení workflow potvrzení registrace',
        text: 'Doplňuje se logika potvrzení o odeslání přihlášky a navazující informační kroky.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Tvorba databáze a ukládání dat',
        text: 'Byla vytvořena databáze pro registrace a formulář ukládá odeslaná data účastníků do databázové vrstvy.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Pilotní test použitelnosti',
        text: 'Tým připravuje testovací scénáře pro studenty a učitele před finálním nasazením.',
        stepStatus: 'Ukončen',
      },
    ],
  },
]

const academyWebSidebarCards: SidebarCard[] = [
  {
    eyebrow: '1. Základní info',
    title: 'Web AI akademie',
    items: [
      'Název projektu: Příprava webové stránky AI akademie',
      'Role týmu: učitel (koordinace), žáci (obsah, UX, testování)',
      'Cíl: centrální místo pro projekty, novinky, kalendář a fotogalerii',
    ],
    icon: UserRound,
    toneClass: 'border-indigo-200 bg-[linear-gradient(145deg,#eef2ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '2. Řízení verzí a stavu projektu',
    title: 'Základ změn projektu',
    items: [
      'Verze: 1.04',
      'Stav: Realizováno a nasazeno',
      'Dokončeno: 08/2026',
      'Aktuálně: příprava rozvojové verze pro další školní rok',
    ],
    icon: FileText,
    toneClass: 'border-violet-200 bg-[linear-gradient(145deg,#f5f3ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '3. Cíl a zadání',
    title: 'Zaměření projektu',
    items: [
      'Vytvořit přehledný web pro komunikaci aktivit AI akademie.',
      'Usnadnit orientaci žákům, učitelům i veřejnosti.',
    ],
    icon: Cpu,
    toneClass: 'border-sky-200 bg-[linear-gradient(145deg,#f0f9ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '4. Harmonogram a úkoly',
    title: 'Čas a technologie',
    items: [
      'Návrh struktury: 06/2026',
      'Implementace sekcí a obsahů: 07/2026',
      'Nasazení a ladění: 08/2026',
      'Použitý SW: VS Code, GitHub, Claude AI',
      'Použitý HW: PC, iPady, dataprojektor',
    ],
    icon: Rocket,
    toneClass: 'border-slate-300 bg-[linear-gradient(145deg,#f8fafc_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '5. Co ještě se chystá',
    title: 'Navazující rozvoj',
    items: [
      'Rozšíření sekce novinek a doplnění dalších projektových výstupů.',
      'Přidání online přihlášek na akce AI akademie.',
      'Vylepšení přístupnosti a responsivity pro všechny cílové skupiny.',
      'Průběžná optimalizace obsahu podle zpětné vazby.',
    ],
    icon: Clock3,
    toneClass: 'border-emerald-200 bg-[linear-gradient(145deg,#ecfdf5_0%,#ffffff_70%)]',
  },
]

const academyWebTimelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'FÁZE 1: NÁVRH STRUKTURY WEBU',
    period: '06/2026',
    status: 'HOTOVO',
    statusClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotClass: 'border-emerald-500 bg-emerald-500',
    dotIconClass: 'text-white',
    icon: CheckCircle2,
    tasks: [
      {
        heading: 'Definice informační architektury',
        text: 'Byla navržena struktura hlavních sekcí webu: projekty, novinky, kalendář, fotogalerie.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Návrh uživatelských toků',
        text: 'Byly připraveny scénáře, jak uživatelé najdou důležité informace co nejrychleji.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Příprava vizuálního konceptu',
        text: 'Tým definoval vizuální styl karet, sekcí a navigace napříč stránkou.',
        stepStatus: 'Ukončen',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'FÁZE 2: IMPLEMENTACE A NASAZENÍ',
    period: '07-08/2026',
    status: 'HOTOVO',
    statusClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    dotClass: 'border-emerald-500 bg-emerald-500',
    dotIconClass: 'text-white',
    icon: CheckCircle2,
    tasks: [
      {
        heading: 'Vývoj klíčových sekcí',
        text: 'Byly implementovány stránky a komponenty pro projekty, novinky, galerii a detailní pohledy.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Napojení dat a navigace',
        text: 'Byla nastavena datová vrstva a prolinkování mezi novinkami, projekty a detaily.',
        stepStatus: 'Ukončen',
      },
      {
        heading: 'Produkční nasazení webu',
        text: 'Web byl nasazen a ověřen v provozu jako centrální bod AI akademie.',
        stepStatus: 'Ukončen',
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'FÁZE 3: NAVAZUJÍCÍ ROZVOJ',
    period: 'Další školní rok',
    status: 'AKTIVNÍ / PROBÍHÁ',
    statusClass: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dotClass: 'border-indigo-500 bg-indigo-500 animate-pulse',
    dotIconClass: 'text-white',
    icon: PlayCircle,
    tasks: [
      {
        heading: 'Rozšíření funkčních modulů',
        text: 'Připravuje se rozšíření formulářových a administračních částí webu, včetně registrací na akce.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Obsahová aktualizace sekcí',
        text: 'Průběžně se doplňují nové projekty, novinky, plánované akce a ukázky výstupů.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'UX optimalizace podle zpětné vazby',
        text: 'Tým vyhodnocuje používání webu a navrhuje navazující úpravy rozhraní.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Příprava verze pro školní rok 2026/2027',
        text: 'Definují se priority rozvoje a harmonogram nasazení dalších funkcí.',
        stepStatus: 'Probíhá',
      },
    ],
  },
]

const onlineAcademySidebarCards: SidebarCard[] = [
  {
    eyebrow: '1. Základní info',
    title: 'Online AI akademie MGO',
    items: [
      'Název projektu: Online AI akademie pro všechny žáky MGO',
      'Role týmu: učitelé (metodika), žáci (pilotní testování), IT podpora (technické zajištění)',
      'Cíl: vytvořit dostupný online výukový prostor pro celé gymnázium',
    ],
    icon: UserRound,
    toneClass: 'border-indigo-200 bg-[linear-gradient(145deg,#eef2ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '2. Řízení verzí a stavu projektu',
    title: 'Stav přípravy projektu',
    items: [
      'Verze: 0.3 (přípravná)',
      'Stav: Připravuje se',
      'Plánované spuštění pilotu: 10/2026',
      'Aktuálně: tvorba osnovy a výběr technického řešení',
    ],
    icon: FileText,
    toneClass: 'border-violet-200 bg-[linear-gradient(145deg,#f5f3ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '3. Cíl a zadání',
    title: 'Zaměření projektu',
    items: [
      'Zpřístupnit AI vzdělávání všem třídám MGO v online formě.',
      'Připravit cestu od základů až po pokročilejší práci s AI nástroji.',
    ],
    icon: Cpu,
    toneClass: 'border-sky-200 bg-[linear-gradient(145deg,#f0f9ff_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '4. Harmonogram a úkoly',
    title: 'Čas a technologie',
    items: [
      'Návrh kurikula: 09/2026',
      'Pilotní modul a testování: 10-11/2026',
      'Příprava širšího spuštění: 12/2026',
      'Použitý SW: VS Code, GitHub, AI nástroje, LMS platforma',
      'Použitý HW: školní PC, iPady, domácí zařízení žáků',
    ],
    icon: Rocket,
    toneClass: 'border-slate-300 bg-[linear-gradient(145deg,#f8fafc_0%,#ffffff_70%)]',
  },
  {
    eyebrow: '5. Co ještě se chystá',
    title: 'Navazující rozvoj',
    items: [
      'Doplnění modulů podle ročníků a úrovně dovedností.',
      'Napojení na projektové výzvy a studentské portfolio.',
      'Pravidelné vyhodnocování zapojení a dopadů výuky.',
    ],
    icon: Clock3,
    toneClass: 'border-emerald-200 bg-[linear-gradient(145deg,#ecfdf5_0%,#ffffff_70%)]',
  },
]

const onlineAcademyTimelinePhases: TimelinePhase[] = [
  {
    id: 'phase-1',
    title: 'FÁZE 1: NÁVRH ONLINE AKADEMIE',
    period: '09/2026',
    status: 'PROBÍHÁ',
    statusClass: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    dotClass: 'border-indigo-500 bg-indigo-500 animate-pulse',
    dotIconClass: 'text-white',
    icon: PlayCircle,
    tasks: [
      {
        heading: 'Definice osnovy a vzdělávacích cílů',
        text: 'Vzniká struktura lekcí od základního orientování v AI po pokročilejší praktické scénáře.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Návrh uživatelské cesty studenta',
        text: 'Tým připravuje přehledný průchod akademií včetně navigace a orientace v modulech.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Výběr nástrojů a technické platformy',
        text: 'Porovnávají se možnosti LMS, AI nástrojů a navazujících integračních prvků.',
        stepStatus: 'Probíhá',
      },
    ],
  },
  {
    id: 'phase-2',
    title: 'FÁZE 2: PILOTNÍ NASAZENÍ',
    period: '10-11/2026',
    status: 'PLÁNOVÁNO',
    statusClass: 'border-amber-200 bg-amber-50 text-amber-700',
    dotClass: 'border-amber-500 bg-amber-500',
    dotIconClass: 'text-white',
    icon: Clock3,
    tasks: [
      {
        heading: 'Spuštění pilotního modulu',
        text: 'Připraví se první výukový blok pro ověření použitelnosti a studijní zátěže.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Sběr zpětné vazby od žáků a učitelů',
        text: 'Budou vyhodnoceny připomínky k obsahu, tempu i srozumitelnosti jednotlivých aktivit.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Úpravy kurikula podle pilotu',
        text: 'Výsledky pilotu se promítnou do struktury dalších lekcí a projektových úloh.',
        stepStatus: 'Probíhá',
      },
    ],
  },
  {
    id: 'phase-3',
    title: 'FÁZE 3: ROZŠÍŘENÉ SPUŠTĚNÍ',
    period: '12/2026 a dále',
    status: 'PLÁNOVÁNO',
    statusClass: 'border-slate-200 bg-slate-50 text-slate-700',
    dotClass: 'border-slate-400 bg-slate-400',
    dotIconClass: 'text-white',
    icon: Rocket,
    tasks: [
      {
        heading: 'Zařazení dalších ročníků',
        text: 'Akademie se rozšíří na širší skupiny studentů napříč gymnáziem.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Napojení na školní projektové výstupy',
        text: 'Studenti budou navazovat online moduly na konkrétní školní AI projekty.',
        stepStatus: 'Probíhá',
      },
      {
        heading: 'Pravidelná aktualizace obsahu',
        text: 'Obsah se bude průběžně aktualizovat podle nových trendů a školních potřeb.',
        stepStatus: 'Probíhá',
      },
    ],
  },
]

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return <Navigate to="/projekty" replace />
  }

  const ProjectIcon = project.icon
  const isChatbotProject = project.id === 'chatbot-mgo'
  const isOlympiadProject = project.id === 'web-olympiada-mgo'
  const isAcademyWebProject = project.id === 'web-ai-akademie'
  const isOnlineAcademyProject = project.id === 'online-ai-akademie-mgo'
  const sidebarCards = isChatbotProject
    ? chatbotSidebarCards
    : isOlympiadProject
      ? olympiadSidebarCards
      : isAcademyWebProject
        ? academyWebSidebarCards
        : isOnlineAcademyProject
          ? onlineAcademySidebarCards
      : defaultSidebarCards
  const timelinePhases = isChatbotProject
    ? chatbotTimelinePhases
    : isOlympiadProject
      ? olympiadTimelinePhases
      : isAcademyWebProject
        ? academyWebTimelinePhases
        : isOnlineAcademyProject
          ? onlineAcademyTimelinePhases
      : defaultTimelinePhases

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.title}
        subtitle="Detail projektu po rozkliknutí karty."
        badge="Realizace"
        icon={ProjectIcon}
      />

      <div className="grid gap-4 lg:grid-cols-[0.34fr_1fr]">
        <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <Link
            to="/projekty"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět na seznam projektů
          </Link>

          {sidebarCards.map((card) => {
            const CardIcon = card.icon
            return (
              <article key={card.eyebrow} className={[
                'rounded-2xl border p-4 shadow-[0_10px_20px_rgba(15,23,42,0.05)]',
                card.toneClass,
              ].join(' ')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{card.eyebrow}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">{card.title}</p>
                  </div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/80 bg-white text-slate-700 shadow-sm">
                    <CardIcon className="h-4 w-4" />
                  </span>
                </div>
                <ul className="mt-3 space-y-2.5">
                {card.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-slate-700">• {item}</li>
                ))}
                </ul>
                {card.linkLabel && card.linkHref ? (
                  <a
                    href={card.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    {card.linkLabel}
                  </a>
                ) : null}
              </article>
            )
          })}
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)] md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Časová osa realizace</h2>
              <p className="mt-1 text-sm text-slate-600">
                {isChatbotProject
                  ? 'Postup realizace školního chatbota Matyho od návrhu po aktuální kroky.'
                  : isOlympiadProject
                    ? 'Postup tvorby webu olympiády od návrhu po implementaci online přihlášení.'
                    : isAcademyWebProject
                      ? 'Fáze tvorby webové stránky AI akademie od návrhu po navazující rozvoj.'
                      : isOnlineAcademyProject
                        ? 'Přehled přípravy online AI akademie od návrhu kurikula po plánované širší spuštění.'
                  : 'Kostra pro kroky projektu bez konkrétních dat.'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              <CalendarDays className="h-3.5 w-3.5" />
              Přehled fází
            </span>
          </div>

          <ol className="relative space-y-5 before:absolute before:bottom-0 before:left-3 before:top-2 before:w-px before:bg-slate-200 md:space-y-6">
            {timelinePhases.map((phase) => {
              const PhaseIcon = phase.icon
              const allStepsCompleted = phase.tasks.every((task) => task.stepStatus === 'Ukončen')
              const completedStepsCount = phase.tasks.filter((task) => task.stepStatus === 'Ukončen').length
              return (
                <li key={phase.id} className="relative pl-10">
                  <span className={[
                    'absolute left-0 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2',
                    phase.dotClass,
                  ].join(' ')}>
                    <Circle className={['h-2.5 w-2.5', phase.dotIconClass].join(' ')} />
                  </span>

                  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{phase.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{phase.period}</p>
                      </div>
                      <span className={[
                        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold',
                        phase.statusClass,
                      ].join(' ')}>
                        <PhaseIcon className="h-3.5 w-3.5" />
                        {phase.status}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-medium text-slate-600">
                      {allStepsCompleted
                        ? 'Všechny kroky jsou hotové.'
                        : `Hotovo ${completedStepsCount}/${phase.tasks.length} kroků`}
                    </p>

                    <ol className="mt-3 space-y-3 text-sm text-slate-700">
                      {phase.tasks.map((task, index) => (
                        <li key={task.heading} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 leading-relaxed">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                              Krok {index + 1}
                            </span>
                            <span className={[
                              'ml-auto inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]',
                              stepStatusClass[task.stepStatus],
                            ].join(' ')}>
                              {task.stepStatus}
                            </span>
                          </div>
                          <p className="mt-1 font-semibold text-slate-800">{task.heading}</p>
                          <p className="mt-1 text-slate-700">{task.text}</p>
                        </li>
                      ))}
                    </ol>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    </div>
  )
}