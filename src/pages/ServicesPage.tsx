import { useTranslation } from 'react-i18next'
import { ServicesList } from '../components/ServicesList'

export function ServicesPage() {
  const { t } = useTranslation()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-ink md:text-4xl">{t('servicesPage.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink-muted">{t('servicesPage.subtitle')}</p>
      </div>
      <ServicesList />
    </main>
  )
}
