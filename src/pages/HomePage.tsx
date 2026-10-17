import { ServiceCard } from '../components/ServiceCard'

const services = [
  { id: '1', name: 'كشف وفحص', durationMin: 30, price: 200 },
  { id: '2', name: 'تنظيف الأسنان', durationMin: 45, price: 400 },
  { id: '3', name: 'حشو عادي', durationMin: 60, price: 600 },
  { id: '4', name: 'حشو عصب', durationMin: 90, price: 1500 },
  { id: '5', name: 'تبييض الأسنان', durationMin: 60, price: 2500 },
  { id: '6', name: 'خلع ضرس', durationMin: 30, price: 500 },
]

export function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">خدماتنا</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            name={service.name}
            price={service.price}
            durationMin={service.durationMin}
          />
        ))}
      </div>
    </main>
  )
}
