import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { doctorsQuery } from '../api/doctors'
import { servicesQuery } from '../api/services'
import { BookingSteps } from '../components/BookingSteps'
import { BookingSummary } from '../components/BookingSummary'
import { Select } from '../components/Select'

const ANY_DOCTOR = 'any'

export function HomePage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const servicesResult = useQuery(servicesQuery)
  const doctorsResult = useQuery(doctorsQuery)

  const [serviceId, setServiceId] = useState('')
  const [doctorId, setDoctorId] = useState('')

  const services = servicesResult.data?.filter((service) => service.active) ?? []
  const selectedService = services.find((service) => service.id === serviceId)
  const availableDoctors =
    doctorsResult.data?.filter((doctor) => doctor.serviceIds.includes(serviceId)) ?? []
  const selectedDoctor = availableDoctors.find((doctor) => doctor.id === doctorId)

  const isLoading = servicesResult.isPending || doctorsResult.isPending
  const isError = servicesResult.isError || doctorsResult.isError

  function handleServiceChange(newServiceId: string) {
    setServiceId(newServiceId)

    setDoctorId('')
  }

  function retry() {
    servicesResult.refetch()
    doctorsResult.refetch()
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{t('booking.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">{t('booking.subtitle')}</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8">
          <BookingSteps currentStep={0} />

          <h2 className="mt-8 text-xl font-bold text-slate-900">
            {t('booking.serviceStep.title')}
          </h2>

          {isError ? (
            <div role="alert" className="mt-6 rounded-2xl bg-red-50 p-6 text-center">
              <p className="text-red-700">{t('booking.error')}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                {t('booking.retry')}
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Select
                label={t('booking.service')}
                value={serviceId}
                onChange={(event) => handleServiceChange(event.target.value)}
                disabled={isLoading}
              >
                <option value="" disabled>
                  {isLoading ? t('booking.loading') : t('booking.servicePlaceholder')}
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {isArabic ? service.nameAr : service.nameEn}
                  </option>
                ))}
              </Select>

              <Select
                label={t('booking.doctor')}
                value={doctorId}
                onChange={(event) => setDoctorId(event.target.value)}
                disabled={isLoading || !serviceId}
              >
                <option value="" disabled>
                  {serviceId ? t('booking.doctorPlaceholder') : t('booking.doctorNeedsService')}
                </option>
                <option value={ANY_DOCTOR}>{t('booking.anyDoctor')}</option>
                {availableDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {isArabic
                      ? `${doctor.nameAr} · ${doctor.specialtyAr}`
                      : `${doctor.nameEn} · ${doctor.specialtyEn}`}
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <button
              type="button"
              disabled={!serviceId || !doctorId}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              {t('booking.next')}
              <ArrowLeft className="size-5 ltr:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </section>

        <BookingSummary
          service={selectedService}
          doctor={selectedDoctor}
          isAnyDoctor={doctorId === ANY_DOCTOR}
        />
      </div>
    </main>
  )
}
