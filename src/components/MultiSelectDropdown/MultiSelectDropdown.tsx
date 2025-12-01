import { useEffect, useRef, useState } from 'react';

import type { FC } from 'react';

import classes from './MultiSelectDropdown.module.css';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectDropdownProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  allSelectedLabel?: string;
}

const ChevronIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select...',
  allSelectedLabel = 'All selected',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allSelected = selectedValues.length === options.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAll = () => {
    if (allSelected) {
      // If all selected, keep at least one (first option)
      onChange([options[0].value]);
    } else {
      onChange(options.map((opt) => opt.value));
    }
  };

  const handleToggleOption = (value: string) => {
    const isSelected = selectedValues.includes(value);

    // Prevent deselecting if it's the last selected option
    if (isSelected && selectedValues.length === 1) {
      return;
    }

    if (isSelected) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const displayLabel = allSelected ? allSelectedLabel : placeholder;

  return (
    <div className={classes.wrapper} ref={dropdownRef}>
      <button
        className={classes.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{displayLabel}</span>
        <ChevronIcon
          className={`${classes.chevron} ${isOpen ? classes.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={classes.menu}>
          {/* All option */}
          <li className={classes.option} onClick={handleSelectAll}>
            <span
              className={`${classes.checkbox} ${allSelected ? classes.checkboxChecked : ''}`}
            >
              {allSelected && <CheckIcon className={classes.checkIcon} />}
            </span>
            <span>All</span>
          </li>

          <li className={classes.divider} />

          {/* Individual options */}
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            const isDisabled = isSelected && selectedValues.length === 1;

            return (
              <li
                key={option.value}
                className={`${classes.option} ${isDisabled ? classes.optionDisabled : ''}`}
                onClick={() => !isDisabled && handleToggleOption(option.value)}
              >
                <span
                  className={`${classes.checkbox} ${isSelected ? classes.checkboxChecked : ''}`}
                >
                  {isSelected && <CheckIcon className={classes.checkIcon} />}
                </span>
                <span>{option.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
