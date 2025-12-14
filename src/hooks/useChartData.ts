import { useCallback, useMemo, useState } from 'react';

import type { ApiResponseData, ChartDataPoint, TimeFrame } from '../types';
import type { ZoomRange } from './useZoomState';

import { transformData } from '../utils/transformData';
import { aggregateByWeek } from '../utils/aggregateByWeek';
import { getZoomedData } from '../utils/zoomUtils';

export const useChartData = (
  chartData: ApiResponseData,
  zoomedRange: ZoomRange | null,
  onZoomReset?: () => void
) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');

  const dailyRates = useMemo(() => {
    if (!chartData) return [];
    return transformData(chartData);
  }, [chartData]);

  const baseData = useMemo(() => {
    if (timeFrame === 'week') {
      return aggregateByWeek(dailyRates);
    }
    return dailyRates;
  }, [dailyRates, timeFrame]);

  const data: ChartDataPoint[] = useMemo(() => {
    return getZoomedData(baseData, zoomedRange);
  }, [baseData, zoomedRange]);

  const handleTimeFrameChange = useCallback((newTimeFrame: TimeFrame) => {
    if (zoomedRange) {
      onZoomReset?.();
    }
    setTimeFrame(newTimeFrame);
  }, [zoomedRange, onZoomReset]);

  return {
    data,
    baseData,
    timeFrame,
    handleTimeFrameChange,
  };
};
