
// South African business formatting utilities
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-ZA').format(num);
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getGrowthIndicator = (current: number, previous: number) => {
  const growth = ((current - previous) / previous) * 100;
  return {
    value: growth,
    trend: growth >= 0 ? 'up' : 'down',
    color: growth >= 0 ? 'text-green-400' : 'text-red-400',
  };
};
