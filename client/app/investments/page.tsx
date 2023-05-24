'use client';

import { useState } from 'react';
import SearchSelect from '@/components/SearchSelect';
import { CURRENCY_OPTIONS } from '@/utils/constants';

export default function Investments() {
  const longArray = Array.from({ length: 1000 }, (_, i) => i);
  const [isListDisabled, setIsListDisabled] = useState(false);

  return (
    <div className="pt-3">
      <span className="mb-1 text-sm font-semibold">Find stock:</span>
      <SearchSelect
        options={CURRENCY_OPTIONS}
        defaultValue={CURRENCY_OPTIONS[0].value}
        onSelect={(option) => {
          console.log(option);
        }}
        onToggleOptions={(isOpen) => {
          setIsListDisabled(isOpen);
        }}
      />
    </div>
  );
}
