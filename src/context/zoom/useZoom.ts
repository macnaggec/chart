import { useContext } from 'react';

import type { ZoomContextValue } from './types';

import { ZoomContext } from './context';

export const useZoom = (): ZoomContextValue => {
  const context = useContext(ZoomContext);

  if (!context) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }

  return context;
};
