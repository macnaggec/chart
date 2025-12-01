import { describe, expect, it } from 'vitest';

import type { ApiResponseData, ChartDataPoint } from '../types';

import data from '../../public/data.json';
import { aggregateByWeek } from './aggregateByWeek';
import { transformData } from './transformData';

describe('aggregateByWeek', () => {
  it('should aggregate daily conversion rates into weekly averages', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const firstWeek = result[0];
    expect(Object.keys(firstWeek)).toHaveLength(5);

    const { date, ...firstWeekData } = firstWeek;
    expect(date).toBeDefined();

    expect(Object.keys(firstWeekData).length).toBeGreaterThan(0);

    Object.values(firstWeekData).forEach(value => {
      expect(typeof value).toBe('number');
    });
  });

  it('should start weeks on the same day of the week as the first date', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    const firstDate = result[0].date;
    const firstDayOfWeek = new Date(firstDate).getDay();

    result.forEach(weekData => {
      const weekStartDate = weekData.date;
      const dayOfWeek = new Date(weekStartDate).getDay();
      expect(dayOfWeek).toBe(firstDayOfWeek);
    });
  });

  it('should calculate average conversion rates for each variation', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    result.forEach(weekData => {
      const variations = weekData;

      Object.keys(variations).forEach(key => {
        if (key === 'date') return;

        expect(variations[key]).toBeGreaterThanOrEqual(0);
        expect(Number.isFinite(variations[key])).toBe(true);

        const asStr = String(variations[key]);
        expect(/^-?\d+(?:\.\d{1,2})?$/.test(asStr)).toBe(true);
      });
    });
  });

  it('should handle variations that appear and disappear during the test period', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    const allVariationIds = new Set<string>();

    result.forEach(weekData => {
      const variations = weekData;
      Object.keys(variations).forEach(id => allVariationIds.add(id));
    });

    expect(allVariationIds.size).toBeGreaterThan(0);
    expect(allVariationIds.has('0')).toBe(true);
  });

  it('should produce 5 weeks of data from January 2025 dataset', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    expect(result.length).toBe(5);
  });

  it('should correctly calculate averages for incomplete week (Jan 29-31)', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    const lastWeek = result[result.length - 1];
    const lastWeekDate = lastWeek.date;
    const lastWeekData = result[result.length - 1];

    expect(lastWeekDate).toBe('2025-01-29');

    expect(lastWeekData['0']).toBeCloseTo(12.76, 2);
    expect(lastWeekData['10001']).toBeCloseTo(18.42, 2);
    expect(lastWeekData['10002']).toBeCloseTo(22.30, 2);
    expect(lastWeekData['10003']).toBeCloseTo(0, 2);

    expect(Object.keys(lastWeekData)).not.toContain('counts');
  });

  it('should not include counts in output and should not contain NaN values', () => {
    const preparedData = transformData(data as ApiResponseData);
    const result = aggregateByWeek(preparedData);

    result.forEach(weekData => {
      expect(Object.keys(weekData)).not.toContain('counts');

      Object.keys(weekData).forEach(key => {
        if (key === 'date') return;

        const value = Number((weekData as unknown as ChartDataPoint)[key]);
        expect(Number.isFinite(value)).toBe(true);
      });
    });
  });
});
