import { Hero } from '../components/Hero'
import { ServicesList } from '../components/ServicesList'

export function HomePage() {
  return (
    <main>
      <Hero />

      <section id="services" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">خدماتنا</h2>
        <ServicesList />
      </section>
    </main>
  )
}
