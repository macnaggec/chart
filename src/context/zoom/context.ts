import { createContext } from 'react';

import type { ZoomContextValue } from './types';

export const ZoomContext = createContext<ZoomContextValue | null>(null);
