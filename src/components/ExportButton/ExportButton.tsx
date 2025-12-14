import { memo } from 'react';

import type { FC } from 'react';

import ExportIcon from '../../assets/icons/export.svg?react';

import classes from './ExportButton.module.css';

export interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const ExportButton: FC<ExportButtonProps> = memo(({ onClick, disabled = false }) => {
  return (
    <button
      className={classes.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Export chart as PNG"
      title="Export chart as PNG"
      type="button"
    >
      <ExportIcon className={classes.icon} />
    </button>
  );
});

ExportButton.displayName = 'ExportButton';

export default ExportButton;
