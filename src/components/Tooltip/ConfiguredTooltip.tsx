import type { FC } from 'react';
import { Tooltip } from 'recharts';

import type { Variation } from '../../types';

import CustomCursor from '../Cursor/CustomCursor';
import CustomTooltip from './CustomTooltip/CustomTooltip';

export interface ConfiguredTooltipProps {
  variations: Variation[];
}

const ConfiguredTooltip: FC<ConfiguredTooltipProps> = ({ variations }) => {
  return (
    <Tooltip
      content={<CustomTooltip variations={variations} />}
      cursor={<CustomCursor />}
      wrapperStyle={{ outline: 'none' }}
      isAnimationActive={false}
      itemSorter={'value'}
    />
  );
};

export default ConfiguredTooltip;
