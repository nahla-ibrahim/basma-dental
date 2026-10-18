import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import type { Service } from '../types/service'

export const servicesQuery = queryOptions({
  queryKey: ['services'],
  queryFn: () => apiClient.get<Service[]>('/services'),
})
