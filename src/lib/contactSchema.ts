import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'required').min(3, 'nameTooShort'),
  email: z.string().trim().min(1, 'required').pipe(z.email('invalidEmail')),
  message: z
    .string()
    .trim()
    .min(1, 'required')
    .min(10, 'messageTooShort')
    .max(1000, 'messageTooLong'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export type ContactValidationMessage =
  'required' | 'nameTooShort' | 'invalidEmail' | 'messageTooShort' | 'messageTooLong'
