'use client';

import { Dispatch, SetStateAction, createContext, useState, useEffect, useMemo } from 'react';
import { getCurrencies } from '@/api/stocks';
import { Currency } from '@/utils/definitions';
import { toByField } from '@/utils/common';

type CurrencyContextType = {
  allCurrencies: Currency[];
  allCurrenciesById: Record<string, Currency>;
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
};

const CURRENCY_OPTIONS: Currency[] = [
  { code: 'USD', label: 'USD', icon: '/countries/country-US.svg', symbol: '$' },
  { code: 'GBP', label: 'GBP', icon: '/countries/country-GB.svg', symbol: '£' },
  { code: 'EUR', label: 'EUR', icon: '/countries/country-EU.svg', symbol: '€' },
];

export const CurrencyContext = createContext({} as CurrencyContextType);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [allCurrencies, setAllCurrencies] = useState(CURRENCY_OPTIONS);
  const allCurrenciesById = useMemo(() => toByField(allCurrencies, 'code'), [allCurrencies]);
  const [currency, setCurrency] = useState(allCurrencies[0]);

  useEffect(() => {
    getCurrencies().then((data) => {
      const currenciesWithRates = allCurrencies.map((currency) => {
        const rate = data.rates[currency.code as keyof typeof data.rates];
        console.log({ rate });
        return { ...currency, rate };
      });
      setAllCurrencies(currenciesWithRates);
    });
  }, []);

  return (
    <CurrencyContext.Provider value={{ allCurrenciesById, allCurrencies, currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
