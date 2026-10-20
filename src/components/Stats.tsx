import { Award, Smile, Star, Stethoscope } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const stats = [
  { key: 'experience', icon: Award },
  { key: 'patients', icon: Smile },
  { key: 'rating', icon: Star },
  { key: 'doctors', icon: Stethoscope },
] as const

export function Stats() {
  const { t } = useTranslation()

  return (
    <section aria-label={t('about.stats.label')} className="relative mx-auto -mt-4 max-w-6xl px-4">
      <dl className="grid grid-cols-2 gap-6 rounded-3xl bg-surface p-6 shadow-xl ring-1 shadow-brand-900/5 ring-edge md:grid-cols-4 md:p-8">
        {stats.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col-reverse">
              <dt className="text-sm text-ink-subtle">{t(`about.stats.${key}.label`)}</dt>
              <dd className="text-2xl font-bold text-ink">{t(`about.stats.${key}.value`)}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
