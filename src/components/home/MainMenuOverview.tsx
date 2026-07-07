import {
  BookOpen,
  CalendarClock,
  Landmark,
  FolderKanban,
  LogIn,
  UserCog,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const menuItems = [
  {
    to: '/projekty',
    title: 'Projekty',
    description: 'Harmonogram dotačních i žákovských aktivit s postupem jednotlivých fází.',
    icon: FolderKanban,
    badge: 'Milníky',
  },
  {
    to: '/akademie-zaci',
    title: 'Akademie pro žáky',
    description: 'Ukázky prací, tematický plán a praktické výstupy studentů.',
    icon: Users,
    badge: 'Studentská sekce',
  },
  {
    to: '/akademie-ucitele',
    title: 'Akademie pro učitele',
    description: 'Metodiky výuky, přípravy hodin a sdílené AI scénáře do praxe.',
    icon: UserCog,
    badge: 'Pedagogická sekce',
  },
  {
    to: '/planovac-akci',
    title: 'Událost a akce',
    description: 'Karty událostí, detaily akcí a návazný týdenní kalendář.',
    icon: CalendarClock,
    badge: 'Kalendář',
  },
  {
    to: '/prihlaseni',
    title: 'Přihlášení',
    description: 'Vstupní bod pro žáky i učitele do jednotlivých částí platformy.',
    icon: LogIn,
    badge: 'Přístup',
  },
  {
    to: '/dotacni-projekty',
    title: 'Dotační projekty',
    description: 'Grantové aktivity a harmonogram projektu financovaného městem Ostrava.',
    icon: Landmark,
    badge: '6. blok',
  },
]

export function MainMenuOverview() {
  return (
    <section className="teams-shell">
      <div className="teams-grid md:grid-cols-2 xl:grid-cols-3">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.to} to={item.to} className="teams-card main-menu-card group block">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8ebfa] text-[#3b3f85] transition-colors duration-200 group-hover:bg-[#dfe4fb]">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="teams-pill">{item.badge}</span>
              </div>
              <h3 className="teams-title mt-2 text-base leading-snug">{item.title}</h3>
              <p className="teams-subtitle main-menu-card-desc mt-1 text-sm leading-snug">
                {item.description}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="teams-panel border-[#dbeafe] bg-[#eff6ff]">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#1e3a8a]">
          <BookOpen className="h-4 w-4" />
          Tip: Klikněte na libovolnou kartu a otevřete příslušnou sekci.
        </div>
      </div>
    </section>
  )
}
