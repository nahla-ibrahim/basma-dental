import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import type { BookingTime } from '../types/booking'

export function busyTimesQuery(from: string, to: string) {
  const params = new URLSearchParams({ from, to })

  return queryOptions({
    queryKey: ['bookings', 'busy', from, to],
    queryFn: () => apiClient.get<BookingTime[]>(`/bookings/busy?${params}`),
  })
}
