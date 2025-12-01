import type { ReactNode } from 'react';

export interface ApiResponseData {
  variations: Variation[];
  data: DailyData[];
}

export interface Variation {
  id?: number;
  name: string;
}

export interface DailyData {
  date: string;
  visits: Record<string, number | undefined>;
  conversions: Record<string, number | undefined>;
}

export interface ChartDataPoint {
  date: string;
  [variationId: string]: number | string;
}

export const timeFrames = ['day', 'week'] as const;
export type TimeFrame = (typeof timeFrames)[number];

export const chartStyles = ['monotone', 'linear', 'area', 'glow'] as const;
export type ChartStyle = (typeof chartStyles)[number];

export interface ChartRendererProps {
  data: ChartDataPoint[];
  variations: Variation[];
  children: ReactNode;
  isZoomMode?: boolean;
  onMouseDown?: (e: { activeLabel?: string }) => void;
  onMouseMove?: (e: { activeLabel?: string }) => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
}
