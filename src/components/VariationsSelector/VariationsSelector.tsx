import { useState } from 'react';

import type { FC } from 'react';
import type { Variation } from '../../types';

import MultiSelectDropdown from '../MultiSelectDropdown';

interface VariationsSelectorProps {
  variations: Variation[];
  onSelectionChange: (selectedVariations: string[]) => void;
}

const VariationsSelector: FC<VariationsSelectorProps> = ({
  variations,
  onSelectionChange,
}) => {
  const [selectedVariations, setSelectedVariations] = useState<string[]>(
    variations.map((v) => String(v?.id ?? '0'))
  );

  const options = variations.map((v) => ({
    value: String(v?.id ?? '0'),
    label: v.name,
  }));

  const handleChange = (values: string[]) => {
    setSelectedVariations(values);
    onSelectionChange(values);
  };

  return (
    <MultiSelectDropdown
      options={options}
      selectedValues={selectedVariations}
      onChange={handleChange}
      placeholder="Select variations"
      allSelectedLabel="All variations selected"
    />
  );
};

export { VariationsSelector };
