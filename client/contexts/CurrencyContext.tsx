'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

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

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
