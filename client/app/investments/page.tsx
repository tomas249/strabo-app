'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import SearchSelect from '@/components/SearchSelect';
import { CURRENCY_OPTIONS } from '@/utils/constants';

type InvestmentDetails = {
  accountName: string;
  tickerSymbol: string;
  exchange: string;
  type: string;
  country: string;
  value: number;
  currency: string;
  industry: string;
};

export default function Investments() {
  const [isListDisabled, setIsListDisabled] = useState(false);

  return (
    <>
      <div className="bg-neutral-50 px-8 pt-3">
        <span className="pb-1 text-sm font-semibold">Find stock:</span>
        {/* <SearchSelect
          options={CURRENCY_OPTIONS}
          defaultValue={CURRENCY_OPTIONS[0].value}
          onSelect={(option) => {
            console.log(option);
          }}
          onChangeFilterValue={(value) => {
            console.log(value);
          }}
          onToggleOptions={(isOpen) => {
            setIsListDisabled(isOpen);
          }}
        /> */}
      </div>
      <div className="flex min-h-[52px] w-full items-center px-12">
        <div className="inline-block flex-[3] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Account Name
        </div>
        <div className="inline-block flex-[3] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Ticker symbol
        </div>
        <div className="inline-block flex-[3] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Exchange
        </div>
        <div className="inline-block flex-[3] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Type
        </div>
        <div className="inline-block flex-[2] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Country
        </div>
        <div className="inline-block flex-[3] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Value
        </div>
        <div className="inline-block flex-[3] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          Industry or Sector
        </div>
        <div className="inline-block flex-[2] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0">
          ...
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-4 min-w-min px-8">
          <div className="relative rounded-xl border-[1px] border-neutral-200 bg-white px-4 py-2">
            <div
              style={{ display: isListDisabled ? 'block' : 'none' }}
              className="px-y absolute left-0 top-0 z-10 h-full w-full rounded-xl bg-neutral-200/30 "
            />
            {Array(50)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex h-10 flex-1 items-center border-b-[1px] border-neutral-100 last:border-0"
                >
                  <div className="flex h-full min-w-fit flex-[6] items-center gap-2 border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <Image
                      src={`/countries/country-EU.svg`}
                      alt="Name of holding"
                      height="22"
                      width="22"
                    />
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      Name of holding
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      XXXX
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      Exchange name
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      XX Mututal Fund
                    </span>
                  </div>
                  <div className="flex h-full flex-[2] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      XX UK
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      Xxxx.xx
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      Industry
                    </span>
                  </div>
                  <div className="flex h-full flex-[2] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      xxx
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

const longArray: InvestmentDetails[] = Array.from({ length: 1000 }, (_, i) => ({
  accountName: `Account ${i}`,
  tickerSymbol: `Ticker ${i}`,
  exchange: `Exchange ${i}`,
  type: `Type ${i}`,
  country: `Country ${i}`,
  value: i,
  currency: 'EUR',
  industry: `Industry ${i}`,
}));
