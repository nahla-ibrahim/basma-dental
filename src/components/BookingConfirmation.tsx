import { CircleCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDate, formatPrice, formatTime } from '../lib/format'
import type { Booking } from '../types/booking'
import type { Doctor } from '../types/doctor'
import type { Service } from '../types/service'

type BookingConfirmationProps = {
  booking: Booking
  service?: Service
  doctor?: Doctor
  onBookAnother: () => void
}

export function BookingConfirmation({
  booking,
  service,
  doctor,
  onBookAnother,
}: BookingConfirmationProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const startsAt = new Date(booking.startsAt)

  const rows = [
    {
      label: t('booking.summary.service'),
      value: service && (isArabic ? service.nameAr : service.nameEn),
    },
    {
      label: t('booking.summary.doctor'),
      value: doctor && (isArabic ? doctor.nameAr : doctor.nameEn),
    },
    { label: t('booking.summary.date'), value: formatDate(startsAt, i18n.language) },
    { label: t('booking.summary.time'), value: formatTime(startsAt, i18n.language) },
    {
      label: t('booking.summary.total'),
      value: service && formatPrice(service.price, i18n.language),
    },
    { label: t('booking.confirmation.status'), value: t('booking.confirmation.pending') },
  ]

  return (
    <section className="mx-auto max-w-xl rounded-3xl bg-surface p-8 text-center shadow-sm ring-1 ring-edge">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent-soft text-accent">
        <CircleCheck className="size-9" aria-hidden="true" />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-ink">{t('booking.confirmation.title')}</h2>
      <p className="mt-2 text-ink-muted">
        {t('booking.confirmation.message', { phone: booking.patientPhone })}
      </p>

      <dl className="mt-8 space-y-3 rounded-2xl bg-surface-muted p-5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="text-ink-subtle">{row.label}</dt>
            <dd className="text-end font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onBookAnother}
        className="mt-8 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
      >
        {t('booking.confirmation.bookAnother')}
      </button>
    </section>
  )
}
