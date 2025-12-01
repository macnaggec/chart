import type { FC, ReactNode } from 'react';
import { Line, LineChart } from 'recharts';
import type { CurveType } from 'recharts/types/shape/Curve';

import type { ChartRendererProps } from '../../types';

import { getChartColor } from '../../constants/chartColors';
import ConfiguredTooltip from '../Tooltip/ConfiguredTooltip';

export interface LineChartProps extends ChartRendererProps {
  curveType?: CurveType;
  tooltip?: ReactNode;
  onMouseDown?: (e: { activeLabel?: string }) => void;
  onMouseMove?: (e: { activeLabel?: string }) => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
}

const LineChartRenderer: FC<LineChartProps> = ({
  variations,
  data,
  curveType = 'linear',
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

      {variations.map(({ id = '0', name }, index) => (
        <Line
          key={id ?? name}
          dot={false}
          name={name}
          type={curveType}
          dataKey={String(id ?? '0')}
          stroke={getChartColor(index)}
          activeDot={false}
        />
      ))}

      {!isZoomMode && <ConfiguredTooltip variations={variations} />}
    </LineChart>
  );
};

export default LineChartRenderer;
