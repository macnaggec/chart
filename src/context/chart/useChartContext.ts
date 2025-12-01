import { createContext, useContext } from 'react';

import type { RefObject } from 'react';

interface ChartContextValue {
  tooltipRef: RefObject<HTMLDivElement | null>;
  cursorRef: RefObject<SVGLineElement | null>;
  getTooltipWidth: () => number;
  getTooltipSide: () => 'left' | 'right' | null;
}

export const ChartContext = createContext<ChartContextValue | null>(null);

export const useChartContext = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChartContext must be used within ChartProvider');
  }

  return context;
};
