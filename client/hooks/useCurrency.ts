import { useContext } from "react";
import { CurrencyContext } from '@/contexts/CurrencyContext'

export function useCurrency() {
  return useContext(CurrencyContext)
}