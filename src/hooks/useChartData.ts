import { useMemo, useState } from 'react';

import type { ApiResponseData, ChartDataPoint, TimeFrame } from '../types';
import type { ZoomRange } from './useZoomState';

import { transformData } from '../utils/transformData';
import { aggregateByWeek } from '../utils/aggregateByWeek';
import { getZoomedData } from '../utils/zoomUtils';

interface UseChartDataOptions {
  zoomedRange: ZoomRange | null;
  onZoomReset?: () => void;
}

export const useChartData = (chartData: ApiResponseData, options: UseChartDataOptions) => {
  const { zoomedRange, onZoomReset } = options;
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

  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    if (zoomedRange) {
      onZoomReset?.();
    }
    setTimeFrame(newTimeFrame);
  };

  return {
    data,
    baseData,
    timeFrame,
    handleTimeFrameChange,
  };
};
