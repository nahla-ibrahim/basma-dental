import { describe, expect, it } from 'vitest'
import type { BookingTime } from '../types/booking'
import type { WorkingHours } from '../types/workingHours'
import { getAnyDoctorSlots, getAvailableSlots } from './slots'

const at = (hours: number, minutes = 0) => new Date(2026, 9, 20, hours, minutes)
const tuesday = at(0)
const friday = new Date(2026, 9, 23)
const dayBefore = new Date(2026, 9, 19, 8, 0)

const workingHours: WorkingHours[] = [
  { day: 2, open: '09:00', close: '12:00', closed: false },
  { day: 5, open: '09:00', close: '12:00', closed: true },
]

function booking(start: Date, end: Date, overrides: Partial<BookingTime> = {}): BookingTime {
  return {
    doctorId: 'd1',
    startsAt: start.toISOString(),
    endsAt: end.toISOString(),
    status: 'confirmed',
    ...overrides,
  }
}

describe('getAvailableSlots', () => {
  const base = { date: tuesday, workingHours, bookings: [], now: dayBefore }

  it('splits working hours into slots as long as the service', () => {
    const slots = getAvailableSlots({ ...base, durationMin: 60 })

    expect(slots).toEqual([at(9), at(10), at(11)])
  })

  it('drops the last slot if it would end after closing time', () => {
    const slots = getAvailableSlots({ ...base, durationMin: 50 })

    expect(slots).toEqual([at(9), at(9, 50), at(10, 40)])
  })

  it('returns no slots on a closed day', () => {
    expect(getAvailableSlots({ ...base, date: friday, durationMin: 30 })).toEqual([])
  })

  it('returns no slots on a day without working hours', () => {
    const monday = new Date(2026, 9, 19)

    expect(getAvailableSlots({ ...base, date: monday, durationMin: 30 })).toEqual([])
  })

  it('removes slots that overlap a booking', () => {
    const slots = getAvailableSlots({
      ...base,
      durationMin: 60,
      bookings: [booking(at(10, 30), at(11))],
    })

    expect(slots).toEqual([at(9), at(11)])
  })

  it('keeps a slot that ends exactly when a booking starts', () => {
    const slots = getAvailableSlots({
      ...base,
      durationMin: 60,
      bookings: [booking(at(10), at(11))],
    })

    expect(slots).toEqual([at(9), at(11)])
  })

  it('ignores cancelled bookings', () => {
    const slots = getAvailableSlots({
      ...base,
      durationMin: 60,
      bookings: [booking(at(10), at(11), { status: 'cancelled' })],
    })

    expect(slots).toEqual([at(9), at(10), at(11)])
  })

  it('removes slots that already started', () => {
    const slots = getAvailableSlots({ ...base, durationMin: 60, now: at(10) })

    expect(slots).toEqual([at(11)])
  })

  it('returns no slots for a zero duration', () => {
    expect(getAvailableSlots({ ...base, durationMin: 0 })).toEqual([])
  })
})

describe('getAnyDoctorSlots', () => {
  const base = { date: tuesday, durationMin: 60, workingHours, now: dayBefore }

  it('keeps a slot if at least one doctor is free and assigns that doctor', () => {
    const slots = getAnyDoctorSlots({
      ...base,
      doctorIds: ['d1', 'd2'],
      bookings: [booking(at(9), at(10), { doctorId: 'd1' })],
    })

    expect(slots).toEqual([
      { start: at(9), doctorId: 'd2' },
      { start: at(10), doctorId: 'd1' },
      { start: at(11), doctorId: 'd1' },
    ])
  })

  it('removes a slot when every doctor is busy', () => {
    const slots = getAnyDoctorSlots({
      ...base,
      doctorIds: ['d1', 'd2'],
      bookings: [
        booking(at(9), at(10), { doctorId: 'd1' }),
        booking(at(9), at(10), { doctorId: 'd2' }),
      ],
    })

    expect(slots.map((slot) => slot.start)).toEqual([at(10), at(11)])
  })
})
