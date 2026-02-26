export const formatCurrency = (amount: number | bigint): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount)
}

export const formatEra = (year: number): string => {
  const date = new Date(year, 4, 1)

  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric',
  })

  return formatter.format(date).replace('年', '年度')
}

export const formatDateIntl = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }

  return new Intl.DateTimeFormat('ja-JP', options).format(date)
}

export const formatDateForMeetingDate = (date: Date): Date => {
  const tempDate = new Date(date)
  tempDate.setSeconds(0, 0)

  return tempDate
}
