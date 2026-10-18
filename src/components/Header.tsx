import { CalendarCheck } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 max-w-6xl px-4">
      <nav className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md">
        <a href="#top" className="flex items-center gap-2">
          <span className="bg-brand-600 flex size-9 items-center justify-center rounded-xl text-white">
            <CalendarCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="text-brand-800 text-xl font-bold">موعد</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <li>
            <a href="#services" className="hover:text-brand-600 transition-colors">
              خدماتنا
            </a>
          </li>
        </ul>

        <a
          href="#services"
          className="bg-brand-600 hover:bg-brand-700 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
        >
          احجز موعد
        </a>
      </nav>
    </header>
  )
}
