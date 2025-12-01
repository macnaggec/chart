import { useCallback, useMemo, useRef } from 'react';

import type { ReactNode } from 'react';

import { ChartContext } from './useChartContext';

export const ChartProvider = ({ children }: { children: ReactNode }) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<SVGLineElement | null>(null);

  const getTooltipWidth = useCallback(() => {
    return tooltipRef.current?.offsetWidth ?? 150;
  }, []);

  const getTooltipSide = useCallback((): 'left' | 'right' | null => {
    const cursorRect = cursorRef.current?.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();

    if (!cursorRect || !tooltipRect) {
      return null;
    };

    return cursorRect.left > tooltipRect.left ? 'left' : 'right';
  }, []);

  const value = useMemo(() => ({
    tooltipRef,
    cursorRef,
    getTooltipWidth,
    getTooltipSide
  }), [getTooltipWidth, getTooltipSide]);

  return (
    <ChartContext.Provider value={value}>
      {children}
    </ChartContext.Provider>
  );
};
