export function formatPrice(price: number, language: string) {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price)
}
