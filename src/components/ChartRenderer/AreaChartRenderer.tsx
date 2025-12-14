import type { FC } from 'react';
import { Area, AreaChart } from 'recharts';

import type { ChartRendererProps } from '../../types';

import { getChartColor } from '../../constants/chartColors';
import ConfiguredTooltip from '../Tooltip/ConfiguredTooltip';

const AreaChartRenderer: FC<ChartRendererProps> = ({
  variations,
  data,
  children,
  isZoomMode,
  ...mouseHandlers
}) => {
  return (
    <AreaChart data={data} {...mouseHandlers}>
      <defs>
        {variations.map(({ id = '0', name }, index) => (
          <linearGradient key={id ?? name} id={`color-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={getChartColor(index)} stopOpacity={0.8} />
            <stop offset="95%" stopColor={getChartColor(index)} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>

      {variations.map(({ id = '0', name }, index) => (
        <Area
          key={id ?? name}
          type="monotone"
          name={name}
          dataKey={String(id ?? '0')}
          activeDot={false}
          stroke={getChartColor(index)}
          fillOpacity={1}
          fill={`url(#color-${id})`}
        />
      ))}

      {children}

      {!isZoomMode && <ConfiguredTooltip variations={variations} />}
    </AreaChart>
  );
};

export default AreaChartRenderer;
