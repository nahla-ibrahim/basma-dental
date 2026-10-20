import { ArrowLeft, CalendarCheck, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-x-clip">
      <div
        className="absolute -start-32 -top-32 size-96 rounded-full bg-brand-200/60 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute -end-24 top-40 size-80 rounded-full bg-brand-300/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 md:grid-cols-2 md:pt-20 md:pb-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-200">
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t('hero.badge')}
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-bold text-slate-900 md:text-5xl md:leading-tight">
            {t('hero.titleLine1')}
            <span className="block text-brand-600">{t('hero.titleLine2')}</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
            {t('hero.description')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700"
            >
              {t('hero.book')}
              <ArrowLeft className="size-5 ltr:rotate-180 rtl:rotate-0" aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="rounded-full bg-white px-6 py-3 font-semibold text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-50"
            >
              {t('hero.explore')}
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/hero.webp"
            alt={t('hero.imageAlt')}
            width={1200}
            height={900}
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-brand-900/15"
          />

          <div className="absolute start-6 -bottom-6 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{t('hero.onlineTitle')}</p>
              <p className="text-xs text-slate-500">{t('hero.onlineSubtitle')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
