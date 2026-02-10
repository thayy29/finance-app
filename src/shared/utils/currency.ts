export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function parseCurrency(formattedValue: string): number {
  if (!formattedValue) return 0;
  return Number(formattedValue.replace(/\D/g, '')) / 100;
}

export function formatInputCurrency(text: string): string {
  const value = text.replace(/\D/g, '');
  if (!value) return '';
  return (Number(value) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDateBR(dateStr: string): string {
  const dt = new Date(dateStr + 'T12:00:00');
  return dt.toLocaleDateString('pt-BR');
}

export function getMonthYear(dateStr: string): string {
  const dt = new Date(dateStr + 'T12:00:00');
  return dt.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}
