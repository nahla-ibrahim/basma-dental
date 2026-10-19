import { useQuery } from '@tanstack/react-query'
import { addDays, format, startOfDay } from 'date-fns'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { busyTimesQuery } from '../api/bookings'
import { doctorsQuery } from '../api/doctors'
import { servicesQuery } from '../api/services'
import { workingHoursQuery } from '../api/workingHours'
import { BookingSteps } from '../components/BookingSteps'
import { BookingSummary } from '../components/BookingSummary'
import { DayPicker, type DayOption } from '../components/DayPicker'
import { Select } from '../components/Select'
import { TimeSlots } from '../components/TimeSlots'
import { getAnyDoctorSlots, getAvailableSlots, type DoctorSlot } from '../lib/slots'

const ANY_DOCTOR = 'any'
const LAST_STEP = 2
const BOOKING_DAYS = 14

export function HomePage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const today = startOfDay(new Date())
  const from = today.toISOString()
  const to = addDays(today, BOOKING_DAYS).toISOString()

  const servicesResult = useQuery(servicesQuery)
  const doctorsResult = useQuery(doctorsQuery)
  const workingHoursResult = useQuery(workingHoursQuery)
  const busyResult = useQuery(busyTimesQuery(from, to))

  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [dayKey, setDayKey] = useState<string | null>(null)
  const [slot, setSlot] = useState<DoctorSlot | null>(null)

  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const hasChangedStep = useRef(false)

  const services = servicesResult.data?.filter((service) => service.active) ?? []
  const selectedService = services.find((service) => service.id === serviceId)
  const availableDoctors =
    doctorsResult.data?.filter((doctor) => doctor.serviceIds.includes(serviceId)) ?? []
  const isAnyDoctor = doctorId === ANY_DOCTOR
  const selectedDoctor = availableDoctors.find(
    (doctor) => doctor.id === (isAnyDoctor ? slot?.doctorId : doctorId),
  )

  function getSlots(date: Date): DoctorSlot[] {
    const workingHours = workingHoursResult.data
    const busyTimes = busyResult.data
    if (!selectedService || !workingHours || !busyTimes) return []

    const params = { date, durationMin: selectedService.durationMin, workingHours }

    if (isAnyDoctor) {
      return getAnyDoctorSlots({
        ...params,
        doctorIds: availableDoctors.map((doctor) => doctor.id),
        bookings: busyTimes,
      })
    }

    const doctorBusyTimes = busyTimes.filter((busy) => busy.doctorId === doctorId)
    return getAvailableSlots({ ...params, bookings: doctorBusyTimes }).map((start) => ({
      start,
      doctorId,
    }))
  }

  const days: DayOption[] = Array.from({ length: BOOKING_DAYS }, (_, index) => {
    const date = addDays(today, index)
    return { key: format(date, 'yyyy-MM-dd'), date, isAvailable: getSlots(date).length > 0 }
  })
  const selectedDay = days.find((day) => day.key === dayKey)
  const slots = selectedDay ? getSlots(selectedDay.date) : []

  const isStepOneLoading = servicesResult.isPending || doctorsResult.isPending
  const isStepOneError = servicesResult.isError || doctorsResult.isError
  const isStepTwoLoading = workingHoursResult.isPending || busyResult.isPending
  const isStepTwoError = workingHoursResult.isError || busyResult.isError

  const canGoNext = [Boolean(serviceId && doctorId), Boolean(slot), false][step]

  const stepTitles = [
    t('booking.serviceStep.title'),
    t('booking.timeStep.title'),
    t('booking.detailsStep.title'),
  ]

  useEffect(() => {
    if (hasChangedStep.current) {
      stepHeadingRef.current?.focus()
    }
  }, [step])

  function goToStep(newStep: number) {
    hasChangedStep.current = true
    setStep(newStep)
  }

  function handleServiceChange(newServiceId: string) {
    setServiceId(newServiceId)
    setDoctorId('')
    setDayKey(null)
    setSlot(null)
  }

  function handleDoctorChange(newDoctorId: string) {
    setDoctorId(newDoctorId)
    setDayKey(null)
    setSlot(null)
  }

  function handleDayChange(newDayKey: string) {
    setDayKey(newDayKey)
    setSlot(null)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{t('booking.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">{t('booking.subtitle')}</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        <section className="min-w-0 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8">
          <BookingSteps currentStep={step} />

          <h2
            ref={stepHeadingRef}
            tabIndex={-1}
            className="mt-8 text-xl font-bold text-slate-900 focus:outline-none"
          >
            {stepTitles[step]}
          </h2>

          {step === 0 &&
            (isStepOneError ? (
              <LoadError
                onRetry={() => {
                  servicesResult.refetch()
                  doctorsResult.refetch()
                }}
              />
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Select
                  label={t('booking.service')}
                  value={serviceId}
                  onChange={(event) => handleServiceChange(event.target.value)}
                  disabled={isStepOneLoading}
                >
                  <option value="" disabled>
                    {isStepOneLoading ? t('booking.loading') : t('booking.servicePlaceholder')}
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
                  onChange={(event) => handleDoctorChange(event.target.value)}
                  disabled={isStepOneLoading || !serviceId}
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
            ))}

          {step === 1 &&
            (isStepTwoError ? (
              <LoadError
                onRetry={() => {
                  workingHoursResult.refetch()
                  busyResult.refetch()
                }}
              />
            ) : isStepTwoLoading ? (
              <div className="mt-6 flex gap-2" aria-busy="true">
                {Array.from({ length: 7 }, (_, index) => (
                  <div key={index} className="h-20 w-18 animate-pulse rounded-2xl bg-slate-100" />
                ))}
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <DayPicker days={days} selectedKey={dayKey} onSelect={handleDayChange} />

                {!selectedDay ? (
                  <p className="text-slate-500">{t('booking.timeStep.pickDay')}</p>
                ) : slots.length === 0 ? (
                  <p className="text-slate-500">{t('booking.timeStep.noSlots')}</p>
                ) : (
                  <TimeSlots slots={slots} selected={slot} onSelect={setSlot} />
                )}
              </div>
            ))}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goToStep(step - 1)}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
              >
                <ArrowRight className="size-5 ltr:rotate-180" aria-hidden="true" />
                {t('booking.back')}
              </button>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={() => goToStep(step + 1)}
              disabled={!canGoNext}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              {step === LAST_STEP ? t('booking.confirm') : t('booking.next')}
              {step < LAST_STEP && (
                <ArrowLeft className="size-5 ltr:rotate-180" aria-hidden="true" />
              )}
            </button>
          </div>
        </section>

        <BookingSummary
          service={selectedService}
          doctor={selectedDoctor}
          isAnyDoctor={isAnyDoctor && !slot}
          slot={slot}
        />
      </div>
    </main>
  )
}

function LoadError({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation()

  return (
    <div role="alert" className="mt-6 rounded-2xl bg-red-50 p-6 text-center">
      <p className="text-red-700">{t('booking.error')}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        {t('booking.retry')}
      </button>
    </div>
  )
}
