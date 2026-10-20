import { addDays, set, startOfDay } from 'date-fns'
import type { Booking } from '../types/booking'
import type { Doctor } from '../types/doctor'
import type { Service } from '../types/service'
import type { WorkingHours } from '../types/workingHours'

export const seedServices: Service[] = [
  {
    id: 's1',
    nameAr: 'الكشف والفحص',
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
    nameAr: 'الحشو التجميلي',
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
    nameAr: 'علاج العصب',
    nameEn: 'Root canal',
    descriptionAr: 'علاج العصب الملتهب للحفاظ على السن بدلًا من خلعه.',
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
    descriptionAr: 'جلسة تبييض داخل العيادة لابتسامة أكثر إشراقًا.',
    descriptionEn: 'An in-clinic whitening session for a noticeably brighter smile.',
    icon: 'whitening',
    imageUrl: '/images/services/whitening.webp',
    durationMin: 60,
    price: 2500,
    active: true,
  },
  {
    id: 's6',
    nameAr: 'خلع الأسنان',
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

export const seedDoctors: Doctor[] = [
  {
    id: 'd1',
    nameAr: 'د. أحمد سامي',
    nameEn: 'Dr. Ahmed Samy',
    specialtyAr: 'طب الأسنان العام',
    specialtyEn: 'General dentistry',
    bioAr:
      'يتابع د. أحمد صحة أسنان مرضاه بدءًا من الفحص الدوري وحتى علاج التسوس، ويحرص على شرح خطة العلاج بوضوح قبل البدء.',
    bioEn:
      'Dr. Ahmed looks after his patients from routine check-ups to cavity treatment, and always explains the treatment plan clearly before starting.',
    yearsOfExperience: 12,
    imageUrl: '/images/doctors/d1.webp',
    serviceIds: ['s1', 's2', 's3', 's6'],
  },
  {
    id: 'd2',
    nameAr: 'د. منى الشريف',
    nameEn: 'Dr. Mona El-Sherif',
    specialtyAr: 'تجميل الأسنان',
    specialtyEn: 'Cosmetic dentistry',
    bioAr:
      'متخصصة في تجميل الأسنان والتبييض، وتهتم بأن تبدو النتيجة طبيعية ومتناسقة مع ملامح كل مريض.',
    bioEn:
      "A specialist in cosmetic dentistry and whitening who makes sure every result looks natural and suits each patient's features.",
    yearsOfExperience: 9,
    imageUrl: '/images/doctors/d2.webp',
    serviceIds: ['s1', 's2', 's3', 's5'],
  },
  {
    id: 'd3',
    nameAr: 'د. كريم عادل',
    nameEn: 'Dr. Karim Adel',
    specialtyAr: 'علاج الجذور والأعصاب',
    specialtyEn: 'Endodontics',
    bioAr:
      'متخصص في علاج الجذور والأعصاب باستخدام أحدث الأجهزة، بهدف الحفاظ على الأسنان الطبيعية وتجنّب خلعها.',
    bioEn:
      'A root canal specialist who uses modern equipment to save natural teeth and avoid extractions.',
    yearsOfExperience: 15,
    imageUrl: '/images/doctors/d3.webp',
    serviceIds: ['s1', 's3', 's4'],
  },
  {
    id: 'd4',
    nameAr: 'د. سارة حسن',
    nameEn: 'Dr. Sara Hassan',
    specialtyAr: 'جراحة الفم والأسنان',
    specialtyEn: 'Oral surgery',
    bioAr:
      'متخصصة في جراحة الفم والخلع الجراحي، وتحرص على أن تكون الجلسة هادئة ومريحة قدر الإمكان.',
    bioEn:
      'An oral surgery specialist who keeps every procedure as calm and comfortable as possible.',
    yearsOfExperience: 11,
    imageUrl: '/images/doctors/d4.webp',
    serviceIds: ['s1', 's4', 's6'],
  },
]

export const seedWorkingHours: WorkingHours[] = [
  { day: 0, open: '10:00', close: '20:00', closed: false },
  { day: 1, open: '10:00', close: '20:00', closed: false },
  { day: 2, open: '10:00', close: '20:00', closed: false },
  { day: 3, open: '10:00', close: '20:00', closed: false },
  { day: 4, open: '10:00', close: '20:00', closed: false },
  { day: 5, open: '10:00', close: '20:00', closed: true },
  { day: 6, open: '10:00', close: '20:00', closed: false },
]

export const DEMO_USER_ID = 'u-demo'

const demoPatients = [
  { name: 'Omar Khaled', phone: '01012345678', email: 'omar@example.com' },
  { name: 'Nour Ali', phone: '01123456789', email: 'nour@example.com' },
  { name: 'Youssef Hany', phone: '01234567890', email: 'youssef@example.com' },
  { name: 'Salma Tarek', phone: '01534567891', email: 'salma@example.com' },
  { name: 'Mariam Adel', phone: '01045678912', email: 'mariam@example.com' },
]

export function createSeedBookings(today: Date): Booking[] {
  const bookings: Booking[] = []

  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const day = addDays(startOfDay(today), dayOffset)

    seedDoctors.forEach((doctor, doctorIndex) => {
      for (let index = 0; index < 3; index++) {
        const hour = 10 + ((dayOffset * 3 + doctorIndex * 2 + index * 3) % 10)
        const startsAt = set(day, { hours: hour })
        const endsAt = set(day, { hours: hour + 1 })

        const patient = demoPatients[(dayOffset + doctorIndex + index) % demoPatients.length]

        bookings.push({
          id: `b-${dayOffset}-${doctor.id}-${index}`,
          serviceId: doctor.serviceIds[0],
          doctorId: doctor.id,
          userId: DEMO_USER_ID,
          patientName: patient.name,
          patientPhone: patient.phone,
          patientEmail: patient.email,
          startsAt: startsAt.toISOString(),
          endsAt: endsAt.toISOString(),
          status: 'confirmed',
        })
      }
    })
  }

  return bookings
}
