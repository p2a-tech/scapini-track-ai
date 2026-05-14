export function statusColor(status: string): { bg: string; text: string; dot: string } {
  const s = status.toLowerCase()
  if (/entregue|concluí|concluí|coletada|coletado|autorizado|ativ|conectado|disponível|em dia/.test(s)) {
    return { bg: 'bg-success-50', text: 'text-success-700', dot: 'bg-success-500' }
  }
  if (/atrasad|atraso|extraviado|rejeitad|erro|sem sinal|bloqueado|sinistro|crítica|critica/.test(s)) {
    return { bg: 'bg-danger-50', text: 'text-danger-700', dot: 'bg-danger-500' }
  }
  if (/ocorrência|ocorrencia|aguardando|pendente|alerta|bateria baixa|reentrega|reagendado|aviso|em homologação|atenção|atencao/.test(s)) {
    return { bg: 'bg-warning-50', text: 'text-warning-700', dot: 'bg-warning-500' }
  }
  if (/em rota|trânsito|transito|carregando|saiu|em andamento|em viagem|em tratamento|programado|notificada/.test(s)) {
    return { bg: 'bg-brand-50', text: 'text-brand-700', dot: 'bg-brand-500' }
  }
  if (/cancel|inativ|devolvid|folga|desativ/.test(s)) {
    return { bg: 'bg-graphite-100', text: 'text-graphite-700', dot: 'bg-graphite-500' }
  }
  if (/na filial|cross|conferência|conferencia|recebida|separação/.test(s)) {
    return { bg: 'bg-navy-50', text: 'text-navy-700', dot: 'bg-navy-500' }
  }
  return { bg: 'bg-graphite-100', text: 'text-graphite-700', dot: 'bg-graphite-500' }
}

export function riskColor(level: string): { bg: string; text: string; label: string } {
  if (level === 'alto' || level === 'critica' || level === 'crítica') return { bg: 'bg-danger-50', text: 'text-danger-700', label: 'Risco alto' }
  if (level === 'medio' || level === 'media' || level === 'média') return { bg: 'bg-warning-50', text: 'text-warning-700', label: 'Risco médio' }
  return { bg: 'bg-success-50', text: 'text-success-700', label: 'Risco baixo' }
}

export function trackingSourceColor(source: string): { bg: string; text: string } {
  const s = source.toLowerCase()
  if (s.includes('gps')) return { bg: 'bg-navy-50', text: 'text-navy-700' }
  if (s.includes('api')) return { bg: 'bg-brand-50', text: 'text-brand-700' }
  if (s.includes('app')) return { bg: 'bg-success-50', text: 'text-success-700' }
  if (s.includes('link')) return { bg: 'bg-warning-50', text: 'text-warning-700' }
  if (s.includes('device')) return { bg: 'bg-accent-50', text: 'text-accent-700' }
  if (s.includes('evento')) return { bg: 'bg-graphite-100', text: 'text-graphite-700' }
  return { bg: 'bg-graphite-100', text: 'text-graphite-700' }
}

export function scoreColor(score: number): string {
  if (score >= 85) return 'text-success-700'
  if (score >= 60) return 'text-warning-700'
  if (score >= 30) return 'text-accent-700'
  return 'text-danger-700'
}
