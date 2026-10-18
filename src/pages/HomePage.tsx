import { ServicesList } from '../components/ServicesList'

export function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section id="services" className="scroll-mt-28">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">خدماتنا</h1>
        <ServicesList />
      </section>
    </main>
  )
}
