import { useCallback, useState } from 'react';

import type { FC, ReactNode } from 'react';
import type { ZoomContextValue, ZoomRange, ZoomState } from './types';

import { ZoomContext } from './context';

const initialState: ZoomState = {
  isZoomMode: false,
  isSelecting: false,
  selectionStart: null,
  selectionEnd: null,
  zoomedRange: null,
};

interface ZoomProviderProps {
  children: ReactNode;
}

export const ZoomProvider: FC<ZoomProviderProps> = ({ children }) => {
  const [state, setState] = useState<ZoomState>(initialState);

  const toggleZoomMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isZoomMode: !prev.isZoomMode,
      // Reset selection when toggling mode
      isSelecting: false,
      selectionStart: null,
      selectionEnd: null,
    }));
  }, []);

  const startSelection = useCallback((label: string) => {
    setState((prev) => ({
      ...prev,
      isSelecting: true,
      selectionStart: label,
      selectionEnd: label,
    }));
  }, []);

  const updateSelection = useCallback((label: string) => {
    setState((prev) => {
      if (!prev.isSelecting) return prev;
      return {
        ...prev,
        selectionEnd: label,
      };
    });
  }, []);

  const endSelection = useCallback(
    <T extends Record<string, unknown>>(data: T[], dateKey: keyof T) => {
      setState((prev) => {
        if (!prev.selectionStart || !prev.selectionEnd) {
          return {
            ...prev,
            isSelecting: false,
            selectionStart: null,
            selectionEnd: null,
          };
        }

        // Find indices in data
        const startIndex = data.findIndex(
          (d) => d[dateKey] === prev.selectionStart
        );
        const endIndex = data.findIndex(
          (d) => d[dateKey] === prev.selectionEnd
        );

        if (startIndex === -1 || endIndex === -1) {
          return {
            ...prev,
            isSelecting: false,
            selectionStart: null,
            selectionEnd: null,
          };
        }

        // Ensure start < end
        const [min, max] =
          startIndex < endIndex
            ? [startIndex, endIndex]
            : [endIndex, startIndex];

        // Only zoom if selection spans at least 2 points
        if (max - min < 1) {
          return {
            ...prev,
            isSelecting: false,
            selectionStart: null,
            selectionEnd: null,
          };
        }

        const zoomedRange: ZoomRange = {
          startIndex: min,
          endIndex: max,
        };

        return {
          ...prev,
          isSelecting: false,
          selectionStart: null,
          selectionEnd: null,
          zoomedRange,
          isZoomMode: false, // Exit zoom mode after selection
        };
      });
    },
    []
  );

  const resetZoom = useCallback(() => {
    setState((prev) => ({
      ...prev,
      zoomedRange: null,
    }));
  }, []);

  const cancelSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSelecting: false,
      selectionStart: null,
      selectionEnd: null,
    }));
  }, []);

  const value: ZoomContextValue = {
    ...state,
    toggleZoomMode,
    startSelection,
    updateSelection,
    endSelection,
    resetZoom,
    cancelSelection,
  };

  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
};
