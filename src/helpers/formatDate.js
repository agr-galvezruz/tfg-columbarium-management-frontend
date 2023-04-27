import moment from 'moment'

export const formatDbToEsDate = (date) => {
  if (!date) return null
  return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
}

export const formatEsToDbDate = (date) => {
  if (!date) return null
  return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export const addYearsEs = (date, years) => {
  if (!date) return null
  return moment(date, 'DD/MM/YYYY').add(years, 'y').format('DD/MM/YYYY')
}