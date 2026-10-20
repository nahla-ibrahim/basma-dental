import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import type { Service } from '../types/service'

export const servicesQuery = queryOptions({
  queryKey: ['services'],
  queryFn: () => apiClient.get<Service[]>('/services'),
})

export function serviceQuery(id: string) {
  return queryOptions({
    queryKey: ['services', id],
    queryFn: () => apiClient.get<Service>(`/services/${id}`),
  })
}
