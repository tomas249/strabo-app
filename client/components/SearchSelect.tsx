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
import { StockResult } from '@/utils/definitions';

type StockOptions = StockResult & { value: StockResult['tickerSymbol'] };

function SearchSelectControlRender({
  optionsById,
  id,
  filterValue,
  onChangeFilterValue,
  onToggleOptions,
}: ControlRenderBase<StockOptions>) {
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

function SearchSelectOptionRender({ optionsById, id }: OptionRenderBase<StockOptions>) {
  const option = optionsById[id];

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-md p-2 hover:bg-neutral-100">
      <div className="flex items-center space-x-2 pl-1">
        <Image src="/social/apple.png" height="22" width="22" alt="Apple" />
        <span className="text-sm font-medium">{option.accountName}</span>
      </div>
    </div>
  );
}

type SimpleSelectProps = Omit<
  SelectProps<StockOptions>,
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

const filterByLabel = (
  optionsById: Record<string, StockOptions>,
  ids: string[],
  filterValue: string,
) => {
  const filterValueLower = filterValue.toLowerCase();
  return ids.filter(
    (id) =>
      optionsById[id].accountName.toLowerCase().includes(filterValueLower) ||
      optionsById[id].tickerSymbol.toLowerCase().includes(filterValueLower),
  );
};
