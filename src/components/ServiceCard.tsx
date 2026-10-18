import {
  Activity,
  Clock,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Syringe,
  Toothbrush,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceIcon } from '../types/service'

const icons: Record<ServiceIcon, LucideIcon> = {
  checkup: Stethoscope,
  cleaning: Toothbrush,
  filling: ShieldPlus,
  'root-canal': Activity,
  whitening: Sparkles,
  extraction: Syringe,
}

type ServiceCardProps = {
  name: string
  description: string
  icon: ServiceIcon
  imageUrl: string
  price: number
  durationMin: number
}

export function ServiceCard({
  name,
  description,
  icon,
  imageUrl,
  price,
  durationMin,
}: ServiceCardProps) {
  const Icon = icons[icon]

  return (
    <article className="group hover:shadow-brand-900/10 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
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
        <span className="from-brand-500 to-brand-700 absolute start-5 -top-7 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ring-4 ring-white">
          <Icon className="size-7" aria-hidden="true" />
        </span>

        <h3 className="text-lg font-bold text-slate-900">{name}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Clock className="size-4" aria-hidden="true" />
            {durationMin} دقيقة
          </span>
          <span className="text-brand-700 text-base font-bold">{price} ج.م</span>
        </div>
      </div>
    </article>
  )
}
