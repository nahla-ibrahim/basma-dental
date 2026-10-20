import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { doctorQuery } from '../api/doctors'
import { servicesQuery } from '../api/services'
import { ApiError } from '../lib/apiClient'
import { serviceIcons } from '../lib/serviceIcons'

export function DoctorDetailsPage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const { doctorId = '' } = useParams()

  const doctorResult = useQuery(doctorQuery(doctorId))
  const servicesResult = useQuery(servicesQuery)

  const doctor = doctorResult.data
  const services =
    servicesResult.data?.filter(
      (service) => service.active && doctor?.serviceIds.includes(service.id),
    ) ?? []

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <Link
        to="/doctors"
        className="mb-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-strong"
      >
        <ArrowRight className="size-5 ltr:rotate-180" aria-hidden="true" />
        {t('doctorDetails.back')}
      </Link>

      {doctorResult.isPending && (
        <div className="grid gap-10 md:grid-cols-[360px_1fr]" aria-busy="true">
          <div className="aspect-4/5 animate-pulse rounded-3xl bg-surface-strong" />
          <div className="space-y-4">
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-surface-strong" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-surface-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-surface-muted" />
          </div>
        </div>
      )}

      {doctorResult.isError &&
        (doctorResult.error instanceof ApiError && doctorResult.error.status === 404 ? (
          <div className="py-16 text-center">
            <h1 className="text-2xl font-bold text-ink">{t('doctorDetails.notFound')}</h1>
            <p className="mt-2 text-ink-muted">{t('doctorDetails.notFoundMessage')}</p>
          </div>
        ) : (
          <div role="alert" className="rounded-2xl bg-danger-soft p-6 text-center">
            <p className="text-danger">{t('doctorDetails.error')}</p>
            <button
              type="button"
              onClick={() => doctorResult.refetch()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              {t('doctorDetails.retry')}
            </button>
          </div>
        ))}

      {doctor && (
        <div className="grid items-start gap-10 md:grid-cols-[360px_1fr]">
          <img
            src={doctor.imageUrl}
            alt=""
            width={600}
            height={750}
            className="aspect-4/5 w-full rounded-3xl object-cover shadow-xl shadow-brand-900/10"
          />

          <div>
            <p className="font-semibold text-accent">
              {isArabic ? doctor.specialtyAr : doctor.specialtyEn}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">
              {isArabic ? doctor.nameAr : doctor.nameEn}
            </h1>

            <div className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 ring-1 ring-edge">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Award className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-ink-subtle">{t('doctorDetails.experience')}</p>
                <p className="font-bold text-ink">
                  {new Intl.NumberFormat(i18n.language).format(doctor.yearsOfExperience)}
                </p>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-bold text-ink">{t('doctorDetails.about')}</h2>
              <p className="mt-2 text-lg leading-relaxed text-ink-muted">
                {isArabic ? doctor.bioAr : doctor.bioEn}
              </p>
            </section>

            {services.length > 0 && (
              <section className="mt-8">
                <h2 className="text-lg font-bold text-ink">{t('doctorDetails.services')}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.icon]

                    return (
                      <li key={service.id}>
                        <Link
                          to={`/services/${service.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink-muted ring-1 ring-line transition-colors hover:bg-accent-soft hover:text-accent hover:ring-accent-line"
                        >
                          <Icon className="size-4 text-accent" aria-hidden="true" />
                          {isArabic ? service.nameAr : service.nameEn}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}

            <Link
              to={`/?doctor=${doctor.id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
            >
              {t('doctorDetails.book', { name: isArabic ? doctor.nameAr : doctor.nameEn })}
              <ArrowLeft className="size-5 ltr:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
