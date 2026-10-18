import { useQuery } from '@tanstack/react-query'
import { servicesQuery } from '../api/services'
import { ServiceCard } from './ServiceCard'

export function ServicesList() {
  const { data: services, isPending, isError, refetch } = useQuery(servicesQuery)

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-52 animate-pulse rounded-xl bg-slate-200" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-700">حصلت مشكلة في تحميل الخدمات</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          حاول تاني
        </button>
      </div>
    )
  }

  if (services.length === 0) {
    return <p className="text-center text-slate-500">مفيش خدمات متاحة دلوقتي</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          name={service.nameAr}
          description={service.descriptionAr}
          icon={service.icon}
          price={service.price}
          durationMin={service.durationMin}
        />
      ))}
    </div>
  )
}
