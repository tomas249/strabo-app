'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import SearchSelect from '@/components/SearchSelect';
import { getStockPrice, searchStocks } from '@/api/stocks';
import { StockDetails, StockResult } from '@/utils/definitions';
import { BankIcon, DotsHorizontalIcon } from '@/components/Icons';
import { convertCurrency, parseCountryName } from '@/utils/common';
import { useCurrency } from '@/hooks/useCurrency';

export default function Investments() {
  const [isListDisabled, setIsListDisabled] = useState(false);
  const [stockOptions, setStockOptions] = useState<StockResult[]>([]);
  const [stockDetails, setStockDetails] = useState<StockDetails[]>([]);

  return (
    <>
      <div className="bg-neutral-50 px-8 pt-3">
        <span className="pb-1 text-sm font-semibold">Find stock:</span>
        <SearchSelect
          options={stockOptions.map((s) => ({ ...s, value: s.tickerSymbol }))}
          defaultValue={''}
          onSelect={(option) => {
            if (stockDetails.find((s) => s.accountName === option.accountName)) {
              return;
            }
            setStockDetails((prev) => [...prev, option]);
          }}
          onChangeFilterValue={(value) => searchStocks(value).then((data) => setStockOptions(data))}
          onToggleOptions={(isOpen) => setIsListDisabled(isOpen)}
        />
      </div>
      <div className="flex min-h-[52px] w-full items-center px-12">
        {[
          'Account Name',
          'Ticker symbol',
          'Exchange',
          'Type',
          'Country',
          'Value',
          'Industry or Sector',
        ].map((header) => (
          <div
            key={header}
            className="inline-block flex-[6] whitespace-nowrap px-2.5 text-sm font-medium text-[#77779A] first:pl-0"
          >
            {header}
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <div className="mb-4 min-w-min px-8">
          <div className="relative rounded-xl border-[1px] border-neutral-200 bg-white px-4 py-2">
            <div
              style={{ display: isListDisabled ? 'block' : 'none' }}
              className="px-y absolute left-0 top-0 z-10 h-full w-full rounded-xl bg-neutral-200/30 "
            />
            {stockDetails.length === 0 ? (
              <div className="flex w-full justify-center text-sm font-light text-[#77779A]">
                Start searching for stocks
              </div>
            ) : (
              stockDetails.map((stock, index) => (
                <div
                  key={stock.accountName}
                  className="flex h-10 flex-1 items-center border-b-[1px] border-neutral-100 last:border-0"
                >
                  <div className="flex h-full min-w-fit flex-[6] items-center gap-2 border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <Image src={`/social/apple.png`} alt="Name of holding" height="22" width="22" />
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      {stock.accountName}
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      {stock.tickerSymbol}
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      Exchange name
                    </span>
                  </div>
                  <div className="flex h-full min-w-fit flex-[3] items-center gap-2 border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <BankIcon />
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      {stock.type}
                    </span>
                  </div>
                  <div className="flex h-full min-w-fit flex-[2] items-center gap-2 border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <Image
                      src={`/countries/country-US.svg`}
                      alt="Name of holding"
                      height="20"
                      width="20"
                    />
                    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
                      {parseCountryName(stock.country)}
                    </span>
                  </div>
                  <div className="flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <StockValue tickerSymbol={stock.tickerSymbol} />
                  </div>
                  <div className="relative flex h-full flex-[3] items-center border-r-[1px] border-neutral-100 px-2.5 first:pl-0 last:border-0">
                    <span className="inline-block whitespace-nowrap rounded-md bg-[#E2F8F8] px-2.5 py-1 text-sm font-normal text-secondary-600">
                      Industry
                    </span>
                    <button
                      onClick={() =>
                        setStockDetails((prev) =>
                          prev.filter((s) => s.tickerSymbol !== stock.tickerSymbol),
                        )
                      }
                      className="absolute right-0 rounded-lg p-2 hover:bg-neutral-200/60"
                    >
                      <DotsHorizontalIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const StockValue = memo(function StockValue({ tickerSymbol }: Pick<StockDetails, 'tickerSymbol'>) {
  const [valueUSD, setValueUSD] = useState(0);
  const [value, setValue] = useState<string | null>(null);
  const { allCurrenciesById, currency } = useCurrency();

  useEffect(() => {
    getStockPrice(tickerSymbol).then((res) => {
      const rate = allCurrenciesById[currency.code].rate || 0;
      const newValue = convertCurrency(res.price, rate);
      setValue(newValue);
      setValueUSD(res.price);
    });
  }, [tickerSymbol]);

  useEffect(() => {
    if (!valueUSD) return;
    const rate = allCurrenciesById[currency.code].rate || 0;
    const newValue = convertCurrency(valueUSD, rate);
    setValue(newValue);
  }, [allCurrenciesById, currency]);

  return (
    <span className="inline-block whitespace-nowrap text-sm font-normal text-[#1A1C1E]">
      {value ? `${currency.symbol}${value}` : 'Loading...'}
    </span>
  );
});
