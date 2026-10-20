export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export type Booking = {
  id: string
  serviceId: string
  doctorId: string
  userId: string | null
  patientName: string
  patientPhone: string
  patientEmail: string
  startsAt: string
  endsAt: string
  status: BookingStatus
  notes?: string
}

export type BookingTime = Pick<Booking, 'doctorId' | 'startsAt' | 'endsAt' | 'status'>

export type CreateBookingInput = Pick<
  Booking,
  'serviceId' | 'doctorId' | 'startsAt' | 'patientName' | 'patientPhone' | 'patientEmail' | 'notes'
>
