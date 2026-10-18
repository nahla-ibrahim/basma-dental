import { useEffect, useState } from 'react'
import { apiClient } from '../lib/apiClient'
import type { Service } from '../types/service'
import { ServiceCard } from './ServiceCard'

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let ignore = false

    apiClient
      .get<Service[]>('/services')
      .then((data) => {
        if (!ignore) setServices(data)
      })
      .catch(() => {
        if (!ignore) setHasError(true)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <p className="text-center text-slate-500">جاري التحميل...</p>
  }

  if (hasError) {
    return (
      <p role="alert" className="text-center text-red-600">
        حصلت مشكلة في تحميل الخدمات
      </p>
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
