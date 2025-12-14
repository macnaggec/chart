import { useCallback, useRef } from 'react';

import { exportChartAsPng, generateExportFilename } from '../utils/exportChart';

export const useChartExport = (fileNamePrefix = 'ab-test-chart') => {
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(() => {
    const fileName = generateExportFilename(fileNamePrefix);
    exportChartAsPng(chartRef.current, fileName);
  }, [fileNamePrefix]);

  return {
    chartRef,
    handleExport,
  };
};
