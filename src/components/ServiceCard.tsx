import {
  Activity,
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
  price: number
  durationMin: number
}

export function ServiceCard({ name, description, icon, price, durationMin }: ServiceCardProps) {
  const Icon = icons[icon]

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="bg-brand-50 text-brand-700 mb-4 flex size-12 items-center justify-center rounded-lg">
        <Icon className="size-6" aria-hidden="true" />
      </div>

      <h2 className="text-lg font-semibold text-slate-900">{name}</h2>
      <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-600">{description}</p>

      <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-sm text-slate-600">
        <span>{durationMin} دقيقة</span>
        <span className="text-brand-700 font-semibold">{price} ج.م</span>
      </div>
    </article>
  )
}
