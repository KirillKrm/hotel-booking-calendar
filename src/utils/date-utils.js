export function getMondayDate(date) {
  const dayOfWeek = date.getDay()
  const diffDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const mondayDate = new Date(date)

  mondayDate.setDate(date.getDate() - diffDays)

  return mondayDate
}

export function moveDateByOffset(date, daysOffset) {
  date = new Date(date)
  return date.setDate(date.getDate() + daysOffset)
}

export function isDateInRange(dateToCheck, startDate, endDate) {
  const date = new Date(dateToCheck)
  const start = new Date(startDate)
  const end = new Date(endDate)

  return date >= start && date <= end
}

export function countDaysInRange(startDate1, endDate1, startDate2, endDate2) {
  const start1 = new Date(startDate1)
  const end1 = new Date(endDate1)
  const start2 = new Date(startDate2)
  const end2 = new Date(endDate2)

  const intersectStart = start1 > start2 ? start1 : start2
  const intersectEnd = end1 < end2 ? end1 : end2
  const intersectDays =
    intersectStart <= intersectEnd
      ? Math.ceil((intersectEnd - intersectStart) / (1000 * 60 * 60 * 24))
      : 0

  return intersectDays
}

export function countDaysOffset(dateToCheck, startDate) {
  const date = new Date(dateToCheck)
  const start = new Date(startDate)

  const daysDifference = Math.ceil(
    Math.abs(date - start) / (1000 * 60 * 60 * 24)
  )

  return daysDifference
}

export function dateToString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dateString = `${year}-${month}-${day}`
  return dateString
}
