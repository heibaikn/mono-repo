import { DateTime } from 'luxon'

export const formatTime = (date: string, format = 'yyyy-MM-dd HH:mm:ss') => {
  return DateTime.fromISO(date).toFormat(format)
}
export const formatFromDate = (date: any, format = 'yyyy-MM-dd HH:mm:ss') => {
  return DateTime.fromJSDate(date).toFormat(format)
}

export const formatFromNow = (offset = 0, format = 'yyyy-MM-dd hh:mm:ss') => {
  format = format.replaceAll('Y', 'y')
  return DateTime.now().plus({ days: offset }).toISO()
}
