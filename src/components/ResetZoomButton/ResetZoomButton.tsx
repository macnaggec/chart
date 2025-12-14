import { memo } from 'react';

import type { FC } from 'react';

import ResetIcon from '../../assets/icons/reset.svg?react';

import classes from './ResetZoomButton.module.css';

export interface ResetZoomButtonProps {
  onClick: () => void;
}

const ResetZoomButton: FC<ResetZoomButtonProps> = memo(({ onClick }) => {
  return (
    <button
      className={classes.button}
      onClick={onClick}
      aria-label="Reset zoom"
      title="Reset zoom to show all data"
      type="button"
    >
      <ResetIcon className={classes.icon} />
    </button>
  );
});

ResetZoomButton.displayName = 'ResetZoomButton';

export default ResetZoomButton;
