import { z } from 'zod';
import { stockSearchResSchema, stockPriceResSchema } from '@/utils/schemas';

export type Currency = {
  code: 'EUR' | 'USD' | 'GBP';
  label: string;
  icon: string;
  symbol: string;
  rate?: number;
};

export type StockResult = z.infer<typeof stockSearchResSchema>[0];

export type StockDetails = StockResult & { price?: number }