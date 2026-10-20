import { useTranslation } from 'react-i18next'
import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from './Header'

export function Layout() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="py-8 text-center text-sm text-slate-500">
        {t('footer.rights', { year: new Date().getFullYear() })}
      </footer>

      <ScrollRestoration />
    </div>
  )
}
