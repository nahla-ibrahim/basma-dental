import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import type { Doctor } from '../types/doctor'

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <Link
      to={`/doctors/${doctor.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-edge transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
    >
      <div className="aspect-4/5 overflow-hidden bg-surface-muted">
        <img
          src={doctor.imageUrl}
          alt=""
          width={600}
          height={750}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-bold text-ink">{isArabic ? doctor.nameAr : doctor.nameEn}</h2>
        <p className="mt-1 text-sm font-medium text-accent">
          {isArabic ? doctor.specialtyAr : doctor.specialtyEn}
        </p>
        <p className="mt-1 text-sm text-ink-subtle">
          {t('doctorsPage.experience', { value: doctor.yearsOfExperience })}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          {t('doctorsPage.viewProfile')}
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
