import { useTranslation } from 'react-i18next'
import { Hero } from '../components/Hero'
import { Stats } from '../components/Stats'
import { Values } from '../components/Values'

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <main>
      <Hero />
      <Stats />

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-20 md:grid-cols-2">
        <img
          src="/images/clinic.webp"
          alt={t('about.story.imageAlt')}
          width={1000}
          height={750}
          loading="lazy"
          className="aspect-4/3 w-full rounded-3xl object-cover shadow-xl shadow-brand-900/10"
        />
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{t('about.story.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('about.story.body1')}</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{t('about.story.body2')}</p>
        </div>
      </section>

      <Values />
    </main>
  )
}
