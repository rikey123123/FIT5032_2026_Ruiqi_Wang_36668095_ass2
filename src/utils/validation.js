export const INPUT_LIMITS = {
  fullName: 80,
  email: 254,
  password: 128,
  resourceTitle: 120,
  resourceSummary: 280,
  resourceContent: 3000,
}

export function containsHtml(value) {
  return /<\s*\/?\s*[a-z!][^>]*>/i.test(value)
}
