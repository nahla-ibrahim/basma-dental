import { addMinutes } from 'date-fns'
import { delay, http, HttpResponse } from 'msw'
import type { Booking, BookingTime, CreateBookingInput } from '../types/booking'
import { readDb, writeDb } from './db'

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

  http.post('/api/bookings', async ({ request }) => {
    await delay()

    const input = (await request.json()) as CreateBookingInput
    const db = readDb()

    const service = db.services.find((item) => item.id === input.serviceId)
    if (!service) {
      return HttpResponse.json({ message: 'Service not found' }, { status: 400 })
    }

    const startsAt = new Date(input.startsAt).toISOString()
    const endsAt = addMinutes(new Date(input.startsAt), service.durationMin).toISOString()

    const isTaken = db.bookings.some(
      (booking) =>
        booking.doctorId === input.doctorId &&
        booking.status !== 'cancelled' &&
        booking.startsAt < endsAt &&
        booking.endsAt > startsAt,
    )
    if (isTaken) {
      return HttpResponse.json({ message: 'This time is no longer available' }, { status: 409 })
    }

    const booking: Booking = {
      ...input,
      id: crypto.randomUUID(),
      userId: null,
      startsAt,
      endsAt,
      status: 'pending',
    }
    db.bookings.push(booking)
    writeDb(db)

    return HttpResponse.json(booking, { status: 201 })
  }),
]
