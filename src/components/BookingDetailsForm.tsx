import type { FieldError, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { BookingDetails, ValidationMessage } from '../lib/bookingSchema'
import { TextArea, TextField } from './TextField'

type BookingDetailsFormProps = {
  id: string
  form: UseFormReturn<BookingDetails>
  onSubmit: (details: BookingDetails) => void
}

export function BookingDetailsForm({ id, form, onSubmit }: BookingDetailsFormProps) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  function errorMessage(error?: FieldError) {
    if (!error?.message) return undefined
    return t(`booking.validation.${error.message as ValidationMessage}`)
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-6 grid gap-5 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <TextField
          label={t('booking.detailsStep.name')}
          placeholder={t('booking.detailsStep.namePlaceholder')}
          autoComplete="name"
          error={errorMessage(errors.patientName)}
          {...register('patientName')}
        />
      </div>

      <TextField
        label={t('booking.detailsStep.phone')}
        placeholder="01012345678"
        type="tel"
        inputMode="tel"
        dir="ltr"
        autoComplete="tel"
        error={errorMessage(errors.patientPhone)}
        {...register('patientPhone')}
      />

      <TextField
        label={t('booking.detailsStep.email')}
        placeholder="name@example.com"
        type="email"
        dir="ltr"
        autoComplete="email"
        error={errorMessage(errors.patientEmail)}
        {...register('patientEmail')}
      />

      <div className="sm:col-span-2">
        <TextArea
          label={t('booking.detailsStep.notes')}
          hint={t('booking.detailsStep.optional')}
          placeholder={t('booking.detailsStep.notesPlaceholder')}
          error={errorMessage(errors.notes)}
          {...register('notes')}
        />
      </div>
    </form>
  )
}
