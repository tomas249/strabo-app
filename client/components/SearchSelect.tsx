'use client';

import Image from 'next/image';
import { useState } from 'react';
import type {
  ControlRenderBase,
  OptionBase,
  OptionRenderBase,
  SelectProps,
} from '@/components/SelectBase';
import { Select } from '@/components/SelectBase';
import { SearchIcon, TickIcon } from '@/components/Icons';

type CurrencyOptions = OptionBase & {
  label: string;
  icon: string;
};

function SearchSelectControlRender({
  optionsById,
  id,
  filterValue,
  onChangeFilterValue,
  onToggleOptions,
}: ControlRenderBase<CurrencyOptions>) {
  const [isFocused, setIsFocused] = useState(false);

  const baseClass = 'group flex space-x-2.5 border-b-2 py-3';
  const containerClass = `${baseClass} ${isFocused ? 'border-primary-500' : 'border-neutral-200'}`;

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    onChangeFilterValue(value);

    onToggleOptions(value !== '');
  }

  return (
    <div className={containerClass}>
      <div className={isFocused ? 'text-primary-500' : 'text-neutral-400'}>
        <SearchIcon />
      </div>
      <input
        className="w-full bg-transparent text-base font-normal leading-tight placeholder-neutral-400 outline-none focus:text-neutral-900"
        type="text"
        placeholder="Search by Stocks, Shares, ETFs, or ticket symbol"
        value={filterValue}
        onChange={onChange}
        onFocus={() => {
          setIsFocused(true);
          onToggleOptions(filterValue !== '');
        }}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

function SearchSelectOptionRender({
  optionsById,
  id,
  isSelected,
}: OptionRenderBase<CurrencyOptions>) {
  const option = optionsById[id];

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-neutral-100">
      <div className="flex items-center space-x-2 pl-1">
        <Image src={option.icon} height="18" width="18" alt="Country" />
        <span className="text-sm font-medium">{option.label}</span>
      </div>
      {isSelected && (
        <div className="text-primary-500">
          <TickIcon />
        </div>
      )}
    </div>
  );
}

type SimpleSelectProps = Omit<
  SelectProps<CurrencyOptions>,
  'filter' | 'ControlRender' | 'OptionRender'
>;

export default function SearchSelect(props: SimpleSelectProps) {
  return (
    <Select
      ControlRender={SearchSelectControlRender}
      OptionRender={SearchSelectOptionRender}
      filter={filterByLabel}
      {...props}
    />
  );
}

const filterByLabel = (optionsById: Record<string, any>, ids: string[], filterValue: string) => {
  return ids.filter((id) =>
    optionsById[id].label.toLowerCase().includes(filterValue.toLowerCase()),
  );
};
