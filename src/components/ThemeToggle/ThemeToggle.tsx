import { memo } from 'react';

import type { FC } from 'react';

import { useTheme } from '../../context/theme/useTheme';
import DarkIcon from '../../assets/icons/dark.svg?react';
import LightIcon from '../../assets/icons/light.svg?react';

import classes from './ThemeToggle.module.css';

const ThemeToggle: FC = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={classes.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <DarkIcon className={classes.icon} />
      ) : (
        <LightIcon className={classes.icon} />
      )}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
