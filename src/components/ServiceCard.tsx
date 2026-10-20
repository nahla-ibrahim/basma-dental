import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { formatPrice } from '../lib/format'
import { serviceIcons } from '../lib/serviceIcons'
import type { ServiceIcon } from '../types/service'

type ServiceCardProps = {
  id: string
  name: string
  description: string
  icon: ServiceIcon
  imageUrl: string
  price: number
  durationMin: number
}

export function ServiceCard({
  id,
  name,
  description,
  icon,
  imageUrl,
  price,
  durationMin,
}: ServiceCardProps) {
  const { t, i18n } = useTranslation()
  const Icon = serviceIcons[icon]
  const formattedPrice = formatPrice(price, i18n.language)

  return (
    <Link
      to={`/services/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-edge transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10"
    >
      <div className="aspect-[8/5] overflow-hidden">
        <img
          src={imageUrl}
          alt="{description}"
          width={800}
          height={500}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-5 pt-9">
        <span className="absolute start-5 -top-7 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg ring-4 ring-surface">
          <Icon className="size-7" aria-hidden="true" />
        </span>

        <h3 className="text-lg font-bold text-ink">{name}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-ink-subtle">
            <Clock className="size-4" aria-hidden="true" />
            {t('services.duration', { value: durationMin })}
          </span>
          <span className="text-base font-bold text-accent">{formattedPrice}</span>
        </div>
      </div>
    </Link>
  )
}
