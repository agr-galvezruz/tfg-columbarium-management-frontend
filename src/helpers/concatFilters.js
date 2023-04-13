export const concatFilters = (filters, pagination) => {
  if (!filters) {
    return `?page=${pagination}`
  }

  return `?${filters}&page=${pagination}`
}