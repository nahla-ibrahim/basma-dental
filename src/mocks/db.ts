import { format } from 'date-fns'
import type { Booking } from '../types/booking'
import type { Doctor } from '../types/doctor'
import type { ContactMessage } from '../types/message'
import type { Service } from '../types/service'
import type { WorkingHours } from '../types/workingHours'
import {
  createSeedBookings,
  DEMO_USER_ID,
  seedDoctors,
  seedServices,
  seedWorkingHours,
} from './seed'

const STORAGE_KEY = 'basma-db-v3'

type Db = {
  services: Service[]
  doctors: Doctor[]
  workingHours: WorkingHours[]
  bookings: Booking[]
  messages: ContactMessage[]
  seededOn: string
}

export function readDb(): Db {
  const today = new Date()
  const todayKey = format(today, 'yyyy-MM-dd')
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    const db: Db = {
      services: seedServices,
      doctors: seedDoctors,
      workingHours: seedWorkingHours,
      bookings: createSeedBookings(today),
      messages: [],
      seededOn: todayKey,
    }
    writeDb(db)
    return db
  }

  const db = JSON.parse(saved) as Db
  db.messages ??= []

  if (db.seededOn !== todayKey) {
    const userBookings = db.bookings.filter((booking) => booking.userId !== DEMO_USER_ID)
    db.bookings = [...userBookings, ...createSeedBookings(today)]
    db.seededOn = todayKey
    writeDb(db)
  }

  return db
}

export function writeDb(db: Db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}
