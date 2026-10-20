import { z } from 'zod'

export const bookingDetailsSchema = z.object({
  patientName: z.string().trim().min(1, 'required').min(3, 'nameTooShort'),
  patientPhone: z
    .string()
    .trim()
    .min(1, 'required')
    .regex(/^01[0125]\d{8}$/, 'invalidPhone'),
  patientEmail: z.string().trim().min(1, 'required').pipe(z.email('invalidEmail')),
  notes: z.string().trim().max(300, 'notesTooLong'),
})

export type BookingDetails = z.infer<typeof bookingDetailsSchema>

export type ValidationMessage =
  'required' | 'nameTooShort' | 'invalidPhone' | 'invalidEmail' | 'notesTooLong'
