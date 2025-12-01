export const CHART_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#00C49F',
] as const;

export type ChartColor = (typeof CHART_COLORS)[number];

export const getChartColor = (index: number): ChartColor => {
  return CHART_COLORS[index % CHART_COLORS.length];
};
