'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DropdownIcon, SyncingIcon, TickIcon } from '@/components/Icons';
import Image from 'next/image';
import React from 'react';

const PATHS = {
  dashboard: 'Dashboard',
  accounts: 'Accounts',
  investments: 'Investments',
};

const CURRENCY_OPTIONS = [
  { value: 'GBP', label: 'GBP', icon: '/countries/country-GB.svg' },
  { value: 'USD', label: 'USD', icon: '/countries/country-US.svg' },
  { value: 'EUR', label: 'EUR', icon: '/countries/country-EU.svg' },
];

const CURRENCY_OPTIONS_OBJ = CURRENCY_OPTIONS.reduce((acc, current) => {
  acc[current.value] = current;
  return acc;
}, {} as Record<string, SelectOption & { icon: string }>);

export default function Navbar() {
  const pathname = usePathname();
  const [currency, setCurrency] = useState<SelectOption | undefined>(CURRENCY_OPTIONS[0]);

  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 flex h-20 items-center justify-between border-b-2 border-neutral-200 bg-neutral-50">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex space-x-2">
        <Select
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={(value) => {
            console.log({ value });
            setCurrency(value);
          }}
        />
        <button className="rounded-lg bg-white p-2.5 hover:bg-neutral-100">
          <SyncingIcon />
        </button>
      </div>
    </div>
  );
}

function getFirstPath(path: string, paths: Record<string, string>) {
  const currentPaths = path.slice(1).split('/');
  const firstPath = currentPaths[0];
  if (!paths[firstPath]) throw new Error(`Path ${firstPath} not found`);

  return paths[firstPath];
}

type SelectButtonProps = {
  icon: string;
  label: string;
};

const SelectButton = ({ icon, label }: SelectButtonProps) => {
  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-white px-2.5 py-[8.5px] hover:bg-neutral-100">
      <Image src={icon} height="24" width="24" alt="Country" />
      <span className="mx-2.5 font-semibold leading-tight">{label}</span>
      <DropdownIcon />
    </div>
  );
};

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (option !== value) {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  return (
    <div
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative"
    >
      <SelectButton
        icon={CURRENCY_OPTIONS_OBJ[value?.value || ''].icon}
        label={value?.label || 'none'}
      />
      <ul
        style={{
          display: isOpen ? 'block' : 'none',
        }}
        className="absolute right-0 top-[calc(100%+4px)] z-10 w-36 overflow-y-auto rounded-lg bg-white p-1.5 shadow-md"
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-neutral-100"
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
          >
            <div className="flex items-center space-x-2 pl-1">
              <Image
                src={CURRENCY_OPTIONS_OBJ[option.value].icon}
                height="18"
                width="18"
                alt="Country"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </div>
            {isOptionSelected(option) && (
              <div className="text-primary-500">
                <TickIcon />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
