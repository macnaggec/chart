import { forwardRef } from 'react';
import { ReferenceArea, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import type { ChartDataPoint, ChartStyle, Variation } from '../../types';
import type { ZoomStateReturn } from '../../hooks';

import { ChartProvider } from '../../context/chart/ChartContextValue';
import PercentTick from '../PercentTick';
import styleRenderers from '../ChartRenderer/styleRenderers';

import classes from './ChartWrapper.module.css';

export interface ChartProps {
  data: ChartDataPoint[];
  fullData?: ChartDataPoint[];
  style?: ChartStyle;
  variations: Variation[];
  zoom: ZoomStateReturn;
}

const Chart = forwardRef<HTMLDivElement, ChartProps>((
  {
    data,
    fullData,
    style = 'monotone',
    variations,
    zoom,
  },
  ref
) => {
  const zoomData = fullData || data;
  const mouseHandlers = zoom.getHandlers(zoomData, 'date');

  const Renderer = styleRenderers[style];

  return (
    <ChartProvider>
      <div
        ref={ref}
        className={`${classes.chartContainer} ${zoom.isZoomMode ? classes.zoomMode : ''}`}
      >
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <Renderer
            data={data}
            variations={variations}
            isZoomMode={zoom.isZoomMode}
            {...mouseHandlers}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()} ${date.toLocaleString('en', { month: 'short' })}`;
              }}
              tick={{ fill: 'var(--chart-axis-text)', fontSize: 12 }}
            />

            <YAxis
              tickLine={false}

              tick={<PercentTick />}
            />

            {/* Selection rectangle while dragging */}
            {zoom.isSelecting && zoom.selectionStart && zoom.selectionEnd && (
              <ReferenceArea
                x1={zoom.selectionStart}
                x2={zoom.selectionEnd}
                fill="var(--color-control)"
                fillOpacity={0.3}
                stroke="var(--color-control)"
                strokeOpacity={0.8}
              />
            )}
          </Renderer>
        </ResponsiveContainer>
      </div>
    </ChartProvider>
  );
});

Chart.displayName = 'Chart';

export default Chart;
