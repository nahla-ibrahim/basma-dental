import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const steps = ['service', 'time', 'details'] as const

type BookingStepsProps = {
  currentStep: number
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const { t } = useTranslation()

  return (
    <ol aria-label={t('booking.steps.label')} className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isDone = index < currentStep
        const isCurrent = index === currentStep

        return (
          <li
            key={step}
            aria-current={isCurrent ? 'step' : undefined}
            className="flex flex-1 items-center gap-2 last:flex-none"
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                isDone || isCurrent
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-400 ring-1 ring-slate-200'
              }`}
            >
              {isDone ? <Check className="size-4" aria-hidden="true" /> : index + 1}
            </span>
            <span
              className={`text-sm font-semibold ${isCurrent ? 'text-slate-900' : 'text-slate-400'}`}
            >
              {t(`booking.steps.${step}`)}
            </span>
            {index < steps.length - 1 && (
              <span
                className={`h-0.5 flex-1 rounded-full ${isDone ? 'bg-brand-600' : 'bg-slate-200'}`}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}
