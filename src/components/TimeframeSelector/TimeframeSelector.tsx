import type { FC } from 'react';

import type { TimeFrame } from '../../types';

import Dropdown from '../Dropdown';

export interface TimeframeSelectorProps {
  timeFrame: TimeFrame;
  onChange: (value: TimeFrame) => void;
}

const timeframeOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
];

const TimeframeSelector: FC<TimeframeSelectorProps> = ({
  timeFrame,
  onChange,
}) => {
  return (
    <Dropdown
      options={timeframeOptions}
      value={timeFrame}
      onChange={(value) => onChange(value as TimeFrame)}
    />
  );
};

export default TimeframeSelector;
