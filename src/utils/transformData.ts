import type { ApiResponseData, ChartDataPoint } from '../types';

import { calculateConversionRate } from './calculateConversionRate';

export function transformData(initialData: ApiResponseData): ChartDataPoint[] {
  return initialData.data.map(dailyData => {
    const result: ChartDataPoint = {
      date: dailyData.date,
    };

    const variations = Object.keys(dailyData.visits);

    variations.forEach(variationId => {
      if (
        typeof dailyData.conversions[variationId] === 'undefined'
        || typeof dailyData.visits[variationId] === 'undefined'
      ) return;

      result[variationId] = calculateConversionRate(
        dailyData.conversions[variationId],
        dailyData.visits[variationId],
      );
    });

    return result;
  });
}
