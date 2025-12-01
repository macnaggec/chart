export function calculateConversionRate(conversions: number, visits: number): number {
  if (visits === 0) {
    return 0;
  }

  const rate = (conversions / visits) * 100;

  return Number(rate.toFixed(2));
}


