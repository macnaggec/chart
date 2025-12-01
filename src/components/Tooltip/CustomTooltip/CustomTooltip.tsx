import type { FC } from 'react';
import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

import type { Variation } from '../../../types';

import { useChartContext } from '../../../context/chart/useChartContext';
import { getChartColor } from '../../../constants/chartColors';
import { CalendarIcon, TrophyIcon } from '../../../assets/icons';

import classes from './CustomTooltip.module.css';

interface ChartTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  variations: Variation[];
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatValue = (value: number): string => {
  return `${value.toFixed(0)}%`;
};

const CustomTooltip: FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  variations,
}) => {
  const { tooltipRef } = useChartContext();

  if (!active || !payload || payload.length === 0 || !label) {
    return null;
  }

  // Create a map of variation id to index for color lookup
  const variationIndexMap = new Map(
    variations.map((v, index) => [String(v.id ?? '0'), index])
  );

  const seen = new Set<string>();
  const uniquePayload = payload.filter((entry) => {
    const key = String(entry.dataKey);
    if (seen.has(key)) return false;
    seen.add(key);

    return true;
  });

  const sortedPayload = [...uniquePayload]
    .filter((entry) => entry.value !== undefined)
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

  return (
    <div
      ref={tooltipRef}
      className={classes.tooltip}
    >
      <div className={classes.header}>
        <CalendarIcon className={classes.calendarIcon} />
        <span className={classes.date}>{formatDate(label)}</span>
      </div>

      <div className={classes.list}>
        {sortedPayload?.map((entry, index) => {
          const variationIndex = variationIndexMap.get(String(entry.dataKey)) ?? 0;
          const color = getChartColor(variationIndex);

          return (
            <div key={entry.dataKey != null ? String(entry.dataKey) : index} className={classes.item}>
              <span className={classes.dot} style={{ backgroundColor: color }} />
              <span className={classes.name}>
                {entry.name}
                {index === 0 && <TrophyIcon className={classes.bestIcon} />}
              </span>
              <span className={classes.value}>{formatValue(entry.value ?? 0)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTooltip;
