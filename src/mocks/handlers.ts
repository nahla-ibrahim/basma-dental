import { delay, http, HttpResponse } from 'msw'

const services = [
  { id: 's1', nameAr: 'كشف وفحص', nameEn: 'Check-up', durationMin: 30, price: 200, active: true },
  {
    id: 's2',
    nameAr: 'تنظيف الأسنان',
    nameEn: 'Teeth cleaning',
    durationMin: 45,
    price: 400,
    active: true,
  },
  { id: 's3', nameAr: 'حشو عادي', nameEn: 'Filling', durationMin: 60, price: 600, active: true },
  { id: 's4', nameAr: 'حشو عصب', nameEn: 'Root canal', durationMin: 90, price: 1500, active: true },
  {
    id: 's5',
    nameAr: 'تبييض الأسنان',
    nameEn: 'Teeth whitening',
    durationMin: 60,
    price: 2500,
    active: true,
  },
  {
    id: 's6',
    nameAr: 'خلع ضرس',
    nameEn: 'Tooth extraction',
    durationMin: 30,
    price: 500,
    active: true,
  },
]

export const handlers = [
  http.get('/api/services', async () => {
    await delay()
    return HttpResponse.json(services)
  }),
]
