import type { ChartMouseHandlers } from '../../types';

export interface ZoomState {
  isZoomMode: boolean;
  isSelecting: boolean;
  selectionStart: string | null;
  selectionEnd: string | null;
  zoomedRange: ZoomRange | null;
}

export interface ZoomRange {
  startIndex: number;
  endIndex: number;
}

export interface ZoomActions {
  toggleZoomMode: () => void;
  startSelection: (label: string) => void;
  updateSelection: (label: string) => void;
  endSelection: <T extends Record<string, unknown>>(
    data: T[],
    dateKey: keyof T
  ) => void;
  resetZoom: () => void;
  cancelSelection: () => void;
  getHandlers: <T extends Record<string, unknown>>(
    data: T[],
    dateKey: keyof T
  ) => ChartMouseHandlers;
}

export interface ZoomContextValue extends ZoomState, ZoomActions { }
