export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type WorkingHours = {
  day: WeekDay
  open: string
  close: string
  closed: boolean
}
