import { useCallback, useMemo, useState } from 'react';

import type { ChartMouseHandlers } from '../types';

export interface ZoomRange {
  startIndex: number;
  endIndex: number;
}

interface ZoomState {
  isZoomMode: boolean;
  isSelecting: boolean;
  selectionStart: string | null;
  selectionEnd: string | null;
  zoomedRange: ZoomRange | null;
}

const initialState: ZoomState = {
  isZoomMode: false,
  isSelecting: false,
  selectionStart: null,
  selectionEnd: null,
  zoomedRange: null,
};

export const useZoomState = () => {
  const [state, setState] = useState<ZoomState>(initialState);

  const toggleZoomMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isZoomMode: !prev.isZoomMode,
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
      return { ...prev, selectionEnd: label };
    });
  }, []);

  const endSelection = useCallback(
    <T extends Record<string, unknown>>(data: T[], dateKey: keyof T) => {
      setState((prev) => {
        if (!prev.selectionStart || !prev.selectionEnd) {
          return { ...prev, isSelecting: false, selectionStart: null, selectionEnd: null };
        }

        const startIndex = data.findIndex((d) => d[dateKey] === prev.selectionStart);
        const endIndex = data.findIndex((d) => d[dateKey] === prev.selectionEnd);

        if (startIndex === -1 || endIndex === -1) {
          return { ...prev, isSelecting: false, selectionStart: null, selectionEnd: null };
        }

        const [min, max] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];

        if (max - min < 1) {
          return { ...prev, isSelecting: false, selectionStart: null, selectionEnd: null };
        }

        return {
          ...prev,
          isSelecting: false,
          selectionStart: null,
          selectionEnd: null,
          zoomedRange: { startIndex: min, endIndex: max },
          isZoomMode: false,
        };
      });
    },
    []
  );

  const resetZoom = useCallback(() => {
    setState((prev) => ({ ...prev, zoomedRange: null }));
  }, []);

  const cancelSelection = useCallback(() => {
    setState((prev) => ({ ...prev, isSelecting: false, selectionStart: null, selectionEnd: null }));
  }, []);

  const getHandlers = useCallback(
    <T extends Record<string, unknown>>(data: T[], dateKey: keyof T): ChartMouseHandlers => ({
      onMouseDown: (e: { activeLabel?: string }) => {
        if (!state.isZoomMode || !e?.activeLabel) return;
        startSelection(e.activeLabel);
      },
      onMouseMove: (e: { activeLabel?: string }) => {
        if (!state.isSelecting || !e?.activeLabel) return;
        updateSelection(e.activeLabel);
      },
      onMouseUp: () => {
        if (!state.isSelecting) return;
        endSelection(data, dateKey);
      },
      onMouseLeave: () => {
        if (state.isSelecting) {
          cancelSelection();
        }
      },
    }),
    [state.isZoomMode, state.isSelecting, startSelection, updateSelection, endSelection, cancelSelection]
  );

  return useMemo(() => ({
    ...state,
    toggleZoomMode,
    resetZoom,
    getHandlers,
  }), [state, toggleZoomMode, resetZoom, getHandlers]);
};

export type ZoomStateReturn = ReturnType<typeof useZoomState>;
