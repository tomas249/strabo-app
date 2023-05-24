'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DropdownIcon, SyncingIcon, TickIcon } from '@/components/Icons';
import Image from 'next/image';
import React from 'react';
import { useOutside } from '@/hooks/useOutside';
import { toByField } from '@/utils/common';

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

export default function Navbar() {
  const pathname = usePathname();
  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 flex h-20 items-center justify-between border-b-2 border-neutral-200 bg-neutral-50">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex space-x-2">
        <Select
          options={CURRENCY_OPTIONS}
          defaultValue={CURRENCY_OPTIONS[0].value}
          filter={filterByLabel}
          onSelect={(option) => {
            console.log(option);
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

// ----------------------------------------------

function ControlRender({ optionsById, id, filterValue, onChangeFilterValue }: any) {
  const option = optionsById[id];

  return (
    <input
      type="text"
      placeholder="Currency"
      value={filterValue}
      onChange={(e) => onChangeFilterValue(e.target.value)}
    />
  );
}

const OptionRender = ({ optionsById, id, isSelected }: any) => {
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
};

const filterByLabel = (optionsById: Record<string, any>, ids: string[], filterValue: string) => {
  return ids.filter((id) =>
    optionsById[id].label.toLowerCase().includes(filterValue.toLowerCase()),
  );
};

type SelectProps = {
  options: any[];
  defaultValue: string;
  onSelect: (option: any) => void;
  filter: (optionsById: Record<string, any>, ids: string[], filterValue: string) => string[];
};

export function Select<T>({ options, defaultValue, onSelect, filter }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(defaultValue);
  const [filterValue, setFilterValue] = useState('');

  const optionsById = useMemo(() => toByField(options, 'value'), [options]);
  const optionIds = useMemo(() => options.map((v) => v.value), [options]);
  const filteredIds = useMemo(
    () => filter(optionsById, optionIds, filterValue),
    [optionsById, optionIds, filter, filterValue],
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutside(wrapperRef, () => setIsOpen(false));

  function selectOption(selectedId: string) {
    setFilterValue('');
    if (selectedId !== id) {
      setId(selectedId);
      onSelect(optionsById[selectedId]);
    }
  }

  function isOptionSelected(optionId: string) {
    return optionId === id;
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <ControlRender
          optionsById={optionsById}
          id={id}
          filterValue={filterValue}
          onChangeFilterValue={setFilterValue}
        />
      </div>
      <div
        style={{ display: isOpen ? 'block' : 'none' }}
        className="absolute right-0 top-[calc(100%+4px)] z-10 w-36 overflow-y-auto rounded-lg bg-white p-1.5 shadow-md"
      >
        {filteredIds.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-neutral-400">
            No results found
          </div>
        ) : (
          filteredIds.map((optionId) => (
            <div
              key={optionId}
              onClick={(event) => {
                event.stopPropagation();
                selectOption(optionId);
                setIsOpen(false);
              }}
            >
              <OptionRender
                optionsById={optionsById}
                id={optionId}
                isSelected={isOptionSelected(optionId)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
