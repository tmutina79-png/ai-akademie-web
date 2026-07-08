import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from '../ui/BrandMark'

const links = [
  { to: '/', label: 'Úvod' },
  { to: '/akademie-zaci', label: 'Akademie' },
  { to: '/projekty', label: 'Projekty' },
  { to: '/planovac-akci', label: 'Událost a akce' },
  { to: '/akademie-ucitele', label: 'Naše tvorba & Materiály' },
  { to: '/dotacni-projekty', label: 'Dotační projekty' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => {
    setMobileOpen(false)
  }

  const navigateMenuLink = (targetPath: string) => {
    closeMenu()

    const normalizedTargetPath = targetPath === '/' ? '/' : targetPath
    const targetHref = `${import.meta.env.BASE_URL}#${normalizedTargetPath}`
    const currentPath = location.pathname || '/'

    if (currentPath === normalizedTargetPath) {
      window.location.reload()
      return
    }

    window.location.assign(targetHref)
  }

  const getMenuButtonClass = (targetPath: string) => {
    const isActive =
      targetPath === '/'
        ? location.pathname === '/'
        : location.pathname === targetPath || location.pathname.startsWith(`${targetPath}/`)

    return [
      'relative border-b-2 border-transparent px-3 py-2 text-sm font-semibold transition-all',
      isActive
        ? 'border-indigo-700 text-indigo-700'
        : 'text-slate-600 hover:text-indigo-700',
    ].join(' ')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <button type="button" aria-label="Domů" onClick={() => navigateMenuLink('/')}>
          <BrandMark />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <button
              key={link.to}
              type="button"
              onClick={() => navigateMenuLink(link.to)}
              className={getMenuButtonClass(link.to)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/prihlaseni"
            className="hidden rounded-full bg-indigo-700 px-4 py-2 text-sm font-bold text-white transition-transform hover:translate-y-[-1px] hover:bg-indigo-600 lg:inline-block"
          >
            Přihlásit se
          </NavLink>

          <button
            type="button"
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Přepnout menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <button
                key={link.to}
                type="button"
                className={getMenuButtonClass(link.to)}
                onClick={() => navigateMenuLink(link.to)}
              >
                {link.label}
              </button>
            ))}
            <NavLink
              to="/prihlaseni"
              className="rounded-full bg-indigo-700 px-4 py-2 text-center text-sm font-bold text-white"
              onClick={closeMenu}
            >
              Přihlásit se
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
