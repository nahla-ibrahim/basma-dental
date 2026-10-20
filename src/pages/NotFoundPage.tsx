import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-7xl font-bold text-accent-line">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">{t('notFound.title')}</h1>
      <p className="mt-2 text-ink-muted">{t('notFound.message')}</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
      >
        {t('notFound.home')}
      </Link>
    </main>
  )
}
