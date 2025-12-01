import type { FC } from 'react';

import { useChartContext } from '../../context/chart/useChartContext';

interface ChartCursorProps {
  x?: number;
  y?: number;
  width?: number;   // Chart area width
  height?: number;  // Chart area height
  points?: Array<{ x: number; y: number }>;
  payload?: unknown[];
  // custom props
  tooltipWidth?: number;
  gap?: number;
  top?: number;
}

const CustomCursor: FC<ChartCursorProps> = (props) => {
  const { gap = 10, height, points, top = 200 } = props;

  const {
    getTooltipWidth,
    cursorRef,
    getTooltipSide,
  } = useChartContext();

  const tooltipWidth = getTooltipWidth();
  const tooltipSide = getTooltipSide();

  const cursorX = points?.[0]?.x;
  const cursorY = points?.[0]?.y;

  if (cursorX === undefined || height === undefined) return null;

  const stripeWidth = gap + tooltipWidth;
  const stripeX = tooltipSide === 'right'
    ? cursorX
    : cursorX - gap - tooltipWidth;

  return (
    <g>
      {/* Stripe rectangle */}
      <rect
        x={stripeX}
        y={cursorY ?? top}
        width={stripeWidth}
        height={height - 1}
        fill="var(--cursor-stripe)"
      />
      {/* Vertical cursor line */}
      <line
        ref={cursorRef}
        x1={cursorX}
        y1={cursorY ?? top}
        x2={cursorX}
        y2={(cursorY ?? top) + height}
        stroke="var(--cursor-line)"
        strokeWidth={1}
      />
    </g>
  );
};

export default CustomCursor;
