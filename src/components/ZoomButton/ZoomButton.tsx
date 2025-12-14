import { memo } from 'react';

import type { FC } from 'react';

import SelectIcon from '../../assets/icons/select.svg?react';

import classes from './ZoomButton.module.css';

export interface ZoomButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const ZoomButton: FC<ZoomButtonProps> = memo(({ isActive, onClick }) => {
  return (
    <button
      className={`${classes.button} ${isActive ? classes.buttonActive : ''}`}
      onClick={onClick}
      aria-label={isActive ? 'Exit zoom selection mode' : 'Enter zoom selection mode'}
      aria-pressed={isActive}
      title={isActive ? 'Exit zoom selection mode' : 'Select area to zoom'}
    >
      <SelectIcon className={classes.icon} />
    </button>
  );
});

ZoomButton.displayName = 'ZoomButton';

export default ZoomButton;
