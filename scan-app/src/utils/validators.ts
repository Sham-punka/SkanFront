export const validateInn = (value: string): boolean => {
  const cleaned = value.trim()
  return /^[0-9]{10}$/.test(cleaned) || /^[0-9]{12}$/.test(cleaned)
}

export const validateDateRange = (start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false
  const now = new Date()
  return start <= end && start <= now && end <= now
}
