import { useCallback, useState } from 'react';

import type { Variation } from '../types';

export const useVariations = (allVariations: Variation[]) => {
  const [activeVariations, setActiveVariations] = useState<Variation[]>(() => allVariations);

  const handleSelectVariation = useCallback((selectedIds: string[]) => {
    setActiveVariations(selectedIds.map(id => {
      const variation = allVariations.find(v => String(v.id ?? '0') === id);

      if (!variation) {
        throw new Error(`Variation with id ${id} not found`);
      }

      return variation;
    }));
  }, [allVariations]);

  return {
    activeVariations,
    handleSelectVariation,
  };
};
