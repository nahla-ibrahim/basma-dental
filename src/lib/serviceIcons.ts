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

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  checkup: Stethoscope,
  cleaning: Toothbrush,
  filling: ShieldPlus,
  'root-canal': Activity,
  whitening: Sparkles,
  extraction: Syringe,
}
