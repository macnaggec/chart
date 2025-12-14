import { use, useState } from 'react';

import type { ChartStyle } from '../../types';
import { chartStyles } from '../../types';

import { useChartData, useChartExport, useVariations, useZoomState } from '../../hooks';
import loadData from '../../lib/loadData';
import ChartWrapper from '../../components/ChartWrapper';
import ChartStyleSelector from '../../components/ChartStyleSelector';
import ExportButton from '../../components/ExportButton';
import ResetZoomButton from '../../components/ResetZoomButton';
import ThemeToggle from '../../components/ThemeToggle';
import TimeframeSelector from '../../components/TimeframeSelector';
import VariationsSelector from '../../components/VariationsSelector';
import ZoomButton from '../../components/ZoomButton';

import classes from './ChartPage.module.css';

const loadDataPromise = loadData();

function ChartPage() {
  const chartData = use(loadDataPromise);
  const zoom = useZoomState();
  const { data, baseData, timeFrame, handleTimeFrameChange } = useChartData(
    chartData,
    zoom.zoomedRange,
    zoom.resetZoom
  );
  const { activeVariations, handleSelectVariation } = useVariations(chartData.variations);
  const { chartRef, handleExport } = useChartExport();
  const [chartStyle, setChartStyle] = useState<ChartStyle>('monotone');

  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <div className={classes.controlsLeft}>
          <VariationsSelector
            variations={chartData?.variations || []}
            onSelectionChange={handleSelectVariation}
          />

          <TimeframeSelector
            timeFrame={timeFrame}
            onChange={handleTimeFrameChange}
          />
        </div>

        <div className={classes.controlsRight}>
          <ChartStyleSelector
            styles={chartStyles}
            currentStyle={chartStyle}
            onChange={setChartStyle}
          />

          <ZoomButton
            isActive={zoom.isZoomMode}
            onClick={zoom.toggleZoomMode}
          />

          {zoom.zoomedRange && (
            <ResetZoomButton onClick={zoom.resetZoom} />
          )}

          <ExportButton onClick={handleExport} />

          <ThemeToggle />
        </div>
      </header>

      <div className={classes.chartArea}>
        <ChartWrapper
          ref={chartRef}
          variations={activeVariations}
          data={data}
          style={chartStyle}
          fullData={baseData}
          zoom={zoom}
        />
      </div>
    </div>
  )
}

export default ChartPage;
