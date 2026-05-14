export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function maskDocument(doc: string): string {
  if (!doc) return ''
  if (doc.length <= 4) return doc
  return doc.slice(0, 2) + '*****' + doc.slice(-2)
}
