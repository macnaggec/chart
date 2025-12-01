import type { FC } from 'react';

interface PercentTickProps {
  x?: number;
  y?: number;
  payload?: { value: number };
}

const PercentTick: FC<PercentTickProps> = ({ x, y, payload }) => {
  const value = payload?.value;
  const isZero = value === 0;

  return (
    <text
      x={x}
      y={y}
      textAnchor="end"
      fill="var(--chart-axis-text)"
      fontSize={12}
    >
      {isZero ? (
        <tspan dy={4}>{value}</tspan>
      ) : (
        <>
          <tspan x={x} dy={6}>{value}</tspan>
          <tspan x={x} dy={14}>%</tspan>
        </>
      )}
    </text>
  );
};

export default PercentTick;
