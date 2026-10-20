import { CalendarCheck, HeartHandshake, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const values = [
  { key: 'equipment', icon: MonitorSmartphone },
  { key: 'painless', icon: HeartHandshake },
  { key: 'sterilization', icon: ShieldCheck },
  { key: 'booking', icon: CalendarCheck },
] as const

export function Values() {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-ink">{t('about.values.title')}</h2>
        <p className="mt-3 text-lg text-ink-muted">{t('about.values.subtitle')}</p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ key, icon: Icon }) => (
          <li
            key={key}
            className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-edge transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500 to-brand-700 text-white shadow-md">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-ink">{t(`about.values.${key}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {t(`about.values.${key}.description`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
