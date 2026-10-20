import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { servicesQuery } from '../api/services'
import { ServiceCard } from './ServiceCard'

export function ServicesList() {
  const { t, i18n } = useTranslation()
  const { data: services, isPending, isError, refetch } = useQuery(servicesQuery)
  const isArabic = i18n.language === 'ar'

  if (isPending) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-surface ring-1 ring-edge">
            <div className="aspect-8/5 animate-pulse bg-surface-strong" />
            <div className="space-y-3 p-5 pt-9">
              <div className="h-5 w-1/2 animate-pulse rounded bg-surface-strong" />
              <div className="h-4 w-full animate-pulse rounded bg-surface-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-danger-line bg-danger-soft p-6 text-center"
      >
        <p className="text-danger">{t('services.error')}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          {t('services.retry')}
        </button>
      </div>
    )
  }

  const activeServices = services.filter((service) => service.active)

  if (activeServices.length === 0) {
    return <p className="text-center text-ink-subtle">{t('services.empty')}</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {activeServices.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          name={isArabic ? service.nameAr : service.nameEn}
          description={isArabic ? service.descriptionAr : service.descriptionEn}
          icon={service.icon}
          imageUrl={service.imageUrl}
          price={service.price}
          durationMin={service.durationMin}
        />
      ))}
    </div>
  )
}
