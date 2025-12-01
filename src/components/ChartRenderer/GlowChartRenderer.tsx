import type { FC } from 'react';
import { Line, LineChart } from 'recharts';

import type { ChartRendererProps } from '../../types';

import { getChartColor } from '../../constants/chartColors';
import ConfiguredTooltip from '../Tooltip/ConfiguredTooltip';

export interface GlowChartRendererProps extends ChartRendererProps {
  onMouseDown?: (e: { activeLabel?: string }) => void;
  onMouseMove?: (e: { activeLabel?: string }) => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
}

const GlowChartRenderer: FC<GlowChartRendererProps> = ({
  variations,
  data,
  children,
  isZoomMode,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}) => {
  return (
    <LineChart
      data={data}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {/* Render glow (wide, semi-transparent) lines first so they appear behind */}
      {variations.map(({ id = '0', name }, index) => (
        <Line
          key={`glow-${id ?? name}`}
          type="monotone"
          name={name}
          dataKey={String(id ?? '0')}
          stroke={getChartColor(index)}
          strokeWidth={12}
          strokeOpacity={0.3}
          dot={false}
          activeDot={false}
          legendType="none"
          tooltipType="none"
        />
      ))}

      {/* Render core (narrow, solid) lines on top */}
      {variations.map(({ id = '0', name }, index) => (
        <Line
          key={`core-${id ?? name}`}
          type="monotone"
          name={name}
          dataKey={String(id ?? '0')}
          stroke={getChartColor(index)}
          strokeWidth={1}
          dot={false}
          activeDot={false}
        />
      ))}

      {!isZoomMode && <ConfiguredTooltip variations={variations} />}
    </LineChart>
  );
};

export default GlowChartRenderer;
