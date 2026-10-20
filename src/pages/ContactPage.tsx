import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CircleCheck, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useForm, type FieldError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { sendMessage } from '../api/messages'
import { TextArea, TextField } from '../components/TextField'
import { WorkingHoursList } from '../components/WorkingHoursList'
import {
  contactSchema,
  type ContactFormValues,
  type ContactValidationMessage,
} from '../lib/contactSchema'

const CLINIC_PHONE = '+20 2 2345 6789'
const CLINIC_EMAIL = 'hello@basma-dental.com'

export function ContactPage() {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onTouched',
  })

  const messageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => reset(),
  })

  function errorMessage(error?: FieldError) {
    if (!error?.message) return undefined
    return t(`contact.validation.${error.message as ContactValidationMessage}`)
  }

  const contactItems = [
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue') },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: CLINIC_PHONE,
      href: `tel:${CLINIC_PHONE.replaceAll(' ', '')}`,
    },
    { icon: Mail, label: t('contact.email'), value: CLINIC_EMAIL, href: `mailto:${CLINIC_EMAIL}` },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{t('contact.title')}</h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-slate-600">{t('contact.subtitle')}</p>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {contactItems.map(({ icon: Icon, label, value, href }) => (
          <li
            key={label}
            className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              {href ? (
                <a
                  href={href}
                  dir="ltr"
                  className="font-semibold text-slate-900 hover:text-brand-700"
                >
                  {value}
                </a>
              ) : (
                <p className="font-semibold text-slate-900">{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 md:p-8">
          <h2 className="text-xl font-bold text-slate-900">{t('contact.form.title')}</h2>

          {messageMutation.isSuccess && (
            <p
              role="status"
              className="mt-6 flex items-center gap-2 rounded-2xl bg-brand-50 p-4 text-brand-800"
            >
              <CircleCheck className="size-5 shrink-0" aria-hidden="true" />
              {t('contact.form.success')}
            </p>
          )}

          {messageMutation.isError && (
            <p role="alert" className="mt-6 rounded-2xl bg-red-50 p-4 text-red-700">
              {t('contact.form.error')}
            </p>
          )}

          <form
            onSubmit={handleSubmit((values) => messageMutation.mutate(values))}
            noValidate
            className="mt-6 grid gap-5 sm:grid-cols-2"
          >
            <TextField
              label={t('contact.form.name')}
              autoComplete="name"
              error={errorMessage(errors.name)}
              {...register('name')}
            />
            <TextField
              label={t('contact.form.email')}
              type="email"
              dir="ltr"
              autoComplete="email"
              error={errorMessage(errors.email)}
              {...register('email')}
            />
            <div className="sm:col-span-2">
              <TextArea
                label={t('contact.form.message')}
                placeholder={t('contact.form.messagePlaceholder')}
                rows={5}
                error={errorMessage(errors.message)}
                {...register('message')}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={messageMutation.isPending}
                className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
              >
                {messageMutation.isPending ? t('contact.form.sending') : t('contact.form.send')}
              </button>
            </div>
          </form>
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <Clock className="size-5 text-brand-600" aria-hidden="true" />
            {t('contact.hours.title')}
          </h2>
          <WorkingHoursList />
        </aside>
      </div>
    </main>
  )
}
