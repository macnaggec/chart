import type { FC } from 'react';
import { Line, LineChart } from 'recharts';

import type { ChartRendererProps } from '../../types';

import { getChartColor } from '../../constants/chartColors';
import ConfiguredTooltip from '../Tooltip/ConfiguredTooltip';

const GlowChartRenderer: FC<ChartRendererProps> = ({
  variations,
  data,
  children,
  isZoomMode,
  ...mouseHandlers
}) => {
  return (
    <LineChart data={data} {...mouseHandlers}>
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
