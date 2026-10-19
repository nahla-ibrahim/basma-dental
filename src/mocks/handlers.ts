import { delay, http, HttpResponse } from 'msw'
import type { Doctor } from '../types/doctor'
import type { Service } from '../types/service'

const services: Service[] = [
  {
    id: 's1',
    nameAr: 'كشف وفحص',
    nameEn: 'Check-up',
    descriptionAr: 'فحص شامل للأسنان واللثة مع خطة علاج واضحة.',
    descriptionEn: 'A full examination of your teeth and gums with a clear treatment plan.',
    icon: 'checkup',
    imageUrl: '/images/services/checkup.webp',
    durationMin: 30,
    price: 200,
    active: true,
  },
  {
    id: 's2',
    nameAr: 'تنظيف الأسنان',
    nameEn: 'Teeth cleaning',
    descriptionAr: 'إزالة الجير والتصبغات وتلميع الأسنان.',
    descriptionEn: 'Removal of tartar and stains, followed by polishing.',
    icon: 'cleaning',
    imageUrl: '/images/services/cleaning.webp',
    durationMin: 45,
    price: 400,
    active: true,
  },
  {
    id: 's3',
    nameAr: 'حشو تجميلي',
    nameEn: 'Composite filling',
    descriptionAr: 'علاج التسوس بحشو بلون السن الطبيعي.',
    descriptionEn: 'Treating cavities with a tooth-coloured filling.',
    icon: 'filling',
    imageUrl: '/images/services/filling.webp',
    durationMin: 60,
    price: 600,
    active: true,
  },
  {
    id: 's4',
    nameAr: 'حشو عصب',
    nameEn: 'Root canal',
    descriptionAr: 'علاج العصب الملتهب للحفاظ على السن بدل خلعه.',
    descriptionEn: 'Treating an inflamed nerve to save the tooth instead of extracting it.',
    icon: 'root-canal',
    imageUrl: '/images/services/root-canal.webp',
    durationMin: 90,
    price: 1500,
    active: true,
  },
  {
    id: 's5',
    nameAr: 'تبييض الأسنان',
    nameEn: 'Teeth whitening',
    descriptionAr: 'جلسة تبييض في العيادة لابتسامة أفتح بدرجات.',
    descriptionEn: 'An in-clinic whitening session for a noticeably brighter smile.',
    icon: 'whitening',
    imageUrl: '/images/services/whitening.webp',
    durationMin: 60,
    price: 2500,
    active: true,
  },
  {
    id: 's6',
    nameAr: 'خلع ضرس',
    nameEn: 'Tooth extraction',
    descriptionAr: 'خلع آمن تحت تخدير موضعي مع تعليمات ما بعد الخلع.',
    descriptionEn: 'Safe extraction under local anaesthesia with aftercare instructions.',
    icon: 'extraction',
    imageUrl: '/images/services/extraction.webp',
    durationMin: 30,
    price: 500,
    active: true,
  },
]

const doctors: Doctor[] = [
  {
    id: 'd1',
    nameAr: 'د. أحمد سامي',
    nameEn: 'Dr. Ahmed Samy',
    specialtyAr: 'طب أسنان عام',
    specialtyEn: 'General dentistry',
    serviceIds: ['s1', 's2', 's3', 's6'],
  },
  {
    id: 'd2',
    nameAr: 'د. منى الشريف',
    nameEn: 'Dr. Mona El-Sherif',
    specialtyAr: 'تجميل الأسنان',
    specialtyEn: 'Cosmetic dentistry',
    serviceIds: ['s1', 's2', 's3', 's5'],
  },
  {
    id: 'd3',
    nameAr: 'د. كريم عادل',
    nameEn: 'Dr. Karim Adel',
    specialtyAr: 'علاج الجذور والأعصاب',
    specialtyEn: 'Endodontics',
    serviceIds: ['s1', 's3', 's4'],
  },
  {
    id: 'd4',
    nameAr: 'د. سارة حسن',
    nameEn: 'Dr. Sara Hassan',
    specialtyAr: 'جراحة الفم والأسنان',
    specialtyEn: 'Oral surgery',
    serviceIds: ['s1', 's4', 's6'],
  },
]

export const handlers = [
  http.get('/api/services', async () => {
    await delay()
    return HttpResponse.json(services)
  }),

  http.get('/api/doctors', async () => {
    await delay()
    return HttpResponse.json(doctors)
  }),
]
