import { forwardRef } from 'react';
import { ReferenceArea, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import type { ChartDataPoint, ChartStyle, Variation } from '../../types';

import { ChartProvider } from '../../context/chart/ChartContextValue';
import { useZoom } from '../../context/zoom';
import PercentTick from '../PercentTick';
import styleRenderers from '../ChartRenderer/styleRenderers';

import classes from './ChartWrapper.module.css';

export interface ChartProps {
  data: ChartDataPoint[];
  fullData?: ChartDataPoint[];
  style?: ChartStyle;
  variations: Variation[];
}

const Chart = forwardRef<HTMLDivElement, ChartProps>((
  {
    data,
    fullData,
    style = 'monotone',
    variations,
  },
  ref
) => {
  const {
    isZoomMode,
    isSelecting,
    selectionStart,
    selectionEnd,
    startSelection,
    updateSelection,
    endSelection,
    cancelSelection,
  } = useZoom();

  // Use fullData for calculating zoom range, but data for rendering
  const zoomData = fullData || data;

  const handleMouseDown = (e: { activeLabel?: string }) => {
    if (!isZoomMode || !e?.activeLabel) return;
    startSelection(e.activeLabel);
  };

  const handleMouseMove = (e: { activeLabel?: string }) => {
    if (!isSelecting || !e?.activeLabel) return;
    updateSelection(e.activeLabel);
  };

  const handleMouseUp = () => {
    if (!isSelecting) return;
    endSelection(zoomData, 'date');
  };

  const handleMouseLeave = () => {
    if (isSelecting) {
      cancelSelection();
    }
  };

  const Renderer = styleRenderers[style];

  return (
    <ChartProvider>
      <div
        ref={ref}
        className={`${classes.chartContainer} ${isZoomMode ? classes.zoomMode : ''}`}
      >
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <Renderer
            data={data}
            variations={variations}
            isZoomMode={isZoomMode}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
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
            {isSelecting && selectionStart && selectionEnd && (
              <ReferenceArea
                x1={selectionStart}
                x2={selectionEnd}
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
