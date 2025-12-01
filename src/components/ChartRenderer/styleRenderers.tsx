import type { FC } from 'react';

import type { ChartRendererProps, ChartStyle } from '../../types';

import AreaChartRenderer from './AreaChartRenderer';
import GlowChartRenderer from './GlowChartRenderer';
import LineChartRenderer from './LineChartRenderer';

export const styleRenderers: Record<ChartStyle, FC<ChartRendererProps>> = {
  linear: (props) => <LineChartRenderer {...props} curveType="linear" />,
  monotone: (props) => <LineChartRenderer {...props} curveType="monotone" />,
  area: AreaChartRenderer,
  glow: GlowChartRenderer,
};

export default styleRenderers;
