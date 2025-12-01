import { useEffect, useRef, useState } from 'react';

import type { FC } from 'react';

import classes from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
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

const Dropdown: FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={classes.wrapper} ref={dropdownRef}>
      <button
        className={classes.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <ChevronIcon
          className={`${classes.chevron} ${isOpen ? classes.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <ul className={classes.menu}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${classes.option} ${option.value === value ? classes.selected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
