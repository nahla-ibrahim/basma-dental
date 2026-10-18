import { CalendarCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 max-w-6xl px-4">
      <nav
        aria-label={t('header.nav')}
        className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md"
      >
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <CalendarCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="text-xl font-bold text-brand-800">{t('brand')}</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <li>
            <a href="#services" className="transition-colors hover:text-brand-600">
              {t('header.services')}
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#services"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            {t('header.book')}
          </a>
        </div>
      </nav>
    </header>
  )
}
