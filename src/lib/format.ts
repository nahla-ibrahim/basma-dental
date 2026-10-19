import { format } from 'date-fns'
import { ar, enUS } from 'date-fns/locale'

export function formatPrice(price: number, language: string) {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price)
}

const dateLocales = { ar, en: enUS }

export function getDateLocale(language: string) {
  return language === 'ar' ? dateLocales.ar : dateLocales.en
}

export function formatTime(date: Date, language: string) {
  return format(date, 'h:mm a', { locale: getDateLocale(language) })
}

export function formatDate(date: Date, language: string) {
  return format(date, 'EEEE d MMMM', { locale: getDateLocale(language) })
}
