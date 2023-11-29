function isDateValid(dateStr: string) {
  const data = new Date(dateStr)
  return !isNaN(data.valueOf())
}

export { isDateValid }
