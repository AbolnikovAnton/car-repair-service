// Контактные данные (вымышленные) — замените на реальные
export const CONTACTS = {
  phoneDisplay: '+972 50-123-4567',
  phoneHref: 'tel:+972501234567',
  whatsapp: '972501234567',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=34.7780%2C31.9560%2C34.8080%2C31.9760&layer=mapnik',
}

export const waLink = (text?: string) =>
  `https://wa.me/${CONTACTS.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
