import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import type { Doctor } from '../types/doctor'

export const doctorsQuery = queryOptions({
  queryKey: ['doctors'],
  queryFn: () => apiClient.get<Doctor[]>('/doctors'),
})

export function doctorQuery(id: string) {
  return queryOptions({
    queryKey: ['doctors', id],
    queryFn: () => apiClient.get<Doctor>(`/doctors/${id}`),
  })
}
