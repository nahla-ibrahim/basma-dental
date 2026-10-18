export type ServiceIcon =
  'checkup' | 'cleaning' | 'filling' | 'root-canal' | 'whitening' | 'extraction'

export type Service = {
  id: string
  nameAr: string
  nameEn: string
  descriptionAr: string
  descriptionEn: string
  icon: ServiceIcon
  durationMin: number
  price: number
  active: boolean
}
