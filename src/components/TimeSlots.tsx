import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatTime } from '../lib/format'
import type { DoctorSlot } from '../lib/slots'

type TimeSlotsProps = {
  slots: DoctorSlot[]
  selected: DoctorSlot | null
  onSelect: (slot: DoctorSlot) => void
}

export function TimeSlots({ slots, selected, onSelect }: TimeSlotsProps) {
  const { t, i18n } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('booking.timeStep.times')}
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {slots.map((slot) => {
        const isSelected = slot.start.getTime() === selected?.start.getTime()

        return (
          <button
            key={slot.start.getTime()}
            type="button"
            onClick={() => onSelect(slot)}
            aria-pressed={isSelected}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              isSelected
                ? 'bg-brand-600 text-white'
                : 'bg-accent-soft text-accent hover:bg-accent-muted'
            }`}
          >
            <Clock className="size-4" aria-hidden="true" />
            {formatTime(slot.start, i18n.language)}
          </button>
        )
      })}
    </div>
  )
}
