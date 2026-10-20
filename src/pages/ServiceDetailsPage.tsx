import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Banknote, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { doctorsQuery } from '../api/doctors'
import { serviceQuery } from '../api/services'
import { ApiError } from '../lib/apiClient'
import { formatPrice } from '../lib/format'
import { serviceIcons } from '../lib/serviceIcons'

export function ServiceDetailsPage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const { serviceId = '' } = useParams()

  const serviceResult = useQuery(serviceQuery(serviceId))
  const doctorsResult = useQuery(doctorsQuery)

  const service = serviceResult.data
  const doctors =
    doctorsResult.data?.filter((doctor) => doctor.serviceIds.includes(serviceId)) ?? []

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <Link
        to="/services"
        className="mb-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-strong"
      >
        <ArrowRight className="size-5 ltr:rotate-180" aria-hidden="true" />
        {t('serviceDetails.back')}
      </Link>

      {serviceResult.isPending && (
        <div className="grid gap-10 md:grid-cols-2" aria-busy="true">
          <div className="aspect-4/3 animate-pulse rounded-3xl bg-surface-strong" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-surface-strong" />
            <div className="h-5 w-full animate-pulse rounded bg-surface-muted" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-surface-muted" />
          </div>
        </div>
      )}

      {serviceResult.isError &&
        (serviceResult.error instanceof ApiError && serviceResult.error.status === 404 ? (
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold text-ink">{t('serviceDetails.notFound')}</h1>
            <p className="mt-2 text-ink-muted">{t('serviceDetails.notFoundMessage')}</p>
          </div>
        ) : (
          <div role="alert" className="rounded-2xl bg-danger-soft p-6 text-center">
            <p className="text-danger">{t('serviceDetails.error')}</p>
            <button
              type="button"
              onClick={() => serviceResult.refetch()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              {t('serviceDetails.retry')}
            </button>
          </div>
        ))}

      {service && (
        <div className="grid items-start gap-10 md:grid-cols-2">
          <img
            src={service.imageUrl}
            alt=""
            width={800}
            height={500}
            className="aspect-4/3 w-full rounded-3xl object-cover shadow-xl shadow-brand-900/10"
          />

          <div>
            <ServiceIconBadge icon={service.icon} />

            <h1 className="mt-5 text-3xl font-bold text-ink md:text-4xl">
              {isArabic ? service.nameAr : service.nameEn}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {isArabic ? service.descriptionAr : service.descriptionEn}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface p-4 ring-1 ring-edge">
                <dt className="flex items-center gap-1.5 text-sm text-ink-subtle">
                  <Clock className="size-4" aria-hidden="true" />
                  {t('serviceDetails.duration')}
                </dt>
                <dd className="mt-1 text-lg font-bold text-ink">
                  {t('services.duration', { value: service.durationMin })}
                </dd>
              </div>
              <div className="rounded-2xl bg-surface p-4 ring-1 ring-edge">
                <dt className="flex items-center gap-1.5 text-sm text-ink-subtle">
                  <Banknote className="size-4" aria-hidden="true" />
                  {t('serviceDetails.price')}
                </dt>
                <dd className="mt-1 text-lg font-bold text-accent">
                  {formatPrice(service.price, i18n.language)}
                </dd>
              </div>
            </dl>

            {doctors.length > 0 && (
              <section className="mt-8">
                <h2 className="text-lg font-bold text-ink">{t('serviceDetails.doctors')}</h2>
                <ul className="mt-3 space-y-2">
                  {doctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 ring-1 ring-edge"
                    >
                      <span className="font-semibold text-ink">
                        {isArabic ? doctor.nameAr : doctor.nameEn}
                      </span>
                      <span className="text-sm text-ink-subtle">
                        {isArabic ? doctor.specialtyAr : doctor.specialtyEn}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Link
              to={`/?service=${service.id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
            >
              {t('serviceDetails.book')}
              <ArrowLeft className="size-5 ltr:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

function ServiceIconBadge({ icon }: { icon: keyof typeof serviceIcons }) {
  const Icon = serviceIcons[icon]

  return (
    <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-lg">
      <Icon className="size-7" aria-hidden="true" />
    </span>
  )
}
