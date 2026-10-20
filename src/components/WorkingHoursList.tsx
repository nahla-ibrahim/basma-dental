import { useQuery } from '@tanstack/react-query'
import { getDay } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { workingHoursQuery } from '../api/workingHours'
import { formatTime, getDateLocale } from '../lib/format'
import type { WeekDay } from '../types/workingHours'

const weekOrder: WeekDay[] = [6, 0, 1, 2, 3, 4, 5]

function timeToDate(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

export function WorkingHoursList() {
  const { t, i18n } = useTranslation()
  const { data: workingHours, isPending, isError } = useQuery(workingHoursQuery)
  const locale = getDateLocale(i18n.language)
  const today = getDay(new Date())

  if (isPending) {
    return (
      <div className="space-y-3" aria-busy="true">
        {weekOrder.map((day) => (
          <div key={day} className="h-6 animate-pulse rounded bg-slate-100" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <p className="text-red-600">{t('contact.hours.error')}</p>
  }

  return (
    <dl className="space-y-1 text-sm">
      {weekOrder.map((day) => {
        const hours = workingHours.find((item) => item.day === day)
        const isToday = day === today

        return (
          <div
            key={day}
            className={`flex justify-between rounded-xl px-3 py-2 ${isToday ? 'bg-brand-50 font-semibold text-brand-800' : 'text-slate-600'}`}
          >
            <dt>
              {locale.localize.day(day, { width: 'wide' })}
              {isToday && (
                <span className="ms-2 text-xs text-brand-600">({t('contact.hours.today')})</span>
              )}
            </dt>
            <dd>
              {!hours || hours.closed
                ? t('contact.hours.closed')
                : `${formatTime(timeToDate(hours.open), i18n.language)} - ${formatTime(timeToDate(hours.close), i18n.language)}`}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
