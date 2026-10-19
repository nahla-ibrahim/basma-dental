import { format, isToday } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { getDateLocale } from '../lib/format'

export type DayOption = {
  key: string
  date: Date
  isAvailable: boolean
}

type DayPickerProps = {
  days: DayOption[]
  selectedKey: string | null
  onSelect: (key: string) => void
}

export function DayPicker({ days, selectedKey, onSelect }: DayPickerProps) {
  const { t, i18n } = useTranslation()
  const locale = getDateLocale(i18n.language)

  return (
    <div
      role="group"
      aria-label={t('booking.timeStep.days')}
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-3"
    >
      {days.map((day) => {
        const isSelected = day.key === selectedKey

        return (
          <button
            key={day.key}
            type="button"
            onClick={() => onSelect(day.key)}
            disabled={!day.isAvailable}
            aria-pressed={isSelected}
            aria-label={format(day.date, 'EEEE d MMMM', { locale })}
            className={`flex w-18 shrink-0 flex-col items-center gap-0.5 rounded-2xl py-3 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              isSelected
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 enabled:hover:bg-brand-50 enabled:hover:ring-brand-200'
            }`}
          >
            <span className={isSelected ? 'text-brand-100' : 'text-slate-500'}>
              {isToday(day.date)
                ? t('booking.timeStep.today')
                : format(day.date, 'EEE', { locale })}
            </span>
            <span className="text-xl font-bold">{format(day.date, 'd', { locale })}</span>
            <span className={`text-xs ${isSelected ? 'text-brand-100' : 'text-slate-400'}`}>
              {day.isAvailable ? format(day.date, 'MMM', { locale }) : t('booking.timeStep.closed')}
            </span>
          </button>
        )
      })}
    </div>
  )
}
