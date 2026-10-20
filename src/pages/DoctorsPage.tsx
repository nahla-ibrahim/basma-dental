import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { doctorsQuery } from '../api/doctors'
import { DoctorCard } from '../components/DoctorCard'

export function DoctorsPage() {
  const { t } = useTranslation()
  const { data: doctors, isPending, isError, refetch } = useQuery(doctorsQuery)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-ink md:text-4xl">{t('doctorsPage.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink-muted">{t('doctorsPage.subtitle')}</p>
      </div>

      {isPending && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-3xl bg-surface ring-1 ring-edge">
              <div className="aspect-4/5 animate-pulse bg-surface-strong" />
              <div className="space-y-2 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-surface-strong" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-surface-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div role="alert" className="rounded-2xl bg-danger-soft p-6 text-center">
          <p className="text-danger">{t('doctorsPage.error')}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {t('doctorsPage.retry')}
          </button>
        </div>
      )}

      {doctors && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </main>
  )
}
