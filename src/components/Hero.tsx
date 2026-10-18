import { ArrowLeft, CalendarCheck, ShieldCheck } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="bg-brand-200/60 absolute -start-32 -top-32 size-96 rounded-full blur-2xl"
        aria-hidden="true"
      />
      <div
        className="bg-brand-300/40 absolute -end-24 top-40 size-80 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 md:grid-cols-2 md:pt-20 md:pb-24">
        <div>
          <span className="text-brand-700 ring-brand-200 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium ring-1">
            <ShieldCheck className="size-4" aria-hidden="true" />
            عيادة أسنان متكاملة
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-bold text-slate-900 md:text-5xl md:leading-tight">
            ابتسامتك تستاهل
            <span className="text-brand-600 block">أحسن رعاية</span>
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
            فريق متخصص وأحدث الأجهزة، واحجز ميعادك أونلاين في أقل من دقيقة من غير مكالمات ولا
            انتظار.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="bg-brand-600 shadow-brand-600/25 hover:bg-brand-700 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-colors"
            >
              احجز موعد
              <ArrowLeft className="size-5 ltr:rotate-180 rtl:rotate-0" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="text-brand-700 ring-brand-200 hover:bg-brand-50 rounded-full bg-white px-6 py-3 font-semibold ring-1 transition-colors"
            >
              تعرف على خدماتنا
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/hero.webp"
            alt="دكتور أسنان بيتكلم مع مريضة في العيادة"
            width={1200}
            height={900}
            fetchPriority="high"
            className="shadow-brand-900/15 aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
          />

          <div className="absolute start-6 -bottom-6 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
            <span className="bg-brand-100 text-brand-700 flex size-10 items-center justify-center rounded-xl">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">حجز أونلاين</p>
              <p className="text-xs text-slate-500">اختار ميعادك في ثواني</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
