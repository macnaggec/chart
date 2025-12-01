import type { ZoomRange } from '../context/zoom/types';

export function getZoomedData<T>(
  data: T[],
  zoomedRange: ZoomRange | null
): T[] {
  if (!zoomedRange) {
    return data;
  }

  const { startIndex, endIndex } = zoomedRange;

  return data.slice(startIndex, endIndex + 1);
}

export function isValidZoomRange(
  zoomedRange: ZoomRange | null,
  dataLength: number
): boolean {
  if (!zoomedRange) return false;

  const { startIndex, endIndex } = zoomedRange;

  return (
    startIndex >= 0 &&
    endIndex < dataLength &&
    startIndex < endIndex
  );
}
