import { useTranslation } from 'react-i18next'
import { formatDate, formatPrice, formatTime } from '../lib/format'
import type { DoctorSlot } from '../lib/slots'
import type { Doctor } from '../types/doctor'
import type { Service } from '../types/service'

type BookingSummaryProps = {
  service?: Service
  doctor?: Doctor
  isAnyDoctor: boolean
  slot: DoctorSlot | null
}

export function BookingSummary({ service, doctor, isAnyDoctor, slot }: BookingSummaryProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const notSelected = <span className="text-slate-400">{t('booking.summary.notSelected')}</span>

  const doctorName = isAnyDoctor
    ? t('booking.anyDoctor')
    : doctor && (isArabic ? doctor.nameAr : doctor.nameEn)

  const rows = [
    {
      label: t('booking.summary.service'),
      value: service && (isArabic ? service.nameAr : service.nameEn),
    },
    { label: t('booking.summary.doctor'), value: doctorName },
    { label: t('booking.summary.date'), value: slot && formatDate(slot.start, i18n.language) },
    { label: t('booking.summary.time'), value: slot && formatTime(slot.start, i18n.language) },
    {
      label: t('booking.summary.duration'),
      value: service && t('services.duration', { value: service.durationMin }),
    },
  ]

  return (
    <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 lg:sticky lg:top-28">
      <h2 className="text-lg font-bold text-slate-900">{t('booking.summary.title')}</h2>

      <dl className="mt-5 space-y-4 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4">
            <dt className="text-slate-500">{row.label}</dt>
            <dd className="text-end font-semibold text-slate-900">{row.value || notSelected}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="font-semibold text-slate-700">{t('booking.summary.total')}</span>
        <span className="text-xl font-bold text-brand-700">
          {service ? formatPrice(service.price, i18n.language) : '—'}
        </span>
      </div>
    </aside>
  )
}
