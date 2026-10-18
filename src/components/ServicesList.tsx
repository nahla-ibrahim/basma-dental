import { useQuery } from '@tanstack/react-query'
import { servicesQuery } from '../api/services'
import { ServiceCard } from './ServiceCard'

export function ServicesList() {
  const { data: services, isPending, isError, refetch } = useQuery(servicesQuery)

  if (isPending) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/5">
            <div className="aspect-8/5 animate-pulse bg-slate-200" />
            <div className="space-y-3 p-5 pt-9">
              <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          name={service.nameAr}
          description={service.descriptionAr}
          icon={service.icon}
          imageUrl={service.imageUrl}
          price={service.price}
          durationMin={service.durationMin}
        />
      ))}
    </div>
  )
}
