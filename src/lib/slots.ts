import { addMinutes, areIntervalsOverlapping, getDay, isAfter, parseISO, set } from 'date-fns'
import type { BookingTime } from '../types/booking'
import type { WorkingHours } from '../types/workingHours'

type GetAvailableSlotsParams = {
  date: Date
  durationMin: number
  workingHours: WorkingHours[]
  bookings: BookingTime[]
  now?: Date
}

export function getAvailableSlots({
  date,
  durationMin,
  workingHours,
  bookings,
  now = new Date(),
}: GetAvailableSlotsParams): Date[] {
  if (durationMin <= 0) return []

  const hours = workingHours.find((item) => item.day === getDay(date))
  if (!hours || hours.closed) return []

  const open = atTime(date, hours.open)
  const close = atTime(date, hours.close)

  const busyIntervals = bookings
    .filter((booking) => booking.status !== 'cancelled')
    .map((booking) => ({ start: parseISO(booking.startsAt), end: parseISO(booking.endsAt) }))

  const slots: Date[] = []

  for (let start = open; ; start = addMinutes(start, durationMin)) {
    const end = addMinutes(start, durationMin)

    if (isAfter(end, close)) break

    const isFuture = isAfter(start, now)
    const isFree = !busyIntervals.some((busy) => areIntervalsOverlapping({ start, end }, busy))

    if (isFuture && isFree) slots.push(start)
  }

  return slots
}

export type DoctorSlot = {
  start: Date
  doctorId: string
}

type GetAnyDoctorSlotsParams = Omit<GetAvailableSlotsParams, 'bookings'> & {
  doctorIds: string[]
  bookings: BookingTime[]
}

export function getAnyDoctorSlots({
  doctorIds,
  bookings,
  ...params
}: GetAnyDoctorSlotsParams): DoctorSlot[] {
  const slotsByTime = new Map<number, DoctorSlot>()

  for (const doctorId of doctorIds) {
    const doctorBookings = bookings.filter((booking) => booking.doctorId === doctorId)

    for (const start of getAvailableSlots({ ...params, bookings: doctorBookings })) {
      if (!slotsByTime.has(start.getTime())) {
        slotsByTime.set(start.getTime(), { start, doctorId })
      }
    }
  }

  return [...slotsByTime.values()].sort((a, b) => a.start.getTime() - b.start.getTime())
}

function atTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return set(date, { hours, minutes, seconds: 0, milliseconds: 0 })
}
