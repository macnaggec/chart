import { use, useMemo, useRef, useState } from 'react';

import type { ChartStyle, TimeFrame, Variation } from '../../types';
import { chartStyles } from '../../types';

import { ZoomProvider, useZoom } from '../../context/zoom';
import { transformData } from '../../utils/transformData';
import { aggregateByWeek } from '../../utils/aggregateByWeek';
import { getZoomedData } from '../../utils/zoomUtils';
import { exportChartAsPng, generateExportFilename } from '../../utils/exportChart';
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

function ChartPageContent() {
  const chartData = use(loadDataPromise);
  const { isZoomMode, toggleZoomMode, zoomedRange, resetZoom } = useZoom();
  const chartRef = useRef<HTMLDivElement>(null);

  const [timeFrame, setTimeFrame] = useState<TimeFrame>('day');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('monotone');

  const [
    activeVariations,
    setActiveVariations
  ] = useState<Variation[]>(() => chartData.variations);

  const dailyRates = useMemo(() => {
    if (!chartData) return [];
    return transformData(chartData);
  }, [chartData]);

  const baseData = useMemo(() => {
    if (timeFrame === 'week') {
      return aggregateByWeek(dailyRates);
    }
    return dailyRates;
  }, [dailyRates, timeFrame]);

  // Apply zoom filter to data
  const data = useMemo(() => {
    return getZoomedData(baseData, zoomedRange);
  }, [baseData, zoomedRange]);

  // Reset zoom when timeframe changes
  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    if (zoomedRange) {
      resetZoom();
    }
    setTimeFrame(newTimeFrame);
  };

  const handleSelectVariation = (selectedVariations: string[]) => {
    setActiveVariations(selectedVariations.map(id => {
      const variation = chartData.variations.find(v => String(v.id ?? '0') === id);

      if (!variation) {
        throw new Error(`Variation with id ${id} not found`);
      }

      return variation;
    }));
  }

  const handleExport = () => {
    const filename = generateExportFilename('ab-test-chart');
    exportChartAsPng(chartRef.current, filename);
  };

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
            styles={[...chartStyles]}
            currentStyle={chartStyle}
            onChange={setChartStyle}
          />
          <ZoomButton
            isActive={isZoomMode}
            onClick={toggleZoomMode}
          />
          {zoomedRange && (
            <ResetZoomButton onClick={resetZoom} />
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
        />
      </div>
    </div>
  )
}

function ChartPage() {
  return (
    <ZoomProvider>
      <ChartPageContent />
    </ZoomProvider>
  );
}

export default ChartPage;
