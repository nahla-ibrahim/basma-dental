import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import type { Booking, BookingTime, CreateBookingInput } from '../types/booking'

export function busyTimesQuery(from: string, to: string) {
  const params = new URLSearchParams({ from, to })

  return queryOptions({
    queryKey: ['bookings', 'busy', from, to],
    queryFn: () => apiClient.get<BookingTime[]>(`/bookings/busy?${params}`),
  })
}

export function createBooking(input: CreateBookingInput) {
  return apiClient.post<Booking>('/bookings', input)
}
