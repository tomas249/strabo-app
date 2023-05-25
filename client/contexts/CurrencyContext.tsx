'use client';

import { Dispatch, SetStateAction, createContext, useState, useEffect } from 'react';
import { getCurrencies } from '@/api/stocks';

type Currency = {
  code: string;
  symbol: string;
};

type CurrencyContextType = {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
};

export const CurrencyContext = createContext({} as CurrencyContextType);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>({ code: 'USD', symbol: '$' });

  useEffect(() => {
    getCurrencies().then((data) => {
      console.log(data);
      // setCurrency(data[0]);
    });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
