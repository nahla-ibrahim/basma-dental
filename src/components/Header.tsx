import { Menu, Smile, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router'
import { LanguageSwitcher } from './LanguageSwitcher'

const links = [
  { to: '/services', label: 'header.services' },
  { to: '/doctors', label: 'header.doctors' },
  { to: '/about', label: 'header.about' },
  { to: '/contact', label: 'header.contact' },
] as const

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return `block rounded-full px-4 py-2 transition-colors ${
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
  }`
}

export function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-full max-w-6xl px-4">
      {isMenuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className="fixed inset-0 -z-10 bg-slate-900/30 backdrop-blur-sm md:hidden"
        />
      )}

      <nav
        aria-label={t('header.nav')}
        onKeyDown={(event) => event.key === 'Escape' && closeMenu()}
        className="relative rounded-2xl border border-white/60 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md md:px-6"
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            aria-label={t('header.home')}
            className="flex items-center gap-2"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Smile className="size-5" aria-hidden="true" />
            </span>
            <span className="text-xl font-bold text-brand-800">{t('brand')}</span>
          </Link>

          <ul className="hidden items-center gap-2 font-medium md:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navLinkClassName}>
                  {t(link.label)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              className="flex size-9 items-center justify-center rounded-full text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 md:hidden"
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <ul
            id="mobile-menu"
            className="absolute inset-x-0 top-full mt-2 space-y-1 rounded-2xl bg-white p-3 font-medium shadow-lg ring-1 ring-slate-900/5 md:hidden"
          >
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={closeMenu} className={navLinkClassName}>
                  {t(link.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
