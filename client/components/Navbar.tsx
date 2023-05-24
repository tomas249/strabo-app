'use client';

import { use, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DropdownIcon, SyncingIcon, TickIcon } from '@/components/Icons';
import Image from 'next/image';
import React from 'react';
import { useOutside } from '@/hooks/useOutside';

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
  const title = getFirstPath(pathname, PATHS);

  return (
    <div className="sticky top-0 flex h-20 items-center justify-between border-b-2 border-neutral-200 bg-neutral-50">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex space-x-2">
        <Select
          optionsId={CURRENCY_OPTIONS.map((v) => v.value)}
          defaultId={CURRENCY_OPTIONS.map((v) => v.value)[0]}
          onChange={(value) => {
            console.log({ value });
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

const RendererOption = ({ isSelected, id }: any) => {
  const option = CURRENCY_OPTIONS_OBJ[id];

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

const filterIds = (ids: string[], filterValue: string) => {
  return ids.filter((id) => {
    const option = CURRENCY_OPTIONS_OBJ[id];
    return option.label.toLowerCase().includes(filterValue.toLowerCase());
  });
};

type SelectButtonProps = {
  icon: string;
  label: string;
};

const SelectButton = ({ id, filter, setFilter }: any) => {
  const option = CURRENCY_OPTIONS_OBJ[id];
  return (
    <input
      type="text"
      placeholder="Currency"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-white px-2.5 py-[8.5px] hover:bg-neutral-100">
      <Image src={option.icon} height="24" width="24" alt="Country" />
      <span className="mx-2.5 font-semibold leading-tight">{option.label}</span>
      <DropdownIcon />
    </div>
  );
};

type SelectOption = {
  value: string;
  label: string;
};

type Filter = {
  filter: string;
  setFilter: (value: string) => void;
};

type SelectProps = {
  optionsId: string[];
  defaultId: string;
  onChange: (id: string) => void;
};

export function Select({ optionsId, defaultId, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(defaultId);
  const [filter, setFilter] = useState('');

  const filteredOptionsId = useMemo(() => filterIds(optionsId, filter), [optionsId, filter]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutside(wrapperRef, () => {
    console.log('outside');
    setIsOpen(false);
  });

  function selectOption(selectedId: string) {
    setFilter('');
    if (selectedId !== id) {
      onChange(selectedId);
      setId(selectedId);
    }
  }

  function isOptionSelected(optionId: string) {
    return optionId === id;
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <SelectButton id={id} filter={filter} setFilter={setFilter} />
      </div>
      <div
        style={{
          display: isOpen ? 'block' : 'none',
        }}
        className="absolute right-0 top-[calc(100%+4px)] z-10 w-36 overflow-y-auto rounded-lg bg-white p-1.5 shadow-md"
      >
        {filteredOptionsId.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-neutral-400">
            No results found
          </div>
        ) : (
          filteredOptionsId.map((optionId) => (
            <div
              key={optionId}
              onClick={(event) => {
                event.stopPropagation();
                selectOption(optionId);
                setIsOpen(false);
              }}
            >
              <RendererOption isSelected={isOptionSelected(optionId)} id={optionId} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
