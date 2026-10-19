import { delay, http, HttpResponse } from 'msw'
import type { BookingTime } from '../types/booking'
import { readDb } from './db'

export const handlers = [
  http.get('/api/services', async () => {
    await delay()
    return HttpResponse.json(readDb().services)
  }),

  http.get('/api/doctors', async () => {
    await delay()
    return HttpResponse.json(readDb().doctors)
  }),

  http.get('/api/working-hours', async () => {
    await delay()
    return HttpResponse.json(readDb().workingHours)
  }),

  http.get('/api/bookings/busy', async ({ request }) => {
    await delay()

    const params = new URL(request.url).searchParams
    const from = params.get('from')
    const to = params.get('to')
    if (!from || !to) {
      return HttpResponse.json({ message: '"from" and "to" are required' }, { status: 400 })
    }

    const busy: BookingTime[] = readDb()
      .bookings.filter(
        (booking) =>
          booking.status !== 'cancelled' && booking.startsAt < to && booking.endsAt > from,
      )
      .map(({ doctorId, startsAt, endsAt, status }) => ({ doctorId, startsAt, endsAt, status }))

    return HttpResponse.json(busy)
  }),
]
