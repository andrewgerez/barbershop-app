import { addMinutes, format, setHours, setMinutes } from "date-fns"

export const generateDayTimeList = (date: Date) => {
  const startTime = setMinutes(setHours(date, 9), 0)
  const endTime = setMinutes(setHours(date, 20), 0)
  const interval = 45
  const timeList: string[] = []

  let currentTime = startTime

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"))
    currentTime = addMinutes(currentTime, interval)
  }

  return timeList
}
