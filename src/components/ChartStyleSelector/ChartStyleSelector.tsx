import { memo } from 'react';

import type { FC } from 'react';
import type { ChartStyle } from '../../types';

import Dropdown from '../Dropdown';

export interface ChartStyleSelectorProps {
  styles: readonly ChartStyle[];
  currentStyle: ChartStyle;
  onChange: (style: ChartStyle) => void;
}

const styleLabels: Record<ChartStyle, string> = {
  monotone: 'Monotone',
  linear: 'Linear',
  area: 'Area',
  glow: 'Glow',
};

const ChartStyleSelector: FC<ChartStyleSelectorProps> = memo(({
  styles,
  currentStyle,
  onChange,
}) => {
  const handleSetStyle = (style: string) => {
    onChange(style as ChartStyle);
  };

  const options = styles.map((style) => ({
    value: style,
    label: `Line style: ${styleLabels[style]}`,
  }));

  return (
    <Dropdown
      options={options}
      value={currentStyle}
      onChange={handleSetStyle}
    />
  );
});

ChartStyleSelector.displayName = 'ChartStyleSelector';

export default ChartStyleSelector;
