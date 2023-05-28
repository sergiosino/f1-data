import { capitalizeString } from "./formatString"

export const formatDatePretty = (date) => {
    const day = addZero(date.getDate())
    const month = addZero(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = addZero(date.getHours())
    const minutes = addZero(date.getMinutes())
    return `${day}/${month}/${year} ${hours}:${minutes}`
}

export const startEndDay = (start, end) => {
    const startDay = new Date(start).getDate()
    const endDay = new Date(end).getDate()
    const startEnd = `${addZero(startDay)}-${addZero(endDay)}`
    return startEnd
}

export const shortMonth = (date) => {
    const month = new Date(date).toLocaleString('default', { month: 'short' })
    return capitalizeString(month)
}

const addZero = (value) => {
    return value <= 9 ? '0' + value : value
}
